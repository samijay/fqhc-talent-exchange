// ClinicSimulator — interactive staffing, scheduling & revenue model for CA FQHCs
// Medi-Cal accurate: WIC §14132.100, FQHC APM, payer-aware BH billing
// Wizard + Manual mode with sticky results and delta comparison
"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { useLocale } from "next-intl";
import {
  Users,
  Clock,
  DollarSign,
  Activity,
  TrendingUp,
  Info,
  Stethoscope,
  Zap,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import {
  calculateSimulation,
  generateOptimizations,
  SIZE_PRESETS,
  STAFF_COSTS,
  formatCurrency,
  type SimulatorInputs,
  type StaffingInput,
  type ScheduleInput,
  type RevenueInput,
  type DiseaseInput,
  type SimulatorOutput,
  type OptimizationPathway,
} from "@/lib/clinic-operations-model";
import { trackSimulatorUse } from "@/lib/analytics";
import {
  SimulatorWizard,
  type WizardConfig,
} from "@/components/simulator/SimulatorWizard";
import { ModeToggle, type SimMode } from "@/components/simulator/ModeToggle";
import { DeltaBadge } from "@/components/simulator/StickyResults";

/* ------------------------------------------------------------------ */
/*  Bilingual helper                                                   */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

/* ------------------------------------------------------------------ */
/*  Wizard → inputs mapping                                            */
/* ------------------------------------------------------------------ */

function wizardToInputs(config: WizardConfig): {
  staffing: StaffingInput;
  schedule: ScheduleInput;
  revenue: RevenueInput;
  disease: DiseaseInput;
  sizePreset: "mid-size" | "small" | "large";
} {
  // Map size
  const sizeKey =
    config.size === "small"
      ? "small"
      : config.size === "large"
        ? "large"
        : "mid-size";
  const preset = SIZE_PRESETS.find((p) => p.id === sizeKey) ?? SIZE_PRESETS[0];

  // Start with preset values
  const staffing = { ...preset.staffing };
  const schedule = { ...preset.schedule };
  const revenue = { ...preset.revenue };
  const disease = { ...preset.disease };

  // Adjust based on services
  if (!config.services.dental) {
    staffing.dentalProviders = 0;
    revenue.dentalSameDayRate = 0;
  }
  if (!config.services.behavioralHealth) {
    staffing.bhProviders = 0;
    revenue.bhSameDayRate = 0;
  }
  if (!config.services.ecm) {
    revenue.ecmEnrollmentRate = 0;
  } else {
    revenue.ecmEnrollmentRate = Math.max(revenue.ecmEnrollmentRate, 6);
  }
  if (config.services.pharmacy340B) {
    // 340B doesn't have a direct input in clinic model but affects optimization pathways
  }
  if (config.services.ccm) {
    // CCM is driven by disease profile, boost chronic conditions slightly
    disease.diabeticPercent = Math.max(disease.diabeticPercent, 20);
    disease.htnPercent = Math.max(disease.htnPercent, 30);
  }

  // Adjust based on region
  const REGION_MULTIPLIERS: Record<string, number> = {
    "los-angeles": 1.08,
    "bay-area": 1.15,
    "san-diego": 1.05,
    sacramento: 1.02,
    "central-valley": 0.92,
    "inland-empire": 0.95,
    "central-coast": 1.0,
    "north-state": 0.88,
    "north-coast": 0.90,
  };
  revenue.regionalMultiplier =
    REGION_MULTIPLIERS[config.region] ?? 1.0;

  // Adjust based on priority
  if (config.priority === "maximize-revenue") {
    revenue.apmEnrolled = true;
    if (config.services.dental)
      revenue.dentalSameDayRate = Math.max(revenue.dentalSameDayRate, 15);
    if (config.services.behavioralHealth)
      revenue.bhSameDayRate = Math.max(revenue.bhSameDayRate, 12);
  } else if (config.priority === "reduce-costs") {
    schedule.encountersPerProviderPerDay = Math.max(
      schedule.encountersPerProviderPerDay,
      20,
    );
    schedule.noShowRate = Math.max(schedule.noShowRate - 3, 5);
  } else if (config.priority === "model-staffing") {
    // Keep defaults, user wants to explore staffing
  } else if (config.priority === "prepare-cuts") {
    revenue.mediCalPercent = Math.min(revenue.mediCalPercent + 5, 85);
  }

  return { staffing, schedule, revenue, disease, sizePreset: sizeKey };
}

/* ------------------------------------------------------------------ */
/*  Number input component                                             */
/* ------------------------------------------------------------------ */

function NumberField({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <label className="text-sm text-stone-600 shrink-0">{label}</label>
      <div className="flex items-center gap-1">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (!isNaN(v) && v >= min && v <= max) onChange(v);
          }}
          className="w-20 rounded-lg border border-stone-300 bg-white px-2.5 py-1.5 text-right text-sm font-bold text-stone-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
        {suffix && (
          <span className="text-xs text-stone-400 w-6">{suffix}</span>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Toggle component                                                   */
/* ------------------------------------------------------------------ */

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <label className="text-sm text-stone-600">{label}</label>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
          checked ? "bg-teal-600" : "bg-stone-300"
        }`}
      >
        <span
          className={`pointer-events-none inline-block size-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Collapsible section wrapper                                        */
/* ------------------------------------------------------------------ */

function Section({
  title,
  icon: Icon,
  summary,
  defaultOpen = false,
  children,
}: {
  title: string;
  icon: React.ElementType;
  summary: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-stone-200 bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-4"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
            <Icon className="size-4" />
          </div>
          <div className="text-left">
            <h4 className="text-sm font-bold text-stone-900">{title}</h4>
            {!open && (
              <p className="text-xs text-stone-500">{summary}</p>
            )}
          </div>
        </div>
        {open ? (
          <ChevronUp className="size-4 text-stone-400" />
        ) : (
          <ChevronDown className="size-4 text-stone-400" />
        )}
      </button>
      {open && (
        <div className="space-y-3 border-t border-stone-100 px-4 pb-4 pt-3">
          {children}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Optimization Pathways display                                      */
/* ------------------------------------------------------------------ */

function OptimizationPanel({
  pathways,
  locale,
}: {
  pathways: OptimizationPathway[];
  locale: string;
}) {
  const isEs = locale === "es";
  const totalImpact = pathways.reduce((sum, p) => sum + p.revenueImpact, 0);

  const categoryLabel = (cat: string) => {
    if (cat === "operational")
      return isEs ? "Expansión Operativa" : "Operational Expansion";
    if (cat === "model-design")
      return isEs ? "Diseño de Modelo" : "Model Design";
    return isEs ? "Expansión de Programas" : "Program Expansion";
  };

  const categoryColor = (cat: string) => {
    if (cat === "operational") return "bg-blue-100 text-blue-700";
    if (cat === "model-design") return "bg-amber-100 text-amber-700";
    return "bg-purple-100 text-purple-700";
  };

  const implLabel = (impl: string) => {
    if (impl === "quick-win") return isEs ? "Ganancia rápida" : "Quick Win";
    if (impl === "medium") return isEs ? "Medio plazo" : "Medium-term";
    return isEs ? "Estratégico" : "Strategic";
  };

  const implColor = (impl: string) => {
    if (impl === "quick-win") return "bg-green-100 text-green-700";
    if (impl === "medium") return "bg-amber-100 text-amber-700";
    return "bg-red-100 text-red-700";
  };

  if (pathways.length === 0) {
    return (
      <div className="rounded-xl border-2 border-green-200 bg-green-50 p-6 text-center">
        <CheckCircle2 className="mx-auto size-8 text-green-600" />
        <p className="mt-2 font-bold text-green-800">
          {isEs
            ? "¡Su FQHC está bien optimizado!"
            : "Your FQHC is well optimized!"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Total impact header */}
      <div className="rounded-xl bg-gradient-to-r from-red-600 to-red-500 p-5 text-white">
        <div className="flex items-center gap-2">
          <Zap className="size-5" />
          <h3 className="text-lg font-bold">
            {isEs ? "Potencial de Optimización" : "Optimization Potential"}
          </h3>
        </div>
        <p className="mt-1 text-3xl font-extrabold">
          +{formatCurrency(totalImpact)}
          <span className="text-base font-normal text-red-100">
            /{isEs ? "año" : "year"}
          </span>
        </p>
        <p className="mt-1 text-sm text-red-100">
          {pathways.length}{" "}
          {isEs ? "oportunidades identificadas" : "opportunities identified"}
        </p>
      </div>

      {/* Pathway cards */}
      {pathways.map((pathway) => (
        <div
          key={pathway.id}
          className="rounded-xl border border-stone-200 bg-white p-4"
        >
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold ${categoryColor(pathway.category)}`}
            >
              {categoryLabel(pathway.category)}
            </span>
            <span
              className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold ${implColor(pathway.implementation)}`}
            >
              {implLabel(pathway.implementation)}
            </span>
            <span className="ml-auto text-lg font-bold text-teal-700">
              +{formatCurrency(pathway.revenueImpact)}
            </span>
          </div>
          <h4 className="text-sm font-bold text-stone-900">
            {t(pathway.title, locale)}
          </h4>
          <p className="mt-1 text-xs leading-relaxed text-stone-600">
            {t(pathway.description, locale)}
          </p>
          <p className="mt-2 text-[10px] text-stone-400">
            <strong>{isEs ? "Requiere" : "Requires"}:</strong>{" "}
            {t(pathway.requirements, locale)}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Results Panel (extracted for reuse in sticky layout)               */
/* ------------------------------------------------------------------ */

function ResultsPanel({
  results,
  baseline,
  locale,
  showOptimize,
  setShowOptimize,
  optimizations,
}: {
  results: SimulatorOutput;
  baseline: SimulatorOutput | null;
  locale: string;
  showOptimize: boolean;
  setShowOptimize: (v: boolean) => void;
  optimizations: OptimizationPathway[];
}) {
  const isEs = locale === "es";
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-stone-900">
        {isEs ? "Resultados del Modelo" : "Model Results"}
      </h3>

      {/* Revenue Summary */}
      <div className="rounded-xl border border-teal-200 bg-teal-50 p-5">
        <div className="mb-4 grid grid-cols-2 gap-4">
          {[
            {
              label: isEs ? "Ingresos Anuales" : "Annual Revenue",
              value: formatCurrency(results.totalAnnualRevenue),
              raw: results.totalAnnualRevenue,
              baseRaw: baseline?.totalAnnualRevenue,
              color: "text-teal-700",
              format: "currency" as const,
            },
            {
              label: isEs ? "Costo Anual" : "Annual Cost",
              value: formatCurrency(results.totalAnnualCost),
              raw: results.totalAnnualCost,
              baseRaw: baseline?.totalAnnualCost,
              color: "text-stone-700",
              format: "currency" as const,
              invertDelta: true,
            },
            {
              label: isEs ? "Margen Neto" : "Net Margin",
              value: formatCurrency(results.netMargin),
              raw: results.netMargin,
              baseRaw: baseline?.netMargin,
              color:
                results.netMargin >= 0 ? "text-teal-700" : "text-red-700",
              format: "currency" as const,
            },
            {
              label: isEs ? "% Margen" : "Margin %",
              value: `${results.netMarginPercent.toFixed(1)}%`,
              raw: results.netMarginPercent,
              baseRaw: baseline?.netMarginPercent,
              color:
                results.netMarginPercent >= 0
                  ? "text-teal-700"
                  : "text-red-700",
              format: "percent" as const,
            },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xs text-stone-500">{item.label}</p>
              <div className="flex items-center flex-wrap">
                <p className={`text-xl font-bold ${item.color}`}>
                  {item.value}
                </p>
                {baseline && item.baseRaw !== undefined && (
                  <DeltaBadge
                    current={item.raw}
                    baseline={item.baseRaw}
                    format={item.format}
                    invertColor={item.invertDelta}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Revenue Breakdown Bar */}
        <div className="mb-3">
          <p className="mb-1 text-xs font-medium text-stone-600">
            {isEs ? "Desglose de Ingresos" : "Revenue Breakdown"}
          </p>
          <div className="flex h-6 overflow-hidden rounded-full">
            {[
              {
                label: "PPS",
                value: results.basePPSRevenue,
                color: "bg-teal-600",
              },
              {
                label: isEs ? "Dental" : "Dental",
                value: results.dentalRevenue,
                color: "bg-teal-400",
              },
              {
                label: "BH",
                value: results.bhRevenue,
                color: "bg-amber-500",
              },
              {
                label: "ECM",
                value: results.ecmRevenue,
                color: "bg-purple-500",
              },
              {
                label: "CCM",
                value: results.ccmRevenue,
                color: "bg-blue-500",
              },
            ]
              .filter((s) => s.value > 0)
              .map((source) => (
                <div
                  key={source.label}
                  className={`${source.color} transition-all duration-300`}
                  style={{
                    width: `${(source.value / results.totalAnnualRevenue) * 100}%`,
                  }}
                  title={`${source.label}: ${formatCurrency(source.value)}`}
                />
              ))}
          </div>
          <div className="mt-1 flex flex-wrap gap-3 text-[10px] text-stone-500">
            {[
              {
                label: "PPS",
                color: "bg-teal-600",
                value: results.basePPSRevenue,
              },
              {
                label: isEs ? "Dental" : "Dental",
                color: "bg-teal-400",
                value: results.dentalRevenue,
              },
              {
                label: "BH",
                color: "bg-amber-500",
                value: results.bhRevenue,
              },
              {
                label: "ECM",
                color: "bg-purple-500",
                value: results.ecmRevenue,
              },
              {
                label: "CCM",
                color: "bg-blue-500",
                value: results.ccmRevenue,
              },
            ]
              .filter((s) => s.value > 0)
              .map((s) => (
                <span key={s.label} className="flex items-center gap-1">
                  <span
                    className={`inline-block size-2 rounded-full ${s.color}`}
                  />
                  {s.label}: {formatCurrency(s.value)}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* Volume & Efficiency */}
      <div className="grid gap-3 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2">
        <div className="rounded-xl border border-stone-200 bg-white p-4">
          <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-stone-700">
            <TrendingUp className="size-4 text-teal-600" />
            {isEs ? "Volumen de Encuentros" : "Encounter Volume"}
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-stone-500">
                {isEs ? "Proveedores médicos" : "Medical Providers"}
              </span>
              <div className="flex items-center">
                <span className="font-bold text-stone-900">
                  {results.billableProvidersCount}
                </span>
                {baseline && (
                  <DeltaBadge
                    current={results.billableProvidersCount}
                    baseline={baseline.billableProvidersCount}
                    format="number"
                  />
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-500">
                {isEs ? "Encuentros/año" : "Encounters/Year"}
              </span>
              <div className="flex items-center">
                <span className="font-bold text-stone-900">
                  {Math.round(results.totalEncountersPerYear).toLocaleString()}
                </span>
                {baseline && (
                  <DeltaBadge
                    current={results.totalEncountersPerYear}
                    baseline={baseline.totalEncountersPerYear}
                    format="number"
                  />
                )}
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-stone-100 pt-2">
              <span className="text-stone-500">
                {isEs
                  ? "+ Dental mismo día/año"
                  : "+ Same-Day Dental/Year"}
              </span>
              <span className="font-bold text-teal-700">
                +
                {Math.round(
                  results.dentalEncountersPerYear,
                ).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-500">
                {isEs ? "+ BH facturables/año" : "+ BH Billable/Year"}
              </span>
              <span className="font-bold text-amber-600">
                +
                {Math.round(
                  results.bhBillableEncountersPerYear,
                ).toLocaleString()}
              </span>
            </div>
            {results.bhEncountersPerYear >
              results.bhBillableEncountersPerYear && (
              <div className="text-[10px] text-amber-600">
                {isEs
                  ? `⚠️ ${Math.round(results.bhEncountersPerYear - results.bhBillableEncountersPerYear).toLocaleString()} encuentros BH no facturables como 2° PPS (Medi-Cal sin APM)`
                  : `⚠️ ${Math.round(results.bhEncountersPerYear - results.bhBillableEncountersPerYear).toLocaleString()} BH encounters not billable as 2nd PPS (Medi-Cal without APM)`}
              </div>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-4">
          <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-stone-700">
            <DollarSign className="size-4 text-teal-600" />
            {isEs ? "Eficiencia" : "Efficiency"}
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-stone-500">
                {isEs ? "Costo por encuentro" : "Cost per Encounter"}
              </span>
              <div className="flex items-center">
                <span className="font-bold text-stone-900">
                  ${Math.round(results.costPerEncounter)}
                </span>
                {baseline && (
                  <DeltaBadge
                    current={results.costPerEncounter}
                    baseline={baseline.costPerEncounter}
                    format="currency"
                    invertColor
                  />
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-500">
                {isEs ? "Ingreso por encuentro" : "Revenue per Encounter"}
              </span>
              <div className="flex items-center">
                <span className="font-bold text-teal-700">
                  ${Math.round(results.revenuePerEncounter)}
                </span>
                {baseline && (
                  <DeltaBadge
                    current={results.revenuePerEncounter}
                    baseline={baseline.revenuePerEncounter}
                    format="currency"
                  />
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-500">
                {isEs ? "Ingreso por proveedor" : "Revenue per Provider"}
              </span>
              <span className="font-bold text-stone-900">
                {formatCurrency(results.revenuePerProvider)}
              </span>
            </div>
            <div className="flex justify-between border-t border-stone-100 pt-2">
              <span className="text-stone-500">
                {isEs ? "Nómina anual" : "Annual Payroll"}
              </span>
              <span className="font-bold text-stone-900">
                {formatCurrency(results.annualPayroll)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Optimize Button */}
      <button
        onClick={() => {
          if (!showOptimize) trackSimulatorUse("optimize_clicked");
          setShowOptimize(!showOptimize);
        }}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-red-700 hover:shadow-xl active:scale-[0.98]"
      >
        <Zap className="size-5" />
        {showOptimize
          ? isEs
            ? "Ocultar Optimizaciones"
            : "Hide Optimizations"
          : isEs
            ? "Optimizar — Ver Oportunidades de Ingreso"
            : "Optimize — Show Revenue Opportunities"}
        {!showOptimize && <ArrowRight className="size-5" />}
      </button>

      {/* Optimization Pathways */}
      {showOptimize && (
        <OptimizationPanel pathways={optimizations} locale={locale} />
      )}

      {/* Payroll Breakdown */}
      <details className="rounded-xl border border-stone-200 bg-white">
        <summary className="cursor-pointer p-4 text-sm font-bold text-stone-700">
          {isEs ? "Desglose de Nómina" : "Payroll Breakdown"}
        </summary>
        <div className="border-t border-stone-100 px-4 pb-4">
          <table className="mt-2 w-full text-sm">
            <thead>
              <tr className="text-xs text-stone-500">
                <th className="pb-2 text-left">
                  {isEs ? "Rol" : "Role"}
                </th>
                <th className="pb-2 text-right">
                  {isEs ? "Cantidad" : "Count"}
                </th>
                <th className="pb-2 text-right">
                  {isEs ? "Costo Total" : "Total Cost"}
                </th>
              </tr>
            </thead>
            <tbody>
              {results.payrollBreakdown
                .filter((r) => r.count > 0)
                .map((row) => (
                  <tr key={row.role} className="border-t border-stone-50">
                    <td className="py-1.5 text-stone-700">{row.role}</td>
                    <td className="py-1.5 text-right text-stone-700">
                      {row.count}
                    </td>
                    <td className="py-1.5 text-right font-medium text-stone-900">
                      {formatCurrency(row.totalCost)}
                    </td>
                  </tr>
                ))}
              <tr className="border-t-2 border-stone-200 font-bold">
                <td className="py-2 text-stone-900">
                  {isEs ? "Total" : "Total"}
                </td>
                <td className="py-2 text-right text-stone-900">
                  {results.payrollBreakdown.reduce(
                    (sum, r) => sum + r.count,
                    0,
                  )}
                </td>
                <td className="py-2 text-right text-stone-900">
                  {formatCurrency(results.annualPayroll)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 text-[11px] text-stone-400">
        <Info className="mt-0.5 size-3.5 shrink-0" />
        <p>
          {isEs
            ? "Modelo para planificación estratégica. Facturación BH mismo día: 2 PPS bajo Medicare, 1 PPS bajo Medi-Cal (WIC §14132.100) a menos que esté inscrito en APM. Dental mismo día: 2 PPS bajo ambos pagadores. Resultados varían según mezcla de pagadores y condiciones locales."
            : "Model for strategic planning. Same-day BH billing: 2 PPS under Medicare, 1 PPS under Medi-Cal (WIC §14132.100) unless APM enrolled. Same-day dental: 2 PPS under both payers. Results vary by payer mix and local conditions."}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export function ClinicSimulator() {
  const locale = useLocale();
  const isEs = locale === "es";

  // Mode state
  const [mode, setMode] = useState<SimMode>("wizard");

  // Baseline results from wizard (used for delta comparison)
  const [baselineResults, setBaselineResults] =
    useState<SimulatorOutput | null>(null);
  const [wizardLabel, setWizardLabel] = useState("");

  // Size preset
  const [sizePreset, setSizePreset] = useState<
    "mid-size" | "small" | "large" | "custom"
  >("mid-size");

  // Initialize from mid-size preset (real FQHC data)
  const defaultPreset = SIZE_PRESETS[0];
  const [staffing, setStaffing] = useState<StaffingInput>(
    defaultPreset.staffing,
  );
  const [schedule, setSchedule] = useState<ScheduleInput>(
    defaultPreset.schedule,
  );
  const [revenue, setRevenue] = useState<RevenueInput>(defaultPreset.revenue);
  const [disease, setDisease] = useState<DiseaseInput>(defaultPreset.disease);

  // Show optimization pathways
  const [showOptimize, setShowOptimize] = useState(false);

  // Ref for scrolling to results
  const resultsRef = useRef<HTMLDivElement>(null);

  // Apply preset
  const applyPreset = useCallback(
    (size: "mid-size" | "small" | "large") => {
      const preset =
        SIZE_PRESETS.find((p) => p.id === size) ?? SIZE_PRESETS[0];
      setStaffing(preset.staffing);
      setSchedule(preset.schedule);
      setRevenue(preset.revenue);
      setDisease(preset.disease);
      setSizePreset(size);
      setShowOptimize(false);
    },
    [],
  );

  // Wizard complete handler
  const handleWizardComplete = useCallback(
    (config: WizardConfig) => {
      const mapped = wizardToInputs(config);
      setStaffing(mapped.staffing);
      setSchedule(mapped.schedule);
      setRevenue(mapped.revenue);
      setDisease(mapped.disease);
      setSizePreset(mapped.sizePreset);
      setShowOptimize(false);
      setMode("manual");

      // Calculate baseline for delta comparison
      const baselineInputs: SimulatorInputs = {
        ...mapped,
      };
      const baseResults = calculateSimulation(baselineInputs);
      setBaselineResults(baseResults);
      setWizardLabel(
        config.orgName ||
          (isEs ? "Configuración inicial" : "Initial setup"),
      );

      trackSimulatorUse("wizard_completed");
    },
    [isEs],
  );

  const handleWizardSkip = useCallback(() => {
    setMode("manual");
    setBaselineResults(null);
    trackSimulatorUse("wizard_skipped");
  }, []);

  // Helpers to update nested state
  const updateStaffing = useCallback(
    (key: keyof StaffingInput, val: number) => {
      setStaffing((prev) => ({ ...prev, [key]: val }));
      setSizePreset("custom");
    },
    [],
  );
  const updateSchedule = useCallback(
    (key: keyof ScheduleInput, val: number) => {
      setSchedule((prev) => ({ ...prev, [key]: val }));
      setSizePreset("custom");
    },
    [],
  );
  const updateRevenue = useCallback(
    (key: keyof RevenueInput, val: number | boolean) => {
      setRevenue((prev) => ({ ...prev, [key]: val }));
      setSizePreset("custom");
    },
    [],
  );
  const updateDisease = useCallback(
    (key: keyof DiseaseInput, val: number) => {
      setDisease((prev) => ({ ...prev, [key]: val }));
      setSizePreset("custom");
    },
    [],
  );

  // Calculate results
  const inputs: SimulatorInputs = useMemo(
    () => ({
      staffing,
      schedule,
      revenue,
      disease,
      sizePreset: sizePreset === "custom" ? "mid-size" : sizePreset,
    }),
    [staffing, schedule, revenue, disease, sizePreset],
  );
  const results = useMemo(() => calculateSimulation(inputs), [inputs]);
  const optimizations = useMemo(
    () => generateOptimizations(inputs, results),
    [inputs, results],
  );

  // Staffing summary
  const staffSummary = `${staffing.physicians} MD, ${staffing.nps} NP, ${staffing.pas} PA, ${staffing.rns} RN, ${staffing.mas} MA, ${staffing.bhProviders} BH, ${staffing.dentalProviders} Dental`;

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-stone-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-stone-900 to-stone-800 px-6 py-5 text-white">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <Stethoscope className="size-5 text-teal-400" />
              <h3 className="text-lg font-bold">
                {isEs
                  ? "Simulador de Operaciones Clínicas"
                  : "Clinic Operations Simulator"}
              </h3>
            </div>
            <p className="text-sm text-stone-400">
              {isEs
                ? "Modele dotación de personal, horarios e ingresos para su FQHC — alineado con reglas de facturación de Medi-Cal"
                : "Model staffing, scheduling, and revenue for your California FQHC — aligned with Medi-Cal billing rules"}
            </p>
          </div>
          <ModeToggle mode={mode} onChange={setMode} locale={locale} />
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {/* WIZARD MODE */}
        {mode === "wizard" && (
          <div className="py-8">
            <SimulatorWizard
              onComplete={handleWizardComplete}
              onSkip={handleWizardSkip}
              locale={locale}
            />
          </div>
        )}

        {/* MANUAL MODE — 2-column sticky layout on desktop */}
        {mode === "manual" && (
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Left column: inputs */}
            <div className="flex-1 min-w-0 space-y-3">
              {/* Size Preset Toggle */}
              <div className="mb-4">
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-500">
                  {isEs ? "Tamaño del FQHC" : "FQHC Size"}
                </label>
                <div className="flex flex-wrap gap-2">
                  {(
                    ["mid-size", "small", "large", "custom"] as const
                  ).map((size) => (
                    <button
                      key={size}
                      onClick={() =>
                        size === "custom"
                          ? setSizePreset("custom")
                          : applyPreset(size)
                      }
                      className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        sizePreset === size
                          ? "bg-teal-700 text-white"
                          : "bg-white text-stone-600 hover:bg-stone-100"
                      }`}
                    >
                      {size === "mid-size"
                        ? isEs
                          ? "Mediano (~240)"
                          : "Mid-Size (~240)"
                        : size === "small"
                          ? isEs
                            ? "Pequeño (~250)"
                            : "Small (~250)"
                          : size === "large"
                            ? isEs
                              ? "Grande (~1,000)"
                              : "Large (~1,000)"
                            : isEs
                              ? "Personalizado"
                              : "Custom"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Sections */}
              {/* Staffing */}
              <Section
                title={isEs ? "Dotación de Personal" : "Staffing"}
                icon={Users}
                summary={staffSummary}
                defaultOpen
              >
                {(
                  [
                    ["physicians", 0, 40, 1],
                    ["nps", 0, 30, 1],
                    ["pas", 0, 20, 1],
                    ["rns", 0, 80, 1],
                    ["mas", 0, 120, 5],
                    ["chws", 0, 50, 1],
                    ["bhProviders", 0, 25, 1],
                    ["dentalProviders", 0, 20, 1],
                  ] as [keyof StaffingInput, number, number, number][]
                ).map(([key, min, max, step]) => (
                  <NumberField
                    key={key}
                    label={t(STAFF_COSTS[key].label, locale)}
                    value={staffing[key]}
                    min={min}
                    max={max}
                    step={step}
                    onChange={(v) => updateStaffing(key, v)}
                  />
                ))}
              </Section>

              {/* Schedule */}
              <Section
                title={isEs ? "Horario" : "Schedule"}
                icon={Clock}
                summary={`${schedule.hoursPerDay}h/day, ${schedule.daysPerWeek} days, ${schedule.encountersPerProviderPerDay} enc/prov, ${schedule.noShowRate}% no-show`}
              >
                <NumberField
                  label={isEs ? "Horas por día" : "Hours per Day"}
                  value={schedule.hoursPerDay}
                  min={6}
                  max={14}
                  step={1}
                  suffix="h"
                  onChange={(v) => updateSchedule("hoursPerDay", v)}
                />
                <NumberField
                  label={isEs ? "Días por semana" : "Days per Week"}
                  value={schedule.daysPerWeek}
                  min={4}
                  max={7}
                  step={1}
                  suffix="d"
                  onChange={(v) => updateSchedule("daysPerWeek", v)}
                />
                <NumberField
                  label={
                    isEs
                      ? "Encuentros por proveedor/día"
                      : "Encounters per Provider/Day"
                  }
                  value={schedule.encountersPerProviderPerDay}
                  min={8}
                  max={28}
                  step={1}
                  onChange={(v) =>
                    updateSchedule("encountersPerProviderPerDay", v)
                  }
                />
                <NumberField
                  label={isEs ? "Tasa de inasistencia" : "No-Show Rate"}
                  value={schedule.noShowRate}
                  min={0}
                  max={30}
                  step={1}
                  suffix="%"
                  onChange={(v) => updateSchedule("noShowRate", v)}
                />
              </Section>

              {/* Revenue & Visit Mix */}
              <Section
                title={
                  isEs
                    ? "Ingresos y Mezcla de Pagadores"
                    : "Revenue & Payer Mix"
                }
                icon={DollarSign}
                summary={`$${revenue.ppsRate} PPS, ${revenue.mediCalPercent}% Medi-Cal, ${revenue.dentalSameDayRate}% dental, ${revenue.bhSameDayRate}% BH`}
              >
                <NumberField
                  label={
                    isEs
                      ? "Tarifa PPS por encuentro"
                      : "PPS Rate per Encounter"
                  }
                  value={revenue.ppsRate}
                  min={150}
                  max={400}
                  step={5}
                  suffix="$"
                  onChange={(v) => updateRevenue("ppsRate", v)}
                />
                <NumberField
                  label={
                    isEs
                      ? "Medi-Cal como % del panel"
                      : "Medi-Cal % of Payer Mix"
                  }
                  value={revenue.mediCalPercent}
                  min={0}
                  max={100}
                  step={5}
                  suffix="%"
                  onChange={(v) => updateRevenue("mediCalPercent", v)}
                />
                <NumberField
                  label={
                    isEs
                      ? "Dental mismo día (% de visitas)"
                      : "Same-Day Dental (% of visits)"
                  }
                  value={revenue.dentalSameDayRate}
                  min={0}
                  max={30}
                  step={1}
                  suffix="%"
                  onChange={(v) => updateRevenue("dentalSameDayRate", v)}
                />
                <NumberField
                  label={
                    isEs
                      ? "BH mismo día (% de visitas)"
                      : "BH Same-Day Rate (% of visits)"
                  }
                  value={revenue.bhSameDayRate}
                  min={0}
                  max={30}
                  step={1}
                  suffix="%"
                  onChange={(v) => updateRevenue("bhSameDayRate", v)}
                />
                <Toggle
                  label={
                    isEs
                      ? "Inscrito en APM de FQHC (julio 2024)"
                      : "Enrolled in FQHC APM (July 2024)"
                  }
                  checked={revenue.apmEnrolled}
                  onChange={(v) => updateRevenue("apmEnrolled", v)}
                />
                {!revenue.apmEnrolled && revenue.bhSameDayRate > 0 && (
                  <div className="flex items-start gap-2 rounded-lg bg-amber-50 p-2.5 text-xs text-amber-800">
                    <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
                    <span>
                      {isEs
                        ? `Sin APM, el ${revenue.mediCalPercent}% de sus encuentros BH mismo día (Medi-Cal) NO generan un 2° PPS. Solo el ${100 - revenue.mediCalPercent}% (Medicare) es facturable como 2° encuentro.`
                        : `Without APM, ${revenue.mediCalPercent}% of your same-day BH encounters (Medi-Cal) do NOT generate a 2nd PPS. Only ${100 - revenue.mediCalPercent}% (Medicare) bills as a 2nd encounter.`}
                    </span>
                  </div>
                )}
                <NumberField
                  label={isEs ? "Inscripción ECM" : "ECM Enrollment"}
                  value={revenue.ecmEnrollmentRate}
                  min={0}
                  max={20}
                  step={1}
                  suffix="%"
                  onChange={(v) => updateRevenue("ecmEnrollmentRate", v)}
                />
                <NumberField
                  label={
                    isEs ? "Multiplicador regional" : "Regional Multiplier"
                  }
                  value={revenue.regionalMultiplier}
                  min={0.88}
                  max={1.15}
                  step={0.01}
                  onChange={(v) =>
                    updateRevenue("regionalMultiplier", v)
                  }
                />
              </Section>

              {/* Disease Management */}
              <Section
                title={
                  isEs ? "Perfil de Enfermedades" : "Disease Profile"
                }
                icon={Activity}
                summary={`${disease.diabeticPercent}% diabetes, ${disease.htnPercent}% HTN, ${disease.depressionPercent}% depression, ${disease.copdPercent}% COPD`}
              >
                <NumberField
                  label={isEs ? "Panel diabético" : "Diabetic Panel"}
                  value={disease.diabeticPercent}
                  min={0}
                  max={40}
                  step={1}
                  suffix="%"
                  onChange={(v) =>
                    updateDisease("diabeticPercent", v)
                  }
                />
                <NumberField
                  label={
                    isEs ? "Panel hipertensión" : "Hypertension Panel"
                  }
                  value={disease.htnPercent}
                  min={0}
                  max={50}
                  step={1}
                  suffix="%"
                  onChange={(v) => updateDisease("htnPercent", v)}
                />
                <NumberField
                  label={
                    isEs
                      ? "Depresión (positivo)"
                      : "Depression (Positive Screen)"
                  }
                  value={disease.depressionPercent}
                  min={0}
                  max={30}
                  step={1}
                  suffix="%"
                  onChange={(v) =>
                    updateDisease("depressionPercent", v)
                  }
                />
                <NumberField
                  label={isEs ? "EPOC" : "COPD"}
                  value={disease.copdPercent}
                  min={0}
                  max={15}
                  step={1}
                  suffix="%"
                  onChange={(v) => updateDisease("copdPercent", v)}
                />
              </Section>
            </div>

            {/* Right column: sticky results (desktop only — stacks on mobile) */}
            <div ref={resultsRef} className="lg:w-[480px] xl:w-[520px] shrink-0">
              <div className="lg:sticky lg:top-4">
                <ResultsPanel
                  results={results}
                  baseline={baselineResults}
                  locale={locale}
                  showOptimize={showOptimize}
                  setShowOptimize={setShowOptimize}
                  optimizations={optimizations}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
