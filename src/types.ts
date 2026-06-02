export type ScorebookDimension =
  | "CATEGORY_FIT"
  | "EXEC_SIGNAL"
  | "EVIDENCE_DEPTH"
  | "COMMERCIAL_PULL"
  | "IMPLEMENTATION_REPEATABILITY"
  | "INVESTMENT_PRIORITY";

export type ScorebookAction = "INVEST" | "MAINTAIN" | "WATCH" | "DEPRIORITIZE";

export type ScorebookSeverity = "LOW" | "MEDIUM" | "HIGH";

export interface PortfolioBenchmarkScorebookItem {
  id: string;
  lane: string;
  dimension: ScorebookDimension;
  action: ScorebookAction;
  verticalCluster: string;
  scorebookTier: "FLAGSHIP" | "EXPAND" | "PROVE" | "WATCH";
  boardQuestion: string;
  owner: string;
  audience: string;
  currentPosture: string;
  scorebookNarrative: string;
  comparativeReality: string;
  riskHeadline: string;
  scoreSignal: string;
  missingProof: string;
  evidenceArtifacts: string[];
  opportunityMoves: string[];
  relatedSurfaces: string[];
  companyTags: string[];
  scorebookScore: number;
  proofDepthScore: number;
  commercialPullScore: number;
  repeatabilityScore: number;
  executionDragScore: number;
  investableRevenueMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
}

export interface ScorebookAssessment {
  severity: ScorebookSeverity;
  ok: boolean;
  message: string;
}

export interface PortfolioBenchmarkScorebookReportItem extends PortfolioBenchmarkScorebookItem {
  scorebookAssessment: ScorebookAssessment;
  proofDepthAssessment: ScorebookAssessment;
  commercialPullAssessment: ScorebookAssessment;
  repeatabilityAssessment: ScorebookAssessment;
  dragAssessment: ScorebookAssessment;
  compositePriorityScore: number;
}

export interface PortfolioBenchmarkScorebookSummary {
  lanesTracked: number;
  flagshipLanes: number;
  proofRequiredLanes: number;
  strongestScores: number;
  averageScorebookScore: number;
  investableRevenueMillions: number;
  leadingMessage: string;
}

export interface PortfolioBenchmarkScorebookExport {
  generatedAt: string;
  summary: PortfolioBenchmarkScorebookSummary;
  items: PortfolioBenchmarkScorebookReportItem[];
}

export interface PortfolioBenchmarkScorebookPayload {
  report: PortfolioBenchmarkScorebookExport;
  scorebookRegister: ReturnType<typeof import("./services/verticalBriefService.js").scorebookRegister>;
  benchmarkTiers: ReturnType<typeof import("./services/verticalBriefService.js").benchmarkTiers>;
  investmentPosture: ReturnType<typeof import("./services/verticalBriefService.js").investmentPosture>;
  riskMap: ReturnType<typeof import("./services/verticalBriefService.js").riskMap>;
  verification: string[];
  sample: PortfolioBenchmarkScorebookItem[];
}
