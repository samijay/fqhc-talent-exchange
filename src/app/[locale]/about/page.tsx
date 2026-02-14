"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function AboutPage() {
  const t = useTranslations("about");
  const tNav = useTranslations("nav");

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-50 via-teal-50 to-stone-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
            {t("heroTitle")}
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            {t("heroSubtitle")}
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-stone-900 mb-8">
            {t("problemTitle")}
          </h2>
          <div className="space-y-6 text-stone-700 text-lg leading-relaxed">
            <p>
              {t("problemP1")}
            </p>
            <p>
              {t("problemP2")}
            </p>
            <p>
              {t("problemP3")}
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-stone-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-stone-900 mb-8">
            {t("approachTitle")}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">
                {t("approach1Title")}
              </h3>
              <p className="text-stone-600 leading-relaxed">
                {t("approach1Desc")}
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">
                {t("approach2Title")}
              </h3>
              <p className="text-stone-600 leading-relaxed">
                {t("approach2Desc")}
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="text-3xl mb-4">🏥</div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">
                {t("approach3Title")}
              </h3>
              <p className="text-stone-600 leading-relaxed">
                {t("approach3Desc")}
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="text-3xl mb-4">💚</div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">
                {t("approach4Title")}
              </h3>
              <p className="text-stone-600 leading-relaxed">
                {t("approach4Desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-stone-900 mb-8">
            {t("serveTitle")}
          </h2>
          <div className="space-y-6 text-stone-700 text-lg leading-relaxed">
            <p>
              {t("serveP1")}
            </p>
            <p>
              {t("serveP2")}
            </p>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="bg-gradient-to-br from-teal-50 via-teal-50 to-stone-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-stone-900 mb-8">
            {t("mattersTitle")}
          </h2>
          <div className="space-y-6 text-stone-700 text-lg leading-relaxed">
            <p>
              {t("mattersP1")}
            </p>
            <p>
              {t("mattersP2")}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-stone-900 mb-6">
            {t("ctaTitle")}
          </h2>
          <p className="text-xl text-stone-600 mb-8">
            {t("ctaSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/resume-builder"
              className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-8 py-4 text-lg font-semibold text-white hover:bg-teal-800 transition-colors"
            >
              {tNav("buildResume")}
            </Link>
            <Link
              href="/hire"
              className="inline-flex items-center justify-center rounded-lg border-2 border-stone-300 px-8 py-4 text-lg font-semibold text-stone-700 hover:border-stone-400 transition-colors"
            >
              {tNav("hireTalent")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
