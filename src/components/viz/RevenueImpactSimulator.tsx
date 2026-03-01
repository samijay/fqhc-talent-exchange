// RevenueImpactSimulator — "What If" slider tool for FQHC executives
"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import {
  SlidersHorizontal,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  Info,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Bilingual helper                                                   */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

/* ------------------------------------------------------------------ */
/*  Model constants (based on real FQHC financial data)                */
/* ------------------------------------------------------------------ */

const MODEL = {
  // Typical mid-size CA FQHC baseline (annual)
  baseRevenue: 10_000_000, // $10M total revenue
  federalRevenuePercent: 0.35, // 35% from federal grants
  medicaidRevenuePercent: 0.45, // 45% from Medi-Cal
  otherRevenuePercent: 0.20, // 20% other (340B, private, state)

  // 340B impact
  pharmacy340BRevenue: 800_000, // typical 340B savings/revenue
  optimized340BMultiplier: 2.7, // based on Highland Health case study

  // Top-of-scope impact
  avgProviderVisitsPerDay: 18,
  topOfScopeVisitIncrease: 0.25, // 25% more visits when staff at full scope
  ppsRate: 225, // avg PPS encounter rate in CA
  workingDaysPerYear: 250,
  providerCount: 8, // typical mid-size FQHC

  // Workforce savings
  avgTurnoverCost: 15_000, // cost to replace one worker
  baselineTurnoverRate: 0.22, // 22% annual turnover
  staffCount: 85, // typical mid-size FQHC
};

/* ------------------------------------------------------------------ */
/*  Revenue Impact Simulator Component                                 */
/* ------------------------------------------------------------------ */

