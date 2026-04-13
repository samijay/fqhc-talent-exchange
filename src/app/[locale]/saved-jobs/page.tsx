"use client";

import { useMemo } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Bookmark,
  Briefcase,
  Building2,
  DollarSign,
  MapPin,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSavedJobs } from "@/components/jobs/SaveJobButton";
import { fqhcJobListings } from "@/lib/fqhc-job-listings";
import { californiaFQHCs } from "@/lib/california-fqhcs";
import { Breadcrumb as Breadcrumbs, PageHero } from "@/components/ui/design-system";

const fqhcMap = new Map(californiaFQHCs.map((f) => [f.slug, f]));

function formatSalary(min: number, max: number) {
  const fmt = (n: number) =>
    "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  return `${fmt(min)} – ${fmt(max)}`;
}

export default function SavedJobsPage() {
  const locale = useLocale();
  const isEs = locale === "es";
  const { ids, remove } = useSavedJobs();

  const savedJobs = useMemo(() => {
    const idSet = new Set(ids);
    return fqhcJobListings
      .filter((j) => idSet.has(j.id))
      .map((j) => {
        const fqhc = fqhcMap.get(j.fqhcSlug);
        return { ...j, orgName: fqhc?.name ?? j.fqhcSlug, careersUrl: fqhc?.careersUrl ?? null };
      });
  }, [ids]);

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs
          items={[
            { label: isEs ? "Inicio" : "Home", href: "/" },
            { label: isEs ? "Empleos" : "Jobs", href: "/jobs" },
            { label: isEs ? "Guardados" : "Saved Jobs" },
          ]}
        />
      </div>

      <PageHero
        title={{ en: "Saved Jobs", es: "Empleos Guardados" }}
        meta={isEs
          ? `${savedJobs.length} ${savedJobs.length === 1 ? "posición guardada" : "posiciones guardadas"}`
          : `${savedJobs.length} saved ${savedJobs.length === 1 ? "position" : "positions"}`}
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        {savedJobs.length === 0 ? (
          /* Empty state */
          <div className="text-center py-16">
            <Bookmark className="mx-auto size-12 text-stone-300 mb-4" />
            <h2 className="text-lg font-semibold text-stone-700 mb-2">
              {isEs ? "No hay empleos guardados" : "No saved jobs yet"}
            </h2>
            <p className="text-sm text-stone-500 mb-6 max-w-md mx-auto">
              {isEs
                ? "Navega los empleos y toca el icono de marcador para guardar posiciones que te interesen."
                : "Browse jobs and tap the bookmark icon to save positions you're interested in."}
            </p>
            <Button asChild className="bg-teal-700 text-white hover:bg-teal-800">
              <Link href="/jobs">
                <Briefcase className="size-4 mr-2" />
                {isEs ? "Explorar Empleos" : "Browse Jobs"}
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
          </div>
        ) : (
          /* Saved jobs list */
          <div className="space-y-3">
            {savedJobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center gap-4 rounded-xl border border-stone-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-semibold text-stone-900 truncate">
                      {job.title}
                    </h3>
                    <Badge className="bg-stone-100 text-stone-600 text-xs shrink-0">
                      {job.type}
                    </Badge>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-stone-500 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Building2 className="size-3" />
                      {job.orgName}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3" />
                      {job.location}, CA
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="size-3" />
                      {formatSalary(job.salaryMin, job.salaryMax)}
                    </span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    <Badge className="bg-teal-50 text-teal-800 text-xs">
                      {job.department}
                    </Badge>
                    {job.bilingual && (
                      <Badge className="bg-amber-50 text-amber-700 text-xs">
                        {isEs ? "Bilingue" : "Bilingual"}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* View Position */}
                  <Button
                    size="sm"
                    className="bg-teal-700 text-white hover:bg-teal-800 text-xs"
                    asChild
                  >
                    {job.careersUrl ? (
                      <a href={job.careersUrl} target="_blank" rel="noopener noreferrer">
                        {isEs ? "Ver" : "View"}
                        <ArrowRight className="size-3 ml-1" />
                      </a>
                    ) : (
                      <Link href={`/directory/${job.fqhcSlug}` as "/directory"}>
                        {isEs ? "Ver" : "View"}
                        <ArrowRight className="size-3 ml-1" />
                      </Link>
                    )}
                  </Button>

                  {/* Remove */}
                  <button
                    onClick={() => remove(job.id)}
                    className="rounded-lg p-2 text-stone-400 transition-colors hover:bg-red-50 hover:text-red-500"
                    title={isEs ? "Eliminar" : "Remove"}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Browse more CTA */}
            <div className="text-center pt-4">
              <Button variant="outline" asChild>
                <Link href="/jobs">
                  <Briefcase className="size-4 mr-2" />
                  {isEs ? "Explorar Más Empleos" : "Browse More Jobs"}
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
