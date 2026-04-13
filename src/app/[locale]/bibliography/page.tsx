"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Search,
  ExternalLink,
  BookOpen,
  Users,
  GraduationCap,
  Shield,
  TrendingUp,
  DollarSign,
  Landmark,
  Newspaper,
  BarChart3,
  Radio,
  Building2,
  Hash,
  ChevronDown,
  ChevronUp,
  Library,
  ArrowLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  BIBLIOGRAPHY_SECTIONS,
  BIBLIOGRAPHY_ENTRIES,
  type BibliographyCategory,
  type ResourceType,
} from "@/lib/bibliography-data";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/design-system";

// Map icon strings to Lucide components
const ICON_MAP: Record<string, typeof BookOpen> = {
  GraduationCap,
  Users,
  Shield,
  TrendingUp,
  DollarSign,
  Landmark,
  Newspaper,
  BarChart3,
  Radio,
  Building2,
  Hash,
  BookOpen,
  Library,
};

const TYPE_COLORS: Record<ResourceType, string> = {
  program: "bg-blue-50 text-blue-700 border-blue-200",
  researcher: "bg-purple-50 text-purple-700 border-purple-200",
  report: "bg-amber-50 text-amber-700 border-amber-200",
  tool: "bg-teal-50 text-teal-700 border-teal-200",
  podcast: "bg-rose-50 text-rose-700 border-rose-200",
  dataset: "bg-indigo-50 text-indigo-700 border-indigo-200",
  government: "bg-stone-50 text-stone-700 border-stone-200",
  article: "bg-green-50 text-green-700 border-green-200",
  book: "bg-orange-50 text-orange-700 border-orange-200",
  organization: "bg-cyan-50 text-cyan-700 border-cyan-200",
};

const TYPE_LABELS: Record<ResourceType, { en: string; es: string }> = {
  program: { en: "Program", es: "Programa" },
  researcher: { en: "Researcher", es: "Investigador" },
  report: { en: "Report", es: "Informe" },
  tool: { en: "Tool", es: "Herramienta" },
  podcast: { en: "Podcast", es: "Podcast" },
  dataset: { en: "Dataset", es: "Datos" },
  government: { en: "Government", es: "Gobierno" },
  article: { en: "Article", es: "Articulo" },
  book: { en: "Book", es: "Libro" },
  organization: { en: "Organization", es: "Organizacion" },
};

