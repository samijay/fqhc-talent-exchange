// FQHC Thought Leaders & Influencers — Who to follow in the CHC sector
"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Users,
  Building2,
  Star,
  Scale,
  GraduationCap,
  Cpu,
  Shield,
  Briefcase,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Filter,
  Calendar,
  Linkedin,
  Twitter,
  Globe,
  ArrowRight,
  BookOpen,
  Network,
  DollarSign,
  Layers,
  Tag,
  Brain,
  Landmark,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  THOUGHT_LEADERS,
  leaderCategoryMeta,
  LEADERS_LAST_UPDATED,
  type LeaderCategory,
  type ThoughtLeader,
} from "@/lib/fqhc-thought-leaders";
import { getRelatedContent } from "@/lib/strategy-knowledge-graph";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

/* ------------------------------------------------------------------ */
/*  Icon maps                                                          */
/* ------------------------------------------------------------------ */

const categoryIconMap: Record<
  LeaderCategory,
  React.ComponentType<{ className?: string }>
> = {
  "nachc-leadership": Building2,
  "state-pca": Landmark,
  "fqhc-ceo": Lightbulb,
  "policy-expert": Scale,
  "workforce-research": GraduationCap,
  "ai-health": Brain,
  "hrsa-leadership": Shield,
  consulting: Briefcase,
};

/** Background color for avatar circles per category */
const categoryAvatarBg: Record<LeaderCategory, string> = {
  "nachc-leadership": "bg-teal-600",
  "state-pca": "bg-amber-600",
  "fqhc-ceo": "bg-rose-600",
  "policy-expert": "bg-blue-600",
  "workforce-research": "bg-purple-600",
  "ai-health": "bg-cyan-600",
  "hrsa-leadership": "bg-emerald-600",
  consulting: "bg-stone-600",
};

/* ------------------------------------------------------------------ */
/*  Topic pills                                                        */
/* ------------------------------------------------------------------ */

/** Collect all topics and sort by frequency (most used first) */
function getTopTopics(leaders: ThoughtLeader[], limit: number): string[] {
  const freq = new Map<string, number>();
  for (const l of leaders) {
    for (const topic of l.relevantTopics) {
      freq.set(topic, (freq.get(topic) || 0) + 1);
    }
  }
  return Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([topic]) => topic);
}

