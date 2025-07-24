<script>
	import { getDirectusImageUrl } from '$lib/composables/directus';
	import { fade, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let { data } = $props();
	console.log(JSON.stringify(data));

	let modalOpen = $state(false);
	let selectedImage = $state('');
	let selectedAlt = $state('');

	/**
	 * @param {string} imageUrl
	 * @param {string} altText
	 */
	function openModal(imageUrl, altText) {
		selectedImage = imageUrl;
		selectedAlt = altText;
		modalOpen = true;
	}

	function closeModal() {
		modalOpen = false;
		selectedImage = '';
		selectedAlt = '';
	}

	/**
	 * @param {{ key: string; }} event
	 */
	function handleKeydown(event) {
		if (event.key === 'Escape') {
			closeModal();
		}
	}
</script>

<section>
	{#if data.listOfSekolah.length > 0}
		<div>
			<div class="text-center max-w-2xl ma">
				<h2 class="text-brand-primary">{data.galleryEduventure.nama}</h2>
				<p>{data.galleryEduventure.deskripsi}</p>
			</div>
			<div class="text-center my-10">
				<a href="/gallery"> &leftarrow; Kembali ke Gallery</a>
			</div>
			<div class="mt-15">
				<h4 class="font-bold mb-8 text-center">
					Gallery Sekolah yang mengikuti
					<span class="text-brand-secondary">
						{data.galleryEduventure.nama}
					</span>
				</h4>
				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-10 mb-20 px-4">
					{#each data.listOfSekolah as sekolah}
						<div
							class="flex flex-col items-center justify-between overflow-hidden rounded-lg shadow-brand-primary shadow-md hover:shadow-xl transition-shadow duration-300 mb-10"
						>
							<img
								src={getDirectusImageUrl(sekolah.galeri_foto[0].directus_files_id)}
								alt={sekolah.nama_sekolah}
								class="w-full h-48 object-cover"
							/>
							<div class="px-5 py-8 bg-white dark:bg-gray-800">
								<h4 class="font-medium font-semibold text-brand-primary">{sekolah.nama_sekolah}</h4>
								<p class="text-sm text-gray-500 dark:text-gray-400 mt-1 text-justify">
									{sekolah.alamat}
								</p>
								<p>Kota/Kabupaten: {sekolah.kota ?? '-'}</p>
								<p>Provinsi: {sekolah.provinsi ?? '-'}</p>
							</div>
							<div class="w-full text-center mb-5">
								<h6>Galeri Foto</h6>
								<div class="w-full grid grid-cols-3 gap-2 px-5">
									{#each sekolah.galeri_foto as foto}
										<!-- svelte-ignore a11y_click_events_have_key_events -->
										<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
										<img
											src={getDirectusImageUrl(foto.directus_files_id)}
											alt="Foto Galeri"
											class="w-full h-16 object-cover m-2 cursor-pointer hover:opacity-80 hover:scale-105 transition-all duration-300 rounded-md"
											onclick={() =>
												openModal(getDirectusImageUrl(foto.directus_files_id), 'Foto Galeri')}
										/>
									{/each}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
			<div class="text-center my-10">
				<a href="/gallery"> &leftarrow; Kembali ke Gallery</a>
			</div>
			<!-- Modal -->
			{#if modalOpen}
				<div
					class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
					onclick={closeModal}
					onkeydown={handleKeydown}
					role="button"
					tabindex="0"
					transition:fade={{ duration: 300, easing: quintOut }}
				>
					<div
						class="relative max-w-4xl max-h-full"
						transition:scale={{
							duration: 400,
							easing: quintOut,
							start: 0.7,
							opacity: 0
						}}
					>
						<button
							class="absolute top-4 right-4 text-white hover:text-gray-300 text-3xl z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 hover:bg-opacity-70 hover:scale-110"
							onclick={closeModal}
							aria-label="Close modal"
						>
							&times;
						</button>
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
						<img
							src={selectedImage}
							alt={selectedAlt}
							class="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
							onclick={(e) => e.stopPropagation()}
						/>
					</div>
				</div>
			{/if}
		</div>
	{:else}
		<div class="text-center max-w-2xl ma py-20">
			<h2 class="text-red-5 mb-3">Tidak ada gallery yang tersedia</h2>
			<p>Maaf, tidak ada gallery yang ditemukan untuk Eduventure {data.jenis}.</p>
			<div class="text-center my-10">
				<a href="/gallery"> &leftarrow; Kembali ke Gallery</a>
			</div>
		</div>
	{/if}
</section>

<style>
	section {
		@apply container ma pt-30;
	}
</style>
