<script>
	import { getDirectusImageUrl } from '$lib/composables/directus';

	let { data } = $props();

	const galleryItems = data.galleryInfo;
	const dataSekolah = data.getDataSekolah;
</script>

<section>
	<h3 class="font-bold mb-8 text-center">Gallery Eduventure</h3>

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
	<div class="my-20 px-4">
		<h3 class="text-center text-2xl md:text-3xl font-bold mb-4">Data Sekolah Peserta Eduventure</h3>
		<p class="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-2xl ma">
			Berikut adalah data sekolah yang telah berpartisipasi dalam program Eduventure.
		</p>
		<div class="max-w-7xl ma">
			<div class="table-container">
				<table class="elegant-table">
					<thead>
						<tr>
							<th>No</th>
							<th>Nama Sekolah</th>
							<th>Asal Sekolah</th>
							<th>Tanggal Kunjungan</th>
							<th>Jenis Eduventure</th>
							<th>Jumlah Peserta</th>
						</tr>
					</thead>
					<tbody>
						{#each dataSekolah as sekolah, index}
							<tr>
								<td data-label="No">{index + 1}</td>
								<td data-label="Nama Sekolah">{sekolah.nama_sekolah}</td>
								<td data-label="Asal Sekolah">
									{(sekolah.kota ?? '') + ' ' + (sekolah.provinsi ?? '')}
								</td>
								<td data-label="Tanggal Kunjungan">{sekolah.tanggal_kunjungan ?? '-'}</td>
								<td data-label="Jenis Eduventure">{sekolah.jenis_eduventure.nama}</td>
								<td data-label="Jumlah Peserta">{sekolah.jumlah_peserta ?? '-'}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</section>

<style>
	section {
		@apply container ma pt-30;
	}

	.gallery-btn {
		@apply btn bg-white text-brand-primary font-semibold px-10;
	}

	/* Elegant Table Styles */
	.table-container {
		@apply overflow-x-auto rounded-lg shadow-lg;
		background: white;
	}

	.elegant-table {
		@apply w-full border-collapse;
		min-width: 600px;
	}

	.elegant-table thead {
		@apply bg-brand-primary text-white;
	}

	.elegant-table thead th {
		@apply px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider;
	}

	.elegant-table thead th:first-child,
	.elegant-table tbody td:first-child,
	.elegant-table tbody td:last-child {
		@apply text-center;
	}

	.elegant-table tbody tr {
		@apply border-b border-gray-200 transition-colors duration-200;
	}

	.elegant-table tbody tr:hover {
		@apply bg-gray-50;
	}

	.elegant-table tbody tr:nth-child(even) {
		@apply bg-gray-50;
	}

	.elegant-table tbody tr:nth-child(even):hover {
		@apply bg-gray-100;
	}

	.elegant-table tbody td {
		@apply px-6 py-4 text-sm text-gray-700;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.table-container {
			@apply shadow-none;
		}

		.elegant-table {
			@apply border-0;
			min-width: 100%;
		}

		.elegant-table thead {
			@apply hidden;
		}

		.elegant-table tbody tr {
			@apply mb-4 block border border-gray-200 rounded-lg shadow-md bg-white;
		}

		.elegant-table tbody tr:nth-child(even) {
			@apply bg-white;
		}

		.elegant-table tbody td {
			@apply block text-right border-b border-gray-200 px-4 py-3;
			position: relative;
			padding-left: 50%;
		}

		.elegant-table tbody td:last-child {
			@apply border-b-0;
		}

		.elegant-table tbody td:before {
			content: attr(data-label);
			@apply absolute left-4 font-semibold text-gray-600 text-left;
			width: 45%;
		}
	}

	/* Dark mode support */
	:global(.dark) .table-container {
		@apply bg-gray-800;
	}

	:global(.dark) .elegant-table tbody tr {
		@apply border-gray-700;
	}

	:global(.dark) .elegant-table tbody tr:hover {
		@apply bg-gray-700;
	}

	:global(.dark) .elegant-table tbody tr:nth-child(even) {
		@apply bg-gray-750;
	}

	:global(.dark) .elegant-table tbody td {
		@apply text-gray-300;
	}

	@media (max-width: 768px) {
		:global(.dark) .elegant-table tbody tr {
			@apply bg-gray-800;
		}

		:global(.dark) .elegant-table tbody td:before {
			@apply text-gray-400;
		}
	}
</style>
