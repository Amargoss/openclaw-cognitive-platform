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
    const app = createBootstrapApp({
      OPENCLAW_BOOTSTRAP_LOG_LEVEL: "silent",
    });
    openDbs.push(app);
    const snapshot = app.getSnapshot();
    expect(snapshot.checks.config).toBe(true);
    expect(snapshot.checks.logging).toBe(true);
    expect(snapshot.checks.db).toBe(true);
    expect(snapshot.ready).toBe(true);
  });
});
