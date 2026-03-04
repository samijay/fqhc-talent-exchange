import { type IntelItem } from "@/lib/fqhc-news-intel";
import { MASTERCLASSES } from "@/lib/fqhc-masterclasses";
import { CASE_STUDIES } from "@/lib/fqhc-case-studies";
import { OKR_TEMPLATES } from "@/lib/fqhc-okr-templates";
import { FQHC_GUIDES } from "@/lib/fqhc-guides";
import { californiaFQHCs } from "@/lib/california-fqhcs";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface WatchlistItem {
  watch_type: "fqhc" | "keyword" | "region" | "category";
  watch_value: string;
}

export interface FavoriteItem {
  content_type: string;
  content_id: string;
  created_at: string;
}

/* ------------------------------------------------------------------ */
/*  Filter intel by watchlist                                           */
/* ------------------------------------------------------------------ */

export function filterIntelByWatchlist(
  items: IntelItem[],
  watchlist: WatchlistItem[]
): IntelItem[] {
  if (watchlist.length === 0) return items;

  const fqhcSlugs = watchlist
    .filter((w) => w.watch_type === "fqhc")
    .map((w) => w.watch_value);

  const keywords = watchlist
    .filter((w) => w.watch_type === "keyword")
    .map((w) => w.watch_value.toLowerCase());

  const regions = watchlist
    .filter((w) => w.watch_type === "region")
    .map((w) => w.watch_value);

  const categories = watchlist
    .filter((w) => w.watch_type === "category")
    .map((w) => w.watch_value);

  return items.filter((item) => {
    // Match by watched FQHC slugs
    if (
      fqhcSlugs.length > 0 &&
      item.affectedOrgSlugs?.some((slug) => fqhcSlugs.includes(slug))
    ) {
      return true;
    }

    // Match by keyword in headline or summary
    if (keywords.length > 0) {
      const text = `${item.headline.en} ${item.summary.en} ${item.headline.es} ${item.summary.es}`.toLowerCase();
      if (keywords.some((kw) => text.includes(kw))) return true;
    }

    // Match by region
    if (regions.length > 0 && regions.includes(item.region)) {
      return true;
    }

    // Match by category
    if (categories.length > 0 && categories.includes(item.category)) {
      return true;
    }

    return false;
  });
}

/* ------------------------------------------------------------------ */
/*  Resolve content by type + id (for displaying favorites)            */
/* ------------------------------------------------------------------ */

export interface ResolvedContent {
  title: { en: string; es: string };
  href: string;
  subtitle?: { en: string; es: string };
}

export function getContentById(
  contentType: string,
  contentId: string
): ResolvedContent | null {
  switch (contentType) {
    case "masterclass": {
      const mod = MASTERCLASSES.find((m) => m.id === contentId);
      if (!mod) return null;
      return {
        title: mod.title,
        href: "/strategy/masterclass",
        subtitle: mod.subtitle,
      };
    }

    case "case-study": {
      const cs = CASE_STUDIES.find((c) => c.id === contentId);
      if (!cs) return null;
      return {
        title: cs.headline,
        href: "/strategy/case-studies",
        subtitle: cs.challenge,
      };
    }

    case "okr-template": {
      const okr = OKR_TEMPLATES.find((o) => o.id === contentId);
      if (!okr) return null;
      return {
        title: okr.objective,
        href: "/strategy/okrs",
        subtitle: okr.context,
      };
    }

    case "guide": {
      const guide = FQHC_GUIDES.find((g) => g.id === contentId);
      if (!guide) return null;
      return {
        title: guide.title,
        href: "/guides",
        subtitle: guide.summary,
      };
    }

    case "fqhc": {
      const fqhc = californiaFQHCs.find((f) => f.slug === contentId);
      if (!fqhc) return null;
      return {
        title: { en: fqhc.name, es: fqhc.name },
        href: `/directory/${fqhc.slug}`,
        subtitle: { en: `${fqhc.city}, ${fqhc.county}`, es: `${fqhc.city}, ${fqhc.county}` },
      };
    }

    case "intel": {
      // Intel items are resolved directly from the feed
      return null;
    }

    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Content type labels                                                */
/* ------------------------------------------------------------------ */

export const CONTENT_TYPE_LABELS: Record<string, { en: string; es: string }> = {
  intel: { en: "Intelligence", es: "Inteligencia" },
  masterclass: { en: "Masterclass", es: "Masterclass" },
  "case-study": { en: "Case Studies", es: "Estudios de Caso" },
  "okr-template": { en: "OKR Templates", es: "Plantillas OKR" },
  guide: { en: "Guides", es: "Guías" },
  certification: { en: "Certifications", es: "Certificaciones" },
  resource: { en: "Resources", es: "Recursos" },
  fqhc: { en: "FQHCs", es: "FQHCs" },
  job: { en: "Jobs", es: "Empleos" },
  blog: { en: "Blog", es: "Blog" },
};
