<script lang="ts">
	import type { WinId } from '$lib/types';

	interface Props {
		winOrder: WinId[];
		openState: Record<WinId, boolean>;
		isMobile: boolean;
		onOpen: (id: WinId) => void;
		onToggle: (id: WinId) => void;
	}

	let { winOrder, openState, isMobile, onOpen, onToggle }: Props = $props();
</script>

<div class="desktop-icons">
	<div class="index-header">index</div>
	{#each winOrder as id}
		<button
			class="icon-btn"
			class:active={openState[id]}
			ondblclick={!isMobile ? () => onOpen(id) : undefined}
			onclick={isMobile ? () => onToggle(id) : undefined}
		>{id}</button>
	{/each}
</div>

<style>
	.desktop-icons {
		position: fixed;
		top: 20px;
		left: 22px;
		display: flex;
		flex-direction: column;
		gap: 1px;
		z-index: 10;
	}

	.index-header {
		font-family: var(--mono);
		font-size: 9px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--ink-dim);
		padding: 0 0 6px 0;
		border-bottom: 1px solid var(--border);
		margin-bottom: 4px;
	}

	.icon-btn {
		display: block;
		font-family: var(--serif);
		font-style: italic;
		font-size: 13px;
		color: var(--ink-dim);
		background: none;
		border: none;
		padding: 2px 0;
		cursor: pointer;
		text-align: left;
		transition: color 0.1s;
		white-space: nowrap;
	}

	.icon-btn::before {
		content: '◦ ';
		font-style: normal;
		font-family: var(--mono);
		font-size: 10px;
	}

	.icon-btn.active::before {
		content: '• ';
		color: var(--ink);
	}

	.icon-btn:hover {
		color: var(--ink);
	}

	.icon-btn.active {
		color: var(--ink-muted);
	}

	@media (max-width: 768px) {
		.desktop-icons {
			position: sticky;
			top: 0;
			left: 0;
			width: 100%;
			flex-direction: row;
			flex-wrap: wrap;
			align-items: center;
			gap: 0;
			padding: 8px 16px;
			background: var(--paper);
			border-bottom: 1px solid var(--border);
			z-index: 200;
		}

		.index-header {
			margin-bottom: 0;
			margin-right: 10px;
			padding: 0 10px 0 0;
			border-bottom: none;
			border-right: 1px solid var(--border);
		}

		.icon-btn {
			font-size: 14px;
			padding: 4px 10px;
		}

		.icon-btn::before {
			content: none;
		}

		.icon-btn.active {
			color: var(--ink);
			border-bottom: 2px solid var(--ink);
		}
	}
</style>
