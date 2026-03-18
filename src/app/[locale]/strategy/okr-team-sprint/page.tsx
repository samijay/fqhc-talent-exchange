// Team OKR Sprint — Landing page and sprint directory
"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Users,
  ArrowRight,
  Target,
  Clock,
  Zap,
  Sparkles,
  BookOpen,
  Play,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SprintSetup, InviteCodeDisplay } from "@/components/okr-team-sprint/SprintSetup";

interface SavedSprint {
  id: string;
  name: string;
  description: string;
  inviteCode: string;
  status: string;
  createdAt: string;
}

export default function TeamSprintPage() {
  const locale = useLocale();
  const isEs = locale === "es";
  const [view, setView] = useState<"landing" | "create" | "created">(
    "landing"
  );
  const [mySprints, setMySprints] = useState<SavedSprint[]>([]);
  const [createdSprint, setCreatedSprint] = useState<SavedSprint | null>(
    null
  );

  // Load saved sprints
  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("okr-team-sprints") || "[]"
      );
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMySprints(saved);
    } catch {
      setMySprints([]);
    }
  }, []);

  const handleSprintCreated = useCallback(
    (sprint: {
      id: string;
      name: string;
      description: string;
      inviteCode: string;
    }) => {
      const savedSprint: SavedSprint = {
        ...sprint,
        status: "active",
        createdAt: new Date().toISOString(),
      };
      setCreatedSprint(savedSprint);
      setMySprints((prev) => [...prev, savedSprint]);
      setView("created");
    },
    []
  );

  if (view === "create") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white dark:from-stone-950 dark:to-stone-900">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400 mb-6">
            <Link
              href="/strategy/guides"
              className="hover:text-teal-600 transition-colors"
            >
              {isEs ? "Estrategia" : "Strategy"}
            </Link>
            <span>/</span>
            <button
              onClick={() => setView("landing")}
              className="hover:text-teal-600 transition-colors"
            >
              {isEs ? "Sprint de Equipo" : "Team Sprint"}
            </button>
            <span>/</span>
            <span className="text-stone-700 dark:text-stone-300">
              {isEs ? "Crear" : "Create"}
            </span>
          </div>
          <SprintSetup onSprintCreated={handleSprintCreated} />
        </div>
      </div>
    );
  }

  if (view === "created" && createdSprint) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white dark:from-stone-950 dark:to-stone-900">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col gap-6 max-w-lg mx-auto">
            <InviteCodeDisplay
              inviteCode={createdSprint.inviteCode}
              sprintName={createdSprint.name}
            />
            <Link
              href={`/strategy/okr-team-sprint/${createdSprint.id}`}
            >
              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white h-12">
                <Play className="h-4 w-4 mr-2" />
                {isEs
                  ? "Abrir Sprint de Trabajo"
                  : "Open Sprint Workspace"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Landing page
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white dark:from-stone-950 dark:to-stone-900">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400 mb-8">
          <Link
            href="/strategy/guides"
            className="hover:text-teal-600 transition-colors"
          >
            {isEs ? "Estrategia" : "Strategy"}
          </Link>
          <span>/</span>
          <span className="text-stone-700 dark:text-stone-300">
            {isEs ? "Sprint de Equipo OKR" : "Team OKR Sprint"}
          </span>
        </div>

        {/* Hero */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
            <Users className="h-3 w-3 mr-1" />
            {isEs
              ? "Para Equipos Ejecutivos • Gratis"
              : "For Executive Teams • Free"}
          </Badge>

          <h1 className="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100 mb-4">
            {isEs
              ? "Sprint de OKR en Equipo"
              : "Team OKR Sprint"}
          </h1>

          <p className="text-lg text-stone-500 dark:text-stone-400 max-w-2xl mx-auto mb-6">
            {isEs
              ? "Tu equipo ejecutivo construye sus OKRs reales juntos en 4 sesiones guiadas. Sin consultor, sin reuniones largas — solo un proceso estructurado que produce resultados."
              : "Your executive team builds their real OKRs together in 4 guided sessions. No consultant, no long meetings — just a structured process that produces results."}
          </p>

          <div className="flex items-center justify-center gap-4 text-sm text-stone-500 dark:text-stone-400 mb-8">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              ~2 {isEs ? "horas total" : "hours total"}
            </span>
            <span className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              4 {isEs ? "sesiones" : "sessions"}
            </span>
            <span className="flex items-center gap-1">
              <Sparkles className="h-4 w-4 text-teal-500" />
              {isEs ? "Evaluación de IA" : "AI Assessment"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => setView("create")}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 h-12 text-base"
            >
              <Zap className="h-5 w-5 mr-2" />
              {isEs ? "Crear Sprint" : "Create Sprint"}
            </Button>
          </div>
        </div>

        {/* How it works */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100 text-center mb-6">
            {isEs ? "Cómo funciona" : "How it works"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                num: 1,
                title: isEs ? "Alineación del Equipo" : "Team Alignment",
                desc: isEs
                  ? "Todos votan sobre las prioridades estratégicas del trimestre"
                  : "Everyone votes on the quarter's strategic priorities",
                time: "20 min",
              },
              {
                num: 2,
                title: isEs
                  ? "Redacción de Objetivos"
                  : "Objective Drafting",
                desc: isEs
                  ? "Cada líder redacta objetivos para su área con comentarios del equipo"
                  : "Each leader drafts objectives for their area with team comments",
                time: "30 min",
              },
              {
                num: 3,
                title: isEs
                  ? "Taller de Resultados Clave"
                  : "Key Results Workshop",
                desc: isEs
                  ? "Agrega métricas medibles con validación SMART incorporada"
                  : "Add measurable metrics with built-in SMART validation",
                time: "35 min",
              },
              {
                num: 4,
                title: isEs
                  ? "Revisión de Preparación"
                  : "Readiness Review",
                desc: isEs
                  ? "IA evalúa alineación, cobertura y calidad del conjunto completo de OKRs"
                  : "AI assesses alignment, coverage, and quality of the full OKR set",
                time: "25 min",
              },
            ].map((session) => (
              <Card
                key={session.num}
                className="border-stone-200 dark:border-stone-700"
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-sm font-bold text-teal-700 dark:text-teal-300 shrink-0">
                      {session.num}
                    </div>
                    <div>
                      <h3 className="font-semibold text-stone-800 dark:text-stone-200 mb-1">
                        {session.title}
                      </h3>
                      <p className="text-sm text-stone-500 dark:text-stone-400">
                        {session.desc}
                      </p>
                      <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">
                        ~{session.time}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Existing sprints */}
        {mySprints.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100 text-center mb-6">
              {isEs ? "Tus Sprints" : "Your Sprints"}
            </h2>
            <div className="space-y-3 max-w-lg mx-auto">
              {mySprints.map((sprint) => (
                <Link
                  key={sprint.id}
                  href={`/strategy/okr-team-sprint/${sprint.id}`}
                >
                  <Card className="border-stone-200 dark:border-stone-700 hover:shadow-md hover:border-teal-300 dark:hover:border-teal-700 transition-all cursor-pointer">
                    <CardContent className="p-4 flex items-center gap-3">
                      <Users className="h-5 w-5 text-teal-500 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-stone-800 dark:text-stone-200 truncate">
                          {sprint.name}
                        </p>
                        <p className="text-xs text-stone-400 dark:text-stone-500">
                          {isEs ? "Código:" : "Code:"} {sprint.inviteCode}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-stone-400 shrink-0" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Individual course CTA */}
        <Card className="border-teal-200 dark:border-teal-800 bg-teal-50/50 dark:bg-teal-950/50">
          <CardContent className="p-6 text-center">
            <BookOpen className="h-8 w-8 text-teal-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-800 dark:text-stone-100 mb-2">
              {isEs
                ? "¿Nuevo en OKRs?"
                : "New to OKRs?"}
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-4 max-w-md mx-auto">
              {isEs
                ? "Toma primero nuestro curso individual de 45 minutos para aprender la metodología antes del sprint de equipo."
                : "Take our 45-minute individual course first to learn the methodology before the team sprint."}
            </p>
            <Link href="/strategy/okr-course">
              <Button
                variant="outline"
                className="border-teal-300 text-teal-700 dark:border-teal-700 dark:text-teal-300"
              >
                {isEs ? "Ver Curso Individual" : "View Individual Course"}
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
