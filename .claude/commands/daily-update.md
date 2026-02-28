# Daily Content Update

Run the morning content update pipeline. **Target time: under 20 minutes.**

---

## Step 1: WARN Act Check (FQHC-only)

1. Download CA EDD WARN XLSX: `curl -sL "https://edd.ca.gov/siteassets/files/jobs_and_training/warn/warn_report1.xlsx" -o /tmp/warn-report.xlsx`
2. Parse with Python/openpyxl — the detailed report is on the sheet named "Detailed WARN Report " (note trailing space). Headers in row 2, data starts row 3. Columns: County/Parish, Notice Date, Processed Date, Effective Date, Company, Layoff/Closure, No. Of Employees, Address, Related Industry.
3. Filter for healthcare entries (industry contains "62 health care" or healthcare keywords in company name)
4. **Only flag entries that are actual FQHCs** — cross-reference against our 220-FQHC directory in `california-fqhcs.ts`
5. Skip hospitals, health plans, dental plans, medical device companies, etc.
6. If no FQHC WARN filings found: "No new FQHC WARN filings today" and move on
7. Also do a quick web search for "California FQHC layoffs [current month] [year]" to catch non-WARN layoff news

**Only pause for review if new FQHC entries found.**

---

## Step 2: Job Scan (API FQHCs only)

Run all 4 scrapeable FQHCs in parallel via Bash (no WebFetch needed):

```bash
# AltaMed (Workday)
curl -s -X POST 'https://altamed.wd1.myworkdayjobs.com/wday/cxs/altamed/Careers/jobs' \
  -H 'Content-Type: application/json' \
  -d '{"appliedFacets":{},"limit":20,"offset":0,"searchText":""}' | python3 -c "import sys,json; d=json.load(sys.stdin); print('AltaMed:', d.get('total'))"

# FHCSD (Workday)
curl -s -X POST 'https://fhcsd.wd1.myworkdayjobs.com/wday/cxs/fhcsd/MAIN/jobs' \
  -H 'Content-Type: application/json' \
  -d '{"appliedFacets":{},"limit":20,"offset":0,"searchText":""}' | python3 -c "import sys,json; d=json.load(sys.stdin); print('FHCSD:', d.get('total'))"

# Asian Health Services (Lever)
curl -s 'https://api.lever.co/v0/postings/ahschc?mode=json' | python3 -c "import sys,json; d=json.load(sys.stdin); print('AHS:', len(d))"

# La Clinica (HRMDirect) — use WebFetch
```

Report counts and compare to previous (check `career-page-config.ts` notes for last counts). Only pause if significant changes (>10 net new).

---

## Step 3: Legislative & Policy Scan

Run 4 web searches in parallel to scan for FQHC-relevant policy, funding, and legislative developments:

### Search Queries (run all 4):

1. **Federal FQHC policy:** `"FQHC" OR "community health center" funding legislation [current month] [year]`
2. **California Medi-Cal:** `California Medi-Cal FQHC reimbursement OR funding [current month] [year]`
3. **H.R. 1 / Medicaid impact:** `Medicaid cuts FQHC impact [year] community health centers`
4. **CA county/local responses:** `California county health department FQHC layoffs OR cuts OR funding [current month] [year]`

### Sources to Prioritize (highest signal):

| Source | Type | What to Look For |
|--------|------|-----------------|
| **NACHC** (nachc.org) | Federal | Funding alerts, legislative updates, CHCF reauthorization, advocacy days |
| **CPCA** (cpca.org) | State | CA-specific policy, managed care changes, CalAIM updates |
| **CHCF** (chcf.org) | State | Medi-Cal analysis, funding cliff projections, provider payment data |
| **CA LAO** (lao.ca.gov) | State | Budget analyses, Medi-Cal fiscal outlook, spending projections |
| **DHCS** (dhcs.ca.gov) | State | Medi-Cal rate changes, managed care procurement, FQHC/RHC bulletins |
| **KFF** (kff.org) | Federal | Medicaid data, enrollment trends, policy explainers |
| **Fierce Healthcare** | Industry | Layoff tracker, financial news, system consolidations |
| **Becker's Hospital Review** | Industry | Layoffs, closures, financial distress, executive moves |
| **Modern Healthcare** | Industry | Live layoff/closure updates, policy analysis |
| **CalMatters** | State | Budget coverage, Medi-Cal policy, human impact stories |

### What to Capture:

For each significant finding, record:

```
- **What:** [One-line headline]
- **Source:** [URL]
- **Date:** [Published date]
- **Impact on FQHCs:** [1-2 sentences: workforce, funding, operations, or patient access impact]
- **Actionable for us:** [Newsletter content? Layoff tracker update? Blog topic? Data update to funding-impact-data.ts?]
```

### Decision Rules:

