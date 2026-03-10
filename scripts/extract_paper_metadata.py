#!/usr/bin/env python3
import json
import re
import sys
from pathlib import Path

if len(sys.argv) != 2:
    print('Usage: extract_paper_metadata.py <markdown-file>', file=sys.stderr)
    sys.exit(1)

path = Path(sys.argv[1])
text = path.read_text(encoding='utf-8')

patterns = {
    'paper': re.compile(r'^-\s*Paper:\s*(.+)$', re.MULTILINE),
    'arxiv': re.compile(r'^-\s*ArXiv:\s*(.+)$', re.MULTILINE),
    'pdf': re.compile(r'^-\s*PDF:\s*(.+)$', re.MULTILINE),
    'code': re.compile(r'^-\s*Code:\s*(.+)$', re.MULTILINE),
}

result = {}
for key, pattern in patterns.items():
    match = pattern.search(text)
    result[key] = match.group(1).strip() if match else ''

print(json.dumps(result, ensure_ascii=False, indent=2))
