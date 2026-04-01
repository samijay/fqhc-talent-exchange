"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Search, X, Building2, BookOpen, Wrench, BarChart3 } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface SearchItem {
  type: "fqhc" | "blog" | "tool" | "strategy";
  title: string;
  href: string;
  keywords?: string;
  subtitle?: string;
}

interface FQHCIndexEntry {
  name: string;
  slug: string;
  city: string;
  county: string;
}

interface GlobalSearchProps {
  fqhcIndex: FQHCIndexEntry[];
}

/* ------------------------------------------------------------------ */
/*  Static search pages                                                */
/* ------------------------------------------------------------------ */

const TOOL_PAGES: SearchItem[] = [
  { type: "tool", title: "Resume Builder", href: "/resume-builder", keywords: "resume cv template pdf" },
  { type: "tool", title: "Career Assessment", href: "/career-insights", keywords: "assessment quiz evaluation skills" },
  { type: "tool", title: "Career Roadmap", href: "/career-roadmap", keywords: "career path progression ladder" },
  { type: "tool", title: "Certifications", href: "/certifications", keywords: "certification license training" },
  { type: "tool", title: "Career Resources", href: "/resources", keywords: "resources programs loan repayment training" },
  { type: "tool", title: "Workplace Guides", href: "/guides", keywords: "guides ECM billing documentation" },
  { type: "tool", title: "Compare FQHCs", href: "/compare", keywords: "compare side by side" },
  { type: "tool", title: "Interview Prep", href: "/interview-prep", keywords: "interview questions STAR behavioral" },
  { type: "tool", title: "Team Readiness Assessment", href: "/team-readiness", keywords: "manager leadership team" },
  { type: "tool", title: "Priority Intake", href: "/fast-track", keywords: "displaced worker laid off fast track" },
  { type: "tool", title: "My Learning Path", href: "/pathway", keywords: "learning pathway course progress" },
  { type: "tool", title: "FQHC Glossary", href: "/glossary", keywords: "glossary terms definitions acronyms" },
  { type: "tool", title: "Salary Intelligence", href: "/salary-data", keywords: "salary pay compensation wages benchmark" },
  { type: "tool", title: "Jobs", href: "/jobs", keywords: "job listings openings positions careers employment" },
  { type: "tool", title: "FQHC Directory", href: "/directory", keywords: "directory organizations health centers map" },
  { type: "tool", title: "Newsletter", href: "/newsletter", keywords: "newsletter subscribe email intel brief" },
  { type: "tool", title: "Layoff Tracker", href: "/layoffs", keywords: "layoffs WARN Act displaced workers" },
  { type: "tool", title: "Intel Brief PDF", href: "/intel-brief", keywords: "intel brief PDF download report" },
  { type: "tool", title: "Demo Dashboard", href: "/demo", keywords: "demo dashboard preview overview" },
];

