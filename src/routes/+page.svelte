<script>
	import GenericCard from '$lib/components/card/GenericCard.svelte';
	import Lite from '$lib/components/card/Lite.svelte';
	import ZonaEduventure from '$lib/components/card/ZonaEduventure.svelte';
	import HeroDesc from '$lib/components/hero/HeroDesc.svelte';
	import HeroImg from '$lib/components/hero/HeroImg.svelte';

	const eduventureExperience = {
		color: 'green',
		nama: 'Eduventure Experience',
		harga: 'Rp 350.000',
		detail: '3 Zona Experience',
		textPertama:
			'Program simulasi dan praktik langsung ke fakultas/program studi yang ada di Unpad. Tersedia 3 zona pilihan, yaitu Zona Sosial dan Humaniora, Zona Saintek dan Agrokomplek, dan Zona Ilmu Kesehatan.',
		textKedua:
			'Terbuka untuk siswa SMP, SMA (sederajat) maupun Gap Year. Eduventure Experience akan dilaksanakan pada 18 Mei 2025. Klik untuk daftar dan pilih zona.',
		select: 'Pilih Experience',
		url: '/eduventure/experience'
	};

	const eduventureFullPackage = {
		color: 'orange',
		nama: 'Eduventure Full Package',
		harga: 'Spesial',
		detail: 'Oleh MMU Event & Tour Organizer',
		textPertama:
			'Program dilaksanakan pada jadwal sesuai permintaan dalam jumlah peserta yang besar. Full Package juga termasuk dalam Kegiatan Eduventure Experience. Sudah termasuk transportasi, akomodasi, konsumsi, yang dilayani oleh MMU Event & Tour Organizer',
		textKedua: `<p>Admin : <a href="tel:62822506090">+62 822 50 60 90</a></p>
							<p>Email : <a href="mailto:mahatmasagievent@gmail.com">mahatmasagievent@gmail.com</a></p>
							<p>Instagram: <a href="https://instagram.com/mmu.eventtourorganizer">mmu.eventtourorganizer</a></p>`,
		select: 'Pilih Full Package',
		url: '/eduventure/full-package'
	};

	const eduventureDream = {
		color: 'orange',
		nama: 'Eduventure Dream',
		harga: 'Rp 300.000',
		detail: 'per orang, minimum 100 peserta. (sudah termasuk snack dan merchandise)',
		textPertama:
			'Eduventure Dream adalah program kunjungan edukatif di Universitas Padjadjaran yang dirancang khusus untuk siswa sekolah dasar.',
		textKedua: `Semua kegiatan dikemas interaktif dan menyenangkan, dipandu oleh mahasiswa dan dosen dari berbagai fakultas di Unpad.`,
		select: 'Pilih Dream',
		url: '/eduventure/dream'
	};

	const eduventureThematicHumanAnatomy = {
		color: 'green',
		nama: 'Eduventure Thematic: Human Anatomy',
		harga: 'Rp 250.000',
		detail: 'per orang, minimum 70 peserta. (sudah termasuk snack dan merchandise)',
		textPertama:
			'Yuk, ikut petualangan seru ke dalam tubuh manusia! Dalam program Eduventure: Exploring Human Anatomy, siswa sekolah dasar akan belajar mengenal bagian-bagian tubuh manusia dengan cara yang seru dan mudah dimengerti.',
		textKedua: `Kegiatan ini didesain khusus untuk memicu rasa ingin tahu anak dan menumbuhkan minat belajar di bidang sains dan kesehatan sejak dini.`,
		select: 'Pilih Thematic',
		url: '/eduventure/thematic/human-anatomy'
	};

	const eduventureThematicHydroponic = {
		color: 'orange',
		nama: 'Eduventure Thematic: Hydroponic Adventure',
		harga: 'Rp 250.000',
		detail: 'per orang, minimum 70 peserta. (sudah termasuk snack dan merchandise)',
		textPertama:
			'Yuk, seru-seruan belajar bercocok tanam tanpa tanah! Dalam program Eduventure: Hydroponic Adventure, siswa sekolah dasar akan diajak mengenal konsep pertanian modern yang ramah lingkungan melalui metode hidroponik.',
		textKedua: `Program ini dirancang untuk menumbuhkan kepedulian terhadap lingkungan dan ketertarikan pada dunia pertanian sejak dini.`,
		select: 'Pilih Thematic',
		url: '/eduventure/thematic/hydroponic'
	};

	const zona1 = {
		tipe: 'Zona 1 : Kesehatan',
		nama: 'Rumpun Ilmu Kesehatan',
		gambar: '/experience/FK0.jpg',
		deskripsi:
			'Rumpun Ilmu Kesehatan yang ada di Universitas Padjadjaran terdiri dari Fakultas Kedokteran, Fakultas Kedokteran Gigi, Fakultas Keperawatan, Fakultas Farmasi dan Fakultas Psikologi. Pada zona ini, peserta akan diajak untuk mengenal lebih jauh tentang dunia kesehatan melalui simulasi dan praktik langsung.',
		link: '/eduventure/experience',
		button: 'Pilih Zona 1',
		isReverse: false
	};

	const zona2 = {
		tipe: 'Zona 2 : Sosial & Humaniora',
		nama: 'Rumpun Ilmu Sosial dan Humaniora',
		gambar: '/experience/FH0.jpg',
		deskripsi:
			'Rumpun Ilmu Sosial dan Humaniora terdiri dari Fakultas Hukum, Fakultas Ekonomi dan Bisnis, Fakultas Ilmu Sosial dan Ilmu Politik, Fakultas Ilmu Budaya dan Fakultas Ilmu Komunikasi. Pada zona ini, peserta akan diajak untuk mengenal lebih jauh tentang dunia sosial dan humaniora melalui simulasi dan praktik langsung.',
		link: '/eduventure/experience',
		button: 'Pilih Zona 2',
		isReverse: true
	};

	const zona3 = {
		tipe: 'Zona 3 : Saintek & Agrokomplek',
		nama: 'Rumpun Ilmu Saintek dan Agrokomplek',
		gambar: '/experience/FMIPA0.jpg',
		deskripsi:
			'Rumpun Ilmu Saintek dan Agrokomplek terdiri dari Fakultas Matematika dan Ilmu Pengetahuan Alam, Fakutas Pertanian, Fakultas Peternakan, Fakultas Teknik Geologi, Fakultas Teknologi Industri Pertanian, Fakultas Perikanan dan Ilmu Kelautan. Pada zona ini, peserta akan diajak untuk mengenal lebih jauh tentang dunia sains dan teknologi melalui simulasi dan praktik langsung.',
		link: '/eduventure/experience',
		button: 'Pilih Zona 3',
		isReverse: false
	};
