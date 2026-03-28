export const missionCategories = ["ping", "info", "action", "unknown"] as const;

export type MissionCategory = (typeof missionCategories)[number];

export interface ClassifiedMission {
  type: MissionCategory;
  confidence: number;
}

const infoPatterns = ["que puedes hacer", "qué puedes hacer", "what can you do", "help"] as const;

const actionPatterns = [/^abre\s+/, /^open\s+/, /^launch\s+/] as const;

export function classifyMissionInput(input: string): ClassifiedMission {
  if (input === "ping") {
    return { type: "ping", confidence: 1 };
  }

  if (infoPatterns.includes(input as (typeof infoPatterns)[number])) {
    return { type: "info", confidence: 0.9 };
  }

  if (actionPatterns.some((pattern) => pattern.test(input))) {
    return { type: "action", confidence: 0.9 };
  }

  return { type: "unknown", confidence: 0.2 };
}
