/**
 * LinkedIn Carousel PDFs - Showcasing 100x Value
 * 1. Resilience Scorecard ("Is Your FQHC Ready?")
 * 2. Scope-of-Practice Revenue Unlock
 * 3. Platform Overview ("Everything We Track - Free")
 *
 * Usage: node scripts/create-showcase-carousels.js
 */

const { jsPDF } = require("jspdf");
const fs = require("fs");
const path = require("path");

const TEAL = [15, 118, 110];
const TEAL_DARK = [13, 95, 88];
const AMBER = [245, 158, 11];
const WHITE = [255, 255, 255];
const STONE_100 = [245, 245, 244];
const STONE_700 = [68, 64, 60];
const GREEN = [16, 185, 129];
const RED = [220, 38, 38];

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
  doc.text(slideNum + "/" + totalSlides, PAGE_W - 80, PAGE_H - 25);
}
function drawBadge(doc, text, x, y, w, bg, fg) {
  doc.setFillColor(bg[0], bg[1], bg[2]);
  doc.roundedRect(x, y, w, 40, 8, 8, "F");
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(fg[0], fg[1], fg[2]);
  doc.text(text, x + w / 2, y + 27, { align: "center" });
}
function wrapText(doc, text, x, y, maxW, lh) {
  var lines = doc.splitTextToSize(text, maxW);
  lines.forEach(function(line, i) { doc.text(line, x, y + i * lh); });
  return y + lines.length * lh;
}
function addPage(doc) { doc.addPage([PAGE_W, PAGE_H]); }

