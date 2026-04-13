"use client";

import { useLocale } from "next-intl";
import { ContentCard } from "./ContentCard";
import {
  Lightbulb,
  BarChart3,
  GraduationCap,
  BookOpen,
  Scale,
  Newspaper,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface RelatedItem {
  href: string;
  title: { en: string; es: string };
  description: { en: string; es: string };
  type: "strategy" | "intelligence" | "career" | "blog" | "academy" | "labor";
}

interface RelatedContentProps {
  items: RelatedItem[];
  heading?: { en: string; es: string };
}

/* ------------------------------------------------------------------ */
/*  Config per type                                                    */
/* ------------------------------------------------------------------ */

const TYPE_CONFIG: Record<
  RelatedItem["type"],
  { label: { en: string; es: string }; color: string; icon: React.ReactNode }
> = {
  strategy: {
    label: { en: "Strategy", es: "Estrategia" },
    color: "text-teal-600",
    icon: <Lightbulb className="size-5 text-teal-500" />,
  },
  intelligence: {
    label: { en: "Intelligence", es: "Inteligencia" },
    color: "text-amber-600",
    icon: <BarChart3 className="size-5 text-amber-500" />,
  },
  career: {
    label: { en: "Career", es: "Carrera" },
    color: "text-blue-600",
    icon: <GraduationCap className="size-5 text-blue-500" />,
  },
  blog: {
    label: { en: "Blog", es: "Blog" },
    color: "text-purple-600",
    icon: <Newspaper className="size-5 text-purple-500" />,
  },
  academy: {
    label: { en: "Academy", es: "Academia" },
    color: "text-emerald-600",
    icon: <BookOpen className="size-5 text-emerald-500" />,
  },
  labor: {
    label: { en: "Labor", es: "Trabajo" },
    color: "text-rose-600",
    icon: <Scale className="size-5 text-rose-500" />,
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function RelatedContent({ items, heading }: RelatedContentProps) {
  const locale = useLocale();
  const isEs = locale === "es";

  const defaultHeading = {
    en: "Related Content",
    es: "Contenido Relacionado",
  };

  const h = heading ?? defaultHeading;

  if (!items.length) return null;

  return (
    <section className="mt-16 border-t border-stone-200 pt-10 dark:border-stone-700">
      <h2 className="mb-6 text-xl font-bold text-stone-900 dark:text-stone-100">
        {isEs ? h.es : h.en}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.slice(0, 4).map((item) => {
          const cfg = TYPE_CONFIG[item.type];
          return (
            <ContentCard
              key={item.href}
              href={item.href}
              icon={cfg.icon}
              label={isEs ? cfg.label.es : cfg.label.en}
              labelColor={cfg.color}
              title={isEs ? item.title.es : item.title.en}
              description={isEs ? item.description.es : item.description.en}
              cta={isEs ? "Explorar" : "Explore"}
            />
          );
        })}
      </div>
    </section>
  );
}
