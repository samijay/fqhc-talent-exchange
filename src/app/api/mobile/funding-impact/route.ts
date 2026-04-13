import { NextResponse } from "next/server";
import { policyTimeline, revenueStrategies, enrollmentStrategies } from "@/lib/funding-impact-data";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-funding-${ip}`, { limit: 30, windowMs: 60000 });
  if (!allowed) return NextResponse.json({ error: "Too many requests." }, { status: 429 });

  const policies = policyTimeline.map((p) => ({
    id: p.id,
    date: p.date,
    title: p.title,
    description: p.description,
    impact: p.impact,
    category: p.category,
    dollarAmount: p.dollarAmount,
    peopleAffected: p.peopleAffected,
    source: p.source,
  }));

  const revStrategies = revenueStrategies.map((s) => ({
    id: s.id,
    title: s.title,         // { en, es }
    description: s.description, // { en, es }
    category: s.category,
    potentialRevenue: s.potentialRevenue,
    difficulty: s.difficulty,
    timeToImplement: s.timeToImplement,
    steps: s.steps,         // { en, es }[]
  }));

  const enrStrategies = enrollmentStrategies.map((s) => ({
    id: s.id,
    title: s.title,
    description: s.description,
    category: s.category,
    urgency: s.urgency,
    targetDate: s.targetDate,
    actionItems: s.actionItems,
  }));

  return NextResponse.json({
    policies,
    revenueStrategies: revStrategies,
    enrollmentStrategies: enrStrategies,
    totalPolicies: policies.length,
  });
}
