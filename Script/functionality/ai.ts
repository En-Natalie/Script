// Note: we avoid a top-level import of Node's fs/promises because this module
// is used in both Node and React Native (Expo). When a path is provided we
// dynamically try to read using Node's fs, and fall back to Expo's
// `expo-file-system` when available. If neither is available we instruct the
// caller to provide base64 or a URL instead.

// /c:/Users/thanh/OneDrive/Documents/GitHub/Script/Script/functionality/ai.ts
//
// Image analysis helper that is AI-vendor-agnostic.
// - Plug any AI by implementing AiClient
// - Change the prompt freely when calling analyzeImage
// - Includes a minimal OpenAI-compatible client example (uses fetch and OPENAI_API_KEY env var)
//
// Usage example (commented at bottom).


export type ImageInput =
    | { path: string }                    // local file path
    | { buffer: Buffer; mime?: string }  // Buffer + optional mime
    | { base64: string; mime?: string }  // base64 string + optional mime
    | { url: string };                   // public URL

export interface AiClient {
    analyze(prompt: string, imageDataUri?: string, meta?: Record<string, any>): Promise<string>;
}

import { HUGGING_FACE_KEY, HUGGING_FACE_MODEL } from './env';

export class ImageAnalyzer {
    client: AiClient;

    constructor(client?: AiClient) {
        if (client) {
            this.client = client;
            return;
        }

        // Default to Hugging Face hosted inference client using configured env vars.
        const apiKey = HUGGING_FACE_KEY ?? process.env.HUGGING_FACE_KEY;
        const model = HUGGING_FACE_MODEL ?? process.env.HUGGING_FACE_MODEL;
        if (!apiKey || !model) {
            throw new Error('No AiClient provided and Hugging Face credentials are not configured. Set HUGGING_FACE_KEY and HUGGING_FACE_MODEL in functionality/env.ts or pass a client to ImageAnalyzer.');
        }

        this.client = new HuggingFaceClient(String(apiKey), String(model));
    }

    // promptOverride can be any text — you control the AI prompt fully.
    // meta is forwarded to the AiClient (e.g., model, temperature).
    async analyzeImage(image: ImageInput, promptOverride?: string, meta?: Record<string, any>): Promise<string> {
        const prompt = promptOverride ?? defaultPrompt();
        let imageDataUri: string | undefined;
        try {
            imageDataUri = await toDataUri(image);
        } catch (e: any) {
            // If conversion to data URI fails, return a helpful message instead of throwing.
            console.error('toDataUri failed:', e);
            return "Auto-description unavailable: could not read image. Please provide a base64/data URI or a public URL.";
        }

        try {
            const raw = await this.client.analyze(prompt, imageDataUri, meta);
            // Post-process the raw response to extract a concise description when possible.
            return extractBestDescription(raw);
        } catch (e: any) {
            try {
                const clientName = (this.client && (this.client as any).constructor && (this.client as any).constructor.name) || 'UnknownClient';
                console.error(`AiClient.analyze failed (client=${clientName}):`, e && (e.stack || e.message || String(e)));
            } catch (logErr: any) {
                console.error('AiClient.analyze failed (unable to stringify client/error):', String(e));
            }
            return "Auto-description unavailable; please enter a description manually.";
        }
    }
}

/**
 * Heuristic to extract a short description from raw AI output.
 * - If the model returned JSON with a `description`/`text` field, use that.
 * - Otherwise, return the first non-empty paragraph trimmed to a reasonable length.
 */
function extractBestDescription(raw: string): string {
    if (!raw) return "";
    // Try parse JSON
    try {
        const j = JSON.parse(raw);
        if (typeof j === 'string') return j;
        // Some HF image caption models return an array like [{generated_text: "..."}]
        if (Array.isArray(j) && j.length > 0) {
            const first = j[0];
            if (typeof first === 'string') return first;
            if (first.generated_text) return String(first.generated_text);
            if (first.caption) return String(first.caption);
            if (first.text) return String(first.text);
            // if preds-like: convert to labels
            if (Array.isArray(first.preds) && first.preds.length > 0) {
                const top = first.preds.slice(0, 3).map((p: any) => `${p.label}${p.score ? ` (${(p.score*100).toFixed(0)}%)` : ''}`);
                return `Top labels: ${top.join(', ')}`;
            }
            // fallthrough: stringify first element
            return typeof first === 'object' ? JSON.stringify(first) : String(first);
        }

        if (j.description) return String(j.description);
        if (j.text) return String(j.text);
        // If preds exist (LocalHFClient), build a compact label list
        if (Array.isArray(j.preds) && j.preds.length > 0) {
            const top = j.preds.slice(0, 3).map((p: any) => `${p.label}${p.score ? ` (${(p.score*100).toFixed(0)}%)` : ''}`);
            return `Top labels: ${top.join(', ')}`;
        }
    } catch (_) {
        // not JSON
    }

    // Plain text: split into paragraphs and pick the first meaningful line
    const paragraphs = raw.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean);
    if (paragraphs.length > 0) {
        const first = paragraphs[0].replace(/^[-•\s]+/, '').trim();
        // limit length to ~240 chars
        if (first.length > 240) return first.slice(0, 237) + '...';
        return first;
    }

    // Fallback: trim the whole raw string
    const single = raw.replace(/\s+/g, ' ').trim();
    return single.length > 240 ? single.slice(0, 237) + '...' : single;
}

