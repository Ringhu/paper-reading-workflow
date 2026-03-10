<div align="center">

# paper-reading-workflow

**An open-source paper reading skill for AI research assistants**  
Deep-read one paper, scan many papers, and turn results into reusable research outputs.

[![English](https://img.shields.io/badge/README-English-blue?style=for-the-badge)](./README.md)
[![中文](https://img.shields.io/badge/README-%E4%B8%AD%E6%96%87-red?style=for-the-badge)](./README.zh-CN.md)

[![Skill](https://img.shields.io/badge/type-AgentSkill-6f42c1?style=flat-square)](./SKILL.md)
[![Notion](https://img.shields.io/badge/optional-Notion%20Sync-2ea44f?style=flat-square)](./references/notion-sync-guide.md)
[![GitHub](https://img.shields.io/badge/optional-GitHub%20Publish-0969da?style=flat-square)](./references/github-publish-guide.md)
[![Beginner Friendly](https://img.shields.io/badge/docs-beginner%20friendly-orange?style=flat-square)](./README.md)

</div>

---

## Why this repository exists

Many paper-reading workflows are scattered across prompts, personal notes, or private scripts.  
This repository turns that process into a reusable, open, and beginner-friendly skill.

It helps an AI research assistant:

- deeply read a single paper from a **title**, **arXiv link**, or **PDF file**;
- generate a **daily paper brief** and a **daily full report**;
- optionally sync Markdown reports to **Notion**;
- optionally publish generated reports to **GitHub**;
- optionally record important papers into a **research log**.

> This repository is intentionally designed to be beginner-friendly.
> It does **not** include any private tokens, database IDs, personal paths, or personal memory files.

---

## At a glance

### Workflow A — Single-paper deep reading

```text
Title / arXiv / PDF
        ↓
Get paper content
        ↓
Check: full paper or abstract-only?
        ↓
Write structured deep-read report
        ↓
Optional: Notion sync / research log
```

### Workflow B — Daily paper scanning

```text
Topic / date range
        ↓
Search papers
        ↓
Deduplicate
        ↓
Write brief
        ↓
Write full report
        ↓
Optional: GitHub publish / Notion sync
```

---

## What this skill covers

This skill supports exactly **two workflows**.

### 1. Single-paper deep reading
Use this when you have:
- a paper title,
- an arXiv link,
- or a PDF file.

Workflow:
1. Get the paper content.
2. Decide whether the report is based on the **full paper** or only the **abstract / partial visible content**.
3. Generate a structured deep-read report.
4. Optionally sync the report to Notion.
5. Optionally save a short research-log entry.

### 2. Daily paper scanning
Use this when you want:
- recent papers in a topic,
- a daily briefing,
- a short brief + longer full report.

Workflow:
1. Search papers.
2. Deduplicate results.
3. Write a brief.
4. Write a full report.
5. Optionally publish to GitHub.
6. Optionally sync to Notion.


---

## Repository structure

```text
paper-reading-workflow/
├── SKILL.md
├── README.md
├── README.zh-CN.md
├── package.json
├── .env.example
├── .gitignore
├── scripts/
│   ├── sync_markdown_to_notion.mjs
│   ├── sync_paper_to_notion.sh
│   ├── extract_paper_metadata.py
│   └── validate_report_structure.py
└── references/
    ├── deepread-template.md
    ├── daily-brief-template.md
    ├── daily-full-report-template.md
    ├── notion-sync-guide.md
    ├── github-publish-guide.md
    └── research-log-guide.md
```

---

## Quick start

### Requirements

You only need a few common tools:

- **Node.js** 18+ (recommended)
- **Python** 3.9+ (recommended)
- **Git**

Check them with:

```bash
node -v
python3 --version
git --version
```

---

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd paper-reading-workflow
```

### 2. Install Node dependency

This repository uses [`@tryfabric/martian`](https://www.npmjs.com/package/@tryfabric/martian) to convert Markdown into native Notion blocks.

```bash
npm install
```

If `npm` is not available on your machine, install Node.js first from the official website:
- https://nodejs.org/

---

## Using the skill content

### Read the skill instructions
The main workflow description is in:

- `SKILL.md`

### Read the templates and guides
- Single-paper deep read template:
  - `references/deepread-template.md`
- Daily brief template:
  - `references/daily-brief-template.md`
- Daily full report template:
  - `references/daily-full-report-template.md`
- Notion sync guide:
  - `references/notion-sync-guide.md`
- GitHub publishing guide:
  - `references/github-publish-guide.md`
- Research log guide:
  - `references/research-log-guide.md`

---

## Notion setup (optional)

If you do **not** want Notion sync, you can skip this entire section.

If you **do** want Notion sync, follow these steps carefully.

### Step 1. Create a Notion integration

1. Go to: https://www.notion.so/my-integrations
2. Create a new integration.
3. Copy the generated API key.

### Step 2. Create or choose a Notion database

Create a database in Notion where your paper reports will be stored.

Suggested properties:
- `Title` (title)
- `Authors` (rich text)
- `Date` (date)
- `Status` (select)
- `Category` (multi-select)
- `Summary` (rich text)
- `ArXiv Link` (url)
- `PDF Link` (url)
- `GitHub Link` (url, optional)
- `Read At` (date, optional)

### Step 3. Share the database with the integration

In Notion:
1. Open the database.
2. Click **Share**.
3. Add your integration.

If you skip this step, the API will fail even if your key is correct.

### Step 4. Configure local environment variables

Copy the example file:

```bash
cp .env.example .env
```

Edit `.env` and fill in your values:

```bash
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_notion_database_id
NOTION_API_VERSION=2025-09-03
```

> Important:
> - Never commit `.env`
> - Never paste real tokens into public screenshots
> - `.gitignore` already excludes `.env`

### Step 5. Export variables in your shell

Example:

```bash
export NOTION_API_KEY="your_notion_api_key"
export NOTION_DATABASE_ID="your_notion_database_id"
export NOTION_API_VERSION="2025-09-03"
```

---

## Sync a report to Notion

### Option A: Use the simple shell wrapper

```bash
bash scripts/sync_paper_to_notion.sh \
  --title "[Deep Read] Example Paper" \
  --authors "Author A; Author B" \
  --date "2026-03-10" \
  --arxiv "https://arxiv.org/abs/1234.56789" \
  --pdf "https://arxiv.org/pdf/1234.56789" \
  --categories "Time Series,LLM" \
  --status "Done" \
  --summary "Short summary of the paper" \
  --report-file "/absolute/path/to/report.md"
```

### Option B: Use the Node script directly

```bash
node scripts/sync_markdown_to_notion.mjs \
  --title "[Deep Read] Example Paper" \
  --markdown-file "/absolute/path/to/report.md" \
  --authors "Author A; Author B" \
  --date "2026-03-10" \
  --arxiv "https://arxiv.org/abs/1234.56789" \
  --pdf "https://arxiv.org/pdf/1234.56789" \
  --categories "Time Series,LLM" \
  --status "Done" \
  --summary "Short summary of the paper"
```

---

## Extract metadata from a Markdown report

If your report starts with fields like `Paper:`, `ArXiv:`, or `PDF:`, you can extract them automatically:

```bash
python3 scripts/extract_paper_metadata.py /path/to/report.md
```

Example output:

```json
{
  "paper": "Paper Title",
  "arxiv": "https://arxiv.org/abs/...",
  "pdf": "https://arxiv.org/pdf/...",
  "code": "https://github.com/..."
}
```

---

## Validate report structure

Before publishing or syncing, check whether the report has the expected main sections:

```bash
python3 scripts/validate_report_structure.py /path/to/report.md
```

This script checks for common structural elements such as:
- H1 title
- core idea section
- method section
- experiment section
- conclusion section
- limitation mention

---

## Suggested workflow examples

### Example 1: Single-paper deep read

Input:
- a paper title or arXiv link

Process:
1. Open the paper.
2. Read the full paper if available.
3. Use `references/deepread-template.md`.
4. Save the result as `YYYY-MM-DD-paper-slug-deepread.md`.
5. Optionally sync it to Notion.

### Example 2: Daily paper scan

Input:
- topic keywords such as `time series forecasting`, `LLM time series`, `multimodal time series`

Process:
1. Search the topic.
2. Deduplicate by arXiv id and normalized title.
3. Write `YYYY-MM-DD-brief.md` using the brief template.
4. Write `YYYY-MM-DD-full.md` using the full report template.
5. Optionally push to GitHub.
6. Optionally sync the full report to Notion.

---

## Safety checklist

Before pushing to GitHub, always verify:

- `.env` is not tracked by Git.
- No token appears in scripts, Markdown, or screenshots.
- No private absolute path appears in public files.
- No private database ID or repository URL is hardcoded.

---

## FAQ

### Q1. What if I only have the abstract?
State clearly that the report is based on the abstract or partial visible content. Do not fabricate missing details.

### Q2. Why use `@tryfabric/martian` for Notion sync?
Because it converts Markdown into native Notion blocks, which preserves headings, lists, emphasis, and formulas much better than plain-text upload.

### Q3. Why does Notion upload fail even with the right API key?
Most often because the target database has not been shared with the integration.

### Q4. Can I use this repository without Notion?
Yes. The Notion scripts are optional.

### Q5. Can I adapt the templates to another field?
Yes. The templates are intentionally general and can be adapted for ML, NLP, CV, biology, or other research areas.

---

## License

Choose any open-source license you prefer before publishing, for example:
- MIT
- Apache-2.0

This repository does not force a license choice.
