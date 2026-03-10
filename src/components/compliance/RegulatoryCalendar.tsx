// RegulatoryCalendar.tsx — Visual timeline of upcoming regulatory deadlines
"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  AlertCircle,
  AlertTriangle,
  Info,
  ChevronRight,
  Filter,
} from "lucide-react";
import type {
  RegulatoryDeadline,
  ComplianceDomainId,
  DeadlineSeverity,
} from "@/lib/compliance-data";
import {
  REGULATORY_DEADLINES,
  COMPLIANCE_DOMAINS,
} from "@/lib/compliance-data";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface RegulatoryCalendarProps {
  maxItems?: number;
  compact?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function SeverityIcon({ severity }: { severity: DeadlineSeverity }) {
  switch (severity) {
    case "critical":
      return <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />;
    case "high":
      return <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />;
    case "medium":
      return <Info className="h-4 w-4 text-blue-500 shrink-0" />;
    default:
      return <Info className="h-4 w-4 text-stone-400 shrink-0" />;
  }
}

const SEVERITY_COLORS: Record<DeadlineSeverity, string> = {
  critical: "border-l-red-500",
  high: "border-l-amber-500",
  medium: "border-l-blue-500",
  low: "border-l-stone-300",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function RegulatoryCalendar({
  maxItems,
  compact = false,
}: RegulatoryCalendarProps) {
  const locale = useLocale();
  const isEs = locale === "es";
  const t = (obj: { en: string; es: string }) => (isEs ? obj.es : obj.en);

  const [filterDomain, setFilterDomain] = useState<ComplianceDomainId | "all">("all");

  const deadlines = useMemo(() => {
    let items = [...REGULATORY_DEADLINES]
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

    if (filterDomain !== "all") {
      items = items.filter((d) => d.domain === filterDomain);
    }

    if (maxItems) {
      items = items.slice(0, maxItems);
    }

    return items;
  }, [filterDomain, maxItems]);

  // Group by month
  const groupedByMonth = useMemo(() => {
    const groups: Record<string, RegulatoryDeadline[]> = {};
    for (const deadline of deadlines) {
      const date = new Date(deadline.dueDate);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      if (!groups[monthKey]) groups[monthKey] = [];
      groups[monthKey].push(deadline);
    }
    return groups;
  }, [deadlines]);

  const monthNames = isEs
    ? ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div>
      {!compact && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-indigo-500" />
            {isEs ? "Calendario Regulatorio" : "Regulatory Calendar"}
          </h3>
          <span className="text-xs text-stone-400">
            {deadlines.length} {isEs ? "fechas límite" : "deadlines"}
          </span>
        </div>
      )}

      {/* Domain filter */}
      {!compact && (
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <Filter className="h-3.5 w-3.5 text-stone-400" />
          <button
            onClick={() => setFilterDomain("all")}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
              filterDomain === "all"
                ? "bg-stone-800 text-white dark:bg-stone-200 dark:text-stone-900"
                : "bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400 hover:bg-stone-200"
            }`}
          >
            {isEs ? "Todos" : "All"}
          </button>
          {COMPLIANCE_DOMAINS.map((domain) => (
            <button
              key={domain.id}
              onClick={() => setFilterDomain(domain.id)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                filterDomain === domain.id
                  ? `${domain.color} ${domain.textColor}`
                  : "bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400 hover:bg-stone-200"
              }`}
            >
              {t(domain.shortTitle)}
            </button>
          ))}
        </div>
      )}

      {/* Timeline */}
      <div className="space-y-6">
        {Object.entries(groupedByMonth).map(([monthKey, items]) => {
          const [year, month] = monthKey.split("-").map(Number);
          const monthName = monthNames[month - 1];
          const now = new Date();
          const isCurrentMonth = now.getFullYear() === year && now.getMonth() + 1 === month;

          return (
            <div key={monthKey}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`text-xs font-bold uppercase tracking-wider ${
                  isCurrentMonth
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-stone-400"
                }`}>
                  {monthName} {year}
                </div>
                {isCurrentMonth && (
                  <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 text-[9px]">
                    {isEs ? "ACTUAL" : "CURRENT"}
                  </Badge>
                )}
              </div>

              <div className="space-y-2">
                {items.map((deadline) => {
                  const date = new Date(deadline.dueDate);
                  const domain = COMPLIANCE_DOMAINS.find((d) => d.id === deadline.domain);
                  const isPast = date < new Date();
                  const isWithin30Days = !isPast && date.getTime() - Date.now() < 30 * 24 * 60 * 60 * 1000;

                  return (
                    <div
                      key={deadline.id}
                      className={`rounded-lg border border-l-4 ${SEVERITY_COLORS[deadline.severity]} ${
                        isPast
                          ? "border-stone-200 bg-stone-50 dark:border-stone-700 dark:bg-stone-800/50 opacity-60"
                          : isWithin30Days
                            ? "border-stone-200 bg-amber-50/50 dark:border-stone-700 dark:bg-amber-950/20"
                            : "border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-900"
                      } p-3`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Date */}
                        <div className="text-center shrink-0 w-10">
                          <div className="text-lg font-bold text-stone-800 dark:text-stone-200 leading-none">
                            {date.getDate()}
                          </div>
                          <div className="text-[9px] text-stone-400 uppercase">
                            {monthName.slice(0, 3)}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <SeverityIcon severity={deadline.severity} />
                            <p className={`text-sm font-medium ${
                              isPast
                                ? "text-stone-400 line-through"
                                : "text-stone-800 dark:text-stone-200"
                            }`}>
                              {t(deadline.title)}
                            </p>
                          </div>
                          {!compact && (
                            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                              {t(deadline.description)}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-1">
                            {domain && (
                              <Badge className={`${domain.color} ${domain.textColor} text-[9px]`}>
                                {t(domain.shortTitle)}
                              </Badge>
                            )}
                            {deadline.isRecurring && (
                              <span className="text-[10px] text-stone-400">
                                ↻ {isEs ? "Recurrente" : "Recurring"}
                              </span>
                            )}
                            {isWithin30Days && !isPast && (
                              <span className="text-[10px] font-medium text-amber-600 dark:text-amber-400">
                                ⏰ {isEs ? "Próximamente" : "Coming up"}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {deadlines.length === 0 && (
        <div className="py-8 text-center text-stone-400">
          <Calendar className="h-8 w-8 mx-auto mb-2" />
          <p className="text-sm">
            {isEs ? "No hay fechas límite para este filtro" : "No deadlines for this filter"}
          </p>
        </div>
      )}
    </div>
  );
}
