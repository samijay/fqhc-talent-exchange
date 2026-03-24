"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Building2,
  User,
  MapPin,
  Mail,
  Loader2,
  Sparkles,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  i18n helper                                                         */
/* ------------------------------------------------------------------ */

const T = {
  hero: { en: "Personalize Your Newsletter", es: "Personaliza Tu Boletín" },
  heroSub: {
    en: "4 quick questions so we can send you the most relevant FQHC intelligence.",
    es: "4 preguntas rápidas para que podamos enviarte la inteligencia de FQHC más relevante.",
  },
  step: { en: "Step", es: "Paso" },
  of: { en: "of", es: "de" },
  next: { en: "Next →", es: "Siguiente →" },
  back: { en: "← Back", es: "← Atrás" },
  submit: { en: "Personalize My Newsletter", es: "Personalizar Mi Boletín" },
  submitting: { en: "Saving…", es: "Guardando…" },

  // Step 1
  step1Title: { en: "Who are you?", es: "¿Quién eres?" },
  step1Sub: { en: "Help us tailor content to your role.", es: "Ayúdanos a adaptar el contenido a tu rol." },
  leader: { en: "FQHC Leader / HR Professional", es: "Líder de FQHC / Profesional de RRHH" },
  leaderDesc: { en: "Executive, director, or HR manager at a community health center", es: "Ejecutivo, director o gerente de RRHH en un centro de salud comunitario" },
  seeker: { en: "Healthcare Professional / Job Seeker", es: "Profesional de Salud / Buscador de Empleo" },
  seekerDesc: { en: "Clinician, coordinator, or support staff looking for FQHC opportunities", es: "Clínico, coordinador o personal de apoyo buscando oportunidades en FQHC" },
  researcher: { en: "Researcher / Policymaker / Other", es: "Investigador / Diseñador de Políticas / Otro" },
  researcherDesc: { en: "Academic, policy analyst, journalist, or other interested professional", es: "Académico, analista de políticas, periodista u otro profesional interesado" },

  // Step 2 — leader roles
  step2LeaderTitle: { en: "What is your role?", es: "¿Cuál es tu rol?" },
  step2LeaderSub: { en: "Select the option that best describes your position.", es: "Selecciona la opción que mejor describe tu posición." },

  // Step 2 — seeker roles
  step2SeekerTitle: { en: "What type of work do you do?", es: "¿Qué tipo de trabajo realizas?" },
  step2SeekerSub: { en: "Select your primary clinical or administrative role.", es: "Selecciona tu rol clínico o administrativo principal." },

  // Step 3 — leader challenges
  step3LeaderTitle: { en: "What's your biggest challenge right now?", es: "¿Cuál es tu mayor desafío ahora mismo?" },
  step3Sub: { en: "Select the challenge most relevant to you.", es: "Selecciona el desafío más relevante para ti." },

  // Step 3 — seeker challenges
  step3SeekerTitle: { en: "What's your biggest challenge right now?", es: "¿Cuál es tu mayor desafío ahora mismo?" },

  // Step 4
  step4Title: { en: "Your region + email", es: "Tu región y correo" },
  step4Sub: { en: "Receive region-specific intelligence and market data.", es: "Recibe inteligencia y datos de mercado específicos de tu región." },
  emailLabel: { en: "Email address", es: "Correo electrónico" },
  emailPlaceholder: { en: "you@example.com", es: "tu@ejemplo.com" },
  emailNote: { en: "We'll match your profile to your existing subscription or create a new one.", es: "Vincularemos tu perfil a tu suscripción existente o crearemos una nueva." },
  regionLabel: { en: "Your region", es: "Tu región" },
  selectRegion: { en: "Select your region…", es: "Selecciona tu región…" },

  // Thank you
  thankYouTitle: { en: "You're all set!", es: "¡Todo listo!" },
  thankYouSub: {
    en: "Your newsletter is now personalized. You'll receive targeted intelligence based on your role and region.",
    es: "Tu boletín ahora está personalizado. Recibirás inteligencia dirigida según tu rol y región.",
  },
  thankYouNext: { en: "Explore the platform while you wait:", es: "Explora la plataforma mientras esperas:" },
};

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const LEADER_ROLES = [
  { value: "executive", en: "CEO / Executive Director", es: "CEO / Director Ejecutivo" },
  { value: "coo", en: "COO / Operations Director", es: "COO / Director de Operaciones" },
  { value: "hr", en: "HR / Workforce Director", es: "Director/a de RRHH / Fuerza Laboral" },
  { value: "clinical-director", en: "Clinical Director / CMO", es: "Director Clínico / CMO" },
  { value: "finance", en: "Finance / CFO", es: "Finanzas / CFO" },
  { value: "program-manager", en: "Program Manager", es: "Gerente de Programa" },
  { value: "other-leader", en: "Other leadership role", es: "Otro rol de liderazgo" },
];

