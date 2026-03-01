// MovementTimeline — Vertical interactive FQHC movement history timeline
"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import {
  ChevronDown,
  ExternalLink,
  Heart,
  Landmark,
  Megaphone,
  Scale,
  Sprout,
  TrendingUp,
  AlertTriangle,
  Users,
  Handshake,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type MovementCategory =
  | "farmworker"
  | "civil-rights"
  | "legislation"
  | "founding"
  | "expansion"
  | "alliance"
  | "crisis"
  | "undocumented";

export interface TimelinePerson {
  name: string;
  role: { en: string; es: string };
  background?: string;
}

export interface TimelineEvent {
  id: string;
  year: number;
  endYear?: number;
  title: { en: string; es: string };
  description: { en: string; es: string };
  impact: { en: string; es: string };
  category: MovementCategory;
  people: TimelinePerson[];
  organizations: string[];
  location: string;
  primarySourceUrl: string;
  primarySourceOrg: string;
  era: string;
}

export interface TimelineEra {
  id: string;
  en: string;
  es: string;
  yearRange: string;
  description: { en: string; es: string };
}

/* ------------------------------------------------------------------ */
/*  Category metadata                                                  */
/* ------------------------------------------------------------------ */

const CATEGORY_META: Record<
  MovementCategory,
  { icon: LucideIcon; label: { en: string; es: string }; color: string; bgColor: string }
> = {
  farmworker: {
    icon: Sprout,
    label: { en: "Farmworker Health", es: "Salud del Campesino" },
    color: "text-green-700",
    bgColor: "bg-green-50 border-green-200",
  },
  "civil-rights": {
    icon: Megaphone,
    label: { en: "Civil Rights", es: "Derechos Civiles" },
    color: "text-purple-700",
    bgColor: "bg-purple-50 border-purple-200",
  },
  legislation: {
    icon: Scale,
    label: { en: "Legislation", es: "Legislación" },
    color: "text-blue-700",
    bgColor: "bg-blue-50 border-blue-200",
  },
  founding: {
    icon: Landmark,
    label: { en: "FQHC Founded", es: "FQHC Fundado" },
    color: "text-teal-700",
    bgColor: "bg-teal-50 border-teal-200",
  },
  expansion: {
    icon: TrendingUp,
    label: { en: "Expansion", es: "Expansión" },
    color: "text-emerald-700",
    bgColor: "bg-emerald-50 border-emerald-200",
  },
  alliance: {
    icon: Handshake,
    label: { en: "Alliance", es: "Alianza" },
    color: "text-amber-700",
    bgColor: "bg-amber-50 border-amber-200",
  },
  crisis: {
    icon: AlertTriangle,
    label: { en: "Crisis", es: "Crisis" },
    color: "text-red-700",
    bgColor: "bg-red-50 border-red-200",
  },
  undocumented: {
    icon: Heart,
    label: { en: "Undocumented Access", es: "Acceso para Indocumentados" },
    color: "text-rose-700",
    bgColor: "bg-rose-50 border-rose-200",
  },
};

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

/* ------------------------------------------------------------------ */
/*  Event Card                                                         */
/* ------------------------------------------------------------------ */

