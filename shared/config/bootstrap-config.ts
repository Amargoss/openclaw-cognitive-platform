import os from "node:os";
import path from "node:path";
import { resolveBootstrapConfigDir } from "./bootstrap-paths.js";

export type BootstrapLogLevel = "silent" | "error" | "warn" | "info" | "debug" | "trace";

export type BootstrapConfig = {
  host: string;
  port: number;
  stateDir: string;
  dbPath: string;
  logLevel: BootstrapLogLevel;
};

const DEFAULT_BOOTSTRAP_HOST = "127.0.0.1";
const DEFAULT_BOOTSTRAP_PORT = 18891;
const DEFAULT_BOOTSTRAP_LOG_LEVEL: BootstrapLogLevel = "info";

function parsePort(value: string | undefined): number {
  const parsed = Number.parseInt(value ?? "", 10);
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > 65535) {
    return DEFAULT_BOOTSTRAP_PORT;
  }
  return parsed;
}

function parseLogLevel(value: string | undefined): BootstrapLogLevel {
  switch ((value ?? "").trim()) {
    case "silent":
    case "error":
    case "warn":
    case "info":
    case "debug":
    case "trace":
      return value as BootstrapLogLevel;
    default:
      return DEFAULT_BOOTSTRAP_LOG_LEVEL;
  }
}

export function loadBootstrapConfig(
  env: NodeJS.ProcessEnv = process.env,
  homedir: () => string = os.homedir,
): BootstrapConfig {
  const stateDir = resolveBootstrapConfigDir(env, homedir);
  return {
    host: env.OPENCLAW_BOOTSTRAP_HOST?.trim() || DEFAULT_BOOTSTRAP_HOST,
    port: parsePort(env.OPENCLAW_BOOTSTRAP_PORT),
    stateDir,
    dbPath:
      env.OPENCLAW_BOOTSTRAP_DB_PATH?.trim() ||
      path.join(stateDir, "cognitive", "bootstrap.sqlite"),
    logLevel: parseLogLevel(env.OPENCLAW_BOOTSTRAP_LOG_LEVEL),
  };
}
