import { z } from 'zod';
import type {
  Operation,
  Report,
  ReportField,
  WfResult,
  WfValue,
} from '../core/index.ts';
import { WfError } from '../core/index.ts';

/**
 * Parser di un header `Set-Cookie` (famiglia analyze → report). Mostra nome,
 * valore e attributi, ed evidenzia i flag di sicurezza mancanti: HttpOnly, Secure
 * e SameSite. Non muta la catena: ispeziona soltanto.
 *
 * Riferimento: RFC 6265 (HTTP State Management).
 */
export interface ParsedCookie {
  name: string;
  value: string;
  attributes: Record<string, string | true>;
}

export function parseSetCookie(header: string): ParsedCookie {
  const parts = header
    .split(';')
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
  const first = parts[0];
  if (!first) throw new WfError('INVALID_INPUT', {});

  const eq = first.indexOf('=');
  const name = eq >= 0 ? first.slice(0, eq) : first;
  const value = eq >= 0 ? first.slice(eq + 1) : '';

  const attributes: Record<string, string | true> = {};
  for (const part of parts.slice(1)) {
    const i = part.indexOf('=');
    if (i >= 0) attributes[part.slice(0, i).toLowerCase()] = part.slice(i + 1);
    else attributes[part.toLowerCase()] = true;
  }
  return { name, value, attributes };
}

export function cookieReport(cookie: ParsedCookie): Report {
  const fields: ReportField[] = [
    { label: 'name', value: cookie.name },
    { label: 'value', value: cookie.value },
  ];

  const httpOnly = 'httponly' in cookie.attributes;
  const secure = 'secure' in cookie.attributes;
  const sameSite = cookie.attributes['samesite'];

  fields.push({
    label: 'HttpOnly',
    value: httpOnly ? 'present' : 'assente / missing',
    severity: httpOnly ? 'info' : 'warn',
  });
  fields.push({
    label: 'Secure',
    value: secure ? 'present' : 'assente / missing',
    severity: secure ? 'info' : 'warn',
  });
  fields.push({
    label: 'SameSite',
    value: typeof sameSite === 'string' ? sameSite : 'assente / missing',
    severity: typeof sameSite === 'string' ? 'info' : 'warn',
  });

  for (const key of ['domain', 'path', 'expires', 'max-age']) {
    const attr = cookie.attributes[key];
    if (typeof attr === 'string') fields.push({ label: key, value: attr });
  }

  return { title: 'Set-Cookie', fields };
}

const noParams = z.object({});
type NoParams = z.infer<typeof noParams>;

export const cookieInspectOp: Operation<NoParams> = {
  id: 'cookie-inspect',
  category: 'analyze',
  accepts: ['text'],
  produces: 'report',
  run(input: WfValue): WfResult {
    const header = input.kind === 'text' ? input.value : '';
    if (header.trim() === '') throw new WfError('INVALID_INPUT', {});
    return { kind: 'report', report: cookieReport(parseSetCookie(header)) };
  },
  paramsSchema: noParams,
};
