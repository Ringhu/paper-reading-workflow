# Notion Sync Guide

This guide explains how to sync a paper report written in Markdown into Notion without losing formatting.

## Why not upload raw Markdown as plain text?

If you paste Markdown as a single block of text, the result is hard to read:
- headings remain plain text,
- bold markers stay as literal `**text**`,
- formulas stay as `$...$`,
- lists may flatten into paragraphs.

A better approach is:

1. convert Markdown into native Notion blocks,
2. create the page or database item,
3. append remaining blocks in batches.

## Recommended conversion path

This repository uses `@tryfabric/martian` to convert Markdown into Notion blocks.

Typical flow:

```text
Markdown file
-> martian conversion
-> Notion blocks
-> pages.create()
-> blocks.children.append() in batches
```

## Important Notion API limits

- `rich_text.text.content` should stay within 2000 characters.
- `children` per request should stay within 100 blocks.
- Large reports should be appended in multiple requests.

## Recommended environment variables

```bash
export NOTION_API_KEY="your_notion_api_key"
export NOTION_DATABASE_ID="your_database_id"
```

## Basic usage

```bash
bash scripts/sync_paper_to_notion.sh \
  --title "[Deep Read] Paper Title" \
  --authors "Author A; Author B" \
  --date "2026-03-10" \
  --arxiv "https://arxiv.org/abs/xxxx.xxxxx" \
  --pdf "https://arxiv.org/pdf/xxxx.xxxxx" \
  --categories "Time Series,LLM" \
  --status "Done" \
  --summary "Short summary" \
  --report-file "/absolute/path/to/report.md"
```

## Suggested database properties

If you want database sync rather than plain page creation, prepare properties such as:
- Title
- Authors
- Date
- Status
- Category
- Summary
- ArXiv Link
- PDF Link
- GitHub Link (optional)
- Read At / Deep Read Time (optional)

## Safety reminders

- Never commit your Notion API key.
- Put `.env` into `.gitignore`.
- Prefer environment variables or local config files that are not tracked by Git.
