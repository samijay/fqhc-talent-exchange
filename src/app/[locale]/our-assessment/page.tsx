"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Target,
  Handshake,
  Zap,
  Sprout,
  Compass,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Brain,
  TrendingUp,
  AlertTriangle,
  Users,
  Heart,
  BarChart3,
  Eye,
  Lightbulb,
  Scale,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DOMAIN_DEFINITIONS } from "@/lib/career-assessment-engine";

/* ------------------------------------------------------------------ */
/*  Bilingual helper                                                   */
/* ------------------------------------------------------------------ */
function t(obj: { en: string; es: string }, locale: string): string {
  return locale === "es" ? obj.es : obj.en;
}

/* ------------------------------------------------------------------ */
/*  Domain icon mapping                                                */
/* ------------------------------------------------------------------ */
const DOMAIN_ICONS = {
  mission: Target,
  people: Handshake,
  execution: Zap,
  growth: Sprout,
  transition: Compass,
} as const;

const DOMAIN_COLORS = {
  mission: { bg: "bg-teal-100", text: "text-teal-700", border: "border-teal-200", bar: "bg-teal-600" },
  people: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200", bar: "bg-blue-600" },
  execution: { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200", bar: "bg-amber-600" },
  growth: { bg: "bg-green-100", text: "text-green-700", border: "border-green-200", bar: "bg-green-600" },
  transition: { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-200", bar: "bg-purple-600" },
} as const;

/* ------------------------------------------------------------------ */
/*  Domain deep-dive data                                              */
/* ------------------------------------------------------------------ */
const DOMAIN_DETAILS: Record<
  string,
  {
    name: { en: string; es: string };
    predicts: { en: string; es: string };
    why: { en: string; es: string };
    research: { en: string; es: string };
    sampleQ: { en: string; es: string };
  }
> = {
  mission: {
    name: { en: "Mission & Motivation", es: "Misión y Motivación" },
    predicts: { en: "Burnout risk, retention, long-term commitment", es: "Riesgo de agotamiento, retención, compromiso a largo plazo" },
    why: {
      en: "Workers without intrinsic mission alignment leave FQHCs within 12 months. The work is hard — lower pay than hospitals, complex patients, limited resources. Only people who genuinely connect with the mission of serving underserved communities stay and thrive.",
      es: "Los trabajadores sin alineación intrínseca con la misión dejan los FQHCs dentro de 12 meses. El trabajo es difícil — menor salario que los hospitales, pacientes complejos, recursos limitados. Solo las personas que genuinamente se conectan con la misión de servir a comunidades desatendidas permanecen y prosperan.",
    },
    research: {
      en: "Harvard Business Review research shows that purpose-driven employees are 3x more likely to stay at their organization. In safety-net healthcare, this effect is even stronger.",
      es: "La investigación de Harvard Business Review muestra que los empleados motivados por el propósito tienen 3x más probabilidad de permanecer en su organización. En la atención médica de red de seguridad, este efecto es aún más fuerte.",
    },
    sampleQ: {
      en: "\"A patient tells you they're giving up on their treatment plan. What do you do?\"",
      es: "\"Un paciente te dice que va a abandonar su plan de tratamiento. ¿Qué haces?\"",
    },
  },
  people: {
    name: { en: "People & Communication", es: "Personas y Comunicación" },
    predicts: { en: "Patient satisfaction, team collaboration, cultural fit", es: "Satisfacción del paciente, colaboración en equipo, ajuste cultural" },
    why: {
      en: "FQHC patients face language barriers, trauma, systemic distrust. Staff must build rapport across cultures and navigate sensitive conversations daily. Small teams mean one poor communicator disrupts the entire care model.",
      es: "Los pacientes de FQHC enfrentan barreras lingüísticas, trauma y desconfianza sistémica. El personal debe construir relaciones a través de culturas y navegar conversaciones sensibles diariamente. Los equipos pequeños significan que un mal comunicador interrumpe todo el modelo de atención.",
    },
    research: {
      en: "Studies show that patient-provider communication quality is the #1 predictor of treatment adherence in community health settings — more than clinical skill or medication type.",
      es: "Los estudios muestran que la calidad de comunicación paciente-proveedor es el predictor #1 de adherencia al tratamiento en entornos de salud comunitaria — más que la habilidad clínica o el tipo de medicamento.",
    },
    sampleQ: {
      en: "\"A colleague consistently misses documentation deadlines affecting your patients. How do you handle it?\"",
      es: "\"Un colega constantemente no cumple con los plazos de documentación que afectan a tus pacientes. ¿Cómo lo manejas?\"",
    },
  },
  execution: {
    name: { en: "Execution & Adaptability", es: "Ejecución y Adaptabilidad" },
    predicts: { en: "Performance under constraints, problem-solving speed", es: "Rendimiento bajo restricciones, velocidad de resolución de problemas" },
    why: {
      en: "FQHCs operate with less funding, more patients, and fewer staff than hospital systems. New programs launch constantly (ECM, CCM, CalAIM). EHR systems change. Workers who can't adapt and execute under pressure become bottlenecks — or they burn out.",
      es: "Los FQHCs operan con menos financiamiento, más pacientes y menos personal que los sistemas hospitalarios. Nuevos programas se lanzan constantemente (ECM, CCM, CalAIM). Los sistemas EHR cambian. Los trabajadores que no pueden adaptarse y ejecutar bajo presión se convierten en cuellos de botella — o se agotan.",
    },
    research: {
      en: "Research on healthcare workforce resilience shows that adaptability — not tenure or credentials — is the strongest predictor of sustained performance in under-resourced clinical environments.",
      es: "La investigación sobre resiliencia de la fuerza laboral en salud muestra que la adaptabilidad — no la antigüedad o las credenciales — es el predictor más fuerte de rendimiento sostenido en entornos clínicos con pocos recursos.",
    },
    sampleQ: {
      en: "\"You arrive to 3 urgent callbacks, an ECM deadline, mandatory training, and a slow EHR. What do you do first?\"",
      es: "\"Llegas y encuentras 3 llamadas urgentes, una fecha límite de ECM, entrenamiento obligatorio y un EHR lento. ¿Qué haces primero?\"",
    },
  },
  growth: {
    name: { en: "Growth Mindset", es: "Mentalidad de Crecimiento" },
    predicts: { en: "Professional development trajectory, career longevity", es: "Trayectoria de desarrollo profesional, longevidad profesional" },
    why: {
      en: "FQHC roles evolve fast — new regulations, new programs, new EHR modules, new patient populations. Workers with a growth mindset seek training, embrace feedback, and see challenges as opportunities. Workers without it plateau and become difficult to retain.",
      es: "Los roles en FQHC evolucionan rápido — nuevas regulaciones, nuevos programas, nuevos módulos EHR, nuevas poblaciones de pacientes. Los trabajadores con mentalidad de crecimiento buscan capacitación, aceptan retroalimentación y ven los desafíos como oportunidades. Los que no la tienen se estancan y son difíciles de retener.",
    },
    research: {
      en: "Carol Dweck's research at Stanford demonstrates that employees with a growth mindset are 47% more likely to say their colleagues are trustworthy and 34% more likely to feel committed to their organization.",
      es: "La investigación de Carol Dweck en Stanford demuestra que los empleados con mentalidad de crecimiento tienen 47% más probabilidad de decir que sus colegas son confiables y 34% más probabilidad de sentirse comprometidos con su organización.",
    },
    sampleQ: {
      en: "\"A training opportunity requires 3 weeks of extra hours but isn't required for your current role. What do you do?\"",
      es: "\"Una oportunidad de capacitación requiere 3 semanas de horas extra pero no es requerida para tu puesto actual. ¿Qué haces?\"",
    },
  },
  transition: {
    name: { en: "Transition Readiness", es: "Preparación para la Transición" },
    predicts: { en: "Onboarding speed, 90-day success, first-year retention", es: "Velocidad de incorporación, éxito en 90 días, retención en el primer año" },
    why: {
      en: "Michael Watkins' research (The First 90 Days) shows that how you start a new role determines your trajectory. Workers who diagnose the situation, build relationships early, and secure early wins outperform those who wait for direction. In FQHCs — where onboarding is often minimal — this is critical.",
      es: "La investigación de Michael Watkins (Los Primeros 90 Días) muestra que cómo comienzas un nuevo rol determina tu trayectoria. Los trabajadores que diagnostican la situación, construyen relaciones temprano y aseguran victorias tempranas superan a aquellos que esperan dirección. En FQHCs — donde la incorporación es a menudo mínima — esto es crítico.",
    },
    research: {
      en: "46% of new hires fail within 18 months. Of those, 89% fail for behavioral/attitudinal reasons — not lack of technical skill. Transition readiness catches these risks before they become costly turnover.",
      es: "El 46% de las nuevas contrataciones fracasan dentro de 18 meses. De esos, el 89% fracasan por razones de comportamiento/actitud — no por falta de habilidad técnica. La preparación para la transición detecta estos riesgos antes de que se conviertan en rotación costosa.",
    },
    sampleQ: {
      en: "\"You just accepted a new FQHC role. You have a week to prepare. What's the MOST important thing to find out?\"",
      es: "\"Acabas de aceptar un nuevo puesto en un FQHC. Tienes una semana para prepararte. ¿Qué es lo MÁS importante que debes averiguar?\"",
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Growth Signals (reframed failure factors)                          */
/* ------------------------------------------------------------------ */
const GROWTH_SIGNALS = [
  {
    signal: { en: "Mission Uncertainty", es: "Incertidumbre de Misión" },
    description: {
      en: "You're still exploring whether community health is the right fit. That's honest — and we'd rather help you figure that out now than after 6 months.",
      es: "Todavía estás explorando si la salud comunitaria es la opción adecuada. Eso es honesto — y preferimos ayudarte a descubrirlo ahora que después de 6 meses.",
    },
    icon: Target,
    color: "teal",
  },
  {
    signal: { en: "Communication Growth Area", es: "Área de Crecimiento en Comunicación" },
    description: {
      en: "Difficult conversations with patients or colleagues may feel uncomfortable. We'll share specific frameworks (like motivational interviewing) that build this skill fast.",
      es: "Las conversaciones difíciles con pacientes o colegas pueden sentirse incómodas. Compartiremos marcos específicos (como la entrevista motivacional) que desarrollan esta habilidad rápidamente.",
    },
    icon: Handshake,
    color: "blue",
  },
  {
    signal: { en: "Prioritization Under Pressure", es: "Priorización Bajo Presión" },
    description: {
      en: "When everything feels urgent, it's hard to triage. We'll give you real FQHC frameworks for managing competing priorities without dropping balls.",
      es: "Cuando todo se siente urgente, es difícil priorizar. Te daremos marcos reales de FQHC para manejar prioridades competidoras sin dejar caer nada.",
    },
    icon: Zap,
    color: "amber",
  },
  {
    signal: { en: "Comfort Zone Awareness", es: "Conciencia de la Zona de Confort" },
    description: {
      en: "Staying where you're comfortable is natural. But in FQHC work, roles evolve fast. We'll map out growth pathways that stretch you without overwhelming you.",
      es: "Quedarte donde estás cómodo/a es natural. Pero en el trabajo de FQHC, los roles evolucionan rápido. Te mapearemos trayectorias de crecimiento que te desafíen sin abrumarte.",
    },
    icon: Sprout,
    color: "green",
  },
  {
    signal: { en: "Onboarding Strategy", es: "Estrategia de Incorporación" },
    description: {
      en: "Starting a new role without a plan is risky — especially in FQHCs where onboarding is often minimal. We'll give you a personalized 90-day plan based on your results.",
      es: "Comenzar un nuevo rol sin un plan es riesgoso — especialmente en FQHCs donde la incorporación es a menudo mínima. Te daremos un plan personalizado de 90 días basado en tus resultados.",
    },
    icon: Compass,
    color: "purple",
  },
];

/* ------------------------------------------------------------------ */
/*  Our Values data                                                    */
/* ------------------------------------------------------------------ */
const VALUES = [
  {
    icon: Scale,
    title: { en: "Objective Feedback", es: "Retroalimentación Objetiva" },
    description: {
      en: "Every candidate gets the same scenarios, the same scoring, the same feedback. No bias. No gatekeeping. Just data about your behavioral patterns.",
      es: "Cada candidato recibe los mismos escenarios, la misma puntuación, la misma retroalimentación. Sin sesgos. Sin exclusión. Solo datos sobre tus patrones de comportamiento.",
    },
  },
  {
    icon: Eye,
    title: { en: "Transparency", es: "Transparencia" },
    description: {
      en: "We tell you exactly what we're measuring and why. Your results are yours — we share the scoring methodology openly so you understand what each domain means.",
      es: "Te decimos exactamente qué estamos midiendo y por qué. Tus resultados son tuyos — compartimos la metodología de puntuación abiertamente para que entiendas qué significa cada dominio.",
    },
  },
  {
    icon: Sprout,
    title: { en: "Growth Over Gatekeeping", es: "Crecimiento Sobre Exclusión" },
    description: {
      en: "A low score isn't a rejection — it's a roadmap. We frame every result as a growth opportunity and give you specific, actionable next steps to improve.",
      es: "Una puntuación baja no es un rechazo — es una hoja de ruta. Enmarcamos cada resultado como una oportunidad de crecimiento y te damos pasos específicos y accionables para mejorar.",
    },
  },
  {
    icon: Heart,
    title: { en: "Health Equity", es: "Equidad en Salud" },
    description: {
      en: "Better hiring leads to better care. When FQHCs hire people who are mission-aligned, culturally competent, and ready to execute — patients in underserved communities get better outcomes.",
      es: "Mejor contratación lleva a mejor atención. Cuando los FQHCs contratan personas alineadas con la misión, culturalmente competentes y listas para ejecutar — los pacientes en comunidades desatendidas obtienen mejores resultados.",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */
export default function OurAssessmentPage() {
  const locale = useLocale();

  return (
    <main className="min-h-screen bg-white">
      {/* ============================================================ */}
      {/*  Hero                                                         */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-900 via-teal-800 to-teal-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 50%, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-teal-100 backdrop-blur-sm">
              <Brain className="size-4" />
              {t(
                {
                  en: "Assessment Methodology",
                  es: "Metodología de Evaluación",
                },
                locale
              )}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {t(
                {
                  en: "Our Assessment Philosophy",
                  es: "Nuestra Filosofía de Evaluación",
                },
                locale
              )}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-teal-100 sm:text-xl">
              {t(
                {
                  en: "We don't use personality tests or trick questions. We use real FQHC scenarios to measure the behavioral patterns that actually predict success in community health.",
                  es: "No usamos pruebas de personalidad ni preguntas trampa. Usamos escenarios reales de FQHC para medir los patrones de comportamiento que realmente predicen el éxito en salud comunitaria.",
                },
                locale
              )}
            </p>

            {/* Quick stats */}
            <div className="mx-auto mt-10 grid max-w-lg grid-cols-3 gap-6">
              {[
                { value: "5", label: { en: "Behavioral Domains", es: "Dominios Conductuales" } },
                { value: "15", label: { en: "Scenario Questions", es: "Preguntas de Escenario" } },
                { value: "10", label: { en: "Minutes to Complete", es: "Minutos para Completar" } },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl font-extrabold">{stat.value}</p>
                  <p className="mt-1 text-sm text-teal-200">{t(stat.label, locale)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Section 1: The Problem                                       */}
      {/* ============================================================ */}
      <section className="border-b border-stone-100 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-700">
              <AlertTriangle className="size-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
                {t(
                  {
                    en: "The Hiring Problem in Community Health",
                    es: "El Problema de Contratación en Salud Comunitaria",
                  },
                  locale
                )}
              </h2>
              <p className="mt-3 max-w-3xl text-lg leading-relaxed text-stone-600">
                {t(
                  {
                    en: "Traditional hiring is broken — especially in community health. The data is clear:",
                    es: "La contratación tradicional está rota — especialmente en salud comunitaria. Los datos son claros:",
                  },
                  locale
                )}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              {
                stat: "46%",
                label: { en: "of new hires fail within 18 months", es: "de nuevas contrataciones fracasan en 18 meses" },
                detail: {
                  en: "Nearly half of all new hires don't make it past their first year and a half. The cost? $30K–$50K per failed hire in recruitment, training, and lost productivity.",
                  es: "Casi la mitad de las nuevas contrataciones no pasan de su primer año y medio. ¿El costo? $30K–$50K por contratación fallida en reclutamiento, capacitación y productividad perdida.",
                },
              },
              {
                stat: "89%",
                label: { en: "fail for behavioral reasons", es: "fracasan por razones conductuales" },
                detail: {
                  en: "Not lack of technical skill — attitude, motivation, communication, and adaptability. These are exactly what resumes can't tell you.",
                  es: "No por falta de habilidad técnica — actitud, motivación, comunicación y adaptabilidad. Exactamente lo que los currículums no pueden decirte.",
                },
              },
              {
                stat: "$50K",
                label: { en: "average cost per bad hire", es: "costo promedio por mala contratación" },
                detail: {
                  en: "When an FQHC hires the wrong person, patients lose continuity of care, remaining staff burn out covering the gap, and the hiring cycle starts over.",
                  es: "Cuando un FQHC contrata a la persona equivocada, los pacientes pierden continuidad de atención, el personal restante se agota cubriendo la brecha y el ciclo de contratación comienza de nuevo.",
                },
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-stone-200 bg-stone-50 p-6 text-center"
              >
                <p className="text-3xl font-extrabold text-red-600">{item.stat}</p>
                <p className="mt-1 text-sm font-semibold text-stone-700">
                  {t(item.label, locale)}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-stone-500">
                  {t(item.detail, locale)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border-2 border-red-200 bg-red-50 p-6">
            <p className="text-center text-stone-700">
              <span className="font-bold text-red-700">
                {t(
                  {
                    en: "The resume + interview combo catches technical skills.",
                    es: "La combinación de currículum + entrevista detecta habilidades técnicas.",
                  },
                  locale
                )}
              </span>{" "}
              {t(
                {
                  en: "But 89% of failures are behavioral. You need a different tool.",
                  es: "Pero el 89% de los fracasos son conductuales. Necesitas una herramienta diferente.",
                },
                locale
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Section 2: Our Approach                                      */}
      {/* ============================================================ */}
      <section className="border-b border-stone-100 bg-stone-50 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
              <ShieldCheck className="size-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
                {t(
                  {
                    en: "Behavioral Scenarios, Not Personality Tests",
                    es: "Escenarios Conductuales, No Pruebas de Personalidad",
                  },
                  locale
                )}
              </h2>
              <p className="mt-3 max-w-3xl text-lg leading-relaxed text-stone-600">
                {t(
                  {
                    en: "Our assessment puts you in real FQHC situations — the ones you'd actually face on a Tuesday morning. Every question is a scenario that mirrors the daily realities of community health work.",
                    es: "Nuestra evaluación te pone en situaciones reales de FQHC — las que realmente enfrentarías un martes por la mañana. Cada pregunta es un escenario que refleja las realidades diarias del trabajo en salud comunitaria.",
                  },
                  locale
                )}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {[
              {
                icon: Brain,
                title: {
                  en: "What We DO Measure",
                  es: "Lo Que SÍ Medimos",
                },
                items: [
                  { en: "How you respond to real patient scenarios", es: "Cómo respondes a escenarios reales con pacientes" },
                  { en: "How you handle team conflict and communication", es: "Cómo manejas conflictos y comunicación en equipo" },
                  { en: "How you prioritize under pressure", es: "Cómo priorizas bajo presión" },
                  { en: "Whether you seek growth or avoid discomfort", es: "Si buscas crecer o evitas la incomodidad" },
                  { en: "How you plan for role transitions", es: "Cómo planificas para transiciones de rol" },
                ],
                good: true,
              },
              {
                icon: AlertTriangle,
                title: {
                  en: "What We DON'T Measure",
                  es: "Lo Que NO Medimos",
                },
                items: [
                  { en: "Your personality type (introvert/extrovert)", es: "Tu tipo de personalidad (introvertido/extrovertido)" },
                  { en: "Your IQ or cognitive ability", es: "Tu coeficiente intelectual o capacidad cognitiva" },
                  { en: "Trick questions or abstract puzzles", es: "Preguntas trampa o acertijos abstractos" },
                  { en: "Years of experience or credentials", es: "Años de experiencia o credenciales" },
                  { en: "Cultural background or identity", es: "Antecedentes culturales o identidad" },
                ],
                good: false,
              },
            ].map((card, i) => (
              <div
                key={i}
                className={`rounded-xl border p-6 ${
                  card.good
                    ? "border-teal-200 bg-teal-50"
                    : "border-stone-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <card.icon
                    className={`size-5 ${
                      card.good ? "text-teal-600" : "text-stone-400"
                    }`}
                  />
                  <h3 className="text-lg font-semibold text-stone-900">
                    {t(card.title, locale)}
                  </h3>
                </div>
                <ul className="mt-4 space-y-2">
                  {card.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-stone-600"
                    >
                      <CheckCircle2
                        className={`mt-0.5 size-4 shrink-0 ${
                          card.good ? "text-teal-500" : "text-stone-300"
                        }`}
                      />
                      {t(item, locale)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Section 3: The 5 Domains                                     */}
      {/* ============================================================ */}
      <section className="border-b border-stone-100 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
              {t(
                {
                  en: "The 5 Behavioral Domains",
                  es: "Los 5 Dominios Conductuales",
                },
                locale
              )}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-stone-600">
              {t(
                {
                  en: "Each domain measures a distinct behavioral pattern that research and FQHC hiring managers have identified as critical to job success.",
                  es: "Cada dominio mide un patrón conductual distinto que la investigación y los gerentes de contratación de FQHC han identificado como crítico para el éxito laboral.",
                },
                locale
              )}
            </p>
          </div>

          <div className="mt-12 space-y-6">
            {DOMAIN_DEFINITIONS.map((domain) => {
              const details = DOMAIN_DETAILS[domain.id];
              const colors = DOMAIN_COLORS[domain.id];
              const Icon = DOMAIN_ICONS[domain.id];

              return (
                <div
                  key={domain.id}
                  className={`rounded-2xl border ${colors.border} bg-white p-6 sm:p-8`}
                >
                  <div className="flex flex-col gap-6 sm:flex-row">
                    {/* Icon + Name */}
                    <div className="flex shrink-0 items-start gap-3 sm:w-64">
                      <div
                        className={`flex size-12 items-center justify-center rounded-xl ${colors.bg} ${colors.text}`}
                      >
                        <Icon className="size-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-stone-900">
                          {t(details.name, locale)}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-stone-500">
                          {t(
                            {
                              en: `Predicts: ${t(details.predicts, "en")}`,
                              es: `Predice: ${t(details.predicts, "es")}`,
                            },
                            locale
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wide text-stone-400">
                          {t({ en: "Why This Matters", es: "Por Qué Importa" }, locale)}
                        </h4>
                        <p className="mt-1 text-sm leading-relaxed text-stone-600">
                          {t(details.why, locale)}
                        </p>
                      </div>

                      <div className={`rounded-lg ${colors.bg} p-4`}>
                        <h4 className={`text-xs font-semibold uppercase tracking-wide ${colors.text}`}>
                          {t({ en: "The Research", es: "La Investigación" }, locale)}
                        </h4>
                        <p className={`mt-1 text-sm ${colors.text} opacity-80`}>
                          {t(details.research, locale)}
                        </p>
                      </div>

                      <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                        <h4 className="text-xs font-semibold uppercase tracking-wide text-stone-400">
                          {t({ en: "Sample Question", es: "Pregunta de Ejemplo" }, locale)}
                        </h4>
                        <p className="mt-1 text-sm italic text-stone-600">
                          {t(details.sampleQ, locale)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Section 4: Growth Signals                                    */}
      {/* ============================================================ */}
      <section className="border-b border-stone-100 bg-stone-50 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <Lightbulb className="size-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
                {t(
                  {
                    en: "Growth Signals, Not Disqualifiers",
                    es: "Señales de Crecimiento, No Descalificadores",
                  },
                  locale
                )}
              </h2>
              <p className="mt-3 max-w-3xl text-lg leading-relaxed text-stone-600">
                {t(
                  {
                    en: "When the assessment identifies a growth area, we don't reject you — we coach you. Every \"growth signal\" comes with specific feedback, resources, and next steps.",
                    es: "Cuando la evaluación identifica un área de crecimiento, no te rechazamos — te orientamos. Cada \"señal de crecimiento\" viene con retroalimentación específica, recursos y próximos pasos.",
                  },
                  locale
                )}
              </p>
            </div>
          </div>

          <div className="mt-10 space-y-4">
            {GROWTH_SIGNALS.map((signal, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl border border-stone-200 bg-white p-5"
              >
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
                    signal.color === "teal" ? "bg-teal-100 text-teal-700" :
                    signal.color === "blue" ? "bg-blue-100 text-blue-700" :
                    signal.color === "amber" ? "bg-amber-100 text-amber-700" :
                    signal.color === "green" ? "bg-green-100 text-green-700" :
                    "bg-purple-100 text-purple-700"
                  }`}
                >
                  <signal.icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900">
                    {t(signal.signal, locale)}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-stone-500">
                    {t(signal.description, locale)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Section 5: For Candidates                                    */}
      {/* ============================================================ */}
      <section className="border-b border-stone-100 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 sm:grid-cols-2">
            {/* For Candidates */}
            <div>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                  <Users className="size-5" />
                </div>
                <h2 className="text-xl font-bold text-stone-900 sm:text-2xl">
                  {t({ en: "For Candidates", es: "Para Candidatos" }, locale)}
                </h2>
              </div>
              <p className="mt-4 text-stone-600">
                {t(
                  {
                    en: "Our assessment is 100% free. Your results are yours. Here's what you get:",
                    es: "Nuestra evaluación es 100% gratuita. Tus resultados son tuyos. Esto es lo que recibes:",
                  },
                  locale
                )}
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  { en: "Personalized 5-domain score with detailed insights", es: "Puntuación personalizada en 5 dominios con insights detallados" },
                  { en: "Growth-oriented feedback — no pass/fail judgments", es: "Retroalimentación orientada al crecimiento — sin juicios de aprobado/reprobado" },
                  { en: "Customized 30/60/90-day plan for your next role", es: "Plan personalizado de 30/60/90 días para tu próximo rol" },
                  { en: "Career roadmap based on your strengths", es: "Trayectoria profesional basada en tus fortalezas" },
                  { en: "Score 60%+ and qualify for The Drop (exclusive matching)", es: "Obtén 60%+ y califica para The Drop (matching exclusivo)" },
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-stone-600"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-500" />
                    {t(item, locale)}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button
                  size="lg"
                  className="bg-teal-700 text-white hover:bg-teal-800"
                  asChild
                >
                  <Link href="/career-insights">
                    {t(
                      { en: "Take the Assessment", es: "Toma la Evaluación" },
                      locale
                    )}
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* For Employers */}
            <div>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                  <BarChart3 className="size-5" />
                </div>
                <h2 className="text-xl font-bold text-stone-900 sm:text-2xl">
                  {t(
                    { en: "For Employers", es: "Para Empleadores" },
                    locale
                  )}
                </h2>
              </div>
              <p className="mt-4 text-stone-600">
                {t(
                  {
                    en: "Stop hiring on resumes and gut feel. Our assessment gives you behavioral data that predicts on-the-job success:",
                    es: "Deja de contratar basándote en currículums e intuición. Nuestra evaluación te da datos conductuales que predicen el éxito laboral:",
                  },
                  locale
                )}
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  { en: "Pre-assessed candidates scored across 5 critical domains", es: "Candidatos pre-evaluados en 5 dominios críticos" },
                  { en: "Mission alignment data — not just stated interest", es: "Datos de alineación con la misión — no solo interés declarado" },
                  { en: "Cultural fit prediction based on behavioral patterns", es: "Predicción de ajuste cultural basada en patrones conductuales" },
                  { en: "Reduce time-to-hire and cost of bad hires", es: "Reduce el tiempo de contratación y el costo de malas contrataciones" },
                  { en: "Curated batches of top candidates via The Drop", es: "Lotes curados de mejores candidatos via The Drop" },
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-stone-600"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-amber-500" />
                    {t(item, locale)}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-stone-300 text-stone-700 hover:bg-stone-50"
                  asChild
                >
                  <Link href="/hire">
                    {t(
                      {
                        en: "Request Access",
                        es: "Solicitar Acceso",
                      },
                      locale
                    )}
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Section 6: Our Values                                        */}
      {/* ============================================================ */}
      <section className="border-b border-stone-100 bg-stone-50 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
              {t(
                {
                  en: "Our Assessment Values",
                  es: "Nuestros Valores de Evaluación",
                },
                locale
              )}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-stone-600">
              {t(
                {
                  en: "We believe hiring should be fair, transparent, and focused on potential — not gatekeeping.",
                  es: "Creemos que la contratación debe ser justa, transparente y enfocada en el potencial — no en la exclusión.",
                },
                locale
              )}
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {VALUES.map((value, i) => (
              <div
                key={i}
                className="rounded-xl border border-stone-200 bg-white p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                    <value.icon className="size-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-stone-900">
                    {t(value.title, locale)}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-stone-500">
                  {t(value.description, locale)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA Section                                                  */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-b from-teal-50 to-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            {t(
              {
                en: "Ready to See Where You Stand?",
                es: "¿Listo/a Para Ver Dónde Estás?",
              },
              locale
            )}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-stone-600">
            {t(
              {
                en: "Take the free 10-minute assessment. Get your personalized behavioral profile, 90-day plan, and career recommendations — no account required.",
                es: "Toma la evaluación gratuita de 10 minutos. Obtén tu perfil conductual personalizado, plan de 90 días y recomendaciones de carrera — sin necesidad de cuenta.",
              },
              locale
            )}
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="bg-teal-700 text-white hover:bg-teal-800"
              asChild
            >
              <Link href="/career-insights">
                {t(
                  {
                    en: "Take the Assessment — Free",
                    es: "Toma la Evaluación — Gratis",
                  },
                  locale
                )}
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-stone-300 text-stone-700 hover:bg-stone-50"
              asChild
            >
              <Link href="/jobs">
                {t(
                  { en: "Browse FQHC Jobs", es: "Buscar Empleos FQHC" },
                  locale
                )}
              </Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-stone-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-teal-600" />
              {t(
                { en: "100% free for candidates", es: "100% gratis para candidatos" },
                locale
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-teal-600" />
              {t(
                { en: "10 minutes to complete", es: "10 minutos para completar" },
                locale
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-teal-600" />
              {t(
                {
                  en: "English & Spanish",
                  es: "Inglés y Español",
                },
                locale
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
