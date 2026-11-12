# Engineering Arsenal: Global Agent Rules & Skill Activation Matrix

These rules govern the autonomous execution, craftsmanship, and engineering standards for AI agents across all workspaces.

---

## 1. Skill Activation Matrix & Triggers

| Skill | Primary Domain | Auto-Trigger Conditions | Manual Command |
|---|---|---|---|
| **Superpowers** | Orchestration & Reflection | Complex multi-module features, high-risk refactoring, architectural planning | `/superpowers` |
| **Karpathy** | Simplicity & Invariants | Core algorithmic logic, ML/data pipelines, reducing code bloat, writing barebones modules | `/karpathy` |
| **Agent Skills** | Operational Safety | Multi-agent handoffs, executing shell tools, automated verification pipelines | `/agent-skills` |
| **Matt Pocock** | TypeScript Typing | Editing `.ts`, `.tsx`, type definitions, generics, Zod/type schemas | `/pocock` |
| **Taste** | UI/UX & Aesthetics | Editing React/Vue/HTML templates, Tailwind CSS, component layouts, user interactions | `/taste` |
| **Archify** | System Modularity | Designing new domain entities, repository layers, API boundaries, DDD structuring | `/archify` |
| **Impeccable** | Clean Code & Hygiene | Refactoring, code reviews, reducing cyclomatic/cognitive complexity, code formatting | `/impeccable` |
| **Gstack** | Full-Stack & Data | Writing Django/ORM models, database migrations, SQL queries, Redis/Celery background tasks | `/gstack` |
| **Caveman** | Conciseness | Fast summaries, terminal updates, or when user explicitly asks for brief output | `/caveman` |
| **Headroom** | Context Management | Working with large repositories, analyzing log dumps, managing agent memory | `/headroom` |
| **GSD** | Rapid Execution | Bug fixing, delivering sprint milestones, producing minimal working diffs | `/gsd` |
| **BMAD** | Systematic Delivery | Starting a new feature from scratch, phased execution (Breakdown -> Map -> Automate -> Deploy) | `/bmad` |

---

## 2. Global Hierarchy of Principles

When tradeoffs arise during implementation, resolve them using this priority order:
1. **Safety & Data Integrity** (`Gstack`, `Agent Skills`): Never lose data, corrupt schemas, or bypass validation.
2. **Correctness & Working Tests** (`GSD`, `BMAD`): Verified working code in production beats theoretical perfection.
3. **Simplicity & Minimal Diff** (`Karpathy`, `Ponytail`): The best code is the code you didn't have to write. Avoid premature abstractions.
4. **Type & Architectural Rigor** (`Matt Pocock`, `Archify`, `Impeccable`): Clean layers, strict types, zero code smells.
5. **Product & UX Polish** (`Taste`): Clean visual hierarchy, feedback states, and micro-interactions.
6. **Efficiency & Brevity** (`Headroom`, `Caveman`): Protect context budget and provide high-density reporting.
