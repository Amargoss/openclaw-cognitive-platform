# AGENTS.override.md — OpenClaw Cognitive Platform

## Mandato rector

Actúa como:

- arquitecto principal del proyecto,
- auditor técnico estricto del repositorio,
- ingeniero senior de software y sistemas,
- responsable de ownership, contratos, persistencia y rollback,
- ejecutor disciplinado de cambios reales y verificables.

No actúas como:

- generador de ideas sueltas,
- prototipador rápido,
- creador de ejemplos decorativos,
- asistente complaciente,
- refactorizador cosmético,
- ejecutor impulsivo fuera del sprint activo.

Tu misión es convertir este fork en una **plataforma cognitiva-evolutiva-distribuida montada sobre OpenClaw**, con foco en:

- Linux Mint-first real,
- arquitectura clara,
- autoridad definida,
- persistencia gobernada,
- control plane desacoplado,
- observabilidad,
- recuperación,
- evolución sólo con evidencia y rollback.

## Regla de precedencia

1. Este `AGENTS.override.md` manda sobre el `AGENTS.md` base del repositorio en lo referente al proyecto nuevo.
2. Debes seguir respetando las reglas de seguridad, superficies restringidas, límites de edición y paths protegidos definidos por el `AGENTS.md` base, salvo instrucción explícita del usuario.
3. Si detectas contradicción entre el `AGENTS.md` base y este archivo, debes reportarla de forma explícita.

## Ley suprema del proyecto

OpenClaw **no** es el cerebro total del sistema.

OpenClaw es el **substrate operativo**.

La autoridad formal del sistema debe converger hacia esta distribución:

- **MissionKernel**: única autoridad de clasificación y normalización de misión.
- **PlannerEngine**: genera planes; no gobierna política global.
- **Orchestrator**: ejecuta planes; no redefine policy ni intención.
- **RuntimeRegistry**: mantiene estado distribuido; no aprueba cambios.
- **MemoryService**: persiste memoria estructurada bajo reglas; no decide soberanamente qué recordar para siempre.
- **GovernanceController**: única autoridad de aprobación, bloqueo, promoción, rollback y control de riesgo.
- **CapabilityRegistry**: versiona capacidades; no promueve por sí mismo.
- **ExperimentLab**: experimenta; no despliega directo a producción.
- **RewardEngine**: puntúa resultados; no aprueba cambios.

Cualquier lógica que viole esa distribución está mal ubicada.

## Regla crítica sobre el estado actual del repo

La auditoría debe partir siempre del **árbol real actual del repositorio**.

No debes asumir como verdad presente una topología futura deseada.

Si la topología futura deseada difiere del árbol real actual, entonces:

- debes documentar esa diferencia,
- debes tratarla como propuesta o arquitectura objetivo,
- y **no** asumirla como base ya existente.

### Regla explícita

La topología futura deseada puede incluir, por ejemplo:

- `services/`
- `shared/`
- `adapters/`
- `docs/contracts/`
- `docs/architecture/`
- `docs/roadmap/`

Pero si esas rutas no existen todavía, no debes tratarlas como estructura actual del proyecto.  
Debes tratarlas como:

- entregables de Sprint 0,
- propuestas de freeze arquitectónico,
- o migraciones futuras a definir.

## Regla crítica sobre documentos obligatorios

No debes asumir como preexistentes estos archivos:

- `docs/roadmap/openclaw-cognitive-platform-roadmap.md`
- `docs/architecture/system-overview.md`
- `docs/architecture/authority-and-ownership.md`
- `docs/architecture/openclaw-substrate-boundary.md`
- `docs/architecture/linux-mint-runtime-baseline.md`
- `docs/contracts/*.md`

### Regla correcta

Si esos archivos no existen, **Sprint 0 debe crearlos** como parte del freeze arquitectónico.

No deben ser tratados como prerrequisitos bloqueantes para empezar la auditoría.  
Deben ser tratados como **entregables del propio Sprint 0**.

## Misión final del proyecto

La plataforma debe llegar a ser capaz de:

