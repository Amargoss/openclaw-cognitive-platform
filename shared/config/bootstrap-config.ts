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
  if (!value) {
    return DEFAULT_BOOTSTRAP_PORT;
  }

  const parsed = Number.parseInt(value.trim(), 10);

  if (!Number.isFinite(parsed) || parsed < 1 || parsed > 65535) {
    return DEFAULT_BOOTSTRAP_PORT;
  }

  return parsed;
}

function parseLogLevel(value: string | undefined): BootstrapLogLevel {
  if (!value) {
    return DEFAULT_BOOTSTRAP_LOG_LEVEL;
  }

  const normalized = value.trim().toLowerCase();

  switch (normalized) {
    case "silent":
    case "error":
    case "warn":
    case "info":
    case "debug":
    case "trace":
      return normalized as BootstrapLogLevel;
    default:
      return DEFAULT_BOOTSTRAP_LOG_LEVEL;
  }
}

function resolveHost(value: string | undefined): string {
  if (!value) {
    return DEFAULT_BOOTSTRAP_HOST;
  }

  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return DEFAULT_BOOTSTRAP_HOST;
  }

  return trimmed;
}

function resolveDbPath(env: NodeJS.ProcessEnv, stateDir: string): string {
  const custom = env.OPENCLAW_BOOTSTRAP_DB_PATH?.trim();

  if (custom && custom.length > 0) {
    return path.isAbsolute(custom) ? custom : path.resolve(stateDir, custom);
  }

  return path.join(stateDir, "cognitive", "bootstrap.sqlite");
}

export function loadBootstrapConfig(
  env: NodeJS.ProcessEnv = process.env,
  homedir: () => string = os.homedir,
): BootstrapConfig {
  const stateDir = resolveBootstrapConfigDir(env, homedir);

  return {
    host: resolveHost(env.OPENCLAW_BOOTSTRAP_HOST),
    port: parsePort(env.OPENCLAW_BOOTSTRAP_PORT),
    stateDir,
    dbPath: resolveDbPath(env, stateDir),
    logLevel: parseLogLevel(env.OPENCLAW_BOOTSTRAP_LOG_LEVEL),
  };
}
