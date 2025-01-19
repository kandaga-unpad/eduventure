<script>
	import { SignIn, SignOut } from '@auth/sveltekit/components';
	import { page } from '$app/state';

	let { data } = $props();
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
				<h3>{page.data.session.user?.name ?? 'User'}</h3>
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
						{#if !data.totalTiket}
							<p>Anda belum memilik Tiket</p>
							<div class="flex w-full mt-5">
								<a href="/eduventure" class="btn py-2 w-full bg-green-7 text-white"
									>Beli Tiket Disini</a
								>
							</div>
						{:else}
							<div class="grid grid-cols-3 gap-2">
								<div>
									<h5>Zona 1</h5>
									<h1>{data.totalTiket.zona_kesehatan ?? 0}</h1>
									<p>Tiket</p>
								</div>
								<div>
									<h5>Zona 2</h5>
									<h1>{data.totalTiket.zona_soshum ?? 0}</h1>
									<p>Tiket</p>
								</div>
								<div>
									<h5>Zona 3</h5>
									<h1>{data.totalTiket.zona_saintek ?? 0}</h1>
									<p>Tiket</p>
								</div>
							</div>
							<div class="flex w-full mt-5">
								<a href="/profile/tiket" class="btn py-2 w-full bg-green-7 text-white"
									>Lihat Tiket</a
								>
							</div>
						{/if}
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
