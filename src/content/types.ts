import type { Operation } from '../core/index.ts';

/**
 * Metadati di catalogo di un'operazione: dati dichiarativi, non logica.
 * Aggiungere un'operazione = aggiungere una voce qui + i testi nei cataloghi i18n,
 * non scrivere nuova UI (vedi roadmap: "aggiungere un payload = aggiungere dati").
 */

export type OperationCategory = 'encode' | 'hash' | 'analyze' | 'generate';

/** Operazione con parametri type-erased, per raccoglierne di eterogenee nel registro. */
export type AnyOperation = Operation<Record<string, unknown>>;

/** Riferimenti standard alla difesa (mostrati nel pannello Difesa). */
export interface DefenseRef {
  /** es. 'CWE-116' */
  cwe?: string;
  /** es. 'A03:2021' (OWASP Top 10) */
  owasp?: string;
}

/**
 * Qualunque cosa abbia un pannello Difesa: un'operazione o un contesto XSS.
 * Chiavi i18n attese: `defense.<i18nBase>.{what,where,notProve,defense}`.
 */
export interface DefenseSubject {
  id: string;
  i18nBase: string;
  defense: DefenseRef;
}

/** Parametro booleano configurabile dall'utente (es. Base64 URL-safe). */
export interface BooleanParam {
  name: string;
  /** chiave i18n per l'etichetta */
  labelKey: string;
  default: boolean;
}

export interface OperationMeta {
  /** Coincide con Operation.id. */
  id: string;
  category: OperationCategory;
  /** Base delle chiavi i18n: `op.<id>.label`, `op.<id>.description`,
   *  `defense.<id>.{what,where,notProve,defense}`. */
  i18nBase: string;
  /** L'operazione eseguibile (i parametri sono validati da Zod a runtime). */
  op: AnyOperation;
  /** Parametri booleani esposti nella UI; i default compongono i params iniziali. */
  booleanParams: BooleanParam[];
  defense: DefenseRef;
}

/** Type-erasure sicura: i parametri restano validati a runtime dallo schema Zod. */
export function asAnyOperation<P>(op: Operation<P>): AnyOperation {
  return op as unknown as AnyOperation;
}

/** Params iniziali di un'operazione dai default dei suoi parametri booleani. */
export function defaultParams(meta: OperationMeta): Record<string, unknown> {
  const params: Record<string, unknown> = {};
  for (const p of meta.booleanParams) params[p.name] = p.default;
  return params;
}
