import { NextResponse } from "next/server";
import { z } from "zod";
import { sendIntelBrief, sendPulse } from "@/lib/newsletter-send";
import { verifySecret } from "@/lib/security";
import type { IntelBriefContent, PulseContent } from "@/lib/newsletter-templates";

/**
 * POST /api/newsletter/send
 *
 * Sends a newsletter to all active subscribers for the specified track.
 * Protected by NEWSLETTER_SECRET env var (must match Authorization header).
 *
 * Body: { track: "intel-brief" | "the-pulse", content: IntelBriefContent | PulseContent }
 */

const sendSchema = z.object({
  track: z.enum(["intel-brief", "the-pulse"]),
  content: z.record(z.string(), z.unknown()), // Validated at the template level
});

export async function POST(request: Request) {
  try {
    // Auth check — requires NEWSLETTER_SECRET
    const secret = process.env.NEWSLETTER_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "Newsletter sending not configured. Set NEWSLETTER_SECRET env var." },
        { status: 503 },
      );
    }

    const authHeader = request.headers.get("authorization") ?? "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
    if (!token || !verifySecret(token, secret)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const parsed = sendSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request. Provide track and content." },
        { status: 400 },
      );
    }

    const { track, content } = parsed.data;

    let result;
    if (track === "intel-brief") {
      result = await sendIntelBrief(content as unknown as IntelBriefContent);
    } else {
      result = await sendPulse(content as unknown as PulseContent);
    }

    return NextResponse.json({
      success: true,
      track,
      total: result.total,
      sent: result.sent,
      failed: result.failed,
      // Don't return subscriber emails in error details — PII protection
    });
  } catch (err) {
    console.error("Newsletter send error:", err);
    return NextResponse.json(
      { error: "Failed to send newsletter." },
      { status: 500 },
    );
  }
}
