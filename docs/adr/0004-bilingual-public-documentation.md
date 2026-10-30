# ADR 0004 — Documentation language policy: bilingual public docs, English engineering

- Status: accepted
- Date: 2026-10-30
- Deciders: Growth & Delivery (owner); reviewers: Product & AppSec
- Related: project.md header; README.md / README.it.md

## Context

The project targets both an international audience and an Italian-speaking one, and
must stay consistent with the other repositories in this account, which publish
bilingual public documentation.

## Decision

- **Public-facing documents are bilingual (English + Italian):** `README`,
  `CONTRIBUTING`, `SECURITY`, `CODE_OF_CONDUCT` and the `docs/presentation/` pages.
  English is the primary file; the Italian variant is kept semantically aligned.
- **Engineering material is English:** `project.md`, ADRs and inline code docs. The
  runtime UI is bilingual IT/EN as a product feature (i18n catalogues).
- **Exception:** `roadmap.md` is authored and maintained in Italian by the project
  owner, as the authoritative project document. Its engineering-facing summary is
  `project.md` (English).

Update English first, then align Italian. Translations must not introduce product
promises that differ between languages.

## Consequences

- Positive: reach and consistency with the rest of the account.
- Negative: double maintenance for public docs; mitigated by keeping them concise
  and by "English-first, then align".
