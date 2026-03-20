/**
 * LinkedIn Carousel PDF Generator  -  Positive / Actionable
 * Carousel 1: AI Adoption Framework (4 tiers)
 * Carousel 2: Revenue Transformation Levers (case studies + actions)
 *
 * Usage: node scripts/create-positive-carousels.js
 */

const { jsPDF } = require("jspdf");
const fs = require("fs");
const path = require("path");

// Brand colors
const TEAL = [15, 118, 110];
const TEAL_DARK = [13, 95, 88];
const AMBER = [245, 158, 11];
const WHITE = [255, 255, 255];
const STONE_100 = [245, 245, 244];
const STONE_700 = [68, 64, 60];
const GREEN = [16, 185, 129];

const PAGE_W = 1080;
const PAGE_H = 1080;

function createPDF() {
  return new jsPDF({ unit: "pt", format: [PAGE_W, PAGE_H], orientation: "landscape" });
}

function drawBg(doc, rgb) {
  doc.setFillColor(rgb[0], rgb[1], rgb[2]);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");
}

function drawFooter(doc, slideNum, totalSlides) {
  doc.setFillColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
  doc.rect(0, PAGE_H - 80, PAGE_W, 80, "F");
  doc.setFontSize(20);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("FQHC Talent Exchange", 60, PAGE_H - 35);
  doc.setFontSize(16);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("fqhctalent.com", 60, PAGE_H - 15);
  doc.setFontSize(18);
  doc.text(`${slideNum}/${totalSlides}`, PAGE_W - 80, PAGE_H - 25);
}

function drawAmberBadge(doc, text, x, y, w) {
  doc.setFillColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.roundedRect(x, y, w, 40, 8, 8, "F");
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
  doc.text(text, x + w / 2, y + 27, { align: "center" });
}

function wrapText(doc, text, x, y, maxWidth, lineHeight) {
  const lines = doc.splitTextToSize(text, maxWidth);
  lines.forEach((line, i) => {
    doc.text(line, x, y + i * lineHeight);
  });
  return y + lines.length * lineHeight;
}

function addNewPage(doc) {
  doc.addPage([PAGE_W, PAGE_H]);
}

