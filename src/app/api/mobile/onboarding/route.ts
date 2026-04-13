import { NextResponse } from "next/server";
import { californiaFQHCs } from "@/lib/california-fqhcs";
import { checkRateLimit, getClientIp } from "@/lib/security";

/** Lightweight FQHC list for onboarding autocomplete. Returns only name, slug, city, region. */
export async function GET(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-onboard-${ip}`, { limit: 10, windowMs: 60000 });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.toLowerCase();

  let fqhcs = californiaFQHCs.map((f) => ({
    slug: f.slug,
    name: f.name,
    city: f.city,
    region: f.region,
  }));

  // Filter by search query if provided
  if (q && q.length >= 2) {
    fqhcs = fqhcs.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.city.toLowerCase().includes(q)
    );
  }

  // Sort alphabetically
  fqhcs.sort((a, b) => a.name.localeCompare(b.name));

  return NextResponse.json({
    data: fqhcs,
    totalCount: fqhcs.length,
  });
}
