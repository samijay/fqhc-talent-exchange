import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { checkRateLimit, getClientIp } from "@/lib/security";

const subscribeSchema = z.object({
  email: z.string().email().max(255),
  audience: z.enum(["intel-brief", "the-pulse", "both"]),
  region: z.string().max(100).optional(),
  roleInterest: z.string().max(200).optional(),
});

export async function POST(request: Request) {
  try {
    // Rate limit: 1 subscribe per 10 seconds per IP
    const ip = getClientIp(request);
    const { allowed } = checkRateLimit(`newsletter-subscribe:${ip}`, {
      limit: 1,
      windowMs: 10_000,
    });
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = subscribeSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Please provide a valid email and audience selection." },
        { status: 400 }
      );
    }

    const { email, audience, region, roleInterest } = result.data;

    // Generate a unique unsubscribe token
    const unsubscribeToken = crypto.randomUUID();

    // Upsert: if email exists (even if unsubscribed), reactivate it
    const { error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .upsert(
        {
          email,
          audience,
          region: region || null,
          role_interest: roleInterest || null,
          status: "active",
          unsubscribe_token: unsubscribeToken,
          unsubscribed_at: null,
          subscribed_at: new Date().toISOString(),
        },
        { onConflict: "email" }
      );

    if (error) {
      console.error(
        "Supabase newsletter-subscribe error:",
        error.code,
        error.message
      );
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Subscribed successfully",
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}
