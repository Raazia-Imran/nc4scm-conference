import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const pages = JSON.parse(await readFile('src/page-meta.json', 'utf8'));
const template = await readFile('dist/index.html', 'utf8');
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const preview = process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production';
function render(path, title, description, missing = false) {
  const url = `https://gcgc.nc4scm.com${path === '/' ? '/' : path}`;
  let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(title)}</title>`);
  html = html.replace(/(<meta\s+name="description"\s+content=")[^"]*("\s*\/?>)/, `$1${escape(description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*("\s*\/?>)/, `$1${url}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*("\s*\/?>)/, `$1${escape(title)}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*("\s*\/?>)/, `$1${escape(description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*("\s*\/?>)/, `$1${url}$2`);
  if (path !== '/') html = html.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, '');
  if (missing) html = html.replace(/\s*<link rel="canonical"[^>]*>/, '');
  return html.replace('</head>', `<meta name="robots" content="${preview || missing ? 'noindex, follow' : 'index, follow'}" />\n</head>`);
}
for (const [path, [title, description]] of Object.entries(pages)) {
  await writeFile(`dist/${path === '/' ? 'index' : path.slice(1)}.html`, render(path, title, description));
}
await writeFile('dist/404.html', render('/404', 'Page not found | GCGC 2027', 'The requested conference page could not be found.', true));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.keys(pages).map(path => `  <url><loc>https://gcgc.nc4scm.com${path === '/' ? '/' : path}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile('dist/sitemap.xml', sitemap);
await writeFile('public/sitemap.xml', sitemap);
const jsonld = template.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
const hash = createHash('sha256').update(jsonld).digest('base64');
// Static HTML uses an exact JSON-LD hash; no reusable nonce and no inline executable scripts.
const csp = ["default-src 'self'", `script-src 'self' 'sha256-${hash}'`, "script-src-attr 'none'", "style-src 'self' 'unsafe-inline'", "img-src 'self' data:", "font-src 'self'", "connect-src 'self'", "form-action https://formsubmit.co", "frame-src 'none'", "frame-ancestors 'none'", "object-src 'none'", "base-uri 'none'", 'upgrade-insecure-requests'].join('; ');
const config = JSON.parse(await readFile('vercel.json', 'utf8'));
config.headers[0].headers = config.headers[0].headers.filter(h => h.key !== 'Content-Security-Policy');
config.headers[0].headers.push({ key: 'Content-Security-Policy', value: csp });
// Rewrites are limited to real routes. Missing resources receive Vercel's real 404 status.
config.rewrites = Object.keys(pages).filter(path => path !== '/').map(path => ({ source: path, destination: `${path}.html` }));
config.redirects = [{ source: '/images/sitemap.xml', destination: '/sitemap.xml', permanent: true }, { source: '/index.html', destination: '/', permanent: true }, ...Object.keys(pages).filter(path => path !== '/').map(path => ({ source: `${path}.html`, destination: path, permanent: true }))];
await writeFile('vercel.json', JSON.stringify(config, null, 2) + '\n');
console.log(`Generated ${Object.keys(pages).length} route documents, sitemap, 404 and CSP hash.`);
