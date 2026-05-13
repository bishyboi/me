<script lang="ts">
	import type { Project } from '$lib/types';

	let { project }: { project: Project } = $props();
</script>

<div class="detail">
	<div class="header">
		<div class="title-row">
			<h1>{project.name}</h1>
			<span class="status-badge" data-status={project.status.toLowerCase().split(' ')[0]}>{project.status}</span>
		</div>
		<div class="meta-row">
			<span class="date">{project.date}</span>
			<span class="sep">·</span>
			<span class="category">{project.category}</span>
		</div>
		<div class="stack">{project.stack}</div>
	</div>

	<p class="long-desc">{project.longDesc}</p>

	{#if project.images && project.images.length > 0}
		<div class="media">
			{#each project.images as img}
				<figure>
					<img src={img.src} alt={img.caption ?? ''} />
					{#if img.caption}
						<figcaption>{img.caption}</figcaption>
					{/if}
				</figure>
			{/each}
		</div>
	{/if}

	{#if project.outcomes.length > 0}
		<div class="section">
			<div class="section-label">outcomes</div>
			<ul>
				{#each project.outcomes as outcome}
					<li>{outcome}</li>
				{/each}
			</ul>
		</div>
	{/if}

	{#if project.links.length > 0}
		<div class="links">
			{#each project.links as link}
				<a href={link.url} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>
			{/each}
		</div>
	{/if}
</div>

<style>
	.detail {
		padding: 0.25rem 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.header {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.title-row {
		display: flex;
		align-items: flex-start;
		gap: 0.6rem;
		flex-wrap: wrap;
	}

	h1 {
		font-size: 1.05rem;
		font-style: italic;
		color: var(--ink);
		line-height: 1.3;
		margin: 0;
		font-weight: 400;
	}

	.status-badge {
		font-family: var(--mono);
		font-size: 9px;
		letter-spacing: 0.06em;
		padding: 2px 7px;
		border-radius: 99px;
		border: 1px solid var(--rule);
		color: var(--ink-dim);
		white-space: nowrap;
		align-self: center;
	}

	.status-badge[data-status="completed"] {
		border-color: #4a7c59;
		color: #4a7c59;
	}

	.status-badge[data-status="published"] {
		border-color: #5a6ea0;
		color: #5a6ea0;
	}

	.status-badge[data-status="in"] {
		border-color: #a07a30;
		color: #a07a30;
	}

	.meta-row {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 11px;
		color: var(--ink-dim);
	}

	.sep {
		opacity: 0.4;
	}

	.stack {
		font-family: var(--mono);
		font-size: 9px;
		color: var(--ink-dim);
		letter-spacing: 0.07em;
	}

	.long-desc {
		font-size: 12px;
		color: var(--ink-muted);
		line-height: 1.75;
		margin: 0;
		white-space: pre-line;
	}

	.media {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	figure {
		margin: 0;
	}

	figure img {
		max-width: 100%;
		border-radius: 4px;
		border: 1px solid var(--rule);
	}

	figcaption {
		font-size: 10px;
		color: var(--ink-dim);
		margin-top: 4px;
		font-style: italic;
	}

	.section {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.section-label {
		font-family: var(--mono);
		font-size: 9px;
		letter-spacing: 0.1em;
		color: var(--ink-dim);
		text-transform: uppercase;
	}

	ul {
		margin: 0;
		padding-left: 1.1rem;
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	li {
		font-size: 12px;
		color: var(--ink-muted);
		line-height: 1.6;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding-top: 0.25rem;
		border-top: 1px solid var(--rule);
	}

	.links a {
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.05em;
		color: var(--ink-dim);
		text-decoration: none;
		padding: 3px 8px;
		border: 1px solid var(--rule);
		border-radius: 4px;
		transition: color 0.15s, border-color 0.15s;
	}

	.links a:hover {
		color: var(--ink);
		border-color: var(--ink-dim);
	}
</style>
