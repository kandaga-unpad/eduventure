<script>
	import { SignIn, SignOut } from '@auth/sveltekit/components';
	import { page } from '$app/state';
</script>

<div>
	<img src="background.webp" class="w-full h-md object-cover object-center" alt="" />
</div>
<section>
	<div>
		{#if page.data.session}
			{#if page.data.session.user?.image}
				<div class="w-full flex items-center justify-center">
					<img src={page.data.session.user.image} class="avatar" alt="User Avatar" />
				</div>
			{/if}
			<div class="flex flex-col items-center justify-center mt-5">
				<small>Login sebagai</small><br />
				<strong>{page.data.session.user?.name ?? 'User'}</strong>
			</div>
			<div class="flex flex-col items-center justify-center my-10 gap-5">
				<div class="bg-blue-50 shadow-lg rounded w-full max-w-md p-5 text-center">
					<h3>Profil</h3>
					<div class="text-left flex gap-3">
						<div>
							<p>Nama</p>
							<p>Email</p>
							<p>Google ID</p>
						</div>
						<div>
							<p>: {page.data.session.user?.name}</p>
							<p>: {page.data.session.user?.email}</p>
							<p>: {page.data.session.user?.id ?? '-'}</p>
						</div>
					</div>
					<div>
						<h3>Tiket</h3>
						<p class="text-red-6">Anda belum membeli tiket!</p>
					</div>
				</div>
				<SignOut>
					<div slot="submitButton" class="logout">Sign out</div>
				</SignOut>
			</div>
		{/if}
	</div>
</section>

<style>
	section {
		@apply container ma;
	}

	.avatar {
		@apply rounded mt--12;
	}

	.logout {
		@apply btn bg-red-6 rounded py-2 text-white;
	}
</style>
