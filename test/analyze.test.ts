import { describe, expect, it } from "vitest";
import { analyze, toExport } from "../src/analyze.js";
import { samplePortfolioBenchmarkScorebook } from "../src/data/sampleVerticalBrief.js";
import type { PortfolioBenchmarkScorebookItem } from "../src/types.js";

describe("analyze", () => {
  it("preserves the item count", () => {
    const report = analyze(samplePortfolioBenchmarkScorebook, { now: "2026-06-02T00:00:00Z" });
    expect(report.items.length).toBe(samplePortfolioBenchmarkScorebook.length);
  });

  it("counts flagship lanes", () => {
    const report = analyze(samplePortfolioBenchmarkScorebook, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.flagshipLanes).toBeGreaterThan(0);
  });

  it("counts proof-required lanes", () => {
    const report = analyze(samplePortfolioBenchmarkScorebook, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.proofRequiredLanes).toBeGreaterThan(0);
  });

  it("sums investable revenue", () => {
    const report = analyze(samplePortfolioBenchmarkScorebook, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.investableRevenueMillions).toBe(139);
  });

  it("calculates a leading board message", () => {
    const report = analyze(samplePortfolioBenchmarkScorebook, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.leadingMessage.length).toBeGreaterThan(20);
  });

  it("handles an empty estate", () => {
    const report = analyze([], { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.lanesTracked).toBe(0);
    expect(report.summary.averageScorebookScore).toBe(0);
    expect(report.summary.leadingMessage).toContain("scorebook is promising overall");
  });

  it("hits low and medium scorebook branches explicitly", () => {
    const fixtures: PortfolioBenchmarkScorebookItem[] = [
      {
        id: "low-branch",
        lane: "AI flagship lane",
        dimension: "CATEGORY_FIT",
        action: "INVEST",
        verticalCluster: "AI governance",
        scorebookTier: "FLAGSHIP",
        boardQuestion: "Can this lane lead the benchmark set now?",
        owner: "Chief AI Officer",
        audience: "Board technology committee",
        currentPosture: "Stable.",
        scorebookNarrative: "This lane is scorebook-ready.",
        comparativeReality: "Proof is aligned with the narrative.",
        riskHeadline: "Very little scorebook risk.",
        scoreSignal: "Strong category fit and proof.",
        missingProof: "None",
        evidenceArtifacts: ["scorebook packet"],
        opportunityMoves: ["keep flagship current"],
        relatedSurfaces: ["scorecard.kineticgain.com"],
        companyTags: ["Google"],
        scorebookScore: 88,
        proofDepthScore: 86,
        commercialPullScore: 84,
        repeatabilityScore: 82,
        executionDragScore: 14,
        investableRevenueMillions: 5,
        headline: "Flagship lane.",
        narrative: "Low branch test.",
        nextMove: "Keep the flagship current."
      },
      {
        id: "watch-branch",
        lane: "Watch lane",
        dimension: "COMMERCIAL_PULL",
        action: "WATCH",
        verticalCluster: "FinTech",
        scorebookTier: "PROVE",
        boardQuestion: "Where does the benchmark start weakening?",
        owner: "Revenue owner",
        audience: "Finance committee",
        currentPosture: "Watch state.",
        scorebookNarrative: "The lane is promising.",
        comparativeReality: "Proof is thinner than the demand story.",
        riskHeadline: "Commercial pull is visible.",
        scoreSignal: "One scorebook gap is forming.",
        missingProof: "Recent comparison packet",
        evidenceArtifacts: ["comparison packet"],
        opportunityMoves: ["refresh packet"],
        relatedSurfaces: ["merchant.kineticgain.com"],
        companyTags: ["Tableau"],
        scorebookScore: 72,
        proofDepthScore: 69,
        commercialPullScore: 70,
        repeatabilityScore: 64,
        executionDragScore: 28,
        investableRevenueMillions: 7,
        headline: "Watch the lane.",
        narrative: "Medium branch test.",
        nextMove: "Refresh the comparison packet."
      }
    ];

    const report = analyze(fixtures, { now: "2026-06-02T00:00:00Z" });
    expect(report.items[0].scorebookAssessment.severity).toBe("LOW");
    expect(report.items[0].dragAssessment.severity).toBe("LOW");
    expect(report.items[1].scorebookAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].proofDepthAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].commercialPullAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].repeatabilityAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].dragAssessment.severity).toBe("MEDIUM");
    expect(report.summary.leadingMessage).toContain("scorebook is promising overall");
  });

  it("exports through toExport", () => {
    const report = toExport(samplePortfolioBenchmarkScorebook, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.lanesTracked).toBe(samplePortfolioBenchmarkScorebook.length);
  });
});
