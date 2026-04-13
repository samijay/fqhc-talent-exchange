import { NextResponse } from "next/server";
import { GLOSSARY_TERMS, CATEGORY_LABELS } from "@/lib/fqhc-glossary";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-glossary-${ip}`, { limit: 30, windowMs: 60000 });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.toLowerCase();
  const category = url.searchParams.get("category");

  let terms = GLOSSARY_TERMS.map((t) => ({
    term: t.term,
    fullName: t.fullName,
    definition: t.definition,
    category: t.category,
    relatedTerms: t.relatedTerms,
  }));

  if (q) {
    terms = terms.filter(
      (t) =>
        t.term.toLowerCase().includes(q) ||
        t.fullName.en.toLowerCase().includes(q) ||
        t.fullName.es.toLowerCase().includes(q) ||
        t.definition.en.toLowerCase().includes(q)
    );
  }

  if (category) {
    terms = terms.filter((t) => t.category === category);
  }

  return NextResponse.json({
    data: terms,
    totalCount: terms.length,
    categories: CATEGORY_LABELS,
  });
}
