import { NextResponse } from "next/server";
import { SCOPE_OF_PRACTICE_ROLES, DELEGATION_TASKS } from "@/lib/scope-of-practice";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-scope-${ip}`, { limit: 30, windowMs: 60000 });
  if (!allowed) return NextResponse.json({ error: "Too many requests." }, { status: 429 });

  const url = new URL(request.url);
  const roleId = url.searchParams.get("role");

  const roles = SCOPE_OF_PRACTICE_ROLES.map((r) => ({
    id: r.id,
    title: r.title,               // { en, es }
    abbreviation: r.abbreviation,
    category: r.category,
    caRegulation: r.caRegulation,
    supervisedBy: r.supervisedBy,
    canSupervise: r.canSupervise,
    coreScope: r.coreScope,         // { en, es }[]
    cannotDo: r.cannotDo,           // { en, es }[]
    delegationRules: r.delegationRules,
    fqhcContext: r.fqhcContext,     // { en, es }
    topOfLicenseBarriers: r.topOfLicenseBarriers, // { en, es }[]
    revenueImpact: r.revenueImpact, // { en, es }
  }));

  let selectedRole = null;
  if (roleId) {
    selectedRole = roles.find((r) => r.id === roleId) || null;
  }

  const tasks = DELEGATION_TASKS.map((t) => ({
    id: t.id,
    task: t.task,               // { en, es }
    department: t.department,
    roleAuthorizations: t.roleAuthorizations,
  }));

  return NextResponse.json({ roles, selectedRole, tasks });
}
