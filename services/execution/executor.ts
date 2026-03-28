import type { ExecutionPlan, ExecutionPlanStep } from "../../shared/contracts/index.js";
import type { ExecutionResult, ExecutionStepResult } from "./types.js";

function isBlank(value: string): boolean {
  return value.trim().length === 0;
}

function createExecutionId(planId: string): string {
  return `exec:${planId}`;
}

function executeStep(step: ExecutionPlanStep, executedAt: string): ExecutionStepResult {
  switch (step.kind) {
    case "respond":
      return {
        stepId: step.stepId,
        status: "completed",
        output: "pong",
        executedAt,
      };
    case "inform":
      return {
        stepId: step.stepId,
        status: "completed",
        output: "informational-response",
        executedAt,
      };
    case "identify-target":
      return {
        stepId: step.stepId,
        status: "completed",
        output: "unknown-target",
        executedAt,
      };
    case "prepare-action":
      return {
        stepId: step.stepId,
        status: "completed",
        output: "action-prepared",
        executedAt,
      };
  }
}

export function executePlan(plan: ExecutionPlan): ExecutionResult {
  const executionId = createExecutionId(plan.planId);

  if (isBlank(plan.planId) || plan.steps.length === 0) {
    return {
      executionId,
      planId: plan.planId,
      status: "failed",
      steps: [],
      outputs: [],
      finishedAt: plan.createdAt,
    };
  }

  const stepResults = plan.steps.map((step) => executeStep(step, plan.createdAt));
  const outputs = stepResults.map((step) => step.output);
  const status = stepResults.every((step) => step.status === "completed") ? "completed" : "failed";

  return {
    executionId,
    planId: plan.planId,
    status,
    steps: stepResults,
    outputs,
    finishedAt: plan.createdAt,
  };
}
