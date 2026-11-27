import { z } from 'zod';
import type { Operation, WfResult, WfValue } from '../core/index.ts';
import { asBytes, bytes, text, WfError } from '../core/index.ts';

/**
 * Hex encode/decode sul contratto a BYTE. L'encode rappresenta ogni byte come due
 * cifre esadecimali; il decode accetta spazi/whitespace e richiede lunghezza pari
 * e cifre valide, altrimenti errore esplicito.
 */

export function hexEncode(input: Uint8Array, separator = ''): string {
  let out = '';
  for (let i = 0; i < input.length; i++) {
    out += (input[i] ?? 0).toString(16).padStart(2, '0');
    if (separator && i < input.length - 1) out += separator;
  }
  return out;
}

export function hexDecode(value: string): Uint8Array {
  const clean = value.replace(/\s+/g, '');
  if (clean.length % 2 !== 0) {
    throw new WfError('DECODE_FAILED', { reason: 'odd-length' });
  }
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) {
    const byte = parseInt(clean.substr(i * 2, 2), 16);
    if (Number.isNaN(byte)) {
      throw new WfError('DECODE_FAILED', { pos: i * 2 });
    }
    out[i] = byte;
  }
  return out;
}

const encodeParams = z.object({ spaced: z.boolean().default(false) });
type EncodeParams = z.infer<typeof encodeParams>;

export const hexEncodeOp: Operation<EncodeParams> = {
  id: 'hex-encode',
  category: 'transform',
  accepts: ['text', 'bytes'],
  produces: 'text',
  paramsSchema: encodeParams,
  run(input: WfValue, params: EncodeParams): WfResult {
    return text(hexEncode(asBytes(input), params.spaced ? ' ' : ''));
  },
};

const noParams = z.object({});
type NoParams = z.infer<typeof noParams>;

export const hexDecodeOp: Operation<NoParams> = {
  id: 'hex-decode',
  category: 'transform',
  accepts: ['text'],
  produces: 'bytes',
  paramsSchema: noParams,
  run(input: WfValue): WfResult {
    const source = input.kind === 'text' ? input.value : '';
    return bytes(hexDecode(source));
  },
};
