<script>
	import { getDirectusImageUrl } from '$lib/composables/directus';

	let { data } = $props();

	const { liteGallery } = data;

	console.log(JSON.stringify(liteGallery[0].galeri_foto));
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
				<div class="my-10">
					<a href="/gallery/lite" class="btn bg-brand-primary text-white px-6">
						Lihat Galeri Eduventure Lite
					</a>
				</div>
				<p>
					Program sosialisasi Universitas Padjadjaran berdurasi 2 jam termasuk makanan ringan dan
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
				<!-- <p>
					Pembayaran dapat dilakukan melalui transfer ke Rekening BNI an. LUHUNG UNPAD Nomor:
					9880619020200219 setelah mendapatkan surat konfirmasi dari panitia.
					Kuota peserta sudah
					penuh untuk hingga bulan Maret 2025.
				</p> -->
				<p>
					Pendaftaran dapat dilakukan dengan mengisi form berikut atau hubungi Tim Eduventure pada
					tombol dibawah ini
				</p>
				<div class="w-full flex items-center justify-center gap-3 text-center">
					<!-- <button class="btn bg-brand-secondary text-white w-full" onclick={copyText}
						>Salin Nomor Rekening</button
					> -->
					<a
						href="https://wa.me/6282211676765"
						target="_blank"
						class="btn bg-brand-secondary text-white w-full"
					>
						Hubungi Kami
					</a>
					<a
						href="https://www.cognitoforms.com/UniversitasPadjadjaran21/EduventureLite"
						target="_blank"
						class="btn bg-brand-primary text-white w-full"
					>
						Isi Form Pendaftaran
					</a>
				</div>
				<div class="mt-20">
					<h2 class="text-center mb-2">Eduventure Lite Program Afirmasi</h2>
					<p>
						Eduventure juga menyediakan pilihan program afirmasi yang memberikan pengalaman
						Eduventure di Universitas Padjadjaran tanpa dipungut biaya. Program ini bertujuan untuk
						memberikan kesempatan kepada siswa yang kurang mampu agar dapat mengakses informasi
						mengenai pendidikan berkualitas di Universitas Padjadjaran.
					</p>
					<p>
						Untuk informasi lebih lanjut mengenai program afirmasi ini, silakan hubungi Tim
						Eduventure.
					</p>
					<div class="my-5 flex text-center">
						<a
							href="https://wa.me/6282211676765"
							target="_blank"
							class="btn bg-brand-secondary text-white w-full"
						>
							Hubungi Kami
						</a>
					</div>
				</div>
			</div>
		</div>
		<div class="my-5">
			<h3 class="text-center mb-10">Gallery Eduventure Lite</h3>
			<div class="flex flex-col gap-5 items-center px-5">
				{#each liteGallery as item}
					<div class="bg-gray-1 shadow-2xl rounded-lg flex flex-col items-center">
						{#if item.galeri_foto.length === 0}
							<p class="text-gray-5 italic">Tidak ada foto untuk galeri ini.</p>
						{:else}
							<figure>
								<img
									src={getDirectusImageUrl(item.galeri_foto[0].directus_files_id)}
									class="w-86 h-48 object-cover rounded-lg"
									alt={item.nama_sekolah}
								/>
								<figcaption class="my-4">{item.nama_sekolah}</figcaption>
							</figure>
						{/if}
					</div>
				{/each}
				<div class="w-full px-10 py-3 flex">
					<a
						href="/gallery/lite"
						class="btn text-xs w-full text-center bg-brand-primary text-white px-6"
					>
						Lihat Semua Galeri Eduventure Lite
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
