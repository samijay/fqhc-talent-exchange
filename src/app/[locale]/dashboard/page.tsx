"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { t } from "@/lib/i18n-helpers";
import {
  Rss,
  BookmarkCheck,
  Eye,
  Settings,
  Plus,
  X,
  Search,
  LogOut,
  Save,
  BookOpen,
  Clock,
  Check,
  Bookmark,
  FileText,
  Download,
  Target,
  Calculator,
  Map,
  Award,
  Package,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { createAuthClient } from "@/lib/supabase";
import { INTEL_ITEMS, INTEL_CATEGORIES } from "@/lib/fqhc-news-intel";
import { californiaFQHCs } from "@/lib/california-fqhcs";
import {
  filterIntelByWatchlist,
  getContentById,
  CONTENT_TYPE_LABELS,
  TOOL_EVENT_LABELS,
  type WatchlistItem,
  type FavoriteItem,
} from "@/lib/user-preferences";
import { IntelCard } from "@/components/intel/IntelCard";
import { FavoriteButton } from "@/components/dashboard/FavoriteButton";
import { toast } from "sonner";

/* ------------------------------------------------------------------ */
/*  Bilingual helper                                                    */
/* ------------------------------------------------------------------ */

// t() imported from @/lib/i18n-helpers

/* ------------------------------------------------------------------ */
/*  Tab config                                                          */
/* ------------------------------------------------------------------ */

const TABS = [
  { id: "feed", icon: Rss, label: { en: "My Feed", es: "Mi Feed" } },
  { id: "library", icon: BookOpen, label: { en: "My Library", es: "Mi Biblioteca" } },
  { id: "favorites", icon: BookmarkCheck, label: { en: "Favorites", es: "Favoritos" } },
  { id: "watchlist", icon: Eye, label: { en: "Watchlist", es: "Lista de Seguimiento" } },
  { id: "settings", icon: Settings, label: { en: "Settings", es: "Configuración" } },
] as const;

type TabId = (typeof TABS)[number]["id"];

/* ------------------------------------------------------------------ */
/*  Region options (for settings + watchlist)                           */
/* ------------------------------------------------------------------ */

const REGIONS = [
  "Los Angeles",
  "San Diego",
  "Bay Area",
  "Sacramento",
  "Central Valley",
  "Inland Empire",
  "Central Coast",
  "North State",
  "North Coast",
];

/* ------------------------------------------------------------------ */
/*  Dashboard Page                                                      */
/* ------------------------------------------------------------------ */

export default function DashboardPage() {
  const locale = useLocale();
  const isEs = locale === "es";
  const { user, profile, signOut, refreshProfile } = useAuth();

  const [tab, setTab] = useState<TabId>("feed");
  const [supabase] = useState(() => createAuthClient());

  // ── Watchlist State ──
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [, setWatchlistLoading] = useState(true);
  const [fqhcSearch, setFqhcSearch] = useState("");
  const [keywordInput, setKeywordInput] = useState("");

  // ── Favorites State ──
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [favoritesLoading, setFavoritesLoading] = useState(true);

  // ── Library State ──
  const [contentReads, setContentReads] = useState<
    { content_type: string; content_id: string; status: string; progress: number; last_read_at: string }[]
  >([]);
  const [libraryLoading, setLibraryLoading] = useState(true);
  const [libraryFilter, setLibraryFilter] = useState<string>("all");

  // ── Creations State ──
  const [creations, setCreations] = useState<
    { event_type: string; tool_name: string; item_id: string | null; metadata: Record<string, unknown> | null; created_at: string }[]
  >([]);
  const [creationsLoading, setCreationsLoading] = useState(true);

  // ── Settings State ──
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("job_seeker");
  const [organization, setOrganization] = useState("");
  const [region, setRegion] = useState("");
  const [saving, setSaving] = useState(false);

  // ── Intel State ──
  const [expandedIntel, setExpandedIntel] = useState<string | null>(null);

  // ── Load watchlist ──
  useEffect(() => {
    if (!user) return;
    supabase
      .from("user_watchlist")
      .select("watch_type, watch_value")
      .eq("user_id", user.id)
      .then(({ data }) => {
        setWatchlist((data as WatchlistItem[]) ?? []);
        setWatchlistLoading(false);
      });
  }, [user, supabase]);

  // ── Load favorites ──
  useEffect(() => {
    if (!user) return;
    supabase
      .from("user_favorites")
      .select("content_type, content_id, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setFavorites((data as FavoriteItem[]) ?? []);
        setFavoritesLoading(false);
      });
  }, [user, supabase]);

  // ── Load library (content reads) ──
  useEffect(() => {
    if (!user) return;
    supabase
      .from("content_reads")
      .select("content_type, content_id, status, progress, last_read_at")
      .eq("user_id", user.id)
      .order("last_read_at", { ascending: false })
      .then(({ data }) => {
        setContentReads(data ?? []);
        setLibraryLoading(false);
      });
  }, [user, supabase]);

  // ── Load creations (tool events by email) ──
  useEffect(() => {
    if (!user?.email) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCreationsLoading(false);
      return;
    }
    fetch("/api/user-creations")
      .then((res) => res.json())
      .then(({ creations: data }) => {
        setCreations(data ?? []);
        setCreationsLoading(false);
      })
      .catch(() => setCreationsLoading(false));
  }, [user?.email]);

  // ── Populate settings from profile ──
  useEffect(() => {
    if (profile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayName(profile.display_name ?? "");
      setRole(profile.role);
      setOrganization(profile.organization ?? "");
      setRegion(profile.region ?? "");
    }
  }, [profile]);

  // ── Add to watchlist ──
  const addToWatchlist = useCallback(
    async (watchType: WatchlistItem["watch_type"], watchValue: string) => {
      if (!user) return;
      if (watchlist.some((w) => w.watch_type === watchType && w.watch_value === watchValue)) {
        toast.info(t({ en: "Already watching this", es: "Ya estás siguiendo esto" }, locale));
        return;
      }

      const { error } = await supabase.from("user_watchlist").insert({
        user_id: user.id,
        watch_type: watchType,
        watch_value: watchValue,
      });

      if (!error) {
        setWatchlist((prev) => [...prev, { watch_type: watchType, watch_value: watchValue }]);
        toast.success(t({ en: "Added to watchlist", es: "Agregado a la lista" }, locale));
      }
    },
    [user, watchlist, supabase, locale]
  );

  // ── Remove from watchlist ──
  const removeFromWatchlist = useCallback(
    async (watchType: string, watchValue: string) => {
      if (!user) return;
      await supabase
        .from("user_watchlist")
        .delete()
        .eq("user_id", user.id)
        .eq("watch_type", watchType)
        .eq("watch_value", watchValue);

      setWatchlist((prev) =>
        prev.filter((w) => !(w.watch_type === watchType && w.watch_value === watchValue))
      );
    },
    [user, supabase]
  );

  // ── Save settings ──
  const handleSaveSettings = async () => {
    if (!user) return;
    setSaving(true);

    const { error } = await supabase
      .from("user_profiles")
      .update({
        display_name: displayName || null,
        role,
        organization: organization || null,
        region: region || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (!error) {
      await refreshProfile();
      toast.success(t({ en: "Settings saved", es: "Configuración guardada" }, locale));
    } else {
      toast.error(t({ en: "Failed to save", es: "Error al guardar" }, locale));
    }
    setSaving(false);
  };

  // ── Filter intel by watchlist ──
  const filteredIntel =
    watchlist.length > 0
      ? filterIntelByWatchlist(INTEL_ITEMS, watchlist)
      : INTEL_ITEMS;

  // ── FQHC search results ──
  const fqhcResults = fqhcSearch.length >= 2
    ? californiaFQHCs
        .filter((f) =>
          f.name.toLowerCase().includes(fqhcSearch.toLowerCase()) ||
          f.city.toLowerCase().includes(fqhcSearch.toLowerCase())
        )
        .slice(0, 8)
    : [];

  // ── Group favorites by content type ──
  const groupedFavorites = favorites.reduce(
    (acc, fav) => {
      if (!acc[fav.content_type]) acc[fav.content_type] = [];
      acc[fav.content_type].push(fav);
      return acc;
    },
    {} as Record<string, FavoriteItem[]>
  );

  if (!user) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">
          {t({ en: "Dashboard", es: "Panel de Control" }, locale)}
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          {profile?.display_name
            ? t(
                {
                  en: `Welcome back, ${profile.display_name}`,
                  es: `Bienvenido/a, ${profile.display_name}`,
                },
                locale
              )
            : t({ en: "Welcome back", es: "Bienvenido/a" }, locale)}
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 overflow-x-auto rounded-lg border border-stone-200 bg-stone-50 p-1">
        {TABS.map((tabItem) => {
          const Icon = tabItem.icon;
          const active = tab === tabItem.id;
          return (
            <button
              key={tabItem.id}
              onClick={() => setTab(tabItem.id)}
              className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                active
                  ? "bg-white text-teal-700 shadow-sm"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              <Icon className="size-4" />
              {t(tabItem.label, locale)}
            </button>
          );
        })}
      </div>

      {/* ── Tab Content ── */}

      {/* MY FEED */}
      {tab === "feed" && (
        <div className="space-y-4">
          {watchlist.length > 0 && (
            <p className="text-sm text-stone-500">
              {t(
                {
                  en: `Showing ${filteredIntel.length} items matching your watchlist`,
                  es: `Mostrando ${filteredIntel.length} elementos de tu lista de seguimiento`,
                },
                locale
              )}
            </p>
          )}

          {filteredIntel.length === 0 ? (
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-8 text-center">
              <p className="text-stone-500">
                {t(
                  {
                    en: "No matching items. Add FQHCs or keywords to your watchlist to customize your feed.",
                    es: "Sin resultados. Agrega FQHCs o palabras clave a tu lista de seguimiento.",
                  },
                  locale
                )}
              </p>
              <button
                onClick={() => setTab("watchlist")}
                className="mt-3 text-sm font-medium text-teal-600 hover:text-teal-700"
              >
                {t({ en: "Set up watchlist →", es: "Configurar lista →" }, locale)}
              </button>
            </div>
          ) : (
            filteredIntel.slice(0, 20).map((item) => (
              <div key={item.id} className="flex items-start gap-2">
                <div className="flex-1">
                  <IntelCard
                    item={item}
                    locale={locale}
                    isEs={isEs}
                    isExpanded={expandedIntel === item.id}
                    onToggle={() =>
                      setExpandedIntel(expandedIntel === item.id ? null : item.id)
                    }
                  />
                </div>
                <FavoriteButton contentType="intel" contentId={item.id} size="sm" />
              </div>
            ))
          )}
        </div>
      )}

      {/* LIBRARY */}
      {tab === "library" && (
        <div className="space-y-6">
          {libraryLoading ? (
            <p className="text-sm text-stone-500">
              {t({ en: "Loading...", es: "Cargando..." }, locale)}
            </p>
          ) : contentReads.length === 0 ? (
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-8 text-center">
              <BookOpen className="mx-auto size-8 text-stone-300" />
              <p className="mt-3 text-stone-500">
                {t(
                  {
                    en: "Your library is empty. Content you view will appear here automatically.",
                    es: "Tu biblioteca esta vacia. El contenido que veas aparecera aqui automaticamente.",
                  },
                  locale
                )}
              </p>
            </div>
          ) : (
            <>
              {/* Filter pills */}
              <div className="flex flex-wrap gap-2">
                {["all", ...new Set(contentReads.map((r) => r.content_type))].map((type) => (
                  <button
                    key={type}
                    onClick={() => setLibraryFilter(type)}
                    className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                      libraryFilter === type
                        ? "bg-teal-700 text-white"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    {type === "all"
                      ? t({ en: "All", es: "Todo" }, locale)
                      : t(CONTENT_TYPE_LABELS[type] ?? { en: type, es: type }, locale)}
                  </button>
                ))}
              </div>

              {/* Group by status */}
              {(["reading", "read", "want_to_read"] as const).map((status) => {
                const items = contentReads.filter(
                  (r) =>
                    r.status === status &&
                    (libraryFilter === "all" || r.content_type === libraryFilter)
                );
                if (items.length === 0) return null;

                const statusLabel = {
                  reading: { en: "Currently Reading", es: "Leyendo Actualmente" },
                  read: { en: "Completed", es: "Completado" },
                  want_to_read: { en: "Saved for Later", es: "Guardado para Despues" },
                };
                const StatusIcon = status === "read" ? Check : status === "reading" ? Clock : Bookmark;

                return (
                  <div key={status}>
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-stone-500">
                      <StatusIcon className="size-4" />
                      {t(statusLabel[status], locale)} ({items.length})
                    </h3>
                    <div className="space-y-2">
                      {items.map((item) => {
                        const content = getContentById(item.content_type, item.content_id);
                        return (
                          <div
                            key={`${item.content_type}-${item.content_id}`}
                            className="flex items-center justify-between rounded-lg border border-stone-200 bg-white p-3"
                          >
                            <div className="min-w-0 flex-1">
                              {content ? (
                                <Link
                                  href={content.href as "/jobs"}
                                  className="text-sm font-medium text-stone-900 hover:text-teal-700"
                                >
                                  {t(content.title, locale)}
                                </Link>
                              ) : (
                                <span className="text-sm text-stone-500">
                                  {item.content_id}
                                </span>
                              )}
                              <div className="mt-1 flex items-center gap-2">
                                <span className="rounded bg-stone-100 px-1.5 py-0.5 text-xs text-stone-500">
                                  {t(CONTENT_TYPE_LABELS[item.content_type] ?? { en: item.content_type, es: item.content_type }, locale)}
                                </span>
                                {item.status === "reading" && item.progress > 0 && (
                                  <div className="flex items-center gap-1.5">
                                    <div className="h-1 w-16 rounded-full bg-stone-200">
                                      <div
                                        className="h-1 rounded-full bg-teal-600"
                                        style={{ width: `${item.progress}%` }}
                                      />
                                    </div>
                                    <span className="text-xs text-stone-500">{item.progress}%</span>
                                  </div>
                                )}
                                <span className="text-xs text-stone-500">
                                  {new Date(item.last_read_at).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {/* My Creations */}
          {!creationsLoading && creations.length > 0 && (
            <div className="mt-8 border-t border-stone-200 pt-6">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-stone-500">
                <Award className="size-4" />
                {t({ en: "My Creations", es: "Mis Creaciones" }, locale)} ({creations.length})
              </h3>
              <div className="space-y-2">
                {Object.entries(
                  creations.reduce<Record<string, typeof creations>>((acc, c) => {
                    const key = c.event_type;
                    if (!acc[key]) acc[key] = [];
                    acc[key].push(c);
                    return acc;
                  }, {})
                ).map(([eventType, items]) => {
                  const label = TOOL_EVENT_LABELS[eventType] ?? { en: eventType, es: eventType };
                  const IconMap: Record<string, React.ElementType> = {
                    resume_create: FileText,
                    okr_download: Download,
                    okr_download_all: Package,
                    assessment_complete: Target,
                    simulator_run: Calculator,
                    pathway_start: Map,
                    pathway_complete: Award,
                  };
                  const Icon = IconMap[eventType] ?? FileText;

                  return (
                    <div key={eventType} className="rounded-lg border border-stone-200 bg-white p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Icon className="size-4 text-teal-600" />
                        <span className="text-sm font-semibold text-stone-700">
                          {t(label, locale)}
                        </span>
                        <span className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-700">
                          {items.length}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {items.slice(0, 5).map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm">
                            <span className="text-stone-600">
                              {item.item_id || item.tool_name}
                            </span>
                            <span className="text-xs text-stone-500">
                              {new Date(item.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                        {items.length > 5 && (
                          <p className="text-xs text-stone-500">
                            +{items.length - 5} {t({ en: "more", es: "más" }, locale)}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* FAVORITES */}
      {tab === "favorites" && (
        <div className="space-y-6">
          {favoritesLoading ? (
            <p className="text-sm text-stone-500">
              {t({ en: "Loading...", es: "Cargando..." }, locale)}
            </p>
          ) : favorites.length === 0 ? (
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-8 text-center">
              <BookmarkCheck className="mx-auto size-8 text-stone-300" />
              <p className="mt-3 text-stone-500">
                {t(
                  {
                    en: "No favorites yet. Browse content and click the bookmark icon to save items.",
                    es: "Sin favoritos aún. Navega el contenido y haz clic en el ícono de marcador para guardar.",
                  },
                  locale
                )}
              </p>
            </div>
          ) : (
            Object.entries(groupedFavorites).map(([type, items]) => (
              <div key={type}>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-500">
                  {t(CONTENT_TYPE_LABELS[type] ?? { en: type, es: type }, locale)} ({items.length})
                </h3>
                <div className="space-y-2">
                  {items.map((fav) => {
                    const content = getContentById(fav.content_type, fav.content_id);
                    return (
                      <div
                        key={`${fav.content_type}-${fav.content_id}`}
                        className="flex items-center justify-between rounded-lg border border-stone-200 bg-white p-3"
                      >
                        <div className="min-w-0 flex-1">
                          {content ? (
                            <Link
                              href={content.href as "/jobs"}
                              className="text-sm font-medium text-stone-900 hover:text-teal-700"
                            >
                              {t(content.title, locale)}
                            </Link>
                          ) : (
                            <span className="text-sm text-stone-500">
                              {fav.content_id}
                            </span>
                          )}
                          {content?.subtitle && (
                            <p className="mt-0.5 truncate text-xs text-stone-500">
                              {t(content.subtitle, locale)}
                            </p>
                          )}
                        </div>
                        <FavoriteButton
                          contentType={fav.content_type}
                          contentId={fav.content_id}
                          size="sm"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* WATCHLIST */}
      {tab === "watchlist" && (
        <div className="space-y-8">
          {/* Watched FQHCs */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-stone-900">
              {t({ en: "Watched FQHCs", es: "FQHCs Seguidos" }, locale)}
            </h3>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-500" />
              <input
                type="text"
                value={fqhcSearch}
                onChange={(e) => setFqhcSearch(e.target.value)}
                placeholder={t(
                  { en: "Search 220 California FQHCs...", es: "Buscar 220 FQHCs de California..." },
                  locale
                )}
                className="w-full rounded-lg border border-stone-300 py-2 pl-10 pr-4 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
              {fqhcResults.length > 0 && (
                <div className="absolute left-0 top-full z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-stone-200 bg-white shadow-lg">
                  {fqhcResults.map((fqhc) => (
                    <button
                      key={fqhc.slug}
                      onClick={() => {
                        addToWatchlist("fqhc", fqhc.slug);
                        setFqhcSearch("");
                      }}
                      className="flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-stone-50"
                    >
                      <div>
                        <span className="font-medium text-stone-900">{fqhc.name}</span>
                        <span className="ml-2 text-stone-500">{fqhc.city}</span>
                      </div>
                      <Plus className="size-4 text-teal-600" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-2">
              {watchlist
                .filter((w) => w.watch_type === "fqhc")
                .map((w) => {
                  const fqhc = californiaFQHCs.find((f) => f.slug === w.watch_value);
                  return (
                    <div
                      key={w.watch_value}
                      className="flex items-center justify-between rounded-lg border border-stone-200 bg-white px-4 py-2"
                    >
                      <Link
                        href={`/directory/${w.watch_value}` as "/jobs"}
                        className="text-sm font-medium text-stone-900 hover:text-teal-700"
                      >
                        {fqhc?.name ?? w.watch_value}
                      </Link>
                      <button
                        onClick={() => removeFromWatchlist("fqhc", w.watch_value)}
                        className="rounded p-1 text-stone-500 hover:bg-stone-100 hover:text-red-500"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Custom Keywords */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-stone-900">
              {t({ en: "Keywords", es: "Palabras Clave" }, locale)}
            </h3>
            <div className="mb-3 flex gap-2">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && keywordInput.trim()) {
                    addToWatchlist("keyword", keywordInput.trim().toLowerCase());
                    setKeywordInput("");
                  }
                }}
                placeholder={t(
                  { en: "e.g. layoffs, ECM, funding...", es: "ej. despidos, ECM, financiamiento..." },
                  locale
                )}
                className="flex-1 rounded-lg border border-stone-300 px-4 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
              <button
                onClick={() => {
                  if (keywordInput.trim()) {
                    addToWatchlist("keyword", keywordInput.trim().toLowerCase());
                    setKeywordInput("");
                  }
                }}
                className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {watchlist
                .filter((w) => w.watch_type === "keyword")
                .map((w) => (
                  <span
                    key={w.watch_value}
                    className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-3 py-1 text-sm text-teal-700"
                  >
                    {w.watch_value}
                    <button
                      onClick={() => removeFromWatchlist("keyword", w.watch_value)}
                      className="ml-1 rounded-full p-0.5 hover:bg-teal-100"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
            </div>
          </div>

          {/* Watched Categories */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-stone-900">
              {t({ en: "Intel Categories", es: "Categorías de Inteligencia" }, locale)}
            </h3>
            <div className="flex flex-wrap gap-2">
              {INTEL_CATEGORIES.map((cat) => {
                const isWatched = watchlist.some(
                  (w) => w.watch_type === "category" && w.watch_value === cat.id
                );
                return (
                  <button
                    key={cat.id}
                    onClick={() =>
                      isWatched
                        ? removeFromWatchlist("category", cat.id)
                        : addToWatchlist("category", cat.id)
                    }
                    className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                      isWatched
                        ? "bg-teal-700 text-white"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    {t(cat, locale)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Watched Regions */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-stone-900">
              {t({ en: "Regions", es: "Regiones" }, locale)}
            </h3>
            <div className="flex flex-wrap gap-2">
              {REGIONS.map((r) => {
                const isWatched = watchlist.some(
                  (w) => w.watch_type === "region" && w.watch_value === r
                );
                return (
                  <button
                    key={r}
                    onClick={() =>
                      isWatched
                        ? removeFromWatchlist("region", r)
                        : addToWatchlist("region", r)
                    }
                    className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                      isWatched
                        ? "bg-teal-700 text-white"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    {r}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SETTINGS */}
      {tab === "settings" && (
        <div className="max-w-lg space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-stone-900">
              {t({ en: "Profile", es: "Perfil" }, locale)}
            </h3>
            <p className="text-sm text-stone-500">
              {user?.email}
            </p>
          </div>

          {/* Display Name */}
          <div>
            <label className="block text-sm font-medium text-stone-700">
              {t({ en: "Display Name", es: "Nombre" }, locale)}
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-stone-700">
              {t({ en: "Your Role", es: "Tu Rol" }, locale)}
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="executive">
                {t({ en: "Executive / Director", es: "Ejecutivo / Director" }, locale)}
              </option>
              <option value="manager">
                {t({ en: "Manager / Supervisor", es: "Gerente / Supervisor" }, locale)}
              </option>
              <option value="clinician">
                {t({ en: "Clinician / Provider", es: "Clínico / Proveedor" }, locale)}
              </option>
              <option value="job_seeker">
                {t({ en: "Job Seeker", es: "Buscador de Empleo" }, locale)}
              </option>
            </select>
          </div>

          {/* Organization */}
          <div>
            <label className="block text-sm font-medium text-stone-700">
              {t({ en: "Organization", es: "Organización" }, locale)}
            </label>
            <input
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder={t(
                { en: "Your FQHC or health center", es: "Tu FQHC o centro de salud" },
                locale
              )}
              className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          {/* Region */}
          <div>
            <label className="block text-sm font-medium text-stone-700">
              {t({ en: "Region", es: "Región" }, locale)}
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="">{t({ en: "Select region", es: "Seleccionar región" }, locale)}</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Save + Sign Out */}
          <div className="flex items-center gap-3 pt-4 border-t border-stone-200">
            <button
              onClick={handleSaveSettings}
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-800 disabled:opacity-50"
            >
              <Save className="size-4" />
              {saving
                ? t({ en: "Saving...", es: "Guardando..." }, locale)
                : t({ en: "Save Changes", es: "Guardar Cambios" }, locale)}
            </button>
            <button
              onClick={signOut}
              className="flex items-center gap-2 rounded-lg border border-stone-300 px-5 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-50"
            >
              <LogOut className="size-4" />
              {t({ en: "Sign Out", es: "Cerrar Sesión" }, locale)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
