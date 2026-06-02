import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("portfolio-benchmark-scorebook app", () => {
  const app = createApp();

  it("serves the overview route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Portfolio Benchmark Scorebook");
  });

  it("serves the scorebook register route", async () => {
    const response = await request(app).get("/scorebook-register");
    expect(response.status).toBe(200);
  });

  it("serves the benchmark tiers route", async () => {
    const response = await request(app).get("/benchmark-tiers");
    expect(response.status).toBe(200);
  });

  it("serves the investment posture route", async () => {
    const response = await request(app).get("/investment-posture");
    expect(response.status).toBe(200);
  });

  it("serves the verification route", async () => {
    const response = await request(app).get("/verification");
    expect(response.status).toBe(200);
  });

  it("serves the docs route", async () => {
    const response = await request(app).get("/docs");
    expect(response.status).toBe(200);
  });

  it("serves the payload API", async () => {
    const response = await request(app).get("/api/payload");
    expect(response.status).toBe(200);
    expect(response.body.report.summary.lanesTracked).toBeGreaterThan(0);
  });

  it("serves the scorebook register API", async () => {
    const response = await request(app).get("/api/scorebook-register");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("serves the benchmark tiers API", async () => {
    const response = await request(app).get("/api/benchmark-tiers");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
