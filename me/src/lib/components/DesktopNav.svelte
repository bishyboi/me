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

<div class="sidebar-bg"></div>
<div class="desktop-icons">
	<div class="index-header">index</div>
	{#each winOrder as id}
		<button
			class="icon-btn"
			class:active={openState[id]}
			onclick={() => onToggle(id)}
		>{id}</button>
	{/each}
</div>
<div class="v-rule"></div>

<style>
	.desktop-icons {
		position: fixed;
		top: 20px;
		left: 22px;
		display: flex;
		flex-direction: column;
		gap: 1px;
		z-index: 5;
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
		font-size: 16px;
		color: var(--ink-dim);
		background: none;
		border: none;
		padding: 2px 0;
		cursor: pointer;
		text-align: left;
		transition: color 0.1s;
		white-space: nowrap;
	}

	.icon-btn:hover {
		color: var(--ink);
	}

	.icon-btn.active {
		color: var(--ink-muted);
	}

	.sidebar-bg {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		width: 155px;
		background: var(--bg);
		z-index: 4;
	}

	.v-rule {
		position: fixed;
		top: 0;
		bottom: 36px;
		left: 155px;
		width: 1px;
		background: var(--border);
		z-index: 5;
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

		.icon-btn.active {
			color: var(--ink);
			border-bottom: 2px solid var(--ink);
		}

		.sidebar-bg {
			display: none;
		}

		.v-rule {
			display: none;
		}
	}
</style>
