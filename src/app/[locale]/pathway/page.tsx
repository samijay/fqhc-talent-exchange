// Learning Pathway — personalized learning journey for FQHC professionals
"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  GraduationCap,
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  Award,
  Briefcase,
  Brain,
  ExternalLink,
  RotateCcw,
} from "lucide-react";
import {
  generateLearningPathway,
  PATHWAY_ROLES,
  EXPERIENCE_LEVELS,
  LEARNING_PATHWAYS_LAST_UPDATED,
  type LearningPathway,
  type ExperienceLevel,
} from "@/lib/learning-pathways";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

function getStorageKey(roleId: string, level: string) {
  return `fqhc-pathway-${roleId}-${level}`;
}

const TYPE_META: Record<
  string,
  { icon: React.ElementType; color: string; bgColor: string; label: { en: string; es: string } }
> = {
  assessment: {
    icon: Brain,
    color: "text-purple-700",
    bgColor: "bg-purple-100",
    label: { en: "Assessment", es: "Evaluación" },
  },
  guide: {
    icon: BookOpen,
    color: "text-teal-700",
    bgColor: "bg-teal-100",
    label: { en: "Guide", es: "Guía" },
  },
  certification: {
    icon: Award,
    color: "text-amber-700",
    bgColor: "bg-amber-100",
    label: { en: "Certification", es: "Certificación" },
  },
  "case-study": {
    icon: Briefcase,
    color: "text-blue-700",
    bgColor: "bg-blue-100",
    label: { en: "Case Study", es: "Caso de Estudio" },
  },
  tool: {
    icon: Sparkles,
    color: "text-indigo-700",
    bgColor: "bg-indigo-100",
    label: { en: "Tool", es: "Herramienta" },
  },
  masterclass: {
    icon: GraduationCap,
    color: "text-red-700",
    bgColor: "bg-red-100",
    label: { en: "Masterclass", es: "Masterclass" },
  },
  resource: {
    icon: ExternalLink,
    color: "text-green-700",
    bgColor: "bg-green-100",
    label: { en: "Resource", es: "Recurso" },
  },
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PathwayPage() {
  const locale = useLocale();
  const isEs = locale === "es";

  // Selection state
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<ExperienceLevel | null>(null);
  const [pathway, setPathway] = useState<LearningPathway | null>(null);

  // Completion tracking
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  // Load completion state from localStorage
  useEffect(() => {
    if (pathway) {
      const key = getStorageKey(pathway.roleId, pathway.level);
      try {
        const stored = localStorage.getItem(key);
        if (stored) {
          setCompletedSteps(new Set(JSON.parse(stored)));
        }
      } catch {
        // ignore localStorage errors
      }
    }
  }, [pathway]);

  // Save completion state
  const toggleStep = useCallback(
    (stepId: string) => {
      if (!pathway) return;
      setCompletedSteps((prev) => {
        const next = new Set(prev);
        if (next.has(stepId)) {
          next.delete(stepId);
        } else {
          next.add(stepId);
        }
        const key = getStorageKey(pathway.roleId, pathway.level);
        try {
          localStorage.setItem(key, JSON.stringify([...next]));
        } catch {
          // ignore
        }
        return next;
      });
    },
    [pathway]
  );

  // Generate pathway
  const handleGenerate = () => {
    if (selectedRole && selectedLevel) {
      const pw = generateLearningPathway(selectedRole, selectedLevel);
      setPathway(pw);
      setCompletedSteps(new Set());
      // Try to load saved progress
      const key = getStorageKey(selectedRole, selectedLevel);
      try {
        const stored = localStorage.getItem(key);
        if (stored) {
          setCompletedSteps(new Set(JSON.parse(stored)));
        }
      } catch {
        // ignore
      }
    }
  };

  const handleReset = () => {
    setPathway(null);
    setSelectedRole(null);
    setSelectedLevel(null);
    setCompletedSteps(new Set());
  };

  // Progress calculation
  const completedCount = pathway
    ? pathway.phases.reduce(
        (sum, phase) =>
          sum + phase.steps.filter((s) => completedSteps.has(s.id)).length,
        0
      )
    : 0;
  const progressPercent = pathway
    ? Math.round((completedCount / pathway.totalSteps) * 100)
    : 0;

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-teal-900 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-2 text-teal-400 mb-4">
            <GraduationCap className="size-6" />
            <span className="text-sm font-bold uppercase tracking-widest">
              {isEs ? "Ruta de Aprendizaje" : "Learning Pathway"}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
            {isEs
              ? "Tu Camino Personalizado en FQHC"
              : "Your Personalized FQHC Journey"}
          </h1>
          <p className="mt-4 text-lg text-stone-300 max-w-2xl mx-auto">
            {isEs
              ? "Selecciona tu rol y nivel de experiencia para obtener una ruta de aprendizaje curada a través de guías, evaluaciones, certificaciones y herramientas estratégicas."
              : "Select your role and experience level to get a curated learning journey through guides, assessments, certifications, and strategic tools."}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {!pathway ? (
            /* ======================================================= */
            /*  SELECTION SCREEN                                        */
            /* ======================================================= */
            <div className="space-y-8">
              {/* Step 1: Role */}
              <div>
                <h2 className="text-xl font-bold text-stone-900 mb-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-teal-700 text-white text-sm font-bold mr-2">
                    1
                  </span>
                  {isEs ? "¿Cuál es tu rol?" : "What's your role?"}
                </h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {PATHWAY_ROLES.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`rounded-xl border-2 p-4 text-left transition-all ${
                        selectedRole === role.id
                          ? "border-teal-600 bg-teal-50 shadow-sm"
                          : "border-stone-200 bg-white hover:border-stone-300"
                      }`}
                    >
                      <p
                        className={`text-sm font-bold ${
                          selectedRole === role.id
                            ? "text-teal-700"
                            : "text-stone-900"
                        }`}
                      >
                        {isEs ? role.es : role.en}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Experience Level */}
              {selectedRole && (
                <div>
                  <h2 className="text-xl font-bold text-stone-900 mb-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-teal-700 text-white text-sm font-bold mr-2">
                      2
                    </span>
                    {isEs
                      ? "¿Cuál es tu nivel de experiencia?"
                      : "What's your experience level?"}
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-4">
                    {EXPERIENCE_LEVELS.map((level) => (
                      <button
                        key={level.id}
                        onClick={() => setSelectedLevel(level.id)}
                        className={`rounded-xl border-2 p-4 text-left transition-all ${
                          selectedLevel === level.id
                            ? "border-teal-600 bg-teal-50 shadow-sm"
                            : "border-stone-200 bg-white hover:border-stone-300"
                        }`}
                      >
                        <p
                          className={`text-sm font-bold ${
                            selectedLevel === level.id
                              ? "text-teal-700"
                              : "text-stone-900"
                          }`}
                        >
                          {isEs ? level.es : level.en}
                        </p>
                        <p className="text-xs text-stone-500 mt-0.5">
                          {level.years}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Generate Button */}
              {selectedRole && selectedLevel && (
                <button
                  onClick={handleGenerate}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-teal-800 hover:shadow-xl active:scale-[0.98]"
                >
                  <Sparkles className="size-5" />
                  {isEs
                    ? "Generar Mi Ruta de Aprendizaje"
                    : "Generate My Learning Pathway"}
                  <ArrowRight className="size-5" />
                </button>
              )}
            </div>
          ) : (
            /* ======================================================= */
            /*  PATHWAY DISPLAY                                         */
            /* ======================================================= */
            <div className="space-y-6">
              {/* Header with progress */}
              <div className="rounded-xl bg-white border border-stone-200 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-teal-700">
                      {t(pathway.levelLabel, locale)}
                    </p>
                    <h2 className="text-xl font-bold text-stone-900">
                      {t(pathway.roleLabel, locale)}
                    </h2>
                    <p className="mt-1 text-sm text-stone-500">
                      {pathway.totalSteps} {isEs ? "pasos" : "steps"} ·{" "}
                      ~{Math.round(pathway.totalMinutes / 60)}{" "}
                      {isEs ? "horas" : "hours"}
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1 rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-50"
                  >
                    <RotateCcw className="size-3" />
                    {isEs ? "Cambiar" : "Change"}
                  </button>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-stone-500">
                      {isEs ? "Progreso" : "Progress"}
                    </span>
                    <span className="text-xs font-bold text-teal-700">
                      {completedCount}/{pathway.totalSteps} ({progressPercent}%)
                    </span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-stone-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Phases */}
              {pathway.phases.map((phase, phaseIdx) => {
                const phaseCompleted = phase.steps.filter((s) =>
                  completedSteps.has(s.id)
                ).length;
                const phaseTotal = phase.steps.length;

                return (
                  <div key={phase.id} className="space-y-3">
                    {/* Phase header */}
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                          phaseCompleted === phaseTotal
                            ? "bg-teal-600 text-white"
                            : "bg-stone-200 text-stone-600"
                        }`}
                      >
                        {phaseCompleted === phaseTotal ? "✓" : phaseIdx + 1}
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-stone-900">
                          {t(phase.title, locale)}
                        </h3>
                        <p className="text-xs text-stone-500">
                          {t(phase.description, locale)} · {phaseCompleted}/
                          {phaseTotal}
                        </p>
                      </div>
                    </div>

                    {/* Steps */}
                    <div className="ml-4 space-y-2 border-l-2 border-stone-200 pl-7">
                      {phase.steps.map((step) => {
                        const done = completedSteps.has(step.id);
                        const meta = TYPE_META[step.type] ?? TYPE_META.guide;
                        const Icon = meta.icon;

                        return (
                          <div
                            key={step.id}
                            className={`rounded-xl border p-4 transition-all ${
                              done
                                ? "border-teal-200 bg-teal-50/50"
                                : "border-stone-200 bg-white"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {/* Checkbox */}
                              <button
                                onClick={() => toggleStep(step.id)}
                                className="mt-0.5 shrink-0"
                              >
                                {done ? (
                                  <CheckCircle2 className="size-5 text-teal-600" />
                                ) : (
                                  <Circle className="size-5 text-stone-300 hover:text-stone-400" />
                                )}
                              </button>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                  <span
                                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${meta.bgColor} ${meta.color}`}
                                  >
                                    <Icon className="size-3" />
                                    {t(meta.label, locale)}
                                  </span>
                                  <span className="flex items-center gap-1 text-[10px] text-stone-400">
                                    <Clock className="size-3" />
                                    {step.estimatedMinutes}{" "}
                                    {isEs ? "min" : "min"}
                                  </span>
                                </div>
                                <p
                                  className={`text-sm font-bold ${
                                    done
                                      ? "text-stone-500 line-through"
                                      : "text-stone-900"
                                  }`}
                                >
                                  {t(step.title, locale)}
                                </p>
                                <p className="mt-0.5 text-xs text-stone-500">
                                  {t(step.description, locale)}
                                </p>
                              </div>

                              {/* Go link */}
                              <Link
                                href={step.href}
                                className="shrink-0 flex items-center gap-1 rounded-lg bg-teal-700 px-3 py-1.5 text-xs font-bold text-white hover:bg-teal-800 transition-colors"
                              >
                                {isEs ? "Ir" : "Go"}
                                <ArrowRight className="size-3" />
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Completion message */}
              {progressPercent === 100 && (
                <div className="rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 p-6 text-center text-white">
                  <GraduationCap className="mx-auto size-10 mb-2" />
                  <h3 className="text-xl font-bold">
                    {isEs
                      ? "🎉 ¡Ruta Completada!"
                      : "🎉 Pathway Complete!"}
                  </h3>
                  <p className="mt-1 text-sm text-teal-100">
                    {isEs
                      ? "Has completado todos los pasos. ¡Estás listo para tu próximo paso en FQHCs!"
                      : "You've completed all steps. You're ready for your next move in FQHCs!"}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <div className="mx-auto max-w-4xl px-4 pb-8 text-xs text-stone-400 text-center">
        {isEs ? "Última actualización" : "Last updated"}:{" "}
        {LEARNING_PATHWAYS_LAST_UPDATED}
      </div>
    </main>
  );
}
