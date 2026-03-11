import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { checkRateLimit, getClientIp } from "@/lib/security";

const eventSchema = z.object({
  event_type: z.enum([
    "okr_download",
    "okr_download_all",
    "course_enroll",
    "course_complete",
    "simulator_run",
    "resume_create",
    "pathway_start",
    "pathway_complete",
    "assessment_complete",
  ]),
  tool_name: z.string().min(1).max(100),
  item_id: z.string().max(200).optional(),
  email: z.string().email().max(255).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  locale: z.enum(["en", "es"]).optional(),
});

export async function POST(request: Request) {
  try {
    // Rate limit: 20 events per minute per IP (generous — tools fire multiple events)
    const ip = getClientIp(request);
    const { allowed } = checkRateLimit(`track:${ip}`, {
      limit: 20,
      windowMs: 60_000,
    });
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = eventSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid event data." },
        { status: 400 }
      );
    }

    const { event_type, tool_name, item_id, email, metadata, locale } =
      result.data;

    const { error } = await supabaseAdmin.from("tool_events").insert({
      event_type,
      tool_name,
      item_id: item_id || null,
      email: email || null,
      metadata: metadata || {},
      locale: locale || "en",
    });

    if (error) {
      console.error("Supabase track-event error:", error.code, error.message);
      // Silent fail for tracking — don't disrupt user experience
      if (error.code === "42P01") {
        console.error(
          "[TRACK] Table 'tool_events' missing — run supabase-data-collection.sql"
        );
      }
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true });
  } catch {
    // Silent fail — tracking should never break the user experience
    return NextResponse.json({ ok: true });
  }
}
