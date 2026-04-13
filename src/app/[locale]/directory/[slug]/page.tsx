import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Star,
  Shield,
  Heart,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { californiaFQHCs, typicalFqhcBenefits } from "@/lib/california-fqhcs";
import type { CaliforniaFQHC } from "@/lib/california-fqhcs";
import { fqhcJobListings, getSimilarJobsForFQHC } from "@/lib/fqhc-job-listings";
import { getIntelForFQHC } from "@/lib/fqhc-news-intel";
import { getCaseStudiesForFQHC } from "@/lib/fqhc-case-studies";
import { calculateResilienceScore, getSimilarFQHCs, getAllResilienceScores } from "@/lib/fqhc-resilience";
import { getLayoffsForFQHC } from "@/lib/california-fqhc-layoffs";
import { getAIAdoptionForFQHC } from "@/lib/fqhc-ai-tracker";
import { getMovementEventsForFQHC } from "@/lib/fqhc-movement-history";
import { getResourcesForFQHC } from "@/lib/career-resources";
import { getCertificationsForFQHC } from "@/lib/certification-data";
import { getRegionSlug } from "@/lib/regional-intelligence";
import { ProfileTabs } from "@/components/directory/ProfileTabs";
import { FavoriteButton } from "@/components/dashboard/FavoriteButton";
import { MedicalOrganizationJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb as Breadcrumbs } from "@/components/ui/design-system/Breadcrumb";

/* ------------------------------------------------------------------ */
/*  Static Params                                                      */
/* ------------------------------------------------------------------ */

