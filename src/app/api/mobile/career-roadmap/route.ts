import { NextResponse } from "next/server";
import { CAREER_PATHWAYS, REGIONAL_MULTIPLIERS } from "@/lib/career-pathways";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-roadmap-${ip}`, { limit: 30, windowMs: 60000 });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const url = new URL(request.url);
  const trackId = url.searchParams.get("track");

  let pathways = CAREER_PATHWAYS;
  if (trackId) {
    pathways = pathways.filter((p) => p.id === trackId);
  }

  return NextResponse.json({
    data: pathways,
    regionalMultipliers: REGIONAL_MULTIPLIERS,
    totalCount: pathways.length,
  });
}
