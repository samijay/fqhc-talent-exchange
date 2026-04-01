"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import {
  Sparkles,
  Radio,
  Database,
  Filter,
  ArrowRight,
} from "lucide-react";

type UpdateCategory = "feature" | "intel" | "data";

interface Update {
  date: string;
  title: string;
  description: string;
  category: UpdateCategory;
}

const UPDATES: Update[] = [
  {
    date: "2026-04-01",
    title: "Global Search, RSS Feeds & 50+ Enhancements",
    description:
      "Cmd+K site-wide search, blog and intel RSS feeds, breadcrumbs with JSON-LD schema, dynamic OG images, reading progress bar, back-to-top button, and strategic cross-linking across all pages.",
    category: "feature",
  },
  {
    date: "2026-04-01",
    title: "Salary Report PDF & Intel Brief Export",
    description:
      "Downloadable 2026 California FQHC Salary & Workforce Report with 46 roles across 9 regions. Intel brief PDF export from the homepage feed.",
    category: "feature",
  },
  {
    date: "2026-04-01",
    title: "Directory 100x Enhancement",
    description:
      "28 directory improvements including server/client split, resilience grades on every listing, salary bars, peer comparison, compare tool, CSV export, size filters, and auto mobile card view.",
    category: "feature",
  },
  {
    date: "2026-03-31",
    title: "Daily Update #28 — NACHC $7B Uncompensated Care Warning",
    description:
      "5 new intel items including NACHC's $7B/year uncompensated care estimate, UCI Health pediatric closure, and Kaufman Hall's 1-in-5 CA hospitals at risk finding.",
    category: "intel",
  },
  {
    date: "2026-03-25",
    title: "Daily Update #29 — LA Staffing Gap + Central Valley Scan",
    description:
      "New intel items from regional scan covering the LAO staffing gap analysis and Central Valley workforce developments.",
    category: "intel",
  },
  {
    date: "2026-03-20",
    title: "FQHC Technology Stack Guide",
    description:
      "28 vendors across 12 categories — EHR, RCM, HR/Payroll, Cybersecurity, and more. FQHC fit badges, pricing ranges, NACHC partnerships, EHR compatibility matrix, and sample stack profiles for small, medium, and large FQHCs.",
    category: "feature",
  },
  {
    date: "2026-03-18",
    title: "Code Quality Sprint — Zero Lint Errors",
    description:
      "Full lint cleanup across 107 files: 228 errors and 218 warnings resolved. Includes Link component migration, hydration pattern fixes, and unused import cleanup.",
    category: "feature",
  },
  {
    date: "2026-03-17",
    title: "Salary Benchmark Overhaul + 9 New Roles",
    description:
      "Fixed SB 525 compliance for 8 entry-level salaries. Added Psychiatrist, Psych NP, CEO, CFO, CMO, COO, CHRO, Dental Director, and BH Director benchmarks. 46 total roles with verified NACHC/BLS data.",
    category: "data",
  },
  {
    date: "2026-03-17",
    title: "Academic Research Archive",
    description:
      "66 research entries across 27 domains with 4 curriculum tracks (Clinician, Non-Clinician, Public Health, Executive). Key researchers, journals, and institutions cataloged.",
    category: "feature",
  },
  {
    date: "2026-03-15",
    title: "10x FQHC Directory Profile Overhaul",
    description:
      "Wikipedia-style tabbed profiles for all 220 FQHCs: 5 tabs (Overview, News & Intel, Jobs, Strategy, For Job Seekers), chronological activity feed, profile completeness ring, and similar FQHCs algorithm.",
    category: "feature",
  },
  {
    date: "2026-03-14",
    title: "Homepage SEO/AI Optimization",
    description:
      "Homepage-specific metadata with 20 keywords, JSON-LD DataCatalog with 4 datasets, FAQPage schema with 10 questions for rich results, and updated llms.txt.",
    category: "feature",
  },
  {
    date: "2026-03-13",
    title: "Homepage Performance Optimization",
    description:
      "Split 1,893-line page into server/client components. ~830KB of raw data stays server-side with only pre-computed stats passed as props. 16 blog pages converted to server components.",
    category: "feature",
  },
  {
    date: "2026-03-12",
    title: "Compliance Hub — Workers' Comp, Education Barriers & Expanded Guides",
    description:
      "Workers' compensation guide, education barriers navigator, 5 new certifications, 4 new case studies, and 4 new operational guides covering HRSA OSV prep, Ryan White, grant lifecycle, and remote care ops.",
    category: "feature",
  },
  {
    date: "2026-03-10",
    title: "Revenue Simulator Wizard + Data Collection Infrastructure",
    description:
      "3-step simulator wizard (Organization, Services, Priority), sticky comparison results, fire-and-forget event tracking, and server-side progress sync for the learning pathway.",
    category: "feature",
  },
  {
    date: "2026-03-08",
    title: "AI Vendor Comparison — 8 Vendors with EHR Compatibility",
    description:
      "Side-by-side AI vendor comparison on the AI Tracker: EHR compatibility matrix (eCW, OCHIN, Athena, NextGen), FQHC fit badges, pricing, and NACHC/CHAI partnership indicators.",
    category: "feature",
  },
  {
    date: "2026-03-05",
    title: "FQHC Data Enrichment Sprint — 30+ FQHCs Upgraded",
    description:
      "Enriched 30+ FQHCs with Glassdoor ratings, staff counts, EHR systems, program details, and mission statements. Includes AltaMed flagship upgrade with $600M revenue and Chicano Movement origin story.",
    category: "data",
  },
  {
    date: "2026-03-05",
    title: "Regional News Scanning System",
    description:
      "9-region rotation scanning all of California: 3 query templates per region covering government budgets, FQHC-specific news, and health system disruptions. LA and Bay Area scanned twice per week.",
    category: "feature",
  },
  {
    date: "2026-03-01",
    title: "FQHC Executive Masterclass",
    description:
      "15 deep-dive strategy modules across 6 categories: Financial Survival, Revenue Recovery, Undocumented Care, Fundraising, Healthcare Economics, and Leadership. Built from a 200+ resource bibliography.",
    category: "feature",
  },
  {
    date: "2026-02-28",
    title: "Resilience Scorecard for 220 FQHCs",
    description:
      "Every California FQHC scored across 5 dimensions: program diversity, workforce stability, data maturity, quality indicators, and financial positioning. Searchable, sortable, and filterable with grade distribution visualization.",
    category: "feature",
  },
  {
    date: "2026-02-27",
    title: "Strategic Operating Environment Redesign",
    description:
      "Full platform pivot from job board to executive strategy monitor. Rumelt framework homepage, OKR templates, case studies, AI tracker, and intelligence-led navigation structure.",
    category: "feature",
  },
];

