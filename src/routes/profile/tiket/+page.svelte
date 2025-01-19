<script>
	import { statusPembayaran, warnaStatusPembayaran } from '$lib/composables/ticketStore';

	let { data } = $props();

	console.log(data.totalTiket);
</script>

<section>
	<div class="text-center">
		<h2>Informasi Tiket Anda</h2>
		<div class="my-10 flex flex-col items-center justify-center">
			<div class="bg-blue-50 max-w-xl w-full rounded">
				<h3 class="bg-brand-primary text-white w-full rounded-t py-3">Jumlah Tiket Anda</h3>
				<div class="p-10">
					<h3>Detail Tiket</h3>
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
				</div>
			</div>
		</div>
		<div class="my-10 px-3">
			<h2>Daftar Tiket yang dimiliki</h2>
			<div class="w-full my-10">
				{#if data.tagihan.length === 0}
					<h5 class="text-red-6">Anda belum memiliki tiket!</h5>
				{:else}
					<div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
						{#each data.tagihan as tiket, i}
							<div class="bg-yellow-50 shadow-2xl w-full">
								<h4 class="bg-brand-primary text-white py-2 rounded">
									Tiket {data.tagihan.length > 1 ? `${i + 1}` : 'Anda'}
								</h4>
								<div class="p-5 grid grid-cols-4 gap-3 text-left text-sm">
									<div>
										<p>Nama</p>
										<p>Kelas dan Sekolah</p>
										<p>Pilihan Zona</p>
										<p>Tanggal Kegiatan</p>
										<p>Jam Kegiatan</p>
										<p>Lokasi</p>
										<p>Status Pembayaran</p>
									</div>
									<div class="col-span-3">
										<p>: {tiket.nama}</p>
										<p>: {tiket.kelas} - {tiket.sekolah}</p>
										<p>: {tiket.pilihan_zona.title}</p>
										<p>
											: {new Date(tiket.pilihan_zona.tanggal_acara).toLocaleString('id-ID', {
												weekday: 'long',
												day: 'numeric',
												month: 'long',
												year: 'numeric'
											})}
										</p>
										<p>: {tiket.pilihan_zona.jam_mulai} - {tiket.pilihan_zona.jam_selesai}</p>
										<p>: {tiket.pilihan_zona.location}</p>
										{#if tiket.status_pendaftaran === 'pending'}
											<p class="text-gray-6">: {statusPembayaran(tiket.status_pendaftaran)}</p>
										{:else if tiket.status_pendaftaran === 'paid'}
											<p class="text-green-6">: {statusPembayaran(tiket.status_pendaftaran)}</p>
										{:else if tiket.status_pendaftaran === 'cancel'}
											<p class="text-red-6">: {statusPembayaran(tiket.status_pendaftaran)}</p>
										{/if}
									</div>
								</div>
								<div class="w-full flex items-center justify-center gap-5 p-5">
									<a
										href="/profile/tiket/{tiket.id}"
										class="btn bg-brand-primary border-1 border-brand-primary text-white py-1 w-full"
										>Lihat Tiket</a
									>
									<a
										href="tel:082211676765"
										class="btn bg-whte text-brand-primary border-1 border-brand-primary py-1 w-full hover:(bg-brand-primary text-white)"
										>Hubungi Eduventure</a
									>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	section {
		@apply container ma pt-35;
	}
</style>
