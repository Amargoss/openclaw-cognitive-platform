export type ExecutionStatus = "completed" | "failed";

export interface ExecutionStepResult {
  stepId: string;
  status: ExecutionStatus;
  output: string;
  executedAt: string;
}

export interface ExecutionResult {
  executionId: string;
  planId: string;
  status: ExecutionStatus;
  steps: ExecutionStepResult[];
  outputs: string[];
  finishedAt: string;
}
