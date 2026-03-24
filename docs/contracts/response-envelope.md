# ResponseEnvelope

- purpose: sobre mínimo y consistente para respuestas entre módulos
- owner: shared contracts del control plane
- producer: cualquier módulo autorizado
- consumer: cualquier módulo autorizado
- minimum fields:
  - `requestId`
  - `ok`
  - `data`
  - `error`
- invariants:
  - conserva correlación con la solicitud
  - no cambia autoridad del payload interno
- exclusions:
  - no define por sí solo policy ni persistence
