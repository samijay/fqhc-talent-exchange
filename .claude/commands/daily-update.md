# Daily Update — Intelligence + Enrichment + Quality

Run the comprehensive daily update pipeline. **Target time: under 30 minutes.**

Three phases every day:
1. **Intelligence** (Steps 1–5) — Scan for news, policy, jobs, compliance, AI, regional developments
2. **Enrichment** (Step 6) — Improve the platform's data quality on a daily rotation
3. **Quality + Signal** (Steps 7–9) — TypeScript check, stats drift, newsletter prep, shareable insight

---

## PHASE 1: INTELLIGENCE

### Step 1: WARN Act Check + Job Scan (single bash block)

Run WARN check and all 4 job APIs in a single bash call:

```bash
# WARN Act check
curl -sL "https://edd.ca.gov/siteassets/files/jobs_and_training/warn/warn_report1.xlsx" -o /tmp/warn-report.xlsx && python3 -c "
import openpyxl
wb = openpyxl.load_workbook('/tmp/warn-report.xlsx')
ws = wb['Detailed WARN Report ']
rows = list(ws.iter_rows(min_row=3, values_only=True))
hc = [r for r in rows if r[8] and '62' in str(r[8]).lower()]
print(f'WARN: {len(rows)} total, {len(hc)} healthcare')
for r in hc[-10:]:
    print(f'  {r[4]} | {r[6]} employees | {r[0]} | {r[8]}')
"

# Job counts (all 4 in parallel)
curl -s -X POST 'https://altamed.wd1.myworkdayjobs.com/wday/cxs/altamed/Careers/jobs' -H 'Content-Type: application/json' -d '{"appliedFacets":{},"limit":1,"offset":0,"searchText":""}' | python3 -c "import sys,json; print('AltaMed:', json.load(sys.stdin).get('total'))" &
curl -s -X POST 'https://fhcsd.wd1.myworkdayjobs.com/wday/cxs/fhcsd/MAIN/jobs' -H 'Content-Type: application/json' -d '{"appliedFacets":{},"limit":1,"offset":0,"searchText":""}' | python3 -c "import sys,json; print('FHCSD:', json.load(sys.stdin).get('total'))" &
curl -s 'https://api.lever.co/v0/postings/ahschc?mode=json' | python3 -c "import sys,json; print('AHS:', len(json.load(sys.stdin)))" &
wait
```

For La Clinica, use WebFetch on `laclinica.hrmdirect.com/employment/job-openings.php` and count job listings.

Cross-reference WARN healthcare entries against `california-fqhcs.ts` slugs. **Only flag actual FQHC filings.**

---

### Step 2: Launch 9 Intelligence Scan Agents (all in parallel)

Launch ALL 9 of these as background agents simultaneously. Each agent does web searches and returns findings — no file editing.

**Agent 1 — Legislative & Policy Scan** (4 searches):
- `"FQHC" OR "community health center" funding legislation [month] [year]`
- `California Medi-Cal FQHC reimbursement OR funding [month] [year]`
- `Medicaid cuts FQHC impact [year] community health centers`
- `California county health department FQHC layoffs OR cuts OR funding [month] [year]`

**Agent 2 — News & Intelligence Scan** (5 searches):
- `California FQHC news community health center [month] [year]`
- `"health center" OR "FQHC" merger acquisition California [year]`
- `undocumented immigrant healthcare California FQHC [month] [year]`
- `FQHC patient story community health center California [year]`
- `NACHC CPCA advocacy FQHC coalition California [month] [year]`

**Agent 3 — AI & Innovation Scan** (3 searches):
- `FQHC "artificial intelligence" OR "AI" implementation community health center [month] [year]`
- `NACHC technology AI EHR community health center [year]`
- `"ambient documentation" OR "AI scribe" OR "clinical documentation" FQHC OR "community health center" [month] [year]`

**Agent 4 — Cultural & Movement Scan** (2 searches):
- `FQHC "cultural competency" OR "cultural humility" OR "CLAS standards" community health [month] [year]`
- `California "community health" equity CHW promotora workforce diversity [month] [year]`

**Agent 5 — Regional News Scan** (6 searches, 2 regions per rotation):

| Day | Region A | Region B |
|-----|----------|----------|
| Monday | Los Angeles | Sacramento |
| Tuesday | Bay Area | Central Valley |
| Wednesday | San Diego | Inland Empire |
| Thursday | Los Angeles | Central Coast |
| Friday | Bay Area | North State + North Coast |

3 queries per region using data from `src/lib/regional-news-sources.ts`:
- Local government & budget cuts
- FQHC/clinic-specific news
- Health system disruption

