# Project Structure

Personal portfolio site built with SvelteKit (Svelte 5 runes) and Tailwind CSS, deployed as a static site via GitHub Actions.

---

## File Tree

```
me/
├── src/
│   ├── app.html                          # HTML entry point (Google Fonts: DM Serif Display, DM Mono)
│   ├── app.d.ts                          # TypeScript global declarations
│   ├── lib/
│   │   ├── types/
│   │   │   └── index.ts                  # Shared types: WinId, WinState
│   │   ├── data/
│   │   │   ├── skills.ts                 # Skill groups array
│   │   │   ├── projects.ts               # Projects array
│   │   │   └── publications.ts           # Publications array + research areas
│   │   └── components/
│   │       ├── Window.svelte             # Reusable draggable window frame
│   │       ├── AboutWindow.svelte        # About window content
│   │       ├── SkillsWindow.svelte       # Skills window content
│   │       ├── ProjectsWindow.svelte     # Projects window content
│   │       ├── PublicationsWindow.svelte # Publications window content
│   │       ├── ContactWindow.svelte      # Contact window content
│   │       ├── DesktopNav.svelte         # Left sidebar / mobile top nav
│   │       └── Taskbar.svelte            # Bottom taskbar with clock
│   └── routes/
│       ├── +layout.ts                    # Enables prerendering (SSG)
│       ├── +layout.svelte                # Root layout (imports layout.css, favicon)
│       ├── layout.css                    # Global styles: CSS vars, body, scrollbar, hr.rule
│       └── +page.svelte                  # Page orchestrator: state, window logic, composition
├── svelte.config.js                      # SvelteKit config (adapter-static)
├── vite.config.ts                        # Vite config
├── tsconfig.json
└── package.json
```

---

## Layer Overview

```
+page.svelte  (state owner)
    │
    ├── DesktopNav   ← reads openState[], calls onOpen / onToggle
    ├── Taskbar      ← reads openState[], clock; calls onToggle
    └── Window × 5  ← reads position/open/z; calls onClose, onFocus, onMove
            └── *Window  ← pure content, no state (except About which calls onOpen)
```

---

## Types — `src/lib/types/index.ts`

```ts
type WinId = 'about' | 'skills' | 'projects' | 'publications' | 'contact';

interface WinState {
  open: boolean;   // whether the window is visible
  z: number;       // CSS z-index (incremented on focus)
  x: number;       // left position in pixels
  y: number;       // top position in pixels
}
```

Used by: `+page.svelte`, `Window.svelte`, `DesktopNav.svelte`, `Taskbar.svelte`, `AboutWindow.svelte`.

---

## Data Files — `src/lib/data/`

Plain TypeScript arrays — no logic, no imports. Edit these to update site content.

| File | Export | Shape |
|------|--------|-------|
| `skills.ts` | `skillGroups` | `{ label: string; items: string[] }[]` |
| `projects.ts` | `projects` | `{ name, stack, desc: string }[]` |
| `publications.ts` | `publications` | `{ title, url, venue, authors: string }[]` |
| `publications.ts` | `researchAreas` | `string[]` |

---

## Components — `src/lib/components/`

### `Window.svelte` — reusable window frame

The only component with interactive logic beyond what the page provides. Contains the drag-to-move action inline.

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `id` | `WinId` | Window identifier |
| `open` | `boolean` | Controls visibility (opacity + pointer-events) |
| `z` | `number` | CSS z-index |
| `x` | `number` | Left position (px) |
| `y` | `number` | Top position (px) |
| `width` | `number` | Fixed width (px) |
| `isMobile` | `boolean` | Disables drag when true |
| `onClose` | `() => void` | Called when × is clicked |
| `onFocus` | `() => void` | Called on mousedown (brings to front) |
| `onMove` | `(x, y) => void` | Called during drag with new position |
| `children` | `Snippet` | Window body content (Svelte 5 snippet) |

**Drag logic:** Attaches `mousedown` on the title bar, `mousemove`/`mouseup` on `document`. Reads `x`, `y`, `isMobile` from props reactively at event time — no stale closures. Cleans up listeners on `destroy`.

**Mobile behavior:** At ≤768px, `position: static !important`, `width: 100% !important`, `hidden` windows use `display: none` instead of opacity fade.

---

