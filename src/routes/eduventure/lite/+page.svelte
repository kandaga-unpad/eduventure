<script>
	let { data } = $props();

	const copyText = () => {
		const text = '9882340560000001';
		navigator.clipboard.writeText(text);
		alert('Nomor Rekening berhasil disalin!');
	};
</script>

<section>
	<div class="grid grid-cols-1 xl:grid-cols-3 gap-5">
		<div class="flex flex-col items-center col-span-2 bg-gray-1 shadow-2xl rounded-lg">
			<div class="flex my-10">
				<img src="/logo-unpad.png" class="h-20" alt="Logo Eduventure" />
				<img src="/logo.webp" class="h-24" alt="Logo Eduventure" />
			</div>

			<div class="bg-brand-primary px-4 py-1 rounded-xl">
				<a href="/eduventure">
					<h6 class="text-white">Eduventure</h6>
				</a>
			</div>
			<div class="mb-10 flex flex-col items-center gap-5 px-15 text-justify">
				<h2 class="text-center my-5">Eduventure Lite Universitas Padjadjaran</h2>
				<img
					src="/zona/lite.webp"
					class="w-full rounded-lg max-h-md object-cover"
					alt="Eduventure Lite"
				/>
				<p>
					Unpad Eduventure adalah program edukasi interaktif yang dirancang untuk siswa SMP dan SMA
					(dan sederajat).
				</p>
				<div class="grid grid-cols-3 gap-3">
					<figure>
						<img src="/edu/yasporbi.jpg" alt="Kunjungan SMA" class="sma-gallery" />
						<figcaption>SMA Yasporbi Jakarta</figcaption>
					</figure>
					<figure>
						<img src="/edu/al-irsyad.jpg" alt="Kunjungan SMA" class="sma-gallery" />
						<figcaption>Al-Irsyad Boarding School</figcaption>
					</figure>
					<figure>
						<img src="/edu/sman1padalarang.jpg" alt="Kunjungan SMA" class="sma-gallery" />
						<figcaption>SMAN 1 Padalarang</figcaption>
					</figure>
				</div>
				<p class="mt-10">
					Program sosialisasi Universitas Padjadjaran berdurasi 1 jam termasuk makanan ringan dan
					merchandise Unpad. Tersedia dalam dua kategori harga, yaitu Rp150.000/siswa (mendapatkan
					merchandise berupa Kaos Unpad) dan Rp100.000/siswa (mendapatkan merchandise berupa Tote
					Bag Unpad).
				</p>
				<div class="grid grid-cols-2 gap-3">
					<figure>
						<img src="/zona/KaosUnpad.jpg" class="sma-gallery" alt="" />
						<figcaption>Kaos Unpad</figcaption>
					</figure>
					<figure>
						<img src="/zona/BagUnpad.jpg" class="sma-gallery" alt="" />
						<figcaption>Tote Bag Unpad</figcaption>
					</figure>
				</div>
				<p class="mt-5">
					Pematerian umum dipandu oleh Kantor Komunikasi Publik dengan durasi 60 menit di Gedung
					Rektorat. Program dilaksanakan pada jadwal yang disepakati pihak sekolah dan Universitas
					Padjadjaran melalui korespondensi PIC.
				</p>
				<p>
					Pembayaran dapat dilakukan melalui transfer ke Rekening BNI an. DPNG Unpad Nomor:
					9882340560000001 setelah mendapatkan surat konfirmasi dari panitia. Kuota peserta sudah
					penuh untuk hingga bulan Maret 2025.
				</p>
				<div class="w-full flex items-center justify-center gap-3 text-center">
					<button class="btn bg-brand-secondary text-white w-full" onclick={copyText}
						>Salin Nomor Rekening</button
					>
					<a
						href="https://www.cognitoforms.com/UniversitasPadjadjaran21/EduventureLite"
						target="_blank"
						class="btn bg-brand-primary text-white w-full"
					>
						Isi Form Pendaftaran
					</a>
				</div>
			</div>
		</div>
	</div>
	<div class="my-10 text-center">
		<a href="/eduventure">&leftarrow;Kembali</a>
	</div>
</section>

<style>
	section {
		@apply container ma pt-30;
	}

	figcaption {
		@apply text-gray-5 text-xs italic text-center pt-1;
	}

	.sma-gallery {
		@apply max-h-xs h-full object-cover rounded-lg;
	}
</style>
