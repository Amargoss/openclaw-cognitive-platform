# RuntimeNode

- purpose: representación mínima de un nodo/runtime registrado
- owner: RuntimeRegistry
- producer: RuntimeRegistry
- consumer: Orchestrator, Observability, GovernanceController
- minimum fields:
  - `nodeId`
  - `runtimeKind`
  - `health`
  - `lastSeenAt`
- invariants:
  - identifica un runtime conocido por el registry
  - salud y metadata no implican aprobación
- exclusions:
  - no decide promotion
  - no decide rollback
