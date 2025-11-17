// env.ts
export const HUGGING_FACE_KEY = "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";
// Set this to the Hugging Face model id you want to use, e.g.:
// "Salesforce/blip-image-captioning-base" or "google/vit-base-patch16-224"
// You can also set a full inference router URL if you use a custom router, but
// a simple model id is sufficient for the hosted inference API.
export const HUGGING_FACE_MODEL = "google/vit-base-patch16-224";

// OpenAI API key for using GPT models (set this to use OpenAI instead of Hugging Face)
export const OPENAI_API_KEY = ""; // Add your OpenAI key here
export const OPENAI_MODEL = "gpt-4o-mini"; // or "gpt-4", "gpt-3.5-turbo", etc.
