# MissionAnalyzeRequest

- purpose: solicitud mínima para analizar una misión antes de planificar
- owner: MissionKernel
- producer: adapters o substrate que eleven una misión
- consumer: MissionKernel
- minimum fields:
  - `requestId`
  - `source`
  - `input`
  - `requestedAt`
- invariants:
  - no contiene decisiones de governance
  - no implica ejecución
- exclusions:
  - no aprueba
  - no promueve
  - no persiste verdad estructurada por sí misma
