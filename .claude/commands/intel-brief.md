# FQHC Intel Brief Generator

Generate a weekly intelligence brief for the FQHC newsletter. Synthesizes federal legislation, state policy, local responses, workforce data, and market intelligence into a newsletter-ready document with **primary source links for every claim**.

**Target time: 15-20 minutes.**

---

## Critical Rule: Primary Sources

**Every single insight, statistic, and claim MUST include a primary source link.** No orphan facts. No unsourced assertions. Format:

```
[Claim or insight] — [Source Name](URL)
```

When multiple sources confirm the same fact, list the most authoritative (government > academic > industry > news).

### Source Hierarchy:
1. **Government primary** (Congress.gov, CBO, CMS, HRSA, DHCS, CA LAO) — strongest
2. **Policy organizations** (NACHC, KFF, CHCF, CPCA) — very strong
3. **Industry publications** (Fierce Healthcare, Becker's, Modern Healthcare) — strong
4. **News organizations** (CalMatters, LA Times, SF Chronicle) — good
5. **Analysis/consulting** (Synergy Billing, FQHC Associates, community blogs) — supporting

---

## Step 1: Gather Raw Intelligence

Run `/scan-policy` first (or use findings from today's `/daily-update` Step 3) to collect the raw intelligence. If `/scan-policy` hasn't been run recently, run these 6 searches in parallel:

1. `NACHC community health center [current month] [year]`
2. `FQHC federal funding legislation [current month] [year]`
3. `California Medi-Cal FQHC [current month] [year]`
4. `Medicaid cuts community health center [year]`
5. `California county health FQHC layoffs cuts [current month] [year]`
6. `community health center workforce hiring trends [year]`

---

## Step 2: Pull Internal Data

Read these files to cross-reference with external intelligence:

1. `src/lib/career-page-config.ts` — latest job counts from 4 API FQHCs
2. `src/lib/california-fqhc-layoffs.ts` — current layoff tracker data
3. `src/lib/funding-impact-data.ts` — policy timeline and upcoming deadlines
4. `src/lib/market-intelligence.ts` — use `getMarketOverview()` data shape for stats

Current known stats (update from files):
- **Jobs tracked:** 588 across 4 API FQHCs (AltaMed 236, FHCSD 156, La Clinica 174, AHS 22)
- **Static listings:** 177+ in fqhc-job-listings.ts
- **FQHCs in directory:** 220
- **Layoffs tracked:** 15 events, 2,618+ workers
- **Regions:** 9 California regions
- **Roles:** 30+

---

## Step 3: Write the Intel Brief

Use this exact template. Fill every section. **Every bullet must end with a source link.**

```markdown
# FQHC Intel Brief
## Week of [Date Range]

*Strategic intelligence for community health center leaders in California.*
*Published by [FQHC Talent Exchange](https://www.fqhctalent.com)*

---

### RED FLAGS

Items requiring immediate attention from FQHC leadership.

- **[Headline]** — [1-2 sentence summary]. [Source](URL)
- **[Headline]** — [1-2 sentence summary]. [Source](URL)

---

### FEDERAL POLICY

What's happening in Washington that affects FQHCs.

**[Topic 1: Headline]**
[2-3 sentence analysis of what happened, what it means, what to do about it.]

- Key fact: [specific data point] — [Source](URL)
- Key fact: [specific data point] — [Source](URL)
- **What this means for your FQHC:** [1 sentence operational takeaway]

**[Topic 2: Headline]**
[Same format]

Sources:
- [Source Name 1](URL)
- [Source Name 2](URL)

---

### CALIFORNIA STATE

Medi-Cal, CalAIM, provider payments, and state budget.

**[Topic 1: Headline]**
[2-3 sentence analysis.]

- Key fact: [data point] — [Source](URL)
- **What this means for your FQHC:** [1 sentence]

**[Topic 2: Headline]**
[Same format]

Sources:
- [Source Name 1](URL)
- [Source Name 2](URL)

---

### LOCAL & COUNTY

County-level responses, local FQHC news, board actions.

- **[County/City]:** [What happened] — [Source](URL)
- **[County/City]:** [What happened] — [Source](URL)

---

### WORKFORCE SIGNALS

What our data shows about FQHC hiring and displacement.

**Hiring Pulse** (from live API scans)
| FQHC | Open Positions | Change | Source |
|-------|---------------|--------|--------|
| AltaMed | [n] | [+/-n] | [Workday](https://altamed.wd1.myworkdayjobs.com/Careers) |
| FHCSD | [n] | [+/-n] | [Workday](https://fhcsd.wd1.myworkdayjobs.com/MAIN) |
| La Clinica | [n] | [+/-n] | [HRMDirect](http://laclinica.hrmdirect.com/employment/job-openings.php) |
| AHS | [n] | [+/-n] | [Lever](https://jobs.lever.co/ahschc) |
| **Total** | **[n]** | **[+/-n]** | |

**Hot Roles This Week:** [top 3 roles by demand]
**Displacement Watch:** [any new layoff filings or FQHC restructuring news]

---

### POLICY CALENDAR — NEXT 90 DAYS

| Date | Event | Impact | Status | Source |
|------|-------|--------|--------|--------|
| [Date] | [Event] | [Who's affected] | [Status] | [Source](URL) |
| [Date] | [Event] | [Who's affected] | [Status] | [Source](URL) |

---

### BY THE NUMBERS

Key statistics this week, all sourced.

| Metric | Value | Source |
|--------|-------|--------|
| CA FQHCs tracked | 220 | [FQHC Talent Exchange](https://www.fqhctalent.com/directory) |
| Live open positions | [n] | Our API scans |
| Workers displaced (2025-26) | 2,618+ | [Our Layoff Tracker](https://www.fqhctalent.com/layoffs) |
| CHCF funding (FY 2026) | $4.6B | [NACHC](URL) |
| Medi-Cal enrollees at risk | 3.4M | [CA Governor's Office](URL) |
| CHC program-wide margin (2025) | -2% | [FQHC Associates](URL) |
| Federal funding per patient (inflation-adjusted) | $106.83 | [Advocates for Community Health](URL) |
| [Other relevant stat] | [Value] | [Source](URL) |

---

### WHAT TO DO THIS WEEK

**If you're hiring:**
- [Specific action + why, based on this week's intel]
- [Specific action]

**If you're facing cuts:**
- [Specific action + why]
- [Specific action]

**If you're a displaced worker:**
- [Specific action + link to our tools]
- [Specific action]

---

### SOURCES INDEX

Complete list of all sources cited in this brief, organized by category.

**Federal Government:**
- [Source Name](URL) — [What we used it for]

**State Government:**
- [Source Name](URL) — [What we used it for]

**Policy Organizations:**
- [Source Name](URL) — [What we used it for]

**Industry Publications:**
- [Source Name](URL) — [What we used it for]

**News:**
- [Source Name](URL) — [What we used it for]

**Our Data:**
- [FQHC Directory](https://www.fqhctalent.com/directory) — 220 CA FQHCs
- [Job Board](https://www.fqhctalent.com/jobs) — 177+ curated listings
- [Layoff Tracker](https://www.fqhctalent.com/layoffs) — 15 events, 2,618+ workers
- [Market Insights](https://www.fqhctalent.com/insights) — Regional snapshots, salary data
- [Funding Impact Tracker](https://www.fqhctalent.com/funding-impact) — H.R. 1 policy timeline

---

*This brief is compiled from public sources and our proprietary FQHC data.*
*Subscribe at [fqhctalent.com](https://www.fqhctalent.com) for weekly updates.*
*Questions? hello@fqhctalent.com*
```

---

## Step 4: Create Candidate Version (The Pulse)

Take the intel brief above and create a shorter, candidate-friendly version:

```markdown
# The Pulse — FQHC Career Update
## Week of [Date Range]

**What's happening in community health this week — and what it means for your job search.**

### THE BIG PICTURE
[2-3 sentences translating the top policy stories into plain language that matters to job seekers]

### WHERE THE JOBS ARE
| FQHC | Open Positions | Region |
|-------|---------------|--------|
| [FQHC] | [n] | [Region] |

**Hot roles:** [top 3]
**Bilingual premium:** [stat if available]

### WHAT'S CHANGING
- [Policy change in plain language] — what it means for you: [impact]
- [Policy change] — what it means for you: [impact]

### YOUR MOVE THIS WEEK
1. [Action + link to our tool]
2. [Action + link]
3. [Action + link]

### SOURCES
- [Source 1](URL)
- [Source 2](URL)
```

---

## Step 5: Review & Output

1. Print the full Intel Brief (employer version)
2. Print the Pulse (candidate version)
3. Flag any findings that need code changes (policy timeline updates, new layoff entries)
4. Suggest blog topics generated from this week's intelligence

**Do NOT make code changes without approval.** The intel brief is a content product, not a code task.

---

## Notes

- The Intel Brief is the **employer-facing** product. Position it as premium intelligence.
- The Pulse is the **candidate-facing** product. Keep it warm, actionable, jargon-free.
- Primary source links are NON-NEGOTIABLE. This is what separates us from SEO slop.
- Cross-referencing external news against our own data (directory, jobs, layoffs) is the unique value. Always do it.
- Run this weekly (Tuesdays, so the brief goes out Wednesday morning).
- The Sources Index at the bottom is a trust signal — it shows we do real research.
- Over time, this brief becomes the most valuable thing we produce. FQHC leaders will subscribe because nobody else synthesizes all of this in one place.
