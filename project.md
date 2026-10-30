# WebFang — project.md

> **Language:** source code, runtime UI strings and engineering specifications
> are maintained in English; the README and public-facing presentation,
> contribution and security documentation are bilingual (English and Italian);
> see [ADR 0004](docs/adr/0004-bilingual-public-documentation.md).
>
> **Status:** product specification; implementation is at the Phase 0 scaffold
> stage. The authoritative, detailed project document is [`roadmap.md`](roadmap.md)
> (authored in Italian); this file is its engineering-facing summary in the house
> specification format. Where the two differ in detail, `roadmap.md` is the source
> of truth for product scope and `project.md` for engineering structure.

---

## Table of contents

- Part A — Product: §1–§5
- Part B — Security and privacy: §6–§9
- Part C — Secure coding standard: §10–§12
- Part D — Legal & compliance: §13
- Part E — Engineering: §14–§17
- Part F — Design system: §18–§19
- Part G — Team & role perspectives: §20
- Part H — Delivery: §21–§22

---

# PART A — PRODUCT

## 1. What WebFang is

WebFang is an open-source, client-side "offensive web" toolkit. Its identity is a
single idea, not a long operation list: **context → transformation → defense**.
For every step the product always shows four things: what the transformation does,
where it is relevant and its prerequisites, what it does _not_ prove, and how to
defend (with a safe example and a CWE/OWASP reference).

## 2. Problem statement and positioning

General-purpose client-side toolkits (e.g. CyberChef) are broad but generalist.
The open niche is an **offensive-web-security-focused** toolkit with contextual
payloads, interactive cheat-sheets **and a beginner mode**. WebFang targets that
niche. See `roadmap.md` §"Ricerca di settore" and §"Proposta di valore unica".

## 3. Users

- **Bug-bounty hunter / pentester** — speed; builds, tries and saves recipes.
- **Web-security student** — needs the _why_, the _context_ and the _defense_.
- **Back-end developer (non-specialist)** — decodes a JWT or an odd encoding and
  copies the correct fix into their stack.

## 4. Scope (MVP, restricted to three flows)

1. **Understand a string** — Base64/Base64URL, URL-encode (single/double), HTML
   entities, Hex, SHA-256.
2. **Compose transformations** — recipe engine, accessible reordering, per-step
   intermediate results, undo/redo, shareable compressed URL with fallback,
   validated JSON import/export.
3. **Understand an XSS context** — didactic examples per context with
   prerequisites and contextual defense.

Plus cross-cutting essentials: safe-by-default sharing, copy output, IT/EN i18n,
light/dark theme, onboarding and the "I don't know what I need" wizard. Deferred
work (JWT Workbench, extended payload packs, HTTP toolkit, regex tester, CyberChef
importer, Defense Playground) is tracked in `roadmap.md`.

## 5. Non-goals

No weaponized exploits (no C2, no ready shells, no evasion-for-abuse). Payloads are
didactic and inert. A generated payload is never presented as proof of a
vulnerability.

---

# PART B — SECURITY AND PRIVACY

## 6. Privacy promise

Input, tokens and keys are processed locally and are not transmitted to remote
services. No third-party font, script or asset is loaded at runtime. No input, JWT
or key is persisted by default; only preferences and explicitly saved recipes are.
A "clear local data" control is always reachable. An automated test fails CI if the
app attempts an unexpected network connection.

## 7. Shared-link safety

By default only non-sensitive operations and parameters are serialized into
`#recipe=`. Including the input requires explicit consent with a preview. Keys and
secrets are never serialized.

## 8. Threat model

Protects the user (input/secrets must not leave the browser) and the app (must not
be used against whoever opens it). Critical inputs: user input, imported recipes
(JSON), the URL fragment, future community content. Adversaries: hostile
recipes/URLs, malicious community content, self-XSS.

## 9. AppSec measures

The UI never executes payloads (render as text; DOMPurify only where HTML preview
is required). Strict CSP, no un-hashed inline scripts, no `eval`. Regex/heavy work
in a worker with timeout and input/output limits (anti-ReDoS). Decompressed-size
limits (anti-zip-bomb). Pinned dependencies and install-script hardening.

---

# PART C — SECURE CODING STANDARD

## 10. Text/byte data contract

