"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Briefcase,
  Shield,
  Newspaper,
  GraduationCap,
  BarChart3,
  AlertTriangle,
  Cpu,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  History,
  Heart,
  ExternalLink,
  Globe,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FavoriteButton } from "@/components/dashboard/FavoriteButton";

/* ------------------------------------------------------------------ */
/*  Serializable prop types (no functions, no classes)                  */
/* ------------------------------------------------------------------ */

interface SerializedJob {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  bilingual: boolean;
  programs: string[];
  description: string;
}

interface SerializedIntelItem {
  id: string;
  headline: { en: string; es: string };
  summary: { en: string; es: string };
  impactLevel: "critical" | "high" | "medium" | "low";
  date: string;
  sourceUrl: string;
  sourceOrg: string;
}

interface SerializedLayoff {
  id: string;
  organization: string;
  dateAnnounced: string;
  employeesAffected: number;
  reason: string;
  reasonCategory: string;
  status: string;
  source: string;
}

interface SerializedAIItem {
  id: string;
  title: { en: string; es: string };
  description: { en: string; es: string };
  vendor: string | null;
  adoptionStage: string;
  date: string;
  sourceUrl: string;
  sourceOrg: string;
}

interface SerializedCaseStudy {
  id: string;
  fqhcName: string;
  headline: { en: string; es: string };
  outcomes: { metric: string; value: string }[];
}

interface SerializedMovementEvent {
  id: string;
  year: number;
  title: { en: string; es: string };
  category: string;
  organizations: string[];
}

interface SerializedCertification {
  id: string;
  name: string;
  esName: string;
  abbreviation: string;
  costRange: string;
  salaryImpact: string;
  impactType: string;
}

interface SerializedResource {
  id: string;
  name: { en: string; es: string };
  description: { en: string; es: string };
  category: string;
  cost: string;
  url: string;
  sourceOrg: string;
}

interface SerializedSimilarJob {
  id: string;
  title: string;
  fqhcSlug: string;
  fqhcName: string;
  department: string;
  type: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  bilingual: boolean;
  programs: string[];
  matchReason: string;
}

interface SimilarFQHC {
  slug: string;
  name: string;
  region: string;
  grade: string;
  score: number;
  sharedPrograms: number;
}

interface ResilienceData {
  overall: number;
  grade: string;
  dataCompleteness: number;
  dimensions: {
    dimension: string;
    score: number;
    label: { en: string; es: string };
  }[];
}

interface QuickDetails {
  ehrSystem: string;
  ecmProvider: boolean;
  nhscApproved: boolean;
  website: string;
  careersUrl: string | null;
  unionInfo: {
    unionized: boolean;
    unions: string[];
    representedRoles: string[];
    notes: string | null;
  } | null;
  fundingImpactLevel: string | null;
  coverageVulnerabilityPercent: number | null;
  missionStatement: string | null;
  programs: string[];
  description: string;
  benefits: string[];
  dataSource: string;
}

/** At-a-glance executive summary bullets */
interface AtAGlance {
  bullets: string[];
}

/** Salary summary for this FQHC's jobs */
interface SalarySummary {
  role: string;
  min: number;
  max: number;
  avg: number;
  count: number;
}

/** Peer comparison data */
interface PeerComparison {
  metric: string;
  label: { en: string; es: string };
  thisValue: number;
  peerMedian: number;
  unit: string;
}

/** Quality & compliance data */
interface QualityData {
  qualityScore: { overall: number; clinicalQuality?: number; patientSatisfaction?: number; access?: number; financialHealth?: number } | null;
  violations: { date: string; type: string; description: string; status: string }[] | null;
  laborHistory: { date: string; event: string; outcome: string }[] | null;
  greatPlaceToWork: { certified: boolean; year?: number; approvalPercent?: number; highlights?: string[] } | null;
}

