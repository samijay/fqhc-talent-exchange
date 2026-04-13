import { NextResponse } from "next/server";
import { CASE_STUDIES } from "@/lib/fqhc-case-studies";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-cases-${ip}`, { limit: 30, windowMs: 60000 });
  if (!allowed) return NextResponse.json({ error: "Too many requests." }, { status: 429 });

  const url = new URL(request.url);
  const category = url.searchParams.get("category");

  let studies = CASE_STUDIES.map((s) => ({
    id: s.id,
    fqhcName: s.fqhcName,
    fqhcSlug: s.fqhcSlug,
    location: s.location,
    date: s.date,
    timeframe: s.timeframe,
    difficulty: s.difficulty,
    headline: s.headline,       // { en, es }
    challenge: s.challenge,     // { en, es }
    guidingPolicy: s.guidingPolicy, // { en, es }
    actions: s.actions,         // { en, es }[]
    outcomes: s.outcomes,
    strategyCategory: s.strategyCategory,
    primarySourceUrl: s.primarySourceUrl,
    primarySourceOrg: s.primarySourceOrg,
  }));

  if (category) studies = studies.filter((s) => s.strategyCategory === category);

  return NextResponse.json({ data: studies, totalCount: studies.length });
}