Every value is explicitly text or bytes; conversions are explicit and declared
(`src/core`). Encoding is declared (UTF-8 default); decode errors are handled, never
silent. See [ADR 0005](docs/adr/0005-text-byte-contract.md).

## 11. Validation and errors

Operation parameters are validated with Zod; out-of-schema input yields a structured
error. Errors are structured and translatable (`{ code, params }` → IT/EN); no stack
traces in the UI.

## 12. Limits and cancellation

Input size, execution time and output size are bounded. In-flight work is cancellable
(`AbortSignal`); a stale result must never overwrite a newer one.

---

# PART D — LEGAL & COMPLIANCE

## 13. Licence and ethics

Distributed under **GPL-3.0-only** (`LICENSE`), consistent with the other
repositories in this account. An always-visible disclaimer states that payloads are
for authorized testing, CTF and study. `SECURITY.md` documents scope and reporting.
Every attack ships with its defense; payloads are inert and non-destructive.

---

# PART E — ENGINEERING

## 14. Stack

TypeScript, React 19, Vite, Tailwind CSS, Zustand, Zod, Vitest. Two build variants:
normal (PWA, offline) and single-file (one HTML, runnable from `file://`). See
[ADR 0001](docs/adr/0001-stack.md) and [ADR 0002](docs/adr/0002-single-file-and-pwa.md).

## 15. Architecture principles

Pure logic separated from the UI; each operation is a function tested on its own and
conforming to the data contract. Adding a payload means adding **data**, not code.
Heavy operations run in Web Workers, terminated on timeout. Determinism: same input +
same recipe = same output. No backend, no invasive telemetry, no third-party runtime
assets.

## 16. Quality gates (CI)

ESLint (with no-`eval`/no-`any` AppSec rules), strict TypeScript, Prettier, Vitest
(coverage threshold on `lib`/`core`), build (including single-file). See
[ADR 0003](docs/adr/0003-lint-and-format.md).

## 17. Repository layout

```
src/core/       data contract (text/bytes), structured errors, abort, limits
src/lib/        pure, testable operations (encode, hash, …) + tests
src/recipes/    declarative operations/payloads (data) + URL serialize + migrate
src/content/    didactic Attack/Defense content + remediation snippets (data)
src/components/ UI (RecipeBoard, OperationCard, DefensePanel, Wizard, …)
src/workers/    heavy compute (hash, regex), inlined for single-file
src/i18n/       IT/EN catalogues
```

---

# PART F — DESIGN SYSTEM

## 18. Identity

"Workshop / forge" metaphor: a three-column table (Input · Recipe · Output), tools
as instruments, the Defense panel always visible next to the selected step. Dark
theme by default, warm amber/bronze accents. Shared design tokens (colour, spacing,
typography); grotesque UI type + monospace for input/output.

## 19. Accessibility

Target WCAG 2.1 AA: verified contrast, complete keyboard navigation (including recipe
reordering, not only drag & drop), `aria-*`, visible focus, meaning never by colour
alone, `prefers-reduced-motion`, responsive at 390 px and 768 px. Automated (axe)
and manual checks before each release.

---

# PART G — TEAM & ROLE PERSPECTIVES

## 20. Three realistic hats

1. **Product & AppSec** — offensive security, remediation, didactic content,
   payload correctness/legality.
2. **Frontend & DX** — React, state, UI/UX, A11y, Web Workers, single-file build,
   data contract, PWA.
3. **Growth & Delivery** — CI/CD, Vercel deploy, SEO, docs, community.

The full per-discipline checklist lives in `roadmap.md` (appendix).

---

# PART H — DELIVERY

## 21. Roadmap (feasibility-first)

Phase 0 (feasibility + scaffolding) → Phase 1 (vertical slice) → Phase 2 (restricted
MVP) → Phase 3 (user validation) → Phase 4 (expansion to v1.0) → Growth. Each phase
has a responsible hat, dependencies and an exit gate. Full detail in
[`roadmap.md`](roadmap.md).

## 22. Workflow and hosting

GitHub Flow: protected `main`, feature branches, PR with green CI and one review,
squash merge, Conventional Commits + SemVer + changelog. Hosting on Vercel
(production on `main`, preview deploy per PR); single-file and PWA remain available
regardless of host.
