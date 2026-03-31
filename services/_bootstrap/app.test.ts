import { afterEach, describe, expect, it } from "vitest";
import { resetBootstrapLogger } from "../../shared/logging/index.js";
import { createBootstrapApp } from "./app.js";

const openDbs: Array<ReturnType<typeof createBootstrapApp>> = [];

describe("services/_bootstrap/app", () => {
  afterEach(() => {
    while (openDbs.length > 0) {
      const app = openDbs.pop();
      if (app) {
        app.db.close();
      }
    }
    resetBootstrapLogger();
  });

  it("creates a ready bootstrap app with isolated shared dependencies", () => {
    const app = createBootstrapApp(
      {
        OPENCLAW_BOOTSTRAP_LOG_LEVEL: "silent",
      },
      {
        missionAnalyzer: {
          analyzeMissionRequest: (request) => ({
            requestId: request.requestId,
            ok: true,
            data: {
              missionId: request.requestId,
              type: "ping",
              intent: "ping",
              entities: [],
              confidence: 1,
              title: "Ping mission",
              objective: "Respond to a ping mission",
              constraints: ["local-only", "no-network", "no-persistence"],
              normalizedAt: request.requestedAt,
            },
            error: null,
            timestamp: request.requestedAt,
          }),
        },
      },
    );
    openDbs.push(app);
    const snapshot = app.getSnapshot();
    expect(snapshot.checks.config).toBe(true);
    expect(snapshot.checks.logging).toBe(true);
    expect(snapshot.checks.db).toBe(true);
    expect(snapshot.ready).toBe(true);
  });

  it("depends on an injected mission analyzer port", () => {
    let calls = 0;
    const app = createBootstrapApp(
      {
        OPENCLAW_BOOTSTRAP_LOG_LEVEL: "silent",
      },
      {
        missionAnalyzer: {
          analyzeMissionRequest: (request) => {
            calls += 1;
            return {
              requestId: request.requestId,
              ok: true,
              data: {
                missionId: request.requestId,
                type: "ping",
                intent: "ping",
                entities: [],
                confidence: 1,
                title: "Ping mission",
                objective: "Respond to a ping mission",
                constraints: ["local-only", "no-network", "no-persistence"],
                normalizedAt: request.requestedAt,
              },
              error: null,
              timestamp: request.requestedAt,
            };
          },
        },
      },
    );

    openDbs.push(app);
    expect(calls).toBe(0);
    expect(app.getSnapshot().ready).toBe(true);
  });
});
