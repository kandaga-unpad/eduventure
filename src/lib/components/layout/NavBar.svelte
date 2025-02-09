<script>
	// @ts-nocheck
	import { fade } from 'svelte/transition';
	import { SignIn, SignOut } from '@auth/sveltekit/components';
	import { mobileMenu, desktopProfile } from '$lib/composables/menuBtn';

	let showMobile = $state(mobileMenu);
	let profile = $state(desktopProfile);
	let { user } = $props();

	const menuBtn = () => {
		$showMobile = !$showMobile;
	};
</script>

<nav class="container ma flex justify-between items-center py-2 px-5">
	<div>
		<a href="/">
			<img src="/Logo-Eduventure.png" alt="Eduventure" class="w-full max-w-70" />
		</a>
	</div>
	<div class="flex items-center gap-10">
		<div class="hidden md:flex items-center gap-5">
			<a href="/" class="hover:text-blue-6">Home</a>
			<a href="/eduventure" class="hover:text-blue-6">Daftar Eduventure</a>
		</div>
		{#if user}
			<div class="hidden md:(block)">
				<button onclick={() => ($profile = !$profile)} class="focus:outline-none">
					<img src={user.image} class="w-10 h-10 rounded" alt="" referrerpolicy="no-referrer" />
				</button>
			</div>
			{#if $profile}
				<div
					class="bg-white shadow-xl absolute top-25 right-20 w-60 p-5 rounded flex flex-col gap-2"
					in:fade={{ duration: 300 }}
					out:fade={{ duration: 300 }}
				>
					<button class="absolute right-0 top-0 p-5" onclick={() => ($profile = !$profile)}
						>&#10006;</button
					>
					<div class="flex items-center gap-2">
						<img src={user.image} class="w-8 h-8 rounded" alt="" referrerpolicy="no-referrer" />
						<p class="text-sm">Halo, {user.name}!</p>
					</div>
					<div class="flex text-center">
						<a
							href="/profile/tiket"
							class="profile-btn bg-brand-secondary text-dark hover:text-white w-full">Tiket Saya</a
						>
					</div>
					<div class="flex items-center justify-center w-full text-center gap-2">
						<a href="/profile" class="profile-btn bg-brand-primary text-white">Profile</a>
						<SignOut>
							<div slot="submitButton" class="profile-btn bg-red-6 text-white">Logout</div>
						</SignOut>
					</div>
				</div>
			{/if}
		{:else}
			<div class="hidden md:block">
				<SignIn>
					<div slot="submitButton" class="btn bg-brand-primary text-white">Login</div>
				</SignIn>
			</div>
		{/if}

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
{#if $showMobile}
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
				{#if user}
					<div class="flex flex-col items-center gap-2">
						<img src={user.image} class="w-18 h-18 rounded" alt="" referrerpolicy="no-referrer" />
						<p class="text-sm">Halo, {user.name}!</p>
					</div>
					<div class="flex text-center">
						<a
							href="/profile/tiket"
							class="profile-btn bg-brand-secondary text-dark hover:text-white w-full">Tiket Saya</a
						>
					</div>
					<div class="flex items-center justify-center text-center gap-2">
						<a href="/profile" class="profile-btn bg-brand-primary text-white">Profile</a>
						<SignOut>
							<div slot="submitButton" class="profile-btn bg-red-6 text-white w-full">Logout</div>
						</SignOut>
					</div>
				{:else}
					<SignIn>
						<div slot="submitButton" class="btn bg-brand-primary text-white">Login</div>
					</SignIn>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	a {
		@apply no-underline;
	}

	.profile-btn {
		@apply btn py-1 rounded w-full text-xs;
	}

	button {
		@apply bg-transparent;
	}
</style>
