/// <reference lib="webworker" />

/**
 * Worker di prova di fattibilità (roadmap, nodo tecnico #2 e #3).
 *
 * Dimostra che un Web Worker INLINE (importato con `?worker&inline`, quindi
 * incorporato via Blob) funziona anche nella build single-file e da `file://`,
 * e che WebCrypto è disponibile nel contesto del worker. Calcola SHA-256 dei
 * byte ricevuti e restituisce l'hex.
 */

export interface FeasibilityRequest {
  id: number;
  bytes: Uint8Array;
}

export interface FeasibilityResponse {
  id: number;
  sha256: string;
  wasmSupported: boolean;
}

function toHex(buffer: ArrayBuffer): string {
  const view = new Uint8Array(buffer);
  let hex = '';
  for (let i = 0; i < view.length; i++) {
    hex += (view[i] ?? 0).toString(16).padStart(2, '0');
  }
  return hex;
}

self.onmessage = (event: MessageEvent<FeasibilityRequest>) => {
  const { id, bytes } = event.data;
  void (async () => {
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    const response: FeasibilityResponse = {
      id,
      sha256: toHex(digest),
      wasmSupported: typeof WebAssembly === 'object',
    };
    (self as DedicatedWorkerGlobalScope).postMessage(response);
  })();
};
