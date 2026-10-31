import { test, expect } from '@playwright/test';
const key = 'gcgc-privacy-v1';
test('all public routes load, contain distinct metadata, and unknown paths return 404', async ({ page, request }) => {
  const errors: string[] = []; page.on('pageerror', e => errors.push(e.message));
  for (const path of ['/', '/about', '/call-for-papers', '/programme', '/speakers', '/registration', '/accommodation', '/committees', '/partners', '/archive', '/contact', '/privacy', '/cookies', '/terms']) {
    const response = await page.goto(path); expect(response?.status()).toBe(200);
    await expect(page.locator('main h1').first()).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://gcgc.nc4scm.com${path}`);
  }
  expect(errors).toEqual([]);
  const redirect = await request.get('/about.html?next=https://example.invalid', { maxRedirects: 0 });
  expect(redirect.status()).toBe(308); expect(redirect.headers().location).toBe('/about');
  const missing = await request.get('/missing-audit-page'); expect(missing.status()).toBe(404);
  await page.goto('/missing-audit-page'); await expect(page.getByRole('heading', { name: 'We could not find that page' })).toBeVisible();
  expect((await request.get('/robots.txt')).status()).toBe(200);
  expect((await request.get('/sitemap.xml')).status()).toBe(200);
  expect(await (await request.get('/google6cebf148146998e0.html')).text()).toContain('google-site-verification: google6cebf148146998e0.html');
});
test('monitoring stays off before choice; accept, withdraw, keyboard close and persist work', async ({ page, context }) => {
  // Mock only the performance script, never send measurements or enquiries to a provider.
  let scriptLoads = 0;
  await page.route('**/_vercel/speed-insights/**', route => { scriptLoads++; return route.fulfill({ contentType: 'text/javascript', body: 'window.__speedMockLoaded = true;' }); });
  await page.goto('/cookies');
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
  expect(await page.evaluate(() => sessionStorage.length)).toBe(0);
  expect(await context.cookies()).toEqual([]);
  expect(scriptLoads).toBe(0);
  await page.locator('main').getByRole('button', { name: 'Privacy settings' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape'); await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.locator('main').getByRole('button', { name: 'Privacy settings' })).toBeFocused();
  await page.locator('main').getByRole('button', { name: 'Privacy settings' }).click();
  await page.getByRole('button', { name: 'Essential only', exact: true }).click();
  expect(scriptLoads).toBe(0);
  await page.reload(); expect(scriptLoads).toBe(0);
  await page.locator('main').getByRole('button', { name: 'Privacy settings' }).click();
  await page.getByRole('button', { name: 'Allow performance monitoring', exact: true }).click();
  await expect.poll(() => scriptLoads).toBe(1);
  expect(JSON.parse((await page.evaluate(k => localStorage.getItem(k), key))! ).performance).toBe(true);
  await page.locator('main').getByRole('button', { name: 'Privacy settings' }).click();
  await page.getByRole('button', { name: 'Essential only', exact: true }).click();
  await page.waitForLoadState();
  await expect.poll(async () => JSON.parse((await page.evaluate(k => localStorage.getItem(k), key))!).performance).toBe(false);
  const after = scriptLoads; await page.reload(); expect(scriptLoads).toBe(after);
});
test('expired preferences keep monitoring off', async ({ page }) => {
  await page.addInitScript(({ key }) => localStorage.setItem(key, JSON.stringify({ version: 1, performance: true, savedAt: Date.now() - 181 * 86400000 })), { key });
  await page.goto('/'); await expect(page.locator('script[src*="speed-insights"]')).toHaveCount(0);
  expect(await page.evaluate(k => localStorage.getItem(k), key)).toBeNull();
});
test('form validates locally and sends only to the existing provider when explicitly submitted', async ({ page }) => {
  await page.goto('/contact');
  await page.getByRole('button', { name: 'Send enquiry' }).click();
  await expect(page.locator('input[name="name"]:invalid')).toHaveCount(1);
  await page.getByLabel('Name', { exact: true }).fill('   ');
  await page.getByLabel('Email', { exact: true }).fill('test@example.invalid');
  await page.getByLabel('Message', { exact: true }).fill('   ');
  await page.getByRole('button', { name: 'Send enquiry' }).click();
  await expect(page.getByRole('alert')).toContainText('more than spaces');
  let submitted = '';
  await page.route('https://formsubmit.co/**', route => { submitted = route.request().postData() || ''; return route.fulfill({ contentType: 'text/html', body: '<h1>Mock provider result</h1>' }); });
  await page.getByLabel('Name', { exact: true }).fill('Test only');
  await page.getByLabel('Message', { exact: true }).fill('Local test; intercepted and never delivered.');
  await page.getByRole('button', { name: 'Send enquiry' }).click();
  await expect(page.getByRole('heading', { name: 'Mock provider result' })).toBeVisible();
  expect(submitted).toContain('test%40example.invalid'); expect(submitted).not.toContain('_captcha=false');
});
test('mobile privacy controls fit and keyboard focus stays in dialog', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); await page.goto('/cookies');
  await page.locator('main').getByRole('button', { name: 'Privacy settings' }).click();
  for (let i = 0; i < 8; i++) { await page.keyboard.press('Tab'); expect(await page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBe(true); }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('blocked storage reports the limitation and never loads monitoring', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error('blocked'); };
    Storage.prototype.setItem = () => { throw new Error('blocked'); };
  });
  await page.goto('/cookies');
  await page.locator('main').getByRole('button', { name: 'Privacy settings' }).click();
  await page.getByRole('button', { name: 'Allow performance monitoring', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('could not save');
  await expect(page.locator('script[src*="speed-insights"]')).toHaveCount(0);
});
test('performance callback removes query and fragment and blocks events after expiry', async ({ page }) => {
  await page.route('**/_vercel/speed-insights/**', route => route.fulfill({ contentType: 'text/javascript', body: '' }));
  await page.goto('/cookies?private=example#secret');
  await page.locator('main').getByRole('button', { name: 'Privacy settings' }).click();
  await page.getByRole('button', { name: 'Allow performance monitoring', exact: true }).click();
  await expect(page.locator('script[src*="speed-insights"]')).toHaveCount(1);
  const result = await page.evaluate(() => {
    const queued = (window as unknown as { siq: [string, (event: object) => unknown][] }).siq;
    const callback = queued.filter(([name]) => name === 'beforeSend').at(-1)![1];
    const clean = callback({ type: 'vital', url: location.href });
    localStorage.setItem('gcgc-privacy-v1', JSON.stringify({ version: 1, performance: true, savedAt: Date.now() - 181 * 86400000 }));
    return { clean, expired: callback({ type: 'vital', url: location.href }) };
  });
  expect(result.clean).toMatchObject({ url: 'http://127.0.0.1:4173/cookies' }); expect(result.expired).toBeNull();
});
