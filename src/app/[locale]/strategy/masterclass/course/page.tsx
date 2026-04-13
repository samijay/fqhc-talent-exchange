// Masterclass Course Landing Page — Entry point for executive training
"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  BookOpen,
  Zap,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MasterclassPlayer } from "@/components/masterclass-course/MasterclassPlayer";
import { MASTERCLASS_COURSE_MODULES, MASTERCLASS_TOTAL_XP } from "@/lib/masterclass-course-modules";
import { useAuth } from "@/components/auth/AuthProvider";
import { useState } from "react";
import { tSafe as t } from "@/lib/i18n-helpers";

export default function MasterclassCoursePage() {
  const locale = useLocale();
  const isEs = locale === "es";
  const { user } = useAuth();
  const [courseStarted, setCourseStarted] = useState(false);

  const totalMinutes = MASTERCLASS_COURSE_MODULES.reduce(
    (sum, m) => sum + m.estimatedMinutes,
    0
  );

  if (courseStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white dark:from-stone-950 dark:to-stone-900">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-500 mb-6">
            <Link
              href="/strategy"
              className="hover:text-teal-600 transition-colors"
            >
              {isEs ? "Estrategia" : "Strategy"}
            </Link>
            <span>/</span>
            <span className="text-stone-700 dark:text-stone-300">
              {isEs ? "Masterclass Ejecutivo" : "Executive Masterclass"}
            </span>
          </div>

          <MasterclassPlayer
            modules={MASTERCLASS_COURSE_MODULES}
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
          <Link
            href="/strategy"
            className="hover:text-teal-600 transition-colors"
          >
            {isEs ? "Estrategia" : "Strategy"}
          </Link>
          <span>/</span>
          <span className="text-stone-700 dark:text-stone-300">
            {isEs ? "Masterclass Ejecutivo" : "Executive Masterclass"}
          </span>
        </div>

        {/* Hero */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
            <Sparkles className="h-3 w-3 mr-1" />
            {isEs ? "100% Gratis • Ejecutivo" : "100% Free • Executive"}
          </Badge>

          <h1 className="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100 mb-4">
            {isEs
              ? "Masterclass Ejecutivo FQHC"
              : "FQHC Executive Masterclass"}
          </h1>

          <p className="text-lg text-stone-500 dark:text-stone-500 max-w-2xl mx-auto mb-6">
            {isEs
              ? "Módulos de capacitación interactivos para líderes FQHC — crisis financiera, resiliencia, tendencias clínicas y cumplimiento. Completa en tu propio horario."
              : "Interactive training modules for FQHC leaders — financial crisis, resilience, clinical trends, and compliance. Complete at your own pace."}
          </p>

          <div className="flex items-center justify-center gap-4 text-sm text-stone-500 dark:text-stone-500 mb-8">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {totalMinutes} {isEs ? "minutos" : "minutes"}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {MASTERCLASS_COURSE_MODULES.length} {isEs ? "módulos" : "modules"}
            </span>
            <span className="flex items-center gap-1">
              <Zap className="h-4 w-4 text-amber-500" />
              {MASTERCLASS_TOTAL_XP} XP
            </span>
          </div>

          <Button
            onClick={() => setCourseStarted(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 h-12 text-base"
          >
            {isEs ? "Comenzar Masterclass" : "Start Masterclass"}
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>

        {/* What you'll learn */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100 text-center mb-6">
            {isEs ? "Lo que aprenderás" : "What you'll learn"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: isEs ? "Supervivencia Financiera" : "Financial Survival",
                desc: isEs
                  ? "Diversificación de ingresos, gestión de crisis y planificación de escenarios"
                  : "Revenue diversification, crisis management, and scenario planning",
              },
              {
                title: isEs ? "Liderazgo Resiliente" : "Resilient Leadership",
                desc: isEs
                  ? "Gobernanza, equipo y aliniación estratégica bajo presión"
                  : "Governance, team, and strategic alignment under pressure",
              },
              {
                title: isEs ? "Cuidado de Pacientes" : "Patient Care",
                desc: isEs
                  ? "Atención de poblaciones desatendidas, economía clínica y calidad"
                  : "Underserved populations, clinical economics, and quality",
              },
            ].map((item) => (
              <Card
                key={item.title}
                className="border-stone-200 dark:border-stone-700"
              >
                <CardContent className="p-5 text-center">
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
            {MASTERCLASS_COURSE_MODULES.map((module) => (
              <Card
                key={module.id}
                className="border-stone-200 dark:border-stone-700"
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-sm font-bold text-stone-600 dark:text-stone-500 shrink-0">
                    {module.order}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-stone-800 dark:text-stone-200 truncate">
                      {t(module.title, locale)}
                    </p>
                    <p className="text-sm text-stone-500 dark:text-stone-500 truncate">
                      {t(module.subtitle, locale)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 text-xs text-stone-500 dark:text-stone-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {module.estimatedMinutes}m
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      {module.totalXP} XP
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Info CTA */}
        <Card className="border-teal-200 dark:border-teal-800 bg-teal-50/50 dark:bg-teal-950/50">
          <CardContent className="p-6 text-center">
            <BookOpen className="h-8 w-8 text-teal-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-800 dark:text-stone-100 mb-2">
              {isEs
                ? "¿Necesitas profundidad?"
                : "Need deeper dives?"}
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-500 mb-4 max-w-md mx-auto">
              {isEs
                ? "Cada módulo enlaza a materiales de referencia, investigaciones y guías de implementación."
                : "Each module links to reference materials, research papers, and implementation guides."}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
