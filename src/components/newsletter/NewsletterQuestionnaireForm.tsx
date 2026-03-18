// NewsletterQuestionnaireForm — 5-step inline personalization flow
// Used on /newsletter page to capture role, challenge, topics, org size
"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Check,
  ChevronRight,
  ArrowRight,
  Users,
  Zap,
  Tag,
  Building2,
  Loader2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

type Audience = "intel-brief" | "the-pulse" | "both";

interface Preferences {
  role?: string;
  primaryChallenge?: string;
  topics?: string[];
  orgSize?: string;
}

/* ------------------------------------------------------------------ */
/*  Question data                                                       */
/* ------------------------------------------------------------------ */

const LEADER_ROLES = [
  { id: "executive-director", en: "Executive Director / CEO", es: "Director Ejecutivo / CEO" },
  { id: "hr-director", en: "HR / Workforce Director", es: "Director de RRHH" },
  { id: "medical-director", en: "Medical Director / CMO", es: "Director Médico / CMO" },
  { id: "operations-director", en: "Operations Director / COO", es: "Director de Operaciones" },
  { id: "board-member", en: "Board Member", es: "Miembro de la Junta" },
  { id: "consultant", en: "Researcher / Consultant", es: "Investigador / Consultor" },
  { id: "other-leader", en: "Other Leader", es: "Otro Líder" },
];

const SEEKER_ROLES = [
  { id: "care-coordinator", en: "Care Coordinator / ECM", es: "Coordinador de Atención / ECM" },
  { id: "chw", en: "Community Health Worker", es: "Promotor(a) de Salud" },
  { id: "clinical", en: "Clinical (RN / NP / PA)", es: "Clínico (RN / NP / PA)" },
  { id: "behavioral-health", en: "Behavioral Health", es: "Salud Conductual" },
  { id: "dental", en: "Dental", es: "Dental" },
  { id: "administrative", en: "Administrative / Revenue Cycle", es: "Administrativo / Ciclo de Ingresos" },
  { id: "leadership-seeker", en: "Leadership / Management", es: "Liderazgo / Gerencia" },
];

const LEADER_CHALLENGES = [
  { id: "funding-cuts", en: "Federal funding cuts & Medicaid risk", es: "Recortes federales y riesgo de Medicaid" },
  { id: "workforce-stability", en: "Workforce stability & retention", es: "Estabilidad y retención de personal" },
  { id: "ai-adoption", en: "AI adoption & clinical tools", es: "Adopción de IA y herramientas clínicas" },
  { id: "documentation", en: "Documentation compliance & coding", es: "Cumplimiento de documentación y codificación" },
  { id: "undocumented-access", en: "Undocumented patient access", es: "Acceso para pacientes indocumentados" },
  { id: "all-above", en: "All of the above", es: "Todo lo anterior" },
];

const SEEKER_CHALLENGES = [
  { id: "actively-applying", en: "Actively applying for jobs", es: "Aplicando activamente" },
  { id: "exploring", en: "Exploring my options", es: "Explorando mis opciones" },
  { id: "researching", en: "Just researching the field", es: "Solo investigando el campo" },
];

const LEADER_TOPICS = [
  { id: "legislation", en: "Legislation & Policy", es: "Legislación y Política" },
  { id: "workforce", en: "Workforce & Labor", es: "Fuerza Laboral y Trabajo" },
  { id: "ai-technology", en: "AI & Technology", es: "IA y Tecnología" },
  { id: "funding-deadlines", en: "Funding Deadlines", es: "Plazos de Financiamiento" },
  { id: "patient-access", en: "Patient Access", es: "Acceso del Paciente" },
  { id: "mergers", en: "Mergers & Acquisitions", es: "Fusiones y Adquisiciones" },
];

const SEEKER_TOPICS = [
  { id: "job-alerts", en: "Job alerts & openings", es: "Alertas de trabajo" },
  { id: "salary-data", en: "Salary & compensation data", es: "Datos de salario y compensación" },
  { id: "career-dev", en: "Career development", es: "Desarrollo profesional" },
  { id: "certifications", en: "Certifications & training", es: "Certificaciones y capacitación" },
];

