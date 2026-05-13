# Implementation Plan: Per-Project Detail Windows

## Context for Claude Code

This site is a **desktop OS-themed personal portfolio** built with SvelteKit. It has a windowing system
where each section (About, Skills, Projects, etc.) is a draggable, closeable `Window` component managed
in `me/src/routes/+page.svelte`. The user wants each project in the Projects list to open its own
dedicated detail window when clicked — consistent with the OS "open a file" metaphor already in use.

**Key files to understand before starting:**
- `me/src/routes/+page.svelte` — manages all window state (`wins` object, `openWin`, `closeWin`, etc.)
- `me/src/lib/types/index.ts` — defines `WinId` and `WinState`
- `me/src/lib/data/projects.ts` — project data (currently minimal; will be expanded below)
- `me/src/lib/components/Window.svelte` — reusable window shell (drag, close, z-index)
- `me/src/lib/components/ProjectsWindow.svelte` — the project list (index window)

**Project source of truth:** `bishoy_projects_3.md` in the repo root. All project content
(descriptions, outcomes, links, stack) should be sourced from that document.

---

## Step 1 — Expand the project data schema

**File:** `me/src/lib/data/projects.ts`

Replace the existing minimal array with a richly typed array. Each project object should have:

```ts
{
  id: string;            // unique snake_case ID matching bishoy_projects_3.md PROJECT_ID
  name: string;          // short display name for the list card
  stack: string;         // one-liner tech stack for the list card
  desc: string;          // short 1-2 sentence summary for the list card
  category: string;      // e.g. "Research / Data Science"
  status: string;        // e.g. "Completed", "In Progress", "Published"
  date: string;          // e.g. "2024 – 2025"
  longDesc: string;      // full description paragraph(s) for the detail window
  outcomes: string[];    // bullet list of measurable results
  links: { label: string; url: string }[];  // e.g. [{label: 'GitHub', url: '...'}, {label: 'Paper', url: '...'}]
  // MEDIA — all optional, add as you have assets ready
  images?: { src: string; caption?: string }[];  // paths like '/projects/bwave/hero.png'
  // future: videos, gifs, graphs — add fields here as needed
}
```

**Projects to populate** (source: `bishoy_projects_3.md`):
- `mayo_autonomic_ml`
- `bwave_fmd_tool`
- `mayo_patient_data_webapp`
- `scene_graph_generation`
- `schizophrenia_bioinformatics`
- `eeg_motor_research`
- `uf_team_formation_ml`
- `baldi_handwriting`
- `ignite_spell_caster`
- `biomimetic_bird_robot`
- `bb8_robot`
- `openai_chatbot_hardware` (Julito-D2)
- `emg_biofeedback_device`

> NOTE: Leave `links` arrays with PLACEHOLDER entries as empty `[]` for projects where no URL is
> available yet. The detail window should gracefully hide the links section if the array is empty.

---

## Step 2 — Update the type definitions

**File:** `me/src/lib/types/index.ts`

- Export a `Project` interface matching the schema in Step 1.
- `WinId` currently is a string union of fixed window names. Project detail windows are **dynamic**
  (one per project), so do NOT add project IDs to this union. Instead, manage project detail windows
  separately (see Step 4).

---

## Step 3 — Create the ProjectDetailWindow component

**New file:** `me/src/lib/components/ProjectDetailWindow.svelte`

This component receives a `project: Project` prop and renders the full detail view inside a Window.
Layout (top to bottom):

1. **Header row** — `project.name` (large italic), `project.status` badge (small pill), `project.date`
2. **Tech stack** — monospace small text, same style as the list card
3. **Category** — dim label
4. **Description** — `project.longDesc`, readable line-height
5. **Media section** (only rendered if `project.images` exists and has items):
   - Each image: `<img src={img.src} alt={img.caption ?? ''} />` followed by `<p class="caption">` if caption exists
   - Images should be responsive width (max 100% of window width)
   - GIFs work automatically — no special handling needed, just use `<img>`
6. **Outcomes** — bulleted list from `project.outcomes`
7. **Links** — row of styled anchor tags from `project.links` (hidden if empty)

