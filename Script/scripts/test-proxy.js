const axios = require('axios');

async function test() {
  try {
    const dataUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=';
    console.log('Posting sample image to http://localhost:3000/analyze');
    const res = await axios.post('http://localhost:3000/analyze', { imageDataUri: dataUri }, {
      headers: {
        'Content-Type': 'application/json',
        // If you set PROXY_API_KEY in the proxy, include it here as 'x-proxy-key'
        // 'x-proxy-key': 'your-key-here'
      },
      timeout: 20000,
    });

    console.log('Status:', res.status);
    console.log('Response data:', JSON.stringify(res.data).slice(0, 1000));
  } catch (err) {
    if (err.response) {
      console.error('Error status', err.response.status, err.response.data);
    } else {
      // Print full error details for debugging
      try {
        console.error('Request error', err.toJSON ? err.toJSON() : err.stack || err.message || err);
      } catch (e) {
        console.error('Request error (unknown)', String(err));
      }
    }
    process.exitCode = 1;
  }
}

if (require.main === module) test();
