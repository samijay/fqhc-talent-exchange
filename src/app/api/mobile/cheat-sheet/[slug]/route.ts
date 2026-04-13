import { NextResponse } from "next/server";
import { californiaFQHCs } from "@/lib/california-fqhcs";
import { INTEL_ITEMS } from "@/lib/fqhc-news-intel";
import { fqhcJobListings } from "@/lib/fqhc-job-listings";
import { getResilienceBySlug } from "@/lib/fqhc-resilience";
import { getLayoffsForFQHC } from "@/lib/california-fqhc-layoffs";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-cheat-${ip}`, { limit: 30, windowMs: 60000 });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const { slug } = await params;

  const fqhc = californiaFQHCs.find((f) => f.slug === slug);
  if (!fqhc) {
    return NextResponse.json({ error: "FQHC not found." }, { status: 404 });
  }

  // Resilience score
  const resilience = getResilienceBySlug(slug);

  // Recent intel affecting this FQHC (last 10)
  const relatedIntel = INTEL_ITEMS
    .filter((item) => item.affectedOrgSlugs?.includes(slug))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10)
    .map((item) => ({
      id: item.id,
      headline: item.headline,
      category: item.category,
      impactLevel: item.impactLevel,
      date: item.date,
    }));

  // Open jobs at this FQHC
  const jobs = fqhcJobListings.filter((j) => j.fqhcSlug === slug);
  const jobSummary = {
    totalCount: jobs.length,
    roles: [...new Set(jobs.map((j) => j.roleType))].slice(0, 10),
    salaryRange: jobs.length > 0
      ? { min: Math.min(...jobs.map((j) => j.salaryMin)), max: Math.max(...jobs.map((j) => j.salaryMax)) }
      : null,
  };

  // Layoff history
  const layoffs = getLayoffsForFQHC(slug);

  return NextResponse.json({
    profile: {
      name: fqhc.name,
      slug: fqhc.slug,
      city: fqhc.city,
      county: fqhc.county,
      region: fqhc.region,
      lat: fqhc.lat,
      lng: fqhc.lng,
      siteCount: fqhc.siteCount,
      patientCount: fqhc.patientCount,
      staffCount: fqhc.staffCount,
      programs: fqhc.programs,
      ehrSystem: fqhc.ehrSystem,
      website: fqhc.website,
      glassdoorRating: fqhc.glassdoorRating,
      glassdoorReviewCount: fqhc.glassdoorReviewCount,
      ecmProvider: fqhc.ecmProvider,
      nhscApproved: fqhc.nhscApproved,
      servesUndocumented: fqhc.servesUndocumented,
      coverageVulnerabilityPercent: fqhc.coverageVulnerabilityPercent,
      fundingImpactLevel: fqhc.fundingImpactLevel,
      missionStatement: fqhc.missionStatement,
    },
    resilience: resilience
      ? {
          grade: resilience.grade,
          overall: resilience.overall,
          riskLevel: resilience.riskLevel,
          dimensions: resilience.dimensions,
          dataCompleteness: resilience.dataCompleteness,
        }
      : null,
    intel: relatedIntel,
    jobs: jobSummary,
    layoffs: layoffs.map((l) => ({
      id: l.id,
      dateAnnounced: l.dateAnnounced,
      employeesAffected: l.employeesAffected,
      reason: l.reason,
      status: l.status,
    })),
  });
}
