// Executive Dashboard — shown above homepage for authenticated executive users
// Auth is not yet functional, so this component effectively never renders.
// When auth is wired up, this will fetch its own data from the client.
"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import {
  AlertTriangle,
  Calendar,
  BookOpen,
  BarChart3,
  Calculator,
  Target,
  FileText,
  ArrowRight,
  Clock,
  GraduationCap,
} from "lucide-react";
import { createAuthClient } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";
import { IntelCard } from "@/components/intel/IntelCard";
import {
  filterIntelByWatchlist,
  getContentById,
  type WatchlistItem,
} from "@/lib/user-preferences";
import { getLearningProgressSummary } from "@/lib/learning-progress";
import { getIntelItems } from "@/lib/fqhc-news-intel";
import { getFundingCliffs } from "@/lib/market-intelligence";

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

export function ExecutiveDashboard() {
  const { user, profile } = useAuth();
  const locale = "en";
  const isEs = false;

  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [recentReads, setRecentReads] = useState<
    { content_type: string; content_id: string; status: string; last_read_at: string }[]
  >([]);
  const [expandedIntel, setExpandedIntel] = useState<string | null>(null);

  // Compute data locally (auth users only — tiny population)
  const newsFeed = getIntelItems()
    .filter((i) => i.type === "news" && i.category !== "change-management")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const upcomingCliffs = getFundingCliffs().filter((c) => !c.isPast).slice(0, 4);

  useEffect(() => {
    if (!user) return;
    const supabase = createAuthClient();
    void supabase
      .from("user_watchlist")
      .select("watch_type, watch_value")
      .eq("user_id", user.id)
      .then(({ data: wl, error }) => {
        if (!error && wl) setWatchlist(wl as WatchlistItem[]);
      });
    void supabase
      .from("content_reads")
      .select("content_type, content_id, status, last_read_at")
      .eq("user_id", user.id)
      .order("last_read_at", { ascending: false })
      .limit(5)
      .then(({ data: reads, error }) => {
        if (!error && reads) setRecentReads(reads);
      });
  }, [user]);

  const personalIntel = watchlist.length > 0
    ? filterIntelByWatchlist(newsFeed, watchlist).slice(0, 5)
    : newsFeed.slice(0, 5);

  const progress = typeof window !== "undefined" ? getLearningProgressSummary() : null;

  const hour = new Date().getHours();
  const greeting = hour < 12
    ? t({ en: "Good morning", es: "Buenos dias" }, locale)
    : hour < 18
    ? t({ en: "Good afternoon", es: "Buenas tardes" }, locale)
    : t({ en: "Good evening", es: "Buenas noches" }, locale);

  const name = profile?.display_name || user?.email?.split("@")[0] || "";

  return (
    <section className="border-b border-stone-200 bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-stone-900">
            {greeting}, {name}
          </h2>
          {profile?.organization && (
            <p className="mt-0.5 text-sm text-stone-500">{profile.organization}</p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Column 1: Your Intel Feed */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-stone-500">
                <AlertTriangle className="size-4 text-amber-500" />
                {t({ en: "Your Intel Feed", es: "Tu Feed de Inteligencia" }, locale)}
              </h3>
              <Link href="/dashboard" className="text-xs font-medium text-teal-600 hover:text-teal-700">
                {t({ en: "Customize", es: "Personalizar" }, locale)} →
              </Link>
            </div>
            {personalIntel.length === 0 ? (
              <p className="rounded-lg border border-stone-200 bg-stone-50 p-4 text-center text-sm text-stone-500">
                {t({
                  en: "Set up your watchlist to see personalized intel",
                  es: "Configura tu lista de seguimiento para ver inteligencia personalizada",
                }, locale)}
              </p>
            ) : (
              personalIntel.map((item) => (
                <IntelCard
                  key={item.id}
                  item={item}
                  locale={locale}
                  isEs={isEs}
                  isExpanded={expandedIntel === item.id}
                  onToggle={() =>
                    setExpandedIntel(expandedIntel === item.id ? null : item.id)
                  }
                  compact
                />
              ))
            )}
          </div>

          {/* Column 2: Key Dates */}
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-stone-500">
              <Calendar className="size-4 text-red-500" />
              {t({ en: "Key Dates", es: "Fechas Clave" }, locale)}
            </h3>
            {upcomingCliffs.slice(0, 3).map((cliff) => (
              <div key={cliff.id} className="rounded-lg border border-stone-200 bg-stone-50 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-red-600">
                    {cliff.daysUntil > 0
                      ? `${cliff.daysUntil} ${t({ en: "days", es: "dias" }, locale)}`
                      : t({ en: "Past", es: "Pasado" }, locale)}
                  </span>
                  <span className="text-xs text-stone-500">{cliff.date}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-stone-800">
                  {t(cliff.title, locale)}
                </p>
                {cliff.dollarAmount && (
                  <p className="mt-0.5 text-xs text-stone-500">
                    {cliff.dollarAmount}
                    {cliff.peopleAffected ? ` · ${cliff.peopleAffected}` : ""}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Column 3: Your Progress */}
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-stone-500">
              <BookOpen className="size-4 text-teal-600" />
              {t({ en: "Your Progress", es: "Tu Progreso" }, locale)}
            </h3>
            {progress?.mostRecent ? (
              <Link
                href={progress.mostRecent.href as "/jobs"}
                className="block rounded-lg border border-teal-200 bg-teal-50 p-3 transition-colors hover:bg-teal-100"
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="size-4 text-teal-700" />
                  <span className="text-sm font-medium text-teal-800">
                    {t({ en: "Continue", es: "Continuar" }, locale)}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-stone-800">
                  {t(progress.mostRecent.title, locale)}
                </p>
                <div className="mt-2 h-1.5 w-full rounded-full bg-teal-200">
                  <div
                    className="h-1.5 rounded-full bg-teal-600"
                    style={{ width: `${progress.mostRecent.progress}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-teal-600">
                  {t(progress.mostRecent.detail, locale)}
                </p>
              </Link>
            ) : (
              <Link
                href="/strategy/masterclass"
                className="block rounded-lg border border-stone-200 bg-stone-50 p-3 text-center text-sm text-stone-500 transition-colors hover:bg-stone-100"
              >
                {t({ en: "Start a masterclass →", es: "Iniciar un masterclass →" }, locale)}
              </Link>
            )}
            {recentReads.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
                  {t({ en: "Recently Viewed", es: "Visto Recientemente" }, locale)}
                </p>
                {recentReads.slice(0, 3).map((read) => {
                  const content = getContentById(read.content_type, read.content_id);
                  if (!content) return null;
                  return (
                    <Link
                      key={`${read.content_type}-${read.content_id}`}
                      href={content.href as "/jobs"}
                      className="flex items-center gap-2 rounded px-2 py-1.5 text-sm text-stone-700 transition-colors hover:bg-stone-50"
                    >
                      <Clock className="size-3 shrink-0 text-stone-500" />
                      <span className="truncate">{t(content.title, locale)}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {[
            { href: "/strategy/okrs", icon: Target, label: { en: "OKR Templates", es: "Plantillas OKR" } },
            { href: "/strategy/revenue-simulator", icon: Calculator, label: { en: "Revenue Simulator", es: "Simulador de Ingresos" } },
            { href: "/strategy/resilience", icon: BarChart3, label: { en: "Resilience Scorecard", es: "Scorecard de Resiliencia" } },
            { href: "/strategy/case-studies", icon: FileText, label: { en: "Case Studies", es: "Estudios de Caso" } },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href as "/jobs"}
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-600 transition-colors hover:border-teal-300 hover:text-teal-700"
            >
              <link.icon className="size-3.5" />
              {t(link.label, locale)}
            </Link>
          ))}
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-medium text-teal-700 transition-colors hover:bg-teal-100"
          >
            {t({ en: "Full Dashboard", es: "Panel Completo" }, locale)}
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
