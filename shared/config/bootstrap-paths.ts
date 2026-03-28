import os from "node:os";
import path from "node:path";

function normalize(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed || trimmed === "undefined" || trimmed === "null") {
    return undefined;
  }
  return trimmed;
}

function resolveOsHomeDir(
  env: NodeJS.ProcessEnv = process.env,
  homedir: () => string = os.homedir,
): string | undefined {
  return normalize(env.HOME) ?? normalize(env.USERPROFILE) ?? normalizeSafe(homedir);
}

function normalizeSafe(homedir: () => string): string | undefined {
  try {
    return normalize(homedir());
  } catch {
    return undefined;
  }
}

export function resolveBootstrapHomeDir(
  env: NodeJS.ProcessEnv = process.env,
  homedir: () => string = os.homedir,
): string {
  const explicitHome = normalize(env.OPENCLAW_HOME);
  if (explicitHome) {
    if (explicitHome === "~" || explicitHome.startsWith("~/") || explicitHome.startsWith("~\\")) {
      const osHome = resolveOsHomeDir(env, homedir);
      if (osHome) {
        return path.resolve(explicitHome.replace(/^~(?=$|[\\/])/, osHome));
      }
    } else {
      return path.resolve(explicitHome);
    }
  }

  return path.resolve(resolveOsHomeDir(env, homedir) ?? process.cwd());
}

export function resolveBootstrapUserPath(
  input: string,
  env: NodeJS.ProcessEnv = process.env,
  homedir: () => string = os.homedir,
): string {
  const trimmed = input.trim();
  if (!trimmed) {
    return trimmed;
  }
  if (trimmed.startsWith("~")) {
    return path.resolve(trimmed.replace(/^~(?=$|[\\/])/, resolveBootstrapHomeDir(env, homedir)));
  }
  return path.resolve(trimmed);
}

export function resolveBootstrapConfigDir(
  env: NodeJS.ProcessEnv = process.env,
  homedir: () => string = os.homedir,
): string {
  const override = normalize(env.OPENCLAW_STATE_DIR);
  if (override) {
    return resolveBootstrapUserPath(override, env, homedir);
  }
  return path.join(resolveBootstrapHomeDir(env, homedir), ".openclaw");
}
