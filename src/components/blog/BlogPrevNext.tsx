import { Link } from "@/i18n/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-posts";

interface BlogPrevNextProps {
  slug: string;
  locale?: string;
}

export function BlogPrevNext({ slug, locale = "en" }: BlogPrevNextProps) {
  const isEs = locale === "es";
  const livePosts = BLOG_POSTS.filter((p) => p.live !== false);
  const currentIndex = livePosts.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) return null;

  const prev = currentIndex < livePosts.length - 1 ? livePosts[currentIndex + 1] : null;
  const next = currentIndex > 0 ? livePosts[currentIndex - 1] : null;

  if (!prev && !next) return null;

  return (
    <nav
      aria-label={isEs ? "Navegación de artículos" : "Article navigation"}
      className="mt-12 border-t border-stone-200 pt-8 dark:border-stone-700"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/blog/${prev.slug}` as "/blog"}
            className="group flex items-start gap-3 rounded-xl border border-stone-200 p-4 transition-colors hover:border-teal-400 hover:bg-teal-50/50 dark:border-stone-700 dark:hover:border-teal-600 dark:hover:bg-teal-900/20"
          >
            <ChevronLeft className="mt-0.5 size-5 shrink-0 text-stone-400 transition-transform group-hover:-translate-x-0.5 group-hover:text-teal-500" />
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                {isEs ? "Anterior" : "Previous"}
              </p>
              <p className="mt-1 text-sm font-medium text-stone-900 line-clamp-2 dark:text-stone-100">
                {isEs ? prev.esTitle : prev.title}
              </p>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={`/blog/${next.slug}` as "/blog"}
            className="group flex items-start gap-3 rounded-xl border border-stone-200 p-4 text-right transition-colors hover:border-teal-400 hover:bg-teal-50/50 dark:border-stone-700 dark:hover:border-teal-600 dark:hover:bg-teal-900/20 sm:flex-row-reverse"
          >
            <ChevronRight className="mt-0.5 size-5 shrink-0 text-stone-400 transition-transform group-hover:translate-x-0.5 group-hover:text-teal-500" />
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                {isEs ? "Siguiente" : "Next"}
              </p>
              <p className="mt-1 text-sm font-medium text-stone-900 line-clamp-2 dark:text-stone-100">
                {isEs ? next.esTitle : next.title}
              </p>
            </div>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}
