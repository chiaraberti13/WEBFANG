import { base64DecodeOp, base64EncodeOp } from '../lib/base64.ts';
import { urlDecodeOp, urlEncodeOp } from '../lib/url.ts';
import { htmlDecodeOp, htmlEncodeOp } from '../lib/html-entities.ts';
import { hexDecodeOp, hexEncodeOp } from '../lib/hex.ts';
import { sha1Op, sha256Op, sha384Op, sha512Op } from '../lib/hash.ts';
import { jwtInspectOp } from '../lib/jwt.ts';
import { asAnyOperation, type OperationMeta } from './types.ts';

const urlSafeParam = {
  name: 'urlSafe',
  labelKey: 'op.param.urlSafe',
  default: false,
} as const;

/**
 * Registro delle operazioni di WebFang (dati dichiarativi). Ogni voce porta: id,
 * categoria, base i18n, operazione eseguibile, parametri esposti nella UI e
 * riferimenti di difesa (CWE/OWASP). Flusso 1 della roadmap: "capire una stringa".
 */
export const OPERATIONS: readonly OperationMeta[] = [
  {
    id: 'base64-encode',
    category: 'encode',
    i18nBase: 'base64-encode',
    op: asAnyOperation(base64EncodeOp),
    booleanParams: [urlSafeParam],
    defense: { cwe: 'CWE-116', owasp: 'A03:2021' },
  },
  {
    id: 'base64-decode',
    category: 'encode',
    i18nBase: 'base64-decode',
    op: asAnyOperation(base64DecodeOp),
    booleanParams: [urlSafeParam],
    defense: { cwe: 'CWE-20', owasp: 'A03:2021' },
  },
  {
    id: 'url-encode',
    category: 'encode',
    i18nBase: 'url-encode',
    op: asAnyOperation(urlEncodeOp),
    booleanParams: [
      { name: 'double', labelKey: 'op.param.double', default: false },
    ],
    defense: { cwe: 'CWE-116', owasp: 'A03:2021' },
  },
  {
    id: 'url-decode',
    category: 'encode',
    i18nBase: 'url-decode',
    op: asAnyOperation(urlDecodeOp),
    booleanParams: [
      { name: 'double', labelKey: 'op.param.double', default: false },
    ],
    defense: { cwe: 'CWE-20', owasp: 'A03:2021' },
  },
  {
    id: 'html-encode',
    category: 'encode',
    i18nBase: 'html-encode',
    op: asAnyOperation(htmlEncodeOp),
    booleanParams: [],
    defense: { cwe: 'CWE-79', owasp: 'A03:2021' },
  },
  {
    id: 'html-decode',
    category: 'encode',
    i18nBase: 'html-decode',
    op: asAnyOperation(htmlDecodeOp),
    booleanParams: [],
    defense: { cwe: 'CWE-20', owasp: 'A03:2021' },
  },
  {
    id: 'hex-encode',
    category: 'encode',
    i18nBase: 'hex-encode',
    op: asAnyOperation(hexEncodeOp),
    booleanParams: [
      { name: 'spaced', labelKey: 'op.param.spaced', default: false },
    ],
    defense: { cwe: 'CWE-116', owasp: 'A03:2021' },
  },
  {
    id: 'hex-decode',
    category: 'encode',
    i18nBase: 'hex-decode',
    op: asAnyOperation(hexDecodeOp),
    booleanParams: [],
    defense: { cwe: 'CWE-20', owasp: 'A03:2021' },
  },
  {
    id: 'sha-1',
    category: 'hash',
    i18nBase: 'sha-1',
    op: asAnyOperation(sha1Op),
    booleanParams: [],
    defense: { cwe: 'CWE-327', owasp: 'A02:2021' },
  },
  {
    id: 'sha-256',
    category: 'hash',
    i18nBase: 'sha-256',
    op: asAnyOperation(sha256Op),
    booleanParams: [],
    defense: { cwe: 'CWE-916', owasp: 'A02:2021' },
  },
  {
    id: 'sha-384',
    category: 'hash',
    i18nBase: 'sha-384',
    op: asAnyOperation(sha384Op),
    booleanParams: [],
    defense: { cwe: 'CWE-916', owasp: 'A02:2021' },
  },
  {
    id: 'sha-512',
    category: 'hash',
    i18nBase: 'sha-512',
    op: asAnyOperation(sha512Op),
    booleanParams: [],
    defense: { cwe: 'CWE-916', owasp: 'A02:2021' },
  },
  {
    id: 'jwt-inspect',
    category: 'analyze',
    i18nBase: 'jwt-inspect',
    op: asAnyOperation(jwtInspectOp),
    booleanParams: [],
    defense: { cwe: 'CWE-347', owasp: 'A02:2021' },
  },
];

export const OPERATION_BY_ID: ReadonlyMap<string, OperationMeta> = new Map(
  OPERATIONS.map((op) => [op.id, op]),
);
