import { spawn } from "node:child_process";
import type { ExecutionErrorCode, ExecutionStatus } from "../types.js";

export interface LinuxSpawnLaunchRequest {
  binary: string;
  args: string[];
}

export interface LinuxSpawnLaunchResult {
  status: ExecutionStatus;
  output: string;
  errorCode?: ExecutionErrorCode;
  details?: Record<string, string | number | boolean | null>;
}

type SpawnedProcess = {
  pid?: number;
  on(event: "spawn", listener: () => void): SpawnedProcess;
  on(event: "error", listener: (error: NodeJS.ErrnoException) => void): SpawnedProcess;
  on(event: "exit", listener: (code: number | null, signal: string | null) => void): SpawnedProcess;
};

export type SpawnLike = (
  command: string,
  args: readonly string[],
  options: {
    shell: false;
    stdio: "ignore";
  },
) => SpawnedProcess;

export function createLinuxSpawnLauncher(spawnProcess: SpawnLike = spawn) {
  return function launchLinuxProcess(
    request: LinuxSpawnLaunchRequest,
  ): Promise<LinuxSpawnLaunchResult> {
    return new Promise((resolve) => {
      let settled = false;

      const process = spawnProcess(request.binary, request.args, {
        shell: false,
        stdio: "ignore",
      });

      const finalize = (result: LinuxSpawnLaunchResult) => {
        if (settled) {
          return;
        }

        settled = true;
        resolve(result);
      };

      process.on("spawn", () => {
        finalize({
          status: "completed",
          output: "application-launch-dispatched",
          details: {
            binary: request.binary,
            args: request.args.join(" "),
            pid: process.pid ?? null,
          },
        });
      });

      process.on("error", (error) => {
        finalize({
          status: "failed",
          output: "application-launch-failed",
          errorCode: error.code === "ENOENT" ? "binary-not-found" : "execution-failed",
          details: {
            binary: request.binary,
            args: request.args.join(" "),
            systemError: error.code ?? error.name,
          },
        });
      });

      process.on("exit", (code, signal) => {
        if (settled || code === 0) {
          return;
        }

        finalize({
          status: "failed",
          output: "application-launch-failed",
          errorCode: "execution-failed",
          details: {
            binary: request.binary,
            args: request.args.join(" "),
            exitCode: code,
            signal: signal ?? null,
          },
        });
      });
    });
  };
}
