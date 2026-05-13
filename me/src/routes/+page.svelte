<script lang="ts">
	import { onMount } from 'svelte';

	type WinId = 'about' | 'skills' | 'projects' | 'publications' | 'contact';

	interface WinState {
		open: boolean;
		z: number;
		x: number;
		y: number;
	}

	const defaultPositions: Record<WinId, { x: number; y: number; w: number }> = {
		about:    { x: 140, y: 48,  w: 480 },
		skills:   { x: 660, y: 60,  w: 360 },
		projects: { x: 200, y: 44,  w: 520 },
		publications: { x: 700, y: 180, w: 480 },
		contact:  { x: 720, y: 180, w: 300 }
	};

	const winOrder: WinId[] = ['about', 'skills', 'projects', 'publications', 'contact'];

	let zTop = $state(10);
	let isMobile = $state(false);

	let wins = $state<Record<WinId, WinState>>({
		about:    { open: false, z: 10, x: defaultPositions.about.x,    y: defaultPositions.about.y    },
		skills:   { open: false, z: 10, x: defaultPositions.skills.x,   y: defaultPositions.skills.y   },
		projects: { open: false, z: 10, x: defaultPositions.projects.x, y: defaultPositions.projects.y },
		publications: { open: false, z: 10, x: defaultPositions.publications.x, y: defaultPositions.publications.y },
		contact:  { open: false, z: 10, x: defaultPositions.contact.x,  y: defaultPositions.contact.y  }
	});

	function focusWin(id: WinId) {
		wins[id].z = ++zTop;
	}

	function openWin(id: WinId) {
		wins[id].open = true;
		focusWin(id);
	}

	function closeWin(id: WinId) {
		wins[id].open = false;
	}

	function toggleWin(id: WinId) {
		wins[id].open ? closeWin(id) : openWin(id);
	}

	function makeDraggable(node: HTMLElement, id: WinId) {
		const titlebar = node.querySelector('.win-title') as HTMLElement;
		if (!titlebar) return;

		let ox = 0, oy = 0, dragging = false;

		function onMousedown(e: MouseEvent) {
			if ((e.target as HTMLElement).classList.contains('win-close')) return;
			if (isMobile) return;
			dragging = true;
			ox = e.clientX - wins[id].x;
			oy = e.clientY - wins[id].y;
			focusWin(id);
			e.preventDefault();
		}

		function onMousemove(e: MouseEvent) {
			if (!dragging) return;
			const maxX = window.innerWidth - node.offsetWidth;
			const maxY = window.innerHeight - node.offsetHeight - 36;
			wins[id].x = Math.max(0, Math.min(e.clientX - ox, maxX));
			wins[id].y = Math.max(0, Math.min(e.clientY - oy, maxY));
		}

		function onMouseup() { dragging = false; }

		titlebar.addEventListener('mousedown', onMousedown);
		document.addEventListener('mousemove', onMousemove);
		document.addEventListener('mouseup', onMouseup);
		node.addEventListener('mousedown', () => focusWin(id));

		return {
			destroy() {
				titlebar.removeEventListener('mousedown', onMousedown);
				document.removeEventListener('mousemove', onMousemove);
				document.removeEventListener('mouseup', onMouseup);
			}
		};
	}

	let clock = $state('');

	function tick() {
		clock = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}

	onMount(() => {
		tick();
		const interval = setInterval(tick, 1000);

		const mq = window.matchMedia('(max-width: 768px)');
		isMobile = mq.matches;
		if (isMobile) {
			winOrder.forEach(id => { wins[id].open = true; });
		}

		const onChange = (e: MediaQueryListEvent) => {
			isMobile = e.matches;
			if (isMobile) {
				winOrder.forEach(id => { wins[id].open = true; });
			}
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

<!-- left rail: bullet journal index / mobile top nav -->
<div class="desktop-icons">
	<div class="index-header">index</div>
	{#each winOrder as id}
		<button
			class="icon-btn"
			class:active={wins[id].open}
			ondblclick={!isMobile ? () => openWin(id) : undefined}
			onclick={isMobile ? () => toggleWin(id) : undefined}
		>{id}</button>
	{/each}
</div>

<!-- desktop -->
<div class="desktop">

	<!-- ABOUT -->
	<div
		class="win"
		class:hidden={!wins.about.open}
		style="width:{defaultPositions.about.w}px; left:{wins.about.x}px; top:{wins.about.y}px; z-index:{wins.about.z}"
		use:makeDraggable={'about'}
	>
		<div class="win-title" data-win="about">
			<div class="win-title-inner">
				<span class="win-tag">collection</span>
				<span class="win-title-text">about</span>
			</div>
			<button class="win-close" onclick={() => closeWin('about')}>×</button>
		</div>
		<div class="win-body">
			<div class="about-name">bishoy pramanik</div>
			<div class="about-role">software engineer · researcher · builder</div>
			<p class="about-bio">
				Engineer and researcher working at the intersection of biomedical science and software.
				I build tools that turn messy clinical data into insight — from ultrasound edge-detection
				pipelines to ML-driven patient clustering — and ship the systems that make them usable.
			</p>
			<p class="about-bio">
				Published first-author research at Mayo Clinic.
				Passionate about open-source science, interactive software, and things that last.
			</p>
			<hr class="rule" />
			<div class="about-links">
				<a class="about-link" href="https://github.com/bishyboi" target="_blank">↗ github</a>
				<button class="about-link" onclick={() => openWin('publications')}>↗ publications</button>
				<button class="about-link" onclick={() => openWin('contact')}>↗ contact</button>
			</div>
		</div>
	</div>

	<!-- SKILLS -->
	<div
		class="win"
		class:hidden={!wins.skills.open}
		style="width:{defaultPositions.skills.w}px; left:{wins.skills.x}px; top:{wins.skills.y}px; z-index:{wins.skills.z}"
		use:makeDraggable={'skills'}
	>
		<div class="win-title" data-win="skills">
			<div class="win-title-inner">
				<span class="win-tag">collection</span>
				<span class="win-title-text">skills</span>
			</div>
			<button class="win-close" onclick={() => closeWin('skills')}>×</button>
		</div>
		<div class="win-body">
			<div style="margin-bottom:1.2rem">
				<div class="group-label">languages</div>
				<ul class="skill-list">
					{#each ['Python','JavaScript','TypeScript','C++','SQL','Bash'] as s}
						<li>{s}</li>
					{/each}
				</ul>
			</div>
			<hr class="rule" />
			<div style="margin-bottom:1.2rem">
				<div class="group-label">frameworks &amp; tools</div>
				<ul class="skill-list">
					{#each ['SvelteKit','Tailwind CSS','React','PyTorch','GitHub Actions','OpenAI API'] as s}
						<li>{s}</li>
					{/each}
				</ul>
			</div>
			<hr class="rule" />
			<div>
				<div class="group-label">data science &amp; ml</div>
				<ul class="skill-list">
					{#each ['UMAP','HDBSCAN','GroundingDINO','LLaVA','Llama','scikit-learn','OpenCV'] as s}
						<li>{s}</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>

	<!-- PROJECTS -->
	<div
		class="win"
		class:hidden={!wins.projects.open}
		style="width:{defaultPositions.projects.w}px; left:{wins.projects.x}px; top:{wins.projects.y}px; z-index:{wins.projects.z}"
		use:makeDraggable={'projects'}
	>
		<div class="win-title" data-win="projects">
			<div class="win-title-inner">
				<span class="win-tag">collection</span>
				<span class="win-title-text">projects</span>
			</div>
			<button class="win-close" onclick={() => closeWin('projects')}>×</button>
		</div>
		<div class="win-body">
			{#each [
				{
					name: 'BWave.US — FMD Assessment Tool',
					stack: 'Python · OpenCV · Signal Processing · open-source',
					desc: 'Open-source brachial ultrasound edge-detection pipeline for flow mediated dilation assessment. Improved automated vessel wall detection with novel edge algorithms. In review at medRxiv.'
				},
				{
					name: 'Scene Graph Generation Pipeline',
					stack: 'GroundingDINO · LLaVA · Llama · Python',
					desc: 'Automated visual-to-relational dataset pipeline integrating object detection and vision-language models to generate structured relationship triples. Improved precision by 46.9%.'
				},
				{
					name: 'Clinical Clustering — Autonomic Dysfunction',
					stack: 'UMAP · HDBSCAN · KMeans · Python',
					desc: 'UMAP + clustering pipeline on high-dimensional SCI clinical data. Identified SCI-dominant patient clusters correlated with autonomic dysfunction severity.'
				},
				{
					name: 'Technical Portfolio & Engineering Blog',
					stack: 'SvelteKit · Tailwind CSS · GitHub Actions · SSG',
					desc: 'High-performance personal site with CI/CD, dynamic Markdown routing, and Static Site Generation. Automated deployment to GitHub Pages.'
				},
				{
					name: 'Embedded AI Chatbot',
					stack: 'Python · OpenAI API · Raspberry Pi · TTS',
					desc: 'Interactive physical chatbot on embedded hardware. OpenAI API integration generating real-time audio responses.'
				}
			] as p}
				<div class="project-entry">
					<div class="project-name">{p.name}</div>
					<div class="project-stack">{p.stack}</div>
					<div class="project-desc">{p.desc}</div>
				</div>
			{/each}
			<div class="placeholder">— more to come</div>
		</div>
	</div>

	<!-- PUBLICATIONS -->
	<div
		class="win"
		class:hidden={!wins.publications.open}
		style="width:{defaultPositions.publications.w}px; left:{wins.publications.x}px; top:{wins.publications.y}px; z-index:{wins.publications.z}"
		use:makeDraggable={'publications'}
	>
		<div class="win-title" data-win="publications">
			<div class="win-title-inner">
				<span class="win-tag">collection</span>
				<span class="win-title-text">publications</span>
			</div>
			<button class="win-close" onclick={() => closeWin('publications')}>×</button>
		</div>
		<div class="win-body">
			<div class="pub-entry">
				<div class="pub-title"><a href="https://onlinelibrary.wiley.com/doi/10.1002/pmrj.70069" target="_blank">Increased symptomatic autonomic dysfunction is associated with greater cardiovascular endothelial dysfunction following spinal cord injury</a></div>
				<div class="pub-venue">PM&amp;R · 2025 · DOI: 10.1002/pmrj.70069</div>
				<div class="pub-authors">Pramanik B, Fernandez KA, Seidel-Miller K, Park A, Solinsky R</div>
			</div>
			<div class="pub-entry">
				<div class="pub-title"><a href="https://www.medrxiv.org/content/10.1101/2025.03.18.25324231v1" target="_blank">A translational open-source flow mediated dilation assessment tool with improved automated edge detection</a></div>
				<div class="pub-venue">medRxiv · 2025 · In review · DOI: 10.1101/2025.03.18.25324231</div>
				<div class="pub-authors">Pramanik B, Veith D, Fernandez KA, Asp AJ, Solinsky R</div>
			</div>
			<hr class="rule" />
			<div class="group-label" style="margin-bottom:0.6rem">areas</div>
			<ul class="skill-list">
				{#each ['Spinal Cord Injury','Autonomic Dysfunction','Flow Mediated Dilation','Vascular Endothelium','Biomedical Signal Processing','Computer Vision'] as area}
					<li>{area}</li>
				{/each}
			</ul>
		</div>
	</div>

	<!-- CONTACT -->
	<div
		class="win"
		class:hidden={!wins.contact.open}
		style="width:{defaultPositions.contact.w}px; left:{wins.contact.x}px; top:{wins.contact.y}px; z-index:{wins.contact.z}"
		use:makeDraggable={'contact'}
	>
		<div class="win-title" data-win="contact">
			<div class="win-title-inner">
				<span class="win-tag">collection</span>
				<span class="win-title-text">contact</span>
			</div>
			<button class="win-close" onclick={() => closeWin('contact')}>×</button>
		</div>
		<div class="win-body">
			<div class="contact-row">
				<span class="contact-label">email</span>
				<a class="contact-val" href="mailto:bishoypramanik@gmail.com">bishoypramanik@gmail.com</a>
			</div>
			<div class="contact-row">
				<span class="contact-label">github</span>
				<a class="contact-val" href="https://github.com/bishyboi" target="_blank">github.com/bishyboi</a>
			</div>
			<div class="contact-row">
				<span class="contact-label">linkedin</span>
				<a class="contact-val" href="https://linkedin.com/in/bishoypramanik" target="_blank">linkedin.com/in/bishoypramanik</a>
			</div>
			<div class="contact-row">
				<span class="contact-label">location</span>
				<span class="contact-val">Tampa, FL</span>
			</div>
		</div>
	</div>

</div><!-- /desktop -->

<!-- taskbar: journal footer strip -->
<div class="taskbar">
	<span class="taskbar-label">open</span>
	{#each winOrder as id}
		<button
			class="taskbar-item"
			class:open={wins[id].open}
			onclick={() => toggleWin(id)}
		>{id}</button>
	{/each}
	<span class="taskbar-clock">{clock}</span>
</div>

<style>
	:global(*) { box-sizing: border-box; margin: 0; padding: 0; }

	:global(:root) {
		--bg: #ede8de;
		--paper: #f7f3ec;
		--ink: #1e1b18;
		--ink-muted: #5a5048;
		--ink-dim: #9e9088;
		--rule: #d8d1c8;
		--border: #c8c1b6;
		--serif: 'DM Serif Display', Georgia, serif;
		--mono: 'DM Mono', 'Courier New', monospace;
	}

	:global(body) {
		font-family: var(--serif);
		background-color: var(--bg);
		background-image: radial-gradient(circle, #b8b0a4 1px, transparent 1px);
		background-size: 22px 22px;
		color: var(--ink);
		min-height: 100vh;
		overflow: hidden;
		user-select: none;
	}

	/* left rail index */
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
	.icon-btn.active::before { content: '• '; color: var(--ink); }
	.icon-btn:hover { color: var(--ink); }
	.icon-btn.active { color: var(--ink-muted); }

	/* desktop */
	.desktop {
		position: relative;
		width: 100vw;
		height: 100vh;
		z-index: 1;
	}

	/* windows — journal spread pages */
	.win {
		position: absolute;
		background: var(--paper);
		border: 1px solid var(--border);
		box-shadow: 2px 3px 12px rgba(60,50,40,0.10);
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

	/* journal page header */
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

	.win-title:active { cursor: grabbing; }

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
		font-size: 16px;
		color: var(--ink-dim);
		background: none;
		border: none;
		cursor: pointer;
		transition: color 0.1s;
		padding: 0 2px;
		line-height: 1;
	}
	.win-close:hover { color: var(--ink); }

	/* window body — ruled lines bleed through content */
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

	:global(::-webkit-scrollbar) { width: 3px; }
	:global(::-webkit-scrollbar-track) { background: transparent; }
	:global(::-webkit-scrollbar-thumb) { background: var(--border); }

	hr.rule {
		border: none;
		border-top: 1px solid var(--border);
		margin: 1.2rem 0;
	}

	/* ABOUT */
	.about-name {
		font-size: 2.4rem;
		font-family: var(--serif);
		font-style: italic;
		line-height: 1.05;
		margin-bottom: 0.15em;
		color: var(--ink);
	}

	.about-role {
		font-family: var(--mono);
		font-size: 9px;
		color: var(--ink-dim);
		letter-spacing: 0.14em;
		text-transform: uppercase;
		margin-bottom: 1.4rem;
	}

	.about-bio {
		color: var(--ink-muted);
		font-size: 13px;
		line-height: 1.85;
		margin-bottom: 0.85rem;
	}

	.about-links { display: flex; flex-wrap: wrap; gap: 0; margin-top: 0.3rem; }

	.about-link {
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.06em;
		color: var(--ink-muted);
		text-decoration: none;
		padding: 2px 10px 2px 0;
		background: none;
		border: none;
		cursor: pointer;
		transition: color 0.1s;
	}
	.about-link:first-child { padding-left: 0; }
	.about-link:hover { color: var(--ink); }

	/* SKILLS */
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
	.skill-list li:not(:last-child)::after { content: ', '; white-space: pre; font-style: normal; }
	.skill-list li:hover { color: var(--ink); cursor: default; }

	/* PROJECTS */
	.project-entry {
		padding: 0.85rem 0;
		border-bottom: 1px solid var(--rule);
	}
	.project-entry:last-of-type { border-bottom: none; }

	.project-name {
		font-size: 1rem;
		font-style: italic;
		color: var(--ink);
		line-height: 1.3;
		margin-bottom: 3px;
	}

	.project-stack {
		font-family: var(--mono);
		font-size: 9px;
		color: var(--ink-dim);
		letter-spacing: 0.07em;
		margin-bottom: 5px;
	}

	.project-desc {
		font-size: 12px;
		color: var(--ink-muted);
		line-height: 1.7;
	}

	/* RESEARCH */
	.pub-entry {
		padding: 0.85rem 0;
		border-bottom: 1px solid var(--rule);
	}
	.pub-entry:last-of-type { border-bottom: none; }

	.pub-title { font-size: 0.95rem; font-style: italic; line-height: 1.5; color: var(--ink); margin-bottom: 4px; }
	.pub-title :global(a) { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
	.pub-title :global(a:hover) { color: var(--ink-muted); }
	.pub-venue { font-family: var(--mono); font-size: 9px; color: var(--ink-dim); letter-spacing: 0.07em; margin-bottom: 3px; }
	.pub-authors { font-size: 11px; color: var(--ink-dim); }

	/* CONTACT */
	.contact-row {
		display: flex;
		gap: 1rem;
		padding: 0.65rem 0;
		border-bottom: 1px solid var(--rule);
		align-items: baseline;
	}
	.contact-row:last-child { border-bottom: none; }

	.contact-label {
		font-family: var(--mono);
		font-size: 9px;
		color: var(--ink-dim);
		letter-spacing: 0.12em;
		text-transform: uppercase;
		min-width: 56px;
		flex-shrink: 0;
	}

	.contact-val {
		font-family: var(--serif);
		font-size: 13px;
		font-style: italic;
		color: var(--ink-muted);
		text-decoration: none;
		transition: color 0.1s;
	}
	.contact-val:hover { color: var(--ink); }

	.placeholder {
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.06em;
		color: var(--ink-dim);
		padding: 0.75rem 0 0;
	}

	/* TASKBAR — journal footer */
	.taskbar {
		position: fixed;
		bottom: 0; left: 0; right: 0;
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
	.taskbar-item.open { opacity: 1; color: var(--ink); }
	.taskbar-item:hover { background: var(--ink); color: var(--paper); opacity: 1; }

	.taskbar-clock {
		margin-left: auto;
		font-family: var(--mono);
		font-size: 9px;
		color: var(--ink-dim);
		letter-spacing: 0.08em;
	}

	/* ── MOBILE ── */
	@media (max-width: 768px) {
		:global(body) {
			overflow: auto;
			user-select: text;
		}

		/* horizontal sticky nav strip */
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

		/* remove bullets in horizontal layout */
		.icon-btn::before { content: none; }

		/* active underline instead of bullet */
		.icon-btn.active {
			color: var(--ink);
			border-bottom: 2px solid var(--ink);
		}

		/* desktop becomes scrollable column of cards */
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

		/* windows become static stacked cards */
		.win {
			position: static !important;
			width: 100% !important;
			max-width: 100% !important;
			min-width: 0;
			box-shadow: 1px 2px 8px rgba(60,50,40,0.08);
		}

		/* hidden windows disappear entirely; unhide via nav tap */
		.win.hidden {
			display: none;
			opacity: 1;
			transform: none;
			pointer-events: auto;
		}

		/* no grab cursor in card mode */
		.win-title {
			cursor: default;
		}
		.win-title:active { cursor: default; }

		/* let body height control scrolling, not the window */
		.win-body {
			max-height: none;
			overflow-y: visible;
		}

		/* hide taskbar — nav strip replaces it */
		.taskbar {
			display: none;
		}

		/* slightly larger touch targets for contact links */
		.contact-val {
			font-size: 12px;
			word-break: break-all;
		}
	}
</style>
