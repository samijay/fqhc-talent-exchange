/**
 * LinkedIn Carousel PDFs - Batch 4: Data-Driven Value Carousels
 *
 * 1. "CA FQHC Salary Intelligence" - 30 roles x 9 regions, what the data shows
 * 2. "FQHC Career Ladder" - From MA to CNO, actual pathways with salary jumps
 * 3. "The FQHC AI Landscape 2026" - Who's adopting what, maturity tiers, ROI data
 */

const { jsPDF } = require("jspdf");
const fs = require("fs");
const path = require("path");

const W = 1080, H = 1080;
const TEAL_DARK = [15, 118, 110];
const TEAL = [13, 148, 136];
const AMBER = [245, 158, 11];
const WHITE = [255, 255, 255];
const STONE_100 = [245, 245, 244];
const STONE_200 = [231, 229, 228];
const STONE_700 = [68, 64, 60];
const STONE_800 = [41, 37, 36];

const DIR = path.join(__dirname, "..", "marketing", "linkedin");
if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });

function newDoc() {
  return new jsPDF({ unit: "pt", format: [W, H] });
}

function bg(doc, color) {
  doc.setFillColor(color[0], color[1], color[2]);
  doc.rect(0, 0, W, H, "F");
}

function text(doc, str, x, y, size, color, opts = {}) {
  doc.setFontSize(size);
  doc.setTextColor(color[0], color[1], color[2]);
  if (opts.bold) doc.setFont("helvetica", "bold");
  else doc.setFont("helvetica", "normal");
  if (opts.maxWidth) {
    doc.text(str, x, y, { maxWidth: opts.maxWidth, lineHeightFactor: opts.lineHeight || 1.3 });
  } else {
    doc.text(str, x, y);
  }
}

function roundedRect(doc, x, y, w, h, r, color) {
  doc.setFillColor(color[0], color[1], color[2]);
  // Simple rounded rect approximation
  doc.roundedRect(x, y, w, h, r, r, "F");
}

function pill(doc, str, x, y, bgColor, textColor, size = 20) {
  doc.setFontSize(size);
  const tw = doc.getTextWidth(str);
  const pw = tw + 30;
  const ph = size + 16;
  roundedRect(doc, x, y, pw, ph, ph / 2, bgColor);
  text(doc, str, x + 15, y + size + 4, size, textColor, { bold: true });
  return pw;
}

function divider(doc, x, y, w, color) {
  doc.setDrawColor(color[0], color[1], color[2]);
  doc.setLineWidth(2);
  doc.line(x, y, x + w, y);
}

function footer(doc, slideNum, total) {
  text(doc, "fqhctalent.com", 60, H - 45, 18, STONE_200);
  text(doc, `${slideNum}/${total}`, W - 100, H - 45, 18, STONE_200);
}

