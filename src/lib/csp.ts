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
 * Analizza una Content-Security-Policy (famiglia analyze → report). Elenca le
 * direttive ed evidenzia le debolezze comuni: `unsafe-inline`/`unsafe-eval`,
 * sorgenti jolly `*`, e l'assenza di `default-src`/`object-src`. Solo ispezione.
 *
 * Riferimento: CSP Level 3 (W3C).
 */
export interface CspDirective {
  name: string;
  sources: string[];
}

export function parseCsp(header: string): CspDirective[] {
  const directives = header
    .split(';')
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
    .map((part) => {
      const tokens = part.split(/\s+/);
      return {
        name: (tokens[0] ?? '').toLowerCase(),
        sources: tokens.slice(1),
      };
    })
    .filter((directive) => directive.name.length > 0);
  if (directives.length === 0) throw new WfError('INVALID_INPUT', {});
  return directives;
}

export function cspReport(directives: CspDirective[]): Report {
  const fields: ReportField[] = [];
  const names = new Set<string>();

  for (const directive of directives) {
    const joined = directive.sources.join(' ');
    if (names.has(directive.name)) {
      fields.push({
        label: directive.name,
        value: joined ? `ignorata / ignored: ${joined}` : 'ignorata / ignored',
        severity: 'warn',
      });
      continue;
    }
    names.add(directive.name);

    const unsafe = directive.sources.some((source) => {
      const keyword = source.toLowerCase();
      return keyword === "'unsafe-inline'" || keyword === "'unsafe-eval'";
    });
    const wildcard = directive.sources.includes('*');
    fields.push({
      label: directive.name,
      value: joined || '(nessuna sorgente / no sources)',
      severity: unsafe ? 'danger' : wildcard ? 'warn' : 'info',
    });
  }

  if (!names.has('default-src')) {
    fields.push({
      label: 'default-src',
      value: 'assente / missing',
      severity: 'warn',
    });
  }
  if (!names.has('object-src')) {
    fields.push({
      label: 'object-src',
      value: "assente / missing (consigliato 'none')",
      severity: 'warn',
    });
  }

  return { title: 'Content-Security-Policy', fields };
}

const noParams = z.object({});
type NoParams = z.infer<typeof noParams>;

export const cspAnalyzeOp: Operation<NoParams> = {
  id: 'csp-analyze',
  category: 'analyze',
  accepts: ['text'],
  produces: 'report',
  run(input: WfValue): WfResult {
    const header = input.kind === 'text' ? input.value : '';
    if (header.trim() === '') throw new WfError('INVALID_INPUT', {});
    return { kind: 'report', report: cspReport(parseCsp(header)) };
  },
  paramsSchema: noParams,
};
