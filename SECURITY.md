# Security Policy

## Supported versions

Security fixes target the latest revision on the default branch unless a release
is explicitly documented as supported.

## Scope

The client-side application and its data contract; the recipe engine and URL
serialization (`#recipe=`); recipe import/export (JSON); the didactic payload
catalogue and defense content; the build, single-file and PWA pipelines; and the
dependency/build supply chain.

## Threat model (summary)

WebFang protects the user (input, tokens and keys must not leave the browser) and
the app itself (it must not be turned against whoever opens it). Critical inputs:
user input, imported recipes, the URL fragment, and future community content.
Hostile recipes/URLs, malicious community content and self-XSS are in scope.

## Privacy promise

Input, tokens and keys are processed locally and are **not** transmitted to remote
services. No third-party font, script or asset is loaded at runtime. By default no
input, JWT or key is persisted; only preferences and explicitly saved recipes are.
Keys and secrets are **never** serialized into the URL; including the input in a
shared link requires explicit consent with a preview.

## Reporting

Do not open a public issue for an unpatched vulnerability. Use GitHub private
vulnerability reporting / Security Advisories when available. Include the affected
commit/version, impact, reproducible steps or a minimal proof of concept,
environment assumptions and possible mitigations. Remove unrelated sensitive data.

## Security requirements

Never commit secrets, credentials, private keys or private data. The UI must never
execute payloads (render as text; sanitize HTML with DOMPurify only where a live
preview is required). Keep the CSP strict, with no `eval` and no un-hashed inline
scripts. Heavy/regex work runs in a worker with timeout and size limits
(anti-ReDoS, anti-zip-bomb). A generated payload must never be presented as proof
of a vulnerability.

## Responsible testing

Test only systems, files and accounts you own or are explicitly authorized to use.
No destructive testing, denial of service, unauthorized access or collection of
third-party data.

## Private reporting process

Use **Report a vulnerability** in the repository Security tab if private reporting is available. Otherwise use a verified private contact published by the repository owner. If no private contact is available, open a public issue asking only for a private contact, without vulnerability details. Do not publish exploit details, credentials, personal data or sensitive logs in public issues.

Include the affected revision, environment, impact and minimal synthetic reproduction. Coordinate disclosure with the maintainer. Acknowledgement and remediation depend on availability and severity; no fixed response deadline is guaranteed.
