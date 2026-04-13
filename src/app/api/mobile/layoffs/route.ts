import { NextResponse } from "next/server";
import { californiaFQHCLayoffs, type LayoffEntry } from "@/lib/california-fqhc-layoffs";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-layoffs-${ip}`, { limit: 30, windowMs: 60000 });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const url = new URL(request.url);
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
  const limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get("limit") || "20", 10)));
  const region = url.searchParams.get("region");
  const fqhcOnly = url.searchParams.get("fqhc_only");
  const since = url.searchParams.get("since");

  let entries: LayoffEntry[] = [...californiaFQHCLayoffs];

  // Sort by date announced descending
  entries.sort((a, b) => new Date(b.dateAnnounced).getTime() - new Date(a.dateAnnounced).getTime());

  // Filter by region
  if (region) {
    entries = entries.filter(
      (entry) => entry.region.toLowerCase().replace(/\s+/g, "-") === region.toLowerCase()
    );
  }

  // Filter to FQHC-only
  if (fqhcOnly === "true") {
    entries = entries.filter((entry) => entry.isFQHC);
  }

  // Delta sync
  if (since) {
    const sinceDate = new Date(since);
    if (!isNaN(sinceDate.getTime())) {
      entries = entries.filter((entry) => new Date(entry.dateAnnounced) > sinceDate);
    }
  }

  const totalCount = entries.length;
  const start = (page - 1) * limit;
  const paginated = entries.slice(start, start + limit);

  // Compute 90-day trend
  const now = new Date();
  const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
  const recentCount = californiaFQHCLayoffs.filter(
    (e) => new Date(e.dateAnnounced) >= ninetyDaysAgo
  ).length;
  const recentWorkers = californiaFQHCLayoffs
    .filter((e) => new Date(e.dateAnnounced) >= ninetyDaysAgo)
    .reduce((sum, e) => sum + e.employeesAffected, 0);

  return NextResponse.json({
    data: paginated,
    totalCount,
    page,
    pageSize: limit,
    hasMore: start + limit < totalCount,
    stats: {
      last90Days: { filings: recentCount, workersAffected: recentWorkers },
      total: { filings: californiaFQHCLayoffs.length, workersAffected: californiaFQHCLayoffs.reduce((s, e) => s + e.employeesAffected, 0) },
    },
  });
}
