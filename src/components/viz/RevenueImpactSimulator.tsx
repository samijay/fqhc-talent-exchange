// RevenueImpactSimulator — "What If" slider tool for FQHC executives
// Now with wizard-guided setup, configurable baseline, and delta comparison
"use client";

import { useState, useMemo, useCallback } from "react";
import { useLocale } from "next-intl";
import {
  SlidersHorizontal,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  Info,
  Sparkles,
  Settings2,
} from "lucide-react";
import {
  SimulatorWizard,
  type WizardConfig,
  type OrgSize,
} from "@/components/simulator/SimulatorWizard";
import { ModeToggle, type SimMode } from "@/components/simulator/ModeToggle";
import { DeltaBadge } from "@/components/simulator/StickyResults";

/* ------------------------------------------------------------------ */
/*  Bilingual helper                                                   */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

/* ------------------------------------------------------------------ */
/*  Size-based MODEL configurations                                    */
/* ------------------------------------------------------------------ */

interface ModelConfig {
  baseRevenue: number;
  federalRevenuePercent: number;
  medicaidRevenuePercent: number;
  otherRevenuePercent: number;
  pharmacy340BRevenue: number;
  optimized340BMultiplier: number;
  avgProviderVisitsPerDay: number;
  topOfScopeVisitIncrease: number;
  ppsRate: number;
  workingDaysPerYear: number;
  providerCount: number;
  avgTurnoverCost: number;
  baselineTurnoverRate: number;
  staffCount: number;
}

const MODEL_CONFIGS: Record<OrgSize, ModelConfig> = {
  small: {
    baseRevenue: 10_000_000,
    federalRevenuePercent: 0.40,
    medicaidRevenuePercent: 0.42,
    otherRevenuePercent: 0.18,
    pharmacy340BRevenue: 400_000,
    optimized340BMultiplier: 2.5,
    avgProviderVisitsPerDay: 16,
    topOfScopeVisitIncrease: 0.25,
    ppsRate: 215,
    workingDaysPerYear: 240,
    providerCount: 11,
    avgTurnoverCost: 12_000,
    baselineTurnoverRate: 0.25,
    staffCount: 80,
  },
  "mid-size": {
    baseRevenue: 38_000_000,
    federalRevenuePercent: 0.35,
    medicaidRevenuePercent: 0.45,
    otherRevenuePercent: 0.20,
    pharmacy340BRevenue: 1_200_000,
    optimized340BMultiplier: 2.7,
    avgProviderVisitsPerDay: 18,
    topOfScopeVisitIncrease: 0.25,
    ppsRate: 225,
    workingDaysPerYear: 240,
    providerCount: 21,
    avgTurnoverCost: 15_000,
    baselineTurnoverRate: 0.22,
    staffCount: 240,
  },
  large: {
    baseRevenue: 100_000_000,
    federalRevenuePercent: 0.30,
    medicaidRevenuePercent: 0.50,
    otherRevenuePercent: 0.20,
    pharmacy340BRevenue: 5_000_000,
    optimized340BMultiplier: 3.0,
    avgProviderVisitsPerDay: 20,
    topOfScopeVisitIncrease: 0.25,
    ppsRate: 240,
    workingDaysPerYear: 240,
    providerCount: 80,
    avgTurnoverCost: 18_000,
    baselineTurnoverRate: 0.20,
    staffCount: 700,
  },
};

function getSizeLabel(size: OrgSize, isEs: boolean): string {
  if (size === "small") return isEs ? "Clínica Comunitaria ($4M)" : "Community Clinic ($4M)";
  if (size === "large") return isEs ? "Sistema Regional ($30M)" : "Regional System ($30M)";
  return isEs ? "Red en Crecimiento ($10M)" : "Growing Network ($10M)";
}

/* ------------------------------------------------------------------ */
/*  Impact Calculator                                                  */
/* ------------------------------------------------------------------ */

interface Impacts {
  federalDelta: number;
  pharmacy340BDelta: number;
  topOfScopeDelta: number;
  turnoverSavings: number;
  totalDelta: number;
  newRevenue: number;
  percentChange: number;
}

