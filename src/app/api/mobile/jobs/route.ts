import { NextResponse } from "next/server";
import { fqhcJobListings, type FQHCJobListing } from "@/lib/fqhc-job-listings";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-jobs-${ip}`, { limit: 30, windowMs: 60000 });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const url = new URL(request.url);
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
  const limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get("limit") || "20", 10)));
  const role = url.searchParams.get("role");
  const region = url.searchParams.get("region");
  const fqhcSlug = url.searchParams.get("fqhc");
  const salaryMin = url.searchParams.get("salary_min");
  const bilingual = url.searchParams.get("bilingual");
  const type = url.searchParams.get("type");
  const q = url.searchParams.get("q");
  const since = url.searchParams.get("since");
  const ids = url.searchParams.get("ids"); // comma-separated job IDs for saved jobs

  let jobs: FQHCJobListing[] = [...fqhcJobListings];

  // Filter by specific IDs (for saved jobs screen)
  if (ids) {
    const idList = ids.split(",").map((s) => s.trim());
    jobs = jobs.filter((j) => idList.includes(j.id));
    // Return all matching, no further filters needed
    return NextResponse.json({
      data: jobs,
      totalCount: jobs.length,
      page: 1,
      pageSize: jobs.length,
      hasMore: false,
    });
  }

  // Sort by posted date descending
  jobs.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());

  // Text search across title, description, roleType
  if (q) {
    const query = q.toLowerCase();
    jobs = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(query) ||
        job.roleType.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query)
    );
  }

  // Filter by role type
  if (role) {
    const roles = role.split(",").map((r) => r.toLowerCase());
    jobs = jobs.filter((job) => roles.includes(job.roleType.toLowerCase()));
  }

  // Filter by region (match on location city — we need to cross-reference FQHC data)
  if (region) {
    // Import is heavy, so we do a simple location match
    const regionLower = region.toLowerCase();
    jobs = jobs.filter((job) => job.location.toLowerCase().includes(regionLower));
  }

  // Filter by FQHC
  if (fqhcSlug) {
    jobs = jobs.filter((job) => job.fqhcSlug === fqhcSlug);
  }

  // Filter by minimum salary
  if (salaryMin) {
    const min = parseInt(salaryMin, 10);
    if (!isNaN(min)) {
      jobs = jobs.filter((job) => job.salaryMax >= min);
    }
  }

  // Filter by bilingual
  if (bilingual === "true") {
    jobs = jobs.filter((job) => job.bilingual);
  }

  // Filter by employment type
  if (type) {
    jobs = jobs.filter((job) => job.type === type);
  }

  // Delta sync
  if (since) {
    const sinceDate = new Date(since);
    if (!isNaN(sinceDate.getTime())) {
      jobs = jobs.filter((job) => new Date(job.postedDate) > sinceDate);
    }
  }

  const totalCount = jobs.length;
  const start = (page - 1) * limit;
  const paginatedJobs = jobs.slice(start, start + limit);

  return NextResponse.json({
    data: paginatedJobs,
    totalCount,
    page,
    pageSize: limit,
    hasMore: start + limit < totalCount,
  });
}
