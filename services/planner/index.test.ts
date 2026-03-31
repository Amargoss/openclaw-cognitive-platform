import { describe, expect, it } from "vitest";
import type { MissionSpec } from "../../shared/contracts/index.js";
import { createExecutionPlan } from "./planner.js";

describe("services/planner", () => {
  it("creates a deterministic plan for a ping mission", () => {
    const mission: MissionSpec = {
      missionId: "req-ping",
      type: "ping",
      intent: "health_check",
      title: "Ping mission",
      objective: "Check system health",
      constraints: [],
      entities: [],
      confidence: 1,
      normalizedAt: "t0",
    };

    const result = createExecutionPlan(mission);

    expect(result).toEqual({
      ok: true,
      plan: {
        planId: "plan:req-ping",
        missionId: "req-ping",
        planType: "ping",
        intent: "health_check",
        confidence: 1,
        createdAt: "t0",
        steps: [
          {
            stepId: "plan:req-ping:step-1",
            title: "Prepare pong response",
            kind: "respond",
            description: "Prepare a pong response",
            status: "pending",
          },
        ],
      },
      error: null,
    });
  });

  it("creates a deterministic plan for an info mission", () => {
    const mission: MissionSpec = {
      missionId: "req-info",
      type: "info",
      intent: "capabilities_query",
      title: "Capabilities information mission",
      objective: "Describe system capabilities",
      constraints: [],
      entities: [],
      confidence: 0.9,
      normalizedAt: "t1",
    };

    const result = createExecutionPlan(mission);

    expect(result.ok).toBe(true);
    expect(result.plan?.steps).toHaveLength(2);
    expect(result.plan?.steps[0].kind).toBe("inform");
    expect(result.plan?.steps[1].kind).toBe("inform");
  });

  it("creates a deterministic plan for an open application action mission", () => {
    const mission: MissionSpec = {
      missionId: "req-action",
      type: "action",
      intent: "open_application",
      title: "Open application mission",
      objective: "Open the requested application",
      constraints: [],
      entities: ["spotify"],
      confidence: 0.9,
      normalizedAt: "t2",
    };

    const result = createExecutionPlan(mission);

    expect(result).toEqual({
      ok: true,
      plan: {
        planId: "plan:req-action",
        missionId: "req-action",
        planType: "action",
        intent: "open_application",
        confidence: 0.9,
        createdAt: "t2",
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
      },
      error: null,
    });
  });

  it("returns an error for an unsupported mission", () => {
    const mission: MissionSpec = {
      missionId: "req-unknown",
      type: "unknown",
      intent: "unknown",
      title: "Unknown mission",
      objective: "Unsupported mission objective",
      constraints: [],
      entities: [],
      confidence: 0.2,
      normalizedAt: "t3",
    };

    const result = createExecutionPlan(mission);

    expect(result).toEqual({
      ok: false,
      plan: null,
      error: "mission-unsupported",
    });
  });

  it("returns an error for an invalid mission", () => {
    const mission: MissionSpec = {
      missionId: "",
      type: "ping",
      intent: "",
      title: "Invalid mission",
      objective: "Invalid mission objective",
      constraints: [],
      entities: [],
      confidence: 1,
      normalizedAt: "t4",
    };

    const result = createExecutionPlan(mission);

    expect(result).toEqual({
      ok: false,
      plan: null,
      error: "mission-invalid",
    });
  });
});
