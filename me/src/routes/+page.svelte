<script lang="ts">
	import { onMount } from 'svelte';
	import type { WinId, WinState } from '$lib/types';
	import Window from '$lib/components/Window.svelte';
	import AboutWindow from '$lib/components/AboutWindow.svelte';
	import SkillsWindow from '$lib/components/SkillsWindow.svelte';
	import ProjectsWindow from '$lib/components/ProjectsWindow.svelte';
	import PublicationsWindow from '$lib/components/PublicationsWindow.svelte';
	import ContactWindow from '$lib/components/ContactWindow.svelte';
	import DesktopNav from '$lib/components/DesktopNav.svelte';
	import Taskbar from '$lib/components/Taskbar.svelte';
	import ProjectDetailWindow from '$lib/components/ProjectDetailWindow.svelte';
	import SearchPalette from '$lib/components/SearchPalette.svelte';
	import { projects } from '$lib/data/projects';

	const winOrder: WinId[] = ['about', 'skills', 'projects', 'publications', 'contact'];

	const defaultPositions: Record<WinId, { x: number; y: number; w: number }> = {
		about:        { x: 175, y: 50,  w: 480 },
		skills:       { x: 680, y: 70,  w: 360 },
		projects:     { x: 200, y: 44,  w: 520 },
		publications: { x: 700, y: 180, w: 480 },
		contact:      { x: 1065, y: 90, w: 300 }
	};

	// Minimum viewport widths to show each cascaded window on load
	const showSkillsAt  = defaultPositions.skills.x  + defaultPositions.skills.w  + 20; // ~1060
	const showContactAt = defaultPositions.contact.x + defaultPositions.contact.w + 20; // ~1385

	let zTop = $state(100);
	let isMobile = $state(false);
	let clock = $state('');
	let searchOpen = $state(false);

	let wins = $state<Record<WinId, WinState>>({
		about:        { open: false, z: 13, x: defaultPositions.about.x,        y: defaultPositions.about.y        },
		skills:       { open: false, z: 12, x: defaultPositions.skills.x,       y: defaultPositions.skills.y       },
		projects:     { open: false, z: 10, x: defaultPositions.projects.x,     y: defaultPositions.projects.y     },
		publications: { open: false, z: 10, x: defaultPositions.publications.x, y: defaultPositions.publications.y },
		contact:      { open: false, z: 11, x: defaultPositions.contact.x,      y: defaultPositions.contact.y      }
	});

	function focusWin(id: WinId) { wins[id].z = ++zTop; }
	function openWin(id: WinId)  { wins[id].open = true; focusWin(id); }
	function closeWin(id: WinId) { wins[id].open = false; }
	function toggleWin(id: WinId) { wins[id].open ? closeWin(id) : openWin(id); }
	function moveWin(id: WinId, x: number, y: number) { wins[id].x = x; wins[id].y = y; }
	function closeAll() {
		winOrder.forEach(id => { wins[id].open = false; });
		Object.keys(projectWins).forEach(id => { projectWins[id].open = false; });
	}

	function openSearch() { searchOpen = true; }
	function closeSearch() { searchOpen = false; }

	let ctxMenu = $state<{ visible: boolean; x: number; y: number; winId?: string }>({ visible: false, x: 0, y: 0 });

	function showWinCtx(e: MouseEvent, winId: string) {
		e.preventDefault();
		e.stopPropagation();
		ctxMenu = { visible: true, x: e.clientX, y: e.clientY, winId };
	}

	function showDesktopCtx(e: MouseEvent) {
		e.preventDefault();
		ctxMenu = { visible: true, x: e.clientX, y: e.clientY };
	}

	function hideCtx() { ctxMenu.visible = false; }

	function ctxCloseWin() {
		if (!ctxMenu.winId) return;
		if ((winOrder as string[]).includes(ctxMenu.winId)) {
			closeWin(ctxMenu.winId as WinId);
		} else {
			closeProjectWin(ctxMenu.winId);
		}
		hideCtx();
	}

	function ctxCloseAll() { closeAll(); hideCtx(); }

	function ctxSearch() { hideCtx(); openSearch(); }

	let projectWins = $state<Record<string, { open: boolean; z: number; x: number; y: number; projectId: string; maximized: boolean }>>({});

	function openProjectWin(id: string) {
		if (projectWins[id]) {
			projectWins[id].open = true;
			projectWins[id].z = ++zTop;
			projectWins[id].maximized = true;
		} else {
			projectWins[id] = {
				open: true,
				z: ++zTop,
				x: defaultPositions.projects.x + 40,
				y: defaultPositions.projects.y + 40,
				projectId: id,
				maximized: true
			};
		}
	}
	function closeProjectWin(id: string) { projectWins[id].open = false; }
	function focusProjectWin(id: string) { projectWins[id].z = ++zTop; }
	function moveProjectWin(id: string, x: number, y: number) { projectWins[id].x = x; projectWins[id].y = y; }
	function maximizeProjectWin(id: string) { projectWins[id].maximized = true; projectWins[id].z = ++zTop; }
	function minimizeProjectWin(id: string) { projectWins[id].maximized = false; }

	let anyProjectMaximized = $derived(Object.values(projectWins).some(pw => pw.open && pw.maximized));

	function minimizeAllMaximized() {
		Object.keys(projectWins).forEach(id => {
			if (projectWins[id].open && projectWins[id].maximized) projectWins[id].maximized = false;
		});
	}

	function openState(): Record<WinId, boolean> {
		return Object.fromEntries(winOrder.map(id => [id, wins[id].open])) as Record<WinId, boolean>;
	}

	function onWindowKeydown(e: KeyboardEvent) {
		if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
			e.preventDefault();
			openSearch();
		} else if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
			e.preventDefault();
			openSearch();
		} else if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
			e.preventDefault();
			openSearch();
		}
	}

	onMount(() => {
		clock = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
		const interval = setInterval(() => {
			clock = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
		}, 1000);

		const mq = window.matchMedia('(max-width: 768px)');
		isMobile = mq.matches;
		if (isMobile) {
			winOrder.forEach(id => { wins[id].open = true; });
		} else {
			const vw = window.innerWidth;
			wins.about.open = true;
			if (vw >= showSkillsAt)  wins.skills.open  = true;
			if (vw >= showContactAt) wins.contact.open = true;
		}

		const onChange = (e: MediaQueryListEvent) => {
			isMobile = e.matches;
			if (isMobile) winOrder.forEach(id => { wins[id].open = true; });
		};
		mq.addEventListener('change', onChange);

		return () => {
			clearInterval(interval);
			mq.removeEventListener('change', onChange);
		};
	});
