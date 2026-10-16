<script>
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import Heute from '#lib/components/tablet/seiten/Heute.svelte';
	import Rolladen from '#lib/components/tablet/seiten/Rolladen.svelte';
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';

	let { children, data } = $props();
	let scroller;
	let active = $state(0);
	let settleTimer;

	const seiten = [
		{ id: 'heute', titel: 'Heute', path: '/', Seite: Heute },
		{ id: 'rolladen', titel: 'Rolladen', path: '/rolladen', Seite: Rolladen }
	];

	$effect(() => {
		if (!scroller) return;
		clearTimeout(settleTimer);
		const index = page.route.id === '/rolladen' ? 1 : 0;
		active = index;
		scroller.scrollTo({ left: index * scroller.clientWidth, behavior: 'instant' });
	});

	function onscroll() {
		if (!scroller) return;
		active = Math.round(scroller.scrollLeft / scroller.clientWidth);
		clearTimeout(settleTimer);
		settleTimer = setTimeout(synchronisiereRoute, 500);
	}

	function synchronisiereRoute() {
		const index = Math.round(scroller.scrollLeft / scroller.clientWidth);
		const route = resolve(seiten[index].path);
		if (page.url.pathname !== route) {
			goto(route, { reset: false });
		}
	}

	function gehe(index) {
		scroller?.scrollTo({ left: index * scroller.clientWidth, behavior: 'smooth' });
	}

	$effect(() => {
		const timer = setInterval(() => invalidate('app:agenda'), 15 * 60_000);
		return () => clearInterval(timer);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Dahoam</title>
</svelte:head>

<main class="relative h-dvh overflow-hidden">
	<div
		bind:this={scroller}
		{onscroll}
		onscrollend={synchronisiereRoute}
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
