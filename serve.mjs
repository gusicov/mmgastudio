import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  const decodedUrl = decodeURIComponent(req.url.split('?')[0]);
  let filePath = path.join(__dirname, decodedUrl === '/' ? 'index.html' : decodedUrl);

  const tryPaths = [filePath, filePath + '.html', path.join(filePath, 'index.html')];

  const tryNext = (paths) => {
    if (paths.length === 0) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const [current, ...rest] = paths;
    fs.readFile(current, (err, data) => {
      if (err) { tryNext(rest); return; }
      const ext = path.extname(current).toLowerCase();
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  };

  tryNext(tryPaths);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