export interface ProfileTabsProps {
  slug: string;
  fqhcName: string;
  // Content
  jobs: SerializedJob[];
  intel: SerializedIntelItem[];
  layoffs: SerializedLayoff[];
  aiAdoption: SerializedAIItem[];
  caseStudies: SerializedCaseStudy[];
  movementEvents: SerializedMovementEvent[];
  certifications: SerializedCertification[];
  resources: SerializedResource[];
  similarFQHCs: SimilarFQHC[];
  similarJobs: SerializedSimilarJob[];
  resilience: ResilienceData;
  details: QuickDetails;
  profileCompleteness: number;
  // Phase 2 enrichments
  atAGlance?: AtAGlance;
  salarySummary?: SalarySummary[];
  peerComparison?: PeerComparison[];
  qualityData?: QualityData;
  regionSlug?: string;
  regionalStats?: { totalFQHCs: number; avgResilience: number; totalJobs: number };
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const IMPACT_BORDER: Record<string, string> = {
  critical: "border-l-red-600",
  high: "border-l-amber-500",
  medium: "border-l-blue-500",
  low: "border-l-stone-400",
};

const IMPACT_BADGE: Record<string, string> = {
  critical: "bg-red-100 text-red-800",
  high: "bg-amber-100 text-amber-800",
  medium: "bg-blue-100 text-blue-800",
  low: "bg-stone-100 text-stone-700",
};

/* ------------------------------------------------------------------ */
/*  Formatters                                                         */
/* ------------------------------------------------------------------ */

function formatSalary(n: number): string {
  return `$${(n / 1000).toFixed(0)}k`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

type TabId = "overview" | "news" | "jobs" | "strategy" | "career";

const TABS: { id: TabId; en: string; es: string; icon: React.ElementType }[] = [
  { id: "overview", en: "Overview", es: "Resumen", icon: BarChart3 },
  { id: "news", en: "News & Intel", es: "Noticias", icon: Newspaper },
  { id: "jobs", en: "Jobs", es: "Empleos", icon: Briefcase },
  { id: "strategy", en: "Strategy", es: "Estrategia", icon: Shield },
  { id: "career", en: "For Job Seekers", es: "Para Buscadores", icon: GraduationCap },
];

export function ProfileTabs({
  slug,
  fqhcName,
  jobs,
  intel,
  layoffs,
  aiAdoption,
  caseStudies,
  movementEvents,
  certifications,
  resources,
  similarFQHCs,
  similarJobs,
  resilience,
  details,
  profileCompleteness,
  atAGlance,
  salarySummary,
  peerComparison,
  qualityData,
  regionSlug,
  regionalStats,
}: ProfileTabsProps) {
  const locale = useLocale();
  const isEs = locale === "es";

  // Tab state with hash support
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "") as TabId;
    if (TABS.some((t) => t.id === hash)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab(hash);
    }
  }, []);

  const changeTab = (tab: TabId) => {
    setActiveTab(tab);
    window.history.replaceState(null, "", `#${tab}`);
  };

  // News tab count
  const newsCount = intel.length + layoffs.length + aiAdoption.length;
  const strategyCount = caseStudies.length + movementEvents.length;

  const tabCounts: Record<TabId, number | null> = {
    overview: null,
    news: newsCount || null,
    jobs: jobs.length || null,
    strategy: strategyCount || null,
    career: null,
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* ========== TAB BAR ========== */}
      <div className="mb-8 border-b border-stone-200">
        <nav className="-mb-px flex gap-1 overflow-x-auto" aria-label="Profile tabs">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const count = tabCounts[tab.id];
            return (
              <button
                key={tab.id}
                onClick={() => changeTab(tab.id)}
                className={`flex items-center gap-1.5 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-teal-700 text-teal-700"
                    : "border-transparent text-stone-500 hover:border-stone-300 hover:text-stone-700"
                }`}
              >
                <Icon className="size-4" />
                {isEs ? tab.es : tab.en}
                {count !== null && count > 0 && (
                  <span
                    className={`ml-1 rounded-full px-1.5 py-0.5 text-xs font-bold ${
                      isActive ? "bg-teal-100 text-teal-800" : "bg-stone-100 text-stone-600"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ========== TAB CONTENT ========== */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {activeTab === "overview" && (
            <OverviewTab
              fqhcName={fqhcName}
              slug={slug}
              details={details}
              resilience={resilience}
              profileCompleteness={profileCompleteness}
              locale={locale}
              atAGlance={atAGlance}
              peerComparison={peerComparison}
              qualityData={qualityData}
              regionSlug={regionSlug}
              regionalStats={regionalStats}
            />
          )}
          {activeTab === "news" && (
            <NewsTab
              intel={intel}
              layoffs={layoffs}
              aiAdoption={aiAdoption}
              locale={locale}
            />
          )}
          {activeTab === "jobs" && (
            <JobsTab jobs={jobs} similarJobs={similarJobs} fqhcName={fqhcName} locale={locale} salarySummary={salarySummary} />
          )}
          {activeTab === "strategy" && (
            <StrategyTab
              caseStudies={caseStudies}
              movementEvents={movementEvents}
              locale={locale}
              slug={slug}
            />
          )}
          {activeTab === "career" && (
            <CareerTab
              certifications={certifications}
              resources={resources}
              fqhcName={fqhcName}
              locale={locale}
            />
          )}
        </div>

        {/* ========== SIDEBAR ========== */}
        <div className="space-y-6">
          {/* Quick Details */}
          <div className="rounded-xl border border-stone-200 bg-white p-6">
            <h3 className="font-semibold text-stone-900">{isEs ? "Detalles" : "Details"}</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-stone-500">{isEs ? "Sistema EHR" : "EHR System"}</dt>
                <dd className="font-medium text-stone-800">{details.ehrSystem}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-stone-500">{isEs ? "Proveedor ECM" : "ECM Provider"}</dt>
                <dd className="font-medium text-stone-800">{details.ecmProvider ? (isEs ? "Sí" : "Yes") : "No"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-stone-500">NHSC</dt>
                <dd className="font-medium text-stone-800">{details.nhscApproved ? (isEs ? "Sí" : "Yes") : "No"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-stone-500">{isEs ? "Datos" : "Data Source"}</dt>
                <dd className="font-medium text-stone-800 capitalize">{details.dataSource.replace("hrsa-", "HRSA ")}</dd>
              </div>
            </dl>

            {/* Union Details */}
            {details.unionInfo?.unionized && (
              <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50/50 p-3">
                <p className="text-xs font-semibold text-blue-800">
                  {isEs ? "Sindicato(s)" : "Union(s)"}
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {details.unionInfo.unions.map((u) => (
                    <Badge key={u} className="bg-blue-100 text-blue-700 text-xs">{u}</Badge>
                  ))}
                </div>
                {details.unionInfo.representedRoles.length > 0 && (
                  <p className="mt-2 text-xs text-blue-600">
                    {isEs ? "Representa:" : "Represents:"} {details.unionInfo.representedRoles.join(", ")}
                  </p>
                )}
              </div>
            )}

            {/* Links */}
            <div className="mt-6 space-y-2">
              {details.website && (
                <a
                  href={details.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-stone-200 px-4 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:border-teal-200 hover:bg-teal-50"
                >
                  <Globe className="size-4" />
                  {isEs ? "Ver Sitio Web" : "View Website"}
                  <ExternalLink className="ml-auto size-3.5 text-stone-500" />
                </a>
              )}
              {details.careersUrl && (
                <a
                  href={details.careersUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-stone-200 px-4 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:border-teal-200 hover:bg-teal-50"
                >
                  <Briefcase className="size-4" />
                  {isEs ? "Ver Carreras" : "View Careers"}
                  <ExternalLink className="ml-auto size-3.5 text-stone-500" />
                </a>
              )}
            </div>
          </div>

          {/* Funding Vulnerability */}
          {details.coverageVulnerabilityPercent !== null && (
            <div className={`rounded-xl border p-6 ${
              details.fundingImpactLevel === "high"
                ? "border-rose-200 bg-rose-50"
                : details.fundingImpactLevel === "moderate"
                  ? "border-amber-200 bg-amber-50"
                  : "border-stone-200 bg-stone-50"
            }`}>
              <h3 className="font-semibold text-stone-900">
                {isEs ? "Vulnerabilidad de Financiamiento" : "Funding Vulnerability"}
              </h3>
              <div className="mt-3 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-600">
                    {isEs ? "Pacientes en Riesgo" : "Patients at Risk"}
                  </span>
                  <span className={`text-lg font-bold ${
                    details.fundingImpactLevel === "high" ? "text-rose-700" :
                    details.fundingImpactLevel === "moderate" ? "text-amber-700" : "text-stone-600"
                  }`}>
                    ~{details.coverageVulnerabilityPercent}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/80 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      details.fundingImpactLevel === "high" ? "bg-rose-500" :
                      details.fundingImpactLevel === "moderate" ? "bg-amber-500" : "bg-stone-400"
                    }`}
                    style={{ width: `${details.coverageVulnerabilityPercent}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Profile Completeness with Breakdown */}
          <ProfileCompletenessCard
            profileCompleteness={profileCompleteness}
            details={details}
            locale={locale}
          />

          {/* Similar FQHCs */}
          {similarFQHCs.length > 0 && (
            <div className="rounded-xl border border-stone-200 bg-white p-6">
              <h3 className="font-semibold text-stone-900">
                {isEs ? "FQHCs Similares" : "Similar FQHCs"}
              </h3>
              <div className="mt-4 space-y-3">
                {similarFQHCs.map((f) => (
                  <Link
                    key={f.slug}
                    href={`/directory/${f.slug}` as "/directory"}
                    className="block rounded-lg border border-stone-100 p-3 transition-colors hover:border-teal-200 hover:bg-teal-50/30"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-stone-800">{f.name}</span>
                      <Badge className={`text-xs ${
                        f.grade === "A" || f.grade === "B"
                          ? "bg-green-100 text-green-800"
                          : f.grade === "C"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                      }`}>
                        {f.grade}
                      </Badge>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-stone-500">
                      <span>{f.region}</span>
                      {f.sharedPrograms > 0 && (
                        <>
                          <span>·</span>
                          <span>{f.sharedPrograms} {isEs ? "programas en común" : "shared programs"}</span>
                        </>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href="/compare"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-800"
              >
                {isEs ? "Comparar FQHCs" : "Compare FQHCs"} <ArrowRight className="size-3" />
              </Link>
            </div>
          )}

          {/* Favorite + Report CTA */}
          <div className="rounded-xl border border-teal-200 bg-teal-50 p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <FavoriteButton contentType="fqhc" contentId={slug} size="md" />
              <span className="text-sm font-medium text-stone-600">
                {isEs ? "Guardar este FQHC" : "Save this FQHC"}
              </span>
            </div>
            <Button className="w-full bg-teal-700 text-white hover:bg-teal-800" asChild>
              <Link href={`/report/${slug}` as "/report"}>
                {isEs ? "Ver Reporte Estratégico" : "View Strategic Report"} <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Profile Completeness Card                                          */
/* ================================================================== */

const COMPLETENESS_FIELDS = [
  { key: "mission", en: "Mission Statement", es: "Declaración de Misión", check: (d: QuickDetails) => !!d.missionStatement },
  { key: "rating", en: "Glassdoor Rating", es: "Calificación Glassdoor", check: () => false },
  { key: "staff", en: "Staff Count", es: "Conteo de Personal", check: (d: QuickDetails) => !!(d as unknown as Record<string, string>).staffCount },
  { key: "patients", en: "Patient Count", es: "Conteo de Pacientes", check: () => true },
  { key: "ehr", en: "EHR System", es: "Sistema EHR", check: (d: QuickDetails) => d.ehrSystem !== "Unknown" },
  { key: "website", en: "Website", es: "Sitio Web", check: (d: QuickDetails) => !!d.website },
  { key: "careers", en: "Careers Page", es: "Página de Empleos", check: (d: QuickDetails) => !!d.careersUrl },
  { key: "programs", en: "Programs", es: "Programas", check: (d: QuickDetails) => d.programs.length > 0 },
  { key: "union", en: "Union Info", es: "Info Sindical", check: (d: QuickDetails) => !!d.unionInfo },
  { key: "funding", en: "Funding Impact", es: "Impacto de Financiamiento", check: (d: QuickDetails) => !!d.fundingImpactLevel },
  { key: "vulnerability", en: "Coverage Vulnerability", es: "Vulnerabilidad de Cobertura", check: (d: QuickDetails) => d.coverageVulnerabilityPercent !== null },
  { key: "description", en: "Description", es: "Descripción", check: (d: QuickDetails) => d.description.length > 50 },
];

function ProfileCompletenessCard({ profileCompleteness, details, locale }: {
  profileCompleteness: number;
  details: QuickDetails;
  locale: string;
}) {
  const isEs = locale === "es";
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-6">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between"
      >
        <h3 className="text-sm font-semibold text-stone-900">
          {isEs ? "Completitud del Perfil" : "Profile Completeness"}
        </h3>
        <div className="flex items-center gap-2">
          <div className="relative size-10">
            <svg className="size-10 -rotate-90" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="24" fill="none" stroke="#e7e5e4" strokeWidth="4" />
              <circle
                cx="28" cy="28" r="24"
                fill="none"
                stroke={profileCompleteness >= 70 ? "#0f766e" : profileCompleteness >= 40 ? "#d97706" : "#dc2626"}
                strokeWidth="4"
                strokeDasharray={`${profileCompleteness * 1.508} 150.8`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-stone-800">
              {profileCompleteness}%
            </span>
          </div>
          <ArrowRight className={`size-3.5 text-stone-400 transition-transform ${expanded ? "rotate-90" : ""}`} />
        </div>
      </button>
      {expanded && (
        <div className="mt-3 space-y-1.5 border-t border-stone-100 pt-3">
          {COMPLETENESS_FIELDS.map((f) => {
            const present = f.check(details);
            return (
              <div key={f.key} className="flex items-center gap-2 text-xs">
                {present ? (
                  <CheckCircle2 className="size-3.5 text-green-600 shrink-0" />
                ) : (
                  <span className="size-3.5 rounded-full border-2 border-stone-300 shrink-0" />
                )}
                <span className={present ? "text-stone-700" : "text-stone-400"}>
                  {isEs ? f.es : f.en}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/*  Resilience Explainer Component                                     */
/* ================================================================== */

const DIMENSION_WEIGHTS = [
  { key: "programDiversity", weight: 25, en: "Program Diversity", es: "Diversidad de Programas" },
  { key: "workforceStability", weight: 20, en: "Workforce Stability", es: "Estabilidad Laboral" },
  { key: "dataMuturity", weight: 15, en: "Data Maturity", es: "Madurez de Datos" },
  { key: "qualityIndicators", weight: 20, en: "Quality Indicators", es: "Indicadores de Calidad" },
  { key: "financialPositioning", weight: 20, en: "Financial Positioning", es: "Posicionamiento Financiero" },
];

const GRADE_SCALE = [
  { grade: "A", min: 80, color: "bg-green-500", label: "Strong" },
  { grade: "B", min: 65, color: "bg-green-400", label: "Above Average" },
  { grade: "C", min: 50, color: "bg-amber-500", label: "Average" },
  { grade: "D", min: 35, color: "bg-red-400", label: "Below Average" },
  { grade: "F", min: 0, color: "bg-red-600", label: "At Risk" },
];

function ResilienceSection({ fqhcName, resilience, slug, isEs }: {
  fqhcName: string;
  resilience: ResilienceData;
  slug: string;
  isEs: boolean;
}) {
  const [showExplainer, setShowExplainer] = useState(false);

  // Auto-generate strengths/weaknesses
  const strengths = resilience.dimensions.filter((d) => d.score >= 70).map((d) => isEs ? d.label.es : d.label.en);
  const weaknesses = resilience.dimensions.filter((d) => d.score < 40).map((d) => isEs ? d.label.es : d.label.en);

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 text-lg font-bold text-stone-900">
          <Shield className="size-5" />
          {isEs ? "Puntuación de Resiliencia" : "Resilience Score"}
          <button
            onClick={() => setShowExplainer(!showExplainer)}
            className="ml-1 rounded-full p-0.5 text-stone-400 hover:text-teal-700 hover:bg-teal-50 transition-colors"
            title={isEs ? "¿Cómo se calcula?" : "How is this calculated?"}
          >
            <AlertTriangle className="size-4" />
          </button>
        </h2>
        <div className="flex items-center gap-2">
          <span className={`text-3xl font-extrabold ${
            resilience.overall >= 70 ? "text-green-700" :
            resilience.overall >= 50 ? "text-amber-700" : "text-red-700"
          }`}>{resilience.overall}</span>
          <Badge className={`text-xs ${
            resilience.grade === "A" || resilience.grade === "B"
              ? "bg-green-100 text-green-800 border-green-200"
              : resilience.grade === "C"
                ? "bg-amber-100 text-amber-800 border-amber-200"
                : "bg-red-100 text-red-800 border-red-200"
          }`}>
            {isEs ? "Grado" : "Grade"} {resilience.grade}
          </Badge>
        </div>
      </div>

      {/* Explainer panel (toggleable) */}
      {showExplainer && (
        <div className="mb-4 rounded-lg bg-stone-50 border border-stone-200 p-4 text-sm space-y-3">
          <h3 className="font-semibold text-stone-800">{isEs ? "¿Cómo se calcula?" : "How is this calculated?"}</h3>
          <p className="text-stone-600">
            {isEs
              ? "La puntuación de resiliencia evalúa la capacidad de un FQHC para resistir los recortes de H.R. 1 y las crisis del sector, basándose en 5 dimensiones ponderadas:"
              : "The resilience score evaluates an FQHC's ability to withstand H.R. 1 cuts and sector crises, based on 5 weighted dimensions:"}
          </p>
          <div className="space-y-1.5">
            {DIMENSION_WEIGHTS.map((dw) => (
              <div key={dw.key} className="flex items-center gap-2">
                <span className="w-6 text-right text-xs font-bold text-teal-700">{dw.weight}%</span>
                <span className="text-xs text-stone-700">{isEs ? dw.es : dw.en}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-200">
            {GRADE_SCALE.map((gs) => (
              <span key={gs.grade} className="flex items-center gap-1 text-[10px] text-stone-600">
                <span className={`inline-block size-2 rounded-full ${gs.color}`} />
                {gs.grade} ≥{gs.min}: {gs.label}
              </span>
            ))}
          </div>

          {/* Auto-generated insights */}
          {(strengths.length > 0 || weaknesses.length > 0) && (
            <div className="pt-2 border-t border-stone-200">
              <p className="font-semibold text-stone-700">{isEs ? `Para ${fqhcName}:` : `For ${fqhcName}:`}</p>
              {strengths.length > 0 && (
                <p className="text-stone-600 mt-1">
                  ✅ {isEs ? "Fortalezas:" : "Strengths:"} {strengths.join(", ")}
                </p>
              )}
              {weaknesses.length > 0 && (
                <p className="text-stone-600 mt-1">
                  ⚠️ {isEs ? "Áreas de mejora:" : "Areas to improve:"} {weaknesses.join(", ")}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      <div className="space-y-3">
        {resilience.dimensions.map((dim) => (
          <div key={dim.dimension}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-stone-600">
                {isEs ? dim.label.es : dim.label.en}
              </span>
              <span className="text-xs font-bold text-stone-800">{dim.score}</span>
            </div>
            <div className="h-2 rounded-full bg-stone-100 overflow-hidden">
              <div className="h-full rounded-full bg-teal-600" style={{ width: `${dim.score}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-stone-500">
          {isEs ? "Completitud de datos:" : "Data completeness:"} {resilience.dataCompleteness}%
        </span>
        <div className="flex gap-3">
          <Link
            href={`/report/${slug}` as "/report"}
            className="text-xs font-medium text-amber-700 hover:text-amber-900"
          >
            {isEs ? "Reporte Estratégico" : "Strategic Report"} →
          </Link>
          <Link
            href="/strategy/resilience"
            className="text-xs font-medium text-teal-700 hover:text-teal-900"
          >
            {isEs ? "Todas las puntuaciones" : "All scores"} →
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Tab Components                                                     */
/* ================================================================== */

function OverviewTab({
  fqhcName,
  slug,
  details,
  resilience,
  locale,
  atAGlance,
  peerComparison,
  qualityData,
  regionSlug,
  regionalStats,
}: {
  fqhcName: string;
  slug: string;
  details: QuickDetails;
  resilience: ResilienceData;
  profileCompleteness: number;
  locale: string;
  atAGlance?: AtAGlance;
  peerComparison?: PeerComparison[];
  qualityData?: QualityData;
  regionSlug?: string;
  regionalStats?: { totalFQHCs: number; avgResilience: number; totalJobs: number };
}) {
  const isEs = locale === "es";

  return (
    <>
      {/* At a Glance — executive summary */}
      {atAGlance && atAGlance.bullets.length > 0 && (
        <div className="rounded-xl border border-teal-200 bg-gradient-to-br from-teal-50 to-amber-50/30 p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-stone-900">
            <BarChart3 className="size-5 text-teal-700" />
            {isEs ? "De un Vistazo" : "At a Glance"}
          </h2>
          <ul className="mt-3 space-y-2">
            {atAGlance.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-stone-700 leading-relaxed">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-teal-600" />
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Mission Statement */}
      {details.missionStatement && (
        <div className="rounded-xl border border-teal-200 bg-gradient-to-br from-teal-50 to-white p-6">
          <h2 className="text-lg font-bold text-stone-900">{isEs ? "Misión" : "Mission"}</h2>
          <div className="mt-3 border-l-4 border-teal-600 pl-4">
            <p className="text-base text-stone-700 italic leading-relaxed">
              &ldquo;{details.missionStatement}&rdquo;
            </p>
          </div>
        </div>
      )}

      {/* About */}
      <div className="rounded-xl border border-stone-200 bg-white p-6">
        <h2 className="text-lg font-bold text-stone-900">
          {isEs ? "Acerca de" : "About"} {fqhcName}
        </h2>
        <p className="mt-3 leading-relaxed text-stone-600">{details.description}</p>
      </div>

      {/* Resilience Score */}
      <ResilienceSection fqhcName={fqhcName} resilience={resilience} slug={slug} isEs={isEs} />

      {/* Programs */}
      {details.programs.length > 0 && (
        <div className="rounded-xl border border-stone-200 bg-white p-6">
          <h2 className="text-lg font-bold text-stone-900">{isEs ? "Programas" : "Programs"}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {details.programs.map((program) => (
              <Link key={program} href={`/directory?program=${encodeURIComponent(program)}` as "/directory"}>
                <Badge variant="secondary" className="bg-teal-50 text-teal-800 hover:bg-teal-100 cursor-pointer transition-colors">
                  {program}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Benefits */}
      <div className="rounded-xl border border-stone-200 bg-white p-6">
        <h3 className="font-semibold text-stone-900">
          {isEs ? "Beneficios Típicos" : "Typical Benefits"}
        </h3>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {details.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2 text-sm text-stone-600">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-600" />
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      {/* Quality & Compliance */}
      {qualityData && (qualityData.qualityScore || qualityData.violations?.length || qualityData.laborHistory?.length || qualityData.greatPlaceToWork?.certified) && (
        <div className="rounded-xl border border-stone-200 bg-white p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-stone-900">
            <Shield className="size-5 text-teal-700" />
            {isEs ? "Calidad y Cumplimiento" : "Quality & Compliance"}
          </h2>

          {/* Great Place to Work */}
          {qualityData.greatPlaceToWork?.certified && (
            <div className="mt-4 rounded-lg bg-purple-50 border border-purple-200 p-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">🏆</span>
                <span className="font-semibold text-purple-900">Great Place to Work Certified</span>
                {qualityData.greatPlaceToWork.year && (
                  <Badge className="bg-purple-100 text-purple-700 text-xs">{qualityData.greatPlaceToWork.year}</Badge>
                )}
              </div>
              {qualityData.greatPlaceToWork.approvalPercent && (
                <p className="mt-1 text-sm text-purple-800">
                  {qualityData.greatPlaceToWork.approvalPercent}% {isEs ? "aprobación de empleados" : "employee approval"}
                </p>
              )}
              {qualityData.greatPlaceToWork.highlights && qualityData.greatPlaceToWork.highlights.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {qualityData.greatPlaceToWork.highlights.map((h) => (
                    <Badge key={h} className="bg-purple-100 text-purple-700 text-xs">{h}</Badge>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Quality Score bars */}
          {qualityData.qualityScore && (
            <div className="mt-4 space-y-3">
              <h3 className="text-sm font-semibold text-stone-700">{isEs ? "Puntajes de Calidad" : "Quality Scores"}</h3>
              {([
                { key: "clinicalQuality", en: "Clinical Quality", es: "Calidad Clínica" },
                { key: "patientSatisfaction", en: "Patient Satisfaction", es: "Satisfacción del Paciente" },
                { key: "access", en: "Access", es: "Acceso" },
                { key: "financialHealth", en: "Financial Health", es: "Salud Financiera" },
              ] as const).map(({ key, en, es }) => {
                const val = qualityData.qualityScore?.[key];
                if (val === undefined) return null;
                return (
                  <div key={key}>
                    <div className="flex justify-between text-xs">
                      <span className="text-stone-600">{isEs ? es : en}</span>
                      <span className="font-medium text-stone-800">{val}/100</span>
                    </div>
                    <div className="mt-1 h-2 rounded-full bg-stone-100 overflow-hidden">
                      <div className="h-full rounded-full bg-teal-600" style={{ width: `${val}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Violations timeline */}
          {qualityData.violations && qualityData.violations.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-stone-700">{isEs ? "Historial de Cumplimiento" : "Compliance History"}</h3>
              <div className="mt-2 space-y-2">
                {qualityData.violations.map((v, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg bg-stone-50 p-3 text-sm">
                    <span className="text-xs text-stone-500 whitespace-nowrap">{v.date}</span>
                    <div className="flex-1">
                      <span className="font-medium text-stone-800">{v.type}</span>
                      <p className="text-stone-600">{v.description}</p>
                    </div>
                    <Badge className={`text-xs shrink-0 ${
                      v.status === "resolved" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
                    }`}>{v.status}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Labor history */}
          {qualityData.laborHistory && qualityData.laborHistory.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-stone-700">{isEs ? "Historial Laboral" : "Labor History"}</h3>
              <div className="mt-2 space-y-2">
                {qualityData.laborHistory.map((l, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <span className="text-xs text-stone-500 whitespace-nowrap">{l.date}</span>
                    <div>
                      <span className="font-medium text-stone-800">{l.event}</span>
                      <span className="text-stone-500"> — {l.outcome}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Peer Comparison */}
      {peerComparison && peerComparison.length > 0 && (
        <div className="rounded-xl border border-stone-200 bg-white p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-stone-900">
            <Users className="size-5 text-teal-700" />
            {isEs ? "Comparación Regional" : "Peer Comparison"}
          </h2>
          <p className="mt-1 text-xs text-stone-500">
            {isEs ? "vs. mediana de la región" : "vs. regional median"}
          </p>
          <div className="mt-4 space-y-4">
            {peerComparison.map((pc) => {
              const maxVal = Math.max(pc.thisValue, pc.peerMedian) * 1.2 || 1;
              const thisWidth = (pc.thisValue / maxVal) * 100;
              const peerWidth = (pc.peerMedian / maxVal) * 100;
              return (
                <div key={pc.metric}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-stone-700">{isEs ? pc.label.es : pc.label.en}</span>
                    <span className="text-stone-500">
                      {pc.thisValue.toLocaleString()}{pc.unit} vs {pc.peerMedian.toLocaleString()}{pc.unit}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-teal-700 w-16 shrink-0">{fqhcName.split(" ")[0]}</span>
                      <div className="flex-1 h-3 bg-stone-100 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-600 rounded-full" style={{ width: `${thisWidth}%` }} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-stone-500 w-16 shrink-0">{isEs ? "Mediana" : "Median"}</span>
                      <div className="flex-1 h-3 bg-stone-100 rounded-full overflow-hidden">
                        <div className="h-full bg-stone-400 rounded-full" style={{ width: `${peerWidth}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Regional Intelligence Link */}
      {regionSlug && regionalStats && (
        <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-stone-900">
            <Globe className="size-5 text-teal-700" />
            {isEs ? "Inteligencia Regional" : "Regional Intelligence"}
          </h2>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <div className="text-center">
              <span className="text-xl font-bold text-teal-800">{regionalStats.totalFQHCs}</span>
              <p className="text-xs text-stone-500">{isEs ? "FQHCs en región" : "FQHCs in region"}</p>
            </div>
            <div className="text-center">
              <span className="text-xl font-bold text-teal-800">{regionalStats.avgResilience.toFixed(0)}</span>
              <p className="text-xs text-stone-500">{isEs ? "Resiliencia prom." : "Avg resilience"}</p>
            </div>
            <div className="text-center">
              <span className="text-xl font-bold text-teal-800">{regionalStats.totalJobs}</span>
              <p className="text-xs text-stone-500">{isEs ? "Empleos" : "Open jobs"}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={`/intelligence/${regionSlug}` as "/intelligence"}
              className="inline-flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-900"
            >
              {isEs ? "Panel Regional" : "Regional Dashboard"} <ArrowRight className="size-3" />
            </Link>
            <Link
              href={`/directory?region=${encodeURIComponent(regionSlug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "))}` as "/directory"}
              className="inline-flex items-center gap-1 text-sm font-medium text-stone-600 hover:text-stone-800"
            >
              {isEs ? "Todos los FQHCs" : "All FQHCs in region"} <ArrowRight className="size-3" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */

function NewsTab({
  intel,
  layoffs,
  aiAdoption,
  locale,
}: {
  intel: SerializedIntelItem[];
  layoffs: SerializedLayoff[];
  aiAdoption: SerializedAIItem[];
  locale: string;
}) {
  const isEs = locale === "es";

  // Merge into chronological feed
  type FeedItem =
    | { type: "intel"; date: string; data: SerializedIntelItem }
    | { type: "layoff"; date: string; data: SerializedLayoff }
    | { type: "ai"; date: string; data: SerializedAIItem };

  const feed: FeedItem[] = [
    ...intel.map((i) => ({ type: "intel" as const, date: i.date, data: i })),
    ...layoffs.map((l) => ({ type: "layoff" as const, date: l.dateAnnounced, data: l })),
    ...aiAdoption.map((a) => ({ type: "ai" as const, date: a.date, data: a })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (feed.length === 0) {
    return (
      <div className="rounded-xl border border-stone-200 bg-white p-8 text-center">
        <Newspaper className="mx-auto size-8 text-stone-300" />
        <p className="mt-3 text-stone-500">
          {isEs
            ? "No hay noticias relacionadas con esta organización aún."
            : "No news related to this organization yet."}
        </p>
        <p className="mt-1 text-xs text-stone-500">
          {isEs
            ? "Las noticias aparecerán aquí cuando se publiquen."
            : "News will appear here as it's published."}
        </p>
      </div>
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [newsFilter, setNewsFilter] = useState<"all" | "intel" | "layoff" | "ai">("all");
  const filteredFeed = newsFilter === "all" ? feed : feed.filter((f) => f.type === newsFilter);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-bold text-stone-900">
          {isEs ? "Actividad Reciente" : "Recent Activity"}
          <span className="ml-2 text-sm font-normal text-stone-500">({filteredFeed.length})</span>
        </h2>
        <div className="flex items-center gap-1">
          {([
            { key: "all" as const, label: isEs ? "Todo" : "All", count: feed.length },
            { key: "intel" as const, label: "Intel", count: intel.length },
            { key: "layoff" as const, label: isEs ? "Recortes" : "Layoffs", count: layoffs.length },
            { key: "ai" as const, label: "AI", count: aiAdoption.length },
          ]).filter((f) => f.key === "all" || f.count > 0).map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setNewsFilter(key)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                newsFilter === key
                  ? "bg-teal-700 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {label} ({count})
            </button>
          ))}
        </div>
      </div>
      {filteredFeed.map((item) => {
        if (item.type === "intel") {
          const d = item.data;
          return (
            <div
              key={`intel-${d.id}`}
              className={`rounded-lg border border-stone-200 border-l-4 ${IMPACT_BORDER[d.impactLevel]} p-4`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Newspaper className="size-3.5 text-stone-500" />
                <Badge className={`text-xs ${IMPACT_BADGE[d.impactLevel]}`}>
                  {d.impactLevel}
                </Badge>
                <span className="text-xs text-stone-500">
                  {new Date(d.date + "T00:00:00").toLocaleDateString(
                    isEs ? "es-US" : "en-US",
                    { month: "short", day: "numeric", year: "numeric" }
                  )}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-stone-800">
                {isEs ? d.headline.es : d.headline.en}
              </h3>
              <p className="mt-1 text-xs text-stone-500 line-clamp-2">
                {isEs ? d.summary.es : d.summary.en}
              </p>
              <a
                href={d.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-xs text-teal-700 hover:underline"
              >
                {d.sourceOrg} →
              </a>
            </div>
          );
        }
        if (item.type === "layoff") {
          const d = item.data;
          return (
            <div key={`layoff-${d.id}`} className="rounded-lg border border-red-200 border-l-4 border-l-red-500 bg-red-50/30 p-4">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="size-3.5 text-red-500" />
                <Badge className="text-xs bg-red-100 text-red-800">
                  {isEs ? "Despidos" : "Layoffs"}
                </Badge>
                <span className="text-xs text-stone-500">
                  {new Date(d.dateAnnounced + "T00:00:00").toLocaleDateString(
                    isEs ? "es-US" : "en-US",
                    { month: "short", day: "numeric", year: "numeric" }
                  )}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-stone-800">
                {d.employeesAffected} {isEs ? "empleados afectados" : "employees affected"}
              </h3>
              <p className="mt-1 text-xs text-stone-500">{d.reason}</p>
            </div>
          );
        }
        // AI item
        const d = item.data;
        return (
          <div key={`ai-${d.id}`} className="rounded-lg border border-purple-200 border-l-4 border-l-purple-500 bg-purple-50/30 p-4">
            <div className="flex items-center gap-2 mb-1">
              <Cpu className="size-3.5 text-purple-500" />
              <Badge className="text-xs bg-purple-100 text-purple-800">
                {isEs ? "IA" : "AI"} {d.vendor ? `· ${d.vendor}` : ""}
              </Badge>
              <span className="text-xs text-stone-500">
                {new Date(d.date + "T00:00:00").toLocaleDateString(
                  isEs ? "es-US" : "en-US",
                  { month: "short", day: "numeric", year: "numeric" }
                )}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-stone-800">
              {isEs ? d.title.es : d.title.en}
            </h3>
            <p className="mt-1 text-xs text-stone-500 line-clamp-2">
              {isEs ? d.description.es : d.description.en}
            </p>
            <a
              href={d.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-xs text-teal-700 hover:underline"
            >
              {d.sourceOrg} →
            </a>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function JobsTab({
  jobs,
  similarJobs,
  fqhcName,
  locale,
  salarySummary,
}: {
  jobs: SerializedJob[];
  similarJobs: SerializedSimilarJob[];
  fqhcName: string;
  locale: string;
  salarySummary?: SalarySummary[];
}) {
  const isEs = locale === "es";
  const [showAllSimilar, setShowAllSimilar] = useState(false);
  const visibleSimilar = showAllSimilar ? similarJobs : similarJobs.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Salary Ranges */}
      {salarySummary && salarySummary.length > 0 && (
        <div className="rounded-xl border border-stone-200 bg-white p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-stone-900">
            <BarChart3 className="size-5 text-teal-700" />
            {isEs ? `Rangos Salariales en ${fqhcName}` : `Salary Ranges at ${fqhcName}`}
          </h2>
          <p className="mt-1 text-xs text-stone-500">
            {isEs ? "Basado en posiciones actuales" : "Based on current open positions"}
          </p>
          <div className="mt-4 space-y-3">
            {salarySummary.slice(0, 8).map((s) => {
              const maxSalary = Math.max(...salarySummary.map((x) => x.max)) * 1.05 || 200000;
              const leftPct = (s.min / maxSalary) * 100;
              const widthPct = ((s.max - s.min) / maxSalary) * 100;
              return (
                <div key={s.role}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-stone-700 truncate max-w-[60%]">{s.role}</span>
                    <span className="text-stone-500 shrink-0">
                      {formatSalary(s.min)}–{formatSalary(s.max)}
                      <span className="text-[10px] text-stone-400 ml-1">({s.count})</span>
                    </span>
                  </div>
                  <div className="h-3 bg-stone-100 rounded-full overflow-hidden relative">
                    <div
                      className="absolute h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"
                      style={{ left: `${leftPct}%`, width: `${Math.max(widthPct, 2)}%` }}
                    />
                    {/* Avg marker */}
                    <div
                      className="absolute top-0 h-full w-0.5 bg-amber-500"
                      style={{ left: `${(s.avg / maxSalary) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex items-center gap-4 text-[10px] text-stone-400">
            <span className="flex items-center gap-1"><span className="inline-block h-2 w-6 rounded-full bg-gradient-to-r from-teal-500 to-teal-600" /> {isEs ? "Rango" : "Range"}</span>
            <span className="flex items-center gap-1"><span className="inline-block h-2 w-0.5 bg-amber-500" /> {isEs ? "Promedio" : "Average"}</span>
          </div>
          <Link
            href="/salary-data"
            className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-teal-700 hover:text-teal-900"
          >
            {isEs ? "Ver todos los datos salariales" : "View full salary intelligence"} <ArrowRight className="size-3" />
          </Link>
        </div>
      )}

      {/* Current FQHC Open Positions */}
      {jobs.length === 0 ? (
        <div className="rounded-xl border border-stone-200 bg-white p-8 text-center">
          <Briefcase className="mx-auto size-8 text-stone-300" />
          <p className="mt-3 text-stone-500">
            {isEs
              ? `No hay posiciones abiertas en ${fqhcName} en este momento.`
              : `No open positions at ${fqhcName} right now.`}
          </p>
          <Link
            href="/jobs"
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-800"
          >
            {isEs ? "Ver todos los empleos" : "Browse all jobs"} <ArrowRight className="size-3" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-stone-900">
            {isEs ? "Posiciones Abiertas" : "Open Positions"}
            <span className="ml-2 text-sm font-normal text-stone-500">({jobs.length})</span>
          </h2>
          {jobs.map((job) => (
            <div
              key={job.id}
              className="rounded-lg border border-stone-200 bg-white p-4 transition-colors hover:border-teal-200 hover:bg-teal-50/30"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-semibold text-stone-900">{job.title}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-stone-500">
                    <span>{job.department}</span>
                    <span>·</span>
                    <span>{job.type}</span>
                    <span>·</span>
                    <span>{job.location}</span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-teal-700">
                  {formatSalary(job.salaryMin)} – {formatSalary(job.salaryMax)}
                </span>
              </div>
              <p className="mt-2 text-sm text-stone-600">{job.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {job.bilingual && (
                  <Badge variant="secondary" className="bg-amber-50 text-amber-700 text-xs">
                    Bilingual
                  </Badge>
                )}
                {job.programs.map((p) => (
                  <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Similar Jobs at Other FQHCs */}
      {similarJobs.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-t border-stone-200 pt-6">
            <Users className="size-5 text-teal-600" />
            <h2 className="text-lg font-bold text-stone-900">
              {isEs ? "Empleos Similares en Otros FQHCs" : "Similar Jobs at Other FQHCs"}
              <span className="ml-2 text-sm font-normal text-stone-500">({similarJobs.length})</span>
            </h2>
          </div>
          <p className="text-sm text-stone-500">
            {isEs
              ? `Posiciones similares a las que ofrece ${fqhcName} en otras organizaciones de California.`
              : `Positions similar to what ${fqhcName} offers at other California community health centers.`}
          </p>
          {visibleSimilar.map((sj) => (
            <Link
              key={sj.id}
              href={`/directory/${sj.fqhcSlug}#jobs`}
              className="block rounded-lg border border-stone-200 bg-white p-4 transition-colors hover:border-teal-200 hover:bg-teal-50/30"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-semibold text-stone-900">{sj.title}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-stone-500">
                    <span className="font-medium text-teal-700">{sj.fqhcName}</span>
                    <span>·</span>
                    <span>{sj.department}</span>
                    <span>·</span>
                    <span>{sj.location}</span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-teal-700">
                  {formatSalary(sj.salaryMin)} – {formatSalary(sj.salaryMax)}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <Badge variant="secondary" className="bg-teal-50 text-teal-700 text-xs">
                  {sj.matchReason}
                </Badge>
                {sj.bilingual && (
                  <Badge variant="secondary" className="bg-amber-50 text-amber-700 text-xs">
                    Bilingual
                  </Badge>
                )}
                {sj.programs.slice(0, 3).map((p) => (
                  <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>
                ))}
              </div>
            </Link>
          ))}
          {similarJobs.length > 4 && !showAllSimilar && (
            <button
              onClick={() => setShowAllSimilar(true)}
              className="w-full rounded-lg border border-stone-200 bg-white py-3 text-sm font-medium text-teal-700 transition-colors hover:bg-teal-50"
            >
              {isEs
                ? `Ver ${similarJobs.length - 4} empleos similares más`
                : `Show ${similarJobs.length - 4} more similar jobs`}
            </button>
          )}
          <div className="text-center">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-800"
            >
              {isEs ? "Explorar todos los empleos" : "Explore all jobs"} <ArrowRight className="size-3" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function StrategyTab({
  caseStudies,
  movementEvents,
  locale,
  slug,
}: {
  caseStudies: SerializedCaseStudy[];
  movementEvents: SerializedMovementEvent[];
  locale: string;
  slug: string;
}) {
  const isEs = locale === "es";

  return (
    <div className="space-y-8">
      {/* Strategic Report + Compare CTAs */}
      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href={`/report/${slug}` as "/report"}
          className="flex items-center gap-3 rounded-xl border border-teal-200 bg-teal-50 p-4 transition-colors hover:bg-teal-100"
        >
          <Shield className="size-8 text-teal-700 shrink-0" />
          <div>
            <p className="text-sm font-bold text-teal-900">{isEs ? "Reporte Estratégico Completo" : "Full Strategic Report"}</p>
            <p className="text-xs text-teal-700">{isEs ? "10 secciones de análisis profundo" : "10-section deep analysis"}</p>
          </div>
        </Link>
        <Link
          href="/compare"
          className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white p-4 transition-colors hover:bg-stone-50"
        >
          <Users className="size-8 text-stone-500 shrink-0" />
          <div>
            <p className="text-sm font-bold text-stone-900">{isEs ? "Comparar con Pares" : "Compare with Peers"}</p>
            <p className="text-xs text-stone-500">{isEs ? "Análisis lado a lado de 2-3 FQHCs" : "Side-by-side analysis of 2-3 FQHCs"}</p>
          </div>
        </Link>
      </div>

      {caseStudies.length === 0 && movementEvents.length === 0 && (
        <div className="rounded-xl border border-stone-200 bg-white p-8 text-center">
          <BookOpen className="mx-auto size-8 text-stone-300" />
          <p className="mt-3 text-stone-500">
            {isEs
              ? "No hay contenido estratégico vinculado a esta organización aún."
              : "No strategy content linked to this organization yet."}
          </p>
          <Link
            href="/strategy/guides"
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-800"
          >
            {isEs ? "Ver todas las guías" : "Browse all guides"} <ArrowRight className="size-3" />
          </Link>
        </div>
      )}
      {/* Case Studies */}
      {caseStudies.length > 0 && (
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-stone-900">
            <Heart className="size-5" />
            {isEs ? "Estudios de Caso" : "Case Studies"}
          </h2>
          <div className="mt-4 space-y-3">
            {caseStudies.map((cs) => (
              <div key={cs.id} className="rounded-lg border border-stone-200 bg-white p-4">
                <h3 className="text-sm font-bold text-stone-900">{cs.fqhcName}</h3>
                <p className="mt-1 text-xs text-stone-500">
                  {isEs ? cs.headline.es : cs.headline.en}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {cs.outcomes.slice(0, 3).map((o) => (
                    <span key={o.metric} className="text-xs bg-green-50 text-green-800 px-2 py-0.5 rounded-full">
                      {o.value}
                    </span>
                  ))}
                </div>
                <Link
                  href="/strategy/guides"
                  className="mt-2 inline-block text-xs font-medium text-teal-700 hover:underline"
                >
                  {isEs ? "Ver guía completa" : "View full guide"} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Movement History */}
      {movementEvents.length > 0 && (
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-stone-900">
            <History className="size-5" />
            {isEs ? "Historia del Movimiento" : "Movement History"}
          </h2>
          <div className="mt-4 space-y-3">
            {movementEvents.map((event) => (
              <div key={event.id} className="flex gap-3 rounded-lg border border-stone-200 bg-white p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-800">
                  {event.year}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-stone-800">
                    {isEs ? event.title.es : event.title.en}
                  </h3>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {event.organizations.map((org) => (
                      <span key={org} className="text-xs text-stone-500">{org}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/strategy/movement"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-800"
          >
            {isEs ? "Ver historia completa" : "View full movement history"} <ArrowRight className="size-3" />
          </Link>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function CareerTab({
  certifications,
  resources,
  fqhcName,
  locale,
}: {
  certifications: SerializedCertification[];
  resources: SerializedResource[];
  fqhcName: string;
  locale: string;
}) {
  const isEs = locale === "es";

  return (
    <div className="space-y-8">
      {/* Resume CTA */}
      <div className="rounded-xl border border-teal-200 bg-teal-50 p-6">
        <h2 className="flex items-center gap-2 text-lg font-bold text-stone-900">
          <Users className="size-5" />
          {isEs ? `Trabaja en ${fqhcName}` : `Work at ${fqhcName}`}
        </h2>
        <p className="mt-2 text-sm text-stone-600">
          {isEs
            ? "Crea un currículum personalizado para esta organización."
            : "Build a tailored resume for this organization."}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button className="bg-teal-700 text-white hover:bg-teal-800" asChild>
            <Link href="/resume-builder">
              {isEs ? "Construir Currículum" : "Build Resume"} <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/career-insights">
              {isEs ? "Evaluación de Carrera" : "Career Assessment"} <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Relevant Certifications */}
      {certifications.length > 0 && (
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-stone-900">
            <GraduationCap className="size-5" />
            {isEs ? "Certificaciones Relevantes" : "Relevant Certifications"}
          </h2>
          <p className="mt-1 text-sm text-stone-500">
            {isEs
              ? `Basado en los programas de ${fqhcName}`
              : `Based on ${fqhcName}'s programs`}
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {certifications.slice(0, 6).map((cert) => (
              <div key={cert.id} className="rounded-lg border border-stone-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-stone-800">
                    {isEs ? cert.esName : cert.name}
                  </span>
                  <Badge variant="secondary" className="text-xs">{cert.abbreviation}</Badge>
                </div>
                <div className="mt-2 flex items-center gap-3 text-xs text-stone-500">
                  <span>{cert.costRange}</span>
                  <span className={`font-medium ${
                    cert.impactType === "required" ? "text-red-600" : "text-green-700"
                  }`}>
                    {cert.salaryImpact}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/certifications"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-800"
          >
            {isEs ? "Ver todas las certificaciones" : "View all certifications"} <ArrowRight className="size-3" />
          </Link>
        </div>
      )}

      {/* Relevant Resources */}
      {resources.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-stone-900">
            {isEs ? "Recursos de Carrera" : "Career Resources"}
          </h2>
          <div className="mt-4 space-y-3">
            {resources.slice(0, 5).map((r) => (
              <a
                key={r.id}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border border-stone-200 bg-white p-4 transition-colors hover:border-teal-200 hover:bg-teal-50/30"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-stone-800">
                    {isEs ? r.name.es : r.name.en}
                  </span>
                  <Badge variant="secondary" className={`text-xs ${
                    r.cost === "free" ? "bg-green-100 text-green-800" : "bg-stone-100"
                  }`}>
                    {r.cost === "free" ? (isEs ? "Gratis" : "Free") : r.cost}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-stone-500 line-clamp-2">
                  {isEs ? r.description.es : r.description.en}
                </p>
              </a>
            ))}
          </div>
          <Link
            href="/resources"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-800"
          >
            {isEs ? "Ver todos los recursos" : "View all resources"} <ArrowRight className="size-3" />
          </Link>
        </div>
      )}
    </div>
  );
}
