# Persistence Map

## Estado actual

## Memoria operativa de OpenClaw

- sesiones y estado operativo dentro del runtime OpenClaw
- owner factual: substrate
- rol: conversación y operación inmediata
- no debe tratarse como verdad estructurada global

## Configuración y workspace

- ubicación factual: `~/.openclaw`
- incluye configuración del gateway, workspace y datos de operación local
- owner factual: runtime/substrate local

## Memoria por archivos

- `MEMORY.md` y `memory/*.md` forman parte del workflow de memoria de archivos y recall
- owner factual hoy: herramientas/plugins de memoria sobre el runtime actual
- riesgo: colisión con una futura verdad estructurada si no se gobierna

## SQLite/vector local

- `src/memory` usa `node:sqlite` y gestión local de embeddings/indexado
- owner factual: subsistema de memoria local actual
- uso: indexado, búsqueda híbrida y recuperación
- límite: no equivale a verdad estructurada global gobernada

## LanceDB opcional

- `extensions/memory-lancedb`
- owner factual: plugin subordinado
- uso: persistencia y búsqueda vectorial adicional
- riesgo Sprint 0:
  - auto-capture
  - auto-recall
  - persistencia desde plugin
  - posible segundo centro de verdad

## Structured truth objetivo

Objetivo futuro, no implementado aún:

- owner canónico: MemoryService bajo reglas de GovernanceController
- persistencia estructurada con:
  - dueño
  - contrato
  - criterio
  - categoría
  - motivo
  - trazabilidad

## PostgreSQL y Redis

- parte del baseline objetivo del proyecto
- no hay evidencia de uso activo en el árbol actual para el cognitive platform
- Sprint 0 los documenta como target operativo futuro, no como estado presente

## Reglas de Sprint 0

- no mezclar memoria operativa con verdad estructurada
- no permitir que adapters/plugins escriban verdad estructurada por sí mismos
- no tratar `src/memory` ni `extensions/memory-lancedb` como autoridad soberana
- toda persistencia estructurada futura debe pasar por contrato y governance
