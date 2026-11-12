---
name: impeccable
description: >-
  Impeccable code quality, clean code discipline, cognitive complexity minimization,
  rigorous formatting, linting compliance, and code smell elimination.
  Use when refactoring code, conducting code reviews, eliminating tech debt, or when user invokes /impeccable.
---

# Impeccable: Clean Code Craftsmanship & Zero Code Smells

"Impeccable" enforces the highest standards of code hygiene, readability, and structural simplicity.

## Core Rules of Impeccable Code

### 1. Guard Clauses & Early Returns (Banish Arrow Code)
- Avoid deeply nested `if/else` ladders (maximum allowed nesting depth: 2).
- Return immediately on error or edge cases:
  ```python
  # ❌ Bad
  def process_task(task):
      if task is not None:
          if task.is_valid():
              if task.user.is_active:
                  return do_work(task)

  # ✅ Good
  def process_task(task):
      if not task or not task.is_valid():
          return None
      if not task.user.is_active:
          return None
      return do_work(task)
  ```

### 2. Single Responsibility & Function Size
- A function should do exactly one thing and do it well.
- Target function size: 10 to 40 lines. If a function reaches 60+ lines, break down its sequential steps into well-named private helper functions.

### 3. Intent-Revealing Names (Self-Documenting Code)
- Variable and function names must express domain intent clearly (`is_submission_overdue`, `calculate_final_grade`), avoiding cryptic abbreviations (`sub_od`, `calc_fg`).
- Comments should explain **WHY** an unusual decision was made, never restate **WHAT** the code already clearly says.

### 4. Zero Dead Code & Impeccable Hygiene
- Eliminate unused imports, commented-out dead code blocks, and stray console logs/print statements.
- Adhere strictly to project formatters (Prettier, Black, Ruff, ESLint).
