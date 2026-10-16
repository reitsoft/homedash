<script lang="ts">


	let { tage }: { tage: Tag[] } = $props();
</script>

<ol class="flex h-full flex-col gap-2">
	{#each tage as t (t.datum)}
		<li
			class="min-h-0 overflow-hidden {t.istHeute
				? 'flex-[2] border-l-4 border-[#7fd1b9] bg-[#7fd1b9]/10 py-3 pl-5'
				: 'flex-1 py-1 pl-6'}"
		>
			<div class="flex items-baseline gap-3">
				<h2 class="font-handwriting {t.istHeute ? 'text-4xl' : 'text-2xl'}">
					{t.istHeute ? 'Heute' : t.wochentag}
				</h2>
				<span class="text-lg text-cream-100/70">{t.kurz}</span>
				{#if t.ferien}
					<span class="rounded-full bg-[#e9c46a]/20 px-3 py-0.5 text-sm text-[#e9c46a]">
						{t.ferien}
					</span>
				{/if}
			</div>

			{#if t.termine.length}
				<ul class="mt-1 space-y-0.5">
					{#each t.termine as x, i (i)}
						<li class="flex items-baseline gap-3 text-lg">
							<span class="w-20 shrink-0 text-cream-100/70 tabular-nums">{x.zeit ?? 'ganztags'}</span>
							<span>{x.titel}</span>
							{#if x.ort}<span class="text-cream-100/60">{x.ort}</span>{/if}
						</li>
					{/each}
				</ul>
			{:else}
				<p class="mt-1 text-lg text-cream-100/40">Keine Termine</p>
			{/if}
		</li>
	{/each}
</ol>