function drawTierCard(doc, x, y, w, h, tierNum, title, subtitle, bgColor) {
  doc.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
  doc.roundedRect(x, y, w, h, 12, 12, "F");

  // Tier number circle
  doc.setFillColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.circle(x + 40, y + 40, 24, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
  doc.text(String(tierNum), x + 40, y + 48, { align: "center" });

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text(title, x + 80, y + 40);

  // Subtitle
  doc.setFont("helvetica", "normal");
  doc.setFontSize(16);
  doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
  wrapText(doc, subtitle, x + 80, y + 65, w - 100, 22);
}

// ================================================================
// CAROUSEL 1: AI Adoption Framework for FQHCs
// ================================================================
function createAICarousel() {
  const doc = createPDF();
  const total = 8;

  // --- SLIDE 1: Hero ---
  drawBg(doc, TEAL);
  drawAmberBadge(doc, "PRACTICAL AI GUIDE", 350, 180, 380);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(52);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  wrapText(doc, "4 Ways FQHCs Are", 120, 310, 840, 62);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.setFontSize(52);
  doc.text("Actually Using AI", 120, 380);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(26);
  doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
  wrapText(doc, "From $30/month chatbot accounts to exam-room ambient scribes  -  a practical framework for community health centers.", 120, 460, 840, 36);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(22);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("Swipe for the framework ->", PAGE_W / 2, 650, { align: "center" });

  drawFooter(doc, 1, total);

  // --- SLIDE 2: The 4 Tiers Overview ---
  addNewPage(doc);
  drawBg(doc, WHITE);

  doc.setFillColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.rect(0, 0, PAGE_W, 100, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(32);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("THE 4-TIER AI ADOPTION FRAMEWORK", PAGE_W / 2, 65, { align: "center" });

  const tiers = [
    { num: 1, title: "AI on the Team", sub: "Enterprise chatbot accounts for admin, HR, grants, ops. ChatGPT Team or Claude for Teams. ~$30-40/user/month.", color: TEAL },
    { num: 2, title: "AI-Powered Products", sub: "Buy solutions built for your problem. Ambient scribes (Abridge, Nabla), RCM tools (RapidClaims), care coordination AI.", color: TEAL_DARK },
    { num: 3, title: "AI-Assisted Dev", sub: "Internal team uses AI coding tools (Claude Code, Cursor) to build custom workflows, integrations, and automations.", color: [20, 90, 85] },
    { num: 4, title: "Custom AI/ML", sub: "Data science team building proprietary models. Only viable at scale (3,000+ staff) or through consortiums like OCHIN.", color: [15, 70, 66] },
  ];

  let yPos = 140;
  tiers.forEach((t) => {
    drawTierCard(doc, 60, yPos, 960, 130, t.num, t.title, t.sub, t.color);
    yPos += 150;
  });

  doc.setFont("helvetica", "italic");
  doc.setFontSize(20);
  doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.text("Most FQHCs should start at Tier 1. Some are already at Tier 2.", PAGE_W / 2, yPos + 30, { align: "center" });

  drawFooter(doc, 2, total);

  // --- SLIDE 3: Tier 1  -  AI on the Team ---
  addNewPage(doc);
  drawBg(doc, TEAL);

  doc.setFillColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.circle(120, 80, 30, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
  doc.text("1", 120, 88, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(44);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("AI on the Team", 170, 92);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(24);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("Enterprise chatbot accounts for your staff", 80, 160);

  const tier1Uses = [
    { dept: "HR & Admin", use: "Draft job descriptions, policies, interview questions, onboarding docs" },
    { dept: "Grants", use: "Research funders, draft LOIs, format budgets, summarize reporting" },
    { dept: "Revenue Cycle", use: "Appeal denial letters, analyze payer trends, draft contracts" },
    { dept: "Comms", use: "Bilingual patient materials, newsletters, social media, outreach" },
    { dept: "Leadership", use: "Board reports, strategic planning, competitive analysis, OKR drafting" },
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(20);
  yPos = 220;
  tier1Uses.forEach((u) => {
    doc.setFillColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
    doc.roundedRect(60, yPos, 960, 70, 8, 8, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
    doc.text(u.dept, 80, yPos + 28);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(18);
    doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
    wrapText(doc, u.use, 80, yPos + 50, 920, 22);

    yPos += 85;
  });

  // Cost callout
  doc.setFillColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.roundedRect(260, yPos + 20, 560, 55, 10, 10, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
  doc.text("Cost: $30-40/user/month * ROI: Weeks", PAGE_W / 2, yPos + 55, { align: "center" });

  drawFooter(doc, 3, total);

  // --- SLIDE 4: Tier 2  -  AI-Powered Products ---
  addNewPage(doc);
  drawBg(doc, WHITE);

  doc.setFillColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.rect(0, 0, PAGE_W, 120, "F");

  doc.setFillColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.circle(100, 62, 28, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
  doc.text("2", 100, 70, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("AI-Powered Products", 150, 75);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.text("Real FQHCs. Real results.", 80, 175);

  const tier2Examples = [
    { org: "AltaMed (CA, 60+ sites)", vendor: "Abridge", result: "28-language ambient scribe across 500K+ patients", badge: "DEPLOYED" },
    { org: "Sun River Health (NY, 500+ providers)", vendor: "Sunoh.ai", result: "26 patients' notes in 30 min (was 2+ hrs)", badge: "DEPLOYED" },
    { org: "Neighborhood Healthcare (CA)", vendor: "Nabla", result: "4.4/5 provider satisfaction, 30 facilities", badge: "DEPLOYED" },
    { org: "HealthRight 360 (CA)", vendor: "Akido ScopeAI", result: "92% diagnostic accuracy for CHW street medicine", badge: "DEPLOYED" },
  ];

  yPos = 220;
  tier2Examples.forEach((e) => {
    doc.setFillColor(245, 245, 244);
    doc.roundedRect(60, yPos, 960, 120, 10, 10, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
    doc.text(e.org, 80, yPos + 30);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(18);
    doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);
    doc.text(`Vendor: ${e.vendor}`, 80, yPos + 55);
    wrapText(doc, e.result, 80, yPos + 78, 760, 22);

    // Badge
    doc.setFillColor(GREEN[0], GREEN[1], GREEN[2]);
    doc.roundedRect(860, yPos + 12, 140, 32, 6, 6, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
    doc.text(e.badge, 930, yPos + 34, { align: "center" });

    yPos += 140;
  });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.text("Cost: $0-6K/provider/year * ROI: 1-3 months", PAGE_W / 2, yPos + 20, { align: "center" });

  drawFooter(doc, 4, total);

  // --- SLIDE 5: Tier 3  -  AI-Assisted Dev ---
  addNewPage(doc);
  drawBg(doc, TEAL);

  doc.setFillColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.circle(120, 80, 30, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
  doc.text("3", 120, 88, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(44);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("AI-Assisted Dev", 170, 92);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(24);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("Build custom solutions with AI coding tools", 80, 160);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(22);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  wrapText(doc, "Instead of buying off-the-shelf, a small internal team uses AI-powered coding tools to build exactly what your workflows need.", 80, 210, 920, 30);

  const tier3Items = [
    { what: "Custom EHR integrations", how: "Connect systems that don't talk to each other  -  referral tracking, lab results, community resource matching" },
    { what: "Automated reporting", how: "Build dashboards that pull UDS/HEDIS/grant metrics automatically instead of manual spreadsheets" },
    { what: "Patient engagement tools", how: "Bilingual appointment reminders, care plan summaries, community health worker mobile apps" },
    { what: "Revenue cycle automation", how: "Custom claim scrubbing, eligibility verification, denial pattern detection tuned to your payer mix" },
  ];

  yPos = 330;
  tier3Items.forEach((item) => {
    doc.setFillColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
    doc.roundedRect(60, yPos, 960, 110, 8, 8, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
    doc.text(item.what, 80, yPos + 30);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(18);
    doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
    wrapText(doc, item.how, 80, yPos + 55, 920, 24);

    yPos += 125;
  });

  doc.setFillColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.roundedRect(180, yPos + 10, 720, 55, 10, 10, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
  doc.text("Tools: Claude Code, Cursor, GitHub Copilot", PAGE_W / 2, yPos + 45, { align: "center" });

  drawFooter(doc, 5, total);

  // --- SLIDE 6: Tier 4  -  Full Custom AI/ML ---
  addNewPage(doc);
  drawBg(doc, WHITE);

  doc.setFillColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.rect(0, 0, PAGE_W, 120, "F");

  doc.setFillColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.circle(100, 62, 28, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
  doc.text("4", 100, 70, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("Custom AI / ML", 150, 75);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.text("The frontier  -  not for everyone (yet)", 80, 180);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(22);
  doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);
  wrapText(doc, "Building proprietary machine learning models on your own clinical data. Currently realistic only for large networks (3,000+ staff) or through consortiums.", 80, 230, 920, 30);

  // Who could do this
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.text("Potential use cases:", 80, 350);

  const tier4Uses = [
    "Predictive no-show models trained on YOUR patient population",
    "Population health risk stratification using local data patterns",
    "Custom NLP for multilingual clinical notes (beyond vendor offerings)",
    "Social determinants scoring from unstructured community data",
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(22);
  yPos = 400;
  tier4Uses.forEach((u) => {
    doc.setFillColor(AMBER[0], AMBER[1], AMBER[2]);
    doc.circle(95, yPos + 5, 8, "F");
    doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);
    yPos = wrapText(doc, u, 120, yPos + 12, 880, 28) + 22;
  });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
  wrapText(doc, "Reality check: Even AltaMed (3,500 staff, $600M revenue) chose to buy Abridge rather than build. Start at Tier 1-2, build capacity for Tier 3, and evaluate Tier 4 when ready.", 80, yPos + 20, 920, 28);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(18);
  doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);
  doc.text("Cost: $500K-$2M+ annually * ROI: 18-24 months", PAGE_W / 2, PAGE_H - 120, { align: "center" });

  drawFooter(doc, 6, total);

  // --- SLIDE 7: Decision Matrix ---
  addNewPage(doc);
  drawBg(doc, TEAL);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("WHERE SHOULD YOU START?", PAGE_W / 2, 80, { align: "center" });

  const matrix = [
    { size: "Small FQHC (< 100 staff)", rec: "Start with Tier 1", detail: "Get 5-10 admin accounts. Draft grants, policies, patient materials. ~$200/mo.", color: AMBER },
    { size: "Mid-size FQHC (100-500 staff)", rec: "Tier 1 + Tier 2", detail: "Enterprise accounts PLUS ambient scribe pilot. Solve documentation burnout. $2-4K/provider/yr.", color: AMBER },
    { size: "Large FQHC (500+ staff)", rec: "Tiers 1-3", detail: "All of the above PLUS explore AI-assisted custom builds for integrations you can't buy.", color: GREEN },
    { size: "FQHC Network / Consortium", rec: "Tiers 1-4", detail: "Pooled data = custom ML potential. OCHIN Epic data lake serves 100+ FQHCs.", color: GREEN },
  ];

  yPos = 140;
  matrix.forEach((m) => {
    doc.setFillColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
    doc.roundedRect(60, yPos, 960, 150, 10, 10, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
    doc.text(m.size, 80, yPos + 35);

    // Recommendation badge
    doc.setFillColor(m.color[0], m.color[1], m.color[2]);
    doc.roundedRect(80, yPos + 50, 260, 35, 6, 6, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
    doc.text(m.rec, 210, yPos + 73, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(18);
    doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
    wrapText(doc, m.detail, 80, yPos + 105, 920, 24);

    yPos += 170;
  });

  drawFooter(doc, 7, total);

  // --- SLIDE 8: CTA ---
  addNewPage(doc);
  drawBg(doc, TEAL);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(44);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  wrapText(doc, "AI isn't coming to FQHCs.", 120, 250, 840, 56);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  wrapText(doc, "It's already here.", 120, 320, 840, 56);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(26);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  wrapText(doc, "We track 19 AI adoption signals across the FQHC sector  -  vendor comparisons, EHR compatibility, case studies, and a governance framework. All free.", 120, 430, 840, 36);

  doc.setFillColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.roundedRect(300, 600, 480, 70, 12, 12, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
  doc.text("fqhctalent.com/ai-tracker", PAGE_W / 2, 645, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(20);
  doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
  doc.text("Interactive vendor comparison + EHR compatibility matrix", PAGE_W / 2, 720, { align: "center" });

  drawFooter(doc, 8, total);

  return doc;
}

// ================================================================
// CAROUSEL 2: Revenue Transformation Levers
// ================================================================
function createRevenueCarousel() {
  const doc = createPDF();
  const total = 9;

  // --- SLIDE 1: Hero ---
  drawBg(doc, TEAL);
  drawAmberBadge(doc, "REVENUE PLAYBOOK", 360, 180, 360);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(48);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  wrapText(doc, "FQHC Revenue Isn't Broken.", 120, 300, 840, 60);

  doc.setFontSize(48);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("It's Hiding.", 120, 370);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(26);
  doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
  wrapText(doc, "7 proven levers that real FQHCs are using to transform their revenue  -  with case studies, numbers, and implementation timelines.", 120, 460, 840, 36);

  doc.setFontSize(24);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("Swipe for the playbook ->", PAGE_W / 2, 640, { align: "center" });

  drawFooter(doc, 1, total);

  // --- SLIDE 2: Case Study  -  PureView ---
  addNewPage(doc);
  drawBg(doc, WHITE);

  doc.setFillColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.rect(0, 0, PAGE_W, 100, "F");
  drawAmberBadge(doc, "CASE STUDY", 420, 30, 240);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.text("PureView Health Center", 80, 170);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(20);
  doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);
  doc.text("Montana  *  5-year transformation  *  From $1M deficit to positive reserves", 80, 210);

  // Before/After visual
  doc.setFillColor(254, 226, 226); // red-100
  doc.roundedRect(80, 260, 440, 200, 12, 12, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(220, 38, 38);
  doc.text("BEFORE", 300, 295, { align: "center" });
  doc.setFontSize(56);
  doc.text("62.5%", 300, 370, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(20);
  doc.text("federal dependency", 300, 405, { align: "center" });
  doc.setFontSize(18);
  doc.text("$1M annual deficit", 300, 435, { align: "center" });

  doc.setFillColor(209, 250, 229); // green-100
  doc.roundedRect(560, 260, 440, 200, 12, 12, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(GREEN[0], GREEN[1], GREEN[2]);
  doc.text("AFTER", 780, 295, { align: "center" });
  doc.setFontSize(56);
  doc.text("17%", 780, 370, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(20);
  doc.text("federal dependency", 780, 405, { align: "center" });
  doc.setFontSize(18);
  doc.text("Positive reserves", 780, 435, { align: "center" });

  // Arrow
  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("->", 530, 365, { align: "center" });

  // What they did
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.text("What they did:", 80, 520);

  const steps = [
    "Hired Chief Revenue Officer (Year 1)",
    "Entity-owned pharmacy  -  captured 100% of 340B savings (Year 2)",
    "3 new service lines: BH, dental, SUD treatment (Year 3)",
    "Stacked competitive grants as supplements (Years 3-5)",
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(20);
  doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);
  yPos = 555;
  steps.forEach((s, i) => {
    doc.setFillColor(AMBER[0], AMBER[1], AMBER[2]);
    doc.circle(95, yPos + 4, 12, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
    doc.text(String(i + 1), 95, yPos + 9, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(20);
    doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);
    doc.text(s, 120, yPos + 10);
    yPos += 40;
  });

  drawFooter(doc, 2, total);

  // --- SLIDE 3: Lever 1  -  340B ---
  addNewPage(doc);
  drawBg(doc, TEAL);

  drawAmberBadge(doc, "LEVER 1", 80, 60, 140);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(44);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("340B Pharmacy Optimization", 80, 160);

  // Big stat
  doc.setFontSize(80);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("+270%", PAGE_W / 2, 300, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(24);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("pharmacy revenue growth at Highland Health", PAGE_W / 2, 345, { align: "center" });

  const facts340b = [
    "$81 billion  -  national 340B program size (2024)",
    "$500K-$2M+ annual revenue for larger FQHCs",
    "Most FQHCs capture only 40-60% of eligible prescriptions",
    "Entity-owned pharmacy captures 100% of margin (vs. 20-40% with contract pharmacy)",
    "Implementation: 6-12 months for entity-owned; weeks for contract optimization",
  ];

  doc.setFontSize(22);
  yPos = 420;
  facts340b.forEach((f) => {
    doc.setFillColor(AMBER[0], AMBER[1], AMBER[2]);
    doc.circle(95, yPos + 5, 6, "F");
    doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
    yPos = wrapText(doc, f, 115, yPos + 10, 880, 28) + 18;
  });

  drawFooter(doc, 3, total);

  // --- SLIDE 4: Lever 2  -  Same-Day Billing ---
  addNewPage(doc);
  drawBg(doc, WHITE);

  doc.setFillColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.rect(0, 0, PAGE_W, 60, "F");
  drawAmberBadge(doc, "LEVER 2", 80, 80, 140);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(40);
  doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.text("Same-Day Billing", 80, 170);

  // Key stat
  doc.setFillColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.roundedRect(80, 210, 920, 120, 12, 12, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("$23M - $232M", PAGE_W / 2, 265, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(22);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("in unbilled BH co-visits at CA FQHCs annually (CHCF)", PAGE_W / 2, 305, { align: "center" });

  // Rules breakdown
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.text("Same-day billing rules you need to know:", 80, 390);

  const billingRules = [
    { rule: "Medical + Dental = 2 PPS", note: "Works under BOTH Medi-Cal and Medicare", color: GREEN },
    { rule: "Medical + BH = 2 PPS", note: "Medicare only (Medi-Cal pays 1 unless APM)", color: AMBER },
    { rule: "Each co-visit = $150-400", note: "Additional revenue per patient encounter", color: GREEN },
    { rule: "Implementation: 1-3 months", note: "Scheduling + documentation workflow changes", color: GREEN },
  ];

  yPos = 430;
  billingRules.forEach((b) => {
    doc.setFillColor(245, 245, 244);
    doc.roundedRect(80, yPos, 920, 75, 8, 8, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
    doc.text(b.rule, 100, yPos + 30);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(18);
    doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);
    doc.text(b.note, 100, yPos + 55);

    // Color indicator
    doc.setFillColor(b.color[0], b.color[1], b.color[2]);
    doc.circle(970, yPos + 38, 12, "F");

    yPos += 90;
  });

  drawFooter(doc, 4, total);

  // --- SLIDE 5: Lever 3  -  Team-Based Care ---
  addNewPage(doc);
  drawBg(doc, TEAL);

  drawAmberBadge(doc, "LEVER 3", 80, 60, 140);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(44);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("Team-Based Care Model", 80, 160);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(24);
  doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
  doc.text("The math that changes everything:", 80, 220);

  // Comparison boxes
  doc.setFillColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
  doc.roundedRect(60, 270, 460, 250, 12, 12, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
  doc.text("Traditional Model", 290, 310, { align: "center" });
  doc.setFontSize(56);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("$3,600", 290, 390, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(20);
  doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
  doc.text("revenue/day", 290, 420, { align: "center" });
  doc.setFontSize(18);
  doc.text("16 encounters x $225 PPS", 290, 455, { align: "center" });
  doc.text("1 provider sees all patients", 290, 480, { align: "center" });

  doc.setFillColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.roundedRect(560, 270, 460, 250, 12, 12, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
  doc.text("Team-Based Model", 790, 310, { align: "center" });
  doc.setFontSize(56);
  doc.text("$10,800", 790, 390, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(20);
  doc.text("revenue/day", 790, 420, { align: "center" });
  doc.setFontSize(18);
  doc.text("48 encounters x $225 PPS", 790, 455, { align: "center" });
  doc.text("1 provider + 4 RNs", 790, 480, { align: "center" });

  // 3x callout
  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("= 3x revenue per provider", PAGE_W / 2, 580, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(22);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  wrapText(doc, "RNs handle history, vitals, education. Provider does brief clinical assessment (5-10 min). Breakeven at just 6-7 encounters/day.", 80, 640, 920, 30);

  drawFooter(doc, 5, total);

  // --- SLIDE 6: Lever 4  -  ECM Revenue ---
  addNewPage(doc);
  drawBg(doc, WHITE);

  doc.setFillColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.rect(0, 0, PAGE_W, 60, "F");
  drawAmberBadge(doc, "LEVER 4", 80, 80, 140);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(40);
  doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.text("ECM: Per-Member Revenue", 80, 170);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(22);
  doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);
  wrapText(doc, "Enhanced Care Management pays per-member-per-month  -  not per visit. This creates stable, predictable revenue independent of patient volume.", 80, 210, 920, 30);

  // Revenue math
  doc.setFillColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.roundedRect(80, 310, 920, 170, 12, 12, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("ECM Revenue Formula:", 120, 350);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("Panel Size  x  Engagement Rate  x  PMPM Rate  =  Monthly ECM Revenue", PAGE_W / 2, 400, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(20);
  doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
  doc.text("Example: 500 eligible  x  60% engaged  x  $250/mo  =  $75,000/month", PAGE_W / 2, 445, { align: "center" });

  // Benefits
  const ecmBenefits = [
    { label: "PMPM rates", value: "$150 - $400+ /month per enrolled member" },
    { label: "Revenue type", value: "Managed care contract (not grant-funded)" },
    { label: "Volume risk", value: "None  -  paid per member, not per visit" },
    { label: "Implementation", value: "3-6 months (credentialing + enrollment)" },
  ];

  yPos = 530;
  ecmBenefits.forEach((b) => {
    doc.setFillColor(245, 245, 244);
    doc.roundedRect(80, yPos, 920, 60, 8, 8, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
    doc.text(b.label, 100, yPos + 38);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);
    doc.text(b.value, 380, yPos + 38);
    yPos += 72;
  });

  drawFooter(doc, 6, total);

  // --- SLIDE 7: Levers 5-7 Quick Hits ---
  addNewPage(doc);
  drawBg(doc, TEAL);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("3 MORE LEVERS (QUICK WINS)", PAGE_W / 2, 80, { align: "center" });

  const quickWins = [
    {
      num: "5", title: "Insurance Screening at Intake",
      stat: "3-5x revenue per visit",
      detail: "Converting sliding-fee uninsured ($20-50/visit) to Medi-Cal ($200-400/visit). Implementation: 1-2 months.",
    },
    {
      num: "6", title: "PPS Rate Rebasing",
      stat: "10-30% PPS rate increase",
      detail: "If your costs have grown since last rebase, file a change-in-scope request. Adding services (dental, BH, CHW) qualifies. 6-12 months.",
    },
    {
      num: "7", title: "Revenue Cycle + AI Coding",
      stat: "3-5% collection improvement",
      detail: "AI-driven tools reduce claim denials by up to 45% (RapidClaims: 98% clean claim rate). No new services needed  -  pure efficiency.",
    },
  ];

  yPos = 140;
  quickWins.forEach((q) => {
    doc.setFillColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
    doc.roundedRect(60, yPos, 960, 210, 10, 10, "F");

    // Number badge
    doc.setFillColor(AMBER[0], AMBER[1], AMBER[2]);
    doc.circle(110, yPos + 40, 24, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
    doc.text(q.num, 110, yPos + 48, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
    doc.text(q.title, 150, yPos + 45);

    // Stat highlight
    doc.setFontSize(36);
    doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
    doc.text(q.stat, 80, yPos + 105);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(20);
    doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
    wrapText(doc, q.detail, 80, yPos + 140, 920, 26);

    yPos += 230;
  });

  drawFooter(doc, 7, total);

  // --- SLIDE 8: The Real Bottleneck ---
  addNewPage(doc);
  drawBg(doc, WHITE);

  doc.setFillColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.rect(0, 0, PAGE_W, 120, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("THE REAL BOTTLENECK", PAGE_W / 2, 75, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(30);
  doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
  wrapText(doc, "These levers only work if you have the operational readiness to pull them:", 80, 190, 920, 38);

  const bottlenecks = [
    { item: "Workforce stability -- can't launch ECM without CHWs to staff it" },
    { item: "EHR competency -- same-day billing requires documentation workflows" },
    { item: "Cash reserves -- entity-owned pharmacy takes 6-12 months to build" },
    { item: "Leadership capacity -- someone has to own revenue strategy" },
    { item: "Data infrastructure -- you can't optimize what you can't measure" },
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(24);
  yPos = 310;
  bottlenecks.forEach((b) => {
    doc.setFillColor(AMBER[0], AMBER[1], AMBER[2]);
    doc.roundedRect(80, yPos - 8, 920, 65, 8, 8, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
    wrapText(doc, b.item, 100, yPos + 18, 880, 28);

    yPos += 80;
  });

  doc.setFont("helvetica", "italic");
  doc.setFontSize(22);
  doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
  wrapText(doc, "The revenue opportunity is real. But operational readiness is what separates FQHCs that transform from those that just talk about it.", 80, yPos + 30, 920, 30);

  drawFooter(doc, 8, total);

  // --- SLIDE 9: CTA ---
  addNewPage(doc);
  drawBg(doc, TEAL);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(44);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  wrapText(doc, "The revenue is there.", 120, 230, 840, 56);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  wrapText(doc, "Let's go find it.", 120, 300, 840, 56);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(26);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  wrapText(doc, "Free clinic revenue simulator, resilience scorecards for 220 California FQHCs, and strategy playbooks built from real case studies.", 120, 400, 840, 36);

  // Two CTAs
  doc.setFillColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.roundedRect(80, 560, 440, 70, 12, 12, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
  doc.text("Revenue Simulator", 300, 600, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(16);
  doc.text("fqhctalent.com/strategy/revenue-simulator", 300, 622, { align: "center" });

  doc.setFillColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.roundedRect(560, 560, 440, 70, 12, 12, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.text("Resilience Scorecard", 780, 600, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(16);
  doc.text("fqhctalent.com/strategy/resilience", 780, 622, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(20);
  doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
  doc.text("Both free. Both built for FQHC leaders.", PAGE_W / 2, 690, { align: "center" });

  drawFooter(doc, 9, total);

  return doc;
}

// ========== GENERATE ==========
const outDir = path.join(__dirname, "..", "marketing", "linkedin");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const carousels = [
  { name: "2026-03-13-ai-adoption-framework-carousel", fn: createAICarousel },
  { name: "2026-03-13-revenue-transformation-carousel", fn: createRevenueCarousel },
];

carousels.forEach(({ name, fn }) => {
  const doc = fn();
  const buffer = Buffer.from(doc.output("arraybuffer"));
  const outPath = path.join(outDir, `${name}.pdf`);
  fs.writeFileSync(outPath, buffer);
  console.log(`✓ ${name}.pdf (${(buffer.length / 1024).toFixed(0)}KB, ${doc.internal.pages.length - 1} slides)`);
});

console.log("\nDone! 2 positive LinkedIn carousel PDFs created.");
