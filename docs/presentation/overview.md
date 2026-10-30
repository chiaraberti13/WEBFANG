# Overview

[English](overview.md) · [Italiano](overview.it.md)

WebFang is a client-side "offensive web" toolkit. Its identity is a single idea:
**context → transformation → defense**. For every step it shows what the
transformation does, where it is relevant and its prerequisites, what it does _not_
prove, and how to defend — with a safe example and a CWE/OWASP reference.

## Intended users

- **Bug-bounty hunter / pentester** — builds, tries and saves recipes at speed.
- **Web-security student** — learns the _why_, the _context_ and the _defense_.
- **Back-end developer** — decodes a token or an odd encoding and copies the fix.

## Principles

- **Local processing.** Input, tokens and keys are not transmitted to remote
  services; no third-party asset is loaded at runtime.
- **Composable, shareable recipes** via a compressed URL, safe by default (secrets
  are never serialized).
- **Two levels: expert and beginner** — guided mode, wizard and glossary.
- **Actionable remediation** — a copy-paste fix in the user's language, not only
  theory.
- **Bilingual IT/EN, accessible, offline-capable** (PWA / single-file).

See the [product specification](../../project.md) and the
[roadmap](../../roadmap.md) for detail.
