<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		id: string;
		title?: string;
		open: boolean;
		z: number;
		x: number;
		y: number;
		width: number;
		isMobile: boolean;
		fixed?: boolean;
		maximized?: boolean;
		onClose: () => void;
		onFocus: () => void;
		onMove: (x: number, y: number) => void;
		onContextMenu?: (e: MouseEvent) => void;
		onMaximize?: () => void;
		onMinimize?: () => void;
		children: Snippet;
	}

	let { id, title, open, z, x, y, width, isMobile, fixed = false, maximized = false, onClose, onFocus, onMove, onContextMenu, onMaximize, onMinimize, children }: Props = $props();

	function draggable(node: HTMLElement) {
		const titlebar = node.querySelector('.win-title') as HTMLElement;
		if (!titlebar) return;

		let ox = 0, oy = 0, dragging = false;

		function onMousedown(e: MouseEvent) {
			const target = e.target as HTMLElement;
			if (target.classList.contains('win-close')) return;
			if (target.classList.contains('win-btn')) return;
			if (isMobile) return;
			if (maximized) return;
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
	class:maximized={maximized}
	style={maximized
		? `z-index: 8500;`
		: `${fixed ? 'position: fixed;' : ''}width:${width}px; left:${x}px; top:${y}px; z-index:${z};`}
	use:draggable
	oncontextmenu={onContextMenu}
>
	<div class="win-title" data-win={id}>
		<span class="win-title-text">{title ?? id}</span>
		<div class="win-controls">
			{#if maximized && onMinimize}
				<button class="win-btn win-minimize" onclick={onMinimize} title="Minimize">–</button>
			{:else if !maximized && onMaximize}
				<button class="win-btn win-maximize" onclick={onMaximize} title="Maximize">□</button>
			{/if}
			<button class="win-close" onclick={onClose}>×</button>
		</div>
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

	.win.maximized {
		position: fixed;
		left: 4vw;
		top: 20px;
		right: 4vw;
		bottom: 56px;
		width: auto;
		max-width: none;
	}

	.win.maximized .win-body {
		max-height: none;
		flex: 1;
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

	.win.maximized .win-title {
		cursor: default;
	}

	.win-title:active {
		cursor: grabbing;
	}

	.win.maximized .win-title:active {
		cursor: default;
	}

	.win-title-text {
		font-family: var(--serif);
		font-size: 17px;
		font-style: italic;
		color: var(--ink);
		line-height: 1.1;
	}

	.win-controls {
		display: flex;
		gap: 4px;
		align-items: center;
	}

	.win-btn {
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.08em;
		color: var(--ink-dim);
		background: none;
		border: 1px solid var(--border);
		border-radius: 2px;
		cursor: pointer;
		transition: all 0.1s;
		padding: 2px 5px;
		line-height: 1.4;
	}

	.win-btn:hover {
		background: var(--ink);
		color: var(--paper);
		border-color: var(--ink);
	}

	.win-close {
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.08em;
		color: var(--ink-dim);
		background: none;
		border: 1px solid var(--border);
		border-radius: 2px;
		cursor: pointer;
		transition: all 0.1s;
		padding: 2px 5px;
		line-height: 1.4;
	}

	.win-close:hover {
		background: var(--ink);
		color: var(--paper);
		border-color: var(--ink);
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