</script>

<svelte:head>
	<title>bishoy pramanik</title>
</svelte:head>

<svelte:window onclick={hideCtx} onkeydown={onWindowKeydown} />

<DesktopNav
	{winOrder}
	openState={openState()}
	{isMobile}
	onOpen={openWin}
	onToggle={toggleWin}
/>

<div class="desktop-bg" oncontextmenu={showDesktopCtx}></div>

<button class="search-btn" onclick={openSearch} title="Search (Ctrl+K)" aria-label="Search">⌕</button>

<div class="desktop">
	<Window
		id="about"
		open={wins.about.open}
		z={wins.about.z}
		x={wins.about.x}
		y={wins.about.y}
		width={defaultPositions.about.w}
		{isMobile}
		onClose={() => closeWin('about')}
		onFocus={() => focusWin('about')}
		onMove={(x, y) => moveWin('about', x, y)}
		onContextMenu={(e) => showWinCtx(e, 'about')}
	>
		<AboutWindow onOpen={openWin} />
	</Window>

	<Window
		id="skills"
		open={wins.skills.open}
		z={wins.skills.z}
		x={wins.skills.x}
		y={wins.skills.y}
		width={defaultPositions.skills.w}
		{isMobile}
		onClose={() => closeWin('skills')}
		onFocus={() => focusWin('skills')}
		onMove={(x, y) => moveWin('skills', x, y)}
		onContextMenu={(e) => showWinCtx(e, 'skills')}
	>
		<SkillsWindow />
	</Window>

	<Window
		id="projects"
		open={wins.projects.open}
		z={wins.projects.z}
		x={wins.projects.x}
		y={wins.projects.y}
		width={defaultPositions.projects.w}
		{isMobile}
		onClose={() => closeWin('projects')}
		onFocus={() => focusWin('projects')}
		onMove={(x, y) => moveWin('projects', x, y)}
		onContextMenu={(e) => showWinCtx(e, 'projects')}
	>
		<ProjectsWindow onOpenProject={openProjectWin} />
	</Window>

	<Window
		id="publications"
		open={wins.publications.open}
		z={wins.publications.z}
		x={wins.publications.x}
		y={wins.publications.y}
		width={defaultPositions.publications.w}
		{isMobile}
		onClose={() => closeWin('publications')}
		onFocus={() => focusWin('publications')}
		onMove={(x, y) => moveWin('publications', x, y)}
		onContextMenu={(e) => showWinCtx(e, 'publications')}
	>
		<PublicationsWindow />
	</Window>

	<Window
		id="contact"
		open={wins.contact.open}
		z={wins.contact.z}
		x={wins.contact.x}
		y={wins.contact.y}
		width={defaultPositions.contact.w}
		{isMobile}
		onClose={() => closeWin('contact')}
		onFocus={() => focusWin('contact')}
		onMove={(x, y) => moveWin('contact', x, y)}
		onContextMenu={(e) => showWinCtx(e, 'contact')}
	>
		<ContactWindow />
	</Window>

