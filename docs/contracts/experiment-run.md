# ExperimentRun

- purpose: ejecución mínima de un experimento en sandbox
- owner: ExperimentLab
- producer: ExperimentLab
- consumer: RewardEngine, GovernanceController, Observability
- minimum fields:
  - `experimentRunId`
  - `hypothesis`
  - `candidate`
  - `startedAt`
- invariants:
  - pertenece a sandbox/experimentación
  - no implica despliegue
- exclusions:
  - no promueve
  - no despliega a producción
