<script lang="ts">
	import type { WinId } from '$lib/types';

	interface Props {
		onOpen: (id: WinId) => void;
	}

	let { onOpen }: Props = $props();
</script>

<div class="about-name">bishoy pramanik</div>
<div class="about-role">software engineer · researcher · builder</div>
<p class="about-bio">
	Engineer and researcher working at the intersection of biomedical science and software. I build
	tools that turn messy clinical data into insight — from ultrasound edge-detection pipelines to
	ML-driven patient clustering — and ship the systems that make them usable.
</p>
<p class="about-bio">
	Published first-author research at Mayo Clinic. Passionate about open-source science, interactive
	software, and things that last.
</p>
<hr class="rule" />
<div class="about-links">
	<a class="about-link" href="https://github.com/bishyboi" target="_blank">↗ github</a>
	<button class="about-link" onclick={() => onOpen('publications')}>↗ publications</button>
	<button class="about-link" onclick={() => onOpen('contact')}>↗ contact</button>
</div>

<style>
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

	.about-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0;
		margin-top: 0.3rem;
	}

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

	.about-link:first-child {
		padding-left: 0;
	}

	.about-link:hover {
		color: var(--ink);
	}
</style>
