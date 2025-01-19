<script>
	import { fade } from 'svelte/transition';

	let showMobile = $state(false);

	const menuBtn = () => {
		showMobile = !showMobile;
	};
</script>

<nav class="container ma flex justify-between items-center py-2 px-5">
	<div>
		<a href="/">
			<img src="/logo.webp" alt="Eduventure" class="max-w-50" />
		</a>
	</div>
	<div class="flex items-center gap-10">
		<div class="hidden md:flex items-center gap-5">
			<a href="/">Home</a>
			<a href="/eduventure">Daftar Eduventure</a>
		</div>
		<div class="hidden md:block">
			<a href="/login">Login</a>
		</div>
		<div class="md:hidden">
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<button id="menu-button" class="focus:outline-none bg-transparent" onclick={menuBtn}>
				<svg
					class="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16m-7 6h7"
					></path>
				</svg>
			</button>
		</div>
	</div>
</nav>
{#if showMobile}
	<div
		id="mobile-menu"
		class="absolute left-0 w-full h-screen bg-gray-1/95"
		in:fade={{ duration: 300 }}
		out:fade={{ duration: 300 }}
	>
		<div class="p-5 mt-10">
			<button class="absolute right-0 top-0 p-5" onclick={menuBtn}>&#10006;</button>
			<div class="flex flex-col items-center justify-center gap-5">
				<a href="/">Home</a>
				<a href="/eduventure">Daftar Eduventure</a>
				<a href="/login" class="btn bg-brand-primary w-full mt-10 text-white text-center">Login</a>
			</div>
		</div>
	</div>
{/if}

<style>
	a {
		@apply hover:text-blue no-underline;
	}
</style>