// ================================================================
// CAROUSEL 1: Resilience Scorecard
// ================================================================
function createResilienceCarousel() {
  var doc = createPDF();
  var total = 7;
  var yPos;

  // SLIDE 1: Hero
  drawBg(doc, TEAL);
  drawBadge(doc, "FREE TOOL", 400, 180, 280, AMBER, TEAL_DARK);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(52);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("Is Your FQHC", 120, 310);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("Ready for 2026?", 120, 375);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(26);
  doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
  wrapText(doc, "We scored 214 California FQHCs across 5 resilience dimensions. Free. Searchable. Updated weekly.", 120, 440, 840, 36);

  doc.setFontSize(22);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("See your score ->", PAGE_W / 2, 620, { align: "center" });

  drawFooter(doc, 1, total);

  // SLIDE 2: What We Measure
  addPage(doc);
  drawBg(doc, WHITE);

  doc.setFillColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.rect(0, 0, PAGE_W, 100, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(32);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("5 DIMENSIONS OF FQHC RESILIENCE", PAGE_W / 2, 65, { align: "center" });

  var dims = [
    { name: "Program Diversity", weight: "25%", desc: "How many revenue streams? ECM, CCM, 340B, dental, BH, pharmacy, Ryan White, grants", color: TEAL },
    { name: "Workforce Stability", weight: "20%", desc: "Union status, layoff history, labor disputes, Glassdoor rating, staff retention signals", color: [20, 100, 95] },
    { name: "Data Maturity", weight: "15%", desc: "EHR system modernity, digital infrastructure, reporting capability", color: [25, 110, 105] },
    { name: "Quality Indicators", weight: "20%", desc: "HRSA quality awards, NHSC approval, violations, patient safety record", color: [30, 120, 115] },
    { name: "Financial Positioning", weight: "20%", desc: "Patient scale, site count, Medi-Cal dependency, funding vulnerability", color: [15, 85, 80] },
  ];

  yPos = 140;
  dims.forEach(function(d) {
    doc.setFillColor(d.color[0], d.color[1], d.color[2]);
    doc.roundedRect(60, yPos, 960, 110, 10, 10, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
    doc.text(d.name, 80, yPos + 35);

    // Weight badge
    doc.setFillColor(AMBER[0], AMBER[1], AMBER[2]);
    doc.roundedRect(880, yPos + 10, 120, 35, 6, 6, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
    doc.text(d.weight, 940, yPos + 33, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
    wrapText(doc, d.desc, 80, yPos + 60, 780, 22);

    yPos += 125;
  });

  drawFooter(doc, 2, total);

  // SLIDE 3: Grade Distribution
  addPage(doc);
  drawBg(doc, TEAL);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("HOW CALIFORNIA FQHCs SCORE", PAGE_W / 2, 80, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(22);
  doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
  doc.text("214 FQHCs graded A through F", PAGE_W / 2, 120, { align: "center" });

  // Bar chart visualization
  var grades = [
    { grade: "A", pct: 5, count: "~11", color: [16, 185, 129] },
    { grade: "B", pct: 20, count: "~43", color: [52, 211, 153] },
    { grade: "C", pct: 35, count: "~75", color: AMBER },
    { grade: "D", pct: 28, count: "~60", color: [251, 146, 60] },
    { grade: "F", pct: 12, count: "~25", color: RED },
  ];

  yPos = 200;
  grades.forEach(function(g) {
    // Grade letter
    doc.setFont("helvetica", "bold");
    doc.setFontSize(48);
    doc.setTextColor(g.color[0], g.color[1], g.color[2]);
    doc.text(g.grade, 100, yPos + 50, { align: "center" });

    // Bar
    var barWidth = g.pct * 16; // scale factor
    doc.setFillColor(g.color[0], g.color[1], g.color[2]);
    doc.roundedRect(150, yPos + 15, barWidth, 45, 6, 6, "F");

    // Count + percentage
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
    doc.text(g.count + " FQHCs (" + g.pct + "%)", 150 + barWidth + 20, yPos + 45);

    yPos += 100;
  });

  doc.setFont("helvetica", "italic");
  doc.setFontSize(20);
  doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
  doc.text("Where does yours rank?", PAGE_W / 2, yPos + 30, { align: "center" });

  drawFooter(doc, 3, total);

  // SLIDE 4: What Separates A from F
  addPage(doc);
  drawBg(doc, WHITE);

  doc.setFillColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.rect(0, 0, PAGE_W, 100, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(32);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("WHAT SEPARATES A-GRADE FROM F-GRADE", PAGE_W / 2, 65, { align: "center" });

  // Two column comparison
  // A-Grade
  doc.setFillColor(209, 250, 229);
  doc.roundedRect(60, 130, 460, 540, 12, 12, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(GREEN[0], GREEN[1], GREEN[2]);
  doc.text("A-Grade FQHCs", 290, 180, { align: "center" });

  var aTraits = [
    "8+ revenue streams active",
    "Entity-owned pharmacy (340B)",
    "ECM + CCM + BH all operational",
    "Glassdoor 3.5+ rating",
    "No recent layoffs",
    "Multiple HRSA quality awards",
    "15+ clinical sites",
    "Modern EHR (Epic/OCHIN)",
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(20);
  yPos = 220;
  aTraits.forEach(function(t) {
    doc.setFillColor(GREEN[0], GREEN[1], GREEN[2]);
    doc.circle(95, yPos + 5, 6, "F");
    doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);
    doc.text(t, 115, yPos + 12);
    yPos += 38;
  });

  // F-Grade
  doc.setFillColor(254, 226, 226);
  doc.roundedRect(560, 130, 460, 540, 12, 12, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(RED[0], RED[1], RED[2]);
  doc.text("F-Grade FQHCs", 790, 180, { align: "center" });

  var fTraits = [
    "1-2 revenue streams only",
    "No pharmacy program",
    "PPS-only reimbursement",
    "No Glassdoor presence",
    "Recent WARN Act layoffs",
    "No quality designations",
    "Single site operation",
    "Legacy/unknown EHR",
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(20);
  yPos = 220;
  fTraits.forEach(function(t) {
    doc.setFillColor(RED[0], RED[1], RED[2]);
    doc.circle(595, yPos + 5, 6, "F");
    doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);
    doc.text(t, 615, yPos + 12);
    yPos += 38;
  });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.text("The gap? Revenue diversification + workforce investment.", PAGE_W / 2, 710, { align: "center" });

  drawFooter(doc, 4, total);

  // SLIDE 5: Data Behind the Score
  addPage(doc);
  drawBg(doc, TEAL);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("THE DATA BEHIND THE SCORE", PAGE_W / 2, 80, { align: "center" });

  var dataPoints = [
    { num: "214", label: "California FQHCs scored" },
    { num: "60", label: "With Glassdoor ratings (primary research)" },
    { num: "124", label: "With EHR systems identified" },
    { num: "100", label: "ECM providers tracked" },
    { num: "20", label: "Layoff events monitored (WARN Act)" },
    { num: "3,477+", label: "Displaced workers counted" },
    { num: "1,053", label: "Job listings aggregated" },
    { num: "9", label: "Regional markets analyzed" },
  ];

  yPos = 140;
  dataPoints.forEach(function(d, i) {
    var col = i % 2;
    var row = Math.floor(i / 2);
    var x = 60 + col * 500;
    var y = yPos + row * 150;

    doc.setFillColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
    doc.roundedRect(x, y, 470, 120, 10, 10, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(44);
    doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
    doc.text(d.num, x + 30, y + 55);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(20);
    doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
    doc.text(d.label, x + 30, y + 90);
  });

  doc.setFont("helvetica", "italic");
  doc.setFontSize(20);
  doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
  doc.text("Updated daily. Primary sources only.", PAGE_W / 2, PAGE_H - 110, { align: "center" });

  drawFooter(doc, 5, total);

  // SLIDE 6: What You Can Do With It
  addPage(doc);
  drawBg(doc, WHITE);

  doc.setFillColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.rect(0, 0, PAGE_W, 100, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(32);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("WHAT YOU CAN DO WITH THIS", PAGE_W / 2, 65, { align: "center" });

  var useCases = [
    { who: "CEO / CFO", action: "Benchmark your resilience score against regional competitors. Identify which revenue streams you're missing." },
    { who: "HR Director", action: "See which FQHCs near you are laying off. Recruit their displaced talent before they scatter." },
    { who: "Board Member", action: "Track organizational health across 5 dimensions. Hold leadership accountable to measurable resilience." },
    { who: "Policy Advocate", action: "Quantify the sector's vulnerability. Use data in testimony and grant applications." },
  ];

  yPos = 140;
  useCases.forEach(function(u) {
    doc.setFillColor(245, 245, 244);
    doc.roundedRect(60, yPos, 960, 130, 10, 10, "F");

    drawBadge(doc, u.who, 80, yPos + 15, 200, TEAL, WHITE);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(22);
    doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);
    wrapText(doc, u.action, 80, yPos + 75, 920, 28);

    yPos += 150;
  });

  drawFooter(doc, 6, total);

  // SLIDE 7: CTA
  addPage(doc);
  drawBg(doc, TEAL);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(44);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("214 FQHCs.", 120, 260);
  doc.text("5 dimensions.", 120, 320);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("One question:", 120, 380);
  doc.setFontSize(52);
  doc.text("Where do you stand?", 120, 460);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(24);
  doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
  doc.text("Search your organization. See your score. Plan your response.", 120, 530);

  doc.setFillColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.roundedRect(280, 590, 520, 70, 12, 12, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
  doc.text("fqhctalent.com/strategy/resilience", PAGE_W / 2, 635, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(20);
  doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
  doc.text("100% free. No login required.", PAGE_W / 2, 710, { align: "center" });

  drawFooter(doc, 7, total);
  return doc;
}

// ================================================================
// CAROUSEL 2: Top-of-License Revenue Unlock
// ================================================================
function createScopeCarousel() {
  var doc = createPDF();
  var total = 7;
  var yPos;

  // SLIDE 1: Hero
  drawBg(doc, TEAL);
  drawBadge(doc, "REVENUE STRATEGY", 350, 180, 380, AMBER, TEAL_DARK);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(52);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("Your Staff Can Do", 120, 310);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("More Than You Think", 120, 375);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(26);
  doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
  wrapText(doc, "Most FQHCs leave $300K-$600K/year on the table because staff aren't practicing at top of license. Here's exactly what California law allows.", 120, 440, 840, 36);

  doc.setFontSize(22);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("Swipe for the delegation matrix ->", PAGE_W / 2, 620, { align: "center" });

  drawFooter(doc, 1, total);

  // SLIDE 2: The Problem
  addPage(doc);
  drawBg(doc, WHITE);

  doc.setFillColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.rect(0, 0, PAGE_W, 100, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(32);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("THE TOP-OF-LICENSE PROBLEM", PAGE_W / 2, 65, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.text("What's happening at most FQHCs:", 80, 170);

  var problems = [
    { role: "MDs", issue: "Spending 40% of time on tasks RNs or MAs could do", cost: "= $120K/yr in lost productivity" },
    { role: "NPs", issue: "Not running independent panels despite CA law allowing it", cost: "= $80K/yr unrealized revenue" },
    { role: "RNs", issue: "Doing MA-level work instead of care coordination", cost: "= $50K/yr in misallocated salary" },
    { role: "CHWs", issue: "Not billing Medi-Cal despite 2024 benefit activation", cost: "= $65K/yr uncaptured revenue" },
    { role: "MAs", issue: "Not delegated standing orders per BPC 2069", cost: "= 8-12 encounters/day lost" },
  ];

  yPos = 220;
  problems.forEach(function(p) {
    doc.setFillColor(245, 245, 244);
    doc.roundedRect(60, yPos, 960, 90, 8, 8, "F");

    drawBadge(doc, p.role, 75, yPos + 25, 80, TEAL, WHITE);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(20);
    doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);
    doc.text(p.issue, 175, yPos + 38);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
    doc.text(p.cost, 175, yPos + 65);

    yPos += 105;
  });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(RED[0], RED[1], RED[2]);
  doc.text("Total: $300K-$600K/year left on the table", PAGE_W / 2, yPos + 20, { align: "center" });

  drawFooter(doc, 2, total);

  // SLIDE 3: Delegation Matrix Preview
  addPage(doc);
  drawBg(doc, TEAL);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(32);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("THE DELEGATION MATRIX", PAGE_W / 2, 70, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(18);
  doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
  doc.text("10 roles x 47 tasks - every CA Business & Professions Code citation included", PAGE_W / 2, 105, { align: "center" });

  // Mini matrix visualization
  var roles = ["MD", "NP", "PA", "RN", "LVN", "MA", "CHW", "LCSW", "RDH"];
  var tasks = [
    "Prescribe medications",
    "Order labs",
    "Diagnose conditions",
    "BH screening (PHQ-9)",
    "Patient education",
    "Vital signs",
    "Medication admin",
    "Care coordination",
    "Chronic disease mgmt",
    "Wound care",
  ];

  // Can-do matrix (simplified)
  var matrix = [
    [1,1,1,1,1,1,1,1,1,1], // MD
    [1,1,1,1,1,1,1,1,1,1], // NP
    [1,1,1,1,1,1,1,1,1,1], // PA
    [0,0,0,1,1,1,1,1,1,1], // RN
    [0,0,0,0,1,1,1,0,0,1], // LVN
    [0,0,0,0,1,1,0,0,0,0], // MA
    [0,0,0,1,1,0,0,1,0,0], // CHW
    [0,0,0,1,1,0,0,1,1,0], // LCSW
    [0,0,0,0,1,0,0,0,0,0], // RDH
  ];

  // Draw header row
  var startX = 240;
  var startY = 145;
  var cellW = 80;
  var cellH = 55;

  // Role labels (left column)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  roles.forEach(function(r, i) {
    doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
    doc.text(r, 190, startY + (i + 1) * cellH + 15, { align: "center" });
  });

  // Task labels (top row, rotated won't work in jsPDF easily - abbreviate)
  var taskAbbr = ["Rx", "Labs", "Dx", "BH", "Edu", "Vitals", "MedAd", "Coord", "CDM", "Wound"];
  doc.setFontSize(12);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  taskAbbr.forEach(function(t, i) {
    doc.text(t, startX + i * cellW + cellW / 2, startY + 15, { align: "center" });
  });

  // Draw cells
  matrix.forEach(function(row, ri) {
    row.forEach(function(val, ci) {
      var x = startX + ci * cellW;
      var y = startY + (ri + 1) * cellH;
      if (val === 1) {
        doc.setFillColor(GREEN[0], GREEN[1], GREEN[2]);
      } else {
        doc.setFillColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
      }
      doc.roundedRect(x + 2, y + 2, cellW - 4, cellH - 4, 4, 4, "F");
    });
  });

  doc.setFont("helvetica", "italic");
  doc.setFontSize(18);
  doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
  doc.text("Green = authorized under CA law. Full matrix at fqhctalent.com", PAGE_W / 2, PAGE_H - 120, { align: "center" });

  drawFooter(doc, 3, total);

  // SLIDE 4: NP Revenue Unlock
  addPage(doc);
  drawBg(doc, WHITE);

  doc.setFillColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.rect(0, 0, PAGE_W, 100, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(32);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("EXAMPLE: NP INDEPENDENT PANELS", PAGE_W / 2, 65, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.text("California AB 890: NPs can practice independently", 80, 160);

  // Revenue comparison
  doc.setFillColor(245, 245, 244);
  doc.roundedRect(60, 200, 460, 200, 12, 12, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);
  doc.text("NP (supervised model)", 290, 240, { align: "center" });
  doc.setFontSize(44);
  doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.text("12 visits/day", 290, 310, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(18);
  doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);
  doc.text("MD reviews 10% of charts", 290, 345, { align: "center" });
  doc.text("Salary: $165K", 290, 370, { align: "center" });

  doc.setFillColor(209, 250, 229);
  doc.roundedRect(560, 200, 460, 200, 12, 12, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);
  doc.text("NP (independent panel)", 790, 240, { align: "center" });
  doc.setFontSize(44);
  doc.setTextColor(GREEN[0], GREEN[1], GREEN[2]);
  doc.text("18 visits/day", 790, 310, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(18);
  doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);
  doc.text("No MD supervision required", 790, 345, { align: "center" });
  doc.text("Same $165K salary", 790, 370, { align: "center" });

  // Revenue math
  doc.setFillColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.roundedRect(60, 440, 960, 180, 12, 12, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("The math:", 80, 490);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(22);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("+6 visits/day x $225 PPS x 250 working days = $337,500/year", 80, 535);
  doc.text("Same NP salary. Same overhead. Pure margin.", 80, 570);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("Per NP. Multiply by your NP headcount.", 80, 600);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(16);
  doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.text("Source: CA AB 890 (effective Jan 2023), BPC 2837.103", 80, 660);

  drawFooter(doc, 4, total);

  // SLIDE 5: CHW Billing Unlock
  addPage(doc);
  drawBg(doc, TEAL);

  drawBadge(doc, "NEW IN 2024", 400, 60, 280, AMBER, TEAL_DARK);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(44);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("CHW Medi-Cal Billing", 80, 170);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(24);
  doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
  wrapText(doc, "Community Health Workers are now a billable Medi-Cal benefit. Most FQHCs haven't started billing yet.", 80, 220, 920, 32);

  var chwFacts = [
    { stat: "$65K", desc: "Capacity grant per CHW (available now)" },
    { stat: "+$10K", desc: "Bilingual incentive bonus" },
    { stat: "150%", desc: "Some plans pay above Medi-Cal fee schedule" },
    { stat: "3-6 mo", desc: "Implementation timeline (credentialing + contracting)" },
  ];

  yPos = 340;
  chwFacts.forEach(function(f) {
    doc.setFillColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
    doc.roundedRect(60, yPos, 960, 90, 10, 10, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(36);
    doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
    doc.text(f.stat, 100, yPos + 55);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(22);
    doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
    doc.text(f.desc, 300, yPos + 55);

    yPos += 105;
  });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("Your CHWs are already doing the work. Now you can bill for it.", 80, yPos + 20);

  drawFooter(doc, 5, total);

  // SLIDE 6: MA Standing Orders
  addPage(doc);
  drawBg(doc, WHITE);

  doc.setFillColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.rect(0, 0, PAGE_W, 100, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(32);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("MA STANDING ORDERS = MORE THROUGHPUT", PAGE_W / 2, 65, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(22);
  doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);
  wrapText(doc, "Under BPC 2069, Medical Assistants can perform technical supportive services with standing orders. Most FQHCs under-delegate.", 80, 150, 920, 30);

  var maTasks = [
    { task: "Administer vaccines per standing order", impact: "Frees 15 min of RN time per patient" },
    { task: "Point-of-care testing (A1C, rapid strep)", impact: "Results during visit = fewer callbacks" },
    { task: "EKGs and routine screenings", impact: "Provider walks in ready to diagnose" },
    { task: "Medication refill prep", impact: "Provider signs in seconds, not minutes" },
    { task: "Patient intake + HRA completion", impact: "Visit starts at decision-making, not data entry" },
  ];

  yPos = 260;
  maTasks.forEach(function(m) {
    doc.setFillColor(245, 245, 244);
    doc.roundedRect(60, yPos, 960, 90, 8, 8, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
    doc.text(m.task, 80, yPos + 30);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(18);
    doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);
    doc.text(m.impact, 80, yPos + 60);

    yPos += 105;
  });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.text("Net effect: +8-12 encounters/day per provider team", PAGE_W / 2, yPos + 20, { align: "center" });

  drawFooter(doc, 6, total);

  // SLIDE 7: CTA
  addPage(doc);
  drawBg(doc, TEAL);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(44);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("Every role.", 120, 240);
  doc.text("Every task.", 120, 300);
  doc.text("Every legal citation.", 120, 360);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.setFontSize(40);
  doc.text("One interactive matrix.", 120, 440);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(24);
  doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
  wrapText(doc, "10 CA FQHC roles, 47 delegation tasks, revenue impact per change, change management guidance. Free.", 120, 500, 840, 34);

  doc.setFillColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.roundedRect(200, 620, 680, 70, 12, 12, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
  doc.text("fqhctalent.com/strategy/scope-of-practice", PAGE_W / 2, 665, { align: "center" });

  drawFooter(doc, 7, total);
  return doc;
}

// ================================================================
// CAROUSEL 3: Platform Overview - "Everything We Track"
// ================================================================
function createPlatformCarousel() {
  var doc = createPDF();
  var total = 6;
  var yPos;

  // SLIDE 1: Hero
  drawBg(doc, TEAL);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(48);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("One Platform.", 120, 260);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("Every FQHC Signal", 120, 325);
  doc.text("in California.", 120, 390);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(26);
  doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
  wrapText(doc, "Jobs. Layoffs. Policy changes. AI adoption. Resilience scores. Revenue playbooks. Updated daily. 100% free.", 120, 460, 840, 36);

  doc.setFontSize(22);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("Here's what you get ->", PAGE_W / 2, 620, { align: "center" });

  drawFooter(doc, 1, total);

  // SLIDE 2: For FQHC Leaders
  addPage(doc);
  drawBg(doc, WHITE);

  doc.setFillColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.rect(0, 0, PAGE_W, 100, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(32);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("FOR FQHC LEADERS", PAGE_W / 2, 65, { align: "center" });

  var leaderTools = [
    { tool: "Resilience Scorecard", stat: "214 FQHCs scored", desc: "5-dimension resilience grade for every CA FQHC" },
    { tool: "Revenue Simulator", stat: "3 preset sizes", desc: "Model staffing, billing, and margin with real CA data" },
    { tool: "Scope-of-Practice Matrix", stat: "10 roles x 47 tasks", desc: "Delegation authority with BPC citations + revenue impact" },
    { tool: "AI Adoption Tracker", stat: "19 signals tracked", desc: "Which vendors, which FQHCs, what's working" },
    { tool: "Intelligence Dashboard", stat: "100+ items", desc: "Breaking policy, funding cliffs, workforce data - daily" },
    { tool: "OKR Templates", stat: "25 templates", desc: "Crisis change management frameworks with Excel export" },
  ];

  yPos = 130;
  leaderTools.forEach(function(t) {
    doc.setFillColor(245, 245, 244);
    doc.roundedRect(60, yPos, 960, 85, 8, 8, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
    doc.text(t.tool, 80, yPos + 30);

    drawBadge(doc, t.stat, 760, yPos + 10, 240, TEAL, WHITE);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);
    doc.text(t.desc, 80, yPos + 60);

    yPos += 98;
  });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.text("All free. No login required.", PAGE_W / 2, yPos + 15, { align: "center" });

  drawFooter(doc, 2, total);

  // SLIDE 3: For Job Seekers
  addPage(doc);
  drawBg(doc, TEAL);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("FOR FQHC JOB SEEKERS", PAGE_W / 2, 80, { align: "center" });

  var seekerTools = [
    { tool: "Job Listings", stat: "1,053+", desc: "Aggregated from 30+ FQHCs - salary, role, region, EHR, programs" },
    { tool: "Resume Builder", stat: "8 templates", desc: "FQHC-specific with role-tailored bullets + PDF export" },
    { tool: "Career Assessment", stat: "5 domains", desc: "15-question behavioral + role-specific scoring" },
    { tool: "Career Roadmap", stat: "5 tracks x 4 levels", desc: "CHW to Director with salary P25/P50/P75 per region" },
    { tool: "Salary Intelligence", stat: "30 roles x 9 regions", desc: "CA-specific salary benchmarks with regional adjustments" },
    { tool: "Certification Catalog", stat: "15 certifications", desc: "Cost, duration, salary impact, where to get in CA" },
  ];

  yPos = 130;
  seekerTools.forEach(function(t) {
    doc.setFillColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
    doc.roundedRect(60, yPos, 960, 85, 8, 8, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
    doc.text(t.tool, 80, yPos + 30);

    drawBadge(doc, t.stat, 760, yPos + 10, 240, AMBER, TEAL_DARK);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
    doc.text(t.desc, 80, yPos + 60);

    yPos += 98;
  });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("All free. Bilingual (EN/ES). No account needed.", PAGE_W / 2, yPos + 15, { align: "center" });

  drawFooter(doc, 3, total);

  // SLIDE 4: The Intelligence Engine
  addPage(doc);
  drawBg(doc, WHITE);

  doc.setFillColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.rect(0, 0, PAGE_W, 100, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(32);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("THE INTELLIGENCE ENGINE", PAGE_W / 2, 65, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(22);
  doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);
  wrapText(doc, "Every morning, we scan policy changes, WARN Act filings, job postings, AI adoption signals, and regional news across all 9 California FQHC markets.", 80, 150, 920, 30);

  var pipeline = [
    { step: "6:00 AM", action: "WARN Act check", detail: "CA EDD filing scan for healthcare layoffs" },
    { step: "6:15 AM", action: "Job scraping", detail: "4 live APIs + 20 career page configs" },
    { step: "6:30 AM", action: "Policy scan", detail: "DHCS, CMS, HRSA, NACHC, state budget" },
    { step: "6:45 AM", action: "Regional news", detail: "2 regions/day rotation (9 markets, 5-day cycle)" },
    { step: "7:00 AM", action: "AI tracker", detail: "Vendor launches, FQHC adoption signals" },
    { step: "7:15 AM", action: "Intel published", detail: "Dashboard updated, newsletter queued" },
  ];

  yPos = 270;
  pipeline.forEach(function(p, i) {
    // Timeline connector
    if (i > 0) {
      doc.setDrawColor(AMBER[0], AMBER[1], AMBER[2]);
      doc.setLineWidth(3);
      doc.line(140, yPos - 25, 140, yPos + 5);
    }

    // Time circle
    doc.setFillColor(AMBER[0], AMBER[1], AMBER[2]);
    doc.circle(140, yPos + 25, 18, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
    doc.text(p.step.replace(" AM", ""), 140, yPos + 28, { align: "center" });

    // Action
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
    doc.text(p.action, 180, yPos + 22);

    // Detail
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.setTextColor(STONE_700[0], STONE_700[1], STONE_700[2]);
    doc.text(p.detail, 180, yPos + 45);

    yPos += 75;
  });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.text("Primary sources only. Every claim verified.", PAGE_W / 2, yPos + 20, { align: "center" });

  drawFooter(doc, 4, total);

  // SLIDE 5: The Numbers
  addPage(doc);
  drawBg(doc, TEAL);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("BY THE NUMBERS", PAGE_W / 2, 70, { align: "center" });

  var numbers = [
    { num: "214", label: "FQHCs profiled" },
    { num: "1,053", label: "Job listings" },
    { num: "100+", label: "Intel items" },
    { num: "19", label: "AI signals tracked" },
    { num: "25", label: "OKR templates" },
    { num: "15", label: "Masterclass modules" },
    { num: "22", label: "Case studies" },
    { num: "9", label: "Regional dashboards" },
    { num: "30", label: "Salary benchmarks" },
    { num: "15", label: "Certifications mapped" },
    { num: "13", label: "Operational guides" },
    { num: "2", label: "Languages (EN/ES)" },
  ];

  numbers.forEach(function(n, i) {
    var col = i % 3;
    var row = Math.floor(i / 3);
    var x = 60 + col * 330;
    var y = 120 + row * 170;

    doc.setFillColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
    doc.roundedRect(x, y, 310, 140, 10, 10, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(48);
    doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
    doc.text(n.num, x + 155, y + 65, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(18);
    doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
    doc.text(n.label, x + 155, y + 100, { align: "center" });
  });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.text("All free. All sourced. All California-specific.", PAGE_W / 2, PAGE_H - 115, { align: "center" });

  drawFooter(doc, 5, total);

  // SLIDE 6: CTA
  addPage(doc);
  drawBg(doc, TEAL);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(48);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  wrapText(doc, "California's community", 120, 220, 840, 58);
  wrapText(doc, "health centers deserve", 120, 280, 840, 58);
  doc.setTextColor(AMBER[0], AMBER[1], AMBER[2]);
  wrapText(doc, "better intelligence.", 120, 340, 840, 58);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(26);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  wrapText(doc, "We built it. It's free. And it's updated every morning before your first patient walks in.", 120, 430, 840, 36);

  doc.setFillColor(AMBER[0], AMBER[1], AMBER[2]);
  doc.roundedRect(320, 570, 440, 70, 12, 12, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(32);
  doc.setTextColor(TEAL_DARK[0], TEAL_DARK[1], TEAL_DARK[2]);
  doc.text("fqhctalent.com", PAGE_W / 2, 615, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(22);
  doc.setTextColor(STONE_100[0], STONE_100[1], STONE_100[2]);
  doc.text("Strategy | Intelligence | Tools | Jobs | Directory", PAGE_W / 2, 700, { align: "center" });

  drawFooter(doc, 6, total);
  return doc;
}

// ========== GENERATE ==========
var outDir = path.join(__dirname, "..", "marketing", "linkedin");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

var carousels = [
  { name: "2026-03-13-resilience-scorecard-carousel", fn: createResilienceCarousel },
  { name: "2026-03-13-scope-of-practice-revenue-carousel", fn: createScopeCarousel },
  { name: "2026-03-13-platform-overview-carousel", fn: createPlatformCarousel },
];

carousels.forEach(function(c) {
  var doc = c.fn();
  var buffer = Buffer.from(doc.output("arraybuffer"));
  var outPath = path.join(outDir, c.name + ".pdf");
  fs.writeFileSync(outPath, buffer);
  console.log("OK: " + c.name + ".pdf (" + (buffer.length / 1024).toFixed(0) + "KB, " + (doc.internal.pages.length - 1) + " slides)");
});

console.log("\nDone! 3 showcase carousel PDFs created.");
