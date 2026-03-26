import { describe, expect, it } from "vitest";
import { loadBootstrapConfig } from "./index.js";

describe("shared/config", () => {
  it("loads local-first bootstrap defaults", () => {
    const cfg = loadBootstrapConfig({});
    expect(cfg.host).toBe("127.0.0.1");
    expect(cfg.port).toBe(18891);
    expect(cfg.dbPath).toContain("bootstrap.sqlite");
  });
});
