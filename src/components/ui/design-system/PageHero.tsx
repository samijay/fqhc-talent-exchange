"use client";

import { useLocale } from "next-intl";

interface Stat {
  value: string;
  label: string;
}

interface PageHeroProps {
  /** dark = gradient stone-900, light = stone-50, minimal = white with border-bottom */
  variant?: "dark" | "light" | "minimal";
  title: { en: string; es: string };
  subtitle?: { en: string; es: string };
  /** Small metadata line (e.g., "30 modules · 7 categories · Updated: 2026-03-04") */
  meta?: string;
  stats?: Stat[];
  children?: React.ReactNode;
}

export function PageHero({
  variant = "dark",
  title,
  subtitle,
  meta,
  stats,
  children,
}: PageHeroProps) {
  const locale = useLocale();
  const isEs = locale === "es";
  const t = (obj: { en: string; es: string }) => (isEs ? obj.es : obj.en);

  const bg: Record<string, string> = {
    dark: "bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white",
    light: "bg-stone-50 text-stone-900",
    minimal: "bg-white border-b border-stone-200 text-stone-900",
  };

  const subtitleColor: Record<string, string> = {
    dark: "text-stone-300",
    light: "text-stone-600",
    minimal: "text-stone-500",
  };

  const metaColor: Record<string, string> = {
    dark: "text-stone-400",
    light: "text-stone-500",
    minimal: "text-stone-400",
  };

  const statValueColor: Record<string, string> = {
    dark: "text-white",
    light: "text-stone-900",
    minimal: "text-stone-900",
  };

  const statLabelColor: Record<string, string> = {
    dark: "text-stone-400",
    light: "text-stone-500",
    minimal: "text-stone-500",
  };

  const statBorder: Record<string, string> = {
    dark: "border-stone-700",
    light: "border-stone-200",
    minimal: "border-stone-200",
  };

  return (
    <section className={`relative overflow-hidden px-4 sm:px-6 lg:px-8 ${bg[variant]}`}>
      {variant === "dark" && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent" />
      )}
      <div className="relative mx-auto max-w-6xl py-12 sm:py-16 lg:py-20">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          {t(title)}
        </h1>

        {subtitle && (
          <p className={`mt-4 max-w-2xl text-lg leading-relaxed ${subtitleColor[variant]}`}>
            {t(subtitle)}
          </p>
        )}

        {meta && (
          <p className={`mt-3 text-sm ${metaColor[variant]}`}>{meta}</p>
        )}

        {stats && stats.length > 0 && (
          <div className={`mt-8 inline-flex flex-wrap items-center gap-6 rounded-xl border px-6 py-4 ${
            variant === "dark" ? "border-stone-700 bg-stone-800/50" : "border-stone-200 bg-white"
          }`}>
            {stats.map((stat, i) => (
              <div key={stat.label} className={`flex items-center gap-6 ${
                i < stats.length - 1 ? `border-r pr-6 ${statBorder[variant]}` : ""
              }`}>
                <div className="text-center">
                  <p className={`text-xl font-extrabold sm:text-2xl ${statValueColor[variant]}`}>
                    {stat.value}
                  </p>
                  <p className={`text-xs font-medium uppercase tracking-wider ${statLabelColor[variant]}`}>
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
