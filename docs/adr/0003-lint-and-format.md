# ADR 0003 — Lint and format: ESLint flat config + typescript-eslint, Prettier

- Status: accepted
- Date: 2026-10-30
- Deciders: Frontend & DX (owner); reviewers: Product & AppSec (SC rules)
- Related: project.md §16; ADR 0001

## Context

Linting must mechanically enforce AppSec rules so reviewers do not catch them by
eye: no `eval`/`new Function` (consistent with the no-`eval` CSP) and no `any` in
the data contract and operations.

This repository, unlike QUIVER (see that repo's ADR 0003), pins the **classic
TypeScript 5 compiler** (ADR 0001), not the native TypeScript 7 compiler. The
`typescript-eslint` parser is therefore fully compatible here and is the standard,
best-supported choice for a React/TS project. QUIVER adopted `@babel/eslint-parser`
only because its TS 7 pin made `typescript-eslint` abort; that constraint does not
apply to WebFang.

## Decision

Use **ESLint 9 (flat config)** with **`typescript-eslint`**, plus
`eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`. AppSec rules:

| Rule | Mechanism |
|---|---|
| no `eval` | core `no-eval`, `no-implied-eval`, `no-new-func` |
| no `any` | `@typescript-eslint/no-explicit-any: error` |

**Formatting:** Prettier (`.prettierrc`). `eslint-config-prettier` is applied last
to disable any stylistic rule that could conflict. Hand-maintained prose (`*.md`:
specification, roadmap, ADRs) is in `.prettierignore` so Prettier does not fight
its curated layout.

## Consequences

- Positive: standard, type-aware-capable tooling for the React/TS stack; AppSec
  rules enforced in CI (`pnpm lint`).
- Positive: Prettier and ESLint do not conflict (`eslint-config-prettier`).
- Note: the divergence from QUIVER's parser choice is intentional and documented
  here so the two repositories stay comparable without being identical where their
  compilers differ.

## Alternatives considered

- **`@babel/eslint-parser` (as in QUIVER).** Rejected: only needed under a TS 7
  pin, which WebFang does not use; it would forgo type-aware linting for no reason.
- **Biome / oxlint.** Faster, fewer dependencies, but not ESLint; the stack and
  ecosystem (React hooks rules) are standardized on ESLint. Revisit later.
