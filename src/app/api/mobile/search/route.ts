import { NextResponse } from "next/server";
import { fqhcJobListings } from "@/lib/fqhc-job-listings";
import { californiaFQHCs } from "@/lib/california-fqhcs";
import { INTEL_ITEMS } from "@/lib/fqhc-news-intel";
import { CASE_STUDIES } from "@/lib/fqhc-case-studies";
import { MASTERCLASSES } from "@/lib/fqhc-masterclasses";
import { GLOSSARY_TERMS } from "@/lib/fqhc-glossary";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-search-${ip}`, { limit: 30, windowMs: 60000 });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.toLowerCase();
  const maxPerType = 5;

  if (!q || q.length < 2) {
    return NextResponse.json({ error: "Query must be at least 2 characters." }, { status: 400 });
  }

  // Search jobs
  const jobs = fqhcJobListings
    .filter((j) => j.title.toLowerCase().includes(q) || j.roleType.toLowerCase().includes(q) || j.description.toLowerCase().includes(q))
    .slice(0, maxPerType)
    .map((j) => ({ id: j.id, title: j.title, fqhcSlug: j.fqhcSlug, roleType: j.roleType, salaryMin: j.salaryMin, salaryMax: j.salaryMax, location: j.location }));

  // Search FQHCs
  const fqhcs = californiaFQHCs
    .filter((f) => f.name.toLowerCase().includes(q) || f.city.toLowerCase().includes(q) || f.county.toLowerCase().includes(q))
    .slice(0, maxPerType)
    .map((f) => ({ slug: f.slug, name: f.name, city: f.city, region: f.region }));

  // Search intel
  const intel = INTEL_ITEMS
    .filter((item) => item.headline.en.toLowerCase().includes(q) || item.headline.es.toLowerCase().includes(q) || item.summary.en.toLowerCase().includes(q))
    .slice(0, maxPerType)
    .map((item) => ({ id: item.id, headline: item.headline, category: item.category, impactLevel: item.impactLevel, date: item.date }));

  // Search case studies
  const caseStudies = CASE_STUDIES
    .filter((s) => s.fqhcName.toLowerCase().includes(q) || s.headline.en.toLowerCase().includes(q) || s.headline.es.toLowerCase().includes(q) || s.challenge.en.toLowerCase().includes(q))
    .slice(0, maxPerType)
    .map((s) => ({ id: s.id, fqhcName: s.fqhcName, headline: s.headline, category: s.strategyCategory }));

  // Search masterclass
  const masterclass = MASTERCLASSES
    .filter((m) => m.title.en.toLowerCase().includes(q) || m.title.es.toLowerCase().includes(q) || m.subtitle.en.toLowerCase().includes(q))
    .slice(0, maxPerType)
    .map((m) => ({ id: m.id, title: m.title, category: m.category, difficulty: m.difficulty }));

  // Search glossary
  const glossary = GLOSSARY_TERMS
    .filter((t) => t.term.toLowerCase().includes(q) || t.fullName.en.toLowerCase().includes(q) || t.fullName.es.toLowerCase().includes(q))
    .slice(0, maxPerType)
    .map((t) => ({ term: t.term, fullName: t.fullName, category: t.category }));

  return NextResponse.json({
    query: q,
    results: {
      jobs: { items: jobs, totalCount: jobs.length },
      fqhcs: { items: fqhcs, totalCount: fqhcs.length },
      intel: { items: intel, totalCount: intel.length },
      caseStudies: { items: caseStudies, totalCount: caseStudies.length },
      masterclass: { items: masterclass, totalCount: masterclass.length },
      glossary: { items: glossary, totalCount: glossary.length },
    },
  });
}
