<script>
	import { getDirectusImageUrl } from '$lib/composables/directus';

	let { data } = $props();

	const galleryItems = data.galleryInfo;
</script>

<section>
	<h1 class="text-3xl font-bold mb-8 text-center">Gallery Eduventure</h1>

	{#if data.galleryInfo.length > 0}
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-20 px-4">
			<!-- Gallery items -->
			{#each galleryItems as item}
				<div
					class="flex flex-col items-center justify-between overflow-hidden rounded-lg shadow-brand-primary shadow-md hover:shadow-xl transition-shadow duration-300"
				>
					<img
						src={getDirectusImageUrl(item.thumbnail)}
						alt={`Photo ${item.nama} in gallery`}
						class="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
					/>
					<div class="px-5 py-8 bg-white dark:bg-gray-800">
						<h4 class="font-medium font-semibold text-brand-primary">{item.nama}</h4>
						<p class="text-sm text-gray-500 dark:text-gray-400 mt-1 text-justify">
							{item.deskripsi}
						</p>
					</div>
					<div
						class="w-full p-4 bg-brand-primary text-white flex justify-center items-center gap-4 py-4"
					>
						<a class="gallery-btn" href={'/gallery/' + item.url_gallery}>Lihat</a>
						<a class="gallery-btn" href={item.url_eduventure}>Daftar</a>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<p class="text-center text-gray-500">Tidak ada gallery dari Eduventure yang tersedia.</p>
	{/if}
</section>

<style>
	section {
		@apply container ma pt-30;
	}

	.gallery-btn {
		@apply btn bg-white text-brand-primary font-semibold px-10;
	}
</style>
