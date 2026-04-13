// FQHC Comparison Tool — Side-by-side FQHC analysis
"use client";

import { useState, useMemo, useEffect } from "react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import {
  Search,
  X,
  Building2,
  Users,
  MapPin,
  Star,
  Shield,
  ChevronRight,
  BarChart3,
  Plus,
  ArrowLeft,
  Printer,
  Sparkles,
  Download,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  californiaFQHCs,
  type CaliforniaFQHC,
} from "@/lib/california-fqhcs";
import {
  calculateResilienceScore,
  DIMENSION_META,
  type ResilienceScore,
} from "@/lib/fqhc-resilience";
import { trackCompareUse } from "@/lib/analytics";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

const MAX_COMPARE = 3;

const POPULAR_COMPARISONS = [
  { label: "AltaMed vs FHCSD", slugs: ["altamed", "family-health-centers-of-san-diego"] },
  { label: "AHS vs La Clinica vs NEVHC", slugs: ["asian-health-services", "la-clinica-de-la-raza", "northeast-valley-health-corporation"] },
  { label: "KHEIR vs APLA vs JWCH", slugs: ["kheir-clinic", "apla-health", "jwch-institute"] },
];

function parseNumber(s: string): number {
  return parseInt(s.replace(/[^0-9]/g, ""), 10) || 0;
}

function gradeColor(grade: string): string {
  switch (grade) {
    case "A": return "bg-teal-100 text-teal-800";
    case "B": return "bg-blue-100 text-blue-800";
    case "C": return "bg-amber-100 text-amber-800";
    case "D": return "bg-orange-100 text-orange-800";
    case "F": return "bg-red-100 text-red-800";
    default: return "bg-stone-100 text-stone-600";
  }
}

function riskColor(level: string): string {
  switch (level) {
    case "low": return "bg-teal-100 text-teal-800";
    case "moderate": return "bg-amber-100 text-amber-800";
    case "high": return "bg-orange-100 text-orange-800";
    case "critical": return "bg-red-100 text-red-800";
    default: return "bg-stone-100 text-stone-600";
  }
}

function impactColor(level: string | null): string {
  switch (level) {
    case "low": return "bg-teal-100 text-teal-800";
    case "moderate": return "bg-amber-100 text-amber-800";
    case "high": return "bg-red-100 text-red-800";
    default: return "bg-stone-100 text-stone-600";
  }
}

const bestCell = "bg-teal-50/60";

/* ------------------------------------------------------------------ */
/*  Labels                                                             */
/* ------------------------------------------------------------------ */

const labels = {
  title: { en: "Compare FQHCs", es: "Comparar FQHCs" },
  subtitle: {
    en: "Side-by-side analysis of up to 3 Federally Qualified Health Centers.",
    es: "Analisis comparativo de hasta 3 Centros de Salud Calificados Federalmente.",
  },
  searchPlaceholder: { en: "Search by name, city, or region...", es: "Buscar por nombre, ciudad o region..." },
  selectUp: { en: "Select up to 3 FQHCs to compare", es: "Seleccione hasta 3 FQHCs para comparar" },
  selected: { en: "Selected", es: "Seleccionados" },
  noResults: { en: "No FQHCs match your search.", es: "Ningun FQHC coincide con su busqueda." },
  needTwo: { en: "Select at least 2 FQHCs to see comparison.", es: "Seleccione al menos 2 FQHCs para ver la comparacion." },
  backToDirectory: { en: "Back to Directory", es: "Volver al Directorio" },
  viewProfile: { en: "View Profile", es: "Ver Perfil" },
  // Section headers
  orgBasics: { en: "Organization", es: "Organizacion" },
  cityLabel: { en: "City", es: "Ciudad" },
  regionLabel: { en: "Region", es: "Region" },
  sitesLabel: { en: "Sites", es: "Sitios" },
  patientsLabel: { en: "Patients", es: "Pacientes" },
  staffLabel: { en: "Staff", es: "Personal" },
  glassdoorLabel: { en: "Glassdoor", es: "Glassdoor" },
  ratingLabel: { en: "Rating", es: "Calificacion" },
  reviewsLabel: { en: "Reviews", es: "Resenas" },
  programsLabel: { en: "Programs", es: "Programas" },
  ehrLabel: { en: "EHR System", es: "Sistema EHR" },
  resilienceLabel: { en: "Resilience Score", es: "Puntuacion de Resiliencia" },
  overallGrade: { en: "Overall Grade", es: "Calificacion General" },
  overallScore: { en: "Overall Score", es: "Puntuacion General" },
  riskLevel: { en: "Risk Level", es: "Nivel de Riesgo" },
  fundingLabel: { en: "Funding", es: "Financiamiento" },
  impactLevel: { en: "Impact Level", es: "Nivel de Impacto" },
  coverageRisk: { en: "Coverage Risk", es: "Riesgo de Cobertura" },
  unionLabel: { en: "Union Status", es: "Estado Sindical" },
  certLabel: { en: "Certifications", es: "Certificaciones" },
  ecmLabel: { en: "ECM Provider", es: "Proveedor ECM" },
  nhscLabel: { en: "NHSC Approved", es: "Aprobado NHSC" },
  dataComplete: { en: "Data Completeness", es: "Completitud de Datos" },
  dimensionChart: { en: "Resilience Dimensions", es: "Dimensiones de Resiliencia" },
  yes: { en: "Yes", es: "Si" },
  no: { en: "No", es: "No" },
  na: { en: "N/A", es: "N/D" },
  unionized: { en: "Unionized", es: "Sindicalizado" },
  notUnionized: { en: "Not Unionized", es: "No Sindicalizado" },
  unknown: { en: "Unknown", es: "Desconocido" },
  noneReported: { en: "None reported", es: "Ninguno reportado" },
  popularComparisons: { en: "Popular Comparisons", es: "Comparaciones Populares" },
  browseDirectory: { en: "Or browse the directory to find FQHCs", es: "O explore el directorio para encontrar FQHCs" },
  printComparison: { en: "Print Comparison", es: "Imprimir Comparacion" },
  downloadPdf: { en: "Download Comparison (PDF)", es: "Descargar Comparacion (PDF)" },
  addThird: { en: "Add a 3rd FQHC", es: "Agregar un 3er FQHC" },
};

