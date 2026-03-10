# Deep Read Template

Use this template when the task is to deeply read a single paper from a title, arXiv link, or PDF.

If full text is unavailable, add a short note near the beginning:

> Note: This report is based on the abstract / partial visible content rather than the full paper.

## Recommended structure

```markdown
# [Short paper tag]: [one-sentence summary of the core idea]

## 1. Core Idea
Explain what problem the paper solves, why it matters, and what the main idea is.

## 2. Important Terms
List and explain the important concepts, terms, or modules that appear repeatedly in the paper.

1. **Term A**: ...
2. **Term B**: ...

## 3. Method

### 3.1 What previous methods are missing
Explain the motivation and the specific weakness of previous approaches.

### 3.2 Overall method pipeline
Explain the method step by step.
Include formulas when needed.
Explain symbols, dimensions, and module roles.

### 3.3 Hard parts explained simply
Re-explain the hardest part in plain language with examples or intuition.

## 4. Experiments and Results

### 4.1 Experimental setup
Describe datasets, baselines, metrics, and important settings.

### 4.2 Main findings
Summarize what improved, where it improved, and what the ablations show.

## 5. Conclusion

### 5.1 Main contributions
List the paper's contributions in clear numbered form.

### 5.2 Limitations
State the paper's limitations honestly.

### 5.3 Future directions / practical insight
Explain what this paper suggests for future work or for adjacent research directions.
```

## Writing rules

- Prefer simple, structured explanations.
- Use formulas only when they add clarity.
- Distinguish clearly between what the paper claims and your own interpretation.
- Always include limitations.
