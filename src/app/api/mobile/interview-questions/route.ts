import { NextResponse } from "next/server";
import { INTERVIEW_QUESTIONS, ROLE_INTERVIEW_GUIDES } from "@/lib/interview-prep";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-interview-${ip}`, { limit: 30, windowMs: 60000 });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const url = new URL(request.url);
  const role = url.searchParams.get("role");
  const category = url.searchParams.get("category");
  const limit = Math.min(50, parseInt(url.searchParams.get("limit") || "10", 10));

  let questions = INTERVIEW_QUESTIONS.map((q) => ({
    id: q.id,
    question: q.question,
    esQuestion: q.esQuestion,
    category: q.category,
    difficulty: q.difficulty,
    roles: q.roles,
    whyAsked: q.whyAsked,
    esWhyAsked: q.esWhyAsked,
    starTip: {
      situation: q.starTip.situation,
      esSituation: q.starTip.esSituation,
      task: q.starTip.task,
      esTask: q.starTip.esTask,
      action: q.starTip.action,
      esAction: q.starTip.esAction,
      result: q.starTip.result,
      esResult: q.starTip.esResult,
    },
    strongAnswerExample: q.strongAnswerExample,
    esStrongAnswerExample: q.esStrongAnswerExample,
    redFlags: q.redFlags,
    esRedFlags: q.esRedFlags,
    followUpQuestions: q.followUpQuestions,
    esFollowUpQuestions: q.esFollowUpQuestions,
  }));

  // Filter by role
  if (role) {
    questions = questions.filter((q) =>
      q.roles.includes("all") || q.roles.some((r) => r.toLowerCase() === role.toLowerCase())
    );
  }

  // Filter by category
  if (category) {
    questions = questions.filter((q) => q.category === category);
  }

  // Limit results
  questions = questions.slice(0, limit);

  // Role guide if specified
  let roleGuide = null;
  if (role) {
    roleGuide = ROLE_INTERVIEW_GUIDES.find(
      (g) => g.roleId.toLowerCase() === role.toLowerCase()
    ) || null;
  }

  // Available roles for selector
  const allRoles = new Set<string>();
  INTERVIEW_QUESTIONS.forEach((q) => {
    q.roles.forEach((r) => { if (r !== "all") allRoles.add(r); });
  });

  return NextResponse.json({
    data: questions,
    totalCount: questions.length,
    roleGuide,
    availableRoles: [...allRoles].sort(),
  });
}
