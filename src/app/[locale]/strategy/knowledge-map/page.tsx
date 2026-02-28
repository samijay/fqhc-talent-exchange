// Strategy Knowledge Map — Interactive graph showing how all FQHC strategic content interconnects
"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Shield,
  DollarSign,
  Cpu,
  Users,
  HeartPulse,
  Cog,
  BookOpen,
  GraduationCap,
  Layers,
  Target,
  UserCheck,
  ChevronDown,
  Clock,
  Zap,
  Map,
  Lightbulb,
  ArrowRight,
  Network,
  Compass,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  strategicThemes,
  learningPaths,
  getContentHubs,
  getKnowledgeGraphStats,
  KNOWLEDGE_GRAPH_LAST_UPDATED,
  type StrategicTheme,
  type LearningPath,
  type LearningStep,
  type ContentType,
  type PathDifficulty,
} from "@/lib/strategy-knowledge-graph";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

/* ------------------------------------------------------------------ */
/*  Icon maps                                                          */
/* ------------------------------------------------------------------ */

const themeIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  DollarSign,
  Cpu,
  Users,
  HeartPulse,
  Cog,
};

const contentTypeIcon: Record<ContentType, React.ComponentType<{ className?: string }>> = {
  "case-study": BookOpen,
  economics: GraduationCap,
  framework: Layers,
  okr: Target,
  leader: UserCheck,
  intel: Zap,
};

const contentTypeLabel: Record<ContentType, { en: string; es: string }> = {
  "case-study": { en: "Case Studies", es: "Casos de Estudio" },
  economics: { en: "Economics", es: "Economía" },
  framework: { en: "Frameworks", es: "Marcos Estratégicos" },
  okr: { en: "OKRs", es: "OKRs" },
  leader: { en: "Leaders", es: "Líderes" },
  intel: { en: "Intelligence", es: "Inteligencia" },
};

const contentTypeRoute: Record<ContentType, string> = {
  "case-study": "/strategy/guides",
  economics: "/strategy/economics",
  framework: "/strategy/frameworks",
  okr: "/strategy/okrs",
  leader: "/strategy/leaders",
  intel: "/insights",
};

const urgencyMeta: Record<string, { en: string; es: string; color: string }> = {
  critical: {
    en: "Critical",
    es: "Crítico",
    color: "bg-rose-100 text-rose-700 border-rose-200",
  },
  high: {
    en: "High",
    es: "Alto",
    color: "bg-amber-100 text-amber-700 border-amber-200",
  },
  medium: {
    en: "Medium",
    es: "Medio",
    color: "bg-blue-100 text-blue-700 border-blue-200",
  },
};

const themeColorMap: Record<string, { bg: string; border: string; text: string; accent: string }> = {
  rose: {
    bg: "bg-rose-50",
    border: "border-rose-200",
    text: "text-rose-700",
    accent: "bg-rose-100",
  },
  amber: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    accent: "bg-amber-100",
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    accent: "bg-blue-100",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-700",
    accent: "bg-purple-100",
  },
  teal: {
    bg: "bg-teal-50",
    border: "border-teal-200",
    text: "text-teal-700",
    accent: "bg-teal-100",
  },
  stone: {
    bg: "bg-stone-50",
    border: "border-stone-200",
    text: "text-stone-700",
    accent: "bg-stone-100",
  },
};

const difficultyMeta: Record<PathDifficulty, { en: string; es: string; color: string }> = {
  "new-to-fqhc": {
    en: "New to FQHC",
    es: "Nuevo en FQHC",
    color: "bg-teal-100 text-teal-700 border-teal-200",
  },
  "experienced-leader": {
    en: "Experienced Leader",
    es: "Líder Experimentado",
    color: "bg-amber-100 text-amber-700 border-amber-200",
  },
  "crisis-mode": {
    en: "Crisis Mode",
    es: "Modo Crisis",
    color: "bg-rose-100 text-rose-700 border-rose-200",
  },
};

