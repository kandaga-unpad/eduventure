<script>
	import QRCode from 'easyqrcodejs';
	import { onMount } from 'svelte';
	let { data } = $props();

	/**
	 * @type {HTMLDivElement}
	 */
	let qrCodeContainer;

	onMount(() => {
		const options = {
			text: data.tiket.id,
			width: 200,
			height: 200,
			colorDark: '#000000',
			colorLight: '#ffffff',
			correctLevel: QRCode.CorrectLevel.H
		};

		new QRCode(qrCodeContainer, options);
	});
</script>

<section data-name="tiket" class="flex flex-col items-center justify-center">
	<div class="mb-10">
		<h5 class="text-gray-5">Silahkan tunjukkan tiket ini kepada panitia ketika kegiatan</h5>
		<div class="mt-5 text-center">
			<a href="/profile/tiket">&leftarrow; Kembali</a>
		</div>
	</div>
	<div id="tiket-eduventure-${data.tiket.kode_tagihan}" class="max-w-lg">
		<h5 class="bg-brand-primary text-white py-2 text-center rounded-t">Tiket Eduventure</h5>
		<div class="bg-blue-50 flex flex-col items-center p-10">
			<img src="/Logo-Eduventure.png" alt="Logo Eduventure" class="w-70" />
			<div class="flex flex-col items-center justify-center gap-3 text-center">
				<h5>
					{new Date(data.tiket.pilihan_zona.tanggal_acara).toLocaleString('id-ID', {
						weekday: 'long',
						day: 'numeric',
						month: 'long',
						year: 'numeric'
					})}
				</h5>
				<h4 class="text-green-7">{data.tiket.pilihan_zona.title}</h4>
				<p class="text-md font-bold text-gray-5">Eduventure Experience Universitas Padjadjaran</p>
				<p class="text-xs text-gray-6">untuk</p>
				<h2>{data.tiket.nama}</h2>
			</div>
		</div>
		<div class="grid bg-blue-2 rounded-b items-start justify-center p-10 gap-5">
			<div class="flex items-center justify-center">
				<img src="/Logo-Eduventure.png" alt="Logo Eduventure" class="w-40" />
			</div>
			<div class="flex flex-col items-center justify-center">
				<h6 class="text-center">{data.tiket.pilihan_zona.location}</h6>
				<div class="grid grid-cols-2 text-xs pt-2">
					<p>Jam Mulai : {data.tiket.pilihan_zona.jam_mulai}</p>
					<p>Jam Selesai : {data.tiket.pilihan_zona.jam_selesai}</p>
				</div>
			</div>
			<div class="flex flex-col items-center justify-start">
				<h6>QR Code</h6>
				<div bind:this={qrCodeContainer} class="p-5 bg-white mt-5 rounded"></div>
			</div>
		</div>
	</div>
	<div class="mt-5">
		<a href="/profile/tiket">&leftarrow; Kembali</a>
	</div>
</section>

<style>
	section {
		@apply container ma my-35;
	}
</style>
