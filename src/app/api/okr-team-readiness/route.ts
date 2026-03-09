// /api/okr-team-readiness — AI-powered team OKR readiness assessment
// Falls back to rule-based scoring if Claude API is unavailable

import { NextRequest, NextResponse } from "next/server";
import {
  TEAM_READINESS_SYSTEM_PROMPT,
  generateFallbackReadiness,
  type TeamReadinessRequest,
  type TeamReadinessResponse,
} from "@/lib/okr-ai-critique";

export async function POST(request: NextRequest) {
  try {
    const body: TeamReadinessRequest = await request.json();

    if (!body.objectives || body.objectives.length === 0) {
      return NextResponse.json(
        { error: "No objectives provided" },
        { status: 400 }
      );
    }

    // Try Claude API if key is available
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (apiKey) {
      try {
        const objectiveSummary = body.objectives
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
              const assessment: TeamReadinessResponse = JSON.parse(
                jsonMatch[0]
              );
              return NextResponse.json(assessment);
            }
          }
        }
      } catch {
        // Fall through to fallback
      }
    }

    // Fallback: rule-based readiness assessment
    const fallback = generateFallbackReadiness(body);
    return NextResponse.json(fallback);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
