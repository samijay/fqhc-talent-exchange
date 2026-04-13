import { NextResponse } from "next/server";
import { AI_ADOPTION_ITEMS, FQHC_AI_VENDORS } from "@/lib/fqhc-ai-tracker";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-ai-${ip}`, { limit: 30, windowMs: 60000 });
  if (!allowed) return NextResponse.json({ error: "Too many requests." }, { status: 429 });

  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const stage = url.searchParams.get("stage");

  let items = AI_ADOPTION_ITEMS.map((item) => ({
    id: item.id,
    title: item.title,           // { en, es }
    description: item.description, // { en, es }
    category: item.category,
    vendor: item.vendor,
    adoptionStage: item.adoptionStage,
    date: item.date,
    sourceUrl: item.sourceUrl,
    sourceOrg: item.sourceOrg,
    metrics: item.metrics,
    featured: item.featured || false,
  }));

  if (category) items = items.filter((i) => i.category === category);
  if (stage) items = items.filter((i) => i.adoptionStage === stage);

  items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const vendors = FQHC_AI_VENDORS.map((v) => ({
    id: v.id,
    name: v.name,
    tagline: v.tagline,       // { en, es }
    category: v.category,
    description: v.description, // { en, es }
    pricingModel: v.pricingModel,
    pricingNote: v.pricingNote, // { en, es } | null
    nachcEndorsed: v.nachcEndorsed,
    fqhcCustomers: v.fqhcCustomers,
  }));

  return NextResponse.json({ data: items, vendors, totalCount: items.length });
}
