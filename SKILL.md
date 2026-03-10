---
name: paper-reading-workflow
description: Structured workflows for reading research papers and producing reusable outputs. Use when the task is either (1) single-paper deep reading from a title, arXiv link, or PDF file, or (2) daily paper scanning that produces a brief plus a full report. Supports optional Notion sync and optional research-log recording. Do not use for retroactive repair of already-uploaded Markdown reports.
---

# paper-reading-workflow

Use this skill for two workflows only: single-paper deep reading and daily paper scanning.

## Workflow selection

- If the input is a **paper title**, **arXiv link**, or **PDF file**, run the **single-paper deep reading workflow**.
- If the input asks for **recent papers**, **topic-based scanning**, **daily briefings**, or **brief + full report generation**, run the **daily paper scanning workflow**.
- Do **not** use this skill for repairing previously uploaded Markdown/Notion pages.

## Single-paper deep reading workflow

1. Obtain the paper content from the title, arXiv link, or PDF file.
2. Determine whether the report is based on:
   - the full paper, or
   - only the abstract / limited visible content.
3. State that limitation explicitly when full text is unavailable.
4. Produce the report using `references/deepread-template.md`.
5. If the user wants external sync, follow `references/notion-sync-guide.md`.
6. If the user wants long-term notes, follow `references/research-log-guide.md`.

### Non-negotiable rules

- Do not invent methods, experiments, ablations, or metrics that are not visible in the paper.
- If you only have the abstract, say so clearly.
- Prefer structured output over free-form summary.
- Include contribution, limitation, and practical insight sections.

## Daily paper scanning workflow

1. Search papers for the requested topic or date range.
2. Deduplicate results by arXiv id first, then normalized title.
3. Produce a short brief using `references/daily-brief-template.md`.
4. Produce a full report using `references/daily-full-report-template.md`.
5. If requested, publish the generated files to GitHub by following `references/github-publish-guide.md`.
6. If requested, sync the full report to Notion by following `references/notion-sync-guide.md`.

### Daily scanning rules

- Keep result counts bounded.
- Brief is for fast triage; full report is for structured archiving.
- If relevance scoring is used, explain the scoring dimensions.
- Prefer reproducible file naming such as `YYYY-MM-DD-brief.md` and `YYYY-MM-DD-full.md`.

## Resource map

- Deep-read structure: `references/deepread-template.md`
- Daily brief structure: `references/daily-brief-template.md`
- Daily full report structure: `references/daily-full-report-template.md`
- Notion sync instructions: `references/notion-sync-guide.md`
- GitHub publishing guidance: `references/github-publish-guide.md`
- Research log guidance: `references/research-log-guide.md`
- Notion sync scripts: `scripts/sync_paper_to_notion.sh`, `scripts/sync_markdown_to_notion.mjs`
- Metadata extraction helper: `scripts/extract_paper_metadata.py`
- Report structure validator: `scripts/validate_report_structure.py`

## Output quality checklist

Before finishing, ensure the output:
1. states whether it is based on full text or abstract-only evidence,
2. follows the appropriate template,
3. does not fabricate unseen details,
4. includes limitations,
5. uses optional sync/publish steps only when requested.
