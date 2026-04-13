// ThreatTimeline — Horizontal scrollable funding cliff timeline
"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import {
  AlertTriangle,
  Calendar,
  DollarSign,
  Users,
  ChevronRight,
  X,
} from "lucide-react";
import { t } from "@/lib/i18n-helpers";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface TimelineEvent {
  id: string;
  date: string;
  title: { en: string; es: string };
  description?: { en: string; es: string };
  daysUntil: number;
  dollarAmount: string | null;
  peopleAffected: string | null;
  category: "federal" | "state" | "local";
  isPast: boolean;
  sourceUrl?: string;
  sourceOrg?: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */


function getUrgencyColor(daysUntil: number, isPast: boolean) {
  if (isPast) return { bg: "bg-stone-100", border: "border-stone-300", text: "text-stone-500", dot: "bg-stone-400" };
  if (daysUntil <= 90) return { bg: "bg-red-50", border: "border-red-300", text: "text-red-700", dot: "bg-red-500" };
  if (daysUntil <= 180) return { bg: "bg-amber-50", border: "border-amber-300", text: "text-amber-700", dot: "bg-amber-500" };
  return { bg: "bg-teal-50", border: "border-teal-300", text: "text-teal-700", dot: "bg-teal-500" };
}

function getUrgencyLabel(daysUntil: number, isPast: boolean, isEs: boolean) {
  if (isPast) return isEs ? "Pasado" : "Past";
  if (daysUntil <= 90) return isEs ? "Critico" : "Critical";
  if (daysUntil <= 180) return isEs ? "Urgente" : "Urgent";
  return isEs ? "En seguimiento" : "Tracking";
}

const categoryLabels: Record<string, { en: string; es: string }> = {
  federal: { en: "Federal", es: "Federal" },
  state: { en: "State", es: "Estatal" },
  local: { en: "Local", es: "Local" },
};

/* ------------------------------------------------------------------ */
/*  ThreatTimeline Component                                           */
/* ------------------------------------------------------------------ */

export function ThreatTimeline({
  events,
  title,
}: {
  events: TimelineEvent[];
  title?: { en: string; es: string };
}) {
  const locale = useLocale();
  const isEs = locale === "es";
  const [selected, setSelected] = useState<string | null>(null);

  // Sort: upcoming first (by daysUntil asc), past events at end
  const sorted = [...events].sort((a, b) => {
    if (a.isPast && !b.isPast) return 1;
    if (!a.isPast && b.isPast) return -1;
    return a.daysUntil - b.daysUntil;
  });

  const selectedEvent = sorted.find((e) => e.id === selected);

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-bold text-stone-900 mb-4">
          {t(title, locale)}
        </h3>
      )}

      {/* Horizontal scrollable timeline */}
      <div className="relative">
        {/* Timeline track */}
        <div className="overflow-x-auto pb-4 scrollbar-thin">
          <div className="flex items-start gap-4 min-w-max px-2 pt-2">
            {sorted.map((event) => {
              const colors = getUrgencyColor(event.daysUntil, event.isPast);
              const isActive = selected === event.id;

              return (
                <button
                  key={event.id}
                  onClick={() => setSelected(isActive ? null : event.id)}
                  className={`
                    relative flex-shrink-0 w-48 rounded-xl border-2 p-4 text-left transition-all
                    ${isActive ? `${colors.bg} ${colors.border} shadow-md -translate-y-1` : `bg-white border-stone-200 hover:${colors.bg} hover:${colors.border} hover:-translate-y-0.5 hover:shadow-sm`}
                  `}
                >
                  {/* Urgency dot */}
                  <div className="flex items-center justify-between mb-2">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold uppercase tracking-wider ${colors.bg} ${colors.text}`}>
                      <span className={`size-1.5 rounded-full ${colors.dot}`} />
                      {getUrgencyLabel(event.daysUntil, event.isPast, isEs)}
                    </span>
                    <span className="text-xs font-medium text-stone-500 uppercase">
                      {t(categoryLabels[event.category], locale)}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-1 mb-1.5">
                    <Calendar className="size-3 text-stone-500" />
                    <span className="text-xs text-stone-500">{event.date}</span>
                  </div>

                  {/* Title */}
                  <p className="text-sm font-semibold text-stone-900 leading-snug mb-2 line-clamp-2">
                    {t(event.title, locale)}
                  </p>

                  {/* Key metrics */}
                  <div className="space-y-1">
                    {event.dollarAmount && (
                      <div className="flex items-center gap-1">
                        <DollarSign className="size-3 text-stone-500" />
                        <span className="text-xs font-medium text-stone-600">{event.dollarAmount}</span>
                      </div>
                    )}
                    {event.peopleAffected && (
                      <div className="flex items-center gap-1">
                        <Users className="size-3 text-stone-500" />
                        <span className="text-xs font-medium text-stone-600">{event.peopleAffected}</span>
                      </div>
                    )}
                  </div>

                  {/* Days countdown */}
                  {!event.isPast && (
                    <div className={`mt-2 pt-2 border-t border-stone-100 text-center`}>
                      <span className={`text-lg font-bold ${colors.text}`}>
                        {event.daysUntil}
                      </span>
                      <span className="text-xs text-stone-500 block">
                        {isEs ? "dias" : "days"}
                      </span>
                    </div>
                  )}

                  {/* Expand indicator */}
                  <div className="absolute bottom-2 right-2">
                    <ChevronRight className={`size-3.5 text-stone-300 transition-transform ${isActive ? "rotate-90" : ""}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Connection line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-stone-200 -z-10" />
      </div>

      {/* Expanded detail panel */}
      {selectedEvent && (
        <div className={`mt-4 rounded-xl border ${getUrgencyColor(selectedEvent.daysUntil, selectedEvent.isPast).border} ${getUrgencyColor(selectedEvent.daysUntil, selectedEvent.isPast).bg} p-5 transition-all`}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className={`size-4 ${getUrgencyColor(selectedEvent.daysUntil, selectedEvent.isPast).text}`} />
                <h4 className="font-bold text-stone-900">
                  {t(selectedEvent.title, locale)}
                </h4>
              </div>

              {selectedEvent.description && (
                <p className="text-sm text-stone-600 leading-relaxed mb-3">
                  {t(selectedEvent.description, locale)}
                </p>
              )}

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <Calendar className="size-3.5 text-stone-500" />
                  <span className="text-stone-600">{selectedEvent.date}</span>
                </div>
                {selectedEvent.dollarAmount && (
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="size-3.5 text-stone-500" />
                    <span className="font-medium text-stone-700">{selectedEvent.dollarAmount}</span>
                  </div>
                )}
                {selectedEvent.peopleAffected && (
                  <div className="flex items-center gap-1.5">
                    <Users className="size-3.5 text-stone-500" />
                    <span className="font-medium text-stone-700">{selectedEvent.peopleAffected}</span>
                  </div>
                )}
              </div>

              {selectedEvent.sourceUrl && (
                <a
                  href={selectedEvent.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-3 text-xs text-teal-700 hover:text-teal-900 hover:underline"
                >
                  {selectedEvent.sourceOrg || (isEs ? "Fuente" : "Source")} →
                </a>
              )}
            </div>

            <button
              onClick={() => setSelected(null)}
              className="rounded-md p-1 text-stone-500 hover:text-stone-600 hover:bg-stone-200/50 transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
