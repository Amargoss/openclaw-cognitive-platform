/**
 * Mission Classifier
 * ------------------
 * Responsable de:
 * - Clasificar tipo de misión (ping | info | action | unknown)
 * - Determinar intent básico cuando aplica
 * - Entregar confidence determinista
 *
 *   No:
 * - No normaliza entidades
 * - No construye MissionSpec completo
 * - No decide policy
 */

export const missionCategories = ["ping", "info", "action", "unknown"] as const;

export type MissionCategory = (typeof missionCategories)[number];

export interface ClassifiedMission {
  type: MissionCategory;
  intent?: string; //  FIX: necesario para evitar drift con planner
  confidence: number;
}

// -----------------------------
// Patterns
// -----------------------------

const infoPatterns = ["que puedes hacer", "qué puedes hacer", "what can you do", "help"] as const;

const actionPatterns = [/^abre\s+/, /^open\s+/, /^launch\s+/] as const;

// -----------------------------
// Utils
// -----------------------------

function normalizeInput(input: string): string {
  return input.trim().toLowerCase();
}

// -----------------------------
// Main classifier
// -----------------------------

export function classifyMissionInput(input: string): ClassifiedMission {
  const normalized = normalizeInput(input);

  // -----------------------------
  // PING
  // -----------------------------
  if (normalized === "ping") {
    return {
      type: "ping",
      intent: "health_check",
      confidence: 1,
    };
  }

  // -----------------------------
  // INFO
  // -----------------------------
  if (infoPatterns.includes(normalized as (typeof infoPatterns)[number])) {
    return {
      type: "info",
      intent: "describe_capabilities",
      confidence: 0.9,
    };
  }

  // -----------------------------
  // ACTION (CONTROLADO)
  // -----------------------------
  if (actionPatterns.some((pattern) => pattern.test(normalized))) {
    return {
      type: "action",
      intent: "open_application", // FIX CRÍTICO
      confidence: 0.9,
    };
  }

  // -----------------------------
  // UNKNOWN (SAFE FALLBACK)
  // -----------------------------
  return {
    type: "unknown",
    intent: "unknown",
    confidence: 0.2,
  };
}
