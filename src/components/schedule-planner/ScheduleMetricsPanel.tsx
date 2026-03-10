// ScheduleMetricsPanel.tsx — Live sidebar with MA ratio gauge, revenue, costs, warnings
"use client";

import { useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import {
  DollarSign,
  Users,
  AlertTriangle,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle2,
  Info,
  Zap,
} from "lucide-react";
import type { ScheduleMetrics, ScheduleWarning } from "@/lib/schedule-planner-engine";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface ScheduleMetricsPanelProps {
  metrics: ScheduleMetrics;
  ppsRate: number;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

function RatioGauge({ ratio, target = 1.5 }: { ratio: number; target?: number }) {
  const percentage = Math.min((ratio / (target * 1.5)) * 100, 100);
  const isGood = ratio >= target - 0.1;
  const isWarning = ratio > 0 && ratio < target - 0.1;
  const color = isGood
    ? "bg-green-500"
    : isWarning
      ? "bg-amber-500"
      : "bg-red-500";

  return (
    <div className="space-y-1">
      <div className="h-3 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden relative">
        {/* Target line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-stone-400 dark:bg-stone-500 z-10"
          style={{ left: `${(target / (target * 1.5)) * 100}%` }}
        />
        <div
          className={`h-full ${color} rounded-full transition-all`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-stone-400">
        <span>0</span>
        <span>{target}:1 target</span>
        <span>{(target * 1.5).toFixed(1)}</span>
      </div>
    </div>
  );
}

function WarningIcon({ severity }: { severity: string }) {
  if (severity === "critical") return <AlertCircle className="h-3.5 w-3.5 text-red-500 shrink-0" />;
  if (severity === "warning") return <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0" />;
  return <Info className="h-3.5 w-3.5 text-blue-500 shrink-0" />;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ScheduleMetricsPanel({
  metrics,
  ppsRate,
}: ScheduleMetricsPanelProps) {
  const locale = useLocale();
  const isEs = locale === "es";

  const criticalWarnings = metrics.allWarnings.filter((w) => w.severity === "critical");
  const otherWarnings = metrics.allWarnings.filter((w) => w.severity !== "critical");

  return (
    <div className="space-y-4">
      {/* Revenue Card */}
      <Card className="border-teal-200 dark:border-teal-800">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="h-4 w-4 text-teal-600" />
            <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
              {isEs ? "Ingresos" : "Revenue"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-wide text-stone-400 mb-0.5">
                {isEs ? "Semanal" : "Weekly"}
              </p>
              <p className="text-lg font-bold text-teal-700 dark:text-teal-400">
                {formatCurrency(metrics.totalWeeklyRevenue)}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wide text-stone-400 mb-0.5">
                {isEs ? "Anual" : "Annual"}
              </p>
              <p className="text-lg font-bold text-stone-800 dark:text-stone-200">
                {formatCurrency(metrics.annualizedRevenue)}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wide text-stone-400 mb-0.5">
                {isEs ? "Costo Laboral" : "Labor Cost"}
              </p>
              <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
                {formatCurrency(metrics.annualizedLaborCost)}/yr
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wide text-stone-400 mb-0.5">
                {isEs ? "Margen" : "Margin"}
              </p>
              <p className={`text-sm font-bold ${
                metrics.annualizedMargin >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}>
                {formatCurrency(metrics.annualizedMargin)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Staff & Encounters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-4 w-4 text-stone-600" />
            <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
              {isEs ? "Dotación" : "Staffing"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-wide text-stone-400 mb-0.5">
                {isEs ? "Personal Total" : "Total Staff"}
              </p>
              <p className="text-lg font-bold text-stone-800 dark:text-stone-200">
                {metrics.totalStaff}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wide text-stone-400 mb-0.5">
                {isEs ? "Proveedores" : "Providers"}
              </p>
              <p className="text-lg font-bold text-stone-800 dark:text-stone-200">
                {metrics.totalProviders}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wide text-stone-400 mb-0.5">
                {isEs ? "Encuentros/Sem" : "Encounters/Wk"}
              </p>
              <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                {metrics.totalWeeklyEncounters}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wide text-stone-400 mb-0.5">
                {isEs ? "Promedio/Día" : "Avg/Day"}
              </p>
              <p className="text-lg font-bold text-stone-800 dark:text-stone-200">
                {metrics.averageEncountersPerDay}
              </p>
            </div>
          </div>

          {/* MA:Provider Ratio Gauge */}
          <div>
            <p className="text-[10px] uppercase tracking-wide text-stone-400 mb-1">
              {isEs ? "Ratio MA:Proveedor" : "MA:Provider Ratio"}
            </p>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-lg font-bold ${
                metrics.overallMAProviderRatio >= 1.4
                  ? "text-green-600 dark:text-green-400"
                  : metrics.overallMAProviderRatio > 0
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-red-600 dark:text-red-400"
              }`}>
                {metrics.overallMAProviderRatio.toFixed(1)}:1
              </span>
              {metrics.overallMAProviderRatio >= 1.4 && (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              )}
            </div>
            <RatioGauge ratio={metrics.overallMAProviderRatio} />
          </div>
        </CardContent>
      </Card>

      {/* Warnings */}
      {metrics.allWarnings.length > 0 && (
        <Card className={
          criticalWarnings.length > 0
            ? "border-red-200 dark:border-red-800"
            : "border-amber-200 dark:border-amber-800"
        }>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className={`h-4 w-4 ${
                criticalWarnings.length > 0
                  ? "text-red-500"
                  : "text-amber-500"
              }`} />
              <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                {isEs ? "Alertas" : "Warnings"}
                <span className="ml-1 text-xs font-normal text-stone-400">
                  ({metrics.allWarnings.length})
                </span>
              </span>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {metrics.allWarnings.map((warning, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-xs"
                >
                  <WarningIcon severity={warning.severity} />
                  <p className="text-stone-600 dark:text-stone-400 leading-tight">
                    {isEs ? warning.message.es : warning.message.en}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* PPS Info */}
      <div className="text-[10px] text-stone-400 dark:text-stone-500 text-center">
        PPS Rate: ${ppsRate} · {isEs ? "50 semanas/año" : "50 weeks/year"}
      </div>
    </div>
  );
}
