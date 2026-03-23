// fqhc-job-listings.ts
// Realistic job listing data for California FQHCs
// Used to populate the directory's job listings section
//
// Data is split across 3 files to keep each under 500KB (Babel limit):
//   fqhc-job-listings-a.ts  — first ~430 listings
//   fqhc-job-listings-b.ts  — middle ~430 listings
//   fqhc-job-listings-c.ts  — last ~430 listings

import { fqhcJobListingsA } from "./fqhc-job-listings-a";
import { fqhcJobListingsB } from "./fqhc-job-listings-b";
import { fqhcJobListingsC } from "./fqhc-job-listings-c";

export interface FQHCJobListing {
  id: string;
  fqhcSlug: string;      // matches the FQHC slug in california-fqhcs.ts
  title: string;
  roleType: string;       // e.g., "CHW", "Care Coordinator", "RN", "Medical Assistant", etc.
  department: string;     // e.g., "ECM Program", "Primary Care", "Behavioral Health", "Administration"
  salaryMin: number;
  salaryMax: number;
  type: "Full-time" | "Part-time" | "Per Diem";
  location: string;       // city name
  bilingual: boolean;     // Spanish/English preferred
  ehrSystem: string;      // matches the FQHC's EHR
  programs: string[];     // relevant programs (ECM, CCM, etc.)
  postedDate: string;     // ISO date string
  description: string;    // 1-2 sentence description
  requirements: string[]; // 3-4 bullet points
  languageRequired?: string | null;   // e.g., "Spanish" — language required for the role
  languagePreferred?: string[] | null; // e.g., ["Spanish", "Vietnamese"] — preferred languages
  featured?: boolean;                  // show "Hot Job" banner — editorial highlight
  featuredNote?: string;               // optional short note for the hot job banner
  complianceRelevance?: ("hrsa-audits" | "hipaa-privacy" | "billing-fraud")[]; // compliance domains this role touches
}

export const fqhcJobListings: FQHCJobListing[] = [
  ...fqhcJobListingsA,
  ...fqhcJobListingsB,
  ...fqhcJobListingsC,
] as FQHCJobListing[];

export function getJobsForFqhc(slug: string): FQHCJobListing[] {
  return fqhcJobListings.filter(j => j.fqhcSlug === slug);
}

/** Infer compliance relevance for a job based on title, department, roleType, and description */
export type ComplianceDomainTag = "hrsa-audits" | "hipaa-privacy" | "billing-fraud";

export function getComplianceRelevance(job: FQHCJobListing): ComplianceDomainTag[] {
  if (job.complianceRelevance) return job.complianceRelevance;

  const domains: Set<ComplianceDomainTag> = new Set();
  const text = `${job.title} ${job.roleType} ${job.department} ${job.description}`.toLowerCase();

  // Billing / Revenue Cycle → billing-fraud
  if (
    job.department === "Revenue Cycle" ||
    /billing|coder|coding|revenue cycle|claims|pps|340b|reimbursement/i.test(text)
  ) {
    domains.add("billing-fraud");
  }

  // Quality / Compliance → hrsa-audits
  if (
    job.department === "Quality" ||
    job.department === "Compliance" ||
    /quality|compliance|audit|risk manager|credentialing|accreditation|osv|hrsa/i.test(text)
  ) {
    domains.add("hrsa-audits");
  }

  // Privacy / HIPAA → hipaa-privacy
  if (
    /hipaa|privacy|security officer|health information|phi|breach|confidential/i.test(text)
  ) {
    domains.add("hipaa-privacy");
  }

  // Compliance-titled roles get all 3
  if (/compliance officer|compliance director|chief compliance/i.test(text)) {
    domains.add("hrsa-audits");
    domains.add("hipaa-privacy");
    domains.add("billing-fraud");
  }

  return Array.from(domains);
}

/** Get jobs with compliance relevance (explicit or inferred) */
export function getComplianceJobs(): FQHCJobListing[] {
  return fqhcJobListings.filter((j) => getComplianceRelevance(j).length > 0);
}

/**
 * Find similar jobs at OTHER FQHCs based on the role types at the given FQHC.
 * Useful for "You might also be interested in" sections on FQHC profiles.
 *
 * Scoring: same roleType (+10), same department (+5), same region via location (+3),
 * bilingual match (+2), shared programs (+1 each).
 */
export function getSimilarJobsForFQHC(
  slug: string,
  limit: number = 8
): (FQHCJobListing & { matchReason: string })[] {
  const myJobs = fqhcJobListings.filter((j) => j.fqhcSlug === slug);
  if (myJobs.length === 0) return [];

  // Gather the role types, departments, programs, and locations at this FQHC
  const myRoleTypes = new Set(myJobs.map((j) => j.roleType));
  const myDepartments = new Set(myJobs.map((j) => j.department));
  const myPrograms = new Set(myJobs.flatMap((j) => j.programs));
  const myLocations = new Set(myJobs.map((j) => j.location));
  const hasBilingual = myJobs.some((j) => j.bilingual);

  // Score jobs at OTHER FQHCs
  const candidates = fqhcJobListings
    .filter((j) => j.fqhcSlug !== slug)
    .map((j) => {
      let score = 0;
      const reasons: string[] = [];

      if (myRoleTypes.has(j.roleType)) {
        score += 10;
        reasons.push(`Same role: ${j.roleType}`);
      }
      if (myDepartments.has(j.department)) {
        score += 5;
        if (!reasons.some((r) => r.startsWith("Same role"))) {
          reasons.push(`Same department: ${j.department}`);
        }
      }
      if (myLocations.has(j.location)) {
        score += 3;
        reasons.push(`Same area: ${j.location}`);
      }
      if (hasBilingual && j.bilingual) {
        score += 2;
      }
      const sharedPrograms = j.programs.filter((p) => myPrograms.has(p));
      score += sharedPrograms.length;

      return { job: j, score, reason: reasons[0] || "Similar opportunity" };
    })
    .filter((c) => c.score >= 5); // Only meaningful matches

  // Sort by score desc, then by most recent posting
  candidates.sort((a, b) =>
    b.score - a.score || b.job.postedDate.localeCompare(a.job.postedDate)
  );

  // Deduplicate by fqhcSlug — max 2 jobs per FQHC to show variety
  const result: (FQHCJobListing & { matchReason: string })[] = [];
  const fqhcCount = new Map<string, number>();

  for (const c of candidates) {
    const count = fqhcCount.get(c.job.fqhcSlug) || 0;
    if (count >= 2) continue;
    fqhcCount.set(c.job.fqhcSlug, count + 1);
    result.push({ ...c.job, matchReason: c.reason });
    if (result.length >= limit) break;
  }

  return result;
}
