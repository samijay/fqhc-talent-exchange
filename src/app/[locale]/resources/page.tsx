import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import {
  FileText,
  Building2,
  Briefcase,
  ClipboardCheck,
  ExternalLink,
  ArrowRight,
  BookOpen,
  DollarSign,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fqhcSalaryRanges } from "@/lib/california-fqhcs";

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Resources for Community Health Professionals | FQHC Talent Exchange",
    description:
      "Salary guides, career tools, blog articles, and external resources for community health workers, care coordinators, and other FQHC professionals in California.",
  };
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatSalary(n: number): string {
  return `$${(n / 1000).toFixed(0)}k`;
}

/* ------------------------------------------------------------------ */
/*  Static Data                                                        */
/* ------------------------------------------------------------------ */

const quickLinks = [
  {
    titleKey: "quickLinkResumeTitle" as const,
    descKey: "quickLinkResumeDesc" as const,
    href: "/resume-builder",
    icon: FileText,
  },
  {
    titleKey: "quickLinkDirectoryTitle" as const,
    descKey: "quickLinkDirectoryDesc" as const,
    href: "/directory",
    icon: Building2,
  },
  {
    titleKey: "quickLinkJobsTitle" as const,
    descKey: "quickLinkJobsDesc" as const,
    href: "/jobs",
    icon: Briefcase,
  },
  {
    titleKey: "quickLinkAssessmentTitle" as const,
    descKey: "quickLinkAssessmentDesc" as const,
    href: "/directory",
    icon: ClipboardCheck,
  },
];

const blogPosts = [
  {
    slug: "laid-off-fqhc-fast-track-job-search",
    title: "Laid Off from an FQHC? Here's How to Fast-Track Your Job Search",
    description:
      "Get priority matching in 48 hours with our Fast-Track program for displaced community health workers.",
    category: "Fast-Track",
  },
  {
    slug: "fqhc-career-insights-assessment",
    title: "Discover Your FQHC Career Strengths with Our Free Assessment",
    description:
      "Take a 3-minute behavioral assessment to uncover your strengths across 4 key domains.",
    category: "Assessment Tools",
  },
  {
    slug: "fqhc-vs-private-practice",
    title: "FQHC vs. Private Practice: Which Is Right for Your Career?",
    description:
      "Compare salary, benefits, mission, and culture to find the best fit for your healthcare career.",
    category: "Career Resources",
  },
  {
    slug: "top-10-fqhc-interview-questions",
    title: "Top 10 FQHC Interview Questions (and How to Answer Them)",
    description:
      "Prepare for your FQHC interview with these common questions and expert answer strategies.",
    category: "Interview Prep",
  },
  {
    slug: "nhsc-loan-repayment-guide",
    title: "NHSC Loan Repayment: The Complete Guide for FQHC Workers",
    description:
      "Everything you need to know about qualifying for up to $50,000 in student loan repayment.",
    category: "Benefits",
  },
  {
    slug: "medi-cal-funding-cuts-community-health-workers",
    title: "Medi-Cal Funding Cuts: What Community Health Workers Need to Know in 2026",
    description:
      "California's Medi-Cal funding cuts are displacing thousands of community health workers.",
    category: "Industry News",
  },
  {
    slug: "what-is-enhanced-care-management-ecm",
    title: "What Is Enhanced Care Management (ECM)? A Career Guide",
    description:
      "Learn what ECM is, what roles it creates, and how to land an ECM job.",
    category: "Career Resources",
  },
  {
    slug: "how-to-write-fqhc-resume",
    title: "How to Write an FQHC Resume That Gets Noticed",
    description:
      "Highlight programs, EHR systems, and competencies to stand out.",
    category: "Career Resources",
  },
  {
    slug: "working-at-top-of-scope-fqhc",
    title: "Working at Top of Scope: How FQHCs Are Revolutionizing Patient Access",
    description:
      "Learn how FQHCs use team-based care to maximize provider scope of practice.",
    category: "Clinical Operations",
  },
  {
    slug: "fqhc-career-ladder-ma-rn-provider",
    title: "The FQHC MA, RN & Provider Career Ladder",
    description:
      "Explore career advancement paths at FQHCs for MAs, RNs, and providers.",
    category: "Career Growth",
  },
];

