import { describe, expect, it } from "vitest";
import { runMission } from "./index.js";

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
});
