// OKR Course Capstone Page
"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Capstone } from "@/components/okr-course/Capstone";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  loadProgress,
  canAccessCapstone,
  completeModule,
  saveProgress,
} from "@/lib/okr-course-progress";
import { OKR_COURSE_MODULES } from "@/lib/okr-course-modules";
import { useState, useEffect } from "react";
import type { OKRDomain } from "@/lib/fqhc-okr-templates";

export default function CapstonePage() {
  const locale = useLocale();
  const isEs = locale === "es";
  const { user } = useAuth();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  const prerequisiteIds = OKR_COURSE_MODULES.filter(
    (m) => m.id !== "capstone"
  ).map((m) => m.id);

  useEffect(() => {
    const progress = loadProgress(user?.id);
    if (progress) {
      setHasAccess(canAccessCapstone(progress, prerequisiteIds));
    } else {
      setHasAccess(false);
    }
  }, [user?.id, prerequisiteIds]);

  const handleCapstoneComplete = (
    domain: OKRDomain,
    objective: string,
    keyResults: string[]
  ) => {
    const progress = loadProgress(user?.id);
    if (progress) {
      const updated = completeModule(progress, "capstone");
      saveProgress(updated);
    }
  };

  // Loading state
  if (hasAccess === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-stone-400">
          {isEs ? "Cargando..." : "Loading..."}
        </div>
      </div>
    );
  }

  // Locked state
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white dark:from-stone-950 dark:to-stone-900">
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
          <Lock className="h-16 w-16 text-stone-300 dark:text-stone-600 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-4">
            {isEs
              ? "Completa todos los módulos primero"
              : "Complete all modules first"}
          </h1>
          <p className="text-stone-500 dark:text-stone-400 mb-6">
            {isEs
              ? "El Capstone se desbloquea después de completar los módulos 1-5. ¡Estás casi ahí!"
              : "The Capstone unlocks after completing modules 1-5. You're almost there!"}
          </p>
          <Link href="/strategy/okr-course">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {isEs ? "Volver al Curso" : "Back to Course"}
            </Button>
          </Link>
        </div>
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
            href="/strategy/okr-course"
            className="hover:text-teal-600 transition-colors"
          >
            {isEs ? "Curso OKR" : "OKR Course"}
          </Link>
          <span>/</span>
          <span className="text-stone-700 dark:text-stone-300">Capstone</span>
        </div>

        <Capstone userId={user?.id} onComplete={handleCapstoneComplete} />
      </div>
    </div>
  );
}
