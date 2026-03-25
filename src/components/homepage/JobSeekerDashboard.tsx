"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import {
  Briefcase,
  GraduationCap,
  FileEdit,
  Target,
  Award,
  BookOpen,
  Clock,
  ArrowRight,
  MapPin,
  Clipboard,
  Mic,
  GitCompare,
} from "lucide-react";
import { createAuthClient } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";
import { getContentById } from "@/lib/user-preferences";
import { getLearningProgressSummary } from "@/lib/learning-progress";
import { fqhcJobListings } from "@/lib/fqhc-job-listings";
import { getRegionalSnapshots } from "@/lib/market-intelligence";

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

export function JobSeekerDashboard() {
  const { user, profile } = useAuth();
  const locale = "en";

  // Compute data locally (auth users only)
  const jobStats = {
    total: fqhcJobListings.length,
    orgs: new Set(fqhcJobListings.map((j) => j.fqhcSlug)).size,
  };
  const regionalSnapshots = getRegionalSnapshots();

  const [recentReads, setRecentReads] = useState<
    { content_type: string; content_id: string; status: string; last_read_at: string }[]
  >([]);
  const [wantToRead, setWantToRead] = useState<
    { content_type: string; content_id: string }[]
  >([]);

  useEffect(() => {
    if (!user) return;
    const supabase = createAuthClient();

    // Recent reads
    void supabase
      .from("content_reads")
      .select("content_type, content_id, status, last_read_at")
      .eq("user_id", user.id)
      .neq("status", "want_to_read")
      .order("last_read_at", { ascending: false })
      .limit(5)
      .then(({ data: reads, error }) => {
        if (!error && reads) setRecentReads(reads);
      });

    // Want to read
    void supabase
      .from("content_reads")
      .select("content_type, content_id")
      .eq("user_id", user.id)
      .eq("status", "want_to_read")
      .limit(3)
      .then(({ data: reads, error }) => {
        if (!error && reads) setWantToRead(reads);
      });
  }, [user]);

  // Learning progress
  const progress = typeof window !== "undefined" ? getLearningProgressSummary() : null;

  // Filter jobs by region
  const userRegion = profile?.region;
  const regionJobs = userRegion
    ? regionalSnapshots?.find((r) => r.region === userRegion)
    : null;

  const name = profile?.display_name || user?.email?.split("@")[0] || "";

  return (
    <section className="border-b border-stone-200 bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Welcome */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-stone-900">
            {t({ en: "Welcome back", es: "Bienvenido/a" }, locale)}, {name}
          </h2>
          {userRegion && (
            <p className="mt-0.5 flex items-center gap-1 text-sm text-stone-500">
              <MapPin className="size-3.5" />
              {userRegion}
            </p>
          )}
        </div>

        {/* 3-column grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Column 1: Jobs in Your Region */}
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-stone-500">
              <Briefcase className="size-4 text-teal-600" />
              {userRegion
                ? t({ en: `Jobs in ${userRegion}`, es: `Empleos en ${userRegion}` }, locale)
                : t({ en: "Jobs", es: "Empleos" }, locale)}
            </h3>

            {regionJobs ? (
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-teal-700">{regionJobs.totalJobs}</span>
                  <span className="text-sm text-stone-500">
                    {t({ en: "open positions", es: "posiciones abiertas" }, locale)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-stone-500">
                  {regionJobs.fqhcCount} FQHCs · ${Math.round(regionJobs.avgSalaryMin / 1000)}K-${Math.round(regionJobs.avgSalaryMax / 1000)}K {t({ en: "avg", es: "prom" }, locale)}
                </p>
                {regionJobs.topRoles.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {regionJobs.topRoles.slice(0, 4).map((r) => (
                      <span
                        key={r.role}
                        className="rounded-full bg-teal-100 px-2 py-0.5 text-xs text-teal-700"
                      >
                        {r.role} ({r.count})
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-teal-700">{jobStats.total}</span>
                  <span className="text-sm text-stone-500">
                    {t({ en: "total jobs statewide", es: "empleos en todo el estado" }, locale)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-stone-500">
                  {jobStats.orgs} {t({ en: "organizations", es: "organizaciones" }, locale)}
                </p>
              </div>
            )}

            <Link
              href="/jobs"
              className="flex items-center justify-center gap-2 rounded-lg border border-teal-200 bg-teal-50 py-2.5 text-sm font-medium text-teal-700 transition-colors hover:bg-teal-100"
            >
              {t({ en: "Browse All Jobs", es: "Ver Todos los Empleos" }, locale)}
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Column 2: Learning Progress */}
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-stone-500">
              <GraduationCap className="size-4 text-amber-500" />
              {t({ en: "Your Learning", es: "Tu Aprendizaje" }, locale)}
            </h3>

            {progress?.mostRecent ? (
              <Link
                href={progress.mostRecent.href as "/jobs"}
                className="block rounded-lg border border-teal-200 bg-teal-50 p-4 transition-colors hover:bg-teal-100"
              >
                <p className="text-xs font-medium uppercase text-teal-600">
                  {t({ en: "Continue", es: "Continuar" }, locale)}
                </p>
                <p className="mt-1 text-sm font-medium text-stone-800">
                  {t(progress.mostRecent.title, locale)}
                </p>
                <div className="mt-2 h-1.5 w-full rounded-full bg-teal-200">
                  <div
                    className="h-1.5 rounded-full bg-teal-600 transition-all"
                    style={{ width: `${progress.mostRecent.progress}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-teal-600">
                  {t(progress.mostRecent.detail, locale)}
                </p>
              </Link>
            ) : (
              <Link
                href="/pathway"
                className="block rounded-lg border border-stone-200 bg-stone-50 p-4 text-center text-sm text-stone-500 transition-colors hover:bg-stone-100"
              >
                {t({ en: "Start a learning pathway →", es: "Iniciar una ruta de aprendizaje →" }, locale)}
              </Link>
            )}

            {progress && progress.totalCoursesStarted > 0 && (
              <div className="flex items-center gap-4 rounded-lg border border-stone-200 bg-stone-50 px-4 py-2">
                <div className="text-center">
                  <span className="text-lg font-bold text-teal-700">{progress.totalCoursesStarted}</span>
                  <p className="text-xs text-stone-500">{t({ en: "Courses", es: "Cursos" }, locale)}</p>
                </div>
                <div className="text-center">
                  <span className="text-lg font-bold text-amber-600">{progress.totalModulesCompleted}</span>
                  <p className="text-xs text-stone-500">{t({ en: "Modules", es: "Modulos" }, locale)}</p>
                </div>
                <div className="text-center">
                  <span className="text-lg font-bold text-purple-600">{progress.totalXP}</span>
                  <p className="text-xs text-stone-500">XP</p>
                </div>
              </div>
            )}
          </div>

          {/* Column 3: Your Library */}
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-stone-500">
              <BookOpen className="size-4 text-purple-500" />
              {t({ en: "Your Library", es: "Tu Biblioteca" }, locale)}
            </h3>

            {recentReads.length > 0 ? (
              <div className="space-y-1">
                <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
                  {t({ en: "Recently Viewed", es: "Visto Recientemente" }, locale)}
                </p>
                {recentReads.slice(0, 4).map((read) => {
                  const content = getContentById(read.content_type, read.content_id);
                  if (!content) return null;
                  return (
                    <Link
                      key={`${read.content_type}-${read.content_id}`}
                      href={content.href as "/jobs"}
                      className="flex items-center gap-2 rounded px-2 py-1.5 text-sm text-stone-700 transition-colors hover:bg-stone-50"
                    >
                      <Clock className="size-3 shrink-0 text-stone-500" />
                      <span className="truncate">{t(content.title, locale)}</span>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <p className="rounded-lg border border-stone-200 bg-stone-50 p-4 text-center text-sm text-stone-500">
                {t({
                  en: "Content you view will appear here",
                  es: "El contenido que veas aparecera aqui",
                }, locale)}
              </p>
            )}

            {wantToRead.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
                  {t({ en: "Saved for Later", es: "Guardado para Despues" }, locale)}
                </p>
                {wantToRead.map((item) => {
                  const content = getContentById(item.content_type, item.content_id);
                  if (!content) return null;
                  return (
                    <Link
                      key={`${item.content_type}-${item.content_id}`}
                      href={content.href as "/jobs"}
                      className="flex items-center gap-2 rounded px-2 py-1.5 text-sm text-stone-700 transition-colors hover:bg-stone-50"
                    >
                      <BookOpen className="size-3 shrink-0 text-amber-500" />
                      <span className="truncate">{t(content.title, locale)}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Quick links row */}
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            { href: "/resume-builder", icon: FileEdit, label: { en: "Resume Builder", es: "Constructor de CV" } },
            { href: "/career-insights", icon: Target, label: { en: "Career Assessment", es: "Evaluacion de Carrera" } },
            { href: "/certifications", icon: Award, label: { en: "Certifications", es: "Certificaciones" } },
            { href: "/interview-prep", icon: Mic, label: { en: "Interview Prep", es: "Prep para Entrevista" } },
            { href: "/career-roadmap", icon: Clipboard, label: { en: "Career Roadmap", es: "Ruta de Carrera" } },
            { href: "/compare", icon: GitCompare, label: { en: "Compare FQHCs", es: "Comparar FQHCs" } },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href as "/jobs"}
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-600 transition-colors hover:border-teal-300 hover:text-teal-700"
            >
              <link.icon className="size-3.5" />
              {t(link.label, locale)}
            </Link>
          ))}
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-medium text-teal-700 transition-colors hover:bg-teal-100"
          >
            {t({ en: "Full Dashboard", es: "Panel Completo" }, locale)}
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