// ========================================
// CAROUSEL 1: CA FQHC Salary Intelligence
// ========================================
function createSalaryCarousel() {
  const doc = newDoc();
  const TOTAL = 8;

  // Slide 1: Title
  bg(doc, TEAL_DARK);
  pill(doc, "SALARY DATA", 60, 80, AMBER, STONE_800, 22);
  text(doc, "California FQHC\nSalary Intelligence", 60, 240, 72, WHITE, { bold: true, maxWidth: 960 });
  text(doc, "30 Roles. 9 Regions.\nReal Compensation Data.", 60, 440, 40, STONE_200, { maxWidth: 960 });
  divider(doc, 60, 560, 960, AMBER);
  text(doc, "What your competitors are paying -\nand what candidates actually expect.", 60, 620, 32, STONE_200, { maxWidth: 900 });

  // Amber accent bar at bottom
  roundedRect(doc, 0, H - 120, W, 120, 0, AMBER);
  text(doc, "Based on 1,000+ job listings + BLS + HRSA data", 60, H - 60, 24, STONE_800, { bold: true });
  footer(doc, 1, TOTAL);

  // Slide 2: The Salary Landscape
  doc.addPage([W, H]);
  bg(doc, WHITE);
  pill(doc, "THE LANDSCAPE", 60, 60, TEAL_DARK, WHITE, 20);
  text(doc, "CA FQHC Salary Ranges 2026", 60, 160, 48, TEAL_DARK, { bold: true });

  const roles = [
    { role: "Physician (MD/DO)", low: "$230K", mid: "$270K", high: "$310K", bar: 95 },
    { role: "Psychiatrist", low: "$250K", mid: "$290K", high: "$340K", bar: 100 },
    { role: "Dentist", low: "$145K", mid: "$170K", high: "$200K", bar: 62 },
    { role: "Nurse Practitioner", low: "$135K", mid: "$165K", high: "$195K", bar: 57 },
    { role: "Physician Assistant", low: "$125K", mid: "$148K", high: "$175K", bar: 52 },
    { role: "RN", low: "$95K", mid: "$120K", high: "$145K", bar: 42 },
    { role: "LCSW", low: "$75K", mid: "$95K", high: "$115K", bar: 35 },
    { role: "Medical Assistant", low: "$45K", mid: "$52K", high: "$62K", bar: 20 },
    { role: "CHW", low: "$42K", mid: "$50K", high: "$58K", bar: 18 },
  ];

  let yPos = 220;
  roles.forEach((r) => {
    text(doc, r.role, 60, yPos, 22, STONE_800, { bold: true });
    // Bar
    const barW = r.bar * 6;
    roundedRect(doc, 380, yPos - 18, barW, 24, 4, TEAL);
    // Range text
    text(doc, `${r.low} - ${r.high}`, 380 + barW + 15, yPos, 20, STONE_700);
    yPos += 65;
    if (yPos < H - 200) {
      doc.setDrawColor(230, 230, 230);
      doc.setLineWidth(0.5);
      doc.line(60, yPos - 30, W - 60, yPos - 30);
    }
  });

  text(doc, "* P25 to P75 ranges, CA-adjusted", 60, H - 80, 18, STONE_700);
  footer(doc, 2, TOTAL);

  // Slide 3: Regional Multipliers
  doc.addPage([W, H]);
  bg(doc, WHITE);
  pill(doc, "REGIONAL DATA", 60, 60, TEAL_DARK, WHITE, 20);
  text(doc, "Same Role, Different Pay", 60, 160, 48, TEAL_DARK, { bold: true });
  text(doc, "NP salary by CA region (P50)", 60, 220, 28, STONE_700);

  const regions = [
    { name: "Bay Area", salary: "$182K", mult: "1.10x", bar: 100 },
    { name: "Los Angeles", salary: "$172K", mult: "1.04x", bar: 94 },
    { name: "San Diego", salary: "$168K", mult: "1.02x", bar: 92 },
    { name: "Sacramento", salary: "$165K", mult: "1.00x", bar: 90 },
    { name: "Central Coast", salary: "$162K", mult: "0.98x", bar: 89 },
    { name: "Inland Empire", salary: "$158K", mult: "0.96x", bar: 87 },
    { name: "Central Valley", salary: "$152K", mult: "0.92x", bar: 83 },
    { name: "North State", salary: "$148K", mult: "0.90x", bar: 81 },
    { name: "North Coast", salary: "$145K", mult: "0.88x", bar: 79 },
  ];

  yPos = 280;
  regions.forEach((r) => {
    text(doc, r.name, 60, yPos, 24, STONE_800, { bold: true });
    const barW = r.bar * 5.5;
    roundedRect(doc, 320, yPos - 18, barW, 26, 4, TEAL);
    text(doc, r.salary, 320 + barW + 15, yPos, 22, TEAL_DARK, { bold: true });
    text(doc, r.mult, 320 + barW + 115, yPos, 20, STONE_700);
    yPos += 62;
  });

  text(doc, "Bay Area NPs earn 25% more than North Coast", 60, H - 80, 22, AMBER, { bold: true });
  footer(doc, 3, TOTAL);

  // Slide 4: What Candidates Actually Want
  doc.addPage([W, H]);
  bg(doc, TEAL_DARK);
  pill(doc, "BEYOND SALARY", 60, 60, AMBER, STONE_800, 20);
  text(doc, "What Candidates\nActually Want", 60, 180, 56, WHITE, { bold: true, maxWidth: 960 });

  const wants = [
    { pct: "78%", item: "Loan repayment (NHSC)", detail: "Up to $75K in 2 years" },
    { pct: "72%", item: "Schedule flexibility", detail: "4x10 or compressed weeks" },
    { pct: "65%", item: "Mission alignment", detail: "Serving their own community" },
    { pct: "61%", item: "Career advancement path", detail: "Clear promotion timeline" },
    { pct: "58%", item: "CME / training budget", detail: "$2-5K annual allocation" },
    { pct: "52%", item: "Bilingual differential", detail: "$2-5K/yr premium" },
  ];

  yPos = 380;
  wants.forEach((w) => {
    text(doc, w.pct, 60, yPos, 36, AMBER, { bold: true });
    text(doc, w.item, 180, yPos - 8, 28, WHITE, { bold: true });
    text(doc, w.detail, 180, yPos + 24, 22, STONE_200);
    yPos += 90;
  });

  footer(doc, 4, TOTAL);

  // Slide 5: NHSC Loan Repayment Impact
  doc.addPage([W, H]);
  bg(doc, WHITE);
  pill(doc, "TOTAL COMP", 60, 60, TEAL_DARK, WHITE, 20);
  text(doc, "The NHSC Advantage", 60, 160, 48, TEAL_DARK, { bold: true });
  text(doc, "Loan repayment transforms FQHC compensation", 60, 220, 26, STONE_700);

  // Comparison boxes
  const compY = 300;
  // Without NHSC
  roundedRect(doc, 60, compY, 450, 280, 12, STONE_100);
  text(doc, "Private Practice NP", 80, compY + 45, 26, STONE_800, { bold: true });
  text(doc, "$185,000 salary", 80, compY + 90, 32, STONE_800, { bold: true });
  text(doc, "No loan repayment", 80, compY + 130, 22, STONE_700);
  text(doc, "No mission premium", 80, compY + 160, 22, STONE_700);
  text(doc, "Standard benefits", 80, compY + 190, 22, STONE_700);
  text(doc, "2-yr value: ~$370K", 80, compY + 240, 28, STONE_700, { bold: true });

  // With NHSC
  roundedRect(doc, 560, compY, 460, 280, 12, TEAL_DARK);
  text(doc, "FQHC NP + NHSC", 580, compY + 45, 26, WHITE, { bold: true });
  text(doc, "$165,000 salary", 580, compY + 90, 32, WHITE, { bold: true });
  text(doc, "+ $75,000 loan repayment", 580, compY + 130, 22, AMBER, { bold: true });
  text(doc, "+ Bilingual differential", 580, compY + 160, 22, STONE_200);
  text(doc, "+ Public service credit", 580, compY + 190, 22, STONE_200);
  text(doc, "2-yr value: ~$405K+", 580, compY + 240, 28, AMBER, { bold: true });

  // Arrow
  text(doc, "FQHC total comp can exceed private practice", 60, compY + 340, 28, TEAL_DARK, { bold: true });
  text(doc, "when you factor in NHSC, PSLF, and mission.", 60, compY + 380, 24, STONE_700);

  footer(doc, 5, TOTAL);

  // Slide 6: SB 525 Impact
  doc.addPage([W, H]);
  bg(doc, WHITE);
  pill(doc, "MINIMUM WAGE", 60, 60, AMBER, STONE_800, 20);
  text(doc, "SB 525: The New Floor", 60, 160, 48, TEAL_DARK, { bold: true });
  text(doc, "CA healthcare minimum wage timeline for FQHCs", 60, 220, 26, STONE_700);

  const timeline = [
    { year: "2024", wage: "$18/hr", note: "Pre-SB 525 FQHC floor" },
    { year: "2025", wage: "$21/hr", note: "Phase 1 increase" },
    { year: "2026", wage: "$23/hr", note: "Current requirement" },
    { year: "2027", wage: "$25/hr", note: "Full implementation" },
  ];

  yPos = 310;
  timeline.forEach((t, i) => {
    const isLast = i === timeline.length - 1;
    // Circle
    doc.setFillColor(isLast ? AMBER[0] : TEAL[0], isLast ? AMBER[1] : TEAL[1], isLast ? AMBER[2] : TEAL[2]);
    doc.circle(120, yPos - 5, 18, "F");
    text(doc, t.year, 95, yPos + 5, 18, WHITE, { bold: true });
    // Line
    if (i < timeline.length - 1) {
      doc.setDrawColor(TEAL[0], TEAL[1], TEAL[2]);
      doc.setLineWidth(3);
      doc.line(120, yPos + 15, 120, yPos + 120);
    }
    text(doc, t.wage, 180, yPos, 36, isLast ? AMBER : TEAL_DARK, { bold: true });
    text(doc, t.note, 350, yPos, 24, STONE_700);
    yPos += 120;
  });

  // Impact box
  roundedRect(doc, 60, yPos + 20, 960, 120, 12, TEAL_DARK);
  text(doc, "Impact: MAs, front desk, and environmental services", 80, yPos + 60, 24, WHITE);
  text(doc, "see 15-38% wage increases. Budget accordingly.", 80, yPos + 95, 24, AMBER, { bold: true });

  footer(doc, 6, TOTAL);

  // Slide 7: Hiring Speed Data
  doc.addPage([W, H]);
  bg(doc, TEAL_DARK);
  pill(doc, "HIRING SPEED", 60, 60, AMBER, STONE_800, 20);
  text(doc, "The Cost of\nSlow Hiring", 60, 180, 56, WHITE, { bold: true, maxWidth: 960 });

  const costs = [
    { role: "Physician vacancy", cost: "$7,500/day", detail: "Lost revenue from unfilled panel" },
    { role: "NP vacancy", cost: "$3,200/day", detail: "18-20 patients/day not seen" },
    { role: "Dentist vacancy", cost: "$2,800/day", detail: "Denti-Cal visits deferred" },
    { role: "RN vacancy", cost: "$1,500/day", detail: "Care coordination gaps" },
    { role: "MA vacancy", cost: "$800/day", detail: "Provider workflow slows 30%" },
  ];

  yPos = 380;
  costs.forEach((c) => {
    text(doc, c.cost, 60, yPos, 36, AMBER, { bold: true });
    text(doc, c.role, 300, yPos - 8, 28, WHITE, { bold: true });
    text(doc, c.detail, 300, yPos + 24, 22, STONE_200);
    yPos += 90;
  });

  text(doc, "A 90-day physician vacancy = $675K in lost revenue.", 60, H - 120, 26, AMBER, { bold: true });
  footer(doc, 7, TOTAL);

  // Slide 8: CTA
  doc.addPage([W, H]);
  bg(doc, TEAL_DARK);
  text(doc, "Get the Full\nSalary Report", 60, 200, 72, WHITE, { bold: true, maxWidth: 960 });
  divider(doc, 60, 400, 400, AMBER);
  text(doc, "30 roles across 9 CA regions", 60, 470, 32, STONE_200);
  text(doc, "P25 / P50 / P75 benchmarks", 60, 520, 32, STONE_200);
  text(doc, "Regional cost-of-living adjustments", 60, 570, 32, STONE_200);
  text(doc, "Career progression salary jumps", 60, 620, 32, STONE_200);

  roundedRect(doc, 60, 720, 500, 80, 12, AMBER);
  text(doc, "fqhctalent.com/salary-data", 90, 772, 32, STONE_800, { bold: true });

  text(doc, "Free. No login required.", 60, 860, 28, STONE_200);
  footer(doc, 8, TOTAL);

  const outPath = path.join(DIR, "2026-03-13-salary-intelligence-carousel.pdf");
  fs.writeFileSync(outPath, Buffer.from(doc.output("arraybuffer")));
  console.log(`OK: ${path.basename(outPath)} (${Math.round(fs.statSync(outPath).size / 1024)}KB, ${TOTAL} slides)`);
}