export default function BibliographyPage() {
  const locale = useLocale();
  const isEs = locale === "es";
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    BibliographyCategory | "all"
  >("all");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(BIBLIOGRAPHY_SECTIONS.map((s) => s.id))
  );

  const filteredEntries = useMemo(() => {
    return BIBLIOGRAPHY_ENTRIES.filter((entry) => {
      const matchesCategory =
        selectedCategory === "all" || entry.category === selectedCategory;
      const matchesSearch =
        !search ||
        entry.title.toLowerCase().includes(search.toLowerCase()) ||
        (entry.author?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
        (entry.organization?.toLowerCase().includes(search.toLowerCase()) ??
          false) ||
        entry.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Group filtered entries by category
  const groupedEntries = useMemo(() => {
    const groups = new Map<BibliographyCategory, typeof filteredEntries>();
    for (const entry of filteredEntries) {
      const list = groups.get(entry.category) ?? [];
      list.push(entry);
      groups.set(entry.category, list);
    }
    return groups;
  }, [filteredEntries]);

  return (
    <main className="min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.fqhctalent.com" },
          {
            name: "Bibliography",
            url: "https://www.fqhctalent.com/bibliography",
          },
        ]}
      />

      <PageHero
        title={{ en: "FQHC Bibliography", es: "Bibliografía FQHC" }}
        subtitle={{
          en: "Curated reference library for community health center executives, researchers, and professionals.",
          es: "Biblioteca de referencia curada para ejecutivos, investigadores y profesionales de centros de salud comunitarios.",
        }}
        meta={isEs ? "212+ Recursos · Última actualización: 1 de marzo de 2026" : "212+ Resources · Last updated: March 1, 2026"}
      />

      {/* Search & Filters */}
      <section className="py-6 px-6 border-b border-stone-100 sticky top-0 bg-white/95 backdrop-blur-sm z-30">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500" />
              <input
                type="text"
                placeholder={
                  isEs
                    ? "Buscar por titulo, autor u organizacion..."
                    : "Search by title, author, or organization..."
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-colors"
              />
            </div>

            {/* Result count */}
            <div className="flex items-center text-sm text-stone-500 whitespace-nowrap">
              {filteredEntries.length}{" "}
              {isEs
                ? filteredEntries.length === 1
                  ? "recurso"
                  : "recursos"
                : filteredEntries.length === 1
                  ? "resource"
                  : "resources"}
            </div>
          </div>

          {/* Category pills — scrollable on mobile */}
          <div className="flex gap-2 overflow-x-auto mt-4 pb-1 -mb-1 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`shrink-0 px-3 py-1.5 text-xs rounded-full border transition-colors ${
                selectedCategory === "all"
                  ? "bg-teal-600 text-white border-teal-600"
                  : "bg-white text-stone-600 border-stone-200 hover:border-teal-300"
              }`}
            >
              {isEs ? "Todos" : "All"} ({BIBLIOGRAPHY_ENTRIES.length})
            </button>
            {BIBLIOGRAPHY_SECTIONS.map((section) => {
              const count = BIBLIOGRAPHY_ENTRIES.filter(
                (e) => e.category === section.id
              ).length;
              return (
                <button
                  key={section.id}
                  onClick={() => setSelectedCategory(section.id)}
                  className={`shrink-0 px-3 py-1.5 text-xs rounded-full border transition-colors ${
                    selectedCategory === section.id
                      ? "bg-teal-600 text-white border-teal-600"
                      : "bg-white text-stone-600 border-stone-200 hover:border-teal-300"
                  }`}
                >
                  {isEs ? section.esTitle : section.title} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Entries grouped by section */}
      <section className="py-10 px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-stone-500 text-lg">
                {isEs
                  ? "No se encontraron recursos."
                  : "No resources found."}
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("all");
                }}
                className="mt-3 text-teal-600 hover:text-teal-700 text-sm font-medium"
              >
                {isEs ? "Limpiar filtros" : "Clear filters"}
              </button>
            </div>
          ) : (
            BIBLIOGRAPHY_SECTIONS.filter((section) =>
              groupedEntries.has(section.id)
            ).map((section) => {
              const entries = groupedEntries.get(section.id) ?? [];
              const isExpanded = expandedSections.has(section.id);
              const IconComponent =
                ICON_MAP[section.icon] ?? BookOpen;

              return (
                <div
                  key={section.id}
                  className="border border-stone-200 rounded-xl overflow-hidden"
                >
                  {/* Section header */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-5 bg-stone-50 hover:bg-stone-100 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-teal-50 text-teal-600">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-stone-900">
                          {isEs ? section.esTitle : section.title}
                        </h2>
                        <p className="text-sm text-stone-500">
                          {entries.length}{" "}
                          {isEs
                            ? entries.length === 1
                              ? "recurso"
                              : "recursos"
                            : entries.length === 1
                              ? "resource"
                              : "resources"}
                        </p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-stone-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-stone-500" />
                    )}
                  </button>

                  {/* Section entries */}
                  {isExpanded && (
                    <div className="divide-y divide-stone-100">
                      {entries.map((entry) => (
                        <div
                          key={entry.id}
                          className="p-4 hover:bg-stone-50/50 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <Badge
                                  variant="outline"
                                  className={`text-xs px-1.5 py-0 ${TYPE_COLORS[entry.type]}`}
                                >
                                  {isEs
                                    ? TYPE_LABELS[entry.type].es
                                    : TYPE_LABELS[entry.type].en}
                                </Badge>
                                {entry.subcategory && (
                                  <span className="text-xs text-stone-500">
                                    {entry.subcategory}
                                  </span>
                                )}
                              </div>
                              <h3 className="text-sm font-semibold text-stone-900">
                                {entry.url ? (
                                  <a
                                    href={entry.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-teal-700 transition-colors inline-flex items-center gap-1"
                                  >
                                    {entry.title}
                                    <ExternalLink className="h-3 w-3 text-stone-500" />
                                  </a>
                                ) : (
                                  entry.title
                                )}
                              </h3>
                              {(entry.author || entry.organization) && (
                                <p className="text-xs text-stone-500 mt-0.5">
                                  {entry.author && entry.organization
                                    ? `${entry.author} — ${entry.organization}`
                                    : entry.author || entry.organization}
                                </p>
                              )}
                              <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                                {entry.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Back link */}
      <section className="pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            {isEs ? "Volver al inicio" : "Back to home"}
          </Link>
        </div>
      </section>
    </main>
  );
}
