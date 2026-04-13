import { NextResponse } from "next/server";
import { MASTERCLASSES } from "@/lib/fqhc-masterclasses";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-masterclass-${ip}`, { limit: 30, windowMs: 60000 });
  if (!allowed) return NextResponse.json({ error: "Too many requests." }, { status: 429 });

  const url = new URL(request.url);
  const category = url.searchParams.get("category");

  let modules = MASTERCLASSES.map((m) => ({
    id: m.id,
    title: m.title,           // { en, es }
    subtitle: m.subtitle,     // { en, es }
    category: m.category,
    audience: m.audience,
    difficulty: m.difficulty,
    estimatedMinutes: m.estimatedMinutes,
    urgencyStat: m.urgencyStat, // { en, es }
    whyNow: m.whyNow,         // { en, es }
    learningObjectives: m.learningObjectives, // { en, es }[]
    keyTakeaways: m.keyTakeaways,             // { en, es }[]
  }));

  if (category) modules = modules.filter((m) => m.category === category);

  return NextResponse.json({ data: modules, totalCount: modules.length });
}
