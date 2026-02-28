"use client";

import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");

  const footerLinks = {
    [t("strategy")]: [
      { href: "/strategy/guides" as const, label: t("executiveGuides") },
      { href: "/strategy/okrs" as const, label: t("okrTemplates") },
      { href: "/strategy/case-studies" as const, label: t("caseStudies") },
      { href: "/funding-impact" as const, label: t("fundingImpact") },
    ],
    [t("intelligence")]: [
      { href: "/insights" as const, label: t("dashboard") },
      { href: "/ai-tracker" as const, label: t("aiTracker") },
      { href: "/layoffs" as const, label: t("layoffTracker") },
      { href: "/blog" as const, label: t("blog") },
    ],
    [t("tools")]: [
      { href: "/jobs" as const, label: t("browseJobs") },
      { href: "/directory" as const, label: t("fqhcDirectory") },
      { href: "/resume-builder" as const, label: t("resumeBuilder") },
      { href: "/career-insights" as const, label: t("careerAssessment") },
      { href: "/career-roadmap" as const, label: t("careerRoadmap") },
      { href: "/certifications" as const, label: t("certifications") },
      { href: "/resources" as const, label: t("careerResources") },
      { href: "/guides" as const, label: t("guides") },
      { href: "/team-readiness" as const, label: t("teamReadiness") },
      { href: "/fast-track" as const, label: t("fastTrack") },
    ],
    [t("company")]: [
      { href: "/about" as const, label: t("aboutUs") },
      { href: "/newsletter" as const, label: t("newsletter") },
    ],
  };

  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* Logo & description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="size-6 fill-teal-700 text-teal-700" />
              <span className="text-lg font-bold tracking-tight text-stone-900">
                FQHC <span className="text-teal-700">Talent</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-stone-500">
              {t("description")}
            </p>
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
                      className="text-sm text-stone-500 transition-colors hover:text-teal-700"
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
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
            <p className="text-sm text-stone-400">
              {t("copyright", { year: new Date().getFullYear() })}
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="text-sm text-stone-400 transition-colors hover:text-teal-700"
              >
                {t("privacy")}
              </Link>
              <Link
                href="/terms"
                className="text-sm text-stone-400 transition-colors hover:text-teal-700"
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
