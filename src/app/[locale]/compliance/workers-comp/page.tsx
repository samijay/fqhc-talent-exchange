"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Shield,
  AlertTriangle,
  DollarSign,
  TrendingDown,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  WORKERS_COMP_LAST_UPDATED,
  HAZARDS,
  COST_REDUCTION_STRATEGIES,
  CASE_STUDIES,
  type WorkersCompHazard,
  type CostReductionStrategy,
  type WorkersCompCaseStudy,
  type HazardCategory,
} from "@/lib/workers-comp-data";

/* ================================================================ */
/*  Helpers                                                           */
/* ================================================================ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

const HAZARD_CATEGORY_LABELS: Record<HazardCategory, { en: string; es: string }> = {
  "needlestick-sharps": {
    en: "Sharps & Bloodborne",
    es: "Objetos Punzantes y Patógenos",
  },
  musculoskeletal: {
    en: "Back & Musculoskeletal",
    es: "Espalda y Musculoesquelético",
  },
  "workplace-violence": {
    en: "Workplace Violence",
    es: "Violencia Laboral",
  },
  "respiratory-infectious": {
    en: "Respiratory & Infectious",
    es: "Respiratorio e Infeccioso",
  },
  "repetitive-strain": {
    en: "Repetitive Strain",
    es: "Esfuerzo Repetitivo",
  },
  "chemical-exposure": {
    en: "Chemical Exposure",
    es: "Exposición Química",
  },
  "slips-trips-falls": {
    en: "Slips, Trips & Falls",
    es: "Resbalones, Tropiezos y Caídas",
  },
  "bloodborne-pathogen": {
    en: "Bloodborne Pathogens",
    es: "Patógenos Transmitidos por Sangre",
  },
  "latex-allergy": {
    en: "Latex & Allergies",
    es: "Látex y Alergias",
  },
  "ergonomic-dental": {
    en: "Dental Ergonomics",
    es: "Ergonomía Dental",
  },
  "stress-burnout": {
    en: "Stress & Burnout",
    es: "Estrés y Agotamiento",
  },
  "vehicle-accidents": {
    en: "Vehicle Accidents",
    es: "Accidentes Vehiculares",
  },
  "drug-diversion": {
    en: "Drug Diversion",
    es: "Desviación de Drogas",
  },
  "radiation-exposure": {
    en: "Radiation Exposure",
    es: "Exposición a Radiación",
  },
  "electrical-hazards": {
    en: "Electrical Hazards",
    es: "Peligros Eléctricos",
  },
};

function difficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "easy":
      return "bg-green-50 text-green-700 border-green-200";
    case "moderate":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "complex":
      return "bg-orange-50 text-orange-700 border-orange-200";
    default:
      return "bg-stone-50 text-stone-700 border-stone-200";
  }
}

function difficultyLabel(difficulty: string, isEs: boolean): string {
  const labels: Record<string, { en: string; es: string }> = {
    easy: { en: "Easy", es: "Fácil" },
    moderate: { en: "Moderate", es: "Moderado" },
    complex: { en: "Complex", es: "Complejo" },
  };
  return isEs ? labels[difficulty]?.es || difficulty : labels[difficulty]?.en || difficulty;
}

/* ================================================================ */
/*  Stat Card Component                                              */
/* ================================================================ */

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext?: string;
}

