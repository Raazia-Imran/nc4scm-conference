import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { PRIVACY_KEY, MAX_AGE, readPreference, savePreference } from '../src/privacy.ts';
const config = JSON.parse(await readFile('vercel.json', 'utf8'));
const pages = JSON.parse(await readFile('src/page-meta.json', 'utf8'));
test('built route documents have distinct canonical metadata and real route mappings', async () => {
  const titles = new Set();
  for (const [path, [title]] of Object.entries(pages)) {
    const html = await readFile(`dist/${path === '/' ? 'index' : path.slice(1)}.html`, 'utf8');
    assert.ok(html.includes(`<title>${title}</title>`));
    assert.ok(html.includes(`rel="canonical" href="https://gcgc.nc4scm.com${path}"`));
    titles.add(title);
    if (path !== '/') assert.ok(config.rewrites.some(rule => rule.source === path));
  }
  assert.equal(titles.size, Object.keys(pages).length);
  assert.ok(!config.rewrites.some(rule => /\(\.\*\)|:path\*/.test(rule.source)));
  assert.match(await readFile('dist/404.html', 'utf8'), /noindex, follow/);
});
test('CSP matches exact static JSON-LD; only animation styles permit inline content', async () => {
  const html = await readFile('dist/index.html', 'utf8');
  const schema = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1];
  assert.equal(schema, await readFile('src/event-schema.txt', 'utf8'));
  const csp = config.headers[0].headers.find(h => h.key === 'Content-Security-Policy').value;
  assert.ok(csp.includes(`'sha256-${createHash('sha256').update(schema).digest('base64')}'`));
  assert.ok(csp.includes("frame-ancestors 'none'"));
  assert.ok(!csp.split(';').find(d => d.trim().startsWith('script-src ')).includes('unsafe-inline'));
  assert.ok(!csp.includes('unsafe-eval'));
});
test('verification file is unchanged and has no redirect rule', async () => {
  assert.equal((await readFile('public/google6cebf148146998e0.html', 'utf8')).trim(), 'google-site-verification: google6cebf148146998e0.html');
  assert.ok(!config.redirects.some(r => r.source.includes('google')));
});
test('preferences default off, validate schema, expire and fail closed', () => {
  const data = new Map();
  globalThis.localStorage = { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), removeItem: key => data.delete(key) };
  assert.equal(readPreference(), null);
  assert.equal(savePreference(true), true);
  assert.equal(readPreference().performance, true);
  for (const invalid of [null, {}, {version:1,performance:true,savedAt:Date.now()-MAX_AGE-1}, {version:1,performance:true,savedAt:Date.now()+10000}, {version:1,performance:'yes',savedAt:Date.now()}]) {
    data.set(PRIVACY_KEY, JSON.stringify(invalid)); assert.equal(readPreference(), null); assert.equal(data.has(PRIVACY_KEY), false);
  }
  data.set(PRIVACY_KEY, '{bad'); assert.equal(readPreference(), null);
  globalThis.localStorage = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } };
  assert.equal(readPreference(), null); assert.equal(savePreference(true), false);
});
test('all hosts except canonical get noindex; forms retain spam protection', async () => {
  assert.ok(config.headers.some(rule => rule.missing?.[0]?.value === 'gcgc.nc4scm.com' && rule.headers.some(h => h.key === 'X-Robots-Tag' && h.value.includes('noindex'))));
  const app = await readFile('src/App.tsx', 'utf8');
  assert.ok(!app.includes('name="_captcha" value="false"'));
  assert.ok(app.includes('name="_honey"')); assert.ok(app.includes('maxLength={5000}'));
  assert.ok(!(await readFile('src/styles.css', 'utf8')).includes('fonts.googleapis.com'));
});
