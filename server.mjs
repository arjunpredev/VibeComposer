import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router';
import { renderToString } from 'react-dom/server';
import React from 'react';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const clientBuildPath = path.join(__dirname, 'build/client');

// Import the routes from the build
const build = await import('./build/server/index.js');

const port = process.env.PORT || 5173;

// Convert the routes object to an array for React Router
const routesArray = Object.values(build.routes);

// Create the static handler for SSR
const { query, dataRoutes } = createStaticHandler(routesArray);

const server = http.createServer(async (req, res) => {
  // Serve static assets
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  
  if (pathname.startsWith('/assets/') || pathname.match(/\.(js|css|png|jpg|svg|json|woff|woff2)$/)) {
    const filePath = path.join(clientBuildPath, pathname);
    try {
      const content = fs.readFileSync(filePath);
      const ext = path.extname(filePath);
      const mimeTypes = {
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.svg': 'image/svg+xml',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
      };
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain', 'Cache-Control': 'public, max-age=3600' });
      res.end(content);
      return;
    } catch (err) {
      // Fall through to React Router
    }
  }

  try {
    // Create a proper Request object
    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
      body: ['GET', 'HEAD', 'OPTIONS'].includes(req.method) ? undefined : req,
    });

    // Run loaders and actions using the static handler
    const context = await query(request);

    // If the query returns a response (e.g., redirect), send it
    if (context instanceof Response) {
      res.writeHead(context.status, Object.fromEntries(context.headers));
      res.end(await context.text());
      return;
    }

    // Create a static router for rendering
    const router = createStaticRouter(dataRoutes, context);

    // Render the app to a string using React.createElement
    const html = renderToString(
      React.createElement(
        StaticRouterProvider,
        { router, context },
        React.createElement(build.entry.default)
      )
    );

    // Set headers
    const headers = new Headers({
      'Content-Type': 'text/html; charset=utf-8',
    });

    res.writeHead(context.statusCode || 200, Object.fromEntries(headers));
    res.end(`<!DOCTYPE html>${html}`);
  } catch (error) {
    console.error('Server error:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`✅ Server running on http://0.0.0.0:${port}`);
});
