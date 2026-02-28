import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token || token.length > 100) {
    return new NextResponse(renderHtml("Invalid unsubscribe link", false), {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // Look up the subscriber by unsubscribe token
  const { data: subscriber, error: lookupError } = await supabaseAdmin
    .from("newsletter_subscribers")
    .select("id, status")
    .eq("unsubscribe_token", token)
    .single();

  if (lookupError || !subscriber) {
    return new NextResponse(renderHtml("Invalid unsubscribe link", false), {
      status: 404,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // Already unsubscribed
  if (subscriber.status === "unsubscribed") {
    return new NextResponse(
      renderHtml("You have already been unsubscribed", true),
      {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  }

  // Unsubscribe the user
  const { error: updateError } = await supabaseAdmin
    .from("newsletter_subscribers")
    .update({
      status: "unsubscribed",
      unsubscribed_at: new Date().toISOString(),
    })
    .eq("id", subscriber.id);

  if (updateError) {
    console.error(
      "Supabase newsletter-unsubscribe error:",
      updateError.code,
      updateError.message
    );
    return new NextResponse(
      renderHtml("Something went wrong. Please try again later.", false),
      {
        status: 500,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  }

  return new NextResponse(renderHtml("You have been unsubscribed", true), {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

function renderHtml(message: string, success: boolean): string {
  const iconColor = success ? "#0F766E" : "#DC2626";
  const icon = success
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${message} — FQHC Talent Exchange</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #fafaf9;
      color: #1c1917;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 1rem;
    }
    .card {
      background: #ffffff;
      border: 1px solid #e7e5e4;
      border-radius: 12px;
      padding: 3rem 2rem;
      max-width: 440px;
      width: 100%;
      text-align: center;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    }
    .icon { margin-bottom: 1.5rem; }
    h1 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1c1917;
      margin-bottom: 0.75rem;
    }
    p {
      font-size: 0.938rem;
      color: #57534e;
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    a {
      display: inline-block;
      background-color: #0F766E;
      color: #ffffff;
      text-decoration: none;
      padding: 0.625rem 1.5rem;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
      transition: background-color 0.15s;
    }
    a:hover { background-color: #0d5f59; }
    .brand {
      margin-top: 2rem;
      font-size: 0.75rem;
      color: #a8a29e;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">${icon}</div>
    <h1>${message}</h1>
    <p>${
      success
        ? "You will no longer receive newsletter emails from us. If this was a mistake, you can re-subscribe at any time."
        : "This unsubscribe link is invalid or has expired. If you continue to receive unwanted emails, please contact us."
    }</p>
    <a href="https://www.fqhctalent.com">Back to FQHC Talent Exchange</a>
    <div class="brand">FQHC Talent Exchange</div>
  </div>
</body>
</html>`;
}
