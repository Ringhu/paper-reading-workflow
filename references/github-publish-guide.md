# GitHub Publish Guide

Use this guide when you want to publish generated reports to GitHub.

## Recommended file layout

```text
reports/
  YYYY-MM-DD-brief.md
  YYYY-MM-DD-full.md
  YYYY-MM-DD-paper-slug-deepread.md
```

## Suggested workflow

1. Generate the report locally.
2. Review the content for formatting and factual errors.
3. Confirm no secrets or local absolute paths are present.
4. Commit with a clear message.
5. Push to the target repository.

## Example commands

```bash
git add reports/
git commit -m "docs: add paper reading reports"
git push origin main
```

## Safety reminders

- Do not commit tokens, API keys, or `.env` files.
- Do not publish private notes by accident.
- Review generated Markdown before pushing.
