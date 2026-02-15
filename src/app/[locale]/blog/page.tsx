"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const posts = [
  {
    slug: "fqhc-salary-negotiation-guide",
    title:
      "How to Negotiate Your FQHC Salary: A Guide for Community Health Professionals",
    description:
      "Learn proven salary negotiation strategies tailored to FQHCs. Understand grant-funded pay structures, leverage your bilingual and ECM skills, and negotiate total compensation packages worth $20k+ beyond base salary.",
    date: "February 15, 2026",
    category: "Career Resources",
    readTime: "8 min read",
  },
  {
    slug: "fqhc-benefits-guide-community-health",
    title:
      "The Complete Guide to FQHC Benefits: What Community Health Workers Actually Get",
    description:
      "Discover the full value of FQHC benefits packages \u2014 from health insurance and NHSC loan repayment to retirement plans, generous PTO, and professional development. Learn how a $65k FQHC salary can equal $85k+ in total compensation.",
    date: "February 15, 2026",
    category: "Benefits",
    readTime: "9 min read",
  },
  {
    slug: "laid-off-fqhc-fast-track-job-search",
    title:
      "Laid Off from an FQHC? Here\u2019s How to Get Rehired in 48 Hours",
    description:
      "Thousands of community health workers in California are being displaced by Medi-Cal funding cuts and FQHC restructuring. But many FQHCs are still hiring. Learn how the Fast-Track program can connect you to your next role in 48 hours.",
    date: "February 15, 2026",
    category: "Career Resources",
    readTime: "8 min read",
  },
  {
    slug: "fqhc-career-insights-assessment",
    title:
      "Career Insights Assessment: A Behavioral Assessment Built for Community Health",
    description:
      "Discover the Career Insights Assessment \u2014 a scenario-based behavioral evaluation across 4 domains adapted from the TPB Universal Assessment framework. Understand your strengths, growth areas, and biggest opportunity for rapid improvement in community health careers.",
    date: "February 15, 2026",
    category: "Assessment Tools",
    readTime: "9 min read",
  },
  {
    slug: "fqhc-vs-private-practice",
    title:
      "FQHC vs Private Practice: Which Is Right for Your Healthcare Career in California?",
    description:
      "Compare working at a Federally Qualified Health Center vs private practice or hospitals. Explore compensation, benefits, loan repayment, scope of practice, career growth, and cultural fit to find the right path for your community health career.",
    date: "February 15, 2026",
    category: "Career Guidance",
    readTime: "10 min read",
  },
  {
    slug: "top-10-fqhc-interview-questions",
    title: "Top 10 FQHC Interview Questions and How to Answer Them",
    description:
      "Prepare for your FQHC job interview with these common questions and expert answers. From ECM program knowledge to cultural competency, learn exactly what community health centers are looking for.",
    date: "February 14, 2026",
    category: "Interview Prep",
    readTime: "12 min read",
  },
  {
    slug: "nhsc-loan-repayment-guide",
    title: "NHSC Loan Repayment for FQHC Workers: Complete Guide",
    description:
      "Learn how the National Health Service Corps loan repayment program can pay off up to $50,000 of your student loans for working at an FQHC. Eligibility, application tips, and which California FQHCs qualify.",
    date: "February 14, 2026",
    category: "Benefits & Compensation",
    readTime: "10 min read",
  },
  {
    slug: "working-at-top-of-scope-fqhc",
    title: "Working at Top of Scope: How FQHCs Are Revolutionizing Patient Access",
    description:
      "Learn how FQHCs use team-based care to maximize provider scope of practice. Discover how RNs, MAs, and providers work together to increase patient access and reduce burnout while maintaining quality care.",
    date: "February 10, 2026",
    category: "Clinical Operations",
    readTime: "11 min read",
  },
  {
    slug: "fqhc-career-ladder-ma-rn-provider",
    title: "The FQHC MA, RN & Provider Career Ladder: How to Advance in Community Health",
    description:
      "Explore career advancement paths at FQHCs for MAs, RNs, and providers. Learn about progression opportunities, certifications that accelerate growth, salary ranges, and how bilingual skills unlock faster advancement.",
    date: "February 10, 2026",
    category: "Career Growth",
    readTime: "12 min read",
  },
  {
    slug: "how-to-write-fqhc-resume",
    title: "How to Write an FQHC Resume That Gets Noticed",
    description:
      "Your FQHC experience is valuable — but only if hiring managers can see it. Learn how to write a community health resume that highlights the programs, EHR systems, and competencies that FQHCs are looking for.",
    date: "February 7, 2026",
    category: "Career Resources",
    readTime: "7 min read",
  },
  {
    slug: "what-is-enhanced-care-management-ecm",
    title:
      "What Is Enhanced Care Management (ECM)? A Career Guide for Community Health Workers",
    description:
      "Enhanced Care Management is one of the fastest-growing programs at California FQHCs. Learn what ECM is, what roles it creates, what skills you need, and how to land an ECM job.",
    date: "February 5, 2026",
    category: "Career Resources",
    readTime: "10 min read",
  },
  {
    slug: "medi-cal-funding-cuts-community-health-workers",
    title:
      "Medi-Cal Funding Cuts: What Community Health Workers Need to Know in 2026",
    description:
      "California's Medi-Cal funding cuts are displacing thousands of community health workers at FQHCs statewide. Here's what happened, what it means for your career, and how to find your next role quickly.",
    date: "February 1, 2026",
    category: "Career Resources",
    readTime: "8 min read",
  },
];

export default function BlogPage() {
  const t = useTranslations("blog");

  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-br from-teal-50 via-teal-50 to-stone-50 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
            {t("title")}
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block bg-white rounded-xl border border-stone-200 p-8 hover:shadow-md transition-all hover:-translate-y-1"
              >
                <p className="text-sm text-teal-700 font-semibold mb-2">
                  {post.category}
                </p>
                <h2 className="text-2xl font-bold text-stone-900 mb-3">
                  {post.title}
                </h2>
                <p className="text-stone-600 leading-relaxed mb-4">
                  {post.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-stone-500">
                  <time>{post.date}</time>
                  <span>&middot;</span>
                  <span>{post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
