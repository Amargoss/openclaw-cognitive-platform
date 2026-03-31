import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { openBootstrapDb } from "./index.js";

const cleanupRoots: string[] = [];

describe("shared/db", () => {
  afterEach(() => {
    for (const root of cleanupRoots.splice(0)) {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  it("opens, initializes and closes the bootstrap sqlite database", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "openclaw-bootstrap-db-"));
    cleanupRoots.push(root);
    const dbPath = path.join(root, "bootstrap.sqlite");
    const db = openBootstrapDb(dbPath);
    expect(db.isReady()).toBe(true);
    expect(fs.existsSync(dbPath)).toBe(true);
    expect(() => db.close()).not.toThrow();
  });
});
