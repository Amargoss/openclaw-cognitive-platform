import fs from "node:fs";
import path from "node:path";
import { requireBootstrapSqlite } from "./sqlite.js";

export type BootstrapDbHandle = {
  path: string;
  close: () => void;
  isReady: () => boolean;
};

export function openBootstrapDb(dbPath: string): BootstrapDbHandle {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  const { DatabaseSync } = requireBootstrapSqlite();
  const db = new DatabaseSync(dbPath);
  db.exec("PRAGMA busy_timeout = 5000;");
  db.exec(`
    CREATE TABLE IF NOT EXISTS bootstrap_runtime_meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);
  const now = new Date().toISOString();
  const upsert = db.prepare(`
    INSERT INTO bootstrap_runtime_meta (key, value, updated_at)
    VALUES (?, ?, ?)
    ON CONFLICT(key) DO UPDATE SET
      value = excluded.value,
      updated_at = excluded.updated_at
  `);
  upsert.run("schema_version", "1", now);
  upsert.run("bootstrap_status", "ready", now);
  return {
    path: dbPath,
    close: () => db.close(),
    isReady: () => {
      const row = db
        .prepare("SELECT value FROM bootstrap_runtime_meta WHERE key = ?")
        .get("schema_version") as { value?: string } | undefined;
      return row?.value === "1";
    },
  };
}