function EventCard({
  event,
  locale,
  isExpanded,
  onToggle,
}: {
  event: TimelineEvent;
  locale: string;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const isEs = locale === "es";
  const meta = CATEGORY_META[event.category];
  const Icon = meta.icon;

  return (
    <div className="relative flex gap-4">
      {/* Timeline dot and line */}
      <div className="flex flex-col items-center flex-shrink-0 w-12">
        <div
          className={`z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 bg-white ${meta.bgColor}`}
        >
          <Icon className={`size-4 ${meta.color}`} />
        </div>
        <div className="flex-1 w-px bg-stone-200 -mt-0" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <button
          onClick={onToggle}
          className={`w-full text-left rounded-xl border p-4 transition-all ${
            isExpanded
              ? `${meta.bgColor} shadow-sm`
              : "border-stone-200 bg-white hover:border-stone-300 hover:shadow-sm"
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-sm font-bold text-stone-900">
                  {event.year}{event.endYear ? `–${event.endYear}` : ""}
                </span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${meta.bgColor} ${meta.color}`}
                >
                  {t(meta.label, locale)}
                </span>
                {event.location && (
                  <span className="text-[10px] text-stone-400">
                    {event.location}
                  </span>
                )}
              </div>
              <h4 className="text-base font-bold text-stone-900 leading-snug">
                {t(event.title, locale)}
              </h4>
            </div>
            <ChevronDown
              className={`size-4 text-stone-400 flex-shrink-0 transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </div>

          {/* Preview */}
          {!isExpanded && (
            <p className="mt-2 text-sm text-stone-500 line-clamp-2">
              {t(event.description, locale)}
            </p>
          )}

          {/* Expanded content */}
          {isExpanded && (
            <div className="mt-3 space-y-3">
              <p className="text-sm text-stone-600 leading-relaxed">
                {t(event.description, locale)}
              </p>

              {/* Impact */}
              <div className="rounded-lg bg-white/70 border border-stone-200 p-3">
                <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
                  {isEs ? "Impacto" : "Impact"}
                </p>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {t(event.impact, locale)}
                </p>
              </div>

              {/* People */}
              {event.people.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                    {isEs ? "Personas Clave" : "Key People"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {event.people.map((person) => (
                      <div
                        key={person.name}
                        className="inline-flex items-center gap-2 rounded-lg bg-white border border-stone-200 px-3 py-1.5"
                      >
                        {/* Initials avatar */}
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-stone-100 text-[10px] font-bold text-stone-600">
                          {person.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <span className="text-xs font-medium text-stone-900 block leading-tight">
                            {person.name}
                          </span>
                          <span className="text-[10px] text-stone-500 block leading-tight">
                            {t(person.role, locale)}
                            {person.background && ` · ${person.background}`}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Organizations */}
              {event.organizations.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {event.organizations.map((org) => (
                    <span
                      key={org}
                      className="inline-block rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-medium text-stone-600"
                    >
                      {org}
                    </span>
                  ))}
                </div>
              )}

              {/* Source */}
              <a
                href={event.primarySourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-teal-700 hover:text-teal-900 hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {event.primarySourceOrg}
                <ExternalLink className="size-3" />
              </a>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MovementTimeline Component                                         */
/* ------------------------------------------------------------------ */

export function MovementTimeline({
  events,
  eras,
}: {
  events: TimelineEvent[];
  eras: TimelineEra[];
}) {
  const locale = useLocale();
  const isEs = locale === "es";
  const [expandedEras, setExpandedEras] = useState<Set<string>>(
    new Set(eras.slice(0, 2).map((e) => e.id)) // First 2 eras open by default
  );
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const toggleEra = (eraId: string) => {
    setExpandedEras((prev) => {
      const next = new Set(prev);
      if (next.has(eraId)) next.delete(eraId);
      else next.add(eraId);
      return next;
    });
  };

  const toggleEvent = (eventId: string) => {
    setExpandedEvents((prev) => {
      const next = new Set(prev);
      if (next.has(eventId)) next.delete(eventId);
      else next.add(eventId);
      return next;
    });
  };

  // Get unique categories from events
  const categories = Array.from(new Set(events.map((e) => e.category)));

  return (
    <div>
      {/* Category filter */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">
          {isEs ? "Filtrar" : "Filter"}:
        </span>
        <button
          onClick={() => setCategoryFilter("all")}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            categoryFilter === "all"
              ? "bg-stone-900 text-white"
              : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-100"
          }`}
        >
          {isEs ? "Todo" : "All"}
        </button>
        {categories.map((cat) => {
          const meta = CATEGORY_META[cat];
          return (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                categoryFilter === cat
                  ? "bg-stone-900 text-white"
                  : `bg-white ${meta.color} border border-stone-200 hover:bg-stone-100`
              }`}
            >
              {t(meta.label, locale)}
            </button>
          );
        })}
      </div>

      {/* Eras */}
      <div className="space-y-6">
        {eras.map((era) => {
          const isOpen = expandedEras.has(era.id);
          const eraEvents = events
            .filter((e) => e.era === era.id)
            .filter((e) => categoryFilter === "all" || e.category === categoryFilter)
            .sort((a, b) => a.year - b.year);

          if (categoryFilter !== "all" && eraEvents.length === 0) return null;

          return (
            <div key={era.id}>
              {/* Era header */}
              <button
                onClick={() => toggleEra(era.id)}
                className="w-full flex items-center gap-3 rounded-xl bg-gradient-to-r from-stone-100 to-stone-50 border border-stone-200 p-4 text-left hover:from-stone-200 hover:to-stone-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                      {era.yearRange}
                    </span>
                    <span className="text-xs text-stone-400">
                      ({eraEvents.length} {isEs ? "eventos" : "events"})
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-stone-900">
                    {isEs ? era.es : era.en}
                  </h3>
                  <p className="text-sm text-stone-500 mt-0.5">
                    {t(era.description, locale)}
                  </p>
                </div>
                <ChevronDown
                  className={`size-5 text-stone-400 flex-shrink-0 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Era events */}
              {isOpen && (
                <div className="mt-4 ml-2">
                  {eraEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      locale={locale}
                      isExpanded={expandedEvents.has(event.id)}
                      onToggle={() => toggleEvent(event.id)}
                    />
                  ))}
                  {eraEvents.length === 0 && (
                    <p className="text-sm text-stone-400 italic pl-16 py-4">
                      {isEs
                        ? "No hay eventos en esta era para el filtro seleccionado."
                        : "No events in this era for the selected filter."}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