**Extensibility note for future Claude Code sessions:**
To add a new media type (video, embedded graph, etc.), add an optional field to the `Project` interface
in `types/index.ts` and add a conditional render block in this component. Do not restructure the
existing sections — just append a new conditional block.

---

## Step 4 — Wire up dynamic project windows in +page.svelte

**File:** `me/src/routes/+page.svelte`

The existing `wins` state object uses a fixed `Record<WinId, WinState>`. Project detail windows are
dynamic — there can be 0 to N of them open at once.

Add a **separate** state map for project windows:

```ts
// separate from wins — keyed by project id
let projectWins = $state<Record<string, WinState & { projectId: string }>>({});
```

Add helper functions:
- `openProjectWin(id: string)` — if already in map, just set open=true and focus; if not, add entry
  with a slightly offset position from the projects window default position
- `closeProjectWin(id: string)` — set open=false
- `focusProjectWin(id: string)` — increment zTop and assign

Add imports:
```ts
import ProjectDetailWindow from '$lib/components/ProjectDetailWindow.svelte';
import { projects } from '$lib/data/projects';
```

In the template, after the existing `<Window>` blocks, render the dynamic project windows:

```svelte
{#each Object.values(projectWins) as pw (pw.projectId)}
  {#if pw.open}
    {@const project = projects.find(p => p.id === pw.projectId)}
    {#if project}
      <Window
        id={`project-${pw.projectId}`}
        open={pw.open}
        z={pw.z}
        x={pw.x}
        y={pw.y}
        width={580}
        {isMobile}
        onClose={() => closeProjectWin(pw.projectId)}
        onFocus={() => focusProjectWin(pw.projectId)}
        onMove={(x, y) => moveProjectWin(pw.projectId, x, y)}
      >
        <ProjectDetailWindow {project} />
      </Window>
    {/if}
  {/if}
{/each}
```

---

## Step 5 — Update ProjectsWindow to emit open events

**File:** `me/src/lib/components/ProjectsWindow.svelte`

Add a prop: `onOpenProject: (id: string) => void`

For each project entry, make the row clickable:
- Add `cursor: pointer` and a subtle hover style (e.g., background tint or underline on name)
- Add a small `↗` or `open` affordance on the right of each row (optional but recommended)
- On click, call `onOpenProject(p.id)`

Pass `onOpenProject={openProjectWin}` from `+page.svelte` when rendering `<ProjectsWindow>`.

---

## Step 6 — Add static image assets (as available)

**Directory:** `me/static/projects/{project_id}/`

Example structure:
```
me/static/projects/
  bwave_fmd_tool/
    hero.png        → referenced as '/projects/bwave_fmd_tool/hero.png'
    graph.png
  mayo_autonomic_ml/
    umap_clusters.png
  baldi_handwriting/
    demo.gif
```

- Drop images/GIFs here as they become available.
- Reference them in `projects.ts` under the `images` array for the relevant project.
- The detail window will automatically render them — no code changes needed.

---

## Summary of files to create/modify

| Action | File |
|--------|------|
| **Modify** | `me/src/lib/data/projects.ts` — expand schema, populate all projects |
| **Modify** | `me/src/lib/types/index.ts` — export `Project` interface |
| **Create** | `me/src/lib/components/ProjectDetailWindow.svelte` — detail window UI |
| **Modify** | `me/src/routes/+page.svelte` — add `projectWins` state + dynamic window rendering |
| **Modify** | `me/src/lib/components/ProjectsWindow.svelte` — make rows clickable |
| **Create** | `me/static/projects/{id}/` — image assets (add as available) |

---

## How to add a new project in the future

1. Add an entry to the `projects` array in `me/src/lib/data/projects.ts` following the schema.
2. Drop any images/GIFs into `me/static/projects/{new_id}/`.
3. Reference them in the `images` array of the new project entry.
4. Done — no component or routing changes needed.

## How to add a new media type (e.g. embedded video, interactive graph)

1. Add an optional field to the `Project` interface in `me/src/lib/types/index.ts`.
2. Add a conditional render block in `ProjectDetailWindow.svelte`.
3. Populate the field for any projects that have that media type.
