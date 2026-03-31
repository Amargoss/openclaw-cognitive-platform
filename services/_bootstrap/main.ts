import { createBootstrapApp } from "./app.js";
import { createMissionKernelMissionAnalyzer } from "./ports/mission-kernel-adapter.js";

const app = createBootstrapApp(process.env, {
  missionAnalyzer: createMissionKernelMissionAnalyzer(),
});

async function main() {
  await app.start();
}

async function shutdown() {
  await app.stop();
  process.exit(0);
}

process.once("SIGINT", () => {
  void shutdown();
});
process.once("SIGTERM", () => {
  void shutdown();
});

void main();
