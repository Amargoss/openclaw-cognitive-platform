# MissionSpec

- purpose: representación normalizada de una misión
- owner: MissionKernel
- producer: MissionKernel
- consumer: Planner, Orchestrator, GovernanceController
- minimum fields:
  - `missionId`
  - `title`
  - `objective`
  - `constraints`
  - `normalizedAt`
- invariants:
  - sale de una clasificación/normalización
  - es la base para crear planes
- exclusions:
  - no es un plan
  - no es una aprobación de governance
