// For Employers — Free Strategic Resources for FQHC Leaders
"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  Building2,
  Crosshair,
  FileBarChart,
  GitCompareArrows,
  Globe,
  LayoutDashboard,
  MapPin,
  Shield,
  Target,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface ResourceCard {
  href: string;
  icon: typeof Building2;
  label: { en: string; es: string };
  description: { en: string; es: string };
  badge?: { en: string; es: string };
}

const STRATEGY_RESOURCES: ResourceCard[] = [
  {
    href: "/strategy/guides",
    icon: BookOpen,
    label: { en: "Executive Guides", es: "Guias Ejecutivas" },
    description: {
      en: "6 real FQHC case studies analyzed through the Rumelt strategic framework.",
      es: "6 estudios de caso reales de FQHCs analizados con el marco estrategico de Rumelt.",
    },
    badge: { en: "Rumelt Framework", es: "Marco Rumelt" },
  },
  {
    href: "/strategy/okrs",
    icon: Target,
    label: { en: "OKR Templates", es: "Plantillas OKR" },
    description: {
      en: "12 crisis change management templates across 5 domains. Cross-department key results.",
      es: "12 plantillas de gestion de cambio en crisis en 5 dominios. Resultados clave interdepartamentales.",
    },
    badge: { en: "12 Templates", es: "12 Plantillas" },
  },
  {
    href: "/strategy/offboarding",
    icon: Shield,
    label: { en: "Transition Toolkit", es: "Kit de Transicion" },
    description: {
      en: "Workforce transition tools for FQHCs navigating layoffs and restructuring.",
      es: "Herramientas de transicion laboral para FQHCs que navegan despidos y reestructuracion.",
    },
  },
  {
    href: "/strategy/resilience",
    icon: FileBarChart,
    label: { en: "Resilience Scorecard", es: "Cuadro de Resiliencia" },
    description: {
      en: "220 California FQHCs scored across 5 dimensions: programs, workforce, data, quality, financial.",
      es: "220 FQHCs de California evaluados en 5 dimensiones: programas, fuerza laboral, datos, calidad, finanzas.",
    },
    badge: { en: "220 FQHCs", es: "220 FQHCs" },
  },
];

const INTELLIGENCE_RESOURCES: ResourceCard[] = [
  {
    href: "/insights",
    icon: LayoutDashboard,
    label: { en: "Intelligence Dashboard", es: "Panel de Inteligencia" },
    description: {
      en: "Breaking intel feed, funding cliff countdowns, workforce data, and policy tracking.",
      es: "Noticias de inteligencia, cuentas regresivas de financiamiento, datos laborales y seguimiento de politicas.",
    },
  },
  {
    href: "/intelligence/los-angeles",
    icon: MapPin,
    label: { en: "Regional Intelligence", es: "Inteligencia Regional" },
    description: {
      en: "9 per-region dashboards covering every California FQHC market.",
      es: "9 paneles regionales que cubren cada mercado de FQHCs en California.",
    },
    badge: { en: "9 Regions", es: "9 Regiones" },
  },
  {
    href: "/salary-data",
    icon: BarChart3,
    label: { en: "Salary Intelligence", es: "Inteligencia Salarial" },
    description: {
      en: "30 roles across 9 California regions with P25/P50/P75 salary benchmarks.",
      es: "30 roles en 9 regiones de California con benchmarks salariales P25/P50/P75.",
    },
    badge: { en: "270 Benchmarks", es: "270 Benchmarks" },
  },
  {
    href: "/ai-tracker",
    icon: Brain,
    label: { en: "AI Adoption Tracker", es: "Rastreador de IA" },
    description: {
      en: "Monitoring AI implementation across the FQHC sector: ambient AI, EHR tools, RCM automation.",
      es: "Monitoreo de implementacion de IA en el sector FQHC: IA ambiental, herramientas EHR, automatizacion RCM.",
    },
  },
];

