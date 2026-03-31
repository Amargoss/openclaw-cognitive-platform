import { analyzeMissionRequest } from "../../mission-kernel/index.js";
import type { MissionAnalyzerPort } from "./mission-analyzer.js";

export function createMissionKernelMissionAnalyzer(): MissionAnalyzerPort {
  return {
    analyzeMissionRequest,
  };
}
