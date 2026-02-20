# Daily Content Update

Run the morning content update pipeline. **Target time: under 15 minutes.**

---

## Step 1: WARN Act Check (FQHC-only)

1. Download CA EDD WARN XLSX: `curl -sL "https://edd.ca.gov/siteassets/files/jobs_and_training/warn/warn_report1.xlsx" -o /tmp/warn-report.xlsx`
2. Parse with Python/openpyxl — headers are in row 2, data starts row 3
3. Filter for healthcare entries (NAICS 621/622/623 or healthcare keywords in company name)
4. **Only flag entries that are actual FQHCs** — cross-reference against our 90-FQHC directory in `california-fqhcs.ts`
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

Report counts and compare to previous. Only pause if significant changes (>10 net new).

---

## Step 3: Blog (Mondays only)

Skip unless today is Monday or specifically requested.

---

## Step 4: Apply Changes + Summary

1. Update `california-fqhc-layoffs.ts` comment date to today
2. Update `career-page-config.ts` comment date to today
3. Update CLAUDE.md Session Log with today's summary
4. Run `npm run build` to verify
5. Print summary:

```
=== DAILY UPDATE [YYYY-MM-DD] ===
WARN: [count] new FQHC entries (or "None")
Jobs: AltaMed [n], FHCSD [n], AHS [n], La Clinica [n] (total [n], prev [n])
Blog: [Skipped] or [Drafted: "Title"]
Build: [PASS/FAIL]
```

---

## Notes

- **Speed over completeness** — check the 4 API FQHCs only. Save WebFetch scraping for weekly deep-dives.
- Layoff tracker page date is auto-derived from data — no manual update needed.
- Never remove existing entries — only append.
- If any step fails, report and continue.
