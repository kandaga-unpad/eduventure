<script>
	import GenericCard from '$lib/components/card/GenericCard.svelte';
	import Lite from '$lib/components/card/Lite.svelte';
	import ZonaEduventure from '$lib/components/card/ZonaEduventure.svelte';
	import HeroDesc from '$lib/components/hero/HeroDesc.svelte';
	import HeroImg from '$lib/components/hero/HeroImg.svelte';

	const eduventureExperience = {
		color: 'green',
		nama: 'Eduventure <br /> Experience',
		harga: 'Rp350.000',
		detail: 'Kaos Unpad + Snackbox',
		textPertama:
			'Pematerian umum dipandu oleh Kantor Komunikasi Publik dengan durasi 30 menit di Gedung Rektorat. Kegiatan dimulai dari Gedung Rektorat dan dilanjutkan ke fakultas/sekolah menggunakan angkutan dalam kampus yang dipandu oleh panitia mahasiswa magang.',
		textKedua:
			'Untuk Eduventure Experience tanggal 22-23 Februari 2025, tiket sudah termasuk akses kegiatan Open House Universitas Padjadjaran',
		select: 'Pilih Experience',
		url: '/eduventure/experience'
	};

	const eduventureFullPackage = {
		color: 'orange',
		nama: 'Eduventure <br /> Full Package',
		harga: 'Spesial',
		detail: 'Oleh MMU Event & Tour Organizer',
		textPertama:
			'Program dilaksanakan pada jadwal sesuai permintaan dalam jumlah peserta yang besar. Full Package juga termasuk dalam Kegiatan Eduventure Experience. Sudah termasuk transportasi, akomodasi, konsumsi, yang dilayani oleh MMU Event & Tour Organizer',
		textKedua: `<p>Admin : <a href="tel:62822506090">+62 822 50 60 90</a></p>
							<p>⁠Email : <a href="mailto:mahatmasagievent@gmail.com">mahatmasagievent@gmail.com</a></p>
							<p>Instagram: <a href="https://instagram.com/mmu.eventtourorganizer">mmu.eventtourorganizer</a></p>`,
		select: 'Pilih Full Package',
		url: '/eduventure/full-package'
	};

	const zona1 = {
		tipe: 'Zona 1 : Kesehatan',
		nama: 'Rumpun Ilmu Kesehatan',
		gambar: '/zona/zona1.jpg',
		deskripsi:
			'Rumpun Ilmu Kesehatan yang ada di Universitas Padjadjaran terdiri dari Fakultas Kedokteran, Fakultas Kedokteran Gigi, Fakultas Keperawatan, Fakultas Farmasi dan Fakultas Psikologi. Pada zona ini, peserta akan diajak untuk mengenal lebih jauh tentang dunia kesehatan melalui simulasi dan praktik langsung.',
		link: '/eduventure/experience',
		button: 'Pilih Zona 1',
		isReverse: false
	};

	const zona2 = {
		tipe: 'Zona 2 : Sosial & Humaniora',
		nama: 'Rumpun Ilmu Sosial dan Humaniora',
		gambar: '/zona/zona2.webp',
		deskripsi:
			'Rumpun Ilmu Sosial dan Humaniora terdiri dari Fakultas Hukum, Fakultas Ekonomi dan Bisnis, Fakultas Ilmu Sosial dan Ilmu Politik, Fakultas Ilmu Budaya dan Fakultas Ilmu Komunikasi. Pada zona ini, peserta akan diajak untuk mengenal lebih jauh tentang dunia sosial dan humaniora melalui simulasi dan praktik langsung.',
		link: '/eduventure/experience',
		button: 'Pilih Zona 2',
		isReverse: true
	};

	const zona3 = {
		tipe: 'Zona 3 : Saintek & Agrokomplek',
		nama: 'Rumpun Ilmu Saintek dan Agrokomplek',
		gambar: '/zona/zona3.jpg',
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
				Unpad Eduventure adalah program edukasi interaktif yang dirancang untuk siswa SMP dan SMA
				(dan sederajat). Kegiatan ini menggabungkan konsep pendidikan dan petualangan yang berfokus
				pada eksplorasi fakultas dan program studi yang ada di Universitas Padjadjaran.
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
