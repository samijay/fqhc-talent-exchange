"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Breadcrumb, StatBar } from "@/components/ui/design-system";
import {
  FileText,
  MessageSquare,
  GraduationCap,
  Bookmark,
  Briefcase,
  ArrowRight,
  Clock,
  CheckCircle2,
  Circle,
  BookOpen,
  MapPin,
  Target,
  ShieldCheck,
  Stethoscope,
  Wrench,
  Info,
} from "lucide-react";
import { ACADEMY_COURSES } from "@/lib/academy-catalog";

/* ------------------------------------------------------------------ */
/*  Bilingual helper                                                   */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ResumeProgress {
  step: number;
  mode: string;
  formData: Record<string, unknown>;
  timestamp: string;
}

interface RecentFQHC {
  slug: string;
  name: string;
  city: string;
  resilienceGrade: string;
}

interface AcademyCourseProgress {
  courseId: string;
  modulesCompleted: string[];
  totalXP: number;
  currentModuleId: string | null;
  startedAt: string;
  lastActiveAt: string;
}

interface SyllabusProgress {
  [trackId: string]: {
    completedLessons: string[];
    currentLevel: number;
    currentLesson: number;
  };
}

interface AllProgress {
  resumeInProgress: ResumeProgress | null;
  interviewReviewed: string[];
  savedJobs: string[];
  jobFavorites: string[];
  recentFQHCs: RecentFQHC[];
  academyCourses: AcademyCourseProgress[];
  syllabusProgress: SyllabusProgress;
  complianceCompleted: number;
  pathwayRole: string | null;
  pathwayLevel: string | null;
  pathwaySteps: number;
  schedulePlans: number;
}

/* ------------------------------------------------------------------ */
/*  Read all localStorage data                                         */
/* ------------------------------------------------------------------ */

function readAllProgress(): AllProgress {
  const empty: AllProgress = {
    resumeInProgress: null,
    interviewReviewed: [],
    savedJobs: [],
    jobFavorites: [],
    recentFQHCs: [],
    academyCourses: [],
    syllabusProgress: {},
    complianceCompleted: 0,
    pathwayRole: null,
    pathwayLevel: null,
    pathwaySteps: 0,
    schedulePlans: 0,
  };

  if (typeof window === "undefined") return empty;

  try {
    // Resume builder
    const resumeRaw = localStorage.getItem("fqhc-resume-builder-progress");
    if (resumeRaw) {
      const parsed = JSON.parse(resumeRaw);
      // Only show if saved within 7 days
      if (
        parsed.timestamp &&
        Date.now() - new Date(parsed.timestamp).getTime() < 7 * 24 * 60 * 60 * 1000
      ) {
        empty.resumeInProgress = parsed;
      }
    }

    // Interview prep reviewed questions
    const interviewRaw = localStorage.getItem("fqhc-interview-prep-reviewed");
    if (interviewRaw) {
      empty.interviewReviewed = JSON.parse(interviewRaw);
    }

    // Saved jobs
    const savedJobsRaw = localStorage.getItem("saved-jobs");
    if (savedJobsRaw) {
      empty.savedJobs = JSON.parse(savedJobsRaw);
    }

    // Job favorites
    const jobFavRaw = localStorage.getItem("fqhc-job-favorites");
    if (jobFavRaw) {
      empty.jobFavorites = JSON.parse(jobFavRaw);
    }

    // Recently viewed FQHCs
    const recentRaw = localStorage.getItem("recently-viewed-fqhcs");
    if (recentRaw) {
      empty.recentFQHCs = JSON.parse(recentRaw);
    }

    // Academy courses (scan localStorage for academy-* keys)
    const courses: AcademyCourseProgress[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("academy-") && key.includes("-progress-")) {
        const raw = localStorage.getItem(key);
        if (raw) {
          courses.push(JSON.parse(raw));
        }
      }
    }
    empty.academyCourses = courses.filter(
      (c) => c.modulesCompleted.length > 0 || c.totalXP > 0
    );

    // Syllabus progress
    const syllabusRaw = localStorage.getItem("fqhc-syllabus-progress");
    if (syllabusRaw) {
      empty.syllabusProgress = JSON.parse(syllabusRaw);
    }

    // Compliance progress
    const complianceRaw = localStorage.getItem("fqhc-compliance-progress");
    if (complianceRaw) {
      const parsed = JSON.parse(complianceRaw);
      empty.complianceCompleted = Object.keys(parsed.completedItems || {}).length;
    }

    // Learning pathway
    const pathRole = localStorage.getItem("fqhc-selected-role");
    const pathLevel = localStorage.getItem("fqhc-selected-level");
    if (pathRole && pathLevel) {
      empty.pathwayRole = pathRole;
      empty.pathwayLevel = pathLevel;
      const pathRaw = localStorage.getItem(`fqhc-pathway-${pathRole}-${pathLevel}`);
      if (pathRaw) {
        empty.pathwaySteps = JSON.parse(pathRaw).length;
      }
    }

    // Schedule planner
    const schedRaw = localStorage.getItem("fqhc-schedule-planner");
    if (schedRaw) {
      const parsed = JSON.parse(schedRaw);
      empty.schedulePlans = (parsed.schedules || []).length;
    }
  } catch {
    // Fail silently on any parse error
  }

  return empty;
}

