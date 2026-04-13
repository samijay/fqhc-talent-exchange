import { NextResponse } from "next/server";
import { UNION_DIRECTORY } from "@/lib/union-data";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-unions-${ip}`, { limit: 30, windowMs: 60000 });
  if (!allowed) return NextResponse.json({ error: "Too many requests." }, { status: 429 });

  const unions = UNION_DIRECTORY.map((u) => ({
    id: u.id,
    name: u.name,
    abbreviation: u.abbreviation,
    esName: u.esName,
    website: u.website,
    description: u.description,
    membership: u.membership,
    headquartersCity: u.headquartersCity,
    rolesRepresented: u.rolesRepresented,
    fqhcsRepresented: u.fqhcsRepresented,
  }));

  return NextResponse.json({ data: unions, totalCount: unions.length });
}
