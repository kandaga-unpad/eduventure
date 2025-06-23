<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { holiyeayTicketStore } from '$lib/composables/ticketStore';
	import { formatCurrency } from '$lib/composables/number';
	import { cutString } from '$lib/composables/string';
	import { formatDateToIndonesian } from '$lib/composables/date';
	import { SignIn } from '@auth/sveltekit/components';
	import { handleAnchorClick } from '$lib/composables/link';

	let { data } = $props();

	const zonaHoliyeay = data.zonaHoliyeay[0];

	let now = new Date();
	let closeDateTiket = new Date(`${zonaHoliyeay.tanggal_acara}T${zonaHoliyeay.jam_mulai}`);
	let ticketSeatLeftHoliyeay = zonaHoliyeay?.kuota - data?.soldTicketHoliyeay;
	let tiketZonaHoliyeay = $state($holiyeayTicketStore.tiketZonaHoliyeay);
	let totalHargaHoliyeay = $state($holiyeayTicketStore.totalHargaHoliyeay);

	const addTiketHoliyeay = () => {
		tiketZonaHoliyeay += 1;
		totalHargaHoliyeay += zonaHoliyeay.harga_tiket;
	};
	const decreaseTiketHoliyeay = () => {
		tiketZonaHoliyeay -= 1;
		totalHargaHoliyeay -= zonaHoliyeay.harga_tiket;
	};

	const buyTicket = async () => {
		const session = page.data.session?.user;

		if (tiketZonaHoliyeay === 0) {
			alert('Tidak ada tiket yang dibeli');
			return;
		} else if (!session) {
			alert('Silakan masuk untuk membeli tiket');
			return;
		}

		$holiyeayTicketStore.tiketZonaHoliyeay = tiketZonaHoliyeay;
		$holiyeayTicketStore.totalHargaHoliyeay =
			$holiyeayTicketStore.tiketZonaHoliyeay * zonaHoliyeay.harga_tiket;

		await goto('/holiyeay/checkout');
	};
</script>

<section>
	<div class="grid grid-cols-1 xl:grid-cols-3 xl:gap-5 my-10 mx-2">
		<div class="flex flex-col items-center col-span-2 bg-white shadow-2xl rounded-lg">
			<div class="flex my-10">
				<img src="/logo-unpad.png" class="h-20" alt="Logo Eduventure" />
				<img src="/Logo-Eduventure.png" class="h-24" alt="Logo Eduventure" />
			</div>

			<div class="bg-brand-primary px-4 py-1 rounded-xl">
				<a href="/eduventure">
					<h6 class="text-white">Eduventure</h6>
				</a>
			</div>
			<div class="mb-10 flex flex-col items-center gap-5 px-15 text-justify">
				<a
					href="#buyTicket"
					onclick={handleAnchorClick}
					class="btn bg-brand-primary text-white w-full text-center xl:hidden"
				>
					Pesan Tiket
				</a>
				<div>
					{@html zonaHoliyeay.contents}
				</div>
			</div>
		</div>
		<div class="flex flex-col items-center gap-5" id="buyTicket">
			<div class="bg-blue-50 p-5 rounded-lg">
				<h5 class="text-center">Pembelian Tiket</h5>
				{#if data.zonaHoliyeay.length > 0}
					<div class="bg-white p-3 my-5">
						<div>
							<p class="text-lg font-bold mb-5">
								{cutString(zonaHoliyeay.title)}
							</p>
							<div>
								<p class="text-xs text-brand-primary font-bold">
									Senin - Selasa, 7 - 8 Juli 2025 | {zonaHoliyeay.jam_mulai} - {zonaHoliyeay.jam_selesai}
								</p>
							</div>
						</div>
						{#if now < new Date(zonaHoliyeay.tanggal_acara) && zonaHoliyeay.kuota !== null && zonaHoliyeay.is_open === 'open'}
							<div class="bg-gray-3 p-2 rounded-lg my-3 text-center">
								<p class="font-bold">
									Kuota Tiket : <span class="text-red-6">{ticketSeatLeftHoliyeay}</span>
								</p>
							</div>
						{/if}

						<hr class="my-2" />
						{#if zonaHoliyeay.is_open === 'closed'}
							<p class="text-red-6 font-semibold">Pembelian Tiket Holiyeay belum dibuka</p>
						{:else if now < closeDateTiket && (ticketSeatLeftHoliyeay > 0 || zonaHoliyeay.kuota === null)}
							<div class="grid grid-cols-3 items-center justify-center text-sm">
								<div>
									<p>Harga Tiket</p>
									<p class="font-bold">{formatCurrency(zonaHoliyeay.harga_tiket)}</p>
								</div>
								<div class="text-center">
									<p>Jumlah</p>
									<div class="flex items-center text-dark">
										<button
											class="px-2 h-8 border-1 border-dark rounded"
											onclick={() => decreaseTiketHoliyeay()}
											disabled={tiketZonaHoliyeay === 0}
										>
											-
										</button>
										<input
											type="number"
											class="h-8 p-2 rounded-none text-center"
											bind:value={tiketZonaHoliyeay}
										/>
										<button
											class="px-2 h-8 border-1 border-dark rounded"
											onclick={() => addTiketHoliyeay()}
										>
											+
										</button>
									</div>
								</div>
								<div class="flex flex-col items-center">
									<p>Total</p>
									<p class="font-bold">{formatCurrency(totalHargaHoliyeay)}</p>
								</div>
							</div>
						{:else if now > closeDateTiket || zonaHoliyeay.is_open === 'closed'}
							<div class="m-5">
								<p class="text-center font-semibold text-red-6">
									Pendaftaran dan Pembelian <br /> Tiket Eduventure Holiyeay ditutup
								</p>
							</div>
						{/if}
						{#if !page.data.session?.user}
							<div class="flex flex-col justify-center items-center">
								<p class="text-white bg-red-6 rounded text-center text-sm my-3 w-full">
									Anda belum Login, pastikan anda sudah Login sebelum membeli tiket
								</p>
								<SignIn>
									<div slot="submitButton" class="bg-green-7 text-white text-xs py-2 px-4 rounded">
										Login
									</div>
								</SignIn>
							</div>
						{/if}
						<button
							class="btn {now > closeDateTiket
								? 'bg-gray-3 text-dark'
								: 'bg-brand-primary text-white'} w-full mt-5"
							onclick={buyTicket}
							disabled={now > closeDateTiket}
						>
							{now > closeDateTiket ? 'Pembelian Tiket Ditutup' : 'Beli Tiket'}
						</button>
					</div>
				{:else}
					<p class="text-red-6 font-semibold">Pembelian Tiket tidak dapat dilakukan saat ini.</p>
				{/if}
				<div class="my-5 text-center">
					<p>Ada pertanyaan atau perlu bantuan ?</p>
					<a href="tel:082211676765" class="text-brand-primary underline">Hubungi Kami</a>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	section {
		@apply container ma pt-30;
	}

	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		appearance: textfield;
		-moz-appearance: textfield;
	}
</style>
