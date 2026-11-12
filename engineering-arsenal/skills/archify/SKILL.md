---
name: archify
description: >-
  System architectural analysis, Domain-Driven Design (DDD), layered architecture,
  dependency inversion, and modular boundary enforcement.
  Use when designing new subsystems, refactoring services, structuring databases, or when user invokes /archify.
---

# Archify: Clean Architecture & System Modularity

Archify guides the structural design of software systems to ensure long-term maintainability, testability, and clear separation of concerns.

## Core Architectural Principles

### 1. Layered Separation of Concerns
Systems should be organized in distinct layers where dependencies strictly flow inward:
```
[ Presentation / Interface ]  (Controllers, Views, REST/GraphQL APIs, CLI)
            ↓
[ Application / Use Cases ]   (Service orchestration, workflows, business transactions)
            ↓
[ Domain / Business Core ]    (Entities, domain models, business validation invariants)
            ↓
[ Infrastructure ]            (Databases, ORM, third-party clients, file storage)
```

- **Domain Core has ZERO framework dependencies**: Your core domain logic (e.g., student score calculation, permission checks) should be pure Python/TypeScript and testable in isolation without mocking an HTTP server or database.

### 2. Dependency Inversion Principle (DIP)
- High-level modules should not depend on low-level modules; both should depend on abstractions/interfaces.
- Pass database clients, notification dispatchers, and mailers via constructor injection or dependency injection rather than importing singleton instances directly into domain logic.

### 3. Bounded Contexts & Modularity
- Split large monorepos or services into clear bounded contexts (e.g., `Auth`, `Submissions`, `Billing`, `Notifications`).
- Services in different contexts communicate through explicit public interfaces, events, or service contracts, never by directly mutating each other's database tables.

### 4. Thin Controllers, Rich Domain / Services
- Controllers only handle: parsing input, authenticating/authorizing, calling the application service, and formatting output.
- No business calculations, loops, or complex SQL queries inside HTTP handlers/views.
