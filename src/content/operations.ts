import { base64DecodeOp, base64EncodeOp } from '../lib/base64.ts';
import { asAnyOperation, type OperationMeta } from './types.ts';

/**
 * Registro delle operazioni di WebFang (dati dichiarativi).
 * Ogni voce porta: id, categoria, base i18n, l'operazione eseguibile, i parametri
 * esposti nella UI e i riferimenti di difesa (CWE/OWASP).
 */
export const OPERATIONS: readonly OperationMeta[] = [
  {
    id: 'base64-encode',
    category: 'encode',
    i18nBase: 'base64-encode',
    op: asAnyOperation(base64EncodeOp),
    booleanParams: [
      { name: 'urlSafe', labelKey: 'op.param.urlSafe', default: false },
    ],
    defense: { cwe: 'CWE-116', owasp: 'A03:2021' },
  },
  {
    id: 'base64-decode',
    category: 'encode',
    i18nBase: 'base64-decode',
    op: asAnyOperation(base64DecodeOp),
    booleanParams: [
      { name: 'urlSafe', labelKey: 'op.param.urlSafe', default: false },
    ],
    defense: { cwe: 'CWE-20', owasp: 'A03:2021' },
  },
];

export const OPERATION_BY_ID: ReadonlyMap<string, OperationMeta> = new Map(
  OPERATIONS.map((op) => [op.id, op]),
);
