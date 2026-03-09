// Active Sprint Workspace Page
"use client";

import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { SprintProvider } from "@/components/okr-team-sprint/SprintProvider";
import { TeamWorkspace } from "@/components/okr-team-sprint/TeamWorkspace";
import { ArrowLeft, Users, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SprintWorkspacePage() {
  const params = useParams();
  const locale = useLocale();
  const isEs = locale === "es";
  const { user, profile } = useAuth();
  const sprintId = params.sprintId as string;

  // For now, use a simple auth check — users need to be logged in for team sprint
  // In a production version, this would check sprint membership via Supabase
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white dark:from-stone-950 dark:to-stone-900 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <LogIn className="h-12 w-12 text-stone-300 dark:text-stone-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-2">
              {isEs
                ? "Inicia sesión para acceder al sprint"
                : "Sign in to access the sprint"}
            </h2>
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
              {isEs
                ? "Los sprints de equipo requieren una cuenta para rastrear la participación."
                : "Team sprints require an account to track participation."}
            </p>
            <Link href="/join">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                <LogIn className="h-4 w-4 mr-2" />
                {isEs ? "Iniciar Sesión / Registrarse" : "Sign In / Register"}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white dark:from-stone-950 dark:to-stone-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400 mb-6">
          <Link
            href="/strategy"
            className="hover:text-teal-600 transition-colors"
          >
            {isEs ? "Estrategia" : "Strategy"}
          </Link>
          <span>/</span>
          <Link
            href="/strategy/okr-team-sprint"
            className="hover:text-teal-600 transition-colors"
          >
            {isEs ? "Sprint de Equipo" : "Team Sprint"}
          </Link>
          <span>/</span>
          <span className="text-stone-700 dark:text-stone-300 flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {isEs ? "Espacio de Trabajo" : "Workspace"}
          </span>
        </div>

        <SprintProvider
          sprintId={sprintId}
          userId={user.id}
          userName={profile?.display_name || user.email || "Team Member"}
          userRole="admin"
        >
          <TeamWorkspace />
        </SprintProvider>
      </div>
    </div>
  );
}
