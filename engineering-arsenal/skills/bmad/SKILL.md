---
name: bmad
description: >-
  BMAD Method: Systematic 4-stage engineering delivery framework (Breakdown, Map, Automate, Deploy).
  Use when scoping large ambiguous features, migrations, complex refactorings, or when user invokes /bmad.
---

# BMAD Method: Breakdown, Map, Automate, Deploy

The BMAD framework provides a repeatable engineering methodology for taking complex, ambiguous tasks from initial idea to verified production deployment.

## The 4 Stages of BMAD

```
   [ B ] Breakdown    --> Slice problem into independent, testable atomic units
         ↓
   [ M ] Map          --> Trace data flows, callers, DB schemas, and blast radius
         ↓
   [ A ] Automate     --> Write tests first, implement surgical code, automate verification
         ↓
   [ D ] Deploy       --> Verify builds, check backward compatibility, commit & ship
```

### Stage 1: Breakdown (B)
- Deconstruct the large feature into small, mutually exclusive, collectively exhaustive (MECE) work units.
- Order tasks by dependency: database schema first, core domain/service second, API controllers third, UI presentation last.

### Stage 2: Map (M)
- Map all touchpoints: which tables, models, functions, endpoints, and frontend components will be touched.
- Identify edge cases, breaking changes, and migrations required.
- Define explicit acceptance criteria (Given/When/Then) for each work unit.

### Stage 3: Automate (A)
- Write automated tests covering happy path and critical edge cases.
- Implement the code surgically, making the tests turn green.
- Keep diffs focused strictly on the mapped requirements.

### Stage 4: Deploy (D)
- Run the full verification suite (lint, typecheck, test, build).
- Ensure zero breaking regressions for existing users.
- Produce a clear, informative git commit message and deploy checklist.
