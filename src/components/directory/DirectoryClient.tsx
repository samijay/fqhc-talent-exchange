"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  MapPin,
  Building2,
  Monitor,
  Users,
  ExternalLink,
  ArrowRight,
  Map,
  LayoutGrid,
  List,
  Star,
  ArrowUpDown,
  Heart,
  Shield,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Globe,
  MapPin as MapPinIcon,
  TrendingUp,
  Award,
  CheckSquare,
  Download,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { regions, allPrograms, allEhrSystems } from "@/lib/california-fqhcs";
import DynamicMap from "@/components/directory/DynamicMap";
import CareerAssessment from "@/components/career-assessment/CareerAssessment";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

/** Slim, pre-computed FQHC data passed from server component */
export interface DirectoryFQHC {
  name: string;
  slug: string;
  city: string;
  county: string;
  region: string;
  lat: number;
  lng: number;
  siteCount: number;
  patientCount: string;
  staffCount: string;
  programs: string[];
  ehrSystem: string;
  website: string;
  description: string;
  glassdoorRating: number | null;
  glassdoorReviewCount: number | null;
  ecmProvider: boolean;
  nhscApproved: boolean;
  careersUrl: string | null;
  coverageVulnerabilityPercent: number | null;
  fundingImpactLevel: "high" | "moderate" | "low" | null;
  missionStatement: string | null;
  unionInfo: {
    unionized: boolean;
    unions: string[];
    representedRoles: string[];
    notes: string | null;
  } | null;
  dataSource: string;
  // Pre-computed enrichments from server
  resilienceGrade: "A" | "B" | "C" | "D" | "F";
  resilienceScore: number;
  jobCount: number;
  profileCompleteness: number;
  hasGPTW: boolean;
}

export interface DirectoryStats {
  totalOrgs: number;
  totalRegions: number;
  totalSites: number;
  ecmProviders: number;
  totalJobs: number;
  avgResilience: number;
}

type SortKey = "name" | "patientCount" | "siteCount" | "glassdoorRating" | "staffCount" | "resilienceGrade" | "jobCount";
type SortDir = "asc" | "desc";
type ViewMode = "cards" | "table" | "map";
type GradeFilter = "A" | "B" | "C" | "D" | "F";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function parseCount(str: string): number {
  return parseInt(str.replace(/[^0-9]/g, ""), 10) || 0;
}

const GRADE_ORDER: Record<string, number> = { A: 5, B: 4, C: 3, D: 2, F: 1 };

function gradeColor(grade: string) {
  switch (grade) {
    case "A": return "bg-emerald-100 text-emerald-800 border-emerald-300";
    case "B": return "bg-green-100 text-green-800 border-green-300";
    case "C": return "bg-amber-100 text-amber-800 border-amber-300";
    case "D": return "bg-orange-100 text-orange-800 border-orange-300";
    case "F": return "bg-red-100 text-red-800 border-red-300";
    default: return "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400";
  }
}

function ehrBadgeColor(ehr: string) {
  if (ehr.includes("Epic") || ehr.includes("OCHIN")) return "bg-blue-50 text-blue-700 border border-blue-200";
  if (ehr.includes("eClinicalWorks") || ehr.includes("healow")) return "bg-emerald-50 text-emerald-700 border border-emerald-200";
  if (ehr.includes("NextGen")) return "bg-purple-50 text-purple-700 border border-purple-200";
  if (ehr.includes("athena")) return "bg-cyan-50 text-cyan-700 border border-cyan-200";
  if (ehr.includes("Cerner")) return "bg-orange-50 text-orange-700 border border-orange-200";
  return "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400";
}

