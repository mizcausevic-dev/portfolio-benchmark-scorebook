import express from "express";
import { benchmarkTiers, investmentPosture, payload, riskMap, scorebookRegister, summary, verification } from "./services/verticalBriefService.js";
import {
  renderBenchmarkTiers,
  renderDocs,
  renderInvestmentPosture,
  renderScorebookOverview,
  renderScorebookRegister,
  renderVerification
} from "./services/render.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderScorebookOverview()));
  app.get("/scorebook-register", (_req, res) => res.type("html").send(renderScorebookRegister()));
  app.get("/benchmark-tiers", (_req, res) => res.type("html").send(renderBenchmarkTiers()));
  app.get("/investment-posture", (_req, res) => res.type("html").send(renderInvestmentPosture()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/scorebook-register", (_req, res) => res.json(scorebookRegister()));
  app.get("/api/benchmark-tiers", (_req, res) => res.json(benchmarkTiers()));
  app.get("/api/investment-posture", (_req, res) => res.json(investmentPosture()));
  app.get("/api/risk-map", (_req, res) => res.json(riskMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.json(payload().sample));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

/* c8 ignore next 5 */
if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1].replace(/\\/g, "/")}`).href) {
  const port = Number(process.env.PORT ?? 4318);
  createApp().listen(port, () => {
    console.log(`portfolio-benchmark-scorebook listening on http://127.0.0.1:${port}`);
  });
}
