<script>
	let { tag } = $props();

	const hm = () =>
		new Date().toLocaleTimeString('de-DE', {
			hour: '2-digit',
			minute: '2-digit',
			timeZone: 'Europe/Berlin'
		});
	let jetzt = $state(hm());

	$effect(() => {
		const t = setInterval(() => (jetzt = hm()), 20_000);
		return () => clearInterval(t);
	});
</script>

<section class="panel min-h-0 flex-1" aria-label="Schule heute">
	{#if tag.ferien}
		<p class="font-handwriting text-4xl text-warning">{tag.ferien}</p>
		<p class="mt-1 text-xl text-muted">Heute keine Schule</p>
	{:else if tag.unterricht.length === 0}
		<p class="font-handwriting text-4xl">Schulfrei</p>
		<p class="mt-1 text-xl text-muted">Heute kein Unterricht</p>
	{:else}
		<h2 class="font-handwriting mb-2 text-3xl text-accent">Schule heute</h2>
		<ol class="space-y-1 text-foreground">
			{#each tag.unterricht as u (u.nr)}
				{@const laufend = u.von <= jetzt && jetzt < u.bis}
				{@const vorbei = u.bis <= jetzt}
				<li
					class="grid grid-cols-[1.5rem_7.5rem_1fr_auto] items-baseline gap-3 border-b border-separator px-3 py-1.5 text-xl last:border-0
					{laufend ? 'bg-surface-highlight font-semibold text-accent-foreground' : ''} {vorbei
						? 'text-subtle'
						: ''}"
				>
					<span class="tabular-nums">{u.nr}</span>
					<span class="tabular-nums">{u.von}–{u.bis}</span>
					<span>{u.fach}</span>
					<span class="text-lg text-muted">{u.raum ?? ''}</span>
				</li>
			{/each}
		</ol>
	{/if}
</section>
