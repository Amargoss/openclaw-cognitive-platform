import { describe, expect, it } from "vitest";
import { createExecutionPlan } from "./index.js";

describe("services/planner", () => {
  it("creates a deterministic plan for a ping mission", () => {
    const result = createExecutionPlan({
      missionId: "req-ping",
      type: "ping",
      intent: "ping",
      entities: [],
      confidence: 1,
      title: "Ping mission",
      objective: "Respond to a ping mission",
      constraints: ["local-only", "no-network", "no-persistence"],
      normalizedAt: "2026-03-28T00:00:00.000Z",
    });

    expect(result).toEqual({
      ok: true,
      plan: {
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
      },
      error: null,
    });
  });

  it("creates a deterministic plan for an info mission", () => {
    const result = createExecutionPlan({
      missionId: "req-info",
      type: "info",
      intent: "describe_capabilities",
      entities: [],
      confidence: 0.9,
      title: "Capability information mission",
      objective: "Answer a basic capability question",
      constraints: ["local-only", "no-network", "no-persistence"],
      normalizedAt: "2026-03-28T00:00:00.000Z",
    });

    expect(result).toEqual({
      ok: true,
      plan: {
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
      },
      error: null,
    });
  });

  it("creates a deterministic plan for an open application action mission", () => {
    const result = createExecutionPlan({
      missionId: "req-action",
      type: "action",
      intent: "open_application",
      entities: ["spotify"],
      confidence: 0.9,
      title: "Action mission",
      objective: "Prepare a basic action-oriented mission",
      constraints: ["local-only", "no-network", "no-persistence"],
      normalizedAt: "2026-03-28T00:00:00.000Z",
    });

    expect(result).toEqual({
      ok: true,
      plan: {
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
      },
      error: null,
    });
  });

  it("returns an error for an unsupported mission", () => {
    const result = createExecutionPlan({
      missionId: "req-unknown",
      type: "unknown",
      intent: "unknown",
      entities: [],
      confidence: 0.2,
      title: "Unknown mission",
      objective: "Handle an unsupported mission input",
      constraints: ["local-only", "no-network", "no-persistence"],
      normalizedAt: "2026-03-28T00:00:00.000Z",
    });

    expect(result).toEqual({
      ok: false,
      plan: null,
      error: "mission-unsupported",
    });
  });

  it("returns an error for an invalid mission", () => {
    const result = createExecutionPlan({
      missionId: "   ",
      type: "info",
      intent: "describe_capabilities",
      entities: [],
      confidence: 0.9,
      title: "Capability information mission",
      objective: "Answer a basic capability question",
      constraints: ["local-only", "no-network", "no-persistence"],
      normalizedAt: "2026-03-28T00:00:00.000Z",
    });

    expect(result).toEqual({
      ok: false,
      plan: null,
      error: "mission-invalid",
    });
  });
});
