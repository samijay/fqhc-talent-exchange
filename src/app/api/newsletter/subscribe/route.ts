import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { checkRateLimit, getClientIp, validateOrigin } from "@/lib/security";
import { emailHeader, emailFooter, missionBanner, ctaButton, BRAND } from "@/lib/email-helpers";

const subscribeSchema = z.object({
  email: z.string().email().max(255),
  audience: z.enum(["intel-brief", "the-pulse", "both"]),
  region: z.string().max(100).optional(),
  roleInterest: z.string().max(200).optional(),
  preferences: z
    .object({
      role: z.string().max(100).optional(),
      primaryChallenge: z.string().max(100).optional(),
      topics: z.array(z.string().max(50)).max(10).optional(),
      orgSize: z.string().max(50).optional(),
    })
    .optional(),
});

export async function POST(request: Request) {
  try {
    if (!validateOrigin(request)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const ip = getClientIp(request);
    const { allowed } = checkRateLimit(`newsletter-subscribe:${ip}`, {
      limit: 1,
      windowMs: 10_000,
    });
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = subscribeSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Please provide a valid email and audience selection." },
        { status: 400 }
      );
    }

    const { email, audience, region, roleInterest, preferences } = result.data;
    const unsubscribeToken = crypto.randomUUID();

    const { error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .upsert(
        {
          email,
          audience,
          region: region || null,
          role_interest: roleInterest || null,
          preferences: preferences ?? {},
          role_type: preferences?.role ?? null,
          primary_challenge: preferences?.primaryChallenge ?? null,
          org_size: preferences?.orgSize ?? null,
          status: "active",
          unsubscribe_token: unsubscribeToken,
          unsubscribed_at: null,
          subscribed_at: new Date().toISOString(),
        },
        { onConflict: "email" }
      );

    if (error) {
      console.error("Supabase newsletter-subscribe error:", error.code, error.message);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    // Confirmation email
    if (resend) {
      try {
        const trackName =
          audience === "intel-brief" ? "FQHC Intel Brief" :
          audience === "both"        ? "FQHC Intel Brief + The Pulse" :
                                       "The Pulse";
        const trackDesc =
          audience === "intel-brief"
            ? "Weekly executive intelligence briefing — funding threats, policy shifts, workforce data, and strategic moves."
            : audience === "both"
              ? "Both tracks: executive intelligence for leaders and career updates for job seekers."
              : "Weekly career update — job highlights, salary data, career tips, and market trends.";

        await resend.emails.send({
          from: FROM_EMAIL,
          to: email,
          subject: `You're subscribed — ${trackName}`,
          html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;color:${BRAND.stone900};background:#ffffff;">
  ${emailHeader()}

  <h2 style="color:${BRAND.teal};font-size:20px;margin:0 0 8px;">You're subscribed to ${trackName}</h2>
  <p style="color:${BRAND.stone500};font-size:14px;margin:0 0 20px;">${trackDesc}</p>

  <p style="color:${BRAND.stone700};line-height:1.7;font-size:15px;">
    You'll receive your first issue <strong>this Tuesday</strong>. We publish weekly with primary source links for every claim — no filler, no fluff.
  </p>

  ${region ? `<div style="background:${BRAND.tealLight};border-left:3px solid ${BRAND.teal};padding:12px 16px;margin:20px 0;border-radius:0 8px 8px 0;"><p style="margin:0;font-size:14px;color:${BRAND.teal};"><strong>Region:</strong> ${region}</p></div>` : ""}

  <div style="background:${BRAND.stone100};border-radius:8px;padding:16px;margin:24px 0;">
    <p style="margin:0 0 10px;font-size:12px;font-weight:700;color:${BRAND.teal};text-transform:uppercase;letter-spacing:0.8px;">Explore the platform</p>
    <p style="margin:6px 0;font-size:14px;"><a href="https://www.fqhctalent.com" style="color:${BRAND.teal};text-decoration:none;font-weight:600;">Intelligence Dashboard \u2192</a></p>
    <p style="margin:6px 0;font-size:14px;"><a href="https://www.fqhctalent.com/strategy/okrs" style="color:${BRAND.teal};text-decoration:none;font-weight:600;">OKR Templates (Excel) \u2192</a></p>
    <p style="margin:6px 0;font-size:14px;"><a href="https://www.fqhctalent.com/salary-data" style="color:${BRAND.teal};text-decoration:none;font-weight:600;">Salary Intelligence \u2192</a></p>
    <p style="margin:6px 0;font-size:14px;"><a href="https://www.fqhctalent.com/jobs" style="color:${BRAND.teal};text-decoration:none;font-weight:600;">Job Listings \u2192</a></p>
  </div>

  <div style="text-align:center;margin:24px 0;">
    ${ctaButton("Go to My Dashboard \u2192", "https://www.fqhctalent.com/dashboard")}
  </div>

  ${missionBanner(false)}

  ${emailFooter(false, unsubscribeToken)}
</body>
</html>`,
        });
      } catch (emailErr) {
        console.error("Newsletter confirmation email error:", emailErr);
      }
    }

    return NextResponse.json({ success: true, message: "Subscribed successfully" });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
