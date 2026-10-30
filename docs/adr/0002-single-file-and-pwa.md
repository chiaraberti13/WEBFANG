# ADR 0002 — Two build variants: single-file HTML and offline PWA

- Status: accepted
- Date: 2026-10-30
- Deciders: Frontend & DX (owner); reviewers: Product & AppSec (CSP)
- Related: project.md §14; roadmap.md §"Nodi tecnici da risolvere subito"

## Context

Two delivery modes are required:

1. a **single HTML file** usable from `file://` (isolated VMs during on-premises
   pentests, no server), and
2. an **installable, offline PWA** for day-to-day use.

The riskiest technical nodes (roadmap "Nodi tecnici") are: Web Workers inside a
single-file build, execution from `file://` (Workers + WebCrypto + WASM + CSP),
and heavy-input handling. These are Phase 0 feasibility items, not polish.

## Decision

A single codebase produces both variants, selected by `BUILD_TARGET`:

- Default build: `vite-plugin-pwa` (service worker, offline precache).
- `BUILD_TARGET=singlefile`: `vite-plugin-singlefile`, PWA disabled, everything
  inlined; output to `dist-singlefile/`.

**Workers are imported with Vite's `?worker&inline`**, which embeds them via a
`Blob` URL. This is exactly the manual `Blob` + `URL.createObjectURL` approach the
roadmap describes, handled by the bundler, so workers function both in the
single-file build and from `file://`. `base: './'` keeps all paths relative.

A strict **CSP** is declared in `index.html` (and, in production, in `vercel.json`):
`script-src 'self' 'wasm-unsafe-eval'` (WASM for `hash-wasm`, not JS `eval`),
`worker-src 'self' blob:`, `connect-src 'self' data: blob:`, `object-src 'none'`.

## Consequences

- Positive: one codebase, two artefacts; no bespoke worker build step.
- Positive: `file://` constraints are respected by construction (relative paths,
  inlined workers, no third-party runtime assets).
- Negative: the single-file artefact is large (everything inlined); acceptable for
  its use case. Phase 0 verifies Workers + WebCrypto + WASM + CSP under `file://`.
