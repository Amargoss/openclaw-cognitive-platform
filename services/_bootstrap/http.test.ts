import { describe, expect, it } from "vitest";
import { createBootstrapHttpServer } from "./http.js";

describe("services/_bootstrap/http", () => {
  async function invokeRequest(
    server: ReturnType<typeof createBootstrapHttpServer>,
    request: {
      method?: string;
      url: string;
      body?: string;
    },
  ) {
    const requestListener = server.listeners("request")[0] as (
      req: {
        method?: string;
        url?: string;
        setEncoding: (encoding: string) => void;
        on: (event: string, listener: (value?: string | Error) => void) => void;
      },
      res: {
        statusCode: number;
        setHeader: (name: string, value: string) => void;
        end: (body?: string) => void;
      },
    ) => void;

    const listeners = new Map<string, (value?: string | Error) => void>();

    return await new Promise<{ statusCode: number; body: string }>((resolve) => {
      let responseBody = "";
      const response = {
        statusCode: 0,
        setHeader: () => {},
        end: (value?: string) => {
          responseBody = value ?? "";
          resolve({ statusCode: response.statusCode, body: responseBody });
        },
      };

      const req = {
        method: request.method,
        url: request.url,
        setEncoding: () => {},
        on: (event: string, listener: (value?: string | Error) => void) => {
          listeners.set(event, listener);
        },
      };

      requestListener(req, response);

      if (request.body !== undefined) {
        listeners.get("data")?.(request.body);
      }
      listeners.get("end")?.();
    });
  }

  it("serves healthz and readyz", async () => {
    const server = createBootstrapHttpServer({
      getReadyState: () => ({
        ready: true,
        checks: { config: true, logging: true, db: true },
        errors: [],
      }),
      analyzeMissionRequest: () => ({
        requestId: "unused",
        ok: true,
        data: {
          missionId: "unused",
          title: "unused",
          objective: "unused",
          constraints: [],
          normalizedAt: "2026-03-27T00:00:00.000Z",
        },
        error: null,
        timestamp: "2026-03-27T00:00:00.000Z",
      }),
    });

    const health = await invokeRequest(server, { url: "/healthz" });
    const ready = await invokeRequest(server, { url: "/readyz" });

    expect(health).toMatchObject({ statusCode: 200 });
    expect(ready).toMatchObject({ statusCode: 200 });
    expect(JSON.parse(health.body) as { ok: boolean; requestId: string }).toMatchObject({
      ok: true,
      requestId: "bootstrap-health",
    });
    expect(JSON.parse(ready.body) as { ok: boolean; requestId: string }).toMatchObject({
      ok: true,
      requestId: "bootstrap-ready",
    });
  });

  it("integrates bootstrap http with the mission kernel for a valid mission", async () => {
    const server = createBootstrapHttpServer({
      getReadyState: () => ({
        ready: true,
        checks: { config: true, logging: true, db: true },
        errors: [],
      }),
      analyzeMissionRequest: (request) => ({
        requestId: request.requestId,
        ok: true,
        data: {
          missionId: request.requestId,
          title: "Ping mission",
          objective: "Respond to a ping mission",
          constraints: ["local-only", "no-network", "no-persistence"],
          normalizedAt: request.requestedAt,
        },
        error: null,
        timestamp: request.requestedAt,
      }),
    });

    const result = await invokeRequest(server, {
      method: "POST",
      url: "/missions/analyze",
      body: JSON.stringify({
        requestId: "req-1",
        source: "bootstrap-http",
        input: "ping",
        requestedAt: "2026-03-27T00:00:00.000Z",
      }),
    });

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual({
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

  it("returns a controlled error for an unsupported mission", async () => {
    const server = createBootstrapHttpServer({
      getReadyState: () => ({
        ready: true,
        checks: { config: true, logging: true, db: true },
        errors: [],
      }),
      analyzeMissionRequest: (request) => ({
        requestId: request.requestId,
        ok: false,
        data: null,
        error: "mission-unsupported",
        timestamp: request.requestedAt,
      }),
    });

    const result = await invokeRequest(server, {
      method: "POST",
      url: "/missions/analyze",
      body: JSON.stringify({
        requestId: "req-2",
        source: "bootstrap-http",
        input: "unknown",
        requestedAt: "2026-03-27T00:00:00.000Z",
      }),
    });

    expect(result.statusCode).toBe(422);
    expect(JSON.parse(result.body)).toEqual({
      requestId: "req-2",
      ok: false,
      data: null,
      error: "mission-unsupported",
      timestamp: "2026-03-27T00:00:00.000Z",
    });
  });

  it("returns a controlled error for an invalid mission request payload", async () => {
    const server = createBootstrapHttpServer({
      getReadyState: () => ({
        ready: true,
        checks: { config: true, logging: true, db: true },
        errors: [],
      }),
      analyzeMissionRequest: () => {
        throw new Error("should not be called");
      },
    });

    const result = await invokeRequest(server, {
      method: "POST",
      url: "/missions/analyze",
      body: JSON.stringify({
        requestId: "req-3",
        source: "bootstrap-http",
        requestedAt: "2026-03-27T00:00:00.000Z",
      }),
    });

    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body)).toEqual({
      requestId: "req-3",
      ok: false,
      data: null,
      error: "invalid-mission-request",
      timestamp: expect.any(String),
    });
  });
});
