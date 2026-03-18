// FQHC Academic Research Archive — Foundations of community health research
"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Filter,
  GraduationCap,
  Search,
  Users,
  Library,
  Award,
  Calendar,
} from "lucide-react";
import {
  RESEARCH_ENTRIES,
  RESEARCH_ARCHIVE_LAST_UPDATED,
  RESEARCH_DOMAINS,
  AUDIENCE_TRACKS,
  LEVEL_META,
  TYPE_META,
  CURRICULUM_TRACKS,
  KEY_RESEARCHERS,
  KEY_JOURNALS,
  KEY_INSTITUTIONS,
  type ResearchDomain,
  type AudienceTrack,
  type ResearchLevel,
  type ResearchEntry,
} from "@/lib/fqhc-research-archive";
import { SYLLABUS_TRACKS } from "@/lib/research-syllabus-content";
import { SyllabusReader } from "@/components/research/SyllabusReader";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

/* ------------------------------------------------------------------ */
/*  Research Entry Card                                                */
/* ------------------------------------------------------------------ */

function EntryCard({
  entry,
  locale,
  isExpanded,
  onToggle,
}: {
  entry: ResearchEntry;
  locale: string;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const domain = RESEARCH_DOMAINS.find((d) => d.id === entry.domain);
  const level = LEVEL_META.find((l) => l.id === entry.level);
  const typeMeta = TYPE_META.find((tm) => tm.id === entry.type);

  return (
    <div className="rounded-xl border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-stone-700 dark:bg-stone-800">
      <button
        onClick={onToggle}
        className="w-full text-left p-5 flex items-start justify-between gap-3"
      >
        <div className="flex-1 min-w-0">
          {/* Badges row */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {domain && (
              <span className={`text-xs px-2 py-0.5 rounded-full border ${domain.color}`}>
                {t(domain, locale)}
              </span>
            )}
            {level && (
              <span className={`text-xs px-2 py-0.5 rounded-full border ${level.color}`}>
                {t(level, locale)}
              </span>
            )}
            {typeMeta && (
              <span className="text-xs px-2 py-0.5 rounded-full border bg-stone-50 text-stone-600 border-stone-200 dark:bg-stone-700 dark:text-stone-300 dark:border-stone-600">
                {t(typeMeta, locale)}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-sm sm:text-base leading-snug">
            {t(entry.title, locale)}
          </h3>

          {/* Authors + year */}
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            {entry.authors} ({entry.year})
            {entry.journal && <> &middot; <em>{entry.journal}</em></>}
          </p>
        </div>

        <span className="shrink-0 mt-1 text-stone-400">
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </span>
      </button>

      {isExpanded && (
        <div className="px-5 pb-5 border-t border-stone-100 dark:border-stone-700 pt-4 space-y-4">
          {/* Description */}
          <div>
            <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              {t(entry.description, locale)}
            </p>
          </div>

          {/* Why it matters */}
          <div className="bg-teal-50 dark:bg-teal-900/30 rounded-lg p-3">
            <p className="text-xs font-semibold text-teal-800 dark:text-teal-300 mb-1">
              {locale === "es" ? "¿Por qué importa para FQHCs?" : "Why It Matters for FQHCs"}
            </p>
            <p className="text-sm text-teal-700 dark:text-teal-400 leading-relaxed">
              {t(entry.whyItMatters, locale)}
            </p>
          </div>

          {/* Audience */}
          <div className="flex flex-wrap gap-1.5">
            {entry.audience.map((a) => {
              const meta = AUDIENCE_TRACKS.find((at) => at.id === a);
              return meta ? (
                <span
                  key={a}
                  className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700"
                >
                  {t(meta, locale)}
                </span>
              ) : null;
            })}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 text-stone-500 dark:bg-stone-700 dark:text-stone-400"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Source link */}
          <a
            href={entry.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-teal-700 hover:text-teal-900 dark:text-teal-400 dark:hover:text-teal-300 font-medium"
          >
            {locale === "es" ? "Ver fuente original" : "View original source"}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

export default function ResearchArchivePage() {
  const locale = useLocale();
  const isEs = locale === "es";

  // Filters
  const [domainFilter, setDomainFilter] = useState<ResearchDomain | "all">("all");
  const [audienceFilter, setAudienceFilter] = useState<AudienceTrack | "all">("all");
  const [levelFilter, setLevelFilter] = useState<ResearchLevel | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<"archive" | "curriculum" | "researchers">("archive");

  const toggleEntry = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  };

  // Filtered entries
  const filteredEntries = useMemo(() => {
    let entries = RESEARCH_ENTRIES;
    if (domainFilter !== "all") entries = entries.filter((e) => e.domain === domainFilter);
    if (audienceFilter !== "all")
      entries = entries.filter((e) => e.audience.includes(audienceFilter) || e.audience.includes("all"));
    if (levelFilter !== "all") entries = entries.filter((e) => e.level === levelFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      entries = entries.filter(
        (e) =>
          e.title.en.toLowerCase().includes(q) ||
          e.title.es.toLowerCase().includes(q) ||
          e.authors.toLowerCase().includes(q) ||
          e.description.en.toLowerCase().includes(q) ||
          e.tags.some((t) => t.includes(q))
      );
    }
    return entries;
  }, [domainFilter, audienceFilter, levelFilter, searchQuery]);

  // Stats
  const domainCounts = useMemo(() => {
    const counts = new Map<string, number>();
    RESEARCH_ENTRIES.forEach((e) => counts.set(e.domain, (counts.get(e.domain) || 0) + 1));
    return counts;
  }, []);

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* ── Hero ────────────────────────────────── */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Library className="h-12 w-12 text-amber-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            {isEs
              ? "Archivo de Investigación Académica"
              : "Academic Research Archive"}
          </h1>
          <p className="text-lg text-stone-300 max-w-3xl mx-auto mb-4">
            {isEs
              ? "Fundamentos y evolución de la investigación en atención primaria, salud comunitaria y salud pública — curada para clínicos, no clínicos y líderes de FQHCs."
              : "Foundations and evolution of primary care, community health, and public health research — curated for clinicians, non-clinicians, and FQHC leaders."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-stone-400">
            <span className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {RESEARCH_ENTRIES.length} {isEs ? "recursos" : "resources"}
            </span>
            <span className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              {RESEARCH_DOMAINS.length} {isEs ? "dominios" : "domains"}
            </span>
            <span className="flex items-center gap-1">
              <GraduationCap className="h-4 w-4" />
              {CURRICULUM_TRACKS.length} {isEs ? "currículos" : "curriculum tracks"}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {isEs ? "Actualizado" : "Updated"} {RESEARCH_ARCHIVE_LAST_UPDATED}
            </span>
          </div>
        </div>
      </section>

      {/* ── Tabs ────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <div className="flex gap-1 border-b border-stone-200 dark:border-stone-700">
          {(
            [
              { id: "archive" as const, en: "Research Archive", es: "Archivo de Investigación", icon: BookOpen },
              { id: "curriculum" as const, en: "Curriculum Tracks", es: "Currículos", icon: GraduationCap },
              { id: "researchers" as const, en: "Researchers & Journals", es: "Investigadores y Revistas", icon: Award },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-teal-600 text-teal-700 dark:text-teal-400 dark:border-teal-400"
                  : "border-transparent text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-300"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{isEs ? tab.es : tab.en}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* ── Archive Tab ──────────────────────────── */}
        {activeTab === "archive" && (
          <>
            {/* Search + filters */}
            <div className="space-y-4 mb-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isEs ? "Buscar por título, autor o tema..." : "Search by title, author, or topic..."}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-stone-200 bg-white text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-stone-800 dark:border-stone-700 dark:text-stone-200"
                />
              </div>

              {/* Filter pills */}
              <div className="flex flex-wrap gap-4">
                {/* Domain filter */}
                <select
                  value={domainFilter}
                  onChange={(e) => setDomainFilter(e.target.value as ResearchDomain | "all")}
                  className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 dark:bg-stone-800 dark:border-stone-700 dark:text-stone-200"
                >
                  <option value="all">{isEs ? "Todos los dominios" : "All Domains"}</option>
                  {RESEARCH_DOMAINS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {t(d, locale)} ({domainCounts.get(d.id) || 0})
                    </option>
                  ))}
                </select>

                {/* Audience filter */}
                <select
                  value={audienceFilter}
                  onChange={(e) => setAudienceFilter(e.target.value as AudienceTrack | "all")}
                  className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 dark:bg-stone-800 dark:border-stone-700 dark:text-stone-200"
                >
                  <option value="all">{isEs ? "Todas las audiencias" : "All Audiences"}</option>
                  {AUDIENCE_TRACKS.map((a) => (
                    <option key={a.id} value={a.id}>
                      {t(a, locale)}
                    </option>
                  ))}
                </select>

                {/* Level filter */}
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value as ResearchLevel | "all")}
                  className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 dark:bg-stone-800 dark:border-stone-700 dark:text-stone-200"
                >
                  <option value="all">{isEs ? "Todos los niveles" : "All Levels"}</option>
                  {LEVEL_META.map((l) => (
                    <option key={l.id} value={l.id}>
                      {t(l, locale)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Results count */}
              <p className="text-sm text-stone-500 dark:text-stone-400">
                {filteredEntries.length} of {RESEARCH_ENTRIES.length}{" "}
                {isEs ? "recursos" : "resources"}
                {(domainFilter !== "all" || audienceFilter !== "all" || levelFilter !== "all" || searchQuery) && (
                  <button
                    onClick={() => {
                      setDomainFilter("all");
                      setAudienceFilter("all");
                      setLevelFilter("all");
                      setSearchQuery("");
                    }}
                    className="ml-2 text-teal-600 hover:text-teal-800 dark:text-teal-400 underline"
                  >
                    {isEs ? "Limpiar filtros" : "Clear filters"}
                  </button>
                )}
              </p>
            </div>

            {/* Entries */}
            <div className="space-y-3">
              {filteredEntries.map((entry) => (
                <EntryCard
                  key={entry.id}
                  entry={entry}
                  locale={locale}
                  isExpanded={expandedIds.has(entry.id)}
                  onToggle={() => toggleEntry(entry.id)}
                />
              ))}
              {filteredEntries.length === 0 && (
                <p className="text-center text-stone-500 py-12">
                  {isEs
                    ? "No se encontraron recursos con estos filtros."
                    : "No resources found with these filters."}
                </p>
              )}
            </div>
          </>
        )}

        {/* ── Curriculum Tab ───────────────────────── */}
        {activeTab === "curriculum" && (
          <div>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-700 p-5 mb-6">
              <h2 className="text-lg font-bold text-amber-900 dark:text-amber-200 mb-2">
                {isEs ? "Currículos Guiados con Instructor Experto" : "Expert-Guided Curriculum Tracks"}
              </h2>
              <p className="text-sm text-amber-700 dark:text-amber-400">
                {isEs
                  ? "Rutas de aprendizaje interactivas con narrativas expertas, citas directas atribuidas, ideas clave y transiciones entre lecciones. Progresa a través de 3 niveles — tu avance se guarda automáticamente."
                  : "Interactive learning paths with expert narratives, attributed direct quotes, key insights, and lesson-to-lesson transitions. Progress through 3 levels — your progress is saved automatically."}
              </p>
            </div>

            <SyllabusReader tracks={SYLLABUS_TRACKS} />
          </div>
        )}

        {/* ── Researchers & Journals Tab ────────────── */}
        {activeTab === "researchers" && (
          <div className="space-y-8">
            {/* Key Researchers */}
            <section>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-teal-600" />
                {isEs ? "Investigadores Clave" : "Key Researchers"}
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {KEY_RESEARCHERS.map((r) => (
                  <a
                    key={r.name}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-stone-200 bg-white p-4 hover:shadow-md transition-shadow dark:border-stone-700 dark:bg-stone-800"
                  >
                    <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                      {r.name}
                    </h3>
                    <p className="text-xs text-teal-600 dark:text-teal-400 mt-0.5">{r.institution}</p>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                      {t(r.focus, locale)}
                    </p>
                  </a>
                ))}
              </div>
            </section>

            {/* Key Journals */}
            <section>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-teal-600" />
                {isEs ? "Revistas Clave" : "Key Journals"}
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {KEY_JOURNALS.map((j) => (
                  <a
                    key={j.name}
                    href={j.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-stone-200 bg-white p-4 hover:shadow-md transition-shadow dark:border-stone-700 dark:bg-stone-800"
                  >
                    <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                      {j.name}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                      {t(j.focus, locale)}
                    </p>
                  </a>
                ))}
              </div>
            </section>

            {/* Key Institutions */}
            <section>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-teal-600" />
                {isEs ? "Instituciones Clave" : "Key Institutions"}
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {KEY_INSTITUTIONS.map((inst) => (
                  <a
                    key={inst.name}
                    href={inst.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-stone-200 bg-white p-4 hover:shadow-md transition-shadow dark:border-stone-700 dark:bg-stone-800"
                  >
                    <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                      {inst.name}
                    </h3>
                    <p className="text-xs text-teal-600 dark:text-teal-400 mt-0.5">{inst.type}</p>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                      {t(inst.focus, locale)}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ── Cross-nav ────────────────────────────── */}
        <div className="mt-12 grid sm:grid-cols-3 gap-4">
          <Link
            href="/strategy/masterclass"
            className="rounded-xl border border-stone-200 bg-white p-5 hover:shadow-md transition-shadow text-center dark:border-stone-700 dark:bg-stone-800"
          >
            <GraduationCap className="h-6 w-6 text-teal-600 mx-auto mb-2" />
            <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
              {isEs ? "Masterclass Ejecutiva" : "Executive Masterclass"}
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              {isEs ? "15 módulos estratégicos" : "15 strategy modules"}
            </p>
          </Link>
          <Link
            href="/strategy/guides"
            className="rounded-xl border border-stone-200 bg-white p-5 hover:shadow-md transition-shadow text-center dark:border-stone-700 dark:bg-stone-800"
          >
            <BookOpen className="h-6 w-6 text-teal-600 mx-auto mb-2" />
            <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
              {isEs ? "Guías Ejecutivas" : "Executive Guides"}
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              {isEs ? "Estudios de caso reales" : "Real case studies"}
            </p>
          </Link>
          <Link
            href="/resources"
            className="rounded-xl border border-stone-200 bg-white p-5 hover:shadow-md transition-shadow text-center dark:border-stone-700 dark:bg-stone-800"
          >
            <Library className="h-6 w-6 text-teal-600 mx-auto mb-2" />
            <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
              {isEs ? "Recursos de Carrera" : "Career Resources"}
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              {isEs ? "Programas y becas" : "Programs & scholarships"}
            </p>
          </Link>
        </div>

        {/* Newsletter */}
        <div className="mt-12">
          <NewsletterSignup variant="card" defaultAudience="intel-brief" />
        </div>
      </div>
    </main>
  );
}
