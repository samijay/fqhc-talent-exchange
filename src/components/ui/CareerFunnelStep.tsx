"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { Check, ChevronRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  CareerFunnelStep — Progress indicator for 5-step career funnel     */
/*  1. Assess → 2. Explore → 3. Qualify → 4. Prepare → 5. Apply       */
/* ------------------------------------------------------------------ */

export type FunnelStepNumber = 1 | 2 | 3 | 4 | 5;

interface FunnelStepConfig {
  step: FunnelStepNumber;
  labelEn: string;
  labelEs: string;
  descriptionEn: string;
  descriptionEs: string;
  hrefEn: string;
  hrefEs: string;
}

const FUNNEL_STEPS: Record<FunnelStepNumber, FunnelStepConfig> = {
  1: {
    step: 1,
    labelEn: "Assess",
    labelEs: "Evalúa",
    descriptionEn: "Take the Career Assessment to understand your strengths, growth areas, and next steps based on your role.",
    descriptionEs:
      "Realiza la Evaluación de Carrera para entender tus fortalezas, áreas de crecimiento y próximos pasos según tu rol.",
    hrefEn: "/career-insights",
    hrefEs: "/es/career-insights",
  },
  2: {
    step: 2,
    labelEn: "Explore",
    labelEs: "Explora",
    descriptionEn: "Explore career pathways with salary data and regional job markets for 30+ FQHC roles.",
    descriptionEs:
      "Explora caminos de carrera con datos salariales y mercados laborales regionales para 30+ roles en FQHCs.",
    hrefEn: "/career-roadmap",
    hrefEs: "/es/career-roadmap",
  },
  3: {
    step: 3,
    labelEn: "Qualify",
    labelEs: "Califica",
    descriptionEn:
      "Build credentials with 15 California certifications and discover free training programs + loan repayment.",
    descriptionEs:
      "Construye credenciales con 15 certificaciones de California y descubre programas de capacitación gratuita + reembolso de préstamos.",
    hrefEn: "/certifications",
    hrefEs: "/es/certifications",
  },
  4: {
    step: 4,
    labelEn: "Prepare",
    labelEs: "Prepárate",
    descriptionEn:
      "Build your resume, master FQHC interviews, and get operational guides for your first 90 days.",
    descriptionEs:
      "Construye tu currículum, domina entrevistas de FQHC, y obtén guías operacionales para tus primeros 90 días.",
    hrefEn: "/resume-builder",
    hrefEs: "/es/resume-builder",
  },
  5: {
    step: 5,
    labelEn: "Apply",
    labelEs: "Solicita",
    descriptionEn: "Browse 1000+ FQHC job listings and explore 220 California health centers.",
    descriptionEs:
      "Explora 1000+ ofertas de empleo en FQHCs y descubre 220 centros de salud de California.",
    hrefEn: "/jobs",
    hrefEs: "/es/jobs",
  },
};

interface CareerFunnelStepProps {
  currentStep: FunnelStepNumber;
  locale?: string;
}

export function CareerFunnelStep({
  currentStep,
  locale: localeOverride,
}: CareerFunnelStepProps) {
  const defaultLocale = useLocale();
  const locale = localeOverride || defaultLocale;
  const isEs = locale === "es";

  const baseHref = isEs ? "/es" : "";
  const nextStepNumber = (currentStep + 1) as FunnelStepNumber | 6;
  const isComplete = currentStep === 5;
  const nextStep =
    nextStepNumber <= 5
      ? FUNNEL_STEPS[nextStepNumber as FunnelStepNumber]
      : null;

  return (
    <div className="space-y-8">
      {/* Step Indicator */}
      <div className="space-y-4">
        {/* Horizontal Steps Container */}
        <div className="flex items-center justify-between gap-2 md:gap-1">
          {(Object.keys(FUNNEL_STEPS) as unknown as FunnelStepNumber[]).map(
            (stepNum, idx) => {
              const isCompleted = stepNum < currentStep;
              const isCurrent = stepNum === currentStep;

              return (
                <div
                  key={stepNum}
                  className="flex items-center flex-1"
                >
                  {/* Step Circle */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold text-sm md:text-base transition-all ${
                      isCurrent
                        ? "bg-teal-700 text-white ring-4 ring-teal-200"
                        : isCompleted
                          ? "bg-emerald-600 text-white"
                          : "bg-stone-200 text-stone-600"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span>{stepNum}</span>
                    )}
                  </div>

                  {/* Connecting Line (not on last step) */}
                  {idx < 4 && (
                    <div
                      className={`flex-1 h-1 mx-1 md:mx-2 transition-all ${
                        isCompleted
                          ? "bg-emerald-600"
                          : isCurrent
                            ? "bg-teal-200"
                            : "bg-stone-200"
                      }`}
                    />
                  )}
                </div>
              );
            }
          )}
        </div>

        {/* Step Labels - Responsive */}
        <div className="grid grid-cols-5 gap-1 md:gap-2">
          {(Object.keys(FUNNEL_STEPS) as unknown as FunnelStepNumber[]).map(
            (stepNum) => {
              const step = FUNNEL_STEPS[stepNum];
              const label = isEs ? step.labelEs : step.labelEn;
              const isCurrent = stepNum === currentStep;

              return (
                <div key={stepNum} className="text-center">
                  <p
                    className={`text-xs md:text-sm font-medium transition-colors ${
                      isCurrent
                        ? "text-teal-700"
                        : "text-stone-600"
                    }`}
                  >
                    {label}
                  </p>
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* Next Step CTA or Completion Message */}
      {isComplete ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-center">
          <div className="space-y-2">
            <p className="text-lg md:text-xl font-bold text-emerald-700">
              {isEs ? "¡Estás listo!" : "You're ready!"}
            </p>
            <p className="text-sm md:text-base text-emerald-700">
              {isEs
                ? "Has completado los 5 pasos del embudo de carrera. Ahora puedes explorar ofertas de empleo y conectar con FQHCs que valuen tu experiencia."
                : "You've completed all 5 steps of the career funnel. You're ready to explore job listings and connect with FQHCs that value your expertise."}
            </p>
          </div>
        </div>
      ) : nextStep ? (
        <Link
          href={`${baseHref}${nextStep[isEs ? "hrefEs" : "hrefEn"]}`}
          className="block rounded-lg border border-teal-200 bg-teal-50 p-6 hover:bg-teal-100 transition-colors"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide">
                {isEs ? "Próximo paso" : "Next Step"}
              </p>
              <p className="text-lg md:text-xl font-bold text-teal-900">
                {nextStep[isEs ? "labelEs" : "labelEn"]}
              </p>
              <p className="text-sm md:text-base text-teal-800">
                {nextStep[isEs ? "descriptionEs" : "descriptionEn"]}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-teal-700 flex-shrink-0 mt-1" />
          </div>
        </Link>
      ) : null}
    </div>
  );
}
