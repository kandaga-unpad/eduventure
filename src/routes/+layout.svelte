<script>
	import 'virtual:uno.css';
	import '@unocss/reset/tailwind-compat.css';
	import '../app.css';

	import NavBar from '$lib/components/layout/NavBar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let { children, data } = $props();

	onMount(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});
</script>

<svelte:head>
	<title>Eduventure Universitas Padjadjaran</title>
</svelte:head>

<main>
	<header class="bg-white shadow-lg w-full fixed z-20">
		<NavBar />
	</header>
	{#key data.url}
		<section in:fly={{ y: -200, duration: 500, delay: 300 }} out:fade={{ duration: 300 }}>
			{@render children()}
		</section>
	{/key}

	<footer>
		<Footer />
	</footer>
</main>

<style>
</style>
