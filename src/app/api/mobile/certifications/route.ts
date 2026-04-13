import { NextResponse } from "next/server";
import { CERTIFICATIONS } from "@/lib/certification-data";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-certs-${ip}`, { limit: 30, windowMs: 60000 });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const url = new URL(request.url);
  const role = url.searchParams.get("role");
  const costTier = url.searchParams.get("cost_tier");

  let certs = CERTIFICATIONS.map((c) => ({
    id: c.id,
    name: c.name,
    esName: c.esName,
    abbreviation: c.abbreviation,
    issuer: c.issuer,
    esIssuer: c.esIssuer,
    costRange: c.costRange,
    esCostRange: c.esCostRange,
    costTier: c.costTier,
    duration: c.duration,
    esDuration: c.esDuration,
    salaryImpact: c.salaryImpact,
    esSalaryImpact: c.esSalaryImpact,
    impactType: c.impactType,
    requiredFor: c.requiredFor,
    helpfulFor: c.helpfulFor,
    description: c.description,
    esDescription: c.esDescription,
    californiaNote: c.californiaNote,
    esCaliforniaNote: c.esCaliforniaNote,
  }));

  if (role) {
    certs = certs.filter(
      (c) => c.requiredFor.includes(role) || c.helpfulFor.includes(role)
    );
  }

  if (costTier) {
    certs = certs.filter((c) => c.costTier === costTier);
  }

  return NextResponse.json({ data: certs, totalCount: certs.length });
}
