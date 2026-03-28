import type {
  MissionAnalyzeRequest,
  MissionSpec,
  ResponseEnvelope,
} from "../../../shared/contracts/index.js";

export interface MissionAnalyzerPort {
  analyzeMissionRequest(request: MissionAnalyzeRequest): ResponseEnvelope<MissionSpec>;
}