function StarRating({ rating, noRatingText }: { rating: number | null; noRatingText?: string }) {
  if (rating === null) return <span className="text-xs text-stone-500 dark:text-stone-400">{noRatingText || "No rating"}</span>;
  const full = Math.floor(rating);
  const half = rating - full >= 0.3;
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${rating.toFixed(1)} out of 5 stars`}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f${i}`} className="size-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
      ))}
      {half && <Star className="size-3.5 fill-amber-400/50 text-amber-400" aria-hidden="true" />}
      <span className="ml-1 text-sm font-medium text-stone-700 dark:text-stone-300">{rating.toFixed(1)}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function DirectoryClient({
  fqhcs,
  stats,
}: {
  fqhcs: DirectoryFQHC[];
  stats: DirectoryStats;
}) {
  const locale = useLocale();
  const isEs = locale === "es";
  const router = useRouter();
  const searchParams = useSearchParams();

  /* ---------- i18n strings ---------- */
  const t = {
    heroTitle: isEs ? "Directorio de FQHCs en California" : "California FQHC Directory",
    heroSubtitle: isEs
      ? `Explore ${stats.totalOrgs} Centros de Salud Calificados Federalmente en California — con grados de resiliencia, datos de empleo y inteligencia estratégica.`
      : `Explore ${stats.totalOrgs} Federally Qualified Health Centers across California — with resilience grades, employment data, and strategic intelligence.`,
    organizations: isEs ? "Organizaciones" : "Organizations",
    regions: isEs ? "Regiones" : "Regions",
    healthCenterSites: isEs ? "Sitios de Salud" : "Health Center Sites",
    openPositions: isEs ? "Posiciones Abiertas" : "Open Positions",
    avgResilience: isEs ? "Resiliencia Promedio" : "Avg Resilience",
    ecmProviders: isEs ? "Proveedores ECM" : "ECM Providers",
    searchPlaceholder: isEs ? "Buscar por nombre, ciudad o condado..." : "Search by name, city, or county...",
    allRegions: isEs ? "Todas las Regiones" : "All Regions",
    allEhrSystems: isEs ? "Todos los Sistemas EHR" : "All EHR Systems",
    allPrograms: isEs ? "Todos los Programas" : "All Programs",
    ecmOnly: isEs ? "Solo ECM" : "ECM Only",
    highImpactOnly: isEs ? "Alto Riesgo" : "High Risk",
    unionOnly: isEs ? "Sindicalizados" : "Unionized",
    hiringNow: isEs ? "Contratando" : "Hiring Now",
    nameAZ: isEs ? "Nombre (A-Z)" : "Name (A-Z)",
    nameZA: isEs ? "Nombre (Z-A)" : "Name (Z-A)",
    mostPatients: isEs ? "Más Pacientes" : "Most Patients",
    mostSites: isEs ? "Más Sitios" : "Most Sites",
    largestStaff: isEs ? "Mayor Personal" : "Largest Staff",
    highestRated: isEs ? "Mejor Calificados" : "Highest Rated",
    bestResilience: isEs ? "Mejor Resiliencia" : "Best Resilience",
    mostJobs: isEs ? "Más Empleos" : "Most Jobs",
    showing: (filtered: number, total: number) =>
      isEs ? `Mostrando ${filtered} de ${total} organizaciones` : `Showing ${filtered} of ${total} organizations`,
    organization: isEs ? "Organización" : "Organization",
    location: isEs ? "Ubicación" : "Location",
    sites: isEs ? "Sitios" : "Sites",
    patients: isEs ? "Pacientes" : "Patients",
    staff: isEs ? "Personal" : "Staff",
    grade: isEs ? "Grado" : "Grade",
    jobs: isEs ? "Empleos" : "Jobs",
    rating: isEs ? "Calificación" : "Rating",
    noRating: isEs ? "Sin calificación" : "No rating",
    programsOffered: isEs ? "Programas" : "Programs",
    orgDetails: isEs ? "Detalles de la Organización" : "Organization Details",
    keyStats: isEs ? "Estadísticas Clave" : "Key Statistics",
    patientCount: isEs ? "Cantidad de Pacientes" : "Patient Count",
    staffCount: isEs ? "Cantidad de Personal" : "Staff Count",
    healthSites: isEs ? "Sitios de Salud" : "Health Center Sites",
    glassdoorRating: isEs ? "Calificación Glassdoor" : "Glassdoor Rating",
    about: isEs ? "Acerca de" : "About",
    techCerts: isEs ? "Tecnología y Certificaciones" : "Technology & Certifications",
    ecmProvider: isEs ? "Proveedor ECM" : "ECM Provider",
    nhscApproved: isEs ? "Aprobado por NHSC" : "NHSC Approved",
    unionized: isEs ? "Sindicalizado" : "Union",
    unionInfo: isEs ? "Información Sindical" : "Union Info",
    represents: isEs ? "Representa a" : "Represents",
    fundingImpact: isEs ? "Vulnerabilidad de Financiamiento" : "Funding Vulnerability",
    coverageRisk: isEs ? "Pacientes en Riesgo de Cobertura" : "Patients at Coverage Risk",
    coverageRiskDesc: isEs
      ? "Porcentaje estimado de pacientes en riesgo de perder cobertura de Medi-Cal"
      : "Estimated percentage of patients at risk of losing Medi-Cal coverage",
    highImpact: isEs ? "Alto Impacto" : "High Impact",
    moderateImpact: isEs ? "Impacto Moderado" : "Moderate Impact",
    lowImpact: isEs ? "Bajo Impacto" : "Low Impact",
    missionLabel: isEs ? "Misión" : "Mission",
    findYourRole: isEs ? "Encuentre su Puesto Aquí" : "Find Your Role Here",
    findYourRoleDesc: (name: string) =>
      isEs
        ? `Realice una evaluación de carrera rápida para ver qué tan bien coincide con ${name}.`
        : `Take a quick career screener to see how well you match with ${name}.`,
    takeScreener: isEs ? "Realizar Evaluación" : "Take Career Screener",
    viewFullProfile: isEs ? "Ver Perfil Completo" : "View Full Profile",
    viewCareers: isEs ? "Ver Página de Carreras" : "View Careers Page",
    visitWebsite: isEs ? "Visitar Sitio Web" : "Visit Website",
    bilingual: isEs ? "Bilingüe" : "Bilingual",
    noResults: isEs ? "No hay organizaciones que coincidan" : "No organizations match your filters",
    noResultsHint: isEs ? "Intente ajustar su búsqueda." : "Try adjusting your search or filter criteria.",
    compareSelected: isEs ? "Comparar Seleccionados" : "Compare Selected",
    exportCSV: isEs ? "Exportar CSV" : "Export CSV",
  };

  /* ---------- State (initialize from URL params) ---------- */
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [regionFilter, setRegionFilter] = useState(searchParams.get("region") || "All Regions");
  const [ehrFilter, setEhrFilter] = useState(searchParams.get("ehr") || "All EHR Systems");
  const [programFilter, setProgramFilter] = useState(searchParams.get("program") || "All Programs");
  const [ecmOnly, setEcmOnly] = useState(searchParams.get("ecm") === "true");
  const [highImpactOnly, setHighImpactOnly] = useState(searchParams.get("risk") === "true");
  const [unionOnly, setUnionOnly] = useState(searchParams.get("union") === "true");
  const [hiringOnly, setHiringOnly] = useState(searchParams.get("hiring") === "true");
  const [sizeFilter, setSizeFilter] = useState<string[]>(() => {
    const s = searchParams.get("size");
    return s ? s.split(",") : [];
  });
  const [gradeFilter, setGradeFilter] = useState<GradeFilter[]>(() => {
    const g = searchParams.get("grade");
    return g ? (g.split(",") as GradeFilter[]) : [];
  });
  const [view, setView] = useState<ViewMode>((searchParams.get("view") as ViewMode) || "table");

  // Auto card view on mobile
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    if (mq.matches && view !== "cards") {
      setView("cards");
    }
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setView("cards");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [sortKey, setSortKey] = useState<SortKey>((searchParams.get("sortKey") as SortKey) || "name");
  const [sortDir, setSortDir] = useState<SortDir>((searchParams.get("sortDir") as SortDir) || "asc");
  const [selectedFqhc, setSelectedFqhc] = useState<DirectoryFQHC | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [compareList, setCompareList] = useState<string[]>([]);
  const PAGE_SIZE = 30;
  const [page, setPage] = useState(1);

  /* ---------- URL sync ---------- */
  const syncURL = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === "" || value === "All Regions" || value === "All EHR Systems" || value === "All Programs" || value === "false") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
      const qs = params.toString();
      router.replace(qs ? `?${qs}` : ".", { scroll: false });
    },
    [searchParams, router]
  );

  /* ---------- Filter + Sort ---------- */
  const filtered = useMemo(() => {
    let list = [...fqhcs];

    if (regionFilter !== "All Regions") list = list.filter((f) => f.region === regionFilter);
    if (ehrFilter !== "All EHR Systems") list = list.filter((f) => f.ehrSystem === ehrFilter);
    if (programFilter !== "All Programs") list = list.filter((f) => f.programs.includes(programFilter));
    if (ecmOnly) list = list.filter((f) => f.ecmProvider);
    if (highImpactOnly) list = list.filter((f) => f.fundingImpactLevel === "high");
    if (unionOnly) list = list.filter((f) => f.unionInfo?.unionized);
    if (hiringOnly) list = list.filter((f) => f.jobCount > 0);
    if (sizeFilter.length > 0) {
      list = list.filter((f) => {
        const staff = parseCount(f.staffCount);
        if (sizeFilter.includes("small") && staff > 0 && staff < 100) return true;
        if (sizeFilter.includes("mid") && staff >= 100 && staff <= 500) return true;
        if (sizeFilter.includes("large") && staff > 500) return true;
        return false;
      });
    }
    if (gradeFilter.length > 0) list = list.filter((f) => gradeFilter.includes(f.resilienceGrade));

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.city.toLowerCase().includes(q) ||
          f.county.toLowerCase().includes(q) ||
          f.description.toLowerCase().includes(q)
      );
    }

    list.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "name": cmp = a.name.localeCompare(b.name); break;
        case "patientCount": cmp = parseCount(a.patientCount) - parseCount(b.patientCount); break;
        case "siteCount": cmp = a.siteCount - b.siteCount; break;
        case "staffCount": cmp = parseCount(a.staffCount) - parseCount(b.staffCount); break;
        case "glassdoorRating": cmp = (a.glassdoorRating ?? 0) - (b.glassdoorRating ?? 0); break;
        case "resilienceGrade": cmp = (GRADE_ORDER[a.resilienceGrade] ?? 0) - (GRADE_ORDER[b.resilienceGrade] ?? 0); break;
        case "jobCount": cmp = a.jobCount - b.jobCount; break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return list;
  }, [fqhcs, search, regionFilter, ehrFilter, programFilter, ecmOnly, highImpactOnly, unionOnly, hiringOnly, sizeFilter, gradeFilter, sortKey, sortDir]);

  // Reset page when filters change
  useEffect(() => { setPage(1); }, [search, regionFilter, ehrFilter, programFilter, ecmOnly, highImpactOnly, unionOnly, hiringOnly, sizeFilter, gradeFilter]);

  // Paginated results (cards + table only, map shows all)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = view === "map" ? filtered : filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  /* ---------- Aggregates for filter counts ---------- */
  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    fqhcs.forEach((f) => { counts[f.region] = (counts[f.region] || 0) + 1; });
    return counts;
  }, [fqhcs]);

  const hiringCount = useMemo(() => fqhcs.filter((f) => f.jobCount > 0).length, [fqhcs]);
  const gradeCounts = useMemo(() => {
    const c: Record<string, number> = {};
    fqhcs.forEach((f) => { c[f.resilienceGrade] = (c[f.resilienceGrade] || 0) + 1; });
    return c;
  }, [fqhcs]);
  const sizeCounts = useMemo(() => {
    const c = { small: 0, mid: 0, large: 0 };
    fqhcs.forEach((f) => {
      const s = parseCount(f.staffCount);
      if (s > 500) c.large++;
      else if (s >= 100) c.mid++;
      else if (s > 0) c.small++;
    });
    return c;
  }, [fqhcs]);
  const ehrCounts = useMemo(() => {
    const c: Record<string, number> = {};
    fqhcs.forEach((f) => { if (f.ehrSystem && f.ehrSystem !== "Unknown") c[f.ehrSystem] = (c[f.ehrSystem] || 0) + 1; });
    return c;
  }, [fqhcs]);
  const programCounts = useMemo(() => {
    const c: Record<string, number> = {};
    fqhcs.forEach((f) => f.programs.forEach((p) => { c[p] = (c[p] || 0) + 1; }));
    return c;
  }, [fqhcs]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      const newDir = sortDir === "asc" ? "desc" : "asc";
      setSortDir(newDir);
      syncURL({ sortKey: key, sortDir: newDir });
    } else {
      const newDir = key === "name" ? "asc" : "desc";
      setSortKey(key);
      setSortDir(newDir);
      syncURL({ sortKey: key, sortDir: newDir });
    }
  }

  function toggleGrade(g: GradeFilter) {
    const next = gradeFilter.includes(g) ? gradeFilter.filter((x) => x !== g) : [...gradeFilter, g];
    setGradeFilter(next);
    syncURL({ grade: next.length > 0 ? next.join(",") : null });
  }

  function toggleCompare(slug: string) {
    setCompareList((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 3) return prev; // max 3
      return [...prev, slug];
    });
  }

  async function exportCSV() {
    const headers = ["Name", "City", "County", "Region", "Sites", "Patients", "Staff", "EHR", "Glassdoor", "Grade", "Jobs", "Programs", "Funding Impact"];
    const rows = filtered.map((f) => [
      f.name, f.city, f.county, f.region, f.siteCount, f.patientCount, f.staffCount,
      f.ehrSystem, f.glassdoorRating ?? "", f.resilienceGrade, f.jobCount,
      f.programs.join("; "), f.fundingImpactLevel ?? "",
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fqhc-directory.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  /* ---------- sortHeader helper (returns props, not a component) ---------- */
  function sortTh(label: string, key: SortKey) {
    const active = sortKey === key;
    return (
      <th
        key={key}
        className={`cursor-pointer px-3 py-3 font-semibold text-stone-700 dark:text-stone-300 hover:text-teal-800 whitespace-nowrap ${active ? "text-teal-800" : ""}`}
        onClick={() => toggleSort(key)}
      >
        <span className="flex items-center gap-1">
          {label}
          {active && (sortDir === "asc" ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />)}
        </span>
      </th>
    );
  }

  return (
    <div className="bg-stone-50 dark:bg-stone-950 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 py-14 text-center text-white sm:py-20">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          {t.heroTitle}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-teal-100/80 sm:text-lg">
          {t.heroSubtitle}
        </p>

        {/* Enhanced stats bar */}
        <div className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-4 text-sm sm:gap-6 sm:text-base">
          {[
            { value: stats.totalOrgs.toLocaleString(), label: t.organizations },
            { value: `${stats.totalSites.toLocaleString()}+`, label: t.healthCenterSites },
            { value: stats.totalJobs.toLocaleString(), label: t.openPositions },
            { value: stats.ecmProviders.toString(), label: t.ecmProviders },
            { value: stats.avgResilience.toFixed(0), label: t.avgResilience },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-4">
              {i > 0 && <div className="hidden h-8 w-px bg-teal-500/50 sm:block" />}
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold sm:text-3xl">{s.value}</span>
                <span className="text-teal-200 text-xs sm:text-sm">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Filters + View Toggle */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-500 dark:text-stone-400" />
            <Input
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                syncURL({ q: e.target.value || null });
              }}
              className="h-11 pl-10"
            />
          </div>

          {/* Region filter */}
          <Select value={regionFilter} onValueChange={(v) => { setRegionFilter(v); syncURL({ region: v }); }}>
            <SelectTrigger className="h-11 w-full sm:w-44">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Regions">{t.allRegions}</SelectItem>
              {regions.map((r) => (
                <SelectItem key={r} value={r}>{r} ({regionCounts[r] || 0})</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* EHR filter */}
          <Select value={ehrFilter} onValueChange={(v) => { setEhrFilter(v); syncURL({ ehr: v }); }}>
            <SelectTrigger className="h-11 w-full sm:w-44">
              <SelectValue placeholder="EHR System" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All EHR Systems">{t.allEhrSystems}</SelectItem>
              {allEhrSystems.map((e) => (
                <SelectItem key={e} value={e}>{e} ({ehrCounts[e] || 0})</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Program filter */}
          <Select value={programFilter} onValueChange={(v) => { setProgramFilter(v); syncURL({ program: v }); }}>
            <SelectTrigger className="h-11 w-full sm:w-48">
              <SelectValue placeholder="Program" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Programs">{t.allPrograms}</SelectItem>
              {allPrograms.map((p) => (
                <SelectItem key={p} value={p}>{p} ({programCounts[p] || 0})</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Second row: toggle pills + grade filter + sort */}
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {/* Toggle pills */}
          {[
            { active: ecmOnly, toggle: () => { setEcmOnly(!ecmOnly); syncURL({ ecm: (!ecmOnly).toString() }); }, label: t.ecmOnly, icon: <Shield className="size-3.5" />, color: "teal" },
            { active: highImpactOnly, toggle: () => { setHighImpactOnly(!highImpactOnly); syncURL({ risk: (!highImpactOnly).toString() }); }, label: t.highImpactOnly, icon: <Heart className="size-3.5" />, color: "amber" },
            { active: unionOnly, toggle: () => { setUnionOnly(!unionOnly); syncURL({ union: (!unionOnly).toString() }); }, label: t.unionOnly, icon: null, color: "blue" },
            { active: hiringOnly, toggle: () => { setHiringOnly(!hiringOnly); syncURL({ hiring: (!hiringOnly).toString() }); }, label: `${t.hiringNow} (${hiringCount})`, icon: <TrendingUp className="size-3.5" />, color: "emerald" },
          ].map((pill) => (
            <button
              key={pill.label}
              onClick={pill.toggle}
              className={`flex items-center justify-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                pill.active
                  ? `border-${pill.color}-700 bg-${pill.color}-50 text-${pill.color}-800`
                  : "border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:border-stone-300 dark:border-stone-600"
              }`}
            >
              {pill.icon}
              {pill.label}
            </button>
          ))}

          {/* Size pills */}
          <div className="flex items-center gap-1">
            {([
              { key: "small", label: `<100 (${sizeCounts.small})` },
              { key: "mid", label: `100-500 (${sizeCounts.mid})` },
              { key: "large", label: `500+ (${sizeCounts.large})` },
            ]).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => {
                  const next = sizeFilter.includes(key) ? sizeFilter.filter((s) => s !== key) : [...sizeFilter, key];
                  setSizeFilter(next);
                  syncURL({ size: next.length > 0 ? next.join(",") : null });
                }}
                className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
                  sizeFilter.includes(key) ? "border-stone-700 bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200" : "border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-500 dark:text-stone-400 hover:border-stone-300 dark:border-stone-600"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Resilience grade pills */}
          <div className="flex items-center gap-1">
            {(["A", "B", "C", "D", "F"] as GradeFilter[]).map((g) => (
              <button
                key={g}
                onClick={() => toggleGrade(g)}
                className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold transition-colors ${
                  gradeFilter.includes(g) ? gradeColor(g) : "border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-500 dark:text-stone-400 hover:border-stone-300 dark:border-stone-600"
                }`}
              >
                {g}
                <span className="font-normal text-[10px]">({gradeCounts[g] || 0})</span>
              </button>
            ))}
          </div>

          {/* Sort */}
          <Select value={`${sortKey}-${sortDir}`} onValueChange={(v) => {
            const [key, dir] = v.split("-") as [SortKey, SortDir];
            setSortKey(key);
            setSortDir(dir);
            syncURL({ sortKey: key, sortDir: dir });
          }}>
            <SelectTrigger className="h-9 w-full text-sm sm:w-48">
              <ArrowUpDown className="mr-1 size-3.5" />
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">{t.nameAZ}</SelectItem>
              <SelectItem value="name-desc">{t.nameZA}</SelectItem>
              <SelectItem value="patientCount-desc">{t.mostPatients}</SelectItem>
              <SelectItem value="siteCount-desc">{t.mostSites}</SelectItem>
              <SelectItem value="staffCount-desc">{t.largestStaff}</SelectItem>
              <SelectItem value="glassdoorRating-desc">{t.highestRated}</SelectItem>
              <SelectItem value="resilienceGrade-desc">{t.bestResilience}</SelectItem>
              <SelectItem value="jobCount-desc">{t.mostJobs}</SelectItem>
            </SelectContent>
          </Select>

          {/* Export CSV */}
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 rounded-full border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-1.5 text-sm font-medium text-stone-600 dark:text-stone-400 hover:border-stone-300 dark:border-stone-600 transition-colors"
          >
            <Download className="size-3.5" />
            {t.exportCSV}
          </button>

          {/* View toggle (hidden on mobile — auto card view) */}
          <div className="hidden items-center justify-center gap-1 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-0.5 sm:ml-auto md:flex">
            {([
              { mode: "cards" as ViewMode, icon: <LayoutGrid className="size-4" />, title: "Card view" },
              { mode: "table" as ViewMode, icon: <List className="size-4" />, title: "Table view" },
              { mode: "map" as ViewMode, icon: <Map className="size-4" />, title: "Map view" },
            ]).map(({ mode, icon, title }) => (
              <button
                key={mode}
                onClick={() => { setView(mode); syncURL({ view: mode }); }}
                className={`rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                  view === mode ? "bg-teal-700 text-white" : "text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300"
                }`}
                title={title}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-4 text-sm text-stone-500 dark:text-stone-400">
          {t.showing(filtered.length, stats.totalOrgs)}
        </p>

        {/* Active filter chips */}
        {(() => {
          const chips: { label: string; clear: () => void }[] = [];
          if (regionFilter !== "All Regions") chips.push({ label: regionFilter, clear: () => { setRegionFilter("All Regions"); syncURL({ region: null }); } });
          if (ehrFilter !== "All EHR Systems") chips.push({ label: ehrFilter, clear: () => { setEhrFilter("All EHR Systems"); syncURL({ ehr: null }); } });
          if (programFilter !== "All Programs") chips.push({ label: programFilter, clear: () => { setProgramFilter("All Programs"); syncURL({ program: null }); } });
          if (ecmOnly) chips.push({ label: "ECM Only", clear: () => { setEcmOnly(false); syncURL({ ecm: null }); } });
          if (highImpactOnly) chips.push({ label: isEs ? "Alto Riesgo" : "High Risk", clear: () => { setHighImpactOnly(false); syncURL({ risk: null }); } });
          if (unionOnly) chips.push({ label: isEs ? "Sindicalizados" : "Unionized", clear: () => { setUnionOnly(false); syncURL({ union: null }); } });
          if (hiringOnly) chips.push({ label: isEs ? "Contratando" : "Hiring Now", clear: () => { setHiringOnly(false); syncURL({ hiring: null }); } });
          sizeFilter.forEach((s) => chips.push({ label: s === "small" ? "<100 staff" : s === "mid" ? "100-500 staff" : "500+ staff", clear: () => { const next = sizeFilter.filter((x) => x !== s); setSizeFilter(next); syncURL({ size: next.length > 0 ? next.join(",") : null }); } }));
          gradeFilter.forEach((g) => chips.push({ label: `Grade ${g}`, clear: () => { const next = gradeFilter.filter((x) => x !== g); setGradeFilter(next); syncURL({ grade: next.length > 0 ? next.join(",") : null }); } }));
          if (search.trim()) chips.push({ label: `"${search}"`, clear: () => { setSearch(""); syncURL({ q: null }); } });
          if (chips.length === 0) return null;
          const clearAll = () => {
            setSearch(""); setRegionFilter("All Regions"); setEhrFilter("All EHR Systems"); setProgramFilter("All Programs");
            setEcmOnly(false); setHighImpactOnly(false); setUnionOnly(false); setHiringOnly(false);
            setSizeFilter([]); setGradeFilter([]);
            router.replace(".", { scroll: false });
          };
          return (
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              {chips.map((chip, i) => (
                <span key={i} className="inline-flex items-center gap-1 rounded-full bg-teal-50 dark:bg-teal-950 border border-teal-200 px-2.5 py-0.5 text-xs text-teal-800">
                  {chip.label}
                  <button onClick={chip.clear} className="ml-0.5 text-teal-500 hover:text-teal-800">&times;</button>
                </span>
              ))}
              <button onClick={clearAll} className="text-xs text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 underline ml-1">
                {isEs ? "Limpiar todo" : "Clear all"}
              </button>
            </div>
          );
        })()}
      </div>

      {/* Content Area */}
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        {/* Compare floating bar */}
        {compareList.length >= 2 && (
          <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-teal-800 px-6 py-3 text-white shadow-xl flex items-center gap-4">
            <CheckSquare className="size-5" />
            <span className="text-sm font-medium">{compareList.length} {isEs ? "seleccionados" : "selected"}</span>
            <Button
              size="sm"
              className="bg-amber-500 text-stone-900 dark:text-stone-100 hover:bg-amber-400"
              onClick={() => router.push(`/compare?fqhcs=${compareList.join(",")}`)}
            >
              {t.compareSelected}
            </Button>
            <button onClick={() => setCompareList([])} className="text-teal-200 hover:text-white text-xs">
              {isEs ? "Limpiar" : "Clear"}
            </button>
          </div>
        )}

        {/* Map View */}
        {view === "map" && (
          <div className="mb-8 overflow-hidden rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm">
            <DynamicMap fqhcs={filtered} locale={locale} />
          </div>
        )}

        {/* Card View */}
        {view === "cards" && (
          <>
            {filtered.length === 0 ? (
              <EmptyState isEs={isEs} />
            ) : (
              <>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {paginated.map((fqhc) => (
                    <FQHCCard
                      key={fqhc.slug}
                      fqhc={fqhc}
                      isEs={isEs}
                      onViewDetails={() => { setSelectedFqhc(fqhc); setDetailsOpen(true); }}
                    />
                  ))}
                </div>
                {totalPages > 1 && <PaginationControls page={page} totalPages={totalPages} setPage={setPage} isEs={isEs} total={filtered.length} pageSize={PAGE_SIZE} />}
              </>
            )}
          </>
        )}

        {/* Table View */}
        {view === "table" && (
          <>
            {filtered.length === 0 ? (
              <EmptyState isEs={isEs} />
            ) : (
              <>
              <div className="scroll-hint overflow-x-auto rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 sticky top-0 z-10">
                      {/* Compare checkbox header */}
                      <th className="w-10 px-2 py-3"></th>
                      {sortTh(t.organization, "name")}
                      <th className="px-3 py-3 font-semibold text-stone-700 dark:text-stone-300">{t.location}</th>
                      {sortTh(t.grade, "resilienceGrade")}
                      {sortTh(t.jobs, "jobCount")}
                      {sortTh(t.sites, "siteCount")}
                      {sortTh(t.patients, "patientCount")}
                      {sortTh(t.staff, "staffCount")}
                      <th className="px-3 py-3 font-semibold text-stone-700 dark:text-stone-300">EHR</th>
                      {sortTh(t.rating, "glassdoorRating")}
                      <th className="px-3 py-3 font-semibold text-stone-700 dark:text-stone-300">{t.programsOffered}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((fqhc, i) => (
                      <tr
                        key={fqhc.slug}
                        className={`border-b border-stone-50 transition-colors hover:bg-stone-50 dark:hover:bg-stone-800/80 ${i % 2 === 0 ? "" : "bg-stone-50/30"}`}
                      >
                        {/* Compare checkbox */}
                        <td className="px-2 py-3">
                          <input
                            type="checkbox"
                            checked={compareList.includes(fqhc.slug)}
                            onChange={() => toggleCompare(fqhc.slug)}
                            className="size-4 rounded border-stone-300 dark:border-stone-600 text-teal-700 dark:text-teal-400 focus:ring-teal-500"
                            disabled={!compareList.includes(fqhc.slug) && compareList.length >= 3}
                          />
                        </td>
                        <td className="px-3 py-3">
                          <Link
                            href={`/directory/${fqhc.slug}` as "/directory"}
                            className="font-medium text-teal-800 hover:text-teal-900 hover:underline"
                          >
                            {fqhc.name}
                          </Link>
                          {fqhc.hasGPTW && (
                            <Badge className="ml-1.5 bg-purple-50 text-purple-700 text-[10px] px-1.5 py-0">
                              <Award className="mr-0.5 size-2.5" />GPTW
                            </Badge>
                          )}
                        </td>
                        <td className="px-3 py-3 text-stone-600 dark:text-stone-400 whitespace-nowrap">{fqhc.city}, {fqhc.county}</td>
                        {/* Resilience grade */}
                        <td className="px-3 py-3">
                          <span className={`inline-flex size-7 items-center justify-center rounded-full text-xs font-bold border ${gradeColor(fqhc.resilienceGrade)}`}>
                            {fqhc.resilienceGrade}
                          </span>
                        </td>
                        {/* Job count */}
                        <td className="px-3 py-3">
                          {fqhc.jobCount > 0 ? (
                            <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                              <span className="size-2 rounded-full bg-emerald-500" />
                              {fqhc.jobCount}
                            </span>
                          ) : (
                            <span className="text-stone-400">—</span>
                          )}
                        </td>
                        <td className="px-3 py-3 text-stone-700 dark:text-stone-300 font-medium">{fqhc.siteCount}</td>
                        <td className="px-3 py-3 text-stone-700 dark:text-stone-300">{fqhc.patientCount}</td>
                        <td className="px-3 py-3 text-stone-700 dark:text-stone-300">{fqhc.staffCount}</td>
                        <td className="px-3 py-3">
                          <Badge className={`text-xs whitespace-nowrap ${ehrBadgeColor(fqhc.ehrSystem)}`}>{fqhc.ehrSystem}</Badge>
                        </td>
                        <td className="px-3 py-3">
                          <StarRating rating={fqhc.glassdoorRating} noRatingText={t.noRating} />
                          {fqhc.glassdoorReviewCount && (
                            <span className="ml-1 text-xs text-stone-500 dark:text-stone-400">({fqhc.glassdoorReviewCount})</span>
                          )}
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex flex-wrap gap-1">
                            {fqhc.programs.slice(0, 2).map((p) => (
                              <Badge key={p} className="bg-stone-50 dark:bg-stone-950 text-stone-500 dark:text-stone-400 text-xs">{p}</Badge>
                            ))}
                            {fqhc.programs.length > 2 && (
                              <span className="text-xs text-stone-500 dark:text-stone-400">+{fqhc.programs.length - 2}</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {totalPages > 1 && <PaginationControls page={page} totalPages={totalPages} setPage={setPage} isEs={isEs} total={filtered.length} pageSize={PAGE_SIZE} />}
              </>
            )}
          </>
        )}

        {/* Details Sheet (preserved from original) */}
        {selectedFqhc && (
          <Sheet open={detailsOpen} onOpenChange={setDetailsOpen}>
            <SheetContent className="w-full overflow-y-auto">
              <SheetHeader>
                <div className="flex-1">
                  <SheetTitle className="text-2xl">{selectedFqhc.name}</SheetTitle>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-sm text-stone-500 dark:text-stone-400">{selectedFqhc.region}</span>
                    <span className={`inline-flex size-6 items-center justify-center rounded-full text-xs font-bold border ${gradeColor(selectedFqhc.resilienceGrade)}`}>
                      {selectedFqhc.resilienceGrade}
                    </span>
                    {selectedFqhc.jobCount > 0 && (
                      <Badge className="bg-emerald-50 text-emerald-700 text-xs">
                        <TrendingUp className="mr-0.5 size-3" />{selectedFqhc.jobCount} {t.jobs}
                      </Badge>
                    )}
                  </div>
                </div>
                <SheetClose />
              </SheetHeader>

              <div className="space-y-6 px-6 py-4">
                {/* Org Details */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100">{t.orgDetails}</h3>
                  <div className="space-y-2">
                    {selectedFqhc.website && (
                      <div className="flex items-start gap-3">
                        <Globe className="mt-0.5 size-4 text-teal-700 dark:text-teal-400 shrink-0" />
                        <a href={selectedFqhc.website} target="_blank" rel="noopener noreferrer" className="text-sm text-teal-700 dark:text-teal-400 hover:text-teal-800 break-all">
                          {selectedFqhc.website}
                        </a>
                      </div>
                    )}
                    <div className="flex items-start gap-3">
                      <MapPinIcon className="mt-0.5 size-4 text-teal-700 dark:text-teal-400 shrink-0" />
                      <div className="text-sm text-stone-600 dark:text-stone-400">
                        {selectedFqhc.city}, {isEs ? `Condado de ${selectedFqhc.county}` : `${selectedFqhc.county} County`}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Stats */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100">{t.keyStats}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: t.patientCount, value: selectedFqhc.patientCount, bg: "bg-teal-50 dark:bg-teal-950" },
                      { label: t.staffCount, value: selectedFqhc.staffCount, bg: "bg-amber-50 dark:bg-amber-950" },
                      { label: t.healthSites, value: selectedFqhc.siteCount.toString(), bg: "bg-teal-50 dark:bg-teal-950" },
                      { label: t.grade, value: selectedFqhc.resilienceGrade, bg: "bg-amber-50 dark:bg-amber-950" },
                    ].map((s) => (
                      <div key={s.label} className={`rounded-lg ${s.bg} p-3`}>
                        <p className="text-xs font-medium text-stone-500 dark:text-stone-400">{s.label}</p>
                        <p className="mt-1 text-sm font-semibold text-stone-900 dark:text-stone-100">{s.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mission */}
                {selectedFqhc.missionStatement && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-stone-900 dark:text-stone-100">{t.missionLabel}</h3>
                    <div className="rounded-lg border-l-4 border-teal-600 bg-teal-50/50 px-4 py-3">
                      <p className="text-sm text-stone-700 dark:text-stone-300 italic leading-relaxed">&ldquo;{selectedFqhc.missionStatement}&rdquo;</p>
                    </div>
                  </div>
                )}

                {/* About */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100">{t.about}</h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">{selectedFqhc.description}</p>
                </div>

                {/* Coverage Vulnerability */}
                {selectedFqhc.coverageVulnerabilityPercent !== null && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-stone-900 dark:text-stone-100">{t.fundingImpact}</h3>
                    <div className={`rounded-lg border p-4 ${
                      selectedFqhc.fundingImpactLevel === "high" ? "border-rose-200 bg-rose-50"
                        : selectedFqhc.fundingImpactLevel === "moderate" ? "border-amber-200 bg-amber-50 dark:bg-amber-950"
                          : "border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-950"
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-stone-900 dark:text-stone-100">{t.coverageRisk}</span>
                        <span className={`text-lg font-bold ${
                          selectedFqhc.fundingImpactLevel === "high" ? "text-rose-700"
                            : selectedFqhc.fundingImpactLevel === "moderate" ? "text-amber-700" : "text-stone-600 dark:text-stone-400"
                        }`}>~{selectedFqhc.coverageVulnerabilityPercent}%</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-stone-200 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            selectedFqhc.fundingImpactLevel === "high" ? "bg-rose-500"
                              : selectedFqhc.fundingImpactLevel === "moderate" ? "bg-amber-500" : "bg-stone-400"
                          }`}
                          style={{ width: `${selectedFqhc.coverageVulnerabilityPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Tech & Certs */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100">{t.techCerts}</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300"><Monitor className="mr-1 size-3" />{selectedFqhc.ehrSystem}</Badge>
                    {selectedFqhc.ecmProvider && <Badge className="bg-teal-50 dark:bg-teal-950 text-teal-800"><Shield className="mr-0.5 size-3" />{t.ecmProvider}</Badge>}
                    {selectedFqhc.nhscApproved && <Badge className="bg-amber-50 dark:bg-amber-950 text-amber-700"><GraduationCap className="mr-0.5 size-3" />{t.nhscApproved}</Badge>}
                    {selectedFqhc.unionInfo?.unionized && <Badge className="bg-blue-50 text-blue-700">{t.unionized}</Badge>}
                    {selectedFqhc.hasGPTW && <Badge className="bg-purple-50 text-purple-700"><Award className="mr-0.5 size-3" />Great Place to Work</Badge>}
                  </div>
                </div>

                {/* Programs */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100">{t.programsOffered}</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedFqhc.programs.map((prog) => (
                      <Badge key={prog} className="bg-teal-50 dark:bg-teal-950 text-teal-800">{prog}</Badge>
                    ))}
                  </div>
                </div>

                {/* View Full Profile */}
                <div className="border-t border-stone-100 dark:border-stone-800 pt-4">
                  <Button className="w-full border border-teal-300 bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900" asChild>
                    <Link href={`/directory/${selectedFqhc.slug}` as "/directory"}>
                      {t.viewFullProfile} <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                </div>

                {/* External links */}
                <div className="space-y-3">
                  {selectedFqhc.careersUrl && (
                    <Button className="w-full border border-teal-300 bg-teal-50 dark:bg-teal-950 text-teal-800 hover:bg-teal-100 dark:hover:bg-teal-900" asChild>
                      <a href={selectedFqhc.careersUrl} target="_blank" rel="noopener noreferrer">
                        {t.viewCareers} <ExternalLink className="ml-2 size-4" />
                      </a>
                    </Button>
                  )}
                  <Button className="w-full border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-950 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800" asChild>
                    <a href={selectedFqhc.website} target="_blank" rel="noopener noreferrer">
                      {t.visitWebsite} <ExternalLink className="ml-2 size-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}

        {/* Career Assessment Overlay */}
        {showAssessment && selectedFqhc && (
          <div className="fixed inset-0 z-[60] overflow-y-auto bg-white dark:bg-stone-900">
            <CareerAssessment
              fqhcName={selectedFqhc.name}
              fqhcSlug={selectedFqhc.slug}
              fqhcPrograms={selectedFqhc.programs}
              fqhcEhrSystem={selectedFqhc.ehrSystem}
              onClose={() => setShowAssessment(false)}
            />
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 p-8 sm:p-12 text-center text-white">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {isEs ? "Explorar Inteligencia Estratégica" : "Explore Strategic Intelligence"}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-teal-100/80 sm:text-lg">
            {isEs
              ? "Vea puntajes de resiliencia, informes estratégicos y datos regionales para cada FQHC."
              : "View resilience scores, strategic reports, and regional data for every FQHC."}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="bg-amber-500 text-stone-900 dark:text-stone-100 shadow-lg hover:bg-amber-400" asChild>
              <Link href="/strategy/resilience">
                {isEs ? "Scorecard de Resiliencia" : "Resilience Scorecard"} <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" className="border border-white/40 bg-white/10 text-white hover:bg-white/20" asChild>
              <Link href="/salary-data">{isEs ? "Datos Salariales" : "Salary Intelligence"}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function FQHCCard({
  fqhc,
  onViewDetails,
  isEs,
}: {
  fqhc: DirectoryFQHC;
  onViewDetails?: () => void;
  isEs: boolean;
}) {
  return (
    <div
      className="flex flex-col justify-between rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-teal-300 cursor-pointer group"
      onClick={onViewDetails}
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 leading-tight group-hover:text-teal-800 transition-colors">
            {fqhc.name}
          </h3>
          <div className="flex shrink-0 flex-col items-end gap-1">
            {/* Resilience grade badge */}
            <span className={`inline-flex size-8 items-center justify-center rounded-full text-sm font-bold border ${gradeColor(fqhc.resilienceGrade)}`}>
              {fqhc.resilienceGrade}
            </span>
            {fqhc.ecmProvider && (
              <Badge className="bg-teal-50 dark:bg-teal-950 text-teal-800 text-xs"><Shield className="mr-0.5 size-3" /> ECM</Badge>
            )}
          </div>
        </div>

        {/* Location */}
        <div className="mt-2 flex items-center gap-1.5 text-sm text-stone-500 dark:text-stone-400">
          <MapPin className="size-3.5" /> {fqhc.city}, {fqhc.county}
        </div>

        {/* Region + Hiring badge */}
        <div className="mt-2 flex items-center gap-2">
          <Badge className="bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 text-xs">{fqhc.region}</Badge>
          {fqhc.jobCount > 0 && (
            <Badge className="bg-emerald-50 text-emerald-700 text-xs">
              <TrendingUp className="mr-0.5 size-3" /> {fqhc.jobCount} {isEs ? "empleos" : "jobs"}
            </Badge>
          )}
          {fqhc.hasGPTW && (
            <Badge className="bg-purple-50 text-purple-700 text-xs">
              <Award className="mr-0.5 size-3" /> GPTW
            </Badge>
          )}
        </div>

        {/* Mission preview */}
        {fqhc.missionStatement && (
          <p className="mt-2 text-xs text-stone-500 dark:text-stone-400 italic line-clamp-2 leading-relaxed">
            &ldquo;{fqhc.missionStatement.slice(0, 120)}{fqhc.missionStatement.length > 120 ? "..." : ""}&rdquo;
          </p>
        )}

        {/* Stats Grid */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-teal-50 dark:bg-teal-950 px-2 py-1.5">
            <p className="text-[10px] font-medium text-stone-500 dark:text-stone-400">{isEs ? "Pacientes" : "Patients"}</p>
            <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">{fqhc.patientCount}</p>
          </div>
          <div className="rounded-lg bg-amber-50 dark:bg-amber-950 px-2 py-1.5">
            <p className="text-[10px] font-medium text-stone-500 dark:text-stone-400">{isEs ? "Personal" : "Staff"}</p>
            <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">{fqhc.staffCount}</p>
          </div>
          <div className="rounded-lg bg-stone-50 dark:bg-stone-950 px-2 py-1.5">
            <p className="text-[10px] font-medium text-stone-500 dark:text-stone-400">EHR</p>
            <p className="text-xs font-semibold text-stone-700 dark:text-stone-300 truncate">{fqhc.ehrSystem === "Unknown" ? "—" : fqhc.ehrSystem.replace("OCHIN ", "")}</p>
          </div>
        </div>

        {/* Coverage risk */}
        {fqhc.coverageVulnerabilityPercent !== null && fqhc.coverageVulnerabilityPercent >= 20 && (
          <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-rose-50 px-2 py-1.5">
            <Users className="size-3.5 text-rose-600 shrink-0" />
            <p className="text-xs text-rose-700">
              <span className="font-semibold">~{fqhc.coverageVulnerabilityPercent}%</span>{" "}
              {isEs ? "pacientes en riesgo" : "at coverage risk"}
            </p>
          </div>
        )}

        {/* Glassdoor */}
        <div className="mt-3">
          <StarRating rating={fqhc.glassdoorRating} noRatingText={isEs ? "Sin calificación" : "No rating"} />
          {fqhc.glassdoorReviewCount && (
            <span className="ml-1 text-xs text-stone-500 dark:text-stone-400">({fqhc.glassdoorReviewCount})</span>
          )}
        </div>

        {/* Programs */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {fqhc.programs.slice(0, 2).map((prog) => (
            <Badge key={prog} className="bg-teal-50 dark:bg-teal-950 text-teal-800 text-xs">{prog}</Badge>
          ))}
          {fqhc.programs.length > 2 && (
            <Badge className="bg-stone-50 dark:bg-stone-950 text-stone-500 dark:text-stone-400 text-xs">+{fqhc.programs.length - 2}</Badge>
          )}
        </div>

        {/* Profile completeness indicator */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex gap-0.5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-1.5 w-4 rounded-full ${
                  fqhc.profileCompleteness >= (i + 1) * 25
                    ? "bg-teal-500"
                    : "bg-stone-200"
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] text-stone-400">
            {fqhc.profileCompleteness}% {isEs ? "completo" : "complete"}
          </span>
        </div>
      </div>

      {/* Footer — dual CTA */}
      <div className="mt-4 flex items-center gap-2 border-t border-stone-100 dark:border-stone-800 pt-3">
        <Link
          href={`/directory/${fqhc.slug}` as "/directory"}
          onClick={(e) => e.stopPropagation()}
          className="flex-1 text-sm font-medium text-teal-700 dark:text-teal-400 hover:text-teal-800 transition-colors"
        >
          {isEs ? "Ver Perfil" : "View Profile"} <ArrowRight className="ml-0.5 inline size-3" />
        </Link>
        <Link
          href={`/report/${fqhc.slug}` as "/report"}
          onClick={(e) => e.stopPropagation()}
          className="rounded-lg bg-stone-100 dark:bg-stone-800 px-3 py-1.5 text-xs font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-200 transition-colors"
        >
          {isEs ? "Reporte" : "Report"}
        </Link>
      </div>
    </div>
  );
}

function PaginationControls({ page, totalPages, setPage, isEs, total, pageSize }: {
  page: number;
  totalPages: number;
  setPage: (p: number) => void;
  isEs: boolean;
  total: number;
  pageSize: number;
}) {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  return (
    <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
      <p className="text-sm text-stone-500 dark:text-stone-400">
        {isEs ? `${start}-${end} de ${total}` : `${start}-${end} of ${total}`}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => { setPage(1); window.scrollTo({ top: 400, behavior: "smooth" }); }}
          disabled={page === 1}
          className="rounded-lg border border-stone-200 dark:border-stone-700 px-2.5 py-1.5 text-xs font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ««
        </button>
        <button
          onClick={() => { setPage(page - 1); window.scrollTo({ top: 400, behavior: "smooth" }); }}
          disabled={page === 1}
          className="rounded-lg border border-stone-200 dark:border-stone-700 px-3 py-1.5 text-xs font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {isEs ? "Anterior" : "Prev"}
        </button>
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          const p = totalPages <= 5 ? i + 1 : page <= 3 ? i + 1 : page >= totalPages - 2 ? totalPages - 4 + i : page - 2 + i;
          if (p < 1 || p > totalPages) return null;
          return (
            <button
              key={p}
              onClick={() => { setPage(p); window.scrollTo({ top: 400, behavior: "smooth" }); }}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                p === page ? "bg-teal-700 text-white" : "border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800"
              }`}
            >
              {p}
            </button>
          );
        })}
        <button
          onClick={() => { setPage(page + 1); window.scrollTo({ top: 400, behavior: "smooth" }); }}
          disabled={page === totalPages}
          className="rounded-lg border border-stone-200 dark:border-stone-700 px-3 py-1.5 text-xs font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {isEs ? "Siguiente" : "Next"}
        </button>
        <button
          onClick={() => { setPage(totalPages); window.scrollTo({ top: 400, behavior: "smooth" }); }}
          disabled={page === totalPages}
          className="rounded-lg border border-stone-200 dark:border-stone-700 px-2.5 py-1.5 text-xs font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          »»
        </button>
      </div>
    </div>
  );
}

function EmptyState({ isEs }: { isEs: boolean }) {
  return (
    <div className="mx-auto max-w-md py-20 text-center">
      <Building2 className="mx-auto mb-4 size-12 text-stone-300" />
      <h2 className="text-lg font-semibold text-stone-700 dark:text-stone-300">
        {isEs ? "No hay organizaciones que coincidan" : "No organizations match your filters"}
      </h2>
      <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
        {isEs ? "Intente ajustar su búsqueda." : "Try adjusting your search or filter criteria."}
      </p>
    </div>
  );
}
