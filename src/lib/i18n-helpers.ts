// i18n-helpers.ts
// Shared bilingual translation helpers used across client components and data files.
// Replaces 39+ inline `const t = (obj, locale) => ...` definitions.

/** Pick the right language from a bilingual object */
export function t<T extends { en: unknown; es: unknown }>(
  obj: T,
  locale: string
): T["en"] {
  return locale === "es" ? obj.es : obj.en;
}

/** Common bilingual labels reused across pages */
export const COMMON_LABELS = {
  home: { en: "Home", es: "Inicio" },
  tools: { en: "Tools", es: "Herramientas" },
  strategy: { en: "Strategy", es: "Estrategia" },
  intelligence: { en: "Intelligence", es: "Inteligencia" },
  loading: { en: "Loading...", es: "Cargando..." },
  showMore: { en: "Show more", es: "Mostrar más" },
  showLess: { en: "Show less", es: "Mostrar menos" },
  search: { en: "Search...", es: "Buscar..." },
  noResults: { en: "No results found", es: "No se encontraron resultados" },
  downloadCsv: { en: "Download CSV", es: "Descargar CSV" },
  downloadPdf: { en: "Download PDF", es: "Descargar PDF" },
} as const;

/** Pick the right language from a bilingual object, or return a plain string as-is */
export function tSafe(
  obj: { en: string; es: string } | string,
  locale: string
): string {
  if (typeof obj === "string") return obj;
  return locale === "es" ? obj.es : obj.en;
}

/** Format a date string for display — default includes year, short month */
export function formatDate(
  dateStr: string,
  locale: string = "en",
  options: { includeYear?: boolean; monthFormat?: "short" | "long" } = {}
): string {
  const { includeYear = true, monthFormat = "short" } = options;
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(locale === "es" ? "es-US" : "en-US", {
    month: monthFormat,
    day: "numeric",
    ...(includeYear && { year: "numeric" }),
  });
}

/** Format a salary number as $XXK (compact) or $XXX,XXX (full) */
export function formatSalary(amount: number, compact: boolean = true): string {
  if (compact && amount >= 1000) {
    return `$${Math.round(amount / 1000)}K`;
  }
  return `$${amount.toLocaleString()}`;
}
