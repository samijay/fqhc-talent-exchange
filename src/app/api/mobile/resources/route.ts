import { NextResponse } from "next/server";
import { CAREER_RESOURCES } from "@/lib/career-resources";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-resources-${ip}`, { limit: 30, windowMs: 60000 });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const costFilter = url.searchParams.get("cost");

  let resources = CAREER_RESOURCES.map((r) => ({
    id: r.id,
    name: r.name, // { en, es }
    description: r.description, // { en, es }
    category: r.category,
    cost: r.cost, // "free" | "under_100" etc.
    costDetail: r.costDetail, // { en, es }
    url: r.url,
    sourceOrg: r.sourceOrg,
    eligibility: r.eligibility, // { en, es }
    deadline: r.deadline || null,
    deadlineNote: r.deadlineNote || null, // { en, es } | undefined
    awardAmount: r.awardAmount || null,
    tags: r.tags,
    isFeatured: r.isFeatured,
  }));

  if (category) {
    resources = resources.filter((r) => r.category === category);
  }

  if (costFilter === "free") {
    resources = resources.filter((r) => r.cost === "free");
  }

  return NextResponse.json({ data: resources, totalCount: resources.length });
}
