import { createBootstrapApp } from "./app.js";

const app = createBootstrapApp(process.env);

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