function calculateImpacts(
  model: ModelConfig,
  federalChange: number,
  pharmacy340B: number,
  topOfScope: number,
  turnoverReduction: number,
): Impacts {
  const federalBase = model.baseRevenue * model.federalRevenuePercent;
  const federalDelta = federalBase * (federalChange / 100);

  let pharmacy340BDelta = 0;
  if (pharmacy340B === 1) {
    pharmacy340BDelta = model.pharmacy340BRevenue;
  } else if (pharmacy340B === 2) {
    pharmacy340BDelta =
      model.pharmacy340BRevenue * model.optimized340BMultiplier;
  }

  const additionalVisitsPerProvider =
    model.avgProviderVisitsPerDay *
    model.topOfScopeVisitIncrease *
    (topOfScope / 100);
  const totalAdditionalVisits =
    additionalVisitsPerProvider *
    model.providerCount *
    model.workingDaysPerYear;
  const topOfScopeDelta = totalAdditionalVisits * model.ppsRate;

  const baselineTurnoverCost =
    model.staffCount *
    model.baselineTurnoverRate *
    model.avgTurnoverCost;
  const turnoverSavings =
    baselineTurnoverCost * (turnoverReduction / 100);

  const totalDelta =
    federalDelta + pharmacy340BDelta + topOfScopeDelta + turnoverSavings;
  const newRevenue = model.baseRevenue + totalDelta;
  const percentChange = (totalDelta / model.baseRevenue) * 100;

  return {
    federalDelta,
    pharmacy340BDelta,
    topOfScopeDelta,
    turnoverSavings,
    totalDelta,
    newRevenue,
    percentChange,
  };
}

/* ------------------------------------------------------------------ */
/*  Revenue Impact Simulator Component                                 */
/* ------------------------------------------------------------------ */

