import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { checkRateLimit, getClientIp } from "@/lib/security";

const feedbackSchema = z.object({
  page_url: z.string().min(1).max(500),
  feedback_type: z.enum(["bug", "suggestion", "praise", "other"]),
  message: z.string().min(1).max(2000),
  email: z.string().email().max(255).optional(),
});

export async function POST(request: Request) {
  try {
    // Rate limit: 5 feedback submissions per minute per IP
    const ip = getClientIp(request);
    const { allowed } = checkRateLimit(`feedback:${ip}`, {
      limit: 5,
      windowMs: 60_000,
    });
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = feedbackSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Please check your form and try again." },
        { status: 400 }
      );
    }

    const { page_url, feedback_type, message, email } = result.data;

    const { error } = await supabaseAdmin.from("feedback_submissions").insert({
      page_url,
      feedback_type,
      message,
      email: email || null,
    });

    if (error) {
      console.error("Supabase feedback error:", error.code, error.message);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Thank you!" });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
