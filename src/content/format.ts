import { isWfError } from '../core/index.ts';
import { translate, type Lang } from '../i18n/index.ts';

/**
 * Rende un errore in testo leggibile e tradotto. Un WfError porta `code` + `params`
 * → chiave `err.<code>` con interpolazione; qualunque altro errore → `err.unknown`.
 * Non mostra mai uno stack trace nella UI.
 */
export function translateError(lang: Lang, error: unknown): string {
  if (isWfError(error)) {
    return translate(lang, `err.${error.code}`, error.params);
  }
  return translate(lang, 'err.unknown');
}
