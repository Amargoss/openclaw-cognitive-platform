# OpenClaw Cognitive Platform Roadmap

## 1. Estado actual del repositorio

El repositorio real parte de OpenClaw ya implementado como runtime operativo, organizado principalmente bajo `src/`. No existe todavía una topología física separada en `services/`, `shared/` y `adapters/`.

### Mapa factual actual

- `src/gateway`: gateway, transporte, auth, health, server methods, control UI transport
- `src/agents`: ejecución de agentes y sandbox
- `src/hooks`: hooks subordinados
- `src/bindings`: bindings e integración
- `src/sessions`: sesiones operativas
- `src/channels`: transporte y plugins de canales
- `src/cli`: adapter CLI
- `ui/`: adapter web/control UI
- `apps/`: adapters móviles y desktop
- `extensions/`: plugins y conectores
- `skills/`: skills subordinadas
- `src/acp/control-plane`: embrión actual de control plane
- `src/acp/runtime`: embrión actual de runtime registry local
- `src/memory`: memoria local, embeddings, indexado y búsqueda

### Servicios, puertos y persistencia observables hoy

- servicios visibles en `docker-compose.yml`:
  - `openclaw-gateway`
  - `openclaw-cli`
- puerto gateway: `18789`
- puerto bridge: `18790`
- health actual: `GET /healthz` en `127.0.0.1:18789`
- persistencia factual:
  - `~/.openclaw` para config/workspace/runtime local
  - SQLite local en `src/memory`
  - LanceDB opcional en `extensions/memory-lancedb`
- no hay evidencia de PostgreSQL o Redis activos como backend del árbol actual del cognitive platform

### Problemas estructurales actuales

- la frontera entre substrate, control plane y adapters no está completamente separada
- hay semántica de control plane en `src/gateway`
- la memoria está repartida entre `src/memory`, `extensions/memory-core` y `extensions/memory-lancedb`
- no existe todavía una fuente de verdad documental completa para roadmap, authority, ownership y contratos
- no existe aún implementación canónica de:
  - MissionKernel
  - Planner
  - Orchestrator
  - GovernanceController
  - CapabilityRegistry
  - DocumentPipeline
  - ExperimentLab
  - RewardEngine

## 2. Arquitectura objetivo

La arquitectura objetivo se define primero como arquitectura lógica y de ownership. No se asume que esa topología futura ya exista físicamente en el repositorio.

### OpenClaw substrate

OpenClaw queda como substrate operativo:

- gateway
- session handling
- agent runtime
- hooks subordinados
- bindings subordinados
- channel transport
- node transport
- memoria operativa base

### Control plane objetivo

El control plane objetivo queda compuesto por autoridades separadas:

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

### Adapters objetivo

- CLI
- web panel/control UI
- mobile/desktop apps
- channel bridges
- external service connectors
- serializers/deserializers
- browser routes y demás superficies de I/O

### Regla de migración

- Sprint 0 y los sprints iniciales trabajan sobre el árbol real actual
- la migración es primero conceptual, documental y de ownership
- la reubicación física de código sólo debe ocurrir cuando exista autoridad clara y contratos base suficientes

## 3. Secuencia de migración propuesta

1. Congelar arquitectura, ownership, límites y contratos base sobre el árbol actual.
2. Aislar el embrión de control plane ya existente en `src/acp`.
3. Reducir autoridad difusa en gateway, memoria y plugins.
4. Introducir contracts-first para misión, plan, runtime, governance, capability y memoria.
5. Crear servicios canónicos mínimos sin abrir todavía complejidad distribuida innecesaria.
6. Mover decisiones soberanas fuera de adapters, hooks, skills y plugins.
7. Habilitar persistencia gobernada y observabilidad real antes de rollout más ambicioso.

## 4. Roadmap por sprint

## Sprint 0

- objetivo:
  - congelar arquitectura, authority, ownership, límites substrate/control plane/adapters y contratos base partiendo del árbol real actual
- alcance permitido:
  - auditoría real del repo
  - documentación de arquitectura, ownership, límites, persistencia y dependencia
  - contratos base documentales mínimos
  - freeze conceptual de legacy
  - alineación de plantilla PR
- alcance prohibido:
  - MissionKernel funcional
  - Planner funcional
  - runtime distribuido
  - document pipeline funcional
  - experiment lab funcional
  - reward engine funcional
  - promoción real de capabilities
  - expansión funcional en gateway/memory/plugins
- entregables:
  - docs de arquitectura
  - docs de límites y ownership
  - roadmap base
  - contratos base documentales
  - PR template alineado
- validaciones:
  - existencia de docs
  - consistencia entre docs y árbol real
  - separación explícita entre estado actual y objetivo
- criterio de cierre:
  - ya no hay ambigüedad documental sobre quién manda, dónde vive cada autoridad lógica y qué zonas quedan congeladas
- riesgos principales:
  - dejar la arquitectura “bonita” en papel pero ambigua en el código
  - normalizar como canónica una topología aún no implementada

## Sprint 1

- objetivo:
  - formalizar el esqueleto mínimo del control plane sobre el árbol actual sin abrir funcionalidad avanzada
