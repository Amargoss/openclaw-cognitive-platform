# MemoryWriteDecision

- purpose: decisión mínima sobre una escritura estructurada de memoria
- owner: MemoryService bajo GovernanceController
- producer: GovernanceController y/o MemoryService autorizado
- consumer: MemoryService
- minimum fields:
  - `decisionId`
  - `subject`
  - `category`
  - `action`
  - `reason`
  - `decidedAt`
- invariants:
  - toda escritura estructurada requiere criterio y motivo
  - debe ser trazable
- exclusions:
  - no puede originarse soberanamente desde adapters/plugins
  - no convierte memoria operativa en verdad por default
