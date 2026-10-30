import type { ZodType, ZodTypeDef } from 'zod';

/**
 * Contratto dati testo/byte di WebFang (vedi roadmap: "Modello dati").
 *
 * Ogni valore che attraversa una ricetta è ESPLICITAMENTE testo o byte.
 * Base64, hashing e compressione lavorano sui byte: trattare tutto come
 * stringhe produce risultati ambigui o errati. La conversione è sempre
 * esplicita e dichiarata (vedi `core/encoding.ts`).
 */

/** Encoding dichiarato di un valore testuale. Default e unico supportato in Fase 0: UTF-8. */
export type Encoding = 'utf-8';

/** Un valore nella catena: o testo (con encoding dichiarato) o byte grezzi. */
export type WfValue =
  | { kind: 'text'; value: string; encoding: Encoding }
  | { kind: 'bytes'; value: Uint8Array };

/** Tipi di input/output ammessi. */
export type ValueKind = 'text' | 'bytes';

/** Cosa produce un'operazione: un valore che continua la catena, o un report. */
export type ProduceKind = 'text' | 'bytes' | 'report';

/**
 * Tre famiglie, tre contratti distinti:
 *  - transform: WfValue → WfValue
 *  - analyze:   WfValue → report (ispeziona, non muta la catena)
 *  - generate:  params → WfValue (nessun input obbligatorio)
 */
export type OperationCategory = 'transform' | 'analyze' | 'generate';

/** Severità di un campo di report (per la UI: info/attenzione/pericolo). */
export type ReportSeverity = 'info' | 'warn' | 'danger';

export interface ReportField {
  /** Chiave traducibile o etichetta già risolta. */
  label: string;
  value: string;
  severity?: ReportSeverity;
}

/** Output della famiglia `analyze`: struttura leggibile, non muta la catena. */
export interface Report {
  title: string;
  fields: ReportField[];
}

/** Risultato di un'operazione: un valore (text/bytes) oppure un report. */
export type WfResult = WfValue | { kind: 'report'; report: Report };

/** Limiti di esecuzione (anti-DoS: input, output, tempo). */
export interface ExecutionLimits {
  maxInputBytes: number;
  maxOutputBytes: number;
  timeoutMs: number;
}

/** Contesto passato a ogni `run`: annullamento + limiti. */
export interface RunContext {
  signal: AbortSignal;
  limits: ExecutionLimits;
}

/**
 * Metadati + logica di un'operazione. Aggiungere un'operazione o un payload
 * significa aggiungere DATI conformi a questo contratto, non codice sparso.
 */
export interface Operation<P = Record<string, unknown>> {
  /** Identificatore stabile, es. 'base64-encode'. */
  id: string;
  category: OperationCategory;
  /** Tipi di input ammessi (vuoto per i `generate` puri). */
  accepts: ValueKind[];
  produces: ProduceKind;
  /**
   * Schema validato dei parametri (Zod). Input fuori schema → errore strutturato.
   * L'input dello schema è `unknown` (i parametri arrivano non fidati da URL/JSON
   * e vengono convalidati); l'output tipizzato è `P`.
   */
  paramsSchema: ZodType<P, ZodTypeDef, unknown>;
  run(input: WfValue, params: P, ctx: RunContext): Promise<WfResult> | WfResult;
}
