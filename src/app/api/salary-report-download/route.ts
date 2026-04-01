import { NextRequest, NextResponse } from "next/server";

/* ------------------------------------------------------------------ */
/*  POST /api/salary-report-download                                   */
/*  Captures lead info before salary report PDF download.              */
/*  Currently logs to console. Supabase integration later.             */
/* ------------------------------------------------------------------ */

interface DownloadRequest {
  name: string;
  email: string;
  organization: string;
}

// Simple in-memory rate limiting (per-IP, 10 requests per hour)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = (await request.json()) as DownloadRequest;

    // Basic validation
    if (!body.name || typeof body.name !== "string" || body.name.length < 2) {
      return NextResponse.json(
        { error: "Name is required (minimum 2 characters)." },
        { status: 400 }
      );
    }

    if (
      !body.email ||
      typeof body.email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)
    ) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (
      !body.organization ||
      typeof body.organization !== "string" ||
      body.organization.length < 2
    ) {
      return NextResponse.json(
        { error: "Organization is required (minimum 2 characters)." },
        { status: 400 }
      );
    }

    // Log the download request (Supabase integration later)
    console.log("[salary-report-download]", {
      name: body.name,
      email: body.email,
      organization: body.organization,
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
