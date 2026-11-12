---
name: matt-pocock
description: >-
  Expert TypeScript standards inspired by Matt Pocock (Total TypeScript): strict typing,
  discriminated unions, generics, template literals, zero runtime overhead, and ts-reset patterns.
  Use when writing or reviewing TypeScript code (.ts, .tsx), type definitions, or when user invokes /pocock.
---

# Matt Pocock Skills: Total TypeScript Mastery

Standards and heuristics for professional, type-safe TypeScript with zero runtime overhead and maximum developer productivity.

## Core Rules

### 1. No `any`, Safe `unknown`
- Never use `any` unless writing low-level compiler internals with an explicit cast boundary.
- For untyped data (HTTP responses, JSON parsing, storage), type as `unknown` and narrow with type guards or Zod schemas:
  ```typescript
  function parseConfig(raw: unknown): Config {
    if (!raw || typeof raw !== 'object') throw new TypeError('Invalid config object');
    // or schema.parse(raw)
  }
  ```

### 2. Discriminated Unions Over Optional Flags
- Never use bag-of-optionals for state machines:
  ```typescript
  // ❌ Bad
  interface AsyncState<T> {
    isLoading: boolean;
    data?: T;
    error?: Error;
  }

  // ✅ Good
  type AsyncState<T> =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success'; data: T }
    | { status: 'error'; error: Error };
  ```

### 3. Exhaustiveness Checking with `assertNever`
```typescript
function assertNever(x: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(x)}`);
}

function handleState(state: AsyncState<User>) {
  switch (state.status) {
    case 'idle': return null;
    case 'loading': return <Spinner />;
    case 'success': return <Profile user={state.data} />;
    case 'error': return <ErrorBanner error={state.error} />;
    default: return assertNever(state); // Enforces compilation check if new status is added
  }
}
```

### 4. Zero Runtime Overhead
- Always use `import type { ... } from '...'` for type-only imports to eliminate bundle bloat.
- Prefer `as const` for fixed dictionaries, route tables, and enum replacements instead of runtime TypeScript `enum`s.
  ```typescript
  export const ROLES = {
    ADMIN: 'admin',
    MENTOR: 'mentor',
    STUDENT: 'student',
  } as const;

  export type Role = (typeof ROLES)[keyof typeof ROLES];
  ```

### 5. Generics: Keep Them Constrained
- Always constrain generics with `extends`:
  ```typescript
  function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
  }
  ```
