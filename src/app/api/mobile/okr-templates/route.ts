import { NextResponse } from "next/server";
import { OKR_TEMPLATES, OKR_DOMAINS } from "@/lib/fqhc-okr-templates";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-okr-${ip}`, { limit: 30, windowMs: 60000 });
  if (!allowed) return NextResponse.json({ error: "Too many requests." }, { status: 429 });

  const url = new URL(request.url);
  const domain = url.searchParams.get("domain");
  const difficulty = url.searchParams.get("difficulty");

  let templates = OKR_TEMPLATES.map((t) => ({
    id: t.id,
    domain: t.domain,
    objective: t.objective,
    context: t.context,
    timeframe: t.timeframe,
    difficulty: t.difficulty,
    featured: t.featured || false,
    keyResults: t.keyResults.map((kr) => ({
      kr: kr.kr,
      metric: kr.metric,
      target: kr.target,
      departmentsInvolved: kr.departmentsInvolved,
    })),
  }));

  if (domain) templates = templates.filter((t) => t.domain === domain);
  if (difficulty) templates = templates.filter((t) => t.difficulty === difficulty);

  // Featured first, then by domain
  templates.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  const domains = OKR_DOMAINS.map((d) => ({ id: d.id, en: d.en, es: d.es }));

  return NextResponse.json({ data: templates, domains, totalCount: templates.length });
}