</div>

{#if anyProjectMaximized}
	<div class="project-backdrop" onclick={minimizeAllMaximized}></div>
{/if}

{#each Object.values(projectWins) as pw (pw.projectId)}
	{#if pw.open}
		{@const project = projects.find(p => p.id === pw.projectId)}
		{#if project}
			<Window
				id={`project-${pw.projectId}`}
				title={project.name}
				open={pw.open}
				z={pw.z}
				x={pw.x}
				y={pw.y}
				width={580}
				{isMobile}
				fixed={true}
				maximized={pw.maximized}
				onClose={() => closeProjectWin(pw.projectId)}
				onFocus={() => focusProjectWin(pw.projectId)}
				onMove={(x, y) => moveProjectWin(pw.projectId, x, y)}
				onContextMenu={(e) => showWinCtx(e, pw.projectId)}
				onMaximize={() => maximizeProjectWin(pw.projectId)}
				onMinimize={() => minimizeProjectWin(pw.projectId)}
			>
				<ProjectDetailWindow {project} />
			</Window>
		{/if}
	{/if}
{/each}

{#if ctxMenu.visible}
	<div
		class="ctx-menu"
		style="left:{ctxMenu.x}px; top:{ctxMenu.y}px"
		onclick={(e) => e.stopPropagation()}
	>
		{#if ctxMenu.winId}
			<button class="ctx-item" onclick={ctxCloseWin}>close</button>
		{/if}
		<button class="ctx-item" onclick={ctxSearch}>search</button>
		<button class="ctx-item" onclick={ctxCloseAll}>close all</button>
	</div>
{/if}

{#if searchOpen}
	<SearchPalette onOpen={openWin} onOpenProject={openProjectWin} onClose={closeSearch} />
{/if}

<Taskbar {winOrder} openState={openState()} {clock} onToggle={toggleWin} onCloseAll={closeAll} />

<style>
	.desktop-bg {
		position: fixed;
		inset: 0 0 36px 0;
		z-index: 3;
	}

	.desktop {
		position: relative;
		width: 100vw;
		height: 100vh;
		z-index: 20;
		pointer-events: none;
	}

	.project-backdrop {
		position: fixed;
		inset: 0;
		z-index: 8000;
		background: rgba(0, 0, 0, 0.2);
	}

	.ctx-menu {
		position: fixed;
		z-index: 999;
		background: var(--paper);
		border: 1px solid var(--border);
		box-shadow: 2px 3px 10px rgba(60, 50, 40, 0.12);
		border-radius: 2px;
		display: flex;
		flex-direction: column;
		min-width: 110px;
		padding: 3px 0;
	}

	.ctx-item {
		font-family: var(--mono);
		font-size: 9px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--ink-dim);
		background: none;
		border: none;
		padding: 6px 14px;
		cursor: pointer;
		text-align: left;
		transition: all 0.1s;
	}

	.ctx-item:hover {
		background: var(--ink);
		color: var(--paper);
	}

	.search-btn {
		position: fixed;
		top: 12px;
		right: 18px;
		z-index: 10;
		background: var(--ink-muted);
		border: 1px solid var(--ink-muted);
		border-radius: 2px;
		color: var(--paper);
		font-size: 22px;
		line-height: 1;
		padding: 3px 8px 5px;
		cursor: pointer;
		transition: all 0.1s;
	}

	.search-btn:hover {
		background: var(--ink);
		color: var(--paper);
		border-color: var(--ink);
	}

	@media (max-width: 768px) {
		.search-btn {
			top: 8px;
			right: 12px;
			z-index: 210;
		}
	}

	@media (max-width: 768px) {
		.desktop {
			position: static;
			width: 100%;
			height: auto;
			display: flex;
			flex-direction: column;
			gap: 16px;
			padding: 16px;
			padding-bottom: 24px;
		}
	}
</style>
