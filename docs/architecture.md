# Architecture

Portfolio Benchmark Scorebook is a static-friendly TypeScript executive-intelligence surface for ranking portfolio lanes into flagship, expand, prove, and watch tiers using strength, proof depth, commercial pull, repeatability, and execution drag.

## Routes

- `/`
- `/scorebook-register`
- `/benchmark-tiers`
- `/investment-posture`
- `/verification`
- `/docs`

## Flow

1. `src/data/sampleVerticalBrief.ts` defines synthetic portfolio lanes with scorebook tiers, proof, pull, repeatability, and drag signals.
2. `src/analyze.ts` converts those signals into board-readable scorebook assessments and a composite investment-priority score.
3. `src/services/verticalBriefService.ts` shapes the scorebook register, benchmark tiers, investment posture, and JSON payload routes.
4. `src/services/render.ts` turns those outputs into the static HTML views used in the published surface.

## Output contract

The surface publishes:

- board-readable HTML routes for overview, scorebook register, benchmark tiers, investment posture, verification, and docs
- JSON routes for summary, scorebook register, benchmark tiers, investment posture, verification, and full payload export
- generated screenshots and fixtures for README packaging and safe product proof
