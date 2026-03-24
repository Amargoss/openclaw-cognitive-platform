# ExecutionPlan

- purpose: plan ejecutable derivado de una misión
- owner: Planner
- producer: Planner
- consumer: Orchestrator, GovernanceController
- minimum fields:
  - `planId`
  - `missionId`
  - `steps`
  - `createdAt`
- invariants:
  - referencia una misión concreta
  - puede ser evaluado por governance antes de ejecución
- exclusions:
  - no equivale a decisión de governance
  - no actualiza estado por sí solo