- **Update `funding-impact-data.ts`** if: New policy with a date, dollar amount, and people affected (add to `policyTimeline[]`)
- **Update `california-fqhc-layoffs.ts`** if: Named FQHC announces layoffs or closures
- **Flag for blog topic** if: Major policy shift, new data report, or trend worth explaining
- **Flag for newsletter content** if: Any insight useful for candidates (job market implications) or employers (funding/operational impact)
- **No code changes needed** if: General industry news without specific actionable data

### Key Policy Dates to Track (2026):

| Date | Event | Status |
|------|-------|--------|
| 2026-02-03 | Consolidated Appropriations Act signed — $4.6B CHCF | Happened |
| 2026-01-01 | Enhanced FMAP sunsets (Medicaid expansion) | Happened |
| 2026-01-01 | Medi-Cal enrollment freeze for undocumented adults | Happened |
| 2026-07-01 | Dental coverage eliminated for undocumented adults | Upcoming |
| 2026-07-01 | MCO tax adjustment deadline (federal guidance) | Upcoming |
| 2026-10-01 | Immigrant eligibility restrictions take effect | Upcoming |
| 2026-12-31 | CHCF authorization expires (needs reauthorization!) | Upcoming |
| 2026-12-31 | Semi-annual redetermination requirement begins | Upcoming |
| 2027-01-01 | Medicaid work requirements take effect (80 hrs/mo) | Upcoming |
| 2028-01-01 | Provider tax rate phase-down begins (6% → 3.5% by 2032) | Upcoming |
| 2028-07-01 | PPS elimination for UIS services | Upcoming |

**Only pause for review if significant new developments found that need immediate code updates.**

---

## Step 3.5: News & Intelligence Scan

Run 5 additional searches to populate the intelligence feed in `fqhc-news-intel.ts`:

### Search Queries (run all 5):

1. **FQHC news:** `California FQHC news community health center [current month] [year]`
2. **Mergers & acquisitions:** `"health center" OR "FQHC" merger acquisition California [year]`
3. **Undocumented patient access:** `undocumented immigrant healthcare California FQHC [current month] [year]`
4. **Patient stories:** `FQHC patient story community health center California [year]`
5. **Lobbying & advocacy:** `NACHC CPCA advocacy FQHC coalition California [current month] [year]`

### What to Capture:

For each significant finding, create an IntelItem entry:

```typescript
{
  id: "kebab-case-id",
  date: "YYYY-MM-DD",
  headline: { en: "...", es: "..." },
  summary: { en: "...", es: "..." },
  category: "legislation" | "lobbying" | "patient-story" | "merger-acquisition" | "funding" | "workforce" | "undocumented-access" | "change-management",
  impactLevel: "critical" | "high" | "medium" | "low",
  sourceUrl: "https://...",
  sourceOrg: "Source Name",
  region: "California" | "Federal" | "County Name",
  affectedOrgs: ["Org Name"], // optional
  tags: ["tag1", "tag2"],
}
```

### Decision Rules for Impact Level:

- **Critical:** Direct revenue impact >$10M, >200 workers displaced, legislative passage
- **High:** Named FQHC affected, significant policy change, >50 workers
- **Medium:** Industry trend, no specific FQHC named, emerging issue
- **Low:** Background context, general industry news

### How to Update:

1. Add new IntelItem entries to `INTEL_ITEMS[]` in `src/lib/fqhc-news-intel.ts`
2. Keep items sorted newest-first within each category section
3. Maintain last 90 days of items (remove entries older than 90 days)
4. Every item MUST have a primary source URL
5. Always include bilingual headline/summary (EN + ES)

**Only pause for review if new intel items found.**

---

## Step 4: Blog (Mondays only)

Skip unless today is Monday or specifically requested.

---

## Step 5: Apply Changes + Summary

1. Update `career-page-config.ts` notes with new job counts and date
2. Update CLAUDE.md Session Log with today's summary
3. If legislative scan found actionable items: update `funding-impact-data.ts` or `california-fqhc-layoffs.ts`
4. Run `npm run build` to verify
5. Print summary:

```
=== DAILY UPDATE [YYYY-MM-DD] ===
WARN: [count] new FQHC entries (or "None")
Jobs: AltaMed [n], FHCSD [n], AHS [n], La Clinica [n] (total [n], prev [n])
Policy: [# significant findings] — [one-line summary of each]
Intel: [# new IntelItems added to fqhc-news-intel.ts] (total [n] items)
Blog: [Skipped] or [Drafted: "Title"]
Build: [PASS/FAIL]
```

---

## Notes

- **Speed over completeness** — check the 4 API FQHCs only. Save WebFetch scraping for weekly deep-dives.
- Layoff tracker page date is auto-derived from data — no manual update needed.
- Never remove existing entries — only append.
- If any step fails, report and continue.
- The legislative scan is the most judgment-heavy step. When in doubt, capture the finding and flag it for review rather than making code changes.
- Policy findings that aren't immediately actionable still have value — they become newsletter content, blog topics, or context for outreach emails.
