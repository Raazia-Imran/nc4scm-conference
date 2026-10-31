// Local verification harness for the built files and configured routes, not a deployment server.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const config = JSON.parse(await readFile('vercel.json', 'utf8'));
const root = resolve('dist');
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.xml': 'application/xml', '.txt': 'text/plain', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.ttf': 'font/ttf', '.ico': 'image/x-icon', '.pdf': 'application/pdf', '.docm': 'application/vnd.ms-word.document.macroEnabled.12' };
createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  for (const rule of config.headers) {
    if (rule.source !== '/(.*)' && rule.source !== url.pathname) continue;
    if (rule.missing && req.headers.host?.split(':')[0] === 'gcgc.nc4scm.com') continue;
    for (const { key, value } of rule.headers) res.setHeader(key, value);
  }
  const redirect = config.redirects.find(rule => rule.source === url.pathname);
  if (redirect) { res.writeHead(308, { Location: redirect.destination + url.search }); res.end(); return; }
  const rewrite = config.rewrites.find(rule => rule.source === url.pathname);
  const path = resolve(root, '.' + (rewrite?.destination || (url.pathname === '/' ? '/index.html' : url.pathname)));
  if (!path.startsWith(root + sep)) { res.writeHead(400); res.end(); return; }
  try { const data = await readFile(path); res.setHeader('Content-Type', mime[extname(path)] || 'application/octet-stream'); res.end(data); }
  catch { res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex' }); res.end(await readFile('dist/404.html')); }
}).listen(4173, '127.0.0.1', () => console.log('Built-site verification server: http://127.0.0.1:4173'));
