/**
 * LinkedIn Carousel PDF Generator
 * Creates 1080x1080 multi-page PDFs for LinkedIn carousel posts.
 * Brand: Teal (#0F766E) primary, Amber (#F59E0B) accent, White text.
 *
 * Usage: node scripts/create-linkedin-carousels.js
 */

const { jsPDF } = require("jspdf");
const fs = require("fs");
const path = require("path");

// Brand colors
const TEAL = [15, 118, 110]; // #0F766E
const TEAL_DARK = [13, 95, 88]; // darker teal for contrast
const AMBER = [245, 158, 11]; // #F59E0B
const WHITE = [255, 255, 255];
const STONE_100 = [245, 245, 244];
const STONE_700 = [68, 64, 60];

// Page size: 1080x1080px ≈ 381x381mm at 72dpi, but PDF uses points (1pt = 1/72in)
// LinkedIn carousels: 1080x1080px. At 72 DPI = 15in x 15in = 1080pt x 1080pt
const PAGE_W = 1080;
const PAGE_H = 1080;

function createPDF() {
  return new jsPDF({
    unit: "pt",
    format: [PAGE_W, PAGE_H],
    orientation: "landscape",
  });
}

function setColor(doc, rgb) {
  doc.setFillColor(rgb[0], rgb[1], rgb[2]);
  doc.setTextColor(rgb[0], rgb[1], rgb[2]);
}

function drawBg(doc, rgb) {
  doc.setFillColor(rgb[0], rgb[1], rgb[2]);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");
}

