import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { checkRateLimit, getClientIp } from "@/lib/security";

/* ------------------------------------------------------------------ */
/*  POST /api/locum-providers — Provider interest form submission       */
/* ------------------------------------------------------------------ */

const locumProviderSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  role: z.enum(["md", "np", "pa", "dentist"]),
  licenseNumber: z.string().max(50).optional(),
  availableDays: z.string().max(20),
  region: z.string().max(50),
  ehrExperience: z.array(z.string().max(100)).max(10).optional(),
});

export async function POST(request: Request) {
  try {
    // Rate limit: 3 submissions per hour per IP
    const ip = getClientIp(request);
    const { allowed } = checkRateLimit(`locum-providers:${ip}`, {
      limit: 3,
      windowMs: 3_600_000,
    });
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait and try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const result = locumProviderSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Please check your form and try again." },
        { status: 400 },
      );
    }

    const { name, email, role, licenseNumber, availableDays, region, ehrExperience } =
      result.data;

    const { error } = await supabaseAdmin.from("locum_providers").insert({
      name,
      email: email.toLowerCase(),
      role,
      license_number: licenseNumber || null,
      available_days: availableDays,
      region,
      ehr_experience: ehrExperience || [],
    });

    if (error) {
      console.error("Supabase locum_providers error:", error.code, error.message);

      // Table doesn't exist yet
      if (error.code === "42P01") {
        console.error(
          "[LOCUM_PROVIDERS] Table 'locum_providers' missing — run supabase-locum-tenens.sql migration.",
        );
        return NextResponse.json(
          { error: "This feature is temporarily unavailable. Please try again later." },
          { status: 503 },
        );
      }

      // Duplicate email
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "You have already submitted your information. We will be in touch." },
          { status: 409 },
        );
      }

      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Thank you for your interest! We will reach out when coverage opportunities match your availability." },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
