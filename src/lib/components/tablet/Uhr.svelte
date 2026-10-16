<script>
	const TZ = 'Europe/Berlin';
	let jetzt = $state(new Date());

	$effect(() => {
		const t = setInterval(() => (jetzt = new Date()), 1000);
		return () => clearInterval(t);
	});

	const zeit = $derived(
		jetzt.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', timeZone: TZ })
	);
	const datum = $derived(
		jetzt.toLocaleDateString('de-DE', {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
			year: 'numeric',
			timeZone: TZ
		})
	);
</script>

<header>
	<div class="font-handwriting text-[clamp(4.5rem,10vw,8rem)] leading-none tabular-nums">{zeit}</div>
	<div class="mt-2 text-[clamp(1.25rem,2.4vw,1.9rem)] text-cream-100/80">{datum}</div>
</header>
