"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Search, ExternalLink } from "lucide-react";
import { REGULATORY_ITEMS, DOMAIN_META, type ComplianceDomain } from "@/lib/fqhc-compliance";
import { t } from "@/lib/i18n-helpers";

const DOMAIN_COLORS: Record<ComplianceDomain, { bg: string; text: string; border: string }> = {
  "hrsa-audits": { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200" },
  "hipaa-privacy": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  "billing-fraud": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
};

export default function KnowledgeBasePage() {
  const locale = useLocale();
  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState<ComplianceDomain | null>(null);

  const filtered = useMemo(() => {
    return REGULATORY_ITEMS.filter((item) => {
      if (domainFilter && item.domain !== domainFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const searchable = [
          t(item.title, locale),
          t(item.summary, locale),
          t(item.practicalImplications, locale),
          ...item.citations,
          ...item.tags,
          item.primarySourceOrg,
        ].join(" ").toLowerCase();
        return searchable.includes(q);
      }
      return true;
    });
  }, [search, domainFilter, locale]);

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/compliance" className="text-stone-500 text-sm hover:underline mb-4 inline-block">&larr; {locale === "es" ? "Cumplimiento" : "Compliance"}</Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{locale === "es" ? "Base de Conocimiento Regulatorio" : "Regulatory Knowledge Base"}</h1>
          <p className="text-stone-300 text-lg max-w-3xl">{locale === "es" ? "Regulaciones FQHC con citas CFR, implicaciones prácticas y fuentes primarias." : "FQHC regulations with CFR citations, practical implications, and primary sources."}</p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" aria-hidden="true" />
            <label htmlFor="regulation-search" className="sr-only">{locale === "es" ? "Buscar regulaciones" : "Search regulations"}</label>
            <input
              id="regulation-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={locale === "es" ? "Buscar regulaciones, citas CFR, etiquetas..." : "Search regulations, CFR citations, tags..."}
              className="w-full pl-10 pr-4 py-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setDomainFilter(null)} className={`px-3 py-2 rounded text-xs font-medium border ${domainFilter === null ? "bg-stone-700 text-white" : "bg-white text-stone-600 border-stone-300"}`}>
              {locale === "es" ? "Todos" : "All"} ({REGULATORY_ITEMS.length})
            </button>
            {DOMAIN_META.map((d) => {
              const count = REGULATORY_ITEMS.filter((r) => r.domain === d.id).length;
              const colors = DOMAIN_COLORS[d.id];
              return (
                <button key={d.id} onClick={() => setDomainFilter(domainFilter === d.id ? null : d.id)} className={`px-3 py-2 rounded text-xs font-medium border ${domainFilter === d.id ? `${colors.bg} ${colors.text} ${colors.border}` : "bg-white text-stone-600 border-stone-300"}`}>
                  {t({ en: d.en, es: d.es }, locale).split(" ")[0]} ({count})
                </button>
              );
            })}
          </div>
        </div>
        <div className="text-sm text-stone-500">{filtered.length} {locale === "es" ? "regulaciones" : "regulations"}</div>
      </section>

      {/* Regulation Cards */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <div className="space-y-3">
          {filtered.map((reg) => {
            const colors = DOMAIN_COLORS[reg.domain];
            return (
              <div key={reg.id} className={`border ${colors.border} rounded-xl p-5`}>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {reg.citations.map((c) => (
                    <span key={c} className={`text-xs font-mono px-2 py-0.5 rounded ${colors.bg} ${colors.text}`}>{c}</span>
                  ))}
                  <span className="text-xs text-stone-500">{reg.primarySourceOrg}</span>
                </div>
                <h3 className="font-bold text-stone-900 mb-1">{t(reg.title, locale)}</h3>
                <p className="text-sm text-stone-700 mb-3">{t(reg.summary, locale)}</p>

                <div className={`${colors.bg} rounded-lg p-3 mb-3`}>
                  <div className={`text-xs font-semibold ${colors.text} mb-1`}>{locale === "es" ? "Implicaciones Prácticas para FQHCs:" : "Practical Implications for FQHCs:"}</div>
                  <p className="text-sm text-stone-700">{t(reg.practicalImplications, locale)}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {reg.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded">{tag}</span>
                    ))}
                  </div>
                  <a href={reg.primarySourceUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 text-xs ${colors.text} hover:underline`}>
                    <ExternalLink className="w-3 h-3" />
                    {locale === "es" ? "Fuente" : "Source"}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
