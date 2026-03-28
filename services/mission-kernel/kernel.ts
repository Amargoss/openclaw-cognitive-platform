import { executeMission } from "./executor.js";
import type { Mission, MissionResult } from "./types.js";

function isBlank(value: string): boolean {
  return value.trim().length === 0;
}

export function runMission(mission: Mission): MissionResult {
  if (isBlank(mission.id)) {
    return {
      missionId: mission.id,
      type: mission.type,
      ok: false,
      data: null,
      error: {
        code: "INVALID_MISSION",
        message: "Mission id must not be empty",
      },
    };
  }

  if (isBlank(mission.type)) {
    return {
      missionId: mission.id,
      type: mission.type,
      ok: false,
      data: null,
      error: {
        code: "INVALID_MISSION",
        message: "Mission type must not be empty",
      },
    };
  }

  return executeMission(mission);
}
