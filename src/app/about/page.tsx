import { pageMetadata } from "@/lib/seo-config";

export const metadata = pageMetadata.about;

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-50 via-teal-50 to-stone-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
            We Exist Because Community Health Workers Deserve Better
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            When California&apos;s Medi-Cal funding cuts displaced thousands of
            community health workers, we saw an industry failing the very people
            who hold it together. FQHC Talent Exchange was built to fix that.
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-stone-900 mb-8">
            The Problem We&apos;re Solving
          </h2>
          <div className="space-y-6 text-stone-700 text-lg leading-relaxed">
            <p>
              Federally Qualified Health Centers are the backbone of
              California&apos;s safety-net healthcare system. They serve over 7
              million patients — most of them uninsured or on Medi-Cal — across
              more than 1,400 sites statewide. The people who make these clinics
              work are community health workers, care coordinators, patient
              navigators, and outreach specialists who share the language,
              culture, and lived experience of the communities they serve.
            </p>
            <p>
              When Medi-Cal funding cuts hit, these workers were the first to go.
              Not because they weren&apos;t essential — but because the programs
              that funded their positions lost revenue overnight. Meanwhile, other
              FQHCs across the state are desperately hiring for the exact same
              roles. The disconnect is staggering: experienced community health
              workers sitting at home while clinics down the road can&apos;t find
              qualified candidates.
            </p>
            <p>
              Generic job boards don&apos;t solve this. They don&apos;t
              understand FQHC-specific programs like Enhanced Care Management or
              Community Supports. They don&apos;t know that experience with OCHIN
              Epic is more relevant than experience with Cerner. They don&apos;t
              speak Spanish. And they certainly don&apos;t advocate for
              candidates — they just list jobs and move on.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-stone-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-stone-900 mb-8">
            Our Approach
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">
                Candidate Advocacy, Not Just Listings
              </h3>
              <p className="text-stone-600 leading-relaxed">
                Every candidate gets a dedicated advocate who understands their
                experience, translates their skills into FQHC language, and
                actively introduces them to hiring organizations. We don&apos;t
                post and pray — we place people.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">
                Speed That Matches the Crisis
              </h3>
              <p className="text-stone-600 leading-relaxed">
                Displaced workers can&apos;t wait months. Our process delivers
                first employer introductions within 5 days and targets full
                placement within 21 days. Every day a qualified worker sits idle
                is a day patients go underserved.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="text-3xl mb-4">🏥</div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">
                Deep FQHC Expertise
              </h3>
              <p className="text-stone-600 leading-relaxed">
                We understand 330 grants, PPS billing, UDS reporting, and the
                alphabet soup of revenue-generating programs — ECM, CCM,
                Community Supports, TCM, BH-ASO. When we match candidates, we
                match on the competencies that actually matter to FQHCs.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="text-3xl mb-4">💚</div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">
                Always Free for Job Seekers
              </h3>
              <p className="text-stone-600 leading-relaxed">
                Community health workers should never have to pay to find their
                next role. Our platform is 100% free for candidates — always.
                Employers invest in our services because we save them time, money,
                and the cost of unfilled positions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-stone-900 mb-8">
            Who We Serve
          </h2>
          <div className="space-y-6 text-stone-700 text-lg leading-relaxed">
            <p>
              Our platform serves the community health workforce across
              California — from community health workers and promotoras to care
              coordinators, behavioral health specialists, EHR analysts, and
              clinic leadership. Many of our candidates are bilingual
              Spanish-English professionals with deep roots in the communities
              their FQHCs serve.
            </p>
            <p>
              On the employer side, we work exclusively with Federally Qualified
              Health Centers and FQHC Look-Alikes. We understand the unique
              operational realities of community health — from managing multiple
              funding streams to maintaining UDS benchmarks — because that&apos;s
              all we do.
            </p>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="bg-gradient-to-br from-teal-50 via-teal-50 to-stone-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-stone-900 mb-8">
            Why This Matters
          </h2>
          <div className="space-y-6 text-stone-700 text-lg leading-relaxed">
            <p>
              When a community health worker gets placed at an FQHC, it&apos;s
              not just a hire — it&apos;s a patient who gets connected to
              Medi-Cal, a family that finds a medical home, a chronic condition
              that gets managed before it becomes an emergency room visit. Every
              placement we make has a direct impact on health equity in
              California&apos;s most underserved communities.
            </p>
            <p>
              We measure success by placement speed and community impact — not by
              how many resumes we collect or how much we can charge. If a
              candidate is better served by a direct referral than our full
              process, we make that referral. The mission comes first.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-stone-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-stone-600 mb-8">
            Whether you&apos;re a displaced health worker looking for your next
            role or an FQHC with positions to fill, we&apos;re here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/join"
              className="inline-flex items-center justify-center rounded-lg bg-teal-600 px-8 py-4 text-lg font-semibold text-white hover:bg-teal-700 transition-colors"
            >
              Apply for Early Access
            </a>
            <a
              href="/hire"
              className="inline-flex items-center justify-center rounded-lg border-2 border-stone-300 px-8 py-4 text-lg font-semibold text-stone-700 hover:border-stone-400 transition-colors"
            >
              Request Priority Access
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
