import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title:
    "FQHC Jobs in Riverside & San Bernardino | Inland Empire Health Center Careers",
  description:
    "Find FQHC jobs in the Inland Empire. Community health worker, care coordinator, behavioral health, and clinical positions at 20+ Federally Qualified Health Centers in Riverside and San Bernardino counties. Free for job seekers.",
  openGraph: {
    title: "FQHC Jobs in the Inland Empire",
    description:
      "Browse community health center jobs across Riverside and San Bernardino counties. 20+ FQHCs hiring now.",
    url: "https://fqhctalent.com/fqhc-jobs-riverside-san-bernardino",
  },
  alternates: {
    canonical: "https://fqhctalent.com/fqhc-jobs-riverside-san-bernardino",
  },
};

export default function FqhcJobsInlandEmpire() {
  return (
    <main className="min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://fqhctalent.com" },
          { name: "Jobs", url: "https://fqhctalent.com/jobs" },
          {
            name: "Inland Empire",
            url: "https://fqhctalent.com/fqhc-jobs-riverside-san-bernardino",
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
            →{" "}
            <Link href="/jobs" className="hover:text-stone-700">
              Jobs
            </Link>{" "}
            → Inland Empire
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
            FQHC Jobs in the Inland Empire
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed">
            The Inland Empire's rapidly growing FQHC network is expanding
            to meet the needs of one of California's fastest-growing
            regions. With 20+ Federally Qualified Health Centers across
            Riverside and San Bernardino counties, community health career
            opportunities are growing alongside the region's population.
          </p>
        </div>
      </section>

      {/* FQHC Landscape */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-stone-900 mb-8">
            The Inland Empire FQHC Landscape
          </h2>
          <div className="space-y-6 text-stone-700 text-lg leading-relaxed">
            <p>
              The Inland Empire's FQHC network includes organizations like
              Borrego Health, Inland Empire Health Plan partners, SAC Health,
              Desert Healthcare District, Riverside University Health System
              Community Health Centers, and Loma Linda University Health
              community clinics. These centers serve a population that has grown
              significantly in recent years as families relocate from LA and
              Orange County.
            </p>
            <p>
              The region spans from the western edge of Riverside County — just
              an hour from downtown LA — to the remote desert communities of
              eastern San Bernardino County. This geographic diversity creates
              demand for both urban clinic-based roles and mobile or
              telehealth-enabled positions serving rural and frontier areas.
            </p>
          </div>

          {/* In-Demand Roles */}
          <h3 className="text-2xl font-bold text-stone-900 mt-12 mb-6">
            Most In-Demand FQHC Roles in the Inland Empire
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                role: "Community Health Worker / Promotora",
                salary: "$38,000 – $52,000",
              },
              {
                role: "Care Coordinator (ECM/CCM)",
                salary: "$44,000 – $60,000",
              },
              {
                role: "Behavioral Health Specialist",
                salary: "$50,000 – $72,000",
              },
              {
                role: "Patient Navigator",
                salary: "$36,000 – $48,000",
              },
              {
                role: "Licensed Clinical Social Worker",
                salary: "$60,000 – $85,000",
              },
              {
                role: "EHR / IT Specialist",
                salary: "$55,000 – $78,000",
              },
              {
                role: "Registered Nurse",
                salary: "$70,000 – $102,000",
              },
              {
                role: "Nurse Practitioner / PA",
                salary: "$105,000 – $148,000",
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
            Key Programs Driving FQHC Hiring in the Inland Empire
          </h3>
          <div className="space-y-6 text-stone-700 text-lg leading-relaxed">
            <p>
              <strong>Enhanced Care Management (ECM)</strong> is expanding
              quickly across the Inland Empire as managed care plans contract
              with FQHCs to serve high-need Medi-Cal populations. New ECM
              programs are driving demand for care managers, community health
              workers, and outreach specialists who can serve patients across
              the region's sprawling geography.
            </p>
            <p>
              <strong>Community Supports</strong> programs are a growing area
              of FQHC activity in the Inland Empire, particularly housing
              navigation and medically tailored meals services. The
              region's affordable housing challenges are creating new roles
              that bridge healthcare and social services.
            </p>
            <p>
              <strong>Telehealth &amp; Mobile Health</strong> services are
              essential in the Inland Empire's vast geography, especially
              in eastern San Bernardino County where patients may live hours
              from the nearest clinic. FQHCs are hiring staff experienced in
              remote patient engagement and mobile clinic operations.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-teal-50 border border-teal-200 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-stone-900 mb-4">
              Looking for an FQHC Role in the Inland Empire?
            </h3>
            <p className="text-stone-600 mb-6 text-lg">
              Join FQHC Talent Exchange — it's completely free for job
              seekers. Get matched with Inland Empire community health centers
              in as little as 5 days.
            </p>
            <a
              href="/resume-builder"
              className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-8 py-4 text-lg font-semibold text-white hover:bg-teal-800 transition-colors"
            >
              Build Your Free Resume
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
              { name: "San Diego", slug: "san-diego" },
              { name: "Bay Area", slug: "san-francisco-bay-area" },
              { name: "Sacramento", slug: "sacramento" },
              { name: "Fresno / Central Valley", slug: "fresno" },
            ].map(({ name, slug }) => (
              <a
                key={slug}
                href={`/fqhc-jobs-${slug}`}
                className="bg-white rounded-lg p-4 text-center font-medium text-stone-700 hover:text-teal-700 hover:shadow-md transition-all"
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
