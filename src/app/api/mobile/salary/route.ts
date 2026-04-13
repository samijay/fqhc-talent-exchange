import { NextResponse } from "next/server";
import { SALARY_BENCHMARKS } from "@/lib/job-posting-templates";
import { checkRateLimit, getClientIp } from "@/lib/security";

/**
 * Returns salary benchmarks for the mobile salary calculator.
 * Optionally filter by role.
 */
export async function GET(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-salary-${ip}`, { limit: 30, windowMs: 60000 });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const url = new URL(request.url);
  const role = url.searchParams.get("role");

  let benchmarks = SALARY_BENCHMARKS.map((b) => ({
    roleId: b.roleId,
    label: b.label,
    esLabel: b.esLabel,
    p25: b.p25,
    p50: b.p50,
    p75: b.p75,
  }));

  if (role) {
    benchmarks = benchmarks.filter(
      (b) => b.roleId === role || b.label.toLowerCase().includes(role.toLowerCase())
    );
  }

  return NextResponse.json({
    data: benchmarks,
    totalCount: benchmarks.length,
  });
}