const SEEKER_ROLES = [
  { value: "chw", en: "Community Health Worker / Promotor(a)", es: "Promotor(a) de Salud Comunitaria" },
  { value: "care-coordinator", en: "Care Coordinator / Case Manager", es: "Coordinador(a) de Atención / Manejo de Casos" },
  { value: "rn-lvn", en: "RN / LVN / Medical Assistant", es: "Enfermero/a RN / LVN / Asistente Médico/a" },
  { value: "behavioral-health", en: "Behavioral Health (LCSW, MFT, Counselor)", es: "Salud Conductual (LCSW, MFT, Consejero/a)" },
  { value: "dental", en: "Dental (Hygienist, Assistant, Dentist)", es: "Dental (Higienista, Asistente, Dentista)" },
  { value: "provider", en: "Provider (MD, NP, PA)", es: "Proveedor/a (MD, NP, PA)" },
  { value: "admin-billing", en: "Admin / Revenue Cycle / Finance", es: "Admin / Ciclo de Ingresos / Finanzas" },
  { value: "pharmacy", en: "Pharmacy (PharmD, CPhT)", es: "Farmacia (PharmD, CPhT)" },
  { value: "other-seeker", en: "Other role", es: "Otro rol" },
];

const LEADER_CHALLENGES = [
  { value: "hiring", en: "Hiring qualified staff", es: "Contratar personal calificado" },
  { value: "retention", en: "Retaining existing staff", es: "Retener al personal existente" },
  { value: "funding-cuts", en: "Budget / funding uncertainty (H.R. 1, Medi-Cal cuts)", es: "Incertidumbre presupuestaria / recortes de financiamiento (H.R. 1, Medi-Cal)" },
  { value: "workforce-transition", en: "Managing layoffs / workforce transition", es: "Gestionar despidos / transición de fuerza laboral" },
  { value: "calaim-ecm", en: "CalAIM / ECM program implementation", es: "Implementación de CalAIM / ECM" },
  { value: "ai-technology", en: "AI / EHR / technology adoption", es: "Adopción de IA / EHR / tecnología" },
  { value: "other-challenge", en: "Other challenge", es: "Otro desafío" },
];

const SEEKER_CHALLENGES = [
  { value: "job-search", en: "Finding jobs that match my skills", es: "Encontrar empleos que coincidan con mis habilidades" },
  { value: "sector-transition", en: "Transitioning from another sector", es: "Transicionando desde otro sector" },
  { value: "salary", en: "Salary negotiation and benchmarking", es: "Negociación salarial y comparación de salarios" },
  { value: "upskilling", en: "Getting certified or upskilling", es: "Obtener certificación o mejorar habilidades" },
  { value: "interview-prep", en: "Interview preparation", es: "Preparación para entrevistas" },
  { value: "displaced", en: "I was recently laid off / displaced", es: "Fui despedido/a recientemente" },
  { value: "other-seeker-challenge", en: "Other challenge", es: "Otro desafío" },
];

const REGIONS = [
  { value: "los-angeles", en: "Los Angeles / South LA", es: "Los Ángeles / Sur de LA" },
  { value: "san-diego", en: "San Diego / South County", es: "San Diego / Sur del Condado" },
  { value: "sf-bay-area", en: "SF Bay Area", es: "Área de la Bahía de SF" },
  { value: "sacramento", en: "Sacramento Valley", es: "Valle de Sacramento" },
  { value: "central-valley", en: "Central Valley (Fresno/Bakersfield)", es: "Valle Central (Fresno/Bakersfield)" },
  { value: "inland-empire", en: "Inland Empire (Riverside/San Bernardino)", es: "Imperio Interior (Riverside/San Bernardino)" },
  { value: "central-coast", en: "Central Coast (Santa Barbara/SLO)", es: "Costa Central (Santa Bárbara/SLO)" },
  { value: "north-state", en: "North State (Redding/Chico)", es: "Norte del Estado (Redding/Chico)" },
  { value: "north-coast", en: "North Coast (Humboldt/Mendocino)", es: "Costa Norte (Humboldt/Mendocino)" },
  { value: "outside-ca", en: "Outside California", es: "Fuera de California" },
];

