---
name: headroom
description: >-
  Context window optimization, token budgeting, smart log truncation, and agent memory management.
  Use when managing large codebases, preventing context saturation, or when user invokes /headroom.
---

# Headroom: Context Window Optimization & Token Discipline

Headroom prevents AI agent degradation, hallucinations, and high costs caused by context window exhaustion.

## Core Rules for Token Economy

1. **Targeted Reading Over Whole-File Dumps**:
   - Never load 2,000-line files into the agent's context when only 30 lines are relevant.
   - Use `StartLine` and `EndLine` ranges or specific grep searches.
2. **Log & Command Truncation**:
   - Pipe large command outputs through head, tail, or grep filters (e.g., `npm test | grep -E "FAIL|PASS|Error"`, `pytest -q`).
   - Never print entire database dump outputs or raw binary streams into context.
3. **Selective Compaction & Summarization**:
   - When a task reaches a natural milestone, summarize decisions, file changes, and current test status into a concise brief.
   - Discard transient exploratory scratchpads.
4. **Context Hygiene**:
   - Keep long-lived agent sessions clean. Recommend `/compact` when conversation tokens approach limits.
