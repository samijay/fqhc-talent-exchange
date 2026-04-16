// FQHC Movement: California's Story — History, cross-cultural alliances, emotional narrative
"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Breadcrumb, PageHero, RelatedContent } from "@/components/ui/design-system";
import { STRATEGY_RELATED } from "@/lib/strategy-related-content";
import {
  ArrowRight,
  ArrowUpDown,
  BookOpen,
  Calendar,
  ChevronDown,
  Clock,
  ExternalLink,
  Film,
  Filter,
  Handshake,
  Linkedin,
  LinkIcon,
  Play,
  Sparkles,
  Users,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  MOVEMENT_EVENTS,
  MOVEMENT_ERAS,
  MOVEMENT_CATEGORIES,
  CROSS_CULTURAL_ALLIANCES,
  MOVEMENT_LAST_UPDATED,
} from "@/lib/fqhc-movement-history";
import { THOUGHT_LEADERS } from "@/lib/fqhc-thought-leaders";
import { MovementTimeline } from "@/components/viz/MovementTimeline";
import type { MovementCategory } from "@/components/viz/MovementTimeline";
import { TableOfContents } from "@/components/layout/TableOfContents";
import { t } from "@/lib/i18n-helpers";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Color chip for community labels */
const COMMUNITY_COLORS: Record<string, string> = {
  "Latino/Mexican": "bg-green-100 text-green-800 border-green-200",
  "Latino/Chicano": "bg-green-100 text-green-800 border-green-200",
  "Filipino American": "bg-amber-100 text-amber-800 border-amber-200",
  "African American": "bg-purple-100 text-purple-800 border-purple-200",
  "Jewish American": "bg-blue-100 text-blue-800 border-blue-200",
  "Jewish South African": "bg-blue-100 text-blue-800 border-blue-200",
  "Chinese American": "bg-rose-100 text-rose-800 border-rose-200",
  "Vietnamese American": "bg-rose-100 text-rose-800 border-rose-200",
  "Korean American": "bg-rose-100 text-rose-800 border-rose-200",
  "Other Asian/Pacific Islander": "bg-rose-100 text-rose-800 border-rose-200",
  "White (political ally)": "bg-stone-100 text-stone-700 border-stone-200",
  White: "bg-stone-100 text-stone-700 border-stone-200",
  "Rural conservative communities": "bg-orange-100 text-orange-800 border-orange-200",
  "Urban under-resourced communities": "bg-indigo-100 text-indigo-800 border-indigo-200",
  "Agricultural workers": "bg-lime-100 text-lime-800 border-lime-200",
};

