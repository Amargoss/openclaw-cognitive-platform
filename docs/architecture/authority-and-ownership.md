# Authority And Ownership

## Regla base

Ningún adapter, hook, skill o plugin puede convertirse en autoridad soberana. La autoridad formal vive en el control plane lógico, aunque su implementación completa aún no exista.

## Autoridades canónicas

### MissionKernel

- autoridad: clasificación y normalización de misión
- no autoridad: governance, ejecución, promotion, persistence policy final
- estado actual: no implementado; sólo se define como owner lógico futuro

### Planner

- autoridad: producir planes desde una misión normalizada
- no autoridad: policy global, rollback, risk approval
- estado actual: no implementado

### Orchestrator

- autoridad: ejecutar planes aprobados
- no autoridad: redefinir intención, aprobar riesgo, promover capacidades
- estado actual: no implementado

### RuntimeRegistry

- autoridad: estado y salud de runtimes/nodos
- no autoridad: aprobación de cambios
- estado actual: embrión en `src/acp/runtime`

### MemoryService

- autoridad: persistencia estructurada gobernada
- no autoridad: decidir por sí solo qué se vuelve verdad duradera
- estado actual: no implementado como servicio canónico; existen piezas en `src/memory`

### GovernanceController

- autoridad: approve/block/promote/rollback/risk control
- no autoridad: transporte, UI, session handling
- estado actual: no implementado

### CapabilityRegistry

- autoridad: registrar versiones/canales/capability metadata
- no autoridad: promoción soberana
- estado actual: no implementado

### DocumentPipeline

- autoridad: ingestión y preparación documental gobernada
- no autoridad: planificación soberana
- estado actual: no implementado

### ExperimentLab

- autoridad: experimentos en sandbox
- no autoridad: despliegue a producción
- estado actual: no implementado

### RewardEngine

- autoridad: scoring y trazabilidad de evaluación
- no autoridad: approve/promote/rollback
- estado actual: no implementado

### Observability

- autoridad: métricas, auditoría, trazabilidad
- no autoridad: cambio de estado soberano
- estado actual: parcial y disperso

## Ownership factual del árbol actual

- `src/gateway`
  - owner factual: gateway runtime y transporte
  - deuda: contiene piezas con semántica de control plane como `control-plane-audit.ts` y `control-plane-rate-limit.ts`
- `src/acp/control-plane`
  - owner factual: sesiones ACP, runtime controls, identity reconcile
- `src/acp/runtime`
  - owner factual: registry/runtime backend local
- `src/memory`
  - owner factual: búsqueda/indexado/memoria local
  - deuda: hoy no está gobernado por una autoridad formal separada
- `src/cli`, `ui/`, `apps/`
  - owner factual: adapters
- `extensions/`, `skills/`
  - owner factual: plugins/skills subordinadas
  - prohibición: no pueden acumular policy soberana
- `src/shared`
  - owner factual: utilidades legacy reutilizables del runtime OpenClaw
  - deuda: no debe confundirse con la nueva superficie canónica `shared/`

## Ownership canónico fijado en Sprint 1

- `shared/config`
  - owner: configuración bootstrap del control plane
- `shared/logging`
  - owner: logging compartido del control plane
- `shared/contracts`
  - owner: contratos tipados mínimos del control plane
- `shared/db`
  - owner: persistencia bootstrap local-first
- `services/_bootstrap`
  - owner: health, readiness y arranque mínimo del bootstrap

## Regla explícita `shared/**` vs `src/shared/**`

- `shared/**` es la superficie canónica nueva del bootstrap/control plane.
- `src/shared/**` permanece como biblioteca legacy del runtime OpenClaw.
- `services/**` no puede depender de `src/shared/**`.
- `shared/**` no puede depender de `src/shared/**`.
- `src/shared/**` no debe recibir lógica nueva del control plane en Sprint 1.

## Decisiones de Sprint 0

- `src/gateway` no es owner canónico de governance ni de control plane.
- `src/memory` no es owner canónico de verdad estructurada global.
- `extensions/memory-core` y `extensions/memory-lancedb` no son owners canónicos de persistencia soberana.
- `src/cli`, `ui/`, `apps/`, `extensions/`, `skills/` quedan fijados como adapters o extensiones subordinadas.
