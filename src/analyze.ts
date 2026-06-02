import type {
  PortfolioBenchmarkScorebookExport,
  PortfolioBenchmarkScorebookItem,
  PortfolioBenchmarkScorebookReportItem,
  ScorebookAssessment,
  ScorebookSeverity
} from "./types.js";

function assessStrength(
  score: number,
  strong: number,
  watch: number,
  strongMessage: string,
  watchMessage: string,
  weakMessage: string
): ScorebookAssessment {
  let severity: ScorebookSeverity = "HIGH";
  let ok = false;
  let message = weakMessage;

  if (score >= strong) {
    severity = "LOW";
    ok = true;
    message = strongMessage;
  } else if (score >= watch) {
    severity = "MEDIUM";
    message = watchMessage;
  }

  return { severity, ok, message };
}

function assessDrag(
  score: number,
  healthy: number,
  pressured: number,
  healthyMessage: string,
  pressureMessage: string,
  highMessage: string
): ScorebookAssessment {
  let severity: ScorebookSeverity = "HIGH";
  let ok = false;
  let message = highMessage;

  if (score <= healthy) {
    severity = "LOW";
    ok = true;
    message = healthyMessage;
  } else if (score <= pressured) {
    severity = "MEDIUM";
    message = pressureMessage;
  }

  return { severity, ok, message };
}

export function analyze(
  items: PortfolioBenchmarkScorebookItem[],
  options: { now?: string } = {}
): PortfolioBenchmarkScorebookExport {
  const generatedAt = options.now ?? new Date().toISOString();

  const reportItems: PortfolioBenchmarkScorebookReportItem[] = items.map((item) => {
    const scorebookAssessment = assessStrength(
      item.scorebookScore,
      84,
      70,
      "This lane is strong enough to lead the scorebook and board narrative.",
      "This lane is promising, but it still needs tighter proof to justify top-tier positioning.",
      "This lane is weaker than the current portfolio story implies."
    );

    const proofDepthAssessment = assessStrength(
      item.proofDepthScore,
      82,
      67,
      "Proof depth is strong enough to defend the benchmark position.",
      "Proof depth exists, but more live operator evidence is needed.",
      "Proof depth is too thin for the current benchmark story."
    );

    const commercialPullAssessment = assessStrength(
      item.commercialPullScore,
      80,
      64,
      "Commercial pull is strong enough to justify active investment.",
      "Commercial pull exists, but the demand case is still uneven.",
      "Commercial pull is too weak for the current expansion story."
    );

    const repeatabilityAssessment = assessStrength(
      item.repeatabilityScore,
      78,
      62,
      "The delivery pattern is repeatable enough to scale across adjacent accounts.",
      "The pattern is partly reusable, but still depends on too much custom stitching.",
      "The pattern is still too bespoke to benchmark as a scalable lane."
    );

    const dragAssessment = assessDrag(
      item.executionDragScore,
      20,
      36,
      "Execution drag is low enough to keep investment velocity intact.",
      "Execution drag is visible and should be narrowed before scaling harder.",
      "Execution drag is high enough to distort the benchmark story."
    );

    const compositePriorityScore =
      Math.round(
        ((item.scorebookScore +
          item.proofDepthScore +
          item.commercialPullScore +
          item.repeatabilityScore +
          (100 - item.executionDragScore)) /
          5) *
          10
      ) / 10;

    return {
      ...item,
      scorebookAssessment,
      proofDepthAssessment,
      commercialPullAssessment,
      repeatabilityAssessment,
      dragAssessment,
      compositePriorityScore
    };
  });

  const flagshipLanes = reportItems.filter(
    (item) =>
      item.scorebookAssessment.severity === "LOW" &&
      item.proofDepthAssessment.severity === "LOW" &&
      item.commercialPullAssessment.severity === "LOW"
  ).length;

  const proofRequiredLanes = reportItems.filter(
    (item) =>
      item.scorebookAssessment.severity === "HIGH" ||
      item.proofDepthAssessment.severity === "HIGH" ||
      item.dragAssessment.severity === "HIGH"
  ).length;

  const strongestScores = reportItems.filter(
    (item) => item.action === "INVEST" || item.compositePriorityScore >= 78
  ).length;

  const averageScorebookScore =
    reportItems.length === 0
      ? 0
      : Math.round((reportItems.reduce((sum, item) => sum + item.scorebookScore, 0) / reportItems.length) * 10) / 10;

  const investableRevenueMillions = reportItems.reduce((sum, item) => sum + item.investableRevenueMillions, 0);

  const leadingMessage =
    flagshipLanes >= 3
      ? "Several lanes are scorebook-strong enough to anchor the next board and investor narrative, but the weaker lanes still need proof depth and repeatability cleanup."
      : proofRequiredLanes <= 2
        ? "The scorebook is promising overall, but a few lanes still need commercial proof and lower execution drag before they deserve heavier investment."
        : "The current portfolio story is too uneven to present as one coherent expansion thesis without first tightening the weakest scorebook lanes."
  ;

  return {
    generatedAt,
    summary: {
      lanesTracked: reportItems.length,
      flagshipLanes,
      proofRequiredLanes,
      strongestScores,
      averageScorebookScore,
      investableRevenueMillions,
      leadingMessage
    },
    items: reportItems
  };
}

export function toExport(items: PortfolioBenchmarkScorebookItem[], options: { now?: string } = {}) {
  return analyze(items, options);
}
