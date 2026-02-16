// app/fqhc-jobs-los-angeles/page.tsx
// Create one of these for each California metro area
// Copy and customize for: san-diego, san-francisco-bay-area, sacramento, fresno, riverside-san-bernardino

import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "FQHC Jobs in Los Angeles | Community Health Center Careers in LA",
  description:
    "Find FQHC jobs in Los Angeles County. Community health worker, care coordinator, behavioral health, and clinical positions at 70+ Federally Qualified Health Centers across LA. Free for job seekers.",
  openGraph: {
    title: "FQHC Jobs in Los Angeles",
    description:
      "Browse community health center jobs across Los Angeles County. 70+ FQHCs hiring now.",
    url: "https://www.fqhctalent.com/fqhc-jobs-los-angeles",
  },
  alternates: {
    canonical: "https://www.fqhctalent.com/fqhc-jobs-los-angeles",
  },
};

export default function FqhcJobsLosAngeles() {
  return (
    <main className="min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.fqhctalent.com" },
          { name: "Jobs", url: "https://www.fqhctalent.com/jobs" },
          {
            name: "Los Angeles",
            url: "https://www.fqhctalent.com/fqhc-jobs-los-angeles",
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
            → Los Angeles
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
            FQHC Jobs in Los Angeles
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed">
            Los Angeles County has the highest concentration of Federally
            Qualified Health Centers in California, with over 70 organizations
            operating more than 350 clinic sites. These community health centers
            serve over 1.5 million patients annually — many of them uninsured or
            enrolled in Medi-Cal.
          </p>
        </div>
      </section>

      {/* LA FQHC Landscape */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-stone-900 mb-8">
            The Los Angeles FQHC Landscape
          </h2>
          <div className="space-y-6 text-stone-700 text-lg leading-relaxed">
            <p>
              LA County's FQHC network is one of the largest in the nation.
              Major health centers include AltaMed Health Services, APLA Health,
              Community Health Alliance of Pasadena (ChapCare), Eisner Health,
              JWCH Institute, Los Angeles Christian Health Centers, Northeast
              Valley Health Corporation, South Central Family Health Center,
              St. John's Community Health, T.H.E. Health and Wellness
              Centers, and dozens more across the county.
            </p>
            <p>
              These organizations are actively hiring for roles across Enhanced
              Care Management (ECM), Chronic Care Management (CCM), Community
              Supports, behavioral health integration, and primary care. The
              demand for bilingual (Spanish-English) community health workers and
              care coordinators is particularly high in East LA, South LA, and the
              San Fernando Valley.
            </p>
          </div>

          {/* In-Demand Roles */}
          <h3 className="text-2xl font-bold text-stone-900 mt-12 mb-6">
            Most In-Demand FQHC Roles in Los Angeles
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                role: "Community Health Worker / Promotora",
                salary: "$42,000 – $58,000",
              },
              {
                role: "Care Coordinator (ECM/CCM)",
                salary: "$48,000 – $65,000",
              },
              {
                role: "Behavioral Health Specialist",
                salary: "$55,000 – $78,000",
              },
              {
                role: "Patient Navigator",
                salary: "$40,000 – $52,000",
              },
              {
                role: "Licensed Clinical Social Worker",
                salary: "$65,000 – $90,000",
              },
              {
                role: "EHR / IT Specialist (OCHIN Epic)",
                salary: "$60,000 – $85,000",
              },
              {
                role: "Registered Nurse",
                salary: "$75,000 – $110,000",
              },
              {
                role: "Nurse Practitioner / PA",
                salary: "$110,000 – $155,000",
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
            Key Programs Driving FQHC Hiring in LA
          </h3>
          <div className="space-y-6 text-stone-700 text-lg leading-relaxed">
            <p>
              <strong>Enhanced Care Management (ECM)</strong> is the largest
              driver of new FQHC positions in LA County. ECM programs require
              dedicated care managers, community health workers, and outreach
              specialists to serve high-need Medi-Cal members. FQHCs that have
              successfully launched ECM programs are generating significant
              revenue while improving patient outcomes.
            </p>
            <p>
              <strong>Community Supports</strong> — including housing navigation,
              medically tailored meals, and sobering centers — are creating new
              roles at LA FQHCs that blend social work with healthcare delivery.
              Experience in these programs is increasingly valued by hiring
              managers.
            </p>
            <p>
              <strong>Behavioral Health Integration</strong> continues to expand
              across LA's community health centers, with growing demand for
              licensed therapists, substance use counselors, and psychiatric
              nurse practitioners who can work in integrated primary care
              settings.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-teal-50 border border-teal-200 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-stone-900 mb-4">
              Looking for an FQHC Role in Los Angeles?
            </h3>
            <p className="text-stone-600 mb-6 text-lg">
              Join FQHC Talent Exchange — it's completely free for job
              seekers. Get matched with LA-area community health centers in as
              little as 5 days.
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
              { name: "San Diego", slug: "san-diego" },
              { name: "Bay Area", slug: "san-francisco-bay-area" },
              { name: "Sacramento", slug: "sacramento" },
              { name: "Fresno / Central Valley", slug: "fresno" },
              {
                name: "Inland Empire",
                slug: "riverside-san-bernardino",
              },
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
