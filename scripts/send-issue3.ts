/* ------------------------------------------------------------------ */
/*  Send Issue #3 — Intel Brief + Pulse to all active subscribers     */
/*  Run: npx tsx scripts/send-issue3.ts                               */
/* ------------------------------------------------------------------ */

// Load env vars from .env.local
import { config } from "dotenv";
config({ path: ".env.local" });

import { sendIntelBrief, sendPulse } from "@/lib/newsletter-send";
import { INTEL_BRIEF_003, PULSE_003 } from "@/lib/newsletter-editions";

async function main() {
  console.log("=== Sending Issue #3 ===\n");

  // 1. Send Intel Brief
  console.log("Sending Intel Brief #3...");
  const ibResult = await sendIntelBrief(INTEL_BRIEF_003);
  console.log(`  Intel Brief: ${ibResult.sent}/${ibResult.total} sent, ${ibResult.failed} failed`);
  if (ibResult.errors.length > 0) {
    for (const e of ibResult.errors) {
      console.log(`  ❌ ${e.email}: ${e.error}`);
    }
  }

  // 2. Send Pulse
  console.log("\nSending Pulse #3...");
  const pulseResult = await sendPulse(PULSE_003);
  console.log(`  Pulse: ${pulseResult.sent}/${pulseResult.total} sent, ${pulseResult.failed} failed`);
  if (pulseResult.errors.length > 0) {
    for (const e of pulseResult.errors) {
      console.log(`  ❌ ${e.email}: ${e.error}`);
    }
  }

  console.log("\n=== Done ===");
  console.log(`Total: ${ibResult.sent + pulseResult.sent} emails sent`);
}

main().catch(console.error);