</script>

<section>
	<div class="hero-section">
		<HeroDesc />
		<HeroImg />
	</div>
	<div class="eduventure-intro">
		<div class="w-full">
			<blockquote
				class="instagram-media"
				data-instgrm-permalink="https://www.instagram.com/reel/DJY8UyGzjrb/?utm_source=ig_embed&amp;utm_campaign=loading"
				data-instgrm-version="14"
				style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"
			>
				<div style="padding:16px;">
					<a
						href="https://www.instagram.com/reel/DJY8UyGzjrb/?utm_source=ig_embed&amp;utm_campaign=loading"
						style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;"
						target="_blank"
					>
						<div style=" display: flex; flex-direction: row; align-items: center;">
							<div
								style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"
							></div>
							<div
								style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"
							>
								<div
									style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"
								></div>
								<div
									style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"
								></div>
							</div>
						</div>
						<div style="padding: 19% 0;"></div>
						<div style="display:block; height:50px; margin:0 auto 12px; width:50px;">
							<svg
								width="50px"
								height="50px"
								viewBox="0 0 60 60"
								version="1.1"
								xmlns="https://www.w3.org/2000/svg"
								xmlns:xlink="https://www.w3.org/1999/xlink"
								><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"
									><g transform="translate(-511.000000, -20.000000)" fill="#000000"
										><g
											><path
												d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"
											></path></g
										></g
									></g
								></svg
							>
						</div>
						<div style="padding-top: 8px;">
							<div
								style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;"
							>
								View this post on Instagram
							</div>
						</div>
						<div style="padding: 12.5% 0;"></div>
						<div
							style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"
						>
							<div>
								<div
									style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"
								></div>
								<div
									style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"
								></div>
								<div
									style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"
								></div>
							</div>
							<div style="margin-left: 8px;">
								<div
									style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"
								></div>
								<div
									style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"
								></div>
							</div>
							<div style="margin-left: auto;">
								<div
									style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"
								></div>
								<div
									style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"
								></div>
								<div
									style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"
								></div>
							</div>
						</div>
						<div
							style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"
						>
							<div
								style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"
							></div>
							<div
								style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"
							></div>
						</div></a
					>
					<p
						style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"
					>
						<a
							href="https://www.instagram.com/reel/DJY8UyGzjrb/?utm_source=ig_embed&amp;utm_campaign=loading"
							style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;"
							target="_blank">A post shared by Unpad Luhung (@unpad.luhung)</a
						>
					</p>
				</div>
			</blockquote>
			<script async src="//www.instagram.com/embed.js"></script>
		</div>
		<div class="flex flex-col items-center justify-center">
			<img src="/Logo-Eduventure.png" class="w-full max-w-lg" alt="" />
			<div class="flex flex-col gap-4 text-justify">
				<p>
					Unpad Eduventure adalah program edukasi interaktif yang dirancang untuk siswa dari
					berbagai jenjang pendidikan (SD-SMP-SMA) bahkan untuk komunitas umum. Kegiatan ini
					menggabungkan konsep pendidikan dan petualangan yang berfokus pada eksplorasi fakultas dan
					program studi yang ada di Universitas Padjadjaran.
				</p>
				<p>
					Program ini dirancang untuk membantu siswa memahami dunia perkuliahan dan karier yang
					sesuai dengan minat mereka melalui simulasi, praktik langsung, dan pengalaman seru.
				</p>
			</div>
		</div>
	</div>
	<div class="w-full bg-brand-primary text-center py-10">
		<h1 class="text-white">Eduventure</h1>
	</div>
	<div class="container ma py-10" id="skema-eduventure">
		<div class="grid grid-cols-1 xl:grid-cols-3 gap-5 px-5 xl:px-2">
			<Lite />
			<GenericCard eduventure={eduventureExperience} />
			<GenericCard eduventure={eduventureFullPackage} />
			<GenericCard eduventure={eduventureDream} />
			<GenericCard eduventure={eduventureThematicHumanAnatomy} />
			<GenericCard eduventure={eduventureThematicHydroponic} />
		</div>
	</div>
	<div class="w-full bg-brand-primary text-center py-10 mt-30">
		<h1 class="text-white">Zona Eduventure Experience</h1>
	</div>
	<div class="container ma px-5 xl:px-0">
		<ZonaEduventure zona={zona1} />
		<ZonaEduventure zona={zona2} />
		<ZonaEduventure zona={zona3} />
	</div>
</section>

<style>
	.hero-section {
		@apply container ma px-5 grid grid-cols-1 xl:grid-cols-2 items-center justify-between gap-5 py-30 xl:py-50;
	}

	.eduventure-intro {
		@apply container ma flex flex-col xl:flex-row items-center justify-between gap-10 mb-20 px-5 xl:px-0;
	}
</style>
