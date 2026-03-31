export type ExecutionStatus = "completed" | "failed" | "blocked";

export type ExecutionErrorCode =
  | "plan-invalid"
  | "step-unsupported"
  | "app-not-allowed"
  | "binary-not-found"
  | "execution-failed";

export interface ExecutionStepResult {
  stepId: string;
  status: ExecutionStatus;
  output: string;
  executedAt: string;
  errorCode?: ExecutionErrorCode;
  details?: Record<string, string | number | boolean | null>;
}

export interface ExecutionResult {
  executionId: string;
  planId: string;
  status: ExecutionStatus;
  steps: ExecutionStepResult[];
  outputs: string[];
  finishedAt: string;
  errorCode?: ExecutionErrorCode;
  details?: Record<string, string | number | boolean | null>;
}