export async function generateStaticParams() {
  return californiaFQHCs.map((fqhc) => ({ slug: fqhc.slug }));
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fqhc = californiaFQHCs.find((f) => f.slug === slug);
  if (!fqhc) return { title: "Not Found" };

  const jobCount = fqhcJobListings.filter((j) => j.fqhcSlug === slug).length;
  const intelCount = getIntelForFQHC(slug).length;
  const ratingText = fqhc.glassdoorRating ? ` Glassdoor ${fqhc.glassdoorRating}/5.` : "";
  const jobText = jobCount > 0 ? ` ${jobCount} open positions.` : "";
  const intelText = intelCount > 0 ? ` ${intelCount} intelligence items.` : "";

  return {
    title: `${fqhc.name} — Jobs, Intel & Strategy | FQHC Talent`,
    description: `${fqhc.name} in ${fqhc.city}, CA: ${fqhc.patientCount} patients, ${fqhc.siteCount} sites.${ratingText}${jobText}${intelText} Programs: ${fqhc.programs.slice(0, 4).join(", ")}.`,
    openGraph: {
      title: `${fqhc.name} — Jobs, Salaries & Intelligence`,
      description: `${fqhc.patientCount} patients, ${fqhc.siteCount} sites.${ratingText}${jobText} ${fqhc.programs.slice(0, 4).join(", ")}.`,
      url: `https://www.fqhctalent.com/directory/${slug}`,
    },
    alternates: {
      canonical: `https://www.fqhctalent.com/directory/${slug}`,
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatCount(s: string): string {
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/** Calculate profile completeness as a percentage */
function calcProfileCompleteness(fqhc: (typeof californiaFQHCs)[0]): number {
  let score = 0;
  const total = 12;
  if (fqhc.missionStatement) score++;
  if (fqhc.glassdoorRating) score++;
  if (fqhc.staffCount && fqhc.staffCount !== "0" && fqhc.staffCount !== "Unknown") score++;
  if (fqhc.patientCount && fqhc.patientCount !== "0" && fqhc.patientCount !== "Unknown") score++;
  if (fqhc.ehrSystem && fqhc.ehrSystem !== "Unknown") score++;
  if (fqhc.website) score++;
  if (fqhc.careersUrl) score++;
  if (fqhc.programs.length > 0) score++;
  if (fqhc.unionInfo) score++;
  if (fqhc.fundingImpactLevel) score++;
  if (fqhc.coverageVulnerabilityPercent !== null) score++;
  if (fqhc.description && fqhc.description.length > 50) score++;
  return Math.round((score / total) * 100);
}

/* ------------------------------------------------------------------ */
/*  Phase 2: Enrichment helpers                                        */
/* ------------------------------------------------------------------ */

function parseCount(str: string): number {
  return parseInt(str.replace(/[^0-9]/g, ""), 10) || 0;
}

/** Build 3-5 executive summary bullets */
function buildAtAGlance(
  fqhc: CaliforniaFQHC,
  jobCount: number,
  layoffs: { employeesAffected: number }[],
  resilience: { grade: string; overall: number },
  isEs: boolean,
): string[] {
  const bullets: string[] = [];
  const size = parseCount(fqhc.staffCount) > 500 ? (isEs ? "grande" : "large") : parseCount(fqhc.staffCount) > 100 ? (isEs ? "mediana" : "mid-size") : (isEs ? "pequeña" : "small");
  bullets.push(
    isEs
      ? `${fqhc.name} es una organización ${size} que atiende a ${fqhc.patientCount} pacientes en ${fqhc.siteCount} sitios en la región de ${fqhc.region}.`
      : `${fqhc.name} is a ${size} health center serving ${fqhc.patientCount} patients across ${fqhc.siteCount} sites in the ${fqhc.region} region.`
  );
  if (fqhc.fundingImpactLevel === "high" && fqhc.coverageVulnerabilityPercent) {
    bullets.push(
      isEs
        ? `Actualmente enfrenta alta vulnerabilidad de financiamiento con ~${fqhc.coverageVulnerabilityPercent}% de pacientes en riesgo de cobertura.`
        : `Currently facing high funding vulnerability with ~${fqhc.coverageVulnerabilityPercent}% of patients at coverage risk.`
    );
  }
  if (jobCount > 0) {
    bullets.push(isEs ? `Contratando activamente con ${jobCount} posiciones abiertas.` : `Actively hiring with ${jobCount} open positions.`);
  }
  if (layoffs.length > 0) {
    const totalAffected = layoffs.reduce((s, l) => s + l.employeesAffected, 0);
    bullets.push(isEs ? `Recientemente afectado por recortes (${totalAffected} empleados).` : `Recently affected by layoffs (${totalAffected} employees).`);
  }
  if (resilience.grade === "A" || resilience.grade === "B") {
    bullets.push(isEs ? `Calificación de resiliencia ${resilience.grade} (${resilience.overall}/100) — fuerte posición operativa.` : `Resilience grade ${resilience.grade} (${resilience.overall}/100) — strong operational position.`);
  } else if (resilience.grade === "D" || resilience.grade === "F") {
    bullets.push(isEs ? `Calificación de resiliencia ${resilience.grade} (${resilience.overall}/100) — requiere monitoreo cercano.` : `Resilience grade ${resilience.grade} (${resilience.overall}/100) — requires close monitoring.`);
  }
  return bullets;
}

/** Aggregate salary data by role from job listings */
function buildSalarySummary(jobs: { title: string; salaryMin: number; salaryMax: number }[]) {
  const byRole: Record<string, { mins: number[]; maxes: number[] }> = {};
  jobs.forEach((j) => {
    // Normalize role name (take first meaningful part)
    const role = j.title.split(" - ")[0].split(" – ")[0].trim();
    if (!byRole[role]) byRole[role] = { mins: [], maxes: [] };
    byRole[role].mins.push(j.salaryMin);
    byRole[role].maxes.push(j.salaryMax);
  });
  return Object.entries(byRole)
    .map(([role, data]) => ({
      role,
      min: Math.min(...data.mins),
      max: Math.max(...data.maxes),
      avg: Math.round((data.mins.reduce((s, v) => s + v, 0) + data.maxes.reduce((s, v) => s + v, 0)) / (data.mins.length + data.maxes.length)),
      count: data.mins.length,
    }))
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 10);
}

/** Build peer comparison vs regional median */
function buildPeerComparison(fqhc: CaliforniaFQHC, resilience: { overall: number }) {
  const peers = californiaFQHCs.filter((f) => f.region === fqhc.region && f.slug !== fqhc.slug);
  if (peers.length < 3) return []; // not enough peers

  const median = (arr: number[]) => {
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  };

  const peerPatients = peers.map((p) => parseCount(p.patientCount)).filter((n) => n > 0);
  const peerStaff = peers.map((p) => parseCount(p.staffCount)).filter((n) => n > 0);
  const peerRatings = peers.map((p) => p.glassdoorRating).filter((r): r is number => r !== null);
  const peerPrograms = peers.map((p) => p.programs.length);
  const allScores = getAllResilienceScores();
  const peerResilience = allScores.filter((s) => s.region === fqhc.region && s.slug !== fqhc.slug).map((s) => s.overall);

  const comparisons = [];

  if (peerPatients.length > 3) {
    comparisons.push({
      metric: "patients",
      label: { en: "Patients Served", es: "Pacientes Atendidos" },
      thisValue: parseCount(fqhc.patientCount),
      peerMedian: Math.round(median(peerPatients)),
      unit: "",
    });
  }

  if (peerStaff.length > 3) {
    comparisons.push({
      metric: "staff",
      label: { en: "Staff", es: "Personal" },
      thisValue: parseCount(fqhc.staffCount),
      peerMedian: Math.round(median(peerStaff)),
      unit: "",
    });
  }

  if (peerRatings.length > 3) {
    comparisons.push({
      metric: "rating",
      label: { en: "Glassdoor Rating", es: "Calificación Glassdoor" },
      thisValue: fqhc.glassdoorRating ?? 0,
      peerMedian: Math.round(median(peerRatings) * 10) / 10,
      unit: "/5",
    });
  }

  comparisons.push({
    metric: "programs",
    label: { en: "Programs", es: "Programas" },
    thisValue: fqhc.programs.length,
    peerMedian: Math.round(median(peerPrograms)),
    unit: "",
  });

  if (peerResilience.length > 3) {
    comparisons.push({
      metric: "resilience",
      label: { en: "Resilience Score", es: "Puntuación de Resiliencia" },
      thisValue: resilience.overall,
      peerMedian: Math.round(median(peerResilience)),
      unit: "/100",
    });
  }

  return comparisons;
}

/** Build quality/compliance data from FQHC fields */
function buildQualityData(fqhc: CaliforniaFQHC) {
  const raw = fqhc as unknown as Record<string, unknown>;
  return {
    qualityScore: (raw.qualityScore as { overall: number; clinicalQuality?: number; patientSatisfaction?: number; access?: number; financialHealth?: number } | undefined) ?? null,
    violations: (raw.violations as { date: string; type: string; description: string; status: string }[] | undefined) ?? null,
    laborHistory: (raw.laborHistory as { date: string; event: string; outcome: string }[] | undefined) ?? null,
    greatPlaceToWork: (raw.greatPlaceToWork as { certified: boolean; year?: number; approvalPercent?: number; highlights?: string[] } | undefined) ?? null,
  };
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default async function FQHCProfilePage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const fqhc = californiaFQHCs.find((f) => f.slug === slug);
  if (!fqhc) notFound();

  const isEs = locale === "es";

  // Compute ALL data server-side (stays out of client bundle)
  const jobs = fqhcJobListings.filter((j) => j.fqhcSlug === slug);
  const relatedIntel = getIntelForFQHC(slug);
  const relatedCaseStudies = getCaseStudiesForFQHC(slug);
  const resilience = calculateResilienceScore(fqhc);
  const layoffs = getLayoffsForFQHC(slug);
  const aiAdoption = getAIAdoptionForFQHC(slug, fqhc.name);
  const movementEvents = getMovementEventsForFQHC(slug, fqhc.name);
  const relevantResources = getResourcesForFQHC(fqhc);
  const relevantCerts = getCertificationsForFQHC(fqhc);
  const similar = getSimilarFQHCs(slug, 3);
  const similarJobs = getSimilarJobsForFQHC(slug, 8);
  const profileCompleteness = calcProfileCompleteness(fqhc);

  // Phase 2: Compute enrichment data server-side
  const atAGlanceBullets = buildAtAGlance(fqhc, jobs.length, layoffs, resilience, isEs);
  const salarySummary = buildSalarySummary(jobs);
  const peerComparison = buildPeerComparison(fqhc, resilience);
  const qualityData = buildQualityData(fqhc);
  const regionSlug = getRegionSlug(fqhc.region);
  const regionalFQHCs = californiaFQHCs.filter((f) => f.region === fqhc.region);
  const allScores = getAllResilienceScores();
  const regionalScores = allScores.filter((s) => s.region === fqhc.region);
  const regionalJobs = fqhcJobListings.filter((j) => regionalFQHCs.some((f) => f.slug === j.fqhcSlug));
  const regionalStats = {
    totalFQHCs: regionalFQHCs.length,
    avgResilience: regionalScores.length > 0 ? regionalScores.reduce((s, r) => s + r.overall, 0) / regionalScores.length : 0,
    totalJobs: regionalJobs.length,
  };

  // Serialize for client component (only fields the UI needs)
  const serializedJobs = jobs.map((j) => ({
    id: j.id,
    title: j.title,
    department: j.department,
    type: j.type,
    location: j.location,
    salaryMin: j.salaryMin,
    salaryMax: j.salaryMax,
    bilingual: j.bilingual,
    programs: j.programs,
    description: j.description,
  }));

  const serializedSimilarJobs = similarJobs.map((sj) => {
    const sjFqhc = californiaFQHCs.find((f) => f.slug === sj.fqhcSlug);
    return {
      id: sj.id,
      title: sj.title,
      fqhcSlug: sj.fqhcSlug,
      fqhcName: sjFqhc?.name || sj.fqhcSlug,
      department: sj.department,
      type: sj.type,
      location: sj.location,
      salaryMin: sj.salaryMin,
      salaryMax: sj.salaryMax,
      bilingual: sj.bilingual,
      programs: sj.programs,
      matchReason: sj.matchReason,
    };
  });

  const serializedIntel = relatedIntel.map((i) => ({
    id: i.id,
    headline: i.headline,
    summary: i.summary,
    impactLevel: i.impactLevel,
    date: i.date,
    sourceUrl: i.sourceUrl,
    sourceOrg: i.sourceOrg,
  }));

  const serializedLayoffs = layoffs.map((l) => ({
    id: l.id,
    organization: l.organization,
    dateAnnounced: l.dateAnnounced,
    employeesAffected: l.employeesAffected,
    reason: l.reason,
    reasonCategory: l.reasonCategory,
    status: l.status,
    source: l.source,
  }));

  const serializedAI = aiAdoption.map((a) => ({
    id: a.id,
    title: a.title,
    description: a.description,
    vendor: a.vendor,
    adoptionStage: a.adoptionStage,
    date: a.date,
    sourceUrl: a.sourceUrl,
    sourceOrg: a.sourceOrg,
  }));

  const serializedCaseStudies = relatedCaseStudies.map((cs) => ({
    id: cs.id,
    fqhcName: cs.fqhcName,
    headline: cs.headline,
    outcomes: cs.outcomes.slice(0, 3).map((o) => ({ metric: o.metric, value: o.value })),
  }));

  const serializedMovement = movementEvents.map((e) => ({
    id: e.id,
    year: e.year,
    title: e.title,
    category: e.category,
    organizations: e.organizations,
  }));

  const serializedCerts = relevantCerts.map((c) => ({
    id: c.id,
    name: c.name,
    esName: c.esName,
    abbreviation: c.abbreviation,
    costRange: c.costRange,
    salaryImpact: c.salaryImpact,
    impactType: c.impactType,
  }));

  const serializedResources = relevantResources.map((r) => ({
    id: r.id,
    name: r.name,
    description: r.description,
    category: r.category,
    cost: r.cost,
    url: r.url,
    sourceOrg: r.sourceOrg,
  }));

  const resilienceData = {
    overall: resilience.overall,
    grade: resilience.grade,
    dataCompleteness: resilience.dataCompleteness,
    dimensions: resilience.dimensions.map((d) => ({
      dimension: d.dimension,
      score: d.score,
      label: d.label,
    })),
  };

  return (
    <div className="bg-stone-50">
      <MedicalOrganizationJsonLd
        name={fqhc.name}
        description={fqhc.missionStatement || fqhc.description}
        slug={slug}
        city={fqhc.city}
        county={fqhc.county}
        website={fqhc.website}
        programs={fqhc.programs}
        patientCount={fqhc.patientCount}
        siteCount={fqhc.siteCount}
        nhscApproved={fqhc.nhscApproved}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs
          items={[
            { label: isEs ? "Inicio" : "Home", href: "/" },
            { label: isEs ? "Directorio" : "Directory", href: "/directory" },
            { label: fqhc.name },
          ]}
        />
      </div>
      {/* ==================== HERO ==================== */}
      <section className="bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 py-12 text-white sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/directory"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-teal-200 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            {isEs ? "← Directorio" : "← Back to Directory"}
          </Link>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  {fqhc.name}
                </h1>
                {/* Favorite button (client island) */}
                <FavoriteButton contentType="fqhc" contentId={slug} size="md" />
                {/* Compare button */}
                <Link
                  href={`/compare?fqhcs=${slug}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/25"
                  title={isEs ? "Comparar con otros FQHCs" : "Compare with other FQHCs"}
                >
                  <Users className="size-4" />
                  <span className="hidden sm:inline">{isEs ? "Comparar" : "Compare"}</span>
                </Link>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-teal-100">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-4" />
                  {fqhc.city}, {fqhc.county} County
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="size-4" />
                  {fqhc.region}
                </span>
              </div>

              {/* Badges */}
              <div className="mt-4 flex flex-wrap gap-2">
                {fqhc.ecmProvider && (
                  <Badge className="border-amber-400/30 bg-amber-500/20 text-amber-100">
                    ECM Provider
                  </Badge>
                )}
                {fqhc.nhscApproved && (
                  <Badge className="border-teal-300/30 bg-teal-400/20 text-teal-100">
                    <Shield className="mr-1 size-3" />
                    {isEs ? "Aprobado por NHSC" : "NHSC Approved"}
                  </Badge>
                )}
                {fqhc.fundingImpactLevel === "high" && (
                  <Badge className="border-rose-400/30 bg-rose-500/20 text-rose-100">
                    <Heart className="mr-1 size-3" />
                    {isEs ? "Alto Riesgo de Financiamiento" : "High Funding Risk"}
                  </Badge>
                )}
                {fqhc.unionInfo?.unionized && (
                  <Badge className="border-blue-300/30 bg-blue-400/20 text-blue-100">
                    {isEs ? "Sindicalizado" : "Union"}
                  </Badge>
                )}
                {/* Resilience grade */}
                <Badge className={`${
                  resilience.grade === "A" || resilience.grade === "B"
                    ? "border-green-300/30 bg-green-400/20 text-green-100"
                    : resilience.grade === "C"
                      ? "border-amber-300/30 bg-amber-400/20 text-amber-100"
                      : "border-red-300/30 bg-red-400/20 text-red-100"
                }`}>
                  {isEs ? "Resiliencia" : "Resilience"}: {resilience.grade}
                </Badge>
              </div>
            </div>

            {/* Glassdoor rating */}
            {fqhc.glassdoorRating && (
              <div className="rounded-xl bg-white/10 px-5 py-3 text-center backdrop-blur">
                <div className="flex items-center gap-1.5">
                  <Star className="size-5 fill-amber-400 text-amber-400" aria-hidden="true" />
                  <span className="text-2xl font-bold" aria-label={`${fqhc.glassdoorRating.toFixed(1)} out of 5 stars`}>{fqhc.glassdoorRating.toFixed(1)}</span>
                </div>
                <p className="mt-0.5 text-xs text-teal-200">
                  Glassdoor
                  {fqhc.glassdoorReviewCount && (
                    <> ({fqhc.glassdoorReviewCount} {isEs ? "reseñas" : "reviews"})</>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ==================== STATS BAR ==================== */}
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto grid max-w-5xl grid-cols-3 divide-x divide-stone-200 sm:grid-cols-6">
          <div className="flex flex-col items-center py-5">
            <span className="text-xl font-bold text-stone-900 sm:text-2xl">{fqhc.siteCount}</span>
            <span className="text-xs text-stone-500 sm:text-sm">{isEs ? "Sitios" : "Sites"}</span>
          </div>
          <div className="flex flex-col items-center py-5">
            <span className="text-xl font-bold text-stone-900 sm:text-2xl">{formatCount(fqhc.patientCount)}</span>
            <span className="text-xs text-stone-500 sm:text-sm">{isEs ? "Pacientes" : "Patients"}</span>
          </div>
          <div className="flex flex-col items-center py-5">
            <span className="text-xl font-bold text-stone-900 sm:text-2xl">{formatCount(fqhc.staffCount)}</span>
            <span className="text-xs text-stone-500 sm:text-sm">{isEs ? "Personal" : "Staff"}</span>
          </div>
          <div className="flex flex-col items-center py-5">
            <span className="text-xl font-bold text-stone-900 sm:text-2xl">{jobs.length}</span>
            <span className="text-xs text-stone-500 sm:text-sm">{isEs ? "Posiciones" : "Positions"}</span>
          </div>
          <div className="flex flex-col items-center py-5">
            <span className="text-xl font-bold text-stone-900 sm:text-2xl">{relatedIntel.length}</span>
            <span className="text-xs text-stone-500 sm:text-sm">{isEs ? "Intel" : "Intel Items"}</span>
          </div>
          <div className="flex flex-col items-center py-5">
            <span className={`text-xl font-bold sm:text-2xl ${
              resilience.grade === "A" || resilience.grade === "B" ? "text-green-700" :
              resilience.grade === "C" ? "text-amber-700" : "text-red-700"
            }`}>{resilience.grade}</span>
            <span className="text-xs text-stone-500 sm:text-sm">{isEs ? "Resiliencia" : "Resilience"}</span>
          </div>
        </div>
      </section>

      {/* ==================== TABBED CONTENT ==================== */}
      <ProfileTabs
        slug={slug}
        fqhcName={fqhc.name}
        jobs={serializedJobs}
        intel={serializedIntel}
        layoffs={serializedLayoffs}
        aiAdoption={serializedAI}
        caseStudies={serializedCaseStudies}
        movementEvents={serializedMovement}
        certifications={serializedCerts}
        resources={serializedResources}
        similarFQHCs={similar}
        similarJobs={serializedSimilarJobs}
        resilience={resilienceData}
        profileCompleteness={profileCompleteness}
        details={{
          ehrSystem: fqhc.ehrSystem,
          ecmProvider: fqhc.ecmProvider,
          nhscApproved: fqhc.nhscApproved,
          website: fqhc.website,
          careersUrl: fqhc.careersUrl,
          unionInfo: fqhc.unionInfo,
          fundingImpactLevel: fqhc.fundingImpactLevel,
          coverageVulnerabilityPercent: fqhc.coverageVulnerabilityPercent,
          missionStatement: fqhc.missionStatement,
          programs: fqhc.programs,
          description: fqhc.description,
          benefits: [...typicalFqhcBenefits],
          dataSource: fqhc.dataSource,
        }}
        atAGlance={{ bullets: atAGlanceBullets }}
        salarySummary={salarySummary}
        peerComparison={peerComparison}
        qualityData={qualityData}
        regionSlug={regionSlug}
        regionalStats={regionalStats}
      />
    </div>
  );
}