/* ------------------------------------------------------------------ */
/*  Course icon helper                                                 */
/* ------------------------------------------------------------------ */

function courseIcon(courseId: string) {
  switch (courseId) {
    case "okr-course":
      return <Target className="size-5 text-teal-600" />;
    case "clinic-manager":
      return <Stethoscope className="size-5 text-rose-600" />;
    case "compliance-essentials":
      return <ShieldCheck className="size-5 text-amber-600" />;
    default:
      return <GraduationCap className="size-5 text-teal-600" />;
  }
}

/* ------------------------------------------------------------------ */
/*  Progress bar component                                             */
/* ------------------------------------------------------------------ */

function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="h-2 w-full rounded-full bg-stone-200">
      <div
        className="h-2 rounded-full bg-teal-600 transition-all"
        style={{ width: `${Math.min(percent, 100)}%` }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

export default function MyProgressPage() {
  const locale = useLocale();
  const isEs = locale === "es";
  const [progress, setProgress] = useState<AllProgress | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(readAllProgress());
  }, []);

  // Still loading (SSR or first render)
  if (!progress) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-stone-500 dark:text-stone-400">
          {isEs ? "Cargando..." : "Loading..."}
        </div>
      </div>
    );
  }

  // Compute stats
  const totalFavorites =
    progress.savedJobs.length + progress.jobFavorites.length;
  const toolsStarted = [
    progress.resumeInProgress !== null,
    progress.interviewReviewed.length > 0,
    progress.academyCourses.length > 0,
    progress.pathwaySteps > 0,
    progress.complianceCompleted > 0,
    progress.schedulePlans > 0,
    Object.keys(progress.syllabusProgress).length > 0,
  ].filter(Boolean).length;

  const totalModulesCompleted = progress.academyCourses.reduce(
    (sum, c) => sum + c.modulesCompleted.length,
    0
  );
  const totalXP = progress.academyCourses.reduce(
    (sum, c) => sum + c.totalXP,
    0
  );

  const syllabusLessonsCompleted = Object.values(progress.syllabusProgress).reduce(
    (sum, track) => sum + (track.completedLessons?.length || 0),
    0
  );

  const hasAnyActivity =
    toolsStarted > 0 ||
    totalFavorites > 0 ||
    progress.recentFQHCs.length > 0 ||
    syllabusLessonsCompleted > 0;

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: isEs ? "Inicio" : "Home", href: "/" },
          { label: isEs ? "Tu Progreso" : "My Progress" },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-teal-50 to-white dark:from-teal-950 dark:to-stone-950 px-4 pb-10 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 sm:text-4xl">
            {isEs ? "Tu Progreso" : "Your Progress"}
          </h1>
          <p className="mt-3 text-base text-stone-600 dark:text-stone-400 sm:text-lg">
            {isEs
              ? "Rastrea tu recorrido a trav\u00e9s de las herramientas de carrera FQHC. Todos los datos se almacenan localmente en tu navegador."
              : "Track your journey across FQHC career tools. All data stored locally in your browser."}
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <StatBar
        stats={[
          {
            value: String(toolsStarted),
            label: isEs ? "Herramientas iniciadas" : "Tools started",
          },
          {
            value: String(progress.interviewReviewed.length),
            label: isEs ? "Preguntas revisadas" : "Questions reviewed",
          },
          {
            value: String(totalModulesCompleted),
            label: isEs ? "M\u00f3dulos completados" : "Modules completed",
          },
          {
            value: String(totalFavorites),
            label: isEs ? "Empleos guardados" : "Saved jobs",
          },
          ...(totalXP > 0
            ? [
                {
                  value: `${totalXP} XP`,
                  label: isEs ? "Experiencia total" : "Total XP",
                },
              ]
            : []),
        ]}
      />

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* ── Empty state ──────────────────────────────────────────── */}
        {!hasAnyActivity && (
          <div className="rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-10 text-center">
            <Circle className="mx-auto size-12 text-stone-300" />
            <h2 className="mt-4 text-xl font-bold text-stone-900 dark:text-stone-100">
              {isEs
                ? "Nada aqu\u00ed todav\u00eda"
                : "Nothing here yet"}
            </h2>
            <p className="mt-2 text-stone-600 dark:text-stone-400">
              {isEs
                ? "Comienza a usar las herramientas de carrera para ver tu progreso aqu\u00ed."
                : "Start using the career tools below to see your progress here."}
            </p>
          </div>
        )}

        {/* ── Section 1: Career Tools Progress ─────────────────────── */}
        {hasAnyActivity && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
              {isEs ? "Progreso de Herramientas" : "Career Tools Progress"}
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Resume Builder */}
              <ToolCard
                icon={<FileText className="size-5 text-teal-600" />}
                title={isEs ? "Constructor de Curr\u00edculum" : "Resume Builder"}
                href="/resume-builder"
                status={
                  progress.resumeInProgress
                    ? {
                        type: "in-progress" as const,
                        detail: isEs
                          ? `Paso ${progress.resumeInProgress.step} \u2014 borrador guardado`
                          : `Step ${progress.resumeInProgress.step} \u2014 draft saved`,
                        date: progress.resumeInProgress.timestamp,
                      }
                    : { type: "not-started" as const }
                }
                locale={locale}
              />

              {/* Interview Prep */}
              <ToolCard
                icon={<MessageSquare className="size-5 text-blue-600" />}
                title={isEs ? "Preparaci\u00f3n para Entrevistas" : "Interview Prep"}
                href="/interview-prep"
                status={
                  progress.interviewReviewed.length > 0
                    ? {
                        type: "in-progress" as const,
                        detail: isEs
                          ? `${progress.interviewReviewed.length} preguntas revisadas`
                          : `${progress.interviewReviewed.length} questions reviewed`,
                      }
                    : { type: "not-started" as const }
                }
                locale={locale}
              />

              {/* Learning Pathway */}
              {progress.pathwaySteps > 0 && progress.pathwayRole && (
                <ToolCard
                  icon={<BookOpen className="size-5 text-violet-600" />}
                  title={isEs ? "Ruta de Aprendizaje" : "Learning Pathway"}
                  href="/pathway"
                  status={{
                    type: "in-progress" as const,
                    detail: isEs
                      ? `${progress.pathwaySteps} pasos completados \u2014 ${progress.pathwayRole.replace(/_/g, " ")}`
                      : `${progress.pathwaySteps} steps completed \u2014 ${progress.pathwayRole.replace(/_/g, " ")}`,
                  }}
                  locale={locale}
                />
              )}

              {/* Compliance */}
              {progress.complianceCompleted > 0 && (
                <ToolCard
                  icon={<ShieldCheck className="size-5 text-amber-600" />}
                  title={isEs ? "Cumplimiento" : "Compliance"}
                  href="/strategy/compliance"
                  status={{
                    type: "in-progress" as const,
                    detail: isEs
                      ? `${progress.complianceCompleted} elementos completados`
                      : `${progress.complianceCompleted} items completed`,
                  }}
                  locale={locale}
                />
              )}

              {/* Schedule Planner */}
              {progress.schedulePlans > 0 && (
                <ToolCard
                  icon={<Wrench className="size-5 text-emerald-600" />}
                  title={isEs ? "Planificador de Horarios" : "Schedule Planner"}
                  href="/strategy/schedule-planner"
                  status={{
                    type: "in-progress" as const,
                    detail: isEs
                      ? `${progress.schedulePlans} horarios guardados`
                      : `${progress.schedulePlans} schedules saved`,
                  }}
                  locale={locale}
                />
              )}
            </div>
          </section>
        )}

        {/* ── Section 2: Academy Courses ───────────────────────────── */}
        {progress.academyCourses.length > 0 && (
          <section className="mt-12 space-y-6">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
              {isEs ? "Cursos de la Academia" : "Academy Courses"}
            </h2>

            <div className="space-y-3">
              {progress.academyCourses
                .sort(
                  (a, b) =>
                    new Date(b.lastActiveAt).getTime() -
                    new Date(a.lastActiveAt).getTime()
                )
                .map((course) => {
                  const meta = ACADEMY_COURSES.find(
                    (c) => c.id === course.courseId
                  );
                  const totalModules = meta?.moduleCount ?? 0;
                  const pct =
                    totalModules > 0
                      ? Math.round(
                          (course.modulesCompleted.length / totalModules) * 100
                        )
                      : 0;
                  return (
                    <Link
                      key={course.courseId}
                      href={(meta?.href ?? `/academy/${course.courseId}`) as "/"}
                      className="flex items-center gap-4 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-4 transition-colors hover:border-teal-300 hover:bg-teal-50/50"
                    >
                      {courseIcon(course.courseId)}
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-stone-900 dark:text-stone-100">
                          {meta
                            ? t(meta.title, locale)
                            : course.courseId.replace(/-/g, " ")}
                        </p>
                        <div className="mt-1 flex items-center gap-3">
                          <div className="flex-1">
                            <ProgressBar percent={pct} />
                          </div>
                          <span className="shrink-0 text-xs font-medium text-stone-600 dark:text-stone-400">
                            {course.modulesCompleted.length}/{totalModules}{" "}
                            {isEs ? "m\u00f3dulos" : "modules"}
                          </span>
                          {course.totalXP > 0 && (
                            <span className="shrink-0 text-xs font-bold text-amber-600">
                              {course.totalXP} XP
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="size-4 shrink-0 text-stone-400" />
                    </Link>
                  );
                })}
            </div>
          </section>
        )}

        {/* ── Section 3: Research Syllabus ─────────────────────────── */}
        {syllabusLessonsCompleted > 0 && (
          <section className="mt-12 space-y-6">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
              {isEs ? "Archivo de Investigaci\u00f3n" : "Research Archive"}
            </h2>

            <div className="grid gap-3 sm:grid-cols-2">
              {Object.entries(progress.syllabusProgress)
                .filter(([, track]) => track.completedLessons?.length > 0)
                .map(([trackId, track]) => (
                  <Link
                    key={trackId}
                    href={"/strategy/research" as "/"}
                    className="flex items-start gap-3 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-4 transition-colors hover:border-teal-300 hover:bg-teal-50/50"
                  >
                    <GraduationCap className="mt-0.5 size-5 shrink-0 text-violet-600" />
                    <div>
                      <p className="font-semibold capitalize text-stone-900 dark:text-stone-100">
                        {trackId.replace(/-/g, " ")}
                      </p>
                      <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                        <CheckCircle2 className="mr-1 inline size-3.5 text-teal-600" />
                        {track.completedLessons.length}{" "}
                        {isEs ? "lecciones completadas" : "lessons completed"}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        )}

        {/* ── Section 4: Saved Jobs & Recently Viewed ──────────────── */}
        {(totalFavorites > 0 || progress.recentFQHCs.length > 0) && (
          <section className="mt-12 space-y-6">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
              {isEs ? "Guardados y Vistos Recientemente" : "Saved & Recently Viewed"}
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Saved/favorited jobs */}
              {totalFavorites > 0 && (
                <Link
                  href={"/jobs" as "/"}
                  className="flex items-center gap-4 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-5 transition-colors hover:border-teal-300 hover:bg-teal-50/50"
                >
                  <Bookmark className="size-6 text-amber-500" />
                  <div>
                    <p className="font-semibold text-stone-900 dark:text-stone-100">
                      {totalFavorites}{" "}
                      {isEs ? "empleos guardados" : "saved jobs"}
                    </p>
                    <p className="text-sm text-stone-500 dark:text-stone-400">
                      {isEs
                        ? "Ver en la p\u00e1gina de empleos"
                        : "View on the jobs page"}
                    </p>
                  </div>
                  <ArrowRight className="ml-auto size-4 text-stone-400" />
                </Link>
              )}

              {/* Recently viewed FQHCs */}
              {progress.recentFQHCs.length > 0 && (
                <div className="rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-5">
                  <p className="mb-3 font-semibold text-stone-900 dark:text-stone-100">
                    <Clock className="mr-1.5 inline size-4 text-stone-500 dark:text-stone-400" />
                    {isEs
                      ? "FQHCs vistos recientemente"
                      : "Recently viewed FQHCs"}
                  </p>
                  <ul className="space-y-2">
                    {progress.recentFQHCs.map((fqhc) => (
                      <li key={fqhc.slug}>
                        <Link
                          href={`/directory/${fqhc.slug}` as "/"}
                          className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-300 transition-colors hover:text-teal-700 dark:text-teal-400"
                        >
                          <MapPin className="size-3.5 shrink-0 text-stone-400" />
                          <span className="truncate font-medium">{fqhc.name}</span>
                          <span className="shrink-0 text-xs text-stone-400">
                            {fqhc.city}
                          </span>
                          {fqhc.resilienceGrade && (
                            <span
                              className={`ml-auto shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold ${gradeColor(fqhc.resilienceGrade)}`}
                            >
                              {fqhc.resilienceGrade}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── Section 5: Quick Actions ─────────────────────────────── */}
        <section className="mt-12 space-y-6">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            {isEs ? "Acciones R\u00e1pidas" : "Quick Actions"}
          </h2>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <QuickAction
              href="/resume-builder"
              icon={<FileText className="size-5 text-teal-600" />}
              label={isEs ? "Constructor de Curr\u00edculum" : "Resume Builder"}
              cta={
                progress.resumeInProgress
                  ? isEs
                    ? "Continuar borrador"
                    : "Continue draft"
                  : isEs
                    ? "Comenzar"
                    : "Get started"
              }
            />
            <QuickAction
              href="/career-insights"
              icon={<Target className="size-5 text-blue-600" />}
              label={isEs ? "Evaluaci\u00f3n de Carrera" : "Career Assessment"}
              cta={isEs ? "Tomar evaluaci\u00f3n" : "Take assessment"}
            />
            <QuickAction
              href="/interview-prep"
              icon={<MessageSquare className="size-5 text-violet-600" />}
              label={isEs ? "Preparaci\u00f3n para Entrevistas" : "Interview Prep"}
              cta={
                progress.interviewReviewed.length > 0
                  ? isEs
                    ? "Continuar"
                    : "Continue"
                  : isEs
                    ? "Comenzar"
                    : "Get started"
              }
            />
            <QuickAction
              href="/career-roadmap"
              icon={<BookOpen className="size-5 text-emerald-600" />}
              label={isEs ? "Ruta de Carrera" : "Career Roadmap"}
              cta={isEs ? "Explorar" : "Explore"}
            />
            <QuickAction
              href="/certifications"
              icon={<GraduationCap className="size-5 text-amber-600" />}
              label={isEs ? "Certificaciones" : "Certifications"}
              cta={isEs ? "Ver cat\u00e1logo" : "View catalog"}
            />
            <QuickAction
              href="/jobs"
              icon={<Briefcase className="size-5 text-rose-600" />}
              label={isEs ? "Buscar Empleos" : "Browse Jobs"}
              cta={isEs ? "Ver empleos" : "View jobs"}
            />
          </div>
        </section>

        {/* ── Reset & Privacy Note ─────────────────────────────────── */}
        <div className="mt-12 flex items-start gap-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 px-4 py-3 text-sm text-stone-500 dark:text-stone-400">
          <Info className="mt-0.5 size-4 shrink-0" />
          <p>
            {isEs
              ? "Tus datos se almacenan solo en tu navegador. Borrar los datos del navegador reiniciar\u00e1 tu progreso."
              : "Your data is stored in your browser only. Clear browser data to reset."}
          </p>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function gradeColor(grade: string): string {
  switch (grade) {
    case "A":
      return "bg-teal-100 dark:bg-teal-900 text-teal-800";
    case "B":
      return "bg-blue-100 text-blue-800";
    case "C":
      return "bg-amber-100 text-amber-800";
    case "D":
      return "bg-orange-100 text-orange-800";
    case "F":
      return "bg-red-100 text-red-800";
    default:
      return "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400";
  }
}

function ToolCard({
  icon,
  title,
  href,
  status,
  locale,
}: {
  icon: React.ReactNode;
  title: string;
  href: string;
  status:
    | { type: "in-progress"; detail: string; date?: string }
    | { type: "not-started" };
  locale: string;
}) {
  const isEs = locale === "es";

  return (
    <Link
      href={href as "/"}
      className="flex items-start gap-4 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-5 transition-colors hover:border-teal-300 hover:bg-teal-50/50"
    >
      <div className="mt-0.5">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-stone-900 dark:text-stone-100">{title}</p>
        {status.type === "in-progress" ? (
          <>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-teal-700 dark:text-teal-400">
              <CheckCircle2 className="size-3.5" />
              {status.detail}
            </p>
            {status.date && (
              <p className="mt-0.5 text-xs text-stone-400">
                <Clock className="mr-1 inline size-3" />
                {new Date(status.date).toLocaleDateString(
                  isEs ? "es-US" : "en-US",
                  { month: "short", day: "numeric" }
                )}
              </p>
            )}
          </>
        ) : (
          <p className="mt-1 text-sm text-stone-400">
            {isEs ? "No iniciado" : "Not started"}
          </p>
        )}
      </div>
      <ArrowRight className="mt-1 size-4 shrink-0 text-stone-400" />
    </Link>
  );
}

function QuickAction({
  href,
  icon,
  label,
  cta,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  cta: string;
}) {
  return (
    <Link
      href={href as "/"}
      className="flex items-center gap-3 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-4 transition-colors hover:border-teal-300 hover:bg-teal-50/50"
    >
      {icon}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">{label}</p>
      </div>
      <span className="shrink-0 text-xs font-semibold text-teal-700 dark:text-teal-400">
        {cta} <ArrowRight className="inline size-3" />
      </span>
    </Link>
  );
}
