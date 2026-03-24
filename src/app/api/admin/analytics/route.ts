import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase";
import { checkRateLimit, getClientIp } from "@/lib/security";

const ADMIN_EMAILS = (process.env.ADMIN_EMAIL ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

async function getCount(table: string): Promise<number> {
  const { count, error } = await supabaseAdmin
    .from(table)
    .select("*", { count: "exact", head: true });
  if (error) return -1;
  return count ?? 0;
}

async function getEventCount(eventType: string): Promise<number> {
  const { count, error } = await supabaseAdmin
    .from("tool_events")
    .select("*", { count: "exact", head: true })
    .eq("event_type", eventType);
  if (error) return -1;
  return count ?? 0;
}

export async function GET(request: Request) {
  // Rate limit
  const ip = getClientIp(request);
  const rl = checkRateLimit(`admin-analytics:${ip}`, { limit: 10, windowMs: 60_000 });
  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  // Auth check — accept either:
  // (a) Secret key via ?key= query param (uses NEWSLETTER_SECRET)
  // (b) Logged-in Supabase user with admin email
  const url = new URL(request.url);
  const keyParam = url.searchParams.get("key");
  const adminSecret = process.env.NEWSLETTER_SECRET;

  const hasValidKey = adminSecret && keyParam === adminSecret;

  if (!hasValidKey) {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (ADMIN_EMAILS.length === 0 || !ADMIN_EMAILS.includes(user.email.toLowerCase())) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  // Run all queries in parallel
  const [
    candidateWaitlist,
    employerWaitlist,
    newsletterSubscribers,
    offboardingIntake,
    locumProviders,
    locumRequests,
    managerAssessments,
    feedbackSubmissions,
    newsletterSends,
    userProfiles,
    contentReads,
    userFavorites,
    resumeCreate,
    okrDownload,
    okrDownloadAll,
    simulatorRun,
    assessmentComplete,
    pathwayStart,
    pathwayComplete,
    courseEnroll,
    courseComplete,
    recentActivity,
    newsletterByAudience,
    weeklyTrends,
  ] = await Promise.all([
    getCount("candidate_waitlist"),
    getCount("employer_waitlist"),
    getCount("newsletter_subscribers"),
    getCount("offboarding_intake"),
    getCount("locum_providers"),
    getCount("locum_requests"),
    getCount("manager_assessments"),
    getCount("feedback_submissions"),
    getCount("newsletter_sends"),
    getCount("user_profiles"),
    getCount("content_reads"),
    getCount("user_favorites"),
    getEventCount("resume_create"),
    getEventCount("okr_download"),
    getEventCount("okr_download_all"),
    getEventCount("simulator_run"),
    getEventCount("assessment_complete"),
    getEventCount("pathway_start"),
    getEventCount("pathway_complete"),
    getEventCount("course_enroll"),
    getEventCount("course_complete"),
    // Recent activity
    supabaseAdmin
      .from("tool_events")
      .select("event_type, tool_name, item_id, created_at")
      .order("created_at", { ascending: false })
      .limit(15),
    // Newsletter by audience — fetch all and group client-side
    (async () => {
      try {
        const { data } = await supabaseAdmin
          .from("newsletter_subscribers")
          .select("audience");
        if (!data) return [];
        const counts: Record<string, number> = {};
        for (const row of data) {
          const a = (row.audience as string) || "unknown";
          counts[a] = (counts[a] || 0) + 1;
        }
        return Object.entries(counts).map(([audience, count]) => ({ audience, count }));
      } catch {
        return [];
      }
    })(),
    // Weekly signup trends (last 8 weeks) — fetch recent signups and bucket
    (async () => {
      const eightWeeksAgo = new Date(Date.now() - 8 * 7 * 24 * 60 * 60 * 1000).toISOString();
      const [candidates, subscribers] = await Promise.all([
        supabaseAdmin
          .from("candidate_waitlist")
          .select("created_at")
          .gte("created_at", eightWeeksAgo)
          .then((r) => r.data ?? []),
        supabaseAdmin
          .from("newsletter_subscribers")
          .select("subscribed_at")
          .gte("subscribed_at", eightWeeksAgo)
          .then((r) => r.data ?? []),
      ]);
      // Bucket by ISO week start (Monday)
      const weeks: Record<string, number> = {};
      const allDates = [
        ...candidates.map((c) => c.created_at),
        ...subscribers.map((s) => s.subscribed_at),
      ];
      for (const dateStr of allDates) {
        if (!dateStr) continue;
        const d = new Date(dateStr);
        const day = d.getDay();
        const mondayOffset = day === 0 ? -6 : 1 - day;
        const monday = new Date(d);
        monday.setDate(d.getDate() + mondayOffset);
        const weekKey = monday.toISOString().slice(0, 10);
        weeks[weekKey] = (weeks[weekKey] || 0) + 1;
      }
      return Object.entries(weeks)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([week, signups]) => ({ week, signups }));
    })().catch(() => []),
  ]);

  return NextResponse.json({
    signups: {
      candidateWaitlist,
      employerWaitlist,
      newsletterSubscribers,
      newsletterByAudience: newsletterByAudience ?? [],
      offboardingIntake,
      locumProviders,
      locumRequests,
    },
    toolUsage: {
      resumeCreate,
      okrDownload,
      okrDownloadAll,
      simulatorRun,
      assessmentComplete,
    },
    learning: {
      pathwayStart,
      pathwayComplete,
      courseEnroll,
      courseComplete,
    },
    engagement: {
      managerAssessments,
      feedbackSubmissions,
      newsletterSends,
      userProfiles,
      contentReads,
      userFavorites,
    },
    recentActivity: recentActivity.data ?? [],
    weeklyTrends: weeklyTrends ?? [],
    generatedAt: new Date().toISOString(),
  });
}
