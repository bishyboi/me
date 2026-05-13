<script lang="ts">
	import { publications, researchAreas } from '$lib/data/publications';
</script>

{#each publications as pub}
	<div class="pub-entry">
		<div class="pub-title">
			<a href={pub.url} target="_blank">{pub.title}</a>
		</div>
		<div class="pub-venue">{pub.venue}</div>
		<div class="pub-authors">{pub.authors}</div>
	</div>
{/each}

<div class="group-label" style="margin-bottom:0.6rem">research areas</div>
<ul class="skill-list">
	{#each researchAreas as area}
		<li>{area}</li>
	{/each}
</ul>

<style>
	.pub-entry {
		padding: 0.85rem 0;
		border-bottom: 1px solid var(--rule);
	}

	.pub-entry:last-of-type {
		border-bottom: none;
	}

	.pub-title {
		font-size: 0.95rem;
		font-style: italic;
		line-height: 1.5;
		color: var(--ink);
		margin-bottom: 4px;
	}

	.pub-title :global(a) {
		color: var(--ink);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.pub-title :global(a:hover) {
		color: var(--ink-muted);
	}

	.pub-venue {
		font-family: var(--mono);
		font-size: 9px;
		color: var(--ink-dim);
		letter-spacing: 0.07em;
		margin-bottom: 3px;
	}

	.pub-authors {
		font-size: 11px;
		color: var(--ink-dim);
	}

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
