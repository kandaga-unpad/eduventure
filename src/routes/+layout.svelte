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
</main>

<style>
</style>
