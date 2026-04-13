// FQHC Academy — Central hub for all training, courses, and career tools
"use client";

import { createElement, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import {
  GraduationCap,
  ArrowRight,
  Zap,
  BookOpen,
  Clock,
  Target,
  Calculator,
  Stethoscope,
  ShieldCheck,
  CalendarDays,
  Compass,
  MessageSquare,
  FileText,
  Route,
  Map,
  Award,
  Sparkles,
  Users,
  TrendingUp,
  CheckCircle2,
  Lock,
  Star,
  PlayCircle,
  Microscope,
  Receipt,
  ClipboardCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/ui/design-system";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ACADEMY_COURSES,
  LEARNING_TOOLS,
  type AcademyCourse,
  type LearningTool,
  type TimeTrack,
} from "@/lib/academy-catalog";
import {
  getLearningProgressSummary,
  type LearningProgressSummary,
} from "@/lib/learning-progress";
import { t } from "@/lib/i18n-helpers";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

// Map icon strings to components
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Target,
  Calculator,
  GraduationCap,
  Stethoscope,
  ShieldCheck,
  CalendarDays,
  Compass,
  MessageSquare,
  FileText,
  Route,
  Map,
  Award,
  Zap,
  BookOpen,
  Microscope,
  Users,
  Receipt,
  ClipboardCheck,
};

const getIcon = (name: string) => ICON_MAP[name] || BookOpen;

/* ------------------------------------------------------------------ */
/*  Continue Where You Left Off                                        */
/* ------------------------------------------------------------------ */

