<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';

	let { data } = $props();

	const totalPages = $derived(() => Math.ceil(data.total / data.limit));

	let selectedPengajuan = $state(null);

	function getRelativeTime(date) {
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		const hours = Math.floor(diff / (1000 * 60 * 60));
		const minutes = Math.floor(diff / (1000 * 60));

		if (days === 0) {
			if (hours === 0) {
				if (minutes === 0) return 'Baru saja';
				return `${minutes} menit yang lalu`;
			}
			return `${hours} jam yang lalu`;
		}
		if (days === 1) return 'Kemarin';
		if (days < 7) return `${days} hari yang lalu`;
		if (days < 30) return `${Math.floor(days / 7)} minggu yang lalu`;
		if (days < 365) return `${Math.floor(days / 30)} bulan yang lalu`;
		return `${Math.floor(days / 365)} tahun yang lalu`;
	}

	// @ts-ignore
	function goToPage(newPage) {
		if (newPage >= 1 && newPage <= totalPages()) {
			goto(`?page=${newPage}`);
		}
	}
</script>

<section
	class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-32 pb-12 px-4"
>
	<div class="container mx-auto max-w-7xl">
		<div class="bg-white shadow-2xl rounded-3xl p-10 md:p-16 border border-gray-100">
			<h1
				class="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-center mb-10"
			>
				Daftar Pengajuan Eduventure Lite
			</h1>

			{#if data.pengajuan.length === 0}
				<p class="text-center text-gray-600">Anda belum memiliki pengajuan.</p>
				<div class="text-center mt-6">
					<a
						href="/eduventure/lite/daftar"
						class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition duration-200"
					>
						Ajukan Pengajuan Baru
					</a>
				</div>
			{:else}
				<div class="overflow-x-auto bg-white rounded-lg shadow-md">
					<table class="w-full table-auto border-collapse">
						<thead>
							<tr class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
								<th class="px-6 py-4 text-left text-sm font-semibold">Nama Sekolah</th>
								<th class="px-6 py-4 text-left text-sm font-semibold">Tanggal Kunjungan</th>
								<th class="px-6 py-4 text-left text-sm font-semibold">Status</th>
								<th class="px-6 py-4 text-left text-sm font-semibold">Tanggal Pengajuan</th>
								<th class="px-6 py-4 text-left text-sm font-semibold">Pembayaran</th>
								<th class="px-6 py-4 text-left text-sm font-semibold">Detail</th>
							</tr>
						</thead>
						<tbody>
							{#each data.pengajuan as pengajuan, index}
								<tr
									class="border-b border-gray-200 hover:bg-blue-50 transition duration-150 {index %
										2 ===
									0
										? 'bg-gray-50'
										: 'bg-white'}"
								>
									<td class="px-6 py-4 text-sm text-gray-900 font-medium"
										>{pengajuan.nama_sekolah}</td
									>
									<td class="px-6 py-4 text-sm text-gray-700">
										{new Date(pengajuan.usulan_tanggal_kunjungan).toLocaleDateString('id-ID')}
									</td>
									<td class="px-6 py-4 text-sm">
										<span
											class="px-3 py-1 rounded-full text-xs font-semibold capitalize {pengajuan.status_pengajuan ===
											'approved'
												? 'bg-green-100 text-green-800 border border-green-200'
												: pengajuan.status_pengajuan === 'rejected'
													? 'bg-red-100 text-red-800 border border-red-200'
													: pengajuan.status_pengajuan === 'rescheduled'
														? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
														: 'bg-gray-100 text-gray-800 border border-gray-200'}"
										>
											{pengajuan.status_pengajuan}
										</span>
									</td>
									<td class="px-6 py-4 text-sm text-gray-700">
										{new Date(pengajuan.date_created).toLocaleDateString('id-ID')}
									</td>
									<td class="px-6 py-4 text-sm text-gray-900">
										{#if pengajuan.url_penagihan}
											<a
												href={pengajuan.url_penagihan}
												target="_blank"
												class="inline-flex items-center px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition duration-200"
											>
												Bayar
											</a>
										{:else}
											<span class="text-gray-500">-</span>
										{/if}
									</td>
									<td class="px-6 py-4 text-sm text-gray-900">
										<!-- @ts-ignore -->
										<button
											class="inline-flex items-center px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition duration-200"
											onclick={() => (selectedPengajuan = pengajuan)}
										>
											Lihat Detail
										</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>

				<!-- Pagination -->
				{#if totalPages() > 1}
					<div class="flex justify-center items-center mt-8 space-x-2">
						<button
							onclick={() => goToPage(data.page - 1)}
							disabled={data.page <= 1}
							class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Previous
						</button>

						{#each Array(totalPages) as _, i}
							{@const pageNum = i + 1}
							<button
								onclick={() => goToPage(pageNum)}
								class="px-3 py-2 text-sm font-medium {pageNum === data.page
									? 'text-blue-600 bg-blue-50 border border-blue-500'
									: 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'} rounded-md"
							>
								{pageNum}
							</button>
						{/each}

						<button
							onclick={() => goToPage(data.page + 1)}
							disabled={data.page >= totalPages()}
							class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Next
						</button>
					</div>
				{/if}
			{/if}

			<div class="text-center mt-12">
				<a
					href="/profile"
					class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition duration-300"
				>
					← Kembali ke Profil
				</a>
				<a
					href="/eduventure/lite/daftar"
					class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition duration-300"
				>
					Daftar Ajuan Baru
				</a>
			</div>
		</div>
	</div>
</section>

{#if selectedPengajuan !== null}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
		<div class="bg-white p-6 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
			<h2 class="text-2xl font-bold mb-6 text-gray-800">Detail Pengajuan</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				{#each Object.entries(selectedPengajuan).filter(([key]) => !['id', 'status', 'user_created', 'date_created', 'user_updated', 'email_pemohon', 'surat_pengajuan'].includes(key)) as [key, value]}
					<div class="bg-gray-50 p-3 rounded-lg">
						<span class="font-medium text-gray-700 capitalize">{key.replace(/_/g, ' ')}:</span>
						<span class="text-gray-900 block mt-1"
							>{key === 'date_updated' && value
								? `${new Date(value).toLocaleDateString('id-ID')} (${getRelativeTime(new Date(value))})`
								: value === null || value === undefined
									? '-'
									: value instanceof Date
										? value.toLocaleDateString('id-ID')
										: typeof value === 'object'
											? JSON.stringify(value, null, 2)
											: value.toString()}</span
						>
					</div>
				{/each}
			</div>
			<div class="mt-6 text-right">
				<button
					class="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
					onclick={() => (selectedPengajuan = null)}
				>
					Tutup
				</button>
			</div>
		</div>
	</div>
{/if}
