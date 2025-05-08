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
				<h2 class="text-center my-5">Eduventure Dream <br /> Universitas Padjadjaran</h2>
				<img
					src="/edu/dream.webp"
					class="w-full rounded-lg max-h-md object-cover object-bottom-center"
					alt="Eduventure Lite"
				/>
				<h5>Untuk Siswa Sekolah Dasar</h5>
				<p>
					Eduventure Dream adalah program kunjungan edukatif di Universitas Padjadjaran yang
					dirancang khusus untuk siswa sekolah dasar. Melalui kegiatan ini, anak-anak diajak
					menjelajah kampus sambil mengenal sains, teknologi, dan pentingnya menjaga lingkungan.
					Kegiatan ini juga menjadi langkah awal untuk menumbuhkan cita-cita dan rasa ingin tahu
					mereka terhadap dunia pendidikan tinggi.
				</p>

				<div class="w-full">
					<p class="text-left">
						Dengan konsep pembelajaran berbasis STEM (Science, Technology, Engineering,
						Mathematics), siswa akan:
					</p>
					<ul class="list-disc text-left">
						<li>Mengenal hewan ternak dan cara merawatnya.</li>
						<li>Belajar tentang tanaman dan pertanian berkelanjutan.</li>
						<li>Melihat langsung batuan dan kekayaan alam Indonesia.</li>
						<li>Mengamati keanekaragaman hayati di arboretum.</li>
						<li>Menyadari pentingnya menjaga lingkungan melalui konsep ekoriparian.</li>
					</ul>
				</div>
				<div>
					<p>
						Program ini juga dilengkapi dengan <strong
							>aktivitas fisik ringan seperti hiking singkat</strong
						>, sehingga anak-anak bisa belajar sambil bergerak dan menikmati alam terbuka. Semua
						kegiatan dikemas interaktif dan menyenangkan, dipandu oleh mahasiswa dan dosen dari
						berbagai fakultas di Unpad.
					</p>
					<p class="font-bold mt-4">Tujuan :</p>
					<ul class="list-disc text-left">
						<li>Menumbuhkan rasa cinta belajar dan peduli lingkungan sejak dini.</li>
						<li>Mengenalkan profesi di bidang sains, pertanian, kesehatan, dan teknik.</li>
						<li>Membangun mimpi dan cita-cita anak untuk masa depan gemilang.</li>
					</ul>
				</div>
				<div class="w-full">
					<table class="table-auto border-collapse border border-gray-300 w-full text-left">
						<thead class="bg-blue-100">
							<tr>
								<th class="border border-gray-300 px-4 py-2">Lokasi</th>
								<th class="border border-gray-300 px-4 py-2">Kegiatan</th>
								<th class="border border-gray-300 px-4 py-2">Durasi (Menit)</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="border border-gray-300 px-4 py-2">Lobby Rektorat </td>
								<td class="border border-gray-300 px-4 py-2">Pengenalan Universitas Padjadjaran</td>
								<td class="border border-gray-300 px-4 py-2">20</td>
							</tr>
							<tr>
								<td class="border border-gray-300 px-4 py-2">Ekoriparian</td>
								<td class="border border-gray-300 px-4 py-2"
									>Konsep Ekoriparian: Pengendalian Pencemaran dan Kerusakan Lingkungan</td
								>
								<td class="border border-gray-300 px-4 py-2">20</td>
							</tr>
							<tr>
								<td class="border border-gray-300 px-4 py-2">Bale Tatanen – Faperta</td>
								<td class="border border-gray-300 px-4 py-2">Edukasi Pertanian Berkelanjutan</td>
								<td class="border border-gray-300 px-4 py-2">20</td>
							</tr>
							<tr>
								<td class="border border-gray-300 px-4 py-2">Kandang Sapi – Fapet</td>
								<td class="border border-gray-300 px-4 py-2">Cow Farming Experience</td>
								<td class="border border-gray-300 px-4 py-2">20</td>
							</tr>

							<tr>
								<td class="border border-gray-300 px-4 py-2">Rumah Sakit Hewan – FK</td>
								<td class="border border-gray-300 px-4 py-2">Kesehatan Hewan Peliharaan</td>
								<td class="border border-gray-300 px-4 py-2">20</td>
							</tr>
							<tr>
								<td class="border border-gray-300 px-4 py-2">Arboretum – FMIPA</td>
								<td class="border border-gray-300 px-4 py-2">Keanekaragaman Hayati</td>
								<td class="border border-gray-300 px-4 py-2">20</td>
							</tr>
							<tr>
								<td class="border border-gray-300 px-4 py-2">Lobby – FTG</td>
								<td class="border border-gray-300 px-4 py-2">Mengenal Kekayaan Alam Batuan</td>
								<td class="border border-gray-300 px-4 py-2">20</td>
							</tr>
							<tr>
								<td colspan="2" class="border border-gray-300 px-4 py-2 font-bold"
									>Transisi Lokasi dan Registrasi</td
								>
								<td class="border border-gray-300 px-4 py-2">40</td>
							</tr>
							<tr>
								<td colspan="2" class="border border-gray-300 px-4 py-2 font-bold">Total Durasi</td>
								<td class="border border-gray-300 px-4 py-2">180</td>
							</tr>
						</tbody>
					</table>
					<div class="flex flex-col items-center justify-center gap-3 mt-12">
						<h5>Investasi :</h5>
						<h3 class="text-green-6">Rp 300.000/orang</h3>
						<h6>Sudah termasuk Snack dan Merchandise</h6>
						<p class="italic">
							Dengan minimum 100 peserta dan dapat dibagi menjadi grup kelipatan 15.
						</p>
					</div>
				</div>
				<div class="w-full flex items-center justify-center gap-3 text-center">
					<a href="tel:082211676765" target="_blank" class="btn bg-brand-primary text-white w-full">
						Hubungi Kami
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
		@apply container ma pt-20;
	}
</style>
