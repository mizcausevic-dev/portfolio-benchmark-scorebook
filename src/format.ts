import type { PortfolioBenchmarkScorebookSummary } from "./types.js";

export function formatSummary(
  summary: PortfolioBenchmarkScorebookSummary,
  title = "Portfolio Benchmark Scorebook"
) {
  return [
    title,
    `Lanes tracked: ${summary.lanesTracked}`,
    `Flagship lanes: ${summary.flagshipLanes}`,
    `Proof-required lanes: ${summary.proofRequiredLanes}`,
    `Strongest scores: ${summary.strongestScores}`,
    `Average scorebook score: ${summary.averageScorebookScore}`,
    `Investable revenue: $${summary.investableRevenueMillions}M`,
    summary.leadingMessage
  ].join("\n");
}
