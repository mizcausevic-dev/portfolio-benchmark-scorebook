import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { samplePortfolioBenchmarkScorebook } from "../src/data/sampleVerticalBrief.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixturesDir = path.join(root, "fixtures");
mkdirSync(fixturesDir, { recursive: true });

rmSync(path.join(fixturesDir, "vertical-benchmark-comparator.json"), { force: true });
rmSync(path.join(fixturesDir, "vertical-benchmark-comparator-clean.json"), { force: true });
rmSync(path.join(fixturesDir, "portfolio-benchmark-scorebook.json"), { force: true });
rmSync(path.join(fixturesDir, "portfolio-benchmark-scorebook-clean.json"), { force: true });

writeFileSync(
  path.join(fixturesDir, "portfolio-benchmark-scorebook.json"),
  JSON.stringify(samplePortfolioBenchmarkScorebook, null, 2)
);

writeFileSync(
  path.join(fixturesDir, "portfolio-benchmark-scorebook-clean.json"),
  JSON.stringify(
    samplePortfolioBenchmarkScorebook.map(({ narrative: _narrative, currentPosture: _currentPosture, ...item }) => item),
    null,
    2
  )
);
