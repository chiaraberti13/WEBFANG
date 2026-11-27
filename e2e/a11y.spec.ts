import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const TABS = ['Trasforma', 'Componi', 'Contesto XSS', 'Payload'];

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  const skip = page.getByRole('button', { name: 'Salta' });
  if (await skip.isVisible().catch(() => false)) await skip.click();
});

for (const tab of TABS) {
  test(`no serious or critical WCAG 2 AA violations: ${tab}`, async ({
    page,
  }) => {
    await page.getByRole('tab', { name: tab }).click();
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    const blocking = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    );
    expect(
      blocking,
      blocking.map((v) => `${v.id} (${v.nodes.length})`).join(', '),
    ).toEqual([]);
  });
}
