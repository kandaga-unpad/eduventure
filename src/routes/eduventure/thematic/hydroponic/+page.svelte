<script>
	let { data } = $props();

	const copyText = () => {
		const text = '9880619020200219';
		navigator.clipboard.writeText(text);
		alert('Nomor Rekening berhasil disalin!');
	};
</script>

<section>
	<div class="grid grid-cols-1 xl:grid-cols-1 gap-5 mt-12">
		<div class="flex flex-col items-center col-span-2 bg-gray-1 shadow-2xl rounded-lg py-10 px-5">
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
				<h2 class="text-center my-5">Eduventure Thematic <br /> Hydroponic Adventure</h2>
				<img
					src="/edu/hydroponic.jpg"
					class="w-full rounded-lg max-h-md object-cover object-bottom-center"
					alt="Eduventure Lite"
				/>
				<h5>Lokasi : Hidroponik dan Urban Farming Learning Center FTIP</h5>
				<p>
					Yuk, seru-seruan belajar bercocok tanam tanpa tanah! Dalam program <strong>
						Eduventure: Hydroponic Adventure</strong
					>, siswa sekolah dasar akan diajak mengenal konsep pertanian modern yang ramah lingkungan
					melalui metode hidroponik.
				</p>

				<div class="my-10">
					<a href="/gallery/thematic" class="btn bg-brand-primary text-white px-6">
						Lihat Galeri Eduventure Thematic
					</a>
				</div>

				<div class="w-full">
					<p class="text-left">
						Kegiatan dilakukan di <strong>Bale Tatanén Universitas Padjadjaran</strong>, dipandu
						langsung oleh <strong>dosen dan praktisi pertanian</strong>. Siswa akan:
					</p>
					<ul class="list-disc text-left">
						<li>Mengenal berbagai jenis tanaman yang bisa tumbuh dengan metode hidroponik</li>
						<li>Melihat langsung instalasi hidroponik dan cara kerjanya.</li>
						<li>Mencoba menanam sendiri menggunakan media tanam hidroponik sederhana.</li>
					</ul>
				</div>
				<div class="w-full">
					<p>
						Program ini dirancang untuk menumbuhkan kepedulian terhadap lingkungan dan ketertarikan
						pada <strong>dunia pertanian</strong> sejak dini.
					</p>
					<p class="font-bold mt-4">Mengapa harus ikut ?</p>
					<ul class="list-disc text-left">
						<li>
							<strong>Seru!</strong> Bisa bercocok tanam langsung tanpa kotor-kotoran tanah.
						</li>
						<li>
							<strong>Edukatif!</strong> Belajar sains dan lingkungan dengan cara menyenangkan.
						</li>
						<li><strong>Eksklusif!</strong> Pulang bawa merchandise keren dari Unpad!</li>
					</ul>
				</div>
				<div class="flex flex-col items-center justify-center gap-3 mt-12">
					<h5>Investasi :</h5>
					<h3 class="text-green-6">Rp 250.000/orang</h3>
					<h6>Sudah termasuk Snack dan Merchandise</h6>
					<p class="italic">Dengan minimum 70 peserta.</p>
				</div>
			</div>
			<div class="w-full flex items-center justify-center gap-3 text-center">
				<a href="tel:082211676765" target="_blank" class="btn bg-brand-primary text-white w-full">
					Hubungi Kami
				</a>
			</div>
		</div>
	</div>
	<div class="my-10 text-center">
		<a href="/eduventure">&leftarrow;Kembali</a>
	</div>
</section>

<style>
	section {
		@apply container ma pt-20;
	}
</style>
