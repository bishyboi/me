# Project Structure

Personal portfolio site built with SvelteKit (Svelte 5 runes) and Tailwind CSS, deployed as a static site via GitHub Actions.

---

## File Tree

```
me/
├── src/
│   ├── app.html                               # HTML entry point (Google Fonts: DM Serif Display, DM Mono)
│   ├── app.d.ts                               # TypeScript global declarations
│   ├── lib/
│   │   ├── index.ts                           # Barrel re-exports
│   │   ├── assets/
│   │   │   └── favicon.svg                    # Favicon
│   │   ├── types/
│   │   │   └── index.ts                       # Shared types: WinId, WinState, Project
│   │   ├── data/
│   │   │   ├── skills.ts                      # Skill groups array
│   │   │   ├── projects.ts                    # Projects array (rich Project objects)
│   │   │   └── publications.ts               # Publications array + research areas
│   │   └── components/
│   │       ├── Window.svelte                  # Reusable draggable window frame
│   │       ├── AboutWindow.svelte             # About window content
│   │       ├── SkillsWindow.svelte            # Skills window content
│   │       ├── ProjectsWindow.svelte          # Projects list; emits onOpenProject
│   │       ├── ProjectDetailWindow.svelte     # Per-project detail view (dynamically spawned)
│   │       ├── PublicationsWindow.svelte      # Publications window content
│   │       ├── ContactWindow.svelte           # Contact window content
│   │       ├── DesktopNav.svelte              # Left sidebar / mobile top nav
│   │       └── Taskbar.svelte                 # Bottom taskbar with clock + close-all
│   └── routes/
│       ├── +layout.ts                         # Enables prerendering (SSG)
│       ├── +layout.svelte                     # Root layout (imports layout.css, favicon)
│       ├── layout.css                         # Global styles: CSS vars, body, scrollbar, hr.rule
│       └── +page.svelte                       # Page orchestrator: state, window logic, context menus
├── svelte.config.js                           # SvelteKit config (adapter-static)
├── vite.config.ts                             # Vite config
├── tsconfig.json
└── package.json
```

---

## Layer Overview

```
+page.svelte  (state owner)
    │
    ├── DesktopNav        ← reads openState[], calls onOpen / onToggle
    ├── Taskbar           ← reads openState[], clock; calls onToggle, onCloseAll
    ├── Window × 5        ← fixed windows; calls onClose, onFocus, onMove, onContextMenu
    │       └── *Window   ← pure content (except About → onOpen, Projects → onOpenProject)
    ├── Window × N        ← dynamic project detail windows (one per opened project)
    │       └── ProjectDetailWindow  ← receives Project object as prop
    └── ctx-menu div      ← context menu (right-click on window or desktop)
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

interface Project {
  id: string;
  name: string;
  stack: string;
  desc: string;
  category: string;
  status: string;
  date: string;
  longDesc: string;
  outcomes: string[];
  links: { label: string; url: string }[];
  images?: { src: string; caption?: string }[];
}
```

Used by: `+page.svelte`, `Window.svelte`, `DesktopNav.svelte`, `Taskbar.svelte`, `AboutWindow.svelte`, `ProjectDetailWindow.svelte`.

---

## Data Files — `src/lib/data/`

Plain TypeScript arrays — no logic, no imports. Edit these to update site content.

| File | Export | Shape |
|------|--------|-------|
| `skills.ts` | `skillGroups` | `{ label: string; items: string[] }[]` |
| `projects.ts` | `projects` | `Project[]` (see types) |
| `publications.ts` | `publications` | `{ title, url, venue, authors: string }[]` |
| `publications.ts` | `researchAreas` | `string[]` |

---

## Components — `src/lib/components/`

### `Window.svelte` — reusable window frame

The only component with interactive logic beyond what the page provides. Contains the drag-to-move action inline.

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Window identifier (WinId or `project-{id}`) |
| `open` | `boolean` | Controls visibility (opacity + pointer-events) |
| `z` | `number` | CSS z-index |
| `x` | `number` | Left position (px) |
| `y` | `number` | Top position (px) |
| `width` | `number` | Fixed width (px) |
| `isMobile` | `boolean` | Disables drag when true |
| `onClose` | `() => void` | Called when × is clicked |
| `onFocus` | `() => void` | Called on pointerdown (brings to front) |
| `onMove` | `(x, y) => void` | Called during drag with new position |
| `onContextMenu` | `(e: MouseEvent) => void` | Called on right-click (for context menu) |
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
| `ProjectsWindow` | `data/projects.ts` | `onOpenProject: (id: string) => void` (spawns a detail window) |
| `ProjectDetailWindow` | `data/projects.ts` (via prop) | `project: Project` |
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
| `onCloseAll` | `() => void` | Closes all windows (including project detail windows) |

---

## Page Orchestrator — `src/routes/+page.svelte`

Owns all reactive state. Computes nothing about appearance — delegates everything to components.

**State:**

| Variable | Type | Description |
|----------|------|-------------|
| `wins` | `Record<WinId, WinState>` | Position, z-index, and open state for all fixed windows |
| `projectWins` | `Record<string, { open, z, x, y, projectId }>` | Dynamically spawned project detail windows |
| `ctxMenu` | `{ visible, x, y, winId? }` | Context menu position and target |
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
| `closeAll()` | Closes all fixed and project detail windows |
| `openProjectWin(id)` | Spawns or re-opens a project detail window |
| `closeProjectWin(id)` | Closes a project detail window |
| `focusProjectWin(id)` | Brings a project detail window to front |
| `moveProjectWin(id, x, y)` | Updates project detail window position |
| `showWinCtx(e, winId)` | Opens context menu targeting a specific window |
| `showDesktopCtx(e)` | Opens context menu with no window target |
| `hideCtx()` | Hides the context menu |
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

**Fixed window (appears in nav/taskbar):**
1. Add the new ID to `WinId` in `src/lib/types/index.ts`
2. Add it to `winOrder` and `defaultPositions` in `+page.svelte`
3. Add an entry to `wins` in `+page.svelte`
4. Create `src/lib/components/YourWindow.svelte` with the content
5. Add a `<Window id="your-id" ...>` block in `+page.svelte`

**Dynamic detail window (spawned on demand, like project detail):**
1. Add a state record in `+page.svelte` (similar to `projectWins`)
2. Add open/close/focus/move handlers
3. Render via `{#each}` over the state record in `+page.svelte`

---

## Build & Deploy

```bash
npm run dev      # dev server
npm run build    # static build → build/
npm run preview  # preview production build
```

Deployed via GitHub Actions (`.github/workflows/static.yml`) to GitHub Pages on push to `main`.
