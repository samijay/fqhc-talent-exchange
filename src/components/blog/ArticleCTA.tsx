// ArticleCTA — Shared bottom-of-article CTA with newsletter signup + tool discovery
// Used in all blog articles to promote newsletters and free tools
"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Target,
  GraduationCap,
  FileEdit,
  BarChart3,
} from "lucide-react";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type AudienceChoice = "intel-brief" | "the-pulse" | "both";

interface RelatedArticle {
  slug: string;
  title: string;
  esTitle: string;
  category: string;
  esCategory: string;
}

interface ArticleCTAProps {
  /** Which newsletter audience to pre-select */
  audience: AudienceChoice;
  /** Related articles to show (max 3) */
  relatedArticles?: RelatedArticle[];
}

/* ------------------------------------------------------------------ */
/*  Tool cards config                                                  */
/* ------------------------------------------------------------------ */

const TOOLS = [
  {
    href: "/strategy/okrs",
    icon: Target,
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
    en: "OKR Templates",
    es: "Plantillas OKR",
    enDesc: "FQHC-ready OKRs aligned to UDS & HRSA",
    esDesc: "OKRs listos para FQHC alineados con UDS y HRSA",
  },
  {
    href: "/pathway",
    icon: GraduationCap,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    en: "Learning Pathway",
    es: "Ruta de Aprendizaje",
    enDesc: "Courses & certifications for FQHC careers",
    esDesc: "Cursos y certificaciones para carreras en FQHC",
  },
  {
    href: "/resume-builder",
    icon: FileEdit,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    en: "Resume Builder",
    es: "Constructor de Curr\u00edculum",
    enDesc: "Resumes optimized for community health",
    esDesc: "Curr\u00edculums optimizados para salud comunitaria",
  },
  {
    href: "/",
    icon: BarChart3,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    en: "Intelligence Dashboard",
    es: "Panel de Inteligencia",
    enDesc: "Live policy, funding & workforce intel",
    esDesc: "Inteligencia en vivo de pol\u00edticas y financiamiento",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ArticleCTA({ audience, relatedArticles = [] }: ArticleCTAProps) {
  const locale = useLocale();
  const isEs = locale === "es";

  return (
    <div className="mt-12 space-y-8">
      {/* Divider */}
      <hr className="border-stone-200" />

      {/* Newsletter signup */}
      <div>
        <NewsletterSignup
          variant="card"
          defaultAudience={audience}
          showAudienceToggle={true}
          heading={{
            en: "Stay Ahead with FQHC Intelligence",
            es: "Mant\u00e9nte al D\u00eda con Inteligencia FQHC",
          }}
          subheading={{
            en: "Weekly briefings on policy, funding, workforce, and AI \u2014 backed by primary sources. Free.",
            es: "Informes semanales sobre pol\u00edticas, financiamiento, fuerza laboral e IA \u2014 con fuentes primarias. Gratis.",
          }}
        />
      </div>

      {/* Tool discovery */}
      <div>
        <h3 className="text-lg font-bold text-stone-800 mb-3">
          {isEs ? "Herramientas Gratuitas" : "Free Tools"}
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex items-start gap-3 rounded-lg border border-stone-200 bg-white p-3 hover:border-teal-300 hover:shadow-sm transition-all"
              >
                <div className={`rounded-md ${tool.iconBg} p-2 ${tool.iconColor}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-stone-800 group-hover:text-teal-700 transition-colors">
                    {isEs ? tool.es : tool.en}
                  </p>
                  <p className="text-xs text-stone-500">
                    {isEs ? tool.esDesc : tool.enDesc}
                  </p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-stone-300 group-hover:text-teal-500 mt-1 ml-auto shrink-0 transition-colors" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-stone-800 mb-3">
            {isEs ? "Art\u00edculos Relacionados" : "Related Articles"}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedArticles.slice(0, 3).map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group rounded-lg border border-stone-200 bg-white p-4 hover:border-teal-300 hover:shadow-sm transition-all"
              >
                <span className="text-xs font-medium text-teal-600">
                  {isEs ? article.esCategory : article.category}
                </span>
                <p className="mt-1 text-sm font-semibold text-stone-800 group-hover:text-teal-700 transition-colors line-clamp-2">
                  {isEs ? article.esTitle : article.title}
                </p>
                <span className="inline-flex items-center text-xs text-teal-600 mt-2 group-hover:translate-x-0.5 transition-transform">
                  {isEs ? "Leer m\u00e1s" : "Read more"}{" "}
                  <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
