"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Terminal,
  Zap,
  Database,
  Brain,
  Clock,
  BarChart3,
  Layers,
  Search,
  FileText,
  Rocket,
  Heart,
  AlertTriangle,
  CheckCircle2,
  Globe,
  Users,
  Building2,
  TrendingUp,
  Bot,
  Sparkles,
  BookOpen,
  Award,
  Shield,
  Map,
  GraduationCap,
  Stethoscope,
  Scale,
  LineChart,
  Newspaper,
  Target,
  RefreshCw,
  DollarSign,
  Activity,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface Slide {
  id: string;
  title: string;
  content: React.ReactNode;
}

/* ------------------------------------------------------------------ */
/*  Reusable Components                                                */
/* ------------------------------------------------------------------ */
function SlideWrapper({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex min-h-screen flex-col justify-center px-8 py-12 sm:px-16 md:px-24 lg:px-32 ${className}`}
    >
      {children}
    </div>
  );
}

function StatCard({
  value,
  label,
  accent = false,
}: {
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl border border-stone-700/50 bg-stone-800/50 p-5 text-center backdrop-blur-sm">
      <div
        className={`text-3xl font-black sm:text-4xl ${accent ? "text-amber-400" : "text-white"}`}
      >
        {value}
      </div>
      <div className="mt-1 text-sm text-stone-400">{label}</div>
    </div>
  );
}

function TerminalBlock({
  prompt,
  output,
  title = "claude-code",
}: {
  prompt: string;
  output?: string;
  title?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-stone-700 bg-stone-950 shadow-2xl">
      <div className="flex items-center gap-2 border-b border-stone-800 bg-stone-900 px-4 py-2.5">
        <div className="size-3 rounded-full bg-red-500" />
        <div className="size-3 rounded-full bg-yellow-500" />
        <div className="size-3 rounded-full bg-green-500" />
        <span className="ml-2 text-xs text-stone-500">{title}</span>
      </div>
      <div className="p-5 font-mono text-sm leading-relaxed">
        <div className="text-green-400">
          <span className="text-stone-500">$ </span>
          {prompt}
        </div>
        {output && (
          <div className="mt-3 whitespace-pre-wrap text-stone-300">
            {output}
          </div>
        )}
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  stat,
}: {
  icon: React.ReactNode;
  title: string;
  stat: string;
}) {
  return (
    <div className="rounded-xl border border-stone-700/50 bg-stone-800/30 p-4">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <div className="text-sm font-semibold text-white">{title}</div>
          <div className="text-xs text-stone-500">{stat}</div>
        </div>
      </div>
    </div>
  );
}

function PipelineStep({
  icon,
  label,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  detail: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-stone-700/50 bg-stone-800/30 p-4">
      <div className="mt-0.5 shrink-0">{icon}</div>
      <div>
        <div className="text-sm font-semibold text-white">{label}</div>
        <div className="text-xs text-stone-500">{detail}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Slides                                                             */
/* ------------------------------------------------------------------ */
const slides: Slide[] = [
  /* ================================================================ */
  /*  Slide 1: Title                                                   */
  /* ================================================================ */
  {
    id: "title",
    title: "Title",
    content: (
      <SlideWrapper>
        <div className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-800/50 bg-teal-950/30 px-4 py-1.5 text-sm text-teal-400">
            <Heart className="size-4 fill-teal-400" />
            A Personal Project
          </div>
          <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            What One Year Inside an FQHC
            <br />
            <span className="bg-gradient-to-r from-teal-400 to-amber-400 bg-clip-text text-transparent">
              Taught Me
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-stone-400 sm:text-xl">
            And what I built with AI to give it all back — for free
          </p>
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value="110+" label="Features Shipped" accent />
            <StatCard value="220" label="FQHCs Tracked" />
            <StatCard value="597" label="Live Jobs" accent />
            <StatCard value="EN/ES" label="Fully Bilingual" />
          </div>
          <p className="mt-8 text-sm text-stone-500">
            <span className="text-teal-500">fqhctalent.com</span>
            {" · "}Use ← → to navigate
          </p>
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 2: What I Learned at MNHC                                  */
  /* ================================================================ */
  {
    id: "mnhc",
    title: "What I Learned",
    content: (
      <SlideWrapper>
        <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-amber-400">
          <Stethoscope className="size-4" />
          THE EXPERIENCE
        </div>
        <h2 className="text-4xl font-black text-white sm:text-5xl">
          A year at{" "}
          <span className="text-teal-400">Mission Neighborhood Health Center</span>
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-stone-400">
          Working inside an FQHC in San Francisco&apos;s Mission District, I saw the
          workforce crisis from the inside — and absorbed everything I could about
          how these organizations actually operate.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-stone-700/50 bg-stone-800/30 p-6">
            <Users className="mb-3 size-6 text-red-400" />
            <div className="text-lg font-bold text-white">Workforce Crisis</div>
            <div className="mt-2 text-sm text-stone-400">
              Burned-out staff, unfilled positions, constant turnover. 84% of
              FQHCs report shortages.
            </div>
          </div>
          <div className="rounded-xl border border-stone-700/50 bg-stone-800/30 p-6">
            <DollarSign className="mb-3 size-6 text-red-400" />
            <div className="text-lg font-bold text-white">Billing Complexity</div>
            <div className="mt-2 text-sm text-stone-400">
              PPS rates, same-day billing rules, APM transition, scope-of-practice
              confusion — revenue left on the table daily.
            </div>
          </div>
          <div className="rounded-xl border border-stone-700/50 bg-stone-800/30 p-6">
            <AlertTriangle className="mb-3 size-6 text-red-400" />
            <div className="text-lg font-bold text-white">Policy Whiplash</div>
            <div className="mt-2 text-sm text-stone-400">
              H.R. 1 Medicaid cuts, CalAIM waiver expiration, SB 525 wage
              mandates — all hitting at once.
            </div>
          </div>
          <div className="rounded-xl border border-stone-700/50 bg-stone-800/30 p-6">
            <Search className="mb-3 size-6 text-red-400" />
            <div className="text-lg font-bold text-white">Information Desert</div>
            <div className="mt-2 text-sm text-stone-400">
              No centralized salary data, scattered policy updates, zero free
              career tools for frontline workers.
            </div>
          </div>
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 3: What I Decided to Build                                 */
  /* ================================================================ */
  {
    id: "decision",
    title: "The Decision",
    content: (
      <SlideWrapper>
        <div className="text-center">
          <h2 className="text-4xl font-black text-white sm:text-5xl lg:text-6xl">
            I wanted to get{" "}
            <span className="bg-gradient-to-r from-teal-400 to-amber-400 bg-clip-text text-transparent">
              everything out of my head
            </span>
            <br />
            and make it useful
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-stone-400">
            Not a recruiting company. Not a staffing agency. A free knowledge and
            intelligence platform — built entirely with AI.
          </p>

          <div className="mx-auto mt-10 max-w-2xl">
            <TerminalBlock
              prompt='claude "Build a salary intelligence page with 30 roles across 9 CA regions with P25/P50/P75 benchmarks"'
              output={`Reading src/lib/job-posting-templates.ts...
Reading src/lib/career-pathways.ts...

Plan: Create salary-data page with regional multipliers,
sortable table, visual range bars, career progression...

✓ Created src/app/[locale]/salary-data/page.tsx
✓ Build passes clean
✓ 30 roles × 9 regions rendered`}
            />
          </div>

          <div className="mx-auto mt-10 max-w-xl rounded-xl border border-amber-800/50 bg-amber-950/20 p-6">
            <p className="text-lg font-bold text-amber-400">
              &ldquo;I didn&apos;t write a single word.&rdquo;
            </p>
            <p className="mt-2 text-sm text-stone-400">
              Every feature, every article, every data visualization — I designed
              it, prompted it, and iterated on it. Claude Code wrote all the code
              and content.
            </p>
          </div>
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 4: Strategic Intelligence                                  */
  /* ================================================================ */
  {
    id: "intelligence",
    title: "Strategic Intelligence",
    content: (
      <SlideWrapper>
        <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-teal-400">
          <BarChart3 className="size-4" />
          FEATURE GROUP 1
        </div>
        <h2 className="text-4xl font-black text-white sm:text-5xl">
          Strategic Intelligence
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-stone-400">
          The intel an FQHC executive wishes they had — curated, sourced, and
          updated daily.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Activity className="size-5 text-teal-400" />}
            title="Executive Intelligence Dashboard"
            stat="58 curated items · 8 categories · primary sources"
          />
          <FeatureCard
            icon={<Clock className="size-5 text-red-400" />}
            title="Funding Cliff Countdown"
            stat="Policy deadlines · effective dates · action triggers"
          />
          <FeatureCard
            icon={<Map className="size-5 text-teal-400" />}
            title="Regional Intelligence"
            stat="9 CA regions · local FQHC data · per-region dashboards"
          />
          <FeatureCard
            icon={<Users className="size-5 text-amber-400" />}
            title="Layoff Tracker"
            stat="20 events · 3,477+ workers · WARN Act data"
          />
          <FeatureCard
            icon={<Bot className="size-5 text-purple-400" />}
            title="AI Adoption Tracker"
            stat="16 items · ambient scribes · RCM AI · EHR integrations"
          />
          <FeatureCard
            icon={<RefreshCw className="size-5 text-green-400" />}
            title="Daily Automated Pipelines"
            stat="6 pipelines · policy scan · job scan · news rotation"
          />
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 5: Free Career Tools                                       */
  /* ================================================================ */
  {
    id: "tools",
    title: "Free Career Tools",
    content: (
      <SlideWrapper>
        <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-amber-400">
          <Sparkles className="size-4" />
          FEATURE GROUP 2
        </div>
        <h2 className="text-4xl font-black text-white sm:text-5xl">
          Free Career Tools
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-stone-400">
          Everything a community health worker needs to advance their career —
          no login, no paywall.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<FileText className="size-5 text-teal-400" />}
            title="Resume Builder"
            stat="8 role templates · PDF export"
          />
          <FeatureCard
            icon={<Brain className="size-5 text-amber-400" />}
            title="Career Assessment"
            stat="5 domains · role-specific questions"
          />
          <FeatureCard
            icon={<TrendingUp className="size-5 text-teal-400" />}
            title="Career Roadmap"
            stat="5 tracks × 4 levels · CA salary data"
          />
          <FeatureCard
            icon={<Award className="size-5 text-amber-400" />}
            title="Certification Catalog"
            stat="20 CA-specific · cost & salary impact"
          />
          <FeatureCard
            icon={<LineChart className="size-5 text-green-400" />}
            title="Salary Intelligence"
            stat="30 roles × 9 regions · P25/P50/P75"
          />
          <FeatureCard
            icon={<GraduationCap className="size-5 text-purple-400" />}
            title="Learning Pathway"
            stat="12 roles × 4 experience levels"
          />
          <FeatureCard
            icon={<Scale className="size-5 text-teal-400" />}
            title="FQHC Comparison Tool"
            stat="Side-by-side · 2-3 FQHCs"
          />
          <FeatureCard
            icon={<Target className="size-5 text-amber-400" />}
            title="Team Readiness"
            stat="Manager assessment · 5 domains"
          />
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 6: Knowledge & Education                                   */
  /* ================================================================ */
  {
    id: "knowledge",
    title: "Knowledge & Education",
    content: (
      <SlideWrapper>
        <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-green-400">
          <BookOpen className="size-4" />
          FEATURE GROUP 3
        </div>
        <h2 className="text-4xl font-black text-white sm:text-5xl">
          Knowledge &amp; Education
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-stone-400">
          Deep operational content — the kind of knowledge that takes years to
          accumulate, organized and made accessible.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<Newspaper className="size-5 text-teal-400" />}
            title="Blog Articles"
            stat="13 articles · bilingual · data viz"
          />
          <FeatureCard
            icon={<BookOpen className="size-5 text-amber-400" />}
            title="Operational Guides"
            stat="13 guides · ECM · billing · CalAIM"
          />
          <FeatureCard
            icon={<GraduationCap className="size-5 text-purple-400" />}
            title="Masterclass Modules"
            stat="18 modules · crisis · revenue · leadership"
          />
          <FeatureCard
            icon={<Layers className="size-5 text-teal-400" />}
            title="Case Studies"
            stat="22 studies · Rumelt strategy framework"
          />
          <FeatureCard
            icon={<Target className="size-5 text-green-400" />}
            title="OKR Templates"
            stat="12 templates · crisis change management"
          />
          <FeatureCard
            icon={<Shield className="size-5 text-amber-400" />}
            title="Scope of Practice"
            stat="10 CA roles · delegation matrix · BPC"
          />
          <FeatureCard
            icon={<DollarSign className="size-5 text-teal-400" />}
            title="Healthcare Economics"
            stat="PPS · 340B · FMAP explained"
          />
          <FeatureCard
            icon={<Heart className="size-5 text-red-400 fill-red-400" />}
            title="Movement History"
            stat="1960–2026 · cross-cultural alliances"
          />
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 7: FQHC Data & Directory                                   */
  /* ================================================================ */
  {
    id: "data",
    title: "FQHC Data & Directory",
    content: (
      <SlideWrapper>
        <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-purple-400">
          <Database className="size-4" />
          FEATURE GROUP 4
        </div>
        <h2 className="text-4xl font-black text-white sm:text-5xl">
          FQHC Data &amp; Directory
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-stone-400">
          The most comprehensive open dataset of California&apos;s community health
          centers — profiles, resilience scores, strategic reports, and more.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Building2 className="size-5 text-teal-400" />}
            title="220 CA FQHC Profiles"
            stat="Programs · EHR · Glassdoor · salary ranges"
          />
          <FeatureCard
            icon={<Shield className="size-5 text-amber-400" />}
            title="Resilience Scorecard"
            stat="5 dimensions · grades A-F · every FQHC"
          />
          <FeatureCard
            icon={<FileText className="size-5 text-teal-400" />}
            title="220 Strategic Reports"
            stat="Per-FQHC intel · threats · action items"
          />
          <FeatureCard
            icon={<BarChart3 className="size-5 text-green-400" />}
            title="Clinic Operations Simulator"
            stat="Payer-aware · revenue optimization · 8 pathways"
          />
          <FeatureCard
            icon={<Globe className="size-5 text-purple-400" />}
            title="Cultural Humility Framework"
            stat="CLAS standards · diversity scenarios"
          />
          <FeatureCard
            icon={<BookOpen className="size-5 text-amber-400" />}
            title="200+ Bibliography Resources"
            stat="Academic · government · journalism sources"
          />
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 8: The Numbers                                             */
  /* ================================================================ */
  {
    id: "numbers",
    title: "The Numbers",
    content: (
      <SlideWrapper>
        <div className="text-center">
          <h2 className="text-4xl font-black text-white sm:text-5xl">
            By the numbers
          </h2>
          <p className="mt-4 text-lg text-stone-400">
            One person. One AI. Zero hand-written words.
          </p>
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            <StatCard value="110+" label="Features Shipped" accent />
            <StatCard value="0" label="Words Written by Hand" />
            <StatCard value="~3" label="Weeks of Building" accent />
            <StatCard value="220" label="FQHCs Tracked" />
            <StatCard value="597" label="Live Jobs Aggregated" accent />
            <StatCard value="58" label="Intelligence Items" />
            <StatCard value="30+" label="Roles with Salary Data" accent />
            <StatCard value="9" label="CA Regions Covered" />
            <StatCard value="2" label="Languages (EN/ES)" accent />
            <StatCard value="200+" label="Primary Sources Cited" />
            <StatCard value="6" label="Daily Pipelines" accent />
            <StatCard value="1" label="Person + Claude Code" />
          </div>
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 9: How It Stays Fresh                                      */
  /* ================================================================ */
  {
    id: "pipeline",
    title: "How It Stays Fresh",
    content: (
      <SlideWrapper>
        <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-green-400">
          <RefreshCw className="size-4" />
          DAILY PIPELINE
        </div>
        <h2 className="text-4xl font-black text-white sm:text-5xl">
          The site gets smarter{" "}
          <span className="text-green-400">every morning</span>
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-stone-400">
          6 automated commands power a daily content pipeline — scanning policy,
          tracking jobs, monitoring layoffs, and curating intelligence.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <PipelineStep
            icon={<AlertTriangle className="size-5 text-red-400" />}
            label="WARN Act Monitor"
            detail="CA EDD XLSX → parse healthcare layoffs → update tracker"
          />
          <PipelineStep
            icon={<Search className="size-5 text-teal-400" />}
            label="Job Aggregation"
            detail="4 FQHC APIs (Workday, Lever, HRMDirect) → 597 live jobs"
          />
          <PipelineStep
            icon={<Scale className="size-5 text-amber-400" />}
            label="Policy & Legislative Scan"
            detail="NACHC, CPCA, CHCF, KFF, CBO → structured intel items"
          />
          <PipelineStep
            icon={<Map className="size-5 text-purple-400" />}
            label="Regional News Rotation"
            detail="2 of 9 CA regions scanned daily → local FQHC impact"
          />
          <PipelineStep
            icon={<Bot className="size-5 text-green-400" />}
            label="AI Adoption Tracking"
            detail="Ambient scribes, RCM AI, EHR integrations → tracker"
          />
          <PipelineStep
            icon={<CheckCircle2 className="size-5 text-stone-400" />}
            label="Link Quality Control"
            detail="Every new URL verified → broken links caught daily"
          />
        </div>
        <div className="mt-8">
          <TerminalBlock
            prompt="claude /daily-update"
            output={`WARN: 0 new FQHC entries (123 healthcare total)
Jobs: AltaMed 237, FHCSD 154, AHS 20, La Clinica 186 = 597
Intel: +3 new items (total 58)
Regional: LA + Central Coast scanned
Build: PASS ✓`}
          />
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 10: Closing                                                */
  /* ================================================================ */
  {
    id: "closing",
    title: "Thank You",
    content: (
      <SlideWrapper>
        <div className="text-center">
          <Heart className="mx-auto size-16 fill-amber-400 text-amber-400" />
          <h2 className="mt-6 text-4xl font-black text-white sm:text-5xl lg:text-6xl">
            Every insight sourced.
            <br />
            Every tool free.
            <br />
            <span className="bg-gradient-to-r from-teal-400 to-amber-400 bg-clip-text text-transparent">
              Every word AI-generated
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-stone-400">
            from one person&apos;s year inside an FQHC.
          </p>
          <div className="mt-10">
            <a
              href="https://www.fqhctalent.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-8 py-3 text-lg font-bold text-white transition hover:bg-teal-500"
            >
              <Rocket className="size-5" />
              fqhctalent.com
            </a>
          </div>
          <p className="mt-8 text-sm text-stone-600">
            Built with Claude Code &middot; Designed with heart
          </p>
        </div>
      </SlideWrapper>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */
export default function PresentationPage() {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback(
    (idx: number) => {
      if (idx >= 0 && idx < slides.length) setCurrent(idx);
    },
    [],
  );

  /* Keyboard navigation */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goTo(current + 1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(current - 1);
      }
      if (e.key === "Home") goTo(0);
      if (e.key === "End") goTo(slides.length - 1);
      if (e.key === "f" || e.key === "F") {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, goTo]);

  return (
    <div className="relative min-h-screen bg-stone-950 text-white">
      {/* Slide content */}
      <div className="mx-auto max-w-7xl">{slides[current].content}</div>

      {/* Navigation arrows */}
      {current > 0 && (
        <button
          onClick={() => goTo(current - 1)}
          className="fixed left-4 top-1/2 -translate-y-1/2 rounded-full bg-stone-800/80 p-2 text-stone-400 transition hover:bg-stone-700 hover:text-white"
          aria-label="Previous slide"
        >
          <ChevronLeft className="size-6" />
        </button>
      )}
      {current < slides.length - 1 && (
        <button
          onClick={() => goTo(current + 1)}
          className="fixed right-4 top-1/2 -translate-y-1/2 rounded-full bg-stone-800/80 p-2 text-stone-400 transition hover:bg-stone-700 hover:text-white"
          aria-label="Next slide"
        >
          <ChevronRight className="size-6" />
        </button>
      )}

      {/* Progress bar + dots */}
      <div className="fixed bottom-0 left-0 right-0 bg-stone-900/80 backdrop-blur-sm">
        {/* Progress bar */}
        <div className="h-0.5 bg-stone-800">
          <div
            className="h-full bg-teal-500 transition-all duration-300"
            style={{
              width: `${((current + 1) / slides.length) * 100}%`,
            }}
          />
        </div>
        {/* Dots + counter */}
        <div className="flex items-center justify-center gap-2 py-3">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className={`size-2 rounded-full transition-all ${
                i === current
                  ? "scale-125 bg-teal-400"
                  : "bg-stone-600 hover:bg-stone-500"
              }`}
              aria-label={`Go to slide: ${s.title}`}
            />
          ))}
          <span className="ml-4 text-xs text-stone-500">
            {current + 1} / {slides.length}
          </span>
        </div>
      </div>
    </div>
  );
}
