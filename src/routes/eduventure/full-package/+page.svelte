<script>
	let { data } = $props();
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
				<h2 class="text-center my-5">Eduventure Full Package <br />Universitas Padjadjaran</h2>
				<img
					src="/edu/2.jpg"
					class="w-full rounded-lg max-h-md object-cover"
					alt="Eduventure Lite"
				/>
				<p>
					Unpad Eduventure adalah program edukasi interaktif yang dirancang untuk siswa SMP dan SMA
					(dan sederajat). Kegiatan ini menggabungkan konsep education dan adventure yang berfokus
					pada eksplorasi fakultas dan program studi yang ada di Universitas Padjadjaran. Program
					ini dirancang untuk membantu siswa memahami dunia perkuliahan dan karier yang sesuai
					dengan minat mereka melalui simulasi, praktik langsung, dan pengalaman seru.
				</p>
				<p>
					Program dilaksanakan pada jadwal sesuai permintaan dalam jumlah peserta yang besar. Full
					Package juga termasuk dalam Kegiatan Eduventure Experience. Sudah termasuk transportasi,
					akomodasi, konsumsi, yang dilayani oleh MMU Event & Tour Organizer
				</p>
				<div>
					<h3 class="text-center mb-2">Kontak</h3>
					<div class="my-2">Admin : <a href="tel:62822506090"> +62 822 50 60 90</a></div>
					<div class="my-2">
						Email : <a href="mailto:mahatmasagievent@gmail.com"> mahatmasagievent@gmail.com </a>
					</div>
					<div class="my-2">
						Instagram:
						<a href="https://instagram.com/mmu.eventtourorganizer" target="_blank">
							mmu.eventtourorganizer
						</a>
					</div>
				</div>
				<div class="w-full flex items-center justify-center gap-3 text-center">
					<a href="tel:62822506090" class="btn bg-brand-primary text-white w-full">
						Hubungi MMU Event & Tour Organizer
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
</style>
