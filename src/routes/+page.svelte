<script>
	import GenericCard from '$lib/components/card/GenericCard.svelte';
	import Lite from '$lib/components/card/Lite.svelte';
	import HeroDesc from '$lib/components/hero/HeroDesc.svelte';
	import HeroImg from '$lib/components/hero/HeroImg.svelte';

	let eduventureExperience = {
		color: 'green',
		nama: 'Eduventure Experience',
		harga: 'Rp350.000',
		detail: 'Kaos Unpad + Snackbox',
		textPertama:
			'Pematerian umum dipandu oleh Kantor Komunikasi Publik dengan durasi 30 menit di Gedung Rektorat. Kegiatan dimulai dari Gedung Rektorat dan dilanjutkan ke fakultas/sekolah menggunakan angkutan dalam kampus yang dipandu oleh panitia mahasiswa magang.',
		textKedua:
			'Untuk Eduventure Experience tanggal 22-23 Februari 2025, tiket sudah termasuk akses kegiatan Open House Universitas Padjadjaran',
		select: 'Pilih Experience',
		url: '/'
	};

	const eduventureFullPackage = {
		color: 'orange',
		nama: 'Eduventure Full Package',
		harga: 'Spesial',
		detail: 'Oleh MMU Event & Tour Organizer',
		textPertama:
			'Program dilaksanakan pada jadwal sesuai permintaan dalam jumlah peserta yang besar. Full Package juga termasuk dalam Kegiatan Eduventure Experience. Sudah termasuk transportasi, akomodasi, konsumsi, yang dilayani oleh MMU Event & Tour Organizer',
		textKedua: `<p>Admin : <a href="tel:62822506090">+62 822 50 60 90</a></p>
							<p>⁠Email : <a href="mailto:mahatmasagievent@gmail.com">mahatmasagievent@gmail.com</a></p>
							<p>Instagram: <a href="https://instagram.com/mmu.eventtourorganizer">mmu.eventtourorganizer</a></p>`,
		select: 'Pilih Full Package',
		url: '/'
	};
</script>

<section>
	<div class="hero-section">
		<HeroDesc />
		<HeroImg />
	</div>
	<div class="eduventure-intro">
		<img src="/logo.webp" class="max-w-sm" alt="" />
		<div class="flex flex-col gap-4 text-justify">
			<p>
				Unpad Eduventure adalah program edukasi interaktif yang dirancang untuk siswa SMP dan SMA
				(dan sederajat). Kegiatan ini menggabungkan konsep education dan adventure yang berfokus
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
	<div class="container ma py-10">
		<div class="grid grid-cols-3 gap-5">
			<Lite />
			<GenericCard eduventure={eduventureExperience} />
			<GenericCard eduventure={eduventureFullPackage} />
		</div>
	</div>
	<div class="w-full bg-brand-primary text-center py-10">
		<h1 class="text-white">Eduventure</h1>
	</div>
	<div class="container ma py-10"></div>
</section>

<style>
	.hero-section {
		@apply container ma px-5 grid grid-cols-1 xl:grid-cols-2 items-center justify-between gap-5 py-30 xl:py-50;
	}

	.eduventure-intro {
		@apply container ma flex items-center justify-between gap-10 my-20;
	}
</style>
