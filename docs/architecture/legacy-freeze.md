# Legacy Freeze

## Objetivo

Congelar rutas híbridas o ambiguas que siguen activas por compatibilidad, pero no deben recibir nueva lógica central.

## Rutas congeladas conceptualmente

### `src/gateway/control-plane-audit.ts`

- rol actual: resolver actor y resumen de cambios para flujos de control plane
- freeze reason: semántica de auditoría/control plane ubicada en gateway
- allowed edits:
  - documentación
  - comentarios mínimos
  - alineación no funcional
- prohibited edits:
  - nueva authority
  - nuevas políticas soberanas
- target owner: Observability/GovernanceController futuro

### `src/gateway/control-plane-rate-limit.ts`

- rol actual: rate limiting de escrituras de control plane por cliente
- freeze reason: policy de control plane ubicada en gateway
- allowed edits:
  - documentación
  - comentarios mínimos
  - fixes estrictamente de alineación si fueran indispensables
- prohibited edits:
  - expansión funcional
  - nuevas decisiones de policy global
- target owner: GovernanceController/control plane futuro

### `src/memory/**`

- rol actual: memoria local, indexado y embeddings
- freeze reason: alto riesgo de confundirse con verdad estructurada canónica
- allowed edits:
  - documentación
  - comentarios mínimos
  - alineación de ownership
- prohibited edits:
  - nueva persistencia soberana
  - expansión de authority de memoria
- target owner: MemoryService futuro

### `extensions/memory-core/index.ts`

- rol actual: prompt section y tools de recall file-backed
- freeze reason: política de memoria viviendo en plugin subordinado
- allowed edits:
  - documentación
  - aclaraciones de no-authority
- prohibited edits:
  - ampliar policy central
  - convertirse en fuente de verdad
- target owner: MemoryService + GovernanceController futuros

### `extensions/memory-lancedb/index.ts`

- rol actual: memoria persistente opcional con auto-recall/auto-capture
- freeze reason: persistencia desde plugin con riesgo de segundo centro de verdad
- allowed edits:
  - documentación
  - comentarios mínimos
  - endurecimiento no funcional de límites
- prohibited edits:
  - nuevas decisiones soberanas
  - expansión funcional de persistencia canónica
- target owner: MemoryService futuro

### `src/channels/plugins/**`

- rol actual: adapters/plugins de canal, bindings y routing
- freeze reason: frontera híbrida entre adapter y control routing
- allowed edits:
  - documentación
  - comentarios mínimos
  - fixes de alineación del sprint
- prohibited edits:
  - authority central
  - bypasses a servicios sensibles
- target owner: adapters + substrate contracts explícitos
