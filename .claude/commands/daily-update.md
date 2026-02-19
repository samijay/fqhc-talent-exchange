# Daily Content Update

Run the morning content update pipeline for FQHC Talent Exchange. This checks for new layoffs, scans FQHC career pages for jobs, and optionally drafts a blog article.

**Target time: under 30 minutes total.**

---

## Step 1: WARN Act Layoff Check

Follow the full instructions in `.claude/commands/update-layoffs.md`:

1. Download the CA EDD WARN XLSX report
2. Parse and filter for healthcare entries
3. Cross-reference with existing layoff entries and the 90 FQHC directory
4. Present any new entries for review

If no new healthcare WARN filings are found, report "No new WARN filings today" and move on.

**Pause for my review if new entries are found.**

---

## Step 2: FQHC Job Scan

Follow the full instructions in `.claude/commands/scrape-jobs.md`:

1. Load career page config and determine today's batch (10 FQHCs)
2. Fetch and scan each career page
3. Generate new FQHCJobListing objects for any new postings
4. Update career page config with lastChecked dates

If no new jobs are found, report which FQHCs were checked and move on.

**Pause for my review if new listings are found.**

---

## Step 3: Blog Check (Optional)

Only run this step if:
- Today is **Monday** (weekly blog cadence), OR
- I specifically ask for a blog article

If running, follow `.claude/commands/draft-blog.md`:
1. Analyze data for topic ideas
2. Suggest 3 topics
3. Draft the selected article

If not running, skip this step.

---

## Step 4: Summary Report

After all steps, provide a summary:

```
=== DAILY UPDATE SUMMARY ===

WARN Act Check:
- New entries: X (or "None found")
- Organizations: [list if any]
- Workers affected: X

Job Scan:
- FQHCs checked: X of Y
- Reachable pages: X
- New listings found: X
- Next batch: [list next 10 FQHCs]

Blog:
- [Skipped — not Monday] or [Article drafted: "Title"]

Files Modified:
- [list all changed files]

Next Steps:
- Run: npm run build
- Commit: git add . && git commit -m "Daily content update YYYY-MM-DD"
- Deploy: git push (Vercel auto-deploys)
```

---

## Step 5: Update Dates

After all content changes are approved and applied, update the "last updated" dates across the codebase:

### Always update (every daily update):
1. **`src/lib/california-fqhc-layoffs.ts`** — Update `// Last updated:` comment (line 4) to today's date
2. **`src/lib/career-page-config.ts`** — Update `// Last updated:` comment (line 4) to today's date
3. **`CLAUDE.md`** — Update the **Session Log** table with today's date and a 2-3 line summary of what was done
4. **`CLAUDE.md`** — Update the **Current Context** section with current data counts (jobs, FQHCs, layoff entries, etc.)

### Update if data changed:
5. **`src/lib/fqhc-job-listings.ts`** — If new jobs were added, update any `// Last updated:` comment
6. **`src/lib/funding-impact-data.ts`** — If funding data changed, update `// Last updated:` comment

### Automatically derived (no manual update needed):
- **Layoff tracker page** (`/layoffs`) — The "Last updated" badge is **automatically derived** from the most recent `dateAnnounced` in the layoff data array. Adding new entries will automatically update the displayed date.

---

## Notes

- If any step fails (WARN download error, career page timeout, etc.), report the error and continue to the next step. Don't let one failure block the whole routine.
- Always pause for review before writing to any .ts files.
- Never remove or modify existing entries — only append new ones.
- All new content must be bilingual (EN/ES) where applicable.
