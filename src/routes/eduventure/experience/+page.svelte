<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { ticketStore } from '$lib/composables/ticketStore';
	import { SignIn } from '@auth/sveltekit/components';

	let tiketZona1 = $state($ticketStore.tiketZona1);
	let tiketZona2 = $state($ticketStore.tiketZona2);
	let tiketZona3 = $state($ticketStore.tiketZona3);

	let totalTiketZona1 = $derived(tiketZona1 * 350000);
	let totalTiketZona2 = $derived(tiketZona2 * 350000);
	let totalTiketZona3 = $derived(tiketZona3 * 350000);

	const addTiketZona = (/** @type {string} */ zona) => {
		switch (zona) {
			case 'zona1':
				tiketZona1 += 1;
				break;
			case 'zona2':
				tiketZona2 += 1;
				break;
			case 'zona3':
				tiketZona3 += 1;
				break;
			default:
				alert('Tidak tersedia');
				break;
		}
	};

	const decreaseTiketZona = (/** @type {string} */ zona) => {
		switch (zona) {
			case 'zona1':
				if (tiketZona1 === 0) return;
				tiketZona1 -= 1;
				break;
			case 'zona2':
				if (tiketZona2 === 0) return;
				tiketZona2 -= 1;
				break;
			case 'zona3':
				if (tiketZona3 === 0) return;
				tiketZona3 -= 1;
				break;
			default:
				alert('Tidak tersedia');
				break;
		}
	};

	const buyTicket = async () => {
		const total = totalTiketZona1 + totalTiketZona2 + totalTiketZona3;
		const session = page.data.session?.user;

		if (total === 0) {
			alert('Tidak ada tiket yang dibeli');
			return;
		} else if (!session) {
			alert('Silahkan login terlebih dahulu');
			return;
		}

		$ticketStore.tiketZona1 = tiketZona1;
		$ticketStore.tiketZona2 = tiketZona2;
		$ticketStore.tiketZona3 = tiketZona3;
		$ticketStore.totalHarga = total;

		await goto('/eduventure/experience/checkout');
	};
</script>

