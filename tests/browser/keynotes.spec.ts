import { test, expect } from '@playwright/test';

test('published keynote profiles are readable and link to the requested people', async ({ page }) => {
  await page.goto('/speakers');
  await expect(page.getByRole('heading', { name: 'Dr. Fernando Martirena', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Dr. Sofía Sánchez Berriel', exact: true })).toBeVisible();
  await expect(page.locator('.keynote-profile')).toHaveCount(2);
  await expect(page.locator('a[href="https://www.linkedin.com/in/fernando-martirena-baa16a54/"]')).toBeVisible();
  await expect(page.locator('a[href="https://www.linkedin.com/in/sofia-sanchez-8004663a/"]')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Why their expertise matters', exact: true })).toHaveCount(0);
  await expect(page.getByText('Profile sources', { exact: true })).toHaveCount(0);
  await expect(page.getByText(/Keynote titles, session timings and additional speakers/)).toHaveCount(0);
  await expect(page.locator('.speaker-photo')).toHaveCount(2);
  await page.setViewportSize({ width: 375, height: 812 });
  await expect(page.locator('.keynote-profile').first()).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  const cards = await page.locator('.keynote-profile').all();
  const [first, second] = await Promise.all(cards.map(card => card.boundingBox()));
  expect(second!.y).toBeGreaterThan(first!.y + first!.height);
});

test('conference dates match in programme and structured data', async ({ page, request }) => {
  await page.goto('/programme');
  await expect(page.getByRole('button', { name: 'Friday First Day · 16 April' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Saturday Second Day · 17 April' })).toBeVisible();
  const html = await (await request.get('/')).text();
  expect(html).toContain('"startDate": "2027-04-16"');
  expect(html).toContain('"endDate": "2027-04-17"');
  expect(html).not.toContain('10–11 April');
});