const STRATEGY_PAGES: SearchItem[] = [
  { type: "strategy", title: "Executive Guides", href: "/strategy/guides", keywords: "case studies leadership strategy" },
  { type: "strategy", title: "OKR Templates", href: "/strategy/okrs", keywords: "OKR objectives key results goals" },
  { type: "strategy", title: "Case Studies", href: "/strategy/case-studies", keywords: "case study success story" },
  { type: "strategy", title: "Healthcare Economics", href: "/strategy/economics", keywords: "PPS 340B FMAP reimbursement" },
  { type: "strategy", title: "Execution Frameworks", href: "/strategy/frameworks", keywords: "change management decision" },
  { type: "strategy", title: "Thought Leaders", href: "/strategy/leaders", keywords: "influencers leaders experts" },
  { type: "strategy", title: "Knowledge Map", href: "/strategy/knowledge-map", keywords: "connections foresight" },
  { type: "strategy", title: "Funding Impact", href: "/funding-impact", keywords: "HR 1 medicaid cuts funding policy" },
  { type: "strategy", title: "Top-of-Scope", href: "/strategy/scope-of-practice", keywords: "scope practice delegation" },
  { type: "strategy", title: "Cultural Humility", href: "/strategy/cultural-humility", keywords: "CLAS cultural competency diversity" },
  { type: "strategy", title: "The Movement", href: "/strategy/movement", keywords: "history movement civil rights" },
  { type: "strategy", title: "Transition Toolkit", href: "/strategy/offboarding", keywords: "offboarding layoff transition" },
  { type: "strategy", title: "Resilience Scorecard", href: "/strategy/resilience", keywords: "resilience score grade risk" },
  { type: "strategy", title: "Masterclass", href: "/strategy/masterclass", keywords: "masterclass modules training executive" },
  { type: "strategy", title: "Research Archive", href: "/strategy/research", keywords: "academic research papers studies" },
  { type: "strategy", title: "Tech Stack Guide", href: "/strategy/tech-stack", keywords: "technology vendors software EHR" },
  { type: "strategy", title: "AI Tracker", href: "/ai-tracker", keywords: "AI artificial intelligence adoption" },
  { type: "strategy", title: "Clinic Simulator", href: "/strategy/clinic-simulator", keywords: "simulator staffing revenue model" },
  { type: "strategy", title: "Revenue Simulator", href: "/strategy/revenue-simulator", keywords: "revenue impact financial projection" },
  { type: "strategy", title: "Workforce Resilience", href: "/strategy/workforce-resilience", keywords: "workforce stability retention" },
  { type: "strategy", title: "Compliance", href: "/compliance", keywords: "compliance HIPAA HRSA audit" },
  { type: "strategy", title: "Regional Intelligence", href: "/intelligence/los-angeles", keywords: "regional LA San Diego Bay Area" },
  { type: "strategy", title: "Legislative Tracker", href: "/intelligence/legislation", keywords: "legislation bills policy law" },
];

const BLOG_ARTICLES: SearchItem[] = [
  { type: "blog", title: "FQHC Technology Stack Guide 2026", href: "/blog/fqhc-technology-stack-guide-2026", keywords: "technology vendors software" },
  { type: "blog", title: "What Is Enhanced Care Management (ECM)?", href: "/blog/what-is-enhanced-care-management-ecm", keywords: "ECM care management CalAIM" },
  { type: "blog", title: "How to Write an FQHC Resume", href: "/blog/how-to-write-fqhc-resume", keywords: "resume writing tips" },
  { type: "blog", title: "FQHC Career Ladder: MA to RN to Provider", href: "/blog/fqhc-career-ladder-ma-rn-provider", keywords: "career ladder advancement" },
  { type: "blog", title: "FQHC Salary Negotiation Guide", href: "/blog/fqhc-salary-negotiation-guide", keywords: "salary negotiation pay raise" },
  { type: "blog", title: "Healthcare Hiring Trends 2026", href: "/blog/healthcare-hiring-trends-2026", keywords: "hiring trends workforce" },
  { type: "blog", title: "NHSC Loan Repayment Guide", href: "/blog/nhsc-loan-repayment-guide", keywords: "NHSC loan repayment student debt" },
  { type: "blog", title: "FQHC vs Private Practice", href: "/blog/fqhc-vs-private-practice", keywords: "comparison private practice" },
  { type: "blog", title: "February 2026 Jobs Report: Healthcare Crisis", href: "/blog/february-2026-jobs-report-healthcare-crisis", keywords: "jobs report employment data" },
  { type: "blog", title: "Medi-Cal Funding Cuts: What CHWs Need to Know", href: "/blog/medi-cal-funding-cuts-community-health-workers", keywords: "medi-cal cuts funding CHW" },
  { type: "blog", title: "FQHC Career Insights Assessment", href: "/blog/fqhc-career-insights-assessment", keywords: "career assessment evaluation" },
  { type: "blog", title: "Working at Top of Scope in FQHCs", href: "/blog/working-at-top-of-scope-fqhc", keywords: "scope practice top license" },
  { type: "blog", title: "FQHC Benefits Guide", href: "/blog/fqhc-benefits-guide-community-health", keywords: "benefits health insurance PTO" },
  { type: "blog", title: "Top 10 FQHC Interview Questions", href: "/blog/top-10-fqhc-interview-questions", keywords: "interview questions preparation" },
  { type: "blog", title: "FQHC AI Scribes: What Workers Need to Know", href: "/blog/fqhc-ai-scribes-what-workers-need-to-know", keywords: "AI scribes documentation ambient" },
  { type: "blog", title: "FQHC Copay Advantage & Patient Surge", href: "/blog/fqhc-copay-advantage-patient-surge", keywords: "copay sliding scale patients" },
  { type: "blog", title: "Laid Off from FQHC: Fast Track Job Search", href: "/blog/laid-off-fqhc-fast-track-job-search", keywords: "layoff displaced job search" },
];

