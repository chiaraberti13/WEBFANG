import { defineConfig, devices } from '@playwright/test';

// In locale si usa il Chromium preinstallato puntando WEBFANG_CHROMIUM_PATH al
// binario; in CI Playwright usa il browser installato da `playwright install`.
const executablePath = process.env.WEBFANG_CHROMIUM_PATH;

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  expect: { timeout: 7_000 },
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    launchOptions: {
      args: ['--no-sandbox'],
      ...(executablePath ? { executablePath } : {}),
    },
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command:
      'pnpm build && pnpm preview --port 4173 --strictPort --host 127.0.0.1',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
