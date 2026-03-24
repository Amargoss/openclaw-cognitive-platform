# Dependency Rules

## Regla principal

Las dependencias deben reforzar una sola cadena de autoridad. Si una dependencia permite que un adapter o plugin cambie comportamiento sustantivo sin control plane explícito, esa dependencia es inválida.

## Dependencias permitidas en el árbol actual

- adapters -> substrate mediante APIs y contratos explícitos
- control plane factual -> substrate mediante hooks/control surfaces explícitas
- UI/CLI/apps -> gateway/control UI como consumidores de I/O
- plugins de canal -> contratos/runtime de plugin sin absorber authority soberana
- memoria local actual -> substrate/runtime actual mientras quede documentado como no canónico

## Dependencias prohibidas

- adapters -> verdad estructurada directa
- gateway -> governance soberana
- plugins -> promotion/rollback/approval
- skills/hooks -> policy central
- memory plugins -> decisión de persistencia duradera soberana
- substrate -> dependencias fuertes sobre UI/apps

## Reglas por zona

### `src/gateway`

- puede depender de transporte, auth, sessions, protocol
- no debe convertirse en owner de governance ni de MemoryService

### `src/acp/control-plane` y `src/acp/runtime`

- pueden depender de contracts y runtime control surfaces
- no deben absorber features distribuidas o planners funcionales en Sprint 0

### `src/cli`, `ui/`, `apps/`

- pueden consumir config, gateway endpoints y contracts expuestos
- no pueden emitir decisiones soberanas

### `extensions/` y `skills/`

- pueden extender capacidades subordinadas
- no pueden definir autoridad global del sistema

## Regla documental de Sprint 0

Cuando exista duda, se prefiere documentar una dependencia como prohibida o legacy antes que normalizar un bypass arquitectónico.
