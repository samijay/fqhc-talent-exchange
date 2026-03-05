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
  Code2,
  Layers,
  GitBranch,
  Search,
  FileText,
  Rocket,
  Heart,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Play,
  Globe,
  Users,
  Building2,
  TrendingUp,
  Bot,
  Repeat,
  Sparkles,
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

function TimelineItem({
  week,
  dates,
  title,
  items,
  color,
}: {
  week: string;
  dates: string;
  title: string;
  items: string[];
  color: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`flex size-10 items-center justify-center rounded-full ${color} text-sm font-bold text-white`}
        >
          {week}
        </div>
        <div className="w-0.5 flex-1 bg-stone-700" />
      </div>
      <div className="pb-8">
        <div className="text-xs text-stone-500">{dates}</div>
        <div className="text-lg font-bold text-white">{title}</div>
        <ul className="mt-2 space-y-1">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-stone-400">
              <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-teal-500" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FeatureGrid({ features }: { features: { icon: React.ReactNode; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {features.map((f, i) => (
        <div
          key={i}
          className="flex items-center gap-2 rounded-lg border border-stone-700/50 bg-stone-800/30 px-3 py-2.5 text-sm text-stone-300"
        >
          {f.icon}
          {f.label}
        </div>
      ))}
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
            <Terminal className="size-4" />
            Claude Code Case Study
          </div>
          <h1 className="text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
            The AI-Native
            <br />
            <span className="bg-gradient-to-r from-teal-400 to-amber-400 bg-clip-text text-transparent">
              Development Workflow
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-stone-400 sm:text-xl">
            How one person built a 110+ feature strategic intelligence platform
            in 3 weeks using Claude Code
          </p>
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value="110+" label="Features Shipped" accent />
            <StatCard value="214" label="FQHCs Tracked" />
            <StatCard value="3" label="Weeks" accent />
            <StatCard value="1" label="Developer" />
          </div>
          <p className="mt-10 text-sm text-stone-600">
            Use ← → arrow keys to navigate &middot; Press F for fullscreen
          </p>
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 2: The Problem                                             */
  /* ================================================================ */
  {
    id: "problem",
    title: "The Problem",
    content: (
      <SlideWrapper>
        <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-red-400">
          <AlertTriangle className="size-4" />
          THE CRISIS
        </div>
        <h2 className="text-4xl font-black text-white sm:text-5xl">
          California&apos;s safety-net workforce
          <br />
          <span className="text-red-400">is collapsing</span>
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-stone-400">
          Federally Qualified Health Centers serve 7.8M Californians — mostly
          uninsured, undocumented, and low-income. They&apos;re facing the worst
          funding crisis in 60 years.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-6">
            <div className="text-3xl font-black text-red-400">$4.6B</div>
            <div className="mt-1 text-sm text-stone-400">
              Federal funding at risk from H.R. 1
            </div>
          </div>
          <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-6">
            <div className="text-3xl font-black text-red-400">3,477+</div>
            <div className="mt-1 text-sm text-stone-400">
              Healthcare workers displaced in CA
            </div>
          </div>
          <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-6">
            <div className="text-3xl font-black text-red-400">84%</div>
            <div className="mt-1 text-sm text-stone-400">
              Of FQHCs report workforce shortages
            </div>
          </div>
          <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-6">
            <div className="text-3xl font-black text-red-400">50%</div>
            <div className="mt-1 text-sm text-stone-400">
              Revenue loss projected for some FQHCs
            </div>
          </div>
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 3: What Got Built                                          */
  /* ================================================================ */
  {
    id: "what-built",
    title: "What Got Built",
    content: (
      <SlideWrapper>
        <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-teal-400">
          <Rocket className="size-4" />
          THE PRODUCT
        </div>
        <h2 className="text-4xl font-black text-white sm:text-5xl">
          A full strategic intelligence platform
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-stone-400">
          Live at{" "}
          <span className="text-teal-400">fqhctalent.com</span> — built for FQHC
          executives tracking the political landscape and workforce crisis.
        </p>
        <div className="mt-8">
          <FeatureGrid
            features={[
              { icon: <Building2 className="size-4 text-teal-400" />, label: "214 FQHC Directory" },
              { icon: <BarChart3 className="size-4 text-teal-400" />, label: "Intelligence Dashboard" },
              { icon: <Search className="size-4 text-teal-400" />, label: "Layoff Tracker" },
              { icon: <Brain className="size-4 text-teal-400" />, label: "AI Adoption Tracker" },
              { icon: <FileText className="size-4 text-teal-400" />, label: "13 Blog Articles" },
              { icon: <Globe className="size-4 text-teal-400" />, label: "9 Regional Dashboards" },
              { icon: <Layers className="size-4 text-teal-400" />, label: "220 FQHC Reports" },
              { icon: <Users className="size-4 text-teal-400" />, label: "Resume Builder" },
              { icon: <TrendingUp className="size-4 text-teal-400" />, label: "Salary Intelligence" },
              { icon: <Database className="size-4 text-teal-400" />, label: "Resilience Scorecard" },
              { icon: <Heart className="size-4 text-teal-400" />, label: "Career Assessment" },
              { icon: <Code2 className="size-4 text-teal-400" />, label: "15 Masterclasses" },
              { icon: <Terminal className="size-4 text-teal-400" />, label: "6 Slash Commands" },
              { icon: <Zap className="size-4 text-teal-400" />, label: "Funding Impact Tracker" },
              { icon: <Globe className="size-4 text-teal-400" />, label: "Fully Bilingual (EN/ES)" },
              { icon: <GitBranch className="size-4 text-teal-400" />, label: "Comparison Tool" },
            ]}
          />
        </div>
        <p className="mt-6 text-sm text-stone-500">
          ...and 90+ more features. Full stack: Next.js 16, React 19, TypeScript, Tailwind 4, Supabase, Vercel.
        </p>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 4: The Reveal                                              */
  /* ================================================================ */
  {
    id: "reveal",
    title: "The Reveal",
    content: (
      <SlideWrapper>
        <div className="text-center">
          <h2 className="text-4xl font-black text-white sm:text-5xl lg:text-6xl">
            Built by{" "}
            <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
              one person
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-xl text-stone-400">
            A self-described beginner with no prior React, Next.js, or TypeScript
            experience.
          </p>
          <div className="mx-auto mt-10 max-w-lg rounded-xl border border-stone-700 bg-stone-800/50 p-8">
            <div className="text-left font-mono text-sm text-stone-400">
              <div className="mb-4 text-stone-600">// from CLAUDE.md</div>
              <div>
                <span className="text-amber-400">preferences:</span>
              </div>
              <div className="ml-4 mt-1">
                <span className="text-stone-500">- </span>
                <span className="text-teal-300">
                  &quot;I am a beginner — explain things clearly&quot;
                </span>
              </div>
              <div className="ml-4 mt-1">
                <span className="text-stone-500">- </span>
                <span className="text-teal-300">
                  &quot;Keep code simple and readable&quot;
                </span>
              </div>
              <div className="ml-4 mt-1">
                <span className="text-stone-500">- </span>
                <span className="text-teal-300">
                  &quot;Always test that code compiles&quot;
                </span>
              </div>
            </div>
          </div>
          <p className="mt-8 text-lg text-stone-500">
            The secret weapon?
          </p>
          <div className="mt-2 inline-flex items-center gap-3 text-3xl font-black text-white">
            <Terminal className="size-8 text-teal-400" />
            Claude Code
          </div>
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 5: What is Claude Code                                     */
  /* ================================================================ */
  {
    id: "claude-code",
    title: "Claude Code",
    content: (
      <SlideWrapper>
        <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-teal-400">
          <Terminal className="size-4" />
          THE TOOL
        </div>
        <h2 className="text-4xl font-black text-white sm:text-5xl">
          Claude Code = AI in your terminal
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-stone-400">
          An agentic coding tool that lives in your terminal. It reads your
          codebase, writes code, runs commands, and thinks about architecture.
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div>
            <TerminalBlock
              prompt='claude "add dark mode to the settings page"'
              output={`I'll plan this implementation first...

Reading src/app/settings/page.tsx...
Reading src/lib/theme-config.ts...

Plan:
1. Add theme toggle component
2. Wire up next-themes provider
3. Update CSS variables

Shall I proceed? (Y/n)`}
            />
          </div>
          <div className="space-y-4">
            <div className="rounded-xl border border-stone-700/50 bg-stone-800/30 p-5">
              <div className="mb-2 text-sm font-semibold text-teal-400">
                Reads your entire codebase
              </div>
              <div className="text-sm text-stone-400">
                Understands project structure, patterns, conventions, types
              </div>
            </div>
            <div className="rounded-xl border border-stone-700/50 bg-stone-800/30 p-5">
              <div className="mb-2 text-sm font-semibold text-amber-400">
                Writes production code
              </div>
              <div className="text-sm text-stone-400">
                TypeScript, React components, API routes, data files, tests
              </div>
            </div>
            <div className="rounded-xl border border-stone-700/50 bg-stone-800/30 p-5">
              <div className="mb-2 text-sm font-semibold text-green-400">
                Runs commands & verifies
              </div>
              <div className="text-sm text-stone-400">
                npm run build, git commit, curl APIs, parse data
              </div>
            </div>
            <div className="rounded-xl border border-stone-700/50 bg-stone-800/30 p-5">
              <div className="mb-2 text-sm font-semibold text-purple-400">
                Remembers context via CLAUDE.md
              </div>
              <div className="text-sm text-stone-400">
                Project memory file persists decisions, patterns, preferences
              </div>
            </div>
          </div>
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 6: The Development Loop                                    */
  /* ================================================================ */
  {
    id: "dev-loop",
    title: "The Loop",
    content: (
      <SlideWrapper>
        <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-teal-400">
          <Repeat className="size-4" />
          THE WORKFLOW
        </div>
        <h2 className="text-4xl font-black text-white sm:text-5xl">
          The build loop
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-stone-400">
          Every feature follows the same cycle. Claude Code handles 90% of the
          execution — I provide direction and domain expertise.
        </p>
        <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center gap-6 sm:flex-row sm:gap-4">
          {[
            {
              step: "1",
              title: "Describe",
              desc: "Tell Claude what to build in plain English",
              color: "bg-teal-600",
              icon: <FileText className="size-5" />,
            },
            {
              step: "2",
              title: "Plan",
              desc: "Claude explores codebase, proposes approach",
              color: "bg-blue-600",
              icon: <Brain className="size-5" />,
            },
            {
              step: "3",
              title: "Build",
              desc: "Claude writes code across multiple files",
              color: "bg-amber-600",
              icon: <Code2 className="size-5" />,
            },
            {
              step: "4",
              title: "Verify",
              desc: "npm run build — must compile clean",
              color: "bg-green-600",
              icon: <CheckCircle2 className="size-5" />,
            },
            {
              step: "5",
              title: "Ship",
              desc: "Git commit + push → live on Vercel",
              color: "bg-purple-600",
              icon: <Rocket className="size-5" />,
            },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-4 sm:flex-col sm:gap-2">
              <div
                className={`flex size-14 items-center justify-center rounded-2xl ${s.color} text-white shadow-lg`}
              >
                {s.icon}
              </div>
              <div className="sm:text-center">
                <div className="text-sm font-bold text-white">{s.title}</div>
                <div className="max-w-32 text-xs text-stone-500">{s.desc}</div>
              </div>
              {i < 4 && (
                <ArrowRight className="hidden size-5 text-stone-600 sm:block" />
              )}
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-2xl rounded-xl border border-amber-900/30 bg-amber-950/20 p-5 text-center">
          <div className="text-sm text-amber-400">
            Average time from idea → deployed feature:{" "}
            <span className="font-bold text-white">20-45 minutes</span>
          </div>
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 7: Slash Commands                                          */
  /* ================================================================ */
  {
    id: "slash-commands",
    title: "Slash Commands",
    content: (
      <SlideWrapper>
        <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-teal-400">
          <Terminal className="size-4" />
          AUTOMATION
        </div>
        <h2 className="text-4xl font-black text-white sm:text-5xl">
          Slash commands as infrastructure
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-stone-400">
          Custom commands in <code className="rounded bg-stone-800 px-1.5 py-0.5 text-teal-300">.claude/commands/</code> that
          encode complex workflows as reusable playbooks.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              cmd: "/daily-update",
              desc: "WARN Act check + job scan + policy scan + AI scan + news intel + regional scan",
              searches: "20 web searches",
              time: "~20 min",
            },
            {
              cmd: "/scan-policy",
              desc: "Deep legislative scanner: federal, state, local policy tracking",
              searches: "10+ sources",
              time: "~15 min",
            },
            {
              cmd: "/intel-brief",
              desc: "Generate weekly newsletter with primary source links",
              searches: "Aggregates data",
              time: "~10 min",
            },
            {
              cmd: "/update-layoffs",
              desc: "Fetch CA WARN Act XLSX, parse, filter healthcare, cross-reference FQHCs",
              searches: "EDD data",
              time: "~5 min",
            },
            {
              cmd: "/scrape-jobs",
              desc: "Check FQHC career pages via Workday/Lever APIs",
              searches: "4 APIs",
              time: "~3 min",
            },
            {
              cmd: "/draft-blog",
              desc: "Suggest topics from data, draft bilingual article",
              searches: "Data + web",
              time: "~30 min",
            },
          ].map((c, i) => (
            <div
              key={i}
              className="rounded-xl border border-stone-700/50 bg-stone-800/30 p-5"
            >
              <code className="text-lg font-bold text-teal-400">{c.cmd}</code>
              <p className="mt-2 text-sm text-stone-400">{c.desc}</p>
              <div className="mt-3 flex gap-3 text-xs text-stone-500">
                <span className="rounded-full bg-stone-800 px-2 py-0.5">{c.searches}</span>
                <span className="rounded-full bg-stone-800 px-2 py-0.5">{c.time}</span>
              </div>
            </div>
          ))}
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 8: Daily Pipeline                                          */
  /* ================================================================ */
  {
    id: "daily-pipeline",
    title: "Daily Pipeline",
    content: (
      <SlideWrapper>
        <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-amber-400">
          <Play className="size-4" />
          LIVE DEMO
        </div>
        <h2 className="text-4xl font-black text-white sm:text-5xl">
          The daily pipeline
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-stone-400">
          Every morning, one command updates the entire platform.
        </p>
        <div className="mt-8">
          <TerminalBlock
            prompt="/daily-update"
            title="claude-code — daily pipeline"
            output={`=== DAILY UPDATE 2026-03-05 ===

Step 1: WARN Act Check
  → Downloading CA EDD WARN XLSX...
  → 126 healthcare entries, 0 FQHC filings

Step 2: Job Scan (4 APIs in parallel)
  → AltaMed: 228  |  FHCSD: 150
  → AHS: 19       |  La Clinica: 179
  → Total: 576 (prev 576, unchanged)

Step 3: Legislative & Policy Scan
  → 4 federal/state searches...
  → Found: SD County safety net overhaul (Critical)

Step 3.5: News & Intelligence Scan
  → 5 searches → +6 new intel items

Step 3.8: Regional Scan (San Diego + Inland Empire)
  → 6 targeted regional searches
  → SD: $300M county funding loss, 400K at risk
  → IE: IEHP 1.6M members threatened

Step 4.5: Link QC
  → 4 new URLs verified, 0 broken

Build: PASS ✓
Intel items: 55 total`}
          />
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 9: Conversational Development                              */
  /* ================================================================ */
  {
    id: "conversational",
    title: "Conversational Dev",
    content: (
      <SlideWrapper>
        <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-teal-400">
          <Sparkles className="size-4" />
          REAL EXAMPLES
        </div>
        <h2 className="text-4xl font-black text-white sm:text-5xl">
          Prompts → Features
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-stone-400">
          Real prompts from the build. Each produced a complete, deployed feature.
        </p>
        <div className="mt-8 space-y-4">
          {[
            {
              prompt: "Build a resilience scorecard that scores all 220 FQHCs across 5 dimensions",
              result: "Scoring engine (350 lines) + interactive page with search, filter, sort, grade distribution viz",
              time: "~40 min",
            },
            {
              prompt: "Add regional intelligence pages — one dashboard per CA region with FQHC stats",
              result: "9 SSG pages × 2 locales = 18 static pages with per-region stats, resilience, EHR landscape, job counts",
              time: "~35 min",
            },
            {
              prompt: "We just missed a massive SF crisis. Build a regional news scanning system so it never happens again.",
              result: "Regional news config (9 regions), 5-day rotation schedule, 3 query templates, pipeline integration",
              time: "~45 min",
            },
            {
              prompt: "Make AltaMed incredible",
              result: "Deep research → Glassdoor 3.6/1.4K reviews, 3,000+ staff, 300K patients, Epic EHR, 7 programs, union info",
              time: "~20 min",
            },
          ].map((ex, i) => (
            <div
              key={i}
              className="rounded-xl border border-stone-700/50 bg-stone-800/30 p-5"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="font-mono text-sm text-teal-300">
                    &quot;{ex.prompt}&quot;
                  </div>
                  <div className="mt-2 text-sm text-stone-400">
                    → {ex.result}
                  </div>
                  <div className="mt-1 text-xs text-stone-600">{ex.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 10: Parallel Agents                                        */
  /* ================================================================ */
  {
    id: "agents",
    title: "Parallel Agents",
    content: (
      <SlideWrapper>
        <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-teal-400">
          <Bot className="size-4" />
          SCALING
        </div>
        <h2 className="text-4xl font-black text-white sm:text-5xl">
          Background agents for parallel work
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-stone-400">
          Claude Code can spawn background research agents that work simultaneously.
          I used this to enrich 220 FQHCs with real data.
        </p>
        <div className="mt-8">
          <TerminalBlock
            title="claude-code — parallel enrichment"
            prompt="Enrich the next batch of HRSA FQHCs"
            output={`Launching 6 research agents in parallel...

Agent 1: Bay Area FQHCs (14 orgs)      [RUNNING]
Agent 2: Central Valley + SD (10 orgs)  [RUNNING]
Agent 3: Sacramento + Coast (6 orgs)    [RUNNING]
Agent 4: North State + Coast (11 orgs)  [RUNNING]
Agent 5: LA batch 1 (20 orgs)           [RUNNING]
Agent 6: LA batch 2 (20 orgs)           [RUNNING]

Each agent searches: Glassdoor ratings, patient counts,
staff counts, EHR systems, programs, mission statements,
union info, careers URLs...

→ 6 agents × ~15 min each = 81 FQHCs enriched in parallel
→ Applied to california-fqhcs.ts (230KB data file)
→ npm run build → PASS ✓`}
          />
        </div>
        <div className="mt-6 rounded-xl border border-amber-900/30 bg-amber-950/20 p-4 text-center text-sm text-amber-400">
          Without agents: ~15 hours of manual research.
          With agents: <span className="font-bold text-white">~15 minutes</span>.
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 11: The Data Moat                                          */
  /* ================================================================ */
  {
    id: "data-moat",
    title: "The Data Moat",
    content: (
      <SlideWrapper>
        <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-teal-400">
          <Database className="size-4" />
          ARCHITECTURE
        </div>
        <h2 className="text-4xl font-black text-white sm:text-5xl">
          15+ data files as the intelligence moat
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-stone-400">
          The real product isn&apos;t the UI — it&apos;s the structured data underneath.
          Claude Code maintains and updates these daily.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { file: "california-fqhcs.ts", size: "230KB", desc: "220 FQHCs: Glassdoor, programs, EHR, salary, union" },
            { file: "fqhc-job-listings.ts", size: "125KB", desc: "156 listings: salary, role, region, requirements" },
            { file: "funding-impact-data.ts", size: "123KB", desc: "H.R. 1 timeline, revenue strategies, enrollment impact" },
            { file: "fqhc-news-intel.ts", size: "~530 lines", desc: "55 curated intel items, 8 categories, bilingual" },
            { file: "scope-of-practice.ts", size: "1,684 lines", desc: "10 CA roles, delegation matrix, BPC citations" },
            { file: "fqhc-movement-history.ts", size: "1,332 lines", desc: "30 events, 5 eras, 8 cross-cultural alliances" },
            { file: "career-assessment-engine.ts", size: "40KB+", desc: "55 questions, 5 domains, role-specific scoring" },
            { file: "fqhc-resilience.ts", size: "350 lines", desc: "5-dimension scoring for all 220 FQHCs" },
            { file: "regional-news-sources.ts", size: "350 lines", desc: "9 regions, local outlets, rotation schedule" },
          ].map((f, i) => (
            <div
              key={i}
              className="rounded-lg border border-stone-700/50 bg-stone-800/30 p-4"
            >
              <div className="flex items-center justify-between">
                <code className="text-xs text-teal-400">{f.file}</code>
                <span className="text-xs text-stone-600">{f.size}</span>
              </div>
              <div className="mt-1.5 text-xs text-stone-400">{f.desc}</div>
            </div>
          ))}
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 12: CLAUDE.md                                              */
  /* ================================================================ */
  {
    id: "claude-md",
    title: "CLAUDE.md",
    content: (
      <SlideWrapper>
        <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-teal-400">
          <FileText className="size-4" />
          THE SECRET
        </div>
        <h2 className="text-4xl font-black text-white sm:text-5xl">
          CLAUDE.md = Project memory
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-stone-400">
          A markdown file checked into your repo that Claude reads at the start
          of every session. It&apos;s the most important file in the project.
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div>
            <div className="mb-4 text-sm font-semibold text-stone-300">What&apos;s in ours (900+ lines):</div>
            <div className="space-y-2">
              {[
                "Project stack & conventions",
                "Every feature ever built (110+ entries)",
                "Data source inventory (15+ files with sizes)",
                "Slash command documentation",
                "Session log with daily summaries",
                "Decisions made (with reasoning)",
                "Nav structure & color palette",
                "Terms glossary (FQHC, ECM, CalAIM...)",
                "Database schema reference",
                "What's NOT built yet (MVP gaps)",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm text-stone-400"
                >
                  <CheckCircle2 className="size-3.5 shrink-0 text-teal-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <TerminalBlock
              title="CLAUDE.md — session log excerpt"
              prompt=""
              output={`## Session Log
| Date       | Summary |
|------------|---------|
| 2026-03-05 | Daily update #11 +
               regional news scanning...
| 2026-03-04 | Locum tenens page +
               SF crisis cluster (8 items)
| 2026-03-03 | Daily update #8 + branding
| 2026-03-01 | Masterclass + bibliography
| 2026-02-28 | 🎉 100th feature shipped!
| 2026-02-27 | Strategic pivot — Rumelt
               framework homepage
| ...        | 16 session entries total`}
            />
          </div>
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 13: Timeline                                               */
  /* ================================================================ */
  {
    id: "timeline",
    title: "Timeline",
    content: (
      <SlideWrapper>
        <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-amber-400">
          <Clock className="size-4" />
          3 WEEKS
        </div>
        <h2 className="text-4xl font-black text-white sm:text-5xl">
          The timeline
        </h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div>
            <TimelineItem
              week="W1"
              dates="Feb 16-18"
              title="Foundation"
              color="bg-teal-600"
              items={[
                "Career assessment engine (55 questions, 5 domains)",
                "Resume builder (8 templates, PDF export)",
                "Daily content pipeline (4 slash commands)",
                "FQHC directory (90 curated orgs)",
                "Security audit (20 vectors, 0 vulnerabilities)",
              ]}
            />
            <TimelineItem
              week="W2"
              dates="Feb 19-28"
              title="Intelligence Pivot"
              color="bg-amber-600"
              items={[
                "Directory expansion: 90 → 220 FQHCs (HRSA data)",
                "Strategic pivot from job board → executive monitor",
                "Rumelt framework homepage redesign",
                "5 new strategy pages + 4 interactive visualizations",
                "Newsletter system (Intel Brief + The Pulse)",
                "100th feature shipped 🎉",
              ]}
            />
          </div>
          <div>
            <TimelineItem
              week="W3"
              dates="Mar 1-5"
              title="Scale & Depth"
              color="bg-purple-600"
              items={[
                "15 executive masterclass modules",
                "200+ resource bibliography",
                "Regional news scanning (9 regions, 5-day rotation)",
                "SF crisis response: 8 intel items in one session",
                "FQHC enrichment: 35+ orgs with real Glassdoor/EHR/program data",
                "220 per-FQHC strategic reports (SSG)",
                "Offboarding toolkit + employer intake form",
              ]}
            />
            <div className="mt-4 rounded-xl border border-teal-900/30 bg-teal-950/20 p-5">
              <div className="text-center">
                <div className="text-3xl font-black text-teal-400">110+</div>
                <div className="text-sm text-stone-400">features in 16 sessions</div>
                <div className="mt-2 text-xs text-stone-600">
                  Average: ~7 features per session
                </div>
              </div>
            </div>
          </div>
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 14: Key Patterns                                           */
  /* ================================================================ */
  {
    id: "patterns",
    title: "Key Patterns",
    content: (
      <SlideWrapper>
        <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-teal-400">
          <Layers className="size-4" />
          LESSONS
        </div>
        <h2 className="text-4xl font-black text-white sm:text-5xl">
          Patterns that worked
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-stone-700/50 bg-stone-800/30 p-6">
            <div className="mb-3 text-lg font-bold text-teal-400">
              1. Data-first architecture
            </div>
            <p className="text-sm text-stone-400">
              Build the data files first, UI second. The 230KB FQHC directory,
              the assessment engine, the intel feed — these TypeScript data files
              ARE the product. Claude Code is excellent at maintaining structured
              data at scale.
            </p>
          </div>
          <div className="rounded-xl border border-stone-700/50 bg-stone-800/30 p-6">
            <div className="mb-3 text-lg font-bold text-amber-400">
              2. CLAUDE.md as institutional memory
            </div>
            <p className="text-sm text-stone-400">
              Every decision, every feature, every data source — logged in
              CLAUDE.md. When Claude reads this at session start, it has full
              context. No re-explaining. No drift. 900+ lines of cumulative
              knowledge.
            </p>
          </div>
          <div className="rounded-xl border border-stone-700/50 bg-stone-800/30 p-6">
            <div className="mb-3 text-lg font-bold text-green-400">
              3. Slash commands as playbooks
            </div>
            <p className="text-sm text-stone-400">
              Encode complex multi-step workflows as markdown instructions in
              .claude/commands/. The daily-update pipeline is 300+ lines of
              detailed instructions. Claude follows them like a senior dev
              following a runbook.
            </p>
          </div>
          <div className="rounded-xl border border-stone-700/50 bg-stone-800/30 p-6">
            <div className="mb-3 text-lg font-bold text-purple-400">
              4. Plan mode for non-trivial work
            </div>
            <p className="text-sm text-stone-400">
              Always have Claude plan before building anything complex. The
              planning step catches architectural mistakes, surfaces edge cases,
              and produces better code on the first pass. Saves more time than
              it takes.
            </p>
          </div>
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 15: What Surprised Me                                      */
  /* ================================================================ */
  {
    id: "surprises",
    title: "Surprises",
    content: (
      <SlideWrapper>
        <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-amber-400">
          <Sparkles className="size-4" />
          REFLECTIONS
        </div>
        <h2 className="text-4xl font-black text-white sm:text-5xl">
          What surprised me
        </h2>
        <div className="mt-8 space-y-6 max-w-3xl">
          <div className="flex gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white font-bold">1</div>
            <div>
              <div className="text-lg font-bold text-white">
                Speed is non-linear
              </div>
              <p className="mt-1 text-sm text-stone-400">
                Week 1: 30 features. Week 2: 40 features. Week 3: 40+ features.
                As CLAUDE.md grows and conventions solidify, Claude gets
                <em> faster</em>, not slower. It remembers your patterns.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-600 text-white font-bold">2</div>
            <div>
              <div className="text-lg font-bold text-white">
                Domain expertise still matters most
              </div>
              <p className="mt-1 text-sm text-stone-400">
                Claude can write any code — but it can&apos;t tell you what to build.
                Knowing the FQHC industry, understanding the crisis, spotting the
                SF budget cuts — that&apos;s the human edge. AI amplifies expertise,
                it doesn&apos;t replace it.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-white font-bold">3</div>
            <div>
              <div className="text-lg font-bold text-white">
                The product pivoted — and that was fine
              </div>
              <p className="mt-1 text-sm text-stone-400">
                Started as a job board. Became a strategic intelligence platform.
                The pivot happened mid-build when we realized executives needed
                crisis intelligence, not just job listings. Claude Code handled
                the architectural shift in one session.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-purple-600 text-white font-bold">4</div>
            <div>
              <div className="text-lg font-bold text-white">
                &quot;Beginner&quot; became irrelevant
              </div>
              <p className="mt-1 text-sm text-stone-400">
                I started knowing zero React, zero Next.js, zero TypeScript.
                Three weeks later: 110+ features, SSG, ISR, API routes, complex
                state management, bilingual i18n, data visualizations. Claude
                Code doesn&apos;t care about your experience level.
              </p>
            </div>
          </div>
        </div>
      </SlideWrapper>
    ),
  },

  /* ================================================================ */
  /*  Slide 16: Closing                                                */
  /* ================================================================ */
  {
    id: "closing",
    title: "Closing",
    content: (
      <SlideWrapper>
        <div className="text-center">
          <h2 className="text-4xl font-black text-white sm:text-5xl lg:text-6xl">
            One person.
            <br />
            Three weeks.
            <br />
            <span className="bg-gradient-to-r from-teal-400 to-amber-400 bg-clip-text text-transparent">
              110+ features.
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-xl text-stone-400">
            The tools are here. The question isn&apos;t whether AI can help you
            build — it&apos;s what you&apos;ll build with it.
          </p>
          <div className="mx-auto mt-12 grid max-w-md gap-4">
            <div className="rounded-xl border border-stone-700/50 bg-stone-800/50 p-4">
              <div className="text-sm text-stone-500">Live site</div>
              <div className="text-lg font-bold text-teal-400">fqhctalent.com</div>
            </div>
            <div className="rounded-xl border border-stone-700/50 bg-stone-800/50 p-4">
              <div className="text-sm text-stone-500">Built with</div>
              <div className="text-lg font-bold text-white">Claude Code by Anthropic</div>
            </div>
          </div>
          <div className="mt-12">
            <Heart className="mx-auto size-8 text-teal-500" />
          </div>
        </div>
      </SlideWrapper>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */
export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goNext = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  }, []);

  const goPrev = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "f" || e.key === "F") {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen();
        }
      } else if (e.key === "Escape") {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  // Hide site chrome (header, footer, announcement bar, feedback button)
  useEffect(() => {
    document.body.classList.add("presentation-mode");
    return () => document.body.classList.remove("presentation-mode");
  }, []);

  return (
    <>
      <style jsx global>{`
        body.presentation-mode > header,
        body.presentation-mode > footer,
        body.presentation-mode > button,
        body.presentation-mode > section,
        body.presentation-mode > div.relative.bg-gradient-to-r {
          display: none !important;
        }
        body.presentation-mode > main {
          min-height: auto !important;
        }
      `}</style>
      <div data-presentation className="relative min-h-screen bg-stone-950 text-white select-none">
      {/* Slide Content */}
      <div className="transition-opacity duration-300">
        {slides[currentSlide].content}
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between bg-stone-950/80 px-6 py-3 backdrop-blur-sm">
        <button
          onClick={goPrev}
          disabled={currentSlide === 0}
          className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-stone-400 transition hover:bg-stone-800 hover:text-white disabled:opacity-30"
        >
          <ChevronLeft className="size-4" />
          Prev
        </button>

        {/* Progress */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-stone-600">
            {currentSlide + 1} / {slides.length}
          </span>
          <div className="flex gap-1">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`size-2 rounded-full transition ${
                  i === currentSlide
                    ? "bg-teal-400"
                    : i < currentSlide
                      ? "bg-stone-600"
                      : "bg-stone-800"
                }`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={goNext}
          disabled={currentSlide === slides.length - 1}
          className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-stone-400 transition hover:bg-stone-800 hover:text-white disabled:opacity-30"
        >
          Next
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
    </>
  );
}
