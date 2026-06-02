import { analyze } from "../analyze.js";
import { samplePortfolioBenchmarkScorebook } from "../data/sampleVerticalBrief.js";

const report = analyze(samplePortfolioBenchmarkScorebook, { now: "2026-06-02T00:00:00Z" });

export function summary() {
  return {
    ...report.summary,
    generatedAt: report.generatedAt,
    boardMessage:
      "Use AI governance and procurement as flagship scorebook anchors, keep biotech and nonprofit as transferability proofs, tighten FinTech before overselling it, and keep robotics in the watch tier until the proof density catches up."
  };
}

export function scorebookRegister() {
  return samplePortfolioBenchmarkScorebook.map((item) => ({
    lane: item.lane,
    verticalCluster: item.verticalCluster,
    scorebookTier: item.scorebookTier,
    action: item.action,
    owner: item.owner,
    audience: item.audience,
    scorebookNarrative: item.scorebookNarrative,
    scorebookScore: item.scorebookScore,
    nextMove: item.nextMove
  }));
}

export function benchmarkTiers() {
  return samplePortfolioBenchmarkScorebook.map((item) => ({
    lane: item.lane,
    scorebookTier: item.scorebookTier,
    dimension: item.dimension,
    riskHeadline: item.riskHeadline,
    scoreSignal: item.scoreSignal,
    missingProof: item.missingProof,
    evidenceArtifacts: item.evidenceArtifacts,
    scorebookScore: item.scorebookScore,
    proofDepthScore: item.proofDepthScore,
    commercialPullScore: item.commercialPullScore,
    repeatabilityScore: item.repeatabilityScore
  }));
}

export function investmentPosture() {
  return report.items.map((item) => ({
    lane: item.lane,
    action: item.action,
    executionDragScore: item.executionDragScore,
    compositePriorityScore: item.compositePriorityScore,
    owner: item.owner,
    nextMove: item.nextMove
  }));
}

export function riskMap() {
  return report.items.map((item) => ({
    lane: item.lane,
    dimension: item.dimension,
    compositePriorityScore: item.compositePriorityScore,
    investableRevenueMillions: item.investableRevenueMillions,
    executionDragScore: item.executionDragScore,
    companyTags: item.companyTags
  }));
}

export function verification() {
  return [
    "Synthetic scorebook data only - no live portfolio finances, customer contracts, or investor materials are included.",
    "Scores are modeled to show how Kinetic Gain can rank portfolio lanes by strength, proof depth, commercial pull, repeatability, and execution drag in one board-readable scorebook surface.",
    "All routes are read-only and demonstrate scorebook ranking, not production financial advice, market advice, or live investment recommendations."
  ];
}

export function payload() {
  return {
    report,
    scorebookRegister: scorebookRegister(),
    benchmarkTiers: benchmarkTiers(),
    investmentPosture: investmentPosture(),
    riskMap: riskMap(),
    verification: verification(),
    sample: samplePortfolioBenchmarkScorebook
  };
}
