"use client";

import { useState, useMemo, useCallback, Suspense } from "react";
import {
  DollarSign,
  Clock,
  MapPin,
  ChevronDown,
  ChevronUp,
  Filter,
  TrendingUp,
  Shield,
  Star,
  FileText,
  ClipboardCheck,
  Briefcase,
  Share2,
  Check,
} from "lucide-react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Breadcrumb, PageHero } from "@/components/ui/design-system";
import { CareerFunnelStep } from "@/components/ui/CareerFunnelStep";
import {
  CERTIFICATIONS,
  type Certification,
  type CertImpactType,
  type CostTier,
} from "@/lib/certification-data";
import { useContentReads, type ContentRead } from "@/hooks/useContentReads";
import { ReadStatusBadge } from "@/components/content/ReadStatusBadge";
import { FavoriteButton } from "@/components/dashboard/FavoriteButton";
import { ReadingLevelBadge } from "@/components/ui/ReadingLevelBadge";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";

const ROLE_OPTIONS = [
  { id: "all", en: "All Roles", es: "Todos los roles" },
  // Clinical & Care
  { id: "chw", en: "Community Health Worker", es: "Promotor(a) de Salud" },
  { id: "care_coordinator", en: "Care Coordinator", es: "Coordinador(a) de Cuidado" },
  { id: "medical_assistant", en: "Medical Assistant", es: "Asistente Médico" },
  { id: "case_manager", en: "Case Manager", es: "Gerente de Casos" },
  { id: "behavioral_health", en: "BH Specialist", es: "Especialista en Salud Conductual" },
  { id: "registered_nurse", en: "Registered Nurse", es: "Enfermero(a) Registrado(a)" },
  { id: "charge-nurse", en: "Charge Nurse", es: "Enfermero(a) a Cargo" },
  { id: "nurse-manager", en: "Nurse Manager", es: "Gerente de Enfermería" },
  { id: "cno", en: "Chief Nursing Officer", es: "Director(a) de Enfermería" },
  { id: "licensed-therapist", en: "Licensed Therapist", es: "Terapeuta Licenciado(a)" },
  // Operations & Admin
  { id: "patient_services", en: "Patient Services", es: "Servicios al Paciente" },
  { id: "clinical-ops-supervisor", en: "Clinical Ops Supervisor", es: "Supervisor(a) de Ops Clínicas" },
  { id: "hr_manager", en: "HR Manager", es: "Gerente de Recursos Humanos" },
  // Finance & Revenue
  { id: "revenue_cycle", en: "Revenue Cycle", es: "Ciclo de Ingresos" },
  { id: "accountant", en: "Accountant", es: "Contador(a)" },
  { id: "payroll_specialist", en: "Payroll Specialist", es: "Especialista en Nómina" },
  { id: "finance_manager", en: "Finance Manager", es: "Gerente de Finanzas" },
  { id: "director-finance", en: "Finance Director", es: "Director(a) de Finanzas" },
  // Compliance
  { id: "compliance_analyst", en: "Compliance Analyst", es: "Analista de Cumplimiento" },
  { id: "compliance_officer", en: "Compliance Officer", es: "Oficial de Cumplimiento" },
  { id: "compliance_manager", en: "Compliance Manager", es: "Gerente de Cumplimiento" },
];

const COST_OPTIONS: { id: CostTier | "all"; en: string; es: string }[] = [
  { id: "all", en: "Any cost", es: "Cualquier costo" },
  { id: "free", en: "Free", es: "Gratis" },
  { id: "under_500", en: "Under $500", es: "Menos de $500" },
  { id: "under_1000", en: "Under $1,000", es: "Menos de $1,000" },
  { id: "over_1000", en: "$1,000+", es: "$1,000+" },
];

const TYPE_OPTIONS: { id: CertImpactType | "all"; en: string; es: string }[] = [
  { id: "all", en: "All types", es: "Todos los tipos" },
  { id: "required", en: "Required", es: "Requerido" },
  { id: "salary_boost", en: "Salary boost", es: "Aumento salarial" },
  { id: "resume_boost", en: "Resume boost", es: "Mejora de currículum" },
];

const IMPACT_BADGES: Record<CertImpactType, { en: string; es: string; color: string; icon: React.ReactNode }> = {
  required: { en: "Required", es: "Requerido", color: "bg-red-100 text-red-700", icon: <Shield className="size-3" /> },
  salary_boost: { en: "Salary Boost", es: "Aumento Salarial", color: "bg-green-100 text-green-700", icon: <TrendingUp className="size-3" /> },
  resume_boost: { en: "Resume Boost", es: "Mejora de CV", color: "bg-blue-100 text-blue-700", icon: <Star className="size-3" /> },
};

