// /api/okr-team-readiness — AI-powered team OKR readiness assessment
// Falls back to rule-based scoring if Claude API is unavailable

import { NextRequest, NextResponse } from "next/server";
import {
  TEAM_READINESS_SYSTEM_PROMPT,
  generateFallbackReadiness,
  type TeamReadinessRequest,
  type TeamReadinessResponse,
} from "@/lib/okr-ai-critique";
import { checkRateLimit, getClientIp } from "@/lib/security";

// Input limits
const MAX_OBJECTIVES = 10;
const MAX_KRS_PER_OBJECTIVE = 5;
const MAX_TEXT_LENGTH = 500;

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 5 per minute per IP (AI-backed endpoint)
    const ip = getClientIp(request);
    const rl = checkRateLimit(`okr-team-readiness:${ip}`, { limit: 5, windowMs: 60_000 });
    if (!rl.allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    // Guard against oversized payloads
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 50_000) {
      return NextResponse.json(
        { error: "Request payload too large" },
        { status: 413 }
      );
    }

    const body: TeamReadinessRequest = await request.json();

    if (!body.objectives || !Array.isArray(body.objectives) || body.objectives.length === 0) {
      return NextResponse.json(
        { error: "No objectives provided" },
        { status: 400 }
      );
    }

    // Validate and limit input
    if (body.objectives.length > MAX_OBJECTIVES) {
      return NextResponse.json(
        { error: `Maximum ${MAX_OBJECTIVES} objectives allowed` },
        { status: 400 }
      );
    }

    // Sanitize objectives
    const sanitizedObjectives = body.objectives.map((o) => ({
      ...o,
      text: typeof o.text === "string" ? o.text.slice(0, MAX_TEXT_LENGTH) : "",
      owner: typeof o.owner === "string" ? o.owner.slice(0, 100) : "",
      keyResults: Array.isArray(o.keyResults)
        ? o.keyResults.slice(0, MAX_KRS_PER_OBJECTIVE).map((kr) => ({
            ...kr,
            text: typeof kr.text === "string" ? kr.text.slice(0, MAX_TEXT_LENGTH) : "",
          }))
        : [],
    }));

    const sanitizedBody = { ...body, objectives: sanitizedObjectives };

    // Try Claude API if key is available
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (apiKey) {
      try {
        const objectiveSummary = sanitizedObjectives
          .map(
            (o, i) =>
              `${i + 1}. [${o.domain}] ${o.owner}: ${o.text}\n   KRs: ${o.keyResults.map((kr) => kr.text).join("; ")}`
          )
          .join("\n");

        const prompt = `Evaluate this FQHC executive team's OKR set for readiness:

${objectiveSummary}

Respond with a JSON object matching this exact structure:
{
  "alignmentScore": <0-100>,
  "coverageScore": <0-100>,
  "qualityScore": <0-100>,
  "gaps": ["<gap 1>", "<gap 2>"],
  "conflicts": ["<conflict 1>"],
  "recommendations": ["<rec 1>", "<rec 2>", "<rec 3>"],
  "domainCoverage": {
    "revenue-resilience": <true/false>,
    "workforce-retention": <true/false>,
    "patient-access": <true/false>,
    "operational-efficiency": <true/false>,
    "cross-department": <true/false>
  }
}

Only respond with the JSON object, nothing else.`;

        const response = await fetch(
          "https://api.anthropic.com/v1/messages",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": apiKey,
              "anthropic-version": "2023-06-01",
            },
            body: JSON.stringify({
              model: "claude-sonnet-4-20250514",
              max_tokens: 1024,
              system: TEAM_READINESS_SYSTEM_PROMPT,
              messages: [{ role: "user", content: prompt }],
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const textContent = data.content?.[0]?.text;
          if (textContent) {
            const jsonMatch = textContent.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              try {
                const assessment: TeamReadinessResponse = JSON.parse(jsonMatch[0]);
                return NextResponse.json(assessment);
              } catch {
                // Invalid JSON from AI — fall through to rule-based
              }
            }
          }
        }
      } catch {
        // API error — fall through to fallback
      }
    }

    // Fallback: rule-based readiness assessment
    const fallback = generateFallbackReadiness(sanitizedBody);
    return NextResponse.json(fallback);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
