# Linux Mint Runtime Baseline

## Estado actual

Sprint 0 no convierte al repositorio en una plataforma Linux Mint-first plenamente implementada. Lo que existe hoy es un repositorio OpenClaw operativo, multiplataforma, con piezas locales que pueden ejecutarse en Linux, pero sin un baseline completo del cognitive platform ya materializado para Linux Mint 22.3.

### Lo observable hoy en el repo

- runtime principal centrado en Node/OpenClaw
- gateway local visible en `docker-compose.yml`
- puerto gateway factual: `18789`
- puerto bridge factual: `18790`
- endpoint de salud factual: `GET /healthz` en `127.0.0.1:18789`
- configuración y workspace locales en `~/.openclaw`
- memoria local con `node:sqlite` en `src/memory`
- systemd factual observado sólo en:
  - `scripts/systemd/openclaw-auth-monitor.service`
  - `scripts/systemd/openclaw-auth-monitor.timer`

### Lo que no debe afirmarse como estado actual

- no hay evidencia en el árbol actual de un control plane completo desplegado con systemd en Linux Mint
- no hay evidencia de PostgreSQL o Redis activos como backend real del cognitive platform en este repo
- no hay evidencia de Nginx configurado como frontend real del control plane en este repo
- no hay topología física final de servicios cognitivos implementada todavía

## Baseline operativo objetivo

Este es el baseline operativo que el proyecto toma como referencia para converger, sin afirmar que ya esté completamente implementado en Sprint 0.

### Sistema operativo

- distribución base objetivo: Linux Mint 22.3
- base upstream: Ubuntu Noble
- orientación operativa: instalación local persistente, no sistema efímero

### systemd

- init system objetivo: `systemd`
- baseline objetivo: `systemd 255`
- toda pieza de servicio real futura debe:
  - declarar unidad `systemd`
  - declarar usuario
  - declarar `WorkingDirectory`
  - declarar `EnvironmentFile` o equivalente explícito
  - declarar logs
  - declarar dependencia mínima
  - declarar health endpoint si expone red

### Node, npm y Codex CLI local

- runtime principal objetivo: Node local estable
- baseline de proyecto: Node 24
- gestor de paquetes de referencia local: `npm` o entorno compatible con el repo actual
- baseline operativo local:
  - Node instalado localmente
  - CLI local disponible para OpenClaw
  - Codex CLI local disponible como herramienta de trabajo y orquestación humana
- Sprint 0 no afirma que el repo ya imponga o verifique automáticamente todo este baseline

### OpenClaw local

- OpenClaw local es el substrate operativo esperado
- debe poder vivir como servicio local persistente
- baseline factual ya visible:
  - gateway local
  - configuración local
  - workspace local
- baseline objetivo adicional:
  - operación estable en Linux Mint
  - integración clara con control plane futuro
  - separación explícita entre substrate y autoridades soberanas

### Rutas base esperadas

Rutas operativas objetivo para despliegue Linux Mint-first:

- binarios o checkout operativo bajo `/opt`
- configuración bajo `/etc`
- estado persistente bajo `/var/lib`
- logs bajo `/var/log`
- runtime local de usuario y trabajo actual bajo `~/.openclaw` mientras el repo siga en fase de transición

Sprint 0 no afirma que esas rutas objetivo ya estén materializadas en el árbol actual.

## Baseline objetivo para PostgreSQL, Redis y Nginx

### PostgreSQL

- baseline objetivo: backend persistente estructurado del control plane cuando MemoryService, GovernanceController y demás servicios ya existan de forma real
- estado actual:
  - no implementado ni evidenciado como backend activo del cognitive platform en este repo

### Redis

- baseline objetivo: soporte operacional para colas, estado efímero coordinado o aceleración donde el diseño final lo requiera
- estado actual:
  - no implementado ni evidenciado como backend activo del cognitive platform en este repo

### Nginx

- baseline objetivo: frontend reverse proxy y punto de exposición operativo cuando existan servicios HTTP separados que lo justifiquen
- estado actual:
  - no implementado ni evidenciado como pieza activa del repo para el cognitive platform

## Límites de Sprint 0

- Sprint 0 sólo documenta el baseline Linux Mint-first
- Sprint 0 no despliega servicios nuevos
- Sprint 0 no introduce unit files funcionales del control plane
- Sprint 0 no integra PostgreSQL, Redis ni Nginx como componentes operativos reales
- Sprint 0 no mueve el repositorio a una topología futura inexistente
- Sprint 0 no abre Sprint 1

## Lo que todavía no está implementado

- baseline Linux Mint-first materializado end-to-end
- servicios cognitivos reales bajo `systemd`
- topología física final de control plane
- PostgreSQL real del control plane
- Redis real del control plane
- Nginx real del control plane
- integración operativa completa entre OpenClaw substrate y servicios cognitivos soberanos

## Regla de honestidad operativa

Este documento define el baseline operativo objetivo de Linux Mint 22.3 para el proyecto. No debe leerse como afirmación de que todo ese baseline ya existe en el código o en la operación actual del repositorio.
