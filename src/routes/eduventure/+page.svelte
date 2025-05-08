<script>
	import EduCard from '$lib/components/card/EduCard.svelte';

	let eduventureEvent = [
		{
			id: 1,
			title: 'Eduventure Lite',
			date: 'Sesuai Jadwal',
			description:
				'Eduventure Lite adalah Program Sosialisasi Universitas Padjadjaran yang diselenggarakan oleh Humas Unpad. Pematerian umum dipandu oleh Kantor Komunikasi Publik dengan durasi 60 menit di Gedung Rektorat.',
			image: '/zona/lite.webp',
			location: 'Universitas Padjadjaran',
			link: '/eduventure/lite'
		},
		{
			id: 2,
			title: 'Eduventure Experience',
			date: '18 Mei 2025',
			description:
				'Unpad Eduventure Experience adalah program edukasi interaktif yang dirancang untuk siswa SMP, SMA, dan sederajat. Tersedia 3 Zona untuk Eduventure yang bisa dipilih oleh peserta yaitu Zona Kesehatan, Zona Soshum dan Zona Saintek & Agrokomplek',
			image: '/background.webp',
			location: 'Universitas Padjadjaran',
			link: '/eduventure/experience'
		},
		{
			id: 3,
			title: 'Eduventure Full Package',
			date: 'Sesuai Jadwal',
			description:
				'Program dilaksanakan pada jadwal sesuai permintaan dalam jumlah peserta yang besar. Full Package juga termasuk dalam Kegiatan Eduventure Experience. Sudah termasuk transportasi, akomodasi, konsumsi, yang dilayani oleh MMU Event & Tour Organizer',
			image: '/edu/2.jpg',
			location: 'Universitas Padjadjaran',
			link: '/eduventure/full-package'
		},
		{
			id: 4,
			title: 'Eduventure Dream',
			date: 'Sesuai Jadwal',
			description:
				'Eduventure Dream adalah program kunjungan edukatif di Universitas Padjadjaran yang dirancang khusus untuk siswa sekolah dasar. Melalui kegiatan ini, anak-anak diajak menjelajah kampus sambil mengenal sains, teknologi, dan pentingnya menjaga lingkungan.',
			image: '/edu/dream.webp',
			location: 'Universitas Padjadjaran',
			link: '/eduventure/dream'
		},
		{
			id: 5,
			title: 'Eduventure Thematic: Human Anatomy',
			date: 'Sesuai Jadwal',
			description:
				'Yuk, ikut petualangan seru ke dalam tubuh manusia! Dalam program Eduventure: Exploring Human Anatomy, siswa sekolah dasar akan belajar mengenal bagian-bagian tubuh manusia dengan cara yang seru dan mudah dimengerti.',
			image: '/edu/thematic-anatomy.webp',
			location: 'Laboratorium Anatomi, Universitas Padjadjaran',
			link: '/eduventure/thematic/human-anatomy'
		},
		{
			id: 6,
			title: 'Eduventure Thematic: Hydroponic Adventure',
			date: 'Sesuai Jadwal',
			description:
				'Yuk, seru-seruan belajar bercocok tanam tanpa tanah! Dalam program Eduventure: Hydroponic Adventure, siswa sekolah dasar akan diajak mengenal konsep pertanian modern yang ramah lingkungan melalui metode hidroponik.',
			image: '/edu/hydroponic.jpg',
			location: 'Bale Tatanén, Fakultas Pertanian, Universitas Padjadjaran',
			link: '/eduventure/thematic/hydroponic'
		}
	];
</script>

<section>
	<div>
		<h1 class="text-center my-10">Unpad Eduventure</h1>
		<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 my-10 gap-5">
			{#each eduventureEvent as eduventure}
				<EduCard {eduventure} />
			{/each}
		</div>
	</div>
</section>

<style>
	section {
		@apply container ma pt-30;
	}
</style>
