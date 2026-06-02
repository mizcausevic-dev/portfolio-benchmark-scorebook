import { describe, expect, it } from "vitest";
import { formatSummary } from "./format.js";

describe("formatSummary", () => {
  it("formats the scorebook summary", () => {
    const output = formatSummary({
      lanesTracked: 6,
      flagshipLanes: 2,
      proofRequiredLanes: 1,
      strongestScores: 3,
      averageScorebookScore: 77,
      investableRevenueMillions: 139,
      leadingMessage: "The scorebook is promising overall."
    });

    expect(output).toContain("Portfolio Benchmark Scorebook");
    expect(output).toContain("Flagship lanes: 2");
    expect(output).toContain("Investable revenue: $139M");
  });
});