export function RevenueImpactSimulator() {
  const locale = useLocale();
  const isEs = locale === "es";

  // Mode
  const [mode, setMode] = useState<SimMode>("wizard");
  const [orgSize, setOrgSize] = useState<OrgSize>("mid-size");
  const [baselineImpacts, setBaselineImpacts] = useState<Impacts | null>(null);

  // Slider state
  const [federalChange, setFederalChange] = useState(0);
  const [pharmacy340B, setPharmacy340B] = useState(0);
  const [topOfScope, setTopOfScope] = useState(0);
  const [turnoverReduction, setTurnoverReduction] = useState(0);

  const model = MODEL_CONFIGS[orgSize];

  // Wizard complete
  const handleWizardComplete = useCallback(
    (config: WizardConfig) => {
      setOrgSize(config.size);
      const selectedModel = MODEL_CONFIGS[config.size];

      // Pre-set sliders based on priority
      if (config.priority === "prepare-cuts") {
        setFederalChange(-20);
        setPharmacy340B(config.services.pharmacy340B ? 1 : 0);
        setTopOfScope(0);
        setTurnoverReduction(0);
      } else if (config.priority === "maximize-revenue") {
        setFederalChange(0);
        setPharmacy340B(config.services.pharmacy340B ? 2 : 0);
        setTopOfScope(60);
        setTurnoverReduction(25);
      } else if (config.priority === "reduce-costs") {
        setFederalChange(0);
        setPharmacy340B(config.services.pharmacy340B ? 1 : 0);
        setTopOfScope(30);
        setTurnoverReduction(40);
      } else {
        setFederalChange(0);
        setPharmacy340B(0);
        setTopOfScope(0);
        setTurnoverReduction(0);
      }

      // Set baseline for comparison
      const zeroImpacts = calculateImpacts(selectedModel, 0, 0, 0, 0);
      setBaselineImpacts(zeroImpacts);

      setMode("manual");
    },
    [],
  );

  const handleWizardSkip = useCallback(() => {
    setMode("manual");
    setBaselineImpacts(null);
  }, []);

  // Calculate impacts
  const impacts = useMemo(
    () =>
      calculateImpacts(
        model,
        federalChange,
        pharmacy340B,
        topOfScope,
        turnoverReduction,
      ),
    [model, federalChange, pharmacy340B, topOfScope, turnoverReduction],
  );

  const isPositive = impacts.totalDelta >= 0;

  return (
    <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-stone-900 to-stone-800 px-6 py-5 text-white">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <SlidersHorizontal className="size-5 text-teal-400" />
              <h3 className="text-lg font-bold">
                {isEs
                  ? "Simulador de Impacto en Ingresos"
                  : "Revenue Impact Simulator"}
              </h3>
            </div>
            <p className="text-sm text-stone-400">
              {mode === "manual"
                ? isEs
                  ? `Modelando: ${getSizeLabel(orgSize, true)}`
                  : `Modeling: ${getSizeLabel(orgSize, false)}`
                : isEs
                  ? "Modele escenarios de ingresos para su FQHC"
                  : "Model revenue scenarios for your FQHC"}
            </p>
          </div>
          <ModeToggle mode={mode} onChange={setMode} locale={locale} />
        </div>
      </div>

      {/* Wizard Mode */}
      {mode === "wizard" && (
        <div className="p-6 py-10">
          <SimulatorWizard
            onComplete={handleWizardComplete}
            onSkip={handleWizardSkip}
            locale={locale}
          />
        </div>
      )}

      {/* Manual Mode */}
      {mode === "manual" && (
        <div className="p-6">
          {/* Size selector pills */}
          <div className="mb-6">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-500">
              {isEs ? "Tamaño de Organización" : "Organization Size"}
            </label>
            <div className="flex flex-wrap gap-2">
              {(["small", "mid-size", "large"] as OrgSize[]).map((size) => (
                <button
                  key={size}
                  onClick={() => setOrgSize(size)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    orgSize === size
                      ? "bg-teal-700 text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {getSizeLabel(size, isEs)}
                </button>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-6 mb-8">
            {/* Federal Funding Change */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-stone-700">
                  {isEs
                    ? "Cambio en fondos federales"
                    : "Federal Funding Change"}
                </label>
                <span
                  className={`text-sm font-bold ${federalChange < 0 ? "text-red-600" : federalChange > 0 ? "text-teal-600" : "text-stone-500"}`}
                >
                  {federalChange > 0 ? "+" : ""}
                  {federalChange}%
                </span>
              </div>
              <input
                type="range"
                min={-30}
                max={10}
                step={5}
                value={federalChange}
                onChange={(e) => setFederalChange(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-red-200 via-stone-200 to-teal-200 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-stone-800 [&::-webkit-slider-thumb]:shadow-md"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>-30%</span>
                <span>{isEs ? "Sin cambio" : "No change"}</span>
                <span>+10%</span>
              </div>
            </div>

            {/* 340B Pharmacy */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-stone-700">
                  {isEs
                    ? "Participación en farmacia 340B"
                    : "340B Pharmacy Participation"}
                </label>
                <span className="text-sm font-bold text-teal-600">
                  {pharmacy340B === 0
                    ? isEs
                      ? "Ninguna"
                      : "None"
                    : pharmacy340B === 1
                      ? isEs
                        ? "Básica"
                        : "Basic"
                      : isEs
                        ? "Optimizada"
                        : "Optimized"}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={2}
                step={1}
                value={pharmacy340B}
                onChange={(e) => setPharmacy340B(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-stone-200 via-teal-100 to-teal-300 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-stone-800 [&::-webkit-slider-thumb]:shadow-md"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>{isEs ? "Ninguna" : "None"}</span>
                <span>
                  {isEs ? "Básica (contrato)" : "Basic (contract)"}
                </span>
                <span>
                  {isEs
                    ? "Optimizada (propia)"
                    : "Optimized (entity-owned)"}
                </span>
              </div>
            </div>

            {/* Top-of-Scope Staffing */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-stone-700">
                  {isEs
                    ? "Personal a máximo alcance"
                    : "Staff Working at Top-of-Scope"}
                </label>
                <span className="text-sm font-bold text-teal-600">
                  {topOfScope}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={10}
                value={topOfScope}
                onChange={(e) => setTopOfScope(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-stone-200 to-teal-300 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-stone-800 [&::-webkit-slider-thumb]:shadow-md"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>
                  0% ({isEs ? "estado actual" : "current state"})
                </span>
                <span>
                  100% ({isEs ? "alcance completo" : "full scope"})
                </span>
              </div>
            </div>

            {/* Turnover Reduction */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-stone-700">
                  {isEs
                    ? "Reducción de rotación"
                    : "Turnover Reduction"}
                </label>
                <span className="text-sm font-bold text-teal-600">
                  {turnoverReduction}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={50}
                step={5}
                value={turnoverReduction}
                onChange={(e) =>
                  setTurnoverReduction(Number(e.target.value))
                }
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-stone-200 to-teal-300 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-stone-800 [&::-webkit-slider-thumb]:shadow-md"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>0%</span>
                <span>
                  -50% {isEs ? "rotación" : "turnover"}
                </span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div
            className={`rounded-xl p-5 ${isPositive ? "bg-teal-50 border border-teal-200" : "bg-red-50 border border-red-200"}`}
          >
            {/* Net impact */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {isPositive ? (
                  <TrendingUp className="size-5 text-teal-600" />
                ) : (
                  <TrendingDown className="size-5 text-red-600" />
                )}
                <span className="text-sm font-medium text-stone-700">
                  {isEs
                    ? "Impacto Neto en Ingresos"
                    : "Net Revenue Impact"}
                </span>
              </div>
              <div className="text-right">
                <span
                  className={`text-2xl font-bold ${isPositive ? "text-teal-700" : "text-red-700"}`}
                >
                  {isPositive ? "+" : ""}$
                  {Math.abs(
                    Math.round(impacts.totalDelta),
                  ).toLocaleString()}
                </span>
                <span
                  className={`block text-xs ${isPositive ? "text-teal-600" : "text-red-600"}`}
                >
                  {isPositive ? "+" : ""}
                  {impacts.percentChange.toFixed(1)}%{" "}
                  {isEs ? "de ingresos base" : "of base revenue"}
                </span>
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-2">
              {[
                {
                  label: isEs
                    ? "Fondos federales"
                    : "Federal funding",
                  value: impacts.federalDelta,
                  icon: AlertTriangle,
                },
                {
                  label: isEs
                    ? "Farmacia 340B"
                    : "340B pharmacy",
                  value: impacts.pharmacy340BDelta,
                  icon: DollarSign,
                },
                {
                  label: isEs
                    ? "Alcance máximo del personal"
                    : "Top-of-scope staffing",
                  value: impacts.topOfScopeDelta,
                  icon: TrendingUp,
                },
                {
                  label: isEs
                    ? "Ahorro en rotación"
                    : "Turnover savings",
                  value: impacts.turnoverSavings,
                  icon: TrendingUp,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <item.icon className="size-3.5 text-stone-400" />
                    <span className="text-stone-600">{item.label}</span>
                  </div>
                  <span
                    className={`font-medium ${
                      item.value > 0
                        ? "text-teal-700"
                        : item.value < 0
                          ? "text-red-700"
                          : "text-stone-400"
                    }`}
                  >
                    {item.value > 0 ? "+" : ""}$
                    {Math.abs(
                      Math.round(item.value),
                    ).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Revenue bar visualization */}
            <div className="mt-4 pt-4 border-t border-stone-200">
              <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                <span>
                  {isEs ? "Ingresos base" : "Base Revenue"}: $
                  {(model.baseRevenue / 1_000_000).toFixed(0)}M
                </span>
                <span>
                  {isEs ? "Proyectado" : "Projected"}: $
                  {(impacts.newRevenue / 1_000_000).toFixed(1)}M
                </span>
              </div>
              <div className="relative h-6 rounded-full bg-stone-200 overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-stone-400 rounded-l-full"
                  style={{
                    width: `${Math.min(100, (model.baseRevenue / (model.baseRevenue * 1.3)) * 100)}%`,
                  }}
                />
                {impacts.totalDelta > 0 ? (
                  <div
                    className="absolute inset-y-0 bg-teal-500 rounded-r-full transition-all duration-300"
                    style={{
                      left: `${(model.baseRevenue / (model.baseRevenue * 1.3)) * 100}%`,
                      width: `${Math.min(30, (impacts.totalDelta / (model.baseRevenue * 1.3)) * 100)}%`,
                    }}
                  />
                ) : impacts.totalDelta < 0 ? (
                  <div
                    className="absolute inset-y-0 bg-red-500 rounded-r-full transition-all duration-300"
                    style={{
                      left: `${Math.max(0, ((model.baseRevenue + impacts.totalDelta) / (model.baseRevenue * 1.3)) * 100)}%`,
                      width: `${Math.min(30, (Math.abs(impacts.totalDelta) / (model.baseRevenue * 1.3)) * 100)}%`,
                    }}
                  />
                ) : null}
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-4 flex items-start gap-2 text-[11px] text-stone-400">
            <Info className="size-3.5 mt-0.5 flex-shrink-0" />
            <p>
              {isEs
                ? `Modelo basado en datos promedio de FQHCs en California (${getSizeLabel(orgSize, true)}). Los resultados reales varían según mezcla de pagadores y condiciones locales del mercado.`
                : `Model based on average data for California FQHCs (${getSizeLabel(orgSize, false)}). Actual results vary by payer mix and local market conditions.`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
