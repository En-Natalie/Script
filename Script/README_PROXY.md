Local Hugging Face proxy and usage

This repository contains a small proxy to forward image-analysis requests to the Hugging Face Inference API without exposing the HF API key to the client.

Quick start

1. Install (use legacy peer deps resolver if your project has peer conflicts):

```powershell
npm install --legacy-peer-deps
npm install cors --legacy-peer-deps
```

2. Set environment variables (example):

```powershell
$env:HUGGING_FACE_KEY = 'hf_YOUR_KEY'
$env:HUGGING_FACE_MODEL = 'google/vit-base-patch16-224'
# Optional: require a proxy API key
$env:PROXY_API_KEY = 'dev-only-secret'
```

3. Start the proxy:

```powershell
node .\scripts\hf-proxy-server.js
```

4. Test with the included script:

```powershell
node .\scripts\test-proxy.js
```

Notes
- The proxy listens on port 3000 by default and exposes `/analyze` and `/health`.
- The proxy accepts either a multipart upload with form field `image` or JSON `{ imageDataUri, model? }`.
- The proxy will forward requests to Hugging Face using `HUGGING_FACE_KEY` and the specified model.
- For emulator/device testing, set `HF_PROXY_URL` in your app to `http://10.0.2.2:3000/analyze` (Android emulator) or your machine's LAN IP.