/* ------------------------------------------------------------------ */
/*  Content Link Grid for Theme Cards                                  */
/* ------------------------------------------------------------------ */

function ContentLinkGrid({
  theme,
  locale,
}: {
  theme: StrategicTheme;
  locale: string;
}) {
  const isEs = locale === "es";
  const allLinks: {
    type: ContentType;
    count: number;
    route: string;
  }[] = [
    { type: "case-study" as ContentType, count: theme.caseStudyIds.length, route: contentTypeRoute["case-study"] },
    { type: "economics" as ContentType, count: theme.economicsIds.length, route: contentTypeRoute.economics },
    { type: "framework" as ContentType, count: theme.frameworkIds.length, route: contentTypeRoute.framework },
    { type: "okr" as ContentType, count: theme.okrIds.length, route: contentTypeRoute.okr },
    { type: "leader" as ContentType, count: theme.leaderIds.length, route: contentTypeRoute.leader },
  ];
  const links = allLinks.filter((l) => l.count > 0);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
      {links.map((link) => {
        const Icon = contentTypeIcon[link.type];
        return (
          <Link
            key={link.type}
            href={link.route}
            className="flex items-center gap-2 rounded-lg border border-stone-200 bg-white p-2.5 text-sm hover:border-teal-300 hover:bg-teal-50 transition-colors"
          >
            <Icon className="size-4 text-stone-500 flex-shrink-0" />
            <div className="min-w-0">
              <span className="font-semibold text-stone-900">{link.count}</span>
              <span className="ml-1 text-stone-500 text-xs">
                {isEs
                  ? contentTypeLabel[link.type].es
                  : contentTypeLabel[link.type].en}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Theme Card                                                         */
/* ------------------------------------------------------------------ */

function ThemeCard({
  theme,
  locale,
  isExpanded,
  onToggle,
}: {
  theme: StrategicTheme;
  locale: string;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const Icon = themeIconMap[theme.icon] || Shield;
  const urgency = urgencyMeta[theme.urgency];
  const colors = themeColorMap[theme.color] || themeColorMap.stone;

  return (
    <div
      className={`rounded-2xl border ${colors.border} bg-white overflow-hidden transition-shadow hover:shadow-md`}
    >
      {/* Collapsed Header */}
      <button onClick={onToggle} className="w-full text-left p-6">
        <div className="flex items-start gap-4">
          <div
            className={`flex-shrink-0 size-12 rounded-xl ${colors.accent} flex items-center justify-center`}
          >
            <Icon className={`size-6 ${colors.text}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="text-lg font-bold text-stone-900">
                {t(theme.title, locale)}
              </h3>
              <Badge
                variant="outline"
                className={`text-xs border ${urgency.color}`}
              >
                <Zap className="size-3 mr-1" />
                {t(urgency, locale)}
              </Badge>
            </div>
            <p className="text-sm text-stone-500">{t(theme.subtitle, locale)}</p>

            {/* Foresight preview when collapsed */}
            {!isExpanded && (
              <div className="mt-3 flex items-start gap-2 p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/50">
                <Lightbulb className="size-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 line-clamp-2">
                  {t(theme.foresight, locale)}
                </p>
              </div>
            )}
          </div>
          <ChevronDown
            className={`size-5 text-stone-400 flex-shrink-0 mt-1 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-6 pb-6 space-y-5 border-t border-stone-100 pt-5">
          {/* Description */}
          <p className="text-sm text-stone-600 leading-relaxed">
            {t(theme.description, locale)}
          </p>

          {/* Foresight Panel */}
          <div className="rounded-xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-amber-100/50 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="size-8 rounded-lg bg-amber-200 flex items-center justify-center">
                <Lightbulb className="size-5 text-amber-700" />
              </div>
              <h4 className="font-bold text-amber-900 text-sm">
                {locale === "es"
                  ? "Previsión Estratégica"
                  : "Strategic Foresight"}
              </h4>
            </div>
            <p className="text-sm text-amber-900/90 leading-relaxed">
              {t(theme.foresight, locale)}
            </p>
          </div>

          {/* Content Links */}
          <div>
            <h4 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">
              {locale === "es"
                ? "Contenido Relacionado"
                : "Related Content"}
            </h4>
            <ContentLinkGrid theme={theme} locale={locale} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Learning Path Card                                                 */
/* ------------------------------------------------------------------ */

function LearningPathCard({
  path,
  locale,
}: {
  path: LearningPath;
  locale: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const diff = difficultyMeta[path.difficulty];

  // Get the route for the first step
  const firstStepRoute = path.steps.length > 0
    ? contentTypeRoute[path.steps[0].contentType]
    : "/strategy/guides";

  return (
    <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden transition-shadow hover:shadow-md">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <Badge variant="outline" className={`text-xs border ${diff.color}`}>
                {t(diff, locale)}
              </Badge>
              <span className="flex items-center gap-1 text-xs text-stone-400">
                <Clock className="size-3" />
                {path.estimatedTime}
              </span>
              <span className="text-xs text-stone-400">
                {path.steps.length} {locale === "es" ? "pasos" : "steps"}
              </span>
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-1">
              {t(path.title, locale)}
            </h3>
            <p className="text-sm text-stone-500 line-clamp-2">
              {t(path.description, locale)}
            </p>
            <p className="text-xs text-stone-400 mt-2 italic">
              {t(path.targetAudience, locale)}
            </p>
          </div>
          <ChevronDown
            className={`size-5 text-stone-400 flex-shrink-0 mt-1 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Expanded Steps */}
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-stone-100 pt-5">
          <div className="space-y-4">
            {path.steps.map((step) => (
              <LearningStepRow
                key={step.order}
                step={step}
                locale={locale}
              />
            ))}
          </div>

          {/* Start Path CTA */}
          <div className="mt-5">
            <Link href={firstStepRoute}>
              <Button className="bg-teal-700 hover:bg-teal-800 text-white gap-2">
                {locale === "es"
                  ? "Comenzar Este Camino"
                  : "Start This Path"}
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Learning Step Row                                                  */
/* ------------------------------------------------------------------ */

function LearningStepRow({
  step,
  locale,
}: {
  step: LearningStep;
  locale: string;
}) {
  const Icon = contentTypeIcon[step.contentType];
  const route = contentTypeRoute[step.contentType];
  const typeLabel = contentTypeLabel[step.contentType];

  return (
    <div className="flex gap-4">
      {/* Step number */}
      <div className="flex-shrink-0 size-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-sm font-bold">
        {step.order}
      </div>

      {/* Step content */}
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="text-sm font-semibold text-stone-900">
            {t(step.title, locale)}
          </h4>
          <Link href={route}>
            <Badge
              variant="secondary"
              className="text-xs bg-stone-100 text-stone-600 hover:bg-teal-100 hover:text-teal-700 transition-colors gap-1"
            >
              <Icon className="size-3" />
              {t(typeLabel, locale)}
            </Badge>
          </Link>
        </div>
        <p className="text-xs text-stone-500">
          {t(step.action, locale)}
        </p>
        <div className="flex items-start gap-1.5 p-2 rounded bg-stone-50 border border-stone-100">
          <Lightbulb className="size-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-stone-600">{t(step.insight, locale)}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hub Node Row (Connection Explorer)                                 */
/* ------------------------------------------------------------------ */

function HubNodeRow({
  type,
  id,
  connectionCount,
  rank,
  locale,
}: {
  type: ContentType;
  id: string;
  connectionCount: number;
  rank: number;
  locale: string;
}) {
  const Icon = contentTypeIcon[type];
  const route = contentTypeRoute[type];
  const typeLabel = contentTypeLabel[type];

  // Format the id into a readable title
  const displayTitle = id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <Link
      href={route}
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 border border-transparent hover:border-stone-200 transition-colors"
    >
      <span className="flex-shrink-0 size-7 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center text-xs font-bold">
        {rank}
      </span>
      <div className="flex-shrink-0 size-8 rounded-lg bg-teal-50 flex items-center justify-center">
        <Icon className="size-4 text-teal-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-stone-900 truncate">
          {displayTitle}
        </p>
        <p className="text-xs text-stone-400">
          {t(typeLabel, locale)}
        </p>
      </div>
      <div className="flex-shrink-0 text-right">
        <span className="text-sm font-bold text-teal-700">
          {connectionCount}
        </span>
        <span className="text-xs text-stone-400 ml-1">
          {locale === "es" ? "conexiones" : "connections"}
        </span>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

export default function KnowledgeMapPage() {
  const locale = useLocale();
  const isEs = locale === "es";

  const [expandedThemes, setExpandedThemes] = useState<Set<string>>(new Set());

  const toggleTheme = (id: string) => {
    setExpandedThemes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const stats = useMemo(() => getKnowledgeGraphStats(), []);
  const hubs = useMemo(() => getContentHubs().slice(0, 10), []);

  // Count total case studies across themes (deduplicated)
  const totalCaseStudies = useMemo(() => {
    const ids = new Set<string>();
    strategicThemes.forEach((th) => th.caseStudyIds.forEach((id) => ids.add(id)));
    return ids.size;
  }, []);

  return (
    <main className="min-h-screen bg-stone-50">
      {/* ============================================================ */}
      {/*  SECTION 1 — Hero                                            */}
      {/* ============================================================ */}
      <section className="relative bg-gradient-to-b from-stone-900 via-stone-900 to-stone-800 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-20 sm:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-stone-300 mb-6">
              <Map className="size-4" />
              {isEs ? "Previsión Estratégica" : "Strategic Foresight"}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-5">
              {isEs
                ? "Mapa de Conocimiento Estratégico FQHC"
                : "FQHC Strategy Knowledge Map"}
            </h1>

            <p className="text-lg text-stone-300 leading-relaxed mb-10 max-w-2xl mx-auto">
              {isEs
                ? "Cómo se conectan los casos de estudio, la economía, los marcos estratégicos, los OKRs y los líderes intelectuales. Este mapa muestra la imagen completa: qué importa, por qué importa y qué hacer al respecto."
                : "How case studies, economics, frameworks, OKRs, and thought leaders connect. This map shows the full picture: what matters, why it matters, and what to do about it."}
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-2xl font-bold text-amber-400">
                  {strategicThemes.length}
                </p>
                <p className="text-xs text-stone-400 mt-1">
                  {isEs ? "Temas Estratégicos" : "Strategic Themes"}
                </p>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-2xl font-bold text-amber-400">
                  {learningPaths.length}
                </p>
                <p className="text-xs text-stone-400 mt-1">
                  {isEs ? "Caminos de Aprendizaje" : "Learning Paths"}
                </p>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-2xl font-bold text-amber-400">
                  {stats.totalEdges}+
                </p>
                <p className="text-xs text-stone-400 mt-1">
                  {isEs ? "Conexiones" : "Connections"}
                </p>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-2xl font-bold text-amber-400">
                  {totalCaseStudies}
                </p>
                <p className="text-xs text-stone-400 mt-1">
                  {isEs ? "Casos de Estudio" : "Case Studies"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 2 — Strategic Themes                                */}
      {/* ============================================================ */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
            {isEs ? "Temas Estratégicos" : "Strategic Themes"}
          </h2>
          <p className="text-stone-500 max-w-2xl mx-auto text-sm">
            {isEs
              ? "Seis temas que definen el panorama estratégico de los FQHCs. Cada tema conecta casos de estudio reales, conceptos económicos, marcos de ejecución, OKRs y líderes intelectuales."
              : "Six themes that define the FQHC strategic landscape. Each theme connects real case studies, economic concepts, execution frameworks, OKRs, and thought leaders."}
          </p>
        </div>

        <div className="space-y-4">
          {strategicThemes.map((theme) => (
            <ThemeCard
              key={theme.id}
              theme={theme}
              locale={locale}
              isExpanded={expandedThemes.has(theme.id)}
              onToggle={() => toggleTheme(theme.id)}
            />
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 3 — Learning Paths                                  */}
      {/* ============================================================ */}
      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-1.5 text-sm text-teal-700 mb-4">
              <Compass className="size-4" />
              {isEs ? "Caminos Guiados" : "Guided Paths"}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
              {isEs ? "Caminos de Aprendizaje" : "Learning Paths"}
            </h2>
            <p className="text-stone-500 max-w-2xl mx-auto text-sm">
              {isEs
                ? "Viajes curados a través del mapa de conocimiento. Cada camino lo lleva paso a paso a través de los conceptos, casos y marcos más relevantes para su situación."
                : "Curated journeys through the knowledge map. Each path takes you step-by-step through the most relevant concepts, cases, and frameworks for your situation."}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {learningPaths.map((path) => (
              <LearningPathCard
                key={path.id}
                path={path}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 4 — Connection Explorer                             */}
      {/* ============================================================ */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-4 py-1.5 text-sm text-stone-600 mb-4">
            <Network className="size-4" />
            {isEs ? "Nodos Centrales" : "Hub Nodes"}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
            {isEs ? "Explorador de Conexiones" : "Connection Explorer"}
          </h2>
          <p className="text-stone-500 max-w-2xl mx-auto text-sm">
            {isEs
              ? "Los elementos de contenido con más conexiones en el grafo de conocimiento. Estos son los conceptos más fundamentales: domínelos y todo lo demás encaja."
              : "The content items with the most connections in the knowledge graph. These are the most foundational concepts: master them and everything else falls into place."}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden">
            <div className="px-5 py-3.5 border-b border-stone-100 bg-stone-50">
              <h3 className="text-sm font-semibold text-stone-600">
                {isEs
                  ? "Top 10 Nodos Más Conectados"
                  : "Top 10 Most Connected Nodes"}
              </h3>
            </div>
            <div className="divide-y divide-stone-50">
              {hubs.map((hub, i) => (
                <HubNodeRow
                  key={`${hub.type}:${hub.id}`}
                  type={hub.type}
                  id={hub.id}
                  connectionCount={hub.connectionCount}
                  rank={i + 1}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 5 — Bottom CTA                                      */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-b from-stone-900 to-stone-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              {isEs
                ? "Explore el Conocimiento Estratégico"
                : "Explore Strategic Knowledge"}
            </h2>
            <p className="text-stone-400 max-w-xl mx-auto text-sm">
              {isEs
                ? "Profundice en cada componente del mapa de conocimiento."
                : "Dive deeper into each component of the knowledge map."}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              {
                href: "/strategy/guides",
                icon: BookOpen,
                label: { en: "Executive Guides", es: "Guías Ejecutivas" },
              },
              {
                href: "/strategy/okrs",
                icon: Target,
                label: { en: "OKR Templates", es: "Plantillas OKR" },
              },
              {
                href: "/strategy/economics",
                icon: GraduationCap,
                label: { en: "Economics", es: "Economía" },
              },
              {
                href: "/strategy/frameworks",
                icon: Layers,
                label: { en: "Frameworks", es: "Marcos" },
              },
              {
                href: "/strategy/leaders",
                icon: UserCheck,
                label: { en: "Leaders", es: "Líderes" },
              },
              {
                href: "/ai-tracker",
                icon: Cpu,
                label: { en: "AI Tracker", es: "Rastreador de IA" },
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col items-center gap-2 rounded-xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 hover:border-white/20 transition-colors text-center"
              >
                <item.icon className="size-6 text-amber-400 group-hover:text-amber-300 transition-colors" />
                <span className="text-xs text-stone-300 group-hover:text-white transition-colors">
                  {t(item.label, locale)}
                </span>
              </Link>
            ))}
          </div>

          {/* Last updated */}
          <p className="text-center text-xs text-stone-500 mt-10">
            {isEs ? "Última actualización:" : "Last updated:"}{" "}
            {KNOWLEDGE_GRAPH_LAST_UPDATED}
          </p>
        </div>
      </section>
    </main>
  );
}
