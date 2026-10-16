<script>
	import { wetterIcon, wetterText } from '#lib/wetter-icons';

	let { wetter } = $props();

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

	const Jetzt = $derived(wetter ? wetterIcon(wetter.jetzt.code, wetter.jetzt.tag) : null);
</script>

<header class="flex items-center justify-between gap-8">
	<!-- links: Uhrzeit + Datum -->
	<div>
		<div class="text-fg text-[clamp(4.5rem,10vw,8rem)] leading-none font-medium tabular-nums">
			{zeit}
		</div>
		<div class="text-muted mt-2 text-[clamp(1.25rem,2.4vw,1.9rem)]">{datum}</div>
	</div>

	<!-- rechts: aktuelles Wetter -->
	{#if wetter && Jetzt}
		<div class="shrink-0 text-right" aria-label="Wetter jetzt">
			<div class="flex items-center justify-end gap-4">
				<Jetzt class="text-fg size-16 shrink-0" strokeWidth={1.5} />
				<div class="text-left">
					<div class="text-5xl leading-none font-medium tabular-nums">
						{Math.round(wetter.jetzt.temp)}°
					</div>
					<div class="text-muted mt-1 text-lg">{wetterText(wetter.jetzt.code)}</div>
				</div>
			</div>

			<dl class="mt-4 grid grid-cols-[auto_auto] justify-end gap-x-6 gap-y-1 text-lg">
				<dt class="text-muted text-left">Heute</dt>
				<dd class="tabular-nums">{wetter.min}° / {wetter.max}°</dd>
				<dt class="text-muted text-left">Regen</dt>
				<dd class="tabular-nums">bis {wetter.regenMax} %</dd>
			</dl>
		</div>
	{/if}
</header>