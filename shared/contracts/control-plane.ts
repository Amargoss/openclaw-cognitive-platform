export const controlPlaneContractIds = [
  "MissionAnalyzeRequest",
  "MissionSpec",
  "PlanCreateRequest",
  "ExecutionPlan",
  "RuntimeHeartbeat",
  "RuntimeNode",
  "DispatchRequest",
  "MemoryWriteDecision",
  "GovernanceDecision",
  "CapabilityVersion",
  "ExperimentRun",
  "RewardScore",
  "ResponseEnvelope",
] as const;

export type ContractId = (typeof controlPlaneContractIds)[number];

export interface MissionAnalyzeRequest {
  requestId: string;
  source: string;
  input: string;
  requestedAt: string;
}

export interface MissionSpec {
  missionId: string;
  title: string;
  objective: string;
  constraints: string[];
  normalizedAt: string;
}

export interface PlanCreateRequest {
  requestId: string;
  missionId: string;
  requestedAt: string;
}

export interface ExecutionPlanStep {
  stepId: string;
  title: string;
  status: "pending";
}

export interface ExecutionPlan {
  planId: string;
  missionId: string;
  steps: ExecutionPlanStep[];
  createdAt: string;
}

export interface RuntimeHeartbeat {
  nodeId: string;
  health: "healthy" | "degraded" | "offline";
  observedAt: string;
}

export interface RuntimeNode {
  nodeId: string;
  runtimeKind: string;
  health: "healthy" | "degraded" | "offline";
  lastSeenAt: string;
}

export interface DispatchRequest {
  requestId: string;
  planId: string;
  nodeId: string;
  requestedAt: string;
}

export interface MemoryWriteDecision {
  decisionId: string;
  subject: string;
  category: string;
  action: "allow" | "deny" | "defer";
  reason: string;
  decidedAt: string;
}

export interface GovernanceDecision {
  decisionId: string;
  subjectType: string;
  subjectId: string;
  verdict: "approve" | "block" | "promote" | "rollback";
  reason: string;
  decidedAt: string;
}

export interface CapabilityVersion {
  capabilityId: string;
  version: string;
  channel: string;
  recordedAt: string;
}

export interface ExperimentRun {
  runId: string;
  hypothesis: string;
  status: "planned" | "running" | "completed";
  createdAt: string;
}

export interface RewardScore {
  scoreId: string;
  subjectId: string;
  score: number;
  scoredAt: string;
}

export interface ResponseEnvelope<T> {
  ok: boolean;
  data: T | null;
  error: string | null;
  timestamp: string;
}