/* ---------- Helpers ---------- */

async function toDataUri(image: ImageInput): Promise<string> {
    if ("url" in image) return image.url;
    if ("base64" in image) {
        const mime = image.mime ?? inferMimeFromBase64(image.base64) ?? "application/octet-stream";
        return `data:${mime};base64,${stripDataPrefix(image.base64)}`;
    }
    if ("buffer" in image) {
        const mime = image.mime ?? "application/octet-stream";
        return `data:${mime};base64,${image.buffer.toString("base64")}`;
    }
    if ("path" in image) {
        // Try Node's fs.promises (server/node environment)
        try {
            // dynamic import to avoid bundling Node-only modules in RN
            const fsPromises: any = await import('fs/promises');
            const buf: Buffer = await fsPromises.readFile(image.path);
            const extMime = inferMimeFromPath(image.path) ?? "application/octet-stream";
            return `data:${extMime};base64,${buf.toString("base64")}`;
        } catch (e) {
            // Not in Node, try Expo FileSystem (React Native)
            try {
                const FileSystem: any = await import('expo-file-system');
                // readAsStringAsync with encoding 'base64'
                const b64: string = await FileSystem.readAsStringAsync(image.path, { encoding: 'base64' });
                const extMime = inferMimeFromPath(image.path) ?? 'image/jpeg';
                return `data:${extMime};base64,${b64}`;
            } catch (e2) {
                throw new Error("'path' ImageInput is not supported in this runtime. Convert the file to base64 or pass a public URL.");
            }
        }
    }
    throw new Error("Unsupported image input");
}

function stripDataPrefix(s: string) {
    return s.replace(/^data:.*;base64,/, "");
}

function inferMimeFromBase64(_s: string): string | null {
    // Lightweight: user can provide mime explicitly. Return null by default.
    return null;
}

function inferMimeFromPath(path: string): string | null {
    const ext = path.split(".").pop()?.toLowerCase();
    switch (ext) {
        case "jpg":
        case "jpeg":
            return "image/jpeg";
        case "png":
            return "image/png";
        case "webp":
            return "image/webp";
        case "gif":
            return "image/gif";
        case "svg":
            return "image/svg+xml";
        default:
            return null;
    }
}

function defaultPrompt() {
    return [
        "You are an expert image analyst. Provide a detailed analysis of the image, including:",
        "- scene description and likely subjects",
        "- notable objects, colors, textures, and layout",
        "- inferred actions, emotions, or activities",
        "- probable time, location clues, and context when possible",
        "- potential accessibility descriptions (alt text)",
        "- suggested tags/keywords and a short summary (1-2 sentences)",
        "",
        "Be thorough and structured. If uncertain, say so and list hypotheses with confidence levels.",
    ].join("\n");
}

/* ---------- Example AiClient implementations ---------- */
/*
    OpenAIChatClient example:
    - Requires process.env.OPENAI_API_KEY
    - Optionally set model via meta.model or env OPENAI_MODEL
    - Embeds the image as a markdown image (URL or data URI) in the user message.
*/
export class OpenAIChatClient implements AiClient {
    apiKey: string;

    constructor(apiKey?: string) {
        this.apiKey = apiKey ?? process.env.OPENAI_API_KEY ?? "";
        if (!this.apiKey) throw new Error("OpenAI API key not provided. Set OPENAI_API_KEY or pass key to constructor.");
    }

    async analyze(prompt: string, imageDataUri?: string, meta?: Record<string, any>): Promise<string> {
        const model = meta?.model ?? process.env.OPENAI_MODEL ?? "gpt-4o-mini";
        const temperature = meta?.temperature ?? 0.2;
        // Build a single user message that includes the prompt and the image reference.
        const userContent = imageDataUri
            ? `${prompt}\n\nImage:\n\n![image](${imageDataUri})\n\nPlease analyze the image above in detail.`
            : `${prompt}\n\n(No image provided)`;

        const body = {
            model,
            messages: [{ role: "user", content: userContent }],
            temperature,
            max_tokens: meta?.max_tokens ?? 1200,
        };

        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const text = await res.text().catch(() => "");
            throw new Error(`OpenAI error ${res.status}: ${text}`);
        }

        const json = await res.json();
        const choice = json.choices?.[0];
        const content = choice?.message?.content ?? choice?.text ?? JSON.stringify(json);
        return content;
    }
}

/**
 * LocalHFClient
 *
 * Simple client that POSTs to a local FastAPI server running a Hugging Face model.
 * Run the example server in `scripts/hf_server/server.py` (FastAPI + transformers).
 * The server returns { text, preds } by default; this client returns the `text` field.
 */
export class LocalHFClient implements AiClient {
    baseUrl: string;

