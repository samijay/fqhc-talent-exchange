/**
 * LinkedIn Carousel PDFs - Batch 5: Strategic Intelligence Carousels
 *
 * 1. "FQHC OKR Playbook" - How to set OKRs during crisis (unique data)
 * 2. "Top-of-License Revenue Unlock" - Delegation matrix + revenue per role
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

function newDoc() { return new jsPDF({ unit: "pt", format: [W, H] }); }
function bg(doc, c) { doc.setFillColor(c[0], c[1], c[2]); doc.rect(0, 0, W, H, "F"); }
function text(doc, str, x, y, size, c, opts = {}) {
  doc.setFontSize(size);
  doc.setTextColor(c[0], c[1], c[2]);
  doc.setFont("helvetica", opts.bold ? "bold" : "normal");
  if (opts.maxWidth) doc.text(str, x, y, { maxWidth: opts.maxWidth, lineHeightFactor: opts.lineHeight || 1.3 });
  else doc.text(str, x, y);
}
function roundedRect(doc, x, y, w, h, r, c) {
  doc.setFillColor(c[0], c[1], c[2]);
  doc.roundedRect(x, y, w, h, r, r, "F");
}
function pill(doc, str, x, y, bgC, txtC, size = 20) {
  doc.setFontSize(size);
  const tw = doc.getTextWidth(str);
  roundedRect(doc, x, y, tw + 30, size + 16, (size + 16) / 2, bgC);
  text(doc, str, x + 15, y + size + 4, size, txtC, { bold: true });
}
function divider(doc, x, y, w, c) {
  doc.setDrawColor(c[0], c[1], c[2]); doc.setLineWidth(2); doc.line(x, y, x + w, y);
}
function footer(doc, n, t) {
  text(doc, "fqhctalent.com", 60, H - 45, 18, STONE_200);
  text(doc, `${n}/${t}`, W - 100, H - 45, 18, STONE_200);
}

// ========================================
// CAROUSEL 1: FQHC OKR Playbook
// ========================================
function createOKRCarousel() {
  const doc = newDoc();
  const T = 8;

  // Slide 1: Title
  bg(doc, TEAL_DARK);
  pill(doc, "OKR TEMPLATES", 60, 80, AMBER, STONE_800, 22);
  text(doc, "FQHC OKRs\nfor Crisis Mode", 60, 240, 72, WHITE, { bold: true, maxWidth: 960 });
  text(doc, "25 battle-tested templates\nfor the 2026 funding cliff.", 60, 440, 40, STONE_200, { maxWidth: 960 });
  divider(doc, 60, 560, 960, AMBER);
  text(doc, "Because \"survive\" isn't a strategy.\nBut these OKRs are.", 60, 620, 32, STONE_200, { maxWidth: 900 });
  roundedRect(doc, 0, H - 120, W, 120, 0, AMBER);
  text(doc, "Downloadable Excel trackers included", 60, H - 60, 24, STONE_800, { bold: true });
  footer(doc, 1, T);

  // Slide 2: Why OKRs Matter Now
  doc.addPage([W, H]);
  bg(doc, WHITE);
  pill(doc, "WHY NOW", 60, 60, TEAL_DARK, WHITE, 20);
  text(doc, "The 2026 FQHC Crisis\nConvergence", 60, 160, 48, TEAL_DARK, { bold: true, maxWidth: 960 });

  const crises = [
    { stat: "$4.6B", label: "CHCF authorization expires Dec 2026", icon: "Federal" },
    { stat: "84%", label: "of FQHC revenue is government-funded", icon: "Revenue" },
    { stat: "50%+", label: "of CA FQHCs report workforce shortages", icon: "Staffing" },
    { stat: "3,477+", label: "healthcare workers displaced in CA", icon: "Layoffs" },
  ];

  let yPos = 310;
  crises.forEach((c) => {
    roundedRect(doc, 60, yPos, 960, 110, 12, STONE_100);
    text(doc, c.stat, 90, yPos + 50, 42, AMBER, { bold: true });
    text(doc, c.label, 320, yPos + 40, 26, STONE_800);
    roundedRect(doc, 820, yPos + 20, 160, 40, 8, TEAL_DARK);
    text(doc, c.icon, 850, yPos + 48, 18, WHITE, { bold: true });
    yPos += 130;
  });

  text(doc, "OKRs force cross-department alignment when silos kill.", 60, H - 90, 24, TEAL_DARK, { bold: true });
  footer(doc, 2, T);

  // Slide 3: 5 Domains
  doc.addPage([W, H]);
  bg(doc, WHITE);
  pill(doc, "5 DOMAINS", 60, 60, TEAL_DARK, WHITE, 20);
  text(doc, "OKR Domains for FQHCs", 60, 160, 48, TEAL_DARK, { bold: true });

  const domains = [
    { name: "Revenue Diversification", count: "5 templates", examples: "340B, grant capture, ECM billing" },
    { name: "Workforce Retention", count: "5 templates", examples: "Turnover, pipeline, bilingual hiring" },
    { name: "Quality & Compliance", count: "5 templates", examples: "UDS, HEDIS, PCMH, patient access" },
    { name: "Operational Efficiency", count: "5 templates", examples: "No-show, cycle time, panel size" },
    { name: "Growth & Innovation", count: "5 templates", examples: "Telehealth, AI adoption, new sites" },
  ];

  yPos = 250;
  domains.forEach((d, i) => {
    roundedRect(doc, 60, yPos, 960, 120, 12, i % 2 === 0 ? STONE_100 : WHITE);
    roundedRect(doc, 60, yPos, 8, 120, 0, TEAL);
    text(doc, d.name, 100, yPos + 40, 28, TEAL_DARK, { bold: true });
    text(doc, d.count, 100, yPos + 75, 22, STONE_700);
    text(doc, d.examples, 400, yPos + 55, 22, STONE_700);
    yPos += 135;
  });

  text(doc, "+ 1 Company-Wide Flagship covering all 8 clinical roles", 60, H - 80, 22, AMBER, { bold: true });
  footer(doc, 3, T);

  // Slide 4: Example OKR - Revenue
  doc.addPage([W, H]);
  bg(doc, TEAL_DARK);
  pill(doc, "EXAMPLE", 60, 60, AMBER, STONE_800, 20);
  text(doc, "Revenue Diversification OKR", 60, 160, 42, WHITE, { bold: true });
  divider(doc, 60, 210, 960, AMBER);

  text(doc, "Objective:", 60, 280, 24, AMBER, { bold: true });
  text(doc, "Reduce Medi-Cal dependency from 65% to 50%\nof total revenue within 12 months", 60, 320, 28, WHITE, { maxWidth: 900 });

  text(doc, "Key Results:", 60, 430, 24, AMBER, { bold: true });
  const krs = [
    "KR1: Enroll 500 patients in 340B program (+$1.2M revenue)",
    "KR2: Launch ECM billing for 200 complex patients (+$480K)",
    "KR3: Secure 2 new grant awards totaling $500K+",
    "KR4: Increase commercially insured patients 15% -> 22%",
  ];
  yPos = 480;
  krs.forEach((kr) => {
    text(doc, kr, 80, yPos, 24, WHITE);
    yPos += 50;
  });

  roundedRect(doc, 60, yPos + 30, 960, 100, 12, [20, 140, 130]);
  text(doc, "Departments: Finance + Billing + Front Desk + Outreach", 90, yPos + 70, 22, STONE_200);
  text(doc, "This is how you break silos.", 90, yPos + 100, 22, AMBER, { bold: true });

  footer(doc, 4, T);

  // Slide 5: Example OKR - Workforce
  doc.addPage([W, H]);
  bg(doc, TEAL_DARK);
  pill(doc, "EXAMPLE", 60, 60, AMBER, STONE_800, 20);
  text(doc, "Workforce Retention OKR", 60, 160, 42, WHITE, { bold: true });
  divider(doc, 60, 210, 960, AMBER);

  text(doc, "Objective:", 60, 280, 24, AMBER, { bold: true });
  text(doc, "Reduce clinical staff turnover from 28% to 18%\nand fill critical vacancies within 60 days", 60, 320, 28, WHITE, { maxWidth: 900 });

  text(doc, "Key Results:", 60, 430, 24, AMBER, { bold: true });
  const krs2 = [
    "KR1: Implement stay interviews for all staff (quarterly)",
    "KR2: Launch NHSC site approval for 3 new locations",
    "KR3: Create MA-to-LVN pipeline (5 sponsored/year)",
    "KR4: Achieve 80% staff engagement score (from 62%)",
  ];
  yPos = 480;
  krs2.forEach((kr) => {
    text(doc, kr, 80, yPos, 24, WHITE);
    yPos += 50;
  });

  roundedRect(doc, 60, yPos + 30, 960, 100, 12, [20, 140, 130]);
  text(doc, "Departments: HR + Clinical Ops + Finance + Training", 90, yPos + 70, 22, STONE_200);
  text(doc, "Retention is cheaper than recruitment. Always.", 90, yPos + 100, 22, AMBER, { bold: true });

  footer(doc, 5, T);

  // Slide 6: Excel Tracker Preview
  doc.addPage([W, H]);
  bg(doc, WHITE);
  pill(doc, "DOWNLOAD", 60, 60, TEAL_DARK, WHITE, 20);
  text(doc, "Every OKR Comes With\nan Excel Tracker", 60, 160, 44, TEAL_DARK, { bold: true, maxWidth: 960 });

  // Mock spreadsheet
  roundedRect(doc, 60, 280, 960, 50, 0, TEAL_DARK);
  const headers = ["Key Result", "Owner", "Current", "Target", "Status"];
  const colX = [80, 400, 560, 680, 820];
  headers.forEach((h, i) => {
    text(doc, h, colX[i], 312, 18, WHITE, { bold: true });
  });

  const rows = [
    ["340B enrollment", "Rev Cycle Dir", "180", "500", "On Track"],
    ["ECM patients", "ECM Lead", "95", "200", "At Risk"],
    ["New grants", "Grants Mgr", "1", "2", "On Track"],
    ["Commercial %", "Front Desk Mgr", "17%", "22%", "Behind"],
  ];

  yPos = 340;
  rows.forEach((row, ri) => {
    const rowBg = ri % 2 === 0 ? STONE_100 : WHITE;
    roundedRect(doc, 60, yPos, 960, 50, 0, rowBg);
    row.forEach((cell, ci) => {
      const color = ci === 4 ? (cell === "On Track" ? TEAL : cell === "At Risk" ? AMBER : [220, 38, 38]) : STONE_800;
      text(doc, cell, colX[ci], yPos + 32, 18, color, { bold: ci === 4 });
    });
    yPos += 50;
  });

  text(doc, "Columns include: Owner, Current Value, Target,", 60, yPos + 60, 24, STONE_700);
  text(doc, "% Progress, Status, Notes, Due Date", 60, yPos + 95, 24, STONE_700);

  roundedRect(doc, 60, yPos + 160, 960, 100, 12, TEAL_DARK);
  text(doc, "Download All 25 templates as a single Excel workbook", 90, yPos + 200, 24, WHITE);
  text(doc, "or download them one at a time.", 90, yPos + 235, 24, STONE_200);

  footer(doc, 6, T);

  // Slide 7: Case Study Link
  doc.addPage([W, H]);
  bg(doc, WHITE);
  pill(doc, "REAL RESULTS", 60, 60, TEAL_DARK, WHITE, 20);
  text(doc, "FQHCs Using OKRs\nto Navigate Crisis", 60, 160, 48, TEAL_DARK, { bold: true, maxWidth: 960 });

  const cases = [
    { org: "PureView Health Center (MT)", result: "Restored $2M in revenue via PPS rebasing", time: "6 months" },
    { org: "MCR Health (FL)", result: "Grew from $7M to $42M using OKR framework", time: "5 years" },
    { org: "Highland Health (AL)", result: "340B savings: +270% pharmacy revenue", time: "12 months" },
    { org: "Sun River Health (NY)", result: "AI documentation: 7,000 visits/mo automated", time: "8 months" },
  ];

  yPos = 320;
  cases.forEach((c) => {
    roundedRect(doc, 60, yPos, 960, 120, 12, STONE_100);
    text(doc, c.org, 90, yPos + 35, 24, TEAL_DARK, { bold: true });
    text(doc, c.result, 90, yPos + 70, 22, STONE_800);
    roundedRect(doc, 820, yPos + 30, 160, 40, 8, AMBER);
    text(doc, c.time, 845, yPos + 58, 18, STONE_800, { bold: true });
    yPos += 140;
  });

  text(doc, "Full case studies at fqhctalent.com/strategy/case-studies", 60, H - 80, 22, TEAL_DARK, { bold: true });
  footer(doc, 7, T);

  // Slide 8: CTA
  doc.addPage([W, H]);
  bg(doc, TEAL_DARK);
  text(doc, "Get the OKR\nPlaybook", 60, 200, 72, WHITE, { bold: true, maxWidth: 960 });
  divider(doc, 60, 400, 400, AMBER);
  text(doc, "25 crisis-ready OKR templates", 60, 470, 32, STONE_200);
  text(doc, "Excel trackers with every download", 60, 520, 32, STONE_200);
  text(doc, "Real case studies from FQHCs that won", 60, 570, 32, STONE_200);
  text(doc, "Company-wide flagship template", 60, 620, 32, STONE_200);

  roundedRect(doc, 60, 720, 480, 80, 12, AMBER);
  text(doc, "fqhctalent.com/strategy/okrs", 90, 772, 32, STONE_800, { bold: true });
  text(doc, "Free. No login required.", 60, 860, 28, STONE_200);
  footer(doc, 8, T);

  const outPath = path.join(DIR, "2026-03-13-okr-playbook-carousel.pdf");
  fs.writeFileSync(outPath, Buffer.from(doc.output("arraybuffer")));
  console.log(`OK: ${path.basename(outPath)} (${Math.round(fs.statSync(outPath).size / 1024)}KB, ${T} slides)`);
}

// ========================================
// CAROUSEL 2: Top-of-License Revenue Unlock
// ========================================
function createTopOfLicenseCarousel() {
  const doc = newDoc();
  const T = 7;

  // Slide 1: Title
  bg(doc, TEAL_DARK);
  pill(doc, "WORKFORCE STRATEGY", 60, 80, AMBER, STONE_800, 22);
  text(doc, "Top-of-License\nRevenue Unlock", 60, 240, 72, WHITE, { bold: true, maxWidth: 960 });
  text(doc, "Your staff can bill more.\nCA law says so.", 60, 440, 40, STONE_200, { maxWidth: 960 });
  divider(doc, 60, 560, 960, AMBER);
  text(doc, "10 roles. 47 delegable tasks.\nMillions in untapped revenue.", 60, 620, 32, STONE_200, { maxWidth: 900 });
  roundedRect(doc, 0, H - 120, W, 120, 0, AMBER);
  text(doc, "Based on CA Business & Professions Code analysis", 60, H - 60, 24, STONE_800, { bold: true });
  footer(doc, 1, T);

  // Slide 2: The Problem
  doc.addPage([W, H]);
  bg(doc, WHITE);
  pill(doc, "THE PROBLEM", 60, 60, TEAL_DARK, WHITE, 20);
  text(doc, "Most FQHCs Leave\nMoney on the Table", 60, 160, 48, TEAL_DARK, { bold: true, maxWidth: 960 });

  const problems = [
    { stat: "60%", desc: "of provider time spent on\ntasks others can legally do" },
    { stat: "$337K", desc: "revenue per NP when running\nindependent panels (CA allows it)" },
    { stat: "70%", desc: "of MAs doing below their\nfull scope of practice" },
    { stat: "0%", desc: "of FQHCs billing Medi-Cal\nfor CHW services (most eligible)" },
  ];

  yPos = 330;
  problems.forEach((p, i) => {
    const boxX = i % 2 === 0 ? 60 : 540;
    const boxY = i < 2 ? yPos : yPos + 240;
    roundedRect(doc, boxX, boxY, 460, 200, 12, STONE_100);
    text(doc, p.stat, boxX + 30, boxY + 70, 56, AMBER, { bold: true });
    text(doc, p.desc, boxX + 30, boxY + 120, 22, STONE_800, { maxWidth: 400 });
  });

  footer(doc, 2, T);

  // Slide 3: The Delegation Matrix
  doc.addPage([W, H]);
  bg(doc, WHITE);
  pill(doc, "DELEGATION", 60, 60, TEAL_DARK, WHITE, 20);
  text(doc, "Who Can Do What in CA", 60, 160, 48, TEAL_DARK, { bold: true });
  text(doc, "Simplified delegation matrix (CA BPC)", 60, 220, 24, STONE_700);

  // Matrix header
  const mY = 280;
  const roles = ["MD", "NP", "PA", "RN", "LVN", "MA", "CHW"];
  const rX = [390, 460, 530, 600, 670, 740, 810];
  roles.forEach((r, i) => {
    roundedRect(doc, rX[i], mY, 55, 35, 4, TEAL_DARK);
    text(doc, r, rX[i] + 8, mY + 24, 16, WHITE, { bold: true });
  });

  const tasks = [
    { task: "Patient assessment", perms: [1, 1, 1, 1, 0, 0, 0] },
    { task: "Prescribe medications", perms: [1, 1, 1, 0, 0, 0, 0] },
    { task: "Order labs", perms: [1, 1, 1, 0, 0, 0, 0] },
    { task: "Administer injections", perms: [1, 1, 1, 1, 1, 1, 0] },
    { task: "Vital signs", perms: [1, 1, 1, 1, 1, 1, 1] },
    { task: "Health education", perms: [1, 1, 1, 1, 0, 0, 1] },
    { task: "Care coordination", perms: [1, 1, 1, 1, 0, 0, 1] },
    { task: "Wound care", perms: [1, 1, 1, 1, 1, 0, 0] },
    { task: "Medication admin", perms: [1, 1, 1, 1, 1, 0, 0] },
    { task: "Social needs screening", perms: [1, 1, 1, 1, 1, 1, 1] },
  ];

  let tY = mY + 50;
  tasks.forEach((t, ti) => {
    const rowBg = ti % 2 === 0 ? STONE_100 : WHITE;
    roundedRect(doc, 60, tY, 820, 40, 0, rowBg);
    text(doc, t.task, 70, tY + 27, 18, STONE_800);
    t.perms.forEach((p, pi) => {
      const dotColor = p ? TEAL : [220, 220, 220];
      doc.setFillColor(dotColor[0], dotColor[1], dotColor[2]);
      doc.circle(rX[pi] + 27, tY + 20, 10, "F");
      if (p) text(doc, "Y", rX[pi] + 21, tY + 25, 14, WHITE, { bold: true });
    });
    tY += 42;
  });

  text(doc, "Full 47-task matrix at fqhctalent.com/strategy/scope-of-practice", 60, H - 70, 18, TEAL_DARK, { bold: true });
  footer(doc, 3, T);

  // Slide 4: NP Independent Panels
  doc.addPage([W, H]);
  bg(doc, TEAL_DARK);
  pill(doc, "BIG WIN #1", 60, 60, AMBER, STONE_800, 20);
  text(doc, "NP Independent Panels", 60, 180, 56, WHITE, { bold: true });
  text(doc, "CA eliminated NP supervision in 2023 (AB 890)", 60, 250, 28, STONE_200);

  // Before/After
  roundedRect(doc, 60, 330, 460, 300, 12, [20, 140, 130]);
  text(doc, "BEFORE AB 890", 90, 370, 22, AMBER, { bold: true });
  text(doc, "NP requires MD oversight", 90, 410, 24, WHITE);
  text(doc, "Shared panels only", 90, 450, 24, WHITE);
  text(doc, "Revenue attributed to MD", 90, 490, 24, WHITE);
  text(doc, "NP = cost center", 90, 540, 28, STONE_200, { bold: true });

  roundedRect(doc, 560, 330, 460, 300, 12, AMBER);
  text(doc, "AFTER AB 890", 590, 370, 22, STONE_800, { bold: true });
  text(doc, "NP practices independently", 590, 410, 24, STONE_800);
  text(doc, "Own patient panels", 590, 450, 24, STONE_800);
  text(doc, "Bill under own NPI", 590, 490, 24, STONE_800);
  text(doc, "NP = $337K/yr revenue", 590, 540, 28, TEAL_DARK, { bold: true });

  roundedRect(doc, 60, 680, 960, 100, 12, [10, 100, 94]);
  text(doc, "With 5 NPs on independent panels:", 90, 720, 26, WHITE);
  text(doc, "+$1.68M in annual revenue capacity", 90, 760, 32, AMBER, { bold: true });

  footer(doc, 4, T);

  // Slide 5: CHW Medi-Cal Billing
  doc.addPage([W, H]);
  bg(doc, WHITE);
  pill(doc, "BIG WIN #2", 60, 60, TEAL_DARK, WHITE, 20);
  text(doc, "CHW Medi-Cal Billing", 60, 160, 56, TEAL_DARK, { bold: true });
  text(doc, "Most FQHCs have CHWs but aren't billing for them", 60, 230, 26, STONE_700);

  const billable = [
    { service: "Health education (individual)", code: "98960", rate: "$25-45/visit" },
    { service: "Health education (group)", code: "98961-62", rate: "$15-30/person" },
    { service: "ECM care coordination", code: "PMPM", rate: "$150-350/member/mo" },
    { service: "Community health navigation", code: "T1016", rate: "$20-40/encounter" },
    { service: "Social needs screening", code: "96156", rate: "$15-25/screen" },
  ];

  yPos = 320;
  billable.forEach((b) => {
    roundedRect(doc, 60, yPos, 960, 80, 8, STONE_100);
    text(doc, b.service, 90, yPos + 30, 24, STONE_800, { bold: true });
    roundedRect(doc, 650, yPos + 15, 100, 35, 6, TEAL_DARK);
    text(doc, b.code, 665, yPos + 40, 16, WHITE, { bold: true });
    text(doc, b.rate, 780, yPos + 35, 24, AMBER, { bold: true });
    yPos += 95;
  });

  roundedRect(doc, 60, yPos + 30, 960, 80, 12, TEAL_DARK);
  text(doc, "One CHW at 15 encounters/day = $75-135K billable/year", 90, yPos + 80, 24, AMBER, { bold: true });

  footer(doc, 5, T);

  // Slide 6: MA Standing Orders
  doc.addPage([W, H]);
  bg(doc, TEAL_DARK);
  pill(doc, "BIG WIN #3", 60, 60, AMBER, STONE_800, 20);
  text(doc, "MA Standing Orders\n= Provider Time Back", 60, 180, 48, WHITE, { bold: true, maxWidth: 960 });

  text(doc, "Under CA BPC, MAs can perform these\nwith standing orders from a physician:", 60, 320, 28, STONE_200, { maxWidth: 900 });

  const maOrders = [
    "Administer vaccines (flu, COVID, routine)",
    "Perform point-of-care testing (A1C, rapid strep)",
    "Apply topical medications",
    "Remove sutures and staples",
    "Perform EKGs and pulmonary function tests",
    "Conduct SDOH screenings with validated tools",
  ];

  yPos = 430;
  maOrders.forEach((o, i) => {
    roundedRect(doc, 60, yPos, 50, 40, 8, AMBER);
    text(doc, String(i + 1), 75, yPos + 28, 22, STONE_800, { bold: true });
    text(doc, o, 130, yPos + 28, 24, WHITE);
    yPos += 60;
  });

  roundedRect(doc, 60, yPos + 30, 960, 80, 12, [20, 140, 130]);
  text(doc, "Each task shifted to MA = 5-10 min back per provider per patient", 90, yPos + 80, 22, AMBER, { bold: true });

  footer(doc, 6, T);

  // Slide 7: CTA
  doc.addPage([W, H]);
  bg(doc, TEAL_DARK);
  text(doc, "Unlock Your\nWorkforce Revenue", 60, 200, 72, WHITE, { bold: true, maxWidth: 960 });
  divider(doc, 60, 400, 400, AMBER);
  text(doc, "Full delegation matrix (10 roles x 47 tasks)", 60, 470, 32, STONE_200);
  text(doc, "CA BPC citations for every permission", 60, 520, 32, STONE_200);
  text(doc, "Revenue impact modeling per role", 60, 570, 32, STONE_200);
  text(doc, "Change management playbook included", 60, 620, 32, STONE_200);

  roundedRect(doc, 60, 720, 620, 80, 12, AMBER);
  text(doc, "fqhctalent.com/strategy/scope-of-practice", 90, 772, 28, STONE_800, { bold: true });
  text(doc, "Free. No login required.", 60, 860, 28, STONE_200);
  footer(doc, 7, T);

  const outPath = path.join(DIR, "2026-03-13-top-of-license-carousel.pdf");
  fs.writeFileSync(outPath, Buffer.from(doc.output("arraybuffer")));
  console.log(`OK: ${path.basename(outPath)} (${Math.round(fs.statSync(outPath).size / 1024)}KB, ${T} slides)`);
}

createOKRCarousel();
createTopOfLicenseCarousel();
console.log("\nDone! 2 strategy carousel PDFs created.");