// ========================================
// CAROUSEL 2: FQHC Career Ladder
// ========================================
function createCareerLadderCarousel() {
  const doc = newDoc();
  const TOTAL = 7;

  // Slide 1: Title
  bg(doc, TEAL_DARK);
  pill(doc, "CAREER PATHS", 60, 80, AMBER, STONE_800, 22);
  text(doc, "The FQHC\nCareer Ladder", 60, 240, 72, WHITE, { bold: true, maxWidth: 960 });
  text(doc, "From Medical Assistant\nto Chief Nursing Officer.", 60, 440, 40, STONE_200, { maxWidth: 960 });
  divider(doc, 60, 560, 960, AMBER);
  text(doc, "Real pathways. Real salary jumps.\nReal people who've done it.", 60, 620, 32, STONE_200, { maxWidth: 900 });

  roundedRect(doc, 0, H - 120, W, 120, 0, AMBER);
  text(doc, "5 career tracks mapped with CA salary data", 60, H - 60, 24, STONE_800, { bold: true });
  footer(doc, 1, TOTAL);

  // Slide 2: Community Health Track
  doc.addPage([W, H]);
  bg(doc, WHITE);
  pill(doc, "TRACK 1", 60, 60, TEAL_DARK, WHITE, 20);
  text(doc, "Community Health Track", 60, 160, 48, TEAL_DARK, { bold: true });

  const chSteps = [
    { level: "Entry", role: "Community Health Worker", salary: "$42-58K", cert: "CHW Certificate", color: TEAL },
    { level: "Mid", role: "Lead CHW / Health Educator", salary: "$52-72K", cert: "CHES Certification", color: TEAL },
    { level: "Senior", role: "ECM Lead / Program Coord", salary: "$65-90K", cert: "MCHES or MPH", color: TEAL_DARK },
    { level: "Director", role: "Dir of Community Programs", salary: "$85-120K", cert: "MPH + 5yr exp", color: TEAL_DARK },
  ];

  yPos = 250;
  chSteps.forEach((s, i) => {
    // Level badge
    roundedRect(doc, 60, yPos, 100, 36, 6, s.color);
    text(doc, s.level, 75, yPos + 25, 18, WHITE, { bold: true });
    // Role + salary
    text(doc, s.role, 190, yPos + 10, 28, STONE_800, { bold: true });
    text(doc, s.salary, 190, yPos + 45, 24, TEAL_DARK, { bold: true });
    text(doc, s.cert, 190, yPos + 75, 20, STONE_700);
    // Arrow
    if (i < chSteps.length - 1) {
      text(doc, "+$10-18K", 850, yPos + 40, 22, AMBER, { bold: true });
      doc.setDrawColor(AMBER[0], AMBER[1], AMBER[2]);
      doc.setLineWidth(3);
      doc.line(100, yPos + 95, 100, yPos + 135);
    }
    yPos += 155;
  });

  text(doc, "Total jump: Entry to Director = 2x salary", 60, H - 80, 24, AMBER, { bold: true });
  footer(doc, 2, TOTAL);

  // Slide 3: Clinical Operations Track
  doc.addPage([W, H]);
  bg(doc, WHITE);
  pill(doc, "TRACK 2", 60, 60, TEAL_DARK, WHITE, 20);
  text(doc, "Clinical Operations Track", 60, 160, 48, TEAL_DARK, { bold: true });

  const clinSteps = [
    { level: "Entry", role: "Medical Assistant", salary: "$45-62K", cert: "CCMA / RMA", color: TEAL },
    { level: "Mid", role: "Lead MA / Clinic Supervisor", salary: "$55-75K", cert: "CMAA + Leadership", color: TEAL },
    { level: "Senior", role: "Practice Manager", salary: "$72-100K", cert: "CMPE or MBA", color: TEAL_DARK },
    { level: "Director", role: "VP Clinical Operations", salary: "$110-160K", cert: "MHA + FACHE", color: TEAL_DARK },
  ];

  yPos = 250;
  clinSteps.forEach((s, i) => {
    roundedRect(doc, 60, yPos, 100, 36, 6, s.color);
    text(doc, s.level, 75, yPos + 25, 18, WHITE, { bold: true });
    text(doc, s.role, 190, yPos + 10, 28, STONE_800, { bold: true });
    text(doc, s.salary, 190, yPos + 45, 24, TEAL_DARK, { bold: true });
    text(doc, s.cert, 190, yPos + 75, 20, STONE_700);
    if (i < clinSteps.length - 1) {
      text(doc, "+$15-30K", 850, yPos + 40, 22, AMBER, { bold: true });
      doc.setDrawColor(AMBER[0], AMBER[1], AMBER[2]);
      doc.setLineWidth(3);
      doc.line(100, yPos + 95, 100, yPos + 135);
    }
    yPos += 155;
  });

  text(doc, "Total jump: MA to VP = 3x salary", 60, H - 80, 24, AMBER, { bold: true });
  footer(doc, 3, TOTAL);

  // Slide 4: Nursing Track
  doc.addPage([W, H]);
  bg(doc, WHITE);
  pill(doc, "TRACK 3", 60, 60, TEAL_DARK, WHITE, 20);
  text(doc, "Nursing Track", 60, 160, 48, TEAL_DARK, { bold: true });

  const nurseSteps = [
    { level: "Entry", role: "LVN", salary: "$55-72K", cert: "LVN License", color: TEAL },
    { level: "Mid", role: "Registered Nurse", salary: "$95-145K", cert: "BSN", color: TEAL },
    { level: "Senior", role: "Nurse Practitioner", salary: "$135-195K", cert: "MSN + NP cert", color: TEAL_DARK },
    { level: "Exec", role: "Chief Nursing Officer", salary: "$160-220K", cert: "DNP + 10yr exp", color: TEAL_DARK },
  ];

  yPos = 250;
  nurseSteps.forEach((s, i) => {
    roundedRect(doc, 60, yPos, 100, 36, 6, s.color);
    text(doc, s.level, 75, yPos + 25, 18, WHITE, { bold: true });
    text(doc, s.role, 190, yPos + 10, 28, STONE_800, { bold: true });
    text(doc, s.salary, 190, yPos + 45, 24, TEAL_DARK, { bold: true });
    text(doc, s.cert, 190, yPos + 75, 20, STONE_700);
    if (i < nurseSteps.length - 1) {
      const jumps = ["+$30-40K", "+$40-50K", "+$25K+"];
      text(doc, jumps[i], 850, yPos + 40, 22, AMBER, { bold: true });
      doc.setDrawColor(AMBER[0], AMBER[1], AMBER[2]);
      doc.setLineWidth(3);
      doc.line(100, yPos + 95, 100, yPos + 135);
    }
    yPos += 155;
  });

  text(doc, "Total jump: LVN to CNO = 3-4x salary", 60, H - 80, 24, AMBER, { bold: true });
  footer(doc, 4, TOTAL);

  // Slide 5: Revenue & Admin Track
  doc.addPage([W, H]);
  bg(doc, WHITE);
  pill(doc, "TRACK 4", 60, 60, TEAL_DARK, WHITE, 20);
  text(doc, "Revenue & Admin Track", 60, 160, 48, TEAL_DARK, { bold: true });

  const revSteps = [
    { level: "Entry", role: "Front Desk / Patient Svcs", salary: "$40-52K", cert: "Bilingual preferred" },
    { level: "Mid", role: "Billing Specialist / Coder", salary: "$52-72K", cert: "CPC / CCS" },
    { level: "Senior", role: "Rev Cycle Manager", salary: "$75-105K", cert: "CRCR + 5yr exp" },
    { level: "Director", role: "CFO / VP Finance", salary: "$130-200K", cert: "CPA / MHA" },
  ];

  yPos = 250;
  revSteps.forEach((s, i) => {
    roundedRect(doc, 60, yPos, 100, 36, 6, i < 2 ? TEAL : TEAL_DARK);
    text(doc, s.level, 75, yPos + 25, 18, WHITE, { bold: true });
    text(doc, s.role, 190, yPos + 10, 28, STONE_800, { bold: true });
    text(doc, s.salary, 190, yPos + 45, 24, TEAL_DARK, { bold: true });
    text(doc, s.cert, 190, yPos + 75, 20, STONE_700);
    if (i < revSteps.length - 1) {
      const jumps = ["+$12-20K", "+$23-33K", "+$55-95K"];
      text(doc, jumps[i], 850, yPos + 40, 22, AMBER, { bold: true });
      doc.setDrawColor(AMBER[0], AMBER[1], AMBER[2]);
      doc.setLineWidth(3);
      doc.line(100, yPos + 95, 100, yPos + 135);
    }
    yPos += 155;
  });

  text(doc, "Total jump: Front Desk to CFO = 4-5x salary", 60, H - 80, 24, AMBER, { bold: true });
  footer(doc, 5, TOTAL);

  // Slide 6: The Secret Sauce
  doc.addPage([W, H]);
  bg(doc, TEAL_DARK);
  pill(doc, "PRO TIPS", 60, 60, AMBER, STONE_800, 20);
  text(doc, "How to Climb\nFaster in FQHCs", 60, 180, 56, WHITE, { bold: true, maxWidth: 960 });

  const tips = [
    { num: "1", tip: "Get bilingual certification", detail: "$2-5K/yr differential + priority hiring" },
    { num: "2", tip: "Use NHSC loan repayment", detail: "$75K in 2 years frees up career capital" },
    { num: "3", tip: "Learn EHR workflows deeply", detail: "Epic/eClinicalWorks skills transfer everywhere" },
    { num: "4", tip: "Lead a CalAIM program", detail: "ECM/CS experience = instant leadership cred" },
    { num: "5", tip: "Cross-train across departments", detail: "FQHCs reward versatility more than hospitals" },
  ];

  yPos = 400;
  tips.forEach((t) => {
    roundedRect(doc, 60, yPos - 25, 50, 50, 8, AMBER);
    text(doc, t.num, 75, yPos + 10, 28, STONE_800, { bold: true });
    text(doc, t.tip, 140, yPos - 5, 28, WHITE, { bold: true });
    text(doc, t.detail, 140, yPos + 30, 22, STONE_200);
    yPos += 90;
  });

  footer(doc, 6, TOTAL);

  // Slide 7: CTA
  doc.addPage([W, H]);
  bg(doc, TEAL_DARK);
  text(doc, "Map Your\nCareer Path", 60, 200, 72, WHITE, { bold: true, maxWidth: 960 });
  divider(doc, 60, 400, 400, AMBER);
  text(doc, "5 career tracks with CA salary data", 60, 470, 32, STONE_200);
  text(doc, "Certifications mapped to each level", 60, 520, 32, STONE_200);
  text(doc, "Regional salary adjustments", 60, 570, 32, STONE_200);
  text(doc, "Free career assessment tool", 60, 620, 32, STONE_200);

  roundedRect(doc, 60, 720, 540, 80, 12, AMBER);
  text(doc, "fqhctalent.com/career-roadmap", 90, 772, 32, STONE_800, { bold: true });

  text(doc, "Free. No login required.", 60, 860, 28, STONE_200);
  footer(doc, 7, TOTAL);

  const outPath = path.join(DIR, "2026-03-13-career-ladder-carousel.pdf");
  fs.writeFileSync(outPath, Buffer.from(doc.output("arraybuffer")));
  console.log(`OK: ${path.basename(outPath)} (${Math.round(fs.statSync(outPath).size / 1024)}KB, ${TOTAL} slides)`);
}

