// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { catalogKeys, translate } from './index.ts';

describe('translation catalogs', () => {
  it('provide the same keys and interpolation parameters in IT and EN', () => {
    const keys = catalogKeys('it');
    expect(keys.slice().sort()).toEqual(catalogKeys('en').sort());

    const placeholders = (message: string) =>
      [...message.matchAll(/\{\w+\}/g)].map(([token]) => token).sort();

    for (const key of keys) {
      expect(placeholders(translate('it', key)), key).toEqual(
        placeholders(translate('en', key)),
      );
    }
  });
});
