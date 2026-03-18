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
  // Optional media
  imageUrl?: string;
  imageAlt?: { en: string; es: string };
  imageCaption?: { en: string; es: string };
  imageCredit?: string;
  videoUrl?: string; // YouTube embed URL (https://www.youtube.com/embed/...)
  videoTitle?: { en: string; es: string };
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

/** Extract YouTube video ID from embed URL → return hqdefault thumbnail URL */
function getYouTubeThumbnail(embedUrl: string): string | null {
  const match = embedUrl.match(/youtube(?:-nocookie)?\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (!match) return null;
  return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
}

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
  const [thumbError, setThumbError] = useState(false);

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
      <div className="flex-1 pb-3">
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

          {/* Preview (collapsed) */}
          {!isExpanded && (
            <div className="mt-2">
              <p className="text-sm text-stone-600 line-clamp-2">
                {t(event.description, locale)}
              </p>

              {/* YouTube thumbnail — click expands the card */}
              {event.videoUrl && !thumbError && (() => {
                const thumb = getYouTubeThumbnail(event.videoUrl!);
                return thumb ? (
                  <div className="mt-2 relative rounded-lg overflow-hidden border border-stone-200 group/thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={thumb}
                      alt={event.videoTitle ? t(event.videoTitle, locale) : t(event.title, locale)}
                      className="w-full aspect-video object-cover"
                      loading="lazy"
                      onError={() => setThumbError(true)}
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-black/30 transition-colors flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md">
                        {/* Triangle play icon */}
                        <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-l-[10px] border-t-transparent border-b-transparent border-l-stone-800 ml-0.5" />
                      </div>
                    </div>
                    {/* Video title strip */}
                    {event.videoTitle && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1.5">
                        <p className="text-[10px] text-white font-medium line-clamp-1">
                          {t(event.videoTitle, locale)}
                        </p>
                      </div>
                    )}
                  </div>
                ) : null;
              })()}

              {/* Static image preview (no video) */}
              {!event.videoUrl && event.imageUrl && (
                <div className="mt-2 rounded-lg overflow-hidden border border-stone-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={event.imageUrl}
                    alt={event.imageAlt ? t(event.imageAlt, locale) : t(event.title, locale)}
                    className="w-full h-28 object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              {/* Source indicator */}
              <div className="flex items-center gap-1 mt-1.5">
                <ExternalLink className="size-2.5 text-stone-400" />
                <span className="text-[10px] text-stone-400">{event.primarySourceOrg}</span>
              </div>
            </div>
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

              {/* Image */}
              {event.imageUrl && (
                <div className="rounded-lg overflow-hidden border border-stone-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={event.imageUrl}
                    alt={event.imageAlt ? t(event.imageAlt, locale) : t(event.title, locale)}
                    className="w-full h-auto max-h-64 object-cover"
                    loading="lazy"
                  />
                  {(event.imageCaption || event.imageCredit) && (
                    <div className="bg-stone-50 px-3 py-1.5 text-[10px] text-stone-500">
                      {event.imageCaption && (
                        <span>{t(event.imageCaption, locale)}</span>
                      )}
                      {event.imageCredit && (
                        <span className="ml-1 italic">
                          {isEs ? "Crédito" : "Credit"}: {event.imageCredit}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* YouTube Video */}
              {event.videoUrl && (
                <div className="rounded-lg overflow-hidden border border-stone-200">
                  {event.videoTitle && (
                    <p className="bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-700">
                      🎬 {t(event.videoTitle, locale)}
                    </p>
                  )}
                  <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                      src={event.videoUrl}
                      title={event.videoTitle ? t(event.videoTitle, locale) : "Video"}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
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

  return (
    <div>
      {/* Eras */}
      <div className="space-y-4">
        {eras.map((era) => {
          const isOpen = expandedEras.has(era.id);
          const eraEvents = events
            .filter((e) => e.era === era.id)
            .sort((a, b) => a.year - b.year);

          if (eraEvents.length === 0) return null;

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
                      {isEs ? "No hay eventos en esta era." : "No events in this era."}
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
