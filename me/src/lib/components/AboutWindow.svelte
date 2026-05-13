<script lang="ts">
	import type { WinId } from '$lib/types';

	interface Props {
		onOpen: (id: WinId) => void;
	}

	let { onOpen }: Props = $props();
</script>

<div class="about-name">bishoy pramanik</div>
<div class="about-role">data scientist · software engineer · researcher · builder</div>
<p class="about-bio">
	I'm a computer science graduate from the University of Florida. 
    I have a background in both biomedical science and computer science,
    but I love to use my skills to bring my imagination to life. 
    Human-Computer Interaction, data visualization, computational geometry, 
    machine learning, and biomedical research are all fields I have experience in and enjoy working in. 
    I have a passion for learning and building, and I'm always looking for new opportunities to grow and create.

</p>
<p class="about-bio">
	I am a published first-author from my work at the Mayo Clinic.
    I love learning about new cultures and have taught myself French (B2), and conversational Spanish (B1) and Arabic (A2).

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
