import { z } from 'zod';
import type { Operation, WfResult, WfValue } from '../core/index.ts';
import { asBytes, bytes, text, WfError } from '../core/index.ts';

/**
 * Base64 / Base64URL sul contratto a BYTE (vedi ADR 0005): l'encode parte sempre
 * dai byte del valore, il decode produce byte. Implementazione pura e deterministica,
 * senza `atob`/`btoa` (niente trappole latin1), testabile in Node, browser e worker.
 *
 * Riferimento: RFC 4648 — https://datatracker.ietf.org/doc/html/rfc4648
 */

const STD = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const URL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

function decodeTable(alphabet: string): Int16Array {
  const table = new Int16Array(128).fill(-1);
  for (let i = 0; i < alphabet.length; i++) {
    table[alphabet.charCodeAt(i)] = i;
  }
  return table;
}

const STD_TABLE = decodeTable(STD);
const URL_TABLE = decodeTable(URL);

export interface Base64Options {
  urlSafe?: boolean;
  padding?: boolean;
}

/** Codifica byte in una stringa Base64 (standard o URL-safe). */
export function base64Encode(
  input: Uint8Array,
  options: Base64Options = {},
): string {
  const { urlSafe = false, padding = !urlSafe } = options;
  const alphabet = urlSafe ? URL : STD;
  let out = '';

  for (let i = 0; i < input.length; i += 3) {
    const b0 = input[i] ?? 0;
    const b1 = input[i + 1] ?? 0;
    const b2 = input[i + 2] ?? 0;
    const triplet = (b0 << 16) | (b1 << 8) | b2;

    out += alphabet[(triplet >> 18) & 0x3f];
    out += alphabet[(triplet >> 12) & 0x3f];
    out += i + 1 < input.length ? alphabet[(triplet >> 6) & 0x3f] : '=';
    out += i + 2 < input.length ? alphabet[triplet & 0x3f] : '=';
  }

  if (!padding) out = out.replace(/=+$/, '');
  return out;
}

/** Decodifica una stringa Base64 (standard o URL-safe) in byte. */
export function base64Decode(
  input: string,
  options: Base64Options = {},
): Uint8Array {
  const { urlSafe = false } = options;
  const table = urlSafe ? URL_TABLE : STD_TABLE;
  const clean = input.replace(/=+$/, '').replace(/\s+/g, '');

  const out = new Uint8Array((clean.length * 3) >> 2);
  let acc = 0;
  let bits = 0;
  let p = 0;

  for (let i = 0; i < clean.length; i++) {
    const code = clean.charCodeAt(i);
    const value = code < 128 ? table[code] : undefined;
    if (value === undefined || value < 0) {
      throw new WfError('DECODE_FAILED', { char: clean[i] ?? '', pos: i });
    }
    acc = (acc << 6) | value;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      out[p++] = (acc >> bits) & 0xff;
    }
  }

  return out.slice(0, p);
}

// --- Operazioni conformi al contratto (dati, non logica sparsa) ---

const encodeParams = z.object({
  urlSafe: z.boolean().default(false),
  padding: z.boolean().optional(),
});
type EncodeParams = z.infer<typeof encodeParams>;

export const base64EncodeOp: Operation<EncodeParams> = {
  id: 'base64-encode',
  category: 'transform',
  accepts: ['text', 'bytes'],
  produces: 'text',
  paramsSchema: encodeParams,
  run(input: WfValue, params: EncodeParams): WfResult {
    const options: Base64Options =
      params.padding === undefined
        ? { urlSafe: params.urlSafe }
        : { urlSafe: params.urlSafe, padding: params.padding };
    return text(base64Encode(asBytes(input), options));
  },
};

const decodeParams = z.object({
  urlSafe: z.boolean().default(false),
});
type DecodeParams = z.infer<typeof decodeParams>;

export const base64DecodeOp: Operation<DecodeParams> = {
  id: 'base64-decode',
  category: 'transform',
  accepts: ['text'],
  produces: 'bytes',
  paramsSchema: decodeParams,
  run(input: WfValue, params: DecodeParams): WfResult {
    const source = input.kind === 'text' ? input.value : '';
    return bytes(base64Decode(source, { urlSafe: params.urlSafe }));
  },
};
