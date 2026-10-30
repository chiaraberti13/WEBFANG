# ADR 0005 — The text/byte data contract precedes the UI

- Status: accepted
- Date: 2026-10-30
- Deciders: Frontend & DX + Product & AppSec (owners)
- Related: project.md §10–§12; roadmap.md §"Modello dati"; `src/core`

## Context

Base64, hashing and compression operate on **bytes**; treating everything as
strings produces ambiguous or wrong results (e.g. Base64 of binary data, or a hash
of non-UTF-8 input). The roadmap makes the data contract a Phase 0 prerequisite,
before the UI is widened.

## Decision

Define the contract in `src/core` before building operations or UI:

- `WfValue` is explicitly `{ kind: 'text', encoding }` or `{ kind: 'bytes' }`;
  conversions are explicit and declared (`src/core/encoding.ts`).
- Three operation families with distinct contracts: `transform` (`WfValue →
  WfValue`), `analyze` (`WfValue → report`), `generate` (`params → WfValue`).
- Operation parameters are validated with Zod; out-of-schema input → structured
  error.
- Errors are structured and translatable (`{ code, params }` → IT/EN); never a
  stack trace in the UI.
- Execution is bounded (input/output size, time) and cancellable (`AbortSignal`);
  a stale result must never overwrite a newer one.
- The recipe format is versioned with migrations, so saved links do not break.

## Consequences

- Positive: operations are pure and unit-testable; correctness of binary-oriented
  operations is guaranteed by construction.
- Positive: adding a payload/operation is adding data conforming to the contract,
  not ad-hoc code.
- Negative: slightly more ceremony per operation (declare `accepts`/`produces`,
  schema); this is the point — it prevents silent type errors.
