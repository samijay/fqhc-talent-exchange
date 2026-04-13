import { NextResponse } from "next/server";
import { z } from "zod";
import {
  ASSESSMENT_QUESTIONS,
  DOMAIN_DEFINITIONS,
  calculateAssessmentResults,
} from "@/lib/career-assessment-engine";
import { checkRateLimit, getClientIp } from "@/lib/security";

/**
 * GET: Return assessment questions (optionally filtered by role)
 * POST: Calculate results from answers
 */
export async function GET(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-assess-${ip}`, { limit: 20, windowMs: 60000 });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  // Return the full question set + domain definitions
  const questions = ASSESSMENT_QUESTIONS.map((q) => ({
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

  const domains = DOMAIN_DEFINITIONS.map((d) => ({
    id: d.id,
    name: d.name,
    description: d.description,
    icon: d.icon,
    color: d.color,
  }));

  return NextResponse.json({
    questions,
    domains,
    totalQuestions: questions.length,
  });
}

const answersSchema = z.object({
  answers: z.record(z.string(), z.string()), // { questionId: optionId }
  locale: z.enum(["en", "es"]).optional(),
  roleId: z.string().max(100).optional(),
});

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-assess-calc-${ip}`, { limit: 10, windowMs: 60000 });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const result = answersSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { answers, locale, roleId } = result.data;
  const assessmentResults = calculateAssessmentResults(answers, locale, roleId);

  return NextResponse.json({ results: assessmentResults });
}
