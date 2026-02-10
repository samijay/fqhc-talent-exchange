import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "FQHC Jobs in San Diego | Community Health Center Careers",
  description:
    "Find FQHC jobs in San Diego County. Community health worker, care coordinator, behavioral health, and clinical positions at 15+ Federally Qualified Health Centers. Free for job seekers.",
  openGraph: {
    title: "FQHC Jobs in San Diego",
    description:
      "Browse community health center jobs across San Diego County. 15+ FQHCs hiring now.",
    url: "https://fqhctalent.com/fqhc-jobs-san-diego",
  },
  alternates: {
    canonical: "https://fqhctalent.com/fqhc-jobs-san-diego",
  },
};

export default function FqhcJobsSanDiego() {
  return (
    <main className="min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://fqhctalent.com" },
          { name: "Jobs", url: "https://fqhctalent.com/jobs" },
          {
            name: "San Diego",
            url: "https://fqhctalent.com/fqhc-jobs-san-diego",
          },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-50 via-teal-50 to-stone-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-stone-500 mb-6">
            <Link href="/" className="hover:text-stone-700">
              Home
            </Link>{" "}
            &rarr;{" "}
            <Link href="/jobs" className="hover:text-stone-700">
              Jobs
            </Link>{" "}
            &rarr; San Diego
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
            FQHC Jobs in San Diego
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed">
            San Diego County&apos;s Federally Qualified Health Centers serve
            diverse border communities with specialized programs in behavioral
            health, chronic disease management, and integrated primary care.
            With 15+ FQHCs operating across the county, opportunities span from
            downtown San Diego to the U.S.–Mexico border region.
          </p>
        </div>
      </section>

      {/* FQHC Landscape */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-stone-900 mb-8">
            The San Diego FQHC Landscape
          </h2>
          <div className="space-y-6 text-stone-700 text-lg leading-relaxed">
            <p>
              San Diego&apos;s FQHC network includes major organizations like
              Family Health Centers of San Diego, La Maestra Community Health
              Centers, San Ysidro Health, Neighborhood Healthcare, and Vista
              Community Clinic. These centers serve hundreds of thousands of
              patients across urban, suburban, and border communities.
            </p>
            <p>
              The region&apos;s proximity to the U.S.–Mexico border creates
              unique workforce needs. Bilingual (Spanish-English) community
              health workers and patient navigators are in especially high
              demand, as are professionals experienced with cross-border health
              issues, immigration-related social determinants of health, and
              culturally competent care delivery.
            </p>
          </div>

          {/* In-Demand Roles */}
          <h3 className="text-2xl font-bold text-stone-900 mt-12 mb-6">
            Most In-Demand FQHC Roles in San Diego
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                role: "Community Health Worker / Promotora",
                salary: "$40,000 – $55,000",
              },
              {
                role: "Care Coordinator (ECM/CCM)",
                salary: "$46,000 – $62,000",
              },
              {
                role: "Behavioral Health Specialist",
                salary: "$52,000 – $75,000",
              },
              {
                role: "Patient Navigator",
                salary: "$38,000 – $50,000",
              },
              {
                role: "Licensed Clinical Social Worker",
                salary: "$62,000 – $88,000",
              },
              {
                role: "EHR / IT Specialist",
                salary: "$58,000 – $82,000",
              },
              {
                role: "Registered Nurse",
                salary: "$72,000 – $105,000",
              },
              {
                role: "Nurse Practitioner / PA",
                salary: "$105,000 – $150,000",
              },
            ].map(({ role, salary }) => (
              <div
                key={role}
                className="bg-stone-50 rounded-lg p-4 flex justify-between items-center"
              >
                <span className="font-medium text-stone-900">{role}</span>
                <span className="text-sm text-stone-500">{salary}</span>
              </div>
            ))}
          </div>

          {/* Programs */}
          <h3 className="text-2xl font-bold text-stone-900 mt-12 mb-6">
            Key Programs Driving FQHC Hiring in San Diego
          </h3>
          <div className="space-y-6 text-stone-700 text-lg leading-relaxed">
            <p>
              <strong>Enhanced Care Management (ECM)</strong> is expanding
              rapidly across San Diego&apos;s FQHCs, with programs targeting
              high-need Medi-Cal members including those experiencing
              homelessness, individuals with serious mental illness, and
              patients with multiple chronic conditions.
            </p>
            <p>
              <strong>Behavioral Health Integration</strong> is a major focus
              in San Diego County, with FQHCs hiring licensed therapists,
              substance use counselors, and psychiatric providers to embed
              mental health services in primary care settings.
            </p>
            <p>
              <strong>Community Supports</strong> programs — including housing
              navigation and medically supportive food — are creating new roles
              that combine social work skills with healthcare delivery,
              particularly in underserved neighborhoods along the border region.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-teal-50 border border-teal-200 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-stone-900 mb-4">
              Looking for an FQHC Role in San Diego?
            </h3>
            <p className="text-stone-600 mb-6 text-lg">
              Join FQHC Talent Exchange — it&apos;s completely free for job
              seekers. Get matched with San Diego-area community health centers
              in as little as 5 days.
            </p>
            <a
              href="/join"
              className="inline-flex items-center justify-center rounded-lg bg-teal-600 px-8 py-4 text-lg font-semibold text-white hover:bg-teal-700 transition-colors"
            >
              Apply for Early Access
            </a>
          </div>
        </div>
      </section>

      {/* Other Locations */}
      <section className="bg-stone-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-stone-900 mb-6">
            FQHC Jobs in Other California Regions
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: "Los Angeles", slug: "los-angeles" },
              { name: "Bay Area", slug: "san-francisco-bay-area" },
              { name: "Sacramento", slug: "sacramento" },
              { name: "Fresno / Central Valley", slug: "fresno" },
              { name: "Inland Empire", slug: "riverside-san-bernardino" },
            ].map(({ name, slug }) => (
              <a
                key={slug}
                href={`/fqhc-jobs-${slug}`}
                className="bg-white rounded-lg p-4 text-center font-medium text-stone-700 hover:text-teal-600 hover:shadow-md transition-all"
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