export default function CertificationsPage() {
  return (
    <Suspense>
      <CertificationsContent />
    </Suspense>
  );
}

function CertificationsContent() {
  const locale = useLocale();
  const isEs = locale === "es";
  const searchParams = useSearchParams();

  const initialRole = searchParams.get("role") || "all";
  const initialCost = (searchParams.get("cost") || "all") as CostTier | "all";
  const initialType = (searchParams.get("type") || "all") as CertImpactType | "all";
  const [roleFilter, setRoleFilter] = useState(initialRole);
  const [costFilter, setCostFilter] = useState<CostTier | "all">(initialCost);
  const [typeFilter, setTypeFilter] = useState<CertImpactType | "all">(initialType);
  const [expandedCert, setExpandedCert] = useState<string | null>(null);
  const [shareState, setShareState] = useState<"idle" | "copied">("idle");
  const { reads, markAsReading } = useContentReads("certification");

  const syncUrl = useCallback((role: string, cost: string, type: string) => {
    const localePath = locale === "es" ? "/es" : "";
    const params = new URLSearchParams();
    if (role !== "all") params.set("role", role);
    if (cost !== "all") params.set("cost", cost);
    if (type !== "all") params.set("type", type);
    const qs = params.toString();
    window.history.replaceState({}, "", `${localePath}/certifications${qs ? `?${qs}` : ""}`);
  }, [locale]);

  const handleShare = useCallback(async () => {
    const base = typeof window !== "undefined" ? window.location.origin : "";
    const localePath = locale === "es" ? "/es" : "";
    const params = new URLSearchParams();
    if (roleFilter !== "all") params.set("role", roleFilter);
    if (costFilter !== "all") params.set("cost", costFilter);
    if (typeFilter !== "all") params.set("type", typeFilter);
    const qs = params.toString();
    const url = `${base}${localePath}/certifications${qs ? `?${qs}` : ""}`;

    if (navigator.share) {
      try { await navigator.share({ title: isEs ? "Certificaciones FQHC" : "FQHC Certifications", url }); return; } catch { /* fall through */ }
    }
    try {
      await navigator.clipboard.writeText(url);
      setShareState("copied");
      setTimeout(() => setShareState("idle"), 2000);
    } catch {
      window.prompt(isEs ? "Copia este enlace:" : "Copy this link:", url);
    }
  }, [locale, roleFilter, costFilter, typeFilter, isEs]);

  const filtered = useMemo(() => {
    return CERTIFICATIONS.filter((cert) => {
      if (roleFilter !== "all") {
        const matchesRole =
          cert.requiredFor.includes(roleFilter) || cert.helpfulFor.includes(roleFilter);
        if (!matchesRole) return false;
      }
      if (costFilter !== "all" && cert.costTier !== costFilter) return false;
      if (typeFilter !== "all" && cert.impactType !== typeFilter) return false;
      return true;
    });
  }, [roleFilter, costFilter, typeFilter]);

  // Separate into recommended (required + salary_boost) and other
  const recommended = filtered.filter(
    (c) => c.impactType === "required" || c.impactType === "salary_boost"
  );
  const other = filtered.filter((c) => c.impactType === "resume_boost");

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <Breadcrumb items={[
        { label: isEs ? "Inicio" : "Home", href: "/" },
        { label: isEs ? "Herramientas" : "Tools", href: "/certifications" },
        { label: isEs ? "Certificaciones" : "Certifications" },
      ]} />
      <PageHero
        variant="dark"
        title={{
          en: "Certifications for FQHC Careers",
          es: "Certificaciones para carreras en FQHCs",
        }}
        subtitle={{
          en: "15 certifications with costs, duration, salary impact, and California-specific training programs.",
          es: "15 certificaciones con costos, duración, impacto salarial y programas de capacitación específicos de California.",
        }}
        meta={isEs ? "Certificaciones de California" : "California Certifications"}
      >
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 rounded-full border border-stone-600 bg-stone-800/50 px-4 py-2 text-sm font-medium text-stone-300 transition-all hover:bg-stone-700/60"
        >
          {shareState === "copied" ? (
            <><Check className="size-4" />{isEs ? "¡Enlace copiado!" : "Link copied!"}</>
          ) : (
            <><Share2 className="size-4" />{isEs ? "Compartir" : "Share"}</>
          )}
        </button>
      </PageHero>

      {/* Career Funnel */}
      <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 lg:px-8">
        <CareerFunnelStep currentStep={3} locale={locale} />
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-stone-700 dark:text-stone-300">
            <Filter className="size-4" />
            {isEs ? "Filtrar certificaciones" : "Filter certifications"}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-stone-500 dark:text-stone-400">
                {isEs ? "Rol" : "Role"}
              </label>
              <select
                value={roleFilter}
                onChange={(e) => { setRoleFilter(e.target.value); syncUrl(e.target.value, costFilter, typeFilter); }}
                className="w-full rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-2 text-sm text-stone-700 dark:text-stone-300 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                {ROLE_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {isEs ? opt.es : opt.en}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-stone-500 dark:text-stone-400">
                {isEs ? "Costo" : "Cost"}
              </label>
              <select
                value={costFilter}
                onChange={(e) => { const v = e.target.value as CostTier | "all"; setCostFilter(v); syncUrl(roleFilter, v, typeFilter); }}
                className="w-full rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-2 text-sm text-stone-700 dark:text-stone-300 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                {COST_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {isEs ? opt.es : opt.en}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-stone-500 dark:text-stone-400">
                {isEs ? "Tipo" : "Type"}
              </label>
              <select
                value={typeFilter}
                onChange={(e) => { const v = e.target.value as CertImpactType | "all"; setTypeFilter(v); syncUrl(roleFilter, costFilter, v); }}
                className="w-full rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-2 text-sm text-stone-700 dark:text-stone-300 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                {TYPE_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {isEs ? opt.es : opt.en}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-3 text-xs text-stone-500 dark:text-stone-400">
            {isEs
              ? `${filtered.length} de ${CERTIFICATIONS.length} certificaciones`
              : `${filtered.length} of ${CERTIFICATIONS.length} certifications`}
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="mt-8 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-8 text-center text-stone-500 dark:text-stone-400">
            {isEs
              ? "No se encontraron certificaciones con estos filtros."
              : "No certifications match these filters."}
          </div>
        ) : (
          <>
            {/* Required & Salary Boost */}
            {recommended.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-4 text-lg font-bold text-stone-900 dark:text-stone-100">
                  {isEs ? "Requeridas y con aumento salarial" : "Required & Salary Boosters"}
                </h2>
                <div className="space-y-3">
                  {recommended.map((cert) => (
                    <CertCard
                      key={cert.id}
                      cert={cert}
                      isEs={isEs}
                      isExpanded={expandedCert === cert.id}
                      onToggle={() => {
                        const expanding = expandedCert !== cert.id;
                        setExpandedCert(expanding ? cert.id : null);
                        if (expanding) markAsReading(cert.id);
                      }}
                      read={reads.get(cert.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Resume Boost */}
            {other.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-4 text-lg font-bold text-stone-900 dark:text-stone-100">
                  {isEs ? "Mejoras para el currículum" : "Resume Differentiators"}
                </h2>
                <div className="space-y-3">
                  {other.map((cert) => (
                    <CertCard
                      key={cert.id}
                      cert={cert}
                      isEs={isEs}
                      isExpanded={expandedCert === cert.id}
                      onToggle={() => {
                        const expanding = expandedCert !== cert.id;
                        setExpandedCert(expanding ? cert.id : null);
                        if (expanding) markAsReading(cert.id);
                      }}
                      read={reads.get(cert.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* CTAs */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Link
            href="/career-insights"
            className="flex items-center justify-center gap-2 rounded-xl border border-teal-200 bg-teal-50 dark:bg-teal-950 px-6 py-4 text-sm font-semibold text-teal-700 dark:text-teal-400 transition-colors hover:bg-teal-100 dark:hover:bg-teal-900"
          >
            <ClipboardCheck className="size-4" />
            {isEs ? "Tomar evaluacion profesional" : "Take Career Assessment"}
          </Link>
          <Link
            href="/career-roadmap"
            className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 px-6 py-4 text-sm font-semibold text-stone-700 dark:text-stone-300 transition-colors hover:bg-stone-50 dark:hover:bg-stone-800"
          >
            <TrendingUp className="size-4" />
            {isEs ? "Ver trayectorias profesionales" : "Career Roadmap"}
          </Link>
          <Link
            href="/resume-builder"
            className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 px-6 py-4 text-sm font-semibold text-stone-700 dark:text-stone-300 transition-colors hover:bg-stone-50 dark:hover:bg-stone-800"
          >
            <FileText className="size-4" />
            {isEs ? "Crear curriculum" : "Build Resume"}
          </Link>
        </div>

        {/* Related Tools */}
        <div className="mt-12 border-t border-stone-200 dark:border-stone-700 pt-8">
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-4">
            {isEs ? "Explora Mas" : "Explore More"}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/career-roadmap" className="rounded-lg border border-stone-200 dark:border-stone-700 p-4 hover:border-teal-200 hover:bg-teal-50/30 transition-colors">
              <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">{isEs ? "Trayectoria Profesional" : "Career Roadmap"}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{isEs ? "5 trayectorias, 4 niveles, datos salariales de CA" : "5 tracks, 4 levels, CA salary data"}</p>
            </Link>
            <Link href="/resources" className="rounded-lg border border-stone-200 dark:border-stone-700 p-4 hover:border-teal-200 hover:bg-teal-50/30 transition-colors">
              <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">{isEs ? "Recursos de Carrera" : "Career Resources"}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{isEs ? "18 programas gratuitos y de bajo costo" : "18 free and low-cost programs"}</p>
            </Link>
            <Link href="/salary-data" className="rounded-lg border border-stone-200 dark:border-stone-700 p-4 hover:border-teal-200 hover:bg-teal-50/30 transition-colors">
              <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">{isEs ? "Inteligencia Salarial" : "Salary Intelligence"}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{isEs ? "30 roles x 9 regiones de CA" : "30 roles x 9 CA regions"}</p>
            </Link>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 mb-8">
          <NewsletterSignup
            variant="card"
            defaultAudience="the-pulse"
          />
        </div>
      </div>
    </div>
  );
}

function CertCard({
  cert,
  isEs,
  isExpanded,
  onToggle,
  read,
}: {
  cert: Certification;
  isEs: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  read: ContentRead | undefined;
}) {
  const badge = IMPACT_BADGES[cert.impactType];

  return (
    <div className="relative rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 transition-shadow hover:shadow-sm">
      <div className="absolute right-12 top-5 z-10 flex items-center gap-1">
        <FavoriteButton contentType="certification" contentId={cert.id} size="sm" />
      </div>
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 p-5 text-left"
        aria-expanded={isExpanded}
      >
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <ReadStatusBadge read={read} />
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
              {isEs ? cert.esName : cert.name}
            </h3>
            <span className="rounded-full bg-stone-100 dark:bg-stone-800 px-2 py-0.5 text-xs font-semibold text-stone-600 dark:text-stone-400">
              {cert.abbreviation}
            </span>
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${badge.color}`}>
              {badge.icon}
              {isEs ? badge.es : badge.en}
            </span>
            <ReadingLevelBadge level={cert.impactType === "required" ? "foundational" : cert.impactType === "salary_boost" ? "intermediate" : "advanced"} size="sm" />
          </div>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            {isEs ? cert.esIssuer : cert.issuer}
          </p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-stone-600 dark:text-stone-400">
            <span className="flex items-center gap-1">
              <DollarSign className="size-3.5 text-stone-500 dark:text-stone-400" />
              {isEs ? cert.esCostRange : cert.costRange}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5 text-stone-500 dark:text-stone-400" />
              {isEs ? cert.esDuration : cert.duration}
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp className="size-3.5 text-stone-500 dark:text-stone-400" />
              {isEs ? cert.esSalaryImpact : cert.salaryImpact}
            </span>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="size-5 shrink-0 text-stone-500 dark:text-stone-400" />
        ) : (
          <ChevronDown className="size-5 shrink-0 text-stone-500 dark:text-stone-400" />
        )}
      </button>

      {isExpanded && (
        <div className="border-t border-stone-100 dark:border-stone-800 px-5 pb-5 pt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Description */}
            <div>
              <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                {isEs ? "Descripción" : "Description"}
              </h4>
              <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                {isEs ? cert.esDescription : cert.description}
              </p>
            </div>

            {/* California Note */}
            <div>
              <h4 className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                <MapPin className="size-3" />
                {isEs ? "Nota de California" : "California Note"}
              </h4>
              <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                {isEs ? cert.esCaliforniaNote : cert.californiaNote}
              </p>
            </div>

            {/* Where to get it */}
            <div className="sm:col-span-2">
              <h4 className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                <Briefcase className="size-3" />
                {isEs ? "Dónde obtenerlo en California" : "Where to Get It in California"}
              </h4>
              <ul className="mt-1 space-y-0.5">
                {(isEs ? cert.esWhereToGet : cert.whereToGet).map((place) => (
                  <li key={place} className="text-sm text-stone-600 dark:text-stone-400">
                    &bull; {place}
                  </li>
                ))}
              </ul>
            </div>

            {/* Renewal */}
            <div className="sm:col-span-2">
              <span className="text-xs text-stone-500 dark:text-stone-400">
                {isEs ? "Renovación" : "Renewal"}: {isEs ? cert.esRenewalPeriod : cert.renewalPeriod}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
