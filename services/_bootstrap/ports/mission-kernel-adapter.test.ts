import { describe, expect, it } from "vitest";
import { createMissionKernelMissionAnalyzer } from "./mission-kernel-adapter.js";

describe("services/_bootstrap/ports/mission-kernel-adapter", () => {
  it("adapts the mission kernel behind the bootstrap port", () => {
    const analyzer = createMissionKernelMissionAnalyzer();
    const result = analyzer.analyzeMissionRequest({
      requestId: "req-1",
      source: "bootstrap-http",
      input: "ping",
      requestedAt: "2026-03-27T00:00:00.000Z",
    });

    expect(result).toEqual({
      requestId: "req-1",
      ok: true,
      data: {
        missionId: "req-1",
        type: "ping",
        intent: "ping",
        entities: [],
        confidence: 1,
        title: "Ping mission",
        objective: "Respond to a ping mission",
        constraints: ["local-only", "no-network", "no-persistence"],
        normalizedAt: "2026-03-27T00:00:00.000Z",
      },
      error: null,
      timestamp: "2026-03-27T00:00:00.000Z",
    });
  });
});
