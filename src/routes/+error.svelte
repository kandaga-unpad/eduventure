<script>
	import { page } from '$app/state';
	import { SignIn } from '@auth/sveltekit/components';
</script>

<section>
	<div class="flex flex-col items-center justify-center min-h-screen">
		<h1 class="text-7xl">{page.status}</h1>
		<h4>{page.error?.message}</h4>
		{#if page.status === 403}
			<SignIn class="mt-10">
				<div slot="submitButton" class="btn bg-green-7 text-white">Klik untuk Login</div></SignIn
			>
		{/if}
	</div>
</section>

<style>
	section {
		@apply container ma pt-35;
	}
</style>