const externalResources = [
  {
    titleKey: "externalHrsaTitle" as const,
    descKey: "externalHrsaDesc" as const,
    url: "https://findahealthcenter.hrsa.gov",
  },
  {
    titleKey: "externalNhscTitle" as const,
    descKey: "externalNhscDesc" as const,
    url: "https://nhsc.hrsa.gov/loan-repayment",
  },
  {
    titleKey: "externalCalaimTitle" as const,
    descKey: "externalCalaimDesc" as const,
    url: "https://www.dhcs.ca.gov/CalAIM",
  },
  {
    titleKey: "externalChwCertTitle" as const,
    descKey: "externalChwCertDesc" as const,
    url: "https://www.cdph.ca.gov/Programs/CCDPHP/DCDIC/CDCB/Pages/CommunityHealthWorkers.aspx",
  },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default async function ResourcesPage() {
  const t = await getTranslations("resources");

  const salaryEntries = Object.entries(fqhcSalaryRanges) as [
    string,
    { min: number; max: number; avg: number },
  ][];

  return (
    <div className="bg-stone-50">
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 text-white">
        <div className="absolute -left-32 -top-32 size-96 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 size-[28rem] rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <Badge className="mb-6 border-teal-400/30 bg-teal-500/20 text-teal-100 hover:bg-teal-500/30">
            {t("heroBadge")}
          </Badge>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {t("heroTitle")}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-teal-100/90">
            {t("heroSubtitle")}
          </p>
        </div>
      </section>

      {/* ==================== QUICK LINKS ==================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
              {t("quickLinksTitle")}
            </h2>
            <p className="mt-3 text-stone-600">
              {t("quickLinksSubtitle")}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-start gap-4 rounded-xl border border-stone-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700 transition-colors group-hover:bg-teal-100">
                    <Icon className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900">
                      {t(link.titleKey)}
                    </h3>
                    <p className="mt-1 text-sm text-stone-600">
                      {t(link.descKey)}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-teal-700">
                      {t("quickLinkCta")}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== SALARY GUIDES ==================== */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <div className="mb-3 flex items-center justify-center gap-2">
              <DollarSign className="size-6 text-amber-500" />
              <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
                {t("salaryTitle")}
              </h2>
            </div>
            <p className="text-stone-600">
              {t("salarySubtitle")}
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-stone-200">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50">
                  <th className="px-4 py-3 text-sm font-semibold text-stone-700 sm:px-6">
                    {t("salaryColRole")}
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-stone-700 sm:px-6">
                    {t("salaryColRange")}
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-stone-700 sm:px-6">
                    {t("salaryColAvg")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {salaryEntries.map(([role, range], idx) => (
                  <tr
                    key={role}
                    className={
                      idx % 2 === 0
                        ? "bg-white"
                        : "bg-stone-50/50"
                    }
                  >
                    <td className="px-4 py-3 text-sm font-medium text-stone-900 sm:px-6">
                      {role}
                    </td>
                    <td className="px-4 py-3 text-sm text-stone-600 sm:px-6">
                      {formatSalary(range.min)} &ndash; {formatSalary(range.max)}
                    </td>
                    <td className="px-4 py-3 sm:px-6">
                      <Badge
                        variant="secondary"
                        className="bg-teal-50 text-teal-700 hover:bg-teal-100"
                      >
                        {formatSalary(range.avg)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-center text-xs text-stone-500">
            {t("salaryDisclaimer")}
          </p>
        </div>
      </section>

      {/* ==================== BLOG ARTICLES ==================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <div className="mb-3 flex items-center justify-center gap-2">
              <BookOpen className="size-6 text-teal-700" />
              <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
                {t("blogTitle")}
              </h2>
            </div>
            <p className="text-stone-600">
              {t("blogSubtitle")}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-xl border border-stone-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <Badge
                  variant="secondary"
                  className="mb-3 w-fit bg-teal-50 text-teal-700 hover:bg-teal-100"
                >
                  {post.category}
                </Badge>
                <h3 className="mb-2 font-semibold text-stone-900 leading-snug">
                  {post.title}
                </h3>
                <p className="mb-4 flex-1 text-sm text-stone-600 leading-relaxed">
                  {post.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-teal-700">
                  {t("blogReadMore")}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/blog">
              <Button variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50">
                {t("blogViewAll")}
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== EXTERNAL RESOURCES ==================== */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <div className="mb-3 flex items-center justify-center gap-2">
              <Star className="size-6 text-amber-500" />
              <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
                {t("externalTitle")}
              </h2>
            </div>
            <p className="text-stone-600">
              {t("externalSubtitle")}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {externalResources.map((resource) => (
              <a
                key={resource.url}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-xl border border-stone-200 bg-stone-50 p-6 transition-all hover:-translate-y-1 hover:shadow-md hover:bg-white"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <ExternalLink className="size-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-stone-900">
                    {t(resource.titleKey)}
                  </h3>
                  <p className="mt-1 text-sm text-stone-600">
                    {t(resource.descKey)}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-teal-700">
                    {t("externalVisit")}
                    <ExternalLink className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="rounded-2xl bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 p-10 text-white shadow-lg sm:p-14">
            <h2 className="text-2xl font-bold sm:text-3xl">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-teal-100/90 leading-relaxed">
              {t("ctaSubtitle")}
            </p>
            <div className="mt-8">
              <Link href="/resume-builder">
                <Button
                  size="lg"
                  className="bg-amber-500 text-stone-900 hover:bg-amber-400 font-semibold shadow-md"
                >
                  <FileText className="mr-2 size-5" />
                  {t("ctaButton")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
