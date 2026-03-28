"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// ── Types ──

interface AnalyticsData {
  signups: {
    candidateWaitlist: number;
    employerWaitlist: number;
    newsletterSubscribers: number;
    newsletterByAudience: { audience: string; count: number }[];
    offboardingIntake: number;
    locumProviders: number;
    locumRequests: number;
  };
  toolUsage: {
    resumeCreate: number;
    okrDownload: number;
    okrDownloadAll: number;
    simulatorRun: number;
    assessmentComplete: number;
  };
  learning: {
    pathwayStart: number;
    pathwayComplete: number;
    courseEnroll: number;
    courseComplete: number;
  };
  engagement: {
    managerAssessments: number;
    feedbackSubmissions: number;
    newsletterSends: number;
    userProfiles: number;
    contentReads: number;
    userFavorites: number;
  };
  recentActivity: {
    event_type: string;
    tool_name: string | null;
    item_id: string | null;
    created_at: string;
  }[];
  weeklyTrends: { week: string; signups: number }[];
  generatedAt: string;
}

// ── Helpers ──

function formatEventType(type: string): string {
  return type
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

// ── Components ──

function MetricCard({ label, value, sub }: { label: string; value: number; sub?: string }) {
  const display = value === -1 ? "—" : value.toLocaleString();
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-800">
      <p className="text-sm text-stone-500 dark:text-stone-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-stone-900 dark:text-stone-100">{display}</p>
      {sub && <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-500">{sub}</p>}
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="mb-3 mt-8 text-lg font-semibold text-stone-800 dark:text-stone-200">
      {title}
    </h2>
  );
}

function SkeletonCard() {
  return (
    <div className="motion-safe:animate-pulse rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-800">
      <div className="h-4 w-24 rounded bg-stone-200 dark:bg-stone-700" />
      <div className="mt-3 h-7 w-16 rounded bg-stone-200 dark:bg-stone-700" />
    </div>
  );
}

// ── Page (inner) ──

function AdminAnalyticsInner() {
  const { user, loading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const secretKey = searchParams.get("key");
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const headers: Record<string, string> = {};
      if (secretKey) {
        headers["Authorization"] = `Bearer ${secretKey}`;
      }
      const res = await fetch("/api/admin/analytics", { headers });
      if (res.status === 401) {
        setError("sign-in");
        return;
      }
      if (res.status === 403) {
        setError("forbidden");
        return;
      }
      if (!res.ok) {
        setError("failed");
        return;
      }
      const json = await res.json();
      setData(json);
      setError(null);
    } catch {
      setError("failed");
    } finally {
      setLoading(false);
    }
  }, [secretKey]);

  // Initial fetch + auto-refresh every 60s
  useEffect(() => {
    if (authLoading) return;
    fetchData();
    const interval = setInterval(fetchData, 60_000);
    return () => clearInterval(interval);
  }, [authLoading, fetchData, secretKey]);

  // Auth loading (skip if using secret key)
  if (authLoading && !secretKey) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50 dark:bg-stone-900">
        <p className="text-stone-500">Checking auth...</p>
      </div>
    );
  }

  // Not signed in (skip if using secret key)
  if (!secretKey && (error === "sign-in" || (!user && !loading))) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-stone-50 dark:bg-stone-900">
        <h1 className="text-xl font-bold text-stone-800 dark:text-stone-200">Sign in required</h1>
        <p className="text-stone-500">You need to sign in with your admin account to view analytics.</p>
        <Link href="/login" className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800">
          Sign In
        </Link>
      </div>
    );
  }

  // Forbidden
  if (error === "forbidden") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-stone-50 dark:bg-stone-900">
        <h1 className="text-xl font-bold text-stone-800 dark:text-stone-200">Access denied</h1>
        <p className="text-stone-500">Your account does not have admin access.</p>
      </div>
    );
  }

  // Error
  if (error === "failed") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-stone-50 dark:bg-stone-900">
        <h1 className="text-xl font-bold text-stone-800 dark:text-stone-200">Failed to load</h1>
        <p className="text-stone-500">Could not fetch analytics data. Try refreshing.</p>
        <button onClick={fetchData} className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800">
          Retry
        </button>
      </div>
    );
  }

  // Loading skeleton
  if (loading || !data) {
    return (
      <div className="min-h-screen bg-stone-50 p-6 dark:bg-stone-900">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 h-8 w-64 motion-safe:animate-pulse rounded bg-stone-200 dark:bg-stone-700" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  // Compute totals
  const totalSignups =
    data.signups.candidateWaitlist +
    data.signups.employerWaitlist +
    data.signups.newsletterSubscribers +
    data.signups.offboardingIntake +
    data.signups.locumProviders +
    data.signups.locumRequests;

  const totalToolUses =
    data.toolUsage.resumeCreate +
    data.toolUsage.okrDownload +
    data.toolUsage.okrDownloadAll +
    data.toolUsage.simulatorRun +
    data.toolUsage.assessmentComplete;

  const totalLearning =
    data.learning.pathwayStart +
    data.learning.pathwayComplete +
    data.learning.courseEnroll +
    data.learning.courseComplete;

  // Max for weekly trend bar scaling
  const maxWeekly = Math.max(...(data.weeklyTrends.map((w) => w.signups) || [1]), 1);

  return (
    <div className="min-h-screen bg-stone-50 p-4 dark:bg-stone-900 sm:p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
              FQHC Talent Exchange — Analytics
            </h1>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-500">
              Last refreshed: {new Date(data.generatedAt).toLocaleString()} &middot; Auto-refreshes every 60s
            </p>
          </div>
          <button
            onClick={fetchData}
            className="rounded-lg border border-stone-300 px-3 py-1.5 text-sm text-stone-600 hover:bg-stone-100 dark:border-stone-600 dark:text-stone-500 dark:hover:bg-stone-800"
          >
            Refresh
          </button>
        </div>

        {/* Summary row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border-2 border-teal-200 bg-teal-50 p-5 dark:border-teal-800 dark:bg-teal-950">
            <p className="text-sm font-medium text-teal-700 dark:text-teal-400">Total Signups</p>
            <p className="mt-1 text-3xl font-bold text-teal-900 dark:text-teal-100">{totalSignups.toLocaleString()}</p>
          </div>
          <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-5 dark:border-amber-800 dark:bg-amber-950">
            <p className="text-sm font-medium text-amber-700 dark:text-amber-400">Tool Uses</p>
            <p className="mt-1 text-3xl font-bold text-amber-900 dark:text-amber-100">{totalToolUses.toLocaleString()}</p>
          </div>
          <div className="rounded-xl border-2 border-stone-200 bg-white p-5 dark:border-stone-700 dark:bg-stone-800">
            <p className="text-sm font-medium text-stone-600 dark:text-stone-500">Learning Events</p>
            <p className="mt-1 text-3xl font-bold text-stone-900 dark:text-stone-100">{totalLearning.toLocaleString()}</p>
          </div>
        </div>

        {/* Signups */}
        <SectionHeader title="Signups" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <MetricCard label="Candidate Waitlist" value={data.signups.candidateWaitlist} />
          <MetricCard label="Employer Waitlist" value={data.signups.employerWaitlist} />
          <MetricCard
            label="Newsletter Subscribers"
            value={data.signups.newsletterSubscribers}
            sub={data.signups.newsletterByAudience
              .map((a) => `${a.audience}: ${a.count}`)
              .join(" · ") || undefined}
          />
          <MetricCard label="Offboarding Intake" value={data.signups.offboardingIntake} />
          <MetricCard label="Locum Providers" value={data.signups.locumProviders} />
          <MetricCard label="Locum Requests" value={data.signups.locumRequests} />
        </div>

        {/* Tool Usage */}
        <SectionHeader title="Tool Usage" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <MetricCard label="Resume Downloads" value={data.toolUsage.resumeCreate} />
          <MetricCard label="OKR Downloads" value={data.toolUsage.okrDownload} sub="Single template" />
          <MetricCard label="OKR Download All" value={data.toolUsage.okrDownloadAll} sub="Full workbook" />
          <MetricCard label="Simulator Runs" value={data.toolUsage.simulatorRun} />
          <MetricCard label="Assessments" value={data.toolUsage.assessmentComplete} />
        </div>

        {/* Learning */}
        <SectionHeader title="Learning & Pathways" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <MetricCard label="Pathway Starts" value={data.learning.pathwayStart} />
          <MetricCard label="Pathway Completions" value={data.learning.pathwayComplete} />
          <MetricCard label="Course Enrollments" value={data.learning.courseEnroll} />
          <MetricCard label="Course Completions" value={data.learning.courseComplete} />
        </div>

        {/* Engagement */}
        <SectionHeader title="Engagement" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <MetricCard label="Manager Assessments" value={data.engagement.managerAssessments} />
          <MetricCard label="Feedback Submissions" value={data.engagement.feedbackSubmissions} />
          <MetricCard label="Newsletter Emails Sent" value={data.engagement.newsletterSends} />
          <MetricCard label="Dashboard Users" value={data.engagement.userProfiles} />
          <MetricCard label="Content Reads" value={data.engagement.contentReads} />
          <MetricCard label="Favorites Saved" value={data.engagement.userFavorites} />
        </div>

        {/* Weekly Trends */}
        {data.weeklyTrends.length > 0 && (
          <>
            <SectionHeader title="Weekly Signup Trends (Last 8 Weeks)" />
            <div className="rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-800">
              <div className="flex items-end gap-2" style={{ height: 120 }}>
                {data.weeklyTrends.map((week) => (
                  <div key={week.week} className="flex flex-1 flex-col items-center gap-1">
                    <span className="text-xs font-medium text-stone-600 dark:text-stone-500">
                      {week.signups}
                    </span>
                    <div
                      className="w-full rounded-t bg-teal-500 dark:bg-teal-600"
                      style={{
                        height: `${Math.max((week.signups / maxWeekly) * 80, 4)}px`,
                      }}
                    />
                    <span className="text-xs text-stone-500">
                      {new Date(week.week).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Recent Activity */}
        <SectionHeader title="Recent Activity" />
        <div className="rounded-lg border border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-800">
          {data.recentActivity.length === 0 ? (
            <p className="p-4 text-sm text-stone-500">No recent tool events</p>
          ) : (
            <ul className="divide-y divide-stone-100 dark:divide-stone-700">
              {data.recentActivity.map((event, i) => (
                <li key={i} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <span className="text-sm font-medium text-stone-800 dark:text-stone-200">
                      {formatEventType(event.event_type)}
                    </span>
                    {event.tool_name && (
                      <span className="ml-2 text-xs text-stone-500">{event.tool_name}</span>
                    )}
                    {event.item_id && (
                      <span className="ml-2 text-xs text-stone-500">#{event.item_id}</span>
                    )}
                  </div>
                  <span className="text-xs text-stone-500">{timeAgo(event.created_at)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <p className="mt-8 pb-8 text-center text-xs text-stone-500">
          Counts of -1 indicate the table may not exist yet. Check Supabase.
        </p>
      </div>
    </div>
  );
}

// ── Page (exported) ──

export default function AdminAnalyticsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-stone-50 dark:bg-stone-900">
          <div className="size-8 motion-safe:animate-spin rounded-full border-2 border-stone-300 border-t-teal-700" />
        </div>
      }
    >
      <AdminAnalyticsInner />
    </Suspense>
  );
}