- alcance permitido:
  - crear superficies mínimas y no funcionales para MissionKernel, Planner, GovernanceController, CapabilityRegistry y Observability
  - establecer puntos de integración explícitos con `src/acp`
- alcance prohibido:
  - planificación compleja real
  - dispatch distribuido real
  - promotion real
  - autoevolución
- entregables:
  - módulos/cáscaras mínimas con ownership explícito
  - imports alineados a contracts-first
- validaciones:
  - imports coherentes
  - no nueva lógica soberana en gateway/adapters/plugins
- criterio de cierre:
  - existe una superficie mínima clara para las autoridades principales
- riesgos principales:
  - crear “falso control plane” sin separar responsabilidades

## Sprint 2

- objetivo:
  - introducir MissionKernel mínimo y no mágico para normalizar misión
- alcance permitido:
  - contrato implementado mínimo
  - normalización básica y trazable
  - wiring explícito con control plane
- alcance prohibido:
  - heurística abierta y arbitraria
  - policy global
  - cambios soberanos desde adapters
- entregables:
  - MissionKernel mínimo
  - tests de normalización
- validaciones:
  - unit tests
  - validación de contratos e imports
- criterio de cierre:
  - la misión entra al sistema por una autoridad definida y no por múltiples rutas
- riesgos principales:
  - duplicar la clasificación en gateway o plugins

## Sprint 3

- objetivo:
  - introducir Planner mínimo basado en `MissionSpec`
- alcance permitido:
  - generación de `ExecutionPlan` mínimo y determinista
  - integración con contracts
- alcance prohibido:
  - gobierno soberano
  - ejecución automática sin control
  - planner dentro de adapters
- entregables:
  - Planner mínimo
  - `ExecutionPlan` implementado de forma básica
- validaciones:
  - tests unitarios de plan mínimo
  - ausencia de policy en adapters
- criterio de cierre:
  - el sistema puede producir planes mínimos desde una misión normalizada
- riesgos principales:
  - mezclar planning con governance

## Sprint 4

- objetivo:
  - introducir Orchestrator mínimo para ejecutar planes aprobados
- alcance permitido:
  - ejecución secuencial mínima
  - integración con `DispatchRequest`
  - observabilidad básica de ejecución
- alcance prohibido:
  - redefinir misión
  - aprobar riesgo
  - ejecutar cambios sin contracto explícito
- entregables:
  - Orchestrator mínimo
  - trazas básicas de ejecución
- validaciones:
  - tests de flujo misión -> plan -> dispatch
  - validación de contrato
- criterio de cierre:
  - la ejecución ya no depende de flujos paralelos implícitos
- riesgos principales:
  - convertir el orchestrator en policy owner

## Sprint 5

- objetivo:
  - formalizar RuntimeRegistry local con heartbeats y salud mínima
- alcance permitido:
  - `RuntimeNode`
  - `RuntimeHeartbeat`
  - health y last-seen locales
- alcance prohibido:
  - distribuido completo
  - reconciliación compleja
  - promotion por estado del runtime
- entregables:
  - RuntimeRegistry local
  - heartbeats mínimos
- validaciones:
  - tests de heartbeat y health
  - no dependencia circular con adapters
- criterio de cierre:
  - existe un owner claro del estado runtime local
- riesgos principales:
  - dejar registry repartido entre gateway, daemon y plugins

## Sprint 6

- objetivo:
  - formalizar GovernanceController mínimo
- alcance permitido:
  - `GovernanceDecision`
  - approve/block mínimos
  - gating explícito antes de acciones sensibles
- alcance prohibido:
  - governance dispersa en gateway
  - promotion automática
  - rollback implícito
- entregables:
  - GovernanceController mínimo
  - puntos de control explícitos
- validaciones:
  - tests de gating
  - verificación de ausencia de bypasses
- criterio de cierre:
  - las decisiones sensibles ya no dependen de rutas implícitas
- riesgos principales:
  - mantener centros paralelos de autoridad

## Sprint 7

- objetivo:
  - definir MemoryService gobernado sobre el estado real de memoria actual
- alcance permitido:
  - separar memoria operativa, file-backed memory y verdad estructurada futura
  - introducir `MemoryWriteDecision`
- alcance prohibido:
  - persistencia indiscriminada
  - decisión de verdad desde plugins
  - mezclar memoria de conversación con verdad estructurada
- entregables:
  - capa mínima de MemoryService
  - reglas de escritura gobernada
- validaciones:
  - tests de criterio de escritura
  - validación de ownership de persistencia
- criterio de cierre:
  - existe un owner claro para escritura estructurada
- riesgos principales:
  - mantener `src/memory` o `memory-lancedb` como centros soberanos

## Sprint 8

- objetivo:
  - introducir CapabilityRegistry mínimo y versionado básico
- alcance permitido:
  - registrar capabilities, versiones y canales
  - trazabilidad con governance
- alcance prohibido:
  - promotion soberana desde registry
  - rollout automático
- entregables:
  - CapabilityRegistry mínimo
  - `CapabilityVersion`
