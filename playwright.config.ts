import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser',
  use: { baseURL: process.env.BASE_URL || 'http://127.0.0.1:4173', headless: true, launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : undefined },
  webServer: process.env.BASE_URL ? undefined : { command: 'npm run serve:check', port: 4173, reuseExistingServer: !process.env.CI },
  reporter: 'list',
});