<section>
	<div class="grid grid-cols-1 xl:grid-cols-3 gap-5 my-10">
		<div class="flex flex-col items-center col-span-2 bg-white shadow-2xl rounded-lg">
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
				<h2 class="text-center my-5">Eduventure Experience <br /> Universitas Padjadjaran</h2>
				<img
					src="/background.webp"
					class="w-full rounded-lg max-h-md object-cover"
					alt="Eduventure Experience"
				/>
				<p>
					Unpad Eduventure adalah program edukasi interaktif yang dirancang untuk siswa SMP dan SMA
					(dan sederajat). Kegiatan ini menggabungkan konsep education dan adventure yang berfokus
					pada eksplorasi fakultas dan program studi yang ada di Universitas Padjadjaran. Program
					ini dirancang untuk membantu siswa memahami dunia perkuliahan dan karier yang sesuai
					dengan minat mereka melalui simulasi, praktik langsung, dan pengalaman seru.
				</p>
				<p>
					Pematerian umum dipandu oleh Kantor Komunikasi Publik dengan durasi 30 menit di Gedung
					Rektorat. Setiap sesi pengalaman di fakultas/sekolah berlangsung selama 30 menit dan
					dipandu oleh satu mahasiswa yang ditugaskan oleh fakultas/sekolah. Kegiatan dimulai dari
					Gedung Rektorat dan dilanjutkan ke fakultas/sekolah menggunakan angkutan dalam kampus yang
					dipandu oleh panitia mahasiswa magang. Program ini dilaksanakan sesuai jadwal yang telah
					ditentukan oleh Universitas Padjadjaran.
				</p>
				<p>
					Harga tiket 1 zona adalah Rp350.000 per siswa termasuk merchandise kaos Unpad dan makanan
					ringan​. Untuk Eduventure Experience tanggal 22-23 Februari 2025, tiket sudah termasuk
					akses kegiatan Open House Universitas Padjadjaran.
				</p>
				<p>Terdapat 3 Zona untuk Eduventure yakni:</p>
				<figure>
					<img src="/zona/3_zona.jpg" alt="3 Zona" />
				</figure>
				<h1>Merchandise Kaos Unpad</h1>
				<figure>
					<img src="/zona/kaosexp.jpg" class="sma-gallery" alt="" />
					<figcaption>Kaos Unpad</figcaption>
				</figure>
			</div>
		</div>
		<div class="flex flex-col gap-5">
			<div class="bg-blue-50 p-5 rounded-lg">
				<h5 class="text-center">Pembelian Tiket</h5>
				<div class="bg-white p-3 my-5">
					<p class="text-lg font-bold">Zona 1 (Ilmu Kesehatan)</p>
					<div>
						<p class="text-xs text-brand-primary font-bold">22 Februari 2025 | 08.00 - 12.00</p>
					</div>
					<hr class="my-2" />
					<div class="grid grid-cols-3 items-center justify-center text-sm">
						<div>
							<p>Harga Tiket</p>
							<p class="font-bold">Rp350.000</p>
						</div>
						<div class="text-center">
							<p>Jumlah</p>
							<div class="flex items-center text-dark">
								<button
									class="px-2 h-8 border-1 border-dark rounded"
									onclick={() => decreaseTiketZona('zona1')}
									disabled={tiketZona1 === 0}
								>
									-
								</button>
								<input
									type="number"
									class="h-8 p-2 rounded-none text-center"
									bind:value={tiketZona1}
								/>
								<button
									class="px-2 h-8 border-1 border-dark rounded"
									onclick={() => addTiketZona('zona1')}
								>
									+
								</button>
							</div>
						</div>
						<div class="flex flex-col items-center">
							<p>Total</p>
							<p class="font-bold">Rp{totalTiketZona1}</p>
						</div>
					</div>
				</div>
				<div class="bg-white p-3 my-5">
					<p class="text-lg font-bold">Zona 2 (Sosial dan Humaniora)</p>
					<div>
						<p class="text-xs text-brand-primary font-bold">22 Februari 2025 | 13.00 - 17.00</p>
					</div>
					<hr class="my-2" />
					<div class="grid grid-cols-3 items-center justify-center text-sm">
						<div>
							<p>Harga Tiket</p>
							<p class="font-bold">Rp350.000</p>
						</div>
						<div class="text-center">
							<p>Jumlah</p>
							<div class="flex items-center text-dark">
								<button
									class="px-2 h-8 border-1 border-dark rounded"
									onclick={() => decreaseTiketZona('zona2')}
									disabled={tiketZona2 === 0}
								>
									-
								</button>
								<input
									type="number"
									class="h-8 p-2 rounded-none text-center"
									bind:value={tiketZona2}
								/>
								<button
									class="px-2 h-8 border-1 border-dark rounded"
									onclick={() => addTiketZona('zona2')}
								>
									+
								</button>
							</div>
						</div>
						<div class="flex flex-col items-center">
							<p>Total</p>
							<p class="font-bold">Rp{totalTiketZona2}</p>
						</div>
					</div>
				</div>
				<div class="bg-white p-3 my-5">
					<p class="text-lg font-bold">Zona 3 (Saintek dan Agrokomplek)</p>
					<div>
						<p class="text-xs text-brand-primary font-bold">23 Februari 2025 | 08.00 - 12.00</p>
					</div>
					<hr class="my-2" />
					<div class="grid grid-cols-3 items-center justify-center text-sm">
						<div>
							<p>Harga Tiket</p>
							<p class="font-bold">Rp350.000</p>
						</div>
						<div class="text-center">
							<p>Jumlah</p>
							<div class="flex items-center text-dark">
								<button
									class="px-2 h-8 border-1 border-dark rounded"
									onclick={() => decreaseTiketZona('zona3')}
									disabled={tiketZona3 === 0}
								>
									-
								</button>
								<input
									type="number"
									class="h-8 p-2 rounded-none text-center"
									bind:value={tiketZona3}
								/>
								<button
									class="px-2 h-8 border-1 border-dark rounded"
									onclick={() => addTiketZona('zona3')}
								>
									+
								</button>
							</div>
						</div>
						<div class="flex flex-col items-center">
							<p>Total</p>
							<p class="font-bold">Rp{totalTiketZona3}</p>
						</div>
					</div>
				</div>
				<div>
					<p>Jumlah: {tiketZona1 + tiketZona2 + tiketZona3}</p>
					<p>Total Harga: Rp{totalTiketZona1 + totalTiketZona2 + totalTiketZona3}</p>
				</div>
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

				<button class="btn bg-brand-primary text-white w-full mt-5" onclick={buyTicket}>
					Beli Tiket
				</button>
			</div>
			<div class="bg-blue-2 p-5 rounded-lg">
				<h5>Tambahkan ke Kalender</h5>
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

	figcaption {
		@apply text-gray-5 text-xs italic text-center pt-1;
	}

	.sma-gallery {
		@apply max-h-xs h-full object-cover rounded-lg;
	}

	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		-appearance: textfield;
	}
</style>
