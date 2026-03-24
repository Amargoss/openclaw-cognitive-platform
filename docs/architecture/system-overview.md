# System Overview

## Estado actual

El repositorio real está organizado principalmente alrededor de `src/`, con OpenClaw como runtime operativo ya implementado. No existe todavía una topología física separada en `services/`, `shared/` y `adapters/`.

### Mapa factual del árbol

- `src/gateway`: transporte, server methods, auth, control UI transport, health, config reload
- `src/agents`: ejecución de agentes y sandbox
- `src/hooks`: hooks subordinados
- `src/bindings`: bindings y soporte de integración
- `src/sessions`: sesiones operativas
- `src/channels`: transporte y plugins de canales
- `src/cli`: adapter CLI
- `ui/`: adapter web/control UI
- `apps/`: adapters móviles y desktop
- `extensions/`: plugins y conectores
- `skills/`: skills subordinadas
- `src/acp/control-plane`: embrión actual de control plane
- `src/acp/runtime`: registry/runtime local embrionario
- `src/memory`: indexado, embeddings y búsqueda de memoria local

### Servicios y puertos observables hoy

- `docker-compose.yml` define:
  - `openclaw-gateway`
  - `openclaw-cli`
- Puerto gateway: `18789`
- Puerto bridge: `18790`
- Health actual: `GET /healthz` en `127.0.0.1:18789`

### Persistencia observable hoy

- Configuración y workspace en `~/.openclaw`
- Memoria/indexado local en `src/memory` con `node:sqlite`
- Persistencia adicional opcional en `extensions/memory-lancedb`
- No hay evidencia de PostgreSQL o Redis como backend activo del árbol actual

## Arquitectura canónica objetivo

Sprint 0 fija la arquitectura canónica a nivel documental y de ownership, no por migración física del árbol.

### Substrate lógico

OpenClaw queda definido como substrate operativo:

- gateway
- sessions
- agents
- hooks subordinados
- bindings subordinados
- channel transport
- node transport
- memoria operativa base

### Control plane lógico

El control plane objetivo queda compuesto por autoridades lógicas separadas:

- MissionKernel
- Planner
- Orchestrator
- RuntimeRegistry
- MemoryService
- GovernanceController
- CapabilityRegistry
- DocumentPipeline
- ExperimentLab
- RewardEngine
- Observability

### Adapters lógicos

- CLI
- Web panel/control UI
- apps móviles/desktop
- channel bridges
- provider plugins
- browser routes

## Relación entre estado actual y objetivo

- `src/acp/control-plane` y `src/acp/runtime` son el embrión factual más cercano al control plane.
- `src/gateway`, `src/memory` y partes de `extensions/` contienen hoy responsabilidades que Sprint 0 debe congelar y reubicar conceptualmente.
- La migración física de directorios queda fuera de Sprint 0.

## No implementado aún

Fuera de Sprint 0:

- MissionKernel funcional
- Planner funcional
- runtime distribuido real
- document pipeline real
- experiment lab funcional
- reward engine funcional
- capability promotion real
- separación física del árbol a `services/`/`shared/`
