"use client";

import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";

export default function Footer() {
  const t = useTranslations("footer");

  const footerLinks = {
    [t("academy")]: [
      { href: "/strategy/okr-course" as const, label: t("okrCourse") },
      { href: "/strategy/clinic-simulator" as const, label: t("clinicSimulator") },
      { href: "/strategy/revenue-simulator" as const, label: t("revenueSimulator") },
      { href: "/career-insights" as const, label: t("careerAssessment") },
      { href: "/interview-prep" as const, label: t("interviewPrep") },
      { href: "/resume-builder" as const, label: t("resumeBuilder") },
      { href: "/pathway" as const, label: t("learningPathway") },
      { href: "/career-roadmap" as const, label: t("careerRoadmap") },
      { href: "/certifications" as const, label: t("certifications") },
    ],
    [t("strategy")]: [
      { href: "/strategy/guides" as const, label: t("executiveGuides") },
      { href: "/strategy/okrs" as const, label: t("okrTemplates") },
      { href: "/strategy/masterclass" as const, label: t("masterclass") },
      { href: "/strategy/economics" as const, label: t("healthcareEconomics") },
      { href: "/funding-impact" as const, label: t("fundingImpact") },
      { href: "/strategy/resilience" as const, label: t("resilience") },
      { href: "/strategy/scope-of-practice" as const, label: t("scopeOfPractice") },
      { href: "/strategy/workforce-resilience" as const, label: t("workforceResilience") },
      { href: "/strategy/research" as const, label: t("researchArchive") },
    ],
    [t("intelligence")]: [
      { href: "/" as const, label: t("dashboard") },
      { href: "/ai-tracker" as const, label: t("aiTracker") },
      { href: "/intelligence/legislation" as const, label: t("legislativeTracker") },
      { href: "/layoffs" as const, label: t("layoffTracker") },
      { href: "/salary-data" as const, label: t("salaryIntel") },
      { href: "/blog" as const, label: t("blog") },
      { href: "/jobs" as const, label: t("browseJobs") },
      { href: "/directory" as const, label: t("fqhcDirectory") },
    ],
    [t("compliance")]: [
      { href: "/compliance" as const, label: t("complianceHub") },
      { href: "/compliance/hrsa-audits" as const, label: t("hrsaAudits") },
      { href: "/compliance/hipaa" as const, label: t("hipaa") },
      { href: "/compliance/billing" as const, label: t("billing") },
      { href: "/compliance/workers-comp" as const, label: t("workersComp") },
      { href: "/compliance/education-barriers" as const, label: t("educationBarriers") },
      { href: "/compliance/calendar" as const, label: t("complianceCalendarFooter") },
      { href: "/compliance/knowledge-base" as const, label: t("knowledgeBase") },
    ],
    [t("company")]: [
      { href: "/newsletter" as const, label: t("newsletter") },
      { href: "/about" as const, label: t("aboutUs") },
      { href: "/compare" as const, label: t("compareFqhcs") },
      { href: "/resources" as const, label: t("careerResources") },
      { href: "/guides" as const, label: t("guides") },
      { href: "/bibliography" as const, label: t("bibliography") },
      { href: "/downloads" as const, label: t("downloads") },
    ],
  };

  return (
    <footer className="border-t border-stone-200 bg-white pb-16">
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
          <p className="text-xs text-stone-400 text-center mb-4">
            {t("disclaimer")}
          </p>
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