**Agent 6 — Compliance & Enforcement Scan** (5 searches):
- `HRSA FQHC "operational site visit" OR "conditions of award" OR "progressive action" enforcement [month] [year]`
- `OCR HIPAA breach settlement "community health center" OR FQHC [month] [year]`
- `OIG "false claims act" OR "civil monetary penalty" FQHC OR "health center" billing fraud [month] [year]`
- `DHCS California FQHC audit OR "billing compliance" OR "Medi-Cal fraud" [month] [year]`
- `340B HRSA audit OR "contract pharmacy" violation OR "manufacturer restriction" FQHC [month] [year]`

**Agent 7 — Tech Stack Vendor Scan** (3 searches):
- `FQHC healthcare technology vendor [year]`
- `community health center EHR implementation [year]`
- `NACHC technology partnership discount [year]`

**Agent 8 — Advocacy & Positive Momentum Scan** (3 searches):
- `California FQHC "coalition" OR "advocacy" OR "ballot" OR "initiative" protecting funding [month] [year]`
- `community health center "lawsuit" OR "legal action" OR "legislation" protecting 340B OR Medicaid [month] [year]`
- `SEIU OR NACHC OR CPCA OR CCALAC FQHC advocacy California [month] [year]`

Tell this agent to read `fqhc-advocacy-tracker.ts` FIRST. For each finding, check against existing `ADVOCACY_ACTIONS`. If new, report with follow-up date and status. If an existing item has a known outcome or status change, flag it for update.

**Agent 9 — Labor Relations & Union Activity Scan** (4 searches):
- `SEIU FQHC community clinic California union [month] [year]`
- `NUHW "community health" OR FQHC organizing California [month] [year]`
- `NLRB "community health center" OR FQHC complaint OR organizing OR election California [month] [year]`
- `California "community clinic" contract ratification OR strike OR bargaining [month] [year]`

Tell this agent to read `fqhc-labor-relations.ts` AND `union-data.ts` FIRST. For each finding:
- If it's a new labor case (organizing drive, NLRB complaint, contract negotiation, strike, arbitration), report with: parties, status, posture (adversarial→partnership), next milestone, affected FQHC slugs
- If an existing labor case has a status change (e.g., hearing date, ruling, contract ratified), flag for update
- If a union profile needs updating (new FQHC organized, membership count change, leadership change), flag it
- Report any new SEIU-UHW ballot initiative developments (signature counts, qualification status, opposition actions)

#### Agent Instructions (include in every agent prompt):

Tell each agent:
- Use WebSearch for all queries
- Filter for genuinely new findings from the current month
- For each significant finding, report: headline, source URL, date, impact on FQHCs, category, impact level (critical/high/medium/low)
- Do NOT edit any files — research only
- Do NOT report items already tracked (check against the current data by reading the relevant .ts file first)

---

### Step 3: Process Agent Results & Apply Changes

As each agent reports back, process findings:

#### Decision Rules for New Intel Items:

| Impact Level | Criteria |
|---|---|
| **Critical** | Direct revenue impact >$10M, >200 workers displaced, legislative passage |
| **High** | Named FQHC affected, significant policy change, >50 workers |
| **Medium** | Industry trend, no specific FQHC named, emerging issue |
| **Low** | Background context, general industry news |

#### Where to Add Findings:

- **`fqhc-news-intel.ts` INTEL_ITEMS[]** — policy, funding, workforce, M&A, undocumented access, lobbying items
- **`fqhc-ai-tracker.ts` AI_ADOPTION_ITEMS[]** — AI implementation news (NOT FQHC_AI_VENDORS[])
- **`california-fqhc-layoffs.ts`** — named FQHC layoff/closure announcements
- **`funding-impact-data.ts`** — policy with a date, dollar amount, and people affected
- **`fqhc-compliance.ts`** — new enforcement actions or compliance deadlines
- **`fqhc-advocacy-tracker.ts` ADVOCACY_ACTIONS[]** — coalition actions, ballot initiatives, legislation, legal rulings protecting FQHC funding. Include follow-up dates and status tracking.
- **`fqhc-labor-relations.ts` LABOR_CASES[]** — union organizing, NLRB complaints, contract negotiations, strikes, arbitration, ballot measures. Include parties, posture, and next milestone.
- **`union-data.ts` UNION_DIRECTORY[]** — update fqhcsRepresented[], recentNews[], membership counts when new organizing wins, contract ratifications, or leadership changes occur.

**IMPORTANT: Advocacy tracker is a SEPARATE file from the intel feed.** Items can appear in BOTH files — intel feed for the news angle, advocacy tracker for the action/status/follow-up tracking. Always check and update both. Also update `ADVOCACY_LAST_UPDATED` when adding items. Review existing advocacy items for status changes (e.g., pending → active, active → passed).

Every item MUST have a verified primary source URL. Include bilingual headline/summary (EN + ES).

---

### Step 4: Link QC + Banner Check

