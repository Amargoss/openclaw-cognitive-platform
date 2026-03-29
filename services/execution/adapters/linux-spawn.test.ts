import { EventEmitter } from "node:events";
import { describe, expect, it } from "vitest";
import { createLinuxSpawnLauncher } from "./linux-spawn.js";

class FakeSpawnedProcess extends EventEmitter {
  pid?: number;
}

describe("services/execution/adapters/linux-spawn", () => {
  it("uses spawn with shell disabled and explicit argv", async () => {
    const captured: {
      command?: string;
      args?: readonly string[];
      options?: { shell: false; stdio: "ignore" };
    } = {};

    const launch = createLinuxSpawnLauncher((command, args, options) => {
      captured.command = command;
      captured.args = args;
      captured.options = options;

      const child = new FakeSpawnedProcess();
      child.pid = 1234;
      queueMicrotask(() => child.emit("spawn"));
      return child;
    });

    const result = await launch({
      binary: "spotify",
      args: ["--minimized"],
    });

    expect(captured).toEqual({
      command: "spotify",
      args: ["--minimized"],
      options: {
        shell: false,
        stdio: "ignore",
      },
    });
    expect(result.status).toBe("completed");
    expect(result.output).toBe("application-launch-dispatched");
  });

  it("maps ENOENT to a controlled binary-not-found error", async () => {
    const launch = createLinuxSpawnLauncher(() => {
      const child = new FakeSpawnedProcess();
      queueMicrotask(() => {
        const error = new Error("missing binary") as NodeJS.ErrnoException;
        error.code = "ENOENT";
        child.emit("error", error);
      });
      return child;
    });

    const result = await launch({
      binary: "missing-binary",
      args: [],
    });

    expect(result).toMatchObject({
      status: "failed",
      output: "application-launch-failed",
      errorCode: "binary-not-found",
    });
  });

  it("can validate the real spawn path with a stable local binary", async () => {
    const launch = createLinuxSpawnLauncher();
    const binary = process.platform === "win32" ? "where" : "/usr/bin/true";

    const result = await launch({
      binary,
      args: [],
    });

    expect(result.status).toBe("completed");
    expect(result.output).toBe("application-launch-dispatched");
  });
});
