<script lang="ts">
	import { skillGroups } from '$lib/data/skills';
</script>

{#each skillGroups as group, i}
	<div style={i < skillGroups.length - 1 ? 'margin-bottom:1.2rem' : ''}>
		<div class="group-label">{group.label}</div>
		<ul class="skill-list">
			{#each group.items as item}
				<li>{item}</li>
			{/each}
		</ul>
	</div>
	{#if i < skillGroups.length - 1}
		<hr class="rule" />
	{/if}
{/each}

<style>
	.group-label {
		font-family: var(--mono);
		font-size: 9px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--ink-dim);
		margin-bottom: 0.4rem;
	}

	.skill-list {
		list-style: none;
		font-family: var(--serif);
		font-style: italic;
		font-size: 13px;
		color: var(--ink-muted);
		display: flex;
		flex-wrap: wrap;
	}

	.skill-list li:not(:last-child)::after {
		content: ', ';
		white-space: pre;
		font-style: normal;
	}

	.skill-list li:hover {
		color: var(--ink);
		cursor: default;
	}
</style>
