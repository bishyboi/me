<script lang="ts">
	import { projects } from '$lib/data/projects';

	let { onOpenProject }: { onOpenProject: (id: string) => void } = $props();
</script>

{#each projects as p}
	<button class="project-entry" onclick={() => onOpenProject(p.id)}>
		<div class="project-name">{p.name} <span class="open-hint">↗</span></div>
		<div class="project-stack">{p.stack}</div>
		<div class="project-desc">{p.desc}</div>
	</button>
{/each}

<style>
	.project-entry {
		display: block;
		width: 100%;
		text-align: left;
		background: none;
		border: none;
		border-bottom: 1px solid var(--rule);
		padding: 0.85rem 0;
		cursor: pointer;
		transition: background 0.1s;
		border-radius: 3px;
	}

	.project-entry:last-of-type {
		border-bottom: none;
	}

	.project-entry:hover {
		background: color-mix(in srgb, var(--ink) 4%, transparent);
	}

	.project-entry:hover .open-hint {
		opacity: 1;
	}

	.project-name {
		font-size: 1rem;
		font-style: italic;
		color: var(--ink);
		line-height: 1.3;
		margin-bottom: 3px;
	}

	.open-hint {
		font-style: normal;
		font-size: 0.75rem;
		opacity: 0;
		transition: opacity 0.1s;
		color: var(--ink-dim);
	}

	.project-stack {
		font-family: var(--mono);
		font-size: 9px;
		color: var(--ink-dim);
		letter-spacing: 0.07em;
		margin-bottom: 5px;
	}

	.project-desc {
		font-size: 12px;
		color: var(--ink-muted);
		line-height: 1.7;
	}
</style>
