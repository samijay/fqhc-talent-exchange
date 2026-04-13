import { NextResponse } from "next/server";
import { ACADEMY_COURSES, LEARNING_TOOLS } from "@/lib/academy-catalog";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-academy-${ip}`, { limit: 30, windowMs: 60000 });
  if (!allowed) return NextResponse.json({ error: "Too many requests." }, { status: 429 });

  const courses = ACADEMY_COURSES.map((c) => ({
    id: c.id,
    title: c.title,       // { en, es }
    subtitle: c.subtitle,  // { en, es }
    description: c.description, // { en, es }
    href: c.href,
    status: c.status,
    moduleCount: c.moduleCount,
    estimatedMinutes: c.estimatedMinutes,
    audience: c.audience,
    icon: c.icon,
    color: c.color,
  }));

  const tools = LEARNING_TOOLS.map((t) => ({
    id: t.id,
    title: t.title,       // { en, es }
    description: t.description, // { en, es }
    href: t.href,
    icon: t.icon,
    audience: t.audience,
  }));

  return NextResponse.json({ courses, tools, totalCourses: courses.length });
}
