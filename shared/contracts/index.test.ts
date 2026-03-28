import { describe, expect, it } from "vitest";
import {
  controlPlaneContractIds,
  type ExecutionPlan,
  type MissionSpec,
  type ResponseEnvelope,
} from "./index.js";

describe("shared/contracts", () => {
  it("exports the canonical Sprint 1 contract ids", () => {
    expect(controlPlaneContractIds).toContain("MissionSpec");
    expect(controlPlaneContractIds).toContain("ResponseEnvelope");
  });

  it("requires request correlation on response envelopes", () => {
    const envelope: ResponseEnvelope<{ status: "ok" }> = {
      requestId: "req-1",
      ok: true,
      data: { status: "ok" },
      error: null,
      timestamp: "2026-03-27T00:00:00.000Z",
    };

    expect(envelope.requestId).toBe("req-1");
  });

  it("supports an enriched canonical mission spec shape", () => {
    const missionSpec: MissionSpec = {
      missionId: "req-1",
      type: "info",
      intent: "describe_capabilities",
      entities: [],
      confidence: 0.9,
      title: "Capability information mission",
      objective: "Answer a basic capability question",
      constraints: ["local-only", "no-network", "no-persistence"],
      normalizedAt: "2026-03-27T00:00:00.000Z",
    };

    expect(missionSpec.type).toBe("info");
    expect(missionSpec.intent).toBe("describe_capabilities");
  });

  it("supports an enriched canonical execution plan shape", () => {
    const plan: ExecutionPlan = {
      planId: "plan:req-1",
      missionId: "req-1",
      planType: "action",
      intent: "open_application",
      confidence: 0.9,
      steps: [
        {
          stepId: "plan:req-1:step-1",
          title: "Identify target application",
          kind: "identify-target",
          description: "Identify the application referenced by the mission",
          status: "pending",
        },
      ],
      createdAt: "2026-03-28T00:00:00.000Z",
    };

    expect(plan.planType).toBe("action");
    expect(plan.steps[0]?.kind).toBe("identify-target");
  });
});
