import type { MissionAnalyzeRequest, MissionSpec } from "../../shared/contracts/index.js";
import type { ClassifiedMission } from "./classifier.js";
import type { NormalizedMissionInput } from "./normalizer.js";
import { missionSpecConstraints } from "./types.js";

export function buildMissionSpec(params: {
  request: MissionAnalyzeRequest;
  classification: ClassifiedMission;
  normalization: NormalizedMissionInput;
}): MissionSpec {
  const { request, classification, normalization } = params;

  switch (classification.type) {
    case "ping":
      return {
        missionId: request.requestId,
        type: "ping",
        intent: normalization.intent,
        entities: normalization.entities,
        confidence: classification.confidence,
        title: "Ping mission",
        objective: "Respond to a ping mission",
        constraints: [...missionSpecConstraints],
        normalizedAt: request.requestedAt,
      };
    case "info":
      return {
        missionId: request.requestId,
        type: "info",
        intent: normalization.intent,
        entities: normalization.entities,
        confidence: classification.confidence,
        title: "Capability information mission",
        objective: "Answer a basic capability question",
        constraints: [...missionSpecConstraints],
        normalizedAt: request.requestedAt,
      };
    case "action":
      return {
        missionId: request.requestId,
        type: "action",
        intent: normalization.intent,
        entities: normalization.entities,
        confidence: classification.confidence,
        title: "Action mission",
        objective: "Prepare a basic action-oriented mission",
        constraints: [...missionSpecConstraints],
        normalizedAt: request.requestedAt,
      };
    case "unknown":
      return {
        missionId: request.requestId,
        type: "unknown",
        intent: normalization.intent,
        entities: normalization.entities,
        confidence: classification.confidence,
        title: "Unknown mission",
        objective: "Handle an unsupported mission input",
        constraints: [...missionSpecConstraints],
        normalizedAt: request.requestedAt,
      };
  }
}
