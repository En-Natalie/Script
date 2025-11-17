/**
 * Simple Node.js proxy server for Hugging Face inference API
 * Run: node scripts/hf-proxy-server.js
 * Then update your app to call http://localhost:3000/analyze instead of HuggingFace directly
 */

const express = require('express');
const axios = require('axios');
const multer = require('multer');
const cors = require('cors');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Allow cross-origin requests for development; adjust in production.
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const HF_API_KEY = process.env.HUGGING_FACE_KEY || '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';
const HF_MODEL = process.env.HUGGING_FACE_MODEL || 'google/vit-base-patch16-224';
// Optional simple proxy auth: set PROXY_API_KEY to require clients to present it in header 'x-proxy-key'
const PROXY_API_KEY = process.env.PROXY_API_KEY || null;

app.post('/analyze', upload.single('image'), async (req, res) => {
    try {
        console.log('[Proxy] /analyze request received');
        // If a proxy API key is set, require it
        if (PROXY_API_KEY) {
            const got = req.headers['x-proxy-key'] || req.headers['x-proxy-key'.toLowerCase()];
            if (!got || String(got) !== PROXY_API_KEY) {
                console.warn('[Proxy] missing/invalid x-proxy-key');
                return res.status(401).json({ error: 'Unauthorized' });
            }
        }
        
        const { imageDataUri, model } = req.body;
        const modelToUse = model || HF_MODEL;
        
        if (!imageDataUri && !req.file) {
            return res.status(400).json({ error: 'No image provided' });
        }

        // If we got a file upload
        if (req.file) {
            console.log('[Proxy] Forwarding file upload to HF...');
            const endpoint = `https://api-inference.huggingface.co/models/${modelToUse}`;
            
            try {
                // Forward as octet-stream
                const response = await axios.post(endpoint, req.file.buffer, {
                    headers: {
                        Authorization: `Bearer ${HF_API_KEY}`,
                        'Content-Type': 'application/octet-stream',
                    },
                    timeout: 30000,
                });
                
                console.log('[Proxy] HF response:', response.status);
                return res.json(response.data);
            } catch (hfErr) {
                console.error('[Proxy] HF error:', hfErr.response?.status, hfErr.message);
                return res.status(hfErr.response?.status || 500).json({
                    error: hfErr.message,
                    hfStatus: hfErr.response?.status,
                });
            }
        }

        // If we got a data URI
        if (imageDataUri) {
            console.log('[Proxy] Forwarding data URI to HF...');
            const endpoint = `https://api-inference.huggingface.co/models/${modelToUse}`;
            
            try {
                // The HF inference API accepts JSON inputs for many vision models.
                const response = await axios.post(
                    endpoint,
                    { inputs: imageDataUri },
                    {
                        headers: {
                            Authorization: `Bearer ${HF_API_KEY}`,
                            'Content-Type': 'application/json',
                        },
                        timeout: 30000,
                    }
                );
                
                console.log('[Proxy] HF response:', response.status);
                return res.json(response.data);
            } catch (hfErr) {
                console.error('[Proxy] HF error:', hfErr.response?.status, hfErr.message);
                return res.status(hfErr.response?.status || 500).json({
                    error: hfErr.message,
                    hfStatus: hfErr.response?.status,
                });
            }
        }
    } catch (err) {
        console.error('[Proxy] Server error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', model: HF_MODEL });
});

const PORT = process.env.PORT || 3000;
// Bind to 0.0.0.0 to ensure IPv4 clients (127.0.0.1) can connect on Windows
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => {
    console.log(`[Proxy] Server listening on ${HOST}:${PORT}`);
    console.log(`[Proxy] HF API Key: ${HF_API_KEY.slice(0, 8)}...`);
    console.log(`[Proxy] HF Model: ${HF_MODEL}`);
});
