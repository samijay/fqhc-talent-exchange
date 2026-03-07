# Weekly Roundup

Compile newsletter-ready content for the FQHC Intel Brief (employer) and The Pulse (candidate). Run every Friday. **Target time: 20-30 minutes.**

**Site context:** FQHC Talent Exchange — California's FQHC Strategic Intelligence Platform at fqhctalent.com. This roundup feeds two newsletter tracks: the Intel Brief (FQHC executives and HR directors) and The Pulse (job seekers and displaced workers).

**Today's date:** Use the actual current date throughout. All "past 7 days" and "next 30/60 days" references are relative to today.

---

## Step 1: Look Back — This Week's Activity (5–10 min)

Read the three main intelligence data files and identify what was added in the past 7 days.

### 1a. Intel Items

Read `src/lib/fqhc-news-intel.ts`. For every item in the `INTEL_ITEMS` array (or equivalent export), check the `date` field. Collect all items where the date falls within the past 7 days.

For the items found, summarize:
- Total count added this week
- Categories represented (e.g., legislation, workforce, funding, undocumented-access)
- The 2–3 highest-impact headlines (impactLevel: "critical" first, then "high")

If no items were added in the past 7 days, note that and flag it as a gap to address before sending the newsletter.

### 1b. Layoff Entries

Read `src/lib/california-fqhc-layoffs.ts`. Look at the `date` field on each `LayoffEntry`. Report any entries added in the past 7 days:
- Organization name, region, workers affected, layoff type (reduction/closure/furlough)
- If none: "No new layoff entries this week."

### 1c. AI Tracker Items

Read `src/lib/fqhc-ai-tracker.ts`. Check the `date` field on each `AIAdoptionItem`. Report any items added in the past 7 days:
- Organization, technology/vendor, adoption stage, one-line summary
- If none: "No new AI tracker items this week."

### 1d. Git Activity

Run this command to see what was shipped this week:

```bash
git -C "/path/to/repo" log --oneline --since="7 days ago"
```

Summarize any new pages, features, or data files mentioned in commit messages. List as: "Shipped: [feature name] ([commit hash])"

### Step 1 Output

Print a clean summary block:

```
## This Week's Activity

Intel items added: X
  Categories: [list]
  Top headlines:
    - [headline 1] (impactLevel: critical/high, date: YYYY-MM-DD)
    - [headline 2]
    - [headline 3 if applicable]

Layoff entries added: X
  [org, region, workers] or "None"

AI tracker items added: X
  [org, tech, stage] or "None"

Features shipped:
  - [feature] ([hash])
  - [feature] ([hash]) or "None"
```

---

## Step 2: Look Forward — Upcoming Deadlines

### 2a. Funding Cliffs

Read `src/lib/market-intelligence.ts`. Call or inspect the `getFundingCliffs()` function (or the equivalent exported array). Filter for cliffs where the `date` field falls within the next 60 days. For each, record:
- Program name
- Date (and days from today)
- Dollar amount at risk
- Affected region(s)

### 2b. Policy Deadlines

Read `src/lib/funding-impact-data.ts`. Look for any `date` or `deadline` fields in the policy timeline or implementation milestones. Report any that fall within the next 60 days.

### Step 2 Output

```
## Upcoming Watch Dates (Next 60 Days)

1. [Program/Policy] — [Date] ([X days away]) — $[amount] at risk
2. [Program/Policy] — [Date] ([X days away]) — [impact summary]
3. [Program/Policy] — [Date] ([X days away]) — [impact summary]
```

Pick the top 3 most urgent/highest-dollar items for the newsletter. These become the "Key Dates" section in the Intel Brief.

---

## Step 3: Job Market Pulse

### 3a. Static Job Listings

Read `src/lib/fqhc-job-listings.ts`. Count total listings. Then count by role or role category and identify the top 5 most-posted roles. Also note which regions have the most listings.

```
Total listings in data file: X
Top 5 roles:
  1. [role] — X listings
  2. [role] — X listings
  3. [role] — X listings
  4. [role] — X listings
  5. [role] — X listings
Top region by listing count: [region]
```

### 3b. Live API Job Counts

Run all 4 FQHC job APIs in parallel to get current live counts:

```bash
# AltaMed (Workday)
curl -s -X POST 'https://altamed.wd1.myworkdayjobs.com/wday/cxs/altamed/Careers/jobs' \
  -H 'Content-Type: application/json' \
  -d '{"appliedFacets":{},"limit":20,"offset":0,"searchText":""}' \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print('AltaMed:', d.get('total'))"

# FHCSD (Workday)
curl -s -X POST 'https://fhcsd.wd1.myworkdayjobs.com/wday/cxs/fhcsd/MAIN/jobs' \
  -H 'Content-Type: application/json' \
  -d '{"appliedFacets":{},"limit":20,"offset":0,"searchText":""}' \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print('FHCSD:', d.get('total'))"

# Asian Health Services (Lever)
curl -s 'https://api.lever.co/v0/postings/ahschc?mode=json' \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print('AHS:', len(d))"

# La Clinica (HRMDirect) — use WebFetch on:
# https://laclinica.hrmdirect.com/employment/job-openings.php
# Count the number of listed positions in the returned HTML.
```