/* ------------------------------------------------------------------ */
/*  Selector Component                                                 */
/* ------------------------------------------------------------------ */

function FQHCSelector({
  selected,
  onAdd,
  onRemove,
  locale,
}: {
  selected: string[];
  onAdd: (slug: string) => void;
  onRemove: (slug: string) => void;
  locale: string;
}) {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return californiaFQHCs
      .filter(
        (f) =>
          !selected.includes(f.slug) &&
          (f.name.toLowerCase().includes(q) ||
            f.city.toLowerCase().includes(q) ||
            f.region.toLowerCase().includes(q) ||
            f.county.toLowerCase().includes(q))
      )
      .slice(0, 8);
  }, [query, selected]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-stone-500 mr-1 self-center">
            {t(labels.selected, locale)} ({selected.length}/{MAX_COMPARE}):
          </span>
          {selected.map((slug) => {
            const fqhc = californiaFQHCs.find((f) => f.slug === slug);
            if (!fqhc) return null;
            return (
              <Badge
                key={slug}
                variant="secondary"
                className="bg-teal-100 text-teal-800 pl-3 pr-1 py-1.5 text-sm flex items-center gap-1"
              >
                {fqhc.name}
                <button
                  onClick={() => onRemove(slug)}
                  className="ml-1 p-0.5 rounded-full hover:bg-teal-200 transition-colors"
                  aria-label={`Remove ${fqhc.name}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}

      {/* Search input */}
      {selected.length < MAX_COMPARE && (
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
            <Input
              placeholder={t(labels.searchPlaceholder, locale)}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              className="pl-10 h-12 text-base"
            />
          </div>
          {showDropdown && query.trim() && (
            <div className="absolute z-20 mt-1 w-full bg-white border border-stone-200 rounded-xl shadow-lg max-h-72 overflow-y-auto">
              {results.length === 0 ? (
                <p className="p-4 text-sm text-stone-500">{t(labels.noResults, locale)}</p>
              ) : (
                results.map((fqhc) => (
                  <button
                    key={fqhc.slug}
                    className="w-full text-left px-4 py-3 hover:bg-teal-50 transition-colors flex items-center justify-between border-b border-stone-100 last:border-b-0"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      onAdd(fqhc.slug);
                      setQuery("");
                      setShowDropdown(false);
                    }}
                  >
                    <div>
                      <p className="font-medium text-stone-900">{fqhc.name}</p>
                      <p className="text-xs text-stone-500">
                        {fqhc.city}, {fqhc.county} — {fqhc.region}
                      </p>
                    </div>
                    <Plus className="w-4 h-4 text-teal-600" />
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile Row (stacked label/value)                                   */
/* ------------------------------------------------------------------ */

function MobileRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between px-4 py-3">
      <span className="text-sm font-medium text-stone-600 shrink-0 mr-4">{label}</span>
      <span className="text-sm text-stone-800 text-right">{value}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Comparison Row                                                     */
/* ------------------------------------------------------------------ */

function CompareRow({
  label,
  values,
  bestIdx,
}: {
  label: string;
  values: React.ReactNode[];
  bestIdx?: number | null;
}) {
  return (
    <tr className="border-b border-stone-100">
      <td className="py-3 px-4 text-sm font-medium text-stone-600 whitespace-nowrap bg-stone-50/50 w-40 md:w-48">
        {label}
      </td>
      {values.map((v, i) => (
        <td
          key={i}
          className={`py-3 px-4 text-sm text-stone-800 ${bestIdx === i ? bestCell : ""}`}
        >
          {v}
        </td>
      ))}
    </tr>
  );
}

/* ------------------------------------------------------------------ */
/*  Dimension Bar Chart                                                */
/* ------------------------------------------------------------------ */

const barColors = [
  "bg-teal-500",
  "bg-blue-500",
  "bg-amber-500",
];

function DimensionChart({
  fqhcs,
  scores,
  locale,
}: {
  fqhcs: CaliforniaFQHC[];
  scores: ResilienceScore[];
  locale: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <BarChart3 className="w-5 h-5 text-teal-700" />
        <h3 className="text-lg font-semibold text-stone-900">
          {t(labels.dimensionChart, locale)}
        </h3>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-2">
        {fqhcs.map((fqhc, i) => (
          <div key={fqhc.slug} className="flex items-center gap-2 text-sm">
            <span className={`inline-block w-3 h-3 rounded-sm ${barColors[i]}`} />
            <span className="text-stone-700 truncate max-w-48">{fqhc.name}</span>
          </div>
        ))}
      </div>

      {/* Dimension bars */}
      <div className="space-y-5">
        {DIMENSION_META.map((dim) => {
          const dimScores = scores.map(
            (s) => s.dimensions.find((d) => d.dimension === dim.id)?.score ?? 0
          );
          return (
            <div key={dim.id}>
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-sm font-medium text-stone-700">
                  {t({ en: dim.en, es: dim.es }, locale)}
                </span>
                <span className="text-xs text-stone-500">
                  {t({ en: `Weight: ${Math.round(dim.weight * 100)}%`, es: `Peso: ${Math.round(dim.weight * 100)}%` }, locale)}
                </span>
              </div>
              <div className="space-y-1.5">
                {dimScores.map((score, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-full bg-stone-100 rounded-full h-5 relative overflow-hidden">
                      <div
                        className={`h-full rounded-full ${barColors[i]} transition-all duration-500`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-stone-600 w-8 text-right tabular-nums">
                      {score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

export default function ComparePage() {
  const locale = useLocale();
  const searchParams = useSearchParams();

  const [selected, setSelected] = useState<string[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);

  // Pre-fill from URL params (e.g. /compare?fqhcs=altamed,fhcsd)
  useEffect(() => {
    const fqhcsParam = searchParams.get("fqhcs");
    if (fqhcsParam) {
      const slugs = fqhcsParam
        .split(",")
        .map((s) => s.trim())
        .filter((s) => californiaFQHCs.some((f) => f.slug === s))
        .slice(0, MAX_COMPARE);
      if (slugs.length > 0) {
        setSelected(slugs);
      }
    }
  }, [searchParams]);

  const handleAdd = (slug: string) => {
    if (selected.length >= MAX_COMPARE) return;
    const newSelected = [...selected, slug];
    setSelected(newSelected);
    trackCompareUse(newSelected.length);
  };

  const handleRemove = (slug: string) => {
    setSelected((prev) => prev.filter((s) => s !== slug));
  };

  // Resolve selected FQHCs and their resilience scores
  const fqhcs = useMemo(
    () =>
      selected
        .map((slug) => californiaFQHCs.find((f) => f.slug === slug))
        .filter((f): f is CaliforniaFQHC => f !== undefined),
    [selected]
  );

  const scores = useMemo(
    () => fqhcs.map((f) => calculateResilienceScore(f)),
    [fqhcs]
  );

  const canCompare = fqhcs.length >= 2;

  async function handleDownloadPDF() {
    const el = document.getElementById("comparison-content");
    if (!el) return;
    setIsDownloading(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      await html2pdf()
        .set({
          margin: [0.3, 0.3, 0.3, 0.3],
          filename: `FQHC_Comparison_${fqhcs.map((f) => f.slug).join("_vs_")}.pdf`,
          image: { type: "jpeg", quality: 0.95 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
        })
        .from(el)
        .save();
    } finally {
      setIsDownloading(false);
    }
  }

  // Helper to find the best index for a numeric row
  const bestOf = (vals: (number | null)[], higher = true): number | null => {
    const nums = vals.map((v) => (v !== null ? v : -Infinity * (higher ? 1 : -1)));
    if (vals.filter((v) => v !== null).length < 2) return null;
    const best = higher ? Math.max(...nums) : Math.min(...nums);
    const idx = nums.indexOf(best);
    return idx >= 0 ? idx : null;
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building2 className="w-8 h-8 text-teal-400" />
            <h1 className="text-3xl md:text-4xl font-bold">
              {t(labels.title, locale)}
            </h1>
          </div>
          <p className="text-stone-300 text-lg max-w-xl mx-auto mb-8">
            {t(labels.subtitle, locale)}
          </p>

          <FQHCSelector
            selected={selected}
            onAdd={handleAdd}
            onRemove={handleRemove}
            locale={locale}
          />
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 py-10 md:py-14 space-y-10">
        {/* Back link */}
        <Link
          href="/directory"
          className="inline-flex items-center gap-1.5 text-teal-700 hover:text-teal-900 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t(labels.backToDirectory, locale)}
        </Link>

        {!canCompare && (
          <div className="text-center py-12 space-y-8">
            <div>
              <Building2 className="w-12 h-12 mx-auto mb-4 text-stone-300" />
              <p className="text-lg text-stone-600">{t(labels.needTwo, locale)}</p>
              <p className="text-sm mt-2 text-stone-500">{t(labels.selectUp, locale)}</p>
            </div>

            {/* Popular Comparisons */}
            <div className="max-w-lg mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-semibold text-stone-600 uppercase tracking-wider">
                  {t(labels.popularComparisons, locale)}
                </h3>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {POPULAR_COMPARISONS.map((comp) => (
                  <Button
                    key={comp.label}
                    variant="outline"
                    size="sm"
                    className="border-teal-200 text-teal-700 hover:bg-teal-50 gap-1.5"
                    onClick={() => {
                      setSelected(comp.slugs);
                      trackCompareUse(comp.slugs.length);
                    }}
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    {comp.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Directory link */}
            <Link
              href="/directory"
              className="inline-flex items-center gap-1.5 text-teal-700 hover:text-teal-900 text-sm font-medium transition-colors"
            >
              {t(labels.browseDirectory, locale)}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {canCompare && (
          <>
            {/* Action Bar: Add 3rd + Print */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                {fqhcs.length < MAX_COMPARE && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-teal-200 text-teal-700 hover:bg-teal-50 gap-1.5"
                    onClick={() => {
                      const heroSearch = document.querySelector<HTMLInputElement>('section input[type="text"]');
                      if (heroSearch) {
                        heroSearch.scrollIntoView({ behavior: "smooth", block: "center" });
                        setTimeout(() => heroSearch.focus(), 400);
                      }
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    {t(labels.addThird, locale)}
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-stone-200 text-stone-600 hover:bg-stone-50 gap-1.5 print:hidden"
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  {t(labels.downloadPdf, locale)}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-stone-200 text-stone-600 hover:bg-stone-50 gap-1.5 print:hidden"
                  onClick={() => window.print()}
                >
                  <Printer className="w-4 h-4" />
                  {t(labels.printComparison, locale)}
                </Button>
              </div>
            </div>

            {/* Comparison Content — wraps both mobile cards + desktop table for PDF */}
            <div id="comparison-content">

            {/* Mobile Cards (< md) */}
            <div className="md:hidden space-y-6">
              {fqhcs.map((fqhc, fi) => {
                const score = scores[fi];
                return (
                  <div key={fqhc.slug} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
                    {/* Card header */}
                    <div className="bg-stone-50 border-b border-stone-200 px-4 py-4">
                      <Link
                        href={`/directory/${fqhc.slug}`}
                        className="text-teal-700 font-semibold hover:underline text-base"
                      >
                        {fqhc.name}
                      </Link>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {fqhc.city}, {fqhc.county}
                      </p>
                    </div>

                    <div className="divide-y divide-stone-100">
                      {/* Organization */}
                      <div className="px-4 py-2.5 bg-stone-50/80">
                        <div className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase tracking-wider">
                          <MapPin className="w-3.5 h-3.5" />
                          {t(labels.orgBasics, locale)}
                        </div>
                      </div>
                      <MobileRow label={t(labels.regionLabel, locale)} value={fqhc.region} />
                      <MobileRow label={t(labels.sitesLabel, locale)} value={fqhc.siteCount.toLocaleString()} />
                      <MobileRow label={t(labels.patientsLabel, locale)} value={fqhc.patientCount || t(labels.na, locale)} />
                      <MobileRow label={t(labels.staffLabel, locale)} value={fqhc.staffCount || t(labels.na, locale)} />

                      {/* Glassdoor */}
                      <div className="px-4 py-2.5 bg-stone-50/80">
                        <div className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase tracking-wider">
                          <Star className="w-3.5 h-3.5" />
                          {t(labels.glassdoorLabel, locale)}
                        </div>
                      </div>
                      <MobileRow
                        label={t(labels.ratingLabel, locale)}
                        value={
                          fqhc.glassdoorRating !== null ? (
                            <span className="flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                              {fqhc.glassdoorRating.toFixed(1)}
                            </span>
                          ) : t(labels.na, locale)
                        }
                      />
                      <MobileRow
                        label={t(labels.reviewsLabel, locale)}
                        value={fqhc.glassdoorReviewCount !== null ? fqhc.glassdoorReviewCount.toLocaleString() : t(labels.na, locale)}
                      />

                      {/* Programs */}
                      <div className="px-4 py-2.5 bg-stone-50/80">
                        <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                          {t(labels.programsLabel, locale)}
                        </span>
                      </div>
                      <div className="px-4 py-3">
                        {fqhc.programs.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {fqhc.programs.map((p) => (
                              <Badge key={p} variant="secondary" className="text-xs bg-teal-50 text-teal-700">
                                {p}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <span className="text-sm text-stone-500">{t(labels.noneReported, locale)}</span>
                        )}
                      </div>

                      {/* EHR */}
                      <MobileRow label={t(labels.ehrLabel, locale)} value={fqhc.ehrSystem || t(labels.unknown, locale)} />

                      {/* Resilience */}
                      <div className="px-4 py-2.5 bg-stone-50/80">
                        <div className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase tracking-wider">
                          <Shield className="w-3.5 h-3.5" />
                          {t(labels.resilienceLabel, locale)}
                        </div>
                      </div>
                      <MobileRow
                        label={t(labels.overallGrade, locale)}
                        value={<Badge className={`${gradeColor(score.grade)} font-bold text-sm`}>{score.grade}</Badge>}
                      />
                      <MobileRow
                        label={t(labels.overallScore, locale)}
                        value={<span className="font-semibold">{score.overall}/100</span>}
                      />
                      <MobileRow
                        label={t(labels.riskLevel, locale)}
                        value={<Badge className={`${riskColor(score.riskLevel)} text-xs capitalize`}>{score.riskLevel}</Badge>}
                      />
                      {DIMENSION_META.map((dim) => {
                        const d = score.dimensions.find((dd) => dd.dimension === dim.id);
                        return (
                          <MobileRow
                            key={dim.id}
                            label={t({ en: dim.en, es: dim.es }, locale)}
                            value={d ? `${d.score}/100` : t(labels.na, locale)}
                          />
                        );
                      })}

                      {/* Funding */}
                      <div className="px-4 py-2.5 bg-stone-50/80">
                        <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                          {t(labels.fundingLabel, locale)}
                        </span>
                      </div>
                      <MobileRow
                        label={t(labels.impactLevel, locale)}
                        value={
                          <Badge className={`${impactColor(fqhc.fundingImpactLevel)} text-xs capitalize`}>
                            {fqhc.fundingImpactLevel || t(labels.unknown, locale)}
                          </Badge>
                        }
                      />
                      <MobileRow
                        label={t(labels.coverageRisk, locale)}
                        value={fqhc.coverageVulnerabilityPercent !== null ? `${fqhc.coverageVulnerabilityPercent}%` : t(labels.na, locale)}
                      />

                      {/* Union */}
                      <div className="px-4 py-2.5 bg-stone-50/80">
                        <div className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase tracking-wider">
                          <Users className="w-3.5 h-3.5" />
                          {t(labels.unionLabel, locale)}
                        </div>
                      </div>
                      <div className="px-4 py-3">
                        {!fqhc.unionInfo ? (
                          <span className="text-sm text-stone-500">{t(labels.unknown, locale)}</span>
                        ) : fqhc.unionInfo.unionized ? (
                          <div className="space-y-1">
                            <Badge className="bg-blue-100 text-blue-800 text-xs">{t(labels.unionized, locale)}</Badge>
                            <p className="text-xs text-stone-600">{fqhc.unionInfo.unions.join(", ")}</p>
                          </div>
                        ) : (
                          <span className="text-sm text-stone-500">{t(labels.notUnionized, locale)}</span>
                        )}
                      </div>

                      {/* Certifications */}
                      <div className="px-4 py-2.5 bg-stone-50/80">
                        <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                          {t(labels.certLabel, locale)}
                        </span>
                      </div>
                      <MobileRow
                        label={t(labels.ecmLabel, locale)}
                        value={
                          <Badge className={fqhc.ecmProvider ? "bg-teal-100 text-teal-800 text-xs" : "bg-stone-100 text-stone-500 text-xs"}>
                            {fqhc.ecmProvider ? t(labels.yes, locale) : t(labels.no, locale)}
                          </Badge>
                        }
                      />
                      <MobileRow
                        label={t(labels.nhscLabel, locale)}
                        value={
                          <Badge className={fqhc.nhscApproved ? "bg-teal-100 text-teal-800 text-xs" : "bg-stone-100 text-stone-500 text-xs"}>
                            {fqhc.nhscApproved ? t(labels.yes, locale) : t(labels.no, locale)}
                          </Badge>
                        }
                      />

                      {/* Data Completeness */}
                      <MobileRow
                        label={t(labels.dataComplete, locale)}
                        value={
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-stone-100 rounded-full h-2 max-w-24">
                              <div
                                className="bg-teal-500 h-full rounded-full transition-all"
                                style={{ width: `${score.dataCompleteness}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium tabular-nums">{score.dataCompleteness}%</span>
                          </div>
                        }
                      />

                      {/* Profile Link */}
                      <div className="px-4 py-4 border-t border-stone-200">
                        <Link href={`/directory/${fqhc.slug}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-teal-700 border-teal-200 hover:bg-teal-50 gap-1.5 w-full"
                          >
                            {t(labels.viewProfile, locale)}
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop Comparison Table (>= md) */}
            <div className="hidden md:block bg-white rounded-2xl border border-stone-200 overflow-hidden">
              <div className="scroll-hint overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                  <thead className="sticky top-0 z-10">
                    <tr className="border-b border-stone-200 bg-stone-50">
                      <th className="py-4 px-4 text-sm font-semibold text-stone-500 w-40 md:w-48" />
                      {fqhcs.map((fqhc) => (
                        <th key={fqhc.slug} className="py-4 px-4">
                          <div className="space-y-1">
                            <Link
                              href={`/directory/${fqhc.slug}`}
                              className="text-teal-700 font-semibold hover:underline text-base"
                            >
                              {fqhc.name}
                            </Link>
                            <p className="text-xs text-stone-500 font-normal">
                              {fqhc.city}, {fqhc.county}
                            </p>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* ---- Organization Basics ---- */}
                    <tr className="bg-stone-50/80">
                      <td
                        colSpan={fqhcs.length + 1}
                        className="py-2.5 px-4 text-xs font-bold text-stone-500 uppercase tracking-wider"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5" />
                          {t(labels.orgBasics, locale)}
                        </div>
                      </td>
                    </tr>

                    <CompareRow
                      label={t(labels.regionLabel, locale)}
                      values={fqhcs.map((f) => f.region)}
                    />
                    <CompareRow
                      label={t(labels.sitesLabel, locale)}
                      values={fqhcs.map((f) => f.siteCount.toLocaleString())}
                      bestIdx={bestOf(fqhcs.map((f) => f.siteCount))}
                    />
                    <CompareRow
                      label={t(labels.patientsLabel, locale)}
                      values={fqhcs.map((f) => f.patientCount || t(labels.na, locale))}
                      bestIdx={bestOf(fqhcs.map((f) => parseNumber(f.patientCount)))}
                    />
                    <CompareRow
                      label={t(labels.staffLabel, locale)}
                      values={fqhcs.map((f) => f.staffCount || t(labels.na, locale))}
                      bestIdx={bestOf(fqhcs.map((f) => parseNumber(f.staffCount)))}
                    />

                    {/* ---- Glassdoor ---- */}
                    <tr className="bg-stone-50/80">
                      <td
                        colSpan={fqhcs.length + 1}
                        className="py-2.5 px-4 text-xs font-bold text-stone-500 uppercase tracking-wider"
                      >
                        <div className="flex items-center gap-2">
                          <Star className="w-3.5 h-3.5" />
                          {t(labels.glassdoorLabel, locale)}
                        </div>
                      </td>
                    </tr>
                    <CompareRow
                      label={t(labels.ratingLabel, locale)}
                      values={fqhcs.map((f) =>
                        f.glassdoorRating !== null ? (
                          <span key={f.slug} className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            {f.glassdoorRating.toFixed(1)}
                          </span>
                        ) : (
                          <span key={f.slug} className="text-stone-500">{t(labels.na, locale)}</span>
                        )
                      )}
                      bestIdx={bestOf(fqhcs.map((f) => f.glassdoorRating))}
                    />
                    <CompareRow
                      label={t(labels.reviewsLabel, locale)}
                      values={fqhcs.map((f) =>
                        f.glassdoorReviewCount !== null
                          ? f.glassdoorReviewCount.toLocaleString()
                          : t(labels.na, locale)
                      )}
                      bestIdx={bestOf(fqhcs.map((f) => f.glassdoorReviewCount))}
                    />

                    {/* ---- Programs ---- */}
                    <tr className="bg-stone-50/80">
                      <td
                        colSpan={fqhcs.length + 1}
                        className="py-2.5 px-4 text-xs font-bold text-stone-500 uppercase tracking-wider"
                      >
                        {t(labels.programsLabel, locale)}
                      </td>
                    </tr>
                    <CompareRow
                      label={t(labels.programsLabel, locale)}
                      values={fqhcs.map((f) =>
                        f.programs.length > 0 ? (
                          <div key={f.slug} className="flex flex-wrap gap-1">
                            {f.programs.map((p) => (
                              <Badge key={p} variant="secondary" className="text-xs bg-teal-50 text-teal-700">
                                {p}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <span key={f.slug} className="text-stone-500">{t(labels.noneReported, locale)}</span>
                        )
                      )}
                      bestIdx={bestOf(fqhcs.map((f) => f.programs.length))}
                    />

                    {/* ---- EHR ---- */}
                    <CompareRow
                      label={t(labels.ehrLabel, locale)}
                      values={fqhcs.map((f) => f.ehrSystem || t(labels.unknown, locale))}
                    />

                    {/* ---- Resilience ---- */}
                    <tr className="bg-stone-50/80">
                      <td
                        colSpan={fqhcs.length + 1}
                        className="py-2.5 px-4 text-xs font-bold text-stone-500 uppercase tracking-wider"
                      >
                        <div className="flex items-center gap-2">
                          <Shield className="w-3.5 h-3.5" />
                          {t(labels.resilienceLabel, locale)}
                        </div>
                      </td>
                    </tr>
                    <CompareRow
                      label={t(labels.overallGrade, locale)}
                      values={scores.map((s, i) => (
                        <Badge key={i} className={`${gradeColor(s.grade)} font-bold text-sm`}>
                          {s.grade}
                        </Badge>
                      ))}
                    />
                    <CompareRow
                      label={t(labels.overallScore, locale)}
                      values={scores.map((s, i) => (
                        <span key={i} className="font-semibold">{s.overall}/100</span>
                      ))}
                      bestIdx={bestOf(scores.map((s) => s.overall))}
                    />
                    <CompareRow
                      label={t(labels.riskLevel, locale)}
                      values={scores.map((s, i) => (
                        <Badge key={i} className={`${riskColor(s.riskLevel)} text-xs capitalize`}>
                          {s.riskLevel}
                        </Badge>
                      ))}
                    />
                    {/* Individual dimensions */}
                    {DIMENSION_META.map((dim) => (
                      <CompareRow
                        key={dim.id}
                        label={t({ en: dim.en, es: dim.es }, locale)}
                        values={scores.map((s) => {
                          const d = s.dimensions.find((dd) => dd.dimension === dim.id);
                          return d ? `${d.score}/100` : t(labels.na, locale);
                        })}
                        bestIdx={bestOf(
                          scores.map(
                            (s) => s.dimensions.find((dd) => dd.dimension === dim.id)?.score ?? null
                          )
                        )}
                      />
                    ))}

                    {/* ---- Funding ---- */}
                    <tr className="bg-stone-50/80">
                      <td
                        colSpan={fqhcs.length + 1}
                        className="py-2.5 px-4 text-xs font-bold text-stone-500 uppercase tracking-wider"
                      >
                        {t(labels.fundingLabel, locale)}
                      </td>
                    </tr>
                    <CompareRow
                      label={t(labels.impactLevel, locale)}
                      values={fqhcs.map((f) => (
                        <Badge key={f.slug} className={`${impactColor(f.fundingImpactLevel)} text-xs capitalize`}>
                          {f.fundingImpactLevel || t(labels.unknown, locale)}
                        </Badge>
                      ))}
                    />
                    <CompareRow
                      label={t(labels.coverageRisk, locale)}
                      values={fqhcs.map((f) =>
                        f.coverageVulnerabilityPercent !== null
                          ? `${f.coverageVulnerabilityPercent}%`
                          : t(labels.na, locale)
                      )}
                      bestIdx={bestOf(
                        fqhcs.map((f) => f.coverageVulnerabilityPercent),
                        false // lower is better
                      )}
                    />

                    {/* ---- Union ---- */}
                    <tr className="bg-stone-50/80">
                      <td
                        colSpan={fqhcs.length + 1}
                        className="py-2.5 px-4 text-xs font-bold text-stone-500 uppercase tracking-wider"
                      >
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5" />
                          {t(labels.unionLabel, locale)}
                        </div>
                      </td>
                    </tr>
                    <CompareRow
                      label={t(labels.unionLabel, locale)}
                      values={fqhcs.map((f) => {
                        if (!f.unionInfo) return <span key={f.slug} className="text-stone-500">{t(labels.unknown, locale)}</span>;
                        if (f.unionInfo.unionized) {
                          return (
                            <div key={f.slug} className="space-y-1">
                              <Badge className="bg-blue-100 text-blue-800 text-xs">
                                {t(labels.unionized, locale)}
                              </Badge>
                              <p className="text-xs text-stone-600">
                                {f.unionInfo.unions.join(", ")}
                              </p>
                            </div>
                          );
                        }
                        return <span key={f.slug} className="text-stone-500">{t(labels.notUnionized, locale)}</span>;
                      })}
                    />

                    {/* ---- Certifications ---- */}
                    <tr className="bg-stone-50/80">
                      <td
                        colSpan={fqhcs.length + 1}
                        className="py-2.5 px-4 text-xs font-bold text-stone-500 uppercase tracking-wider"
                      >
                        {t(labels.certLabel, locale)}
                      </td>
                    </tr>
                    <CompareRow
                      label={t(labels.ecmLabel, locale)}
                      values={fqhcs.map((f) => (
                        <Badge key={f.slug} className={f.ecmProvider ? "bg-teal-100 text-teal-800 text-xs" : "bg-stone-100 text-stone-500 text-xs"}>
                          {f.ecmProvider ? t(labels.yes, locale) : t(labels.no, locale)}
                        </Badge>
                      ))}
                    />
                    <CompareRow
                      label={t(labels.nhscLabel, locale)}
                      values={fqhcs.map((f) => (
                        <Badge key={f.slug} className={f.nhscApproved ? "bg-teal-100 text-teal-800 text-xs" : "bg-stone-100 text-stone-500 text-xs"}>
                          {f.nhscApproved ? t(labels.yes, locale) : t(labels.no, locale)}
                        </Badge>
                      ))}
                    />

                    {/* ---- Data Completeness ---- */}
                    <CompareRow
                      label={t(labels.dataComplete, locale)}
                      values={scores.map((s, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="flex-1 bg-stone-100 rounded-full h-2 max-w-24">
                            <div
                              className="bg-teal-500 h-full rounded-full transition-all"
                              style={{ width: `${s.dataCompleteness}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium tabular-nums">{s.dataCompleteness}%</span>
                        </div>
                      ))}
                      bestIdx={bestOf(scores.map((s) => s.dataCompleteness))}
                    />

                    {/* ---- Profile Links ---- */}
                    <tr className="border-t border-stone-200">
                      <td className="py-4 px-4" />
                      {fqhcs.map((f) => (
                        <td key={f.slug} className="py-4 px-4">
                          <Link href={`/directory/${f.slug}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-teal-700 border-teal-200 hover:bg-teal-50 gap-1.5"
                            >
                              {t(labels.viewProfile, locale)}
                              <ChevronRight className="w-3.5 h-3.5" />
                            </Button>
                          </Link>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Dimension Bar Chart */}
            <DimensionChart fqhcs={fqhcs} scores={scores} locale={locale} />

            </div>{/* end comparison-content */}
          </>
        )}
      </section>
    </div>
  );
}
