<script>
	let rolladen = $state([
		{ id: 'esszimmer_ost', name: 'Esszimmer Ost', position: 100, x: 22, y: 4 },
		{ id: 'terrasse', name: 'Terrasse', position: 100, x: 50, y: 4 },
		{ id: 'wohnzimmer_ost', name: 'Wohnzimmer Ost', position: 45, x: 80, y: 4 },
		{ id: 'wohnzimmer_sued', name: 'Wohnzimmer Süd', position: 100, x: 96, y: 26 },
		{ id: 'gaestezimmer', name: 'Gästezimmer', position: 100, x: 96, y: 72 },
		{ id: 'wc', name: 'WC', position: 80, x: 77, y: 96 },
		{ id: 'kueche_west', name: 'Küche West', position: 10, x: 23, y: 96 },
		{ id: 'kueche_nord', name: 'Küche Nord', position: 80, x: 3, y: 72 },
		{ id: 'esszimmer_nord', name: 'Esszimmer Nord', position: 80, x: 3, y: 27 }
	]);

	function setAlle(position) {
		rolladen = rolladen.map((rollo) => ({ ...rollo, position }));
	}

	function setPosition(id, position) {
		rolladen = rolladen.map((rollo) => (rollo.id === id ? { ...rollo, position } : rollo));
	}

	function status(position) {
		if (position === 100) return 'Offen';
		if (position === 0) return 'Geschlossen';
		return 'Teilweise geöffnet';
	}
</script>

<div class="h-full overflow-hidden">
	<section class="card grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-gap">
		<header class="flex flex-wrap items-end justify-between gap-3">
			<div>
				<p class="card-label">Zuhause</p>
				<h1 class="text-3xl font-light text-fg sm:text-4xl">Rolladen</h1>
				<p class="mt-1 text-muted">Steuere alle Rolladen oder einzelne Räume.</p>
			</div>

			<div class="flex mb-3 gap-2 pb-2">
				<button class="btn-outline w-full rounded-pill" type="button" onclick={() => setAlle(0)}>
					↓ Alle runter
				</button>
				<button class="btn-outline w-full rounded-pill" type="button" onclick={() => setAlle(100)}>
					↑ Alle hoch
				</button>
			</div>
		</header>

		<div
			class="grid min-h-0 min-w-0 gap-gap"
			style="grid-template-columns: minmax(0, 4fr) minmax(0, 1fr); grid-template-rows: minmax(0, 1fr);"
		>
			<!-- Linke Spalte: Grundriss (80 %) -->
			<div
				class="min-h-0 min-w-0 overflow-hidden rounded-lg bg-white/5"
				style="container-type: size; display: grid; place-items: center;"
			>
				<div
					class="relative"
					style="aspect-ratio: 1163 / 912; width: min(100cqw, calc(100cqh * 1.275219));"
				>
					<img
						class="absolute inset-0 size-full rounded-xl object-contain"
						src="/images/layout.jpg"
						alt="Grundriss mit markierten Rolladen im Esszimmer, Wohnzimmer, in der Küche und im Bad"
					/>
					{#each rolladen as rollo (rollo.id)}
						<button
							class="absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white text-sm font-medium text-bg shadow-lg transition-transform hover:scale-110 {rollo.position ===
							100
								? 'bg-cyan'
								: rollo.position === 0
									? 'bg-blue'
									: 'bg-amber-300'}"
							style="left: {rollo.x}%; top: {rollo.y}%;"
							type="button"
							aria-label="{rollo.name}: {status(
								rollo.position
							)}, {rollo.position} Prozent. Umschalten."
							title="{rollo.name}: {status(rollo.position)}"
							onclick={() => setPosition(rollo.id, rollo.position === 100 ? 0 : 100)}
						>
							{rollo.position}%
						</button>
					{/each}
				</div>
			</div>

			<!-- Rechte Spalte: Bedienelemente (20 %) -->
			<aside
				class="flex min-h-0 min-w-0 flex-col overflow-y-auto rounded-lg border border-line bg-track/50 p-3"
			>
				<ul class="divide-y divide-line">
					{#each rolladen as rollo (rollo.id)}
						<li class="py-3 first:pt-0 last:pb-0">
							<div class="space-x-05 mb-1 flex items-center justify-between">
								<p class="truncate text-sm font-normal">{rollo.name}</p>
								<p class="truncate text-xs text-muted">
									{status(rollo.position)} · {rollo.position}%
								</p>
							</div>
							<div class="flex gap-2">
								<button
									class="btn-outline w-full rounded-pill"
									type="button"
									aria-label="{rollo.name} Rolladen herunterfahren"
									onclick={() => setPosition(rollo.id, 0)}
								>
									↓ Runter
								</button>
								<button
									class="btn-outline w-full rounded-pill"
									type="button"
									aria-label="{rollo.name} Rolladen hochfahren"
									onclick={() => setPosition(rollo.id, 100)}
								>
									↑ Hoch
								</button>
							</div>
						</li>
					{/each}
				</ul>
			</aside>
		</div>
	</section>
</div>
