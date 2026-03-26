import path from "node:path";
import {
  createSubsystemLogger,
  resetLogger,
  setLoggerOverride,
  type LogLevel,
  type SubsystemLogger,
} from "../../src/logging.js";

export type BootstrapLoggerConfig = {
  stateDir: string;
  level: LogLevel;
};

export function configureBootstrapLogger(config: BootstrapLoggerConfig): SubsystemLogger {
  const file = path.join(config.stateDir, "logs", "control-plane-bootstrap.log");
  setLoggerOverride({
    level: config.level,
    consoleLevel: config.level === "silent" ? "silent" : "warn",
    file,
  });
  resetLogger();
  return createSubsystemLogger("control-plane/bootstrap");
}

export function resetBootstrapLogger(): void {
  setLoggerOverride(null);
  resetLogger();
}
