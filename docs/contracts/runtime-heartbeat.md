# RuntimeHeartbeat

- purpose: señal mínima de vida/estado de un runtime o nodo
- owner: RuntimeRegistry
- producer: runtime o node host autorizado
- consumer: RuntimeRegistry, Observability
- minimum fields:
  - `nodeId`
  - `timestamp`
  - `status`
- invariants:
  - describe estado observado, no policy
  - debe ser idempotente a nivel informativo
- exclusions:
  - no aprueba acciones
  - no promueve capacidades