const WORKFORCE_RESOURCES: ResourceCard[] = [
  {
    href: "/compare",
    icon: GitCompareArrows,
    label: { en: "Compare FQHCs", es: "Comparar FQHCs" },
    description: {
      en: "Side-by-side comparison of 2-3 FQHCs: resilience scores, programs, Glassdoor, funding.",
      es: "Comparacion lado a lado de 2-3 FQHCs: resiliencia, programas, Glassdoor, financiamiento.",
    },
  },
  {
    href: "/directory",
    icon: Globe,
    label: { en: "FQHC Directory", es: "Directorio FQHC" },
    description: {
      en: "220+ California FQHC profiles with programs, EHR systems, staff counts, and strategic reports.",
      es: "Mas de 220 perfiles de FQHCs de California con programas, sistemas EHR, personal e informes estrategicos.",
    },
    badge: { en: "220+ Profiles", es: "220+ Perfiles" },
  },
  {
    href: "/jobs",
    icon: Users,
    label: { en: "Job Listings", es: "Ofertas de Empleo" },
    description: {
      en: "Aggregated FQHC job listings across California. Links directly to FQHC career pages.",
      es: "Ofertas de empleo de FQHCs agregadas en California. Enlaces directos a paginas de empleo.",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  ResourceSection                                                    */
/* ------------------------------------------------------------------ */

function ResourceSection({
  title,
  subtitle,
  cards,
  locale,
  accentColor = "amber",
}: {
  title: { en: string; es: string };
  subtitle: { en: string; es: string };
  cards: ResourceCard[];
  locale: string;
  accentColor?: "amber" | "teal" | "stone";
}) {
  const colorMap = {
    amber: {
      iconBg: "bg-amber-100",
      iconText: "text-amber-700",
      badgeBg: "bg-amber-100 text-amber-800",
      heading: "text-amber-600",
    },
    teal: {
      iconBg: "bg-teal-100",
      iconText: "text-teal-700",
      badgeBg: "bg-teal-100 text-teal-800",
      heading: "text-teal-600",
    },
    stone: {
      iconBg: "bg-stone-100",
      iconText: "text-stone-700",
      badgeBg: "bg-stone-200 text-stone-700",
      heading: "text-stone-500",
    },
  };

  const colors = colorMap[accentColor];

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className={`text-sm font-semibold uppercase tracking-wider ${colors.heading}`}>
            {t(title, locale)}
          </p>
          <p className="mt-1 text-base text-stone-500">
            {t(subtitle, locale)}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group flex gap-4 rounded-xl border border-stone-200 bg-white p-5 transition-all hover:border-stone-300 hover:shadow-md"
              >
                <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${colors.iconBg}`}>
                  <Icon className={`size-5 ${colors.iconText}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-stone-900 group-hover:text-stone-700">
                      {t(card.label, locale)}
                    </h3>
                    {card.badge && (
                      <Badge variant="secondary" className={`text-[10px] font-medium ${colors.badgeBg}`}>
                        {t(card.badge, locale)}
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-stone-500">
                    {t(card.description, locale)}
                  </p>
                </div>
                <ArrowRight className="mt-0.5 size-4 shrink-0 text-stone-300 transition-colors group-hover:text-stone-500" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function HirePage() {
  const locale = useLocale();

  return (
    <div className="bg-stone-50">
      {/* ---------- Hero ---------- */}
      <section className="bg-gradient-to-br from-stone-800 via-stone-900 to-stone-950 py-16 text-center text-white sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-amber-500/20 backdrop-blur">
            <Building2 className="size-7 text-amber-400" />
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {t(
              {
                en: "Strategic Resources for FQHC Leaders",
                es: "Recursos Estrategicos para Lideres de FQHCs",
              },
              locale,
            )}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-stone-300 sm:text-lg">
            {t(
              {
                en: "Free intelligence tools, workforce data, and strategic frameworks built specifically for California's Federally Qualified Health Centers. No account required.",
                es: "Herramientas de inteligencia, datos laborales y marcos estrategicos gratuitos, disenados especificamente para los Centros de Salud Calificados Federalmente de California. No se requiere cuenta.",
              },
              locale,
            )}
          </p>

          {/* Stats bar */}
          <div className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-6 text-sm text-stone-400">
            <div className="flex items-center gap-1.5">
              <Crosshair className="size-4 text-amber-400" />
              <span>
                {t(
                  { en: "220+ FQHC profiles", es: "220+ perfiles FQHC" },
                  locale,
                )}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <BarChart3 className="size-4 text-amber-400" />
              <span>
                {t(
                  { en: "270 salary benchmarks", es: "270 benchmarks salariales" },
                  locale,
                )}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="size-4 text-amber-400" />
              <span>
                {t(
                  { en: "9 CA regions", es: "9 regiones de CA" },
                  locale,
                )}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Strategy Section ---------- */}
      <ResourceSection
        title={{
          en: "Strategy & Frameworks",
          es: "Estrategia y Marcos",
        }}
        subtitle={{
          en: "Executive-grade strategic tools for navigating the current operating environment.",
          es: "Herramientas estrategicas de nivel ejecutivo para navegar el entorno operativo actual.",
        }}
        cards={STRATEGY_RESOURCES}
        locale={locale}
        accentColor="amber"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <hr className="border-stone-200" />
      </div>

      {/* ---------- Intelligence Section ---------- */}
      <ResourceSection
        title={{
          en: "Intelligence & Data",
          es: "Inteligencia y Datos",
        }}
        subtitle={{
          en: "Real-time monitoring of the forces shaping California's safety-net workforce.",
          es: "Monitoreo en tiempo real de las fuerzas que dan forma a la fuerza laboral de la red de seguridad de California.",
        }}
        cards={INTELLIGENCE_RESOURCES}
        locale={locale}
        accentColor="teal"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <hr className="border-stone-200" />
      </div>

      {/* ---------- Workforce Tools Section ---------- */}
      <ResourceSection
        title={{
          en: "Workforce Tools",
          es: "Herramientas de Fuerza Laboral",
        }}
        subtitle={{
          en: "Explore and benchmark California's FQHC workforce landscape.",
          es: "Explore y compare el panorama laboral de FQHCs en California.",
        }}
        cards={WORKFORCE_RESOURCES}
        locale={locale}
        accentColor="stone"
      />

      {/* ---------- Bottom note ---------- */}
      <section className="border-t border-stone-200 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm leading-relaxed text-stone-500">
            {t(
              {
                en: "FQHC Talent is California's strategic intelligence platform for community health centers. All resources on this page are free and available without an account. Data is updated daily through our automated intelligence pipeline.",
                es: "FQHC Talent es la plataforma de inteligencia estrategica de California para centros de salud comunitarios. Todos los recursos en esta pagina son gratuitos y estan disponibles sin cuenta. Los datos se actualizan diariamente a traves de nuestro pipeline de inteligencia automatizado.",
              },
              locale,
            )}
          </p>
        </div>
      </section>
    </div>
  );
}
