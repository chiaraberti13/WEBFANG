import { z } from 'zod';
import type { Operation, WfResult, WfValue } from '../core/index.ts';
import { asText, text } from '../core/index.ts';

/**
 * HTML entity encode/decode su TESTO. L'encode fa escaping dei cinque caratteri
 * significativi in HTML; è il contesto "HTML body/attributo" dell'output encoding.
 * Il decode risolve le entità nominate comuni e quelle numeriche (&#n; / &#xH;).
 */

const NAMED_TO_CHAR: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
};

const CHAR_TO_ENTITY: ReadonlyArray<readonly [string, string]> = [
  ['&', '&amp;'],
  ['<', '&lt;'],
  ['>', '&gt;'],
  ['"', '&quot;'],
  ["'", '&#39;'],
];

export function htmlEncode(value: string): string {
  let out = value;
  for (const [char, entity] of CHAR_TO_ENTITY) {
    out = out.split(char).join(entity);
  }
  return out;
}

export function htmlDecode(value: string): string {
  return value.replace(
    /&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g,
    (match, body: string) => {
      if (body[0] === '#') {
        const isHex = body[1] === 'x' || body[1] === 'X';
        const code = parseInt(body.slice(isHex ? 2 : 1), isHex ? 16 : 10);
        if (Number.isNaN(code) || code < 0 || code > 0x10ffff) return match;
        try {
          return String.fromCodePoint(code);
        } catch {
          return match;
        }
      }
      const named = NAMED_TO_CHAR[body.toLowerCase()];
      return named ?? match;
    },
  );
}

const noParams = z.object({});
type NoParams = z.infer<typeof noParams>;

export const htmlEncodeOp: Operation<NoParams> = {
  id: 'html-encode',
  category: 'transform',
  accepts: ['text', 'bytes'],
  produces: 'text',
  paramsSchema: noParams,
  run(input: WfValue): WfResult {
    return text(htmlEncode(asText(input)));
  },
};

export const htmlDecodeOp: Operation<NoParams> = {
  id: 'html-decode',
  category: 'transform',
  accepts: ['text'],
  produces: 'text',
  paramsSchema: noParams,
  run(input: WfValue): WfResult {
    const source = input.kind === 'text' ? input.value : '';
    return text(htmlDecode(source));
  },
};
