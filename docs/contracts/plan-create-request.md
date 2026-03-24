# PlanCreateRequest

- purpose: solicitud mínima para generar un plan desde una misión
- owner: Planner
- producer: MissionKernel u otro caller autorizado
- consumer: Planner
- minimum fields:
  - `requestId`
  - `missionId`
  - `mission`
  - `requestedAt`
- invariants:
  - siempre referencia una `MissionSpec`
  - no ejecuta ni aprueba por sí misma
- exclusions:
  - no redefine la misión
  - no autoriza rollout
