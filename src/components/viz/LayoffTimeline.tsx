// LayoffTimeline — Horizontal bar chart showing layoff events by date and scale
"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { LayoffEntry } from "@/lib/california-fqhc-layoffs";
import { t } from "@/lib/i18n-helpers";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */


const REASON_COLORS: Record<string, { bar: string; label: { en: string; es: string } }> = {
  "federal-funding-cuts": {
    bar: "bg-red-500",
    label: { en: "Federal Funding Cuts", es: "Recortes Federales" },
  },
  "state-funding-cuts": {
    bar: "bg-orange-500",
    label: { en: "State Funding Cuts", es: "Recortes Estatales" },
  },
  "financial-restructuring": {
    bar: "bg-amber-500",
    label: { en: "Financial Restructuring", es: "Reestructuración Financiera" },
  },
  "program-closure": {
    bar: "bg-stone-500",
    label: { en: "Program Closure", es: "Cierre de Programa" },
  },
  "merger-acquisition": {
    bar: "bg-blue-500",
    label: { en: "Merger / Acquisition", es: "Fusión / Adquisición" },
  },
  "operational-changes": {
    bar: "bg-stone-400",
    label: { en: "Operational Changes", es: "Cambios Operacionales" },
  },
  "facility-closure": {
    bar: "bg-stone-700",
    label: { en: "Facility Closure", es: "Cierre de Instalación" },
  },
};

