import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title:
    "FQHC Jobs in Fresno & Central Valley | Community Health Center Careers",
  description:
    "Find FQHC jobs in Fresno and the Central Valley. Community health worker, promotora, care coordinator, and clinical positions at 15+ Federally Qualified Health Centers. Free for job seekers.",
  openGraph: {
    title: "FQHC Jobs in Fresno & Central Valley",
    description:
      "Browse community health center jobs across the Central Valley. 15+ FQHCs hiring now.",
    url: "https://fqhctalent.com/fqhc-jobs-fresno",
  },
  alternates: {
    canonical: "https://fqhctalent.com/fqhc-jobs-fresno",
  },
};

export default function FqhcJobsFresno() {
  return (
    <main className="min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://fqhctalent.com" },
          { name: "Jobs", url: "https://fqhctalent.com/jobs" },
          {
            name: "Fresno / Central Valley",
            url: "https://fqhctalent.com/fqhc-jobs-fresno",
          },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-50 via-teal-50 to-stone-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-stone-500 mb-6">
            <a href="/" className="hover:text-stone-700">
              Home
            </a>{" "}
            &rarr;{" "}
            <a href="/jobs" className="hover:text-stone-700">
              Jobs
            </a>{" "}
            &rarr; Fresno / Central Valley
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
            FQHC Jobs in Fresno &amp; the Central Valley
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed">
            The Central Valley&apos;s FQHCs serve California&apos;s
            agricultural heartland, providing essential healthcare to farming
            communities, migrant workers, and underserved rural populations.
            With 15+ FQHCs across the region, demand for bilingual community
            health workers and promotoras is among the highest in the state.
          </p>
        </div>
      </section>

      {/* FQHC Landscape */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-stone-900 mb-8">
            The Central Valley FQHC Landscape
          </h2>
          <div className="space-y-6 text-stone-700 text-lg leading-relaxed">
            <p>
              The Central Valley&apos;s FQHC network includes organizations
              like Clinica Sierra Vista, United Health Centers of the San
              Joaquin Valley, Family Healthcare Network, Camarena Health, and
              Golden Valley Health Centers. These health centers operate across
              a vast geographic area stretching from Bakersfield to Stockton,
              serving some of California&apos;s most medically underserved
              communities.
            </p>
            <p>
              Agricultural communities in the Central Valley face unique health
              challenges including pesticide exposure, heat-related illness, and
              limited access to specialty care. FQHCs in this region rely
              heavily on promotoras and community health workers who understand
              the cultural context of farmworker communities and can deliver
              outreach in Spanish, Mixteco, and other indigenous languages.
            </p>
          </div>

          {/* In-Demand Roles */}
          <h3 className="text-2xl font-bold text-stone-900 mt-12 mb-6">
            Most In-Demand FQHC Roles in the Central Valley
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                role: "Community Health Worker / Promotora",
                salary: "$36,000 – $50,000",
              },
              {
                role: "Care Coordinator (ECM/CCM)",
                salary: "$42,000 – $58,000",
              },
              {
                role: "Behavioral Health Specialist",
                salary: "$48,000 – $68,000",
              },
              {
                role: "Patient Navigator",
                salary: "$35,000 – $46,000",
              },
              {
                role: "Licensed Clinical Social Worker",
                salary: "$58,000 – $82,000",
              },
              {
                role: "EHR / IT Specialist",
                salary: "$52,000 – $75,000",
              },
              {
                role: "Registered Nurse",
                salary: "$68,000 – $98,000",
              },
              {
                role: "Nurse Practitioner / PA",
                salary: "$100,000 – $145,000",
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
            Key Programs Driving FQHC Hiring in the Central Valley
          </h3>
          <div className="space-y-6 text-stone-700 text-lg leading-relaxed">
            <p>
              <strong>Enhanced Care Management (ECM)</strong> is creating new
              positions across Central Valley FQHCs, particularly for
              community health workers who can conduct home visits and
              community outreach in rural areas where patients often face
              transportation barriers to clinic-based care.
            </p>
            <p>
              <strong>Farmworker Health Programs</strong> are a defining
              feature of Central Valley FQHCs. Seasonal and year-round
              agricultural health programs require bilingual outreach workers,
              environmental health educators, and mobile clinic staff who can
              meet workers where they are.
            </p>
            <p>
              <strong>Chronic Disease Management</strong> programs addressing
              diabetes, hypertension, and obesity are expanding rapidly, driven
              by high rates of chronic conditions in the region&apos;s
              underserved populations. FQHCs need care coordinators and health
              educators with experience in culturally tailored prevention
              programs.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-teal-50 border border-teal-200 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-stone-900 mb-4">
              Looking for an FQHC Role in the Central Valley?
            </h3>
            <p className="text-stone-600 mb-6 text-lg">
              Join FQHC Talent Exchange — it&apos;s completely free for job
              seekers. Get matched with Central Valley community health centers
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
              { name: "San Diego", slug: "san-diego" },
              { name: "Bay Area", slug: "san-francisco-bay-area" },
              { name: "Sacramento", slug: "sacramento" },
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
