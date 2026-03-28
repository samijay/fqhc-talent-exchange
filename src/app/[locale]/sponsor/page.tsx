"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, Users, Mail, Target, Shield, CheckCircle2 } from "lucide-react";

export default function SponsorPage() {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-100">
      {/* Hero */}
      <section className="relative px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-teal-900/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-400">
            Sponsor Opportunities
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Reach California&apos;s FQHC Decision-Makers
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-stone-500">
            FQHC Talent Exchange is the only intelligence platform tracking policy, funding,
            AI adoption, and workforce data for California&apos;s 215+ community health centers.
            Our weekly Intel Brief reaches the CEOs, CFOs, and HR directors making technology
            and staffing decisions.
          </p>
        </div>
      </section>

      {/* Audience Stats */}
      <section className="border-t border-stone-800 bg-stone-900/50 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-center text-sm font-bold uppercase tracking-wider text-teal-400">
            Our Audience
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Users, label: "FQHC Organizations", value: "214+", sub: "All California FQHCs covered" },
              { icon: BarChart3, label: "Intel Items Tracked", value: "139+", sub: "Primary sources for every claim" },
              { icon: Target, label: "FQHC Jobs Monitored", value: "1,634", sub: "Across 30+ organizations" },
              { icon: Mail, label: "Weekly Intel Brief", value: "Every Tuesday", sub: "Executive-level policy intelligence" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border border-stone-800 bg-stone-900 p-6 text-center">
                <stat.icon className="mx-auto mb-3 h-6 w-6 text-teal-500" />
                <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                <p className="mt-1 text-sm font-semibold text-stone-300">{stat.label}</p>
                <p className="mt-1 text-xs text-stone-500">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Reads This */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">
            Who Reads the Intel Brief
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { role: "CEOs & Executive Directors", desc: "Strategic planning and board preparation" },
              { role: "CFOs & Finance Directors", desc: "Funding cliffs, revenue modeling, 340B" },
              { role: "HR Directors & CHROs", desc: "Workforce trends, salary data, hiring strategy" },
              { role: "CMOs & Clinical Leaders", desc: "AI adoption, scope-of-practice, quality" },
              { role: "COOs & Operations", desc: "OKRs, case studies, process optimization" },
              { role: "IT Directors & CIOs", desc: "EHR decisions, AI vendor evaluation" },
            ].map((item) => (
              <div key={item.role} className="rounded-lg border border-stone-800 p-4">
                <p className="font-semibold text-white">{item.role}</p>
                <p className="mt-1 text-sm text-stone-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Options */}
      <section className="border-t border-stone-800 bg-stone-900/50 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center text-2xl font-bold text-white">
            Sponsorship Options
          </h2>
          <p className="mb-10 text-center text-stone-500">
            All sponsorships include your brand, message, and CTA in front of FQHC decision-makers.
          </p>
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Newsletter Sponsor */}
            <div className="rounded-xl border-2 border-teal-700 bg-stone-900 p-6">
              <span className="mb-2 inline-block rounded bg-teal-900/50 px-2 py-0.5 text-xs font-bold uppercase text-teal-400">
                Most Popular
              </span>
              <h3 className="text-xl font-bold text-white">Intel Brief Sponsor</h3>
              <p className="mt-2 text-sm text-stone-500">
                Your brand featured in our weekly executive intelligence briefing, sent to FQHC
                CEOs, CFOs, and HR directors every Tuesday.
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  "Branded section in Intel Brief email",
                  "150-word message + CTA link",
                  "\"Sponsored by\" badge with your logo",
                  "Delivered to all subscribers",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-stone-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-center">
                <span className="text-3xl font-extrabold text-white">$500</span>
                <span className="text-stone-500"> / issue</span>
              </p>
            </div>

            {/* Vendor Listing */}
            <div className="rounded-xl border border-stone-700 bg-stone-900 p-6">
              <h3 className="text-xl font-bold text-white">AI Tracker Listing</h3>
              <p className="mt-2 text-sm text-stone-500">
                Enhanced vendor profile on our AI Implementation Tracker — the buying guide
                FQHC executives use when evaluating health tech vendors.
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  "Verified vendor badge",
                  "Detailed product profile",
                  "EHR compatibility matrix placement",
                  "\"Request Demo\" lead capture button",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-stone-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-center">
                <span className="text-3xl font-extrabold text-white">$500</span>
                <span className="text-stone-500"> / month</span>
              </p>
            </div>

            {/* Sponsored Content */}
            <div className="rounded-xl border border-stone-700 bg-stone-900 p-6">
              <h3 className="text-xl font-bold text-white">Sponsored Content</h3>
              <p className="mt-2 text-sm text-stone-500">
                Co-branded article, case study, or webinar promoted across our platform
                and Intel Brief — positioned as thought leadership, not advertising.
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  "Co-branded article or case study",
                  "Promoted in Intel Brief + site",
                  "Permanent placement on platform",
                  "Webinar option with vendor presentation",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-stone-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-center">
                <span className="text-3xl font-extrabold text-white">$2,000</span>
                <span className="text-stone-500"> / piece</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Highlights */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">
            What Makes Our Audience Unique
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Shield,
                title: "FQHC-Only Focus",
                desc: "Not general healthcare — we exclusively serve the community health center sector. Every reader works at or with an FQHC.",
              },
              {
                icon: Target,
                title: "Decision-Maker Audience",
                desc: "CEOs, CFOs, HR Directors, CMOs — the people who choose vendors, approve budgets, and sign contracts.",
              },
              {
                icon: BarChart3,
                title: "Primary-Source Intelligence",
                desc: "Every claim in the Intel Brief links to a primary source. Our readers trust us because we don't make things up.",
              },
              {
                icon: Users,
                title: "California Market Leader",
                desc: "215+ FQHCs profiled with resilience scores, strategic reports, and regional intelligence. National expansion planned for 2026.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-stone-800 bg-stone-900/50 p-5">
                <item.icon className="mb-2 h-5 w-5 text-teal-500" />
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-stone-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-stone-800 bg-stone-900/50 px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-white">
            Ready to Reach FQHC Leaders?
          </h2>
          <p className="mt-4 text-stone-500">
            Email us to discuss sponsorship options, get a media kit, or request a sample Intel Brief.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="mailto:hello@fqhctalent.com?subject=Intel Brief Sponsorship Inquiry"
              className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-6 py-3 font-semibold text-white transition hover:bg-teal-600"
            >
              <Mail className="h-4 w-4" />
              hello@fqhctalent.com
            </a>
            <Link
              href="/ai-tracker"
              className="inline-flex items-center gap-1 text-sm font-medium text-teal-400 transition hover:text-teal-300"
            >
              See the AI Tracker <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-6 text-xs text-stone-600">
            FQHC Talent Exchange · fqhctalent.com · Los Angeles, CA
          </p>
        </div>
      </section>
    </main>
  );
}
