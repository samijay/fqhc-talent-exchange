"use client";

import { ChevronDown, ChevronUp, Lock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { californiaFQHCs } from "@/lib/california-fqhcs";
import {
  INTEL_CATEGORIES,
  IMPACT_STYLES,
  IMPACT_BORDER,
  IMPACT_LABELS,
  type IntelItem,
} from "@/lib/fqhc-news-intel";
import { trackIntelExpand } from "@/lib/analytics";
import { ShareButton } from "@/components/share/ShareButton";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

function formatDate(dateStr: string, locale: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(locale === "es" ? "es-US" : "en-US", {
    month: "short",
    day: "numeric",
  });
}

/* ------------------------------------------------------------------ */
/*  IntelCard — shared expandable intelligence card                    */
/* ------------------------------------------------------------------ */

export function IntelCard({
  item,
  locale,
  isEs,
  isExpanded,
  onToggle,
  compact = false,
}: {
  item: IntelItem;
  locale: string;
  isEs: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  compact?: boolean;
}) {
  const catMeta = INTEL_CATEGORIES.find((c) => c.id === item.category);

  return (
    <div
      className={`rounded-xl border border-stone-200 bg-white border-l-4 ${IMPACT_BORDER[item.impactLevel]} transition-shadow hover:shadow-md`}
    >
      <button onClick={() => { if (!isExpanded) trackIntelExpand(item.id, item.category); onToggle(); }} className="w-full text-left p-4 pb-2" aria-expanded={isExpanded}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              <Badge
                variant="outline"
                className={`text-xs font-semibold ${IMPACT_STYLES[item.impactLevel]}`}
              >
                {t(IMPACT_LABELS[item.impactLevel], locale)}
              </Badge>
              <span className="text-xs text-stone-500">
                {formatDate(item.date, locale)}
              </span>
              {catMeta && (
                <span className="text-xs bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded-full">
                  {isEs ? catMeta.es : catMeta.en}
                </span>
              )}
              {item.paywalled && (
                <span className="inline-flex items-center gap-0.5 text-xs bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-full border border-amber-200">
                  <Lock className="size-2.5" />
                  {isEs ? "Exclusivo" : "Paywalled"}
                </span>
              )}
            </div>
            <h3
              className={`font-semibold text-stone-800 leading-snug ${compact ? "text-sm" : ""}`}
            >
              {t(item.headline, locale)}
            </h3>
            {!isExpanded && (
              <p className="mt-1 text-sm text-stone-500 leading-relaxed line-clamp-2">
                {t(item.summary, locale)}
              </p>
            )}
          </div>
          <div className="flex-shrink-0 mt-0.5 text-stone-500">
            {isExpanded ? (
              <ChevronUp className="size-4" />
            ) : (
              <ChevronDown className="size-4" />
            )}
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4">
          <p className="text-sm text-stone-600 leading-relaxed">
            {t(item.summary, locale)}
          </p>

          {/* Key Takeaways — structured bullet list */}
          {item.keyTakeaways && item.keyTakeaways.length > 0 && (
            <div className="mt-3 rounded-lg bg-stone-50 border border-stone-200 p-3">
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                {item.paywalled && <Lock className="size-3 text-amber-600" />}
                {isEs ? "Puntos Clave" : "Key Takeaways"}
              </h4>
              <ul className="space-y-1.5">
                {item.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-stone-700">
                    <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal-500" />
                    <span className="leading-relaxed">{t(takeaway, locale)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          {item.tags.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-stone-100 px-1.5 py-0.5 text-xs font-medium text-stone-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Affected orgs — linked to directory profiles when slug exists */}
          {item.affectedOrgs && item.affectedOrgs.length > 0 && (
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-medium text-stone-500">
                {isEs ? "Organizaciones:" : "Affected:"}
              </span>
              {item.affectedOrgs.map((org, i) => {
                const slug = item.affectedOrgSlugs?.[i];
                const fqhc = slug
                  ? californiaFQHCs.find((f) => f.slug === slug)
                  : null;

                if (fqhc && slug) {
                  return (
                    <Link
                      key={slug}
                      href={`/directory/${slug}`}
                      className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full hover:bg-teal-100 hover:underline transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {fqhc.name}
                    </Link>
                  );
                }

                return (
                  <span
                    key={org}
                    className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full"
                  >
                    {org}
                  </span>
                );
              })}
            </div>
          )}

          {/* Source + Share */}
          <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-2.5">
            <span className="text-xs text-stone-500">{item.region}</span>
            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
              <ShareButton
                url={`https://www.fqhctalent.com/#${item.id}`}
                title={item.headline.en}
                description={item.summary.en}
                size="sm"
              />
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-teal-700 hover:text-teal-900 hover:underline transition-colors"
              >
                {item.sourceOrg} →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed footer — source as hyperlink text */}
      {!isExpanded && (
        <div className="px-4 pb-2.5 flex items-center justify-between">
          <span className="text-xs text-stone-500">{item.region}</span>
          <a
            href={item.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-teal-700 hover:text-teal-900 hover:underline transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            {item.sourceOrg} →
          </a>
        </div>
      )}
    </div>
  );
}
