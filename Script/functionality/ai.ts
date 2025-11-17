import axios from "axios";
import { HUGGING_FACE_KEY, HUGGING_FACE_MODEL } from "./env";

// Usage: await analyzeImageFromUrl(imageUrl)
export async function analyzeImageFromUrl(imageUrl: string, apiKey: string = HUGGING_FACE_KEY, model: string = HUGGING_FACE_MODEL): Promise<string> {
    const imageBlob = await fetch(imageUrl).then(r => r.blob());
    const response = await axios.post(
        `https://api-inference.huggingface.co/models/${model}`,
        imageBlob,
        {
            headers: {
                "Content-Type": "application/octet-stream",
                Authorization: `Bearer ${apiKey}`,
            },
            transformRequest: [(data) => data],
        }
    );
    return response.data[0]?.generated_text || "";
}
