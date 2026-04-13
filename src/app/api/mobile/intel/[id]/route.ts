import { NextResponse } from "next/server";
import { INTEL_ITEMS } from "@/lib/fqhc-news-intel";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-intel-item-${ip}`, { limit: 30, windowMs: 60000 });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const { id } = await params;
  const item = INTEL_ITEMS.find((i) => i.id === id);

  if (!item) {
    return NextResponse.json({ error: "Intel item not found." }, { status: 404 });
  }

  return NextResponse.json({ data: item });
}
