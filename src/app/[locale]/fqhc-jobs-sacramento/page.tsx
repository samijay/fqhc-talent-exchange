import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "FQHC Jobs in Sacramento | Community Health Center Careers",
  description:
    "Find FQHC jobs in the Sacramento region. Community health worker, care coordinator, behavioral health, and clinical positions at 10+ Federally Qualified Health Centers. Free for job seekers.",
  openGraph: {
    title: "FQHC Jobs in Sacramento",
    description:
      "Browse community health center jobs in the Sacramento region. 10+ FQHCs hiring now.",
    url: "https://fqhctalent.com/fqhc-jobs-sacramento",
  },
  alternates: {
    canonical: "https://fqhctalent.com/fqhc-jobs-sacramento",
  },
};

export default function FqhcJobsSacramento() {
  return (
    <main className="min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://fqhctalent.com" },
          { name: "Jobs", url: "https://fqhctalent.com/jobs" },
          {
            name: "Sacramento",
            url: "https://fqhctalent.com/fqhc-jobs-sacramento",
          },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-violet-50 via-violet-50 to-stone-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-stone-500 mb-6">
            <Link href="/" className="hover:text-stone-700">
              Home
            </Link>{" "}
            &rarr;{" "}
            <Link href="/jobs" className="hover:text-stone-700">
              Jobs
            </Link>{" "}
            &rarr; Sacramento
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
            FQHC Jobs in Sacramento
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed">
            Sacramento&apos;s Federally Qualified Health Centers serve the
            capital region with growing programs in Enhanced Care Management,
            behavioral health integration, and chronic disease management. With
            10+ FQHCs and expanding community health infrastructure,
            Sacramento offers strong career opportunities for mission-driven
            health professionals.
          </p>
        </div>
      </section>

      {/* FQHC Landscape */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-stone-900 mb-8">
            The Sacramento FQHC Landscape
          </h2>
          <div className="space-y-6 text-stone-700 text-lg leading-relaxed">
            <p>
              Sacramento&apos;s FQHC network includes organizations like
              WellSpace Health, Sacramento Native American Health Center, Elica
              Health Centers, CommuniCare Health Centers, and One Community
              Health. These centers serve a diverse patient population across
              urban Sacramento, suburban communities, and surrounding rural
              areas.
            </p>
            <p>
              As California&apos;s capital, Sacramento is at the center of
              Medi-Cal policy decisions that shape FQHC operations statewide.
              Local health centers are often early adopters of CalAIM programs,
              creating new roles in care management, population health, and
              social determinants of health initiatives.
            </p>
          </div>

          {/* In-Demand Roles */}
          <h3 className="text-2xl font-bold text-stone-900 mt-12 mb-6">
            Most In-Demand FQHC Roles in Sacramento
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                role: "Community Health Worker / Promotora",
                salary: "$40,000 – $55,000",
              },
              {
                role: "Care Coordinator (ECM/CCM)",
                salary: "$45,000 – $62,000",
              },
              {
                role: "Behavioral Health Specialist",
                salary: "$52,000 – $74,000",
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
                salary: "$108,000 – $152,000",
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
            Key Programs Driving FQHC Hiring in Sacramento
          </h3>
          <div className="space-y-6 text-stone-700 text-lg leading-relaxed">
            <p>
              <strong>Enhanced Care Management (ECM)</strong> programs are
              growing rapidly in the Sacramento region, with FQHCs building
              dedicated care teams to serve high-need Medi-Cal members. These
              programs are a major driver of new community health worker and
              care coordinator positions.
            </p>
            <p>
              <strong>Behavioral Health Integration</strong> is expanding
              across Sacramento&apos;s FQHCs, with increasing demand for
              licensed therapists, marriage and family therapists, and substance
              use counselors who can work alongside primary care teams.
            </p>
            <p>
              <strong>Native American Health</strong> programs are particularly
              prominent in Sacramento, with dedicated FQHCs serving urban
              Native communities. These organizations seek staff with cultural
              competency in Native American health traditions and trauma-informed
              care.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-violet-50 border border-violet-200 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-stone-900 mb-4">
              Looking for an FQHC Role in Sacramento?
            </h3>
            <p className="text-stone-600 mb-6 text-lg">
              Join FQHC Talent Exchange — it&apos;s completely free for job
              seekers. Get matched with Sacramento-area community health
              centers in as little as 5 days.
            </p>
            <a
              href="/join"
              className="inline-flex items-center justify-center rounded-lg bg-violet-600 px-8 py-4 text-lg font-semibold text-white hover:bg-violet-700 transition-colors"
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
              { name: "Fresno / Central Valley", slug: "fresno" },
              { name: "Inland Empire", slug: "riverside-san-bernardino" },
            ].map(({ name, slug }) => (
              <a
                key={slug}
                href={`/fqhc-jobs-${slug}`}
                className="bg-white rounded-lg p-4 text-center font-medium text-stone-700 hover:text-violet-600 hover:shadow-md transition-all"
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
