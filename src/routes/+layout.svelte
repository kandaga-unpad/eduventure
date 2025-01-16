<script>
	import 'virtual:uno.css';
	import '@unocss/reset/tailwind-compat.css';
	import '../app.css';

	import NavBar from '$lib/components/layout/NavBar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Eduventure Universitas Padjadjaran</title>
</svelte:head>

<main>
	<header class="bg-white shadow-lg w-full fixed z-20">
		<NavBar />
	</header>

	<section>
		{@render children()}
	</section>

	<footer>
		<Footer />
	</footer>
</main>

<style>
</style>
