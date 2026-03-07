import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { checkRateLimit, getClientIp } from "@/lib/security";

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

        const unsubscribeUrl = `https://www.fqhctalent.com/api/newsletter/unsubscribe?token=${unsubscribeToken}`;

        await resend.emails.send({
          from: FROM_EMAIL,
          to: email,
          subject: `You're subscribed — ${trackName}`,
          html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;color:#1c1917;">
  <div style="background:linear-gradient(135deg,#0f766e 0%,#115e59 100%);border-radius:12px;padding:24px;margin-bottom:24px;">
    <h1 style="color:white;font-size:22px;margin:0;">FQHC Talent Exchange</h1>
    <p style="color:#99f6e4;font-size:14px;margin:8px 0 0 0;">California's FQHC Strategic Monitor</p>
  </div>

  <h2 style="color:#0d9488;font-size:20px;margin:0 0 8px 0;">You're subscribed to ${trackName}</h2>
  <p style="color:#78716c;font-size:14px;margin:0 0 20px 0;">${trackDesc}</p>

  <p style="color:#44403c;line-height:1.7;font-size:15px;">
    You'll receive your first issue <strong>this Tuesday</strong>. We publish weekly with primary source links for every claim — no filler, no fluff.
  </p>

  ${region ? `<div style="background:#f0fdfa;border-left:3px solid #0d9488;padding:12px 16px;margin:20px 0;border-radius:0 8px 8px 0;"><p style="margin:0;font-size:14px;color:#0f766e;"><strong>Region:</strong> ${region}</p></div>` : ""}

  <div style="background:#fafaf9;border:1px solid #e7e5e4;border-radius:8px;padding:16px;margin:24px 0;">
    <p style="margin:0 0 10px 0;font-size:13px;font-weight:600;color:#44403c;text-transform:uppercase;letter-spacing:0.05em;">Explore the platform</p>
    <p style="margin:4px 0;font-size:14px;"><a href="https://www.fqhctalent.com" style="color:#0d9488;text-decoration:none;">→ Intelligence Dashboard</a></p>
    <p style="margin:4px 0;font-size:14px;"><a href="https://www.fqhctalent.com/strategy/okrs" style="color:#0d9488;text-decoration:none;">→ OKR Templates (Excel)</a></p>
    <p style="margin:4px 0;font-size:14px;"><a href="https://www.fqhctalent.com/salary-data" style="color:#0d9488;text-decoration:none;">→ Salary Intelligence</a></p>
    <p style="margin:4px 0;font-size:14px;"><a href="https://www.fqhctalent.com/jobs" style="color:#0d9488;text-decoration:none;">→ Job Listings</a></p>
  </div>

  <p style="font-size:12px;color:#a8a29e;margin-top:32px;border-top:1px solid #e7e5e4;padding-top:20px;">
    Questions? Reply to this email or reach us at hello@fqhctalent.com.<br />
    <a href="${unsubscribeUrl}" style="color:#a8a29e;">Unsubscribe</a> · <a href="https://www.fqhctalent.com" style="color:#a8a29e;">fqhctalent.com</a>
  </p>
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
