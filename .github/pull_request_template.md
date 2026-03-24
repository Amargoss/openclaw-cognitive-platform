## Summary

Describe the problem and fix in 2–5 bullets:

- Problem:
- Why it matters:
- What changed:
- What did NOT change (scope boundary):

## Current vs Target (required for architecture or Sprint 0 work)

- Current factual repo state:
- Target canonical architecture/state:
- What remains intentionally unmigrated:

## Ownership / Authority (required)

- Primary owner enforced by this PR:
- Paths that must remain non-sovereign:
- Any authority moved, clarified, or frozen:

## Frozen / Legacy Paths

- Frozen paths touched:
- Why touching them was still allowed:
- Confirm no new sovereign logic was added: (`Yes/No`)

## Contracts

- Contracts created or changed:
- Are these canonical docs only, implemented code, or both?
- Any contract intentionally deferred because the repo lacks factual support:

## Change Type (select all)

- [ ] Bug fix
- [ ] Feature
- [ ] Refactor required for the fix
- [ ] Docs
- [ ] Security hardening
- [ ] Chore/infra

## Scope (select all touched areas)

- [ ] Gateway / orchestration
- [ ] Skills / tool execution
- [ ] Auth / tokens
- [ ] Memory / storage
- [ ] Integrations
- [ ] API / contracts
- [ ] UI / DX
- [ ] CI/CD / infra

## Linked Issue/PR

- Closes #
- Related #
- [ ] This PR fixes a bug or regression

## Root Cause / Regression History (if applicable)

For bug fixes or regressions, explain why this happened, not just what changed. Otherwise write `N/A`. If the cause is unclear, write `Unknown`.

- Root cause:
- Missing detection / guardrail:
- Prior context (`git blame`, prior PR, issue, or refactor if known):
- Why this regressed now:
- If unknown, what was ruled out:

## Regression Test Plan (if applicable)

For bug fixes or regressions, name the smallest reliable test coverage that should have caught this. Otherwise write `N/A`.

- Coverage level that should have caught this:
  - [ ] Unit test
  - [ ] Seam / integration test
  - [ ] End-to-end test
  - [ ] Existing coverage already sufficient
- Target test or file:
- Scenario the test should lock in:
- Why this is the smallest reliable guardrail:
- Existing test that already covers this (if any):
- If no new test is added, why not:

## User-visible / Behavior Changes

List user-visible changes (including defaults/config).  
If none, write `None`.

## Security Impact (required)

- New permissions/capabilities? (`Yes/No`)
- Secrets/tokens handling changed? (`Yes/No`)
- New/changed network calls? (`Yes/No`)
- Command/tool execution surface changed? (`Yes/No`)
- Data access scope changed? (`Yes/No`)
- If any `Yes`, explain risk + mitigation:

## Repro + Verification

### Environment

- OS:
- Runtime/container:
- Model/provider:
- Integration/channel (if any):
- Relevant config (redacted):

### Steps

1.
2.
3.

### Expected

-

### Actual

-

## Evidence

Attach at least one:

- [ ] Failing test/log before + passing after
- [ ] Trace/log snippets
- [ ] Screenshot/recording
- [ ] Perf numbers (if relevant)

## Human Verification (required)

What you personally verified (not just CI), and how:

- Verified scenarios:
- Edge cases checked:
- What you did **not** verify:

## Review Conversations

- [ ] I replied to or resolved every bot review conversation I addressed in this PR.
- [ ] I left unresolved only the conversations that still need reviewer or maintainer judgment.

If a bot review conversation is addressed by this PR, resolve that conversation yourself. Do not leave bot review conversation cleanup for maintainers.

## Compatibility / Migration

- Backward compatible? (`Yes/No`)
- Config/env changes? (`Yes/No`)
- Migration needed? (`Yes/No`)
- If yes, exact upgrade steps:

## Sprint Status

- Sprint:
- Status: (`OPEN` / `PARTIALLY CLOSED` / `CLOSED`)
- Exact closure criteria satisfied:
- Remaining blockers or debt:

## Failure Recovery (if this breaks)

- How to disable/revert this change quickly:
- Files/config to restore:
- Known bad symptoms reviewers should watch for:

## Risks and Mitigations

List only real risks for this PR. Add/remove entries as needed. If none, write `None`.

- Risk:
  - Mitigation:
