"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Calendar,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FileText,
  Globe,
  Handshake,
  Mail,
  MapPin,
  Megaphone,
  Phone,
  Scale,
  Search,
  Shield,
  Users,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  UNION_DIRECTORY,
  SEIU_CLINIC_WORKERS_UNITED,
  LABOR_TIMELINE,
  CURATED_RESOURCES,
  type UnionProfile,
  type LaborTimelineEvent,
  type CuratedResource,
} from "@/lib/union-data";

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function t(obj: { en: string; es: string }, locale: string): string {
  return locale === "es" ? obj.es : obj.en;
}

/* ------------------------------------------------------------------ */
/*  Union Card                                                          */
/* ------------------------------------------------------------------ */

function UnionCard({ union, locale }: { union: UnionProfile; locale: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-start justify-between gap-4 p-5 text-left"
      >
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-bold text-teal-800">{union.name}</h3>
            <Badge variant="outline" className={`text-xs ${union.logoColor}`}>
              {union.abbreviation}
            </Badge>
          </div>
          <p className="text-sm text-stone-500">
            {t(union.description, locale)}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 text-xs text-stone-500">
              <Users className="h-3 w-3" /> {union.membership}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-stone-500">
              <MapPin className="h-3 w-3" /> {union.headquartersCity}
            </span>
            {union.parentOrg && (
              <span className="inline-flex items-center gap-1 text-xs text-stone-500">
                <Building2 className="h-3 w-3" /> {union.parentOrg}
              </span>
            )}
          </div>
        </div>
        <div className="mt-1 flex-shrink-0">
          {expanded ? (
            <ChevronUp className="h-5 w-5 text-stone-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-stone-400" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-stone-100 px-5 pb-5 pt-4">
          {/* Roles Represented */}
          <div className="mb-4">
            <h4 className="mb-2 text-sm font-semibold text-stone-700">
              {locale === "es" ? "Roles Representados" : "Roles Represented"}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {union.rolesRepresented.map((role) => (
                <Badge
                  key={role}
                  variant="secondary"
                  className="bg-teal-50 text-teal-700"
                >
                  {role}
                </Badge>
              ))}
            </div>
          </div>

          {/* FQHCs Represented */}
          {union.fqhcsRepresented.length > 0 && (
            <div className="mb-4">
              <h4 className="mb-2 text-sm font-semibold text-stone-700">
                {locale === "es"
                  ? "FQHCs Representados en California"
                  : "California FQHCs Represented"}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {union.fqhcsRepresented.map((slug) => (
                  <Link
                    key={slug}
                    href={`/directory/${slug}`}
                    className="inline-flex items-center gap-1 rounded-md bg-stone-100 px-2 py-1 text-xs text-stone-700 transition-colors hover:bg-teal-50 hover:text-teal-700"
                  >
                    <Building2 className="h-3 w-3" />
                    {slug
                      .split("-")
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(" ")}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Recent News */}
          {union.recentNews.length > 0 && (
            <div className="mb-4">
              <h4 className="mb-2 text-sm font-semibold text-stone-700">
                {locale === "es" ? "Noticias Recientes" : "Recent News"}
              </h4>
              <div className="space-y-2">
                {union.recentNews.map((news, i) => (
                  <div key={i} className="rounded-lg bg-stone-50 p-3">
                    <p className="text-sm font-medium text-stone-800">
                      {t(news.title, locale)}
                    </p>
                    <p className="mt-1 text-xs text-stone-500">
                      {t(news.summary, locale)}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-stone-400">
                      <Calendar className="h-3 w-3" />
                      {new Date(news.date + "T00:00:00").toLocaleDateString(
                        locale === "es" ? "es-US" : "en-US",
                        { year: "numeric", month: "short" }
                      )}
                      <a
                        href={news.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto inline-flex items-center gap-1 text-teal-600 hover:text-teal-800"
                      >
                        {news.sourceTitle}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact & Links */}
          <div className="flex flex-wrap gap-2">
            <a
              href={union.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md bg-teal-50 px-3 py-1.5 text-xs font-medium text-teal-700 transition-colors hover:bg-teal-100"
            >
              <Globe className="h-3 w-3" />
              {locale === "es" ? "Sitio Web" : "Website"}
            </a>
            {union.organizeUrl && (
              <a
                href={union.organizeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 transition-colors hover:bg-amber-100"
              >
                <Handshake className="h-3 w-3" />
                {locale === "es" ? "Organizarse" : "Organize"}
              </a>
            )}
            {union.contactPhone && (
              <a
                href={`tel:${union.contactPhone}`}
                className="inline-flex items-center gap-1 rounded-md bg-stone-100 px-3 py-1.5 text-xs text-stone-600 transition-colors hover:bg-stone-200"
              >
                <Phone className="h-3 w-3" />
                {union.contactPhone}
              </a>
            )}
            {union.contactEmail && (
              <a
                href={`mailto:${union.contactEmail}`}
                className="inline-flex items-center gap-1 rounded-md bg-stone-100 px-3 py-1.5 text-xs text-stone-600 transition-colors hover:bg-stone-200"
              >
                <Mail className="h-3 w-3" />
                {locale === "es" ? "Correo" : "Email"}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Timeline Event                                                      */
/* ------------------------------------------------------------------ */

const categoryIcons: Record<string, typeof Scale> = {
  founding: Building2,
  strike: Megaphone,
  legislation: Scale,
  organizing: Handshake,
  civil_rights: Shield,
  milestone: Calendar,
};

const categoryColors: Record<string, string> = {
  founding: "bg-blue-100 text-blue-800",
  strike: "bg-red-100 text-red-800",
  legislation: "bg-teal-100 text-teal-800",
  organizing: "bg-amber-100 text-amber-800",
  civil_rights: "bg-purple-100 text-purple-800",
  milestone: "bg-stone-100 text-stone-800",
};

function TimelineEvent({
  event,
  locale,
}: {
  event: LaborTimelineEvent;
  locale: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const Icon = categoryIcons[event.category] || Calendar;

  return (
    <div className="relative flex gap-4 pb-8 last:pb-0">
      {/* Timeline line */}
      <div className="absolute left-5 top-10 bottom-0 w-px bg-stone-200 last:hidden" />

      {/* Icon */}
      <div
        className={`relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${categoryColors[event.category]}`}
      >
        <Icon className="h-5 w-5" />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-amber-600">
              {event.year}
            </span>
            <Badge
              variant="outline"
              className={`text-[10px] ${categoryColors[event.category]}`}
            >
              {event.category.replace("_", " ")}
            </Badge>
            {event.region !== "national" && (
              <Badge variant="outline" className="text-[10px]">
                {event.region === "california" ? "CA" : "FQHC"}
              </Badge>
            )}
          </div>
          <h4 className="mt-1 text-sm font-semibold text-stone-800">
            {t(event.title, locale)}
          </h4>
          <p className="mt-0.5 text-xs text-stone-500">
            {t(event.description, locale)}
          </p>
        </button>

        {expanded && (
          <div className="mt-2 rounded-lg bg-stone-50 p-3">
            <p className="text-xs font-medium text-teal-700">
              {locale === "es" ? "Importancia:" : "Significance:"}
            </p>
            <p className="mt-1 text-xs text-stone-600">
              {t(event.significance, locale)}
            </p>
            {event.sources.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {event.sources.map((src, i) => (
                  <a
                    key={i}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] text-teal-600 hover:text-teal-800"
                  >
                    <ExternalLink className="h-2.5 w-2.5" />
                    {src.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Resource Card                                                       */
/* ------------------------------------------------------------------ */

const resourceTypeIcons: Record<string, typeof BookOpen> = {
  book: BookOpen,
  article: FileText,
  documentary: Video,
  website: Globe,
  archive: Building2,
};

function ResourceCard({
  resource,
  locale,
}: {
  resource: CuratedResource;
  locale: string;
}) {
  const Icon = resourceTypeIcons[resource.type] || BookOpen;

  return (
    <a
      href={resource.url || "#"}
      target={resource.url ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="block rounded-xl border border-stone-200 bg-white p-4 shadow-sm transition-all hover:border-teal-200 hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-stone-100">
          <Icon className="h-4 w-4 text-stone-500" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-semibold text-stone-800">
            {resource.title}
          </h4>
          <p className="mt-0.5 text-xs text-stone-500">
            {resource.author} · {resource.year}
          </p>
          <p className="mt-1 text-xs text-stone-500">
            {t(resource.description, locale)}
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            <Badge
              variant="outline"
              className="text-[10px] capitalize"
            >
              {resource.type}
            </Badge>
            {resource.featured && (
              <Badge className="bg-amber-100 text-amber-800 text-[10px]">
                {locale === "es" ? "Destacado" : "Featured"}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                           */
/* ------------------------------------------------------------------ */

export default function UnionsPage() {
  const locale = useLocale();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"directory" | "timeline" | "resources">("directory");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [resourceTypeFilter, setResourceTypeFilter] = useState<string>("all");

  // Filter unions by search
  const filteredUnions = UNION_DIRECTORY.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.abbreviation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.rolesRepresented.some((r) =>
        r.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Filter timeline by category
  const filteredTimeline =
    categoryFilter === "all"
      ? LABOR_TIMELINE
      : LABOR_TIMELINE.filter((e) => e.category === categoryFilter);

  // Filter resources by type
  const filteredResources =
    resourceTypeFilter === "all"
      ? CURATED_RESOURCES
      : CURATED_RESOURCES.filter((r) => r.type === resourceTypeFilter);

  const tabs = [
    { id: "directory" as const, label: locale === "es" ? "Directorio" : "Directory", icon: Building2 },
    { id: "timeline" as const, label: locale === "es" ? "Historia" : "History", icon: Calendar },
    { id: "resources" as const, label: locale === "es" ? "Recursos" : "Resources", icon: BookOpen },
  ];

  const timelineCategories = [
    { value: "all", label: locale === "es" ? "Todos" : "All" },
    { value: "founding", label: locale === "es" ? "Fundaciones" : "Founding" },
    { value: "strike", label: locale === "es" ? "Huelgas" : "Strikes" },
    { value: "legislation", label: locale === "es" ? "Legislación" : "Legislation" },
    { value: "organizing", label: locale === "es" ? "Organización" : "Organizing" },
    { value: "civil_rights", label: locale === "es" ? "Derechos Civiles" : "Civil Rights" },
    { value: "milestone", label: locale === "es" ? "Hitos" : "Milestones" },
  ];

  const resourceTypes = [
    { value: "all", label: locale === "es" ? "Todos" : "All" },
    { value: "book", label: locale === "es" ? "Libros" : "Books" },
    { value: "article", label: locale === "es" ? "Artículos" : "Articles" },
    { value: "documentary", label: locale === "es" ? "Documentales" : "Documentaries" },
    { value: "website", label: locale === "es" ? "Sitios Web" : "Websites" },
    { value: "archive", label: locale === "es" ? "Archivos" : "Archives" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-800 via-teal-900 to-stone-900 py-16 md:py-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative mx-auto max-w-5xl px-4 text-center">
          <Badge className="mb-4 bg-amber-500/20 text-amber-300">
            <Shield className="mr-1 h-3 w-3" />
            {locale === "es" ? "Derechos Laborales" : "Worker Power"}
          </Badge>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            {locale === "es"
              ? "Sindicatos y Movimiento Laboral en Salud Comunitaria"
              : "Unions & Labor Movement in Community Health"}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-teal-100">
            {locale === "es"
              ? "Directorio de sindicatos que representan a trabajadores de FQHCs en California, historia del movimiento laboral en salud, y recursos curados."
              : "Directory of unions representing FQHC workers in California, healthcare labor movement history, and curated resources."}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-sm text-teal-100">
              <Building2 className="h-3.5 w-3.5" />
              {UNION_DIRECTORY.length}{" "}
              {locale === "es" ? "sindicatos" : "unions"}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-sm text-teal-100">
              <Calendar className="h-3.5 w-3.5" />
              {LABOR_TIMELINE.length}{" "}
              {locale === "es" ? "eventos históricos" : "historic events"}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-sm text-teal-100">
              <BookOpen className="h-3.5 w-3.5" />
              {CURATED_RESOURCES.length}{" "}
              {locale === "es" ? "recursos" : "resources"}
            </span>
          </div>
        </div>
      </section>

      {/* ── Coalition Banner ── */}
      <section className="border-b border-stone-200 bg-amber-50 py-6">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-amber-100">
              <Handshake className="h-6 w-6 text-amber-700" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-stone-800">
                {SEIU_CLINIC_WORKERS_UNITED.name}
              </h2>
              <p className="mt-0.5 text-sm text-stone-600">
                {t(SEIU_CLINIC_WORKERS_UNITED.description, locale)}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {SEIU_CLINIC_WORKERS_UNITED.achievements.map((a, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="bg-white text-xs"
                  >
                    {a.year}: {t(a.title, locale)}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tabs ── */}
      <div className="sticky top-0 z-20 border-b border-stone-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-4">
          <nav className="flex gap-1 overflow-x-auto py-2">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-teal-50 text-teal-800"
                      : "text-stone-500 hover:bg-stone-50 hover:text-stone-700"
                  }`}
                >
                  <TabIcon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* ══════════════════════════════════════════════════ */}
        {/*  DIRECTORY TAB                                     */}
        {/* ══════════════════════════════════════════════════ */}
        {activeTab === "directory" && (
          <div>
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder={
                    locale === "es"
                      ? "Buscar sindicatos, roles..."
                      : "Search unions, roles..."
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pl-10 pr-4 text-sm text-stone-800 placeholder-stone-400 shadow-sm transition-colors focus:border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-100"
                />
              </div>
            </div>

            {/* Union Cards */}
            <div className="space-y-4">
              {filteredUnions.map((union) => (
                <UnionCard key={union.id} union={union} locale={locale} />
              ))}
              {filteredUnions.length === 0 && (
                <div className="rounded-xl border border-stone-200 bg-white p-8 text-center">
                  <p className="text-sm text-stone-500">
                    {locale === "es"
                      ? "No se encontraron sindicatos que coincidan con tu búsqueda."
                      : "No unions found matching your search."}
                  </p>
                </div>
              )}
            </div>

            {/* Know Your Rights CTA */}
            <div className="mt-8 rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-teal-100/50 p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-teal-800">
                    {locale === "es"
                      ? "Conoce Tus Derechos"
                      : "Know Your Rights"}
                  </h3>
                  <p className="mt-1 text-sm text-teal-700">
                    {locale === "es"
                      ? "Todos los trabajadores de salud en California tienen derecho a organizarse. Contacta a un sindicato para aprender más sobre tus opciones."
                      : "All healthcare workers in California have the right to organize. Contact a union to learn more about your options."}
                  </p>
                </div>
                <a
                  href="https://www.nlrb.gov/about-nlrb/rights-we-protect/the-law/employees/your-rights-during-union-organizing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-teal-700 text-white hover:bg-teal-800">
                    {locale === "es" ? "Derechos NLRB" : "NLRB Rights"}
                    <ExternalLink className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════ */}
        {/*  TIMELINE TAB                                      */}
        {/* ══════════════════════════════════════════════════ */}
        {activeTab === "timeline" && (
          <div>
            {/* Category Filter */}
            <div className="mb-6 flex flex-wrap gap-1.5">
              {timelineCategories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategoryFilter(cat.value)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    categoryFilter === cat.value
                      ? "bg-teal-100 text-teal-800"
                      : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Timeline */}
            <div className="ml-1">
              {filteredTimeline.map((event) => (
                <TimelineEvent key={event.id} event={event} locale={locale} />
              ))}
            </div>

            {/* Learn More CTA */}
            <div className="mt-8 rounded-xl border border-stone-200 bg-white p-6 text-center">
              <p className="text-sm text-stone-600">
                {locale === "es"
                  ? "Explora la línea de tiempo completa de la historia de la salud y Medicaid en EE.UU."
                  : "Explore the full US healthcare and Medicaid history timeline."}
              </p>
              <Link href="/healthcare-timeline">
                <Button
                  variant="outline"
                  className="mt-3 border-teal-200 text-teal-700 hover:bg-teal-50"
                >
                  {locale === "es"
                    ? "Ver Línea de Tiempo Completa"
                    : "View Full Healthcare Timeline"}
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════ */}
        {/*  RESOURCES TAB                                     */}
        {/* ══════════════════════════════════════════════════ */}
        {activeTab === "resources" && (
          <div>
            {/* Type Filter */}
            <div className="mb-6 flex flex-wrap gap-1.5">
              {resourceTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setResourceTypeFilter(type.value)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    resourceTypeFilter === type.value
                      ? "bg-teal-100 text-teal-800"
                      : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {/* Resource Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  locale={locale}
                />
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div className="rounded-xl border border-stone-200 bg-white p-8 text-center">
                <p className="text-sm text-stone-500">
                  {locale === "es"
                    ? "No se encontraron recursos de este tipo."
                    : "No resources found for this type."}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Bottom CTA ── */}
      <section className="border-t border-stone-200 bg-stone-50 py-10">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-xl font-bold text-stone-800">
            {locale === "es"
              ? "¿Buscando empleo en salud comunitaria?"
              : "Looking for a community health career?"}
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-stone-600">
            {locale === "es"
              ? "Explora 165 puestos en FQHCs de California y construye tu currículum gratis."
              : "Explore 165 positions at California FQHCs and build your resume for free."}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Link href="/jobs">
              <Button className="bg-teal-700 text-white hover:bg-teal-800">
                {locale === "es" ? "Ver Empleos" : "Browse Jobs"}
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </Link>
            <Link href="/resume-builder">
              <Button
                variant="outline"
                className="border-teal-200 text-teal-700 hover:bg-teal-50"
              >
                {locale === "es"
                  ? "Construir Currículum"
                  : "Build Your Resume"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
