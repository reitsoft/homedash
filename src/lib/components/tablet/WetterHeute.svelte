<script>
	import { wetterIcon, wetterText } from '#lib/wetter-icons';

	let { wetter } = $props();
	const Jetzt = $derived(wetter ? wetterIcon(wetter.jetzt.code, wetter.jetzt.tag) : null);
</script>

<section aria-label="Wetter heute">
	{#if wetter && Jetzt}
		<div class="flex items-center gap-5">
			<Jetzt class="size-16 shrink-0" strokeWidth={1.5} />
			<div>
				<div class="text-5xl font-semibold tabular-nums">{Math.round(wetter.jetzt.temp)}°</div>
				<div class="text-lg text-cream-100/80">{wetterText(wetter.jetzt.code)}</div>
			</div>
			<dl class="ml-auto grid grid-cols-[auto_auto] gap-x-4 gap-y-0.5 text-right text-lg">
				<dt class="text-cream-100/60">Heute</dt>
				<dd class="tabular-nums">{wetter.min}° / {wetter.max}°</dd>
				<dt class="text-cream-100/60">Regen</dt>
				<dd class="tabular-nums">bis {wetter.regenMax} %</dd>
				<dt class="text-cream-100/60">Sonne</dt>
				<dd class="tabular-nums">{wetter.sonnenaufgang}–{wetter.sonnenuntergang}</dd>
			</dl>
		</div>

		<ul class="mt-5 grid grid-cols-6 gap-2">
			{#each wetter.stunden as s (s.zeit)}
				{@const Icon = wetterIcon(s.code, s.tag)}
				<li class="flex flex-col items-center gap-1">
					<span class="text-sm text-cream-100/60 tabular-nums">{s.zeit}</span>
					<Icon class="size-7" strokeWidth={1.5} />
					<span class="text-lg tabular-nums">{s.temp}°</span>
					<span class="text-sm text-cream-100/60 tabular-nums">{s.regen} %</span>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="text-xl text-cream-100/60">Wetterdaten momentan nicht verfügbar</p>
	{/if}
</section>
