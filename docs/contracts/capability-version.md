# CapabilityVersion

- purpose: registro mínimo de una capability/version/channel
- owner: CapabilityRegistry
- producer: CapabilityRegistry
- consumer: GovernanceController, Orchestrator, Observability
- minimum fields:
  - `capabilityId`
  - `version`
  - `channel`
  - `recordedAt`
- invariants:
  - registrar no implica promover
  - debe poder referenciarse por governance
- exclusions:
  - no aprueba rollout
  - no reemplaza governance
