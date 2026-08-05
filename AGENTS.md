## Coding preferences

- Don't specify return types that TypeScript can infer (e.g. `: void`, `: number`, `: boolean`). Only annotate where inference wouldn't be accurate or the type isn't otherwise named.

## Agent skills

### Issue tracker

Issues are tracked in this repo's GitHub Issues, via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage labels are used as-is (needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout — root `CONTEXT.md` + `docs/adr/`. See `docs/agents/domain.md`.
