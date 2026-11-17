# Contributing to WebFang

This repository covers a client-side offensive web security toolkit that binds
every transformation to its context of use and its defensive countermeasure.

## Before you start

1. Read `README.md`, `SECURITY.md` and [`docs/ROADMAP.md`](docs/ROADMAP.md).
2. Search existing issues and use a dedicated branch (`feat/…`, `fix/…`).
3. Keep each pull request focused and avoid unrelated refactors.
4. Never commit secrets, private data or real target information. Payloads must
   stay didactic and inert (e.g. `alert(document.domain)`, `' OR 1=1--`).
5. Report vulnerabilities privately (see `SECURITY.md`).

## Setup

```bash
corepack enable
pnpm install --frozen-lockfile
```

## Checks

```bash
pnpm typecheck
pnpm lint
pnpm format:check
pnpm test
```

At the current scaffold stage, do not document planned transformations, defense
panels or runtime controls as implemented.

## Engineering expectations

Honour the four non-negotiable constraints: **security/ethics** (every attack
ships with its defense; no weaponized exploits), **privacy** (local processing;
no secret leaves the browser), **the text/byte data contract**, and the **design
system and AA accessibility**. Keep logic pure and separate from the UI; adding a
payload means adding **data**, not code. Validate untrusted input, fail safely,
keep dependencies minimal and justified, and add tests for behavioural changes.
Write documentation in English and keep both README editions semantically aligned.

## Pull requests

Describe what changed, why, verification performed, security/privacy impact,
compatibility implications and rollback/migration notes. CI (lint, typecheck,
tests, build) must be green. Participation follows `CODE_OF_CONDUCT.md`.

## Reporting and contribution checks

Use the [issue templates](https://github.com/chiaraberti13/WEBFANG/issues/new/choose) and check for duplicates first. Useful context: pnpm version, browser, transformation or data contract and synthetic input.

Write community and technical documentation in English; maintain equivalent English and Italian READMEs. Preserve existing application translations. Fill in the pull request template with commands, results and checks not performed, including the reason. Use synthetic examples without secrets or personal data.

See [the code of conduct](CODE_OF_CONDUCT.md), [security policy](SECURITY.md) and [accessibility statement](ACCESSIBILITY.md). Report vulnerabilities only through the security policy process.
