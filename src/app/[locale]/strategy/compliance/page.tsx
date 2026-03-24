// FQHC Risk & Compliance Hub — Interactive checklists, policy templates, regulatory calendar
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  FileText,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Users,
  Building,
  Heart,
  Receipt,
  HardHat,
  Zap,
  BarChart3,
} from "lucide-react";
import { ComplianceChecklist } from "@/components/compliance/ComplianceChecklist";
import { RegulatoryCalendar } from "@/components/compliance/RegulatoryCalendar";
import { PolicyGenerator } from "@/components/compliance/PolicyGenerator";
import {
  COMPLIANCE_DOMAINS,
  type ComplianceDomainId,
  type ComplianceProgress,
  loadComplianceProgress,
  calculateDomainScore,
  calculateOverallScore,
  getUpcomingDeadlines,
} from "@/lib/compliance-data";

/* ------------------------------------------------------------------ */
/*  Icon mapper                                                        */
/* ------------------------------------------------------------------ */

const ICON_MAP: Record<string, React.ReactNode> = {
  Shield: <Shield className="h-5 w-5" />,
  HardHat: <HardHat className="h-5 w-5" />,
  Building: <Building className="h-5 w-5" />,
  Receipt: <Receipt className="h-5 w-5" />,
  FileText: <FileText className="h-5 w-5" />,
  Users: <Users className="h-5 w-5" />,
  Heart: <Heart className="h-5 w-5" />,
};

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

type ViewMode = "overview" | "checklist" | "calendar" | "policies";