/** Make topic labels human-readable */
function formatTopic(topic: string): string {
  return topic
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/* ------------------------------------------------------------------ */
/*  Leader Card                                                        */
/* ------------------------------------------------------------------ */

function LeaderCard({
  leader,
  locale,
  isEs,
  isExpanded,
  onToggle,
}: {
  leader: ThoughtLeader;
  locale: string;
  isEs: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const catMeta = leaderCategoryMeta[leader.category];
  const CatIcon = categoryIconMap[leader.category];
  const avatarBg = categoryAvatarBg[leader.category];

  // Check for connected content via knowledge graph
  const relatedContent = getRelatedContent("leader", leader.id);
  const hasCaseStudies =
    leader.relatedCaseStudyIds && leader.relatedCaseStudyIds.length > 0;
  const hasEconomics =
    leader.relatedEconomicsIds && leader.relatedEconomicsIds.length > 0;
  const hasFrameworks =
    leader.relatedFrameworkIds && leader.relatedFrameworkIds.length > 0;
  const hasConnectedContent =
    hasCaseStudies || hasEconomics || hasFrameworks || relatedContent.length > 0;

  return (
    <div className="rounded-2xl border border-stone-200 bg-white transition-shadow hover:shadow-md overflow-hidden">
      {/* Header — clickable to expand */}
      <button onClick={onToggle} className="w-full text-left p-5 sm:p-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div
            className={`flex size-12 shrink-0 items-center justify-center rounded-full text-white font-bold text-sm ${avatarBg}`}
          >
            {leader.photoPlaceholder}
          </div>

          {/* Name, title, org */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              <Badge
                variant="secondary"
                className={`text-xs ${catMeta.color}`}
              >
                <CatIcon className="size-3 mr-1" />
                {t(catMeta.label, locale)}
              </Badge>
            </div>
            <h3 className="text-lg font-bold text-stone-900 leading-tight">
              {leader.name}
            </h3>
            <p className="text-sm text-stone-500 mt-0.5">
              {t(leader.title, locale)}
            </p>
            <p className="text-xs text-stone-400 mt-0.5">
              {leader.organization}
            </p>

            {/* Topic tags — always visible */}
            <div className="mt-2.5 flex flex-wrap gap-1">
              {leader.relevantTopics.map((topic) => (
                <span
                  key={topic}
                  className="inline-flex items-center rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-500"
                >
                  {formatTopic(topic)}
                </span>
              ))}
            </div>
          </div>

          {/* Expand icon */}
          <div className="flex-shrink-0 mt-1 text-stone-400">
            {isExpanded ? (
              <ChevronUp className="size-5" />
            ) : (
              <ChevronDown className="size-5" />
            )}
          </div>
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t border-stone-100 px-5 sm:px-6 pb-6 pt-4 space-y-5">
          {/* Bio */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
              {isEs ? "Biografia" : "Biography"}
            </h4>
            <p className="text-sm text-stone-600 leading-relaxed">
              {t(leader.bio, locale)}
            </p>
          </div>

          {/* Why Follow — highlighted */}
          <div className="rounded-xl border border-teal-200 bg-teal-50/60 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="size-4 text-teal-700" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-700">
                {isEs ? "Por Que Seguir" : "Why Follow"}
              </h4>
            </div>
            <p className="text-sm text-stone-700 leading-relaxed">
              {t(leader.whyFollow, locale)}
            </p>
          </div>

          {/* Connected Content */}
          {hasConnectedContent && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                {isEs ? "Contenido Conectado" : "Connected Content"}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {hasCaseStudies &&
                  leader.relatedCaseStudyIds!.map((id) => (
                    <Link
                      key={id}
                      href={"/strategy/guides" as "/strategy/guides"}
                      className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-xs font-medium text-amber-700 hover:bg-amber-100 transition-colors"
                    >
                      <BookOpen className="size-3" />
                      {isEs ? "Estudio de Caso" : "Case Study"}
                    </Link>
                  ))}
                {hasEconomics &&
                  leader.relatedEconomicsIds!.map((id) => (
                    <Link
                      key={id}
                      href={"/strategy/economics" as "/strategy/economics"}
                      className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200 px-2.5 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors"
                    >
                      <DollarSign className="size-3" />
                      {isEs ? "Economia" : "Economics"}
                    </Link>
                  ))}
                {hasFrameworks &&
                  leader.relatedFrameworkIds!.map((id) => (
                    <Link
                      key={id}
                      href={"/strategy/frameworks" as "/strategy/frameworks"}
                      className="inline-flex items-center gap-1 rounded-full bg-purple-50 border border-purple-200 px-2.5 py-1 text-xs font-medium text-purple-700 hover:bg-purple-100 transition-colors"
                    >
                      <Layers className="size-3" />
                      {isEs ? "Marco" : "Framework"}
                    </Link>
                  ))}
                {relatedContent
                  .filter(
                    (r) =>
                      r.type !== "case-study" &&
                      r.type !== "economics" &&
                      r.type !== "framework"
                  )
                  .slice(0, 3)
                  .map((r) => (
                    <span
                      key={`${r.type}-${r.id}`}
                      className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-600"
                    >
                      <Network className="size-3" />
                      {r.type}
                    </span>
                  ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex items-center justify-between border-t border-stone-100 pt-3">
            <div className="flex items-center gap-3">
              {leader.linkedinUrl && (
                <a
                  href={leader.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors"
                >
                  <Linkedin className="size-3.5" />
                  LinkedIn
                </a>
              )}
              {leader.twitterUrl && (
                <a
                  href={leader.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-700 hover:bg-sky-100 transition-colors"
                >
                  <Twitter className="size-3.5" />
                  Twitter
                </a>
              )}
              <a
                href={leader.orgUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-200 transition-colors"
              >
                <Globe className="size-3.5" />
                {isEs ? "Sitio Web" : "Website"}
              </a>
            </div>
            <a
              href={leader.orgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-teal-700 hover:text-teal-900 hover:underline transition-colors flex items-center gap-1"
            >
              {leader.organization.length > 30
                ? leader.organization.slice(0, 30) + "..."
                : leader.organization}
              <ExternalLink className="size-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/*  Thought Leaders Page                                               */
/* ================================================================== */

export default function ThoughtLeadersPage() {
  const locale = useLocale();
  const isEs = locale === "es";
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<
    LeaderCategory | "all"
  >("all");
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Get top topics for the secondary filter
  const topTopics = useMemo(
    () => getTopTopics(THOUGHT_LEADERS, 15),
    []
  );

  // Filter leaders
  const filtered = useMemo(() => {
    let results = THOUGHT_LEADERS;
    if (activeCategory !== "all") {
      results = results.filter((l) => l.category === activeCategory);
    }
    if (activeTopic) {
      results = results.filter((l) =>
        l.relevantTopics.some(
          (t) => t.toLowerCase() === activeTopic.toLowerCase()
        )
      );
    }
    return results;
  }, [activeCategory, activeTopic]);

  // Stats
  const totalLeaders = THOUGHT_LEADERS.length;
  const categoryCount = Object.keys(leaderCategoryMeta).length;
  const linkedinCount = THOUGHT_LEADERS.filter((l) => l.linkedinUrl).length;

  return (
    <div className="bg-stone-50">
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Users className="size-5 text-teal-400" />
            <span className="text-sm font-medium uppercase tracking-wider text-teal-400">
              {isEs ? "A Quien Seguir" : "Who To Follow"}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {isEs
              ? "Lideres de Pensamiento e Influenciadores FQHC"
              : "FQHC Thought Leaders & Influencers"}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-300">
            {isEs
              ? "Las personas que estan dando forma al futuro de los centros de salud comunitarios. Siga a estos lideres para inteligencia temprana sobre politicas, financiamiento, tecnologia y operaciones."
              : "The people shaping the future of community health centers. Follow these leaders for early signals on policy, funding, technology, and operations."}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-stone-400">
            <span className="flex items-center gap-1">
              <Users className="size-3.5" />
              {totalLeaders} {isEs ? "lideres" : "leaders"}
            </span>
            <span className="text-stone-600">·</span>
            <span>
              {categoryCount} {isEs ? "categorias" : "categories"}
            </span>
            <span className="text-stone-600">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="size-3" />
              {isEs ? "Actualizado:" : "Updated:"} {LEADERS_LAST_UPDATED}
            </span>
          </div>
        </div>
      </section>

      {/* ── Filters + Leader Cards ── */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="flex items-center gap-2 mb-4">
            <Filter className="size-4 text-stone-400" />
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setActiveTopic(null);
                }}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  activeCategory === "all"
                    ? "bg-stone-800 text-white"
                    : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                }`}
              >
                {isEs ? "Todos" : "All"} ({totalLeaders})
              </button>
              {(
                Object.keys(leaderCategoryMeta) as LeaderCategory[]
              ).map((catKey) => {
                const meta = leaderCategoryMeta[catKey];
                const CatIcon = categoryIconMap[catKey];
                const count = THOUGHT_LEADERS.filter(
                  (l) => l.category === catKey
                ).length;
                return (
                  <button
                    key={catKey}
                    onClick={() => {
                      setActiveCategory(catKey);
                      setActiveTopic(null);
                    }}
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      activeCategory === catKey
                        ? "bg-stone-800 text-white"
                        : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                    }`}
                  >
                    <CatIcon className="size-3" />
                    {t(meta.label, locale)} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Topic filter */}
          <div className="flex items-center gap-2 mb-8">
            <Tag className="size-4 text-stone-400" />
            <div className="flex flex-wrap gap-1">
              {topTopics.map((topic) => (
                <button
                  key={topic}
                  onClick={() =>
                    setActiveTopic(activeTopic === topic ? null : topic)
                  }
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors ${
                    activeTopic === topic
                      ? "bg-teal-700 text-white"
                      : "bg-stone-100 text-stone-400 hover:bg-stone-200 hover:text-stone-600"
                  }`}
                >
                  {formatTopic(topic)}
                </button>
              ))}
              {activeTopic && (
                <button
                  onClick={() => setActiveTopic(null)}
                  className="rounded-full px-2.5 py-0.5 text-[11px] font-medium text-red-500 hover:text-red-700 transition-colors"
                >
                  {isEs ? "Limpiar" : "Clear"}
                </button>
              )}
            </div>
          </div>

          {/* Leader cards grid */}
          <div className="grid gap-4 lg:grid-cols-2">
            {filtered.map((leader) => (
              <LeaderCard
                key={leader.id}
                leader={leader}
                locale={locale}
                isEs={isEs}
                isExpanded={expandedIds.has(leader.id)}
                onToggle={() => toggle(leader.id)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-stone-500">
              {isEs
                ? "No hay lideres en esta seleccion. Intente con otra categoria o tema."
                : "No leaders match this filter. Try a different category or topic."}
            </div>
          )}
        </div>
      </section>

      {/* ── How to Use This Page ── */}
      <section className="border-t border-stone-200 bg-gradient-to-br from-stone-800 via-stone-900 to-stone-800 text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-bold sm:text-2xl text-center mb-2">
              {isEs
                ? "Como Usar Esta Pagina"
                : "How to Use This Page"}
            </h2>
            <p className="text-sm text-stone-400 text-center mb-8">
              {isEs
                ? "Acciones concretas para convertir esta inteligencia en ventaja estrategica."
                : "Concrete actions to turn this intelligence into strategic advantage."}
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Tip 1 */}
              <div className="rounded-xl border border-stone-700 bg-stone-800/50 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Linkedin className="size-4 text-blue-400" />
                  <h3 className="text-sm font-bold text-stone-200">
                    {isEs ? "Siga en LinkedIn" : "Follow on LinkedIn"}
                  </h3>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {isEs
                    ? "Siga a estos lideres en LinkedIn para inteligencia temprana. Sus publicaciones a menudo previsualizan cambios de politica semanas antes de los anuncios oficiales."
                    : "Follow these leaders on LinkedIn for early signals. Their posts often preview policy changes weeks before official announcements."}
                </p>
              </div>

              {/* Tip 2 */}
              <div className="rounded-xl border border-stone-700 bg-stone-800/50 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="size-4 text-teal-400" />
                  <h3 className="text-sm font-bold text-stone-200">
                    {isEs
                      ? "Suscribase a NACHC y CPCA"
                      : "Subscribe to NACHC & CPCA"}
                  </h3>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {isEs
                    ? "Las alertas de NACHC y los informes de CPCA son los canales de inteligencia mas directos para lideres de FQHCs en California."
                    : "NACHC alerts and CPCA briefs are the most direct intelligence channels for California FQHC leaders."}
                </p>
              </div>

              {/* Tip 3 */}
              <div className="rounded-xl border border-stone-700 bg-stone-800/50 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="size-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-stone-200">
                    {isEs ? "Asista a Conferencias" : "Attend Conferences"}
                  </h3>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {isEs
                    ? "El Foro P&I de NACHC y la conferencia anual de CPCA son donde estas voces comparten inteligencia no publicada. Envie a su equipo de liderazgo."
                    : "NACHC's P&I Forum and CPCA's annual conference are where these voices share unpublished intelligence. Send your leadership team."}
                </p>
              </div>

              {/* Tip 4 */}
              <div className="rounded-xl border border-stone-700 bg-stone-800/50 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="size-4 text-purple-400" />
                  <h3 className="text-sm font-bold text-stone-200">
                    {isEs
                      ? "Lea las Investigaciones"
                      : "Read the Research"}
                  </h3>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {isEs
                    ? "Los informes Geiger Gibson (GWU), datos de IHI y estudios del Centro de Fuerza Laboral de Salud (UW) son la base de evidencia para presentaciones de junta y solicitudes de subvenciones."
                    : "Geiger Gibson briefs (GWU), IHI data, and Health Workforce Studies (UW) are the evidence base for board presentations and grant applications."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Content Links ── */}
      <section className="py-10 sm:py-14 border-t border-stone-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold text-stone-900 mb-6 text-center sm:text-xl">
            {isEs ? "Explorar Mas Estrategia" : "Explore More Strategy"}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Button
              variant="outline"
              asChild
              className="h-auto py-3 justify-start"
            >
              <Link href="/strategy/guides">
                <BookOpen className="size-4 mr-2 text-teal-600" />
                <span className="text-sm">
                  {isEs ? "Guias Ejecutivas" : "Executive Guides"}
                </span>
                <ArrowRight className="size-3 ml-auto" />
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="h-auto py-3 justify-start"
            >
              <Link href="/strategy/knowledge-map">
                <Network className="size-4 mr-2 text-purple-600" />
                <span className="text-sm">
                  {isEs ? "Mapa de Conocimiento" : "Knowledge Map"}
                </span>
                <ArrowRight className="size-3 ml-auto" />
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="h-auto py-3 justify-start"
            >
              <Link href="/strategy/economics">
                <DollarSign className="size-4 mr-2 text-green-600" />
                <span className="text-sm">
                  {isEs ? "Economia de FQHCs" : "FQHC Economics"}
                </span>
                <ArrowRight className="size-3 ml-auto" />
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="h-auto py-3 justify-start"
            >
              <Link href="/strategy/frameworks">
                <Layers className="size-4 mr-2 text-amber-600" />
                <span className="text-sm">
                  {isEs ? "Marcos de Ejecucion" : "Execution Frameworks"}
                </span>
                <ArrowRight className="size-3 ml-auto" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
