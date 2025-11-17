import axios from "axios";

// Usage: await analyzeImageFromUrl(imageUrl, apiKey)
export async function analyzeImageFromUrl(imageUrl: string, apiKey: string): Promise<string> {
    const imageBlob = await fetch(imageUrl).then(r => r.blob());
    const response = await axios.post(
        "https://api-inference.huggingface.co/models/nlpconnect/vit-gpt2-image-captioning",
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