### Content Windows — `AboutWindow`, `SkillsWindow`, `ProjectsWindow`, `PublicationsWindow`, `ContactWindow`

Purely presentational. Each renders its section's markup and owns its own scoped CSS.

| Component | Data source | Extra props |
|-----------|-------------|-------------|
| `AboutWindow` | Hardcoded | `onOpen: (id: WinId) => void` (for internal links to publications/contact) |
| `SkillsWindow` | `data/skills.ts` | none |
| `ProjectsWindow` | `data/projects.ts` | none |
| `PublicationsWindow` | `data/publications.ts` | none |
| `ContactWindow` | Hardcoded | none |

---

### `DesktopNav.svelte` — sidebar / mobile nav

Renders the index list of window names. On desktop: double-click to open. On mobile: single-click to toggle, displayed as a sticky horizontal strip.

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `winOrder` | `WinId[]` | Ordered list of window IDs |
| `openState` | `Record<WinId, boolean>` | Which windows are open (for active styling) |
| `isMobile` | `boolean` | Switches between dblclick/click behavior |
| `onOpen` | `(id) => void` | Opens a window |
| `onToggle` | `(id) => void` | Toggles a window |

---

### `Taskbar.svelte` — footer strip

Renders one button per window and a live clock. Hidden on mobile (nav strip takes over).

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `winOrder` | `WinId[]` | Ordered list of window IDs |
| `openState` | `Record<WinId, boolean>` | Which windows are open (for `.open` styling) |
| `clock` | `string` | Formatted time string (HH:MM) |
| `onToggle` | `(id) => void` | Toggles a window |

---

## Page Orchestrator — `src/routes/+page.svelte`

Owns all reactive state. Computes nothing about appearance — delegates everything to components.

**State:**

| Variable | Type | Description |
|----------|------|-------------|
| `wins` | `Record<WinId, WinState>` | Position, z-index, and open state for all windows |
| `zTop` | `number` | Monotonically increasing z-index counter |
| `isMobile` | `boolean` | True when viewport ≤768px |
| `clock` | `string` | Current time, updated every second |

**Functions:**

| Function | Description |
|----------|-------------|
| `openWin(id)` | Sets `open = true`, increments z |
| `closeWin(id)` | Sets `open = false` |
| `toggleWin(id)` | Calls open or close depending on current state |
| `focusWin(id)` | Increments `zTop`, assigns to window's `z` |
| `moveWin(id, x, y)` | Updates window position (called by drag) |
| `openState()` | Returns `Record<WinId, boolean>` snapshot for nav/taskbar |

**`onMount`:** Starts the clock interval, sets up a `matchMedia` listener for the 768px breakpoint, and opens all windows immediately if already on mobile.

**Default positions** (desktop only — overridden to `static` on mobile):

| Window | x | y | width |
|--------|---|---|-------|
| about | 140 | 48 | 480px |
| skills | 660 | 60 | 360px |
| projects | 200 | 44 | 520px |
| publications | 700 | 180 | 480px |
| contact | 720 | 180 | 300px |

---

## Global Styles — `src/routes/layout.css`

Applied globally (imported by `+layout.svelte`). Contains everything that needs to bleed across component boundaries.

- CSS custom properties (`--bg`, `--paper`, `--ink`, `--ink-muted`, `--ink-dim`, `--rule`, `--border`, `--serif`, `--mono`)
- `body` base styles (background dot pattern, font, overflow)
- Scrollbar styling (3px, borderless)
- `hr.rule` utility (used inside window bodies across multiple components)
- Mobile `body` override (`overflow: auto`, `user-select: text`)

Component-scoped styles live in their respective `.svelte` files.

---

## Adding a New Window

1. Add the new ID to `WinId` in `src/lib/types/index.ts`
2. Add it to `winOrder` and `defaultPositions` in `+page.svelte`
3. Add a zero state entry to `wins` in `+page.svelte`
4. Create `src/lib/components/YourWindow.svelte` with the content
5. Add a `<Window id="your-id" ...>` block in `+page.svelte`

---

## Build & Deploy

```bash
npm run dev      # dev server
npm run build    # static build → build/
npm run preview  # preview production build
```

Deployed via GitHub Actions (`.github/workflows/static.yml`) to GitHub Pages on push to `main`.
