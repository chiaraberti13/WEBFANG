import { z } from 'zod';
import type { Operation, WfResult, WfValue } from '../core/index.ts';
import { asText, text, WfError } from '../core/index.ts';

/**
 * Percent-encoding (URL encoding) su TESTO. `encodeURIComponent` produce la forma
 * UTF-8 percent-encoded; la variante "doppia" applica due passaggi, utile a capire
 * i bypass da doppio decode (reverse proxy vs backend).
 *
 * Riferimento: `encodeURIComponent` (MDN)
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
 */

export function urlEncode(value: string, times = 1): string {
  let out = value;
  for (let i = 0; i < times; i++) out = encodeURIComponent(out);
  return out;
}

export function urlDecode(value: string, times = 1): string {
  let out = value;
  for (let i = 0; i < times; i++) {
    try {
      out = decodeURIComponent(out);
    } catch {
      throw new WfError('DECODE_FAILED', { step: i + 1 });
    }
  }
  return out;
}

const encodeParams = z.object({ double: z.boolean().default(false) });
type EncodeParams = z.infer<typeof encodeParams>;

export const urlEncodeOp: Operation<EncodeParams> = {
  id: 'url-encode',
  category: 'transform',
  accepts: ['text', 'bytes'],
  produces: 'text',
  paramsSchema: encodeParams,
  run(input: WfValue, params: EncodeParams): WfResult {
    return text(urlEncode(asText(input), params.double ? 2 : 1));
  },
};

const decodeParams = z.object({ double: z.boolean().default(false) });
type DecodeParams = z.infer<typeof decodeParams>;

export const urlDecodeOp: Operation<DecodeParams> = {
  id: 'url-decode',
  category: 'transform',
  accepts: ['text'],
  produces: 'text',
  paramsSchema: decodeParams,
  run(input: WfValue, params: DecodeParams): WfResult {
    const source = input.kind === 'text' ? input.value : '';
    return text(urlDecode(source, params.double ? 2 : 1));
  },
};