- usar OpenClaw como runtime conversacional real,
- clasificar misiones de conversación, documento, sistema, nodo, administración y evolución,
- planificar tareas simples y complejas,
- verificar resultados antes de declarar éxito,
- manejar memoria temporal, persistente y operativa gobernada,
- operar Linux Mint local de forma segura,
- leer archivos y resumir documentos autorizados,
- consultar y coordinar nodos distribuidos,
- mantener capability map, heartbeats y salud de nodos,
- degradar elegantemente cuando un nodo falla,
- registrar experiencias operativas,
- ejecutar experimentos controlados,
- puntuar resultados con reward/fitness,
- promover capacidades sólo con aprobación,
- aplicar rollback cuando corresponda,
- exponer observabilidad, auditoría y panel administrativo,
- mantener trazabilidad completa del sistema,
- reiniciar y reconstruir estado sin corrupción,
- funcionar razonablemente offline,
- no inventar acciones ejecutadas,
- no actuar como si fuera infalible.

## Frontera arquitectónica objetivo

### Substrate operativo objetivo

Aquí debe quedar la parte operacional apoyada en OpenClaw:

- canales,
- sesiones,
- memoria operativa base,
- tools y hooks subordinados,
- transporte hacia nodos,
- bindings,
- routing operativo,
- interacción conversacional base.

### Control plane objetivo

Aquí debe vivir la lógica soberana del nuevo sistema:

- clasificación,
- planeamiento,
- orquestación formal,
- memoria estructurada,
- runtime registry,
- governance,
- versionado de capacidades,
- experimentación controlada,
- reward/fitness,
- observabilidad.

### Adapters objetivo

Los adapters sólo pueden:

- traducir entrada,
- serializar/deserializar,
- exponer I/O,
- renderizar,
- transportar,
- enrutar llamadas hacia contratos del control plane.

Los adapters **no** pueden:

- decidir policy,
- decidir autorización,
- escribir memoria estructurada por sí mismos,
- promover capacidades,
- saltarse governance,
- introducir autoridad paralela,
- asumir gobierno soberano.

## Prohibiciones absolutas

Tienes prohibido:

1. Saltarte pasos del protocolo.
2. Trabajar sin auditar primero el repositorio real.
3. Declarar “cerrado” algo que sigue abierto.
4. Avanzar al sprint N+1 si el núcleo del sprint N sigue abierto.
5. Meter lógica central en hooks, skills o adapters.
6. Usar mocks como solución final.
7. Dejar TODOs estructurales.
8. Introducir servicios nuevos sin ownership claro y contrato definido.
9. Refactorizar por estética.
10. Reescribir grandes partes del repo sin necesidad del sprint activo.
11. Tocar demasiadas capas a la vez.
12. Abrir features fuera del alcance permitido.
13. Permitir persistencia estructurada fuera del servicio dueño.
14. Omitir tests.
15. Omitir validaciones.
16. Ocultar incertidumbre o contradicciones.
17. Tratar OpenClaw como sandbox multiusuario fuerte.
18. Tratar la arquitectura objetivo como si ya fuera la arquitectura real del repo.
19. Exigir documentos inexistentes como prerrequisitos si Sprint 0 debe crearlos.
20. Declarar topologías futuras como estado actual sin evidencia en el árbol real.

## Regla de parada obligatoria

Si detectas cualquiera de estas condiciones, debes detener implementación y reportar:

- contradicción fuerte entre código real y documentación,
- ownership ambiguo,
- rutas legacy recibiendo lógica nueva,
- varios centros de autoridad,
- persistencia sin dueño claro,
- adapters con lógica soberana,
- hooks mutando estado estructurado,
- contratos base incompatibles,
- imposibilidad de validar el sprint activo.

## Estándar de trabajo

Todo cambio debe incluir, como mínimo:

- diseño coherente,
- ownership claro,
- tipado suficiente,
- validación de entradas,
- validación de salidas cuando aplique,
- manejo de errores,
- contratos explícitos,
- impacto documentado,
- tests,
- comandos de verificación,
- criterio de rollback si altera estado.

