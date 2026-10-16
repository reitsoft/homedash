<script>
	import Uhr from '#lib/components/tablet/Uhr.svelte';
	import WetterHeute from '#lib/components/tablet/WetterHeute.svelte';
	import StundenplanHeute from '#lib/components/tablet/StundenplanHeute.svelte';
	import TerminListe from '#lib/components/tablet/TerminListe.svelte';

	let { data } = $props();
	const heute = $derived(data.tage[0]);
</script>

<div class="grid h-full grid-cols-[5fr_4fr] gap-gap overflow-hidden p-gap">
	<section class="grid min-h-0 grid-rows-[auto_auto_minmax(0,1fr)] gap-gap">
		<div class="card">
			<Uhr wetter={data.wetter} />
		</div>

		<div class="card">
			<WetterHeute wetter={data.wetter} />
		</div>

		<div class="card min-h-0 overflow-hidden">
			<StundenplanHeute tag={heute} />
		</div>
	</section>

	<section class="card min-h-0 overflow-hidden" aria-label="Nächste 7 Tage">
		<TerminListe tage={data.tage} />
	</section>
</div>
