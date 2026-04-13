"use client";

import { useState, useMemo, useCallback, useEffect, Suspense } from "react";
import { useLocale } from "next-intl";
import { useSearchParams, useRouter } from "next/navigation";
import { Link } from "@/i18n/navigation";
import {
  Search,
  TrendingUp,
  MapPin,
  Users,
  ArrowUpDown,
  ArrowRight,
  DollarSign,
  BarChart3,
  Briefcase,
  Award,
  Download,
  Lightbulb,
  FileDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import { TableOfContents } from "@/components/layout/TableOfContents";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SALARY_BENCHMARKS } from "@/lib/job-posting-templates";
import {
  CAREER_PATHWAYS,
  REGIONAL_MULTIPLIERS,
  adjustSalary,
} from "@/lib/career-pathways";
import { downloadCSV } from "@/lib/csv-export";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function fmt(amount: number): string {
  return `$${Math.round(amount / 1000)}k`;
}

// Map each roleId to a department for filtering/display
const ROLE_DEPARTMENTS: Record<string, { en: string; es: string }> = {
  chw: { en: "Care Coordination", es: "Coordinacion de Cuidado" },
  care_coordinator: { en: "Care Coordination", es: "Coordinacion de Cuidado" },
  case_manager: { en: "Care Coordination", es: "Coordinacion de Cuidado" },
  patient_navigator: { en: "Care Coordination", es: "Coordinacion de Cuidado" },
  health_educator: { en: "Care Coordination", es: "Coordinacion de Cuidado" },
  referral_coordinator: { en: "Care Coordination", es: "Coordinacion de Cuidado" },
  medical_assistant: { en: "Clinical", es: "Clinico" },
  nurse_rn: { en: "Clinical", es: "Clinico" },
  nurse_lvn: { en: "Clinical", es: "Clinico" },
  nurse_practitioner: { en: "Clinical", es: "Clinico" },
  physician: { en: "Clinical", es: "Clinico" },
  physician_assistant: { en: "Clinical", es: "Clinico" },
  phlebotomist: { en: "Clinical", es: "Clinico" },
  behavioral_health: { en: "Behavioral Health", es: "Salud Conductual" },
  social_worker: { en: "Behavioral Health", es: "Salud Conductual" },
  lmft: { en: "Behavioral Health", es: "Salud Conductual" },
  psychologist: { en: "Behavioral Health", es: "Salud Conductual" },
  dentist: { en: "Dental", es: "Dental" },
  dental_hygienist: { en: "Dental", es: "Dental" },
  dental_assistant: { en: "Dental", es: "Dental" },
  pharmacist: { en: "Pharmacy", es: "Farmacia" },
  pharmacy_tech: { en: "Pharmacy", es: "Farmacia" },
  patient_services: { en: "Admin & Revenue", es: "Admin e Ingresos" },
  call_center: { en: "Admin & Revenue", es: "Admin e Ingresos" },
  enrollment_specialist: { en: "Admin & Revenue", es: "Admin e Ingresos" },
  revenue_cycle: { en: "Admin & Revenue", es: "Admin e Ingresos" },
  billing_specialist: { en: "Admin & Revenue", es: "Admin e Ingresos" },
  medical_coder: { en: "Admin & Revenue", es: "Admin e Ingresos" },
  program_manager: { en: "Leadership", es: "Liderazgo" },
  medical_director: { en: "Leadership", es: "Liderazgo" },
  director: { en: "Leadership", es: "Liderazgo" },
};

const DEPARTMENTS = [
  { en: "Care Coordination", es: "Coordinacion de Cuidado" },
  { en: "Clinical", es: "Clinico" },
  { en: "Behavioral Health", es: "Salud Conductual" },
  { en: "Dental", es: "Dental" },
  { en: "Pharmacy", es: "Farmacia" },
  { en: "Admin & Revenue", es: "Admin e Ingresos" },
  { en: "Leadership", es: "Liderazgo" },
];

