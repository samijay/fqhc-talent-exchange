// Clinic Manager Master Class — Course landing page + player
"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { t } from "@/lib/i18n-helpers";
import {
  BookOpen,
  Clock,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Users,
  Calendar,
  HeartPulse,
  Shield,
  Heart,
  Calculator,
  Award,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/ui/design-system";
import { CoursePlayer } from "@/components/academy/CoursePlayer";
import {
  CLINIC_MANAGER_MODULES,
  CLINIC_MANAGER_TOTAL_XP,
  CLINIC_MANAGER_TOTAL_MINUTES,
} from "@/lib/clinic-manager-course-modules";
import { useAuth } from "@/components/auth/AuthProvider";
import { createElement, useState } from "react";

const ICON_MAP: Record<string, React.ElementType> = {
  DollarSign,
  Users,
  Calendar,
  HeartPulse,
  Shield,
  Heart,
  Calculator,
  Award,
};

export default function ClinicManagerCoursePage() {
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
              {isEs ? "Gerente de Clínica" : "Clinic Manager"}
            </span>
          </div>

          <CoursePlayer
            courseId="clinic-manager"
            modules={CLINIC_MANAGER_MODULES}
            totalXP={CLINIC_MANAGER_TOTAL_XP}
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
            {isEs ? "Gerente de Clínica" : "Clinic Manager"}
          </span>
        </div>

        {/* Hero */}
        <PageHero
          variant="minimal"
          title={{
            en: "Clinic Manager Master Class",
            es: "Clase Magistral de Gerente de Cl\u00ednica",
          }}
          subtitle={{
            en: "The complete operations playbook for FQHC managers. Master PPS billing, team design, scheduling, service integration, CalAIM, and workforce retention.",
            es: "El manual completo de operaciones para gerentes de FQHC. Domina facturaci\u00f3n PPS, dise\u00f1o de equipos, programaci\u00f3n, integraci\u00f3n de servicios, CalAIM y retenci\u00f3n de personal.",
          }}
          meta={isEs ? "100% Gratis \u2022 8 M\u00f3dulos \u2022 Interactivo" : "100% Free \u2022 8 Modules \u2022 Interactive"}
          stats={[
            { value: `${CLINIC_MANAGER_TOTAL_MINUTES}`, label: isEs ? "minutos" : "minutes" },
            { value: "8", label: isEs ? "m\u00f3dulos" : "modules" },
            { value: `${CLINIC_MANAGER_TOTAL_XP}`, label: "XP" },
          ]}
        >
          <Button
            onClick={() => setCourseStarted(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-12 text-base"
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
                icon: DollarSign,
                title: isEs ? "Motor Financiero" : "Financial Engine",
                desc: isEs
                  ? "PPS, mezcla de pagadores, facturación del mismo día, y modelado de ingresos"
                  : "PPS, payer mix, same-day billing, and revenue modeling",
              },
              {
                icon: Users,
                title: isEs ? "Diseño de Equipos" : "Team Design",
                desc: isEs
                  ? "Ratios MA:proveedor, alcance de práctica, y escalas de carrera"
                  : "MA:provider ratios, scope of practice, and career ladders",
              },
              {
                icon: BarChart3,
                title: isEs ? "Planificación Operacional" : "Operational Planning",
                desc: isEs
                  ? "Programación, integración BH/dental, CalAIM/ECM, y plan de 90 días"
                  : "Scheduling, BH/dental integration, CalAIM/ECM, and 90-day plan",
              },
            ].map((item) => (
              <Card key={item.title} className="border-stone-200 dark:border-stone-700">
                <CardContent className="p-5 text-center">
                  <item.icon className="h-8 w-8 text-indigo-500 mx-auto mb-3" />
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
            {CLINIC_MANAGER_MODULES.map((mod) => (
                <Card key={mod.id} className="border-stone-200 dark:border-stone-700">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                      {createElement(ICON_MAP[mod.icon] || BookOpen, { className: "h-4 w-4 text-indigo-600 dark:text-indigo-400" })}
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
            ))}
          </div>
        </div>

        {/* Prerequisites */}
        <Card className="mb-12 border-stone-200 dark:border-stone-700">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-stone-800 dark:text-stone-100 mb-4 text-center">
              {isEs ? "¿Quién debería tomar este curso?" : "Who should take this course?"}
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                isEs ? "Gerentes de clínica FQHC nuevos y existentes" : "New and existing FQHC clinic managers",
                isEs ? "Directores de operaciones (COO)" : "Chief Operating Officers (COO)",
                isEs ? "Supervisores de MA y coordinadores de atención" : "MA supervisors and care coordinators",
                isEs ? "Cualquiera que aspire a un rol de liderazgo en FQHC" : "Anyone aspiring to an FQHC leadership role",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-500">
                  <CheckCircle2 className="h-4 w-4 text-indigo-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA bottom */}
        <div className="text-center">
          <Button
            onClick={() => setCourseStarted(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-12 text-base"
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
