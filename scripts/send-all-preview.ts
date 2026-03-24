import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { INTEL_BRIEF_003, PULSE_003 } from "@/lib/newsletter-editions";
import { intelBriefHtml, intelBriefSubject, pulseHtml, pulseSubject } from "@/lib/newsletter-templates";
import { getDripEmail } from "@/lib/drip-templates";

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM = process.env.FROM_EMAIL || "FQHC Talent <hello@fqhctalent.com>";
const TO = "jweingard@gmail.com";
const TOKEN = "preview-token";

async function send(subject: string, html: string) {
  await resend.emails.send({ from: FROM, to: TO, subject, html });
  console.log(`  ✅ ${subject}`);
}

async function main() {
  console.log(`Sending all 13 emails to ${TO}...\n`);

  // 1. Intel Brief #3
  console.log("--- Issue #3 ---");
  await send(intelBriefSubject(INTEL_BRIEF_003), intelBriefHtml(INTEL_BRIEF_003, TOKEN));
  await send(pulseSubject(PULSE_003), pulseHtml(PULSE_003, TOKEN));

  // 2. Candidate drip (3)
  console.log("\n--- Candidate Drip ---");
  for (let step = 0; step < 3; step++) {
    const unsub = `https://www.fqhctalent.com/api/newsletter/unsubscribe?token=${TOKEN}`;
    const email = getDripEmail("the-pulse", step, unsub)!;
    await send(`[Candidate Drip ${step + 1}] ${email.subject}`, email.html);
  }

  // 3. Employer drip (3)
  console.log("\n--- Employer Drip ---");
  for (let step = 0; step < 3; step++) {
    const unsub = `https://www.fqhctalent.com/api/newsletter/unsubscribe?token=${TOKEN}`;
    const email = getDripEmail("intel-brief", step, unsub)!;
    await send(`[Employer Drip ${step + 1}] ${email.subject}`, email.html);
  }

  // 4. Both drip (3)
  console.log("\n--- Both Track Drip ---");
  for (let step = 0; step < 3; step++) {
    const unsub = `https://www.fqhctalent.com/api/newsletter/unsubscribe?token=${TOKEN}`;
    const email = getDripEmail("both", step, unsub)!;
    await send(`[Both Drip ${step + 1}] ${email.subject}`, email.html);
  }

  console.log(`\nDone — 13 emails sent to ${TO}`);
}

main().catch(console.error);
