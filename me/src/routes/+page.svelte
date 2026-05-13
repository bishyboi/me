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

	const winOrder: WinId[] = ['about', 'skills', 'projects', 'publications', 'contact'];

	const defaultPositions: Record<WinId, { x: number; y: number; w: number }> = {
		about:        { x: 140, y: 48,  w: 480 },
		skills:       { x: 660, y: 60,  w: 360 },
		projects:     { x: 200, y: 44,  w: 520 },
		publications: { x: 700, y: 180, w: 480 },
		contact:      { x: 720, y: 180, w: 300 }
	};

	let zTop = $state(10);
	let isMobile = $state(false);
	let clock = $state('');

	let wins = $state<Record<WinId, WinState>>({
		about:        { open: false, z: 10, x: defaultPositions.about.x,        y: defaultPositions.about.y        },
		skills:       { open: false, z: 10, x: defaultPositions.skills.x,       y: defaultPositions.skills.y       },
		projects:     { open: false, z: 10, x: defaultPositions.projects.x,     y: defaultPositions.projects.y     },
		publications: { open: false, z: 10, x: defaultPositions.publications.x, y: defaultPositions.publications.y },
		contact:      { open: false, z: 10, x: defaultPositions.contact.x,      y: defaultPositions.contact.y      }
	});

	function focusWin(id: WinId) { wins[id].z = ++zTop; }
	function openWin(id: WinId)  { wins[id].open = true; focusWin(id); }
	function closeWin(id: WinId) { wins[id].open = false; }
	function toggleWin(id: WinId) { wins[id].open ? closeWin(id) : openWin(id); }
	function moveWin(id: WinId, x: number, y: number) { wins[id].x = x; wins[id].y = y; }
	function closeAll() { winOrder.forEach(id => { wins[id].open = false; }); }

	function openState(): Record<WinId, boolean> {
		return Object.fromEntries(winOrder.map(id => [id, wins[id].open])) as Record<WinId, boolean>;
	}

	onMount(() => {
		clock = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
		const interval = setInterval(() => {
			clock = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
		}, 1000);

		const mq = window.matchMedia('(max-width: 768px)');
		isMobile = mq.matches;
		if (isMobile) winOrder.forEach(id => { wins[id].open = true; });

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

<DesktopNav
	{winOrder}
	openState={openState()}
	{isMobile}
	onOpen={openWin}
	onToggle={toggleWin}
/>

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
	>
		<ProjectsWindow />
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
	>
		<ContactWindow />
	</Window>
</div>

<Taskbar {winOrder} openState={openState()} {clock} onToggle={toggleWin} onCloseAll={closeAll} />

<style>
	.desktop {
		position: relative;
		width: 100vw;
		height: 100vh;
		z-index: 20;
		pointer-events: none;
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
