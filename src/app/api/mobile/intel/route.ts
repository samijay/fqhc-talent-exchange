import { NextResponse } from "next/server";
import { INTEL_ITEMS, type IntelItem, type IntelCategory, type ImpactLevel } from "@/lib/fqhc-news-intel";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-intel-${ip}`, { limit: 30, windowMs: 60000 });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const url = new URL(request.url);
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
  const limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get("limit") || "20", 10)));
  const category = url.searchParams.get("category") as IntelCategory | null;
  const impact = url.searchParams.get("impact") as ImpactLevel | null;
  const region = url.searchParams.get("region");
  const fqhcSlug = url.searchParams.get("fqhc_slug");
  const since = url.searchParams.get("since"); // ISO date for delta sync

  let items: IntelItem[] = [...INTEL_ITEMS];

  // Sort by date descending (newest first)
  items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Filter by category
  if (category) {
    items = items.filter((item) => item.category === category);
  }

  // Filter by impact level
  if (impact) {
    const levels = impact.split(",") as ImpactLevel[];
    items = items.filter((item) => levels.includes(item.impactLevel));
  }

  // Filter by region
  if (region) {
    items = items.filter(
      (item) =>
        item.region.toLowerCase() === region.toLowerCase() ||
        item.region === "California" ||
        item.region === "Federal"
    );
  }

  // Filter by affected FQHC
  if (fqhcSlug) {
    items = items.filter(
      (item) => item.affectedOrgSlugs?.includes(fqhcSlug)
    );
  }

  // Delta sync: only items since a given date
  if (since) {
    const sinceDate = new Date(since);
    if (!isNaN(sinceDate.getTime())) {
      items = items.filter((item) => new Date(item.date) > sinceDate);
    }
  }

  const totalCount = items.length;
  const start = (page - 1) * limit;
  const paginatedItems = items.slice(start, start + limit);

  return NextResponse.json({
    data: paginatedItems,
    totalCount,
    page,
    pageSize: limit,
    hasMore: start + limit < totalCount,
  });
}
