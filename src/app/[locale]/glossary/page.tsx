"use client";

import { useState, useMemo, Suspense } from "react";
import { useLocale } from "next-intl";
import { Search, ExternalLink, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  GLOSSARY_TERMS,
  searchGlossary,
  getTermsByCategory,
  getAllCategories,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  type GlossaryCategory,
} from "@/lib/fqhc-glossary";

export default function GlossaryPage() {
  return (
    <Suspense>
      <GlossaryContent />
    </Suspense>
  );
}

function GlossaryContent() {
  const locale = useLocale();
  const isEs = locale === "es";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<GlossaryCategory | "all">("all");

  const categories = getAllCategories();

  // Filter terms based on search and category
  const filteredTerms = useMemo(() => {
    let results = searchQuery ? searchGlossary(searchQuery) : GLOSSARY_TERMS;

    if (selectedCategory !== "all") {
      results = results.filter((t) => t.category === selectedCategory);
    }

    // Sort alphabetically by term
    return results.sort((a, b) => a.term.localeCompare(b.term));
  }, [searchQuery, selectedCategory]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-800 via-teal-900 to-stone-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {isEs ? "Glosario FQHC" : "FQHC Glossary"}
          </h1>
          <p className="text-lg text-teal-100 max-w-2xl mb-8">
            {isEs
              ? "Un glosario en lenguaje simple para acrónimos y términos de atención médica. Comprenda la jerga para dirigir con confianza durante la crisis de Medicaid."
              : "Plain-language glossary for healthcare acronyms and FQHC terminology. Master the jargon to lead with confidence during the Medicaid crisis."}
          </p>

          {/* Stats Bar */}
          <div className="flex gap-6 md:gap-12">
            <div>
              <div className="text-2xl md:text-3xl font-bold">{GLOSSARY_TERMS.length}+</div>
              <div className="text-sm text-teal-100">
                {isEs ? "Términos" : "Terms"}
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">{categories.length}</div>
              <div className="text-sm text-teal-100">
                {isEs ? "Categorías" : "Categories"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Box */}
        <div className="mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 size-5" />
            <input
              type="text"
              placeholder={isEs ? "Buscar por término, acrónimo o definición..." : "Search by term, acronym, or definition..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 border border-stone-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600"
                aria-label={isEs ? "Borrar búsqueda" : "Clear search"}
              >
                <X className="size-5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mb-10">
          <p className="text-sm font-semibold text-stone-700 mb-3">
            {isEs ? "Filtrar por categoría:" : "Filter by category:"}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-teal-700 text-white"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              {isEs ? "Todos" : "All"}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-teal-700 text-white"
                    : `${CATEGORY_COLORS[cat]} hover:shadow-md`
                }`}
              >
                {isEs ? CATEGORY_LABELS[cat].es : CATEGORY_LABELS[cat].en}
              </button>
            ))}
          </div>
        </div>

        {/* Terms List */}
        {filteredTerms.length > 0 ? (
          <div className="space-y-6">
            {filteredTerms.map((term) => (
              <TermCard key={term.term} term={term} isEs={isEs} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-stone-600 mb-2">
              {isEs ? "No se encontraron términos." : "No terms found."}
            </p>
            <p className="text-sm text-stone-500">
              {isEs
                ? "Intenta una búsqueda diferente o cambia los filtros."
                : "Try a different search or adjust your filters."}
            </p>
          </div>
        )}

        {/* Results Count */}
        {filteredTerms.length > 0 && (
          <div className="mt-12 pt-8 border-t border-stone-200">
            <p className="text-sm text-stone-600">
              {isEs
                ? `Mostrando ${filteredTerms.length} término${filteredTerms.length !== 1 ? "s" : ""}`
                : `Showing ${filteredTerms.length} term${filteredTerms.length !== 1 ? "s" : ""}`}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

/**
 * Term Card Component
 */
interface TermCardProps {
  term: (typeof GLOSSARY_TERMS)[0];
  isEs: boolean;
}

function TermCard({ term, isEs }: TermCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const definition = isEs ? term.definition.es : term.definition.en;
  const fullName = isEs ? term.fullName.es : term.fullName.en;
  const category = CATEGORY_LABELS[term.category];

  return (
    <div className="border border-stone-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      {/* Header: Term + Category */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-teal-900 mb-1">{term.term}</h3>
          <p className="text-sm text-stone-600">{fullName}</p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-shrink-0"
          aria-label={isEs ? "Expandir" : "Expand"}
        >
          <span className={`inline-flex items-center justify-center size-6 rounded-full ${CATEGORY_COLORS[term.category]}`}>
            <span className="text-xs font-semibold">
              {isExpanded ? "−" : "+"}
            </span>
          </span>
        </button>
      </div>

      {/* Category Badge */}
      <div className="mb-4">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${CATEGORY_COLORS[term.category]}`}>
          {isEs ? category.es : category.en}
        </span>
      </div>

      {/* Definition (always visible) */}
      <p className="text-base text-stone-700 mb-4 leading-relaxed">{definition}</p>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-stone-200 space-y-4">
          {/* Related Terms */}
          {term.relatedTerms && term.relatedTerms.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-stone-700 mb-2">
                {isEs ? "Términos relacionados:" : "Related terms:"}
              </p>
              <div className="flex flex-wrap gap-2">
                {term.relatedTerms.map((relatedTerm) => (
                  <span
                    key={relatedTerm}
                    className="inline-block px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-xs font-medium hover:bg-stone-200 cursor-pointer"
                  >
                    {relatedTerm}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Learn More Link */}
          {term.learnMoreUrl && (
            <div>
              <Link
                href={term.learnMoreUrl}
                className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800 transition-colors"
              >
                {isEs ? "Más información" : "Learn more"}
                <ExternalLink className="size-4" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
