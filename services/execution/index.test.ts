import { describe, expect, it } from "vitest";
import { executePlan } from "./index.js";

describe("services/execution", () => {
  it("executes a ping plan deterministically", async () => {
    const result = await executePlan({
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

  it("executes an info plan in step order", async () => {
    const result = await executePlan({
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

  it("executes an allowlisted application action with a controlled launcher", async () => {
    const launched: Array<{ binary: string; args: string[] }> = [];
    const result = await executePlan(
      {
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
            title: "Prepare application action",
            kind: "prepare-action",
            description: "Prepare an action plan for opening the target application",
            status: "pending",
            target: {
              type: "application",
              appId: "spotify",
            },
          },
        ],
        createdAt: "2026-03-28T00:00:00.000Z",
      },
      {
        launchApplication: async ({ binary, args }) => {
          launched.push({ binary, args });
          return {
            status: "completed",
            output: "application-launch-dispatched",
            details: {
              binary,
            },
          };
        },
      },
    );

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
          output: "application-launch-dispatched",
          executedAt: "2026-03-28T00:00:00.000Z",
          details: {
            binary: "spotify",
          },
        },
      ],
      outputs: ["unknown-target", "application-launch-dispatched"],
      finishedAt: "2026-03-28T00:00:00.000Z",
    });
    expect(launched).toEqual([{ binary: "spotify", args: [] }]);
  });

  it("blocks an application outside the allowlist", async () => {
    const result = await executePlan({
      planId: "plan:req-action",
      missionId: "req-action",
      planType: "action",
      intent: "open_application",
      confidence: 0.9,
      steps: [
        {
          stepId: "plan:req-action:step-1",
          title: "Prepare application action",
          kind: "prepare-action",
          description: "Prepare an action plan for opening the target application",
          status: "pending",
          target: {
            type: "application",
            appId: "firefox",
          },
        },
      ],
      createdAt: "2026-03-28T00:00:00.000Z",
    });

    expect(result.status).toBe("blocked");
    expect(result.steps[0]).toMatchObject({
      stepId: "plan:req-action:step-1",
      status: "blocked",
      errorCode: "app-not-allowed",
    });
  });

  it("returns a controlled error when the binary is missing", async () => {
    const result = await executePlan(
      {
        planId: "plan:req-action",
        missionId: "req-action",
        planType: "action",
        intent: "open_application",
        confidence: 0.9,
        steps: [
          {
            stepId: "plan:req-action:step-1",
            title: "Prepare application action",
            kind: "prepare-action",
            description: "Prepare an action plan for opening the target application",
            status: "pending",
            target: {
              type: "application",
              appId: "spotify",
            },
          },
        ],
        createdAt: "2026-03-28T00:00:00.000Z",
      },
      {
        resolveApplication: () => ({
          appId: "spotify",
          binary: "missing-binary-for-test",
          args: [],
        }),
        launchApplication: async () => ({
          status: "failed",
          output: "application-launch-failed",
          errorCode: "binary-not-found",
        }),
      },
    );

    expect(result.status).toBe("failed");
    expect(result.steps[0]).toMatchObject({
      status: "failed",
      errorCode: "binary-not-found",
    });
  });

  it("fails deterministically for an unsupported step", async () => {
    const result = await executePlan({
      planId: "plan:req-action",
      missionId: "req-action",
      planType: "action",
      intent: "open_application",
      confidence: 0.9,
      steps: [
        {
          stepId: "plan:req-action:step-1",
          title: "Unsupported step",
          kind: "unsupported-kind" as never,
          description: "Unsupported step kind",
          status: "pending",
        },
      ],
      createdAt: "2026-03-28T00:00:00.000Z",
    });

    expect(result.status).toBe("failed");
    expect(result.steps[0]).toMatchObject({
      status: "failed",
      errorCode: "step-unsupported",
    });
  });

  it("fails deterministically for an invalid plan", async () => {
    const result = await executePlan({
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
      errorCode: "plan-invalid",
    });
  });
});
