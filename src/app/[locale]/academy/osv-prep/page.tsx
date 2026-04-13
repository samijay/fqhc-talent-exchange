// HRSA OSV Prep — Course landing page + player
"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { t } from "@/lib/i18n-helpers";
import {
  BookOpen,
  Clock,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Search,
  CalendarCheck,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/ui/design-system";
import { CoursePlayer } from "@/components/academy/CoursePlayer";
import {
  OSV_MODULES,
  OSV_TOTAL_XP,
} from "@/lib/osv-prep-course-modules";
import { useAuth } from "@/components/auth/AuthProvider";
import { useState } from "react";

const ICON_MAP: Record<string, React.ElementType> = {
  ClipboardCheck,
  Search,
  CalendarCheck,
};

const TOTAL_MINUTES = OSV_MODULES.reduce((s, m) => s + m.estimatedMinutes, 0);

export default function OSVPrepCoursePage() {
  const locale = useLocale();
  const isEs = locale === "es";
  const { user } = useAuth();
  const [courseStarted, setCourseStarted] = useState(false);


  if (courseStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white dark:from-stone-950 dark:to-stone-900">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-500 mb-6">
            <Link href="/academy" className="hover:text-teal-600 transition-colors">
              {isEs ? "Academia" : "Academy"}
            </Link>
            <span>/</span>
            <span className="text-stone-700 dark:text-stone-300">
              {isEs ? "Preparación OSV" : "OSV Prep"}
            </span>
          </div>

          <CoursePlayer
            courseId="osv-prep"
            modules={OSV_MODULES}
            totalXP={OSV_TOTAL_XP}
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
            {isEs ? "Preparación OSV" : "OSV Prep"}
          </span>
        </div>

        {/* Hero */}
        <PageHero
          variant="minimal"
          title={{
            en: "HRSA Operational Site Visit Prep",
            es: "Preparaci\u00f3n para Visita Operacional HRSA",
          }}
          subtitle={{
            en: "Pass your OSV with confidence. Covers all 19 program requirements, the most common deficiencies, and a 90-day preparation playbook.",
            es: "Pasa tu OSV con confianza. Cubre los 19 requisitos del programa, las deficiencias m\u00e1s comunes y un manual de preparaci\u00f3n de 90 d\u00edas.",
          }}
          meta={isEs ? `100% Gratis \u2022 3 M\u00f3dulos \u2022 ${TOTAL_MINUTES} Min` : `100% Free \u2022 3 Modules \u2022 ${TOTAL_MINUTES} Min`}
          stats={[
            { value: `${TOTAL_MINUTES}`, label: isEs ? "minutos" : "minutes" },
            { value: "3", label: isEs ? "m\u00f3dulos" : "modules" },
            { value: `${OSV_TOTAL_XP}`, label: "XP" },
          ]}
        >
          <Button
            onClick={() => setCourseStarted(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-12 text-base"
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
                icon: ClipboardCheck,
                title: isEs ? "19 Requisitos" : "19 Requirements",
                desc: isEs
                  ? "Comprende cada uno de los 19 requisitos del programa que HRSA evaluará"
                  : "Understand each of the 19 program requirements HRSA will evaluate",
              },
              {
                icon: Search,
                title: isEs ? "Los 3 Grandes" : "The Big Three",
                desc: isEs
                  ? "Inmersión profunda en SFDP, credencialización y gobernanza — las deficiencias top"
                  : "Deep dive into SFDP, credentialing, and governance — the top deficiencies",
              },
              {
                icon: CalendarCheck,
                title: isEs ? "Manual de 90 Días" : "90-Day Playbook",
                desc: isEs
                  ? "Cronograma probado de preparación con listas de verificación y visitas simuladas"
                  : "Proven preparation timeline with checklists and mock visit strategies",
              },
            ].map((item) => (
              <Card key={item.title} className="border-stone-200 dark:border-stone-700">
                <CardContent className="p-5 text-center">
                  <item.icon className="h-8 w-8 text-blue-500 mx-auto mb-3" />
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
            {OSV_MODULES.map((mod) => {
              const Icon = ICON_MAP[mod.icon] || BookOpen;
              return (
                <Card key={mod.id} className="border-stone-200 dark:border-stone-700">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
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
                isEs ? "Directores ejecutivos y COOs de FQHC" : "FQHC Executive Directors and COOs",
                isEs ? "Oficiales de cumplimiento y coordinadores de calidad" : "Compliance officers and quality coordinators",
                isEs ? "Directores clínicos y gerentes de credencialización" : "Clinical directors and credentialing managers",
                isEs ? "Cualquiera involucrado en la preparación de OSV" : "Anyone involved in OSV preparation",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-500">
                  <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cross-link to Compliance Hub */}
        <Card className="mb-12 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20">
          <CardContent className="p-5 flex items-start gap-4">
            <ShieldCheck className="h-8 w-8 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-stone-800 dark:text-stone-200 mb-1">
                {isEs ? "Listas de verificación interactivas de cumplimiento" : "Interactive compliance checklists"}
              </h3>
              <p className="text-sm text-stone-500 dark:text-stone-500 mb-3">
                {isEs
                  ? "Usa nuestro Centro de Cumplimiento para rastrear tu progreso contra los requisitos de HRSA con listas de verificación interactivas."
                  : "Use our Compliance Hub to track your progress against HRSA requirements with interactive checklists."}
              </p>
              <Link href="/strategy/compliance">
                <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/30">
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-12 text-base"
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
