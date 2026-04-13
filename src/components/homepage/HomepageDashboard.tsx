// FQHC Talent — Homepage (Focused Landing Page)
"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { ExecutiveDashboard } from "./ExecutiveDashboard";
import { JobSeekerDashboard } from "./JobSeekerDashboard";
import { HeroSection } from "./HeroSection";
import { LeaderPathSection } from "./LeaderPathSection";
import { JobSeekerPathSection } from "./JobSeekerPathSection";
import { TrustStrip } from "./TrustStrip";
import { NewsletterCTASection } from "./NewsletterCTASection";
import type { FundingCliff } from "@/lib/market-intelligence";
import type { IntelBriefItem } from "@/components/intel/IntelBriefPDF";

/* ================================================================== */
/*  Types                                                              */
/* ================================================================== */

/** All data the homepage needs, pre-computed on the server */
export interface HomepageData {
  totalFQHCs: number;
  totalJobs: number;
  totalOrgs: number;
  totalIntel: number;
  totalSalaryRoles: number;
  nextCliff: FundingCliff | null;
  topIntelHeadline: { en: string; es: string };
  topIntelSource: string;
  /** Serialized intel items for PDF export */
  intelBriefItems: IntelBriefItem[];
  /** Advocacy watch — upcoming actions with follow-up dates */
  advocacyItems?: {
    id: string;
    headline: { en: string; es: string };
    status: string;
    followUpDate: string | null;
    region: string;
  }[];
  advocacyCounts?: { total: number; active: number; pendingVote: number; upcoming: number };
}

/* ================================================================== */
/*  Advocacy Watch Strip                                               */
/* ================================================================== */

function AdvocacyStrip({ items, counts }: {
  items: NonNullable<HomepageData["advocacyItems"]>;
  counts: NonNullable<HomepageData["advocacyCounts"]>;
}) {
  const locale = useLocale();
  const isEs = locale === "es";

  const daysUntil = (d: string) => Math.max(0, Math.ceil((new Date(d).getTime() - Date.now()) / 86400000));

  return (
    <section className="border-y border-amber-200 bg-amber-50 px-6 py-8 dark:border-amber-800 dark:bg-amber-950/30">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-bold text-stone-900 dark:text-stone-100">
            <span className="size-2 animate-pulse rounded-full bg-teal-500" />
            {isEs ? "Seguimiento de Abogac\u00eda" : "Advocacy Watch"}
          </h2>
          <Link href={"/strategy/advocacy" as "/strategy/guides"} className="text-sm font-medium text-teal-700 hover:text-teal-900 dark:text-teal-400 dark:hover:text-teal-300">
            {isEs ? "Ver todo" : "View all"} ({counts.total}) &rarr;
          </Link>
        </div>

        <div className="mb-3 flex gap-4 text-sm">
          <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800">{counts.active} {isEs ? "activas" : "active"}</span>
          {counts.pendingVote > 0 && <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">{counts.pendingVote} {isEs ? "votos pendientes" : "pending votes"}</span>}
          <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700">{counts.upcoming} {isEs ? "seguimientos pr\u00f3ximos" : "upcoming follow-ups"}</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const days = item.followUpDate ? daysUntil(item.followUpDate) : null;
            return (
              <Link
                key={item.id}
                href={"/strategy/advocacy" as "/strategy/guides"}
                className="flex items-center gap-3 rounded-lg border border-amber-200 bg-white p-3 transition-colors hover:border-teal-300 dark:border-amber-800 dark:bg-stone-800 dark:hover:border-teal-600"
              >
                {days !== null && (
                  <div className={`shrink-0 text-center ${days <= 14 ? "text-red-600" : "text-amber-600"}`}>
                    <p className="text-xl font-bold">{days}</p>
                    <p className="text-xs">{isEs ? "d\u00edas" : "days"}</p>
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-stone-800 dark:text-stone-200">
                    {isEs ? item.headline.es : item.headline.en}
                  </p>
                  <p className="text-xs text-stone-400">{item.region}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */

export function HomepageDashboard({ data }: { data: HomepageData }) {
  const { user, profile } = useAuth();
  const isExecutive = profile?.role === "executive" || profile?.role === "manager";

  return (
    <div className="min-h-screen">
      {/* Personalized dashboards for logged-in users */}
      {user && isExecutive && <ExecutiveDashboard />}
      {user && !isExecutive && <JobSeekerDashboard />}

      {/* 1. Hero with two-path CTA split */}
      <HeroSection
        totalFQHCs={data.totalFQHCs}
        totalJobs={data.totalJobs}
        totalIntel={data.totalIntel}
      />

      {/* 2. For FQHC Leaders */}
      <LeaderPathSection
        nextCliff={data.nextCliff}
        topIntelHeadline={data.topIntelHeadline}
        topIntelSource={data.topIntelSource}
        totalFQHCs={data.totalFQHCs}
        intelBriefItems={data.intelBriefItems}
      />

      {/* 2.5 Advocacy Watch strip */}
      {data.advocacyItems && data.advocacyItems.length > 0 && data.advocacyCounts && (
        <AdvocacyStrip items={data.advocacyItems} counts={data.advocacyCounts} />
      )}

      {/* 3. For Job Seekers */}
      <JobSeekerPathSection
        totalJobs={data.totalJobs}
        totalOrgs={data.totalOrgs}
        totalSalaryRoles={data.totalSalaryRoles}
      />

      {/* 4. Trust strip */}
      <TrustStrip
        totalFQHCs={data.totalFQHCs}
        totalJobs={data.totalJobs}
        totalIntel={data.totalIntel}
      />

      {/* 5. Newsletter CTA */}
      <NewsletterCTASection />

      {/* Data disclaimer */}
      <div className="bg-stone-50 px-4 py-4 text-center text-xs text-stone-400">
        Data aggregated from HRSA, BLS, CA EDD WARN Act, DHCS, and FQHC job postings. Updated March 2026.
      </div>
    </div>
  );
}
