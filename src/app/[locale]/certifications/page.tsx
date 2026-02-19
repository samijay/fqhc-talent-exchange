"use client";

import { useState, useMemo, Suspense } from "react";
import {
  Award,
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
} from "lucide-react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import {
  CERTIFICATIONS,
  type Certification,
  type CertImpactType,
  type CostTier,
} from "@/lib/certification-data";

const ROLE_OPTIONS = [
  { id: "all", en: "All Roles", es: "Todos los roles" },
  { id: "chw", en: "Community Health Worker", es: "Promotor(a) de Salud" },
  { id: "care-coordinator", en: "Care Coordinator", es: "Coordinador(a) de Cuidado" },
  { id: "medical-assistant", en: "Medical Assistant", es: "Asistente Médico" },
  { id: "case-manager", en: "Case Manager", es: "Gerente de Casos" },
  { id: "behavioral-health", en: "BH Specialist", es: "Especialista en Salud Conductual" },
  { id: "rn", en: "Registered Nurse", es: "Enfermero(a) Registrado(a)" },
  { id: "patient-services", en: "Patient Services", es: "Servicios al Paciente" },
  { id: "revenue-cycle", en: "Revenue Cycle", es: "Ciclo de Ingresos" },
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
  const [roleFilter, setRoleFilter] = useState(initialRole);
  const [costFilter, setCostFilter] = useState<CostTier | "all">("all");
  const [typeFilter, setTypeFilter] = useState<CertImpactType | "all">("all");
  const [expandedCert, setExpandedCert] = useState<string | null>(null);

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
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal-700/50 px-4 py-1.5 text-sm font-medium">
            <Award className="size-4" />
            {isEs ? "Certificaciones de California" : "California Certifications"}
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {isEs
              ? "Certificaciones para carreras en FQHCs"
              : "Certifications for FQHC Careers"}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-teal-100">
            {isEs
              ? "15 certificaciones con costos, duración, impacto salarial y programas de capacitación específicos de California."
              : "15 certifications with costs, duration, salary impact, and California-specific training programs."}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="rounded-xl border border-stone-200 bg-white p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-stone-700">
            <Filter className="size-4" />
            {isEs ? "Filtrar certificaciones" : "Filter certifications"}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-stone-500">
                {isEs ? "Rol" : "Role"}
              </label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                {ROLE_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {isEs ? opt.es : opt.en}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-stone-500">
                {isEs ? "Costo" : "Cost"}
              </label>
              <select
                value={costFilter}
                onChange={(e) => setCostFilter(e.target.value as CostTier | "all")}
                className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                {COST_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {isEs ? opt.es : opt.en}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-stone-500">
                {isEs ? "Tipo" : "Type"}
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as CertImpactType | "all")}
                className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                {TYPE_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {isEs ? opt.es : opt.en}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-3 text-xs text-stone-400">
            {isEs
              ? `${filtered.length} de ${CERTIFICATIONS.length} certificaciones`
              : `${filtered.length} of ${CERTIFICATIONS.length} certifications`}
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="mt-8 rounded-xl border border-stone-200 bg-white p-8 text-center text-stone-500">
            {isEs
              ? "No se encontraron certificaciones con estos filtros."
              : "No certifications match these filters."}
          </div>
        ) : (
          <>
            {/* Required & Salary Boost */}
            {recommended.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-4 text-lg font-bold text-stone-900">
                  {isEs ? "Requeridas y con aumento salarial" : "Required & Salary Boosters"}
                </h2>
                <div className="space-y-3">
                  {recommended.map((cert) => (
                    <CertCard
                      key={cert.id}
                      cert={cert}
                      isEs={isEs}
                      isExpanded={expandedCert === cert.id}
                      onToggle={() =>
                        setExpandedCert(expandedCert === cert.id ? null : cert.id)
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Resume Boost */}
            {other.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-4 text-lg font-bold text-stone-900">
                  {isEs ? "Mejoras para el currículum" : "Resume Differentiators"}
                </h2>
                <div className="space-y-3">
                  {other.map((cert) => (
                    <CertCard
                      key={cert.id}
                      cert={cert}
                      isEs={isEs}
                      isExpanded={expandedCert === cert.id}
                      onToggle={() =>
                        setExpandedCert(expandedCert === cert.id ? null : cert.id)
                      }
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
            className="flex items-center justify-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-6 py-4 text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-100"
          >
            <ClipboardCheck className="size-4" />
            {isEs ? "Tomar evaluación profesional" : "Take Career Assessment"}
          </Link>
          <Link
            href="/career-roadmap"
            className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-6 py-4 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50"
          >
            <TrendingUp className="size-4" />
            {isEs ? "Ver trayectorias profesionales" : "Career Roadmap"}
          </Link>
          <Link
            href="/resume-builder"
            className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-6 py-4 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50"
          >
            <FileText className="size-4" />
            {isEs ? "Crear currículum" : "Build Resume"}
          </Link>
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
}: {
  cert: Certification;
  isEs: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const badge = IMPACT_BADGES[cert.impactType];

  return (
    <div className="rounded-xl border border-stone-200 bg-white transition-shadow hover:shadow-sm">
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 p-5 text-left"
      >
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-stone-900">
              {isEs ? cert.esName : cert.name}
            </h3>
            <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-semibold text-stone-600">
              {cert.abbreviation}
            </span>
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${badge.color}`}>
              {badge.icon}
              {isEs ? badge.es : badge.en}
            </span>
          </div>
          <p className="mt-1 text-sm text-stone-500">
            {isEs ? cert.esIssuer : cert.issuer}
          </p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-stone-600">
            <span className="flex items-center gap-1">
              <DollarSign className="size-3.5 text-stone-400" />
              {isEs ? cert.esCostRange : cert.costRange}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5 text-stone-400" />
              {isEs ? cert.esDuration : cert.duration}
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp className="size-3.5 text-stone-400" />
              {isEs ? cert.esSalaryImpact : cert.salaryImpact}
            </span>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="size-5 shrink-0 text-stone-400" />
        ) : (
          <ChevronDown className="size-5 shrink-0 text-stone-400" />
        )}
      </button>

      {isExpanded && (
        <div className="border-t border-stone-100 px-5 pb-5 pt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Description */}
            <div>
              <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-stone-500">
                {isEs ? "Descripción" : "Description"}
              </h4>
              <p className="text-sm leading-relaxed text-stone-700">
                {isEs ? cert.esDescription : cert.description}
              </p>
            </div>

            {/* California Note */}
            <div>
              <h4 className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-stone-500">
                <MapPin className="size-3" />
                {isEs ? "Nota de California" : "California Note"}
              </h4>
              <p className="text-sm leading-relaxed text-stone-700">
                {isEs ? cert.esCaliforniaNote : cert.californiaNote}
              </p>
            </div>

            {/* Where to get it */}
            <div className="sm:col-span-2">
              <h4 className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-stone-500">
                <Briefcase className="size-3" />
                {isEs ? "Dónde obtenerlo en California" : "Where to Get It in California"}
              </h4>
              <ul className="mt-1 space-y-0.5">
                {(isEs ? cert.esWhereToGet : cert.whereToGet).map((place) => (
                  <li key={place} className="text-sm text-stone-600">
                    &bull; {place}
                  </li>
                ))}
              </ul>
            </div>

            {/* Renewal */}
            <div className="sm:col-span-2">
              <span className="text-xs text-stone-400">
                {isEs ? "Renovación" : "Renewal"}: {isEs ? cert.esRenewalPeriod : cert.renewalPeriod}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
