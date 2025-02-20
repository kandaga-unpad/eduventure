<script>
	import { statusPembayaran } from '$lib/composables/ticketStore';

	let { data } = $props();
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
			<p>
				Sebelum kamu berangkat ke Jatinangor, yuk cek dulu panduannya
				<a href="/guidebook">disini</a>.
			</p>
			<div class="w-full my-10">
				{#if data.tagihan.length === 0}
					<h5 class="text-red-6">Anda belum memiliki tiket!</h5>
				{:else}
					<div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
						{#each data.tagihan as tiket, i}
							<div class="bg-yellow-50 shadow-2xl w-full text-sm">
								<h4 class="bg-brand-primary text-white py-2 rounded">
									Tiket {data.tagihan.length > 1 ? `${i + 1}` : 'Anda'}
								</h4>
								<div class="grid grid-cols-4 text-left pl-5 mt-5">
									<p>Nama</p>
									<p class="col-span-3">: {tiket.nama}</p>
								</div>
								<div class="grid grid-cols-4 text-left pl-5">
									<p>Sekolah</p>
									<p class="col-span-3">: Kelas {tiket.kelas} - {tiket.sekolah}</p>
								</div>
								<div class="grid grid-cols-4 text-left pl-5">
									<p>Zona</p>
									<p class="col-span-3">: {tiket.pilihan_zona.title}</p>
								</div>
								<div class="grid grid-cols-4 text-left pl-5">
									<p>Tanggal</p>
									<p class="col-span-3">
										: {new Date(tiket.pilihan_zona.tanggal_acara).toLocaleString('id-ID', {
											weekday: 'long',
											day: 'numeric',
											month: 'long',
											year: 'numeric'
										})}
									</p>
								</div>
								<div class="grid grid-cols-4 text-left pl-5">
									<p>Jam Kegiatan</p>
									<p class="col-span-3">
										: {tiket.pilihan_zona.jam_mulai} - {tiket.pilihan_zona.jam_selesai}
									</p>
								</div>
								<div class="grid grid-cols-4 text-left pl-5">
									<p>Lokasi</p>
									<p class="col-span-3">: {tiket.pilihan_zona.location}</p>
								</div>
								<div class="grid grid-cols-4 text-left pl-5">
									<p>Status Pembayaran</p>
									{#if tiket.status_pendaftaran === 'pending'}
										<p class="text-gray-6 col-span-3">
											: {statusPembayaran(tiket.status_pendaftaran)}
										</p>
									{:else if tiket.status_pendaftaran === 'paid'}
										<p class="text-green-6 col-span-3">
											: {statusPembayaran(tiket.status_pendaftaran)}
										</p>
									{:else if tiket.status_pendaftaran === 'cancel'}
										<p class="text-red-6 col-span-3">
											: {statusPembayaran(tiket.status_pendaftaran)}
										</p>
									{:else if tiket.status_pendaftaran === 'expired'}
										<p class="text-yellow-6 col-span-3">
											: {statusPembayaran(tiket.status_pendaftaran)}
										</p>
									{/if}
								</div>
								<div class="w-full flex items-center justify-center gap-5 p-5">
									{#if tiket.status_pendaftaran === 'pending'}
										<a
											href={tiket.url_tagihan}
											class="btn bg-green-7 text-white w-full"
											target="_blank"
											rel="noopener noreferrer">Bayar Sekarang</a
										>
									{:else if tiket.status_pendaftaran === 'paid'}
										<a
											href="/profile/tiket/{tiket.id}"
											class="btn bg-brand-primary text-white w-full">Lihat Tiket</a
										>
									{:else if tiket.status_pendaftaran === 'expired'}
										<a class="btn bg-yellow-3 text-dark w-full" href="/eduventure/experience">
											Kadaluarsa, Pesan Tiket Baru
										</a>
									{:else if tiket.status_pendaftaran === 'cancel'}
										<a href="tel:082211676765" class="btn bg-red-6 text-white w-full"
											>Hubungi Eduventure</a
										>
									{/if}
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
