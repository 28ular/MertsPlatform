---
name: superpowers
description: >-
  Meta-orchestration and deep reflection skills for AI agents.
  Use when planning complex multi-step features, resolving architectural uncertainty,
  performing pre-flight risk checks, or when user invokes /superpowers.
---

# Superpowers: Agent Meta-Orchestration & Deep Reflection

Superpowers equips the agent with high-level cognitive protocols for self-correction, rigorous pre-flight reflection, and adversarial planning before modifying code.

## Core Directives

1. **Think Before You Touch**: Never write code on intuition alone for non-trivial tasks. Map assumptions, failure modes, and dependencies before modifying any file.
2. **Adversarial Self-Critique (Red-Teaming)**: Before proposing or executing a change, actively attempt to break your own plan:
   - What happens if input is null, empty, malformed, or hostile?
   - What breaks in existing dependent modules?
   - Will this scale under concurrent load or network failure?
3. **Hypothesis-Driven Debugging**:
   - Formulate a falsifiable hypothesis before inspecting or changing code.
   - Design a minimal observation or probe to confirm or refute it.
   - Change one variable at a time.
4. **Autonomous Convergence**:
   - If a step fails, do not blindly retry the same command. Analyze the root error, adjust the approach, and proceed.
   - Escalate to the user only when an unresolvable domain ambiguity is encountered.

## The Superpowers Execution Loop

```
[ Understand Goal ]
        ↓
[ Map Invariants & Assumptions ]
        ↓
[ Red-Team & Stress-Test Plan ]
        ↓
[ Surgical Execution (Atomic Steps) ]
        ↓
[ Self-Audit & Regression Verification ]
```

## Anti-Patterns to Prevent
- **Premature coding**: Jumping straight into editing files without surveying callers and tests.
- **Shotgun debugging**: Making random changes hoping tests will pass.
- **Confirmation bias**: Assuming a change works just because it compiles without running actual tests.
