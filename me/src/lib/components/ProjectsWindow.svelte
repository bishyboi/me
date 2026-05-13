<script lang="ts">
	import { projects } from '$lib/data/projects';
</script>

{#each projects as p}
	<div class="project-entry">
		<div class="project-name">{p.name}</div>
		<div class="project-stack">{p.stack}</div>
		<div class="project-desc">{p.desc}</div>
	</div>
{/each}
<div class="placeholder">— more to come</div>

<style>
	.project-entry {
		padding: 0.85rem 0;
		border-bottom: 1px solid var(--rule);
	}

	.project-entry:last-of-type {
		border-bottom: none;
	}

	.project-name {
		font-size: 1rem;
		font-style: italic;
		color: var(--ink);
		line-height: 1.3;
		margin-bottom: 3px;
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

	.placeholder {
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.06em;
		color: var(--ink-dim);
		padding: 0.75rem 0 0;
	}
</style>
