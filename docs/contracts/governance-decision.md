# GovernanceDecision

- purpose: decisión formal de approve/block/promote/rollback
- owner: GovernanceController
- producer: GovernanceController
- consumer: Orchestrator, CapabilityRegistry, MemoryService, Observability
- minimum fields:
  - `decisionId`
  - `subjectType`
  - `subjectId`
  - `verdict`
  - `reason`
  - `decidedAt`
- invariants:
  - una decisión de governance es explícita y trazable
  - no se infiere desde adapters ni plugins
- exclusions:
  - no es un plan
  - no es un heartbeat
