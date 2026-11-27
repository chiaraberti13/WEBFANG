import { bytesToText, type WfResult } from '../core/index.ts';

/** Rappresentazione di un WfResult pronta per la UI. */
export interface DisplayResult {
  text: string;
  byteLength: number;
  /** true se l'output a byte non è UTF-8 valido ed è mostrato in esadecimale. */
  binary: boolean;
  isReport: boolean;
}

function toHex(bytes: Uint8Array): string {
  let hex = '';
  for (let i = 0; i < bytes.length; i++) {
    hex += (bytes[i] ?? 0).toString(16).padStart(2, '0');
    if (i < bytes.length - 1) hex += ' ';
  }
  return hex;
}

/**
 * Converte un risultato in testo mostrabile. I byte vengono mostrati come UTF-8 se
 * validi, altrimenti come hex (con `binary: true`), senza mai fallire.
 */
export function formatResult(result: WfResult): DisplayResult {
  if (result.kind === 'report') {
    const lines = result.report.fields.map((f) => `${f.label}: ${f.value}`);
    const text = [result.report.title, ...lines].join('\n');
    return {
      text,
      byteLength: new TextEncoder().encode(text).length,
      binary: false,
      isReport: true,
    };
  }
  if (result.kind === 'text') {
    return {
      text: result.value,
      byteLength: new TextEncoder().encode(result.value).length,
      binary: false,
      isReport: false,
    };
  }
  try {
    const text = bytesToText(result.value);
    return {
      text,
      byteLength: result.value.length,
      binary: false,
      isReport: false,
    };
  } catch {
    return {
      text: toHex(result.value),
      byteLength: result.value.length,
      binary: true,
      isReport: false,
    };
  }
}
