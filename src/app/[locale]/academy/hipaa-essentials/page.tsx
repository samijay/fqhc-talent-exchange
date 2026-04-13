// HIPAA Essentials — Course landing page + player
"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { t } from "@/lib/i18n-helpers";
import {
  BookOpen,
  Zap,
  Clock,
  ArrowRight,
  CheckCircle2,
  Shield,
  Lock,
  AlertTriangle,
  UserCheck,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/ui/design-system";
import { CoursePlayer } from "@/components/academy/CoursePlayer";
import {
  HIPAA_MODULES,
  HIPAA_TOTAL_XP,
} from "@/lib/hipaa-course-modules";
import { useAuth } from "@/components/auth/AuthProvider";
import { useState } from "react";

const ICON_MAP: Record<string, React.ElementType> = {
  Shield,
  Lock,
  AlertTriangle,
  UserCheck,
  ShieldCheck,
};

const TOTAL_MINUTES = HIPAA_MODULES.reduce((s, m) => s + m.estimatedMinutes, 0);

export default function HIPAACoursePage() {
  const locale = useLocale();
  const isEs = locale === "es";
  const { user } = useAuth();
  const [courseStarted, setCourseStarted] = useState(false);


  if (courseStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white dark:from-stone-950 dark:to-stone-900">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-500 mb-6">
            <Link href="/academy" className="hover:text-teal-600 transition-colors">
              {isEs ? "Academia" : "Academy"}
            </Link>
            <span>/</span>
            <span className="text-stone-700 dark:text-stone-300">
              {isEs ? "HIPAA Esencial" : "HIPAA Essentials"}
            </span>
          </div>

          <CoursePlayer
            courseId="hipaa-essentials"
            modules={HIPAA_MODULES}
            totalXP={HIPAA_TOTAL_XP}
            userId={user?.id}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white dark:from-stone-950 dark:to-stone-900">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-500 mb-8">
          <Link href="/academy" className="hover:text-teal-600 transition-colors">
            {isEs ? "Academia" : "Academy"}
          </Link>
          <span>/</span>
          <span className="text-stone-700 dark:text-stone-300">
            {isEs ? "HIPAA Esencial" : "HIPAA Essentials"}
          </span>
        </div>

        {/* Hero */}
        <PageHero
          variant="minimal"
          title={{
            en: "HIPAA Essentials for FQHC Staff",
            es: "Fundamentos HIPAA para Personal de FQHC",
          }}
          subtitle={{
            en: "Protect patient privacy and meet HIPAA requirements. Covers the Privacy Rule, Security Rule, breach response, and daily habits \u2014 with real FQHC scenarios.",
            es: "Protege la privacidad del paciente y cumple los requisitos HIPAA. Cubre la Regla de Privacidad, Regla de Seguridad, respuesta a violaciones y h\u00e1bitos diarios \u2014 con escenarios reales de FQHC.",
          }}
          meta={isEs ? `100% Gratis \u2022 4 M\u00f3dulos \u2022 ${TOTAL_MINUTES} Min` : `100% Free \u2022 4 Modules \u2022 ${TOTAL_MINUTES} Min`}
          stats={[
            { value: `${TOTAL_MINUTES}`, label: isEs ? "minutos" : "minutes" },
            { value: "4", label: isEs ? "m\u00f3dulos" : "modules" },
            { value: `${HIPAA_TOTAL_XP}`, label: "XP" },
          ]}
        >
          <Button
            onClick={() => setCourseStarted(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 h-12 text-base"
          >
            {isEs ? "Comenzar Curso Gratis" : "Start Free Course"}
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </PageHero>

        {/* What you'll learn */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100 text-center mb-6">
            {isEs ? "Lo que aprenderás" : "What you'll learn"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: Shield,
                title: isEs ? "Reglas de Privacidad" : "Privacy Rules",
                desc: isEs
                  ? "PHI, ePHI, entidades cubiertas y el estándar de mínimo necesario"
                  : "PHI, ePHI, covered entities, and the minimum necessary standard",
              },
              {
                icon: Lock,
                title: isEs ? "Seguridad y Salvaguardas" : "Security & Safeguards",
                desc: isEs
                  ? "Salvaguardas administrativas, físicas y técnicas para proteger ePHI"
                  : "Administrative, physical, and technical safeguards to protect ePHI",
              },
              {
                icon: AlertTriangle,
                title: isEs ? "Respuesta a Violaciones" : "Breach Response",
                desc: isEs
                  ? "Evaluar violaciones, notificar afectados y prevenir recurrencia"
                  : "Assess breaches, notify affected individuals, and prevent recurrence",
              },
            ].map((item) => (
              <Card key={item.title} className="border-stone-200 dark:border-stone-700">
                <CardContent className="p-5 text-center">
                  <item.icon className="h-8 w-8 text-teal-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-stone-800 dark:text-stone-200 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-stone-500 dark:text-stone-500">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Module preview list */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100 text-center mb-6">
            {isEs ? "Módulos del Curso" : "Course Modules"}
          </h2>
          <div className="space-y-3">
            {HIPAA_MODULES.map((mod) => {
              const Icon = ICON_MAP[mod.icon] || BookOpen;
              return (
                <Card key={mod.id} className="border-stone-200 dark:border-stone-700">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-stone-800 dark:text-stone-200 truncate">
                        {t(mod.title, locale)}
                      </p>
                      <p className="text-sm text-stone-500 dark:text-stone-500 truncate">
                        {t(mod.subtitle, locale)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 text-xs text-stone-500 dark:text-stone-500">
                      <Clock className="h-3 w-3" />
                      {mod.estimatedMinutes}m
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Who should take */}
        <Card className="mb-12 border-stone-200 dark:border-stone-700">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-stone-800 dark:text-stone-100 mb-4 text-center">
              {isEs ? "¿Quién debería tomar este curso?" : "Who should take this course?"}
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                isEs ? "Todos los empleados de FQHC (clínicos y administrativos)" : "All FQHC employees (clinical and administrative)",
                isEs ? "Personal nuevo como parte de orientación" : "New hires as part of onboarding",
                isEs ? "Gerentes que necesitan documentar capacitación de cumplimiento" : "Managers who need to document compliance training",
                isEs ? "Cualquier persona que maneje información de pacientes" : "Anyone who handles patient information",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-500">
                  <CheckCircle2 className="h-4 w-4 text-teal-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cross-link to Compliance Hub */}
        <Card className="mb-12 border-teal-200 dark:border-teal-800 bg-teal-50/50 dark:bg-teal-950/20">
          <CardContent className="p-5 flex items-start gap-4">
            <ShieldCheck className="h-8 w-8 text-teal-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-stone-800 dark:text-stone-200 mb-1">
                {isEs ? "¿Necesitas más herramientas de cumplimiento?" : "Need more compliance tools?"}
              </h3>
              <p className="text-sm text-stone-500 dark:text-stone-500 mb-3">
                {isEs
                  ? "Visita nuestro Centro de Cumplimiento para listas de verificación interactivas, plantillas de políticas y un calendario regulatorio."
                  : "Visit our Compliance Hub for interactive checklists, policy templates, and a regulatory calendar."}
              </p>
              <Link href="/strategy/compliance">
                <Button variant="outline" size="sm" className="border-teal-300 text-teal-700 hover:bg-teal-100 dark:border-teal-700 dark:text-teal-300 dark:hover:bg-teal-900/30">
                  {isEs ? "Explorar Centro de Cumplimiento" : "Explore Compliance Hub"}
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* CTA bottom */}
        <div className="text-center">
          <Button
            onClick={() => setCourseStarted(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 h-12 text-base"
          >
            {isEs ? "Comenzar Curso Gratis" : "Start Free Course"}
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
          <p className="text-xs text-stone-500 mt-3">
            {isEs
              ? "Sin registro requerido • Progreso guardado localmente • Siempre gratis"
              : "No registration required • Progress saved locally • Always free"}
          </p>
        </div>
      </div>
    </div>
  );
}
