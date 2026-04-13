import { NextResponse } from "next/server";
import { californiaFQHCs, type CaliforniaFQHC } from "@/lib/california-fqhcs";
import { getAllResilienceScores } from "@/lib/fqhc-resilience";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-dir-${ip}`, { limit: 30, windowMs: 60000 });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const url = new URL(request.url);
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get("limit") || "50", 10)));
  const region = url.searchParams.get("region");
  const q = url.searchParams.get("q");

  let fqhcs: CaliforniaFQHC[] = [...californiaFQHCs];

  // Text search
  if (q) {
    const query = q.toLowerCase();
    fqhcs = fqhcs.filter(
      (f) =>
        f.name.toLowerCase().includes(query) ||
        f.city.toLowerCase().includes(query) ||
        f.county.toLowerCase().includes(query)
    );
  }

  // Filter by region
  if (region) {
    fqhcs = fqhcs.filter(
      (f) => f.region.toLowerCase().replace(/\s+/g, "-") === region.toLowerCase()
    );
  }

  // Sort alphabetically
  fqhcs.sort((a, b) => a.name.localeCompare(b.name));

  const totalCount = fqhcs.length;
  const start = (page - 1) * limit;
  const paginated = fqhcs.slice(start, start + limit);

  // Attach resilience grades
  const resilienceScores = getAllResilienceScores();
  const resilienceMap = new Map(resilienceScores.map((r) => [r.slug, r]));

  const data = paginated.map((fqhc) => {
    const resilience = resilienceMap.get(fqhc.slug);
    return {
      slug: fqhc.slug,
      name: fqhc.name,
      city: fqhc.city,
      county: fqhc.county,
      region: fqhc.region,
      lat: fqhc.lat,
      lng: fqhc.lng,
      siteCount: fqhc.siteCount,
      patientCount: fqhc.patientCount,
      staffCount: fqhc.staffCount,
      ehrSystem: fqhc.ehrSystem,
      glassdoorRating: fqhc.glassdoorRating,
      programs: fqhc.programs,
      resilienceGrade: resilience?.grade ?? null,
      resilienceScore: resilience?.overall ?? null,
    };
  });

  return NextResponse.json({
    data,
    totalCount,
    page,
    pageSize: limit,
    hasMore: start + limit < totalCount,
  });
}
