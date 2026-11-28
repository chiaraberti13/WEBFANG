import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  const skip = page.getByRole('button', { name: 'Salta' });
  if (await skip.isVisible().catch(() => false)) await skip.click();
});

test('encodes the default input to Base64 on the transform tab', async ({
  page,
}) => {
  await expect(page.getByText('V2ViRmFuZw==')).toBeVisible();
});

test('composes a recipe and shows a final output', async ({ page }) => {
  await page.getByRole('tab', { name: 'Componi' }).click();
  await page.getByRole('button', { name: /Aggiungi passaggio/ }).click();
  await expect(page.getByText('Output finale')).toBeVisible();
});

test('the wizard routes to the chosen XSS context', async ({ page }) => {
  await page.getByRole('button', { name: 'Non so cosa mi serve' }).click();
  await page.getByRole('button', { name: 'SVG' }).click();
  await expect(
    page.getByText('<svg onload=alert(document.domain)>'),
  ).toBeVisible();
});

test('the regex tester runs in a worker and shows matches', async ({
  page,
}) => {
  await page.getByRole('tab', { name: 'Regex' }).click();
  // default pattern matches the two emails in the default test string
  await expect(page.getByText('test@example.com')).toBeVisible();
  await expect(page.getByText(/2 match/)).toBeVisible();
});
