"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import { BLOG_POSTS } from "@/lib/blog-posts";

const posts = BLOG_POSTS;

export default function BlogPage() {
  const t = useTranslations("blog");
  const locale = useLocale();
  const isEs = locale === "es";

  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-br from-teal-50 via-teal-50 to-stone-50 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
            {t("title")}
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block bg-white rounded-xl border border-stone-200 p-8 hover:shadow-md transition-all hover:-translate-y-1"
              >
                <p className="text-sm text-teal-700 font-semibold mb-2">
                  {isEs ? post.esCategory : post.category}
                </p>
                <h2 className="text-2xl font-bold text-stone-900 mb-3">
                  {isEs ? post.esTitle : post.title}
                </h2>
                <p className="text-stone-600 leading-relaxed mb-4">
                  {isEs ? post.esDescription : post.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-stone-500">
                  <time>{isEs ? post.esDate : post.date}</time>
                  <span>·</span>
                  <span>{isEs ? post.esReadTime : post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <NewsletterSignup
          variant="banner"
          defaultAudience="both"
          showAudienceToggle
          heading={{
            en: "Get These Insights in Your Inbox",
            es: "Recibe Esta Inteligencia en Tu Correo",
          }}
          subheading={{
            en: "Weekly briefings on policy, funding, jobs, and AI \u2014 for FQHC leaders and job seekers.",
            es: "Informes semanales sobre pol\u00edticas, financiamiento, empleos e IA \u2014 para l\u00edderes de FQHCs y candidatos.",
          }}
        />
      </section>
    </main>
  );
}
