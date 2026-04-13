import { NextResponse } from "next/server";
import { RETENTION_STRATEGIES, TURNOVER_COST_ROLES } from "@/lib/workforce-resilience-hub";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-resilience-hub-${ip}`, { limit: 30, windowMs: 60000 });
  if (!allowed) return NextResponse.json({ error: "Too many requests." }, { status: 429 });

  const url = new URL(request.url);
  const pillar = url.searchParams.get("pillar");
  const difficulty = url.searchParams.get("difficulty");

  let strategies = RETENTION_STRATEGIES.map((s) => ({
    id: s.id,
    pillar: s.pillar,
    title: s.title,           // { en, es }
    description: s.description, // { en, es }
    evidenceStat: s.evidenceStat, // { en, es }
    difficulty: s.difficulty,
    timeToImpact: s.timeToImpact,
    primarySource: s.primarySource,
    tags: s.tags,
  }));

  if (pillar) strategies = strategies.filter((s) => s.pillar === pillar);
  if (difficulty) strategies = strategies.filter((s) => s.difficulty === difficulty);

  const turnoverCosts = TURNOVER_COST_ROLES.map((r) => ({
    role: r.role,           // { en, es }
    avgSalary: r.avgSalary,
    replacementCost: r.replacementCost,
    replacementMultiplier: r.replacementMultiplier,
    avgTimeToFill: r.avgTimeToFill,
    category: r.category,
  }));

  return NextResponse.json({ data: strategies, turnoverCosts, totalCount: strategies.length });
}
