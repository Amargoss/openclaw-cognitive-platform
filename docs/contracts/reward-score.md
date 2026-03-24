# RewardScore

- purpose: score mínimo de evaluación asociado a una ejecución o experimento
- owner: RewardEngine
- producer: RewardEngine
- consumer: GovernanceController, Observability
- minimum fields:
  - `scoreId`
  - `subjectId`
  - `value`
  - `measuredAt`
- invariants:
  - es evidencia de evaluación, no decisión soberana
  - debe ser trazable
- exclusions:
  - no aprueba
  - no promueve
