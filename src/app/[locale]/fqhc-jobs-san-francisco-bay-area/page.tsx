import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title:
    "FQHC Jobs in San Francisco Bay Area | Community Health Center Careers",
  description:
    "Find FQHC jobs in the San Francisco Bay Area. Community health worker, care coordinator, behavioral health, and clinical positions at 40+ Federally Qualified Health Centers. Free for job seekers.",
  openGraph: {
    title: "FQHC Jobs in San Francisco Bay Area",
    description:
      "Browse community health center jobs across the Bay Area. 40+ FQHCs hiring now.",
    url: "https://fqhctalent.com/fqhc-jobs-san-francisco-bay-area",
  },
  alternates: {
    canonical: "https://fqhctalent.com/fqhc-jobs-san-francisco-bay-area",
  },
};

export default function FqhcJobsBayArea() {
  return (
    <main className="min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://fqhctalent.com" },
          { name: "Jobs", url: "https://fqhctalent.com/jobs" },
          {
            name: "Bay Area",
            url: "https://fqhctalent.com/fqhc-jobs-san-francisco-bay-area",
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
            &rarr; Bay Area
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
            FQHC Jobs in the San Francisco Bay Area
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed">
            The Bay Area&apos;s 40+ Federally Qualified Health Centers span San
            Francisco, Oakland, San Jose, and surrounding communities, serving
            some of California&apos;s most diverse patient populations. From
            Marin County to Silicon Valley, FQHCs are hiring across clinical,
            care coordination, and community outreach roles.
          </p>
        </div>
      </section>

      {/* FQHC Landscape */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-stone-900 mb-8">
            The Bay Area FQHC Landscape
          </h2>
          <div className="space-y-6 text-stone-700 text-lg leading-relaxed">
            <p>
              The Bay Area hosts a dense network of community health centers
              including LifeLong Medical Care, Asian Health Services, La
              Cl&iacute;nica de La Raza, North East Medical Services (NEMS),
              Ravenswood Family Health Network, Gardner Health Services, and San
              Francisco Community Health Center. These organizations serve
              multilingual communities speaking Cantonese, Mandarin, Spanish,
              Vietnamese, Tagalog, and dozens of other languages.
            </p>
            <p>
              The region&apos;s high cost of living creates unique recruitment
              challenges for FQHCs, making competitive salaries and benefits
              packages essential. Many Bay Area health centers offer loan
              repayment programs, housing assistance, and other incentives to
              attract and retain qualified staff.
            </p>
          </div>

          {/* In-Demand Roles */}
          <h3 className="text-2xl font-bold text-stone-900 mt-12 mb-6">
            Most In-Demand FQHC Roles in the Bay Area
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                role: "Community Health Worker / Promotora",
                salary: "$48,000 – $65,000",
              },
              {
                role: "Care Coordinator (ECM/CCM)",
                salary: "$55,000 – $72,000",
              },
              {
                role: "Behavioral Health Specialist",
                salary: "$60,000 – $85,000",
              },
              {
                role: "Patient Navigator",
                salary: "$45,000 – $58,000",
              },
              {
                role: "Licensed Clinical Social Worker",
                salary: "$72,000 – $100,000",
              },
              {
                role: "EHR / IT Specialist (OCHIN Epic)",
                salary: "$68,000 – $95,000",
              },
              {
                role: "Registered Nurse",
                salary: "$85,000 – $125,000",
              },
              {
                role: "Nurse Practitioner / PA",
                salary: "$125,000 – $175,000",
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
            Key Programs Driving FQHC Hiring in the Bay Area
          </h3>
          <div className="space-y-6 text-stone-700 text-lg leading-relaxed">
            <p>
              <strong>Enhanced Care Management (ECM)</strong> programs in the
              Bay Area focus heavily on individuals experiencing homelessness
              and those with serious mental health conditions — reflecting the
              region&apos;s acute housing and behavioral health challenges.
              FQHCs are hiring care managers and outreach workers with
              street-level experience.
            </p>
            <p>
              <strong>Behavioral Health Integration</strong> is a top priority
              across Bay Area FQHCs, with growing demand for bilingual
              therapists, psychiatric nurse practitioners, and substance use
              counselors who can serve in integrated primary care settings.
            </p>
            <p>
              <strong>Language Access</strong> drives unique hiring needs in the
              Bay Area. FQHCs actively recruit staff who speak Cantonese,
              Mandarin, Vietnamese, Tagalog, and other Asian and Pacific
              Islander languages in addition to Spanish-English bilingual
              providers.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-teal-50 border border-teal-200 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-stone-900 mb-4">
              Looking for an FQHC Role in the Bay Area?
            </h3>
            <p className="text-stone-600 mb-6 text-lg">
              Join FQHC Talent Exchange — it&apos;s completely free for job
              seekers. Get matched with Bay Area community health centers in as
              little as 5 days.
            </p>
            <a
              href="/join"
              className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-8 py-4 text-lg font-semibold text-white hover:bg-teal-800 transition-colors"
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
              { name: "San Diego", slug: "san-diego" },
              { name: "Sacramento", slug: "sacramento" },
              { name: "Fresno / Central Valley", slug: "fresno" },
              { name: "Inland Empire", slug: "riverside-san-bernardino" },
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
