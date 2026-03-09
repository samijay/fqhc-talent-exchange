// /api/okr-critique — AI-powered OKR critique endpoint
// Uses Claude API with FQHC-specific system prompt
// Falls back to rule-based scoring if API is unavailable

import { NextRequest, NextResponse } from "next/server";
import {
  OKR_CRITIQUE_SYSTEM_PROMPT,
  generateFallbackCritique,
  type OKRCritiqueRequest,
  type OKRCritiqueResponse,
} from "@/lib/okr-ai-critique";

export async function POST(request: NextRequest) {
  try {
    const body: OKRCritiqueRequest = await request.json();

    // Validate input
    if (!body.objective || !body.keyResults || !body.domain) {
      return NextResponse.json(
        { error: "Missing required fields: objective, keyResults, domain" },
        { status: 400 }
      );
    }

    if (body.objective.trim().length < 10) {
      return NextResponse.json(
        { error: "Objective must be at least 10 characters" },
        { status: 400 }
      );
    }

    const validKRs = body.keyResults.filter(
      (kr) => kr.trim().length > 0
    );
    if (validKRs.length < 1) {
      return NextResponse.json(
        { error: "At least 1 Key Result is required" },
        { status: 400 }
      );
    }

    // Try Claude API if key is available
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (apiKey) {
      try {
        const prompt = `Evaluate this FQHC OKR:

Domain: ${body.domain}
Role: ${body.role || "FQHC leader"}

Objective: ${body.objective}

Key Results:
${validKRs.map((kr, i) => `${i + 1}. ${kr}`).join("\n")}

Respond with a JSON object matching this exact structure:
{
  "overallScore": <number 0-100>,
  "scores": {
    "measurability": { "category": "Measurability", "score": <0-100>, "feedback": "<1-2 sentences>" },
    "ambition": { "category": "Ambition", "score": <0-100>, "feedback": "<1-2 sentences>" },
    "fqhcRelevance": { "category": "FQHC Relevance", "score": <0-100>, "feedback": "<1-2 sentences>" },
    "clarity": { "category": "Clarity", "score": <0-100>, "feedback": "<1-2 sentences>" }
  },
  "suggestions": ["<suggestion 1>", "<suggestion 2>", "<suggestion 3>"],
  "rewriteSuggestion": { "objective": "<improved objective>", "keyResults": ["<improved KR1>", "<improved KR2>"] }
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
              system: OKR_CRITIQUE_SYSTEM_PROMPT,
              messages: [{ role: "user", content: prompt }],
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const textContent = data.content?.[0]?.text;
          if (textContent) {
            // Parse the JSON from Claude's response
            const jsonMatch = textContent.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              const critique: OKRCritiqueResponse = JSON.parse(
                jsonMatch[0]
              );
              return NextResponse.json(critique);
            }
          }
        }
      } catch {
        // Fall through to fallback
      }
    }

    // Fallback: rule-based critique
    const fallback = generateFallbackCritique({
      ...body,
      keyResults: validKRs,
    });
    return NextResponse.json(fallback);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
