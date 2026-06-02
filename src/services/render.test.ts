import { describe, expect, it } from "vitest";
import {
  renderBenchmarkTiers,
  renderDocs,
  renderInvestmentPosture,
  renderScorebookOverview,
  renderScorebookRegister,
  renderVerification
} from "./render.js";

describe("render", () => {
  it("includes the product title in the overview", () => {
    expect(renderScorebookOverview()).toContain("Portfolio Benchmark Scorebook");
  });

  it("renders the scorebook register route", () => {
    expect(renderScorebookRegister()).toContain("/scorebook-register");
  });

  it("renders the benchmark tiers route", () => {
    expect(renderBenchmarkTiers()).toContain("/benchmark-tiers");
  });

  it("renders the investment posture route", () => {
    expect(renderInvestmentPosture()).toContain("/investment-posture");
  });

  it("renders verification notes", () => {
    expect(renderVerification()).toContain("Synthetic scorebook data only");
  });

  it("renders docs payload guidance", () => {
    expect(renderDocs()).toContain("/api/payload");
  });
});
