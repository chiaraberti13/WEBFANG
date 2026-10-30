// Contratto dati testo/byte di WebFang — punto di ingresso unico di `core`.
export type {
  Encoding,
  WfValue,
  ValueKind,
  ProduceKind,
  OperationCategory,
  ReportSeverity,
  ReportField,
  Report,
  WfResult,
  ExecutionLimits,
  RunContext,
  Operation,
} from './types.ts';

export {
  WfError,
  isWfError,
  type WfErrorCode,
  type WfErrorParams,
} from './errors.ts';

export {
  text,
  bytes,
  textToBytes,
  bytesToText,
  asBytes,
  asText,
} from './encoding.ts';

export { runOperation, DEFAULT_LIMITS } from './engine.ts';
