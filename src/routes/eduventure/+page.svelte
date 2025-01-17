<script>
	import EduCard from '$lib/components/card/EduCard.svelte';

	let eduventureEvent = [
		{
			id: 1,
			title: 'Eduventure Lite',
			date: 'Sesuai Jadwal',
			description:
				'Eduventure Lite adalah Program Sosialisasi Universitas Padjadjaran yang diselenggarakan oleh Humas Unpad. Untuk saat ini sudah penuh hingga bulan Maret 2025.',
			image: '/zona/lite.webp',
			location: 'Universitas Padjadjaran',
			link: '/eduventure/lite'
		},
		{
			id: 2,
			title: 'Eduventure Experience',
			date: '22 - 23 Februari 2025',
			description:
				'Eduventure Experience diselenggarakan pada Tanggal 22 - 23 Februari 2025. Tersedia 3 Zona untuk Eduventure yang bisa dipilih oleh peserta yaitu Zona Kesehatan, Zona Soshum dan Zona Saintek & Agrokomplek',
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
