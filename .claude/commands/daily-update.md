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

## Step 3.6: AI & Innovation Scan

Run 3 web searches to track AI adoption at FQHCs for the AI Tracker (`fqhc-ai-tracker.ts`):

### Search Queries (run all 3):

1. **FQHC AI implementation:** `FQHC "artificial intelligence" OR "AI" implementation community health center [current month] [year]`
2. **NACHC technology:** `NACHC technology AI EHR community health center [year]`
3. **EHR AI documentation:** `"ambient documentation" OR "AI scribe" OR "clinical documentation" FQHC OR "community health center" [current month] [year]`

### What to Capture:

For each significant AI adoption finding, create an AIAdoptionItem entry:

```typescript
{
  id: "kebab-case-id",
  title: { en: "...", es: "..." },
  description: { en: "...", es: "..." },
  category: "clinical-documentation" | "revenue-cycle" | "scheduling" | "care-coordination" | "population-health" | "policy-framework",
  vendor: "Vendor Name" | null,
  partnership: "Partner Name" | null,
  metrics: [{ label: "metric name", value: "metric value" }],
  adoptionStage: "pilot" | "expanding" | "widely-adopted" | "framework",
  sourceUrl: "https://...",
  sourceOrg: "Source Name",
  date: "YYYY-MM-DD",
  tags: ["tag1", "tag2"],
}
```

### Decision Rules:

- **Add to `fqhc-ai-tracker.ts`** if: Named FQHC or FQHC vendor announces AI implementation, partnership, or results
- **Link to existing intel items** if: AI adoption connects to a broader policy or workforce story
- **Populate `affectedOrgSlugs`** on related IntelItems when an AI item references a specific FQHC in our directory
- **Skip** if: Generic AI-in-healthcare news without FQHC relevance

**Only pause for review if new AI adoption items found.**

---

## Step 3.7: Cultural & Movement Content Scan

Run 2 web searches to track cultural competency and FQHC movement developments:

### Search Queries (run both):

1. **FQHC cultural competency:** `FQHC "cultural competency" OR "cultural humility" OR "CLAS standards" community health [current month] [year]`
2. **Community health equity:** `California "community health" equity CHW promotora workforce diversity [current month] [year]`

### What to Capture:

- New CLAS standard updates or enforcement actions
- Cultural humility training programs at FQHCs
- CHW/promotora scope expansion legislation
- Workforce diversity or language access initiatives
- Community health worker certification updates (SB 803)
- Anything connecting FQHC history/movement to current events

### Decision Rules:

- **Update `cultural-humility.ts`** if: New regulatory requirement, CLAS standard update, or significant program launch
- **Update `fqhc-movement-history.ts`** if: Major milestone in the movement (new legislation, significant alliance, crisis event)
- **Flag for blog** if: Compelling story about cultural humility in practice, CHW success stories, or community-centered care innovations
- **Skip** if: Generic DEI news without FQHC relevance

**Only pause for review if significant cultural competency or movement developments found.**

---

## Step 3.8: Regional News Scan (Rotation)

Scan 2 regions per day on a 5-day rotation. LA and Bay Area get 2x/week coverage; all others 1x/week. Regional news sources are configured in `src/lib/regional-news-sources.ts`.

### Today's Rotation

| Day | Region A | Region B |
|-----|----------|----------|
| **Monday** | Los Angeles (89 FQHCs) | Sacramento (12) |
| **Tuesday** | Bay Area (40 FQHCs) | Central Valley (16) |
| **Wednesday** | San Diego (14) | Inland Empire (15) |
| **Thursday** | Los Angeles | Central Coast (10) |
| **Friday** | Bay Area | North State (12) + North Coast (11) |

Check today's day of week and run searches for the corresponding regions.

### Search Queries (3 per region, run all in parallel)

For each region being scanned today, run these 3 searches using the region's data from `src/lib/regional-news-sources.ts`:

**Query A — Local Government & Budget:**
`"{county1}" OR "{county2}" county health department budget cuts OR layoffs OR clinic closure [current month] [year]`

Use the region's top 2-3 counties (by FQHC count). For LA: "Los Angeles" OR "Orange". For Bay Area: "San Francisco" OR "Alameda" OR "Santa Clara".

**Query B — FQHC/Clinic-Specific News:**
`"{keyFQHC1}" OR "{keyFQHC2}" OR "community health center" "{region name}" layoffs OR funding OR closure [current month] [year]`

Use 2-3 of the region's `keyFQHCs` from the config. Always include "community health center" as a catch-all.

**Query C — Health System Disruption:**
`"{majorSystem1}" OR "{majorSystem2}" layoffs OR cuts OR restructuring "{key city}" [current month] [year]`

Use 2-3 of the region's `majorHealthSystems`. These capture hospital/system disruptions that create displaced workers who flow into FQHCs.

### Regional News Sources to Prioritize

Reference the `newsOutlets` array from `src/lib/regional-news-sources.ts`. Local outlets often break stories 1-2 weeks before state/national coverage.