export function RevenueImpactSimulator() {
  const locale = useLocale();
  const isEs = locale === "es";

  // Slider state
  const [federalChange, setFederalChange] = useState(0); // -30 to +10%
  const [pharmacy340B, setPharmacy340B] = useState(0); // 0=none, 1=basic, 2=optimized
  const [topOfScope, setTopOfScope] = useState(0); // 0-100% of staff
  const [turnoverReduction, setTurnoverReduction] = useState(0); // 0-50% reduction

  // Calculate impacts
  const impacts = useMemo(() => {
    // Federal funding change
    const federalBase = MODEL.baseRevenue * MODEL.federalRevenuePercent;
    const federalDelta = federalBase * (federalChange / 100);

    // 340B pharmacy
    let pharmacy340BDelta = 0;
    if (pharmacy340B === 1) {
      pharmacy340BDelta = MODEL.pharmacy340BRevenue; // basic 340B participation
    } else if (pharmacy340B === 2) {
      pharmacy340BDelta = MODEL.pharmacy340BRevenue * MODEL.optimized340BMultiplier; // optimized (entity-owned)
    }

    // Top-of-scope visit increase
    const additionalVisitsPerProvider =
      MODEL.avgProviderVisitsPerDay * MODEL.topOfScopeVisitIncrease * (topOfScope / 100);
    const totalAdditionalVisits =
      additionalVisitsPerProvider * MODEL.providerCount * MODEL.workingDaysPerYear;
    const topOfScopeDelta = totalAdditionalVisits * MODEL.ppsRate;

    // Turnover cost savings
    const baselineTurnoverCost =
      MODEL.staffCount * MODEL.baselineTurnoverRate * MODEL.avgTurnoverCost;
    const turnoverSavings = baselineTurnoverCost * (turnoverReduction / 100);

    const totalDelta = federalDelta + pharmacy340BDelta + topOfScopeDelta + turnoverSavings;
    const newRevenue = MODEL.baseRevenue + totalDelta;
    const percentChange = (totalDelta / MODEL.baseRevenue) * 100;

    return {
      federalDelta,
      pharmacy340BDelta,
      topOfScopeDelta,
      turnoverSavings,
      totalDelta,
      newRevenue,
      percentChange,
    };
  }, [federalChange, pharmacy340B, topOfScope, turnoverReduction]);

  const isPositive = impacts.totalDelta >= 0;

  return (
    <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-stone-900 to-stone-800 px-6 py-5 text-white">
        <div className="flex items-center gap-2 mb-1">
          <SlidersHorizontal className="size-5 text-teal-400" />
          <h3 className="text-lg font-bold">
            {isEs ? "Simulador de Impacto en Ingresos" : "Revenue Impact Simulator"}
          </h3>
        </div>
        <p className="text-sm text-stone-400">
          {isEs
            ? "Modele escenarios para un FQHC de tamaño medio en California ($10M ingresos, 85 empleados)"
            : "Model scenarios for a mid-size California FQHC ($10M revenue, 85 staff)"}
        </p>
      </div>

      <div className="p-6">
        {/* Sliders */}
        <div className="space-y-6 mb-8">
          {/* Federal Funding Change */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-stone-700">
                {isEs ? "Cambio en fondos federales" : "Federal Funding Change"}
              </label>
              <span className={`text-sm font-bold ${federalChange < 0 ? "text-red-600" : federalChange > 0 ? "text-teal-600" : "text-stone-500"}`}>
                {federalChange > 0 ? "+" : ""}{federalChange}%
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
                {isEs ? "Participación en farmacia 340B" : "340B Pharmacy Participation"}
              </label>
              <span className="text-sm font-bold text-teal-600">
                {pharmacy340B === 0
                  ? (isEs ? "Ninguna" : "None")
                  : pharmacy340B === 1
                    ? (isEs ? "Básica" : "Basic")
                    : (isEs ? "Optimizada" : "Optimized")}
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
              <span>{isEs ? "Básica (contrato)" : "Basic (contract)"}</span>
              <span>{isEs ? "Optimizada (propia)" : "Optimized (entity-owned)"}</span>
            </div>
          </div>

          {/* Top-of-Scope Staffing */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-stone-700">
                {isEs ? "Personal a máximo alcance" : "Staff Working at Top-of-Scope"}
              </label>
              <span className="text-sm font-bold text-teal-600">{topOfScope}%</span>
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
              <span>0% ({isEs ? "estado actual" : "current state"})</span>
              <span>100% ({isEs ? "alcance completo" : "full scope"})</span>
            </div>
          </div>

          {/* Turnover Reduction */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-stone-700">
                {isEs ? "Reducción de rotación" : "Turnover Reduction"}
              </label>
              <span className="text-sm font-bold text-teal-600">{turnoverReduction}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              step={5}
              value={turnoverReduction}
              onChange={(e) => setTurnoverReduction(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-stone-200 to-teal-300 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-stone-800 [&::-webkit-slider-thumb]:shadow-md"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-1">
              <span>0%</span>
              <span>-50% {isEs ? "rotación" : "turnover"}</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className={`rounded-xl p-5 ${isPositive ? "bg-teal-50 border border-teal-200" : "bg-red-50 border border-red-200"}`}>
          {/* Net impact */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {isPositive ? (
                <TrendingUp className="size-5 text-teal-600" />
              ) : (
                <TrendingDown className="size-5 text-red-600" />
              )}
              <span className="text-sm font-medium text-stone-700">
                {isEs ? "Impacto Neto en Ingresos" : "Net Revenue Impact"}
              </span>
            </div>
            <div className="text-right">
              <span className={`text-2xl font-bold ${isPositive ? "text-teal-700" : "text-red-700"}`}>
                {isPositive ? "+" : ""}${Math.abs(Math.round(impacts.totalDelta)).toLocaleString()}
              </span>
              <span className={`block text-xs ${isPositive ? "text-teal-600" : "text-red-600"}`}>
                {isPositive ? "+" : ""}{impacts.percentChange.toFixed(1)}% {isEs ? "de ingresos base" : "of base revenue"}
              </span>
            </div>
          </div>

          {/* Breakdown */}
          <div className="space-y-2">
            {[
              {
                label: isEs ? "Fondos federales" : "Federal funding",
                value: impacts.federalDelta,
                icon: AlertTriangle,
              },
              {
                label: isEs ? "Farmacia 340B" : "340B pharmacy",
                value: impacts.pharmacy340BDelta,
                icon: DollarSign,
              },
              {
                label: isEs ? "Alcance máximo del personal" : "Top-of-scope staffing",
                value: impacts.topOfScopeDelta,
                icon: TrendingUp,
              },
              {
                label: isEs ? "Ahorro en rotación" : "Turnover savings",
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
                  {item.value > 0 ? "+" : ""}
                  ${Math.abs(Math.round(item.value)).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Revenue bar visualization */}
          <div className="mt-4 pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span>{isEs ? "Ingresos base" : "Base Revenue"}: $10M</span>
              <span>
                {isEs ? "Proyectado" : "Projected"}: ${(impacts.newRevenue / 1_000_000).toFixed(1)}M
              </span>
            </div>
            <div className="relative h-6 rounded-full bg-stone-200 overflow-hidden">
              {/* Base revenue */}
              <div
                className="absolute inset-y-0 left-0 bg-stone-400 rounded-l-full"
                style={{ width: `${Math.min(100, (MODEL.baseRevenue / (MODEL.baseRevenue * 1.3)) * 100)}%` }}
              />
              {/* Delta */}
              {impacts.totalDelta > 0 ? (
                <div
                  className="absolute inset-y-0 bg-teal-500 rounded-r-full transition-all duration-300"
                  style={{
                    left: `${(MODEL.baseRevenue / (MODEL.baseRevenue * 1.3)) * 100}%`,
                    width: `${Math.min(30, (impacts.totalDelta / (MODEL.baseRevenue * 1.3)) * 100)}%`,
                  }}
                />
              ) : impacts.totalDelta < 0 ? (
                <div
                  className="absolute inset-y-0 bg-red-500 rounded-r-full transition-all duration-300"
                  style={{
                    left: `${Math.max(0, ((MODEL.baseRevenue + impacts.totalDelta) / (MODEL.baseRevenue * 1.3)) * 100)}%`,
                    width: `${Math.min(30, (Math.abs(impacts.totalDelta) / (MODEL.baseRevenue * 1.3)) * 100)}%`,
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
              ? "Modelo simplificado basado en datos promedio de FQHCs medianos en California. Los resultados reales varian segun el tamaño de la organizacion, mezcla de pagadores, y condiciones locales del mercado."
              : "Simplified model based on average data for mid-size California FQHCs. Actual results vary by organization size, payer mix, and local market conditions."}
          </p>
        </div>
      </div>
    </div>
  );
}