## Regla sobre memoria

Debes separar como mínimo:

- memoria operativa de OpenClaw,
- memoria conversacional corta,
- memoria persistente útil,
- memoria operativa del sistema,
- memoria de experiencias,
- memoria experimental/evolutiva.

Debes impedir:

- mezcla entre usuarios,
- persistencia indiscriminada,
- escritura desde adapters,
- persistencia trivial,
- colisión entre memoria Markdown operativa y verdad estructurada,
- duplicación de fuentes de verdad.

## Regla sobre OpenClaw

OpenClaw sólo puede asumir, como base del sistema:

- entrada/salida conversacional,
- manejo de sesiones,
- memoria operativa base,
- tools y hooks subordinados,
- interacción de canales,
- substrate operativo,
- transporte a nodos.

OpenClaw no debe absorber:

- governance soberana,
- promotion de capacidades,
- experiment evaluation soberana,
- reward scoring soberano,
- verdad estructurada global,
- planificación compleja soberana,
- rollback soberano.

## Regla sobre Linux Mint

La plataforma es **Linux Mint-first real**.

Debes asumir como baseline objetivo de despliegue:

- Linux Mint 22.3,
- base Ubuntu Noble,
- systemd,
- PostgreSQL,
- Redis,
- rutas reales bajo `/opt`, `/etc`, `/var/lib`, `/var/log`,
- servicios systemd claros,
- operación local y auditable.

No diseñes como si fuera:

- Windows,
- macOS,
- entorno efímero,
- contenedores obligatorios para todo.

## Protocolo obligatorio de trabajo

### FASE A — AUDITORÍA REAL

Debes comenzar siempre por el repositorio real.

Debes identificar:

- árbol actual del proyecto,
- módulos existentes,
- ownership actual observable,
- centros de control actuales,
- rutas legacy,
- contratos presentes,
- deuda crítica,
- contradicciones entre arquitectura objetivo y código actual.

### FASE B — UBICACIÓN ARQUITECTÓNICA

Antes de cambiar algo debes declarar:

- módulo dueño,
- por qué esa lógica vive ahí,
- por qué no debe vivir en otro lado,
- contratos afectados,
- impacto en substrate,
- impacto en control plane,
- impacto en adapters,
- impacto en persistencia.

### FASE C — PLAN EXACTO

Debes listar:

- objetivo exacto del sprint,
- tareas secuenciales,
- rutas exactas a crear,
- rutas exactas a modificar,
- rutas exactas a congelar,
- rutas exactas a dejar intactas,
- rutas a eliminar sólo si el riesgo es bajo,
- tests,
- comandos,
- criterio de cierre,
- criterio de rollback.

### FASE D — IMPLEMENTACIÓN

Debes:

- escribir cambios completos,
- no dejar huecos estructurales,
- no abrir features fuera del sprint,
- no introducir flujos paralelos de autoridad,
- mantener consistencia entre docs, contratos y código.

### FASE E — VALIDACIÓN

Debes incluir:

- tests unitarios,
- tests de integración si aplica,
- validación de imports,
- validación de contratos,
- comandos de verificación,
- resultado esperado,
- validación de servicios o puertos si aplica.

### FASE F — CIERRE

Debes declarar explícitamente:

- qué quedó resuelto,
- qué quedó pendiente,
- qué deuda sigue abierta,
- si el sprint está:
  - **CERRADO**
  - **PARCIALMENTE CERRADO**
  - **ABIERTO**

## Formato obligatorio de respuesta

Responde siempre con estas secciones, en este orden:

1. **DIAGNÓSTICO ACTUAL DEL REPOSITORIO**
2. **CONTRADICCIONES Y DEUDA CRÍTICA**
3. **OBJETIVO TÉCNICO DEL SPRINT ACTUAL**
4. **ARQUITECTURA AFECTADA**
5. **RUTAS EXACTAS: CREATE / MODIFY / FREEZE / DELETE / KEEP-AS-IS**
6. **PLAN SECUENCIAL PASO A PASO**
7. **IMPLEMENTACIÓN REAL**
8. **TESTS EXACTOS**
9. **COMANDOS DE VALIDACIÓN**
10. **RIESGOS, LÍMITES Y ROLLBACK**
11. **ESTADO REAL DEL SPRINT**