| Region | Top Local Sources |
|--------|-------------------|
| Los Angeles | LA Times, LAist, OC Register |
| Bay Area | SF Chronicle, SF Standard, Mission Local, KQED, KALW, Berkeleyside |
| San Diego | SD Union-Tribune, Voice of San Diego, KPBS |
| Sacramento | Sacramento Bee, CapRadio |
| Central Valley | Fresno Bee, KVPR, Bakersfield Californian |
| Inland Empire | Press-Enterprise, San Bernardino Sun |
| Central Coast | SB Independent, Ventura County Star, Monterey Herald |
| North State | Redding Record Searchlight, Chico Enterprise-Record |
| North Coast | Times-Standard, Lost Coast Outpost, Mendocino Voice |

### What to Capture

For each significant regional finding, create an IntelItem with:
- **`region`**: Use county name format (e.g., "San Francisco County", "Los Angeles County") — maps correctly through `COUNTY_TO_REGION` in `regional-intelligence.ts`
- **`affectedOrgSlugs`**: Match any named FQHCs against the 220-entry directory in `california-fqhcs.ts`
- **`tags`**: Include the region slug (e.g., "bay-area", "los-angeles") for filtering
- **`category`**: Most regional items will be "funding", "workforce", or "merger-acquisition"

### Decision Rules for Regional News:

- **Critical:** City/county budget cuts >$10M, >100 workers displaced, clinic closure affecting >5,000 patients
- **High:** Named FQHC or DPH directly affected, county board vote on health funding, hospital system layoffs >50
- **Medium:** Regional health coalition news, advocacy updates, workforce trends
- **Low:** General regional health industry news without direct FQHC impact

### Skip if:

- Story is already captured in today's Step 3–3.9 (statewide searches may catch regional stories first)
- Story is older than 14 days and not critical/high impact
- Story is about a hospital/system with no connection to FQHC workforce pipeline

**Only pause for review if critical regional findings discovered.**

---

## Step 3.9: Compliance & Enforcement Scan

Run 5 compliance-focused web searches:

**Search 1 — HRSA Enforcement:**
`HRSA FQHC "operational site visit" OR "conditions of award" OR "progressive action" enforcement [current month] [year]`

**Search 2 — HIPAA Breaches:**
`OCR HIPAA breach settlement "community health center" OR FQHC [current month] [year]`

**Search 3 — OIG / False Claims:**
`OIG "false claims act" OR "civil monetary penalty" FQHC OR "health center" billing fraud [current month] [year]`

**Search 4 — DHCS Audits:**
`DHCS California FQHC audit OR "billing compliance" OR "Medi-Cal fraud" [current month] [year]`

**Search 5 — 340B Violations:**
`340B HRSA audit OR "contract pharmacy" violation OR "manufacturer restriction" FQHC [current month] [year]`

### Sources to Prioritize

- HHS Office for Civil Rights (hhs.gov/ocr) — HIPAA breach portal + settlements
- OIG (oig.hhs.gov) — enforcement actions, work plans, compliance guidance
- HRSA (bphc.hrsa.gov) — compliance manual updates, SAC conditions
- DHCS (dhcs.ca.gov) — Medi-Cal provider bulletins, audit findings
- CMS (cms.gov) — billing compliance, PPS guidance updates
- 340B Health (340bhealth.org) — program compliance news
- Fierce Healthcare, Modern Healthcare — industry enforcement reporting

### What to Capture

For compliance findings, create an IntelItem with:
- **`category`**: `"compliance"` (maps to ShieldAlert icon, indigo color)
- **`tags`**: Include relevant compliance domain tag(s): `"hrsa-audits"`, `"hipaa-privacy"`, `"billing-fraud"`, `"340b-compliance"`, `"workforce-compliance"`
- **`impact`**: Use `"critical"` for enforcement actions with penalties >$100K or multi-FQHC impact; `"high"` for individual settlements, new audit campaigns, or significant rule changes; `"medium"` for guidance updates, compliance resources, or educational enforcement actions

### Decision Rules for Compliance News:

- **Update `fqhc-compliance.ts`** if: new enforcement action creates a new risk item, HRSA updates OSV requirements, new compliance deadline announced, significant penalty sets new precedent
- **Update `COMPLIANCE_CALENDAR`** if: new filing deadline, audit cycle change, regulatory effective date announced
- **Add IntelItem only** if: general compliance news, settlement without new requirements, industry trend reporting
- **Skip if**: story is about non-FQHC healthcare providers, story is >30 days old, or finding already captured in Steps 3–3.8

### Output Format

```typescript
{
  id: "oig-fqhc-billing-settlement-[month]-2026",
  category: "compliance",
  impact: "high",
  date: "YYYY-MM-DD",
  headline: { en: "...", es: "..." },
  summary: { en: "...", es: "..." },
  sourceUrl: "https://oig.hhs.gov/...",  // MUST be primary source
  sourceOrg: "HHS Office of Inspector General",
  tags: ["billing-fraud", "false-claims-act"]
}
```

**Only pause for review if critical enforcement action discovered affecting CA FQHCs.**

---

