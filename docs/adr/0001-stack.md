# ADR 0001 — Stack: TypeScript, React 19, Vite, Tailwind, Zustand, Zod, Vitest

- Status: accepted
- Date: 2026-10-30
- Deciders: Frontend & DX (owner); reviewers: Product & AppSec
- Related: project.md §14; roadmap.md §"Architettura tecnica e stack"

## Context

WebFang is a fully client-side single-page application that must also ship as a
single HTML file runnable from `file://` and be installable as an offline PWA. It
needs pure, individually testable transformation logic, strict typing for the
text/byte data contract, and a small, auditable dependency surface.

## Decision

- **Language:** TypeScript (strict, see `tsconfig.base.json`).
- **UI:** React 19.
- **Build:** Vite, with `vite-plugin-singlefile` and `vite-plugin-pwa` for the two
  variants (ADR 0002).
- **Styling:** Tailwind CSS (v4, via `@tailwindcss/vite`).
- **State:** Zustand with `persist` (preferences and explicitly saved recipes only).
- **Schema validation:** Zod for operation parameters and recipe import.
- **Tests:** Vitest (unit) and, later, Playwright (e2e).

Accepted Node.js lines: 22.x or 24.x; recommended exact version in `.nvmrc`.
Package manager: pnpm, pinned via `packageManager` and hardened in `.npmrc`,
consistent with the other repositories in this account.

## Consequences

- Positive: mature, well-documented tooling; pure logic is trivially unit-tested;
  the data contract is enforced by the type system.
- Positive: the two build variants come from one codebase (ADR 0002).
- Negative: React + Vite is heavier than a no-framework approach; justified by the
  interactive recipe board, wizard and defense panels.

## Alternatives considered

- **No framework / vanilla + Web Components.** Lighter, but the recipe board and
  guided flows benefit from React's component model and ecosystem.
- **pnpm monorepo (as in QUIVER).** Rejected for now: WebFang is a single
  deployable SPA, not a multi-package product; a monorepo would add ceremony with
  no current benefit. Revisit if a separate CLI or shared package emerges.
