// Top-of-Scope Workforce Management — California scope-of-practice guide for FQHC executives
"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Breadcrumb, PageHero } from "@/components/ui/design-system";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  DollarSign,
  FileText,
  Shield,
  Stethoscope,
  Users,
  Heart,
  Brain,
  UserCheck,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DelegationMatrix } from "@/components/viz/DelegationMatrix";
import { TableOfContents } from "@/components/layout/TableOfContents";
import type { MatrixRole, MatrixTask } from "@/components/viz/DelegationMatrix";
import {
  SCOPE_OF_PRACTICE_ROLES,
  SCOPE_CATEGORIES,
  DELEGATION_TASKS,
  SCOPE_LAST_UPDATED,
  type ScopeOfPracticeRole,
  type ScopeCategory,
} from "@/lib/scope-of-practice";
import { t } from "@/lib/i18n-helpers";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const CATEGORY_ICONS: Record<ScopeCategory, typeof Stethoscope> = {
  physician: Stethoscope,
  "advanced-practice": FileText,
  nursing: Heart,
  "allied-health": UserCheck,
  "behavioral-health": Brain,
  "community-health": Users,
};

/* ------------------------------------------------------------------ */
/*  Transform data for DelegationMatrix component                      */
/* ------------------------------------------------------------------ */

function buildMatrixRoles(): MatrixRole[] {
  return SCOPE_OF_PRACTICE_ROLES.map((role) => ({
    id: role.id,
    abbreviation: role.abbreviation,
    title: role.title,
  }));
}

function buildMatrixTasks(): MatrixTask[] {
  return DELEGATION_TASKS.map((dt) => ({
    id: dt.id,
    task: dt.task,
    department: dt.department,
    authorizations: dt.roleAuthorizations.map((ra) => ({
      roleId: ra.roleId,
      level: ra.level,
      citation: ra.citation,
    })),
  }));
}

const DEPARTMENTS = [
  { id: "primary-care", label: { en: "Primary Care", es: "Atencion Primaria" } },
  { id: "behavioral-health", label: { en: "Behavioral Health", es: "Salud Conductual" } },
  { id: "dental", label: { en: "Dental", es: "Dental" } },
];

/* ------------------------------------------------------------------ */
/*  Expandable Role Card                                               */
/* ------------------------------------------------------------------ */