## Step 3.10: FQHC Tech Stack Scan (3 searches)

Monitor technology vendor news relevant to FQHCs. Data lives in `src/lib/fqhc-tech-stack.ts`.

### Searches

1. "FQHC healthcare technology vendor 2026" — new partnerships, product launches, pricing changes
2. "community health center EHR implementation" — EHR migrations, go-lives, integration updates
3. "NACHC technology partnership discount" — consortium deals, nonprofit pricing, FQHC-specific programs

### What to Update

- **Update `fqhc-tech-stack.ts`** if: vendor launches FQHC-specific product, pricing change confirmed, new NACHC/CPCA partnership, EHR integration added/removed, security breach at vendor used by FQHCs, vendor acquired or merged
- **Add IntelItem** if: major vendor announcement affects FQHC operations (e.g., EHR company acquired, cybersecurity incident)
- **Skip if**: general enterprise software news, consumer-facing health tech, non-FQHC healthcare IT

### Decision Rules for Tech Stack News:

- **High impact:** EHR vendor acquisition/sunset, NACHC-endorsed tool change, cybersecurity breach at FQHC vendor, major pricing increase
- **Medium:** New FQHC integration, vendor partnership, product feature launch for community health
- **Low:** Industry conference announcements, minor feature updates, general healthcare IT trends

### Output Format

For vendor updates, provide the fields to change:
```typescript
// Update vendor "vendor-id":
{
  field: "value",  // e.g. pricingNote, fqhcDiscount, ehrIntegrations
}
```

For new vendors, provide full `TechVendor` object matching the interface in `fqhc-tech-stack.ts`.

**Only pause for review if a vendor used by multiple FQHCs has a critical issue (breach, shutdown, acquisition).**

---

## Step 4: Blog (Mondays only)

Skip unless today is Monday or specifically requested.

---

## Step 4.5: Link Quality Check (QC)

After adding any new IntelItem entries, verify all source URLs are valid:

1. For each **new** IntelItem added in this session, use `WebFetch` to verify the `sourceUrl` loads correctly
2. If a URL returns 404, is a dead domain, or redirects to a generic page:
   - Search for the correct URL using WebSearch
   - Replace with a verified, working primary source URL
   - Update `sourceOrg` if the source organization changed
3. **Common broken URL patterns to avoid:**
   - Don't guess URL slugs — always verify via WebFetch or WebSearch first
   - **NEVER use generic hub pages** as sourceUrls — always find the specific article/press release
   - Bad examples: `oag.ca.gov/news`, `oag.ca.gov/initiatives`, `nachc.org/policy-advocacy/policy-priorities/health-center-workforce/`, `modernhealthcare.com/mergers-acquisitions`, `bphc.hrsa.gov/funding/funding-opportunities`
   - Good examples: Direct press release URL, specific article URL, PDF URL, LAO analysis URL
   - NACHC restructured their site in 2025 — old hub URLs often don't have specific content. Use specific article/blog/resource paths
   - CPCA site restructured — many old `/CPCA/News/` URLs return 404
   - CHCF changed from `/publication/` to `/resource/` paths — verify before using
   - AHS (alamedahealthsystem.org) pages disappear frequently — use news coverage (KQED, Berkeleyside) instead
   - DHCS pages use SharePoint/JS — they may render blank to WebFetch but are valid; verify via search results
   - KFF URLs use their new format: `kff.org/medicaid/health-provisions-in-...`
   - CAFP moved to `familydocs.org` — old `cafp.org` domain is dead
4. For existing items: spot-check 5 random source URLs each session to catch link rot
5. **Quality rules:**
   - Every sourceUrl must be a specific, reachable page — NOT a homepage or section landing page
   - The content at the URL must actually support the claims in the headline/summary
   - If the URL is a general page that doesn't mention the specific claim, it's a MISMATCH — find a better URL
   - Source hierarchy: govt (.gov) > policy orgs (nachc.org, kff.org) > industry pubs > news
   - For strategy items: link to the source of the underlying facts, not generic institutional pages

**Only pause if >3 broken links found in existing items.**

---

## Step 4.5: Announcement Banner Check

Review `src/components/layout/AnnouncementBar.tsx` — the site-wide top banner headline. Update if:
- The current headline is >7 days old
- A new blog post, critical intel item, or major event is more compelling
- A new blog was drafted in Step 4

Pick the most impactful recent content: new blog post, critical/high-impact intel item, or breaking news. Update both EN and ES text and the `href` link. Keep copy short and punchy (under 100 chars).

**Skip if the current banner is still timely and relevant.**

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
Regional: [region1] + [region2] — [# findings] ([# new IntelItems])
Compliance: [# enforcement actions found] — [one-line summary] (or "No new enforcement actions")
Tech Stack: [# vendor updates] — [one-line summary] (or "No new vendor updates")
Link QC: [# new links verified] / [# broken fixed] / [# spot-checked]
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
- **Analytics**: Run `/feedback-session` weekly (or when new GA4 CSV exports are dropped in `.feedback/reports/`) to analyze traffic, search queries, feature usage, and generate optimization strategies.
