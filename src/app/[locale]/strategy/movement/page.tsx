// FQHC Movement: California's Story — History, cross-cultural alliances, emotional narrative
"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  ChevronDown,
  Clock,
  ExternalLink,
  Handshake,
  Heart,
  LinkIcon,
  Sparkles,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MOVEMENT_EVENTS,
  MOVEMENT_ERAS,
  CROSS_CULTURAL_ALLIANCES,
  MOVEMENT_LAST_UPDATED,
} from "@/lib/fqhc-movement-history";
import { MovementTimeline } from "@/components/viz/MovementTimeline";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

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
  "Urban underserved communities": "bg-indigo-100 text-indigo-800 border-indigo-200",
  "Agricultural workers": "bg-lime-100 text-lime-800 border-lime-200",
};

function communityChip(community: string) {
  const color =
    COMMUNITY_COLORS[community] ||
    "bg-stone-100 text-stone-700 border-stone-200";
  return (
    <span
      key={community}
      className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${color}`}
    >
      {community}
    </span>
  );
}

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
    <div className="rounded-2xl border border-stone-200 bg-white transition-all hover:shadow-sm">
      {/* Header — always visible */}
      <button
        onClick={onToggle}
        className="w-full text-left p-5 sm:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-base font-bold text-stone-900 leading-snug sm:text-lg">
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
            className={`size-5 text-stone-400 flex-shrink-0 mt-1 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Preview when collapsed */}
        {!isExpanded && (
          <p className="mt-3 text-sm text-stone-500 line-clamp-2">
            {t(alliance.description, locale)}
          </p>
        )}
      </button>

      {/* Expanded body */}
      {isExpanded && (
        <div className="px-5 pb-5 sm:px-6 sm:pb-6 space-y-4 border-t border-stone-100 pt-4">
          {/* Full description */}
          <p className="text-sm text-stone-600 leading-relaxed">
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
                    className="rounded-lg bg-stone-50 border border-stone-100 p-3"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-teal-100 text-[10px] font-bold text-teal-700">
                        {person.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-stone-900">
                          {person.name}
                        </span>
                        <span className="text-xs text-stone-500 ml-1.5">
                          {person.background}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      {t(person.contribution, locale)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Relevance to modern FQHCs */}
          <div className="rounded-lg bg-teal-50 border border-teal-200 p-4">
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

  // Transform data for the timeline component
  // Events and eras from data file are already the correct types
  const timelineEvents = MOVEMENT_EVENTS;
  const timelineEras = MOVEMENT_ERAS;

  return (
    <div className="bg-stone-50">
      {/* ============================================================ */}
      {/*  Hero                                                         */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="bg-teal-900/50 text-teal-300 border-teal-700/50 mb-4">
            <Heart className="size-3 mr-1" />
            {isEs ? "Historia del Movimiento" : "Movement History"}
          </Badge>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
            {isEs ? "El Movimiento FQHC" : "The FQHC Movement"}
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-stone-300 leading-relaxed sm:text-xl">
            {isEs
              ? "Desde las clinicas campesinas hasta hoy -- la historia de los centros de salud comunitarios de California. Sesenta anos de lucha, alianzas inesperadas y la promesa de que la salud es un derecho, no un privilegio."
              : "From farmworker clinics to today -- the story of California's community health centers. Sixty years of struggle, unexpected alliances, and the promise that healthcare is a right, not a privilege."}
          </p>

          <p className="mt-6 text-sm text-teal-400 font-medium italic">
            {isEs
              ? "\"Somos la continuacion de un movimiento.\""
              : "\"We are the continuation of a movement.\""}
          </p>

          <p className="mt-4 text-xs text-stone-500">
            {isEs ? "Ultima actualizacion" : "Last updated"}: {MOVEMENT_LAST_UPDATED}
          </p>
        </div>
      </section>

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

      {/* ============================================================ */}
      {/*  Interactive Timeline                                         */}
      {/* ============================================================ */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-stone-900 sm:text-3xl">
              {isEs ? "Linea del Tiempo del Movimiento" : "Movement Timeline"}
            </h2>
            <p className="mt-2 text-stone-500 max-w-2xl mx-auto">
              {isEs
                ? "Explora los momentos clave que construyeron la red de salud comunitaria mas grande del pais. Haz clic en cualquier era o evento para ver la historia completa."
                : "Explore the defining moments that built the nation's largest community health network. Click any era or event to see the full story."}
            </p>
          </div>

          <MovementTimeline events={timelineEvents} eras={timelineEras} />
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Cross-Cultural Alliances                                     */}
      {/* ============================================================ */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Handshake className="size-5 text-teal-700" />
              <span className="text-sm font-medium uppercase tracking-wider text-teal-700">
                {isEs ? "Alianzas" : "Alliances"}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-stone-900 sm:text-3xl">
              {isEs ? "Aliados Inesperados" : "Unexpected Allies"}
            </h2>
            <p className="mt-3 text-stone-500 max-w-2xl mx-auto leading-relaxed">
              {isEs
                ? "El movimiento FQHC no fue construido por una sola comunidad. Fue forjado por alianzas improbables: campesinos filipinos y mexicanos, medicos judios y comunidades afroamericanas, conservadores rurales y activistas urbanos. Estas alianzas son la razon por la que los FQHCs existen hoy."
                : "The FQHC movement was not built by a single community. It was forged by improbable alliances: Filipino and Mexican farmworkers, Jewish physicians and African American communities, rural conservatives and urban activists. These alliances are the reason FQHCs exist today."}
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
      {/*  "We Are the Continuation" — Emotional Closing                */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white">
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
    </div>
  );
}
