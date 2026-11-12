---
name: taste
description: >-
  UI/UX design taste, aesthetic engineering, typography, visual hierarchy, micro-interactions,
  and modern Tailwind/CSS component styling.
  Use when writing or modifying front-end UI components, CSS, JSX/TSX layouts, or when user invokes /taste.
---

# Taste: Aesthetic UI/UX & Design-Code Engineering

Great software must not only work correctly, but feel refined, responsive, and delightful. "Taste" bridges the gap between raw functionality and world-class product craftsmanship.

## Visual Hierarchy & Layout Discipline

1. **The 4px / 8px Spatial Grid**:
   - Spacing, padding, and margins must follow consistent 4px/8px increments (`gap-2`, `p-4`, `py-6`, `mb-8`). Never use arbitrary ad-hoc pixel values like `p-[13px]`.
2. **Typography Scale & Contrast**:
   - Maintain clear scale: Title (text-2xl/font-bold) → Section (text-lg/font-semibold) → Body (text-sm/font-normal) → Caption (text-xs/text-muted).
   - Use high-contrast headings (`text-neutral-900 dark:text-neutral-50`) paired with subtle readable metadata (`text-neutral-500 dark:text-neutral-400`).
3. **Restraint Over Clutter**:
   - Embrace whitespace. If a screen looks crowded, remove borders and increase spacing rather than adding more divider lines.
   - Limit primary action buttons to one per view. Secondary actions should be outline or ghost buttons.

## State Completeness (The 5 UI States)
Every UI view or interactive element must gracefully handle 5 states:
1. **Loading**: Skeleton loaders (`animate-pulse`) matching the shape of incoming content, never just a raw full-screen spinner.
2. **Empty**: Helpful, visually balanced empty state with an icon, short description, and clear call-to-action.
3. **Error**: Contextual, non-destructive error feedback with a retry button.
4. **Active / Data**: Clean, organized layout with optimal line lengths (60-80 characters for text).
5. **Interactive (Hover / Focus / Disabled)**: Subtle transitions (`transition-all duration-150`), visible focus rings (`focus-visible:ring-2`), and distinct disabled states (`disabled:opacity-50 disabled:cursor-not-allowed`).

## Micro-Interactions & Feel
- Subtle transitions: `transition-colors duration-150 ease-in-out`.
- Toast notifications for asynchronous events (save, delete, copy to clipboard).
- Immediate optimistic feedback for simple toggles and actions.