Compare to previous week's counts (check `src/lib/career-page-config.ts` notes). Report net change for each org and the combined total. Flag any org with a swing of more than 10 in either direction.

```
Live API counts this week:
  AltaMed:   X  (prev: X, change: ±X)
  FHCSD:     X  (prev: X, change: ±X)
  AHS:       X  (prev: X, change: ±X)
  La Clinica: X  (prev: X, change: ±X)
  Combined:  X  (prev: X, change: ±X)

Notable: [any org with >10 swing, or "all stable"]
```

---

## Step 4: Site Intelligence Highlights

### 4a. AI Tracker — Most Recent 3 Items

Read `src/lib/fqhc-ai-tracker.ts`. Sort by `date` descending and pull the 3 most recent items. For each:
- Organization, technology/vendor, adoption stage (piloting/implementing/scaling/researching)
- One-line outcome or finding

### 4b. High-Impact Intel — This Week

From the intel items identified in Step 1a, pull all items with `impactLevel: "critical"` or `impactLevel: "high"`. These are the anchor stories for the Intel Brief.

If no "critical" or "high" items were added this week, pull the 2 most recent "critical" or "high" items from any date to keep the newsletter grounded.

### 4c. Featured Masterclass

Read `src/lib/fqhc-masterclasses.ts`. Based on this week's dominant theme (e.g., if the top story is about funding cuts, pick a Financial Survival module; if workforce news, pick a Leadership module), select the single most relevant masterclass. Record:
- Title (EN)
- Category
- The `whyNow` field (this is the newsletter hook)
- Internal URL path (e.g., `/strategy/masterclass`)

---

## Step 5: Web Search — Breaking Developments

Run these 5 searches in parallel. Use the actual current month and year in each query. Look for items published in the past 7 days only — skip older articles unless they are primary source policy documents.

1. `FQHC California funding cuts Medicaid 2026 site:calmatters.org OR site:chcf.org OR site:nachc.org`
2. `"community health center" layoffs OR closures California 2026`
3. `California Medi-Cal CalAIM FQHC policy [current month] [current year]`
4. `FQHC AI technology adoption ambient documentation 2026`
5. `H.R. 1 Medicaid FQHC impact 2026`

