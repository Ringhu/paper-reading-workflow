#!/usr/bin/env python3
import json
import re
import sys
from pathlib import Path

if len(sys.argv) != 2:
    print('Usage: validate_report_structure.py <markdown-file>', file=sys.stderr)
    sys.exit(1)

path = Path(sys.argv[1])
text = path.read_text(encoding='utf-8')

checks = {
    'has_h1_title': bool(re.search(r'^#\s+.+', text, re.MULTILINE)),
    'has_core_idea_section': '## 1.' in text or '## 1' in text,
    'has_method_section': '## 3.' in text or '## 3' in text,
    'has_experiment_section': '## 4.' in text or '## 4' in text,
    'has_conclusion_section': '## 5.' in text or '## 5' in text,
    'mentions_limitations': '限制' in text or 'limitation' in text.lower(),
}

ok = all([
    checks['has_h1_title'],
    checks['has_core_idea_section'],
    checks['has_method_section'],
    checks['has_experiment_section'],
    checks['has_conclusion_section'],
])

print(json.dumps({'ok': ok, 'checks': checks}, ensure_ascii=False, indent=2))
