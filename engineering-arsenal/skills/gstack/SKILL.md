---
name: gstack
description: >-
  Full-stack production orchestration: database transactions, ORM/query optimization,
  background queues (Celery/Redis), robust API contracts, and failure resilience.
  Use when designing backend services, writing database migrations, integrating external APIs, or when user invokes /gstack.
---

# Gstack: Full-Stack Production Engineering & Data Resilience

Gstack governs the reliability, data consistency, and operational safety of full-stack backend systems and persistent storage.

## 1. Database Integrity & Transactions
- **Atomic Operations**: Any multi-record state mutation (e.g., creating an order and deducting inventory, or accepting a submission and awarding points) must be wrapped in an explicit ACID database transaction (`transaction.atomic()` in Django, `$transaction` in Prisma).
- **Idempotent Migrations**: Database migrations must be reversible, non-blocking for production traffic, and safe to execute against large datasets.
- **Index Optimization**: Every field used in `WHERE`, `JOIN`, `ORDER BY`, or `DISTINCT` queries must have an appropriate index (B-tree, compound, or unique).
- **N+1 Query Elimination**: Always use eager loading (`select_related`, `prefetch_related` in Django; `include` in Prisma/TypeORM) to prevent catastrophic query storms.

## 2. Background Jobs & Asynchronous Queues
- Keep web request-response cycles ultra-fast (<200ms). Offload heavy work (sending Telegram notifications, processing audio/video, generating reports) to background workers (Celery, BullMQ, RQ).
- Jobs must be **idempotent**: running the same job twice due to network retries should not send duplicate messages or double-charge users.
- Configure retry exponential backoff and Dead Letter Queues (DLQ) for failed jobs.

## 3. Defensive API Contracts & Resilience
- Validate incoming request payloads strictly at the perimeter (Pydantic / DRF Serializers / Zod).
- Enforce strict HTTP timeouts (e.g., 3-5 seconds) on all outgoing third-party HTTP/webhook calls to prevent worker starvation.
- Use circuit breakers and fallback responses for external service failures.
