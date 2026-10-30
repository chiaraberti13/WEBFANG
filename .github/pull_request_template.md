## Summary

<!-- What changes and why, in a few lines. -->

**Roadmap phase / item:** <!-- e.g. Phase 0, Phase 2 — Flow 2; "none" only for trivial fixes -->
**Issue:** <!-- Closes #… -->

## Changes

-

## Verification

<!-- Commands run and their result. For a CI fix, show the failure reproduced first. -->

## Definition of Done

<!-- Tick only what is true; explain every unchecked item below. -->

- [ ] Honours the four non-negotiable constraints (security/ethics, privacy, text/byte contract, design system + AA)
- [ ] Logic kept pure and separate from the UI; new payloads added as data, not code
- [ ] The UI never executes payloads (rendered as text; DOMPurify only where HTML preview is required)
- [ ] No secret or key serialized into the URL; input shared only with explicit consent
- [ ] Untrusted input validated; errors surfaced as structured, translatable messages (no stack traces in UI)
- [ ] Unit tests added or updated; security/threat-model scenarios covered where relevant
- [ ] ESLint, strict TypeScript, Prettier and tests are green (`pnpm lint typecheck format:check test`)
- [ ] Build passes, including the single-file variant where affected
- [ ] Accessibility preserved (keyboard navigation, AA contrast) where UI changed
- [ ] No secrets, real targets or personal data in code, fixtures or logs
- [ ] Docs (EN/IT) updated where affected

### Unchecked items

<!-- Why each unchecked item does not apply or what follows up. -->
