<script>
	import { invalidate } from '$app/navigation';
	import Uhr from '#lib/components/tablet/Uhr.svelte';
	import WetterHeute from '#lib/components/tablet/WetterHeute.svelte';
	import StundenplanHeute from '#lib/components/tablet/StundenplanHeute.svelte';
	import TerminListe from '#lib/components/tablet/TerminListe.svelte';

	let { data } = $props();
	const heute = $derived(data.tage[0]);

	// Jede Minute neu laden: Tageswechsel, geänderte JSON-Dateien, Wetter-Cache (15 min serverseitig)
	$effect(() => {
		const t = setInterval(() => invalidate('app:agenda'), 60_000);
		return () => clearInterval(t);
	});
</script>

<svelte:head><title>Dahoam – Heute</title></svelte:head>

<main
	class="grid h-dvh grid-cols-[5fr_4fr] gap-10 overflow-hidden bg-navy-950 p-8 text-cream-100 select-none"
>
	<section class="flex min-h-0 flex-col gap-6">
		<Uhr />
		<WetterHeute wetter={data.wetter} />
		<StundenplanHeute tag={heute} />
	</section>
	<section class="min-h-0" aria-label="Nächste 7 Tage">
		<TerminListe tage={data.tage} />
	</section>
</main>
