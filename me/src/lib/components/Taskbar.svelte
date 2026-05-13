<script lang="ts">
	import type { WinId } from '$lib/types';

	interface Props {
		winOrder: WinId[];
		openState: Record<WinId, boolean>;
		clock: string;
		onToggle: (id: WinId) => void;
		onCloseAll: () => void;
	}

	let { winOrder, openState, clock, onToggle, onCloseAll }: Props = $props();
</script>

<div class="taskbar">
	<span class="taskbar-label">open</span>
	{#each winOrder as id}
		<button
			class="taskbar-item"
			class:open={openState[id]}
			onclick={() => onToggle(id)}
		>{id}</button>
	{/each}
	<button class="taskbar-close-all" onclick={onCloseAll}>close all</button>
	<span class="taskbar-clock">{clock}</span>
</div>

<style>
	.taskbar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 36px;
		background: var(--paper);
		border-top: 1px solid var(--border);
		z-index: 100;
		display: flex;
		align-items: center;
		gap: 2px;
		padding: 0 18px;
	}

	.taskbar-label {
		font-family: var(--mono);
		font-size: 8px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--ink-dim);
		margin-right: 8px;
	}

	.taskbar-item {
		font-family: var(--serif);
		font-style: italic;
		font-size: 13px;
		color: var(--ink-dim);
		background: none;
		border: none;
		padding: 2px 8px;
		cursor: pointer;
		opacity: 0.5;
		transition: all 0.1s;
		line-height: 1;
		border-radius: 2px;
	}

	.taskbar-item.open {
        font-size: 20px;
		opacity: 1;
		color: var(--ink);
	}

	.taskbar-item:hover {
		background: var(--ink);
		color: var(--paper);
		opacity: 1;
	}

	.taskbar-close-all {
		margin-left: auto;
		font-family: var(--mono);
		font-size: 8px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--ink-dim);
		background: none;
		border: 1px solid var(--border);
		padding: 2px 7px;
		cursor: pointer;
		transition: all 0.1s;
		border-radius: 2px;
	}

	.taskbar-close-all:hover {
		background: var(--ink);
		color: var(--paper);
		border-color: var(--ink);
	}

	.taskbar-clock {
		margin-left: 12px;
		font-family: var(--mono);
		font-size: 9px;
		color: var(--ink-dim);
		letter-spacing: 0.08em;
	}

	@media (max-width: 768px) {
		.taskbar {
			display: none;
		}
	}
</style>
