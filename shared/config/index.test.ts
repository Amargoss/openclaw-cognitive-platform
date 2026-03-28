import { describe, expect, it } from "vitest";
import { loadBootstrapConfig, resolveBootstrapConfigDir } from "./index.js";

describe("shared/config", () => {
  it("loads local-first bootstrap defaults", () => {
    const cfg = loadBootstrapConfig({});
    expect(cfg.host).toBe("127.0.0.1");
    expect(cfg.port).toBe(18891);
    expect(cfg.dbPath).toContain("bootstrap.sqlite");
  });

  it("expands OPENCLAW_STATE_DIR without depending on src/utils", () => {
    expect(
      resolveBootstrapConfigDir(
        {
          HOME: "/tmp/openclaw-home",
          OPENCLAW_STATE_DIR: "~/state",
        } as NodeJS.ProcessEnv,
        () => "/ignored",
      ),
    ).toBe("/tmp/openclaw-home/state");
  });

  it("prefers OPENCLAW_HOME for bootstrap defaults", () => {
    const cfg = loadBootstrapConfig(
      {
        OPENCLAW_HOME: "/srv/openclaw-home",
      } as NodeJS.ProcessEnv,
      () => "/ignored",
    );

    expect(cfg.stateDir).toBe("/srv/openclaw-home/.openclaw");
    expect(cfg.dbPath).toBe("/srv/openclaw-home/.openclaw/cognitive/bootstrap.sqlite");
  });
});
