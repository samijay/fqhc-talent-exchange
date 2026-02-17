"use client";

import { useLocale } from "next-intl";
import {
  Target,
  Handshake,
  Zap,
  Sprout,
  Compass,
  Trophy,
  TrendingUp,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  BookOpen,
} from "lucide-react";
import { BookingCTA } from "@/components/booking/BookingCTA";
import type { DomainId } from "@/lib/career-assessment-engine";
import type { ManagerAssessmentResults, LeadershipRoleId } from "@/lib/manager-assessment-engine";
import { LEADERSHIP_ROLES, MANAGER_DOMAIN_DEFINITIONS } from "@/lib/manager-assessment-engine";
import { MANAGER_ROLE_INSIGHTS } from "@/lib/manager-role-insights";
import { getPrioritizedActions, getMatchedStructures } from "@/lib/management-actions";
import { MANAGER_FIVE_CONVERSATIONS, TEAM_FOGLAMP, STARS_LABELS } from "@/lib/first-90-days";

/* ------------------------------------------------------------------ */
/*  i18n                                                                */
/* ------------------------------------------------------------------ */

const UI = {
  en: {
    resultsTitle: "Your Team Readiness Results",
    resultsSubtitle: "Based on your responses across 5 leadership domains",
    overallScore: "Overall Score",
    topStrength: "Top Strength",
    biggestOpportunity: "Biggest Opportunity",
    yourSituation: "Your Team Situation",
    domainScores: "Domain Scores",
    managementActions: "Prioritized Management Actions",
    actionsSubtitle: "Based on your growth areas — start with the easiest wins",
    thisWeek: "This week",
    thisMonth: "This month",
    thisQuarter: "This quarter",
    easy: "Quick win",
    moderate: "Medium effort",
    advanced: "Strategic investment",
    fiveConversations: "Five Conversations to Have with Your Team",
    conversationsSubtitle: "Prioritized by your lowest-scoring domains",
    sampleQuestion: "Try asking",
    foglamp: "Team FOGLAMP Checklist",
    foglampSubtitle: "A structured self-assessment for your first 90 days as this team's leader",
    liberatingStructures: "Liberating Structures for Your Meetings",
    structuresSubtitle: "Matched to your growth areas — try one this week",
    minutes: "min",
    groupSize: "Group size",
    howTo: "How to run it",
    whatEmployersWant: "What FQHCs Look For",
    qualifications: "Top Qualifications",
    skills: "Key Skills",
    certifications: "Certifications",
    strength: "Strength",
    developing: "Developing",
    growthArea: "Growth Area",
    strengthInsights: "Your Strengths",
    growthInsights: "Growth Opportunities",
    nextSteps: "Recommended Next Steps",
    startOver: "Take Assessment Again",
  },
  es: {
    resultsTitle: "Resultados de Preparación de tu Equipo",
    resultsSubtitle: "Basado en tus respuestas en 5 dominios de liderazgo",
    overallScore: "Puntuación General",
    topStrength: "Mayor Fortaleza",
    biggestOpportunity: "Mayor Oportunidad",
    yourSituation: "La Situación de tu Equipo",
    domainScores: "Puntuaciones por Dominio",
    managementActions: "Acciones de Gestión Priorizadas",
    actionsSubtitle: "Basado en tus áreas de crecimiento — comienza con los logros más fáciles",
    thisWeek: "Esta semana",
    thisMonth: "Este mes",
    thisQuarter: "Este trimestre",
    easy: "Logro rápido",
    moderate: "Esfuerzo medio",
    advanced: "Inversión estratégica",
    fiveConversations: "Cinco Conversaciones para Tener con tu Equipo",
    conversationsSubtitle: "Priorizadas por tus dominios con menor puntuación",
    sampleQuestion: "Intenta preguntar",
    foglamp: "Lista de Verificación FOGLAMP del Equipo",
    foglampSubtitle: "Una autoevaluación estructurada para tus primeros 90 días como líder de este equipo",
    liberatingStructures: "Estructuras Liberadoras para tus Reuniones",
    structuresSubtitle: "Emparejadas con tus áreas de crecimiento — prueba una esta semana",
    minutes: "min",
    groupSize: "Tamaño del grupo",
    howTo: "Cómo ejecutarlo",
    whatEmployersWant: "Lo que Buscan los FQHCs",
    qualifications: "Principales Calificaciones",
    skills: "Habilidades Clave",
    certifications: "Certificaciones",
    strength: "Fortaleza",
    developing: "En Desarrollo",
    growthArea: "Área de Crecimiento",
    strengthInsights: "Tus Fortalezas",
    growthInsights: "Oportunidades de Crecimiento",
    nextSteps: "Próximos Pasos Recomendados",
    startOver: "Tomar la Evaluación de Nuevo",
  },
} as const;

