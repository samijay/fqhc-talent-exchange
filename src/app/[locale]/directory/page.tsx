"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
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
  DollarSign,
  BadgeCheck,
  Briefcase,
  Globe,
  Phone,
  MapPin as MapPinIcon,
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
import {
  californiaFQHCs,
  regions,
  allPrograms,
  allEhrSystems,
  fqhcSalaryRanges,
  typicalFqhcBenefits,
} from "@/lib/california-fqhcs";
import type { CaliforniaFQHC } from "@/lib/california-fqhcs";
import DynamicMap from "@/components/directory/DynamicMap";
import CareerAssessment from "@/components/career-assessment/CareerAssessment";
import { getJobsForFqhc } from "@/lib/fqhc-job-listings";

type SortKey = "name" | "patientCount" | "siteCount" | "glassdoorRating" | "staffCount";
type SortDir = "asc" | "desc";
type ViewMode = "cards" | "table" | "map";

interface SampleJob {
  id: string;
  title: string;
  salaryMin: number;
  salaryMax: number;
}

function parseCount(str: string): number {
  return parseInt(str.replace(/[^0-9]/g, ""), 10) || 0;
}

function generateSampleJobs(fqhc: CaliforniaFQHC): SampleJob[] {
  // Base jobs that most FQHCs offer
  const baseJobs = [
    { title: "Community Health Worker", salaryMin: 44000, salaryMax: 60000 },
    { title: "Care Coordinator", salaryMin: 46000, salaryMax: 66000 },
    { title: "Medical Assistant", salaryMin: 40000, salaryMax: 60000 },
  ];

  // Add ECM-specific jobs if applicable
  let jobs = [...baseJobs];
  if (fqhc.ecmProvider && fqhc.programs.includes("ECM")) {
    jobs.push({
      title: "Care Coordinator - ECM Program",
      salaryMin: 50000,
      salaryMax: 70000,
    });
  }

  // Add CCM-specific jobs if applicable
  if (fqhc.programs.includes("CCM")) {
    jobs.push({
      title: "Case Manager - CCM",
      salaryMin: 47000,
      salaryMax: 82000,
    });
  }

  // Add BH-specific jobs if applicable
  if (fqhc.programs.includes("BH Integration")) {
    jobs.push({
      title: "Behavioral Health Specialist",
      salaryMin: 50000,
      salaryMax: 75000,
    });
  }

  // Take top 3 most relevant jobs, randomizing slightly based on FQHC ID
  const hash = fqhc.slug.charCodeAt(0);
  const shuffled = jobs.sort(() => (hash % 2 === 0 ? -1 : 1));
  const selected = shuffled.slice(0, 3);

  // Assign unique IDs
  return selected.map((job, idx) => ({
    ...job,
    id: `${fqhc.slug}-${idx}`,
  }));
}

function StarRating({ rating, noRatingText }: { rating: number | null; noRatingText?: string }) {
  if (rating === null) return <span className="text-xs text-stone-400">{noRatingText || "No rating"}</span>;
  const full = Math.floor(rating);
  const half = rating - full >= 0.3;
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
      ))}
      {half && <Star className="size-3.5 fill-amber-400/50 text-amber-400" />}
      <span className="ml-1 text-sm font-medium text-stone-700">{rating.toFixed(1)}</span>
    </span>
  );
}

