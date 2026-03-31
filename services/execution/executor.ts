import type { ExecutionPlan, ExecutionPlanStep } from "../../shared/contracts/index.js";
import { createLinuxSpawnLauncher } from "./adapters/linux-spawn.js";
import { resolveAllowedApplication } from "./allowlist/app-allowlist.js";
import type { ExecutionResult, ExecutionStepResult } from "./types.js";

function isBlank(value: string): boolean {
  return value.trim().length === 0;
}

function createExecutionId(planId: string): string {
  return `exec:${planId}`;
}

interface ExecutionDependencies {
  now?: () => string;
  launchApplication?: ReturnType<typeof createLinuxSpawnLauncher>;
  resolveApplication?: typeof resolveAllowedApplication;
}

function createStepResult(
  step: ExecutionPlanStep,
  executedAt: string,
  result: Omit<ExecutionStepResult, "stepId" | "executedAt">,
): ExecutionStepResult {
  return {
    stepId: step.stepId,
    executedAt,
    ...result,
  };
}

async function executeStep(
  step: ExecutionPlanStep,
  executedAt: string,
  dependencies: Required<ExecutionDependencies>,
): Promise<ExecutionStepResult> {
  switch (step.kind) {
    case "respond":
      return createStepResult(step, executedAt, {
        status: "completed",
        output: "pong",
      });
    case "inform":
      return createStepResult(step, executedAt, {
        status: "completed",
        output: "informational-response",
      });
    case "identify-target":
      return createStepResult(step, executedAt, {
        status: "completed",
        output: step.target?.appId ?? "unknown-target",
      });
    case "prepare-action": {
      if (step.target?.type !== "application" || !step.target.appId.trim()) {
        return createStepResult(step, executedAt, {
          status: "failed",
          output: "invalid-action-target",
          errorCode: "step-unsupported",
        });
      }

      const allowedApplication = dependencies.resolveApplication(step.target.appId);

      if (!allowedApplication) {
        return createStepResult(step, executedAt, {
          status: "blocked",
          output: "application-blocked",
          errorCode: "app-not-allowed",
          details: {
            appId: step.target.appId,
          },
        });
      }

      const launchResult = await dependencies.launchApplication({
        binary: allowedApplication.binary,
        args: allowedApplication.args,
      });

      return createStepResult(step, executedAt, launchResult);
    }
    default:
      return createStepResult(step, executedAt, {
        status: "failed",
        output: "unsupported-step",
        errorCode: "step-unsupported",
        details: {
          kind: (step as ExecutionPlanStep & { kind: string }).kind,
        },
      });
  }
}

function resolveFinalStatus(stepResults: ExecutionStepResult[]): ExecutionResult["status"] {
  if (stepResults.some((step) => step.status === "failed")) {
    return "failed";
  }

  if (stepResults.some((step) => step.status === "blocked")) {
    return "blocked";
  }

  return "completed";
}

export async function executePlan(
  plan: ExecutionPlan,
  dependencies: ExecutionDependencies = {},
): Promise<ExecutionResult> {
  const executionId = createExecutionId(plan.planId);
  const resolvedDependencies: Required<ExecutionDependencies> = {
    now: dependencies.now ?? (() => plan.createdAt),
    launchApplication: dependencies.launchApplication ?? createLinuxSpawnLauncher(),
    resolveApplication: dependencies.resolveApplication ?? resolveAllowedApplication,
  };

  if (isBlank(plan.planId) || plan.steps.length === 0) {
    return {
      executionId,
      planId: plan.planId,
      status: "failed",
      steps: [],
      outputs: [],
      finishedAt: plan.createdAt,
      errorCode: "plan-invalid",
    };
  }

  const stepResults: ExecutionStepResult[] = [];

  for (const step of plan.steps) {
    stepResults.push(await executeStep(step, resolvedDependencies.now(), resolvedDependencies));
  }

  const outputs = stepResults.map((step) => step.output);
  const status = resolveFinalStatus(stepResults);

  return {
    executionId,
    planId: plan.planId,
    status,
    steps: stepResults,
    outputs,
    finishedAt: plan.createdAt,
  };
}
