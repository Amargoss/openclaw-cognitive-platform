import { describe, expect, it } from "vitest";
import {
  analyzeMissionRequest,
  buildMissionSpec,
  classifyMissionInput,
  normalizeMissionInput,
  runMission,
} from "./index.js";

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

  it("classifies supported mission categories", () => {
    expect(classifyMissionInput("ping")).toEqual({ type: "ping", confidence: 1 });
    expect(classifyMissionInput("qué puedes hacer")).toEqual({ type: "info", confidence: 0.9 });
    expect(classifyMissionInput("abre spotify")).toEqual({ type: "action", confidence: 0.9 });
    expect(classifyMissionInput("algo irreconocible")).toEqual({
      type: "unknown",
      confidence: 0.2,
    });
  });

  it("normalizes mission input and extracts intent and entities", () => {
    expect(normalizeMissionInput("  Qué puedes hacer?  ")).toEqual({
      rawInput: "  Qué puedes hacer?  ",
      normalizedInput: "qué puedes hacer",
      intent: "describe_capabilities",
      entities: [],
    });

    expect(normalizeMissionInput("Abre   Spotify")).toEqual({
      rawInput: "Abre   Spotify",
      normalizedInput: "abre spotify",
      intent: "open_application",
      entities: ["spotify"],
    });
  });

  it("builds an enriched mission spec", () => {
    const missionSpec = buildMissionSpec({
      request: {
        requestId: "req-3",
        source: "bootstrap-http",
        input: "abre spotify",
        requestedAt: "2026-03-27T00:00:00.000Z",
      },
      classification: {
        type: "action",
        confidence: 0.9,
      },
      normalization: {
        rawInput: "abre spotify",
        normalizedInput: "abre spotify",
        intent: "open_application",
        entities: ["spotify"],
      },
    });

    expect(missionSpec).toEqual({
      missionId: "req-3",
      type: "action",
      intent: "open_application",
      entities: ["spotify"],
      confidence: 0.9,
      title: "Action mission",
      objective: "Prepare a basic action-oriented mission",
      constraints: ["local-only", "no-network", "no-persistence"],
      normalizedAt: "2026-03-27T00:00:00.000Z",
    });
  });

  it("analyzes a capability question into an info mission", () => {
    const result = analyzeMissionRequest({
      requestId: "req-4",
      source: "bootstrap-http",
      input: "qué puedes hacer",
      requestedAt: "2026-03-27T00:00:00.000Z",
    });

    expect(result).toEqual({
      requestId: "req-4",
      ok: true,
      data: {
        missionId: "req-4",
        type: "info",
        intent: "describe_capabilities",
        entities: [],
        confidence: 0.9,
        title: "Capability information mission",
        objective: "Answer a basic capability question",
        constraints: ["local-only", "no-network", "no-persistence"],
        normalizedAt: "2026-03-27T00:00:00.000Z",
      },
      error: null,
      timestamp: "2026-03-27T00:00:00.000Z",
    });
  });

  it("analyzes a basic action request into an action mission", () => {
    const result = analyzeMissionRequest({
      requestId: "req-5",
      source: "bootstrap-http",
      input: "abre spotify",
      requestedAt: "2026-03-27T00:00:00.000Z",
    });

    expect(result).toEqual({
      requestId: "req-5",
      ok: true,
      data: {
        missionId: "req-5",
        type: "action",
        intent: "open_application",
        entities: ["spotify"],
        confidence: 0.9,
        title: "Action mission",
        objective: "Prepare a basic action-oriented mission",
        constraints: ["local-only", "no-network", "no-persistence"],
        normalizedAt: "2026-03-27T00:00:00.000Z",
      },
      error: null,
      timestamp: "2026-03-27T00:00:00.000Z",
    });
  });
});
