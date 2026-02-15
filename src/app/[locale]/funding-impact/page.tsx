"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import {
  AlertTriangle,
  ArrowRight,
  Ban,
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronUp,
  DollarSign,
  ExternalLink,
  Heart,
  Hospital,
  Scale,
  Shield,
  Snowflake,
  TrendingDown,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  policyTimeline,
  impactStats,
  programImpacts,
  fqhcRevenueModel,
  keySources,
  programStatusLabels,
  type PolicyChange,
  type ProgramImpact,
} from "@/lib/funding-impact-data";

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function formatDate(iso: string, locale: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(locale === "es" ? "es-US" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function statusBadge(status: string, locale: string) {
  const label = programStatusLabels[status]?.[locale as "en" | "es"] || status;
  const colors: Record<string, string> = {
    eliminated: "bg-red-100 text-red-800 border-red-200",
    reduced: "bg-orange-100 text-orange-800 border-orange-200",
    "at-risk": "bg-amber-100 text-amber-800 border-amber-200",
    frozen: "bg-blue-100 text-blue-800 border-blue-200",
    protected: "bg-green-100 text-green-800 border-green-200",
  };
  return (
    <Badge className={`${colors[status] || "bg-stone-100 text-stone-600"} border text-xs font-semibold`}>
      {label}
    </Badge>
  );
}

function categoryBadge(category: string, isEs: boolean) {
  const labels: Record<string, { en: string; es: string; color: string }> = {
    federal: { en: "Federal", es: "Federal", color: "bg-red-50 text-red-700" },
    state: { en: "State", es: "Estatal", color: "bg-blue-50 text-blue-700" },
    local: { en: "Local", es: "Local", color: "bg-green-50 text-green-700" },
  };
  const l = labels[category];
  return (
    <Badge className={`${l?.color || "bg-stone-100"} text-xs`}>
      {l ? l[isEs ? "es" : "en"] : category}
    </Badge>
  );
}

const statIcons: Record<string, React.ReactNode> = {
  dollar: <DollarSign className="size-6 text-red-600" />,
  people: <Users className="size-6 text-amber-600" />,
  hospital: <Hospital className="size-6 text-blue-600" />,
  dental: <Heart className="size-6 text-amber-600" />,
  chart: <TrendingDown className="size-6 text-teal-600" />,
  warning: <AlertTriangle className="size-6 text-red-600" />,
};

/* ------------------------------------------------------------------ */
/*  Text content (bilingual)                                            */
/* ------------------------------------------------------------------ */

function useText() {
  const locale = useLocale();
  const isEs = locale === "es";

  return {
    isEs,
    locale,

    // Hero
    title: isEs
      ? "Impacto del Financiamiento en la Salud Comunitaria de California"
      : "California Community Health Funding Impact",
    subtitle: isEs
      ? "Seguimiento interactivo de cómo H.R. 1, los recortes presupuestarios estatales y los cambios de política están afectando a los FQHCs, a las poblaciones indocumentadas y a los programas de salud comunitaria en California."
      : "Interactive tracker of how H.R. 1, state budget cuts, and policy changes are impacting FQHCs, undocumented populations, and community health programs across California.",
    lastUpdated: isEs ? "Última actualización: 15 de febrero de 2026" : "Last updated: February 15, 2026",

    // Section headers
    keyNumbers: isEs ? "Cifras Clave" : "Key Numbers",
    timelineTitle: isEs
      ? "Cronología de Cambios de Política"
      : "Policy Change Timeline",
    timelineSubtitle: isEs
      ? "Cada punto marca un cambio de política que afecta a los centros de salud comunitarios y sus pacientes."
      : "Each point marks a policy change affecting community health centers and their patients.",
    programsTitle: isEs
      ? "Programas Afectados"
      : "Programs Affected",
    programsSubtitle: isEs
      ? "Programas de salud que están siendo eliminados, reducidos, congelados o puestos en riesgo."
      : "Health programs being eliminated, reduced, frozen, or put at risk.",
    revenueTitle: isEs
      ? "Modelo de Impacto de Ingresos para FQHCs"
      : "FQHC Revenue Impact Model",
    revenueSubtitle: isEs
      ? "Cómo estos cambios afectan el resultado final de los centros de salud comunitarios."
      : "How these changes affect the bottom line for community health centers.",

    // Why section
    whyTitle: isEs
      ? "¿Por Qué Está Pasando Esto?"
      : "Why Is This Happening?",
    whyFederalTitle: isEs ? "Presión Federal" : "Federal Pressure",
    whyFederal: isEs
      ? "H.R. 1 (\"One Big Beautiful Bill\") recorta casi $1 billón de Medicaid a nivel nacional — el mayor recorte en los 60 años del programa. Reestructura la elegibilidad, agrega requisitos de trabajo e impone copagos que empujarán a millones fuera de la cobertura."
      : "H.R. 1 (\"One Big Beautiful Bill\") cuts nearly $1 trillion from Medicaid nationally — the largest cut in the program's 60-year history. It restructures eligibility, adds work requirements, and imposes copays that will push millions off coverage.",
    whyStateTitle: isEs ? "Déficit Presupuestario de California" : "California's Budget Deficit",
    whyState: isEs
      ? "California enfrenta un déficit presupuestario de $12 mil millones. La expansión de Medi-Cal para adultos indocumentados (que cuesta ~$5 mil millones/año totalmente con fondos estatales) se convirtió en un objetivo principal para recortes. El gobernador Newsom priorizó preservar la cobertura existente sobre la nueva inscripción."
      : "California faces a $12 billion budget deficit. The Medi-Cal expansion for undocumented adults (costing ~$5 billion/year fully state-funded) became a primary target for cuts. Governor Newsom prioritized preserving existing coverage over new enrollment.",
    whyWaiverTitle: isEs ? "Incertidumbre del Waiver" : "Waiver Uncertainty",
    whyWaiver: isEs
      ? "La administración federal ha señalado oposición al gasto de Medicaid en servicios sociales como navegación de vivienda y comidas adaptadas médicamente. Las directrices federales que apoyaban estos usos fueron rescindidas en marzo 2025. El waiver CalAIM que financia ECM y Apoyos Comunitarios expira en diciembre 2026."
      : "The federal administration has signaled opposition to Medicaid spending on social services like housing navigation and medically tailored meals. Federal guidelines supporting these uses were rescinded in March 2025. The CalAIM waiver funding ECM and Community Supports expires December 2026.",

    // City safety net section
    cityTitle: isEs
      ? "Expandiendo la Red de Seguridad a Nivel Local"
      : "Expanding the Safety Net at the City Level",
    citySubtitle: isEs
      ? "Palancas que las ciudades y condados pueden usar para proteger el acceso a la atención médica."
      : "Levers that cities and counties can use to protect healthcare access.",

    // Revenue model labels
    currentRevenue: isEs ? "Ingresos Actuales" : "Current Revenue",
    projectedLoss: isEs ? "Pérdida Proyectada" : "Projected Loss",

    // Sources
    sourcesTitle: isEs ? "Fuentes e Investigación" : "Sources & Research",
    sourcesSubtitle: isEs
      ? "Fuentes primarias y reportes utilizados en este seguimiento."
      : "Primary sources and reports used in this tracker.",
    primarySources: isEs ? "Fuentes Primarias" : "Primary Sources",
    supportingSources: isEs ? "Fuentes de Apoyo" : "Supporting Sources",

    // CTA
    ctaTitle: isEs
      ? "¿Cómo Puedes Ayudar?"
      : "How Can You Help?",
    ctaWorker: isEs
      ? "Si eres un trabajador de salud comunitaria afectado por estos recortes:"
      : "If you're a community health worker affected by these cuts:",
    ctaEmployer: isEs
      ? "Si eres un FQHC buscando talento:"
      : "If you're an FQHC looking for talent:",
    ctaAdvocate: isEs
      ? "Si quieres abogar por la salud comunitaria:"
      : "If you want to advocate for community health:",

    // Filters
    showFederal: isEs ? "Federal" : "Federal",
    showState: isEs ? "Estatal" : "State",
    showAll: isEs ? "Todo" : "All",
    undocumentedOnly: isEs ? "Solo Indocumentados" : "Undocumented Only",
    viewDetails: isEs ? "Ver Detalles" : "View Details",
    hideDetails: isEs ? "Ocultar" : "Hide",
  };
}

/* ------------------------------------------------------------------ */
/*  City-level safety net levers                                        */
/* ------------------------------------------------------------------ */

interface CityLever {
  title: { en: string; es: string };
  description: { en: string; es: string };
  dollarRange: string;
  examples: { en: string; es: string };
  icon: React.ReactNode;
}

const cityLevers: CityLever[] = [
  {
    title: {
      en: "County Health Programs (My Health LA model)",
      es: "Programas de Salud del Condado (modelo My Health LA)",
    },
    description: {
      en: "Counties can create locally-funded health coverage programs for residents excluded from Medi-Cal. LA County's My Health LA program serves 200,000+ uninsured residents through FQHCs.",
      es: "Los condados pueden crear programas de cobertura de salud financiados localmente para residentes excluidos de Medi-Cal. El programa My Health LA del Condado de LA atiende a más de 200,000 residentes sin seguro a través de FQHCs.",
    },
    dollarRange: "$200M-500M/year per large county",
    examples: {
      en: "My Health LA (LA County), Healthy San Francisco, Healthy Way LA",
      es: "My Health LA (Condado de LA), Healthy San Francisco, Healthy Way LA",
    },
    icon: <Shield className="size-6 text-teal-600" />,
  },
  {
    title: {
      en: "Local Tobacco/Sugar Taxes for Health",
      es: "Impuestos Locales a Tabaco/Azúcar para Salud",
    },
    description: {
      en: "Cities and counties can levy or increase local taxes on tobacco, sugary beverages, or cannabis with revenue dedicated to community health services and FQHC funding.",
      es: "Las ciudades y condados pueden imponer o aumentar impuestos locales al tabaco, bebidas azucaradas o cannabis con ingresos dedicados a servicios de salud comunitaria y financiamiento de FQHCs.",
    },
    dollarRange: "$10M-100M/year depending on jurisdiction",
    examples: {
      en: "San Francisco soda tax ($15M/yr), Oakland sugar tax, Berkeley soda tax",
      es: "Impuesto a refrescos de San Francisco ($15M/año), impuesto al azúcar de Oakland, impuesto a refrescos de Berkeley",
    },
    icon: <DollarSign className="size-6 text-amber-600" />,
  },
  {
    title: {
      en: "Community Benefit Agreements with Hospitals",
      es: "Acuerdos de Beneficio Comunitario con Hospitales",
    },
    description: {
      en: "Non-profit hospitals must provide community benefit to maintain tax-exempt status. Cities can negotiate agreements directing hospital community benefit funds to FQHCs and community health programs.",
      es: "Los hospitales sin fines de lucro deben proporcionar beneficio comunitario para mantener su estatus de exención fiscal. Las ciudades pueden negociar acuerdos que dirijan fondos de beneficio comunitario del hospital a FQHCs y programas de salud comunitaria.",
    },
    dollarRange: "$5M-50M/year per hospital system",
    examples: {
      en: "Kaiser community health initiatives, Dignity Health community grants",
      es: "Iniciativas de salud comunitaria de Kaiser, subvenciones comunitarias de Dignity Health",
    },
    icon: <Hospital className="size-6 text-blue-600" />,
  },
  {
    title: {
      en: "340B Drug Pricing Program Optimization",
      es: "Optimización del Programa de Precios de Medicamentos 340B",
    },
    description: {
      en: "FQHCs can maximize 340B savings by expanding contract pharmacy networks and using savings to cross-subsidize care for unfunded patients. Cities can support this through technical assistance.",
      es: "Los FQHCs pueden maximizar los ahorros del 340B expandiendo redes de farmacias contratadas y usando los ahorros para subsidiar la atención de pacientes sin financiamiento. Las ciudades pueden apoyar esto mediante asistencia técnica.",
    },
    dollarRange: "$2M-20M/year per FQHC",
    examples: {
      en: "Most CA FQHCs participate but many underutilize the program",
      es: "La mayoría de los FQHCs de CA participan pero muchos subutilizan el programa",
    },
    icon: <Scale className="size-6 text-teal-600" />,
  },
  {
    title: {
      en: "State Emergency Medicaid Supplement",
      es: "Suplemento Estatal de Medicaid de Emergencia",
    },
    description: {
      en: "Even with federal cuts, California can maintain or increase state-only funding to bridge the gap. The state can use General Fund dollars to continue reimbursing FQHCs at PPS rates for undocumented patients.",
      es: "Incluso con recortes federales, California puede mantener o aumentar el financiamiento solo estatal para cerrar la brecha. El estado puede usar dólares del Fondo General para continuar reembolsando a los FQHCs a tasas PPS para pacientes indocumentados.",
    },
    dollarRange: "$1B-5B/year statewide",
    examples: {
      en: "Would require state legislation to restore PPS rates and dental coverage",
      es: "Requeriría legislación estatal para restaurar las tasas PPS y la cobertura dental",
    },
    icon: <Zap className="size-6 text-red-600" />,
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function FundingImpactPage() {
  const t = useText();
  const locale = t.locale;

  const [timelineFilter, setTimelineFilter] = useState<"all" | "federal" | "state">("all");
  const [undocOnly, setUndocOnly] = useState(false);
  const [expandedTimeline, setExpandedTimeline] = useState<string | null>(null);
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null);

  /* filter timeline */
  const filteredTimeline = policyTimeline.filter((p) => {
    if (timelineFilter !== "all" && p.category !== timelineFilter) return false;
    if (undocOnly && !p.affectsUndocumented) return false;
    return true;
  });

  /* filter programs */
  const filteredPrograms = programImpacts.filter((p) => {
    if (undocOnly && !p.affectsUndocumented) return false;
    return true;
  });

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-red-900 via-red-800 to-stone-900 py-14 text-center text-white sm:py-20 relative overflow-hidden">
        {/* subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative mx-auto max-w-4xl px-4">
          <Badge className="mb-4 border-red-400/30 bg-red-500/20 text-red-100 text-sm">
            {t.lastUpdated}
          </Badge>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {t.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-red-100/80 sm:text-lg">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* ─── Key Numbers ─── */}
      <div className="mx-auto max-w-7xl px-4 -mt-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {impactStats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center rounded-xl border border-stone-200 bg-white p-4 shadow-sm text-center"
            >
              {statIcons[stat.icon]}
              <p className="mt-2 text-2xl font-extrabold text-stone-900 sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-0.5 text-xs font-semibold text-stone-700">
                {stat.label[locale as "en" | "es"]}
              </p>
              <p className="mt-1 text-[10px] text-stone-400 leading-tight">
                {stat.context[locale as "en" | "es"]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Filters ─── */}
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-stone-600 mr-2">
            {t.isEs ? "Filtrar:" : "Filter:"}
          </span>
          {(["all", "federal", "state"] as const).map((f) => (
            <Button
              key={f}
              size="sm"
              variant={timelineFilter === f ? "default" : "outline"}
              className={
                timelineFilter === f
                  ? f === "federal"
                    ? "bg-red-700 text-white hover:bg-red-800"
                    : f === "state"
                      ? "bg-blue-700 text-white hover:bg-blue-800"
                      : "bg-stone-800 text-white hover:bg-stone-900"
                  : ""
              }
              onClick={() => setTimelineFilter(f)}
            >
              {f === "all" ? t.showAll : f === "federal" ? t.showFederal : t.showState}
            </Button>
          ))}
          <Button
            size="sm"
            variant={undocOnly ? "default" : "outline"}
            className={undocOnly ? "bg-amber-600 text-white hover:bg-amber-700" : ""}
            onClick={() => setUndocOnly(!undocOnly)}
          >
            {t.undocumentedOnly}
          </Button>
        </div>
      </div>

      {/* ─── Timeline ─── */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-stone-900">{t.timelineTitle}</h2>
        <p className="mt-1 text-sm text-stone-500">{t.timelineSubtitle}</p>

        <div className="mt-6 relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-stone-200 sm:left-8" />

          <div className="space-y-4">
            {filteredTimeline.map((event) => {
              const isExpanded = expandedTimeline === event.id;
              const isPast = new Date(event.date) <= new Date();
              return (
                <div key={event.id} className="relative pl-10 sm:pl-16">
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-2.5 top-4 size-3 rounded-full border-2 sm:left-6.5 ${
                      isPast
                        ? "border-red-600 bg-red-600"
                        : "border-amber-500 bg-amber-500"
                    }`}
                  />

                  <div
                    className={`rounded-xl border bg-white p-4 shadow-sm transition-all sm:p-5 ${
                      isPast ? "border-stone-200" : "border-amber-200 bg-amber-50/30"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-stone-400">
                        {formatDate(event.date, locale)}
                      </span>
                      {categoryBadge(event.category, t.isEs)}
                      {event.affectsUndocumented && (
                        <Badge className="bg-amber-50 text-amber-700 text-xs">
                          {t.isEs ? "Indocumentados" : "Undocumented"}
                        </Badge>
                      )}
                      {event.affectsDental && (
                        <Badge className="bg-pink-50 text-pink-700 text-xs">
                          {t.isEs ? "Dental" : "Dental"}
                        </Badge>
                      )}
                      {event.affectsCalAIM && (
                        <Badge className="bg-teal-50 text-teal-700 text-xs">CalAIM</Badge>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-stone-900 sm:text-lg">
                      {event.title[locale as "en" | "es"]}
                    </h3>
                    <p className="mt-1 text-sm text-stone-600">
                      {event.description[locale as "en" | "es"]}
                    </p>

                    {/* Key stats row */}
                    {(event.dollarAmount || event.peopleAffected) && (
                      <div className="mt-3 flex flex-wrap gap-3">
                        {event.dollarAmount && (
                          <span className="flex items-center gap-1 text-xs font-semibold text-red-700 bg-red-50 rounded-lg px-2 py-1">
                            <DollarSign className="size-3" />
                            {event.dollarAmount}
                          </span>
                        )}
                        {event.peopleAffected && (
                          <span className="flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 rounded-lg px-2 py-1">
                            <Users className="size-3" />
                            {event.peopleAffected}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Expand for impact */}
                    <button
                      onClick={() => setExpandedTimeline(isExpanded ? null : event.id)}
                      className="mt-2 flex items-center gap-1 text-xs font-medium text-teal-700 hover:text-teal-800"
                    >
                      {isExpanded ? t.hideDetails : t.viewDetails}
                      {isExpanded ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
                    </button>

                    {isExpanded && (
                      <div className="mt-3 rounded-lg bg-stone-50 p-3 text-sm text-stone-700">
                        <p className="font-medium mb-1">
                          {t.isEs ? "Impacto:" : "Impact:"}
                        </p>
                        <p>{event.impact[locale as "en" | "es"]}</p>
                        <a
                          href={event.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1 text-xs text-teal-700 hover:underline"
                        >
                          {event.sourceTitle} <ExternalLink className="size-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── Programs Affected ─── */}
      <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-stone-900">{t.programsTitle}</h2>
        <p className="mt-1 text-sm text-stone-500">{t.programsSubtitle}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPrograms.map((prog) => {
            const isExpanded = expandedProgram === prog.id;
            return (
              <div
                key={prog.id}
                className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  {statusBadge(prog.status, locale)}
                  <span className="text-xs text-stone-400 font-mono">
                    {formatDate(prog.effectiveDate, locale)}
                  </span>
                </div>

                <h3 className="text-base font-bold text-stone-900">
                  {locale === "es" ? prog.nameEs : prog.name}
                </h3>

                <p className="mt-2 text-sm text-stone-600 line-clamp-3">
                  {prog.description[locale as "en" | "es"]}
                </p>

                <div className="mt-3 space-y-1.5">
                  <div className="flex items-center gap-1 text-xs">
                    <DollarSign className="size-3 text-red-600" />
                    <span className="font-medium text-red-700">
                      {prog.revenueImpact[locale as "en" | "es"]}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <Users className="size-3 text-stone-500" />
                    <span className="text-stone-600">{prog.patientsAffected}</span>
                  </div>
                </div>

                {prog.affectsUndocumented && (
                  <Badge className="mt-3 bg-amber-50 text-amber-700 text-xs">
                    {t.isEs ? "Afecta Indocumentados" : "Affects Undocumented"}
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── FQHC Revenue Impact Model ─── */}
      <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-stone-900">{t.revenueTitle}</h2>
        <p className="mt-1 text-sm text-stone-500">{t.revenueSubtitle}</p>

        <div className="mt-6 space-y-4">
          {fqhcRevenueModel.map((item) => (
            <div
              key={item.category}
              className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-bold text-stone-900">
                    {locale === "es" ? item.categoryEs : item.category}
                  </h3>
                  <p className="mt-1 text-sm text-stone-600">
                    {item.description[locale as "en" | "es"]}
                  </p>
                </div>
                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-center">
                    <p className="text-xs text-stone-500 uppercase">{t.currentRevenue}</p>
                    <p className="text-sm font-semibold text-stone-800">{item.currentRevenue}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-stone-500 uppercase">{t.projectedLoss}</p>
                    <p className="text-sm font-bold text-red-700">{item.projectedLoss}</p>
                  </div>
                </div>
              </div>
              {/* Visual bar */}
              <div className="mt-3 h-3 rounded-full bg-stone-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-red-500 to-red-700 transition-all"
                  style={{ width: `${item.percentLoss}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-red-600 font-semibold text-right">
                {item.percentLoss}% {t.isEs ? "pérdida" : "loss"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Why Is This Happening ─── */}
      <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-stone-900">{t.whyTitle}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-red-200 bg-red-50/50 p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="size-5 text-red-600" />
              <h3 className="font-bold text-red-900">{t.whyFederalTitle}</h3>
            </div>
            <p className="text-sm text-red-800/80 leading-relaxed">{t.whyFederal}</p>
          </div>
          <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-5">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="size-5 text-blue-600" />
              <h3 className="font-bold text-blue-900">{t.whyStateTitle}</h3>
            </div>
            <p className="text-sm text-blue-800/80 leading-relaxed">{t.whyState}</p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Snowflake className="size-5 text-amber-600" />
              <h3 className="font-bold text-amber-900">{t.whyWaiverTitle}</h3>
            </div>
            <p className="text-sm text-amber-800/80 leading-relaxed">{t.whyWaiver}</p>
          </div>
        </div>
      </div>

      {/* ─── City-Level Safety Net Levers ─── */}
      <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-stone-900">{t.cityTitle}</h2>
        <p className="mt-1 text-sm text-stone-500">{t.citySubtitle}</p>

        <div className="mt-6 space-y-4">
          {cityLevers.map((lever, i) => (
            <div
              key={i}
              className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 rounded-lg bg-stone-50 p-2.5">
                  {lever.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-stone-900">
                    {lever.title[locale as "en" | "es"]}
                  </h3>
                  <p className="mt-1 text-sm text-stone-600">
                    {lever.description[locale as "en" | "es"]}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <span className="flex items-center gap-1 text-xs font-semibold text-teal-700 bg-teal-50 rounded-lg px-2 py-1">
                      <DollarSign className="size-3" />
                      {lever.dollarRange}
                    </span>
                    <span className="text-xs text-stone-500">
                      {t.isEs ? "Ejemplos:" : "Examples:"} {lever.examples[locale as "en" | "es"]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Sources ─── */}
      <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-stone-900">{t.sourcesTitle}</h2>
        <p className="mt-1 text-sm text-stone-500">{t.sourcesSubtitle}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {/* Primary */}
          <div>
            <h3 className="text-sm font-semibold text-stone-700 mb-3">{t.primarySources}</h3>
            <div className="space-y-2">
              {keySources
                .filter((s) => s.relevance === "primary")
                .map((source) => (
                  <a
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg border border-stone-200 bg-white p-3 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start gap-2">
                      <BookOpen className="size-4 mt-0.5 shrink-0 text-teal-600" />
                      <div>
                        <p className="text-sm font-medium text-stone-900">
                          {source.title[locale as "en" | "es"]}
                        </p>
                        <p className="text-xs text-stone-500 mt-0.5">
                          {source.publisher} &middot; {formatDate(source.date, locale)}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
            </div>
          </div>
          {/* Supporting */}
          <div>
            <h3 className="text-sm font-semibold text-stone-700 mb-3">{t.supportingSources}</h3>
            <div className="space-y-2">
              {keySources
                .filter((s) => s.relevance === "supporting")
                .map((source) => (
                  <a
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg border border-stone-200 bg-white p-3 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start gap-2">
                      <ExternalLink className="size-4 mt-0.5 shrink-0 text-stone-400" />
                      <div>
                        <p className="text-sm font-medium text-stone-900">
                          {source.title[locale as "en" | "es"]}
                        </p>
                        <p className="text-xs text-stone-500 mt-0.5">
                          {source.publisher} &middot; {formatDate(source.date, locale)}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── CTA ─── */}
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 p-8 text-white sm:p-12">
          <h2 className="text-2xl font-bold text-center sm:text-3xl">{t.ctaTitle}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {/* Worker */}
            <div className="rounded-xl bg-white/10 p-5 text-center">
              <Users className="mx-auto size-8 text-amber-400 mb-3" />
              <p className="text-sm text-teal-100 mb-4">{t.ctaWorker}</p>
              <Button
                size="sm"
                className="bg-amber-500 text-stone-900 hover:bg-amber-400 font-semibold"
                asChild
              >
                <Link href="/fast-track">
                  Fast-Track <ArrowRight className="ml-1 size-3" />
                </Link>
              </Button>
            </div>
            {/* Employer */}
            <div className="rounded-xl bg-white/10 p-5 text-center">
              <Hospital className="mx-auto size-8 text-teal-300 mb-3" />
              <p className="text-sm text-teal-100 mb-4">{t.ctaEmployer}</p>
              <Button
                size="sm"
                className="bg-white text-teal-800 hover:bg-teal-50 font-semibold"
                asChild
              >
                <Link href="/hire">
                  {t.isEs ? "Contratar" : "Hire"} <ArrowRight className="ml-1 size-3" />
                </Link>
              </Button>
            </div>
            {/* Advocate */}
            <div className="rounded-xl bg-white/10 p-5 text-center">
              <Heart className="mx-auto size-8 text-red-400 mb-3" />
              <p className="text-sm text-teal-100 mb-4">{t.ctaAdvocate}</p>
              <Button
                size="sm"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-semibold"
                asChild
              >
                <Link href="/layoffs">
                  {t.isEs ? "Ver Despidos" : "View Layoffs"} <ArrowRight className="ml-1 size-3" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