1. For each new item added, verify `sourceUrl` loads (use curl or WebFetch)
2. Spot-check 5 random existing source URLs
3. Review `AnnouncementBar.tsx` — update if current headline is >7 days old or a more compelling item exists
4. Keep banner copy under 100 chars, update both EN and ES

---

### Step 5: Apply Stats Updates

1. Update `career-page-config.ts` notes with new job counts and date
2. Update `INTEL_LAST_UPDATED`, `AI_TRACKER_LAST_UPDATED`, and `ADVOCACY_LAST_UPDATED` if items were added to those files
3. Check hardcoded stats in:
   - `src/app/[locale]/demo/page.tsx` — FQHC count
   - `src/app/[locale]/sponsor/page.tsx` — intel count, job count, FQHC count
   - `public/llms.txt` — all stat references

---

## PHASE 2: ENRICHMENT

### Step 6: Daily Enrichment Rotation

| Day | Task |
|-----|------|
| **Monday** | Enrich 3-5 thin FQHC profiles (hrsa-import → hrsa-enriched) |
| **Tuesday** | Test 2 new career page scrapers (expand from 4 → 14+ scrapeable FQHCs) |
| **Wednesday** | Refresh 5 stale Glassdoor ratings |
| **Thursday** | Enrich 3-5 thin FQHC profiles (different batch from Monday) |
| **Friday** | Spot-check 10 source URLs + 5 FQHC websites for link rot |

Launch an enrichment agent for Mon/Thu FQHC profile work. The agent should:
1. Read `california-fqhcs.ts` and find entries with `dataSource: "hrsa-import"` or missing key fields
2. Research each FQHC via web search (official site, Glassdoor, HRSA, Charity Navigator)
3. Return structured data for each FQHC (don't edit files — just report findings)

Then apply the enrichment data to `california-fqhcs.ts` after review.

A profile is "80% complete" when it has: slug, name, location, website, mission OR about, staffCount OR patientCount, 3+ programs, ehr, and either glassdoorRating or qualityScore.

---

## PHASE 3: QUALITY + SIGNAL

### Step 7: TypeScript Check + Stats Count

```bash
cd /Users/jmw/Documents/Claude\ Projects/fqhc-talent-exchange && npx tsc --noEmit && echo "TypeScript: PASS" || echo "TypeScript: FAIL"
echo "Intel items:" && grep -c 'id: "' src/lib/fqhc-news-intel.ts
echo "AI tracker:" && grep -c 'id: "' src/lib/fqhc-ai-tracker.ts
echo "FQHCs:" && grep -c 'slug: "' src/lib/california-fqhcs.ts
echo "Layoffs:" && grep -c 'id: "' src/lib/california-fqhc-layoffs.ts
echo "Advocacy:" && grep -c 'id: "' src/lib/fqhc-advocacy-tracker.ts
```

---

### Step 8: Today's Signal + Newsletter Queue

1. **Today's Signal:** From all findings, write the single most important 2-sentence insight:
   `📰 TODAY'S SIGNAL: [Insight]. [Why it matters for FQHCs.]`

2. **Newsletter tagging:** Tag new items as `intel-brief` (executives), `pulse` (job seekers), or `both`

3. **Blog suggestion:** If 3+ related items accumulated this week, suggest a topic

---

### Step 9: Summary

```
=== DAILY UPDATE [YYYY-MM-DD] ===

📡 INTELLIGENCE
WARN: [count] new FQHC entries (or "None")
Jobs: AltaMed [n], FHCSD [n], AHS [n], La Clinica [n] (total [n], prev [n])
Policy: [# findings] — [one-line each]
Intel: +[n] new items (total [n])
AI: +[n] new items (total [n] adoption + [n] vendors)
Regional: [region1] + [region2] — [# findings]
Compliance: [summary]
Tech Stack: [summary]
Advocacy: +[n] new actions (total [n], [n] active, [n] upcoming follow-ups)
Labor: [summary of union/NLRB/contract developments, or "No new activity"]

🔧 ENRICHMENT ([day]'s rotation)
[What was done]
Progress: [X]/214 FQHCs at 80%+ completeness

✅ QUALITY
TypeScript: [PASS/FAIL]
Link QC: [# verified] / [# broken fixed] / [# spot-checked]
Stats drift: [any hardcoded values updated, or "None"]
Banner: [current/updated]

📰 TODAY'S SIGNAL
[2-sentence shareable insight]

📬 NEWSLETTER QUEUE (this week)
Intel Brief: [n] items queued
The Pulse: [n] items queued
Blog suggestion: [topic or "None"]
```

---

## Notes

- **Run all 9 intelligence agents in parallel** (single message with 9 Agent tool calls) for speed
- Agents do research only — all file edits happen in the main thread after review
- Never remove existing entries — only append
- If any step fails, report and continue
- Policy findings that aren't immediately actionable become newsletter/blog content
