<script lang="ts">
	import type { WinId } from '$lib/types';
	import { projects } from '$lib/data/projects';
	import { publications } from '$lib/data/publications';
	import { skillGroups } from '$lib/data/skills';

	interface Props {
		onOpen: (id: WinId) => void;
		onOpenProject: (id: string) => void;
		onClose: () => void;
	}

	let { onOpen, onOpenProject, onClose }: Props = $props();

	interface SearchResult {
		label: string;
		sublabel: string;
		tag: string;
		searchText: string;
		action: () => void;
	}

	const allResults: SearchResult[] = [
		{
			label: 'about',
			sublabel: 'bio · education · background',
			tag: 'window',
			searchText: 'about bishoy pramanik bio education background',
			action: () => onOpen('about')
		},
		{
			label: 'skills',
			sublabel: 'languages · frameworks · tools',
			tag: 'window',
			searchText: 'skills languages frameworks tools python javascript',
			action: () => onOpen('skills')
		},
		{
			label: 'projects',
			sublabel: 'all projects',
			tag: 'window',
			searchText: 'projects research software hardware robotics',
			action: () => onOpen('projects')
		},
		{
			label: 'publications',
			sublabel: 'research papers',
			tag: 'window',
			searchText: 'publications papers research spinal cord autonomic fmd',
			action: () => onOpen('publications')
		},
		{
			label: 'contact',
			sublabel: 'get in touch',
			tag: 'window',
			searchText: 'contact email get in touch',
			action: () => onOpen('contact')
		},
		...projects.map((p) => ({
			label: p.name,
			sublabel: p.stack.split(' · ').slice(0, 3).join(' · '),
			tag: 'project',
			searchText: `${p.name} ${p.desc} ${p.stack} ${p.category} ${p.status} ${p.outcomes.join(' ')}`,
			action: () => {
				onOpen('projects');
				onOpenProject(p.id);
			}
		})),
		...publications.map((pub) => ({
			label: pub.title,
			sublabel: pub.venue,
			tag: 'publication',
			searchText: `${pub.title} ${pub.venue} ${pub.authors}`,
			action: () => onOpen('publications')
		})),
		...skillGroups.flatMap((g) =>
			g.items.map((item) => ({
				label: item,
				sublabel: g.label,
				tag: 'skill',
				searchText: `${item} ${g.label}`,
				action: () => onOpen('skills')
			}))
		)
	];

	let query = $state('');
	let selected = $state(0);
	let inputEl: HTMLInputElement | undefined = $state(undefined);

	let results = $derived(
		query.trim().length === 0
			? allResults.filter((r) => r.tag === 'window')
			: allResults
					.filter((r) => r.searchText.toLowerCase().includes(query.trim().toLowerCase()))
					.slice(0, 12)
	);

	$effect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		query;
		selected = 0;
	});

	$effect(() => {
		inputEl?.focus();
	});

	function pick(result: SearchResult) {
		result.action();
		onClose();
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			e.preventDefault();
			onClose();
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			selected = Math.min(selected + 1, results.length - 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			selected = Math.max(selected - 1, 0);
		} else if (e.key === 'Enter' && results[selected]) {
			e.preventDefault();
			pick(results[selected]);
		}
	}
</script>

<div class="palette-backdrop" onclick={onClose} role="presentation">
	<div
		class="palette"
		onclick={(e) => e.stopPropagation()}
		role="dialog"
		aria-modal="true"
		aria-label="search"
	>
		<div class="palette-input-row">
			<span class="search-icon" aria-hidden="true">⌕</span>
			<input
				bind:this={inputEl}
				bind:value={query}
				class="palette-input"
				placeholder="search..."
				type="text"
				autocomplete="off"
				spellcheck="false"
				onkeydown={onKeydown}
			/>
			<kbd class="esc-hint">esc</kbd>
		</div>
		{#if results.length > 0}
			<ul class="results-list" role="listbox">
				{#each results as result, i (result.label + result.tag)}
					<li
						class="result-item"
						class:active={i === selected}
						role="option"
						aria-selected={i === selected}
						onclick={() => pick(result)}
						onmouseenter={() => {
							selected = i;
						}}
					>
						<span class="result-tag">{result.tag}</span>
						<span class="result-label">{result.label}</span>
						{#if result.sublabel}
							<span class="result-sublabel">{result.sublabel}</span>
						{/if}
					</li>
				{/each}
			</ul>
		{:else}
			<div class="no-results">no results</div>
		{/if}
	</div>
</div>

<style>
	.palette-backdrop {
		position: fixed;
		inset: 0;
		z-index: 9000;
		background: rgba(0, 0, 0, 0.2);
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding-top: 15vh;
	}

	.palette {
		background: var(--paper);
		border: 1px solid var(--border);
		box-shadow: 0 8px 40px rgba(60, 50, 40, 0.2);
		border-radius: 3px;
		width: min(580px, calc(100vw - 32px));
		max-height: 60vh;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.palette-input-row {
		display: flex;
		align-items: center;
		padding: 0 14px;
		border-bottom: 1px solid var(--border);
		gap: 10px;
		flex-shrink: 0;
	}

	.search-icon {
		font-size: 18px;
		color: var(--ink-dim);
		line-height: 1;
		flex-shrink: 0;
	}

	.palette-input {
		flex: 1;
		font-family: var(--mono);
		font-size: 13px;
		color: var(--ink);
		background: none;
		border: none;
		outline: none;
		padding: 14px 0;
		letter-spacing: 0.02em;
	}

	.palette-input::placeholder {
		color: var(--ink-dim);
	}

	.esc-hint {
		font-family: var(--mono);
		font-size: 9px;
		letter-spacing: 0.1em;
		color: var(--ink-dim);
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 2px;
		padding: 2px 5px;
		text-transform: uppercase;
		flex-shrink: 0;
	}

	.results-list {
		list-style: none;
		margin: 0;
		padding: 4px 0;
		overflow-y: auto;
	}

	.result-item {
		display: flex;
		align-items: baseline;
		gap: 10px;
		padding: 8px 14px;
		cursor: pointer;
		transition: background 0.07s;
		min-width: 0;
	}

	.result-item.active {
		background: var(--ink);
	}

	.result-item.active .result-tag,
	.result-item.active .result-label,
	.result-item.active .result-sublabel {
		color: var(--paper);
	}

	.result-tag {
		font-family: var(--mono);
		font-size: 8px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--ink-dim);
		flex-shrink: 0;
		width: 72px;
	}

	.result-label {
		font-family: var(--serif);
		font-style: italic;
		font-size: 15px;
		color: var(--ink);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		flex-shrink: 1;
		min-width: 0;
	}

	.result-sublabel {
		font-family: var(--mono);
		font-size: 9px;
		color: var(--ink-dim);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		flex-shrink: 2;
		min-width: 0;
		margin-left: auto;
	}

	.no-results {
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--ink-dim);
		padding: 20px 14px;
		text-align: center;
	}
</style>
