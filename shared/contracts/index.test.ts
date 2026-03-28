import { describe, expect, it } from "vitest";
import { controlPlaneContractIds, type ResponseEnvelope } from "./index.js";

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
});
