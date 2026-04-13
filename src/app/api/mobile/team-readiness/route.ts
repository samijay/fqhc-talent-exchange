import { NextResponse } from "next/server";
import { z } from "zod";
import {
  LEADERSHIP_ROLES,
  MANAGER_DOMAIN_DEFINITIONS,
  getManagerQuestionsForRole,
  calculateManagerResults,
  type LeadershipRoleId,
} from "@/lib/manager-assessment-engine";
import { checkRateLimit, getClientIp } from "@/lib/security";

/**
 * GET: Return leadership roles + questions for a selected role
 * POST: Calculate results from answers
 */
export async function GET(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-team-${ip}`, { limit: 20, windowMs: 60000 });
  if (!allowed) return NextResponse.json({ error: "Too many requests." }, { status: 429 });

  const url = new URL(request.url);
  const roleId = url.searchParams.get("role") as LeadershipRoleId | null;

  const roles = LEADERSHIP_ROLES.map((r) => ({
    id: r.id,
    name: r.label,
    esName: r.esLabel,
    description: r.description,
    esDescription: r.esDescription,
  }));

  const domains = MANAGER_DOMAIN_DEFINITIONS.map((d) => ({
    id: d.id,
    name: d.name,
    description: d.description,
    icon: d.icon,
    color: d.color,
  }));

  let questions = null;
  if (roleId) {
    const qs = getManagerQuestionsForRole(roleId);
    questions = qs.map((q) => ({
      id: q.id,
      domain: q.domain,
      scenario: q.scenario,
      esScenario: q.esScenario,
      question: q.question,
      esQuestion: q.esQuestion,
      options: q.options.map((o) => ({
        id: o.id,
        text: o.text,
        esText: o.esText,
        score: o.score,
      })),
    }));
  }

  return NextResponse.json({ roles, domains, questions, totalQuestions: questions?.length || 0 });
}

const answersSchema = z.object({
  answers: z.record(z.string(), z.string()),
  roleId: z.string().min(1).max(100),
  locale: z.enum(["en", "es"]).optional(),
});

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-team-calc-${ip}`, { limit: 10, windowMs: 60000 });
  if (!allowed) return NextResponse.json({ error: "Too many requests." }, { status: 429 });

  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON." }, { status: 400 }); }

  const result = answersSchema.safeParse(body);
  if (!result.success) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const { answers, roleId, locale } = result.data;
  const questions = getManagerQuestionsForRole(roleId as LeadershipRoleId);
  const results = calculateManagerResults(answers, questions, roleId as LeadershipRoleId, locale);

  return NextResponse.json({ results });
}
