/**
 * Errori strutturati e traducibili (vedi roadmap: "Errori strutturati").
 *
 * Un errore non è mai una stack trace mostrata in UI: è un codice stabile più
 * parametri, che il livello i18n risolve in testo IT/EN.
 */

/** Codici errore stabili. Il catalogo i18n mappa code → messaggio IT/EN. */
export type WfErrorCode =
  | 'INPUT_TOO_LARGE'
  | 'OUTPUT_TOO_LARGE'
  | 'TIMEOUT'
  | 'ABORTED'
  | 'DECODE_FAILED'
  | 'ENCODE_FAILED'
  | 'INVALID_PARAMS'
  | 'UNSUPPORTED_INPUT_KIND'
  | 'UNKNOWN_OPERATION'
  | 'INVALID_INPUT';

/** Parametri interpolabili nel messaggio tradotto (solo valori primitivi). */
export type WfErrorParams = Record<string, string | number>;

/**
 * Errore di dominio di WebFang. `message` porta il codice (utile nei log/test);
 * la UI mostra sempre la traduzione di `code` + `params`, mai `message` grezzo.
 */
export class WfError extends Error {
  readonly code: WfErrorCode;
  readonly params: WfErrorParams;

  constructor(code: WfErrorCode, params: WfErrorParams = {}) {
    super(code);
    this.name = 'WfError';
    this.code = code;
    this.params = params;
  }
}

/** True se `value` è un WfError (type guard sicuro oltre i confini async). */
export function isWfError(value: unknown): value is WfError {
  return value instanceof WfError;
}
