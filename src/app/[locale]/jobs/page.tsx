"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import {
  Search,
  Briefcase,
  Building2,
  DollarSign,
  ArrowRight,
  Loader2,
  MapPin,
  Monitor,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  LayoutList,
  ArrowUpDown,
  Shield,
  TrendingUp,
  X,
  Scale,
  GitCompareArrows,
  Lightbulb,
  Users,
  Globe,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { fqhcJobListings, type FQHCJobListing } from "@/lib/fqhc-job-listings";
import { californiaFQHCs, regions, fqhcSalaryRanges } from "@/lib/california-fqhcs";
import { SALARY_BENCHMARKS } from "@/lib/job-posting-templates";
import {
  getJobNegotiationContext,
  getBenchmarkP50,
  formatSalaryCompact,
  getBenchmarkLabel,
  type NegotiationContext,
} from "@/lib/job-negotiation";
import { JobPostingJsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface JobOpening {
  id: string;
  title: string;
  role_type: string | null;
  salary_min: number | null;
  salary_max: number | null;
  urgency: string | null;
  status: string;
  created_at: string;
  employers: { organization_name: string } | null;
}

type ViewMode = "list" | "grid";
type SortField = "relevance" | "salary-desc" | "salary-asc" | "posted" | "org";

/* ------------------------------------------------------------------ */
/*  Static data maps                                                   */
/* ------------------------------------------------------------------ */

const fqhcMap = new Map(californiaFQHCs.map((f) => [f.slug, f]));

// Build enriched listings with FQHC context
const enrichedListings = fqhcJobListings.map((job) => {
  const fqhc = fqhcMap.get(job.fqhcSlug);
  return {
    ...job,
    orgName: fqhc?.name ?? "",
    region: fqhc?.region ?? "",
    careersUrl: fqhc?.careersUrl ?? null,
    glassdoorRating: fqhc?.glassdoorRating ?? null,
    negotiation: getJobNegotiationContext(
      job.salaryMin,
      job.salaryMax,
      job.roleType,
      fqhc
    ),
  };
});

type EnrichedJob = (typeof enrichedListings)[number];

// Unique orgs that have jobs
const orgsWithJobs = [
  ...new Set(enrichedListings.map((j) => j.orgName).filter(Boolean)),
].sort();

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const ROLE_TYPE_GROUPS = [
  {
    label: "Care Coordination",
    esLabel: "Coordinación de Atención",
    options: [
      "Community Health Worker", "Care Coordinator", "Case Manager",
      "Patient Navigator", "Health Educator", "Referral Coordinator",
    ],
  },
  {
    label: "Clinical",
    esLabel: "Clínico",
    options: [
      "Registered Nurse", "Licensed Vocational Nurse", "Nurse Practitioner",
      "Physician", "Physician Assistant", "Medical Assistant", "Phlebotomist",
    ],
  },
  {
    label: "Behavioral Health",
    esLabel: "Salud Conductual",
    options: [
      "Behavioral Health Specialist", "Licensed Clinical Social Worker",
      "Licensed Marriage & Family Therapist", "Psychologist",
    ],
  },
  {
    label: "Dental",
    esLabel: "Dental",
    options: ["Dentist", "Dental Hygienist", "Dental Assistant"],
  },
  {
    label: "Pharmacy",
    esLabel: "Farmacia",
    options: ["Pharmacist", "Pharmacy Technician"],
  },
  {
    label: "Administrative",
    esLabel: "Administrativo",
    options: [
      "Patient Services Representative", "Call Center Specialist",
      "Health Enrollment Navigator", "Revenue Cycle Specialist",
      "Billing Specialist", "Medical Coder", "EHR Analyst",
    ],
  },
  {
    label: "Leadership",
    esLabel: "Liderazgo",
    options: ["Program Manager", "Medical Director", "Director"],
  },
];

const SALARY_RANGES = [
  { value: "all", label: "All Salaries", esLabel: "Todos los salarios" },
  { value: "under-50", label: "Under $50K", esLabel: "Menos de $50K" },
  { value: "50-75", label: "$50K – $75K", esLabel: "$50K – $75K" },
  { value: "75-100", label: "$75K – $100K", esLabel: "$75K – $100K" },
  { value: "100-150", label: "$100K – $150K", esLabel: "$100K – $150K" },
  { value: "150-plus", label: "$150K+", esLabel: "$150K+" },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

function formatSalary(min: number | null, max: number | null) {
  if (!min && !max) return null;
  const fmt = (n: number) => "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  return `Up to ${fmt(max!)}`;
}

function matchesSalaryRange(min: number, max: number, range: string): boolean {
  const mid = (min + max) / 2;
  switch (range) {
    case "under-50": return mid < 50000;
    case "50-75": return mid >= 50000 && mid < 75000;
    case "75-100": return mid >= 75000 && mid < 100000;
    case "100-150": return mid >= 100000 && mid < 150000;
    case "150-plus": return mid >= 150000;
    default: return true;
  }
}

/* ------------------------------------------------------------------ */
/*  SalaryBar — visual benchmark comparison                            */
/* ------------------------------------------------------------------ */

function SalaryBar({ min, max, roleType, locale }: {
  min: number; max: number; roleType: string; locale: string;
}) {
  const p50 = getBenchmarkP50(roleType);
  if (!p50) return null;

  // Scale: show range from 20% below min to 20% above max
  const scaleMin = Math.min(min, p50) * 0.85;
  const scaleMax = Math.max(max, p50) * 1.15;
  const range = scaleMax - scaleMin;

  const barLeft = ((min - scaleMin) / range) * 100;
  const barWidth = ((max - min) / range) * 100;
  const p50Pos = ((p50 - scaleMin) / range) * 100;

  return (
    <div className="mt-1">
      <div className="relative h-2.5 w-full rounded-full bg-stone-100">
        {/* Posted range bar */}
        <div
          className="absolute top-0 h-full rounded-full bg-teal-200"
          style={{ left: `${barLeft}%`, width: `${barWidth}%` }}
        />
        {/* P50 marker */}
        <div
          className="absolute top-0 h-full w-0.5 bg-stone-600"
          style={{ left: `${p50Pos}%` }}
          title={`P50: ${formatSalaryCompact(p50)}`}
        />
      </div>
      <div className="mt-0.5 flex justify-between text-[10px] text-stone-400">
        <span>{formatSalaryCompact(min)}</span>
        <span className="font-medium text-stone-600">P50: {formatSalaryCompact(p50)}</span>
        <span>{formatSalaryCompact(max)}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  NegotiationTips — expandable tip box                               */
/* ------------------------------------------------------------------ */

function NegotiationTips({ ctx, locale }: { ctx: NegotiationContext; locale: string }) {
  const isEs = locale === "es";
  return (
    <div className={`rounded-lg border p-3 text-sm ${
      ctx.isUnion
        ? "border-purple-200 bg-purple-50"
        : "border-teal-200 bg-teal-50"
    }`}>
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className={`size-4 ${ctx.isUnion ? "text-purple-600" : "text-teal-600"}`} />
        <span className="font-semibold text-stone-900">
          {isEs ? "Estrategia de Negociación" : "Negotiation Strategy"}
        </span>
        {ctx.isUnion && ctx.unionName && (
          <Badge className="bg-purple-100 text-purple-700 text-xs">{ctx.unionName}</Badge>
        )}
      </div>
      <ul className="space-y-1">
        {ctx.tips.map((tip, i) => (
          <li key={i} className="flex items-start gap-1.5 text-xs text-stone-600">
            <span className="mt-0.5 text-stone-400">•</span>
            {t(tip, locale)}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ComparePanel — side-by-side job comparison                         */
/* ------------------------------------------------------------------ */

function ComparePanel({
  jobs,
  onRemove,
  onClose,
  locale,
}: {
  jobs: EnrichedJob[];
  onRemove: (id: string) => void;
  onClose: () => void;
  locale: string;
}) {
  const isEs = locale === "es";
  if (jobs.length < 2) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4">
      <div className="relative max-h-[85vh] w-full max-w-5xl overflow-auto rounded-2xl bg-white p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 hover:bg-stone-100"
        >
          <X className="size-5 text-stone-500" />
        </button>

        <h2 className="text-lg font-bold text-stone-900 mb-4">
          <GitCompareArrows className="inline size-5 mr-2 text-teal-700" />
          {isEs ? "Comparar Posiciones" : "Compare Positions"}
        </h2>

        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${jobs.length}, 1fr)` }}>
          {jobs.map((job) => {
            const fqhc = fqhcMap.get(job.fqhcSlug);
            return (
              <div key={job.id} className="rounded-xl border border-stone-200 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-stone-900 text-sm">{job.title}</h3>
                    <p className="text-xs text-stone-500">{job.orgName}</p>
                  </div>
                  <button
                    onClick={() => onRemove(job.id)}
                    className="rounded p-0.5 hover:bg-stone-100"
                  >
                    <X className="size-3.5 text-stone-400" />
                  </button>
                </div>

                {/* Salary */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-500">{isEs ? "Salario" : "Salary"}</span>
                    <span className="font-semibold text-teal-800">
                      {formatSalary(job.salaryMin, job.salaryMax)}
                    </span>
                  </div>
                  <SalaryBar min={job.salaryMin} max={job.salaryMax} roleType={job.roleType} locale={locale} />

                  {/* Market position */}
                  {(() => {
                    const bl = getBenchmarkLabel(job.negotiation.benchmarkPosition, locale);
                    return (
                      <div className="flex justify-between">
                        <span className="text-stone-500">{isEs ? "vs Mercado" : "vs Market"}</span>
                        <Badge className={`text-[10px] ${bl.color}`}>{bl.label}</Badge>
                      </div>
                    );
                  })()}

                  {/* Union */}
                  <div className="flex justify-between">
                    <span className="text-stone-500">Union</span>
                    {job.negotiation.isUnion ? (
                      <Badge className="bg-purple-100 text-purple-700 text-[10px]">
                        {job.negotiation.unionName || "Union"}
                      </Badge>
                    ) : (
                      <span className="text-stone-600">{isEs ? "No sindicalizado" : "Non-Union"}</span>
                    )}
                  </div>

                  {/* Negotiability */}
                  <div className="flex justify-between">
                    <span className="text-stone-500">{isEs ? "Negociación" : "Negotiation"}</span>
                    <span className="text-stone-600">
                      {job.negotiation.salaryType === "fixed-scale"
                        ? (isEs ? "Escala fija" : "Fixed Scale")
                        : (isEs ? "Negociable" : "Negotiable")}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex justify-between">
                    <span className="text-stone-500">{isEs ? "Ubicación" : "Location"}</span>
                    <span className="text-stone-600">{job.location}, CA</span>
                  </div>

                  {/* Glassdoor */}
                  {job.glassdoorRating && (
                    <div className="flex justify-between">
                      <span className="text-stone-500">Glassdoor</span>
                      <span className="text-stone-600">{job.glassdoorRating}/5</span>
                    </div>
                  )}

                  {/* Programs */}
                  <div>
                    <span className="text-stone-500 block mb-1">{isEs ? "Programas" : "Programs"}</span>
                    <div className="flex flex-wrap gap-1">
                      {job.programs.map((p) => (
                        <Badge key={p} className="bg-teal-50 text-teal-800 text-[10px]">{p}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* EHR */}
                  <div className="flex justify-between">
                    <span className="text-stone-500">EHR</span>
                    <span className="text-stone-600">{job.ehrSystem}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function JobsPage() {
  const locale = useLocale();
  const isEs = locale === "es";

  // Live jobs from Supabase
  const [liveJobs, setLiveJobs] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI state
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [compareIds, setCompareIds] = useState<Set<string>>(new Set());
  const [showCompare, setShowCompare] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [salaryFilter, setSalaryFilter] = useState("all");
  const [unionFilter, setUnionFilter] = useState("all");
  const [orgFilter, setOrgFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>("relevance");

  // Fetch live jobs
  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from("job_openings")
        .select("*, employers(organization_name)")
        .eq("status", "active")
        .order("created_at", { ascending: false });
      if (fetchError) {
        setError("Unable to load live positions right now.");
      } else {
        setLiveJobs((data as JobOpening[]) || []);
      }
      setLoading(false);
    }
    fetchJobs();
  }, []);

  // Filter + sort
  const filteredJobs = useMemo(() => {
    let list = enrichedListings;

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.orgName.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q) ||
          j.department.toLowerCase().includes(q) ||
          j.programs.some((p) => p.toLowerCase().includes(q))
      );
    }

    // Role
    if (roleFilter !== "all") {
      list = list.filter(
        (j) => j.roleType === roleFilter || j.title.toLowerCase().includes(roleFilter.toLowerCase())
      );
    }

    // Region
    if (regionFilter !== "all") {
      list = list.filter((j) => j.region === regionFilter);
    }

    // Salary range
    if (salaryFilter !== "all") {
      list = list.filter((j) => matchesSalaryRange(j.salaryMin, j.salaryMax, salaryFilter));
    }

    // Union
    if (unionFilter !== "all") {
      list = list.filter((j) =>
        unionFilter === "union" ? j.negotiation.isUnion : !j.negotiation.isUnion
      );
    }

    // Organization
    if (orgFilter !== "all") {
      list = list.filter((j) => j.orgName === orgFilter);
    }

    // Language
    if (languageFilter !== "all") {
      if (languageFilter === "bilingual") {
        list = list.filter((j) => j.bilingual);
      } else {
        list = list.filter(
          (j) =>
            j.languageRequired === languageFilter ||
            (j.languagePreferred && j.languagePreferred.includes(languageFilter))
        );
      }
    }

    // Sort
    const sorted = [...list];
    switch (sortField) {
      case "salary-desc":
        sorted.sort((a, b) => b.salaryMax - a.salaryMax);
        break;
      case "salary-asc":
        sorted.sort((a, b) => a.salaryMin - b.salaryMin);
        break;
      case "posted":
        sorted.sort((a, b) => b.postedDate.localeCompare(a.postedDate));
        break;
      case "org":
        sorted.sort((a, b) => a.orgName.localeCompare(b.orgName));
        break;
    }

    return sorted;
  }, [search, roleFilter, regionFilter, salaryFilter, unionFilter, orgFilter, languageFilter, sortField]);

  // Active filter count
  const activeFilterCount = [
    roleFilter !== "all",
    regionFilter !== "all",
    salaryFilter !== "all",
    unionFilter !== "all",
    orgFilter !== "all",
    languageFilter !== "all",
  ].filter(Boolean).length;

  const clearFilters = useCallback(() => {
    setSearch("");
    setRoleFilter("all");
    setRegionFilter("all");
    setSalaryFilter("all");
    setUnionFilter("all");
    setOrgFilter("all");
    setLanguageFilter("all");
  }, []);

  const toggleCompare = useCallback((id: string) => {
    setCompareIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < 3) {
        next.add(id);
      }
      return next;
    });
  }, []);

  const compareJobs = enrichedListings.filter((j) => compareIds.has(j.id));

  /* ================================================================ */
  /*  Render                                                           */
  /* ================================================================ */
  return (
    <div className="bg-stone-50 min-h-screen">
      {/* ---------- Hero ---------- */}
      <section className="bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 py-12 text-center text-white sm:py-16">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          {isEs ? "Empleos FQHC en California" : "FQHC Jobs in California"}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-teal-100/80 sm:text-base">
          {isEs
            ? "Salarios reales, estado sindical y estrategias de negociación para cada puesto."
            : "Real salary ranges, union status, and negotiation strategies for every position."}
        </p>
        <div className="mx-auto mt-4 flex flex-wrap items-center justify-center gap-3">
          <Badge className="border-teal-400/30 bg-teal-500/20 text-teal-100">
            {filteredJobs.length} {isEs ? "posiciones" : "positions"}
          </Badge>
          <Badge className="border-teal-400/30 bg-teal-500/20 text-teal-100">
            {orgsWithJobs.length} {isEs ? "organizaciones" : "organizations"}
          </Badge>
          <Badge className="border-teal-400/30 bg-teal-500/20 text-teal-100">
            {SALARY_BENCHMARKS.length} {isEs ? "benchmarks salariales" : "salary benchmarks"}
          </Badge>
        </div>
      </section>

      {/* ---------- Filter Bar ---------- */}
      <div className="sticky top-16 z-30 border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          {/* Row 1: Search + View Toggle + Sort */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
              <Input
                placeholder={isEs ? "Buscar por título, organización o programa..." : "Search by title, org, or program..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 pl-10 text-sm"
              />
            </div>

            {/* Sort */}
            <Select value={sortField} onValueChange={(v) => setSortField(v as SortField)}>
              <SelectTrigger className="h-10 w-40 text-xs hidden sm:flex">
                <ArrowUpDown className="size-3.5 mr-1 text-stone-400" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">{isEs ? "Relevancia" : "Relevance"}</SelectItem>
                <SelectItem value="salary-desc">{isEs ? "Salario ↓" : "Salary ↓"}</SelectItem>
                <SelectItem value="salary-asc">{isEs ? "Salario ↑" : "Salary ↑"}</SelectItem>
                <SelectItem value="posted">{isEs ? "Recientes" : "Most Recent"}</SelectItem>
                <SelectItem value="org">{isEs ? "Organización" : "Organization"}</SelectItem>
              </SelectContent>
            </Select>

            {/* View toggle */}
            <div className="hidden sm:flex items-center rounded-lg border border-stone-200 p-0.5">
              <button
                onClick={() => setViewMode("list")}
                className={`rounded-md p-1.5 transition-colors ${
                  viewMode === "list" ? "bg-teal-700 text-white" : "text-stone-400 hover:text-stone-700"
                }`}
              >
                <LayoutList className="size-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded-md p-1.5 transition-colors ${
                  viewMode === "grid" ? "bg-teal-700 text-white" : "text-stone-400 hover:text-stone-700"
                }`}
              >
                <LayoutGrid className="size-4" />
              </button>
            </div>
          </div>

          {/* Row 2: Filters */}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {/* Role */}
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="h-8 w-auto min-w-[120px] text-xs">
                <Briefcase className="size-3 mr-1 text-stone-400" />
                <SelectValue placeholder={isEs ? "Rol" : "Role"} />
              </SelectTrigger>
              <SelectContent className="max-h-80">
                <SelectItem value="all">{isEs ? "Todos los roles" : "All Roles"}</SelectItem>
                {ROLE_TYPE_GROUPS.map((group) => (
                  <SelectGroup key={group.label}>
                    <SelectLabel className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">
                      {isEs ? group.esLabel : group.label}
                    </SelectLabel>
                    {group.options.map((role) => (
                      <SelectItem key={role} value={role} className="text-xs">{role}</SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>

            {/* Region */}
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="h-8 w-auto min-w-[110px] text-xs">
                <MapPin className="size-3 mr-1 text-stone-400" />
                <SelectValue placeholder={isEs ? "Región" : "Region"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{isEs ? "Todas las regiones" : "All Regions"}</SelectItem>
                {regions.map((r) => (
                  <SelectItem key={r} value={r} className="text-xs">{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Salary */}
            <Select value={salaryFilter} onValueChange={setSalaryFilter}>
              <SelectTrigger className="h-8 w-auto min-w-[110px] text-xs">
                <DollarSign className="size-3 mr-1 text-stone-400" />
                <SelectValue placeholder={isEs ? "Salario" : "Salary"} />
              </SelectTrigger>
              <SelectContent>
                {SALARY_RANGES.map((r) => (
                  <SelectItem key={r.value} value={r.value} className="text-xs">
                    {isEs ? r.esLabel : r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Union */}
            <Select value={unionFilter} onValueChange={setUnionFilter}>
              <SelectTrigger className="h-8 w-auto min-w-[100px] text-xs">
                <Shield className="size-3 mr-1 text-stone-400" />
                <SelectValue placeholder="Union" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{isEs ? "Todos" : "All"}</SelectItem>
                <SelectItem value="union" className="text-xs">{isEs ? "Sindicalizado" : "Union"}</SelectItem>
                <SelectItem value="non-union" className="text-xs">{isEs ? "No sindicalizado" : "Non-Union"}</SelectItem>
              </SelectContent>
            </Select>

            {/* Organization */}
            <Select value={orgFilter} onValueChange={setOrgFilter}>
              <SelectTrigger className="h-8 w-auto min-w-[130px] text-xs">
                <Building2 className="size-3 mr-1 text-stone-400" />
                <SelectValue placeholder={isEs ? "Organización" : "Organization"} />
              </SelectTrigger>
              <SelectContent className="max-h-80">
                <SelectItem value="all">{isEs ? "Todas" : "All Organizations"}</SelectItem>
                {orgsWithJobs.map((org) => (
                  <SelectItem key={org} value={org} className="text-xs">{org}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Language */}
            <Select value={languageFilter} onValueChange={setLanguageFilter}>
              <SelectTrigger className="h-8 w-auto min-w-[100px] text-xs">
                <Globe className="size-3 mr-1 text-stone-400" />
                <SelectValue placeholder={isEs ? "Idioma" : "Language"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{isEs ? "Todos" : "All Languages"}</SelectItem>
                <SelectItem value="bilingual" className="text-xs">{isEs ? "Bilingüe" : "Bilingual (Any)"}</SelectItem>
                {["Spanish", "Tagalog", "Cantonese", "Mandarin", "Vietnamese", "Korean"].map((l) => (
                  <SelectItem key={l} value={l} className="text-xs">{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Clear filters */}
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-1 text-xs text-stone-600 hover:bg-stone-200"
              >
                <X className="size-3" />
                {isEs ? "Limpiar" : "Clear"} ({activeFilterCount})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ---------- Compare bar ---------- */}
      {compareIds.size > 0 && (
        <div className="sticky top-[132px] z-20 border-b border-teal-200 bg-teal-50 px-4 py-2">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <span className="text-sm text-teal-800">
              <GitCompareArrows className="inline size-4 mr-1" />
              {compareIds.size} {isEs ? "seleccionadas" : "selected"}
              {compareIds.size < 2 && (
                <span className="text-teal-600 ml-1">
                  ({isEs ? "selecciona al menos 2" : "select at least 2"})
                </span>
              )}
            </span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCompareIds(new Set())}
                className="h-7 text-xs"
              >
                {isEs ? "Limpiar" : "Clear"}
              </Button>
              <Button
                size="sm"
                onClick={() => setShowCompare(true)}
                disabled={compareIds.size < 2}
                className="h-7 text-xs bg-teal-700 text-white hover:bg-teal-800"
              >
                {isEs ? "Comparar" : "Compare"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Results ---------- */}
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-4 sm:px-6 lg:px-8">
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="size-8 animate-spin text-teal-700" />
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm text-amber-700">
            {error}
          </div>
        )}

        {!loading && filteredJobs.length === 0 && (
          <div className="mx-auto max-w-md py-20 text-center">
            <Briefcase className="mx-auto mb-4 size-12 text-stone-300" />
            <h2 className="text-lg font-semibold text-stone-700">
              {isEs ? "No se encontraron posiciones" : "No positions found"}
            </h2>
            <p className="mt-2 text-sm text-stone-500">
              {isEs ? "Ajusta tu búsqueda o filtros." : "Try adjusting your search or filters."}
            </p>
          </div>
        )}

        {/* ===== LIST VIEW ===== */}
        {!loading && filteredJobs.length > 0 && viewMode === "list" && (
          <div className="rounded-xl border border-stone-200 bg-white overflow-hidden">
            {/* Table header */}
            <div className="hidden sm:grid grid-cols-[1fr_180px_130px_100px_80px_90px] gap-2 border-b border-stone-200 bg-stone-50 px-4 py-2.5 text-xs font-semibold text-stone-500 uppercase tracking-wider">
              <span>{isEs ? "Posición" : "Position"}</span>
              <span>{isEs ? "Salario" : "Salary Range"}</span>
              <span>{isEs ? "vs Mercado" : "vs Market"}</span>
              <span>Union</span>
              <span>{isEs ? "Tipo" : "Type"}</span>
              <span></span>
            </div>

            {/* Rows */}
            {filteredJobs.map((job) => {
              const isExpanded = expandedId === job.id;
              const isSelected = compareIds.has(job.id);
              const bl = getBenchmarkLabel(job.negotiation.benchmarkPosition, locale);

              return (
                <div key={job.id} className={`border-b border-stone-100 last:border-b-0 ${isSelected ? "bg-teal-50/50" : ""}`}>
                  {/* Main row */}
                  <div
                    className="grid grid-cols-1 sm:grid-cols-[1fr_180px_130px_100px_80px_90px] gap-2 px-4 py-3 items-center cursor-pointer hover:bg-stone-50 transition-colors"
                    onClick={() => setExpandedId(isExpanded ? null : job.id)}
                  >
                    {/* Position */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleCompare(job.id);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-1 shrink-0 accent-teal-700"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-stone-900 truncate">{job.title}</p>
                        <div className="flex items-center gap-2 text-xs text-stone-500">
                          <span className="flex items-center gap-1">
                            <Building2 className="size-3" />
                            {job.orgName}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="size-3" />
                            {job.location}
                          </span>
                        </div>
                        {/* Mobile-only salary */}
                        <div className="sm:hidden mt-1 flex flex-wrap gap-1.5">
                          <span className="text-xs font-medium text-teal-800">
                            {formatSalary(job.salaryMin, job.salaryMax)}
                          </span>
                          {job.negotiation.isUnion && (
                            <Badge className="bg-purple-100 text-purple-700 text-[10px]">
                              {job.negotiation.unionName || "Union"}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Salary */}
                    <div className="hidden sm:block">
                      <p className="text-sm font-medium text-teal-800">
                        {formatSalary(job.salaryMin, job.salaryMax)}
                      </p>
                      <p className="text-[10px] text-stone-400">
                        {job.negotiation.salaryType === "fixed-scale"
                          ? (isEs ? "Escala fija" : "Fixed Scale")
                          : (isEs ? "Negociable" : "Negotiable")}
                      </p>
                    </div>

                    {/* Benchmark */}
                    <div className="hidden sm:block">
                      <Badge className={`text-[10px] ${bl.color}`}>{bl.label}</Badge>
                      {job.negotiation.benchmarkP50 && (
                        <p className="text-[10px] text-stone-400 mt-0.5">
                          P50: {formatSalaryCompact(job.negotiation.benchmarkP50)}
                        </p>
                      )}
                    </div>

                    {/* Union */}
                    <div className="hidden sm:block">
                      {job.negotiation.isUnion ? (
                        <Badge className="bg-purple-100 text-purple-700 text-[10px]">
                          {job.negotiation.unionName || "Union"}
                        </Badge>
                      ) : (
                        <span className="text-xs text-stone-400">{isEs ? "No" : "Non-Union"}</span>
                      )}
                    </div>

                    {/* Type */}
                    <div className="hidden sm:block">
                      <span className="text-xs text-stone-600">{job.type}</span>
                    </div>

                    {/* Expand arrow */}
                    <div className="hidden sm:flex justify-end">
                      {isExpanded ? (
                        <ChevronUp className="size-4 text-stone-400" />
                      ) : (
                        <ChevronDown className="size-4 text-stone-400" />
                      )}
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div className="border-t border-stone-100 bg-stone-50/50 px-4 py-4 sm:pl-14">
                      <div className="grid gap-4 sm:grid-cols-2">
                        {/* Left: Job details */}
                        <div className="space-y-3">
                          <p className="text-sm text-stone-600">{job.description}</p>

                          {/* Requirements */}
                          {job.requirements.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold text-stone-700 mb-1">
                                {isEs ? "Requisitos" : "Requirements"}
                              </p>
                              <ul className="space-y-0.5">
                                {job.requirements.map((req, i) => (
                                  <li key={i} className="text-xs text-stone-500 flex items-start gap-1.5">
                                    <span className="mt-0.5 text-stone-300">•</span>
                                    {req}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5">
                            <Badge className="bg-stone-100 text-stone-600 text-xs">
                              <Monitor className="mr-1 size-3" />{job.ehrSystem}
                            </Badge>
                            {job.bilingual && (
                              <Badge className="bg-amber-50 text-amber-700 text-xs">
                                {job.languageRequired ? `Bilingual: ${job.languageRequired}` : "Bilingual"}
                              </Badge>
                            )}
                            {job.programs.map((p) => (
                              <Badge key={p} className="bg-teal-50 text-teal-800 text-xs">{p}</Badge>
                            ))}
                          </div>

                          {/* CTAs */}
                          <div className="flex gap-2 pt-1">
                            {job.careersUrl ? (
                              <Button size="sm" className="bg-teal-700 text-white hover:bg-teal-800 text-xs" asChild>
                                <a href={job.careersUrl} target="_blank" rel="noopener noreferrer">
                                  {isEs ? "Ver página de carreras" : "View Careers Page"} <ArrowRight className="size-3.5 ml-1" />
                                </a>
                              </Button>
                            ) : (
                              <Button size="sm" className="bg-teal-700 text-white hover:bg-teal-800 text-xs" asChild>
                                <Link href={`/directory/${job.fqhcSlug}`}>
                                  {isEs ? "Ver perfil" : "View Profile"} <ArrowRight className="size-3.5 ml-1" />
                                </Link>
                              </Button>
                            )}
                            <Button size="sm" variant="outline" className="text-xs" asChild>
                              <Link href="/resume-builder">
                                {isEs ? "Crear currículum" : "Build Resume"}
                              </Link>
                            </Button>
                          </div>
                        </div>

                        {/* Right: Salary intel + Negotiation */}
                        <div className="space-y-3">
                          {/* Salary benchmark visual */}
                          <div className="rounded-lg border border-stone-200 bg-white p-3">
                            <p className="text-xs font-semibold text-stone-700 mb-2">
                              <TrendingUp className="inline size-3.5 mr-1 text-teal-600" />
                              {isEs ? "Inteligencia Salarial" : "Salary Intelligence"}
                            </p>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-stone-500">{isEs ? "Rango publicado" : "Posted Range"}</span>
                              <span className="font-semibold text-teal-800">
                                {formatSalary(job.salaryMin, job.salaryMax)}
                              </span>
                            </div>
                            <SalaryBar min={job.salaryMin} max={job.salaryMax} roleType={job.roleType} locale={locale} />
                          </div>

                          {/* Negotiation tips */}
                          <NegotiationTips ctx={job.negotiation} locale={locale} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ===== GRID VIEW ===== */}
        {!loading && filteredJobs.length > 0 && viewMode === "grid" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => {
              const bl = getBenchmarkLabel(job.negotiation.benchmarkPosition, locale);
              const isSelected = compareIds.has(job.id);

              return (
                <div
                  key={job.id}
                  className={`group flex flex-col justify-between rounded-2xl border bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
                    isSelected ? "border-teal-400 ring-1 ring-teal-200" : "border-stone-200"
                  }`}
                >
                  <div>
                    {/* Top row: compare checkbox + badges */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex gap-1.5 flex-wrap">
                        {job.negotiation.isUnion && (
                          <Badge className="bg-purple-100 text-purple-700 text-[10px]">
                            <Shield className="size-2.5 mr-0.5" />{job.negotiation.unionName || "Union"}
                          </Badge>
                        )}
                        <Badge className={`text-[10px] ${bl.color}`}>{bl.label}</Badge>
                      </div>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleCompare(job.id)}
                        className="shrink-0 accent-teal-700"
                      />
                    </div>

                    <h3 className="text-sm font-semibold text-stone-900">{job.title}</h3>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-stone-500">
                      <Building2 className="size-3" />{job.orgName}
                    </div>
                    <div className="mt-0.5 flex items-center gap-1.5 text-xs text-stone-500">
                      <MapPin className="size-3" />{job.location}, CA
                    </div>

                    {/* Salary */}
                    <div className="mt-2 text-sm font-semibold text-teal-800">
                      {formatSalary(job.salaryMin, job.salaryMax)}
                    </div>
                    <p className="text-[10px] text-stone-400">
                      {job.negotiation.salaryType === "fixed-scale"
                        ? (isEs ? "Escala fija" : "Fixed Scale")
                        : (isEs ? "Negociable" : "Negotiable")}
                      {job.negotiation.benchmarkP50 && ` · P50: ${formatSalaryCompact(job.negotiation.benchmarkP50)}`}
                    </p>

                    {/* Tags */}
                    <div className="mt-2 flex flex-wrap gap-1">
                      <Badge className="bg-stone-100 text-stone-600 text-[10px]">
                        <Monitor className="mr-0.5 size-2.5" />{job.ehrSystem}
                      </Badge>
                      {job.bilingual && (
                        <Badge className="bg-amber-50 text-amber-700 text-[10px]">
                          {isEs ? "Bilingüe" : "Bilingual"}
                        </Badge>
                      )}
                      {job.programs.slice(0, 2).map((p) => (
                        <Badge key={p} className="bg-teal-50 text-teal-800 text-[10px]">{p}</Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    className="mt-4 w-full bg-teal-700 text-white hover:bg-teal-800 text-xs"
                    size="sm"
                    asChild
                  >
                    {job.careersUrl ? (
                      <a href={job.careersUrl} target="_blank" rel="noopener noreferrer">
                        {isEs ? "Ver posición" : "View Position"} <ArrowRight className="size-3.5 ml-1" />
                      </a>
                    ) : (
                      <Link href={`/directory/${job.fqhcSlug}`}>
                        {isEs ? "Ver perfil" : "View Profile"} <ArrowRight className="size-3.5 ml-1" />
                      </Link>
                    )}
                  </Button>
                </div>
              );
            })}
          </div>
        )}

        {/* Directory callout */}
        {!loading && filteredJobs.length > 0 && (
          <div className="mt-8 rounded-xl border border-stone-200 bg-white p-6 text-center">
            <p className="text-sm text-stone-500">
              {isEs
                ? `Mostrando ${filteredJobs.length} posiciones de nuestra red. Busca en el `
                : `Showing ${filteredJobs.length} positions from our network. Browse the `}
              <Link href="/directory" className="text-teal-700 font-semibold hover:underline">
                {isEs ? "Directorio FQHC" : "FQHC Directory"}
              </Link>
              {isEs ? " para más oportunidades." : " for more opportunities."}
            </p>
          </div>
        )}
      </div>

      {/* ---------- Compare Modal ---------- */}
      {showCompare && (
        <ComparePanel
          jobs={compareJobs}
          onRemove={(id) => {
            const next = new Set(compareIds);
            next.delete(id);
            setCompareIds(next);
            if (next.size < 2) setShowCompare(false);
          }}
          onClose={() => setShowCompare(false)}
          locale={locale}
        />
      )}

      {/* ---------- JobPosting JSON-LD for SEO ---------- */}
      {filteredJobs.slice(0, 20).map((job) => {
        const fqhc = fqhcMap.get(job.fqhcSlug);
        const validThrough = new Date(
          new Date(job.postedDate).getTime() + 90 * 24 * 60 * 60 * 1000
        ).toISOString().split("T")[0];

        return (
          <JobPostingJsonLd
            key={job.id}
            title={job.title}
            description={job.description}
            datePosted={job.postedDate}
            validThrough={validThrough}
            employmentType={
              job.type === "Full-time" ? "FULL_TIME" :
              job.type === "Part-time" ? "PART_TIME" : "CONTRACT"
            }
            hiringOrganization={{
              name: job.orgName,
              url: fqhc?.website || undefined,
            }}
            city={job.location}
            state="California"
            salaryMin={job.salaryMin}
            salaryMax={job.salaryMax}
            programs={job.programs}
            ehrSystems={[job.ehrSystem]}
          />
        );
      })}
    </div>
  );
}
