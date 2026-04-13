import { NextResponse } from "next/server";
import { getRegionBySlug, getRegionalStats, getRegionalIntel } from "@/lib/regional-intelligence";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ region: string }> }
) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-regional-${ip}`, { limit: 30, windowMs: 60000 });
  if (!allowed) return NextResponse.json({ error: "Too many requests." }, { status: 429 });

  const { region: regionSlug } = await params;
  const regionName = getRegionBySlug(regionSlug);

  if (!regionName) {
    return NextResponse.json({ error: "Region not found." }, { status: 404 });
  }

  const stats = getRegionalStats(regionName);
  const intel = getRegionalIntel(regionName).slice(0, 10).map((i) => ({
    id: i.id,
    headline: i.headline,
    category: i.category,
    impactLevel: i.impactLevel,
    date: i.date,
  }));

  return NextResponse.json({
    region: regionName,
    slug: regionSlug,
    stats: {
      fqhcCount: stats.fqhcCount,
      totalStaff: stats.totalStaff,
      totalPatients: stats.totalPatients,
      totalSites: stats.totalSites,
      avgResilienceScore: stats.avgResilienceScore,
      gradeDistribution: stats.gradeDistribution,
      topPrograms: stats.topPrograms.slice(0, 5),
      avgGlassdoor: stats.avgGlassdoor,
      jobCount: stats.jobCount,
      layoffCount: stats.layoffCount,
      workersAffected: stats.workersAffected,
    },
    intel,
  });
}
