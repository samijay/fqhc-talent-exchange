// Cultural Humility & Community-Centered Care — FQHC Workforce Strategy
"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "@/components/ui/design-system";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Heart,
  Languages,
  Scale,
  Sparkles,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CULTURAL_HUMILITY_LAST_UPDATED,
  CULTURAL_DOMAINS,
  CULTURAL_COMPETENCIES,
  WORKFORCE_DIVERSITY_SCENARIOS,
  getCompetenciesByDomain,
  type CulturalDomain,
  type CulturalCompetency,
  type WorkforceDiversityScenario,
} from "@/lib/cultural-humility";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

const DOMAIN_ICONS: Record<string, LucideIcon> = {
  "language-access": Languages,
  "cultural-humility": Heart,
  "community-centered": Users,
  "implicit-bias": Brain,
  "health-equity": Scale,
  "workforce-diversity": Sparkles,
};

/* ------------------------------------------------------------------ */
/*  Competency Card                                                    */
/* ------------------------------------------------------------------ */

function CompetencyCard({
  comp,
  locale,
  isExpanded,
  onToggle,
}: {
  comp: CulturalCompetency;
  locale: string;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const domainMeta = CULTURAL_DOMAINS.find((d) => d.id === comp.domain);

  return (
    <div className="rounded-2xl border border-stone-200 bg-white transition-all hover:shadow-md">
      <button
        onClick={onToggle}
        className="flex w-full items-start gap-4 p-5 text-left"
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            {domainMeta && (
              <Badge className={`text-xs ${domainMeta.color}`}>
                {locale === "es" ? domainMeta.es : domainMeta.en}
              </Badge>
            )}
          </div>
          <h3 className="text-lg font-bold text-stone-900">
            {t(comp.title, locale)}
          </h3>
          <p className="text-sm text-stone-500 mt-1 line-clamp-2">
            {t(comp.description, locale)}
          </p>
        </div>
        <ChevronDown
          className={`mt-1 size-5 shrink-0 text-stone-500 transition-transform ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>

      {isExpanded && (
        <div className="border-t border-stone-100 px-5 pb-5 pt-4 space-y-5">
          {/* Full Description */}
          <div className="rounded-xl bg-teal-50 p-4 border border-teal-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-700 mb-1">
              {locale === "es" ? "Por Qué Importa" : "Why It Matters"}
            </p>
            <p className="text-sm text-teal-900 leading-relaxed">
              {t(comp.description, locale)}
            </p>
          </div>

          {/* Practical Steps */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
              {locale === "es" ? "Pasos Prácticos" : "Practical Steps"}
            </p>
            <div className="space-y-3">
              {comp.practicalSteps.map((step, i) => (
                <div
                  key={i}
                  className="flex gap-3 rounded-lg border border-stone-100 bg-stone-50 p-3"
                >
                  <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">
                    {i + 1}
                  </div>
                  <p className="text-sm text-stone-700">
                    {t(step, locale)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FQHC Examples */}
          {comp.fqhcExamples.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                {locale === "es" ? "Ejemplos en FQHCs" : "FQHC Examples"}
              </p>
              <ul className="space-y-1.5">
                {comp.fqhcExamples.map((ex, i) => (
                  <li key={i} className="flex gap-2 text-sm text-stone-700">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-600" />
                    {t(ex, locale)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Metrics */}
          {comp.metrics.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                {locale === "es" ? "Métricas & Puntos de Referencia" : "Metrics & Benchmarks"}
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {comp.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="rounded-lg bg-stone-50 p-3 border border-stone-100"
                  >
                    <p className="text-sm font-medium text-stone-900">
                      {m.label}
                    </p>
                    <p className="text-xs text-teal-700 font-semibold mt-0.5">
                      {m.benchmark}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Regulatory Basis + Source */}
          <div className="flex items-center gap-2 text-sm text-stone-500">
            <Scale className="size-3.5" />
            <span>{comp.regulatoryBasis}</span>
            {comp.primarySourceUrl && (
              <a
                href={comp.primarySourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-900"
              >
                <ExternalLink className="size-3" />
                {comp.primarySourceOrg || (locale === "es" ? "Fuente" : "Source")}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Scenario Card                                                      */
/* ------------------------------------------------------------------ */

function ScenarioCard({
  scenario,
  locale,
  isExpanded,
  onToggle,
}: {
  scenario: WorkforceDiversityScenario;
  locale: string;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white transition-all hover:shadow-md">
      <button
        onClick={onToggle}
        className="flex w-full items-start gap-4 p-5 text-left"
      >
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-stone-900">
            {t(scenario.title, locale)}
          </h3>
          <p className="text-sm text-stone-500 mt-1 line-clamp-2">
            {t(scenario.description, locale)}
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            {scenario.applicableRoles.map((role) => (
              <Badge key={role} variant="outline" className="text-xs">
                {role}
              </Badge>
            ))}
          </div>
        </div>
        <ChevronDown
          className={`mt-1 size-5 shrink-0 text-stone-500 transition-transform ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>

      {isExpanded && (
        <div className="border-t border-stone-100 px-5 pb-5 pt-4 space-y-5">
          {/* Full Description */}
          <div className="rounded-xl bg-stone-50 p-4 border border-stone-200">
            <p className="text-sm text-stone-700 leading-relaxed">
              {t(scenario.description, locale)}
            </p>
          </div>

          {/* Challenge */}
          <div className="rounded-xl bg-amber-50 p-4 border border-amber-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
              {locale === "es" ? "Desafío" : "Challenge"}
            </p>
            <p className="text-sm text-amber-900 leading-relaxed">
              {t(scenario.challenge, locale)}
            </p>
          </div>

          {/* Strategy */}
          <div className="rounded-xl bg-teal-50 p-4 border border-teal-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-700 mb-2">
              {locale === "es" ? "Estrategia" : "Strategy"}
            </p>
            <p className="text-sm text-teal-900 leading-relaxed">
              {t(scenario.strategy, locale)}
            </p>
          </div>

          {/* Outcomes */}
          {scenario.outcomes.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-green-600 mb-2">
                {locale === "es" ? "Resultados Esperados" : "Expected Outcomes"}
              </p>
              <ul className="space-y-1.5">
                {scenario.outcomes.map((outcome, i) => (
                  <li key={i} className="flex gap-2 text-sm text-stone-700">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-600" />
                    {t(outcome, locale)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function CulturalHumilityPage() {
  const locale = useLocale();
  const isEs = locale === "es";
  const [activeDomain, setActiveDomain] = useState<CulturalDomain | "all">("all");
  const [expandedComp, setExpandedComp] = useState<string | null>(null);
  const [expandedScenario, setExpandedScenario] = useState<string | null>(null);

  const filteredCompetencies =
    activeDomain === "all"
      ? CULTURAL_COMPETENCIES
      : getCompetenciesByDomain(activeDomain);

  return (
    <main className="min-h-screen bg-stone-50">
      <Breadcrumb items={[
        { label: "Home", href: "/" },
        { label: "Strategy", href: "/strategy/cultural-humility" },
        { label: "Cultural Humility" },
      ]} />
      {/* ============================================================ */}
      {/*  Hero                                                        */}
      {/* ============================================================ */}
      <section className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 size-72 rounded-full bg-purple-500 blur-3xl" />
          <div className="absolute bottom-10 left-10 size-56 rounded-full bg-teal-500 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Badge className="bg-purple-900/50 text-purple-300 border-purple-700 mb-4">
            <Heart className="mr-1.5 size-3.5" />
            {isEs ? "Estrategia de Fuerza Laboral" : "Workforce Strategy"}
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            {isEs
              ? "Humildad Cultural y Atención Centrada en la Comunidad"
              : "Cultural Humility & Community-Centered Care"}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-300 leading-relaxed">
            {isEs
              ? "No se trata de marcar una casilla — es una forma de practicar. Marcos, métricas y escenarios del mundo real para que líderes de FQHCs aprovechen su fuerza laboral multicultural como una fortaleza."
              : "Not a box to check \u2014 a way of practicing. Frameworks, metrics, and real-world scenarios for FQHC leaders to leverage their multicultural workforce as a strength."}
          </p>
          <p className="mt-4 text-sm text-stone-500">
            {isEs ? "Datos actualizados:" : "Data updated:"}{" "}
            {CULTURAL_HUMILITY_LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Stats Bar                                                   */}
      {/* ============================================================ */}
      <section className="bg-teal-700 text-white py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-center">
            <div>
              <p className="text-2xl font-bold">{CULTURAL_DOMAINS.length}</p>
              <p className="text-sm text-teal-200">
                {isEs ? "Dominios" : "Domains"}
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold">{CULTURAL_COMPETENCIES.length}</p>
              <p className="text-sm text-teal-200">
                {isEs ? "Competencias" : "Competencies"}
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold">{WORKFORCE_DIVERSITY_SCENARIOS.length}</p>
              <p className="text-sm text-teal-200">
                {isEs ? "Escenarios" : "Scenarios"}
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold">CLAS</p>
              <p className="text-sm text-teal-200">
                {isEs ? "Base Regulatoria" : "Regulatory Basis"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Domain Overview                                             */}
      {/* ============================================================ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            {isEs ? "Seis Dominios de Competencia Cultural" : "Six Domains of Cultural Competency"}
          </h2>
          <p className="mt-2 text-stone-600 max-w-2xl mx-auto">
            {isEs
              ? "Fundamentado en los Estándares Nacionales CLAS, el marco de Tervalon & Murray-García, y requisitos HRSA."
              : "Grounded in National CLAS Standards, the Tervalon & Murray-Garc\u00eda framework, and HRSA requirements."}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CULTURAL_DOMAINS.map((domain) => {
            const Icon = DOMAIN_ICONS[domain.id] || Heart;
            const count = getCompetenciesByDomain(domain.id).length;
            return (
              <button
                key={domain.id}
                onClick={() =>
                  setActiveDomain(activeDomain === domain.id ? "all" : domain.id)
                }
                className={`rounded-2xl border p-5 text-left transition-all hover:shadow-md ${
                  activeDomain === domain.id
                    ? "border-teal-500 bg-teal-50 ring-2 ring-teal-200"
                    : "border-stone-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`rounded-lg p-2 ${domain.color}`}>
                    <Icon className="size-5" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {count} {isEs ? "competencias" : "competencies"}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold text-stone-900">
                  {locale === "es" ? domain.es : domain.en}
                </h3>
              </button>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Competency Cards                                            */}
      {/* ============================================================ */}
      <section className="bg-white border-y border-stone-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
                {isEs ? "Competencias" : "Competencies"}
              </h2>
              <p className="text-sm text-stone-500 mt-1">
                {activeDomain === "all"
                  ? isEs
                    ? `Mostrando las ${filteredCompetencies.length} competencias`
                    : `Showing all ${filteredCompetencies.length} competencies`
                  : isEs
                    ? `Filtrado por dominio \u2014 ${filteredCompetencies.length} resultados`
                    : `Filtered by domain \u2014 ${filteredCompetencies.length} results`}
              </p>
            </div>
            {activeDomain !== "all" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveDomain("all")}
              >
                {isEs ? "Mostrar todos" : "Show all"}
              </Button>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {filteredCompetencies.map((comp) => (
              <CompetencyCard
                key={comp.id}
                comp={comp}
                locale={locale}
                isExpanded={expandedComp === comp.id}
                onToggle={() =>
                  setExpandedComp(expandedComp === comp.id ? null : comp.id)
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Workforce Diversity Scenarios                               */}
      {/* ============================================================ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            {isEs
              ? "Escenarios de Diversidad del Mundo Real"
              : "Real-World Diversity Scenarios"}
          </h2>
          <p className="mt-2 text-stone-600 max-w-2xl mx-auto">
            {isEs
              ? "Situaciones que enfrentan los líderes de FQHCs todos los días \u2014 con fortalezas, desafíos y acciones concretas."
              : "Situations FQHC leaders face every day \u2014 with strengths, challenges, and concrete actions."}
          </p>
        </div>

        <div className="grid gap-4">
          {WORKFORCE_DIVERSITY_SCENARIOS.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              locale={locale}
              isExpanded={expandedScenario === scenario.id}
              onToggle={() =>
                setExpandedScenario(
                  expandedScenario === scenario.id ? null : scenario.id,
                )
              }
            />
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Key Insight                                                 */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <p className="text-2xl sm:text-3xl font-semibold leading-relaxed">
            {isEs ? (
              <>
                &ldquo;La humildad cultural no es un destino al que llegas.
                <br className="hidden sm:block" />
                Es un compromiso de por vida con la autorreflexión y el aprendizaje.&rdquo;
              </>
            ) : (
              <>
                &ldquo;Cultural humility is not a destination you arrive at.
                <br className="hidden sm:block" />
                It is a lifelong commitment to self-reflection and learning.&rdquo;
              </>
            )}
          </p>
          <p className="mt-4 text-stone-500">
            &mdash; Tervalon & Murray-Garc&iacute;a, 1998
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA                                                         */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-r from-teal-700 to-teal-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {isEs
              ? "Convierte la Conciencia Cultural en Estrategia Organizacional"
              : "Turn Cultural Awareness Into Organizational Strategy"}
          </h2>
          <p className="mt-3 text-teal-100 max-w-xl mx-auto">
            {isEs
              ? "Combine la humildad cultural con los cambios de alcance de práctica y los marcos ejecutivos para un impacto real."
              : "Combine cultural humility with scope-of-practice changes and executive frameworks for real impact."}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-white text-teal-800 hover:bg-stone-100">
              <Link href="/strategy/scope-of-practice">
                <Scale className="mr-2 size-4" />
                {isEs ? "Alcance de Práctica" : "Scope of Practice"}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-teal-400 text-white hover:bg-teal-600"
            >
              <Link href="/strategy/movement">
                <ArrowRight className="mr-2 size-4" />
                {isEs ? "El Movimiento FQHC" : "The FQHC Movement"}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
