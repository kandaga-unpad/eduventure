<script>
	import 'virtual:uno.css';
	import '@unocss/reset/tailwind-compat.css';
	import '../app.css';

	import NavBar from '$lib/components/layout/NavBar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { page } from '$app/state';
	import { onNavigate } from '$app/navigation';
	import { desktopProfile, mobileMenu } from '$lib/composables/menuBtn';

	let { children, data } = $props();

	onMount(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});

	onNavigate(() => {
		$mobileMenu = false;
		$desktopProfile = false;
	});
</script>

<svelte:head>
	<title
		>Eduventure Universitas Padjadjaran | Mantapkan langkah menuju masa depanmu bersama Unpad
		Eduventure</title
	>
	<meta
		name="description"
		content="Temukan passion dan kenali pilihan studi masa depanmu dengan mengikuti Unpad Eduventure yang dirancang khusus untuk memberikanmu pengalaman kuliah di Universitas Padjadjaran."
	/>
	<meta
		property="og:title"
		content="Eduventure Universitas Padjadjaran | Mantapkan langkah menuju masa depanmu bersama Unpad Eduventure"
	/>
	<meta
		property="og:description"
		content="Temukan passion dan kenali pilihan studi masa depanmu dengan mengikuti Unpad Eduventure yang dirancang khusus untuk memberikanmu pengalaman kuliah di Universitas Padjadjaran."
	/>
	<meta property="og:image" content="/background.webp" />
</svelte:head>

<main>
	{#if !page.url.pathname.startsWith('/profile/tiket/')}
		<header class="bg-white shadow-lg w-full absolute z-20">
			<NavBar user={page.data.session?.user} />
		</header>
	{/if}
	{#key data.url}
		<section in:fly={{ y: -200, duration: 500, delay: 300 }} out:fade={{ duration: 300 }}>
			{@render children()}
		</section>
	{/key}

	{#if !page.url.pathname.startsWith('/profile/tiket/')}
		<footer>
			<Footer />
		</footer>
	{/if}
	<button
		class="fixed bottom-6 right-6 z-50 bg-brand-primary text-white rounded-full shadow-lg p-3 transition focus:outline-none focus:ring-2 focus:ring-primary-400"
		onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
		aria-label="Back to top"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="w-6 h-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 15l7-7 7 7" />
		</svg>
	</button>
</main>

<style>
</style>
