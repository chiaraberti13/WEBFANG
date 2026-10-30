# Development status

[English](development-status.md) · [Italiano](development-status.it.md)

> **Early development — scaffold stage.** Do not infer runtime security or feature
> coverage from scaffold checks.

## Exists today

- The **text/byte data contract** (`src/core`): explicit text vs bytes, declared
  encoding, structured translatable errors, execution limits and cancellation.
- Quality tooling: strict TypeScript, ESLint (AppSec rules), Prettier, Vitest.
- Supply-chain hardening: pinned tooling, `.npmrc` with disabled lifecycle scripts.
- A Vite + React 19 application shell with two build variants (PWA and single-file).
- Project documentation: specification, roadmap, ADRs, bilingual presentation.
- CI (lint, typecheck, format, test, build) and the managed-labels workflow.

## Not yet operational

- The recipe engine (compose, reorder, undo/redo, URL serialization).
- The transformation catalogue beyond the Phase 0/1 sample operations.
- The Defense panels, the XSS-context content and the guided mode / wizard.
- JWT Workbench, extended payload packs, HTTP toolkit, regex tester, CyberChef
  importer, Defense Playground (deferred — see the roadmap).

## Next

Phase 0 feasibility (worker-inline + `file://` + PWA + CSP) and the Phase 1 vertical
slice (Base64 end-to-end with a Defense panel) as the template for every other
operation. See [`roadmap.md`](../../roadmap.md).
