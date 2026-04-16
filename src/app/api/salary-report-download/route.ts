import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit, getClientIp } from "@/lib/security";

/* ------------------------------------------------------------------ */
/*  POST /api/salary-report-download                                   */
/*  Captures lead info before salary report PDF download.              */
/*  Currently logs to console. Supabase integration later.             */
/* ------------------------------------------------------------------ */

const DownloadSchema = z.object({
  name: z.string().min(2, "Name is required (minimum 2 characters)."),
  email: z.string().email("A valid email address is required."),
  organization: z.string().min(2, "Organization is required (minimum 2 characters)."),
});

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const rl = checkRateLimit(`salary-report:${ip}`, { limit: 10, windowMs: 60 * 60 * 1000 });
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body: unknown = await request.json();
    const parsed = DownloadSchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Invalid request.";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const { name, email, organization } = parsed.data;

    // Log the download request (Supabase integration later)
    console.log("[salary-report-download]", {
      name,
      email,
      organization,
      timestamp: new Date().toISOString(),
      ip,
    });

    return NextResponse.json({
      success: true,
      message: "Download authorized. Generating PDF...",
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}
