import { describe, expect, it } from "vitest";
import { analyzeMissionRequest, runMission } from "./index.js";

describe("services/mission-kernel", () => {
  it("executes a ping mission", () => {
    const result = runMission({
      id: "m-1",
      type: "ping",
    });

    expect(result).toEqual({
      missionId: "m-1",
      type: "ping",
      ok: true,
      data: {
        reply: "pong",
      },
      error: null,
    });
  });

  it("returns a controlled error for an unknown mission", () => {
    const result = runMission({
      id: "m-2",
      type: "unknown",
    });

    expect(result).toEqual({
      missionId: "m-2",
      type: "unknown",
      ok: false,
      data: null,
      error: {
        code: "UNKNOWN_MISSION",
        message: "Unsupported mission type: unknown",
      },
    });
  });

  it("returns a controlled error for an invalid mission", () => {
    const result = runMission({
      id: "   ",
      type: "ping",
    });

    expect(result).toEqual({
      missionId: "   ",
      type: "ping",
      ok: false,
      data: null,
      error: {
        code: "INVALID_MISSION",
        message: "Mission id must not be empty",
      },
    });
  });

  it("analyzes a canonical ping mission request", () => {
    const result = analyzeMissionRequest({
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
        title: "Ping mission",
        objective: "Respond to a ping mission",
        constraints: ["local-only", "no-network", "no-persistence"],
        normalizedAt: "2026-03-27T00:00:00.000Z",
      },
      error: null,
      timestamp: "2026-03-27T00:00:00.000Z",
    });
  });

  it("returns a controlled envelope error for an unsupported mission request", () => {
    const result = analyzeMissionRequest({
      requestId: "req-2",
      source: "bootstrap-http",
      input: "unknown",
      requestedAt: "2026-03-27T00:00:00.000Z",
    });

    expect(result).toEqual({
      requestId: "req-2",
      ok: false,
      data: null,
      error: "mission-unsupported",
      timestamp: "2026-03-27T00:00:00.000Z",
    });
  });
});