function StatCard({ icon, label, value, subtext }: StatCardProps) {
  return (
    <div className="rounded-lg border border-teal-200 bg-gradient-to-br from-teal-50 to-teal-100 p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="text-teal-700">{icon}</div>
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-stone-600 mb-1">
            {label}
          </p>
          <p className="text-lg sm:text-2xl font-bold text-teal-900">{value}</p>
          {subtext && (
            <p className="text-xs text-teal-700 mt-1">{subtext}</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================================================================ */
/*  Cost Calculator Component                                        */
/* ================================================================ */

interface CalcInputProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

function CalcInput({ label, value, onChange, min = 10, max = 500, step = 10 }: CalcInputProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-stone-700">{label}</label>
        <span className="text-sm font-semibold text-teal-700">{value}</span>
      </div>
      <Input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 accent-teal-700"
      />
      <p className="text-xs text-stone-500">
        {min.toLocaleString()} — {max.toLocaleString()}
      </p>
    </div>
  );
}

function CostCalculator({ locale }: { locale: string }) {
  const isEs = locale === "es";
  const [staffCount, setStaffCount] = useState(150);
  const [clinicalPct, setClinicalPct] = useState(60);
  const [adminPct, setAdminPct] = useState(25);
  const [dentalPct, setDentalPct] = useState(15);

  // Calculate estimated costs
  const estimatedAnnualCost = staffCount * 1500; // ~$1.5K per employee average
  const potentialSavings = estimatedAnnualCost * 0.45; // 35-65% average, using 45%
  const savingsLow = estimatedAnnualCost * 0.35;
  const savingsHigh = estimatedAnnualCost * 0.65;

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <CalcInput
          label={isEs ? "Número de Empleados" : "Staff Count"}
          value={staffCount}
          onChange={setStaffCount}
          min={10}
          max={500}
        />
        <div className="space-y-3 sm:col-span-2">
          <p className="text-sm font-medium text-stone-700">
            {isEs ? "Composición de Roles" : "Role Mix"}
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-600">
                {isEs ? "Personal Clínico" : "Clinical"}: {clinicalPct}%
              </span>
              <input
                type="range"
                min={0}
                max={100}
                value={clinicalPct}
                onChange={(e) => setClinicalPct(Number(e.target.value))}
                className="h-1.5 flex-1 mx-2 accent-teal-700"
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-600">
                {isEs ? "Administración" : "Admin"}: {adminPct}%
              </span>
              <input
                type="range"
                min={0}
                max={100}
                value={adminPct}
                onChange={(e) => setAdminPct(Number(e.target.value))}
                className="h-1.5 flex-1 mx-2 accent-teal-700"
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-600">
                {isEs ? "Dental" : "Dental"}: {dentalPct}%
              </span>
              <input
                type="range"
                min={0}
                max={100}
                value={dentalPct}
                onChange={(e) => setDentalPct(Number(e.target.value))}
                className="h-1.5 flex-1 mx-2 accent-teal-700"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="border-t-2 border-teal-200 pt-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-lg bg-stone-50 p-4">
            <p className="text-xs text-stone-600 mb-1">
              {isEs ? "Costo Anual Estimado" : "Estimated Annual Cost"}
            </p>
            <p className="text-2xl font-bold text-stone-900">
              ${(estimatedAnnualCost / 1000).toFixed(0)}K
            </p>
          </div>
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
            <p className="text-xs text-amber-700 mb-1">
              {isEs ? "Ahorros Potenciales (Promedio)" : "Potential Savings (Avg)"}
            </p>
            <p className="text-2xl font-bold text-amber-900">
              ${(potentialSavings / 1000).toFixed(0)}K
            </p>
          </div>
          <div className="rounded-lg bg-green-50 border border-green-200 p-4">
            <p className="text-xs text-green-700 mb-1">
              {isEs ? "Rango de Ahorros" : "Savings Range"}
            </p>
            <p className="text-sm font-bold text-green-900">
              ${(savingsLow / 1000).toFixed(0)}K – ${(savingsHigh / 1000).toFixed(0)}K
            </p>
          </div>
        </div>
        <p className="text-xs text-stone-600 italic">
          {isEs
            ? "Estimado basado en datos de Cal/OSHA. Los ahorros reales dependen de la implementación de estrategias y de las tasas de lesiones actuales."
            : "Estimated based on Cal/OSHA data. Actual savings depend on strategy implementation and current injury rates."}
        </p>
      </div>
    </div>
  );
}

/* ================================================================ */
/*  Hazard Card Component                                            */
/* ================================================================ */

function HazardCard({
  hazard,
  locale,
}: {
  hazard: WorkersCompHazard;
  locale: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const isEs = locale === "es";

  return (
    <div className="rounded-lg border border-stone-200 bg-white transition-shadow hover:shadow-md">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 sm:p-5 flex items-start gap-3"
      >
        <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-stone-900">
            {t(hazard.title, locale)}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
            {hazard.description.en.substring(0, 120)}
            {hazard.description.en.length > 120 ? "..." : ""}
          </p>
          <div className="mt-2 flex flex-wrap gap-2 items-center">
            <Badge variant="outline" className="text-xs">
              {hazard.caIncidenceRate.toFixed(1)}/10K
            </Badge>
            <Badge variant="outline" className="text-xs">
              ${(hazard.averageCostPerClaim / 1000).toFixed(1)}K per claim
            </Badge>
          </div>
        </div>
        <div className="shrink-0 text-stone-500">
          {expanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-stone-200 bg-stone-50 p-4 sm:p-5 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-stone-900 mb-2">
              {isEs ? "Descripción" : "Description"}
            </h4>
            <p className="text-sm text-stone-700 leading-relaxed">
              {t(hazard.description, locale)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded bg-white p-3">
              <p className="text-xs font-medium text-stone-600">
                {isEs ? "Tasa de Incidencia en CA" : "CA Incidence Rate"}
              </p>
              <p className="text-lg font-bold text-stone-900 mt-1">
                {hazard.caIncidenceRate.toFixed(1)}/10K
              </p>
            </div>
            <div className="rounded bg-white p-3">
              <p className="text-xs font-medium text-stone-600">
                {isEs ? "Costo Medio por Reclamo" : "Avg Claim Cost"}
              </p>
              <p className="text-lg font-bold text-stone-900 mt-1">
                ${(hazard.averageCostPerClaim / 1000).toFixed(1)}K
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-stone-900 mb-2">
              {isEs ? "Roles Afectados" : "Affected Roles"}
            </h4>
            <div className="flex flex-wrap gap-1">
              {hazard.affectedRoles.map((role) => (
                <Badge key={role} variant="secondary" className="text-xs">
                  {role}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-stone-900 mb-2">
              {isEs ? "Estrategias de Prevención" : "Prevention Strategies"}
            </h4>
            <ul className="space-y-2">
              {hazard.preventionStrategies.map((strategy, idx) => (
                <li
                  key={idx}
                  className="flex gap-2 text-sm text-stone-700 leading-relaxed"
                >
                  <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{t(strategy, locale)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 border-t border-stone-200">
            <a
              href={hazard.primarySourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-teal-700 hover:text-teal-900 font-medium flex items-center gap-1"
            >
              <ExternalLink className="h-3 w-3" />
              {hazard.primarySourceOrg} — {isEs ? "Ver Regulación" : "View Regulation"}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================================================ */
/*  Strategy Card Component                                          */
/* ================================================================ */

function StrategyCard({
  strategy,
  locale,
}: {
  strategy: CostReductionStrategy;
  locale: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const isEs = locale === "es";
  const avgCost =
    (strategy.implementationCost.min + strategy.implementationCost.max) / 2;
  const avgSavings =
    (strategy.annualSavings.min + strategy.annualSavings.max) / 2;
  const roi =
    avgCost > 0 ? ((avgSavings - avgCost) / avgCost) * 100 : 0;

  return (
    <div className="rounded-lg border border-stone-200 bg-white transition-shadow hover:shadow-md">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 sm:p-5 flex items-start gap-3"
      >
        <Zap className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-stone-900">
            {t(strategy.title, locale)}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 line-clamp-2">
            {t(strategy.description, locale)}
          </p>
          <div className="mt-2 flex flex-wrap gap-2 items-center">
            <Badge
              variant="outline"
              className={`text-xs ${difficultyColor(strategy.difficulty)}`}
            >
              {difficultyLabel(strategy.difficulty, isEs)}
            </Badge>
            <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700 border-teal-200">
              ROI: {roi.toFixed(0)}%
            </Badge>
            <Badge variant="outline" className="text-xs">
              {strategy.timelineMonths} {isEs ? "mes(es)" : "month(s)"}
            </Badge>
          </div>
        </div>
        <div className="shrink-0 text-stone-500">
          {expanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-stone-200 bg-stone-50 p-4 sm:p-5 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-stone-900 mb-2">
              {isEs ? "Descripción" : "Description"}
            </h4>
            <p className="text-sm text-stone-700 leading-relaxed">
              {t(strategy.description, locale)}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded bg-white p-3">
              <p className="text-xs font-medium text-stone-600">
                {isEs ? "Inversión" : "Investment"}
              </p>
              <p className="text-sm font-bold text-stone-900 mt-1">
                ${(strategy.implementationCost.min / 1000).toFixed(0)}K–
                ${(strategy.implementationCost.max / 1000).toFixed(0)}K
              </p>
            </div>
            <div className="rounded bg-white p-3">
              <p className="text-xs font-medium text-stone-600">
                {isEs ? "Ahorros Anuales" : "Annual Savings"}
              </p>
              <p className="text-sm font-bold text-stone-900 mt-1">
                ${(strategy.annualSavings.min / 1000).toFixed(0)}K–
                ${(strategy.annualSavings.max / 1000).toFixed(0)}K
              </p>
            </div>
            <div className="rounded bg-green-50 border border-green-200 p-3">
              <p className="text-xs font-medium text-green-700">ROI (Avg)</p>
              <p className="text-sm font-bold text-green-900 mt-1">
                {roi.toFixed(0)}%
              </p>
            </div>
            <div className="rounded bg-amber-50 border border-amber-200 p-3">
              <p className="text-xs font-medium text-amber-700">
                {isEs ? "Plazo" : "Timeline"}
              </p>
              <p className="text-sm font-bold text-amber-900 mt-1">
                {strategy.timelineMonths} {isEs ? "meses" : "months"}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-stone-900 mb-2">
              {isEs ? "Pasos de Implementación" : "Implementation Steps"}
            </h4>
            <ol className="space-y-2">
              {strategy.steps.map((step, idx) => (
                <li
                  key={idx}
                  className="flex gap-2 text-sm text-stone-700 leading-relaxed"
                >
                  <span className="font-bold text-teal-700 shrink-0">
                    {idx + 1}.
                  </span>
                  <span>{t(step, locale)}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="pt-2 border-t border-stone-200">
            <a
              href={strategy.primarySourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-teal-700 hover:text-teal-900 font-medium flex items-center gap-1"
            >
              <ExternalLink className="h-3 w-3" />
              {strategy.primarySourceOrg} — {isEs ? "Ver Recurso" : "View Resource"}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================================================ */
/*  Case Study Card Component                                        */
/* ================================================================ */

function CaseStudyCard({
  study,
  locale,
}: {
  study: WorkersCompCaseStudy;
  locale: string;
}) {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <div>
          <h3 className="font-semibold text-stone-900 text-base">
            {t(study.title, locale)}
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            {study.location} • {study.orgType}
          </p>
        </div>
        <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700 border-teal-200 w-fit">
          {study.costSavings}
        </Badge>
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <p className="font-medium text-stone-700 text-xs mb-1">
            {locale === "es" ? "Desafío" : "Challenge"}
          </p>
          <p className="text-stone-600">{t(study.challenge, locale)}</p>
        </div>

        <div>
          <p className="font-medium text-stone-700 text-xs mb-1">
            {locale === "es" ? "Intervención" : "Intervention"}
          </p>
          <p className="text-stone-600">{t(study.intervention, locale)}</p>
        </div>

        <div className="bg-teal-50 border border-teal-200 rounded p-3">
          <p className="font-medium text-teal-900 text-xs mb-1">
            {locale === "es" ? "Resultado" : "Outcome"}
          </p>
          <p className="text-teal-800">{t(study.outcome, locale)}</p>
        </div>
      </div>

      <div className="pt-3 border-t border-stone-200">
        <a
          href={study.primarySourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-teal-700 hover:text-teal-900 font-medium flex items-center gap-1"
        >
          <ExternalLink className="h-3 w-3" />
          {study.primarySourceOrg}
        </a>
      </div>
    </div>
  );
}

/* ================================================================ */
/*  Roadmap Timeline Component                                       */
/* ================================================================ */

function ImplementationRoadmap({ locale }: { locale: string }) {
  const isEs = locale === "es";

  const phases = [
    {
      quarter: isEs ? "Meses 1-3" : "Months 1-3",
      items: [
        isEs
          ? "Establecer Comité de Seguridad"
          : "Establish Safety Committee",
        isEs ? "Auditoría de Peligros Inicial" : "Hazard Audit",
        isEs ? "Programa de Prevención de Violencia (SB 553)" : "Violence Prevention (SB 553)",
      ],
      color: "bg-teal-100 border-teal-200",
      icon: "🏢",
    },
    {
      quarter: isEs ? "Meses 3-6" : "Months 3-6",
      items: [
        isEs
          ? "Programa de Manejo Seguro de Pacientes"
          : "Safe Patient Handling Program",
        isEs ? "Sistemas sin Aguja" : "Needleless Systems",
        isEs ? "Capacitación de Desescalada" : "De-escalation Training",
      ],
      color: "bg-amber-100 border-amber-200",
      icon: "⚙️",
    },
    {
      quarter: isEs ? "Meses 6-9" : "Months 6-9",
      items: [
        isEs ? "Evaluación Ergonómica" : "Ergonomic Assessment",
        isEs ? "Mejoras de Infraestructura" : "Infrastructure Upgrades",
        isEs ? "Programa de Retorno al Trabajo" : "Return-to-Work Program",
      ],
      color: "bg-green-100 border-green-200",
      icon: "✓",
    },
    {
      quarter: isEs ? "Meses 9-12" : "Months 9-12",
      items: [
        isEs ? "Auditoría de Seguimiento" : "Follow-up Audit",
        isEs ? "Análisis de ROI" : "ROI Analysis",
        isEs ? "Planificación para el Año Siguiente" : "Year 2 Planning",
      ],
      color: "bg-purple-100 border-purple-200",
      icon: "📊",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {phases.map((phase, idx) => (
          <div
            key={idx}
            className={`rounded-lg border-2 ${phase.color} p-4 space-y-2`}
          >
            <div className="text-2xl mb-2">{phase.icon}</div>
            <h3 className="font-bold text-stone-900">{phase.quarter}</h3>
            <ul className="space-y-1">
              {phase.items.map((item, itemIdx) => (
                <li key={itemIdx} className="text-xs text-stone-700 flex gap-1.5">
                  <ArrowRight className="h-3 w-3 text-stone-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================================ */
/*  Main Page Component                                              */
/* ================================================================ */

export default function WorkersCompPage() {
  const locale = useLocale() as string;
  const isEs = locale === "es";

  // Get unique categories
  const categories = Array.from(
    new Set(HAZARDS.map((h) => h.category))
  ) as HazardCategory[];

  const [selectedCategories, setSelectedCategories] = useState<HazardCategory[]>(
    []
  );

  const filteredHazards = useMemo(() => {
    if (selectedCategories.length === 0) return HAZARDS;
    return HAZARDS.filter((h) => selectedCategories.includes(h.category));
  }, [selectedCategories]);

  const toggleCategory = (cat: HazardCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="bg-white">
      {/* Back Link */}
      <div className="px-4 sm:px-6 pt-4 sm:pt-6">
        <Link href="/compliance" className="text-sm text-teal-700 hover:text-teal-900 font-medium flex items-center gap-1 w-fit">
          <ChevronUp className="h-4 w-4 rotate-180" />
          {isEs ? "Volver a Cumplimiento" : "Back to Compliance"}
        </Link>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-teal-800 via-teal-700 to-teal-900 text-white px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-4xl">
          <div className="flex items-start gap-3 mb-4">
            <Shield className="h-8 w-8 shrink-0" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3">
            {isEs
              ? "Compensación de Trabajadores: El Playbook de Costos para FQHC"
              : "Workers' Compensation: The FQHC Cost Playbook"}
          </h1>
          <p className="text-teal-100 text-lg leading-relaxed mb-6">
            {isEs
              ? "Datos reales, estrategias reales, ahorros reales para centros de salud comunitarios de California"
              : "Real data, real strategies, real savings for California community health centers"}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={<DollarSign className="h-6 w-6" />}
              label={isEs ? "Costo Anual Promedio" : "Avg Annual Cost"}
              value="$180K–$350K"
              subtext={isEs ? "Por FQHC" : "per FQHC"}
            />
            <StatCard
              icon={<AlertTriangle className="h-6 w-6" />}
              label={isEs ? "Hazard Superior" : "Top Hazard"}
              value="45/10K"
              subtext={isEs ? "Lesiones de espalda" : "Back injuries"}
            />
            <StatCard
              icon={<TrendingDown className="h-6 w-6" />}
              label={isEs ? "Costo Medio de Reclamo" : "Avg Claim Cost"}
              value="$8,400"
              subtext={isEs ? "Rango: $2.4K–$18K" : "Range: $2.4K–$18K"}
            />
            <StatCard
              icon={<Zap className="h-6 w-6" />}
              label={isEs ? "Ahorros Potenciales" : "Potential Savings"}
              value="35–65%"
              subtext={isEs ? "Con intervenciones" : "with interventions"}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">
        {/* Section 1: Cost Calculator */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
              {isEs ? "Calculadora de Costos Interactiva" : "Interactive Cost Calculator"}
            </h2>
            <p className="text-stone-600">
              {isEs
                ? "Estime sus costos anuales de compensación de trabajadores y potencial de ahorro."
                : "Estimate your annual workers' comp costs and savings potential."}
            </p>
          </div>
          <div className="rounded-lg border border-stone-200 bg-stone-50 p-6 sm:p-8">
            <CostCalculator locale={locale} />
          </div>
        </section>

        {/* Section 2: Hazard Explorer */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
              {isEs ? "Explorador de Peligros" : "Hazard Explorer"}
            </h2>
            <p className="text-stone-600">
              {isEs
                ? "Explore los 15 peligros laborales principales que afectan a FQHCs de California y sus estrategias de prevención."
                : "Explore the 15 leading workplace hazards affecting California FQHCs and prevention strategies."}
            </p>
          </div>

          {/* Category Filters */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-stone-700">
              {isEs ? "Filtrar por Categoría" : "Filter by Category"}
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`px-3 py-2 rounded-full text-xs font-medium transition-colors ${
                    selectedCategories.includes(cat)
                      ? "bg-teal-700 text-white"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {t(HAZARD_CATEGORY_LABELS[cat], locale)}
                </button>
              ))}
              {selectedCategories.length > 0 && (
                <button
                  onClick={() => setSelectedCategories([])}
                  className="px-3 py-2 rounded-full text-xs font-medium bg-stone-200 text-stone-700 hover:bg-stone-300"
                >
                  {isEs ? "Limpiar" : "Clear"}
                </button>
              )}
            </div>
          </div>

          {/* Hazards Grid */}
          <div className="grid gap-4">
            {filteredHazards.map((hazard) => (
              <HazardCard key={hazard.id} hazard={hazard} locale={locale} />
            ))}
          </div>
        </section>

        {/* Section 3: Cost Reduction Strategies */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
              {isEs
                ? "Estrategias de Reducción de Costos"
                : "Cost Reduction Strategies"}
            </h2>
            <p className="text-stone-600">
              {isEs
                ? "Estrategias probadas clasificadas por ROI, dificultad y plazo de implementación."
                : "Proven strategies ranked by ROI, difficulty, and implementation timeline."}
            </p>
          </div>

          <div className="grid gap-4">
            {COST_REDUCTION_STRATEGIES.map((strategy) => (
              <StrategyCard key={strategy.id} strategy={strategy} locale={locale} />
            ))}
          </div>
        </section>

        {/* Section 4: Case Studies */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
              {isEs ? "Estudios de Caso" : "Case Studies"}
            </h2>
            <p className="text-stone-600">
              {isEs
                ? "Ejemplos reales de FQHCs que implementaron estas estrategias."
                : "Real examples of FQHCs that implemented these strategies."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CASE_STUDIES.map((study) => (
              <CaseStudyCard key={study.id} study={study} locale={locale} />
            ))}
          </div>
        </section>

        {/* Section 5: 12-Month Roadmap */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
              {isEs
                ? "Hoja de Ruta de Implementación de 12 Meses"
                : "12-Month Implementation Roadmap"}
            </h2>
            <p className="text-stone-600">
              {isEs
                ? "Cuándo implementar cada estrategia para máximo impacto."
                : "When to implement each strategy for maximum impact."}
            </p>
          </div>

          <ImplementationRoadmap locale={locale} />
        </section>

        {/* Section 6: Resources */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
              {isEs ? "Recursos Autorizados" : "Official Resources"}
            </h2>
            <p className="text-stone-600">
              {isEs
                ? "Enlaces directos a regulaciones Cal/OSHA y recursos de la industria."
                : "Direct links to Cal/OSHA regulations and industry resources."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://www.dir.ca.gov/dosh/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-stone-200 bg-white p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <ExternalLink className="h-5 w-5 text-teal-700 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-stone-900">Cal/OSHA</h3>
                  <p className="text-xs text-stone-600 mt-1">
                    {isEs
                      ? "Regulaciones completas de seguridad y salud laboral de California"
                      : "Complete California workplace safety regulations"}
                  </p>
                </div>
              </div>
            </a>

            <a
              href="https://www.dir.ca.gov/dwc/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-stone-200 bg-white p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <ExternalLink className="h-5 w-5 text-teal-700 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-stone-900">
                    {isEs ? "DWC" : "Workers' Comp Division"}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    {isEs
                      ? "Formularios, auditorías y tasas de compensación de trabajadores"
                      : "Claims, audits, and premium rate information"}
                  </p>
                </div>
              </div>
            </a>

            <a
              href="https://www.scif.com/safety-resources"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-stone-200 bg-white p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <ExternalLink className="h-5 w-5 text-teal-700 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-stone-900">
                    {isEs ? "SCIF" : "State Compensation Insurance Fund"}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    {isEs
                      ? "Recursos de seguridad y programas de capacitación"
                      : "Safety resources and training programs"}
                  </p>
                </div>
              </div>
            </a>

            <a
              href="https://www.dir.ca.gov/dosh/puborder.asp"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-stone-200 bg-white p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <ExternalLink className="h-5 w-5 text-teal-700 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-stone-900">
                    {isEs ? "Guía de Salud" : "Healthcare Guidance"}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    {isEs
                      ? "Guía específica de Cal/OSHA para organizaciones de salud"
                      : "Healthcare-specific Cal/OSHA guidance"}
                  </p>
                </div>
              </div>
            </a>
          </div>
        </section>
      </div>

      {/* Footer Note */}
      <div className="bg-stone-50 border-t border-stone-200 px-4 sm:px-6 py-8 text-center text-xs text-stone-600">
        <p>
          {isEs ? "Última actualización: " : "Last updated: "}{" "}
          {new Date(WORKERS_COMP_LAST_UPDATED).toLocaleDateString(
            locale === "es" ? "es-ES" : "en-US"
          )}
        </p>
      </div>
    </div>
  );
}
