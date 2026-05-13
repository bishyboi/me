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
	<a
		class="contact-val"
		href="https://linkedin.com/in/bishoypramanik"
		target="_blank">linkedin.com/in/bishoypramanik</a
	>
</div>
<div class="contact-row">
	<span class="contact-label">location</span>
	<span class="contact-val">Tampa, FL</span>
</div>

<style>
	.contact-row {
		display: flex;
		gap: 1rem;
		padding: 0.65rem 0;
		border-bottom: 1px solid var(--rule);
		align-items: baseline;
	}

	.contact-row:last-child {
		border-bottom: none;
	}

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

	.contact-val:hover {
		color: var(--ink);
	}

	@media (max-width: 768px) {
		.contact-val {
			font-size: 12px;
			word-break: break-all;
		}
	}
</style>
