import { describe, expect, it } from "vitest";
import { benchmarkTiers, investmentPosture, payload, scorebookRegister, summary, verification } from "./verticalBriefService.js";

describe("verticalBriefService", () => {
  it("returns the scorebook summary", () => {
    expect(summary().lanesTracked).toBeGreaterThan(0);
  });

  it("returns the scorebook register view", () => {
    expect(scorebookRegister().length).toBeGreaterThan(0);
  });

  it("returns the benchmark tiers view", () => {
    expect(benchmarkTiers().length).toBeGreaterThan(0);
  });

  it("returns the investment posture view", () => {
    expect(investmentPosture().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
  });

  it("returns the payload", () => {
    expect(payload().report.summary.lanesTracked).toBeGreaterThan(0);
  });
});
