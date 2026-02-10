"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const posts = [
  {
    slug: "how-to-write-fqhc-resume",
    title: "How to Write an FQHC Resume That Gets Noticed",
    description:
      "Your FQHC experience is valuable — but only if hiring managers can see it. Learn how to write a community health resume that highlights the programs, EHR systems, and competencies that FQHCs are looking for.",
    date: "February 7, 2026",
    category: "Career Resources",
    readTime: "7 min read",
  },
  {
    slug: "what-is-enhanced-care-management-ecm",
    title:
      "What Is Enhanced Care Management (ECM)? A Career Guide for Community Health Workers",
    description:
      "Enhanced Care Management is one of the fastest-growing programs at California FQHCs. Learn what ECM is, what roles it creates, what skills you need, and how to land an ECM job.",
    date: "February 5, 2026",
    category: "Career Resources",
    readTime: "10 min read",
  },
  {
    slug: "medi-cal-funding-cuts-community-health-workers",
    title:
      "Medi-Cal Funding Cuts: What Community Health Workers Need to Know in 2026",
    description:
      "California's Medi-Cal funding cuts are displacing thousands of community health workers at FQHCs statewide. Here's what happened, what it means for your career, and how to find your next role quickly.",
    date: "February 1, 2026",
    category: "Career Resources",
    readTime: "8 min read",
  },
];

export default function BlogPage() {
  const t = useTranslations("blog");

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
                <p className="text-sm text-teal-600 font-semibold mb-2">
                  {post.category}
                </p>
                <h2 className="text-2xl font-bold text-stone-900 mb-3">
                  {post.title}
                </h2>
                <p className="text-stone-600 leading-relaxed mb-4">
                  {post.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-stone-500">
                  <time>{post.date}</time>
                  <span>&middot;</span>
                  <span>{post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
