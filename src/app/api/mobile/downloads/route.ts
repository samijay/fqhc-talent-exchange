import { NextResponse } from "next/server";
import { DOWNLOAD_ITEMS, DOWNLOAD_CATEGORIES } from "@/lib/downloads-catalog";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-downloads-${ip}`, { limit: 30, windowMs: 60000 });
  if (!allowed) return NextResponse.json({ error: "Too many requests." }, { status: 429 });

  const url = new URL(request.url);
  const category = url.searchParams.get("category");

  let items = DOWNLOAD_ITEMS.map((d) => ({
    id: d.id,
    title: d.title,
    esTitle: d.esTitle,
    description: d.description,
    esDescription: d.esDescription,
    format: d.format,
    category: d.category,
    sourcePage: d.sourcePage,
    icon: d.icon,
  }));

  if (category) items = items.filter((d) => d.category === category);

  const categories = DOWNLOAD_CATEGORIES.map((c) => ({
    id: c.id,
    title: c.title,
    esTitle: c.esTitle,
    icon: c.icon,
  }));

  return NextResponse.json({ data: items, categories, totalCount: items.length });
}
