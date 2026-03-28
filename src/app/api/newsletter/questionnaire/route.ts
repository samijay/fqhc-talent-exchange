import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { checkRateLimit, getClientIp, validateOrigin } from "@/lib/security";

const questionnaireSchema = z.object({
  email: z.string().email().max(255),
  audience: z.enum(["intel-brief", "the-pulse", "both"]),
  roleType: z.string().max(100),
  primaryChallenge: z.string().max(100),
  region: z.string().max(100).optional(),
  orgSize: z.string().max(50).optional(),
  preferences: z.record(z.string().max(50), z.string().max(200)).optional(),
});

export async function POST(request: Request) {
  try {
    if (!validateOrigin(request)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const ip = getClientIp(request);
    const { allowed } = checkRateLimit(`newsletter-questionnaire:${ip}`, {
      limit: 3,
      windowMs: 60_000,
    });
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = questionnaireSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid questionnaire data. Please check all fields." },
        { status: 400 }
      );
    }

    const { email, audience, roleType, primaryChallenge, region, orgSize, preferences } =
      result.data;

    // Upsert — update if subscriber exists, insert if new
    const { error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .upsert(
        {
          email,
          audience,
          region: region ?? null,
          role_type: roleType,
          primary_challenge: primaryChallenge,
          org_size: orgSize ?? null,
          preferences: {
            ...preferences,
            questionnaire_completed: true,
            questionnaire_date: new Date().toISOString(),
          },
          status: "active",
        },
        { onConflict: "email", ignoreDuplicates: false }
      );

    if (error) {
      console.error("Supabase questionnaire upsert error:", error.code, error.message);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
