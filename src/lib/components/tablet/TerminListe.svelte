<script lang="ts">
	let { tage }: { tage: Tag[] } = $props();
</script>

<ol class="flex h-full flex-col gap-2">
	{#each tage as t (t.datum)}
		<li
			class="min-h-0 overflow-hidden {t.istHeute
				? 'flex-[2] border-l-4 border-accent bg-surface-highlight px-5 py-3'
				: 'flex-1 border-b border-separator py-1 pl-6'}"
		>
			<div class="flex items-baseline gap-3">
				<h2
					class="font-handwriting {t.istHeute
						? 'text-4xl text-accent'
						: 'text-2xl text-foreground'}"
				>
					{t.istHeute ? 'Heute' : t.wochentag}
				</h2>
				<span class="text-lg text-muted">{t.kurz}</span>
				{#if t.ferien}
					<span class="bg-warning-surface px-3 py-0.5 text-sm text-warning">
						{t.ferien}
					</span>
				{/if}
			</div>

			{#if t.termine.length}
				<ul class="mt-1 space-y-0.5">
					{#each t.termine as x, i (i)}
						<li class="flex items-baseline gap-3 text-lg">
							<span class="w-20 shrink-0 text-muted tabular-nums">{x.zeit ?? 'ganztags'}</span>
							<span>{x.titel}</span>
							{#if x.ort}<span class="text-muted">{x.ort}</span>{/if}
						</li>
					{/each}
				</ul>
			{:else}
				<p class="mt-1 text-lg text-subtle">Keine Termine</p>
			{/if}
		</li>
	{/each}
</ol>
