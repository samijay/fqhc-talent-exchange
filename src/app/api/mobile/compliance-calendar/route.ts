import { NextResponse } from "next/server";
import { REGULATORY_DEADLINES, COMPLIANCE_DOMAINS } from "@/lib/compliance-data";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-compliance-${ip}`, { limit: 30, windowMs: 60000 });
  if (!allowed) return NextResponse.json({ error: "Too many requests." }, { status: 429 });

  const url = new URL(request.url);
  const domain = url.searchParams.get("domain");
  const upcoming = url.searchParams.get("upcoming");

  let deadlines = REGULATORY_DEADLINES.map((d) => ({
    id: d.id,
    title: d.title,           // { en, es }
    description: d.description, // { en, es }
    domain: d.domain,
    dueDate: d.dueDate,
    isRecurring: d.isRecurring,
    frequency: d.frequency || null,
    severity: d.severity,
  }));

  if (domain) deadlines = deadlines.filter((d) => d.domain === domain);

  deadlines.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const now = new Date();
  if (upcoming === "true") {
    deadlines = deadlines.filter((d) => new Date(d.dueDate) > now);
  }

  const countdowns = deadlines
    .filter((d) => new Date(d.dueDate) > now)
    .slice(0, 5)
    .map((d) => ({
      ...d,
      daysUntil: Math.ceil((new Date(d.dueDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
    }));

  const domains = COMPLIANCE_DOMAINS.map((d) => ({
    id: d.id,
    title: d.title,         // { en, es }
    shortTitle: d.shortTitle, // { en, es }
    icon: d.icon,
    color: d.color,
  }));

  return NextResponse.json({ data: deadlines, countdowns, domains, totalCount: deadlines.length });
}
