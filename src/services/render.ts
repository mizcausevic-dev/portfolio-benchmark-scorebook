import { benchmarkTiers, investmentPosture, payload, riskMap, scorebookRegister, summary, verification } from "./verticalBriefService.js";

const productTitle = "Portfolio Benchmark Scorebook";
const domain = "https://scorebook.kineticgain.com";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function shell(title: string, path: string, body: string, description: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} · Kinetic Gain</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <style>
      :root { color-scheme: dark; --bg:#07111d; --panel:#0d1a2b; --border:rgba(103,224,190,.22); --text:#edf2ff; --muted:#9fb0cf; --accent:#67e0be; --accent-2:#7dc4ff; }
      * { box-sizing:border-box; }
      body { margin:0; font-family:"Segoe UI",system-ui,sans-serif; background:radial-gradient(circle at top left, rgba(125,196,255,.12), transparent 30%), linear-gradient(180deg,#050c16 0%,var(--bg) 100%); color:var(--text); }
      a { color:var(--accent-2); text-decoration:none; }
      .wrap { max-width:1180px; margin:0 auto; padding:32px 24px 64px; }
      .hero,.section { background:linear-gradient(180deg, rgba(14,28,45,.95), rgba(10,19,33,.98)); border:1px solid var(--border); border-radius:28px; padding:28px; box-shadow:0 18px 60px rgba(2,7,16,.35); }
      .hero { margin-bottom:24px; }
      .eyebrow { display:inline-block; padding:10px 16px; border-radius:999px; border:1px solid var(--border); background:rgba(103,224,190,.08); color:var(--accent); font-size:12px; text-transform:uppercase; letter-spacing:.28em; }
      h1,h2 { margin:18px 0 12px; font-family:Georgia,serif; line-height:.95; }
      h1 { font-size:clamp(56px,8vw,92px); max-width:980px; }
      h2 { font-size:clamp(36px,4vw,54px); }
      .lede { color:var(--muted); font-size:20px; line-height:1.6; max-width:920px; }
      .nav { display:flex; gap:10px; flex-wrap:wrap; margin-top:22px; }
      .nav a { padding:10px 14px; border:1px solid rgba(125,196,255,.18); border-radius:999px; color:var(--muted); }
      .nav a.active { color:var(--text); border-color:var(--accent); background:rgba(103,224,190,.08); }
      .metrics,.grid { display:grid; gap:18px; }
      .metrics { grid-template-columns:repeat(auto-fit, minmax(180px,1fr)); margin-top:26px; }
      .metric,.card,.table-wrap { background:rgba(16,32,50,.76); border:1px solid rgba(125,196,255,.12); border-radius:22px; padding:18px; }
      .metric-label,.chip { color:var(--accent); text-transform:uppercase; letter-spacing:.18em; font-size:12px; }
      .metric-value { display:block; font-size:40px; font-weight:700; margin-top:10px; }
      .metric-copy { margin-top:10px; color:var(--muted); line-height:1.5; }
      .section { margin-top:24px; }
      .grid { grid-template-columns:repeat(auto-fit, minmax(280px,1fr)); }
      .card h3 { margin:12px 0 10px; font-size:30px; line-height:1.05; }
      .card p,li { color:var(--muted); line-height:1.6; }
      .table-wrap { overflow-x:auto; }
      table { width:100%; border-collapse:collapse; }
      th,td { text-align:left; padding:12px; border-bottom:1px solid rgba(125,196,255,.12); vertical-align:top; }
      th { color:var(--accent); font-size:12px; text-transform:uppercase; letter-spacing:.18em; }
      ul { padding-left:20px; }
      pre { white-space:pre-wrap; overflow-wrap:anywhere; color:var(--muted); background:rgba(7,17,29,.75); border:1px solid rgba(125,196,255,.12); border-radius:18px; padding:18px; }
      .footer { margin-top:24px; color:var(--muted); font-size:14px; display:flex; gap:18px; flex-wrap:wrap; }
    </style>
  </head>
  <body>
    <div class="wrap">
      ${body}
      <div class="footer">
        <span>${productTitle}</span>
        <a href="${domain}">${domain.replace("https://", "")}</a>
        <a href="https://github.com/mizcausevic-dev/">GitHub</a>
        <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
        <a href="https://kineticgain.com/">Kinetic Gain</a>
      </div>
    </div>
  </body>
</html>`;
}

function navLinks(path: string) {
  return [
    ["/", "Overview"],
    ["/scorebook-register", "Scorebook register"],
    ["/benchmark-tiers", "Benchmark tiers"],
    ["/investment-posture", "Investment posture"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ]
    .map(([href, label]) => `<a${href === path ? ' class="active"' : ""} href="${href}">${label}</a>`)
    .join("");
}

export function renderScorebookOverview() {
  const executiveSummary = summary();
  const lanes = scorebookRegister().slice(0, 4);
  const findings = riskMap().slice(0, 5);
  const cards = lanes.map((item) => `<article class="card">
        <div class="chip">${escapeHtml(item.action)}</div>
        <h3>${escapeHtml(item.verticalCluster)}</h3>
        <p><strong>Tier:</strong> ${escapeHtml(item.scorebookTier)}</p>
        <p><strong>Owner:</strong> ${escapeHtml(item.owner)}</p>
        <p><strong>Audience:</strong> ${escapeHtml(item.audience)}</p>
        <p><strong>Narrative:</strong> ${escapeHtml(item.scorebookNarrative)}</p>
        <p><strong>Scorebook score:</strong> ${item.scorebookScore}</p>
        <p>${escapeHtml(item.nextMove)}</p>
      </article>`).join("");
  const risks = findings.map((item) => `<li><strong>${escapeHtml(item.lane)}</strong> · priority ${item.compositePriorityScore} · drag ${item.executionDragScore} · $${item.investableRevenueMillions}M investable</li>`).join("");

  return shell(
    productTitle,
    "/",
    `<section class="hero">
      <span class="eyebrow">Portfolio scorebook</span>
      <h1>Which lanes belong in the flagship story, which ones stay in expansion tiers, and which ones still need more proof before they earn heavier investment?</h1>
      <p class="lede">Portfolio Benchmark Scorebook turns board-facing prioritization, proof density, commercial pull, repeatability, and execution drag into one reusable ranking layer instead of scattered portfolio opinions.</p>
      <div class="nav">${navLinks("/")}</div>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Lanes tracked</span><span class="metric-value">${executiveSummary.lanesTracked}</span><div class="metric-copy">Modeled lanes in the current executive-facing scorebook set.</div></div>
        <div class="metric"><span class="metric-label">Flagship lanes</span><span class="metric-value">${executiveSummary.flagshipLanes}</span><div class="metric-copy">Lanes with score, proof, and commercial pull aligned strongly enough to lead the narrative.</div></div>
        <div class="metric"><span class="metric-label">Proof-required lanes</span><span class="metric-value">${executiveSummary.proofRequiredLanes}</span><div class="metric-copy">Lanes where proof depth, repeatability, or drag still weaken the story.</div></div>
        <div class="metric"><span class="metric-label">Investable revenue</span><span class="metric-value">$${executiveSummary.investableRevenueMillions}M</span><div class="metric-copy">Modeled revenue tied to the current benchmark portfolio.</div></div>
      </div>
    </section>
    <section class="section">
      <h2>Scorebook register</h2>
      <p class="lede">${escapeHtml(executiveSummary.boardMessage)}</p>
      <div class="grid">${cards}</div>
    </section>
    <section class="section">
      <h2>Board-visible ranking pressure</h2>
      <ul>${risks}</ul>
    </section>`,
    "Board-ready surface for ranking portfolio lanes by proof, pull, repeatability, and investment priority."
  );
}

export function renderScorebookRegister() {
  const rows = scorebookRegister().map((item) => `<tr><td>${escapeHtml(item.verticalCluster)}</td><td>${escapeHtml(item.scorebookTier)}</td><td>${escapeHtml(item.owner)}</td><td>${escapeHtml(item.audience)}</td><td>${escapeHtml(item.action)}</td><td>${escapeHtml(item.scorebookNarrative)}</td><td>${item.scorebookScore}</td></tr>`).join("");
  return shell("Scorebook register", "/scorebook-register", `<section class="hero"><span class="eyebrow">Scorebook register</span><h1>Each lane keeps one tier, one owner, one board audience, and one ranking story attached.</h1><p class="lede">The scorebook register keeps the portfolio narrative tied to the exact lane that should lead, expand, prove, or watch.</p><div class="nav">${navLinks("/scorebook-register")}</div></section><section class="section table-wrap"><table><thead><tr><th>Vertical cluster</th><th>Tier</th><th>Owner</th><th>Audience</th><th>Action</th><th>Scorebook narrative</th><th>Score</th></tr></thead><tbody>${rows}</tbody></table></section>`, "Scorebook-register view showing which lanes deserve heavier board and investor emphasis.");
}

export function renderBenchmarkTiers() {
  const rows = benchmarkTiers().map((item) => `<tr><td>${escapeHtml(item.lane)}</td><td>${escapeHtml(item.scorebookTier)}</td><td>${escapeHtml(item.dimension)}</td><td>${escapeHtml(item.riskHeadline)}</td><td>${escapeHtml(item.scoreSignal)}</td><td>${escapeHtml(item.missingProof)}</td><td>${item.scorebookScore}</td><td>${item.proofDepthScore}</td><td>${item.commercialPullScore}</td><td>${item.repeatabilityScore}</td></tr>`).join("");
  return shell("Benchmark tiers", "/benchmark-tiers", `<section class="hero"><span class="eyebrow">Benchmark tiers</span><h1>Weak proof, low repeatability, and excess drag stay visible in one scorebook tier room instead of hiding behind a broad portfolio headline.</h1><p class="lede">This view keeps every lane tied to the exact dimension that is strongest, weakest, or most likely to distort the next board story.</p><div class="nav">${navLinks("/benchmark-tiers")}</div></section><section class="section table-wrap"><table><thead><tr><th>Lane</th><th>Tier</th><th>Dimension</th><th>Risk headline</th><th>Score signal</th><th>Missing proof</th><th>Score</th><th>Proof</th><th>Pull</th><th>Repeatability</th></tr></thead><tbody>${rows}</tbody></table></section>`, "Benchmark-tier view showing which lanes are strongest and which still need proof or cleanup.");
}

export function renderInvestmentPosture() {
  const rows = investmentPosture().map((item) => `<tr><td>${escapeHtml(item.lane)}</td><td>${escapeHtml(item.action)}</td><td>${item.executionDragScore}</td><td>${item.compositePriorityScore}</td><td>${escapeHtml(item.owner)}</td><td>${escapeHtml(item.nextMove)}</td></tr>`).join("");
  return shell("Investment posture", "/investment-posture", `<section class="hero"><span class="eyebrow">Investment posture</span><h1>The scorebook keeps invest, maintain, watch, and deprioritize decisions tied to one owner, one drag score, and one next move.</h1><p class="lede">This investment posture helps leaders see which lanes deserve more focus now, which ones should hold steady, and which ones are not ready for heavier capital or board emphasis.</p><div class="nav">${navLinks("/investment-posture")}</div></section><section class="section table-wrap"><table><thead><tr><th>Lane</th><th>Action</th><th>Drag</th><th>Priority</th><th>Owner</th><th>Next move</th></tr></thead><tbody>${rows}</tbody></table></section>`, "Investment-posture view for sequencing scorebook leaders, watchers, and deprioritized lanes.");
}

export function renderVerification() {
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return shell("Verification", "/verification", `<section class="hero"><span class="eyebrow">Verification</span><h1>How this scorebook surface is modeled and what it is safe to infer from it.</h1><p class="lede">The verification layer keeps synthetic assumptions and safe-use boundaries visible before anyone mistakes the sample for a live market or investor forecast.</p><div class="nav">${navLinks("/verification")}</div></section><section class="section"><ul>${notes}</ul><pre>${escapeHtml(JSON.stringify(payload().report.summary, null, 2))}</pre></section>`, "Verification notes for the Portfolio Benchmark Scorebook sample and modeled outputs.");
}

export function renderDocs() {
  return shell("Docs", "/docs", `<section class="hero"><span class="eyebrow">Docs</span><h1>Portfolio Benchmark Scorebook docs</h1><p class="lede">This surface packages portfolio fit, proof depth, commercial pull, repeatability, and execution drag into reproducible routes and JSON outputs for board, investor, and executive portfolio reviews.</p><div class="nav">${navLinks("/docs")}</div></section><section class="section"><ul><li><code>/scorebook-register</code> keeps tier stories, owners, and next moves tied to one lane.</li><li><code>/benchmark-tiers</code> compares missing proof, pull, repeatability, and drag by scorebook tier.</li><li><code>/investment-posture</code> sequences invest, maintain, watch, and deprioritize decisions.</li><li><code>/api/payload</code> exposes the reproducible scorebook packet.</li></ul></section>`, "Product documentation for Portfolio Benchmark Scorebook and its board-facing ranking routes.");
}
