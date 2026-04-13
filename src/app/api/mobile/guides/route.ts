import { NextResponse } from "next/server";
import { FQHC_GUIDES } from "@/lib/fqhc-guides";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-guides-${ip}`, { limit: 30, windowMs: 60000 });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const url = new URL(request.url);
  const category = url.searchParams.get("category");

  let guides = FQHC_GUIDES.map((g) => ({
    id: g.id,
    title: g.title, // { en, es } bilingual object
    summary: g.summary, // { en, es }
    category: g.category,
    difficulty: g.difficulty,
    readTime: g.readTime,
    targetRoles: g.targetRoles,
    primarySourceUrl: g.primarySourceUrl,
    primarySourceOrg: g.primarySourceOrg,
    sections: g.sections.map((s) => ({
      heading: s.heading, // { en, es }
      keyPoints: s.keyPoints, // { en, es }[]
      detail: s.detail, // { en, es } | undefined
    })),
  }));

  if (category) {
    guides = guides.filter((g) => g.category === category);
  }

  return NextResponse.json({ data: guides, totalCount: guides.length });
}
