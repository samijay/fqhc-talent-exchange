// i18n-helpers.ts
// Shared bilingual translation helpers used across client components and data files.
// Replaces 39+ inline `const t = (obj, locale) => ...` definitions.

/** Simple EN/ES object translation — picks the right string for the given locale. */
export const t = (obj: { en: string; es: string }, locale: string): string =>
  locale === "es" ? obj.es : obj.en;
