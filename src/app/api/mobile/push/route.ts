import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { checkRateLimit, getClientIp } from "@/lib/security";

const registerSchema = z.object({
  pushToken: z.string().min(1).max(500),
  platform: z.enum(["ios", "android"]),
  locale: z.enum(["en", "es"]).default("en"),
  fqhcSlug: z.string().max(200).nullable().optional(),
  role: z.string().max(200).optional(),
  region: z.string().max(200).nullable().optional(),
  preferences: z.object({
    breakingIntel: z.boolean().default(true),
    warnAlerts: z.boolean().default(true),
    legislation: z.boolean().default(true),
    fundingCliffs: z.boolean().default(true),
    jobMatches: z.boolean().default(true),
    weeklyDigest: z.boolean().default(true),
    jobMatchFrequency: z.enum(["immediate", "daily"]).default("daily"),
    warnRegions: z.array(z.string()).default([]),
  }).optional(),
});

/**
 * POST: Register a push notification token.
 * Called when the app first gets notification permission and on each app open (token may change).
 */
export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-push-${ip}`, { limit: 10, windowMs: 60000 });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const result = registerSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { pushToken, platform, locale, fqhcSlug, role, region, preferences } = result.data;

  try {
    // Upsert by pushToken — if the token already exists, update it
    const { error } = await supabaseAdmin
      .from("push_subscriptions")
      .upsert(
        {
          push_token: pushToken,
          platform,
          locale,
          fqhc_slug: fqhcSlug || null,
          role: role || null,
          region: region || null,
          preferences: preferences || {
            breakingIntel: true,
            warnAlerts: true,
            legislation: true,
            fundingCliffs: true,
            jobMatches: true,
            weeklyDigest: true,
            jobMatchFrequency: "daily",
            warnRegions: [],
          },
          updated_at: new Date().toISOString(),
        },
        { onConflict: "push_token" }
      );

    if (error) {
      // Table might not exist yet — that's OK, we'll create it when push is ready
      if (error.code === "42P01") {
        return NextResponse.json({ message: "Push registration noted (table pending setup)." });
      }
      console.error("Push registration error:", error);
      return NextResponse.json({ error: "Registration failed." }, { status: 500 });
    }

    return NextResponse.json({ message: "Registered." });
  } catch (err) {
    console.error("Push registration error:", err);
    return NextResponse.json({ error: "Registration failed." }, { status: 500 });
  }
}