export default function DirectoryPage() {
  const locale = useLocale();
  const isEs = locale === "es";

  const t = {
    // Hero
    heroTitle: isEs ? "Directorio de FQHCs en California" : "California FQHC Directory",
    heroSubtitle: isEs
      ? `Explore ${californiaFQHCs.length} Centros de Salud Calificados Federalmente en California — con datos de personal, calificaciones de Glassdoor, estado ECM y un mapa interactivo.`
      : `Explore ${californiaFQHCs.length} Federally Qualified Health Centers across California — with staff data, Glassdoor ratings, ECM status, and an interactive map.`,
    organizations: isEs ? "Organizaciones" : "Organizations",
    regions: isEs ? "Regiones" : "Regions",
    healthCenterSites: isEs ? "Sitios de Salud" : "Health Center Sites",
    ecmProviders: isEs ? "Proveedores ECM" : "ECM Providers",
    // Salary & Benefits
    salaryTitle: isEs ? "Rangos Salariales de FQHC (California)" : "FQHC Salary Ranges (California)",
    salarySource: isEs
      ? "Basado en datos de Glassdoor, Indeed y ZipRecruiter para FQHCs de California (2026)"
      : "Based on Glassdoor, Indeed, and ZipRecruiter data for California FQHCs (2026)",
    benefitsTitle: isEs ? "Beneficios Típicos de FQHC" : "Typical FQHC Benefits",
    // Filters
    searchPlaceholder: isEs ? "Buscar por nombre, ciudad o condado..." : "Search by name, city, or county...",
    allRegions: isEs ? "Todas las Regiones" : "All Regions",
    allEhrSystems: isEs ? "Todos los Sistemas EHR" : "All EHR Systems",
    allPrograms: isEs ? "Todos los Programas" : "All Programs",
    ecmOnly: isEs ? "Solo Proveedores ECM" : "ECM Providers Only",
    nameAZ: isEs ? "Nombre (A-Z)" : "Name (A-Z)",
    nameZA: isEs ? "Nombre (Z-A)" : "Name (Z-A)",
    mostPatients: isEs ? "Más Pacientes" : "Most Patients",
    mostSites: isEs ? "Más Sitios" : "Most Sites",
    largestStaff: isEs ? "Mayor Personal" : "Largest Staff",
    highestRated: isEs ? "Mejor Calificados" : "Highest Rated",
    showing: (filtered: number, total: number) =>
      isEs ? `Mostrando ${filtered} de ${total} organizaciones` : `Showing ${filtered} of ${total} organizations`,
    // Table
    organization: isEs ? "Organización" : "Organization",
    location: isEs ? "Ubicación" : "Location",
    sites: isEs ? "Sitios" : "Sites",
    patients: isEs ? "Pacientes" : "Patients",
    staff: isEs ? "Personal" : "Staff",
    rating: isEs ? "Calificación" : "Rating",
    noRating: isEs ? "Sin calificación" : "No rating",
    // Sheet modal
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
    programsOffered: isEs ? "Programas Ofrecidos" : "Programs Offered",
    findYourRole: isEs ? "Encuentre su Puesto Aquí" : "Find Your Role Here",
    findYourRoleDesc: (name: string) =>
      isEs
        ? `Realice una evaluación de carrera rápida de 5 preguntas para ver qué tan bien coincide con ${name} y obtener sugerencias de roles personalizadas.`
        : `Take a quick 5-question career screener to see how well you match with ${name} and get personalized role suggestions.`,
    takeScreener: isEs ? "Realizar Evaluación" : "Take Career Screener",
    viewFullProfile: isEs ? "Ver Perfil Completo" : "View Full Profile",
    openPositions: (count: number) => isEs ? `Posiciones Abiertas (${count})` : `Open Positions (${count})`,
    viewCareers: isEs ? "Ver Página de Carreras" : "View Careers Page",
    visitWebsite: isEs ? "Visitar Sitio Web" : "Visit Website",
    bilingual: isEs ? "Bilingüe" : "Bilingual",
    // Empty state
    noResults: isEs ? "No hay organizaciones que coincidan con sus filtros" : "No organizations match your filters",
    noResultsHint: isEs ? "Intente ajustar su búsqueda o criterios de filtro." : "Try adjusting your search or filter criteria.",
    // Coverage vulnerability & funding impact
    highImpact: isEs ? "Alto Impacto" : "High Impact",
    moderateImpact: isEs ? "Impacto Moderado" : "Moderate Impact",
    lowImpact: isEs ? "Bajo Impacto" : "Low Impact",
    fundingImpact: isEs ? "Vulnerabilidad de Financiamiento" : "Funding Vulnerability",
    coverageRisk: isEs ? "Pacientes en Riesgo de Cobertura" : "Patients at Coverage Risk",
    coverageRiskDesc: isEs
      ? "Porcentaje estimado de pacientes en riesgo de perder cobertura de Medi-Cal debido a cambios en políticas federales y estatales"
      : "Estimated percentage of patients at risk of losing Medi-Cal coverage due to federal and state policy changes",
    highImpactOnly: isEs ? "Alto Riesgo de Financiamiento" : "High Funding Risk",
    missionLabel: isEs ? "Misión" : "Mission",
    // CTA
    ctaTitle: isEs ? "¿Listo para Unirse a la Red?" : "Ready to Join the Network?",
    ctaSubtitle: isEs
      ? "Ya sea un profesional de salud buscando su próximo puesto o un FQHC con posiciones para cubrir, estamos aquí para conectarlo."
      : "Whether you're a health professional looking for your next role or an FQHC with positions to fill, we're here to connect you.",
    findAJob: isEs ? "Buscar Empleo" : "Find a Job",
    hireTalent: isEs ? "Contratar Talento" : "Hire Talent",
  };

  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("All Regions");
  const [ehrFilter, setEhrFilter] = useState("All EHR Systems");
  const [programFilter, setProgramFilter] = useState("All Programs");
  const [ecmOnly, setEcmOnly] = useState(false);
  const [highImpactOnly, setHighImpactOnly] = useState(false);
  const [view, setView] = useState<ViewMode>("cards");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [showSalary, setShowSalary] = useState(true);
  const [showBenefits, setShowBenefits] = useState(true);
  const [selectedFqhc, setSelectedFqhc] = useState<CaliforniaFQHC | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);

  const filtered = useMemo(() => {
    let list = [...californiaFQHCs];

    if (regionFilter !== "All Regions") {
      list = list.filter((f) => f.region === regionFilter);
    }
    if (ehrFilter !== "All EHR Systems") {
      list = list.filter((f) => f.ehrSystem === ehrFilter);
    }
    if (programFilter !== "All Programs") {
      list = list.filter((f) => f.programs.includes(programFilter));
    }
    if (ecmOnly) {
      list = list.filter((f) => f.ecmProvider);
    }
    if (highImpactOnly) {
      list = list.filter((f) => f.fundingImpactLevel === "high");
    }
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

    // Sort
    list.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "name":
          cmp = a.name.localeCompare(b.name);
          break;
        case "patientCount":
          cmp = parseCount(a.patientCount) - parseCount(b.patientCount);
          break;
        case "siteCount":
          cmp = a.siteCount - b.siteCount;
          break;
        case "staffCount":
          cmp = parseCount(a.staffCount) - parseCount(b.staffCount);
          break;
        case "glassdoorRating":
          cmp = (a.glassdoorRating ?? 0) - (b.glassdoorRating ?? 0);
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return list;
  }, [search, regionFilter, ehrFilter, programFilter, ecmOnly, highImpactOnly, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "name" ? "asc" : "desc");
    }
  }

  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    californiaFQHCs.forEach((f) => {
      counts[f.region] = (counts[f.region] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 py-14 text-center text-white sm:py-20">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          {t.heroTitle}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-teal-100/80 sm:text-lg">
          {t.heroSubtitle}
        </p>

        {/* Quick stats */}
        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-6 text-sm sm:text-base">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold sm:text-3xl">{californiaFQHCs.length}</span>
            <span className="text-teal-200">{t.organizations}</span>
          </div>
          <div className="h-8 w-px bg-teal-500/50" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold sm:text-3xl">{regions.length}</span>
            <span className="text-teal-200">{t.regions}</span>
          </div>
          <div className="h-8 w-px bg-teal-500/50" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold sm:text-3xl">
              {californiaFQHCs.reduce((sum, f) => sum + f.siteCount, 0).toLocaleString()}+
            </span>
            <span className="text-teal-200">{t.healthCenterSites}</span>
          </div>
          <div className="h-8 w-px bg-teal-500/50" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold sm:text-3xl">
              {californiaFQHCs.filter((f) => f.ecmProvider).length}
            </span>
            <span className="text-teal-200">{t.ecmProviders}</span>
          </div>
        </div>
      </section>

      {/* Salary & Benefits Quick Reference (collapsible) */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Salary Card */}
          <div className="rounded-xl border border-stone-200 bg-white shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setShowSalary(!showSalary)}
              className="flex w-full items-center justify-between p-4 text-left bg-white hover:bg-stone-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              <div className="flex items-center gap-2">
                <DollarSign className="size-5 text-teal-700" />
                <span className="font-semibold text-stone-900">{t.salaryTitle}</span>
              </div>
              {showSalary ? <ChevronUp className="size-4 text-stone-400" /> : <ChevronDown className="size-4 text-stone-400" />}
            </button>
            {showSalary && (
              <div className="border-t border-stone-100 bg-white p-4">
                <div className="space-y-2">
                  {Object.entries(fqhcSalaryRanges).map(([role, data]) => (
                    <div key={role} className="flex items-center justify-between text-sm">
                      <span className="text-stone-600">{role}</span>
                      <span className="font-medium text-stone-900">
                        ${(data.min / 1000).toFixed(0)}k – ${(data.max / 1000).toFixed(0)}k
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs text-stone-400">
                  {t.salarySource}
                </p>
              </div>
            )}
          </div>

          {/* Benefits Card */}
          <div className="rounded-xl border border-stone-200 bg-white shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setShowBenefits(!showBenefits)}
              className="flex w-full items-center justify-between p-4 text-left bg-white hover:bg-stone-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              <div className="flex items-center gap-2">
                <Heart className="size-5 text-teal-700" />
                <span className="font-semibold text-stone-900">{t.benefitsTitle}</span>
              </div>
              {showBenefits ? <ChevronUp className="size-4 text-stone-400" /> : <ChevronDown className="size-4 text-stone-400" />}
            </button>
            {showBenefits && (
              <div className="border-t border-stone-100 bg-white p-4">
                <div className="space-y-1.5">
                  {typicalFqhcBenefits.map((b) => (
                    <div key={b} className="flex items-start gap-2 text-sm text-stone-600">
                      <BadgeCheck className="mt-0.5 size-3.5 shrink-0 text-teal-500" />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filters + View Toggle */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
            <Input
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 pl-10"
            />
          </div>

          {/* Region filter */}
          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="h-11 w-full sm:w-44">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Regions">{t.allRegions}</SelectItem>
              {regions.map((r) => (
                <SelectItem key={r} value={r}>
                  {r} ({regionCounts[r] || 0})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* EHR filter */}
          <Select value={ehrFilter} onValueChange={setEhrFilter}>
            <SelectTrigger className="h-11 w-full sm:w-44">
              <SelectValue placeholder="EHR System" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All EHR Systems">{t.allEhrSystems}</SelectItem>
              {allEhrSystems.map((e) => (
                <SelectItem key={e} value={e}>
                  {e}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Program filter */}
          <Select value={programFilter} onValueChange={setProgramFilter}>
            <SelectTrigger className="h-11 w-full sm:w-48">
              <SelectValue placeholder="Program" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Programs">{t.allPrograms}</SelectItem>
              {allPrograms.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Second row: ECM toggle, sort, view toggle */}
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {/* ECM toggle */}
          <button
            onClick={() => setEcmOnly(!ecmOnly)}
            className={`flex items-center justify-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
              ecmOnly
                ? "border-teal-700 bg-teal-50 text-teal-800"
                : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
            }`}
          >
            <Shield className="size-3.5" />
            {t.ecmOnly}
          </button>

          {/* High Funding Impact toggle */}
          <button
            onClick={() => setHighImpactOnly(!highImpactOnly)}
            className={`flex items-center justify-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
              highImpactOnly
                ? "border-amber-600 bg-amber-50 text-amber-800"
                : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
            }`}
          >
            <Heart className="size-3.5" />
            {t.highImpactOnly}
          </button>

          {/* Sort */}
          <Select value={`${sortKey}-${sortDir}`} onValueChange={(v) => {
            const [key, dir] = v.split("-") as [SortKey, SortDir];
            setSortKey(key);
            setSortDir(dir);
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
            </SelectContent>
          </Select>

          <div className="flex items-center justify-center gap-1 rounded-lg border border-stone-200 bg-white p-0.5 sm:ml-auto">
            <button
              onClick={() => setView("cards")}
              className={`rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                view === "cards" ? "bg-teal-700 text-white" : "text-stone-500 hover:text-stone-700"
              }`}
              title="Card view"
            >
              <LayoutGrid className="size-4" />
            </button>
            <button
              onClick={() => setView("table")}
              className={`rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                view === "table" ? "bg-teal-700 text-white" : "text-stone-500 hover:text-stone-700"
              }`}
              title="Table view"
            >
              <List className="size-4" />
            </button>
            <button
              onClick={() => setView("map")}
              className={`rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                view === "map" ? "bg-teal-700 text-white" : "text-stone-500 hover:text-stone-700"
              }`}
              title="Map view"
            >
              <Map className="size-4" />
            </button>
          </div>
        </div>

        <p className="mt-4 text-sm text-stone-500">
          {t.showing(filtered.length, californiaFQHCs.length)}
        </p>
      </div>

      {/* Content Area */}
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        {/* Map View */}
        {view === "map" && (
          <div className="mb-8 overflow-hidden rounded-xl border border-stone-200 shadow-sm">
            <DynamicMap fqhcs={filtered} locale={locale} />
          </div>
        )}

        {/* Card View */}
        {view === "cards" && (
          <>
            {filtered.length === 0 ? (
              <EmptyState isEs={isEs} />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((fqhc) => (
                  <FQHCCard
                    key={fqhc.slug}
                    fqhc={fqhc}
                    isEs={isEs}
                    onViewDetails={() => {
                      setSelectedFqhc(fqhc);
                      setDetailsOpen(true);
                    }}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Table View */}
        {view === "table" && (
          <>
            {filtered.length === 0 ? (
              <EmptyState isEs={isEs} />
            ) : (
              <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-stone-100 bg-stone-50/50">
                      <th
                        className="cursor-pointer px-4 py-3 font-semibold text-stone-700 hover:text-teal-800"
                        onClick={() => toggleSort("name")}
                      >
                        <span className="flex items-center gap-1">
                          {t.organization}
                          {sortKey === "name" && (sortDir === "asc" ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />)}
                        </span>
                      </th>
                      <th className="px-4 py-3 font-semibold text-stone-700">{t.location}</th>
                      <th
                        className="cursor-pointer px-4 py-3 font-semibold text-stone-700 hover:text-teal-800"
                        onClick={() => toggleSort("siteCount")}
                      >
                        <span className="flex items-center gap-1">
                          {t.sites}
                          {sortKey === "siteCount" && (sortDir === "asc" ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />)}
                        </span>
                      </th>
                      <th
                        className="cursor-pointer px-4 py-3 font-semibold text-stone-700 hover:text-teal-800"
                        onClick={() => toggleSort("patientCount")}
                      >
                        <span className="flex items-center gap-1">
                          {t.patients}
                          {sortKey === "patientCount" && (sortDir === "asc" ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />)}
                        </span>
                      </th>
                      <th
                        className="cursor-pointer px-4 py-3 font-semibold text-stone-700 hover:text-teal-800"
                        onClick={() => toggleSort("staffCount")}
                      >
                        <span className="flex items-center gap-1">
                          {t.staff}
                          {sortKey === "staffCount" && (sortDir === "asc" ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />)}
                        </span>
                      </th>
                      <th className="px-4 py-3 font-semibold text-stone-700">EHR</th>
                      <th
                        className="cursor-pointer px-4 py-3 font-semibold text-stone-700 hover:text-teal-800"
                        onClick={() => toggleSort("glassdoorRating")}
                      >
                        <span className="flex items-center gap-1">
                          {t.rating}
                          {sortKey === "glassdoorRating" && (sortDir === "asc" ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />)}
                        </span>
                      </th>
                      <th className="px-4 py-3 font-semibold text-stone-700">ECM</th>
                      <th className="px-4 py-3 font-semibold text-stone-700">{t.programsOffered}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((fqhc, i) => (
                      <tr
                        key={fqhc.slug}
                        className={`border-b border-stone-50 transition-colors hover:bg-stone-50/80 ${
                          i % 2 === 0 ? "" : "bg-stone-50/30"
                        }`}
                      >
                        <td className="px-4 py-3">
                          <Link
                            href={`/directory/${fqhc.slug}` as "/directory"}
                            className="font-medium text-teal-800 hover:text-teal-900 hover:underline"
                          >
                            {fqhc.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-stone-600">
                          {fqhc.city}, {fqhc.county}
                        </td>
                        <td className="px-4 py-3 text-stone-700 font-medium">{fqhc.siteCount}</td>
                        <td className="px-4 py-3 text-stone-700">{fqhc.patientCount}</td>
                        <td className="px-4 py-3 text-stone-700">{fqhc.staffCount}</td>
                        <td className="px-4 py-3">
                          <Badge className="bg-stone-100 text-stone-600 text-xs whitespace-nowrap">
                            {fqhc.ehrSystem}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <StarRating rating={fqhc.glassdoorRating} noRatingText={t.noRating} />
                          {fqhc.glassdoorReviewCount && (
                            <span className="ml-1 text-xs text-stone-400">
                              ({fqhc.glassdoorReviewCount})
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {fqhc.ecmProvider ? (
                            <Badge className="bg-teal-50 text-teal-800 text-xs">ECM</Badge>
                          ) : (
                            <span className="text-xs text-stone-400">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {fqhc.programs.slice(0, 2).map((p) => (
                              <Badge key={p} className="bg-stone-50 text-stone-500 text-xs">
                                {p}
                              </Badge>
                            ))}
                            {fqhc.programs.length > 2 && (
                              <span className="text-xs text-stone-400">
                                +{fqhc.programs.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* Details Sheet */}
        {selectedFqhc && (
          <Sheet open={detailsOpen} onOpenChange={setDetailsOpen}>
            <SheetContent className="w-full overflow-y-auto">
              <SheetHeader>
                <div className="flex-1">
                  <SheetTitle className="text-2xl">{selectedFqhc.name}</SheetTitle>
                  <p className="mt-1 text-sm text-stone-500">{selectedFqhc.region}</p>
                </div>
                <SheetClose />
              </SheetHeader>

              <div className="space-y-6 px-6 py-4">
                {/* Organization Details */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-stone-900">{t.orgDetails}</h3>
                  <div className="space-y-2">
                    {selectedFqhc.website && (
                      <div className="flex items-start gap-3">
                        <Globe className="mt-0.5 size-4 text-teal-700 shrink-0" />
                        <a
                          href={selectedFqhc.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-teal-700 hover:text-teal-800 break-all"
                        >
                          {selectedFqhc.website}
                        </a>
                      </div>
                    )}
                    <div className="flex items-start gap-3">
                      <MapPinIcon className="mt-0.5 size-4 text-teal-700 shrink-0" />
                      <div className="text-sm text-stone-600">
                        {selectedFqhc.city}, {isEs ? `Condado de ${selectedFqhc.county}` : `${selectedFqhc.county} County`}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Stats */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-stone-900">{t.keyStats}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-teal-50 p-3">
                      <p className="text-xs font-medium text-stone-500">{t.patientCount}</p>
                      <p className="mt-1 text-sm font-semibold text-stone-900">
                        {selectedFqhc.patientCount}
                      </p>
                    </div>
                    <div className="rounded-lg bg-amber-50 p-3">
                      <p className="text-xs font-medium text-stone-500">{t.staffCount}</p>
                      <p className="mt-1 text-sm font-semibold text-stone-900">
                        {selectedFqhc.staffCount}
                      </p>
                    </div>
                    <div className="rounded-lg bg-teal-50 p-3">
                      <p className="text-xs font-medium text-stone-500">{t.healthSites}</p>
                      <p className="mt-1 text-sm font-semibold text-stone-900">
                        {selectedFqhc.siteCount}
                      </p>
                    </div>
                    <div className="rounded-lg bg-amber-50 p-3">
                      <p className="text-xs font-medium text-stone-500">{t.glassdoorRating}</p>
                      <p className="mt-1 text-sm font-semibold text-stone-900">
                        <StarRating rating={selectedFqhc.glassdoorRating} noRatingText={t.noRating} />
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mission Statement */}
                {selectedFqhc.missionStatement && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-stone-900">{t.missionLabel}</h3>
                    <div className="rounded-lg border-l-4 border-teal-600 bg-teal-50/50 px-4 py-3">
                      <p className="text-sm text-stone-700 italic leading-relaxed">
                        &ldquo;{selectedFqhc.missionStatement}&rdquo;
                      </p>
                    </div>
                  </div>
                )}

                {/* About */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-stone-900">{t.about}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {selectedFqhc.description}
                  </p>
                </div>

                {/* Coverage Vulnerability / Funding Risk */}
                {selectedFqhc.coverageVulnerabilityPercent !== null && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-stone-900">{t.fundingImpact}</h3>
                    <div className={`rounded-lg border p-4 ${
                      selectedFqhc.fundingImpactLevel === "high"
                        ? "border-rose-200 bg-rose-50"
                        : selectedFqhc.fundingImpactLevel === "moderate"
                          ? "border-amber-200 bg-amber-50"
                          : "border-stone-200 bg-stone-50"
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className={`size-4 ${
                            selectedFqhc.fundingImpactLevel === "high"
                              ? "text-rose-600"
                              : selectedFqhc.fundingImpactLevel === "moderate"
                                ? "text-amber-600"
                                : "text-stone-500"
                          }`} />
                          <span className="text-sm font-medium text-stone-900">
                            {t.coverageRisk}
                          </span>
                        </div>
                        <span className={`text-lg font-bold ${
                          selectedFqhc.fundingImpactLevel === "high"
                            ? "text-rose-700"
                            : selectedFqhc.fundingImpactLevel === "moderate"
                              ? "text-amber-700"
                              : "text-stone-600"
                        }`}>
                          ~{selectedFqhc.coverageVulnerabilityPercent}%
                        </span>
                      </div>
                      <div className="mt-2">
                        <div className="h-2 rounded-full bg-stone-200 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              selectedFqhc.fundingImpactLevel === "high"
                                ? "bg-rose-500"
                                : selectedFqhc.fundingImpactLevel === "moderate"
                                  ? "bg-amber-500"
                                  : "bg-stone-400"
                            }`}
                            style={{ width: `${selectedFqhc.coverageVulnerabilityPercent}%` }}
                          />
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-1.5">
                        <Badge className={`text-xs ${
                          selectedFqhc.fundingImpactLevel === "high"
                            ? "bg-rose-100 text-rose-700"
                            : selectedFqhc.fundingImpactLevel === "moderate"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-stone-100 text-stone-600"
                        }`}>
                          {selectedFqhc.fundingImpactLevel === "high"
                            ? t.highImpact
                            : selectedFqhc.fundingImpactLevel === "moderate"
                              ? t.moderateImpact
                              : t.lowImpact}
                        </Badge>
                      </div>
                      <p className="mt-2 text-xs text-stone-500">
                        {t.coverageRiskDesc}
                      </p>
                    </div>
                    <Link
                      href="/funding-impact"
                      className="inline-flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-800"
                    >
                      {isEs ? "Ver Panel de Impacto Financiero" : "View Funding Impact Dashboard"} <ArrowRight className="size-3" />
                    </Link>
                  </div>
                )}

                {/* EHR & Certifications */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-stone-900">{t.techCerts}</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-stone-100 text-stone-700">
                      <Monitor className="mr-1 size-3" />
                      {selectedFqhc.ehrSystem}
                    </Badge>
                    {selectedFqhc.ecmProvider && (
                      <Badge className="bg-teal-50 text-teal-800">
                        <Shield className="mr-0.5 size-3" />
                        {t.ecmProvider}
                      </Badge>
                    )}
                    {selectedFqhc.nhscApproved && (
                      <Badge className="bg-amber-50 text-amber-700">
                        <GraduationCap className="mr-0.5 size-3" />
                        {t.nhscApproved}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Programs */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-stone-900">{t.programsOffered}</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedFqhc.programs.map((prog) => (
                      <Badge key={prog} className="bg-teal-50 text-teal-800">
                        {prog}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Career Assessment CTA */}
                <div className="border-t border-stone-100 pt-6">
                  <div className="rounded-xl bg-gradient-to-br from-teal-50 to-amber-50 p-6 border border-teal-200">
                    <h3 className="font-semibold text-stone-900 text-lg mb-2">
                      {t.findYourRole}
                    </h3>
                    <p className="text-sm text-stone-600 mb-4">
                      {t.findYourRoleDesc(selectedFqhc.name)}
                    </p>
                    <Button
                      className="w-full bg-gradient-to-r from-teal-700 to-amber-600 text-white hover:shadow-lg"
                      onClick={() => {
                        setDetailsOpen(false);
                        setShowAssessment(true);
                      }}
                    >
                      {t.takeScreener} <ArrowRight className="ml-2 size-4" />
                    </Button>
                  </div>
                </div>

                {/* View Full Profile Link */}
                <div className="border-t border-stone-100 pt-4">
                  <Button
                    className="w-full border border-teal-300 bg-teal-50 text-teal-700 hover:bg-teal-100"
                    asChild
                  >
                    <Link href={`/directory/${selectedFqhc.slug}` as "/directory"}>
                      {t.viewFullProfile} <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                </div>

                {/* Job Listings */}
                <div className="space-y-3 border-t border-stone-100 pt-6">
                  <h3 className="font-semibold text-stone-900">
                    {t.openPositions(getJobsForFqhc(selectedFqhc.slug).length || generateSampleJobs(selectedFqhc).length)}
                  </h3>
                  <div className="space-y-3">
                    {(getJobsForFqhc(selectedFqhc.slug).length > 0
                      ? getJobsForFqhc(selectedFqhc.slug).map((job) => (
                          <div
                            key={job.id}
                            className="rounded-lg border border-stone-200 bg-stone-50 p-4"
                          >
                            <div className="flex items-start gap-3">
                              <Briefcase className="mt-0.5 size-4 text-teal-700 shrink-0" />
                              <div className="flex-1">
                                <h4 className="font-semibold text-stone-900">{job.title}</h4>
                                <div className="mt-1 flex flex-wrap items-center gap-2">
                                  <span className="text-sm font-medium text-teal-800">
                                    ${(job.salaryMin / 1000).toFixed(0)}k – ${(job.salaryMax / 1000).toFixed(0)}k
                                  </span>
                                  <Badge className="bg-stone-100 text-stone-600 text-xs">{job.type}</Badge>
                                  {job.bilingual && (
                                    <Badge className="bg-amber-50 text-amber-700 text-xs">{t.bilingual}</Badge>
                                  )}
                                </div>
                                <p className="mt-1.5 text-xs text-stone-500">{job.department}</p>
                              </div>
                            </div>
                            <div className="mt-3">
                              <Button
                                size="sm"
                                className="w-full bg-amber-500 text-stone-900 hover:bg-amber-400"
                                onClick={() => {
                                  setDetailsOpen(false);
                                  setShowAssessment(true);
                                }}
                              >
                                {t.takeScreener} <ArrowRight className="ml-1 size-3" />
                              </Button>
                            </div>
                          </div>
                        ))
                      : generateSampleJobs(selectedFqhc).map((job) => (
                          <div
                            key={job.id}
                            className="rounded-lg border border-stone-200 bg-stone-50 p-4"
                          >
                            <div className="flex items-start gap-3">
                              <Briefcase className="mt-0.5 size-4 text-teal-700 shrink-0" />
                              <div className="flex-1">
                                <h4 className="font-semibold text-stone-900">{job.title}</h4>
                                <p className="mt-1 text-sm font-medium text-teal-800">
                                  ${(job.salaryMin / 1000).toFixed(0)}k – ${(job.salaryMax / 1000).toFixed(0)}k
                                </p>
                              </div>
                            </div>
                            <div className="mt-3">
                              <Button
                                size="sm"
                                className="w-full bg-amber-500 text-stone-900 hover:bg-amber-400"
                                onClick={() => {
                                  setDetailsOpen(false);
                                  setShowAssessment(true);
                                }}
                              >
                                {t.takeScreener} <ArrowRight className="ml-1 size-3" />
                              </Button>
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                </div>

                {/* Benefits Summary */}
                <div className="space-y-3 border-t border-stone-100 pt-6">
                  <h3 className="font-semibold text-stone-900">{t.benefitsTitle}</h3>
                  <div className="space-y-2">
                    {typicalFqhcBenefits.slice(0, 5).map((b) => (
                      <div key={b} className="flex items-start gap-2 text-sm text-stone-600">
                        <BadgeCheck className="mt-0.5 size-3.5 shrink-0 text-amber-500" />
                        {b}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to Action */}
                <div className="space-y-3 border-t border-stone-100 pt-6">
                  {selectedFqhc.careersUrl && (
                    <Button
                      className="w-full border border-teal-300 bg-teal-50 text-teal-800 hover:bg-teal-100"
                      asChild
                    >
                      <a href={selectedFqhc.careersUrl} target="_blank" rel="noopener noreferrer">
                        {t.viewCareers} <ExternalLink className="ml-2 size-4" />
                      </a>
                    </Button>
                  )}
                  <Button
                    className="w-full border border-stone-300 bg-stone-50 text-stone-700 hover:bg-stone-100"
                    asChild
                  >
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
          <div className="fixed inset-0 z-[60] overflow-y-auto bg-white">
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
            {t.ctaTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-teal-100/80 sm:text-lg">
            {t.ctaSubtitle}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-amber-500 text-stone-900 shadow-lg hover:bg-amber-400"
              asChild
            >
              <Link href="/resume-builder">
                {isEs ? "Crear Tu CV" : "Build Your Resume"} <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              className="border border-white/40 bg-white/10 text-white hover:bg-white/20"
              asChild
            >
              <Link href="/hire">{t.hireTalent}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FQHCCard({
  fqhc,
  onViewDetails,
  isEs,
}: {
  fqhc: CaliforniaFQHC;
  onViewDetails?: () => void;
  isEs: boolean;
}) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-teal-300 cursor-pointer group"
      onClick={onViewDetails}
    >
      <div>
        {/* Header with badges */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-stone-900 leading-tight group-hover:text-teal-800 transition-colors">
            {fqhc.name}
          </h3>
          <div className="flex shrink-0 flex-col items-end gap-1">
            {fqhc.ecmProvider && (
              <Badge className="bg-teal-50 text-teal-800 text-xs">
                <Shield className="mr-0.5 size-3" /> ECM
              </Badge>
            )}
            {fqhc.fundingImpactLevel === "high" && (
              <Badge className="bg-amber-50 text-amber-700 text-xs">
                <Heart className="mr-0.5 size-3" /> {isEs ? "Alto Impacto" : "High Impact"}
              </Badge>
            )}
          </div>
        </div>

        {/* Location and Region */}
        <div className="mt-2 flex items-center gap-1.5 text-sm text-stone-500">
          <MapPin className="size-3.5" />
          {fqhc.city}, {fqhc.county}
        </div>

        {/* Region Badge */}
        <div className="mt-2">
          <Badge className="bg-stone-100 text-stone-600 text-xs">
            {fqhc.region}
          </Badge>
        </div>

        {/* Key Stats Grid */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-teal-50 px-2 py-1.5">
            <p className="text-xs font-medium text-stone-500">{isEs ? "Pacientes" : "Patients"}</p>
            <p className="text-sm font-semibold text-stone-900">{fqhc.patientCount}</p>
          </div>
          <div className="rounded-lg bg-amber-50 px-2 py-1.5">
            <p className="text-xs font-medium text-stone-500">{isEs ? "Personal" : "Staff"}</p>
            <p className="text-sm font-semibold text-stone-900">{fqhc.staffCount}</p>
          </div>
        </div>

        {/* Coverage vulnerability indicator */}
        {fqhc.coverageVulnerabilityPercent !== null && fqhc.coverageVulnerabilityPercent >= 20 && (
          <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-rose-50 px-2 py-1.5">
            <Users className="size-3.5 text-rose-600 shrink-0" />
            <p className="text-xs text-rose-700">
              <span className="font-semibold">~{fqhc.coverageVulnerabilityPercent}%</span>{" "}
              {isEs ? "pacientes en riesgo de cobertura" : "patients at coverage risk"}
            </p>
          </div>
        )}

        {/* Glassdoor Rating */}
        <div className="mt-3">
          <StarRating rating={fqhc.glassdoorRating} noRatingText={isEs ? "Sin calificación" : "No rating"} />
          {fqhc.glassdoorReviewCount && (
            <span className="ml-1 text-xs text-stone-400">
              ({fqhc.glassdoorReviewCount})
            </span>
          )}
        </div>

        {/* Programs Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {fqhc.programs.slice(0, 2).map((prog) => (
            <Badge
              key={prog}
              className="bg-teal-50 text-teal-800 text-xs"
            >
              {prog}
            </Badge>
          ))}
          {fqhc.programs.length > 2 && (
            <Badge className="bg-stone-50 text-stone-500 text-xs">
              +{fqhc.programs.length - 2}
            </Badge>
          )}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails?.();
          }}
          className="flex-1 text-sm font-medium text-teal-700 hover:text-teal-800 transition-colors text-left"
        >
          {isEs ? "Ver Detalles" : "View Details"} <ArrowRight className="ml-1 inline size-3" />
        </button>
      </div>
    </div>
  );
}

function EmptyState({ isEs }: { isEs: boolean }) {
  return (
    <div className="mx-auto max-w-md py-20 text-center">
      <Building2 className="mx-auto mb-4 size-12 text-stone-300" />
      <h2 className="text-lg font-semibold text-stone-700">
        {isEs ? "No hay organizaciones que coincidan con sus filtros" : "No organizations match your filters"}
      </h2>
      <p className="mt-2 text-sm text-stone-500">
        {isEs ? "Intente ajustar su búsqueda o criterios de filtro." : "Try adjusting your search or filter criteria."}
      </p>
    </div>
  );
}
