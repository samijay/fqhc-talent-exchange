import { Suspense } from "react";
import { californiaFQHCs, regions } from "@/lib/california-fqhcs";
import { calculateResilienceScore } from "@/lib/fqhc-resilience";
import { getJobsForFqhc } from "@/lib/fqhc-job-listings";
import { DirectoryClient } from "@/components/directory/DirectoryClient";
import type { DirectoryFQHC, DirectoryStats } from "@/components/directory/DirectoryClient";
import { FAQPageJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb as Breadcrumbs } from "@/components/ui/design-system/Breadcrumb";

/* ------------------------------------------------------------------ */
/*  Profile completeness (matches ProfileTabs logic)                   */
/* ------------------------------------------------------------------ */
function calcProfileCompleteness(f: (typeof californiaFQHCs)[0]): number {
  const fields = [
    f.missionStatement,
    f.description && f.description.length > 50,
    f.glassdoorRating,
    f.staffCount && f.staffCount !== "N/A",
    f.patientCount && f.patientCount !== "N/A",
    f.programs.length > 0,
    f.ehrSystem && f.ehrSystem !== "Unknown",
    f.careersUrl,
    f.coverageVulnerabilityPercent !== null,
    f.unionInfo,
    f.siteCount > 1,
    f.nhscApproved,
  ];
  return Math.round((fields.filter(Boolean).length / fields.length) * 100);
}

/* ------------------------------------------------------------------ */
/*  Server component — pre-compute all enrichment data                 */
/* ------------------------------------------------------------------ */
export default function DirectoryPage() {
  // Pre-compute resilience + job counts for all FQHCs (stays server-side)
  const enrichedFQHCs: DirectoryFQHC[] = californiaFQHCs.map((fqhc) => {
    const resilience = calculateResilienceScore(fqhc);
    const jobs = getJobsForFqhc(fqhc.slug);

    return {
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
      description: fqhc.description,
      glassdoorRating: fqhc.glassdoorRating,
      glassdoorReviewCount: fqhc.glassdoorReviewCount,
      ecmProvider: fqhc.ecmProvider,
      nhscApproved: fqhc.nhscApproved,
      careersUrl: fqhc.careersUrl,
      coverageVulnerabilityPercent: fqhc.coverageVulnerabilityPercent ?? null,
      fundingImpactLevel: fqhc.fundingImpactLevel ?? null,
      missionStatement: fqhc.missionStatement ?? null,
      unionInfo: fqhc.unionInfo
        ? {
            unionized: fqhc.unionInfo.unionized,
            unions: fqhc.unionInfo.unions,
            representedRoles: fqhc.unionInfo.representedRoles,
            notes: fqhc.unionInfo.notes,
          }
        : null,
      dataSource: fqhc.dataSource,
      // Pre-computed enrichments
      resilienceGrade: resilience.grade,
      resilienceScore: resilience.overall,
      jobCount: jobs.length,
      profileCompleteness: calcProfileCompleteness(fqhc),
      hasGPTW: !!((fqhc as unknown) as Record<string, unknown>).greatPlaceToWork,
    };
  });

  // Aggregate stats
  const stats: DirectoryStats = {
    totalOrgs: enrichedFQHCs.length,
    totalRegions: regions.length,
    totalSites: enrichedFQHCs.reduce((sum, f) => sum + f.siteCount, 0),
    ecmProviders: enrichedFQHCs.filter((f) => f.ecmProvider).length,
    totalJobs: enrichedFQHCs.reduce((sum, f) => sum + f.jobCount, 0),
    avgResilience: enrichedFQHCs.reduce((sum, f) => sum + f.resilienceScore, 0) / enrichedFQHCs.length,
  };

  return (
    <>
      <FAQPageJsonLd
        faqs={[
          {
            question: "What is a Federally Qualified Health Center (FQHC)?",
            answer:
              "An FQHC is a community-based healthcare provider that receives federal funding under the Health Center Program to provide primary care services in underserved areas. They serve all patients regardless of ability to pay and offer sliding fee scales based on income.",
          },
          {
            question: "How many FQHCs are in California?",
            answer: `California has ${enrichedFQHCs.length} Federally Qualified Health Centers serving millions of patients across the state. They employ tens of thousands of workers in roles ranging from medical assistants to physicians.`,
          },
          {
            question: "Do FQHCs offer loan repayment programs?",
            answer:
              "Yes, many FQHC employees qualify for the National Health Service Corps (NHSC) Loan Repayment Program, which offers up to $50,000 in tax-free student loan repayment for a 2-year service commitment at an approved FQHC site.",
          },
          {
            question: "What EHR systems do California FQHCs use?",
            answer:
              "The most common EHR systems at California FQHCs include OCHIN Epic, NextGen, eClinicalWorks, athenahealth, and Greenway Health. You can search our directory by EHR system to find FQHCs using your preferred platform.",
          },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Directory" }]} />
      </div>
      <Suspense fallback={<div className="min-h-screen bg-stone-50 dark:bg-stone-950" />}>
        <DirectoryClient fqhcs={enrichedFQHCs} stats={stats} />
      </Suspense>
    </>
  );
}
