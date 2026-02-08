// app/blog/medi-cal-funding-cuts-community-health-workers/page.tsx

import type { Metadata } from "next";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title:
    "Medi-Cal Funding Cuts: What Community Health Workers Need to Know in 2026",
  description:
    "California's Medi-Cal funding cuts are displacing thousands of community health workers at FQHCs statewide. Here's what happened, what it means for your career, and how to find your next role quickly.",
  openGraph: {
    title: "Medi-Cal Funding Cuts: What Community Health Workers Need to Know",
    description:
      "California's Medi-Cal funding cuts are displacing thousands of CHWs. Here's what to do next.",
    url: "https://fqhctalent.com/blog/medi-cal-funding-cuts-community-health-workers",
    type: "article",
  },
  alternates: {
    canonical:
      "https://fqhctalent.com/blog/medi-cal-funding-cuts-community-health-workers",
  },
};

export default function MediCalFundingCutsArticle() {
  return (
    <main className="min-h-screen">
      <ArticleJsonLd
        title="Medi-Cal Funding Cuts: What Community Health Workers Need to Know in 2026"
        description="California's Medi-Cal funding cuts are displacing thousands of community health workers at FQHCs statewide. Here's what happened, what it means for your career, and how to find your next role quickly."
        datePublished="2026-02-01"
        slug="medi-cal-funding-cuts-community-health-workers"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://fqhctalent.com" },
          { name: "Blog", url: "https://fqhctalent.com/blog" },
          {
            name: "Medi-Cal Funding Cuts",
            url: "https://fqhctalent.com/blog/medi-cal-funding-cuts-community-health-workers",
          },
        ]}
      />

      <article className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-stone-500 mb-6">
            <a href="/" className="hover:text-stone-700">
              Home
            </a>{" "}
            →{" "}
            <a href="/blog" className="hover:text-stone-700">
              Blog
            </a>{" "}
            → Medi-Cal Funding Cuts
          </nav>

          {/* Header */}
          <header className="mb-12">
            <p className="text-teal-600 font-semibold mb-3">
              Career Resources
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6 leading-tight">
              Medi-Cal Funding Cuts: What Community Health Workers Need to Know
            </h1>
            <div className="flex items-center gap-4 text-stone-500">
              <time dateTime="2026-02-01">February 1, 2026</time>
              <span>·</span>
              <span>8 min read</span>
            </div>
          </header>

          {/* Article Body */}
          <div className="prose prose-lg prose-stone max-w-none">
            <p className="text-xl text-stone-600 leading-relaxed">
              If you&apos;re a community health worker, care coordinator, or
              outreach specialist who has been laid off — or is worried about
              being laid off — due to California&apos;s Medi-Cal funding cuts,
              you&apos;re not alone. Thousands of community health professionals
              across the state are facing the same uncertainty. Here&apos;s what
              you need to know, and what you can do right now.
            </p>

            <h2 className="text-2xl font-bold text-stone-900 mt-12 mb-4">
              What Happened
            </h2>
            <p className="text-stone-700 leading-relaxed">
              California&apos;s Medi-Cal program — which covers over 15 million
              residents — has undergone significant funding adjustments that
              directly impact Federally Qualified Health Centers (FQHCs) and
              other safety-net providers. These changes have reduced revenue for
              programs that many FQHCs depended on to fund community health
              worker positions, care coordination teams, and outreach programs.
            </p>
            <p className="text-stone-700 leading-relaxed">
              The result: layoffs at community health organizations across the
              state, disproportionately affecting frontline workers — the
              community health workers, promotoras, patient navigators, and care
              coordinators who serve as the bridge between clinics and the
              communities they serve.
            </p>

            <h2 className="text-2xl font-bold text-stone-900 mt-12 mb-4">
              Who Is Being Affected
            </h2>
            <p className="text-stone-700 leading-relaxed">
              The workers most impacted are those in grant-funded or
              program-specific positions — particularly roles tied to Enhanced
              Care Management (ECM), Community Supports, and other CalAIM
              initiatives where funding flows through managed care plans. When a
              health plan reduces its contracted rates or an FQHC loses a managed
              care contract, the positions funded by that revenue are often the
              first to go.
            </p>
            <p className="text-stone-700 leading-relaxed">
              This workforce is predominantly Latino, bilingual, and
              community-rooted. Many community health workers come from the same
              neighborhoods as their patients. When they lose their positions, the
              impact extends far beyond one job — it disrupts trust-based
              relationships that took years to build.
            </p>

            <h2 className="text-2xl font-bold text-stone-900 mt-12 mb-4">
              The Disconnect: Layoffs and Open Positions Exist Simultaneously
            </h2>
            <p className="text-stone-700 leading-relaxed">
              Here&apos;s what most people don&apos;t realize: while some FQHCs
              are cutting staff, others are actively hiring for the exact same
              roles. The community health workforce is not shrinking — it&apos;s
              being displaced. An experienced ECM care coordinator who gets laid
              off in one county may be exactly what an FQHC two counties over is
              desperately searching for.
            </p>
            <p className="text-stone-700 leading-relaxed">
              The problem is that these workers and these opportunities
              aren&apos;t finding each other. Generic job boards don&apos;t
              understand the specificity of FQHC roles. They don&apos;t filter
              by EHR system (OCHIN Epic vs. NextGen vs. eClinicalWorks), by
              program experience (ECM, CCM, Community Supports), or by the
              cultural and linguistic competencies that are essential in community
              health.
            </p>

            <h2 className="text-2xl font-bold text-stone-900 mt-12 mb-4">
              What You Can Do Right Now
            </h2>

            <h3 className="text-xl font-semibold text-stone-800 mt-8 mb-3">
              1. Update Your Resume with FQHC-Specific Language
            </h3>
            <p className="text-stone-700 leading-relaxed">
              Your experience with ECM, CCM, Community Supports, OCHIN Epic,
              PPS billing, UDS reporting, and other FQHC-specific competencies
              is incredibly valuable — but only if hiring managers can see it on
              your resume. Use the specific program names and acronyms that FQHC
              HR teams search for. List the EHR systems you&apos;ve used. Quantify
              your panel size, outreach numbers, and any outcomes you contributed
              to.
            </p>

            <h3 className="text-xl font-semibold text-stone-800 mt-8 mb-3">
              2. Look Beyond Your Current County
            </h3>
            <p className="text-stone-700 leading-relaxed">
              FQHC hiring is regional and uneven. A county that&apos;s cutting
              positions may border a county that&apos;s expanding. Be open to
              opportunities across California — many FQHCs in the Central Valley,
              Inland Empire, and Sacramento region are actively growing their
              community health teams.
            </p>

            <h3 className="text-xl font-semibold text-stone-800 mt-8 mb-3">
              3. Highlight Revenue-Generating Program Experience
            </h3>
            <p className="text-stone-700 leading-relaxed">
              FQHCs that are hiring right now are often doing so because they
              have revenue-generating programs that need staff. If you have
              experience with ECM, CCM, Transitional Care Management (TCM),
              Behavioral Health – Administrative Services Organization (BH-ASO),
              or Community Supports, that experience is your strongest selling
              point. These programs generate direct revenue for FQHCs, and
              candidates who can contribute to them from day one are in high
              demand.
            </p>

            <h3 className="text-xl font-semibold text-stone-800 mt-8 mb-3">
              4. Get Specialized Placement Support
            </h3>
            <p className="text-stone-700 leading-relaxed">
              This is exactly why FQHC Talent Exchange exists. We connect
              displaced community health workers with FQHCs that are actively
              hiring — for free. We understand the roles, the programs, and the
              EHR systems. We don&apos;t just list jobs — we advocate for
              candidates and make direct introductions to hiring managers. Our
              goal is to get you in front of the right employer within 5 days.
            </p>

            <h2 className="text-2xl font-bold text-stone-900 mt-12 mb-4">
              Looking Ahead
            </h2>
            <p className="text-stone-700 leading-relaxed">
              The demand for community health workers isn&apos;t going away.
              California continues to invest in CalAIM, population health, and
              whole-person care models that depend on community-based
              workforces. The current disruption is painful, but the long-term
              trajectory for community health careers is strong. The challenge
              right now is bridging the gap — getting displaced workers connected
              with the organizations that need them, as quickly as possible.
            </p>
            <p className="text-stone-700 leading-relaxed">
              That&apos;s what we&apos;re here for.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-16 bg-teal-50 border border-teal-200 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-stone-900 mb-4">
              Were You Affected by FQHC Layoffs?
            </h3>
            <p className="text-stone-600 mb-6 text-lg">
              Join FQHC Talent Exchange — completely free for job seekers. Get
              matched with FQHCs that are actively hiring for your exact skills.
            </p>
            <a
              href="/join"
              className="inline-flex items-center justify-center rounded-lg bg-teal-600 px-8 py-4 text-lg font-semibold text-white hover:bg-teal-700 transition-colors"
            >
              Apply for Early Access
            </a>
          </div>

          {/* Related Articles */}
          <div className="mt-16">
            <h3 className="text-xl font-bold text-stone-900 mb-6">
              Related Articles
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="/blog/what-is-enhanced-care-management-ecm"
                className="bg-stone-50 rounded-lg p-6 hover:shadow-md transition-all"
              >
                <p className="text-sm text-teal-600 mb-2">Career Resources</p>
                <h4 className="font-semibold text-stone-900">
                  What Is Enhanced Care Management (ECM)? A Career Guide
                </h4>
              </a>
              <a
                href="/blog/how-to-write-fqhc-resume"
                className="bg-stone-50 rounded-lg p-6 hover:shadow-md transition-all"
              >
                <p className="text-sm text-teal-600 mb-2">Career Resources</p>
                <h4 className="font-semibold text-stone-900">
                  How to Write an FQHC Resume That Gets Noticed
                </h4>
              </a>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
