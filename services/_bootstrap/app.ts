import type { AddressInfo } from "node:net";
import { loadBootstrapConfig, type BootstrapConfig } from "../../shared/config/index.js";
import { openBootstrapDb, type BootstrapDbHandle } from "../../shared/db/index.js";
import {
  configureBootstrapLogger,
  resetBootstrapLogger,
  type BootstrapLoggerConfig,
} from "../../shared/logging/index.js";
import { createBootstrapHttpServer } from "./http.js";
import type { MissionAnalyzerPort } from "./ports/mission-analyzer.js";
import { createBootstrapState, type BootstrapStateSnapshot } from "./state.js";

export type BootstrapApp = {
  config: BootstrapConfig;
  db: BootstrapDbHandle;
  start: () => Promise<void>;
  stop: () => Promise<void>;
  getBaseUrl: () => string;
  getSnapshot: () => BootstrapStateSnapshot;
};

export type BootstrapAppDeps = {
  missionAnalyzer: MissionAnalyzerPort;
};

export function createBootstrapApp(
  env: NodeJS.ProcessEnv = process.env,
  deps: BootstrapAppDeps,
): BootstrapApp {
  const state = createBootstrapState();
  const config = loadBootstrapConfig(env);
  state.markCheck("config");

  const loggerConfig: BootstrapLoggerConfig = {
    stateDir: config.stateDir,
    level: config.logLevel,
  };
  const logger = configureBootstrapLogger(loggerConfig);
  logger.info("bootstrap logger initialized");
  state.markCheck("logging");

  const db = openBootstrapDb(config.dbPath);
  state.markCheck("db");

  const server = createBootstrapHttpServer({
    getReadyState: () => {
      const snapshot = state.snapshot();
      return {
        ready: snapshot.ready,
        checks: snapshot.checks,
        errors: snapshot.errors,
      };
    },
    missionAnalyzer: deps.missionAnalyzer,
  });

  return {
    config,
    db,
    async start() {
      await new Promise<void>((resolve, reject) => {
        server.once("error", reject);
        server.listen(config.port, config.host, () => {
          server.off("error", reject);
          resolve();
        });
      });
      logger.info(`bootstrap server listening on ${this.getBaseUrl()}`);
    },
    async stop() {
      await new Promise<void>((resolve, reject) => {
        server.close((error) => {
          if (error) {
            if ((error as NodeJS.ErrnoException).code === "ERR_SERVER_NOT_RUNNING") {
              resolve();
              return;
            }
            reject(error);
            return;
          }
          resolve();
        });
      });
      db.close();
      resetBootstrapLogger();
    },
    getBaseUrl() {
      const address = server.address() as AddressInfo | null;
      const host = address?.address ?? config.host;
      const port = address?.port ?? config.port;
      return `http://${host}:${port}`;
    },
    getSnapshot() {
      return state.snapshot();
    },
  };
}
