import { describe, expect, it } from "vitest";
import { controlPlaneContractIds } from "./index.js";

describe("shared/contracts", () => {
  it("exports the canonical Sprint 1 contract ids", () => {
    expect(controlPlaneContractIds).toContain("MissionSpec");
    expect(controlPlaneContractIds).toContain("ResponseEnvelope");
  });
});
