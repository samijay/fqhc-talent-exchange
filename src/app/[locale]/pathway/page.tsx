// Learning Pathway — personalized learning journey for FQHC professionals
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
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
  Share2,
  Check,
  Link2,
} from "lucide-react";
import { ShareableAchievement } from "@/components/share/ShareableAchievement";
import { trackEvent, syncProgress, getServerProgress } from "@/lib/track";
import { useAuth } from "@/components/auth/AuthProvider";
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
  const searchParams = useSearchParams();
  const { user } = useAuth();

  // Selection state
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<ExperienceLevel | null>(null);
  const [pathway, setPathway] = useState<LearningPathway | null>(null);
  const [shareState, setShareState] = useState<"idle" | "copied">("idle");

  // Completion tracking
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const completionTracked = useRef(false);

  // Auto-generate from URL params (e.g. /pathway?role=chw&level=entry)
  useEffect(() => {
    const roleParam = searchParams.get("role");
    const levelParam = searchParams.get("level") as ExperienceLevel | null;
    if (roleParam && levelParam) {
      const validRole = PATHWAY_ROLES.find((r) => r.id === roleParam);
      const validLevel = EXPERIENCE_LEVELS.find((l) => l.id === levelParam);
      if (validRole && validLevel) {
        const pw = generateLearningPathway(roleParam, levelParam);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedRole(roleParam);
         
        setSelectedLevel(levelParam);
         
        setPathway(pw);
        // Load saved progress
        const key = getStorageKey(roleParam, levelParam);
        try {
          const stored = localStorage.getItem(key);
          if (stored) {
             
            setCompletedSteps(new Set(JSON.parse(stored)));
          }
        } catch {
          // ignore
        }
      }
    }
  }, [searchParams]);

  // Load completion state from localStorage + merge with server
  useEffect(() => {
    if (!pathway) return;
    const key = getStorageKey(pathway.roleId, pathway.level);
    const courseId = `pathway-${pathway.roleId}-${pathway.level}`;
    let localSteps: string[] = [];

    try {
      const stored = localStorage.getItem(key);
      if (stored) localSteps = JSON.parse(stored);
    } catch {
      // ignore
    }

    if (user?.email) {
      // Merge localStorage with server progress
      (async () => {
        const serverData = await getServerProgress(user.email!, courseId);
        const serverSteps = serverData?.modules_completed ?? [];
        const merged = [...new Set([...localSteps, ...serverSteps])];
        setCompletedSteps(new Set(merged));
        // Persist merged set back to both
        try {
          localStorage.setItem(key, JSON.stringify(merged));
        } catch { /* ignore */ }
        if (merged.length > serverSteps.length) {
          syncProgress({ email: user.email!, course_id: courseId, modules_completed: merged });
        }
      })();
    } else if (localSteps.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCompletedSteps(new Set(localSteps));
    }
  }, [pathway, user?.email]);

  // Save completion state (localStorage + server sync)
  function toggleStep(stepId: string) {
    if (!pathway) return;
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(stepId)) {
        next.delete(stepId);
      } else {
        next.add(stepId);
      }
      const arr = [...next];
      const key = getStorageKey(pathway.roleId, pathway.level);
      try {
        localStorage.setItem(key, JSON.stringify(arr));
      } catch {
        // ignore
      }
      // Sync to server if logged in
      if (user?.email) {
        syncProgress({
          email: user.email,
          course_id: `pathway-${pathway.roleId}-${pathway.level}`,
          modules_completed: arr,
        });
      }
      return next;
    });
  }

  // Build shareable URL for current pathway
  const getShareUrl = useCallback(() => {
    if (!pathway) return "";
    const base = typeof window !== "undefined" ? window.location.origin : "";
    const localePath = locale === "es" ? "/es" : "";
    return `${base}${localePath}/pathway?role=${pathway.roleId}&level=${pathway.level}`;
  }, [pathway, locale]);

  // Share / copy-to-clipboard
  const handleShare = useCallback(async () => {
    const url = getShareUrl();
    const role = PATHWAY_ROLES.find((r) => r.id === pathway?.roleId);
    const level = EXPERIENCE_LEVELS.find((l) => l.id === pathway?.level);
    const title = isEs
      ? `Ruta de Aprendizaje FQHC: ${role?.es ?? ""} — ${level?.es ?? ""}`
      : `FQHC Learning Pathway: ${role?.en ?? ""} — ${level?.en ?? ""}`;
    const text = isEs
      ? "Mira esta ruta de aprendizaje personalizada para profesionales de FQHC."
      : "Check out this personalized learning pathway for FQHC professionals.";

    // Try native share first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        // User cancelled or not supported — fall through to clipboard
      }
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setShareState("copied");
      setTimeout(() => setShareState("idle"), 2000);
    } catch {
      // Last resort: prompt
      window.prompt(isEs ? "Copia este enlace:" : "Copy this link:", url);
    }
  }, [getShareUrl, pathway, isEs]);

  // Generate pathway
  const handleGenerate = () => {
    if (selectedRole && selectedLevel) {
      const pw = generateLearningPathway(selectedRole, selectedLevel);
      setPathway(pw);
      setCompletedSteps(new Set());
      completionTracked.current = false;
      trackEvent({
        event_type: "pathway_start",
        tool_name: "learning-pathway",
        item_id: `${selectedRole}-${selectedLevel}`,
      });
      // Update URL without full reload
      const localePath = locale === "es" ? "/es" : "";
      const newUrl = `${localePath}/pathway?role=${selectedRole}&level=${selectedLevel}`;
      window.history.replaceState({}, "", newUrl);
      // Persist role selection so other pages can pre-filter
      try {
        localStorage.setItem("fqhc-selected-role", selectedRole);
        localStorage.setItem("fqhc-selected-level", selectedLevel);
      } catch {
        // ignore
      }
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
    // Clear URL params
    const localePath = locale === "es" ? "/es" : "";
    window.history.replaceState({}, "", `${localePath}/pathway`);
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

  // Track pathway completion once
  useEffect(() => {
    if (progressPercent === 100 && pathway && !completionTracked.current) {
      completionTracked.current = true;
      trackEvent({
        event_type: "pathway_complete",
        tool_name: "learning-pathway",
        item_id: `${pathway.roleId}-${pathway.level}`,
      });
    }
  }, [progressPercent, pathway]);

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
          {pathway && (
            <button
              onClick={handleShare}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-900/30 px-4 py-2 text-sm font-medium text-teal-300 transition-all hover:bg-teal-900/50"
            >
              <Link2 className="size-4" />
              {shareState === "copied"
                ? isEs ? "¡Enlace copiado!" : "Link copied!"
                : isEs ? "Compartir esta ruta" : "Share this pathway"}
            </button>
          )}
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
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleShare}
                      className={`flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                        shareState === "copied"
                          ? "border-teal-300 bg-teal-50 text-teal-700"
                          : "border-stone-200 text-stone-600 hover:bg-stone-50"
                      }`}
                    >
                      {shareState === "copied" ? (
                        <>
                          <Check className="size-3" />
                          {isEs ? "¡Copiado!" : "Copied!"}
                        </>
                      ) : (
                        <>
                          <Share2 className="size-3" />
                          {isEs ? "Compartir" : "Share"}
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleReset}
                      className="flex items-center gap-1 rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-50"
                    >
                      <RotateCcw className="size-3" />
                      {isEs ? "Cambiar" : "Change"}
                    </button>
                  </div>
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
                                  <Circle className="size-5 text-stone-300 hover:text-stone-500" />
                                )}
                              </button>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                  <span
                                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${meta.bgColor} ${meta.color}`}
                                  >
                                    <Icon className="size-3" />
                                    {t(meta.label, locale)}
                                  </span>
                                  <span className="flex items-center gap-1 text-xs text-stone-500">
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
                <div className="space-y-4">
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
                    <button
                      onClick={handleShare}
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-white/30"
                    >
                      <Share2 className="size-4" />
                      {shareState === "copied"
                        ? isEs ? "¡Enlace copiado!" : "Link copied!"
                        : isEs ? "Compartir con un colega" : "Share with a colleague"}
                    </button>
                  </div>
                  <ShareableAchievement
                    type="pathway"
                    title={pathway?.roleLabel ? (isEs ? pathway.roleLabel.es : pathway.roleLabel.en) : "Learning Pathway"}
                    subtitle={pathway?.levelLabel ? (isEs ? pathway.levelLabel.es : pathway.levelLabel.en) : undefined}
                    contentId={`${selectedRole}-${selectedLevel}`}
                    locale={locale}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <div className="mx-auto max-w-4xl px-4 pb-8 text-xs text-stone-500 text-center">
        {isEs ? "Última actualización" : "Last updated"}:{" "}
        {LEARNING_PATHWAYS_LAST_UPDATED}
      </div>
    </main>
  );
}
