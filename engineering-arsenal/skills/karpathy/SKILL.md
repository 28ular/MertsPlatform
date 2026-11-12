---
name: karpathy
description: >-
  Andrej Karpathy's engineering principles: code minimalism, zero unnecessary abstractions,
  barebones first, nanoGPT-style clarity, deep inspection of data and logic invariants.
  Use when designing new modules, writing core algorithms, fighting bloat, or when user invokes /karpathy.
---

# Karpathy Skills: Radical Simplicity & Deep Validation

Inspired by Andrej Karpathy's philosophy on software, deep learning, and engineering: **"Code is liability, not an asset."** The best software is simple, direct, transparent, and easy to hold in your head.

## Core Principles

### 1. Flat is Better Than Nested (No Over-Abstraction)
- Avoid deep inheritance hierarchies, generic factory builders, and premature configuration layers.
- If a function or class does one thing, write it out directly in 30-100 lines of clear, readable code rather than spreading it across 6 micro-files.
- **nanoGPT Philosophy**: A single self-contained, clean file is often vastly superior to a tangled web of 15 helper modules.

### 2. Barebones First (Make It Work End-to-End)
- Always start with the simplest dumb baseline that works from input to output.
- Print/log actual values, tensors, or data payloads at every single transformation step.
- Verify the pipeline end-to-end before adding optimizations, caching, or bells and whistles.

### 3. Deep Inspection & Invariant Checking
- Know your shapes, types, and numbers. Never treat third-party libraries or models as black boxes.
- Add explicit assertions for invariants:
  ```python
  assert tensor.shape == (B, T, C), f"Unexpected shape {tensor.shape}"
  assert 0.0 <= confidence <= 1.0, f"Confidence out of bounds: {confidence}"
  ```
- If debugging an algorithm, print the first batch, print loss values, check gradient flows, examine edge-case records.

### 4. Zero Bloat & YAGNI
- Do not introduce dependencies for functionality that standard libraries or 5 lines of native code can achieve.
- Delete unused flags, dead code, and speculative parameters immediately.

## Rules of Thumb
- **Can an engineer read this file top-to-bottom in 5 minutes and completely understand it?** If no, refactor for clarity.
- **Is this abstraction earning its keep?** If an abstraction is only used once, inline it.