    constructor(baseUrl?: string) {
        // Default to localhost; adjust for emulator/device (10.0.2.2 for Android emulator)
        this.baseUrl = baseUrl ?? process.env.LOCAL_HF_URL ?? "http://localhost:8000";
    }

    async analyze(prompt: string, imageDataUri?: string, meta?: Record<string, any>): Promise<string> {
        const body = {
            prompt: prompt ?? undefined,
            image_data_uri: imageDataUri ?? undefined,
            top_k: meta?.top_k ?? 5,
        };

        const res = await fetch(`${this.baseUrl}/analyze`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const txt = await res.text().catch(() => "");
            throw new Error(`Local HF server error ${res.status}: ${txt}`);
        }

        const json = await res.json();
        // Server returns { text, preds }
        return json.text ?? JSON.stringify(json);
    }
}

/**
 * HuggingFace inference API client (hosted)
 * Usage: new HuggingFaceClient(apiKey, model) where `model` is the HF model id
 * like "facebook/blip-image-captioning-base" or a custom deployment id.
 */
export class HuggingFaceClient implements AiClient {
    apiKey: string;
    model: string;

    constructor(apiKey?: string, model?: string) {
        this.apiKey = apiKey ?? process.env.HUGGING_FACE_KEY ?? '';
        this.model = model ?? process.env.HUGGING_FACE_MODEL ?? '';
        if (!this.apiKey) throw new Error('Hugging Face API key required. Set HUGGING_FACE_KEY or pass key to constructor.');
        if (!this.model) throw new Error('Hugging Face model id required. Set HUGGING_FACE_MODEL or pass model to constructor.');
    }

    async analyze(prompt: string, imageDataUri?: string, meta?: Record<string, any>): Promise<string> {
        const model = meta?.model ?? this.model;
        if (!model) throw new Error('No Hugging Face model configured');

        try {
            console.log(`[HuggingFaceClient] Attempting to analyze image with model=${model}`);

            // If caller passed a full URL (router), use it directly; otherwise use models/{id}
            const endpoint = String(model).startsWith('http')
                ? String(model)
                : `https://api-inference.huggingface.co/models/${model}`;

            // Try the direct Hugging Face API
            try {
                const res = await this.sendRequest(endpoint, imageDataUri);
                console.log(`[HuggingFaceClient] got response status=${res.status}`);
                return await this.parseResponse(res);
            } catch (directErr: any) {
                console.warn('[HuggingFaceClient] Direct API request failed:', String(directErr));
                
                // Fallback: generate a helpful placeholder description
                // In production, you would use a proxy server (see scripts/hf-proxy-server.js)
                console.log('[HuggingFaceClient] Returning placeholder - see scripts/hf-proxy-server.js for setup');
                return "Image received. To enable AI descriptions, set up the proxy server: run 'node scripts/hf-proxy-server.js' and update the endpoint in functionality/ai.ts";
            }
        } catch (err: any) {
            try {
                console.error('[HuggingFaceClient] error:', String(err));
            } catch (_) {
                console.error('[HuggingFaceClient] failed to log error');
            }
            throw err;
        }
    }

    private async sendRequest(endpoint: string, imageDataUri?: string): Promise<any> {
        if (imageDataUri && imageDataUri.startsWith('data:')) {
            // Data URI: use multipart form
            console.log(`[HuggingFaceClient] sending multipart POST...`);

            // Convert data URI to base64 string
            let base64String = imageDataUri;
            if (base64String.includes(',')) {
                base64String = base64String.split(',')[1];
            }

            // Create FormData
            const formData = new FormData();
            const binaryString = atob(base64String);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: 'image/jpeg' });
            formData.append('data', blob);

            return await fetch(endpoint, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                },
                body: formData,
            });
        } else {
            // URL or empty: use JSON POST
            console.log(`[HuggingFaceClient] sending JSON POST...`);
            const body = { inputs: imageDataUri ?? '' };

            return await fetch(endpoint, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
        }
    }

    private async parseResponse(res: any): Promise<string> {
        let rawText = '';
        try {
            rawText = await res.text().catch(() => '');
            console.log(`[HuggingFaceClient] response raw_len=${String(rawText).length}`);
            if (rawText && rawText.length > 0) {
                console.log(`[HuggingFaceClient] raw response (first 200 chars): ${rawText.slice(0, 200)}`);
            }
        } catch (textErr: any) {
            console.error('[HuggingFaceClient] res.text() threw:', String(textErr));
            throw textErr;
        }

        if (!res.ok) {
            console.error('[HuggingFaceClient] non-OK response', res.status, rawText);
            throw new Error(`Hugging Face inference error ${res.status}: ${rawText}`);
        }

        // Try to parse JSON; if not JSON, return raw text
        try {
            const parsed = JSON.parse(rawText);
            try { console.log('[HuggingFaceClient] parsed response:', JSON.stringify(parsed).slice(0, 300)); } catch(_) {}
            return typeof parsed === 'string' ? parsed : JSON.stringify(parsed);
        } catch (parseErr) {
            console.log('[HuggingFaceClient] non-JSON response, returning raw text');
            return rawText;
        }
    }
}

