import type { Encoding, WfValue } from './types.ts';
import { WfError } from './errors.ts';

/**
 * Conversioni testo ⇄ byte, SEMPRE esplicite e dichiarate (vedi ADR 0005).
 *
 * Documentazione: `TextEncoder`/`TextDecoder` (MDN)
 * https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder
 */

const UTF8: Encoding = 'utf-8';

/** Costruisce un valore testuale con encoding dichiarato (default UTF-8). */
export function text(value: string, encoding: Encoding = UTF8): WfValue {
  return { kind: 'text', value, encoding };
}

/** Costruisce un valore a byte. */
export function bytes(value: Uint8Array): WfValue {
  return { kind: 'bytes', value };
}

/** Codifica una stringa in byte UTF-8. */
export function textToBytes(value: string): Uint8Array {
  return new TextEncoder().encode(value);
}

/**
 * Decodifica byte UTF-8 in stringa. `fatal: true` → errore esplicito su byte
 * non validi, mai una sostituzione silenziosa con U+FFFD.
 */
export function bytesToText(input: Uint8Array): string {
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(input);
  } catch {
    throw new WfError('DECODE_FAILED', { encoding: UTF8 });
  }
}

/** Ottiene i byte di un valore (il testo viene codificato nel suo encoding). */
export function asBytes(value: WfValue): Uint8Array {
  return value.kind === 'bytes' ? value.value : textToBytes(value.value);
}

/** Ottiene il testo di un valore (i byte vengono decodificati; può fallire). */
export function asText(value: WfValue): string {
  return value.kind === 'text' ? value.value : bytesToText(value.value);
}
