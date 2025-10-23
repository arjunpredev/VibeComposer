import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import the built React Router handler
const { request: routerRequest } = await import('./build/server/index.js');

const port = process.env.PORT || 5173;

const server = createServer(async (req, res) => {
  try {
    // Parse the URL
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    
    // Create a Request object
    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
      body: req.method === 'GET' || req.method === 'HEAD' ? undefined : req,
    });

    // Handle the request through React Router
    const response = await routerRequest(request, {
      router: {
        request: async (r) => routerRequest(r)
      }
    });

    // Send the response
    res.writeHead(response.status, Object.fromEntries(response.headers));
    res.end(await response.text());
  } catch (error) {
    console.error('Server error:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`✅ Server running on http://0.0.0.0:${port}`);
});
