import type {
  MissionAnalyzeRequest,
  MissionSpec,
  ResponseEnvelope,
} from "../../shared/contracts/index.js";
import { classifyMissionInput } from "./classifier.js";
import { executeMission } from "./executor.js";
import { buildMissionSpec } from "./mission-builder.js";
import { normalizeMissionInput } from "./normalizer.js";
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

export function analyzeMissionRequest(
  request: MissionAnalyzeRequest,
): ResponseEnvelope<MissionSpec> {
  if (isBlank(request.requestId)) {
    return {
      requestId: request.requestId,
      ok: false,
      data: null,
      error: "mission-request-id-empty",
      timestamp: request.requestedAt,
    };
  }

  if (isBlank(request.input)) {
    return {
      requestId: request.requestId,
      ok: false,
      data: null,
      error: "mission-input-empty",
      timestamp: request.requestedAt,
    };
  }

  const normalization = normalizeMissionInput(request.input);
  const classification = classifyMissionInput(normalization.normalizedInput);

  if (classification.type === "unknown") {
    return {
      requestId: request.requestId,
      ok: false,
      data: null,
      error: "mission-unsupported",
      timestamp: request.requestedAt,
    };
  }

  return {
    requestId: request.requestId,
    ok: true,
    data: buildMissionSpec({
      request,
      classification,
      normalization,
    }),
    error: null,
    timestamp: request.requestedAt,
  };
}
