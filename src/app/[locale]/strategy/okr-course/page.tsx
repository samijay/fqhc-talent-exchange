// OKR Course Landing Page — Entry point for the individual learning course
"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Target,
  BookOpen,
  Zap,
  Clock,
  ArrowRight,
  Users,
  Sparkles,
  Award,
  BarChart3,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { OkrCoursePlayer } from "@/components/okr-course/OkrCoursePlayer";
import { OKR_COURSE_MODULES, COURSE_TOTAL_XP } from "@/lib/okr-course-modules";
import { useAuth } from "@/components/auth/AuthProvider";
import { useState } from "react";

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

export default function OkrCoursePage() {
  const locale = useLocale();
  const isEs = locale === "es";
  const { user } = useAuth();
  const [courseStarted, setCourseStarted] = useState(false);

  const totalMinutes = OKR_COURSE_MODULES.reduce(
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
              href="/strategy/guides"
              className="hover:text-teal-600 transition-colors"
            >
              {isEs ? "Estrategia" : "Strategy"}
            </Link>
            <span>/</span>
            <span className="text-stone-700 dark:text-stone-300">
              {isEs ? "Curso OKR" : "OKR Course"}
            </span>
          </div>

          <OkrCoursePlayer
            modules={OKR_COURSE_MODULES.filter((m) => m.id !== "capstone")}
            userId={user?.id}
            onNavigateToCapstone={() => {
              // Navigate to capstone page
              window.location.href = `/${locale}/strategy/okr-course/capstone`;
            }}
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
            href="/strategy/guides"
            className="hover:text-teal-600 transition-colors"
          >
            {isEs ? "Estrategia" : "Strategy"}
          </Link>
          <span>/</span>
          <span className="text-stone-700 dark:text-stone-300">
            {isEs ? "Curso OKR" : "OKR Course"}
          </span>
        </div>

        {/* Hero */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
            <Sparkles className="h-3 w-3 mr-1" />
            {isEs ? "100% Gratis • Interactivo" : "100% Free • Interactive"}
          </Badge>

          <h1 className="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100 mb-4">
            {isEs
              ? "Domina los OKRs para Tu FQHC"
              : "Master OKRs for Your FQHC"}
          </h1>

          <p className="text-lg text-stone-500 dark:text-stone-500 max-w-2xl mx-auto mb-6">
            {isEs
              ? "Curso interactivo de 45 minutos con ejercicios prácticos, ejemplos de salud comunitaria y retroalimentación de IA. Sin personas, sin costo — solo aprendizaje que funciona."
              : "45-minute interactive course with hands-on exercises, community health examples, and AI feedback. No humans, no cost — just learning that works."}
          </p>

          <div className="flex items-center justify-center gap-4 text-sm text-stone-500 dark:text-stone-500 mb-8">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {totalMinutes} {isEs ? "minutos" : "minutes"}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {OKR_COURSE_MODULES.length} {isEs ? "módulos" : "modules"}
            </span>
            <span className="flex items-center gap-1">
              <Zap className="h-4 w-4 text-amber-500" />
              {COURSE_TOTAL_XP} XP
            </span>
          </div>

          <Button
            onClick={() => setCourseStarted(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 h-12 text-base"
          >
            {isEs ? "Comenzar Curso Gratis" : "Start Free Course"}
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
                icon: Target,
                title: isEs ? "Metodología OKR" : "OKR Methodology",
                desc: isEs
                  ? "El marco de Doerr adaptado para centros de salud comunitarios"
                  : "Doerr's framework adapted for community health centers",
              },
              {
                icon: BarChart3,
                title: isEs
                  ? "Puntuación y Seguimiento"
                  : "Scoring & Tracking",
                desc: isEs
                  ? "Escala 0.0-1.0, codificación por colores y retrospectivas trimestrales"
                  : "0.0-1.0 scale, color-coded grading, and quarterly retrospectives",
              },
              {
                icon: Award,
                title: isEs
                  ? "Capstone con IA"
                  : "AI-Powered Capstone",
                desc: isEs
                  ? "Escribe tu primer OKR real y recibe retroalimentación personalizada de IA"
                  : "Write your first real OKR and get personalized AI feedback",
              },
            ].map((item) => (
              <Card
                key={item.title}
                className="border-stone-200 dark:border-stone-700"
              >
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
            {OKR_COURSE_MODULES.map((module) => (
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
                  <div className="flex items-center gap-2 shrink-0 text-xs text-stone-500 dark:text-stone-500">
                    <Clock className="h-3 w-3" />
                    {module.estimatedMinutes}m
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team course CTA */}
        <Card className="border-teal-200 dark:border-teal-800 bg-teal-50/50 dark:bg-teal-950/50">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-teal-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-800 dark:text-stone-100 mb-2">
              {isEs
                ? "¿Tienes un equipo ejecutivo?"
                : "Have an executive team?"}
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-500 mb-4 max-w-md mx-auto">
              {isEs
                ? "Nuestro Sprint de OKR en Equipo guía a tu equipo a construir sus OKRs reales juntos — asincrónicamente, sin consultor."
                : "Our Team OKR Sprint guides your team to build their real OKRs together — asynchronously, no consultant needed."}
            </p>
            <Link href="/strategy/okr-team-sprint">
              <Button variant="outline" className="border-teal-300 text-teal-700 dark:border-teal-700 dark:text-teal-300">
                {isEs ? "Ver Sprint de Equipo" : "View Team Sprint"}
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