/* ------------------------------------------------------------------ */
/*  Progress Bar                                                        */
/* ------------------------------------------------------------------ */

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
            i < step ? "bg-teal-600" : i === step ? "bg-teal-300" : "bg-stone-200"
          }`}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Choice Card                                                         */
/* ------------------------------------------------------------------ */

function ChoiceCard({
  selected,
  onClick,
  title,
  description,
  icon,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl border-2 p-4 text-left transition-all duration-150 ${
        selected
          ? "border-teal-600 bg-teal-50 shadow-sm"
          : "border-stone-200 bg-white hover:border-teal-300 hover:bg-stone-50"
      }`}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div
            className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg ${
              selected ? "bg-teal-600 text-white" : "bg-stone-100 text-stone-500"
            }`}
          >
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className={`font-semibold text-sm ${selected ? "text-teal-800" : "text-stone-800"}`}>
              {title}
            </p>
            {selected && (
              <CheckCircle className="size-4 shrink-0 text-teal-600" />
            )}
          </div>
          {description && (
            <p className="mt-0.5 text-xs text-stone-500 leading-relaxed">{description}</p>
          )}
        </div>
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                           */
/* ------------------------------------------------------------------ */

type AudienceType = "leader" | "seeker" | "researcher" | null;

export default function NewsletterQuestionnairePage() {
  const locale = useLocale();
  const isEs = locale === "es";

  const [step, setStep] = useState(0); // 0–3 = steps, 4 = thank you
  const [audience, setAudience] = useState<AudienceType>(null);
  const [roleType, setRoleType] = useState<string>("");
  const [challenge, setChallenge] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>("");

  const TOTAL_STEPS = 4;

  // Derived audience value for API
  const audienceValue =
    audience === "leader" ? "intel-brief" : audience === "researcher" ? "both" : "the-pulse";

  async function handleSubmit() {
    if (!email) {
      setError(isEs ? "Por favor ingresa tu correo electrónico." : "Please enter your email address.");
      return;
    }
    if (!roleType || !challenge) {
      setError(isEs ? "Por favor completa todos los campos." : "Please complete all fields.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/newsletter/questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          audience: audienceValue,
          roleType,
          primaryChallenge: challenge,
          region: region || undefined,
          preferences: { audience_type: audience },
        }),
      });

      if (res.ok) {
        setStep(4);
      } else {
        const data = await res.json();
        setError(data.error || (isEs ? "Algo salió mal. Inténtalo de nuevo." : "Something went wrong. Please try again."));
      }
    } catch {
      setError(isEs ? "Error de red. Inténtalo de nuevo." : "Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // Thank you screen
  if (step === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-stone-50 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-teal-100">
            <CheckCircle className="size-10 text-teal-600" />
          </div>
          <h1 className="text-2xl font-bold text-stone-900 mb-3">
            {t(T.thankYouTitle, locale)}
          </h1>
          <p className="text-stone-600 mb-8 leading-relaxed">
            {t(T.thankYouSub, locale)}
          </p>

          <p className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4">
            {t(T.thankYouNext, locale)}
          </p>

          <div className="space-y-2 text-left">
            {audience === "leader" ? (
              <>
                <Link href="/strategy/guides" className="flex items-center gap-2 rounded-lg border border-stone-200 bg-white p-3 text-sm text-teal-700 hover:border-teal-300 transition-colors">
                  <ArrowRight className="size-4 shrink-0" /> {isEs ? "Guías ejecutivas (estudios de caso)" : "Executive Guides (case studies)"}
                </Link>
                <Link href="/strategy/resilience" className="flex items-center gap-2 rounded-lg border border-stone-200 bg-white p-3 text-sm text-teal-700 hover:border-teal-300 transition-colors">
                  <ArrowRight className="size-4 shrink-0" /> {isEs ? "Scorecard de resiliencia de FQHCs" : "FQHC Resilience Scorecard"}
                </Link>
                <Link href="/strategy/okrs" className="flex items-center gap-2 rounded-lg border border-stone-200 bg-white p-3 text-sm text-teal-700 hover:border-teal-300 transition-colors">
                  <ArrowRight className="size-4 shrink-0" /> {isEs ? "Plantillas OKR (descarga Excel)" : "OKR Templates (Excel download)"}
                </Link>
              </>
            ) : (
              <>
                <Link href="/jobs" className="flex items-center gap-2 rounded-lg border border-stone-200 bg-white p-3 text-sm text-teal-700 hover:border-teal-300 transition-colors">
                  <ArrowRight className="size-4 shrink-0" /> {isEs ? "Explorar 1,700+ empleos en FQHCs" : "Browse 1,700+ FQHC jobs"}
                </Link>
                <Link href="/career-insights" className="flex items-center gap-2 rounded-lg border border-stone-200 bg-white p-3 text-sm text-teal-700 hover:border-teal-300 transition-colors">
                  <ArrowRight className="size-4 shrink-0" /> {isEs ? "Evaluación de carrera gratuita" : "Free career assessment"}
                </Link>
                <Link href="/salary-data" className="flex items-center gap-2 rounded-lg border border-stone-200 bg-white p-3 text-sm text-teal-700 hover:border-teal-300 transition-colors">
                  <ArrowRight className="size-4 shrink-0" /> {isEs ? "Datos de salarios por región y rol" : "Salary data by region & role"}
                </Link>
              </>
            )}
          </div>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 transition-colors"
          >
            {isEs ? "← Volver al inicio" : "← Back to homepage"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-stone-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-1.5 text-sm font-semibold text-teal-700 mb-4">
            <Sparkles className="size-4" />
            {isEs ? "Personalización del Boletín" : "Newsletter Personalization"}
          </div>
          <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            {t(T.hero, locale)}
          </h1>
          <p className="mt-2 text-stone-600 text-sm sm:text-base">
            {t(T.heroSub, locale)}
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white border border-stone-200 shadow-sm p-6 sm:p-8">
          {/* Progress */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-stone-500 font-medium">
              {t(T.step, locale)} {step + 1} {t(T.of, locale)} {TOTAL_STEPS}
            </span>
          </div>
          <ProgressBar step={step} total={TOTAL_STEPS} />

          {/* ─── Step 0: Who are you? ─────────────────────────── */}
          {step === 0 && (
            <div>
              <h2 className="text-lg font-bold text-stone-900 mb-1">{t(T.step1Title, locale)}</h2>
              <p className="text-sm text-stone-500 mb-5">{t(T.step1Sub, locale)}</p>
              <div className="space-y-3">
                <ChoiceCard
                  selected={audience === "leader"}
                  onClick={() => setAudience("leader")}
                  icon={<Building2 className="size-4" />}
                  title={t(T.leader, locale)}
                  description={t(T.leaderDesc, locale)}
                />
                <ChoiceCard
                  selected={audience === "seeker"}
                  onClick={() => setAudience("seeker")}
                  icon={<User className="size-4" />}
                  title={t(T.seeker, locale)}
                  description={t(T.seekerDesc, locale)}
                />
                <ChoiceCard
                  selected={audience === "researcher"}
                  onClick={() => setAudience("researcher")}
                  icon={<Sparkles className="size-4" />}
                  title={t(T.researcher, locale)}
                  description={t(T.researcherDesc, locale)}
                />
              </div>
              <button
                disabled={!audience}
                onClick={() => setStep(1)}
                className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 py-3 text-sm font-semibold text-white disabled:opacity-40 hover:bg-teal-800 transition-colors"
              >
                {t(T.next, locale)}
              </button>
            </div>
          )}

          {/* ─── Step 1: Role type ────────────────────────────── */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-bold text-stone-900 mb-1">
                {audience === "leader" ? t(T.step2LeaderTitle, locale) : t(T.step2SeekerTitle, locale)}
              </h2>
              <p className="text-sm text-stone-500 mb-5">
                {audience === "leader" ? t(T.step2LeaderSub, locale) : t(T.step2SeekerSub, locale)}
              </p>
              <div className="space-y-2">
                {(audience === "leader" ? LEADER_ROLES : audience === "seeker" ? SEEKER_ROLES : LEADER_ROLES).map((r) => (
                  <ChoiceCard
                    key={r.value}
                    selected={roleType === r.value}
                    onClick={() => setRoleType(r.value)}
                    title={isEs ? r.es : r.en}
                  />
                ))}
                {audience === "researcher" && (
                  <ChoiceCard
                    selected={roleType === "researcher"}
                    onClick={() => setRoleType("researcher")}
                    title={isEs ? "Investigador / Analista de políticas / Periodista" : "Researcher / Policy analyst / Journalist"}
                  />
                )}
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setStep(0)}
                  className="flex items-center gap-1 rounded-xl border border-stone-200 px-4 py-3 text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors"
                >
                  <ArrowLeft className="size-4" />
                  {t(T.back, locale)}
                </button>
                <button
                  disabled={!roleType}
                  onClick={() => setStep(2)}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 py-3 text-sm font-semibold text-white disabled:opacity-40 hover:bg-teal-800 transition-colors"
                >
                  {t(T.next, locale)}
                </button>
              </div>
            </div>
          )}

          {/* ─── Step 2: Primary challenge ────────────────────── */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-bold text-stone-900 mb-1">
                {t(T.step3LeaderTitle, locale)}
              </h2>
              <p className="text-sm text-stone-500 mb-5">{t(T.step3Sub, locale)}</p>
              <div className="space-y-2">
                {(audience === "leader" || audience === "researcher" ? LEADER_CHALLENGES : SEEKER_CHALLENGES).map((c) => (
                  <ChoiceCard
                    key={c.value}
                    selected={challenge === c.value}
                    onClick={() => setChallenge(c.value)}
                    title={isEs ? c.es : c.en}
                  />
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1 rounded-xl border border-stone-200 px-4 py-3 text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors"
                >
                  <ArrowLeft className="size-4" />
                  {t(T.back, locale)}
                </button>
                <button
                  disabled={!challenge}
                  onClick={() => setStep(3)}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 py-3 text-sm font-semibold text-white disabled:opacity-40 hover:bg-teal-800 transition-colors"
                >
                  {t(T.next, locale)}
                </button>
              </div>
            </div>
          )}

          {/* ─── Step 3: Region + Email ───────────────────────── */}
          {step === 3 && (
            <div>
              <h2 className="text-lg font-bold text-stone-900 mb-1">{t(T.step4Title, locale)}</h2>
              <p className="text-sm text-stone-500 mb-5">{t(T.step4Sub, locale)}</p>

              <div className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    <Mail className="inline size-4 mr-1 text-stone-500" />
                    {t(T.emailLabel, locale)}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t(T.emailPlaceholder, locale)}
                    className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <p className="mt-1 text-xs text-stone-500">{t(T.emailNote, locale)}</p>
                </div>

                {/* Region */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    <MapPin className="inline size-4 mr-1 text-stone-500" />
                    {t(T.regionLabel, locale)}
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                  >
                    <option value="">{t(T.selectRegion, locale)}</option>
                    {REGIONS.map((r) => (
                      <option key={r.value} value={r.value}>
                        {isEs ? r.es : r.en}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {error && (
                <p className="mt-3 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
              )}

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1 rounded-xl border border-stone-200 px-4 py-3 text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors"
                >
                  <ArrowLeft className="size-4" />
                  {t(T.back, locale)}
                </button>
                <button
                  disabled={submitting || !email}
                  onClick={handleSubmit}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 py-3 text-sm font-semibold text-white disabled:opacity-40 hover:bg-teal-800 transition-colors"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 motion-safe:animate-spin" />
                      {t(T.submitting, locale)}
                    </>
                  ) : (
                    <>
                      <CheckCircle className="size-4" />
                      {t(T.submit, locale)}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Skip link */}
        <p className="mt-4 text-center text-xs text-stone-500">
          <Link href="/newsletter" className="hover:text-stone-600 transition-colors">
            {isEs ? "Volver a la página del boletín" : "Back to newsletter page"}
          </Link>
        </p>
      </div>
    </div>
  );
}
