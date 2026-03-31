# Implementation Status

## Objetivo

Este documento fija la interpretación correcta entre el catálogo canónico de sprints y el estado real implementado de la rama `Amargoss/openclaw-cognitive-platform`.

## Reglas de precedencia

- El catálogo canónico de sprints 0–14 sigue existiendo como referencia de destino.
- El árbol real del repositorio define el estado implementado actual.
- Cualquier contradicción entre catálogo y árbol real se trata como deuda de alineación.
- No se acepta la narrativa falsa de que la rama activa "sigue en Sprint 0/1" si el código real ya implementa capacidades posteriores.

## Resumen ejecutivo

- OpenClaw sigue siendo el substrate operativo principal bajo `src/**`, `extensions/**`, `apps/**`, `ui/**` y `skills/**`.
- La rama ya implementa una base real en `shared/**` y `services/**`.
- Lo ya implementado en esta rama ≈ Sprint 0-5 del catálogo, con huecos abiertos todavía en Sprint 4 y Sprint 6+.

## Estado real implementado

### Superficies reales ya presentes

- `shared/contracts/**`: contratos tipados mínimos del control plane.
- `shared/config/**`, `shared/db/**`, `shared/logging/**`: base de bootstrap ya materializada.
- `services/_bootstrap/**`: arranque mínimo, health/readiness y wiring inicial.
- `services/mission-kernel/**`: análisis, clasificación, normalización y tests mínimos.
- `services/planner/**`: creación determinista de `ExecutionPlan`.
- `services/execution/**`: ejecución determinista mínima y tests.

### Superficies híbridas o legacy que siguen activas

- `src/acp/control-plane/**`
- `src/acp/runtime/**`
- `src/gateway/control-plane-audit.ts`
- `src/gateway/control-plane-rate-limit.ts`
- `src/memory/**`
- `extensions/memory-core/**`
- `extensions/memory-lancedb/**`

Estas rutas siguen existiendo por compatibilidad, transición o deuda de separación, pero no deben recibir nueva lógica soberana dentro de este rebaseline.

## Mapeo oficial aproximado

| Sprint canónico | Estado aproximado en la rama                                               |
| --------------- | -------------------------------------------------------------------------- |
| Sprint 0        | Freeze arquitectónico y baseline documental ya parcialmente materializados |
| Sprint 1        | Presente en `shared/**` y `services/_bootstrap/**`                         |
| Sprint 2        | Presente en `services/mission-kernel/**`                                   |
| Sprint 3        | Presente en `services/planner/**`                                          |
| Sprint 4        | Abierto; RuntimeRegistry formal todavía incompleto                         |
| Sprint 5        | Parcialmente aproximado por `services/execution/**`                        |
| Sprint 6+       | Abiertos                                                                   |

## Interpretación obligatoria

- Este mapeo no renumera retrospectivamente el catálogo canónico.
- Este mapeo no declara cerrados automáticamente todos los sprints aproximados.
- Este mapeo sí obliga a que README, roadmap y AGENTS cuenten la misma historia que el árbol real.

## Límites del rebaseline

- No abrir nuevas capacidades funcionales.
- No expandir `services/mission-kernel/**`, `services/planner/**` ni `services/execution/**`.
- No tocar `src/**` ni `extensions/**` salvo documentación o freeze explícito no funcional cuando sea estrictamente necesario.
- No negar capacidades ya implementadas para sostener una narrativa desactualizada.
