<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { WinId } from '$lib/types';

	interface Props {
		id: WinId;
		open: boolean;
		z: number;
		x: number;
		y: number;
		width: number;
		isMobile: boolean;
		onClose: () => void;
		onFocus: () => void;
		onMove: (x: number, y: number) => void;
		children: Snippet;
	}

	let { id, open, z, x, y, width, isMobile, onClose, onFocus, onMove, children }: Props = $props();

	function draggable(node: HTMLElement) {
		const titlebar = node.querySelector('.win-title') as HTMLElement;
		if (!titlebar) return;

		let ox = 0, oy = 0, dragging = false;

		function onMousedown(e: MouseEvent) {
			if ((e.target as HTMLElement).classList.contains('win-close')) return;
			if (isMobile) return;
			dragging = true;
			ox = e.clientX - x;
			oy = e.clientY - y;
			onFocus();
			e.preventDefault();
		}

		function onMousemove(e: MouseEvent) {
			if (!dragging) return;
			const maxX = window.innerWidth - node.offsetWidth;
			const maxY = window.innerHeight - node.offsetHeight - 36;
			onMove(
				Math.max(0, Math.min(e.clientX - ox, maxX)),
				Math.max(0, Math.min(e.clientY - oy, maxY))
			);
		}

		function onMouseup() {
			dragging = false;
		}

		titlebar.addEventListener('mousedown', onMousedown);
		document.addEventListener('mousemove', onMousemove);
		document.addEventListener('mouseup', onMouseup);
		node.addEventListener('mousedown', onFocus);

		return {
			destroy() {
				titlebar.removeEventListener('mousedown', onMousedown);
				document.removeEventListener('mousemove', onMousemove);
				document.removeEventListener('mouseup', onMouseup);
			}
		};
	}
</script>

<div
	class="win"
	class:hidden={!open}
	style="width:{width}px; left:{x}px; top:{y}px; z-index:{z}"
	use:draggable
>
	<div class="win-title" data-win={id}>
		<div class="win-title-inner">
			<span class="win-tag">collection</span>
			<span class="win-title-text">{id}</span>
		</div>
		<button class="win-close" onclick={onClose}>×</button>
	</div>
	<div class="win-body">
		{@render children()}
	</div>
</div>

<style>
	.win {
		position: absolute;
		pointer-events: auto;
		background: var(--paper);
		border: 1px solid var(--border);
		box-shadow: 2px 3px 12px rgba(60, 50, 40, 0.1);
		min-width: 280px;
		max-width: min(640px, calc(100vw - 80px));
		display: flex;
		flex-direction: column;
		overflow: hidden;
		transition: opacity 0.15s, transform 0.15s;
	}

	.win.hidden {
		opacity: 0;
		pointer-events: none;
		transform: scale(0.98);
	}

	.win-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 14px 8px;
		background: var(--paper);
		border-bottom: 2px solid var(--ink);
		cursor: grab;
		flex-shrink: 0;
	}

	.win-title:active {
		cursor: grabbing;
	}

	.win-title-inner {
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.win-tag {
		font-family: var(--mono);
		font-size: 8px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--ink-dim);
	}

	.win-title-text {
		font-family: var(--serif);
		font-size: 17px;
		font-style: italic;
		color: var(--ink);
		line-height: 1.1;
	}

	.win-close {
		font-family: var(--mono);
		font-size: 22px;
		color: var(--ink-dim);
		background: none;
		border: none;
		cursor: pointer;
		transition: color 0.1s;
		padding: 0 2px;
		line-height: 1;
	}

	.win-close:hover {
		color: var(--ink);
	}

	.win-body {
		padding: 16px 22px 20px;
		overflow-y: auto;
		flex: 1;
		max-height: calc(100vh - 100px);
		font-family: var(--serif);
		font-size: 14px;
		line-height: 1.9;
		color: var(--ink);
		position: relative;
	}

	@media (max-width: 768px) {
		.win {
			position: static !important;
			width: 100% !important;
			max-width: 100% !important;
			min-width: 0;
			box-shadow: 1px 2px 8px rgba(60, 50, 40, 0.08);
		}

		.win.hidden {
			display: none;
			opacity: 1;
			transform: none;
			pointer-events: auto;
		}

		.win-title {
			cursor: default;
		}

		.win-title:active {
			cursor: default;
		}

		.win-body {
			max-height: none;
			overflow-y: visible;
		}
	}
</style>