function RoleCard({
  role,
  locale,
  isEs,
  isExpanded,
  onToggle,
}: {
  role: ScopeOfPracticeRole;
  locale: string;
  isEs: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const catMeta = SCOPE_CATEGORIES.find((c) => c.id === role.category);
  const Icon = CATEGORY_ICONS[role.category] || Users;

  return (
    <div className="rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 transition-all hover:shadow-md overflow-hidden">
      {/* Card header — always visible */}
      <button
        onClick={onToggle}
        className="w-full text-left px-6 py-5 flex items-start gap-4"
        aria-expanded={isExpanded}
      >
        <div className={`rounded-xl p-2.5 ${catMeta?.color ?? "bg-stone-100 text-stone-600"}`}>
          <Icon className="size-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-xs font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-900 px-2 py-0.5 rounded-full">
              {role.abbreviation}
            </span>
            {catMeta && (
              <Badge variant="secondary" className={`text-xs ${catMeta.color}`}>
                {isEs ? catMeta.es : catMeta.en}
              </Badge>
            )}
          </div>
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 sm:text-lg">
            {t(role.title, locale)}
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            {role.licensingBody} &middot; {role.caRegulation}
          </p>
        </div>
        <div className="flex-shrink-0 mt-1">
          {isExpanded ? (
            <ChevronUp className="size-5 text-stone-500" />
          ) : (
            <ChevronDown className="size-5 text-stone-500" />
          )}
        </div>
      </button>

      {/* Expanded detail */}
      {isExpanded && (
        <div className="px-6 pb-6 space-y-5 border-t border-stone-100 dark:border-stone-700 pt-5">
          {/* Core Scope */}
          <div>
            <h4 className="text-sm font-bold text-stone-800 dark:text-stone-200 mb-2 flex items-center gap-1.5">
              <Shield className="size-3.5 text-green-600" />
              {isEs ? "Alcance Central" : "Core Scope"}
            </h4>
            <ul className="space-y-1.5">
              {role.coreScope.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-stone-600 dark:text-stone-400">
                  <span className="text-green-600 mt-0.5 flex-shrink-0">&#10003;</span>
                  {t(item, locale)}
                </li>
              ))}
            </ul>
          </div>

          {/* Cannot Do */}
          <div>
            <h4 className="text-sm font-bold text-stone-800 dark:text-stone-200 mb-2 flex items-center gap-1.5">
              <AlertTriangle className="size-3.5 text-red-500" />
              {isEs ? "Fuera de Alcance" : "Out of Scope"}
            </h4>
            <ul className="space-y-1.5">
              {role.cannotDo.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-stone-600 dark:text-stone-400">
                  <span className="text-red-500 mt-0.5 flex-shrink-0">&#10007;</span>
                  {t(item, locale)}
                </li>
              ))}
            </ul>
          </div>

          {/* Supervision Chain */}
          <div>
            <h4 className="text-sm font-bold text-stone-800 dark:text-stone-200 mb-2 flex items-center gap-1.5">
              <Users className="size-3.5 text-blue-600" />
              {isEs ? "Cadena de Supervision" : "Supervision Chain"}
            </h4>
            <div className="text-sm text-stone-600 dark:text-stone-400 space-y-1">
              <p>
                <span className="font-medium text-stone-700 dark:text-stone-300">
                  {isEs ? "Supervisado por:" : "Supervised by:"}
                </span>{" "}
                {role.supervisedBy
                  ? SCOPE_OF_PRACTICE_ROLES.find((r) => r.id === role.supervisedBy)?.abbreviation ?? "—"
                  : (isEs ? "Ninguno (practica independiente)" : "None (independent practice)")}
              </p>
              <p>
                <span className="font-medium text-stone-700 dark:text-stone-300">
                  {isEs ? "Puede supervisar:" : "Can supervise:"}
                </span>{" "}
                {role.canSupervise.length > 0
                  ? role.canSupervise
                      .map((id) => SCOPE_OF_PRACTICE_ROLES.find((r) => r.id === id)?.abbreviation ?? id)
                      .join(", ")
                  : (isEs ? "Ninguno" : "None")}
              </p>
            </div>
          </div>

          {/* FQHC Context */}
          <div className="rounded-xl bg-teal-50 dark:bg-teal-950 border border-teal-100 dark:border-teal-800 p-4">
            <h4 className="text-sm font-bold text-teal-800 dark:text-teal-300 mb-2">
              {isEs ? "Contexto FQHC" : "FQHC Context"}
            </h4>
            <p className="text-sm text-teal-900 dark:text-teal-200 leading-relaxed">
              {t(role.fqhcContext, locale)}
            </p>
          </div>

          {/* Top-of-License Barriers */}
          <div className="rounded-xl bg-amber-50 border border-amber-100 p-4">
            <h4 className="text-sm font-bold text-amber-800 mb-2 flex items-center gap-1.5">
              <AlertTriangle className="size-3.5" />
              {isEs ? "Barreras al Tope de Licencia" : "Top-of-License Barriers"}
            </h4>
            <ul className="space-y-1.5">
              {role.topOfLicenseBarriers.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-amber-900">
                  <span className="text-amber-600 mt-0.5 flex-shrink-0">&bull;</span>
                  {t(b, locale)}
                </li>
              ))}
            </ul>
          </div>

          {/* Change Management */}
          <div>
            <h4 className="text-sm font-bold text-stone-800 dark:text-stone-200 mb-2">
              {isEs ? "Gestion del Cambio" : "Change Management"}
            </h4>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {t(role.changeManagement, locale)}
            </p>
          </div>

          {/* Revenue Impact */}
          <div className="rounded-xl bg-green-50 dark:bg-green-950 border border-green-100 dark:border-green-800 p-4">
            <h4 className="text-sm font-bold text-green-800 dark:text-green-300 mb-2 flex items-center gap-1.5">
              <DollarSign className="size-3.5" />
              {isEs ? "Impacto en Ingresos" : "Revenue Impact"}
            </h4>
            <p className="text-sm text-green-900 dark:text-green-200 leading-relaxed">
              {t(role.revenueImpact, locale)}
            </p>
          </div>

          {/* Source link */}
          <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-700">
            <span className="text-xs text-stone-500">
              {role.caRegulation}
            </span>
            <a
              href={role.primarySourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-teal-700 hover:text-teal-900 hover:underline transition-colors"
            >
              {role.licensingBody} &rarr;
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/*  Scope of Practice Page                                              */
/* ================================================================== */

export default function ScopeOfPracticePage() {
  const locale = useLocale();
  const isEs = locale === "es";
  const [expandedRole, setExpandedRole] = useState<string | null>(null);

  // Build matrix data
  const matrixRoles = useMemo(() => buildMatrixRoles(), []);
  const matrixTasks = useMemo(() => buildMatrixTasks(), []);

  // Aggregate barriers across all roles
  const barriersByRole = useMemo(() => {
    return SCOPE_OF_PRACTICE_ROLES.map((role) => ({
      role,
      barriers: role.topOfLicenseBarriers,
    }));
  }, []);

  const totalBarriers = barriersByRole.reduce(
    (sum, r) => sum + r.barriers.length,
    0
  );

  const tocItems = [
    { id: "delegation-matrix", label: isEs ? "Matriz de Delegacion" : "Delegation Matrix" },
    { id: "role-guide", label: isEs ? "Guia por Rol" : "Role-by-Role Guide" },
    { id: "top-of-license-barriers", label: isEs ? "Barreras al Tope de Licencia" : "Top-of-License Barriers" },
    { id: "revenue-impact", label: isEs ? "Impacto en Ingresos" : "Revenue Impact" },
    { id: "strategic-plan-cta", label: isEs ? "Plan Estrategico" : "Strategic Plan" },
  ];

  return (
    <div className="bg-stone-50 dark:bg-stone-950">
      <Breadcrumb items={[
        { label: "Home", href: "/" },
        { label: "Strategy", href: "/strategy/scope-of-practice" },
        { label: "Top-of-Scope" },
      ]} />
      {/* ---- 1. Dark Hero ---- */}
      <PageHero
        variant="dark"
        title={{
          en: "Working at the Top of Scope",
          es: "Trabajando al Maximo de la Licencia",
        }}
        subtitle={{
          en: "A California-specific scope-of-practice guide for FQHC executives. Understand what each role can and cannot do under California law, the barriers keeping your team from working at the top of their license, and the revenue impact of getting delegation right.",
          es: "Guia de alcance de practica especifica de California para ejecutivos de FQHC. Conozca lo que cada rol puede y no puede hacer bajo la ley de California, las barreras que impiden a su equipo trabajar al maximo de su licencia, y el impacto en ingresos de una delegacion correcta.",
        }}
        meta={`${isEs ? "Ultima actualizacion:" : "Last updated:"} ${SCOPE_LAST_UPDATED}`}
      />

      {/* ---- Legal Disclaimer ---- */}
      <div className="bg-amber-50 dark:bg-amber-950 border-b border-amber-200 dark:border-amber-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <p className="text-xs text-amber-800 text-center leading-relaxed">
            <AlertTriangle className="inline size-3 mr-1 -mt-0.5" />
            {isEs
              ? "Solo con fines educativos. Las regulaciones, citas del Codigo de Negocios y Profesiones, y las reglas de delegacion presentadas aqui son resumenes generados por IA — no constituyen asesoramiento legal. Consulte siempre con un abogado de salud o la junta reguladora correspondiente antes de tomar decisiones de personal."
              : "For educational purposes only. The regulations, Business & Professions Code citations, and delegation rules presented here are AI-generated summaries — they do not constitute legal advice. Always consult a healthcare attorney or relevant licensing board before making staffing decisions."}
          </p>
        </div>
      </div>

      {/* ---- 2. Stats Bar ---- */}
      <section className="bg-teal-700 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-center">
            <div>
              <p className="text-2xl font-extrabold">{SCOPE_OF_PRACTICE_ROLES.length}</p>
              <p className="text-xs text-teal-200 uppercase tracking-wider mt-0.5">
                {isEs ? "Roles Mapeados" : "Roles Mapped"}
              </p>
            </div>
            <div>
              <p className="text-2xl font-extrabold">{DELEGATION_TASKS.length}</p>
              <p className="text-xs text-teal-200 uppercase tracking-wider mt-0.5">
                {isEs ? "Matriz de Delegacion" : "Delegation Matrix"}
              </p>
            </div>
            <div>
              <p className="text-2xl font-extrabold">
                {isEs ? "CA" : "CA"}
              </p>
              <p className="text-xs text-teal-200 uppercase tracking-wider mt-0.5">
                {isEs ? "Citas Regulatorias" : "Regulatory Citations"}
              </p>
            </div>
            <div>
              <p className="text-2xl font-extrabold flex items-center justify-center gap-1">
                <TrendingUp className="size-5" />
                {isEs ? "PPS" : "PPS"}
              </p>
              <p className="text-xs text-teal-200 uppercase tracking-wider mt-0.5">
                {isEs ? "Impacto en Ingresos" : "Revenue Impact"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- TOC ---- */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="absolute right-4 top-10 sm:right-6 lg:right-8">
          <TableOfContents items={tocItems} title={isEs ? "En esta pagina" : "On this page"} />
        </div>
      </div>

      {/* ---- 3. Delegation Matrix ---- */}
      <section id="delegation-matrix" className="py-10 sm:py-14 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100 sm:text-3xl">
              {isEs ? "Matriz de Delegacion Interactiva" : "Interactive Delegation Matrix"}
            </h2>
            <p className="mt-2 text-stone-600 dark:text-stone-400 max-w-2xl">
              {isEs
                ? "Haga clic en cualquier celda para ver la cita regulatoria de California. Filtre por departamento para enfocar el analisis."
                : "Click any cell to see the California regulatory citation. Filter by department to focus your analysis."}
            </p>
          </div>
          <DelegationMatrix
            roles={matrixRoles}
            tasks={matrixTasks}
            departments={DEPARTMENTS}
            title={{
              en: "FQHC Scope of Practice — Who Can Do What?",
              es: "Alcance de Practica FQHC — Quien Puede Hacer Que?",
            }}
          />
        </div>
      </section>

      {/* ---- 4. Role Cards Grid ---- */}
      <section id="role-guide" className="py-10 sm:py-14 bg-white dark:bg-stone-900 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100 sm:text-3xl mb-2">
            {isEs ? "Guia por Rol" : "Role-by-Role Guide"}
          </h2>
          <p className="text-stone-600 dark:text-stone-400 mb-8 max-w-2xl">
            {isEs
              ? "Toque cualquier rol para ver el alcance completo, barreras al tope de licencia, estrategias de cambio y el impacto en ingresos."
              : "Tap any role to see the full scope, top-of-license barriers, change management strategies, and revenue impact."}
          </p>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {SCOPE_CATEGORIES.map((cat) => (
              <Badge
                key={cat.id}
                variant="secondary"
                className={`text-xs cursor-default ${cat.color}`}
              >
                {isEs ? cat.es : cat.en}
              </Badge>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {SCOPE_OF_PRACTICE_ROLES.map((role) => (
              <RoleCard
                key={role.id}
                role={role}
                locale={locale}
                isEs={isEs}
                isExpanded={expandedRole === role.id}
                onToggle={() =>
                  setExpandedRole(expandedRole === role.id ? null : role.id)
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---- 5. Top-of-License Barriers ---- */}
      <section id="top-of-license-barriers" className="py-10 sm:py-14 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100 sm:text-3xl mb-2">
            {isEs
              ? "Barreras al Tope de Licencia en FQHCs"
              : "Top-of-License Barriers Across FQHCs"}
          </h2>
          <p className="text-stone-600 dark:text-stone-400 mb-8 max-w-2xl">
            {isEs
              ? `${totalBarriers} barreras identificadas en ${SCOPE_OF_PRACTICE_ROLES.length} roles. La mayoria se reducen a: ordenes permanentes faltantes, acuerdos de supervision desactualizados y tareas asignadas por debajo del nivel de entrenamiento.`
              : `${totalBarriers} barriers identified across ${SCOPE_OF_PRACTICE_ROLES.length} roles. Most come down to: missing standing orders, outdated supervision agreements, and tasks assigned below training level.`}
          </p>

          <div className="space-y-4">
            {barriersByRole.map(({ role, barriers }) => {
              const catMeta = SCOPE_CATEGORIES.find((c) => c.id === role.category);
              return (
                <div
                  key={role.id}
                  className="rounded-xl border border-stone-200 bg-white p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-900 px-2 py-0.5 rounded-full">
                      {role.abbreviation}
                    </span>
                    <span className="text-sm font-bold text-stone-800 dark:text-stone-200">
                      {t(role.title, locale)}
                    </span>
                    {catMeta && (
                      <Badge variant="secondary" className={`text-xs ${catMeta.color}`}>
                        {isEs ? catMeta.es : catMeta.en}
                      </Badge>
                    )}
                  </div>
                  <ul className="space-y-1.5">
                    {barriers.map((b, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-stone-600"
                      >
                        <span className="text-amber-500 mt-0.5 flex-shrink-0">
                          <AlertTriangle className="size-3.5" />
                        </span>
                        {t(b, locale)}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- 6. Revenue Impact Summary ---- */}
      <section id="revenue-impact" className="py-10 sm:py-14 bg-white dark:bg-stone-900 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100 sm:text-3xl mb-2">
            {isEs
              ? "El Caso Financiero: Ingresos por Rol"
              : "The Financial Case: Revenue Impact by Role"}
          </h2>
          <p className="text-stone-600 dark:text-stone-400 mb-8 max-w-2xl">
            {isEs
              ? "Cada rol que no trabaja al tope de su licencia es ingresos perdidos. Aqui esta el impacto financiero de una delegacion correcta."
              : "Every role not working at the top of their license is lost revenue. Here is the financial impact of getting delegation right."}
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SCOPE_OF_PRACTICE_ROLES.map((role) => {
              return (
                <div
                  key={role.id}
                  className="rounded-xl border border-stone-200 bg-stone-50 p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-900 px-2 py-0.5 rounded-full">
                      {role.abbreviation}
                    </span>
                    <span className="text-sm font-bold text-stone-800 dark:text-stone-200">
                      {t(role.title, locale)}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <DollarSign className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                      {t(role.revenueImpact, locale)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- 7. CTA ---- */}
      <section id="strategic-plan-cta" className="py-10 sm:py-14 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-teal-700 to-teal-800 p-8 text-center text-white">
            <h2 className="text-xl font-bold sm:text-2xl">
              {isEs
                ? "Convierta Esto en un Plan Estrategico"
                : "Turn This Into a Strategic Plan"}
            </h2>
            <p className="mt-2 text-teal-100 max-w-xl mx-auto">
              {isEs
                ? "Use nuestras Guias Ejecutivas para diagnosticar desafios de alcance de practica y las Plantillas OKR para establecer objetivos medibles de delegacion en toda la organizacion."
                : "Use our Executive Guides to diagnose scope-of-practice challenges and our OKR Templates to set measurable delegation objectives across the organization."}
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="bg-white text-teal-800 hover:bg-stone-100"
                asChild
              >
                <Link href="/strategy/guides">
                  {isEs ? "Guias Ejecutivas" : "Executive Guides"}{" "}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href="/strategy/okrs">
                  {isEs ? "Plantillas OKR" : "OKR Templates"}{" "}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
