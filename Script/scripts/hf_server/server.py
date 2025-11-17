from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
import base64
import io
import requests
from PIL import Image
import torch
import torch.nn.functional as F
from transformers import AutoImageProcessor, AutoModelForImageClassification

app = FastAPI(title="Local HF Image Classifier")

# Load model and processor once at startup
MODEL_NAME = "microsoft/resnet-50"
print(f"Loading model {MODEL_NAME}...")
processor = AutoImageProcessor.from_pretrained(MODEL_NAME)
model = AutoModelForImageClassification.from_pretrained(MODEL_NAME)
model.eval()
print("Model loaded.")

class AnalyzeRequest(BaseModel):
    prompt: Optional[str] = None
    image_data_uri: Optional[str] = None
    image_url: Optional[str] = None
    top_k: int = 5

class Prediction(BaseModel):
    label: str
    score: float

class AnalyzeResponse(BaseModel):
    text: str
    preds: list[Prediction]


def load_image_from_data_uri(data_uri: str) -> Image.Image:
    # Expected format: data:<mime>;base64,<base64data>
    if data_uri.startswith("data:"):
        try:
            header, b64 = data_uri.split(",", 1)
            b = base64.b64decode(b64)
            return Image.open(io.BytesIO(b)).convert("RGB")
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Invalid data URI: {e}")
    raise HTTPException(status_code=400, detail="Not a data URI")


def load_image_from_url(url: str) -> Image.Image:
    try:
        r = requests.get(url, timeout=10)
        r.raise_for_status()
        return Image.open(io.BytesIO(r.content)).convert("RGB")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to fetch image URL: {e}")


@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze(req: AnalyzeRequest):
    if not (req.image_data_uri or req.image_url):
        raise HTTPException(status_code=400, detail="Provide image_data_uri or image_url")

    # Load image
    if req.image_data_uri:
        image = load_image_from_data_uri(req.image_data_uri)
    else:
        image = load_image_from_url(req.image_url)

    # Preprocess
    inputs = processor(images=image, return_tensors="pt")

    # Inference
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits[0]
        probs = F.softmax(logits, dim=0).cpu().numpy()

    # Top-k
    top_k = min(max(1, req.top_k), 20)
    top_indices = probs.argsort()[-top_k:][::-1]

    preds = []
    for idx in top_indices:
        # model.config.id2label may have keys as int or str
        label = None
        try:
            label = model.config.id2label.get(int(idx))
        except Exception:
            label = model.config.id2label.get(str(idx), str(idx))
        preds.append({"label": label or str(idx), "score": float(probs[int(idx)])})

    # Build a textual summary. The original prompt may ask for a detailed description;
    # for an image classification model we return the top labels and their scores.
    summary_lines = ["Image classification results:"]
    for p in preds:
        summary_lines.append(f"- {p['label']}: {p['score']:.3f}")

    if req.prompt:
        summary_lines.insert(0, f"Prompt used: {req.prompt}")

    text = "\n".join(summary_lines)

    return {"text": text, "preds": preds}
