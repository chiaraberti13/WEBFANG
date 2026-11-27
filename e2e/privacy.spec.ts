import { test, expect } from '@playwright/test';

/**
 * Gate di privacy (roadmap): l'app non deve fare richieste di rete inattese.
 * Tutto ciò che non è l'origine locale, un data: o un blob: è un fallimento —
 * così una connessione a terze parti introdotta per errore rompe la CI.
 */
test('makes no unexpected network requests while in use', async ({ page }) => {
  const unexpected: string[] = [];
  page.on('request', (request) => {
    const url = request.url();
    if (
      url.startsWith('http://127.0.0.1:4173') ||
      url.startsWith('data:') ||
      url.startsWith('blob:')
    ) {
      return;
    }
    unexpected.push(url);
  });

  await page.goto('/');
  const skip = page.getByRole('button', { name: 'Salta' });
  if (await skip.isVisible().catch(() => false)) await skip.click();

  // Exercise all three flows and the wizard.
  await page.getByRole('tab', { name: 'Componi' }).click();
  await page.getByRole('button', { name: /Aggiungi passaggio/ }).click();
  await page.getByRole('tab', { name: 'Contesto XSS' }).click();
  await page.getByRole('button', { name: 'Non so cosa mi serve' }).click();
  await page.getByRole('button', { name: 'URL / href' }).click();
  await page.getByRole('tab', { name: 'Payload' }).click();
  await page.getByRole('tab', { name: 'Trasforma' }).click();
  await page.waitForTimeout(500);

  expect(unexpected, unexpected.join('\n')).toEqual([]);
});
