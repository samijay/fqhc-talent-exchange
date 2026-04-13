import { NextResponse } from "next/server";
import { policyTimeline, type PolicyChange } from "@/lib/funding-impact-data";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-legis-${ip}`, { limit: 30, windowMs: 60000 });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const url = new URL(request.url);
  const category = url.searchParams.get("category"); // federal, state, local
  const upcoming = url.searchParams.get("upcoming"); // "true" to get only future dates

  let policies: PolicyChange[] = [...policyTimeline];

  // Sort by date ascending for timeline view
  policies.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Filter by category
  if (category) {
    policies = policies.filter((p) => p.category === category);
  }

  // Filter to upcoming only (funding cliffs)
  const now = new Date();
  if (upcoming === "true") {
    policies = policies.filter((p) => new Date(p.date) > now);
  }

  // Compute funding cliff countdowns
  const cliffs = policyTimeline
    .filter((p) => new Date(p.date) > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)
    .map((p) => {
      const daysUntil = Math.ceil(
        (new Date(p.date).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );
      return {
        id: p.id,
        title: p.title,
        date: p.date,
        daysUntil,
        category: p.category,
        dollarAmount: p.dollarAmount,
        peopleAffected: p.peopleAffected,
        urgency: daysUntil <= 7 ? "critical" : daysUntil <= 30 ? "warning" : daysUntil <= 90 ? "upcoming" : "future",
      };
    });

  return NextResponse.json({
    data: policies,
    totalCount: policies.length,
    cliffs,
  });
}