const ORG_SIZES = [
  { id: "small", en: "Under 50 staff", es: "Menos de 50 personas" },
  { id: "medium", en: "50–200 staff", es: "50–200 personas" },
  { id: "large", en: "200–500 staff", es: "200–500 personas" },
  { id: "enterprise", en: "500+ staff", es: "500+ personas" },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function ProgressDots({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5 mb-6">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i < step
              ? "w-6 h-2 bg-teal-600"
              : i === step
              ? "w-6 h-2 bg-teal-300"
              : "w-2 h-2 bg-stone-200"
          }`}
        />
      ))}
      <span className="ml-2 text-xs text-stone-400">
        {step + 1} / {total}
      </span>
    </div>
  );
}

function OptionChip({
  selected,
  onClick,
  children,
  multi,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  multi?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
        selected
          ? "border-teal-600 bg-teal-50 text-teal-800 shadow-sm"
          : "border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50"
      }`}
    >
      {multi && (
        <span
          className={`flex-shrink-0 size-4 rounded flex items-center justify-center border ${
            selected ? "bg-teal-600 border-teal-600" : "border-stone-300"
          }`}
        >
          {selected && <Check className="size-2.5 text-white" />}
        </span>
      )}
      {!multi && (
        <span
          className={`flex-shrink-0 size-3.5 rounded-full border-2 ${
            selected ? "border-teal-600 bg-teal-600" : "border-stone-300"
          }`}
        />
      )}
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                      */
/* ------------------------------------------------------------------ */

export function NewsletterQuestionnaireForm() {
  const locale = useLocale();
  const isEs = locale === "es";

  // Form state
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [audience, setAudience] = useState<Audience>("intel-brief");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribeError, setSubscribeError] = useState("");

  // Questionnaire answers
  const [prefs, setPrefs] = useState<Preferences>({});

  const isLeader = audience !== "the-pulse";
  // Total steps: 0=email, 1=role, 2=challenge, 3=topics, 4=orgSize(leaders)/confirm(seekers), 5=confirm(leaders)
  const totalSteps = isLeader ? 6 : 5;

  /* ---- Step 0: Email submit ---- */
  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEmailError("");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(isEs ? "Por favor ingresa un correo válido." : "Please enter a valid email.");
      return;
    }
    setIsSubmitting(true);
    try {
      // Subscribe immediately with just email + audience — questionnaire adds preferences
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, audience }),
      });
      if (!res.ok) {
        const data = await res.json();
        setSubscribeError(data.error || "Something went wrong.");
        setIsSubmitting(false);
        return;
      }
      setStep(1);
    } catch {
      setSubscribeError(isEs ? "Error al suscribirse. Intenta de nuevo." : "Subscribe failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  /* ---- Save preferences on final step ---- */
  async function savePreferences(finalPrefs: Preferences) {
    try {
      await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, audience, preferences: finalPrefs }),
      });
    } catch {
      // Silently fail — user is already subscribed
    }
  }

  function toggleTopic(id: string) {
    setPrefs((p) => {
      const topics = p.topics ?? [];
      return {
        ...p,
        topics: topics.includes(id) ? topics.filter((t) => t !== id) : [...topics, id],
      };
    });
  }

  function goToConfirmation(updatedPrefs: Preferences) {
    savePreferences(updatedPrefs);
    setStep(totalSteps - 1);
  }

  /* ---------------------------------------------------------------- */
  /*  Step renders                                                      */
  /* ---------------------------------------------------------------- */

  // Step 0: Email + Audience
  if (step === 0) {
    return (
      <div>
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          {/* Audience toggle */}
          <div>
            <p className="text-sm font-medium text-stone-700 mb-2">
              {isEs ? "Soy un…" : "I am a…"}
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "intel-brief" as Audience, en: "FQHC Leader / Executive", es: "Líder / Ejecutivo FQHC" },
                { id: "the-pulse" as Audience, en: "Job Seeker / Clinician", es: "Buscador de Empleo / Clínico" },
                { id: "both" as Audience, en: "Both", es: "Ambos" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setAudience(opt.id)}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                    audience === opt.id
                      ? "border-teal-600 bg-teal-50 text-teal-800"
                      : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  {isEs ? opt.es : opt.en}
                </button>
              ))}
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="qf-email" className="text-sm font-medium text-stone-700 block mb-1">
              {isEs ? "Tu correo electrónico" : "Your email address"}
            </label>
            <div className="flex gap-2">
              <input
                id="qf-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isEs ? "tu@correo.com" : "you@example.com"}
                className="flex-1 rounded-lg border border-stone-200 px-3 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-1.5 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-60 transition-colors"
              >
                {isSubmitting ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <>
                    {isEs ? "Personalizar" : "Personalize"}
                    <ChevronRight className="size-4" />
                  </>
                )}
              </button>
            </div>
            {emailError && <p className="mt-1 text-xs text-red-600">{emailError}</p>}
            {subscribeError && <p className="mt-1 text-xs text-red-600">{subscribeError}</p>}
          </div>

          <p className="text-xs text-stone-400">
            {isEs
              ? "Fuentes primarias. Sin spam. Cancela cuando quieras."
              : "Primary sources. No spam. Unsubscribe anytime."}
          </p>
        </form>
      </div>
    );
  }

  // Confirmation step
  if (step === totalSteps - 1) {
    const roleLabel =
      (isLeader ? LEADER_ROLES : SEEKER_ROLES).find((r) => r.id === prefs.role);
    const challengeLabel = isLeader
      ? LEADER_CHALLENGES.find((c) => c.id === prefs.primaryChallenge)
      : SEEKER_CHALLENGES.find((c) => c.id === prefs.primaryChallenge);
    const topicLabels = (isLeader ? LEADER_TOPICS : SEEKER_TOPICS).filter((t) =>
      (prefs.topics ?? []).includes(t.id)
    );

    return (
      <div className="space-y-5">
        {/* Success icon */}
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-teal-100">
            <Check className="size-5 text-teal-700" />
          </div>
          <div>
            <p className="text-base font-bold text-stone-900">
              {isEs ? "¡Suscripción confirmada!" : "You're subscribed!"}
            </p>
            <p className="text-xs text-stone-500">
              {isEs ? "Primer número: próximo martes" : "First issue: next Tuesday"}
            </p>
          </div>
        </div>

        {/* Personalization summary */}
        <div className="rounded-xl bg-teal-50 border border-teal-200 p-4 space-y-2">
          <p className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-2">
            {isEs ? "Tu Intel Brief está personalizado para:" : "Your Intel Brief is curated for:"}
          </p>
          {roleLabel && (
            <div className="flex items-center gap-2 text-sm text-stone-700">
              <Users className="size-3.5 text-teal-600 flex-shrink-0" />
              {isEs ? roleLabel.es : roleLabel.en}
            </div>
          )}
          {challengeLabel && (
            <div className="flex items-center gap-2 text-sm text-stone-700">
              <Zap className="size-3.5 text-amber-600 flex-shrink-0" />
              {isEs ? challengeLabel.es : challengeLabel.en}
            </div>
          )}
          {topicLabels.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {topicLabels.map((topic) => (
                <span
                  key={topic.id}
                  className="inline-flex items-center gap-1 rounded-full bg-white border border-teal-200 px-2 py-0.5 text-[11px] font-medium text-teal-800"
                >
                  <Tag className="size-2.5" />
                  {isEs ? topic.es : topic.en}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-stone-800 transition-colors"
        >
          {isEs ? "Ver Último Intel" : "View Latest Intel"}
          <ArrowRight className="size-4" />
        </Link>
      </div>
    );
  }

  // Step 1: Role
  if (step === 1) {
    const roles = isLeader ? LEADER_ROLES : SEEKER_ROLES;
    return (
      <div>
        <ProgressDots step={step} total={totalSteps} />
        <div className="flex items-center gap-2 mb-4">
          <Users className="size-4 text-teal-700" />
          <p className="text-base font-bold text-stone-900">
            {isEs ? "¿Cuál es tu rol?" : "What's your role?"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mb-5">
          {roles.map((r) => (
            <OptionChip
              key={r.id}
              selected={prefs.role === r.id}
              onClick={() => setPrefs((p) => ({ ...p, role: r.id }))}
            >
              {isEs ? r.es : r.en}
            </OptionChip>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setStep(2);
            }}
            disabled={!prefs.role}
            className="inline-flex items-center gap-1.5 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-40 transition-colors"
          >
            {isEs ? "Siguiente" : "Next"}
            <ChevronRight className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setStep(2)}
            className="text-sm text-stone-400 hover:text-stone-600 px-3"
          >
            {isEs ? "Omitir" : "Skip"}
          </button>
        </div>
      </div>
    );
  }

  // Step 2: Primary Challenge / Job Search Status
  if (step === 2) {
    const challenges = isLeader ? LEADER_CHALLENGES : SEEKER_CHALLENGES;
    return (
      <div>
        <ProgressDots step={step} total={totalSteps} />
        <div className="flex items-center gap-2 mb-4">
          <Zap className="size-4 text-amber-600" />
          <p className="text-base font-bold text-stone-900">
            {isLeader
              ? isEs ? "¿Tu principal desafío ahora mismo?" : "Your biggest challenge right now?"
              : isEs ? "¿En qué etapa estás?" : "Where are you in your job search?"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mb-5">
          {challenges.map((c) => (
            <OptionChip
              key={c.id}
              selected={prefs.primaryChallenge === c.id}
              onClick={() => setPrefs((p) => ({ ...p, primaryChallenge: c.id }))}
            >
              {isEs ? c.es : c.en}
            </OptionChip>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setStep(3)}
            disabled={!prefs.primaryChallenge}
            className="inline-flex items-center gap-1.5 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-40 transition-colors"
          >
            {isEs ? "Siguiente" : "Next"}
            <ChevronRight className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setStep(3)}
            className="text-sm text-stone-400 hover:text-stone-600 px-3"
          >
            {isEs ? "Omitir" : "Skip"}
          </button>
        </div>
      </div>
    );
  }

  // Step 3: Topics of Interest (multi-select)
  if (step === 3) {
    const topics = isLeader ? LEADER_TOPICS : SEEKER_TOPICS;
    const selectedTopics = prefs.topics ?? [];
    const nextStep = isLeader ? 4 : totalSteps - 1;

    return (
      <div>
        <ProgressDots step={step} total={totalSteps} />
        <div className="flex items-center gap-2 mb-1">
          <Tag className="size-4 text-purple-600" />
          <p className="text-base font-bold text-stone-900">
            {isEs ? "¿Qué temas te interesan?" : "Which topics matter most to you?"}
          </p>
        </div>
        <p className="text-xs text-stone-400 mb-4">
          {isEs ? "Selecciona todos los que apliquen." : "Select all that apply."}
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {topics.map((topic) => (
            <OptionChip
              key={topic.id}
              selected={selectedTopics.includes(topic.id)}
              onClick={() => toggleTopic(topic.id)}
              multi
            >
              {isEs ? topic.es : topic.en}
            </OptionChip>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              if (!isLeader) {
                goToConfirmation(prefs);
              } else {
                setStep(nextStep);
              }
            }}
            disabled={selectedTopics.length === 0}
            className="inline-flex items-center gap-1.5 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-40 transition-colors"
          >
            {isEs ? "Siguiente" : "Next"}
            <ChevronRight className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              if (!isLeader) {
                goToConfirmation(prefs);
              } else {
                setStep(nextStep);
              }
            }}
            className="text-sm text-stone-400 hover:text-stone-600 px-3"
          >
            {isEs ? "Omitir" : "Skip"}
          </button>
        </div>
      </div>
    );
  }

  // Step 4: Org Size (Leaders only)
  if (step === 4 && isLeader) {
    return (
      <div>
        <ProgressDots step={step} total={totalSteps} />
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="size-4 text-stone-600" />
          <p className="text-base font-bold text-stone-900">
            {isEs ? "¿Tamaño de tu organización?" : "How large is your organization?"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mb-5">
          {ORG_SIZES.map((s) => (
            <OptionChip
              key={s.id}
              selected={prefs.orgSize === s.id}
              onClick={() => setPrefs((p) => ({ ...p, orgSize: s.id }))}
            >
              {isEs ? s.es : s.en}
            </OptionChip>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              const updated = { ...prefs };
              goToConfirmation(updated);
            }}
            disabled={!prefs.orgSize}
            className="inline-flex items-center gap-1.5 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-40 transition-colors"
          >
            {isEs ? "Finalizar" : "Finish"}
            <Check className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => goToConfirmation(prefs)}
            className="text-sm text-stone-400 hover:text-stone-600 px-3"
          >
            {isEs ? "Omitir" : "Skip"}
          </button>
        </div>
      </div>
    );
  }

  return null;
}