export default function ComplianceHubPage() {
  const locale = useLocale();
  const isEs = locale === "es";
  const t = (obj: { en: string; es: string }) => (isEs ? obj.es : obj.en);

  const [progress, setProgress] = useState<ComplianceProgress>({
    completedItems: {},
    lastUpdated: new Date().toISOString(),
  });
  const [viewMode, setViewMode] = useState<ViewMode>("overview");
  const [selectedDomainId, setSelectedDomainId] = useState<ComplianceDomainId | null>(null);

  // Load progress on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(loadComplianceProgress());
  }, []);

  const overallScore = useMemo(() => calculateOverallScore(progress), [progress]);
  const upcomingDeadlines = useMemo(() => getUpcomingDeadlines(3), []);

  const selectedDomain = useMemo(
    () => selectedDomainId ? COMPLIANCE_DOMAINS.find((d) => d.id === selectedDomainId) || null : null,
    [selectedDomainId],
  );

  const handleSelectDomain = useCallback((domainId: ComplianceDomainId, mode: ViewMode) => {
    setSelectedDomainId(domainId);
    setViewMode(mode);
  }, []);

  const handleBack = useCallback(() => {
    setViewMode("overview");
    setSelectedDomainId(null);
  }, []);

  // ---- Detail Views (checklist, policies, calendar) ----
  if (viewMode !== "overview" && selectedDomain) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white dark:from-stone-950 dark:to-stone-900">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Back nav */}
          <Button variant="ghost" size="sm" onClick={handleBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            {isEs ? "Volver al Panel" : "Back to Hub"}
          </Button>

          {/* Domain header */}
          <div className="flex items-center gap-3 mb-6">
            <div className={`rounded-xl p-2.5 ${selectedDomain.color}`}>
              <span className={selectedDomain.textColor}>
                {ICON_MAP[selectedDomain.icon] || <Shield className="h-5 w-5" />}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-stone-800 dark:text-stone-100">
                {t(selectedDomain.title)}
              </h1>
              <p className="text-sm text-stone-500 dark:text-stone-500">
                {t(selectedDomain.description)}
              </p>
            </div>
          </div>

          {/* Tab navigation */}
          <div className="flex items-center gap-1 mb-6 border-b border-stone-200 dark:border-stone-700">
            {[
              { mode: "checklist" as ViewMode, label: isEs ? "Checklist" : "Checklist", icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
              { mode: "policies" as ViewMode, label: isEs ? "Políticas" : "Policies", icon: <FileText className="h-3.5 w-3.5" /> },
              { mode: "calendar" as ViewMode, label: isEs ? "Calendario" : "Calendar", icon: <Calendar className="h-3.5 w-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.mode}
                onClick={() => setViewMode(tab.mode)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${
                  viewMode === tab.mode
                    ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                    : "border-transparent text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          {viewMode === "checklist" && (
            <ComplianceChecklist
              domain={selectedDomain}
              progress={progress}
              onProgressChange={setProgress}
            />
          )}
          {viewMode === "policies" && (
            <PolicyGenerator domain={selectedDomain} />
          )}
          {viewMode === "calendar" && (
            <RegulatoryCalendar />
          )}
        </div>
      </div>
    );
  }

  // ---- OVERVIEW ----
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white dark:from-stone-950 dark:to-stone-900">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-500 mb-8">
          <Link href="/strategy/guides" className="hover:text-teal-600 transition-colors">
            {isEs ? "Estrategia" : "Strategy"}
          </Link>
          <span>/</span>
          <span className="text-stone-700 dark:text-stone-300">
            {isEs ? "Cumplimiento" : "Compliance"}
          </span>
        </div>

        {/* Hero */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            <Shield className="h-3 w-3 mr-1" />
            {isEs ? "Riesgo y Cumplimiento" : "Risk & Compliance"}
          </Badge>

          <h1 className="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100 mb-4">
            {isEs
              ? "Centro de Cumplimiento FQHC"
              : "FQHC Compliance Hub"}
          </h1>
          <p className="text-lg text-stone-500 dark:text-stone-500 max-w-2xl mx-auto">
            {isEs
              ? "Listas de verificación interactivas, plantillas de políticas y calendario regulatorio para mantener tu centro de salud en cumplimiento."
              : "Interactive checklists, policy templates, and regulatory calendar to keep your health center compliant."}
          </p>
        </div>

        {/* Overall Score + Quick Stats */}
        <div className="grid gap-4 sm:grid-cols-3 mb-10">
          {/* Overall Score */}
          <Card className="border-stone-200 dark:border-stone-700">
            <CardContent className="p-6 text-center">
              <div className={`text-4xl font-bold mb-1 ${
                overallScore >= 80 ? "text-green-600 dark:text-green-400"
                  : overallScore >= 50 ? "text-amber-600 dark:text-amber-400"
                    : "text-red-600 dark:text-red-400"
              }`}>
                {overallScore}%
              </div>
              <p className="text-sm text-stone-500 dark:text-stone-500">
                {isEs ? "Puntuación General" : "Overall Score"}
              </p>
              <div className="h-1.5 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden mt-3">
                <div
                  className={`h-full rounded-full transition-all ${
                    overallScore >= 80 ? "bg-green-500"
                      : overallScore >= 50 ? "bg-amber-500"
                        : "bg-red-500"
                  }`}
                  style={{ width: `${overallScore}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Checklist Items */}
          <Card className="border-stone-200 dark:border-stone-700">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-stone-800 dark:text-stone-200 mb-1">
                {Object.keys(progress.completedItems).length}
              </div>
              <p className="text-sm text-stone-500 dark:text-stone-500">
                {isEs ? "Elementos Completados" : "Items Completed"}
              </p>
              <p className="text-xs text-stone-500 mt-2">
                {isEs ? "de" : "of"} {COMPLIANCE_DOMAINS.reduce((sum, d) => sum + d.checklistItems.length, 0)} {isEs ? "total" : "total"}
              </p>
            </CardContent>
          </Card>

          {/* Next Deadline */}
          <Card className="border-stone-200 dark:border-stone-700">
            <CardContent className="p-6 text-center">
              {upcomingDeadlines[0] ? (
                <>
                  <div className="text-sm font-bold text-stone-800 dark:text-stone-200 mb-1">
                    {t(upcomingDeadlines[0].title)}
                  </div>
                  <p className="text-xs text-stone-500">
                    {new Date(upcomingDeadlines[0].dueDate).toLocaleDateString(
                      isEs ? "es-US" : "en-US",
                      { month: "long", day: "numeric", year: "numeric" },
                    )}
                  </p>
                  <Badge className={`mt-2 ${
                    upcomingDeadlines[0].severity === "critical"
                      ? "bg-red-100 text-red-700"
                      : "bg-amber-100 text-amber-700"
                  }`}>
                    <AlertTriangle className="h-2.5 w-2.5 mr-1" />
                    {isEs ? "Próxima Fecha Límite" : "Next Deadline"}
                  </Badge>
                </>
              ) : (
                <p className="text-sm text-stone-500">
                  {isEs ? "Sin fechas límite próximas" : "No upcoming deadlines"}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 7 Domain Cards */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-6">
            {isEs ? "Dominios de Cumplimiento" : "Compliance Domains"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {COMPLIANCE_DOMAINS.map((domain) => {
              const score = calculateDomainScore(domain, progress);
              const completedCount = domain.checklistItems.filter(
                (i) => progress.completedItems[i.id],
              ).length;

              return (
                <Card
                  key={domain.id}
                  className={`${domain.borderColor} hover:shadow-md transition-all cursor-pointer group`}
                  onClick={() => handleSelectDomain(domain.id, "checklist")}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`rounded-lg p-2 ${domain.color}`}>
                        <span className={domain.textColor}>
                          {ICON_MAP[domain.icon] || <Shield className="h-5 w-5" />}
                        </span>
                      </div>
                      <div className={`text-xl font-bold ${
                        score >= 80 ? "text-green-600 dark:text-green-400"
                          : score >= 50 ? "text-amber-600 dark:text-amber-400"
                            : score > 0 ? "text-red-600 dark:text-red-400"
                              : "text-stone-300"
                      }`}>
                        {score}%
                      </div>
                    </div>

                    <h3 className="font-semibold text-stone-800 dark:text-stone-200 text-sm mb-1">
                      {t(domain.title)}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-500 mb-3 line-clamp-2">
                      {t(domain.description)}
                    </p>

                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span>
                        {completedCount}/{domain.checklistItems.length} {isEs ? "items" : "items"}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>

                    {/* Mini progress bar */}
                    <div className="h-1 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden mt-2">
                      <div
                        className={`h-full rounded-full transition-all ${
                          score >= 80 ? "bg-green-500"
                            : score >= 50 ? "bg-amber-500"
                              : score > 0 ? "bg-red-500"
                                : "bg-stone-200"
                        }`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Regulatory Calendar Preview */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-indigo-500" />
              {isEs ? "Próximas Fechas Límite" : "Upcoming Deadlines"}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedDomainId("hipaa"); // any domain works for calendar view
                setViewMode("calendar");
              }}
            >
              {isEs ? "Ver todo" : "View all"}
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
          <Card>
            <CardContent className="p-4">
              <RegulatoryCalendar maxItems={5} compact />
            </CardContent>
          </Card>
        </div>

        {/* Training Courses Section */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-6 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-teal-500" />
            {isEs ? "Cursos de Capacitación" : "Training Courses"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: { en: "HIPAA Essentials", es: "Fundamentos HIPAA" },
                desc: { en: "Privacy & security rules, breach response, and staff responsibilities", es: "Reglas de privacidad y seguridad, respuesta a violaciones y responsabilidades del personal" },
                duration: "30 min",
                modules: 4,
                href: "/academy/hipaa-essentials",
                color: "teal",
              },
              {
                title: { en: "HRSA OSV Prep", es: "Preparación OSV HRSA" },
                desc: { en: "Walk through 19 program requirements for Operational Site Visits", es: "Recorrido por los 19 requisitos del programa para Visitas Operativas del Sitio" },
                duration: "37 min",
                modules: 3,
                href: "/academy/osv-prep",
                color: "blue",
              },
              {
                title: { en: "Billing Compliance 101", es: "Cumplimiento de Facturación 101" },
                desc: { en: "PPS billing rules, documentation, False Claims Act", es: "Reglas de facturación PPS, documentación, Ley de Reclamos Falsos" },
                duration: "30 min",
                modules: 3,
                href: "/academy/billing-compliance",
                color: "green",
              },
            ].map((course) => (
              <Link key={course.title.en} href={course.href}>
                <Card className="border-stone-200 dark:border-stone-700 hover:border-teal-300 dark:hover:border-teal-700 transition-all h-full">
                  <CardContent className="p-5">
                    <Badge className={`mb-3 bg-${course.color}-100 text-${course.color}-700 dark:bg-${course.color}-900/30 dark:text-${course.color}-300 text-xs`}>
                      {isEs ? "Gratis" : "Free"}
                    </Badge>
                    <h3 className="font-semibold text-stone-800 dark:text-stone-200 text-sm mb-1">
                      {t(course.title)}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-500 mb-3">
                      {t(course.desc)}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-stone-500">
                      <span>{course.duration}</span>
                      <span>{course.modules} {isEs ? "módulos" : "modules"}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Cross-links */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/academy/clinic-manager">
            <Card className="border-stone-200 dark:border-stone-700 hover:border-indigo-300 transition-all">
              <CardContent className="p-4 flex items-center gap-3">
                <Zap className="h-8 w-8 text-indigo-500 shrink-0" />
                <div>
                  <p className="font-medium text-stone-800 dark:text-stone-200 text-sm">
                    {isEs ? "Clase Magistral de Gerente" : "Manager Master Class"}
                  </p>
                  <p className="text-xs text-stone-500">
                    {isEs
                      ? "8 módulos de operaciones de clínica incluyendo cumplimiento"
                      : "8-module clinic operations course including compliance"}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-stone-500 shrink-0" />
              </CardContent>
            </Card>
          </Link>
          <Link href="/strategy/clinic-simulator">
            <Card className="border-stone-200 dark:border-stone-700 hover:border-teal-300 transition-all">
              <CardContent className="p-4 flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-teal-500 shrink-0" />
                <div>
                  <p className="font-medium text-stone-800 dark:text-stone-200 text-sm">
                    {isEs ? "Simulador de Clínica" : "Clinic Simulator"}
                  </p>
                  <p className="text-xs text-stone-500">
                    {isEs
                      ? "Modela el impacto financiero de tu configuración de personal"
                      : "Model financial impact of your staffing configuration"}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-stone-500 shrink-0" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
