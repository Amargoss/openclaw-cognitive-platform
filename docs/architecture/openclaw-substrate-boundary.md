# OpenClaw Substrate Boundary

## Estado actual

La frontera actual no está completamente separada en el árbol. Sprint 0 la congela de forma documental sobre las rutas reales existentes.

## Clasificación factual

### Substrate factual

- `src/gateway`
- `src/agents`
- `src/hooks`
- `src/bindings`
- `src/sessions`
- `src/node-host`
- `src/channels/transport`
- partes operativas de `src/channels`

Responsabilidades permitidas:

- recibir entrada
- mantener sesiones
- enrutar agentes
- operar canales
- transportar eventos y payloads
- exponer tools/hooks subordinados

Responsabilidades prohibidas:

- governance soberana
- capability promotion
- reward scoring soberano
- persistencia estructurada global como verdad canónica
- redefinir misión o policy global

### Control plane factual

- `src/acp/control-plane`
- `src/acp/runtime`
- piezas futuras documentadas pero aún no implementadas

Responsabilidades permitidas:

- coordinar estado de runtimes/sesiones ACP
- servir como embrión de registry/control
- convertirse en owner futuro de authorities canónicas

Responsabilidades prohibidas en Sprint 0:

- expansión funcional más allá del freeze
- introducir runtime distribuido real
- asumir features del Sprint 1+

### Adapters factuales

- `src/cli`
- `ui/`
- `apps/`
- `extensions/`
- `src/browser/routes`
- partes de `src/channels/plugins`

Responsabilidades permitidas:

- I/O
- validación de forma
- serialización
- renderizado
- transporte
- wiring con plugins/canales

Responsabilidades prohibidas:

- decidir policy
- escribir verdad estructurada por cuenta propia
- aprobar cambios
- lanzar promotion
- crear centros paralelos de autoridad

## Rutas ambiguas o híbridas

- `src/gateway/control-plane-audit.ts`
  - semántica de auditoría/control plane viviendo en gateway
- `src/gateway/control-plane-rate-limit.ts`
  - policy de escritura de control plane viviendo en gateway
- `extensions/memory-core/index.ts`
  - guidance/prompt policy de memoria en plugin subordinado
- `extensions/memory-lancedb/index.ts`
  - auto-recall y auto-capture con persistencia desde plugin

## Decisión de Sprint 0

Estas rutas siguen activas por compatibilidad, pero quedan congeladas conceptualmente. No deben recibir nueva lógica soberana.
