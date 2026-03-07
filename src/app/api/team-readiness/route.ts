import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";

/* ------------------------------------------------------------------ */
/*  POST /api/team-readiness — Save manager assessment results         */
/* ------------------------------------------------------------------ */

const resultsSchema = z.object({
  roleId:       z.string().max(50),
  overallScore: z.number().int().min(0).max(100),
  domainScores: z.record(z.string(), z.number()).default({}),
  strengths:    z.array(z.string().max(200)).max(10).default([]),
  growthAreas:  z.array(z.string().max(200)).max(10).default([]),
  starsType:    z.string().max(50).optional(),
  locale:       z.enum(["en", "es"]).default("en"),
  sessionId:    z.string().max(100).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = resultsSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid data." }, { status: 400 });
    }

    const {
      roleId, overallScore, domainScores, strengths,
      growthAreas, starsType, locale, sessionId,
    } = result.data;

    const { error } = await supabaseAdmin.from("manager_assessments").insert({
      role_id:       roleId,
      overall_score: overallScore,
      domain_scores: domainScores,
      strengths,
      growth_areas:  growthAreas,
      stars_type:    starsType || null,
      locale,
      session_id:    sessionId || null,
    });

    if (error) {
      console.error("manager_assessments insert error:", error.code, error.message);
      // Don't surface DB errors to client — this is a background save
      return NextResponse.json({ ok: false }, { status: 200 });
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