function communityChip(community: string) {
  const color =
    COMMUNITY_COLORS[community] ||
    "bg-stone-100 text-stone-700 border-stone-200";
  return (
    <span
      key={community}
      className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${color}`}
    >
      {community}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Category filter pill colors                                        */
/* ------------------------------------------------------------------ */

const CATEGORY_PILL_COLORS: Record<string, { active: string; inactive: string }> = {
  farmworker: { active: "bg-emerald-600 text-white", inactive: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100" },
  "civil-rights": { active: "bg-purple-600 text-white", inactive: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100" },
  legislation: { active: "bg-blue-600 text-white", inactive: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100" },
  founding: { active: "bg-teal-600 text-white", inactive: "bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100" },
  expansion: { active: "bg-amber-600 text-white", inactive: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100" },
  alliance: { active: "bg-rose-600 text-white", inactive: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100" },
  crisis: { active: "bg-red-600 text-white", inactive: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100" },
  undocumented: { active: "bg-indigo-600 text-white", inactive: "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100" },
};

/* ------------------------------------------------------------------ */
/*  Documentary / Video Resources data                                 */
/* ------------------------------------------------------------------ */

interface VideoResource {
  id: string;
  title: { en: string; es: string };
  description: { en: string; es: string };
  youtubeId?: string;
  externalUrl?: string;
  source: string;
  year?: string;
  relevance: string;
}

const VIDEO_RESOURCES: VideoResource[] = [
  {
    id: "black-power-mixtape",
    title: {
      en: "The Black Panthers — A Quick History",
      es: "Los Panteras Negras — Una Historia Breve",
    },
    description: {
      en: "Overview of the Black Panther Party's founding and their 'survival programs' — including free medical clinics, sickle cell testing, and the free breakfast program that fed 20,000 children across 19 cities. These community health programs became the template for community-controlled healthcare.",
      es: "Resumen de la fundacion del Partido de los Panteras Negras y sus 'programas de supervivencia' — incluyendo clinicas medicas gratuitas, pruebas de anemia falciforme y el programa de desayuno gratuito que alimento a 20,000 ninos en 19 ciudades. Estos programas de salud comunitaria se convirtieron en el modelo para la atencion medica controlada por la comunidad.",
    },
    youtubeId: "9Yw9k7__Vqw",
    source: "Revolution and Ideology",
    year: "2020",
    relevance: "Black Panthers free clinics",
  },
  {
    id: "viva-la-causa",
    title: {
      en: "Viva La Causa",
      es: "Viva La Causa",
    },
    description: {
      en: "PBS documentary on Cesar Chavez and the farmworker movement that gave birth to the first community health clinics in California's Central Valley. The fight for dignity in the fields became the fight for healthcare access.",
      es: "Documental de PBS sobre Cesar Chavez y el movimiento campesino que dio origen a las primeras clinicas de salud comunitaria en el Valle Central de California. La lucha por la dignidad en los campos se convirtio en la lucha por el acceso a la atencion medica.",
    },
    externalUrl: "https://www.pbs.org/itvs/fightfields/",
    source: "PBS",
    year: "2008",
    relevance: "Farmworker movement origins",
  },
  {
    id: "nachc-history",
    title: {
      en: "Civil Rights History Project: H. Jack Geiger — Library of Congress",
      es: "Proyecto de Historia de Derechos Civiles: H. Jack Geiger — Biblioteca del Congreso",
    },
    description: {
      en: "Library of Congress oral history with Dr. H. Jack Geiger, co-founder of the first two community health centers. Covers his journey from South Africa to founding Columbia Point (Boston) and Mound Bayou (Mississippi), the intersection of civil rights and healthcare, and prescribing food for malnourished patients.",
      es: "Historia oral de la Biblioteca del Congreso con el Dr. H. Jack Geiger, cofundador de los primeros dos centros de salud comunitarios. Cubre su viaje desde Sudafrica hasta la fundacion de Columbia Point (Boston) y Mound Bayou (Mississippi), la interseccion de derechos civiles y atencion medica, y la prescripcion de alimentos para pacientes desnutridos.",
    },
    youtubeId: "bIOgDqWEGHc",
    source: "Library of Congress",
    year: "2015",
    relevance: "National movement history",
  },
  {
    id: "mnhc-50th",
    title: {
      en: "MNHC 50th Anniversary: Half a Century of Community Health",
      es: "MNHC 50 Aniversario: Medio Siglo de Salud Comunitaria",
    },
    description: {
      en: "Marin Community Clinics (now MNHC) celebrates 50 years of service. Born from the farmworker movement and counterculture health activism of the 1960s, MNHC's story mirrors the evolution of the entire FQHC sector.",
      es: "Marin Community Clinics (ahora MNHC) celebra 50 anos de servicio. Nacido del movimiento campesino y el activismo de salud contracultural de los anos 1960, la historia de MNHC refleja la evolucion de todo el sector FQHC.",
    },
    youtubeId: "1a5y963TjNU",
    source: "MNHC",
    year: "2022",
    relevance: "FQHC evolution & community roots",
  },
  {
    id: "delano-grape-strike",
    title: {
      en: "The Delano Manongs — Forgotten Heroes of the UFW",
      es: "Los Manongs de Delano — Heroes Olvidados de la UFW",
    },
    description: {
      en: "Trailer for the Emmy-nominated documentary about Larry Itliong, Philip Vera Cruz, and the Filipino farmworkers who started the 1965 Delano grape strike. Their cross-cultural solidarity with Cesar Chavez's Mexican workers created the UFW and, eventually, the farmworker health clinics that became California's first FQHCs.",
      es: "Trailer del documental nominado al Emmy sobre Larry Itliong, Philip Vera Cruz y los campesinos filipinos que iniciaron la huelga de la uva de Delano en 1965. Su solidaridad intercultural con los trabajadores mexicanos de Cesar Chavez creo la UFW y, eventualmente, las clinicas de salud para campesinos que se convirtieron en los primeros FQHCs de California.",
    },
    youtubeId: "Rx175JNdflI",
    source: "The Media Factory",
    year: "2014",
    relevance: "Cross-cultural origins of FQHC movement",
  },
  {
    id: "fight-in-fields",
    title: {
      en: "The Fight in the Fields: Cesar Chavez and the Farmworkers' Struggle",
      es: "La Lucha en los Campos: Cesar Chavez y la Lucha de los Campesinos",
    },
    description: {
      en: "Comprehensive documentary on the farmworker movement that traces the line from labor organizing to healthcare access. Features the creation of farmworker service centers that included health clinics — the precursors to today's FQHCs.",
      es: "Documental completo sobre el movimiento campesino que traza la linea desde la organizacion laboral hasta el acceso a la atencion medica. Presenta la creacion de centros de servicio para campesinos que incluian clinicas de salud — los precursores de los FQHCs de hoy.",
    },
    externalUrl: "https://www.pbs.org/itvs/fightfields/",
    source: "PBS / Paradigm Productions",
    year: "1997",
    relevance: "Farmworker clinics to FQHCs",
  },
  {
    id: "salinas-project",
    title: {
      en: "The Salinas Project: Farmworker Health in the Salad Bowl of the World",
      es: "El Proyecto Salinas: Salud de los Campesinos en la Ensaladera del Mundo",
    },
    description: {
      en: "Documents the health conditions of farmworkers in Salinas Valley — pesticide exposure, housing conditions, and the clinics that rose to serve them. Salinas remains one of the most important FQHC regions in California.",
      es: "Documenta las condiciones de salud de los campesinos en el Valle de Salinas — exposicion a pesticidas, condiciones de vivienda y las clinicas que surgieron para atenderlos. Salinas sigue siendo una de las regiones de FQHCs mas importantes de California.",
    },
    externalUrl: "https://library.ucsc.edu/reg-hist/farmworker-health",
    source: "UC Santa Cruz Library",
    year: "2010",
    relevance: "Farmworker health conditions & clinic origins",
  },
];

/* ------------------------------------------------------------------ */
/*  Alliance Card                                                      */
/* ------------------------------------------------------------------ */

function AllianceCard({
  alliance,
  locale,
  isExpanded,
  onToggle,
}: {
  alliance: (typeof CROSS_CULTURAL_ALLIANCES)[number];
  locale: string;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const isEs = locale === "es";

  return (
    <div className="rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 transition-all hover:shadow-sm">
      {/* Header — always visible */}
      <button
        onClick={onToggle}
        className="w-full text-left p-5 sm:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 leading-snug sm:text-lg">
              {t(alliance.title, locale)}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 text-xs text-stone-500">
                <Calendar className="size-3" />
                {alliance.period}
              </span>
              {alliance.communities.map((c) => communityChip(c))}
            </div>
          </div>
          <ChevronDown
            className={`size-5 text-stone-500 flex-shrink-0 mt-1 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Preview when collapsed */}
        {!isExpanded && (
          <p className="mt-3 text-sm text-stone-500 dark:text-stone-400 line-clamp-2">
            {t(alliance.description, locale)}
          </p>
        )}
      </button>

      {/* Expanded body */}
      {isExpanded && (
        <div className="px-5 pb-5 sm:px-6 sm:pb-6 space-y-4 border-t border-stone-100 dark:border-stone-700 pt-4">
          {/* Full description */}
          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            {t(alliance.description, locale)}
          </p>

          {/* Key figures */}
          {alliance.keyFigures.length > 0 && (
            <div>
              <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                {isEs ? "Figuras Clave" : "Key Figures"}
              </p>
              <div className="space-y-3">
                {alliance.keyFigures.map((person) => (
                  <div
                    key={person.name}
                    className="rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 p-3"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-teal-100 dark:bg-teal-900 text-xs font-bold text-teal-700 dark:text-teal-400">
                        {person.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                          {person.name}
                        </span>
                        <span className="text-xs text-stone-500 ml-1.5">
                          {person.background}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                      {t(person.contribution, locale)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Relevance to modern FQHCs */}
          <div className="rounded-lg bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 p-4">
            <p className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-1.5">
              {isEs ? "Relevancia para los FQHCs Hoy" : "Relevance to FQHCs Today"}
            </p>
            <p className="text-sm text-teal-900 leading-relaxed">
              {t(alliance.relevanceToFQHC, locale)}
            </p>
          </div>

          {/* Primary source */}
          <a
            href={alliance.primarySourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-teal-700 hover:text-teal-900 hover:underline transition-colors"
          >
            <ExternalLink className="size-3" />
            {alliance.primarySourceOrg}
          </a>
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/*  Movement Page                                                      */
/* ================================================================== */

export default function MovementPage() {
  const locale = useLocale();
  const isEs = locale === "es";

  const [expandedAlliance, setExpandedAlliance] = useState<string | null>(null);

  // Timeline filter state
  const [selectedCategory, setSelectedCategory] = useState<MovementCategory | "all">("all");
  const [reverseChronology, setReverseChronology] = useState(false);

  // Filter and sort timeline events
  const filteredEvents = useMemo(() => {
    let events = selectedCategory === "all"
      ? [...MOVEMENT_EVENTS]
      : MOVEMENT_EVENTS.filter((e) => e.category === selectedCategory);

    if (reverseChronology) {
      events = events.slice().reverse();
    }

    return events;
  }, [selectedCategory, reverseChronology]);

  const timelineEras = MOVEMENT_ERAS;

  // Filter thought leaders for movement-relevant categories
  const movementLeaders = useMemo(() => {
    const relevantCategories = new Set(["fqhc-ceo", "nachc-leadership", "state-pca"]);
    return THOUGHT_LEADERS.filter((leader) => relevantCategories.has(leader.category));
  }, []);

  const tocItems = [
    { id: "movement-timeline", label: isEs ? "Linea del Tiempo" : "Movement Timeline" },
    { id: "multimedia-resources", label: isEs ? "Recursos Multimedia" : "Multimedia Resources" },
    { id: "cross-cultural-alliances", label: isEs ? "Coaliciones" : "Powerful Coalitions" },
    { id: "movement-leaders", label: isEs ? "Lideres" : "Movement Leaders" },
    { id: "we-are-the-continuation", label: isEs ? "Somos la Continuacion" : "We Are the Continuation" },
  ];

  return (
    <div className="bg-stone-50 dark:bg-stone-950">
      <Breadcrumb items={[
        { label: "Home", href: "/" },
        { label: "Strategy", href: "/strategy/movement" },
        { label: "The Movement" },
      ]} />
      <PageHero
        variant="dark"
        title={{ en: "The FQHC Movement", es: "El Movimiento FQHC" }}
        subtitle={{
          en: "From farmworker clinics to today -- the story of California's community health centers. Sixty years of struggle, powerful coalitions, and the promise that healthcare is a right, not a privilege.",
          es: "Desde las clinicas campesinas hasta hoy -- la historia de los centros de salud comunitarios de California. Sesenta anos de lucha, poderosas coaliciones y la promesa de que la salud es un derecho, no un privilegio.",
        }}
        meta={`${isEs ? "Ultima actualizacion" : "Last updated"}: ${MOVEMENT_LAST_UPDATED}`}
      >
        <p className="text-sm text-teal-400 font-medium italic">
          {isEs
            ? "\"Somos la continuacion de un movimiento.\""
            : "\"We are the continuation of a movement.\""}
        </p>
      </PageHero>

      {/* ============================================================ */}
      {/*  Stats Bar                                                    */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-r from-teal-700 to-teal-800 text-white py-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="text-center">
              <p className="text-2xl font-extrabold">{MOVEMENT_EVENTS.length}</p>
              <p className="text-xs text-teal-200 mt-0.5">
                {isEs
                  ? `Eventos en ${MOVEMENT_ERAS.length} eras`
                  : `Events across ${MOVEMENT_ERAS.length} eras`}
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-extrabold">60+</p>
              <p className="text-xs text-teal-200 mt-0.5">
                {isEs ? "Anos de historia" : "Years of movement history"}
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-extrabold">{CROSS_CULTURAL_ALLIANCES.length}</p>
              <p className="text-xs text-teal-200 mt-0.5">
                {isEs ? "Alianzas interculturales" : "Cross-cultural alliances"}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <LinkIcon className="size-4" />
                <p className="text-2xl font-extrabold">100%</p>
              </div>
              <p className="text-xs text-teal-200 mt-0.5">
                {isEs ? "Fuentes primarias" : "Primary sources"}
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

      {/* ============================================================ */}
      {/*  Interactive Timeline (with category filter + reverse toggle) */}
      {/* ============================================================ */}
      <section id="movement-timeline" className="py-12 sm:py-16 scroll-mt-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100 sm:text-3xl">
              {isEs ? "Linea del Tiempo del Movimiento" : "Movement Timeline"}
            </h2>
            <p className="mt-2 text-stone-500 max-w-2xl mx-auto">
              {isEs
                ? "Explora los momentos clave que construyeron la red de salud comunitaria mas grande del pais. Haz clic en cualquier era o evento para ver la historia completa."
                : "Explore the defining moments that built the nation's largest community health network. Click any era or event to see the full story."}
            </p>
          </div>

          {/* Category filter pills */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="size-4 text-stone-500" />
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                {isEs ? "Filtrar por tema" : "Filter by theme"}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {/* "All" pill */}
              <button
                onClick={() => setSelectedCategory("all")}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  selectedCategory === "all"
                    ? "bg-stone-800 text-white border-stone-800"
                    : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-600 dark:hover:bg-stone-700"
                }`}
              >
                {isEs ? "Todos" : "All"}
                <span className="text-xs opacity-70">({MOVEMENT_EVENTS.length})</span>
              </button>

              {/* Category pills */}
              {MOVEMENT_CATEGORIES.map((cat) => {
                const count = MOVEMENT_EVENTS.filter((e) => e.category === cat.id).length;
                const colors = CATEGORY_PILL_COLORS[cat.id] || { active: "bg-stone-800 text-white", inactive: "bg-stone-50 text-stone-700 border-stone-200" };
                const isActive = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      isActive ? `${colors.active} border-transparent` : colors.inactive
                    }`}
                  >
                    {t({ en: cat.en, es: cat.es }, locale)}
                    <span className="text-xs opacity-70">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Reverse chronology toggle */}
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => setReverseChronology(!reverseChronology)}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                  reverseChronology
                    ? "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950 dark:text-teal-400 dark:border-teal-700"
                    : "bg-white text-stone-500 border-stone-200 hover:bg-stone-50 dark:bg-stone-800 dark:text-stone-400 dark:border-stone-600 dark:hover:bg-stone-700"
                }`}
              >
                <ArrowUpDown className="size-3" />
                {isEs
                  ? reverseChronology ? "Mas recientes primero" : "Mas antiguos primero"
                  : reverseChronology ? "Newest first" : "Oldest first"}
              </button>
              {selectedCategory !== "all" && (
                <span className="text-xs text-stone-500">
                  {isEs
                    ? `${filteredEvents.length} evento${filteredEvents.length !== 1 ? "s" : ""}`
                    : `${filteredEvents.length} event${filteredEvents.length !== 1 ? "s" : ""}`}
                </span>
              )}
            </div>
          </div>

          <MovementTimeline events={filteredEvents} eras={timelineEras} />
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Multimedia & Documentary Resources                           */}
      {/* ============================================================ */}
      <section id="multimedia-resources" className="py-12 sm:py-16 bg-stone-900 scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Film className="size-5 text-teal-400" />
              <span className="text-sm font-medium uppercase tracking-wider text-teal-400">
                {isEs ? "Recursos Multimedia" : "Multimedia Resources"}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              {isEs
                ? "Documentales y Videos Esenciales"
                : "Essential Documentaries & Videos"}
            </h2>
            <p className="mt-3 text-stone-500 max-w-2xl mx-auto leading-relaxed">
              {isEs
                ? "Peliculas, documentales y videos que capturan la historia del movimiento FQHC. Desde las huelgas de Delano hasta las clinicas de los Panteras Negras -- estas son las historias que definen nuestro trabajo."
                : "Films, documentaries, and videos that capture the story of the FQHC movement. From the Delano grape strikes to the Black Panther clinics -- these are the stories that define our work."}
            </p>
          </div>

          {/* Video grid — 2 columns on desktop */}
          <div className="grid gap-6 sm:grid-cols-2">
            {VIDEO_RESOURCES.map((video) => (
              <div
                key={video.id}
                className="rounded-2xl border border-stone-700 bg-stone-800 overflow-hidden transition-all hover:border-stone-600"
              >
                {/* Video embed or placeholder */}
                {video.youtubeId ? (
                  <div className="relative aspect-video bg-stone-950">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                      title={t(video.title, locale)}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                ) : (
                  <a
                    href={video.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative aspect-video bg-gradient-to-br from-stone-800 to-stone-950 flex items-center justify-center group"
                  >
                    <div className="text-center">
                      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-teal-600/20 border border-teal-500/30 mb-3 mx-auto group-hover:bg-teal-600/30 transition-colors">
                        <Play className="size-6 text-teal-400" />
                      </div>
                      <p className="text-xs text-stone-500 group-hover:text-teal-400 transition-colors">
                        {isEs ? "Ver en" : "Watch on"} {video.source}
                        <ExternalLink className="inline size-3 ml-1" />
                      </p>
                    </div>
                  </a>
                )}

                {/* Card body */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-bold text-white leading-snug">
                      {t(video.title, locale)}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                    <span className="inline-flex items-center gap-1 text-xs text-stone-500">
                      <Video className="size-3" />
                      {video.source}
                    </span>
                    {video.year && (
                      <span className="text-xs text-stone-500">{video.year}</span>
                    )}
                  </div>

                  <p className="mt-3 text-sm text-stone-500 leading-relaxed">
                    {t(video.description, locale)}
                  </p>

                  <div className="mt-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-teal-900/40 border border-teal-700/30 px-2.5 py-0.5 text-xs font-medium text-teal-400">
                      {video.relevance}
                    </span>
                  </div>

                  {/* External link for non-embedded videos */}
                  {video.externalUrl && !video.youtubeId && (
                    <a
                      href={video.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 text-xs text-teal-400 hover:text-teal-300 hover:underline transition-colors"
                    >
                      <ExternalLink className="size-3" />
                      {isEs ? "Ver documental" : "Watch documentary"}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Cross-Cultural Alliances                                     */}
      {/* ============================================================ */}
      <section id="cross-cultural-alliances" className="py-12 sm:py-16 bg-white dark:bg-stone-900 scroll-mt-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Handshake className="size-5 text-teal-700" />
              <span className="text-sm font-medium uppercase tracking-wider text-teal-700">
                {isEs ? "Alianzas" : "Alliances"}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100 sm:text-3xl">
              {isEs ? "Poderosas Coaliciones" : "Powerful Coalitions"}
            </h2>
            <p className="mt-3 text-stone-500 max-w-2xl mx-auto leading-relaxed">
              {isEs
                ? "El movimiento FQHC no fue construido por una sola comunidad. Fue forjado por poderosas coaliciones: campesinos filipinos y mexicanos, medicos judios y comunidades afroamericanas, conservadores rurales y activistas urbanos. Estas coaliciones son la razon por la que los FQHCs existen hoy."
                : "The FQHC movement was not built by a single community. It was forged by powerful coalitions: Filipino and Mexican farmworkers, Jewish physicians and African American communities, rural conservatives and urban activists. These coalitions are the reason FQHCs exist today."}
            </p>
          </div>

          <div className="space-y-4">
            {CROSS_CULTURAL_ALLIANCES.map((alliance) => (
              <AllianceCard
                key={alliance.id}
                alliance={alliance}
                locale={locale}
                isExpanded={expandedAlliance === alliance.id}
                onToggle={() =>
                  setExpandedAlliance(
                    expandedAlliance === alliance.id ? null : alliance.id
                  )
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Leaders to Watch                                             */}
      {/* ============================================================ */}
      <section id="movement-leaders" className="py-12 sm:py-16 bg-teal-50 dark:bg-teal-950 scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Users className="size-5 text-teal-700" />
              <span className="text-sm font-medium uppercase tracking-wider text-teal-700">
                {isEs ? "Lideres del Movimiento" : "Movement Leaders"}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100 sm:text-3xl">
              {isEs
                ? "Lideres que Estan Dando Forma al Futuro"
                : "Leaders Shaping the Future"}
            </h2>
            <p className="mt-3 text-stone-500 max-w-2xl mx-auto leading-relaxed">
              {isEs
                ? "Los ejecutivos, lideres de politica y directores de FQHC que estan llevando el movimiento hacia adelante. Conecta con ellos para mantenerte al dia con el futuro de la salud comunitaria."
                : "The executives, policy leaders, and FQHC directors carrying the movement forward. Connect with them to stay current on the future of community health."}
            </p>
          </div>

          {/* Leader cards grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {movementLeaders.map((leader) => (
              <div
                key={leader.id}
                className="rounded-xl border border-teal-100 dark:border-teal-800 bg-white dark:bg-stone-900 p-4 transition-all hover:shadow-sm hover:border-teal-200 dark:hover:border-teal-700"
              >
                <div className="flex items-start gap-3">
                  {/* Avatar initial */}
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900 text-sm font-bold text-teal-700 dark:text-teal-400">
                    {leader.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate">
                      {leader.name}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-1">
                      {t(leader.title, locale)}
                    </p>
                    <p className="text-xs text-teal-700 font-medium truncate">
                      {leader.organization}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-3">
                  {leader.linkedinUrl && (
                    <a
                      href={leader.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-800 px-2.5 py-1.5 text-xs font-medium text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                    >
                      <Linkedin className="size-3" />
                      LinkedIn
                    </a>
                  )}
                  <Link
                    href="/strategy/leaders"
                    className="inline-flex items-center gap-1 text-xs text-teal-700 hover:text-teal-900 hover:underline transition-colors"
                  >
                    {isEs ? "Ver perfil completo" : "View full profile"}
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Link to full leaders page */}
          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-teal-200 text-teal-700 hover:bg-teal-100"
              asChild
            >
              <Link href="/strategy/leaders">
                <Users className="size-4 mr-1.5" />
                {isEs
                  ? `Ver los ${THOUGHT_LEADERS.length} lideres`
                  : `View all ${THOUGHT_LEADERS.length} leaders`}
                <ArrowRight className="size-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  "We Are the Continuation" — Emotional Closing                */}
      {/* ============================================================ */}
      <section id="we-are-the-continuation" className="py-16 sm:py-20 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white scroll-mt-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="size-8 text-teal-400 mx-auto mb-4" />
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
            {isEs
              ? "Somos la Continuacion"
              : "We Are the Continuation"}
          </h2>

          <div className="mt-8 space-y-5 text-stone-300 text-base leading-relaxed sm:text-lg">
            <p>
              {isEs
                ? "Cada vez que una promotora conecta a un paciente con la atencion medica, ella continua el trabajo que Cesar Chavez comenzo en Delano. Cada vez que un trabajador comunitario de salud llama a una puerta en Watts o East Oakland, camina en las huellas de los Panteras Negras que abrieron clinicas gratuitas en esos mismos vecindarios."
                : "Every time a promotora connects a patient to care, she continues the work Cesar Chavez started in Delano. Every time a community health worker knocks on a door in Watts or East Oakland, they walk in the footsteps of the Black Panthers who opened free clinics in those same neighborhoods."}
            </p>
            <p>
              {isEs
                ? "Cada vez que un medico en un FQHC trata a un paciente indocumentado sin hacer preguntas, honra la vision del Dr. Jack Geiger, quien creyo que el hambre era una condicion medica y que la atencion medica no debia tener fronteras."
                : "Every time a physician at an FQHC treats an undocumented patient without asking questions, they honor the vision of Dr. Jack Geiger, who believed that hunger was a medical condition and that healthcare should have no borders."}
            </p>
            <p>
              {isEs
                ? "Cada vez que un administrador de FQHC lucha por mantener las puertas abiertas con financiamiento insuficiente, defiende lo que filipinos y mexicanos construyeron juntos en los campos de Delano, lo que medicos judios y activistas afroamericanos construyeron en Mississippi, lo que voluntarios asiaticos construyeron en el Chinatown de Oakland."
                : "Every time an FQHC administrator fights to keep the doors open on insufficient funding, they defend what Filipinos and Mexicans built together in the fields of Delano, what Jewish physicians and African American activists built in Mississippi, what Asian volunteers built in Oakland's Chinatown."}
            </p>
            <p className="text-teal-400 font-semibold text-lg sm:text-xl">
              {isEs
                ? "Este no es solo un trabajo. Es un movimiento. Y tu eres parte de el."
                : "This is not just a job. It is a movement. And you are part of it."}
            </p>
          </div>

          {/* Links */}
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="bg-teal-600 text-white hover:bg-teal-500"
              asChild
            >
              <Link href="/strategy/guides">
                <BookOpen className="size-4 mr-1.5" />
                {isEs ? "Guias Ejecutivas" : "Executive Guides"}
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href="/strategy/leaders">
                <Users className="size-4 mr-1.5" />
                {isEs ? "Lideres del Movimiento" : "Movement Leaders"}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA — Know Your History                                      */}
      {/* ============================================================ */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-teal-700 to-teal-800 p-8 sm:p-10 text-center text-white">
            <h2 className="text-xl font-extrabold sm:text-2xl lg:text-3xl">
              {isEs
                ? "Conoce tu historia. Forma el futuro."
                : "Know your history. Shape the future."}
            </h2>
            <p className="mt-3 text-teal-100 max-w-xl mx-auto leading-relaxed">
              {isEs
                ? "Los FQHCs nacieron de la lucha. Entender de donde venimos es la clave para defender lo que hemos construido -- y construir lo que viene."
                : "FQHCs were born from struggle. Understanding where we come from is the key to defending what we've built -- and building what comes next."}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <Link
                href="/strategy/guides"
                className="flex items-center justify-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm font-medium text-white hover:bg-white/20 transition-colors"
              >
                <BookOpen className="size-4" />
                {isEs ? "Guias Ejecutivas" : "Executive Guides"}
                <ArrowRight className="size-3.5" />
              </Link>
              <Link
                href="/strategy/leaders"
                className="flex items-center justify-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm font-medium text-white hover:bg-white/20 transition-colors"
              >
                <Users className="size-4" />
                {isEs ? "Lideres del Movimiento" : "Movement Leaders"}
                <ArrowRight className="size-3.5" />
              </Link>
              <Link
                href="/funding-impact"
                className="flex items-center justify-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm font-medium text-white hover:bg-white/20 transition-colors"
              >
                <Clock className="size-4" />
                {isEs ? "Impacto de Financiamiento" : "Funding Impact"}
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Content */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <RelatedContent items={STRATEGY_RELATED["movement"]} />
      </section>
    </div>
  );
}