function drawFooter(doc, slideNum, totalSlides) {
  // Bottom bar with branding
  doc.setFillColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
  doc.rect(0, PAGE_H - 80, PAGE_W, 80, "F");

  // Logo text
  doc.setFontSize(20);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("FQHC Talent Exchange", 60, PAGE_H - 35);

  // URL
  doc.setFontSize(16);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("fqhctalent.com", 60, PAGE_H - 15);

  // Slide number
  doc.setFontSize(18);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
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

// ========== CAROUSEL 1: The July 1 Medi-Cal Bomb ==========
function createCarousel1() {
  const doc = createPDF();
  const totalSlides = 7;

  // --- SLIDE 1: Hero ---
  drawBg(doc, TEAL);
  drawAmberBadge(doc, "CRITICAL DEADLINE", 340, 200, 400);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(72);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("$1 BILLION", PAGE_W / 2, 360, { align: "center" });

  doc.setFontSize(36);
  doc.text("in FQHC Revenue at Risk", PAGE_W / 2, 420, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(28);
  doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
  wrapText(doc, "California eliminates PPS reimbursement for undocumented patients on July 1, 2026. Here's what FQHC leaders need to know.", 120, 520, 840, 38);

  doc.setFontSize(24);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("Swipe to see the impact →", PAGE_W / 2, 700, { align: "center" });

  drawFooter(doc, 1, totalSlides);

  // --- SLIDE 2: The Problem ---
  addNewPage(doc);
  drawBg(doc, WHITE);

  doc.setFillColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.rect(0, 0, PAGE_W, 120, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("THE PROBLEM", PAGE_W / 2, 75, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(30);
  doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
  wrapText(doc, "California is ending Prospective Payment System (PPS) reimbursement for Uninsured/Undocumented patients.", 80, 200, 920, 42);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(24);
  doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);

  const bullets = [
    "1.7 million undocumented Californians affected",
    "FQHCs currently receive ~$250/visit PPS rate for these patients",
    "After July 1: state-only flat rate (significantly lower)",
    "FQHCs with >15% undocumented volume face severe revenue loss",
    "No federal match — 100% state general fund",
  ];

  let yPos = 370;
  bullets.forEach((b) => {
    doc.setFillColor(AMBER[0], AMBER[1], AMBER[2]);
    doc.circle(95, yPos - 5, 8, "F");
    doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);
    yPos = wrapText(doc, b, 120, yPos, 880, 32) + 20;
  });

  doc.setFontSize(18);
  doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.text("Source: CHCF Analysis, March 2026", 80, PAGE_H - 110);

  drawFooter(doc, 2, totalSlides);

  // --- SLIDE 3: By the Numbers ---
  addNewPage(doc);
  drawBg(doc, TEAL);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("BY THE NUMBERS", PAGE_W / 2, 80, { align: "center" });

  // Stat cards
  const stats = [
    { number: "$1B", label: "Sector-wide revenue\nat risk annually" },
    { number: "112", label: "Days until the\nJuly 1 deadline" },
    { number: "1.7M", label: "Undocumented patients\naffected statewide" },
    { number: "30%+", label: "Patient volume at risk\nfor high-UIS FQHCs" },
  ];

  stats.forEach((s, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 80 + col * 480;
    const y = 140 + row * 340;

    doc.setFillColor(255, 255, 255, 0.15);
    doc.setFillColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
    doc.roundedRect(x, y, 440, 280, 16, 16, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(72);
    doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
    doc.text(s.number, x + 220, y + 110, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(24);
    doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
    const lines = s.label.split("\n");
    lines.forEach((line, li) => {
      doc.text(line, x + 220, y + 170 + li * 32, { align: "center" });
    });
  });

  drawFooter(doc, 3, totalSlides);

  // --- SLIDE 4: Who's Hit Hardest ---
  addNewPage(doc);
  drawBg(doc, WHITE);

  doc.setFillColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.rect(0, 0, PAGE_W, 120, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("WHO'S HIT HARDEST", PAGE_W / 2, 75, { align: "center" });

  const regions = [
    { name: "Los Angeles County", pct: "35%+", risk: "CRITICAL" },
    { name: "Central Valley (SJV)", pct: "30%+", risk: "CRITICAL" },
    { name: "San Diego/Border", pct: "25%+", risk: "HIGH" },
    { name: "Bay Area", pct: "20%+", risk: "HIGH" },
    { name: "Inland Empire", pct: "20%+", risk: "HIGH" },
  ];

  yPos = 180;
  regions.forEach((r) => {
    // Row background
    doc.setFillColor(245, 245, 244);
    doc.roundedRect(80, yPos - 10, 920, 90, 8, 8, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);
    doc.text(r.name, 100, yPos + 38);

    // Percentage
    doc.setFontSize(36);
    doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
    doc.text(r.pct, 650, yPos + 38);

    // Risk badge
    const badgeColor = r.risk === "CRITICAL" ? [220, 38, 38] : AMBER;
    doc.setFillColor(badgeColor[0], badgeColor[1], badgeColor[2]);
    doc.roundedRect(780, yPos + 10, 180, 45, 6, 6, "F");
    doc.setFontSize(18);
    doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
    doc.text(r.risk, 870, yPos + 40, { align: "center" });

    yPos += 110;
  });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(20);
  doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);
  wrapText(doc, "Percentages represent estimated undocumented patient share of total FQHC volume. Source: CHCF regional analysis.", 80, yPos + 30, 920, 28);

  drawFooter(doc, 4, totalSlides);

  // --- SLIDE 5: What's Being Done ---
  addNewPage(doc);
  drawBg(doc, TEAL);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("WHAT'S BEING DONE", PAGE_W / 2, 80, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("Legislative Response", 80, 180);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(22);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  wrapText(doc, "SB 1422 (Sen. Durazo) — Would restore Medi-Cal coverage for all undocumented adults. 35+ state attorneys general have filed suit against federal Medicaid cuts.", 80, 220, 920, 30);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("Local Innovation", 80, 380);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(22);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  wrapText(doc, "Santa Clara County Measure A: $330M/year local sales tax to offset federal cuts (57% voter approval). San Diego Safety Net Bridge program proposed. LA coalition proposing half-cent sales tax.", 80, 420, 920, 30);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("FQHC Response", 80, 580);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(22);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  wrapText(doc, "FQHCs accelerating ECM enrollment, renegotiating commercial contracts, pursuing 340B rebate models, and building grant revenue pipelines. The most resilient FQHCs have diversified revenue across 8+ streams.", 80, 620, 920, 30);

  drawFooter(doc, 5, totalSlides);

  // --- SLIDE 6: Your 112-Day Action Plan ---
  addNewPage(doc);
  drawBg(doc, WHITE);

  doc.setFillColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.rect(0, 0, PAGE_W, 120, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("YOUR 112-DAY ACTION PLAN", PAGE_W / 2, 75, { align: "center" });

  const actions = [
    { when: "NOW", what: "Audit your UIS patient volume & revenue exposure" },
    { when: "30 DAYS", what: "Model revenue scenarios: PPS loss vs. flat-rate replacement" },
    { when: "60 DAYS", what: "Accelerate ECM enrollment & commercial payer negotiations" },
    { when: "90 DAYS", what: "Activate grant pipeline (HRSA §330, 340B, state supplemental)" },
    { when: "112 DAYS", what: "Go-live contingency plan ready for July 1 transition" },
  ];

  yPos = 180;
  actions.forEach((a) => {
    // Timeline dot
    doc.setFillColor(AMBER[0], AMBER[1], AMBER[2]);
    doc.circle(130, yPos + 25, 16, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
    doc.text(a.when.length <= 3 ? a.when : "", 130, yPos + 30, { align: "center" });

    // When label (for longer text)
    if (a.when.length > 3) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
      doc.text(a.when, 170, yPos + 20);
    }

    // What
    doc.setFont("helvetica", "normal");
    doc.setFontSize(24);
    doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);
    wrapText(doc, a.what, 170, a.when.length <= 3 ? yPos + 15 : yPos + 50, 820, 32);

    // Connector line
    if (a.when !== "112 DAYS") {
      doc.setDrawColor(AMBER[0], AMBER[1], AMBER[2]);
      doc.setLineWidth(3);
      doc.line(130, yPos + 45, 130, yPos + 120);
    }

    yPos += 120;
  });

  drawFooter(doc, 6, totalSlides);

  // --- SLIDE 7: CTA ---
  addNewPage(doc);
  drawBg(doc, TEAL);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(44);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  wrapText(doc, "The crisis is real.", 120, 250, 840, 56);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  wrapText(doc, "The opportunity is too.", 120, 320, 840, 56);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(28);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  wrapText(doc, "Track every policy change, funding cliff, and workforce signal affecting California FQHCs.", 120, 430, 840, 38);

  // CTA button
  doc.setFillColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.roundedRect(280, 580, 520, 70, 12, 12, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
  doc.text("fqhctalent.com/strategy/resilience", PAGE_W / 2, 625, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(20);
  doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
  doc.text("Free resilience scores for 220 California FQHCs", PAGE_W / 2, 700, { align: "center" });

  drawFooter(doc, 7, totalSlides);

  return doc;
}

// ========== CAROUSEL 2: AI Scribe Tipping Point ==========
function createCarousel2() {
  const doc = createPDF();
  const totalSlides = 6;

  // --- SLIDE 1: Hero ---
  drawBg(doc, TEAL);
  drawAmberBadge(doc, "AI IN HEALTHCARE", 370, 200, 340);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(56);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  wrapText(doc, "AI Scribes Are Here.", 120, 340, 840, 66);
  doc.setFontSize(40);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("Is Your FQHC Ready?", PAGE_W / 2, 490, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(24);
  doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
  wrapText(doc, "Ambient AI scribes are the fastest-adopted technology in healthcare history. Here's what FQHCs need to know before jumping in.", 120, 570, 840, 34);

  doc.setFontSize(24);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("Swipe for the evidence →", PAGE_W / 2, 720, { align: "center" });

  drawFooter(doc, 1, totalSlides);

  // --- SLIDE 2: The Adoption Wave ---
  addNewPage(doc);
  drawBg(doc, WHITE);

  doc.setFillColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.rect(0, 0, PAGE_W, 120, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("THE ADOPTION WAVE", PAGE_W / 2, 75, { align: "center" });

  const adoptionStats = [
    { stat: "100+", desc: "FQHCs piloting ambient AI scribes" },
    { stat: "51.9% → 38.8%", desc: "Burnout reduction in one health system" },
    { stat: "+13 min", desc: "Per visit returned to patient care" },
    { stat: "15%+", desc: "Visit efficiency gain at Neighborhood Healthcare (CA FQHC)" },
  ];

  yPos = 180;
  adoptionStats.forEach((s) => {
    doc.setFillColor(245, 245, 244);
    doc.roundedRect(80, yPos - 10, 920, 110, 10, 10, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(40);
    doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
    doc.text(s.stat, 120, yPos + 45);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(22);
    doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);
    wrapText(doc, s.desc, 440, yPos + 20, 540, 30);

    yPos += 130;
  });

  doc.setFontSize(16);
  doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.text("Source: Peterson Health Technology Institute, Best in KLAS 2026", 80, PAGE_H - 110);

  drawFooter(doc, 2, totalSlides);

  // --- SLIDE 3: The Opportunity ---
  addNewPage(doc);
  drawBg(doc, TEAL);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("THE OPPORTUNITY", PAGE_W / 2, 80, { align: "center" });

  doc.setFontSize(28);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("What FQHCs are seeing:", 80, 180);

  const opportunities = [
    "Eliminate 'pajama time' — providers stop charting at home",
    "Reduce documentation burden by 60-70%",
    "Free up 13+ minutes per visit for patient interaction",
    "Abridge now supports 28 languages — critical for FQHC populations",
    "AltaMed (3,500+ staff) deployed Abridge across 60+ sites",
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(24);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  yPos = 240;
  opportunities.forEach((o) => {
    doc.setFillColor(AMBER[0], AMBER[1], AMBER[2]);
    doc.circle(95, yPos + 5, 8, "F");
    yPos = wrapText(doc, o, 120, yPos + 12, 880, 32) + 20;
  });

  doc.setFont("helvetica", "italic");
  doc.setFontSize(22);
  doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
  wrapText(doc, '"The question isn\'t if — it\'s how to deploy safely."', 120, 680, 840, 30);

  drawFooter(doc, 3, totalSlides);

  // --- SLIDE 4: The Risk ---
  addNewPage(doc);
  drawBg(doc, WHITE);

  doc.setFillColor(220, 38, 38);
  doc.rect(0, 0, PAGE_W, 120, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("THE RISK", PAGE_W / 2, 75, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(30);
  doc.setTextColor(220, 38, 38);
  doc.text("The 'Coding Arms Race'", 80, 200);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(22);
  doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);

  const risks = [
    "Some health systems report 11% wRVU increases and 14% HCC score rises after AI scribe deployment",
    "npj Digital Medicine warns of AI-driven upcoding becoming the new compliance frontier",
    "Under PPS, FQHCs can't directly upcode — but documentation patterns still face audit scrutiny",
    "NEJM Catalyst (March 2026) calls this an 'inflection point' requiring governance frameworks",
    "Rural FQHCs face additional barriers: connectivity, training, vendor support",
  ];

  yPos = 260;
  risks.forEach((r) => {
    doc.setFillColor(254, 226, 226); // red-100
    doc.circle(95, yPos + 5, 8, "F");
    doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);
    yPos = wrapText(doc, r, 120, yPos + 12, 880, 30) + 22;
  });

  doc.setFontSize(16);
  doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.text("Source: npj Digital Medicine, NEJM Catalyst March 2026 Special Issue", 80, PAGE_H - 110);

  drawFooter(doc, 4, totalSlides);

  // --- SLIDE 5: FQHC Vendor Landscape ---
  addNewPage(doc);
  drawBg(doc, TEAL);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("FQHC VENDOR LANDSCAPE", PAGE_W / 2, 80, { align: "center" });

  const vendors = [
    { name: "Abridge", ehr: "Epic, eCW", fit: "HIGH", note: "Best in KLAS 2026, 28 languages" },
    { name: "Nabla", ehr: "eCW, athena", fit: "HIGH", note: "Neighborhood HC pilot success" },
    { name: "Sunoh.ai", ehr: "eCW, athena", fit: "MEDIUM", note: "Sun River Health: 7K visits/mo" },
    { name: "eClinicalWorks AI", ehr: "eCW native", fit: "HIGH", note: "Built into eCW platform" },
    { name: "DAX Copilot", ehr: "Epic", fit: "MEDIUM", note: "Nuance/Microsoft — enterprise tier" },
  ];

  yPos = 150;
  vendors.forEach((v) => {
    doc.setFillColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
    doc.roundedRect(60, yPos, 960, 110, 10, 10, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
    doc.text(v.name, 90, yPos + 35);

    // EHR compat
    doc.setFont("helvetica", "normal");
    doc.setFontSize(18);
    doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
    doc.text(`EHR: ${v.ehr}`, 90, yPos + 62);

    // Note
    doc.setFontSize(16);
    doc.text(v.note, 90, yPos + 88);

    // Fit badge
    const fitColor = v.fit === "HIGH" ? [16, 185, 129] : AMBER; // green or amber
    doc.setFillColor(fitColor[0], fitColor[1], fitColor[2]);
    doc.roundedRect(840, yPos + 15, 150, 35, 6, 6, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
    doc.text(`${v.fit} FIT`, 915, yPos + 38, { align: "center" });

    yPos += 130;
  });

  drawFooter(doc, 5, totalSlides);

  // --- SLIDE 6: CTA ---
  addNewPage(doc);
  drawBg(doc, TEAL);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(44);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  wrapText(doc, "AI is transforming care.", 120, 260, 840, 56);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  wrapText(doc, "Deploy it wisely.", 120, 330, 840, 56);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(28);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  wrapText(doc, "We track 19 AI adoption signals across the FQHC sector. Vendor comparison matrix, EHR compatibility, and implementation case studies — all free.", 120, 440, 840, 38);

  // CTA button
  doc.setFillColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.roundedRect(320, 600, 440, 70, 12, 12, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
  doc.text("fqhctalent.com/ai-tracker", PAGE_W / 2, 645, { align: "center" });

  drawFooter(doc, 6, totalSlides);

  return doc;
}

// ========== CAROUSEL 3: Workforce Crisis ==========
function createCarousel3() {
  const doc = createPDF();
  const totalSlides = 6;

  // --- SLIDE 1: Hero ---
  drawBg(doc, TEAL);
  drawAmberBadge(doc, "WORKFORCE INTEL", 370, 200, 340);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(72);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("3,477+", PAGE_W / 2, 370, { align: "center" });

  doc.setFontSize(36);
  doc.text("Healthcare Workers Displaced", PAGE_W / 2, 430, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(28);
  doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
  wrapText(doc, "20 organizations. 11 FQHCs. RNs, CHWs, care coordinators, bilingual staff — all in transition. This is a recruitment opportunity.", 120, 520, 840, 38);

  doc.setFontSize(24);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("Swipe for the data →", PAGE_W / 2, 700, { align: "center" });

  drawFooter(doc, 1, totalSlides);

  // --- SLIDE 2: The Reality ---
  addNewPage(doc);
  drawBg(doc, WHITE);

  doc.setFillColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.rect(0, 0, PAGE_W, 120, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("THE REALITY", PAGE_W / 2, 75, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(24);
  doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);
  wrapText(doc, "These aren't just statistics. These are community health workers who know their neighborhoods, navigators who speak Khmer or Hmong or Spanish, RNs who've built trust over years of service.", 80, 180, 920, 34);

  // Key stat cards
  const realityStats = [
    { num: "20", label: "Organizations announced layoffs" },
    { num: "11", label: "Are FQHCs (55% of the crisis)" },
    { num: "9", label: "California regions affected" },
    { num: "60-90", label: "Day WARN notice window" },
  ];

  yPos = 370;
  realityStats.forEach((s, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 80 + col * 480;
    const y = yPos + row * 180;

    doc.setFillColor(TEAL[0], TEAL[1], TEAL[2]);
    doc.roundedRect(x, y, 440, 150, 12, 12, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(52);
    doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
    doc.text(s.num, x + 30, y + 65);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(20);
    doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
    wrapText(doc, s.label, x + 30, y + 95, 380, 28);
  });

  drawFooter(doc, 2, totalSlides);

  // --- SLIDE 3: Largest Displacements ---
  addNewPage(doc);
  drawBg(doc, TEAL);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("LARGEST DISPLACEMENTS", PAGE_W / 2, 80, { align: "center" });

  const layoffs = [
    { org: "LA DPH", count: "500", role: "Care coordinators", region: "Los Angeles" },
    { org: "Santa Clara County", count: "365", role: "Health system FTEs", region: "Bay Area" },
    { org: "Alameda Health System", count: "247", role: "Clinical & support", region: "Bay Area" },
    { org: "L.A. Care Health Plan", count: "225", role: "Plan administration", region: "Los Angeles" },
    { org: "Borrego Health", count: "124", role: "Multi-role", region: "Inland Empire" },
    { org: "San Ysidro Health", count: "75", role: "CHWs", region: "San Diego" },
  ];

  yPos = 140;
  layoffs.forEach((l) => {
    doc.setFillColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
    doc.roundedRect(60, yPos, 960, 95, 8, 8, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
    doc.text(l.org, 90, yPos + 35);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(18);
    doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
    doc.text(`${l.role} • ${l.region}`, 90, yPos + 65);

    // Count badge
    doc.setFillColor(AMBER[0], AMBER[1], AMBER[2]);
    doc.roundedRect(850, yPos + 20, 140, 50, 8, 8, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.setTextColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
    doc.text(l.count, 920, yPos + 53, { align: "center" });

    yPos += 115;
  });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(16);
  doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
  doc.text("Source: CA WARN Act filings, public reports, 2025-2026", 80, PAGE_H - 110);

  drawFooter(doc, 3, totalSlides);

  // --- SLIDE 4: The Recruitment Window ---
  addNewPage(doc);
  drawBg(doc, WHITE);

  doc.setFillColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.rect(0, 0, PAGE_W, 120, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("THE RECRUITMENT WINDOW", PAGE_W / 2, 75, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
  wrapText(doc, "Why displaced FQHC workers are the highest-quality talent pool:", 80, 190, 920, 36);

  const reasons = [
    { icon: "✓", text: "Already trained in PPS billing, EHR documentation, and FQHC workflows" },
    { icon: "✓", text: "Bilingual staff (Spanish, Vietnamese, Khmer, Tagalog) — hard to replace" },
    { icon: "✓", text: "Community relationships built over years — trust transfers with the worker" },
    { icon: "✓", text: "WARN Act gives 60-day notice — you have a window to recruit before they scatter" },
    { icon: "✓", text: "1,000+ open FQHC positions in California right now" },
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(24);
  yPos = 300;
  reasons.forEach((r) => {
    doc.setFillColor(16, 185, 129); // green
    doc.circle(95, yPos + 5, 12, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
    doc.text("✓", 90, yPos + 12);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(22);
    doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);
    yPos = wrapText(doc, r.text, 125, yPos + 8, 860, 30) + 28;
  });

  drawFooter(doc, 4, totalSlides);

  // --- SLIDE 5: What You Can Do ---
  addNewPage(doc);
  drawBg(doc, TEAL);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("WHAT YOU CAN DO", PAGE_W / 2, 80, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);

  const forGroups = [
    {
      title: "FOR FQHC HR DIRECTORS",
      color: AMBER,
      items: [
        "Monitor layoff tracker for your region",
        "Fast-track displaced workers into open positions",
        "Use our transition toolkit for structured offboarding support",
      ],
    },
    {
      title: "FOR DISPLACED WORKERS",
      color: [16, 185, 129],
      items: [
        "Free resume builder with FQHC-specific templates",
        "Career assessment + 90-day onboarding plan",
        "1,000+ open positions across 30+ FQHCs",
      ],
    },
  ];

  yPos = 150;
  forGroups.forEach((g) => {
    doc.setTextColor(g.color[0], g.color[1], g.color[2]);
    doc.text(g.title, 80, yPos);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(22);
    doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
    yPos += 40;
    g.items.forEach((item) => {
      doc.setFillColor(g.color[0], g.color[1], g.color[2]);
      doc.circle(95, yPos + 5, 6, "F");
      yPos = wrapText(doc, item, 115, yPos + 10, 880, 30) + 20;
    });
    yPos += 40;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
  });

  drawFooter(doc, 5, totalSlides);

  // --- SLIDE 6: CTA ---
  addNewPage(doc);
  drawBg(doc, TEAL);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(40);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  wrapText(doc, "Every number represents", 120, 250, 840, 50);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  wrapText(doc, "a real person.", 120, 310, 840, 50);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(26);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  wrapText(doc, "We track every FQHC layoff, every open position, and every transition resource in California. Free tools for workers. Strategic intelligence for leaders.", 120, 410, 840, 36);

  // CTA buttons
  doc.setFillColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.roundedRect(120, 580, 400, 60, 10, 10, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
  doc.text("fqhctalent.com/layoffs", 320, 618, { align: "center" });

  doc.setFillColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.roundedRect(560, 580, 400, 60, 10, 10, "F");
  doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.text("fqhctalent.com/fast-track", 760, 618, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(18);
  doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
  doc.text("Layoff Tracker", 320, 665, { align: "center" });
  doc.text("Priority Intake for Workers", 760, 665, { align: "center" });

  drawFooter(doc, 6, totalSlides);

  return doc;
}

// ========== GENERATE ALL ==========
const outDir = path.join(__dirname, "..", "marketing", "linkedin");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const carousels = [
  { name: "2026-03-13-medi-cal-revenue-crisis-carousel", fn: createCarousel1 },
  { name: "2026-03-13-ai-scribe-fqhc-carousel", fn: createCarousel2 },
  { name: "2026-03-13-workforce-displacement-carousel", fn: createCarousel3 },
];

carousels.forEach(({ name, fn }) => {
  const doc = fn();
  const buffer = Buffer.from(doc.output("arraybuffer"));
  const outPath = path.join(outDir, `${name}.pdf`);
  fs.writeFileSync(outPath, buffer);
  console.log(`✓ ${name}.pdf (${(buffer.length / 1024).toFixed(0)}KB)`);
});

console.log("\nDone! 3 LinkedIn carousel PDFs created.");
