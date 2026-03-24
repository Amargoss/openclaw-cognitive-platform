# DispatchRequest

- purpose: solicitud mínima de dispatch de trabajo aprobado
- owner: Orchestrator
- producer: caller autorizado después de plan/gobernanza
- consumer: Orchestrator
- minimum fields:
  - `dispatchId`
  - `planId`
  - `target`
  - `requestedAt`
- invariants:
  - siempre referencia plan o tarea explícita
  - no sustituye la decisión de governance
- exclusions:
  - no aprueba
  - no reescribe mission policy