### Source Hierarchy (same as `/intel-brief`):
1. Government primary (Congress.gov, CBO, CMS, HRSA, DHCS, CA LAO)
2. Policy organizations (NACHC, KFF, CHCF, CPCA)
3. Industry publications (Fierce Healthcare, Becker's, Modern Healthcare)
4. News organizations (CalMatters, LA Times, SF Chronicle)
5. Analysis/consulting (FQHC Associates, community blogs) — supporting only

### For each new finding not already in `fqhc-news-intel.ts`:

Generate an `IntelItem` using this exact format so it can be pasted directly into the file:

```typescript
{
  id: "intel-[YYYY-MM-DD]-[short-slug]",
  date: "YYYY-MM-DD",
  category: "legislation" | "lobbying" | "patient-story" | "merger-acquisition" | "funding" | "workforce" | "undocumented-access" | "change-management",
  impactLevel: "critical" | "high" | "medium" | "low",
  headline: {
    en: "English headline (max 12 words)",
    es: "Spanish headline (max 12 words)"
  },
  summary: {
    en: "2–3 sentence English summary with specific numbers and named orgs where possible.",
    es: "2–3 sentence Spanish summary."
  },
  sourceUrl: "https://...",  // Primary source only — government or policy org preferred
  sourceName: "Source Name",
  affectedRegions: ["LA", "Bay Area", "Statewide"],  // from: LA, San Diego, Bay Area, Sacramento, Central Valley, Inland Empire, Central Coast, North State, North Coast, Statewide, Federal
  affectedOrgSlugs: [],  // FQHC slugs from california-fqhcs.ts if applicable, else []
  tags: ["tag1", "tag2"]  // 2–4 lowercase tags
},
```

Only generate IntelItems for findings with genuine FQHC workforce or funding implications. Skip general healthcare news with no direct FQHC angle.

---

## Step 6: Draft Intel Brief Content (Employer Newsletter)

Using everything gathered above, draft the Intel Brief email section content. This goes to FQHC executives and HR directors. Tone: direct, data-driven, no fluff. Primary source links required for every factual claim.

```
## INTEL BRIEF — Week of [Monday date] – [Friday date, current week]

### Top Story
[1–2 sentence executive summary of the single most important development this week.
Include the dollar figure or scale if applicable. Link to primary source.]

Source: [Source Name](URL)

---

### Policy & Funding Watch
- [Claim with specific number or named org.] — [Source Name](URL)
- [Claim with specific number or named org.] — [Source Name](URL)
- [Claim with specific number or named org.] — [Source Name](URL)

---

### FQHC Workforce
- [Layoff, hiring surge, or workforce trend with org name and count.] — [Source Name](URL)
- [Second workforce item.] — [Source Name](URL)
[Add third bullet only if there is a third distinct, sourced item.]

---

### AI & Technology
- [AI adoption item: org, tool, outcome.] — [Source Name](URL)
[Add second bullet only if there is a second distinct, sourced item.]

---

### Key Dates — Next 30 Days
- [Date] ([X days): [Program/Policy] — $[amount] or [impact scale]
- [Date] ([X days): [Program/Policy] — [impact]
- [Date] ([X days): [Program/Policy] — [impact]

---

### Featured Resource
**[Masterclass or Guide Title]**
[1 sentence on why this matters right now, tied to the week's top story.]
Read it: fqhctalent.com[/path]
```

Every bullet point must have a source link. Do not include any claim without one.

---

## Step 7: Draft The Pulse Content (Candidate Newsletter)

Using the job market data from Step 3 and workforce intel from Steps 1 and 5, draft The Pulse email section content. This goes to job seekers and displaced FQHC workers. Tone: warm, practical, actionable.

```
## THE PULSE — Week of [Monday date] – [Friday date, current week]

### Job Market
- [Role] at [Org], [Region] — [1 sentence on why this role is interesting or in high demand right now]
- [Role] at [Org], [Region] — [1 sentence]
- [Role] at [Org], [Region] — [1 sentence]

Browse all listings: fqhctalent.com/jobs

---

### Salary Insight
[Role] in [Region]: P25 $[X] | P50 $[X] | P75 $[X]
[1 sentence context — e.g., "Central Valley salaries for this role run 12% below Bay Area but hiring volume is 3x higher."]

Full salary data: fqhctalent.com/salary-data

---

### Tool Spotlight
**[Tool name — e.g., Career Assessment, Career Roadmap, Certifications Catalog]**
[1–2 sentences on what it does and who it's best for right now.]
Try it free: fqhctalent.com[/path]

---

### Career News
- [Item affecting FQHC workers — funding cut, program expansion, new benefit, layoff. Be specific.] — [Source Name](URL)
- [Second item.] — [Source Name](URL)

---

### This Week's Tip
[1 practical, specific tip for FQHC job seekers. Examples: how to frame ECM experience on a resume, what to say about bilingual skills, when to mention union membership, how to use the NHSC loan repayment program in a negotiation. Keep it under 3 sentences.]
```

---

## Step 8: Output Summary

Print this block at the end to close out the session and generate action items.

```
## Weekly Roundup Complete — [current date]

### This Week
- [X] new intel items added (categories: [list])
- [X] new AI tracker items
- [X] new layoff entries
- Features shipped: [list or "none"]
- Top story: [one-line headline]

### Newsletter Content Ready
- Intel Brief: 6 sections drafted (Top Story, Policy, Workforce, AI, Key Dates, Resource)
- The Pulse: 5 sections drafted (Jobs, Salary, Tool, News, Tip)

### New IntelItems to Add
[If Step 5 generated new IntelItems, paste the TypeScript objects here so they are ready to copy into fqhc-news-intel.ts]

### Action Items
- [ ] Paste [X] new IntelItem(s) into src/lib/fqhc-news-intel.ts
- [ ] Run /intel-brief to finalize and send the Intel Brief
- [ ] Schedule The Pulse send via Resend
- [ ] Update src/lib/career-page-config.ts with this week's live job counts
- [ ] Update ROADMAP.md with any features shipped this week
- [ ] Update CLAUDE.md "Active Priorities" if the strategic focus shifted
```

---

## Notes

- **Do not skip Step 1** even if you think nothing changed — checking the data files takes 2 minutes and prevents sending a newsletter with stale or wrong stats.
- **Primary sources are non-negotiable.** Every Intel Brief bullet needs a URL. If a search result doesn't have a primary source, drop it.
- **The Pulse job picks** should highlight roles from different regions when possible — avoid listing three roles all from the same org.
- **If this is a slow news week** (few new intel items, stable job counts), lean harder on the Step 4 featured masterclass and Step 7 tool spotlight — the resource content is always timely.
- This command feeds `/intel-brief` — run that next to finalize formatting and trigger the Resend batch send.
