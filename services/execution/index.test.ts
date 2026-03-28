import { describe, expect, it } from "vitest";
import { executePlan } from "./index.js";

describe("services/execution", () => {
  it("executes a ping plan deterministically", () => {
    const result = executePlan({
      planId: "plan:req-ping",
      missionId: "req-ping",
      planType: "ping",
      intent: "ping",
      confidence: 1,
      steps: [
        {
          stepId: "plan:req-ping:step-1",
          title: "Prepare pong response",
          kind: "respond",
          description: "Prepare a pong response",
          status: "pending",
        },
      ],
      createdAt: "2026-03-28T00:00:00.000Z",
    });

    expect(result).toEqual({
      executionId: "exec:plan:req-ping",
      planId: "plan:req-ping",
      status: "completed",
      steps: [
        {
          stepId: "plan:req-ping:step-1",
          status: "completed",
          output: "pong",
          executedAt: "2026-03-28T00:00:00.000Z",
        },
      ],
      outputs: ["pong"],
      finishedAt: "2026-03-28T00:00:00.000Z",
    });
  });

  it("executes an info plan in step order", () => {
    const result = executePlan({
      planId: "plan:req-info",
      missionId: "req-info",
      planType: "info",
      intent: "describe_capabilities",
      confidence: 0.9,
      steps: [
        {
          stepId: "plan:req-info:step-1",
          title: "Summarize available capabilities",
          kind: "inform",
          description: "Summarize the capabilities relevant to the mission question",
          status: "pending",
        },
        {
          stepId: "plan:req-info:step-2",
          title: "Prepare informational response",
          kind: "inform",
          description: "Prepare a concise informational response for the mission",
          status: "pending",
        },
      ],
      createdAt: "2026-03-28T00:00:00.000Z",
    });

    expect(result.status).toBe("completed");
    expect(result.steps.map((step) => step.stepId)).toEqual([
      "plan:req-info:step-1",
      "plan:req-info:step-2",
    ]);
    expect(result.outputs).toEqual(["informational-response", "informational-response"]);
    expect(result.finishedAt).toBe("2026-03-28T00:00:00.000Z");
  });

  it("executes an action plan with deterministic simulated outputs", () => {
    const result = executePlan({
      planId: "plan:req-action",
      missionId: "req-action",
      planType: "action",
      intent: "open_application",
      confidence: 0.9,
      steps: [
        {
          stepId: "plan:req-action:step-1",
          title: "Identify target application",
          kind: "identify-target",
          description: "Identify the application referenced by the mission",
          status: "pending",
        },
        {
          stepId: "plan:req-action:step-2",
          title: "Prepare non-executing application action",
          kind: "prepare-action",
          description: "Prepare a non-executing action plan for opening the target application",
          status: "pending",
        },
      ],
      createdAt: "2026-03-28T00:00:00.000Z",
    });

    expect(result).toEqual({
      executionId: "exec:plan:req-action",
      planId: "plan:req-action",
      status: "completed",
      steps: [
        {
          stepId: "plan:req-action:step-1",
          status: "completed",
          output: "unknown-target",
          executedAt: "2026-03-28T00:00:00.000Z",
        },
        {
          stepId: "plan:req-action:step-2",
          status: "completed",
          output: "action-prepared",
          executedAt: "2026-03-28T00:00:00.000Z",
        },
      ],
      outputs: ["unknown-target", "action-prepared"],
      finishedAt: "2026-03-28T00:00:00.000Z",
    });
  });

  it("fails deterministically for an invalid plan", () => {
    const result = executePlan({
      planId: "   ",
      missionId: "req-invalid",
      planType: "ping",
      intent: "ping",
      confidence: 1,
      steps: [],
      createdAt: "2026-03-28T00:00:00.000Z",
    });

    expect(result).toEqual({
      executionId: "exec:   ",
      planId: "   ",
      status: "failed",
      steps: [],
      outputs: [],
      finishedAt: "2026-03-28T00:00:00.000Z",
    });
  });
});
