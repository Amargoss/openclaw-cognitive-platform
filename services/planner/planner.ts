import type {
  ExecutionPlan,
  ExecutionPlanStep,
  MissionSpec,
} from "../../shared/contracts/index.js";
import type { PlannerResult } from "./types.js";

function isBlank(value: string): boolean {
  return value.trim().length === 0;
}

function createPlanId(missionId: string): string {
  return `plan:${missionId}`;
}

function createStepId(planId: string, sequence: number): string {
  return `${planId}:step-${sequence}`;
}

function resolveApplicationTarget(entities: string[] | undefined): { appId: string } | null {
  if (!entities || entities.length === 0) {
    return null;
  }

  const appId = entities[0]?.trim();

  if (!appId) {
    return null;
  }

  return { appId };
}

function createPingSteps(planId: string): ExecutionPlanStep[] {
  return [
    {
      stepId: createStepId(planId, 1),
      title: "Prepare pong response",
      kind: "respond",
      description: "Prepare a pong response",
      status: "pending",
    },
  ];
}

function createInfoSteps(planId: string): ExecutionPlanStep[] {
  return [
    {
      stepId: createStepId(planId, 1),
      title: "Summarize available capabilities",
      kind: "inform",
      description: "Summarize the capabilities relevant to the mission question",
      status: "pending",
    },
    {
      stepId: createStepId(planId, 2),
      title: "Prepare informational response",
      kind: "inform",
      description: "Prepare a concise informational response for the mission",
      status: "pending",
    },
  ];
}

function createActionSteps(planId: string, mission: MissionSpec): ExecutionPlanStep[] | null {
  const target = resolveApplicationTarget(mission.entities);

  if (!target) {
    return null;
  }

  return [
    {
      stepId: createStepId(planId, 1),
      title: "Identify target application",
      kind: "identify-target",
      description: "Identify the application referenced by the mission",
      status: "pending",
    },
    {
      stepId: createStepId(planId, 2),
      title: "Prepare application action",
      kind: "prepare-action",
      description: "Prepare an action plan for opening the target application",
      status: "pending",
      target: {
        type: "application",
        appId: target.appId,
      },
    },
  ];
}

function buildSteps(mission: MissionSpec, planId: string): ExecutionPlanStep[] | null {
  switch (mission.type) {
    case "ping":
      return createPingSteps(planId);

    case "info":
      return createInfoSteps(planId);

    case "action":
      if (mission.intent === "open_application") {
        return createActionSteps(planId, mission);
      }
      return null;

    case "unknown":
      return null;

    default:
      return null;
  }
}

export function createExecutionPlan(mission: MissionSpec): PlannerResult {
  if (isBlank(mission.missionId) || isBlank(mission.intent)) {
    return {
      ok: false,
      plan: null,
      error: "mission-invalid",
    };
  }

  const planId = createPlanId(mission.missionId);
  const steps = buildSteps(mission, planId);

  if (!steps) {
    return {
      ok: false,
      plan: null,
      error: "mission-unsupported",
    };
  }

  const plan: ExecutionPlan = {
    planId,
    missionId: mission.missionId,
    planType: mission.type,
    intent: mission.intent,
    steps,
    confidence: mission.confidence,
    createdAt: mission.normalizedAt,
  };

  return {
    ok: true,
    plan,
    error: null,
  };
}
