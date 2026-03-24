/**
 * Generate HTML previews of all newsletter emails.
 * Run: npx tsx scripts/preview-emails.ts
 */
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { intelBriefHtml, pulseHtml } from "../src/lib/newsletter-templates";
import { INTEL_BRIEF_003, PULSE_003 } from "../src/lib/newsletter-editions";
import { getDripEmail } from "../src/lib/drip-templates";

const OUT = join(process.cwd(), "scripts", "preview-output");
mkdirSync(OUT, { recursive: true });

// Issue #3 newsletters
writeFileSync(join(OUT, "intel-brief-003.html"), intelBriefHtml(INTEL_BRIEF_003, "PREVIEW_TOKEN", false));
writeFileSync(join(OUT, "intel-brief-003-es.html"), intelBriefHtml(INTEL_BRIEF_003, "PREVIEW_TOKEN", true));
writeFileSync(join(OUT, "pulse-003.html"), pulseHtml(PULSE_003, "PREVIEW_TOKEN", false));
writeFileSync(join(OUT, "pulse-003-es.html"), pulseHtml(PULSE_003, "PREVIEW_TOKEN", true));

// Drip emails - all 3 tracks × 3 steps
const unsub = "https://www.fqhctalent.com/api/newsletter/unsubscribe?token=PREVIEW_TOKEN";
const tracks = ["the-pulse", "intel-brief", "both"] as const;
for (const track of tracks) {
  for (let step = 0; step < 3; step++) {
    const email = getDripEmail(track, step, unsub);
    if (email) {
      writeFileSync(join(OUT, `drip-${track}-step${step + 1}.html`), email.html);
    }
  }
}

console.log("✅ Previews written to scripts/preview-output/");
console.log("Files:");
const files = [
  "intel-brief-003.html",
  "intel-brief-003-es.html",
  "pulse-003.html",
  "pulse-003-es.html",
  ...tracks.flatMap(t => [1, 2, 3].map(s => `drip-${t}-step${s}.html`)),
];
files.forEach(f => console.log(`  ${f}`));
