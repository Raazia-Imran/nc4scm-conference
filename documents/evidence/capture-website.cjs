// Replay local previews after npm ci and npm run build.
// Run npm run serve:check, install Playwright Chromium, then run this file.
// New captures go into replay-output; the original evidence is preserved in git history.
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const output = path.join(__dirname, 'replay-output');
const views = [
  { name: 'home-desktop', route: '/', width: 1440, height: 1000 },
  { name: 'speakers-desktop', route: '/speakers', selector: '.speaker-showcase', width: 1440, height: 1000 },
  { name: 'call-for-papers-desktop', route: '/call-for-papers', selector: '.conference-poster', width: 1440, height: 1000 },
  { name: 'home-mobile', route: '/', width: 390, height: 844 },
];

async function captureView(browser, view) {
  const page = await browser.newPage({ viewport: { width: view.width, height: view.height }, deviceScaleFactor: 1 });
  try {
    const response = await page.goto('http://127.0.0.1:4173' + view.route, { waitUntil: 'networkidle', timeout: 45000 });
    await page.evaluate(() => document.fonts.ready);
    if (view.selector) await page.locator(view.selector).scrollIntoViewIfNeeded();
    await page.waitForTimeout(1600);
    await page.screenshot({ path: path.join(output, view.name + '.jpg'), quality: 78, animations: 'disabled' });
    return { name: view.name, url: page.url(), httpStatus: response.status(), title: await page.title(), capturedAt: new Date().toISOString() };
  } finally {
    await page.close();
  }
}

async function main() {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    const records = await Promise.all(views.map(view => captureView(browser, view)));
    fs.writeFileSync(path.join(output, 'local-preview-observation.json'), JSON.stringify(records, null, 2) + '\n');
    console.log('Saved local replay captures to', output);
  } finally {
    await browser.close();
  }
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