/* ------------------------------------------------------------------ */
/*  Category config                                                    */
/* ------------------------------------------------------------------ */

const CATEGORY_ICONS = {
  fqhc: Building2,
  blog: BookOpen,
  tool: Wrench,
  strategy: BarChart3,
} as const;

const CATEGORY_LABELS = {
  fqhc: "FQHCs",
  blog: "Blog",
  tool: "Tools & Pages",
  strategy: "Strategy & Intelligence",
} as const;

const CATEGORY_LABELS_ES = {
  fqhc: "FQHCs",
  blog: "Blog",
  tool: "Herramientas",
  strategy: "Estrategia e Inteligencia",
} as const;

const CATEGORY_ORDER: Array<SearchItem["type"]> = ["fqhc", "tool", "strategy", "blog"];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function GlobalSearch({ fqhcIndex }: GlobalSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const locale = useLocale();
  const isEs = locale === "es";

  // Build the full search index (FQHC items from prop, rest hardcoded)
  const fqhcItems: SearchItem[] = useMemo(
    () =>
      fqhcIndex.map((f) => ({
        type: "fqhc" as const,
        title: f.name,
        href: `/directory/${f.slug}`,
        keywords: `${f.city} ${f.county}`,
        subtitle: `${f.city}, ${f.county}`,
      })),
    [fqhcIndex]
  );

  const allItems = useMemo(
    () => [...TOOL_PAGES, ...STRATEGY_PAGES, ...BLOG_ARTICLES, ...fqhcItems],
    [fqhcItems]
  );

  // Filter results
  const results = useMemo((): Record<string, SearchItem[]> => {
    if (!query.trim()) return {};
    const tokens = query.toLowerCase().trim().split(/\s+/);

    const matches = allItems.filter((item) => {
      const searchText = `${item.title} ${item.keywords || ""} ${item.subtitle || ""}`.toLowerCase();
      return tokens.every((token) => searchText.includes(token));
    });

    const grouped: Record<string, SearchItem[]> = {};
    for (const item of matches) {
      if (!grouped[item.type]) grouped[item.type] = [];
      if (grouped[item.type].length < 6) {
        grouped[item.type].push(item);
      }
    }

    return grouped;
  }, [query, allItems]);

  // Flat list for keyboard navigation
  const flatResults = useMemo(() => {
    const flat: SearchItem[] = [];
    for (const type of CATEGORY_ORDER) {
      if (results[type]) flat.push(...results[type]);
    }
    return flat;
  }, [results]);

  const totalResults = flatResults.length;

  // Cmd+K / Ctrl+K to open
  useEffect(() => {
    function onGlobalKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", onGlobalKeyDown);
    return () => document.removeEventListener("keydown", onGlobalKeyDown);
  }, []);

  // Focus input when opening
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Scroll selected item into view
  useEffect(() => {
    if (!resultsRef.current) return;
    const el = resultsRef.current.querySelector("[data-selected='true']");
    if (el) el.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const navigateTo = useCallback(
    (href: string) => {
      close();
      router.push(href as "/jobs");
    },
    [close, router]
  );

  const handleOverlayKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, totalResults - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && flatResults[selectedIndex]) {
        e.preventDefault();
        navigateTo(flatResults[selectedIndex].href);
      }
    },
    [close, flatResults, selectedIndex, totalResults, navigateTo]
  );

  const labels = isEs ? CATEGORY_LABELS_ES : CATEGORY_LABELS;

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => { setOpen(true); setQuery(""); setSelectedIndex(0); }}
        className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900"
        aria-label={isEs ? "Buscar (Cmd+K)" : "Search (Cmd+K)"}
        title="⌘K"
      >
        <Search className="size-4" />
        <span className="hidden xl:inline text-xs text-stone-400">⌘K</span>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 backdrop-blur-sm pt-[10vh] px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            className="w-full max-w-2xl rounded-xl bg-white shadow-2xl border border-stone-200 overflow-hidden"
            onKeyDown={handleOverlayKeyDown}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-stone-200 px-4 py-3">
              <Search className="size-5 text-stone-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                placeholder={isEs ? "Buscar FQHCs, herramientas, artículos..." : "Search FQHCs, tools, articles..."}
                className="flex-1 text-base text-stone-900 placeholder:text-stone-400 outline-none bg-transparent"
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-stone-300 bg-stone-50 px-1.5 py-0.5 text-xs font-medium text-stone-500">
                ESC
              </kbd>
              <button onClick={close} className="sm:hidden text-stone-400 hover:text-stone-600" aria-label="Close search">
                <X className="size-5" />
              </button>
            </div>

            {/* Results */}
            <div ref={resultsRef} className="max-h-[60vh] overflow-y-auto">
              {query.trim() && totalResults === 0 && (
                <div className="px-4 py-8 text-center text-stone-500">
                  <p className="text-sm">
                    {isEs ? "No se encontraron resultados para" : "No results found for"}{" "}
                    <span className="font-medium text-stone-700">&ldquo;{query}&rdquo;</span>
                  </p>
                </div>
              )}

              {!query.trim() && (
                <div className="px-4 py-8 text-center text-stone-400">
                  <p className="text-sm">
                    {isEs
                      ? "Escribe para buscar entre 200+ FQHCs, herramientas y artículos"
                      : "Type to search across 200+ FQHCs, tools, and articles"}
                  </p>
                </div>
              )}

              {(() => {
                let runningIndex = 0;
                return CATEGORY_ORDER.map((type) => {
                  const items = results[type];
                  if (!items || items.length === 0) return null;
                  const Icon = CATEGORY_ICONS[type];
                  const startIndex = runningIndex;
                  runningIndex += items.length;

                  return (
                    <div key={type}>
                      <div className="sticky top-0 bg-stone-50 px-4 py-2 border-b border-stone-100">
                        <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                          <Icon className="size-3.5" />
                          {labels[type]}
                        </p>
                      </div>
                      {items.map((item, i) => {
                        const globalIndex = startIndex + i;
                        const isSelected = globalIndex === selectedIndex;
                        return (
                          <button
                            key={`${item.type}-${item.href}`}
                            data-selected={isSelected}
                            onClick={() => navigateTo(item.href)}
                            className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors ${
                              isSelected ? "bg-teal-50" : "hover:bg-stone-50"
                            }`}
                          >
                            <Icon className={`size-4 shrink-0 ${isSelected ? "text-teal-700" : "text-stone-400"}`} />
                            <div className="min-w-0 flex-1">
                              <p className={`text-sm font-medium truncate ${isSelected ? "text-teal-900" : "text-stone-800"}`}>
                                {item.title}
                              </p>
                              {item.subtitle && (
                                <p className="text-xs text-stone-500 truncate">{item.subtitle}</p>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  );
                });
              })()}
            </div>

            {/* Footer hint */}
            {totalResults > 0 && (
              <div className="border-t border-stone-200 px-4 py-2 bg-stone-50 flex items-center justify-between">
                <span className="text-xs text-stone-400">
                  {totalResults} {isEs ? "resultado(s)" : "result(s)"}
                </span>
                <span className="text-xs text-stone-400 hidden sm:block">
                  <kbd className="rounded border border-stone-300 bg-white px-1 py-0.5 text-[10px] font-medium">↑↓</kbd>
                  {" "}{isEs ? "navegar" : "navigate"}{" "}
                  <kbd className="rounded border border-stone-300 bg-white px-1 py-0.5 text-[10px] font-medium">↵</kbd>
                  {" "}{isEs ? "abrir" : "open"}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
