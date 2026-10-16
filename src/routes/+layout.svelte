<script>
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import { invalidate } from '$app/navigation';
	
	import Heute from '#lib/components/tablet/seiten/Heute.svelte';
	import Rolladen from '#lib/components/tablet/seiten/Rolladen.svelte';
	import Energie from '#lib/components/tablet/seiten/Energie.svelte';

	let { children, data } = $props();
	let scroller;
	let active = $state(0);
	const AUTO_RESET_MS = 3 * 60_000;

	const seiten = [
		{ id: 'heute', titel: 'Heute', Seite: Heute },
		{ id: 'rolladen', titel: 'Rolladen', Seite: Rolladen },
		{ id: 'energie', titel: 'Energie', Seite: Energie }
	];

	function onscroll() {
		if (!scroller) return;
		active = Math.round(scroller.scrollLeft / scroller.clientWidth);
	}

	function gehe(index) {
		scroller?.scrollTo({ left: index * scroller.clientWidth, behavior: 'smooth' });
	}

	$effect(() => {
		if (active === 0) return;

		const timer = setTimeout(() => gehe(0), AUTO_RESET_MS);
		return () => clearTimeout(timer);
	});

	$effect(() => {
		const timer = setInterval(() => invalidate('app:agenda'), 15 * 60_000);
		return () => clearInterval(timer);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Dahoam – {seiten[active].titel}</title>
</svelte:head>

<main class="relative h-dvh overflow-hidden">
	<div
		bind:this={scroller}
		{onscroll}
		class="scrollbar-none flex h-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
	>
		{#each seiten as { id, Seite } (id)}
			<section class="h-full w-full shrink-0 snap-center snap-always p-gap">
				<Seite {data} />
			</section>
		{/each}
	</div>

	<nav
		class="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-2"
		aria-label="Dashboard-Seiten"
	>
		{#each seiten as s, i (s.id)}
			<button
				class="pointer-events-auto size-3 rounded-pill transition-colors {i === active
					? 'bg-cyan'
					: 'bg-line'}"
				aria-label={s.titel}
				aria-current={i === active ? 'page' : undefined}
				type="button"
				onclick={() => gehe(i)}
			></button>
		{/each}
	</nav>
	{@render children()}
</main>