- validaciones:
  - tests de registro/versionado
  - validación de relación con governance
- criterio de cierre:
  - el sistema distingue registro de promoción
- riesgos principales:
  - confundir metadata con autoridad

## Sprint 9

- objetivo:
  - introducir Observability coherente y central
- alcance permitido:
  - auditoría, trazabilidad, métricas, correlación por request/decision
- alcance prohibido:
  - observabilidad con side effects soberanos
  - cambios de estado desde observability
- entregables:
  - eventos mínimos de control plane
  - trazabilidad de misión/plan/decision/runtime
- validaciones:
  - tests de correlación
  - verificación de logs/eventos clave
- criterio de cierre:
  - existe trazabilidad suficiente para validar y operar el control plane
- riesgos principales:
  - dejar auditoría repartida y opaca

## Sprint 10

- objetivo:
  - introducir DocumentPipeline mínimo y acotado
- alcance permitido:
  - ingestión/preparación documental básica
  - integración con contracts y governance
- alcance prohibido:
  - pipeline masivo no gobernado
  - memory truth automática
- entregables:
  - DocumentPipeline mínimo
  - rutas de ingestión explícitas
- validaciones:
  - tests de ingestión mínima
  - verificación de límites de ownership
- criterio de cierre:
  - existe un owner documental sin contaminar gateway ni adapters
- riesgos principales:
  - convertir el pipeline en fuente soberana de verdad

## Sprint 11

- objetivo:
  - introducir ExperimentLab mínimo y seguro
- alcance permitido:
  - sandbox experimental
  - `ExperimentRun`
  - evidencia persistible para revisión
- alcance prohibido:
  - despliegue directo a producción
  - experimentación con authority bypass
- entregables:
  - ExperimentLab mínimo
  - registros de experimento
- validaciones:
  - tests de aislamiento
  - verificación de no-promotion directa
- criterio de cierre:
  - el sistema puede experimentar sin contaminar producción
- riesgos principales:
  - abrir autoevolución prematura

## Sprint 12

- objetivo:
  - introducir RewardEngine mínimo y trazable
- alcance permitido:
  - `RewardScore`
  - scoring observable y revisable
- alcance prohibido:
  - approve/promote/rollback desde scoring
  - policy soberana basada sólo en score
- entregables:
  - RewardEngine mínimo
  - trazabilidad de score
- validaciones:
  - tests de cálculo mínimo
  - validación de dependencia con governance
- criterio de cierre:
  - el score existe como evidencia, no como autoridad
- riesgos principales:
  - convertir reward en motor soberano

## Sprint 13

- objetivo:
  - preparar el baseline multinodo controlado, sin abrir distribuido completo
- alcance permitido:
  - node health extendido
  - capability map mínimo
  - quarantine básica
  - graceful degradation básica
- alcance prohibido:
  - reconciliación compleja completa
  - distribuido total sin cierre local/base
- entregables:
  - baseline multinodo mínimo
  - reglas de rechazo de nodos enfermos
- validaciones:
  - tests de node health y quarantine
  - validación de no bypass a governance
- criterio de cierre:
  - existe base multinodo controlada y no mágica
- riesgos principales:
  - abrir complejidad distribuida antes de endurecer governance

## Sprint 14

- objetivo:
  - consolidar rollout controlado, rollback y operación Linux Mint-first del control plane ya introducido
- alcance permitido:
  - endurecimiento operativo
  - rollback claro
  - health endpoints y baseline de servicios objetivo ya sustentados por implementación real
- alcance prohibido:
  - nuevas features mayores fuera del hardening
  - rollout sin evidencia
- entregables:
  - baseline operativo endurecido
  - criterios de rollback y promoción explícitos
- validaciones:
  - smoke operativo
  - validación de recovery
  - verificación de límites finales de ownership
- criterio de cierre:
  - la plataforma puede operar localmente con control claro, rollback y evidencias
- riesgos principales:
  - declarar convergencia sin que la operación real la soporte

## 5. Deuda explícita que sigue abierta después de Sprint 0

- la arquitectura canónica existe en documentación, no todavía en implementación completa
- `src/acp/control-plane` y `src/acp/runtime` siguen siendo embriones, no el control plane final
- `src/gateway` sigue conteniendo piezas con semántica de control plane
- `src/memory` sigue siendo un subsistema local fuerte, no aún `MemoryService` gobernado
- `extensions/memory-core` y `extensions/memory-lancedb` siguen activos y deben mantenerse no soberanos
- no existe aún implementation real de:
  - MissionKernel
  - Planner
  - Orchestrator
  - GovernanceController
  - CapabilityRegistry
  - DocumentPipeline
  - ExperimentLab
  - RewardEngine
- no existe aún baseline real de PostgreSQL/Redis/Nginx como parte del control plane
- no existe aún topología física final del árbol

## 6. Regla de disciplina del roadmap

- no abrir Sprint N+1 si el cierre real del Sprint N sigue ambiguo
- no tratar documentación futura como si fuera implementación presente
- no esconder debt estructural detrás de nombres de servicios aún inexistentes
- no mover autoridad soberana a adapters, hooks, skills o plugins
