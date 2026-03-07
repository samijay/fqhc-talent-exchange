# Feedback Session — Analytics Review & Optimization

Run this command to analyze GA4 reports and generate insights, strategy, and implementation tasks.

## Prerequisites

Drop GA4 CSV exports into `.feedback/reports/` before running. Expected files:
- Pages & Screens report
- Traffic Acquisition report
- User Acquisition report
- Landing Pages report
- Events report
- Search Console Queries
- Organic Search Traffic (Landing page + query)
- Engagement/Retention Overview
- Traffic Overview
- Reports Snapshot

## Step 1: Inventory Reports

1. List all CSV files in `.feedback/reports/`
2. Identify which reports are new (not yet analyzed)
3. Read each new report file

## Step 2: Analyze Data

For each report, extract and summarize:

### Pages & Screens
- **Top 20 pages** by views — identify which content resonates
- **Engagement time** per page — find high-value vs bounce pages
- **Trend**: which pages are growing/declining

### Traffic Acquisition
- **Channel breakdown**: organic, direct, referral, social
- **Engagement rate by channel** — quality of traffic
- **Session duration** — which channels bring engaged users

### Search Console Queries
- **Top queries** — what people search to find us
- **Impressions vs clicks** — CTR optimization opportunities
- **Position** — keywords where we're close to page 1 (positions 8-20)
- **Content gaps** — queries we rank for but have no dedicated content

### Events
- **Custom event counts** — which features are actually used
- **Conversion funnel** — newsletter signup, feedback, assessment completion rates
- **Feature adoption** — which tools get traffic but low engagement

### Landing Pages
- **Top entry points** — first pages visitors see
- **Bounce rate** — which landing pages lose visitors
- **Cross-page comparison** — blog vs tools vs strategy pages

## Step 3: Generate Insights

Write a dated insights document to `.feedback/insights/insights-YYYY-MM-DD.md` with:

```markdown
# Analytics Insights — YYYY-MM-DD

## Key Metrics Summary
| Metric | Value | Trend |
|--------|-------|-------|

## Top Findings
1. [Most impactful insight]
2. [Second insight]
3. [Third insight]

## Content Performance
- **Winners**: Pages with high engagement
- **Opportunities**: Pages with traffic but low engagement
- **Gaps**: Topics we should create content for

## SEO Insights
- **Ranking keywords**: What's working
- **Quick wins**: Keywords positions 8-20 (close to page 1)
- **Content gaps**: Search queries without matching content

## Feature Usage
- **Most used tools**: Based on custom events
- **Underused features**: Low event counts vs page views
- **Conversion rates**: Form completion percentages

## User Behavior
- **Typical journey**: Most common page sequences
- **Drop-off points**: Where users leave
- **Regional patterns**: If any geo data available
```

## Step 4: Generate Strategy

Write a dated strategy document to `.feedback/strategy/strategy-YYYY-MM-DD.md` with:

```markdown
# Optimization Strategy — YYYY-MM-DD

## Priority Actions (This Week)
1. [Highest impact, lowest effort]
2. ...

## Content Strategy
- **Create**: New pages/content based on search gaps
- **Optimize**: Improve underperforming pages
- **Promote**: Amplify top-performing content

## SEO Quick Wins
- Title/meta improvements for specific pages
- Internal linking opportunities
- Schema markup additions

## Feature Improvements
- Based on usage data, what to improve/simplify
- Conversion rate optimization for forms

## Implementation Checklist
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3
```

## Step 5: Update Session Log

Append to `.feedback/SESSION_LOG.md`:
- Date and reports analyzed
- Key insights summary (3-5 bullets)
- Actions taken / planned
- Link to insights and strategy documents

## Step 6: Update ROADMAP.md

Add any new feature ideas or optimization tasks to ROADMAP.md backlog with the `[Analytics]` tag.

## Step 7: Integration with Daily Update

After analysis, suggest any changes to:
- Content strategy for `/draft-blog`
- Keywords to target in `/scan-policy`
- Pages to monitor in next session
