// SimulatorWizard — 3-step guided setup for all simulator tools
// Voice: warm colleague helping you get started, not a form to fill out
"use client";

import { useState } from "react";
import {
  MapPin,
  Heart,
  Stethoscope,
  Brain,
  Pill,
  Users,
  TrendingUp,
  DollarSign,
  Shield,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Settings2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/track";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type OrgSize = "small" | "mid-size" | "large";
export type Priority = "maximize-revenue" | "reduce-costs" | "model-staffing" | "prepare-cuts";

export interface WizardConfig {
  orgName: string;
  size: OrgSize;
  region: string;
  services: {
    dental: boolean;
    behavioralHealth: boolean;
    ecm: boolean;
    pharmacy340B: boolean;
    ccm: boolean;
  };
  priority: Priority;
}

export interface SimulatorWizardProps {
  onComplete: (config: WizardConfig) => void;
  onSkip: () => void;
  locale: string;
}

/* ------------------------------------------------------------------ */
/*  Bilingual helper                                                   */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const REGIONS = [
  { value: "los-angeles", en: "Los Angeles", es: "Los Ángeles" },
  { value: "san-diego", en: "San Diego", es: "San Diego" },
  { value: "bay-area", en: "Bay Area", es: "Área de la Bahía" },
  { value: "sacramento", en: "Sacramento", es: "Sacramento" },
  { value: "central-valley", en: "Central Valley", es: "Valle Central" },
  { value: "inland-empire", en: "Inland Empire", es: "Inland Empire" },
  { value: "central-coast", en: "Central Coast", es: "Costa Central" },
  { value: "north-state", en: "North State", es: "Norte del Estado" },
  { value: "north-coast", en: "North Coast", es: "Costa Norte" },
];

const SIZE_OPTIONS: {
  value: OrgSize;
  label: { en: string; es: string };
  desc: { en: string; es: string };
  staff: string;
}[] = [
  {
    value: "small",
    label: { en: "Community Clinic", es: "Clínica Comunitaria" },
    desc: {
      en: "Single site or small network, close-knit team",
      es: "Sitio único o red pequeña, equipo unido",
    },
    staff: "50–150",
  },
  {
    value: "mid-size",
    label: { en: "Growing Network", es: "Red en Crecimiento" },
    desc: {
      en: "Multiple sites, expanding services and team",
      es: "Múltiples sitios, servicios y equipo en expansión",
    },
    staff: "150–500",
  },
  {
    value: "large",
    label: { en: "Regional Health System", es: "Sistema de Salud Regional" },
    desc: {
      en: "Many sites, hundreds of colleagues, complex operations",
      es: "Muchos sitios, cientos de colegas, operaciones complejas",
    },
    staff: "500+",
  },
];

const SERVICE_OPTIONS: {
  key: keyof WizardConfig["services"];
  label: { en: string; es: string };
  benefit: { en: string; es: string };
  icon: React.ElementType;
}[] = [
  {
    key: "dental",
    label: { en: "Dental Care", es: "Atención Dental" },
    benefit: {
      en: "Same-day dental visits generate a 2nd PPS encounter",
      es: "Visitas dentales el mismo día generan un 2° encuentro PPS",
    },
    icon: Stethoscope,
  },
  {
    key: "behavioralHealth",
    label: { en: "Behavioral Health", es: "Salud Conductual" },
    benefit: {
      en: "Integrated BH unlocks same-day billing opportunities",
      es: "Salud conductual integrada desbloquea facturación el mismo día",
    },
    icon: Brain,
  },
  {
    key: "ecm",
    label: { en: "ECM / CalAIM", es: "ECM / CalAIM" },
    benefit: {
      en: "Enhanced Care Management adds per-member-per-month revenue",
      es: "Manejo de Cuidados Mejorados agrega ingresos mensuales por miembro",
    },
    icon: Heart,
  },
  {
    key: "pharmacy340B",
    label: { en: "340B Pharmacy", es: "Farmacia 340B" },
    benefit: {
      en: "Drug pricing savings can add $800K+ annually",
      es: "Ahorros en precios de medicamentos pueden agregar $800K+ anuales",
    },
    icon: Pill,
  },
  {
    key: "ccm",
    label: { en: "Chronic Care Management", es: "Manejo de Enfermedades Crónicas" },
    benefit: {
      en: "CCM billing for patients with 2+ chronic conditions",
      es: "Facturación CCM para pacientes con 2+ condiciones crónicas",
    },
    icon: Shield,
  },
];

const PRIORITY_OPTIONS: {
  value: Priority;
  label: { en: string; es: string };
  desc: { en: string; es: string };
  icon: React.ElementType;
}[] = [
  {
    value: "maximize-revenue",
    label: { en: "Find Revenue Opportunities", es: "Encontrar Oportunidades de Ingresos" },
    desc: {
      en: "Show me where we're leaving money on the table",
      es: "Muéstrame dónde estamos perdiendo ingresos",
    },
    icon: TrendingUp,
  },
  {
    value: "reduce-costs",
    label: { en: "Reduce Costs", es: "Reducir Costos" },
    desc: {
      en: "Help us do more with the team we have",
      es: "Ayúdanos a hacer más con el equipo que tenemos",
    },
    icon: DollarSign,
  },
  {
    value: "model-staffing",
    label: { en: "Plan Staffing Changes", es: "Planificar Cambios de Personal" },
    desc: {
      en: "We're growing or restructuring — what should our team look like?",
      es: "Estamos creciendo o reestructurando — ¿cómo debería verse nuestro equipo?",
    },
    icon: Users,
  },
  {
    value: "prepare-cuts",
    label: { en: "Prepare for Funding Changes", es: "Prepararse para Cambios en Financiamiento" },
    desc: {
      en: "Help us model what H.R. 1 and Medi-Cal changes mean for us",
      es: "Ayúdanos a modelar lo que significan los cambios de H.R. 1 y Medi-Cal",
    },
    icon: Shield,
  },
];

/* ------------------------------------------------------------------ */
/*  Step indicator                                                     */
/* ------------------------------------------------------------------ */

function StepIndicator({
  current,
  total,
  locale,
}: {
  current: number;
  total: number;
  locale: string;
}) {
  const isEs = locale === "es";
  const labels = [
    { en: "Your Organization", es: "Tu Organización" },
    { en: "Your Services", es: "Tus Servicios" },
    { en: "Your Priority", es: "Tu Prioridad" },
  ];

  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {labels.slice(0, total).map((label, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === current;
        const isDone = stepNum < current;
        return (
          <div key={i} className="flex items-center gap-2">
            {i > 0 && (
              <div
                className={`h-px w-8 sm:w-12 ${
                  isDone ? "bg-teal-400" : "bg-stone-200"
                }`}
              />
            )}
            <div className="flex items-center gap-1.5">
              <div
                className={`flex size-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  isDone
                    ? "bg-teal-600 text-white"
                    : isActive
                      ? "bg-teal-100 text-teal-700 ring-2 ring-teal-400"
                      : "bg-stone-100 text-stone-500"
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="size-4" />
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={`hidden sm:inline text-xs font-medium ${
                  isActive ? "text-teal-700" : isDone ? "text-teal-600" : "text-stone-500"
                }`}
              >
                {isEs ? label.es : label.en}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Wizard Component                                              */
/* ------------------------------------------------------------------ */

export function SimulatorWizard({ onComplete, onSkip, locale }: SimulatorWizardProps) {
  const isEs = locale === "es";
  const [step, setStep] = useState(1);

  // Wizard state
  const [orgName, setOrgName] = useState("");
  const [size, setSize] = useState<OrgSize>("mid-size");
  const [region, setRegion] = useState("los-angeles");
  const [services, setServices] = useState({
    dental: true,
    behavioralHealth: true,
    ecm: false,
    pharmacy340B: false,
    ccm: false,
  });
  const [priority, setPriority] = useState<Priority>("maximize-revenue");

  const toggleService = (key: keyof typeof services) => {
    setServices((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleComplete = () => {
    onComplete({ orgName, size, region, services, priority });

    // Track simulator setup completion
    try {
      trackEvent({
        event_type: "simulator_run" as const,
        tool_name: "simulator-wizard",
        metadata: { size, region, services, priority },
        locale: locale as "en" | "es",
      });
    } catch { /* tracking should never break the experience */ }
  };

  return (
    <div className="mx-auto max-w-2xl">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700 mb-4">
          <Sparkles className="size-4" />
          {isEs ? "Configuración Guiada" : "Guided Setup"}
        </div>
        <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
          {step === 1
            ? isEs
              ? "Cuéntanos sobre tu organización"
              : "Tell us about your organization"
            : step === 2
              ? isEs
                ? "¿Qué servicios ofreces?"
                : "What services do you offer?"
              : isEs
                ? "¿Qué te gustaría explorar?"
                : "What would you like to explore?"}
        </h2>
        <p className="mt-2 text-stone-500 max-w-lg mx-auto">
          {step === 1
            ? isEs
              ? "Empezaremos con lo básico para que los números tengan sentido para tu clínica."
              : "We'll start with the basics so the numbers make sense for your clinic."
            : step === 2
              ? isEs
                ? "Selecciona los servicios que ofreces — esto nos ayuda a mostrar las oportunidades correctas."
                : "Select the services you offer — this helps us show the right opportunities."
              : isEs
                ? "¿Qué es lo más importante para tu equipo ahora mismo?"
                : "What matters most to your team right now?"}
        </p>
      </div>

      <StepIndicator current={step} total={3} locale={locale} />

      {/* Step 1: Organization */}
      {step === 1 && (
        <div className="space-y-6">
          {/* Org name (optional) */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">
              {isEs ? "Nombre de tu organización (opcional)" : "Your organization name (optional)"}
            </label>
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder={isEs ? "ej. Centro de Salud Comunitario" : "e.g. Community Health Center"}
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          {/* Size */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-3">
              {isEs ? "¿Qué tan grande es tu equipo?" : "How big is your team?"}
            </label>
            <div className="space-y-2">
              {SIZE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSize(opt.value)}
                  className={`w-full text-left rounded-xl border-2 p-4 transition-all ${
                    size === opt.value
                      ? "border-teal-500 bg-teal-50 shadow-sm"
                      : "border-stone-200 bg-white hover:border-stone-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-stone-900">
                        {t(opt.label, locale)}
                      </div>
                      <div className="text-sm text-stone-500 mt-0.5">
                        {t(opt.desc, locale)}
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <div className="text-xs text-stone-500">
                        {isEs ? "Personal" : "Staff"}
                      </div>
                      <div className="font-bold text-stone-700">{opt.staff}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Region */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">
              <MapPin className="size-4 inline mr-1" />
              {isEs ? "¿Dónde estás en California?" : "Where in California are you?"}
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-900 bg-white focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              {REGIONS.map((r) => (
                <option key={r.value} value={r.value}>
                  {t(r, locale)}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Step 2: Services */}
      {step === 2 && (
        <div className="space-y-3">
          {SERVICE_OPTIONS.map((svc) => {
            const isActive = services[svc.key];
            return (
              <button
                key={svc.key}
                onClick={() => toggleService(svc.key)}
                className={`w-full text-left rounded-xl border-2 p-4 transition-all ${
                  isActive
                    ? "border-teal-500 bg-teal-50"
                    : "border-stone-200 bg-white hover:border-stone-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`rounded-lg p-2 shrink-0 ${
                      isActive
                        ? "bg-teal-100 text-teal-700"
                        : "bg-stone-100 text-stone-500"
                    }`}
                  >
                    <svc.icon className="size-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-stone-900">
                        {t(svc.label, locale)}
                      </span>
                      <div
                        className={`size-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          isActive
                            ? "border-teal-500 bg-teal-500"
                            : "border-stone-300"
                        }`}
                      >
                        {isActive && (
                          <CheckCircle2 className="size-3.5 text-white" />
                        )}
                      </div>
                    </div>
                    {isActive && (
                      <p className="text-xs text-teal-600 mt-1">
                        {t(svc.benefit, locale)}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Step 3: Priority */}
      {step === 3 && (
        <div className="space-y-3">
          {PRIORITY_OPTIONS.map((opt) => {
            const isActive = priority === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setPriority(opt.value)}
                className={`w-full text-left rounded-xl border-2 p-5 transition-all ${
                  isActive
                    ? "border-teal-500 bg-teal-50 shadow-sm"
                    : "border-stone-200 bg-white hover:border-stone-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`rounded-lg p-2.5 shrink-0 ${
                      isActive
                        ? "bg-teal-100 text-teal-700"
                        : "bg-stone-100 text-stone-500"
                    }`}
                  >
                    <opt.icon className="size-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-stone-900">
                      {t(opt.label, locale)}
                    </div>
                    <div className="text-sm text-stone-500 mt-0.5">
                      {t(opt.desc, locale)}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <div>
          {step > 1 ? (
            <Button
              variant="ghost"
              onClick={() => setStep(step - 1)}
              className="text-stone-600"
            >
              <ArrowLeft className="size-4 mr-1" />
              {isEs ? "Atrás" : "Back"}
            </Button>
          ) : (
            <button
              onClick={onSkip}
              className="text-sm text-stone-500 hover:text-stone-600 inline-flex items-center gap-1"
            >
              <Settings2 className="size-3.5" />
              {isEs ? "Ir directo al modo manual" : "Skip to manual mode"}
            </button>
          )}
        </div>

        {step < 3 ? (
          <Button
            onClick={() => setStep(step + 1)}
            className="bg-teal-700 hover:bg-teal-800 text-white"
          >
            {isEs ? "Continuar" : "Continue"}
            <ArrowRight className="size-4 ml-1" />
          </Button>
        ) : (
          <Button
            onClick={handleComplete}
            className="bg-teal-700 hover:bg-teal-800 text-white"
          >
            <Sparkles className="size-4 mr-1" />
            {isEs ? "Ver mis resultados" : "Show my results"}
          </Button>
        )}
      </div>
    </div>
  );
}
