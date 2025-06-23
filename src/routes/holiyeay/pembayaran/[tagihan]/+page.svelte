<script>
	import { formatDateToIndonesianWithTime } from '$lib/composables/date';
	import { formatCurrency } from '$lib/composables/number';

	let { data } = $props();

	const copyJumlah = () => {
		navigator.clipboard.writeText(String(data.invoiceXendit.amount));
		alert('Jumlah tagihan berhasil disalin');
	};
</script>

<section>
	<div class="text-center">
		<h2>Detail Pembayaran</h2>
		<p>Silahkan lengkapi pembayaran anda dengan mengikuti petunjuk berikut</p>
	</div>
	{#if data.tagihan.length > 0}
		<div class="flex flex-col items-center gap-5 my-5 px-3">
			<div class="bg-blue-1 rounded-xl w-full max-w-md text-center">
				<h3 class="bg-brand-primary rounded-t-xl text-white py-2 mb-10">Pembayaran Tiket</h3>
				<h6 class="mb-2">Detail Pemesanan</h6>
				<div>Tiket</div>
				<div class="my-5 text-gray-6 px-10 text-sm">
					<p>Pembayaran dapat dilakukan dengan mengklik tombol Bayar Sekarang</p>
					<p>
						Silahkan cek channel pembayaran yang tersedia setelah anda mengklik tombol Bayar
						Sekarang
					</p>
					<p>
						Setelah anda membayar silahkan untuk mengecek status pembayaran di profil anda atau klik
						tombol Cek Status Pembayaran dibawah. Jika status belum berubah silahkan reload
						halamannya, atau hubungi kami jika ada kendala lainnya di nomor : <br />
						<a href="tel:082211676765">0822-1167-6765</a>
					</p>
					<p></p>
				</div>
				<div class="mt-10 py-5 bg-blue-2 rounded-b-xl">
					<p class="font-semibold">Jumlah yang harus dibayarkan :</p>
					<button onclick={copyJumlah} class="bg-transparent">
						<h2 class="text-green-6">
							{formatCurrency(data.invoiceXendit.amount)}
						</h2>
					</button>
					<p class="text-xs mt-2 italic">
						Silahkan bayar sebelum : <br />
						<span class="font-bold text-red-6">
							{formatDateToIndonesianWithTime(data.invoiceXendit.expiryDate.toISOString())}
						</span>
					</p>
				</div>
			</div>
			<div class="w-full max-w-md flex gap-2">
				<a href={data.tagihan[0].url_tagihan} class="bayar-sekarang" target="_blank">
					Bayar Sekarang
				</a>
				<a href="/profile/tiket" class="status-pembayaran"> Cek Status Pembayaran </a>
			</div>
		</div>
	{:else}
		<div class="text-center my-10">
			<p class="text-red-6 text-xl">Anda belum memiliki tagihan!</p>
		</div>
	{/if}

	<div class="flex items-center justify-center">
		<a href="/eduventure" class="text-center mb-10"> &leftarrow;Kembali </a>
	</div>
</section>

<style>
	section {
		@apply container ma pt-30;
	}

	.bayar-sekarang {
		@apply btn bg-green-6 w-full rounded-xl text-center border-1 text-white;
	}

	.status-pembayaran {
		@apply btn bg-transparent border-1 border-brand-primary w-full rounded-xl text-center text-brand-primary hover:(bg-brand-primary text-white);
	}
</style>
