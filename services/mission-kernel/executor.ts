import type { Mission, MissionResult } from "./types.js";

export function executeMission(mission: Mission): MissionResult {
  switch (mission.type) {
    case "ping":
      return {
        missionId: mission.id,
        type: mission.type,
        ok: true,
        data: {
          reply: "pong",
        },
        error: null,
      };
    default:
      return {
        missionId: mission.id,
        type: mission.type,
        ok: false,
        data: null,
        error: {
          code: "UNKNOWN_MISSION",
          message: `Unsupported mission type: ${mission.type}`,
        },
      };
  }
}
