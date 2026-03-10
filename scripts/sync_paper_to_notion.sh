#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

TITLE=""
AUTHORS=""
DATE_STR=""
ARXIV=""
PDF_LINK=""
GITHUB_LINK=""
READ_AT=""
CATEGORIES=""
STATUS="Done"
SUMMARY=""
REPORT=""
REPORT_FILE=""
TITLE_PROPERTY="Title"
ICON_URL="https://www.notion.so/icons/book_gray.svg"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --title) TITLE="$2"; shift 2 ;;
    --authors) AUTHORS="$2"; shift 2 ;;
    --date) DATE_STR="$2"; shift 2 ;;
    --arxiv) ARXIV="$2"; shift 2 ;;
    --pdf) PDF_LINK="$2"; shift 2 ;;
    --github) GITHUB_LINK="$2"; shift 2 ;;
    --read-at) READ_AT="$2"; shift 2 ;;
    --categories) CATEGORIES="$2"; shift 2 ;;
    --status) STATUS="$2"; shift 2 ;;
    --summary) SUMMARY="$2"; shift 2 ;;
    --report) REPORT="$2"; shift 2 ;;
    --report-file) REPORT_FILE="$2"; shift 2 ;;
    --title-property) TITLE_PROPERTY="$2"; shift 2 ;;
    --icon-url) ICON_URL="$2"; shift 2 ;;
    *) echo "Unknown argument: $1"; exit 1 ;;
  esac
done

if [[ -z "$TITLE" ]]; then
  echo "Missing required argument: --title"
  exit 1
fi

if [[ -n "$REPORT_FILE" && ! -f "$REPORT_FILE" ]]; then
  echo "Report file does not exist: $REPORT_FILE"
  exit 1
fi

NODE_ARGS=(
  --title "$TITLE"
  --authors "$AUTHORS"
  --date "$DATE_STR"
  --arxiv "$ARXIV"
  --pdf "$PDF_LINK"
  --github "$GITHUB_LINK"
  --read-at "$READ_AT"
  --categories "$CATEGORIES"
  --status "$STATUS"
  --summary "$SUMMARY"
  --title-property "$TITLE_PROPERTY"
  --icon-url "$ICON_URL"
)

if [[ -n "$REPORT_FILE" ]]; then
  NODE_ARGS+=(--markdown-file "$REPORT_FILE")
else
  NODE_ARGS+=(--markdown "$REPORT")
fi

node "$SCRIPT_DIR/sync_markdown_to_notion.mjs" "${NODE_ARGS[@]}"
