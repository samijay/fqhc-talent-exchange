import { NextResponse } from "next/server";
import { THOUGHT_LEADERS } from "@/lib/fqhc-thought-leaders";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-leaders-${ip}`, { limit: 30, windowMs: 60000 });
  if (!allowed) return NextResponse.json({ error: "Too many requests." }, { status: 429 });

  const url = new URL(request.url);
  const category = url.searchParams.get("category");

  let leaders = THOUGHT_LEADERS.map((l) => ({
    id: l.id,
    name: l.name,
    title: l.title,           // { en, es }
    organization: l.organization,
    category: l.category,
    bio: l.bio,               // { en, es }
    whyFollow: l.whyFollow,   // { en, es }
    linkedinUrl: l.linkedinUrl || null,
    twitterUrl: l.twitterUrl || null,
    orgUrl: l.orgUrl,
    relevantTopics: l.relevantTopics,
  }));

  if (category) leaders = leaders.filter((l) => l.category === category);

  return NextResponse.json({ data: leaders, totalCount: leaders.length });
}
