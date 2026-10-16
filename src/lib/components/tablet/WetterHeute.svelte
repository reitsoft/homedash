<script>
	import { wetterIcon } from '#lib/wetter-icons';

	let { wetter } = $props();
</script>

<section aria-label="Wetter im Tagesverlauf">
	{#if wetter}
		<ul class="grid grid-cols-6">
			{#each wetter.stunden as s (s.zeit)}
				{@const Icon = wetterIcon(s.code, s.tag)}
				<li class="border-line flex flex-col items-center gap-1 border-l px-2 first:border-0">
					<span class="text-muted text-sm tabular-nums">{s.zeit}</span>
					<Icon class="text-fg size-7" strokeWidth={1.5} />
					<span class="text-lg tabular-nums">{s.temp}°</span>
					<span class="text-muted text-sm tabular-nums">{s.regen} %</span>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="text-muted text-xl">Wetterdaten momentan nicht verfügbar</p>
	{/if}
</section>