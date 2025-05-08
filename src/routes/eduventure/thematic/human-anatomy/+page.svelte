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
				<h2 class="text-center my-5">Eduventure Thematic <br /> Human Anatomy</h2>
				<img
					src="/edu/thematic-anatomy.webp"
					class="w-full rounded-lg max-h-md object-cover object-bottom-center"
					alt="Eduventure Lite"
				/>
				<h5>Lokasi : Laboratorium Anatomi, Universitas Padjadjaran</h5>
				<p>
					Yuk, ikut petualangan seru ke dalam tubuh manusia! Dalam program <strong
						>Eduventure: Exploring Human Anatomy</strong
					>, siswa sekolah dasar akan belajar mengenal bagian-bagian tubuh manusia dengan cara yang
					seru dan mudah dimengerti.
				</p>

				<div class="w-full">
					<p class="text-left">
						Kegiatan dilakukan di <strong>Laboratorium Anatomi Universitas Padjadjaran</strong>,
						dipandu langsung oleh <strong>dosen-dosen anatomi berpengalaman</strong>. Siswa akan:
					</p>
					<ul class="list-disc text-left">
						<li>
							Melihat <strong>model 3 dimensi tubuh manusia</strong>, baik yang nyata maupun
							digital.
						</li>
						<li>
							Menyentuh dan mengenal bentuk organ-organ tubuh seperti jantung, paru-paru, dan otak.
						</li>
						<li>Mendapat penjelasan menarik tentang bagaimana tubuh bekerja setiap hari.</li>
					</ul>
				</div>
				<div>
					<p>
						Kegiatan ini didesain khusus untuk memicu rasa ingin tahu anak dan menumbuhkan minat
						belajar di bidang <strong>sains dan kesehatan</strong> sejak dini.
					</p>
					<p class="font-bold mt-4">Mengapa harus ikut ?</p>
					<ul class="list-disc text-left">
						<li>
							<strong>Seru!</strong> Bisa belajar sambil melihat langsung bentuk tubuh manusia.
						</li>
						<li>
							<strong>Edukatif!</strong> Disampaikan dengan cara yang menyenangkan dan mudah dipahami.
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
