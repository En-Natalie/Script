import { HuggingFaceClient, ImageAnalyzer } from './ai';
import { HUGGING_FACE_KEY, HUGGING_FACE_MODEL } from './env';

/**
 * Convenience factory: returns an ImageAnalyzer configured for the Hugging Face
 * hosted inference API using the key and model set in `functionality/env.js`.
 *
 * If you prefer to pass a model at runtime, call `getHfAnalyzer(model)`.
 */
export function getHfAnalyzer(model?: string, apiKey?: string): ImageAnalyzer {
    const chosenModel = model ?? HUGGING_FACE_MODEL;
    const key = apiKey ?? HUGGING_FACE_KEY;
    if (!key) throw new Error('Hugging Face API key not set in functionality/env.js');
    if (!chosenModel) throw new Error('Hugging Face model not set. Set HUGGING_FACE_MODEL in functionality/env.js or pass model to getHfAnalyzer.');
    const client = new HuggingFaceClient(key, chosenModel);
    return new ImageAnalyzer(client);
}

export default getHfAnalyzer;