No cambies el orden.  
No omitas secciones.  
No combines secciones.

## Formato obligatorio de cambios

Cada ruta debe clasificarse como:

- `CREATE: <ruta>`
- `MODIFY: <ruta>`
- `FREEZE: <ruta>`
- `DELETE: <ruta>`
- `KEEP-AS-IS: <ruta>`

Para cada ruta debes indicar:

- propósito,
- motivo,
- impacto,
- riesgo,
- desbloquea.

## Contratos mínimos obligatorios del sistema

Debes crear, alinear o validar como mínimo estos contratos:

1. `MissionAnalyzeRequest`
2. `MissionSpec`
3. `PlanCreateRequest`
4. `ExecutionPlan`
5. `RuntimeHeartbeat`
6. `RuntimeNode`
7. `DispatchRequest`
8. `MemoryWriteDecision`
9. `GovernanceDecision`
10. `CapabilityVersion`
11. `ExperimentRun`
12. `RewardScore`
13. `ResponseEnvelope`

Si aún no existen, Sprint 0 debe:

- decidir su ubicación canónica,
- definir su ownership,
- y dejar la forma mínima documentada o tipada para destrabar el proyecto.

## Catálogo canónico de sprints

### Sprint 0 — Freeze arquitectónico

Objetivo:

- auditoría real del repo,
- ownership,
- authority,
- contratos base,
- límites substrate / control plane / adapters,
- rutas permitidas/prohibidas,
- puertos, servicios, persistencia,
- freeze conceptual de legacy,
- base documental mínima para arrancar Sprint 1.

### Sprint 1 — Bootstrap operativo

Objetivo:

- estructura mínima inicial,
- configuración compartida,
- servicios base,
- logging,
- health endpoints,
- persistencia inicial.

### Sprint 2 — Mission Kernel

Objetivo:

- clasificación de misión,
- normalización,
- entidades,
- constraints,
- risk level,
- mission_id.

### Sprint 3 — Planner Engine

Objetivo:

- plan formal,
- heurística base,
- pasos,
- success criteria,
- fallback inicial.

### Sprint 4 — Runtime Registry

Objetivo:

- nodos,
- heartbeats,
- health,
- capability map,
- reconciliación inicial.

### Sprint 5 — Orchestrator

Objetivo:

- ejecución de planes,
- dispatch,
- retries,
- outcomes.

### Sprint 6 — Memory Service

Objetivo:

- short-term,
- long-term,
- operational memory,
- experience memory,
- filtro de ruido.

### Sprint 7 — Document Pipeline

Objetivo:

- ingestión,
- extracción,
- resumen,
- grounding,
- persistencia documental.

### Sprint 8 — Governance + Capability Registry

Objetivo:

- autorización,
- versionado,
- staging/production,
- rollback,
- auditoría.

### Sprint 9 — Experiment Lab + Reward/Fitness

Objetivo:

- hipótesis,
- baseline,
- candidate,
- sandbox,
- scoring,
- evidencia.

### Sprint 10 — OpenClaw Integration Layer

Objetivo:

- tools de alto nivel,
- skills subordinadas,
- hooks sin autoridad indebida,
- alineación con sesiones y memoria operativa.

### Sprint 11 — Distributed Runtime

Objetivo:

- multinodo,
- reconciliación avanzada,
- snapshots,
- degradación elegante.

### Sprint 12 — Administration + Observability

Objetivo:

- panel/API administrativa,
- estado general,
- historial,
- métricas,
- modo diagnóstico.

### Sprint 13 — Recovery y backups

Objetivo:

- snapshots,
- restore,
- backup,
- recovery drills,
- consistency checks.

### Sprint 14 — Hardening final

Objetivo:

- soak tests,
- smoke suite,
- runbooks,
- release readiness,
- cierre de deuda crítica.

## Regla de foco

No abras trabajo del sprint N+1 si el núcleo del sprint N sigue abierto.

No compenses una base débil con más features.

No confundas:

- arquitectura objetivo,
- arquitectura actual,
- plan de migración.

Debes separarlas explícitamente.

## Bloque obligatorio del sprint activo

### SPRINT ACTIVO: S1 — Rebaseline del catálogo y estado real

#### Objetivo específico

Alinear de forma explícita el catálogo canónico de sprints con el estado real implementado de la rama, sin abrir nuevas capacidades funcionales, sin renumerar retrospectivamente el catálogo 0–14 y sin negar el código ya existente en `shared/**` y `services/**`.

#### Modo

**AUDITORÍA REAL + PLAN EXACTO + IMPLEMENTACIÓN CONTROLADA + VALIDACIÓN REAL**

#### Alcance permitido

- corregir identidad del fork en metadata y documentación,
- alinear `AGENTS.override.md` con el estado real de la rama,
- alinear `README.md` con la identidad y arquitectura real del fork,
- alinear `docs/roadmap/openclaw-cognitive-platform-roadmap.md` con una nota de interpretación correcta,
- crear `docs/architecture/implementation-status.md`,
- declarar freeze explícito de zonas híbridas o legacy sensibles,
- documentar el mapeo entre sprint canónico y estado implementado,
- introducir o ajustar notas de realineamiento en documentación base.

#### Alcance prohibido

- nuevas features funcionales,
- expansión de `services/mission-kernel/**`,
- expansión de `services/planner/**`,
- expansión de `services/execution/**`,
- runtime registry real nuevo,
- memory service real nuevo,
- document pipeline real,
- governance funcional nueva,
- observability funcional nueva,
- integración nueva con bootstrap o tools,
- refactors cosméticos masivos,
- cambios grandes en dependencias o scripts,
- narrativa falsa de "seguimos en Sprint 0/1".

#### Entregables mínimos

- identidad del fork corregida en metadata y docs base,
- catálogo canónico preservado como referencia de destino,
- estado real implementado documentado explícitamente,
- mapeo oficial aproximado entre sprint canónico y capacidades reales ya implementadas,
- freeze explícito de zonas híbridas sensibles,
- diff documentado de `CREATE / MODIFY / FREEZE / DELETE / KEEP-AS-IS`.

#### Validaciones mínimas

- validación de consistencia documental entre `README.md`, `AGENTS.override.md`, roadmap e `implementation-status.md`,
- validación de JSON de `package.json` si se toca,
- verificación de que no se abrieron nuevas rutas funcionales,
- verificación de que el diff real queda dentro del alcance documental declarado.

#### Riesgo principal

- mantener una narrativa falsa donde la rama parece seguir en Sprint 0/1,
- negar capacidades ya implementadas en `shared/**` y `services/**`,
- dejar el catálogo canónico y el árbol real contando historias incompatibles.

#### Criterio de cierre

El rebaseline sólo puede darse por cerrado si:

- el catálogo canónico sigue existiendo como referencia de destino,
- el estado real implementado de la rama queda declarado explícitamente,
- existe un mapeo oficial entre sprints canónicos y capacidades reales ya implementadas,
- queda prohibida la narrativa falsa de "seguimos en Sprint 0/1",
- el fork tiene identidad propia coherente,
- la documentación principal cuenta la misma historia que el árbol real.

## Instrucción final

Empieza siempre por el **repositorio real**.

No des teoría general.

No improvises.

No asumas que la arquitectura objetivo ya existe.

Descubre primero el árbol real, luego documenta la diferencia, luego fija la interpretación correcta del catálogo canónico y deja el rebaseline narrativo listo.

No avances por ansiedad.

No cierres antes de tiempo.

No sustituyas evidencia por confianza.

Haz avanzar este proyecto sprint por sprint, con disciplina estricta, foco absoluto y arquitectura verificable.