/* ------------------------------------------------------------------ */
/*  Visual Helpers                                                      */
/* ------------------------------------------------------------------ */

const DOMAIN_ICONS: Record<DomainId, typeof Target> = {
  mission: Target,
  people: Handshake,
  execution: Zap,
  growth: Sprout,
  transition: Compass,
};

const DOMAIN_COLORS: Record<DomainId, { bg: string; text: string; bar: string; border: string }> = {
  mission: { bg: "bg-teal-50", text: "text-teal-700", bar: "bg-teal-500", border: "border-teal-200" },
  people: { bg: "bg-blue-50", text: "text-blue-700", bar: "bg-blue-500", border: "border-blue-200" },
  execution: { bg: "bg-amber-50", text: "text-amber-700", bar: "bg-amber-500", border: "border-amber-200" },
  growth: { bg: "bg-green-50", text: "text-green-700", bar: "bg-green-500", border: "border-green-200" },
  transition: { bg: "bg-purple-50", text: "text-purple-700", bar: "bg-purple-500", border: "border-purple-200" },
};

const LEVEL_COLORS: Record<string, string> = {
  strength: "text-teal-700 bg-teal-50 border-teal-200",
  developing: "text-amber-700 bg-amber-50 border-amber-200",
  growth_area: "text-red-600 bg-red-50 border-red-200",
};

const TIMEFRAME_COLORS: Record<string, string> = {
  this_week: "bg-green-100 text-green-700",
  this_month: "bg-blue-100 text-blue-700",
  this_quarter: "bg-purple-100 text-purple-700",
};

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

interface TeamReadinessResultsProps {
  results: ManagerAssessmentResults;
  onStartOver: () => void;
}

