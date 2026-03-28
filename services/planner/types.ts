import type { ExecutionPlan } from "../../shared/contracts/index.js";

export const plannerErrorCodes = ["mission-invalid", "mission-unsupported"] as const;

export type PlannerErrorCode = (typeof plannerErrorCodes)[number];

export type PlannerResult =
  | {
      ok: true;
      plan: ExecutionPlan;
      error: null;
    }
  | {
      ok: false;
      plan: null;
      error: PlannerErrorCode;
    };
