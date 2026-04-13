// Billing Compliance 101 — Course landing page + player
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
  FileCheck,
  Scale,
  ShieldCheck,
  Receipt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/ui/design-system";
import { CoursePlayer } from "@/components/academy/CoursePlayer";
import {
  BILLING_MODULES,
  BILLING_TOTAL_XP,
} from "@/lib/billing-compliance-course-modules";
import { useAuth } from "@/components/auth/AuthProvider";
import { useState } from "react";

const ICON_MAP: Record<string, React.ElementType> = {
  DollarSign,
  FileCheck,
  Scale,
  Receipt,
};

const TOTAL_MINUTES = BILLING_MODULES.reduce((s, m) => s + m.estimatedMinutes, 0);

export default function BillingComplianceCoursePage() {
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
              {isEs ? "Cumplimiento de Facturación" : "Billing Compliance"}
            </span>
          </div>

          <CoursePlayer
            courseId="billing-compliance"
            modules={BILLING_MODULES}
            totalXP={BILLING_TOTAL_XP}
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
            {isEs ? "Cumplimiento de Facturación" : "Billing Compliance"}
          </span>
        </div>

        {/* Hero */}
        <PageHero
          variant="minimal"
          title={{
            en: "Billing Compliance 101",
            es: "Cumplimiento de Facturaci\u00f3n 101",
          }}
          subtitle={{
            en: "Master FQHC PPS billing rules, documentation requirements, and the False Claims Act. Prevent revenue leaks and protect your organization.",
            es: "Domina las reglas de facturaci\u00f3n PPS para FQHCs, requisitos de documentaci\u00f3n y la Ley de Reclamaciones Falsas. Prev\u00e9n fugas de ingresos y protege tu organizaci\u00f3n.",
          }}
          meta={isEs ? `100% Gratis \u2022 3 M\u00f3dulos \u2022 ${TOTAL_MINUTES} Min` : `100% Free \u2022 3 Modules \u2022 ${TOTAL_MINUTES} Min`}
          stats={[
            { value: `${TOTAL_MINUTES}`, label: isEs ? "minutos" : "minutes" },
            { value: "3", label: isEs ? "m\u00f3dulos" : "modules" },
            { value: `${BILLING_TOTAL_XP}`, label: "XP" },
          ]}
        >
          <Button
            onClick={() => setCourseStarted(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-8 h-12 text-base"
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
                title: isEs ? "Facturación PPS" : "PPS Billing",
                desc: isEs
                  ? "Cómo funcionan las tarifas planas PPS, reglas del mismo día y maximización de ingresos"
                  : "How flat PPS rates work, same-day rules, and revenue maximization",
              },
              {
                icon: FileCheck,
                title: isEs ? "Documentación" : "Documentation",
                desc: isEs
                  ? "Requisitos mínimos para cada encuentro facturable y errores comunes a evitar"
                  : "Minimum requirements for every billable encounter and common mistakes to avoid",
              },
              {
                icon: Scale,
                title: isEs ? "Ley de Reclamaciones Falsas" : "False Claims Act",
                desc: isEs
                  ? "Escenarios de fraude, protecciones de denunciantes y preparación para auditorías"
                  : "Fraud scenarios, whistleblower protections, and audit readiness",
              },
            ].map((item) => (
              <Card key={item.title} className="border-stone-200 dark:border-stone-700">
                <CardContent className="p-5 text-center">
                  <item.icon className="h-8 w-8 text-green-500 mx-auto mb-3" />
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
            {BILLING_MODULES.map((mod) => {
              const Icon = ICON_MAP[mod.icon] || BookOpen;
              return (
                <Card key={mod.id} className="border-stone-200 dark:border-stone-700">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-green-600 dark:text-green-400" />
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
                isEs ? "Personal de facturación y codificación" : "Billing and coding staff",
                isEs ? "Gerentes de clínica y COOs" : "Clinic managers and COOs",
                isEs ? "Directores financieros (CFO)" : "Chief Financial Officers (CFO)",
                isEs ? "Oficiales de cumplimiento y auditores internos" : "Compliance officers and internal auditors",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-500">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cross-links */}
        <div className="grid gap-4 sm:grid-cols-2 mb-12">
          <Card className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20">
            <CardContent className="p-5">
              <ShieldCheck className="h-6 w-6 text-green-500 mb-2" />
              <h3 className="font-semibold text-stone-800 dark:text-stone-200 mb-1 text-sm">
                {isEs ? "Centro de Cumplimiento" : "Compliance Hub"}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-500 mb-3">
                {isEs
                  ? "Listas de verificación, plantillas de políticas y calendario regulatorio"
                  : "Checklists, policy templates, and regulatory calendar"}
              </p>
              <Link href="/strategy/compliance">
                <Button variant="outline" size="sm" className="text-xs border-green-300 text-green-700 hover:bg-green-100 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/30">
                  {isEs ? "Explorar" : "Explore"}
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20">
            <CardContent className="p-5">
              <Receipt className="h-6 w-6 text-blue-500 mb-2" />
              <h3 className="font-semibold text-stone-800 dark:text-stone-200 mb-1 text-sm">
                {isEs ? "Simulador de Clínica" : "Clinic Simulator"}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-500 mb-3">
                {isEs
                  ? "Modela ingresos PPS con escenarios reales de facturación"
                  : "Model PPS revenue with real billing scenarios"}
              </p>
              <Link href="/strategy/clinic-simulator">
                <Button variant="outline" size="sm" className="text-xs border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/30">
                  {isEs ? "Explorar" : "Explore"}
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* CTA bottom */}
        <div className="text-center">
          <Button
            onClick={() => setCourseStarted(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-8 h-12 text-base"
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
