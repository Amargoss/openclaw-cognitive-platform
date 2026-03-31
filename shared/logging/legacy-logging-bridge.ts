/**
 * Residual bootstrap bridge to legacy src/logging internals.
 *
 * This keeps the shared bootstrap surface explicit about its remaining src/**
 * dependency until the control-plane logging owner is fully separated.
 */
export type { LogLevel } from "../../src/logging/levels.js";
export type { SubsystemLogger } from "../../src/logging/subsystem.js";
export { resetLogger, setLoggerOverride } from "../../src/logging/logger.js";
export { createSubsystemLogger } from "../../src/logging/subsystem.js";
