"use client";

import { useState, useMemo } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { Search, Clock, ArrowRight } from "lucide-react";

// Extract unique categories from posts
const EN_CATEGORIES = [
  "All",
  ...Array.from(new Set(BLOG_POSTS.map((p) => p.category))),
];
const ES_CATEGORIES = [
  "Todos",
  ...Array.from(new Set(BLOG_POSTS.map((p) => p.esCategory))),
];

export default function BlogPage() {
  const t = useTranslations("blog");
  const locale = useLocale();
  const isEs = locale === "es";

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = isEs ? ES_CATEGORIES : EN_CATEGORIES;

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" ||
        selectedCategory === "Todos" ||
        (isEs ? post.esCategory : post.category) === selectedCategory;

      const matchesSearch =
        !search ||
        (isEs ? post.esTitle : post.title)
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (isEs ? post.esDescription : post.description)
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory, isEs]);

  // Latest post for the featured hero
  const featuredPost = BLOG_POSTS[0];
  const remainingPosts = filteredPosts.filter(
    (p) => p.slug !== featuredPost.slug
  );

  return (
    <main className="min-h-screen">
      {/* Hero with featured article */}
      <section className="bg-gradient-to-br from-teal-50 via-teal-50 to-stone-50 py-12 md:py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
              {t("title")}
            </h1>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          {/* Featured latest article */}
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="block bg-white rounded-2xl border border-stone-200 p-6 md:p-8 hover:shadow-lg transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wide text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
                {isEs ? "Más Reciente" : "Latest"}
              </span>
              <span className="text-xs text-stone-500">
                {isEs ? featuredPost.esCategory : featuredPost.category}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-3 group-hover:text-teal-700 transition-colors">
              {isEs ? featuredPost.esTitle : featuredPost.title}
            </h2>
            <p className="text-stone-600 leading-relaxed mb-4 text-lg">
              {isEs ? featuredPost.esDescription : featuredPost.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-stone-500">
                <time>{isEs ? featuredPost.esDate : featuredPost.date}</time>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {isEs ? featuredPost.esReadTime : featuredPost.readTime}
                </span>
              </div>
              <span className="flex items-center gap-1 text-sm font-medium text-teal-600 group-hover:translate-x-1 transition-transform">
                {isEs ? "Leer" : "Read"}
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Search and category filter */}
      <section className="py-8 px-6 border-b border-stone-100 sticky top-0 bg-white/95 backdrop-blur-sm z-30">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500" />
              <input
                type="text"
                placeholder={
                  isEs ? "Buscar artículos..." : "Search articles..."
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-colors"
              />
            </div>

            {/* Category tabs — scrollable on mobile */}
            <div className="flex gap-2 overflow-x-auto pb-1 -mb-1 w-full sm:w-auto scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 px-3 py-1.5 text-sm rounded-full border transition-colors ${
                    selectedCategory === cat
                      ? "bg-teal-600 text-white border-teal-600"
                      : "bg-white text-stone-600 border-stone-200 hover:border-teal-300 hover:text-teal-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Result count */}
          <p className="text-sm text-stone-500 mt-3">
            {filteredPosts.length}{" "}
            {isEs
              ? filteredPosts.length === 1
                ? "artículo"
                : "artículos"
              : filteredPosts.length === 1
                ? "article"
                : "articles"}
            {search && (
              <span>
                {" "}
                {isEs ? "para" : "for"} &ldquo;{search}&rdquo;
              </span>
            )}
          </p>
        </div>
      </section>

      {/* Article grid */}
      <section className="py-10 px-6">
        <div className="max-w-5xl mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-stone-500 text-lg">
                {isEs
                  ? "No se encontraron artículos."
                  : "No articles found."}
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="mt-3 text-teal-600 hover:text-teal-700 text-sm font-medium"
              >
                {isEs ? "Limpiar filtros" : "Clear filters"}
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {(search || selectedCategory !== "All" && selectedCategory !== "Todos"
                ? filteredPosts
                : remainingPosts
              ).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-white rounded-xl border border-stone-200 p-6 hover:shadow-md transition-all hover:-translate-y-0.5"
                >
                  <p className="text-xs font-semibold text-teal-700 mb-2 uppercase tracking-wide">
                    {isEs ? post.esCategory : post.category}
                  </p>
                  <h2 className="text-lg font-bold text-stone-900 mb-2 group-hover:text-teal-700 transition-colors line-clamp-2">
                    {isEs ? post.esTitle : post.title}
                  </h2>
                  <p className="text-sm text-stone-600 leading-relaxed mb-4 line-clamp-3">
                    {isEs ? post.esDescription : post.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <div className="flex items-center gap-3">
                      <time>{isEs ? post.esDate : post.date}</time>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {isEs ? post.esReadTime : post.readTime}
                      </span>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-stone-300 group-hover:text-teal-500 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          )}
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
