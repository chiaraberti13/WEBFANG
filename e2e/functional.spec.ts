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

test('supports keyboard navigation between tool tabs', async ({ page }) => {
  const transform = page.getByRole('tab', { name: 'Trasforma' });
  const compose = page.getByRole('tab', { name: 'Componi' });
  const regex = page.getByRole('tab', { name: 'Regex' });

  await transform.focus();
  await page.keyboard.press('ArrowRight');
  await expect(compose).toBeFocused();
  await expect(compose).toHaveAttribute('aria-selected', 'true');
  await expect(transform).toHaveAttribute('tabindex', '-1');

  await page.keyboard.press('End');
  await expect(regex).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(transform).toBeFocused();
  await page.keyboard.press('ArrowLeft');
  await expect(regex).toBeFocused();
  await page.keyboard.press('Home');
  await expect(transform).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('tabpanel', { name: 'Trasforma' })).toBeFocused();
});

test('keeps the workbench and recipe in memory when switching tabs', async ({
  page,
}) => {
  const transform = page.getByRole('tab', { name: 'Trasforma' });
  const compose = page.getByRole('tab', { name: 'Componi' });
  const recipe = page.getByRole('tabpanel', { name: 'Componi' });
  const input = page.getByRole('textbox', { name: 'Input', exact: true });

  await input.fill('Test di sessione');
  await compose.click();
  await recipe.getByRole('button', { name: /Aggiungi passaggio/ }).click();
  await transform.click();
  await expect(input).toHaveValue('Test di sessione');
  await compose.click();
  await expect(recipe.getByText('Output finale')).toBeVisible();

  await page.reload();
  await expect(input).toHaveValue('WebFang');
});