function ContinueCard({
  summary,
  locale,
  isEs,
}: {
  summary: LearningProgressSummary;
  locale: string;
  isEs: boolean;
}) {
  if (!summary.hasActivity || !summary.mostRecent) return null;

  const recent = summary.mostRecent;

  return (
    <div className="rounded-2xl border-2 border-teal-200 bg-gradient-to-r from-teal-50 via-white to-teal-50 p-5 sm:p-6 dark:border-teal-900 dark:from-teal-950/30 dark:to-stone-900">
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-teal-100 p-3 dark:bg-teal-900/40">
          <PlayCircle className="size-6 text-teal-700 dark:text-teal-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
            {isEs ? "Continúa Donde Lo Dejaste" : "Continue Where You Left Off"}
          </p>
          <h3 className="mt-1 text-lg font-bold text-stone-900 dark:text-stone-100">
            {t(recent.title, locale)}
          </h3>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-500">
            {t(recent.detail, locale)}
          </p>

          {/* Progress bar */}
          <div className="mt-3 flex items-center gap-3">
            <div className="h-2 flex-1 rounded-full bg-stone-200 dark:bg-stone-700 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-500"
                style={{ width: `${recent.progress}%` }}
              />
            </div>
            <span className="text-xs font-bold text-teal-700 dark:text-teal-400 whitespace-nowrap">
              {recent.progress}%
            </span>
          </div>

          {/* Stats row */}
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-stone-500 dark:text-stone-500">
            {summary.totalXP > 0 && (
              <span className="flex items-center gap-1">
                <Sparkles className="size-3.5 text-amber-500" />
                {summary.totalXP} XP {isEs ? "total" : "total"}
              </span>
            )}
            {summary.totalCoursesStarted > 1 && (
              <span className="flex items-center gap-1">
                <BookOpen className="size-3.5" />
                {summary.totalCoursesStarted} {isEs ? "cursos activos" : "active courses"}
              </span>
            )}
          </div>

          <div className="mt-4">
            <Link href={recent.href as "/academy"}>
              <Button className="bg-teal-700 hover:bg-teal-800 text-white">
                {isEs ? "Continuar" : "Continue"}
                <ArrowRight className="size-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Course Card                                                        */
/* ------------------------------------------------------------------ */

function CourseCard({
  course,
  locale,
  isEs,
}: {
  course: AcademyCourse;
  locale: string;
  isEs: boolean;
}) {
  const isLive = course.status === "live";

  const colorMap: Record<string, string> = {
    teal: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    violet: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
    rose: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    indigo: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  };

  const iconBg = colorMap[course.color] || colorMap.teal;

  return (
    <Card className="group relative overflow-hidden border-stone-200 transition-all hover:shadow-lg hover:border-stone-300 dark:border-stone-700 dark:hover:border-stone-600">
      {!isLive && (
        <div className="absolute top-3 right-3">
          <Badge variant="outline" className="text-xs border-amber-300 text-amber-600 dark:border-amber-600 dark:text-amber-400">
            <Lock className="size-3 mr-1" />
            {isEs ? "Próximamente" : "Coming Soon"}
          </Badge>
        </div>
      )}
      <CardContent className="p-6">
        {/* Icon + meta */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`rounded-xl p-3 ${iconBg}`}>
            {createElement(getIcon(course.icon), { className: "size-6" })}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-stone-900 dark:text-stone-100 leading-tight">
              {t(course.title, locale)}
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-500 mt-1">
              {t(course.subtitle, locale)}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-stone-600 dark:text-stone-300 mb-4 line-clamp-2">
          {t(course.description, locale)}
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-xs text-stone-500 dark:text-stone-500 mb-4">
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {course.estimatedMinutes} min
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="size-3.5" />
            {course.moduleCount} {course.moduleCount === 1
              ? (isEs ? "módulo" : "module")
              : (isEs ? "módulos" : "modules")}
          </span>
          {course.xpTotal && (
            <span className="flex items-center gap-1">
              <Sparkles className="size-3.5" />
              {course.xpTotal} XP
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {course.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-500"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* CTA */}
        {isLive ? (
          <Link href={course.href as "/strategy/okr-course"}>
            <Button className="w-full bg-teal-700 hover:bg-teal-800 text-white">
              {isEs ? "Comenzar Curso" : "Start Course"}
              <ArrowRight className="size-4 ml-2" />
            </Button>
          </Link>
        ) : (
          <Button
            variant="outline"
            className="w-full border-stone-300 text-stone-500 dark:border-stone-600 dark:text-stone-500"
            disabled
          >
            {isEs ? "Notificarme al Lanzar" : "Notify Me at Launch"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Tool Card                                                          */
/* ------------------------------------------------------------------ */

function ToolCard({
  tool,
  locale,
}: {
  tool: LearningTool;
  locale: string;
}) {
  const colorMap: Record<string, string> = {
    teal: "text-teal-600 dark:text-teal-400",
    blue: "text-blue-600 dark:text-blue-400",
    green: "text-green-600 dark:text-green-400",
    violet: "text-violet-600 dark:text-violet-400",
    amber: "text-amber-600 dark:text-amber-400",
    rose: "text-rose-600 dark:text-rose-400",
  };

  const iconColor = colorMap[tool.color] || colorMap.teal;

  return (
    <Link href={tool.href as "/career-insights"}>
      <div className="group flex items-start gap-3 rounded-xl border border-stone-200 bg-white p-4 transition-all hover:shadow-md hover:border-teal-200 dark:border-stone-700 dark:bg-stone-800/50 dark:hover:border-teal-800">
        {createElement(getIcon(tool.icon), { className: `size-5 mt-0.5 shrink-0 ${iconColor}` })}
        <div className="min-w-0">
          <h4 className="font-semibold text-sm text-stone-900 dark:text-stone-100 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
            {t(tool.title, locale)}
          </h4>
          <p className="text-xs text-stone-500 dark:text-stone-500 mt-1 line-clamp-2">
            {t(tool.description, locale)}
          </p>
        </div>
        <ArrowRight className="size-4 shrink-0 text-stone-500 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Time Track Selector                                                */
/* ------------------------------------------------------------------ */

function TimeTrackSelector({
  selected,
  onSelect,
  isEs,
}: {
  selected: TimeTrack | "all";
  onSelect: (track: TimeTrack | "all") => void;
  isEs: boolean;
}) {
  const tracks: { key: TimeTrack | "all"; label: string; icon: React.ComponentType<{ className?: string }>; desc: string }[] = [
    {
      key: "all",
      label: isEs ? "Todos" : "All",
      icon: Star,
      desc: isEs ? "Ver todos los cursos" : "View all courses",
    },
    {
      key: "quick",
      label: isEs ? "5-10 min" : "5-10 min",
      icon: Zap,
      desc: isEs ? "Bocados rápidos" : "Quick bites",
    },
    {
      key: "standard",
      label: isEs ? "20-45 min" : "20-45 min",
      icon: BookOpen,
      desc: isEs ? "Módulos enfocados" : "Focused modules",
    },
    {
      key: "deep-dive",
      label: isEs ? "1-3 horas" : "1-3 hours",
      icon: GraduationCap,
      desc: isEs ? "Inmersiones profundas" : "Deep dives",
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {tracks.map(({ key, label, icon: TrackIcon, desc }) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
            selected === key
              ? "bg-teal-700 text-white shadow-md"
              : "bg-white text-stone-600 border border-stone-200 hover:border-teal-300 hover:text-teal-700 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700 dark:hover:border-teal-700"
          }`}
        >
          <TrackIcon className="size-4" />
          <span>{label}</span>
          <span className="hidden sm:inline text-xs opacity-75">— {desc}</span>
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

export default function AcademyPage() {
  const locale = useLocale();
  const isEs = locale === "es";
  const [timeFilter, setTimeFilter] = useState<TimeTrack | "all">("all");
  const [audienceFilter, setAudienceFilter] = useState<"all" | "leaders" | "job-seekers" | "clinical">("all");
  // Load progress via lazy initializer (runs once on client mount, no effect needed)
  const [progressSummary] = useState<LearningProgressSummary | null>(
    () => getLearningProgressSummary()
  );

  const filteredCourses = ACADEMY_COURSES.filter((c) => {
    if (timeFilter !== "all" && c.timeTrack !== timeFilter) return false;
    if (audienceFilter !== "all" && c.audience !== audienceFilter && c.audience !== "all") return false;
    return true;
  });

  const totalModules = ACADEMY_COURSES.reduce((s, c) => s + c.moduleCount, 0);
  const totalHours = Math.round(
    ACADEMY_COURSES.reduce((s, c) => s + c.estimatedMinutes, 0) / 60,
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white dark:from-stone-950 dark:to-stone-900">
      {/* ---- Hero ---- */}
      <PageHero
        variant="dark"
        title={{ en: "Your FQHC Learning Hub", es: "Tu Centro de Aprendizaje FQHC" }}
        subtitle={{
          en: "Interactive courses, simulators, and career tools — all free, all built for community health center professionals.",
          es: "Cursos interactivos, simuladores y herramientas de carrera — todo gratis, todo dise\u00f1ado para profesionales de centros de salud comunitarios.",
        }}
        meta={isEs ? "Academia FQHC" : "FQHC Academy"}
        stats={[
          { value: `${ACADEMY_COURSES.length}`, label: isEs ? "Cursos" : "Courses" },
          { value: `${totalModules}+`, label: isEs ? "M\u00f3dulos" : "Modules" },
          { value: `${totalHours}+`, label: isEs ? "Horas de Contenido" : "Hours of Content" },
          { value: isEs ? "Gratis" : "Free", label: isEs ? "Para Siempre" : "Forever" },
        ]}
      />

      {/* ---- Continue Where You Left Off (only shown if user has progress) ---- */}
      {progressSummary?.hasActivity && (
        <section className="mx-auto max-w-6xl px-4 pt-8 sm:pt-12">
          <ContinueCard summary={progressSummary} locale={locale} isEs={isEs} />
        </section>
      )}

      {/* ---- Quick Start (show when no progress) ---- */}
      {!progressSummary?.hasActivity && (
        <section className="mx-auto max-w-6xl px-4 pt-8 sm:pt-12">
          <div className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-white p-5 sm:p-6 dark:border-amber-900/50 dark:from-amber-950/20 dark:to-stone-900">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-amber-100 p-3 dark:bg-amber-900/40">
                <Compass className="size-6 text-amber-700 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-stone-900 dark:text-stone-100">
                  {isEs ? "¿No sabes por dónde empezar?" : "Not sure where to start?"}
                </h3>
                <p className="mt-1 text-sm text-stone-600 dark:text-stone-500">
                  {isEs
                    ? "Toma nuestra evaluación de carrera de 3 minutos o genera una ruta de aprendizaje personalizada según tu rol."
                    : "Take our 3-minute career assessment or generate a personalized learning pathway based on your role."}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href="/career-insights">
                    <Button size="sm" className="bg-teal-700 hover:bg-teal-800 text-white">
                      <Compass className="size-4 mr-1.5" />
                      {isEs ? "Evaluación de Carrera" : "Career Assessment"}
                    </Button>
                  </Link>
                  <Link href="/pathway">
                    <Button size="sm" variant="outline" className="border-teal-300 text-teal-700 hover:bg-teal-50 dark:border-teal-700 dark:text-teal-400">
                      <Route className="size-4 mr-1.5" />
                      {isEs ? "Ruta de Aprendizaje" : "Learning Pathway"}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---- How Much Time Do You Have? ---- */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 sm:text-3xl">
            {isEs ? "¿Cuánto Tiempo Tienes?" : "How Much Time Do You Have?"}
          </h2>
          <p className="mt-2 text-stone-500 dark:text-stone-500 max-w-xl mx-auto">
            {isEs
              ? "Elige tu ritmo de aprendizaje. Cada módulo funciona de forma independiente."
              : "Pick your learning pace. Every module works standalone."}
          </p>
        </div>

        <TimeTrackSelector
          selected={timeFilter}
          onSelect={setTimeFilter}
          isEs={isEs}
        />

        {/* Audience filter */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {([
            { key: "all" as const, en: "All", es: "Todos" },
            { key: "leaders" as const, en: "For Leaders", es: "Para Líderes" },
            { key: "job-seekers" as const, en: "For Job Seekers", es: "Para Buscadores" },
            { key: "clinical" as const, en: "Clinical", es: "Clínico" },
          ]).map(({ key, en, es }) => (
            <button
              key={key}
              onClick={() => setAudienceFilter(key)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                audienceFilter === key
                  ? "bg-teal-100 text-teal-800 ring-1 ring-teal-300 dark:bg-teal-900/40 dark:text-teal-300 dark:ring-teal-700"
                  : "text-stone-500 hover:text-teal-700 dark:text-stone-500 dark:hover:text-teal-400"
              }`}
            >
              {isEs ? es : en}
            </button>
          ))}
        </div>
      </section>

      {/* ---- Featured Course (OKR) ---- */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="rounded-2xl border-2 border-teal-200 bg-gradient-to-r from-teal-50 to-white p-6 sm:p-8 dark:border-teal-900 dark:from-teal-950/30 dark:to-stone-900">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="rounded-xl bg-teal-100 p-4 dark:bg-teal-900/40">
              <Target className="size-8 text-teal-700 dark:text-teal-400" />
            </div>
            <div className="flex-1">
              <Badge className="mb-2 bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
                <Sparkles className="h-3 w-3 mr-1" />
                {isEs ? "Curso Destacado" : "Featured Course"}
              </Badge>
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                {isEs
                  ? "Domina los OKRs para Tu FQHC"
                  : "Master OKRs for Your FQHC"}
              </h3>
              <p className="mt-2 text-stone-600 dark:text-stone-300">
                {isEs
                  ? "6 módulos interactivos con ejercicios prácticos, simuladores de puntuación y un proyecto final. 100% gratis, en tu navegador, sin cuenta necesaria."
                  : "6 interactive modules with hands-on exercises, scoring simulators, and a capstone project. 100% free, in your browser, no account needed."}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-stone-500 dark:text-stone-500">
                <span className="flex items-center gap-1">
                  <Clock className="size-4" /> 90 min
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="size-4" /> 6 {isEs ? "módulos" : "modules"}
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles className="size-4" /> 600 XP
                </span>
              </div>
              <div className="mt-4">
                <Link href="/strategy/okr-course">
                  <Button className="bg-teal-700 hover:bg-teal-800 text-white">
                    {isEs ? "Comenzar Ahora" : "Start Now"}
                    <ArrowRight className="size-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Course Catalog Grid ---- */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            {isEs ? "Catálogo de Cursos" : "Course Catalog"}
          </h2>
          <span className="text-sm text-stone-500 dark:text-stone-500">
            {filteredCourses.length} {isEs ? "cursos" : "courses"}
            {timeFilter !== "all" && (
              <button
                onClick={() => setTimeFilter("all")}
                className="ml-2 text-teal-600 hover:text-teal-700 dark:text-teal-400"
              >
                {isEs ? "Mostrar todos" : "Show all"}
              </button>
            )}
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              locale={locale}
              isEs={isEs}
            />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12 text-stone-500 dark:text-stone-500">
            <BookOpen className="mx-auto size-8 mb-3 opacity-50" />
            <p>
              {isEs
                ? "No hay cursos en esta categoría todavía. ¡Pronto habrá más!"
                : "No courses in this category yet. More coming soon!"}
            </p>
          </div>
        )}
      </section>

      {/* ---- Career Tools Section ---- */}
      <section className="bg-stone-100/50 dark:bg-stone-900/50 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 sm:text-3xl">
              {isEs ? "Herramientas de Carrera" : "Career Tools"}
            </h2>
            <p className="mt-2 text-stone-500 dark:text-stone-500 max-w-xl mx-auto">
              {isEs
                ? "Herramientas interactivas gratuitas para cada etapa de tu carrera en salud comunitaria."
                : "Free interactive tools for every stage of your community health career."}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LEARNING_TOOLS.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---- What You'll Learn ---- */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 sm:text-3xl">
            {isEs ? "Lo Que Aprenderás" : "What You'll Learn"}
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: TrendingUp,
              title: isEs ? "Ingresos y Finanzas" : "Revenue & Finance",
              desc: isEs
                ? "PPS, 340B, mezcla de pagadores, modelado financiero y estrategias de diversificación de ingresos"
                : "PPS, 340B, payer mix, financial modeling, and revenue diversification strategies",
            },
            {
              icon: Users,
              title: isEs ? "Atención en Equipo" : "Team-Based Care",
              desc: isEs
                ? "Proporción MA:proveedor, delegación, alcance de práctica y diseño de flujos de trabajo"
                : "MA:provider ratios, delegation, scope of practice, and workflow design",
            },
            {
              icon: CalendarDays,
              title: isEs ? "Programación y Operaciones" : "Scheduling & Ops",
              desc: isEs
                ? "Optimización de turnos, cobertura, horas extras, planificación de vacaciones e indicadores de productividad"
                : "Shift optimization, coverage, overtime, vacation planning, and productivity metrics",
            },
            {
              icon: ShieldCheck,
              title: isEs ? "Cumplimiento y Riesgo" : "Compliance & Risk",
              desc: isEs
                ? "HIPAA, HRSA OSV, OSHA, facturación y documentación — con listas de verificación interactivas"
                : "HIPAA, HRSA OSV, OSHA, billing, and documentation — with interactive checklists",
            },
            {
              icon: CheckCircle2,
              title: isEs ? "Desarrollo de Carrera" : "Career Development",
              desc: isEs
                ? "Evaluaciones de habilidades, preparación para entrevistas, construcción de CV y rutas de certificación"
                : "Skill assessments, interview prep, resume building, and certification pathways",
            },
            {
              icon: Target,
              title: isEs ? "Liderazgo y Estrategia" : "Leadership & Strategy",
              desc: isEs
                ? "OKRs, gestión del cambio, resiliencia organizacional y preparación para crisis"
                : "OKRs, change management, organizational resilience, and crisis preparedness",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-700 dark:bg-stone-800/50"
            >
              <item.icon className="size-6 shrink-0 text-teal-600 dark:text-teal-400" />
              <div>
                <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-500 mt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Newsletter CTA ---- */}
      <section className="bg-gradient-to-br from-teal-800 to-teal-900 px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <GraduationCap className="mx-auto size-8 text-teal-300 mb-4" />
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {isEs
              ? "Recibe Lecciones Gratis en Tu Inbox"
              : "Get Free Lessons in Your Inbox"}
          </h2>
          <p className="mt-3 text-teal-200">
            {isEs
              ? "Intel semanal para líderes FQHC + alertas de empleo y herramientas de carrera. Sin spam."
              : "Weekly intel for FQHC leaders + job alerts and career tools. No spam, ever."}
          </p>
          <div className="mt-6 max-w-md mx-auto">
            <NewsletterSignup
              variant="inline"
              defaultAudience="both"
              showAudienceToggle={true}
            />
          </div>
        </div>
      </section>

      {/* ---- Bottom Cross-Links ---- */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            {isEs ? "Explora Más" : "Explore More"}
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { href: "/jobs" as const, label: isEs ? "Buscar Empleos" : "Browse Jobs" },
            { href: "/directory" as const, label: isEs ? "Directorio FQHC" : "FQHC Directory" },
            { href: "/salary-data" as const, label: isEs ? "Datos Salariales" : "Salary Data" },
            { href: "/blog" as const, label: isEs ? "Blog y Análisis" : "Blog & Analysis" },
            { href: "/strategy/okrs" as const, label: isEs ? "Plantillas OKR" : "OKR Templates" },
            { href: "/newsletter" as const, label: isEs ? "Newsletter" : "Newsletter" },
          ].map((link) => (
            <Link key={link.href} href={link.href}>
              <Button variant="outline" className="border-stone-300 dark:border-stone-600">
                {link.label}
                <ArrowRight className="size-3.5 ml-1.5" />
              </Button>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
