import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { checkRateLimit, getClientIp, checkContentLength, validateOrigin } from "@/lib/security";

const progressSchema = z.object({
  email: z.string().email().max(255),
  course_id: z.string().min(1).max(100),
  modules_completed: z.array(z.string()).optional(),
  exercise_scores: z.record(z.string(), z.number()).optional(),
  total_xp: z.number().int().min(0).optional(),
  current_module_id: z.string().max(200).optional(),
  capstone_data: z.record(z.string(), z.unknown()).optional(),
});

// POST: Save or update course progress (upsert by email + course_id)
export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const { allowed } = checkRateLimit(`progress:${ip}`, {
      limit: 10,
      windowMs: 60_000,
    });
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment." },
        { status: 429 }
      );
    }

    if (!checkContentLength(request, 100_000)) {
      return NextResponse.json({ error: "Payload too large." }, { status: 413 });
    }

    const body = await request.json();
    const result = progressSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Please check your data and try again." },
        { status: 400 }
      );
    }

    const {
      email,
      course_id,
      modules_completed,
      exercise_scores,
      total_xp,
      current_module_id,
      capstone_data,
    } = result.data;

    const { error } = await supabaseAdmin.from("course_progress").upsert(
      {
        email,
        course_id,
        modules_completed: modules_completed || [],
        exercise_scores: exercise_scores || {},
        total_xp: total_xp || 0,
        current_module_id: current_module_id || null,
        capstone_data: capstone_data || null,
        last_active_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "email,course_id" }
    );

    if (error) {
      console.error(
        "Supabase course-progress error:",
        error.code,
        error.message
      );
      if (error.code === "42P01") {
        console.error(
          "[PROGRESS] Table 'course_progress' missing — run supabase-data-collection.sql"
        );
        return NextResponse.json(
          { error: "Progress sync temporarily unavailable." },
          { status: 503 }
        );
      }
      return NextResponse.json(
        { error: "Could not save progress. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Progress saved!",
      synced: true,
    });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}

// GET: Retrieve course progress for an email + course_id
export async function GET(request: Request) {
  try {
    // Require same-origin requests to prevent enumeration via external scripts
    if (!validateOrigin(request)) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    const ip = getClientIp(request);
    const { allowed } = checkRateLimit(`progress-read:${ip}`, {
      limit: 20,
      windowMs: 60_000,
    });
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests." },
        { status: 429 }
      );
    }

    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const course_id = searchParams.get("course_id");

    if (!email || !course_id) {
      return NextResponse.json(
        { error: "Email and course_id are required." },
        { status: 400 }
      );
    }

    // Basic email validation
    if (!z.string().email().safeParse(email).success) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("course_progress")
      .select("*")
      .eq("email", email)
      .eq("course_id", course_id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // No row found — that's fine, no progress yet
        return NextResponse.json({ progress: null });
      }
      console.error(
        "Supabase course-progress GET error:",
        error.code,
        error.message
      );
      return NextResponse.json(
        { error: "Could not retrieve progress." },
        { status: 500 }
      );
    }

    return NextResponse.json({ progress: data });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
