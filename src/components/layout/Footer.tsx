"use client";

import { Heart } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const isEs = locale === "es";

  const footerLinks = {
    [isEs ? "Para Líderes" : "For Leaders"]: [
      { href: "/strategy/masterclass" as const, label: t("masterclass") },
      { href: "/strategy/okr-course" as const, label: t("okrCourse") },
      { href: "/strategy/guides" as const, label: t("executiveGuides") },
      { href: "/strategy/research" as const, label: t("researchArchive") },
      { href: "/strategy/resilience" as const, label: t("resilience") },
    ],
    [isEs ? "Para Tu Carrera" : "For Your Career"]: [
      { href: "/career-insights" as const, label: isEs ? "Evaluación" : "Career Assessment" },
      { href: "/career-roadmap" as const, label: t("careerRoadmap") },
      { href: "/certifications" as const, label: t("certifications") },
      { href: "/interview-prep" as const, label: t("interviewPrep") },
      { href: "/resume-builder" as const, label: t("resumeBuilder") },
      { href: "/resources" as const, label: isEs ? "Recursos" : "Career Resources" },
    ],
    [t("intelligence")]: [
      { href: "/" as const, label: t("dashboard") },
      { href: "/intelligence/legislation" as const, label: t("legislativeTracker") },
      { href: "/layoffs" as const, label: t("layoffTracker") },
      { href: "/salary-data" as const, label: t("salaryIntel") },
      { href: "/blog" as const, label: t("blog") },
    ],
    [t("company")]: [
      { href: "/glossary" as const, label: isEs ? "Glosario FQHC" : "FQHC Glossary" },
      { href: "/guides" as const, label: t("guides") },
      { href: "/jobs" as const, label: isEs ? "Empleos" : "Browse Jobs" },
      { href: "/directory" as const, label: isEs ? "Directorio" : "FQHC Directory" },
      { href: "/newsletter" as const, label: t("newsletter") },
      { href: "/about" as const, label: t("aboutUs") },
    ],
  };

  return (
    <footer className="border-t border-stone-200 bg-white pb-16">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {/* Logo & description */}
          <div className="col-span-2 md:col-span-3 lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="size-6 fill-teal-700 text-teal-700" />
              <span className="text-lg font-bold tracking-tight text-stone-900">
                FQHC <span className="text-teal-700">Talent</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-stone-500">
              {t("description")}
            </p>
            <div className="mt-4">
              <NewsletterSignup
                variant="inline"
                defaultAudience="both"
                showAudienceToggle={false}
              />
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-sm font-semibold text-stone-900">{heading}</h3>
              <ul className="mt-4 space-y-2">
                {links.map((link, i) => (
                  <li key={link.href + link.label + i}>
                    <Link
                      href={link.href}
                      className="text-sm text-stone-500 transition-colors hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-stone-200 pt-6">
          <p className="text-xs text-stone-500 text-center mb-4">
            {t("disclaimer")}
          </p>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
            <p className="text-sm text-stone-500">
              {t("copyright", { year: new Date().getFullYear() })}
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="text-sm text-stone-500 transition-colors hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
              >
                {t("privacy")}
              </Link>
              <Link
                href="/terms"
                className="text-sm text-stone-500 transition-colors hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
              >
                {t("terms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