function formatDateShort(iso: string, locale: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(locale === "es" ? "es-US" : "en-US", {
    month: "short",
    year: "2-digit",
  });
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface LayoffTimelineProps {
  entries: LayoffEntry[];
}

export function LayoffTimeline({ entries }: LayoffTimelineProps) {
  const locale = useLocale();
  const isEs = locale === "es";
  const [isExpanded, setIsExpanded] = useState(true);

  // Sort by dateAnnounced ascending for chronological display
  const sorted = useMemo(
    () =>
      [...entries]
        .filter((e) => e.employeesAffected > 0)
        .sort(
          (a, b) =>
            new Date(a.dateAnnounced).getTime() -
            new Date(b.dateAnnounced).getTime()
        ),
    [entries]
  );

  // Max employees for scaling
  const maxEmployees = useMemo(
    () => Math.max(...sorted.map((e) => e.employeesAffected), 1),
    [sorted]
  );

  // Cumulative total for running sum
  const cumulativeData = useMemo(
    () =>
      sorted.reduce<number[]>((acc, e) => {
        const prev = acc.length > 0 ? acc[acc.length - 1] : 0;
        acc.push(prev + e.employeesAffected);
        return acc;
      }, []),
    [sorted]
  );

  const totalAffected = cumulativeData[cumulativeData.length - 1] || 0;

  // Active reason categories for legend
  const activeReasons = useMemo(
    () => [...new Set(sorted.map((e) => e.reasonCategory))],
    [sorted]
  );

  // Date range
  const dateRange = useMemo(() => {
    if (sorted.length === 0) return { start: "", end: "" };
    return {
      start: formatDateShort(sorted[0].dateAnnounced, locale),
      end: formatDateShort(sorted[sorted.length - 1].dateAnnounced, locale),
    };
  }, [sorted, locale]);

  // Split into 2025 and 2026 groups for visual separation
  const yearBreakIndex = useMemo(
    () => sorted.findIndex((e) => e.dateAnnounced >= "2026-01-01"),
    [sorted]
  );

  if (sorted.length === 0) return null;

  return (
    <div className="rounded-2xl border border-stone-200 bg-white">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between p-5"
      >
        <div>
          <h3 className="text-lg font-bold text-stone-900">
            {isEs ? "Cronología de Despidos" : "Layoff Timeline"}
          </h3>
          <p className="mt-0.5 text-sm text-stone-500">
            {dateRange.start} &ndash; {dateRange.end} &middot;{" "}
            {totalAffected.toLocaleString()}{" "}
            {isEs ? "trabajadores afectados" : "workers affected"}
          </p>
        </div>
        {isExpanded ? (
          <ChevronUp className="size-5 text-stone-400" />
        ) : (
          <ChevronDown className="size-5 text-stone-400" />
        )}
      </button>

      {isExpanded && (
        <div className="px-5 pb-5">
          {/* Legend */}
          <div className="mb-4 flex flex-wrap gap-3">
            {activeReasons.map((reason) => {
              const config = REASON_COLORS[reason];
              if (!config) return null;
              return (
                <div key={reason} className="flex items-center gap-1.5 text-xs text-stone-600">
                  <div className={`size-2.5 rounded-full ${config.bar}`} />
                  {t(config.label, locale)}
                </div>
              );
            })}
          </div>

          {/* Chart */}
          <div className="space-y-1.5">
            {sorted.map((entry, idx) => {
              const barWidth = Math.max(
                (entry.employeesAffected / maxEmployees) * 100,
                4 // minimum bar width for visibility
              );
              const config = REASON_COLORS[entry.reasonCategory] || {
                bar: "bg-stone-400",
              };

              // Year separator
              const showYearSep = yearBreakIndex > 0 && idx === yearBreakIndex;

              return (
                <div key={entry.id}>
                  {showYearSep && (
                    <div className="my-3 flex items-center gap-2">
                      <div className="h-px flex-1 bg-stone-200" />
                      <span className="text-xs font-bold text-stone-400">2026</span>
                      <div className="h-px flex-1 bg-stone-200" />
                    </div>
                  )}
                  <div className="group flex items-center gap-2">
                    {/* Date label */}
                    <div className="w-16 shrink-0 text-right text-xs text-stone-500">
                      {formatDateShort(entry.dateAnnounced, locale)}
                    </div>

                    {/* Bar + count */}
                    <div className="flex flex-1 items-center gap-2">
                      <div className="relative flex-1">
                        <div
                          className={`h-6 rounded ${config.bar} transition-all duration-300 hover:opacity-80`}
                          style={{ width: `${barWidth}%` }}
                          title={`${entry.organization}: ${entry.employeesAffected} ${isEs ? "empleados" : "employees"}`}
                        />
                      </div>
                      <div className="w-10 shrink-0 text-right text-xs font-semibold text-stone-700">
                        {entry.employeesAffected.toLocaleString()}
                      </div>
                    </div>

                    {/* Org name on hover / always on desktop */}
                    <div className="hidden w-48 shrink-0 truncate text-xs text-stone-500 sm:block">
                      {entry.organization}
                      {entry.isFQHC && (
                        <span className="ml-1 text-teal-600 font-medium">FQHC</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cumulative summary */}
          <div className="mt-4 rounded-lg bg-red-50 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="text-sm text-red-800">
                <span className="font-bold">
                  {totalAffected.toLocaleString()}
                </span>{" "}
                {isEs
                  ? "trabajadores afectados en total"
                  : "total workers affected"}
              </div>
              <div className="text-xs text-red-600">
                {sorted.length} {isEs ? "eventos" : "events"} &middot;{" "}
                {sorted.filter((e) => e.dateAnnounced >= "2026-01-01").length}{" "}
                {isEs ? "en 2026" : "in 2026"}
              </div>
            </div>
            {/* Mini acceleration indicator */}
            <div className="mt-2 flex items-center gap-1">
              {sorted.map((entry, idx) => {
                const config = REASON_COLORS[entry.reasonCategory] || {
                  bar: "bg-stone-400",
                };
                const height = Math.max(
                  Math.round((entry.employeesAffected / maxEmployees) * 24),
                  3
                );
                return (
                  <div
                    key={entry.id}
                    className={`flex-1 rounded-sm ${config.bar} opacity-60`}
                    style={{ height: `${height}px` }}
                    title={`${entry.organization} (${cumulativeData[idx].toLocaleString()} ${isEs ? "acumulado" : "cumulative"})`}
                  />
                );
              })}
            </div>
            <div className="mt-1 flex justify-between text-[10px] text-stone-400">
              <span>{dateRange.start}</span>
              <span>{dateRange.end}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