export function TeamReadinessResults({ results, onStartOver }: TeamReadinessResultsProps) {
  const locale = useLocale();
  const isEs = locale === "es";
  const t = UI[isEs ? "es" : "en"];

  const domainIds: DomainId[] = ["mission", "people", "execution", "growth", "transition"];
  const roleInfo = LEADERSHIP_ROLES.find((r) => r.id === results.roleId);
  const roleInsight = MANAGER_ROLE_INSIGHTS[results.roleId];
  const starsInfo = STARS_LABELS[results.starsType];

  // Get prioritized actions and structures
  const actions = getPrioritizedActions(results.domainScores, 6);
  const structures = getMatchedStructures(results.domainScores, 4);

  // Prioritize Five Conversations by lowest-scoring domains
  const sortedDomains = [...domainIds].sort(
    (a, b) => results.domainScores[a].percentage - results.domainScores[b].percentage,
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="space-y-8">

        {/* ============================================================ */}
        {/*  Header + Overall Score                                       */}
        {/* ============================================================ */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow sm:p-10">
          <div className="text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100">
              <Trophy className="size-8 text-indigo-700" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900">{t.resultsTitle}</h2>
            <p className="mt-2 text-sm text-stone-500">{t.resultsSubtitle}</p>
            {roleInfo && (
              <p className="mt-1 text-xs font-medium text-indigo-600">
                {isEs ? roleInfo.esLabel : roleInfo.label}
              </p>
            )}
          </div>

          {/* Overall score circle */}
          <div className="mt-8 text-center">
            <div className="mx-auto flex size-24 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg">
              <span className="text-3xl font-extrabold text-indigo-700">{results.overallScore}</span>
            </div>
            <p className="mt-2 text-sm font-medium text-stone-500">{t.overallScore}</p>
          </div>

          {/* STARS Situation Card */}
          <div className="mt-8 rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-5">
            <div className="flex items-start gap-3">
              <Compass className="mt-0.5 size-5 shrink-0 text-indigo-600" />
              <div>
                <h3 className="text-sm font-bold text-indigo-900">{t.yourSituation}</h3>
                <p className="mt-0.5 text-base font-semibold text-indigo-700">
                  {isEs ? starsInfo.es : starsInfo.en}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  {isEs ? starsInfo.esDescription : starsInfo.description}
                </p>
              </div>
            </div>
          </div>

          {/* Domain Scores */}
          <div className="mt-8 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-400">{t.domainScores}</h3>
            {domainIds.map((domainId) => {
              const score = results.domainScores[domainId];
              const colors = DOMAIN_COLORS[domainId];
              const Icon = DOMAIN_ICONS[domainId];
              const isStrength = domainId === results.topStrength;
              const isGrowthArea = domainId === results.topGrowthArea;
              const domainDef = MANAGER_DOMAIN_DEFINITIONS.find((d) => d.id === domainId);

              return (
                <div
                  key={domainId}
                  className={`rounded-xl border p-4 ${
                    isStrength
                      ? "border-teal-300 bg-teal-50/50"
                      : isGrowthArea
                        ? "border-amber-300 bg-amber-50/50"
                        : "border-stone-200 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex size-9 items-center justify-center rounded-lg ${colors.bg}`}>
                        <Icon className={`size-5 ${colors.text}`} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-stone-900">
                          {domainDef?.name ?? domainId}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className={`inline-block rounded-full border px-2 py-0.5 text-xs font-medium ${LEVEL_COLORS[score.level]}`}>
                            {score.level === "strength" ? t.strength : score.level === "developing" ? t.developing : t.growthArea}
                          </span>
                          {isStrength && (
                            <span className="text-xs font-medium text-teal-600">{t.topStrength}</span>
                          )}
                          {isGrowthArea && (
                            <span className="text-xs font-medium text-amber-600">{t.biggestOpportunity}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-stone-700">
                      {score.score}/{score.max}
                    </span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-stone-200">
                    <div
                      className={`h-full rounded-full ${colors.bar} transition-all duration-700`}
                      style={{ width: `${score.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/*  Strengths / Growth / Next Steps                               */}
        {/* ============================================================ */}
        {roleInsight && (
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow sm:p-8">
            {/* Strengths */}
            <div>
              <h3 className="flex items-center gap-2 text-base font-bold text-stone-900">
                <Trophy className="size-5 text-teal-600" />
                {t.strengthInsights}
              </h3>
              <ul className="mt-3 space-y-2">
                {results.insights.strengths.map((msg, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-stone-600">
                    <CheckCircle className="mt-0.5 size-4 shrink-0 text-teal-500" />
                    {msg}
                  </li>
                ))}
              </ul>
            </div>

            {/* Growth */}
            <div className="mt-6 border-t border-stone-100 pt-6">
              <h3 className="flex items-center gap-2 text-base font-bold text-stone-900">
                <TrendingUp className="size-5 text-amber-600" />
                {t.growthInsights}
              </h3>
              <ul className="mt-3 space-y-2">
                {results.insights.growthAreas.map((msg, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-stone-600">
                    <Lightbulb className="mt-0.5 size-4 shrink-0 text-amber-500" />
                    {msg}
                  </li>
                ))}
              </ul>
            </div>

            {/* Next Steps */}
            <div className="mt-6 border-t border-stone-100 pt-6">
              <h3 className="flex items-center gap-2 text-base font-bold text-stone-900">
                <ArrowRight className="size-5 text-indigo-600" />
                {t.nextSteps}
              </h3>
              <ul className="mt-3 space-y-2">
                {results.insights.nextSteps.map((msg, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-stone-600">
                    <ArrowRight className="mt-0.5 size-4 shrink-0 text-indigo-500" />
                    {msg}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/*  Failure Factors (if any)                                      */}
        {/* ============================================================ */}
        {results.failureFactors && results.failureFactors.length > 0 && (
          <div className="rounded-2xl border border-red-200 bg-red-50/30 p-6 shadow sm:p-8">
            <h3 className="flex items-center gap-2 text-base font-bold text-red-800">
              <Lightbulb className="size-5 text-red-600" />
              {isEs ? "Señales a Observar" : "Watch For These Patterns"}
            </h3>
            <p className="mt-1 text-xs text-red-600/80">
              {isEs
                ? "Basado en tus respuestas, vale la pena estar consciente de estas tendencias"
                : "Based on your responses, it's worth being mindful of these tendencies"}
            </p>
            <div className="mt-4 space-y-3">
              {results.failureFactors.map((ff, i) => (
                <div key={i} className="rounded-lg border border-red-200 bg-white p-4">
                  <p className="text-sm font-semibold text-red-800">{ff.factor}</p>
                  <p className="mt-1 text-sm leading-relaxed text-stone-600">{ff.coaching}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/*  Management Actions                                            */}
        {/* ============================================================ */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow sm:p-8">
          <h3 className="text-base font-bold text-stone-900">{t.managementActions}</h3>
          <p className="mt-1 text-xs text-stone-500">{t.actionsSubtitle}</p>
          <div className="mt-5 space-y-3">
            {actions.map((action) => {
              const colors = DOMAIN_COLORS[action.domain];
              const Icon = DOMAIN_ICONS[action.domain];
              const timeLabel = action.timeframe === "this_week" ? t.thisWeek : action.timeframe === "this_month" ? t.thisMonth : t.thisQuarter;
              const difficultyLabel = action.difficulty === "easy" ? t.easy : action.difficulty === "moderate" ? t.moderate : t.advanced;

              return (
                <div key={action.id} className="rounded-xl border border-stone-200 p-4">
                  <div className="flex items-start gap-3">
                    <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${colors.bg}`}>
                      <Icon className={`size-4 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-stone-900">
                        {isEs ? action.esTitle : action.title}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-stone-500">
                        {isEs ? action.esDescription : action.description}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${TIMEFRAME_COLORS[action.timeframe]}`}>
                          <Clock className="size-3" />
                          {timeLabel}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-600">
                          {difficultyLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/*  Five Conversations (Manager Version)                          */}
        {/* ============================================================ */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow sm:p-8">
          <h3 className="flex items-center gap-2 text-base font-bold text-stone-900">
            <Users className="size-5 text-indigo-600" />
            {t.fiveConversations}
          </h3>
          <p className="mt-1 text-xs text-stone-500">{t.conversationsSubtitle}</p>
          <div className="mt-5 space-y-3">
            {MANAGER_FIVE_CONVERSATIONS.map((conv, i) => (
              <div key={i} className="rounded-xl border border-stone-200 p-4">
                <div className="flex items-center gap-2">
                  <span className="flex size-6 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                    {i + 1}
                  </span>
                  <p className="text-sm font-semibold text-stone-900">
                    {isEs ? conv.esName : conv.name}
                  </p>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-stone-500">
                  {isEs ? conv.esDescription : conv.description}
                </p>
                <div className="mt-2 rounded-lg bg-indigo-50 p-3">
                  <p className="text-xs font-medium text-indigo-700">
                    {t.sampleQuestion}:
                  </p>
                  <p className="mt-1 text-xs italic leading-relaxed text-indigo-600">
                    &ldquo;{isEs ? conv.esSampleQuestion : conv.sampleQuestion}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/*  Team FOGLAMP Checklist                                        */}
        {/* ============================================================ */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow sm:p-8">
          <h3 className="flex items-center gap-2 text-base font-bold text-stone-900">
            <CheckCircle className="size-5 text-green-600" />
            {t.foglamp}
          </h3>
          <p className="mt-1 text-xs text-stone-500">{t.foglampSubtitle}</p>
          <div className="mt-5 space-y-2">
            {TEAM_FOGLAMP.map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-stone-100 p-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 text-sm font-bold text-indigo-700">
                  {item.letter}
                </span>
                <div>
                  <p className="text-sm font-semibold text-stone-800">
                    {isEs ? item.esLabel : item.label}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-stone-500">
                    {isEs ? item.esAction : item.action}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/*  Liberating Structures                                         */}
        {/* ============================================================ */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow sm:p-8">
          <h3 className="flex items-center gap-2 text-base font-bold text-stone-900">
            <BookOpen className="size-5 text-purple-600" />
            {t.liberatingStructures}
          </h3>
          <p className="mt-1 text-xs text-stone-500">{t.structuresSubtitle}</p>
          <div className="mt-5 space-y-4">
            {structures.map((ls) => (
              <div key={ls.id} className="rounded-xl border border-purple-200 bg-purple-50/30 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-purple-900">
                    {isEs ? ls.esName : ls.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
                      <Clock className="size-3" />
                      {ls.timeMinutes} {t.minutes}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-xs font-medium text-stone-600">
                      <Users className="size-3" />
                      {isEs ? ls.esGroupSize : ls.groupSize}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-stone-600">
                  {isEs ? ls.esDescription : ls.description}
                </p>
                <div className="mt-3">
                  <p className="text-xs font-semibold text-purple-700">{t.howTo}:</p>
                  <ol className="mt-1.5 space-y-1">
                    {(isEs ? ls.esHowTo : ls.howTo).map((step, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs leading-relaxed text-stone-500">
                        <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-purple-100 text-[10px] font-bold text-purple-700">
                          {j + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/*  What FQHCs Look For                                           */}
        {/* ============================================================ */}
        {roleInsight && (
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow sm:p-8">
            <h3 className="flex items-center gap-2 text-base font-bold text-stone-900">
              <Lightbulb className="size-5 text-amber-600" />
              {t.whatEmployersWant}
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {/* Qualifications */}
              <div className="rounded-xl border border-stone-100 bg-stone-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-stone-400">{t.qualifications}</p>
                <ul className="mt-2 space-y-1.5">
                  {(isEs ? roleInsight.employerWants.esTopQualifications : roleInsight.employerWants.topQualifications).map((q, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs leading-relaxed text-stone-600">
                      <CheckCircle className="mt-0.5 size-3 shrink-0 text-teal-500" />
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Skills */}
              <div className="rounded-xl border border-stone-100 bg-stone-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-stone-400">{t.skills}</p>
                <ul className="mt-2 space-y-1.5">
                  {(isEs ? roleInsight.employerWants.esTopSkills : roleInsight.employerWants.topSkills).map((s, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs leading-relaxed text-stone-600">
                      <CheckCircle className="mt-0.5 size-3 shrink-0 text-blue-500" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Certifications */}
              <div className="rounded-xl border border-stone-100 bg-stone-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-stone-400">{t.certifications}</p>
                <ul className="mt-2 space-y-1.5">
                  {(isEs ? roleInsight.employerWants.esCertifications : roleInsight.employerWants.certifications).map((c, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs leading-relaxed text-stone-600">
                      <CheckCircle className="mt-0.5 size-3 shrink-0 text-amber-500" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/*  BookingCTA + Start Over                                        */}
        {/* ============================================================ */}
        <BookingCTA variant="manager" />

        <div className="text-center">
          <button
            onClick={onStartOver}
            className="text-sm font-medium text-stone-500 hover:text-stone-700"
          >
            {t.startOver}
          </button>
        </div>
      </div>
    </div>
  );
}
