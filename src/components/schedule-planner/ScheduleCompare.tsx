// ScheduleCompare.tsx — Side-by-side comparison of 2 saved schedules
"use client";

import { useMemo } from "react";
import { useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Download,
  X,
} from "lucide-react";
import {
  type WeeklySchedule,
  calculateScheduleMetrics,
} from "@/lib/schedule-planner-engine";
import { downloadScheduleComparisonAsExcel } from "@/lib/schedule-excel-export";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface ScheduleCompareProps {
  schedule1: WeeklySchedule;
  schedule2: WeeklySchedule;
  onClose: () => void;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatCurrency(n: number): string {
  if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (Math.abs(n) >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

function DeltaIndicator({ value, isCurrency = false, lowerIsBetter = false }: {
  value: number;
  isCurrency?: boolean;
  lowerIsBetter?: boolean;
}) {
  if (value === 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-stone-500 text-xs">
        <Minus className="h-3 w-3" /> 0
      </span>
    );
  }

  const isPositive = value > 0;
  const isGood = lowerIsBetter ? !isPositive : isPositive;
  const formatted = isCurrency ? formatCurrency(Math.abs(value)) : Math.abs(value).toFixed(1);

  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${
      isGood ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
    }`}>
      {isPositive ? (
        <ArrowUpRight className="h-3 w-3" />
      ) : (
        <ArrowDownRight className="h-3 w-3" />
      )}
      {isPositive ? "+" : "-"}{formatted}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ScheduleCompare({
  schedule1,
  schedule2,
  onClose,
}: ScheduleCompareProps) {
  const locale = useLocale();
  const isEs = locale === "es";

  const m1 = useMemo(() => calculateScheduleMetrics(schedule1), [schedule1]);
  const m2 = useMemo(() => calculateScheduleMetrics(schedule2), [schedule2]);

  const rows: {
    label: string;
    val1: string;
    val2: string;
    delta: number;
    isCurrency?: boolean;
    lowerIsBetter?: boolean;
  }[] = [
    {
      label: isEs ? "Personal Total" : "Total Staff",
      val1: `${m1.totalStaff}`,
      val2: `${m2.totalStaff}`,
      delta: m2.totalStaff - m1.totalStaff,
    },
    {
      label: isEs ? "Proveedores" : "Providers",
      val1: `${m1.totalProviders}`,
      val2: `${m2.totalProviders}`,
      delta: m2.totalProviders - m1.totalProviders,
    },
    {
      label: "MA:Provider",
      val1: `${m1.overallMAProviderRatio.toFixed(1)}:1`,
      val2: `${m2.overallMAProviderRatio.toFixed(1)}:1`,
      delta: m2.overallMAProviderRatio - m1.overallMAProviderRatio,
    },
    {
      label: isEs ? "Encuentros/Sem" : "Encounters/Wk",
      val1: `${m1.totalWeeklyEncounters}`,
      val2: `${m2.totalWeeklyEncounters}`,
      delta: m2.totalWeeklyEncounters - m1.totalWeeklyEncounters,
    },
    {
      label: isEs ? "Ingresos/Sem" : "Revenue/Wk",
      val1: formatCurrency(m1.totalWeeklyRevenue),
      val2: formatCurrency(m2.totalWeeklyRevenue),
      delta: m2.totalWeeklyRevenue - m1.totalWeeklyRevenue,
      isCurrency: true,
    },
    {
      label: isEs ? "Ingreso Anual" : "Annual Revenue",
      val1: formatCurrency(m1.annualizedRevenue),
      val2: formatCurrency(m2.annualizedRevenue),
      delta: m2.annualizedRevenue - m1.annualizedRevenue,
      isCurrency: true,
    },
    {
      label: isEs ? "Costo Laboral Anual" : "Annual Labor Cost",
      val1: formatCurrency(m1.annualizedLaborCost),
      val2: formatCurrency(m2.annualizedLaborCost),
      delta: m2.annualizedLaborCost - m1.annualizedLaborCost,
      isCurrency: true,
      lowerIsBetter: true,
    },
    {
      label: isEs ? "Margen Anual" : "Annual Margin",
      val1: formatCurrency(m1.annualizedMargin),
      val2: formatCurrency(m2.annualizedMargin),
      delta: m2.annualizedMargin - m1.annualizedMargin,
      isCurrency: true,
    },
    {
      label: isEs ? "Alertas" : "Warnings",
      val1: `${m1.allWarnings.length}`,
      val2: `${m2.allWarnings.length}`,
      delta: m2.allWarnings.length - m1.allWarnings.length,
      lowerIsBetter: true,
    },
  ];

  return (
    <Card className="border-indigo-200 dark:border-indigo-800">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-stone-800 dark:text-stone-200">
            {isEs ? "Comparación de Horarios" : "Schedule Comparison"}
          </h3>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={() => downloadScheduleComparisonAsExcel(schedule1, schedule2, locale)}
            >
              <Download className="h-3 w-3 mr-1" />
              Excel
            </Button>
            <button
              onClick={onClose}
              className="text-stone-500 hover:text-stone-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-700">
                <th className="text-left py-2 pr-2 text-stone-500 font-medium">
                  {isEs ? "Métrica" : "Metric"}
                </th>
                <th className="text-center py-2 px-2 text-indigo-600 dark:text-indigo-400 font-medium truncate max-w-[100px]">
                  {schedule1.name}
                </th>
                <th className="text-center py-2 px-2 text-teal-600 dark:text-teal-400 font-medium truncate max-w-[100px]">
                  {schedule2.name}
                </th>
                <th className="text-center py-2 pl-2 text-stone-500 font-medium">
                  Δ
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.label}
                  className="border-b border-stone-100 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/30"
                >
                  <td className="py-1.5 pr-2 text-stone-700 dark:text-stone-300 font-medium">
                    {row.label}
                  </td>
                  <td className="py-1.5 px-2 text-center text-stone-600 dark:text-stone-500">
                    {row.val1}
                  </td>
                  <td className="py-1.5 px-2 text-center text-stone-600 dark:text-stone-500">
                    {row.val2}
                  </td>
                  <td className="py-1.5 pl-2 text-center">
                    <DeltaIndicator
                      value={row.delta}
                      isCurrency={row.isCurrency}
                      lowerIsBetter={row.lowerIsBetter}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
