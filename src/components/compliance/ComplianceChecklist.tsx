// ComplianceChecklist.tsx — Interactive compliance checklist with progress tracking
"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Circle,
  Filter,
  Download,
  Clock,
  AlertTriangle,
  BookOpen,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import type {
  ComplianceDomain,
  ChecklistItem,
  ChecklistFrequency,
  ComplianceProgress,
} from "@/lib/compliance-data";
import {
  toggleChecklistItem,
  saveComplianceProgress,
  calculateDomainScore,
} from "@/lib/compliance-data";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface ComplianceChecklistProps {
  domain: ComplianceDomain;
  progress: ComplianceProgress;
  onProgressChange: (progress: ComplianceProgress) => void;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const FREQUENCY_LABELS: Record<ChecklistFrequency, { en: string; es: string; color: string }> = {
  daily: { en: "Daily", es: "Diario", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" },
  weekly: { en: "Weekly", es: "Semanal", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
  monthly: { en: "Monthly", es: "Mensual", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
  quarterly: { en: "Quarterly", es: "Trimestral", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300" },
  annual: { en: "Annual", es: "Anual", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ComplianceChecklist({
  domain,
  progress,
  onProgressChange,
}: ComplianceChecklistProps) {
  const locale = useLocale();
  const isEs = locale === "es";
  const t = (obj: { en: string; es: string }) => (isEs ? obj.es : obj.en);

  const [filterFrequency, setFilterFrequency] = useState<ChecklistFrequency | "all">("all");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [showCompleted, setShowCompleted] = useState(true);

  const score = useMemo(() => calculateDomainScore(domain, progress), [domain, progress]);

  const filteredItems = useMemo(() => {
    let items = domain.checklistItems;
    if (filterFrequency !== "all") {
      items = items.filter((item) => item.frequency === filterFrequency);
    }
    if (!showCompleted) {
      items = items.filter((item) => !progress.completedItems[item.id]);
    }
    return items;
  }, [domain.checklistItems, filterFrequency, showCompleted, progress]);

  // Group by frequency
  const groupedItems = useMemo(() => {
    const groups: Record<string, ChecklistItem[]> = {};
    for (const item of filteredItems) {
      if (!groups[item.frequency]) groups[item.frequency] = [];
      groups[item.frequency].push(item);
    }
    return groups;
  }, [filteredItems]);

  const handleToggle = useCallback(
    (itemId: string) => {
      const updated = toggleChecklistItem(progress, itemId);
      saveComplianceProgress(updated);
      onProgressChange(updated);
    },
    [progress, onProgressChange],
  );

  const toggleExpand = useCallback((itemId: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  }, []);

  const frequencyOrder: ChecklistFrequency[] = ["daily", "weekly", "monthly", "quarterly", "annual"];

  return (
    <div>
      {/* Domain header + score */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200">
            {t(domain.title)}
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {filteredItems.length} {isEs ? "elementos" : "items"} · {domain.checklistItems.filter((i) => progress.completedItems[i.id]).length} {isEs ? "completados" : "completed"}
          </p>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${
            score >= 80 ? "text-green-600 dark:text-green-400"
              : score >= 50 ? "text-amber-600 dark:text-amber-400"
                : "text-red-600 dark:text-red-400"
          }`}>
            {score}%
          </div>
          <p className="text-[10px] text-stone-400">
            {isEs ? "cumplimiento" : "compliance"}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden mb-4">
        <div
          className={`h-full rounded-full transition-all ${
            score >= 80 ? "bg-green-500"
              : score >= 50 ? "bg-amber-500"
                : "bg-red-500"
          }`}
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap mb-4">
        <Filter className="h-3.5 w-3.5 text-stone-400" />
        {(["all", ...frequencyOrder] as const).map((freq) => (
          <button
            key={freq}
            onClick={() => setFilterFrequency(freq)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
              filterFrequency === freq
                ? "bg-stone-800 text-white dark:bg-stone-200 dark:text-stone-900"
                : "bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400 hover:bg-stone-200"
            }`}
          >
            {freq === "all"
              ? (isEs ? "Todos" : "All")
              : t(FREQUENCY_LABELS[freq])}
          </button>
        ))}
        <button
          onClick={() => setShowCompleted(!showCompleted)}
          className={`ml-auto rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
            showCompleted
              ? "bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400"
              : "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
          }`}
        >
          {showCompleted
            ? (isEs ? "Ocultar completados" : "Hide completed")
            : (isEs ? "Mostrar todos" : "Show all")}
        </button>
      </div>

      {/* Checklist items grouped by frequency */}
      <div className="space-y-6">
        {frequencyOrder.map((freq) => {
          const items = groupedItems[freq];
          if (!items || items.length === 0) return null;

          return (
            <div key={freq}>
              <div className="flex items-center gap-2 mb-2">
                <Badge className={FREQUENCY_LABELS[freq].color}>
                  <Clock className="h-2.5 w-2.5 mr-1" />
                  {t(FREQUENCY_LABELS[freq])}
                </Badge>
                <span className="text-xs text-stone-400">
                  ({items.filter((i) => progress.completedItems[i.id]).length}/{items.length})
                </span>
              </div>

              <div className="space-y-1">
                {items.map((item) => {
                  const isComplete = !!progress.completedItems[item.id];
                  const isExpanded = expandedItems.has(item.id);

                  return (
                    <div
                      key={item.id}
                      className={`rounded-lg border transition-all ${
                        isComplete
                          ? "border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/20"
                          : "border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-900"
                      }`}
                    >
                      <div className="flex items-start gap-3 p-3">
                        {/* Checkbox */}
                        <button
                          onClick={() => handleToggle(item.id)}
                          className="mt-0.5 shrink-0"
                        >
                          {isComplete ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <Circle className="h-5 w-5 text-stone-300 dark:text-stone-600 hover:text-teal-500 transition-colors" />
                          )}
                        </button>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <button
                            onClick={() => toggleExpand(item.id)}
                            className="flex items-start gap-1 text-left w-full"
                          >
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium leading-snug ${
                                isComplete
                                  ? "text-stone-500 dark:text-stone-500 line-through"
                                  : "text-stone-800 dark:text-stone-200"
                              }`}>
                                {t(item.title)}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                {item.required && (
                                  <span className="text-[10px] font-medium text-red-500">
                                    {isEs ? "REQUERIDO" : "REQUIRED"}
                                  </span>
                                )}
                                {item.sourceRegulation && (
                                  <span className="text-[10px] text-stone-400">
                                    {item.sourceRegulation}
                                  </span>
                                )}
                              </div>
                            </div>
                            {isExpanded ? (
                              <ChevronDown className="h-4 w-4 text-stone-400 shrink-0 mt-0.5" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-stone-400 shrink-0 mt-0.5" />
                            )}
                          </button>

                          {/* Expanded details */}
                          {isExpanded && (
                            <div className="mt-2 text-xs text-stone-500 dark:text-stone-400 leading-relaxed border-t border-stone-100 dark:border-stone-800 pt-2">
                              {t(item.description)}
                              {isComplete && progress.completedItems[item.id] && (
                                <p className="mt-2 text-green-600 dark:text-green-400">
                                  ✓ {isEs ? "Completado" : "Completed"}: {new Date(progress.completedItems[item.id]).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          )}
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

      {filteredItems.length === 0 && (
        <div className="py-8 text-center text-stone-400">
          <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-green-400" />
          <p className="text-sm">
            {isEs ? "¡Todos los elementos están completos!" : "All items are complete!"}
          </p>
        </div>
      )}
    </div>
  );
}
