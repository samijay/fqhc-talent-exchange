import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { checkRateLimit, getClientIp } from "@/lib/security";

const earlyAccessSchema = z.object({
  email: z.string().email().max(255),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 5 per minute per IP
    const ip = getClientIp(request);
    const { allowed } = checkRateLimit(`early-access:${ip}`, { limit: 5, windowMs: 60_000 });
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = earlyAccessSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const { email } = result.data;

    const { error } = await supabaseAdmin
      .from("early_access_signups")
      .insert({ email });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { message: "You're already signed up!" },
          { status: 200 }
        );
      }

      console.error("Supabase early access insert error:", error.code, error.message);
      return NextResponse.json(
        { error: "Failed to sign up. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "You're in! Watch your inbox." },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