// ========================================
// CAROUSEL 3: FQHC AI Landscape 2026
// ========================================
function createAILandscapeCarousel() {
  const doc = newDoc();
  const TOTAL = 7;

  // Slide 1: Title
  bg(doc, TEAL_DARK);
  pill(doc, "AI TRACKER", 60, 80, AMBER, STONE_800, 22);
  text(doc, "The FQHC AI\nLandscape 2026", 60, 240, 72, WHITE, { bold: true, maxWidth: 960 });
  text(doc, "Who's adopting what.\nWhat's working. What's hype.", 60, 440, 40, STONE_200, { maxWidth: 960 });
  divider(doc, 60, 560, 960, AMBER);
  text(doc, "We track 19 AI implementations\nacross California FQHCs.", 60, 620, 32, STONE_200, { maxWidth: 900 });

  roundedRect(doc, 0, H - 120, W, 120, 0, AMBER);
  text(doc, "Updated weekly from NACHC, HIMSS, and primary sources", 60, H - 60, 24, STONE_800, { bold: true });
  footer(doc, 1, TOTAL);

  // Slide 2: AI Adoption by Category
  doc.addPage([W, H]);
  bg(doc, WHITE);
  pill(doc, "CATEGORIES", 60, 60, TEAL_DARK, WHITE, 20);
  text(doc, "Where FQHCs Are Using AI", 60, 160, 48, TEAL_DARK, { bold: true });

  const categories = [
    { cat: "Ambient Documentation", count: "6 products", stage: "Early Majority", bar: 85, detail: "Abridge, Sunoh, Nabla, Suki, DAX, Epic" },
    { cat: "Revenue Cycle / Coding", count: "4 products", stage: "Early Adopters", bar: 55, detail: "RapidClaims, Athena, coding assist" },
    { cat: "Clinical Decision Support", count: "3 products", stage: "Innovators", bar: 35, detail: "eClinicalWorks, Elation, Epic" },
    { cat: "Patient Communication", count: "3 products", stage: "Early Adopters", bar: 50, detail: "Chatbots, scheduling, outreach" },
    { cat: "Population Health", count: "2 products", stage: "Innovators", bar: 25, detail: "Risk stratification, panel mgmt" },
    { cat: "Admin / Operations", count: "1 product", stage: "Innovators", bar: 15, detail: "No Barrier AI (interpretation)" },
  ];

  yPos = 240;
  categories.forEach((c) => {
    text(doc, c.cat, 60, yPos, 24, STONE_800, { bold: true });
    text(doc, c.count, 60, yPos + 30, 20, TEAL_DARK, { bold: true });
    // Bar
    const barW = c.bar * 4.5;
    roundedRect(doc, 400, yPos - 10, barW, 22, 4, TEAL);
    text(doc, c.stage, 400 + barW + 15, yPos + 5, 18, STONE_700);
    text(doc, c.detail, 400, yPos + 30, 16, STONE_700);
    yPos += 100;
    if (yPos < H - 200) {
      doc.setDrawColor(230, 230, 230);
      doc.setLineWidth(0.5);
      doc.line(60, yPos - 30, W - 60, yPos - 30);
    }
  });

  footer(doc, 2, TOTAL);

  // Slide 3: Ambient AI Deep Dive
  doc.addPage([W, H]);
  bg(doc, WHITE);
  pill(doc, "DEEP DIVE", 60, 60, TEAL_DARK, WHITE, 20);
  text(doc, "Ambient AI: The Clear Winner", 60, 160, 48, TEAL_DARK, { bold: true });
  text(doc, "6 vendors competing for FQHC exam rooms", 60, 220, 26, STONE_700);

  const vendors = [
    { name: "Abridge", ehr: "Epic, eCW", fqhcs: "AltaMed, Sun River", price: "$$$", fit: "HIGH" },
    { name: "Sunoh.ai", ehr: "eCW, athena", fqhcs: "Sun River (500+ provs)", price: "$$", fit: "HIGH" },
    { name: "Nabla", ehr: "Any (standalone)", fqhcs: "Neighborhood HC", price: "$$", fit: "MED" },
    { name: "Suki", ehr: "Epic, eCW, athena", fqhcs: "Multiple CHCs", price: "$$$", fit: "MED" },
    { name: "DAX Copilot", ehr: "Epic (native)", fqhcs: "Large health systems", price: "$$$$", fit: "LOW" },
    { name: "athenaOne", ehr: "athena (native)", fqhcs: "athena clients", price: "Free*", fit: "HIGH" },
  ];

  yPos = 290;
  // Header
  text(doc, "Vendor", 60, yPos, 18, STONE_700, { bold: true });
  text(doc, "EHR Compat", 280, yPos, 18, STONE_700, { bold: true });
  text(doc, "FQHC Customers", 500, yPos, 18, STONE_700, { bold: true });
  text(doc, "Cost", 760, yPos, 18, STONE_700, { bold: true });
  text(doc, "Fit", 880, yPos, 18, STONE_700, { bold: true });
  yPos += 15;
  divider(doc, 60, yPos, 900, STONE_200);
  yPos += 30;

  vendors.forEach((v) => {
    text(doc, v.name, 60, yPos, 22, STONE_800, { bold: true });
    text(doc, v.ehr, 280, yPos, 18, STONE_700);
    text(doc, v.fqhcs, 500, yPos, 18, STONE_700);
    text(doc, v.price, 760, yPos, 20, STONE_700);
    const fitColor = v.fit === "HIGH" ? TEAL : v.fit === "MED" ? AMBER : STONE_700;
    pill(doc, v.fit, 860, yPos - 22, fitColor, WHITE, 16);
    yPos += 70;
  });

  text(doc, "* athenaOne ambient AI included free for athena clients", 60, H - 80, 18, STONE_700);
  footer(doc, 3, TOTAL);

  // Slide 4: ROI Data
  doc.addPage([W, H]);
  bg(doc, TEAL_DARK);
  pill(doc, "THE DATA", 60, 60, AMBER, STONE_800, 20);
  text(doc, "What AI Actually\nDelivers", 60, 180, 56, WHITE, { bold: true, maxWidth: 960 });

  const metrics = [
    { stat: "51.9% -> 38.8%", label: "Burnout reduction", source: "Abridge / Best in KLAS 2026" },
    { stat: "7,000 visits/mo", label: "AI-documented visits", source: "Sun River Health + Sunoh.ai" },
    { stat: "2-3 hrs/day", label: "Documentation time saved", source: "Industry average" },
    { stat: "3-5%", label: "Collections improvement", source: "AI coding assistance" },
    { stat: "$0", label: "Additional cost (athena)", source: "Free ambient AI for athena clients" },
  ];

  yPos = 400;
  metrics.forEach((m) => {
    text(doc, m.stat, 60, yPos, 36, AMBER, { bold: true });
    text(doc, m.label, 420, yPos - 8, 28, WHITE, { bold: true });
    text(doc, m.source, 420, yPos + 24, 20, STONE_200);
    yPos += 90;
  });

  footer(doc, 4, TOTAL);

  // Slide 5: EHR Compatibility Matrix
  doc.addPage([W, H]);
  bg(doc, WHITE);
  pill(doc, "EHR MATRIX", 60, 60, TEAL_DARK, WHITE, 20);
  text(doc, "Which AI Works With\nYour EHR?", 60, 150, 44, TEAL_DARK, { bold: true, maxWidth: 960 });

  // 2x2 grid
  const gridData = [
    { ehr: "eClinicalWorks", pct: "~35% of CA FQHCs", tools: ["Abridge (API)", "Sunoh.ai (native)", "Built-in AI assist"], x: 60, y: 300 },
    { ehr: "OCHIN Epic", pct: "~25% of CA FQHCs", tools: ["Abridge (native)", "DAX Copilot", "Epic AI Charting"], x: 555, y: 300 },
    { ehr: "athenahealth", pct: "~15% of CA FQHCs", tools: ["Free ambient AI", "Sunoh.ai (API)", "Suki (integration)"], x: 60, y: 600 },
    { ehr: "NextGen", pct: "~10% of CA FQHCs", tools: ["Ambient AI (native)", "Suki (integration)", "Limited options"], x: 555, y: 600 },
  ];

  gridData.forEach((g) => {
    roundedRect(doc, g.x, g.y, 465, 250, 12, STONE_100);
    text(doc, g.ehr, g.x + 25, g.y + 40, 28, TEAL_DARK, { bold: true });
    text(doc, g.pct, g.x + 25, g.y + 70, 20, STONE_700);
    divider(doc, g.x + 25, g.y + 85, 415, STONE_200);
    g.tools.forEach((t, i) => {
      text(doc, "-> " + t, g.x + 25, g.y + 120 + i * 40, 22, STONE_800);
    });
  });

  footer(doc, 5, TOTAL);

  // Slide 6: What NOT to Do
  doc.addPage([W, H]);
  bg(doc, TEAL_DARK);
  pill(doc, "WATCH OUT", 60, 60, AMBER, STONE_800, 20);
  text(doc, "AI Mistakes\nFQHCs Are Making", 60, 180, 56, WHITE, { bold: true, maxWidth: 960 });

  const mistakes = [
    { num: "1", mistake: "Buying before piloting", fix: "Start with 5-10 providers for 90 days" },
    { num: "2", mistake: "Ignoring EHR compatibility", fix: "Check native vs API integration first" },
    { num: "3", mistake: "No change management plan", fix: "Provider champions + workflow redesign" },
    { num: "4", mistake: "Chasing hype over ROI", fix: "Ambient AI has proven ROI. Start there." },
    { num: "5", mistake: "Skipping the billing angle", fix: "AI coding can pay for itself in 90 days" },
  ];

  yPos = 400;
  mistakes.forEach((m) => {
    roundedRect(doc, 60, yPos - 25, 50, 50, 8, AMBER);
    text(doc, m.num, 75, yPos + 10, 28, STONE_800, { bold: true });
    text(doc, m.mistake, 140, yPos - 5, 28, WHITE, { bold: true });
    text(doc, "Fix: " + m.fix, 140, yPos + 30, 22, STONE_200);
    yPos += 90;
  });

  footer(doc, 6, TOTAL);

  // Slide 7: CTA
  doc.addPage([W, H]);
  bg(doc, TEAL_DARK);
  text(doc, "Track Every\nFQHC AI Move", 60, 200, 72, WHITE, { bold: true, maxWidth: 960 });
  divider(doc, 60, 400, 400, AMBER);
  text(doc, "19 AI implementations tracked", 60, 470, 32, STONE_200);
  text(doc, "8 vendor comparisons with EHR matrix", 60, 520, 32, STONE_200);
  text(doc, "FQHC fit scores for every product", 60, 570, 32, STONE_200);
  text(doc, "Updated weekly from primary sources", 60, 620, 32, STONE_200);

  roundedRect(doc, 60, 720, 480, 80, 12, AMBER);
  text(doc, "fqhctalent.com/ai-tracker", 90, 772, 32, STONE_800, { bold: true });

  text(doc, "Free. No login required.", 60, 860, 28, STONE_200);
  footer(doc, 7, TOTAL);

  const outPath = path.join(DIR, "2026-03-13-ai-landscape-carousel.pdf");
  fs.writeFileSync(outPath, Buffer.from(doc.output("arraybuffer")));
  console.log(`OK: ${path.basename(outPath)} (${Math.round(fs.statSync(outPath).size / 1024)}KB, ${TOTAL} slides)`);
}

// Run all
createSalaryCarousel();
createCareerLadderCarousel();
createAILandscapeCarousel();
console.log("\nDone! 3 data carousel PDFs created.");
