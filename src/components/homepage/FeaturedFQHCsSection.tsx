"use client";

import {
  ArrowRight,
  Star,
  MapPin,
  Building2,
  Users,
  Activity,
  Shield,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import type { FeaturedFQHCData } from "./HomepageDashboard";
import type { MarketOverview } from "@/lib/market-intelligence";

interface FeaturedFQHCsSectionProps {
  featuredFQHCs: FeaturedFQHCData[];
  overview: MarketOverview;
}

export function FeaturedFQHCsSection({
  featuredFQHCs,
  overview,
}: FeaturedFQHCsSectionProps) {
  const locale = useLocale();
  const isEs = locale === "es";

  return (
    <section className="bg-white py-12 sm:py-16 border-t border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
            {isEs
              ? "FQHCs Destacados de California"
              : "Featured California FQHCs"}
          </h2>
          <p className="mt-3 text-stone-500">
            {isEs
              ? `Directorio de ${overview.totalFQHCs} centros de salud comunitarios con valoraciones, empleos y programas.`
              : `Directory of ${overview.totalFQHCs} community health centers with ratings, jobs, and programs.`}
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredFQHCs.map((fqhc) => {
            const gradeColor =
              fqhc.resilienceGrade === "A"
                ? "bg-emerald-100 text-emerald-800"
                : fqhc.resilienceGrade === "B"
                  ? "bg-teal-100 text-teal-800"
                  : fqhc.resilienceGrade === "C"
                    ? "bg-amber-100 text-amber-800"
                    : fqhc.resilienceGrade === "D"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-red-100 text-red-800";

            return (
              <Link
                key={fqhc.slug}
                href={`/directory/${fqhc.slug}` as "/directory"}
                className="group rounded-2xl border border-stone-200 bg-stone-50 p-6 transition-all hover:-translate-y-1 hover:border-teal-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-stone-900 group-hover:text-teal-700">
                      {fqhc.name}
                    </h3>
                    <p className="mt-1 flex items-center gap-1 text-sm text-stone-500">
                      <MapPin className="size-3.5" />
                      {fqhc.city}, CA
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {fqhc.glassdoorRating && (
                      <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1">
                        <Star className="size-3.5 fill-amber-500 text-amber-500" />
                        <span className="text-sm font-semibold text-amber-700">
                          {fqhc.glassdoorRating.toFixed(1)}
                        </span>
                      </div>
                    )}
                    <div
                      className={`flex items-center gap-1 rounded-lg px-2 py-1 ${gradeColor}`}
                      title={
                        isEs
                          ? "Puntuacion de Resiliencia"
                          : "Resilience Score"
                      }
                    >
                      <Shield className="size-3.5" />
                      <span className="text-sm font-semibold">
                        {fqhc.resilienceGrade}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-4 text-xs text-stone-500">
                  <span className="flex items-center gap-1">
                    <Building2 className="size-3.5" />
                    {fqhc.siteCount} {isEs ? "sitios" : "sites"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="size-3.5" />
                    {fqhc.staffCount} {isEs ? "personal" : "staff"}
                  </span>
                  <span className="flex items-center gap-1 text-teal-600">
                    <Activity className="size-3.5" />
                    {fqhc.resilienceOverall}/100
                  </span>
                </div>

                <p className="mt-3 text-xs font-medium text-teal-700 opacity-0 transition-opacity group-hover:opacity-100">
                  {isEs ? "Ver perfil" : "View profile"}{" "}
                  <ArrowRight className="inline size-3" />
                </p>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button variant="outline" size="lg" asChild>
            <Link href="/directory">
              {isEs
                ? `Ver los ${overview.totalFQHCs} FQHCs`
                : `View All ${overview.totalFQHCs} FQHCs`}{" "}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/strategy/resilience">
              <Shield className="size-4" />
              {isEs
                ? "Scorecard de Resiliencia"
                : "Resilience Scorecard"}{" "}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
