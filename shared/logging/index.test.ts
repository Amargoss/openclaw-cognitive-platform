import { afterEach, describe, expect, it } from "vitest";
import { configureBootstrapLogger, resetBootstrapLogger } from "./index.js";

describe("shared/logging", () => {
  afterEach(() => {
    resetBootstrapLogger();
  });

  it("initializes the bootstrap logger without exposing src/logging as owner", () => {
    const logger = configureBootstrapLogger({
      stateDir: "/tmp/openclaw-bootstrap-logger-test",
      level: "silent",
    });
    expect(logger.subsystem).toBe("control-plane/bootstrap");
  });
});