const CATEGORY_CONFIG: Record<
  UpdateCategory,
  { label: string; labelEs: string; color: string; icon: typeof Sparkles }
> = {
  feature: {
    label: "Feature",
    labelEs: "Funcionalidad",
    color: "bg-teal-100 text-teal-800",
    icon: Sparkles,
  },
  intel: {
    label: "Intel",
    labelEs: "Inteligencia",
    color: "bg-amber-100 text-amber-800",
    icon: Radio,
  },
  data: {
    label: "Data",
    labelEs: "Datos",
    color: "bg-blue-100 text-blue-800",
    icon: Database,
  },
};

const ALL_CATEGORIES: Array<UpdateCategory | "all"> = [
  "all",
  "feature",
  "intel",
  "data",
];

function groupByDate(updates: Update[]): Map<string, Update[]> {
  const map = new Map<string, Update[]>();
  for (const u of updates) {
    const existing = map.get(u.date) || [];
    existing.push(u);
    map.set(u.date, existing);
  }
  return map;
}

function formatDate(dateStr: string, locale: string): string {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString(locale === "es" ? "es-US" : "en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function WhatsNewPage() {
  const locale = useLocale();
  const isEs = locale === "es";
  const [activeFilter, setActiveFilter] = useState<UpdateCategory | "all">(
    "all"
  );

  const filtered =
    activeFilter === "all"
      ? UPDATES
      : UPDATES.filter((u) => u.category === activeFilter);

  const grouped = groupByDate(filtered);

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {isEs ? "Novedades" : "What's New"}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-300">
            {isEs
              ? "Las actualizaciones recientes de la plataforma, nuevas funciones e inteligencia estrategica."
              : "Recent platform updates, new features, and strategic intelligence."}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Filter pills */}
        <div className="mb-10 flex flex-wrap items-center gap-2">
          <Filter className="size-4 text-stone-400" />
          {ALL_CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat;
            const label =
              cat === "all"
                ? isEs
                  ? "Todos"
                  : "All"
                : isEs
                  ? CATEGORY_CONFIG[cat].labelEs
                  : CATEGORY_CONFIG[cat].label;
            const count =
              cat === "all"
                ? UPDATES.length
                : UPDATES.filter((u) => u.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-teal-700 text-white"
                    : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="space-y-10">
          {Array.from(grouped.entries()).map(([date, updates]) => (
            <div key={date}>
              {/* Date header */}
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-stone-200" />
                <time className="text-sm font-semibold text-stone-500">
                  {formatDate(date, locale)}
                </time>
                <div className="h-px flex-1 bg-stone-200" />
              </div>

              {/* Entries for this date */}
              <div className="space-y-4">
                {updates.map((update, idx) => {
                  const config = CATEGORY_CONFIG[update.category];
                  const Icon = config.icon;

                  return (
                    <div
                      key={update.title + idx}
                      className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-lg bg-stone-100 p-2">
                          <Icon className="size-4 text-stone-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-stone-900">
                              {update.title}
                            </h3>
                            <span
                              className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${config.color}`}
                            >
                              {isEs ? config.labelEs : config.label}
                            </span>
                          </div>
                          <p className="mt-1.5 text-sm leading-relaxed text-stone-600">
                            {update.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 rounded-xl border border-teal-200 bg-teal-50 p-6 text-center">
          <h2 className="text-lg font-semibold text-stone-900">
            {isEs
              ? "Recibe actualizaciones semanales"
              : "Get weekly updates"}
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            {isEs
              ? "Suscribete a nuestro boletin para recibir inteligencia estrategica cada lunes."
              : "Subscribe to our newsletter for strategic intelligence delivered every Monday."}
          </p>
          <Link
            href="/newsletter"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
          >
            {isEs ? "Suscribirse" : "Subscribe to newsletter"}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
