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
import { checkRateLimit, getClientIp } from "@/lib/security";

// Input size limits to prevent abuse
const MAX_OBJECTIVE_LENGTH = 500;
const MAX_KR_LENGTH = 300;
const MAX_KEY_RESULTS = 5;

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 5 per minute per IP (AI-backed endpoint)
    const ip = getClientIp(request);
    const rl = checkRateLimit(`okr-critique:${ip}`, { limit: 5, windowMs: 60_000 });
    if (!rl.allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    // Guard against oversized payloads
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 10_000) {
      return NextResponse.json(
        { error: "Request payload too large" },
        { status: 413 }
      );
    }

    const body: OKRCritiqueRequest = await request.json();

    // Validate required fields
    if (!body.objective || !body.keyResults || !body.domain) {
      return NextResponse.json(
        { error: "Missing required fields: objective, keyResults, domain" },
        { status: 400 }
      );
    }

    // Validate and sanitize input lengths
    if (typeof body.objective !== "string" || body.objective.trim().length < 10) {
      return NextResponse.json(
        { error: "Objective must be at least 10 characters" },
        { status: 400 }
      );
    }

    if (body.objective.length > MAX_OBJECTIVE_LENGTH) {
      return NextResponse.json(
        { error: `Objective must be under ${MAX_OBJECTIVE_LENGTH} characters` },
        { status: 400 }
      );
    }

    if (!Array.isArray(body.keyResults)) {
      return NextResponse.json(
        { error: "keyResults must be an array" },
        { status: 400 }
      );
    }

    const validKRs = body.keyResults
      .filter((kr) => typeof kr === "string" && kr.trim().length > 0)
      .slice(0, MAX_KEY_RESULTS)
      .map((kr) => kr.slice(0, MAX_KR_LENGTH));

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

Objective: ${body.objective.trim()}

Key Results:
${validKRs.map((kr, i) => `${i + 1}. ${kr.trim()}`).join("\n")}

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
            const jsonMatch = textContent.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              try {
                const critique: OKRCritiqueResponse = JSON.parse(jsonMatch[0]);
                return NextResponse.json(critique);
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