const DEPT_COLORS: Record<string, string> = {
  "Care Coordination": "bg-teal-100 text-teal-800",
  Clinical: "bg-blue-100 text-blue-800",
  "Behavioral Health": "bg-purple-100 text-purple-800",
  Dental: "bg-sky-100 text-sky-800",
  Pharmacy: "bg-emerald-100 text-emerald-800",
  "Admin & Revenue": "bg-amber-100 text-amber-800",
  Leadership: "bg-rose-100 text-rose-800",
};

const TRACK_COLORS: Record<string, string> = {
  "community-health": "bg-teal-500",
  "clinical-operations": "bg-blue-500",
  "behavioral-health": "bg-purple-500",
  "revenue-admin": "bg-amber-500",
  nursing: "bg-rose-500",
};

type SortKey = "label" | "p25" | "p50" | "p75";
type SortDir = "asc" | "desc";

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SalaryDataPage() {
  return (
    <Suspense>
      <SalaryDataContent />
    </Suspense>
  );
}

function SalaryDataContent() {
  const locale = useLocale();
  const isEs = locale === "es";
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState(searchParams.get("dept") || "all");
  const [regionFilter, setRegionFilter] = useState(searchParams.get("region") || "none");
  const [sortKey, setSortKey] = useState<SortKey>("p50");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [compareRole, setCompareRole] = useState("care_coordinator");

  // Sync filters to URL
  const updateURL = useCallback(
    (dept: string, region: string) => {
      const params = new URLSearchParams();
      if (dept !== "all") params.set("dept", dept);
      if (region !== "none") params.set("region", region);
      const qs = params.toString();
      router.replace(`?${qs}`, { scroll: false });
    },
    [router],
  );

  function setDeptFilterWithURL(val: string) {
    setDeptFilter(val);
    updateURL(val, regionFilter);
  }

  function setRegionFilterWithURL(val: string) {
    setRegionFilter(val);
    updateURL(deptFilter, val);
  }

  // Sync from URL on initial load (handles back/forward navigation)
  useEffect(() => {
    const dept = searchParams.get("dept") || "all";
    const region = searchParams.get("region") || "none";
    if (dept !== deptFilter) setDeptFilter(dept);
    if (region !== regionFilter) setRegionFilter(region);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Region multiplier
  const activeRegion = REGIONAL_MULTIPLIERS.find((r) => r.region === regionFilter);
  const multiplier = activeRegion?.multiplier ?? 1;

  // Filtered + sorted salary data
  const filteredBenchmarks = useMemo(() => {
    let data = SALARY_BENCHMARKS.map((b) => ({
      ...b,
      department: ROLE_DEPARTMENTS[b.roleId]?.en ?? "Other",
      adjP25: Math.round(b.p25 * multiplier),
      adjP50: Math.round(b.p50 * multiplier),
      adjP75: Math.round(b.p75 * multiplier),
    }));

    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (b) =>
          b.label.toLowerCase().includes(q) ||
          b.esLabel.toLowerCase().includes(q) ||
          b.department.toLowerCase().includes(q)
      );
    }

    if (deptFilter !== "all") {
      data = data.filter((b) => b.department === deptFilter);
    }

    data.sort((a, b) => {
      const aVal = sortKey === "label" ? a.label : a[`adj${sortKey.charAt(0).toUpperCase() + sortKey.slice(1)}` as keyof typeof a] as number;
      const bVal = sortKey === "label" ? b.label : b[`adj${sortKey.charAt(0).toUpperCase() + sortKey.slice(1)}` as keyof typeof b] as number;
      if (sortKey === "label") {
        return sortDir === "asc"
          ? (aVal as string).localeCompare(bVal as string)
          : (bVal as string).localeCompare(aVal as string);
      }
      return sortDir === "asc" ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });

    return data;
  }, [search, deptFilter, sortKey, sortDir, multiplier]);

  // Max salary for bar scaling
  const maxSalary = useMemo(
    () => Math.max(...filteredBenchmarks.map((b) => b.adjP75), 1),
    [filteredBenchmarks]
  );

  // Compare role data for regional comparison
  const compareRoleData = SALARY_BENCHMARKS.find((b) => b.roleId === compareRole);

  // Compute key insights
  const allP50 = SALARY_BENCHMARKS.map((b) => b.p50);
  const avgP50 = Math.round(allP50.reduce((s, v) => s + v, 0) / allP50.length);
  const bayAreaMult = REGIONAL_MULTIPLIERS.find((r) => r.region === "SF Bay Area")!;
  const leadershipMax = Math.max(
    ...SALARY_BENCHMARKS.filter((b) => ROLE_DEPARTMENTS[b.roleId]?.en === "Leadership").map((b) => b.p75)
  );
  const entryMin = Math.min(...SALARY_BENCHMARKS.map((b) => b.p25));
  const leadershipMultiple = (leadershipMax / entryMin).toFixed(1);

  function handleExportCSV() {
    const hasRegion = regionFilter !== "none";
    const headers = hasRegion
      ? ["Role", "Department", "P25", "P50 (Median)", "P75", "Adjusted P25", "Adjusted P50", "Adjusted P75"]
      : ["Role", "Department", "P25", "P50 (Median)", "P75"];
    const rows = filteredBenchmarks.map((b) =>
      hasRegion
        ? [b.label, b.department, String(b.p25), String(b.p50), String(b.p75), String(b.adjP25), String(b.adjP50), String(b.adjP75)]
        : [b.label, b.department, String(b.p25), String(b.p50), String(b.p75)],
    );
    downloadCSV("fqhc-salary-benchmarks.csv", headers, rows);
  }

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir(key === "label" ? "asc" : "desc");
    }
  }

  const tocItems = [
    { id: "salary-table", label: isEs ? "Tabla Salarial" : "Salary Table" },
    { id: "career-progression", label: isEs ? "Progresión Salarial" : "Salary Progression" },
    { id: "regional-comparison", label: isEs ? "Comparación Regional" : "Regional Comparison" },
    { id: "key-insights", label: isEs ? "Perspectivas Clave" : "Key Insights" },
    { id: "salary-report", label: isEs ? "Informe PDF" : "PDF Report" },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs
          items={[
            { label: isEs ? "Inicio" : "Home", href: "/" },
            { label: isEs ? "Inteligencia" : "Intelligence", href: "/" },
            { label: isEs ? "Datos Salariales" : "Salary Data" },
          ]}
        />
      </div>
      {/* ---- Dark Hero ---- */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white py-16 px-4">
        <div className="mx-auto max-w-5xl text-center">
          <Badge className="mb-4 bg-teal-800/50 text-teal-300 border-teal-700">
            <BarChart3 className="mr-1 size-3" />
            {isEs ? "Datos de Mercado de California" : "California Market Data"}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {isEs ? "Inteligencia Salarial FQHC" : "FQHC Salary Intelligence"}
          </h1>
          <p className="mt-4 text-lg text-stone-300 max-w-2xl mx-auto">
            {isEs
              ? "Datos salariales por percentil para 30 roles en centros de salud de California, con ajustes regionales por costo de vida en 9 regiones."
              : "Percentile-based salary data for 30 community health center roles across California, with cost-of-living adjustments for 9 regions."}
          </p>
          <p className="mt-3 text-xs text-stone-500 max-w-xl mx-auto">
            {isEs
              ? "Los rangos salariales son estimaciones basadas en datos públicos agregados de ofertas de empleo, encuestas salariales y fuentes gubernamentales. Los salarios reales varían según el empleador, la experiencia y la ubicación."
              : "Salary ranges are estimates based on aggregated public data from job postings, salary surveys, and government sources. Actual compensation varies by employer, experience, and location."}
          </p>
        </div>
      </section>

      {/* ---- Stats Bar ---- */}
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-5xl grid grid-cols-3 divide-x divide-stone-200">
          {[
            { value: SALARY_BENCHMARKS.length, label: isEs ? "Roles Analizados" : "Roles Benchmarked" },
            { value: CAREER_PATHWAYS.length, label: isEs ? "Trayectorias Profesionales" : "Career Tracks" },
            { value: REGIONAL_MULTIPLIERS.length, label: isEs ? "Regiones de CA" : "CA Regions" },
          ].map((stat) => (
            <div key={stat.label} className="py-4 px-3 text-center">
              <div className="text-2xl font-bold text-teal-700">{stat.value}</div>
              <div className="text-xs text-stone-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TOC */}
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="absolute right-4 top-10 sm:right-6 lg:right-8">
          <TableOfContents items={tocItems} title={isEs ? "En esta página" : "On this page"} />
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 space-y-12">
        {/* ---- Section 1: Salary Table ---- */}
        <section id="salary-table" className="scroll-mt-20">
          <h2 className="text-2xl font-bold text-stone-900 mb-1">
            <DollarSign className="inline size-6 text-teal-700 mr-1" />
            {isEs ? "Tabla Salarial por Rol" : "Salary Table by Role"}
          </h2>
          <p className="text-stone-500 text-sm mb-5">
            {isEs
              ? "Salarios anuales del percentil 25, mediana y percentil 75. Haga clic en los encabezados para ordenar."
              : "Annual salaries at 25th percentile, median, and 75th percentile. Click headers to sort."}
          </p>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-stone-500" />
              <Input
                placeholder={isEs ? "Buscar rol..." : "Search role..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={deptFilter} onValueChange={setDeptFilterWithURL}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder={isEs ? "Departamento" : "Department"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{isEs ? "Todos" : "All Departments"}</SelectItem>
                {DEPARTMENTS.map((d) => (
                  <SelectItem key={d.en} value={d.en}>
                    {isEs ? d.es : d.en}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={regionFilter} onValueChange={setRegionFilterWithURL}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder={isEs ? "Region" : "Region"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">{isEs ? "Base Estatal" : "Statewide Base"}</SelectItem>
                {REGIONAL_MULTIPLIERS.map((r) => (
                  <SelectItem key={r.region} value={r.region}>
                    {isEs ? r.esRegion : r.region} ({r.multiplier > 1 ? "+" : ""}
                    {Math.round((r.multiplier - 1) * 100)}%)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={handleExportCSV} className="gap-1.5">
              <Download className="size-4" />
              {isEs ? "Descargar CSV" : "Download CSV"}
            </Button>
          </div>

          {activeRegion && (
            <div className="mb-4 rounded-lg bg-teal-50 border border-teal-200 px-4 py-2 text-sm text-teal-800 flex items-center gap-2">
              <MapPin className="size-4 shrink-0" />
              {isEs ? "Ajuste regional:" : "Regional adjustment:"}{" "}
              <span className="font-semibold">
                {isEs ? activeRegion.esRegion : activeRegion.region}
              </span>{" "}
              ({activeRegion.multiplier > 1 ? "+" : ""}
              {Math.round((activeRegion.multiplier - 1) * 100)}%)
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-stone-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-left">
                  <th
                    className="px-4 py-3 font-semibold text-stone-700 cursor-pointer hover:text-teal-700 transition-colors"
                    onClick={() => toggleSort("label")}
                  >
                    <span className="flex items-center gap-1">
                      {isEs ? "Rol" : "Role"}
                      <ArrowUpDown className="size-3" />
                    </span>
                  </th>
                  <th className="px-3 py-3 font-semibold text-stone-700 hidden sm:table-cell">
                    {isEs ? "Depto" : "Dept"}
                  </th>
                  <th
                    className="px-3 py-3 font-semibold text-stone-700 cursor-pointer hover:text-teal-700 transition-colors text-right"
                    onClick={() => toggleSort("p25")}
                  >
                    <span className="flex items-center justify-end gap-1">
                      P25
                      <ArrowUpDown className="size-3" />
                    </span>
                  </th>
                  <th
                    className="px-3 py-3 font-semibold text-stone-700 cursor-pointer hover:text-teal-700 transition-colors text-right"
                    onClick={() => toggleSort("p50")}
                  >
                    <span className="flex items-center justify-end gap-1">
                      P50
                      <ArrowUpDown className="size-3" />
                    </span>
                  </th>
                  <th
                    className="px-3 py-3 font-semibold text-stone-700 cursor-pointer hover:text-teal-700 transition-colors text-right"
                    onClick={() => toggleSort("p75")}
                  >
                    <span className="flex items-center justify-end gap-1">
                      P75
                      <ArrowUpDown className="size-3" />
                    </span>
                  </th>
                  <th className="px-3 py-3 font-semibold text-stone-700 hidden md:table-cell w-48">
                    {isEs ? "Rango" : "Range"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBenchmarks.map((b, i) => {
                  const deptEn = b.department;
                  const barStart = (b.adjP25 / maxSalary) * 100;
                  const barWidth = ((b.adjP75 - b.adjP25) / maxSalary) * 100;
                  return (
                    <tr
                      key={b.roleId}
                      className={`border-b border-stone-100 hover:bg-stone-50 transition-colors ${
                        i % 2 === 0 ? "" : "bg-stone-50/50"
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium text-stone-900">
                          {isEs ? b.esLabel : b.label}
                        </div>
                        <div className="sm:hidden mt-1">
                          <Badge variant="secondary" className={`text-xs ${DEPT_COLORS[deptEn] ?? ""}`}>
                            {isEs ? ROLE_DEPARTMENTS[b.roleId]?.es : deptEn}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-3 py-3 hidden sm:table-cell">
                        <Badge variant="secondary" className={`text-xs ${DEPT_COLORS[deptEn] ?? ""}`}>
                          {isEs ? ROLE_DEPARTMENTS[b.roleId]?.es : deptEn}
                        </Badge>
                      </td>
                      <td className="px-3 py-3 text-right text-stone-600 font-mono text-xs">
                        {fmt(b.adjP25)}
                      </td>
                      <td className="px-3 py-3 text-right font-semibold text-stone-900 font-mono text-sm">
                        {fmt(b.adjP50)}
                      </td>
                      <td className="px-3 py-3 text-right text-stone-600 font-mono text-xs">
                        {fmt(b.adjP75)}
                      </td>
                      <td className="px-3 py-3 hidden md:table-cell">
                        <div className="relative h-4 rounded-full bg-stone-100">
                          <div
                            className="absolute top-0 h-4 rounded-full bg-teal-500/30"
                            style={{
                              left: `${barStart}%`,
                              width: `${Math.max(barWidth, 2)}%`,
                            }}
                          />
                          <div
                            className="absolute top-0.5 h-3 w-1.5 rounded-sm bg-teal-700"
                            style={{ left: `${(b.adjP50 / maxSalary) * 100}%` }}
                            title={`Median: ${fmt(b.adjP50)}`}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredBenchmarks.length === 0 && (
              <div className="py-8 text-center text-stone-500 text-sm">
                {isEs ? "No se encontraron roles." : "No roles found."}
              </div>
            )}
          </div>
          <p className="mt-2 text-xs text-stone-500">
            {isEs
              ? "Fuente: Datos del mercado FQHC de California, 2025-2026. Salarios anuales."
              : "Source: California FQHC market data, 2025-2026. Annual salaries."}
          </p>
        </section>

        {/* ---- Section 2: Career Track Salary Progression ---- */}
        <section id="career-progression" className="scroll-mt-20">
          <h2 className="text-2xl font-bold text-stone-900 mb-1">
            <TrendingUp className="inline size-6 text-teal-700 mr-1" />
            {isEs ? "Progresion Salarial por Trayectoria" : "Salary Progression by Career Track"}
          </h2>
          <p className="text-stone-500 text-sm mb-6">
            {isEs
              ? "Salario mediano (P50) en cada nivel, del puesto de entrada hasta liderazgo."
              : "Median (P50) salary at each level, from entry-level to leadership."}
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CAREER_PATHWAYS.map((pathway) => {
              const maxTrackSalary = Math.max(...pathway.levels.map((l) => l.salaryP75));
              return (
                <div
                  key={pathway.id}
                  className="rounded-lg border border-stone-200 bg-white p-5"
                >
                  <h3 className="font-semibold text-stone-900 mb-1">
                    {isEs ? pathway.esName : pathway.name}
                  </h3>
                  <p className="text-xs text-stone-500 mb-4">
                    {fmt(pathway.levels[0].salaryP50)} → {fmt(pathway.levels[pathway.levels.length - 1].salaryP50)}{" "}
                    {isEs ? "mediana" : "median"}
                  </p>
                  <div className="space-y-3">
                    {pathway.levels.map((level, i) => {
                      const widthPct = (level.salaryP50 / maxTrackSalary) * 100;
                      return (
                        <div key={level.roleId}>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-stone-700 font-medium truncate mr-2">
                              {isEs ? level.esTitle : level.title}
                            </span>
                            <span className="font-mono text-stone-900 font-semibold shrink-0">
                              {fmt(level.salaryP50)}
                            </span>
                          </div>
                          <div className="h-3 rounded-full bg-stone-100">
                            <div
                              className={`h-3 rounded-full ${TRACK_COLORS[pathway.id] ?? "bg-teal-500"} transition-all`}
                              style={{ width: `${widthPct}%` }}
                            />
                          </div>
                          {i < pathway.levels.length - 1 && (
                            <div className="text-center text-stone-300 text-xs mt-1">|</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-3 border-t border-stone-100 text-xs text-stone-500">
                    {isEs ? "Crecimiento: " : "Growth: "}
                    <span className="font-semibold text-teal-700">
                      +{Math.round(
                        ((pathway.levels[pathway.levels.length - 1].salaryP50 - pathway.levels[0].salaryP50) /
                          pathway.levels[0].salaryP50) *
                          100
                      )}
                      %
                    </span>
                    {" "}
                    {isEs ? "de entrada a liderazgo" : "entry to leadership"}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ---- Section 3: Regional Cost Comparison ---- */}
        <section id="regional-comparison" className="scroll-mt-20">
          <h2 className="text-2xl font-bold text-stone-900 mb-1">
            <MapPin className="inline size-6 text-teal-700 mr-1" />
            {isEs ? "Comparacion Salarial Regional" : "Regional Salary Comparison"}
          </h2>
          <p className="text-stone-500 text-sm mb-5">
            {isEs
              ? "El mismo rol se paga diferente en cada region de California segun el costo de vida."
              : "The same role pays differently across California regions based on cost of living."}
          </p>

          {/* Role selector */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-stone-700 mb-1">
              {isEs ? "Seleccionar rol:" : "Select role:"}
            </label>
            <Select value={compareRole} onValueChange={setCompareRole}>
              <SelectTrigger className="w-full sm:w-80">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SALARY_BENCHMARKS.map((b) => (
                  <SelectItem key={b.roleId} value={b.roleId}>
                    {isEs ? b.esLabel : b.label} ({fmt(b.p50)})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {compareRoleData && (
            <div className="rounded-lg border border-stone-200 bg-white p-5">
              <h3 className="font-semibold text-stone-900 mb-1">
                {isEs ? compareRoleData.esLabel : compareRoleData.label}
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                {isEs ? "Salario mediano (P50) ajustado por region" : "Median (P50) salary adjusted by region"}
              </p>
              <div className="space-y-3">
                {[...REGIONAL_MULTIPLIERS]
                  .sort((a, b) => b.multiplier - a.multiplier)
                  .map((region) => {
                    const adjusted = adjustSalary(compareRoleData.p50, region.multiplier);
                    const maxAdjusted = adjustSalary(
                      compareRoleData.p50,
                      Math.max(...REGIONAL_MULTIPLIERS.map((r) => r.multiplier))
                    );
                    const widthPct = (adjusted / maxAdjusted) * 100;
                    const diffPct = Math.round((region.multiplier - 1) * 100);
                    return (
                      <div key={region.region}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-stone-700 font-medium">
                            {isEs ? region.esRegion : region.region}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-stone-900 font-semibold">
                              {fmt(adjusted)}
                            </span>
                            <Badge
                              variant="secondary"
                              className={
                                diffPct > 0
                                  ? "bg-green-100 text-green-800 text-xs"
                                  : diffPct < 0
                                    ? "bg-red-100 text-red-800 text-xs"
                                    : "bg-stone-100 text-stone-600 text-xs"
                              }
                            >
                              {diffPct > 0 ? "+" : ""}{diffPct}%
                            </Badge>
                          </div>
                        </div>
                        <div className="h-4 rounded-full bg-stone-100">
                          <div
                            className={`h-4 rounded-full transition-all ${
                              diffPct > 5
                                ? "bg-teal-500"
                                : diffPct > 0
                                  ? "bg-teal-400"
                                  : diffPct === 0
                                    ? "bg-stone-400"
                                    : "bg-amber-400"
                            }`}
                            style={{ width: `${widthPct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <p className="mt-4 text-xs text-stone-500">
                {isEs
                  ? "Los multiplicadores reflejan diferencias en el costo de vida entre las regiones de California."
                  : "Multipliers reflect cost-of-living differences across California regions."}
              </p>
            </div>
          )}
        </section>

        {/* ---- Section 4: Key Insights ---- */}
        <section id="key-insights" className="scroll-mt-20">
          <h2 className="text-2xl font-bold text-stone-900 mb-1">
            <Lightbulb className="inline size-6 text-amber-500 mr-1" />
            {isEs ? "Perspectivas Clave" : "Key Insights"}
          </h2>
          <p className="text-stone-500 text-sm mb-5">
            {isEs
              ? "Hallazgos basados en datos de nuestro analisis salarial."
              : "Data-driven findings from our salary analysis."}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-stone-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-teal-100 p-2">
                  <DollarSign className="size-5 text-teal-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900 text-sm">
                    {isEs ? "Salario Mediano Promedio" : "Average Median Salary"}
                  </h3>
                  <p className="text-2xl font-bold text-teal-700 mt-1">{fmt(avgP50)}</p>
                  <p className="text-xs text-stone-500 mt-1">
                    {isEs
                      ? "Promedio del P50 en los 30 roles FQHC analizados"
                      : "Average P50 across all 30 benchmarked FQHC roles"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-stone-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-blue-100 p-2">
                  <MapPin className="size-5 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900 text-sm">
                    {isEs ? "Prima del Area de la Bahia" : "Bay Area Premium"}
                  </h3>
                  <p className="text-2xl font-bold text-blue-700 mt-1">
                    +{Math.round((bayAreaMult.multiplier - 1) * 100)}%
                  </p>
                  <p className="text-xs text-stone-500 mt-1">
                    {isEs
                      ? "El Area de la Bahia paga mas que el promedio estatal"
                      : "Bay Area pays above the statewide average"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-stone-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-amber-100 p-2">
                  <TrendingUp className="size-5 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900 text-sm">
                    {isEs ? "Multiplicador de Liderazgo" : "Leadership Multiplier"}
                  </h3>
                  <p className="text-2xl font-bold text-amber-700 mt-1">{leadershipMultiple}x</p>
                  <p className="text-xs text-stone-500 mt-1">
                    {isEs
                      ? "Los roles de liderazgo ganan hasta este multiplo vs roles de entrada"
                      : "Leadership roles earn up to this multiple vs entry-level positions"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-stone-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-purple-100 p-2">
                  <Award className="size-5 text-purple-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900 text-sm">
                    {isEs ? "Roles Mejor Pagados" : "Highest-Paying Roles"}
                  </h3>
                  <p className="text-sm text-stone-700 mt-1 font-medium">
                    {isEs ? "Director Medico, Medico, Dentista" : "Medical Director, Physician, Dentist"}
                  </p>
                  <p className="text-xs text-stone-500 mt-1">
                    {isEs
                      ? "Los 3 roles principales superan los $150k de mediana"
                      : "Top 3 roles all exceed $150k median salary"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Links to related pages */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/career-roadmap">
              <Button variant="outline" className="text-sm">
                <Briefcase className="mr-1 size-4" />
                {isEs ? "Mapa de Carrera" : "Career Roadmap"}
                <ArrowRight className="ml-1 size-3" />
              </Button>
            </Link>
            <Link href="/certifications">
              <Button variant="outline" className="text-sm">
                <Award className="mr-1 size-4" />
                {isEs ? "Certificaciones" : "Certifications"}
                <ArrowRight className="ml-1 size-3" />
              </Button>
            </Link>
            <Link href="/jobs">
              <Button variant="outline" className="text-sm">
                <Users className="mr-1 size-4" />
                {isEs ? "Ver Empleos" : "Browse Jobs"}
                <ArrowRight className="ml-1 size-3" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Salary Report PDF CTA */}
        <section id="salary-report" className="mt-12 rounded-xl border-2 border-teal-200 bg-gradient-to-r from-teal-50 to-stone-50 p-6 sm:p-8 scroll-mt-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="rounded-full bg-teal-100 p-3 shrink-0">
              <FileDown className="size-6 text-teal-700" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-stone-900">
                {isEs ? "Descarga el Informe Salarial FQHC 2026" : "Download the 2026 FQHC Salary Report"}
              </h3>
              <p className="mt-1 text-sm text-stone-600">
                {isEs
                  ? `PDF gratuito con los ${SALARY_BENCHMARKS.length} roles, 9 multiplicadores regionales, analisis del impacto de SB 525 y metodologia completa.`
                  : `Free PDF with all ${SALARY_BENCHMARKS.length} roles, 9 regional multipliers, SB 525 impact analysis, and full methodology. California-specific data you can share with your team.`}
              </p>
            </div>
            <Link href="/salary-report" className="shrink-0">
              <Button className="bg-teal-700 hover:bg-teal-800 text-white">
                <FileDown className="mr-2 size-4" />
                {isEs ? "Descargar PDF" : "Get Free PDF"}
              </Button>
            </Link>
          </div>
        </section>

        {/* Related Tools */}
        <div className="mt-12 border-t border-stone-200 pt-8">
          <h3 className="text-lg font-bold text-stone-900 mb-4">
            {isEs ? "Herramientas Relacionadas" : "Related Tools"}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/career-roadmap" className="rounded-lg border border-stone-200 p-4 hover:border-teal-200 hover:bg-teal-50/30 transition-colors">
              <p className="text-sm font-semibold text-stone-900">{isEs ? "Trayectoria Profesional" : "Career Roadmap"}</p>
              <p className="text-xs text-stone-500 mt-1">{isEs ? "5 trayectorias, 4 niveles, datos salariales de CA" : "5 tracks, 4 levels, CA salary data"}</p>
            </Link>
            <Link href="/resume-builder" className="rounded-lg border border-stone-200 p-4 hover:border-teal-200 hover:bg-teal-50/30 transition-colors">
              <p className="text-sm font-semibold text-stone-900">{isEs ? "Creador de Curriculum" : "Resume Builder"}</p>
              <p className="text-xs text-stone-500 mt-1">{isEs ? "Plantillas gratuitas para roles FQHC" : "Free templates for FQHC roles"}</p>
            </Link>
            <Link href="/interview-prep" className="rounded-lg border border-stone-200 p-4 hover:border-teal-200 hover:bg-teal-50/30 transition-colors">
              <p className="text-sm font-semibold text-stone-900">{isEs ? "Preparacion Entrevista" : "Interview Prep"}</p>
              <p className="text-xs text-stone-500 mt-1">{isEs ? "Preguntas STAR y guias por rol" : "STAR questions and role-specific guides"}</p>
            </Link>
            <Link href="/certifications" className="rounded-lg border border-stone-200 p-4 hover:border-teal-200 hover:bg-teal-50/30 transition-colors">
              <p className="text-sm font-semibold text-stone-900">{isEs ? "Certificaciones" : "Certifications"}</p>
              <p className="text-xs text-stone-500 mt-1">{isEs ? "15 certificaciones especificas de CA" : "15 CA-specific certifications"}</p>
            </Link>
          </div>
        </div>

        {/* Newsletter CTA */}
        <section className="mt-12 mb-8">
          <NewsletterSignup
            variant="banner"
            defaultAudience="the-pulse"
          />
        </section>
      </div>
    </div>
  );
}
