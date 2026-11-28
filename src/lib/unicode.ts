import { z } from 'zod';
import type { Operation, WfResult, WfValue } from '../core/index.ts';
import { asText, text } from '../core/index.ts';

/**
 * Unicode escape/unescape su TESTO. L'escape produce sequenze `\uXXXX` (e `\u{…}`
 * per i code point astrali); l'unescape risolve `\uXXXX`, `\u{…}` e `\xXX`. È il
 * contesto "stringa JavaScript" (offuscamento/deoffuscamento di payload).
 */

export function unicodeEscape(value: string, all = false): string {
  let out = '';
  for (const ch of value) {
    const cp = ch.codePointAt(0) ?? 0;
    if (!all && cp >= 0x20 && cp <= 0x7e) {
      out += ch;
      continue;
    }
    out +=
      cp > 0xffff
        ? `\\u{${cp.toString(16)}}`
        : `\\u${cp.toString(16).padStart(4, '0')}`;
  }
  return out;
}

export function unicodeUnescape(value: string): string {
  return value
    .replace(/\\u\{([0-9a-fA-F]+)\}/g, (_match, hex: string) =>
      String.fromCodePoint(parseInt(hex, 16)),
    )
    .replace(/\\u([0-9a-fA-F]{4})/g, (_match, hex: string) =>
      String.fromCharCode(parseInt(hex, 16)),
    )
    .replace(/\\x([0-9a-fA-F]{2})/g, (_match, hex: string) =>
      String.fromCharCode(parseInt(hex, 16)),
    );
}

const escapeParams = z.object({ all: z.boolean().default(false) });
type EscapeParams = z.infer<typeof escapeParams>;

export const unicodeEscapeOp: Operation<EscapeParams> = {
  id: 'unicode-escape',
  category: 'transform',
  accepts: ['text', 'bytes'],
  produces: 'text',
  paramsSchema: escapeParams,
  run(input: WfValue, params: EscapeParams): WfResult {
    return text(unicodeEscape(asText(input), params.all));
  },
};

const noParams = z.object({});
type NoParams = z.infer<typeof noParams>;

export const unicodeUnescapeOp: Operation<NoParams> = {
  id: 'unicode-unescape',
  category: 'transform',
  accepts: ['text'],
  produces: 'text',
  paramsSchema: noParams,
  run(input: WfValue): WfResult {
    const source = input.kind === 'text' ? input.value : '';
    return text(unicodeUnescape(source));
  },
};
