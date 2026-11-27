import { z } from 'zod';
import type {
  Operation,
  Report,
  ReportField,
  WfResult,
  WfValue,
} from '../core/index.ts';
import { bytesToText, WfError } from '../core/index.ts';
import { base64Decode } from './base64.ts';

/**
 * Ispezione (NON verifica) di un JWT. Decodifica header e payload e li presenta
 * come report. Distingue sempre la DECODIFICA dalla VERIFICA: WebFang non valida
 * la firma né scadenza/issuer/audience; `alg:none` è evidenziato come caso a sé.
 *
 * Riferimento: RFC 7519 (JWT). Per verificare davvero un token servono la chiave
 * e una libreria dedicata (es. `jose`), con allowlist degli algoritmi.
 */

function decodeSegment(segment: string): Record<string, unknown> {
  const json = bytesToText(base64Decode(segment, { urlSafe: true }));
  const value: unknown = JSON.parse(json);
  if (!value || typeof value !== 'object') {
    throw new WfError('INVALID_INPUT', {});
  }
  return value as Record<string, unknown>;
}

function formatClaim(key: string, value: unknown): ReportField {
  if (
    (key === 'exp' || key === 'iat' || key === 'nbf') &&
    typeof value === 'number'
  ) {
    const date = new Date(value * 1000).toISOString();
    if (key === 'exp') {
      const expired = value * 1000 < Date.now();
      return {
        label: key,
        value: `${value} — ${date}${expired ? ' (scaduto / expired)' : ''}`,
        severity: expired ? 'warn' : 'info',
      };
    }
    return { label: key, value: `${value} — ${date}` };
  }
  return { label: key, value: JSON.stringify(value) };
}

export interface JwtInspection {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signaturePresent: boolean;
}

export function inspectJwt(token: string): JwtInspection {
  const parts = token.trim().split('.');
  if (parts.length < 2 || parts.length > 3 || !parts[0] || !parts[1]) {
    throw new WfError('INVALID_INPUT', {});
  }
  return {
    header: decodeSegment(parts[0]),
    payload: decodeSegment(parts[1]),
    signaturePresent: parts.length === 3 && (parts[2]?.length ?? 0) > 0,
  };
}

export function jwtReport(inspection: JwtInspection): Report {
  const fields: ReportField[] = [];
  const alg = inspection.header['alg'];

  fields.push({
    label: 'alg',
    value: typeof alg === 'string' ? alg : JSON.stringify(alg),
    severity: alg === 'none' ? 'danger' : 'info',
  });
  for (const [key, value] of Object.entries(inspection.header)) {
    if (key === 'alg') continue;
    fields.push({ label: `header.${key}`, value: JSON.stringify(value) });
  }
  for (const [key, value] of Object.entries(inspection.payload)) {
    fields.push(formatClaim(key, value));
  }
  fields.push({
    label: 'signature',
    value: inspection.signaturePresent
      ? 'present (non verificata / not verified)'
      : 'assente / absent',
    severity: inspection.signaturePresent ? 'info' : 'warn',
  });

  return { title: 'JWT', fields };
}

const noParams = z.object({});
type NoParams = z.infer<typeof noParams>;

export const jwtInspectOp: Operation<NoParams> = {
  id: 'jwt-inspect',
  category: 'analyze',
  accepts: ['text'],
  produces: 'report',
  paramsSchema: noParams,
  run(input: WfValue): WfResult {
    const token = input.kind === 'text' ? input.value : '';
    return { kind: 'report', report: jwtReport(inspectJwt(token)) };
  },
};
