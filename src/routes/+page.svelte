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
		<img src="/Logo-Eduventure.png" class="w-full max-w-lg" alt="" />
		<div class="flex flex-col gap-4 text-justify">
			<p>
				Unpad Eduventure adalah program edukasi interaktif yang dirancang untuk siswa dari berbagai
				jenjang pendidikan (SD-SMP-SMA) bahkan untuk komunitas umum. Kegiatan ini menggabungkan
				konsep pendidikan dan petualangan yang berfokus pada eksplorasi fakultas dan program studi
				yang ada di Universitas Padjadjaran.
			</p>
			<p>
				Program ini dirancang untuk membantu siswa memahami dunia perkuliahan dan karier yang sesuai
				dengan minat mereka melalui simulasi, praktik langsung, dan pengalaman seru.
			</p>
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
