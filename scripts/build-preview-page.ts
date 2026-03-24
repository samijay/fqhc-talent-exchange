/**
 * Build a single interactive HTML preview page with all email templates.
 * Run: npx tsx scripts/build-preview-page.ts
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const OUT = join(process.cwd(), "scripts", "preview-output");

interface EmailEntry {
  id: string;
  label: string;
  group: string;
  file: string;
}

const emails: EmailEntry[] = [
  // Issue #3
  { id: "ib3", label: "Intel Brief #3 (EN)", group: "Issue #3 — March 25", file: "intel-brief-003.html" },
  { id: "ib3es", label: "Intel Brief #3 (ES)", group: "Issue #3 — March 25", file: "intel-brief-003-es.html" },
  { id: "p3", label: "The Pulse #3 (EN)", group: "Issue #3 — March 25", file: "pulse-003.html" },
  { id: "p3es", label: "The Pulse #3 (ES)", group: "Issue #3 — March 25", file: "pulse-003-es.html" },
  // Candidate drip
  { id: "cd1", label: "Day 3 — What FQHCs look for", group: "Candidate Drip (The Pulse)", file: "drip-the-pulse-step1.html" },
  { id: "cd2", label: "Day 7 — Salary intel", group: "Candidate Drip (The Pulse)", file: "drip-the-pulse-step2.html" },
  { id: "cd3", label: "Day 14 — Career toolkit + Academy", group: "Candidate Drip (The Pulse)", file: "drip-the-pulse-step3.html" },
  // Employer drip
  { id: "ed1", label: "Day 3 — Platform tour", group: "Employer Drip (Intel Brief)", file: "drip-intel-brief-step1.html" },
  { id: "ed2", label: "Day 7 — Resilience scorecard", group: "Employer Drip (Intel Brief)", file: "drip-intel-brief-step2.html" },
  { id: "ed3", label: "Day 14 — Case studies + Academy", group: "Employer Drip (Intel Brief)", file: "drip-intel-brief-step3.html" },
  // Both drip
  { id: "bd1", label: "Day 3 — Full platform tour", group: "Both Track Drip (NEW)", file: "drip-both-step1.html" },
  { id: "bd2", label: "Day 7 — Complete workforce picture", group: "Both Track Drip (NEW)", file: "drip-both-step2.html" },
  { id: "bd3", label: "Day 14 — Command center + Academy", group: "Both Track Drip (NEW)", file: "drip-both-step3.html" },
];

// Load all HTML content
const contents: Record<string, string> = {};
for (const e of emails) {
  contents[e.id] = readFileSync(join(OUT, e.file), "utf-8")
    .replace(/</g, "\\x3c")
    .replace(/>/g, "\\x3e")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$");
}

// Group emails
const groups = [...new Set(emails.map(e => e.group))];

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>FQHC Talent Exchange — Email Preview</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f4; color: #1c1917; }
  .header { background: linear-gradient(135deg, #0f766e, #115e59); color: white; padding: 24px 32px; }
  .header h1 { font-size: 20px; font-weight: 700; }
  .header p { color: #99f6e4; font-size: 13px; margin-top: 4px; }
  .layout { display: flex; min-height: calc(100vh - 72px); }
  .sidebar { width: 320px; background: white; border-right: 1px solid #e7e5e4; overflow-y: auto; flex-shrink: 0; }
  .group-label { font-size: 11px; font-weight: 700; color: #0f766e; text-transform: uppercase; letter-spacing: 0.8px; padding: 16px 16px 6px; }
  .nav-btn { display: block; width: 100%; text-align: left; border: none; background: none; padding: 10px 16px; font-size: 14px; color: #44403c; cursor: pointer; border-left: 3px solid transparent; transition: all 0.15s; }
  .nav-btn:hover { background: #f0fdfa; color: #0f766e; }
  .nav-btn.active { background: #f0fdfa; color: #0f766e; font-weight: 600; border-left-color: #0f766e; }
  .preview-area { flex: 1; padding: 24px; display: flex; flex-direction: column; align-items: center; }
  .email-meta { margin-bottom: 16px; text-align: center; }
  .email-meta h2 { font-size: 16px; color: #1c1917; }
  .email-meta p { font-size: 13px; color: #78716c; margin-top: 2px; }
  .email-frame { background: white; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); width: 100%; max-width: 660px; overflow: hidden; }
  .email-frame iframe { width: 100%; border: none; min-height: 800px; }
  .badge { display: inline-block; background: #f0fdfa; color: #0f766e; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px; margin-left: 6px; vertical-align: middle; }
  .badge.new { background: #fef3c7; color: #92400e; }
</style>
</head>
<body>
  <div class="header">
    <h1>FQHC Talent Exchange — Email Preview</h1>
    <p>13 email templates · Issue #3 + 3 drip tracks (3 emails each)</p>
  </div>
  <div class="layout">
    <div class="sidebar" id="sidebar"></div>
    <div class="preview-area">
      <div class="email-meta" id="meta">
        <h2>Select an email to preview</h2>
        <p>Choose from the sidebar</p>
      </div>
      <div class="email-frame" id="frame-wrap" style="display:none;">
        <iframe id="preview" sandbox="allow-same-origin"></iframe>
      </div>
    </div>
  </div>

<script>
const emails = ${JSON.stringify(emails)};
const groups = ${JSON.stringify(groups)};

const contents = {};
${emails.map(e => `contents["${e.id}"] = \`${contents[e.id]}\`;`).join("\n")}

// Unescape
for (const k of Object.keys(contents)) {
  contents[k] = contents[k].replace(/\\\\x3c/g, "<").replace(/\\\\x3e/g, ">");
}

// Build sidebar
const sidebar = document.getElementById("sidebar");
for (const g of groups) {
  const lbl = document.createElement("div");
  lbl.className = "group-label";
  lbl.textContent = g;
  sidebar.appendChild(lbl);
  for (const e of emails.filter(x => x.group === g)) {
    const btn = document.createElement("button");
    btn.className = "nav-btn";
    btn.dataset.id = e.id;
    btn.innerHTML = e.label + (e.group.includes("NEW") ? '<span class="badge new">NEW</span>' : '');
    btn.onclick = () => showEmail(e.id);
    sidebar.appendChild(btn);
  }
}

function showEmail(id) {
  const e = emails.find(x => x.id === id);
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.id === id));
  document.getElementById("meta").innerHTML = '<h2>' + e.label + '</h2><p>' + e.group + '</p>';
  document.getElementById("frame-wrap").style.display = "block";
  const iframe = document.getElementById("preview");
  iframe.srcdoc = contents[id];
  // Auto-resize
  iframe.onload = () => {
    try { iframe.style.height = iframe.contentDocument.body.scrollHeight + 40 + "px"; } catch(_) {}
  };
}

// Show first email by default
showEmail("ib3");
</script>
</body>
</html>`;

const outPath = join(process.cwd(), "scripts", "preview-output", "email-preview.html");
writeFileSync(outPath, html);
console.log("✅ Preview page written to: scripts/preview-output/email-preview.html");
