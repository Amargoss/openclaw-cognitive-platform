import { describe, expect, it } from "vitest";
import { resolveAllowedApplication } from "./app-allowlist.js";

describe("services/execution/allowlist", () => {
  it("resolves a permitted application", () => {
    expect(resolveAllowedApplication("spotify")).toEqual({
      appId: "spotify",
      binary: "spotify",
      args: [],
    });
  });

  it("blocks an application outside the allowlist", () => {
    expect(resolveAllowedApplication("firefox")).toBeNull();
  });
});
