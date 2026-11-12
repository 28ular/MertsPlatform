---
name: agent-skills
description: >-
  Standardized AI agent operational protocols: tool safety, sandboxing, structured output,
  subagent delegation, read-before-write, and execution verification.
  Use when coordinating agent tasks, reviewing execution safety, or handling tool failures.
---

# Agent Skills: Operational Safety & Collaboration Protocols

Agent Skills defines the operational rules of engagement for autonomous AI agents within the engineering environment.

## 1. Tool Execution Safety
- **Read-Before-Write**: Never edit or overwrite a file without reading the surrounding lines first. Understand context, imports, and indentation.
- **Idempotent Commands**: CLI commands should be safe to run multiple times without causing side effects or corrupting state.
- **Non-Interactive Shells**: Always run terminal commands with non-interactive flags (e.g., `-y`, `--yes`, `--batch-mode`). Never run commands that block waiting for stdin.
- **Sandboxed Network & Secrets**: Never expose API keys, database credentials, or tokens in logs or artifacts.

## 2. Progressive Context Management
- Use targeted inspection (line ranges, grep, specific symbols) instead of dumping entire 10,000-line codebases into the prompt.
- Structure complex findings into concise artifacts when persistent reference is required.

## 3. Subagent Handoff Standards
- Clearly specify:
  - Role and single objective.
  - Required inputs and constraints.
  - Expected output format (e.g., JSON schema, markdown report, or status code).
- Never send unbounded tasks to subagents without a clear termination condition.

## 4. Verification Gate
- Every code change must be verified against at least one automated check (unit test, typecheck, or build command) before marking the task complete.
