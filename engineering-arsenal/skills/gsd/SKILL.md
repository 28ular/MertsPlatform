---
name: gsd
description: >-
  Get Shit Done (GSD): Ruthless focus on shipping working production code, minimal viable diffs,
  atomic task completion, and pragmatic engineering without over-complication.
  Use when shipping features under deadlines, eliminating blocking bugs, or when user invokes /gsd.
---

# GSD: Get Shit Done (Ship Working Code)

GSD is the pragmatic execution engine of the agent. It prioritizes shipping functional, verified, production-ready code over endless theorizing and premature architectural optimization.

## The GSD Principles

1. **Working Code Beats Pure Code**:
   - Software in production that solves a user's problem today is infinitely more valuable than a "perfect" system that never finishes.
2. **Shortest Viable Diff (Ponytail Alignment)**:
   - What is the smallest, safest change that completely achieves the requested goal?
   - Don't rewrite adjacent modules unless explicitly requested.
   - Don't refactor working legacy code just because you would have written it differently.
3. **One Step at a Time (Atomic Execution)**:
   - Pick the single most critical blocking task.
   - Implement it.
   - Run the test.
   - Verify green.
   - Move to the next task.
4. **Done Means Verified**:
   - A task is NOT done when the code is written.
   - A task is ONLY done when:
     1. The code is in place.
     2. The test passes.
     3. The app builds.
     4. Git working tree is clean.
