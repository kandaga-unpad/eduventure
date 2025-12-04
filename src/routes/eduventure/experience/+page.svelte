<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { ticketStore } from '$lib/composables/ticketStore';
	import { formatCurrency } from '$lib/composables/number';
	import { cutString } from '$lib/composables/string';
	import { formatDateToIndonesian } from '$lib/composables/date';
	import { SignIn } from '@auth/sveltekit/components';
	import { handleAnchorClick } from '$lib/composables/link.js';

	let { data } = $props();
	const [infoZona1, infoZona2, infoZona3] = data.zonaInfo;

	const zonaKesehatan = [
		{
			id: 1,
			namaFakultas: 'Fakultas Kedokteran',
			image1: '/experience/FK1.jpg',
			image2: '/experience/FK2.jpg'
		},
		{
			id: 2,
			namaFakultas: 'Kedokteran Hewan',
			image1: '/experience/FKH1.jpg',
			image2: '/experience/FKH2.jpg'
		},
		{
			id: 3,
			namaFakultas: 'Fakultas Kedokteran Gigi',
			image1: '/experience/FKG1.jpg',
			image2: '/experience/FKG2.jpg'
		},
		{
			id: 4,
			namaFakultas: 'Fakultas Psikologi',
			image1: '/experience/FAPSI1.jpg',
			image2: '/experience/FAPSI2.jpg'
		},
		{
			id: 5,
			namaFakultas: 'Fakultas Keperawatan',
			image1: '/experience/FKEP1.jpg',
			image2: '/experience/FKEP2.jpg'
		},
		{
			id: 6,
			namaFakultas: 'Fakultas Farmasi',
			image1: '/experience/FARMASI1.jpg',
			image2: '/experience/FARMASI2.jpg'
		}
	];

	const zonaSosial = [
		{
			id: 1,
			namaFakultas: 'Fakultas Hukum',
			image1: '/experience/FH1.jpg',
			image2: '/experience/FH2.jpg'
		},
		{
			id: 2,
			namaFakultas: 'Fakultas Ekonomi dan Bisnis',
			image1: '/experience/FEB1.jpg',
			image2: '/experience/FEB2.jpg'
		},
		{
			id: 3,
			namaFakultas: 'Fakultas Ilmu Sosial dan Ilmu Politik',
			image1: '/experience/FISIP1.jpg',
			image2: '/experience/FISIP2.jpg'
		},
		{
			id: 4,
			namaFakultas: 'Fakultas Ilmu Budaya',
			image1: '/experience/FIB1.jpg',
			image2: '/experience/FIB2.jpg'
		},
		{
			id: 5,
			namaFakultas: 'Fakultas Ilmu Komunikasi',
			image1: '/experience/FIKOM1.jpg',
			image2: '/experience/FIKOM2.jpg'
		},
		{
			id: 6,
			namaFakultas: 'Sekolah Vokasi (Soshum)',
			image1: '/experience/VOKASIFISIP.jpg',
			image2: '/experience/VokasiFISIP2.jpg'
		}
	];

	const zonaSaintek = [
		{
			id: 1,
			namaFakultas: 'Fakultas Peternakan',
			image1: '/experience/FAPET1.jpg',
			image2: '/experience/FAPET2.jpg'
		},
		{
			id: 2,
			namaFakultas: 'Fakultas Perikanan dan Ilmu Kelautan',
			image1: '/experience/FPIK1.jpg',
			image2: '/experience/FPIK2.jpg'
		},
		{
			id: 3,
			namaFakultas: 'Fakultas Pertanian',
			image1: '/experience/FAPERTA1.jpg',
			image2: '/experience/FAPERTA2.jpg'
		},
		{
			id: 4,
			namaFakultas: 'Fakultas Matematika dan Ilmu Pengetahuan Alam',
			image1: '/experience/FMIPA1.jpg',
			image2: '/experience/FMIPA2.jpg'
		},
		{
			id: 5,
			namaFakultas: 'Fakultas Teknik Geologi',
			image1: '/experience/FTG1.jpg',
			image2: '/experience/FTG2.jpg'
		},
		{
			id: 6,
			namaFakultas: 'Sekolah Vokasi (Saintek)',
			image1: '/experience/VokasiSaintek1.jpg',
			image2: '/experience/VokasiSaintek2.jpg'
		}
	];

	let closeDateTiket1 = new Date(`${infoZona1?.tanggal_acara}T${infoZona1?.jam_mulai}`);
	let closeDateTiket2 = new Date(`${infoZona2?.tanggal_acara}T${infoZona2?.jam_mulai}`);
	let closeDateTiket3 = new Date(`${infoZona3?.tanggal_acara}T${infoZona3?.jam_mulai}`);

	let ticketSeatLeftZona1 = infoZona1?.kuota - data.soldTicket?.zona1;
	let ticketSeatLeftZona2 = infoZona2?.kuota - data.soldTicket?.zona2;
	let ticketSeatLeftZona3 = infoZona3?.kuota - data.soldTicket?.zona3;

	let now = new Date();

	let tiketZona1 = $state($ticketStore.tiketZona1);
	let tiketZona2 = $state($ticketStore.tiketZona2);
	let tiketZona3 = $state($ticketStore.tiketZona3);
	let totalHarga = $state($ticketStore.totalHarga);

	let totalTiketZona1 = $derived(tiketZona1 * (infoZona1?.harga_tiket ?? 0));
	let totalTiketZona2 = $derived(tiketZona2 * (infoZona2?.harga_tiket ?? 0));
	let totalTiketZona3 = $derived(tiketZona3 * (infoZona3?.harga_tiket ?? 0));

	const addTiketZona = (zona: string) => {
		switch (zona) {
			case 'zona1':
				if (tiketZona1 < ticketSeatLeftZona1) {
					tiketZona1 += 1;
					totalHarga += infoZona1?.harga_tiket;
				}
				break;
			case 'zona2':
				if (tiketZona2 < ticketSeatLeftZona2) {
					tiketZona2 += 1;
					totalHarga += infoZona2?.harga_tiket;
				}
				break;
			case 'zona3':
				if (tiketZona3 < ticketSeatLeftZona3) {
					tiketZona3 += 1;
					totalHarga += infoZona3?.harga_tiket;
				}
				break;
			default:
				alert('Tidak tersedia');
				break;
		}
	};

	const decreaseTiketZona = (zona: string) => {
		switch (zona) {
			case 'zona1':
				if (tiketZona1 === 0) return;
				tiketZona1 -= 1;
				totalHarga -= infoZona1.harga_tiket;
				break;
			case 'zona2':
				if (tiketZona2 === 0) return;
				tiketZona2 -= 1;
				totalHarga -= infoZona2.harga_tiket;
				break;
			case 'zona3':
				if (tiketZona3 === 0) return;
				tiketZona3 -= 1;
				totalHarga -= infoZona3.harga_tiket;
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
				<h2 class="text-center my-5">Eduventure Experience <br /> Universitas Padjadjaran</h2>
				<a
					href="#buyTicket"
					onclick={handleAnchorClick}
					class="btn bg-brand-primary text-white w-full text-center xl:hidden"
				>
					Pesan Tiket
				</a>
				<img
					src="/background.webp"
					class="w-full rounded-lg max-h-md object-cover"
					alt="Eduventure Experience"
				/>
				<p>
					Unpad Eduventure Experience adalah program edukasi interaktif yang dirancang untuk siswa
					SD, SMP, SMA, dan sederajat. Kegiatan ini menggabungkan konsep pendidikan dan pengalaman
					yang berfokus pada eksplorasi fakultas dan program studi yang ada di Universitas
					Padjadjaran, bertujuan untuk membantu siswa menemukan program studi dan memahami dunia
					perkuliahan serta karier yang sesuai dengan minat mereka melalui simulasi dan praktik
					langsung.
				</p>
				<div class="my-10">
					<a href="/gallery/experience" class="btn bg-brand-primary text-white px-6">
						Lihat Galeri Eduventure Experience
					</a>
				</div>
				<p>
					Kegiatan dimulai dari Gedung Rektorat Unpad Jatinangor dan dilanjutkan ke fakultas/sekolah
					Unpad menggunakan angkutan dalam kampus yang dipandu oleh panitia. Setiap sesi pengalaman
					di fakultas/sekolah berlangsung selama 40 menit dan dipandu oleh satu mahasiswa dan dosen
					dari masing-masing fakultas/sekolah.
				</p>
				<p>
					Harga tiket 1 zona adalah Rp350.000 per siswa, sudah termasuk merchandise dan makanan
					ringan. Kegiatan Eduventure Experience akan dilaksanakan sesuai pada tanggal yang tertera
					di pemesanan tiket.
				</p>
				<p>Terdapat 3 Zona untuk Eduventure yakni:</p>
				<div>
					<div class="text-center">
						<h3 class="bg-green-7 px-4 py-1 rounded-xl text-white">Zona Ilmu Kesehatan</h3>
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
							{#each zonaKesehatan as fakultas}
								<div class="faculty-medic-zone">
									<img src={fakultas.image1} alt={fakultas.namaFakultas} class="faculty-image" />
									<div class="w-full my-2">
										<p class="faculty-medic-name">{fakultas.namaFakultas}</p>
									</div>
									<img src={fakultas.image2} alt={fakultas.namaFakultas} class="faculty-image" />
								</div>
							{/each}
						</div>
						<h3 class="bg-red-7 px-4 py-1 rounded-xl text-white">Zona Sosial dan Humaniora</h3>
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
							{#each zonaSosial as fakultas}
								<div class="faculty-social-zone">
									<img src={fakultas.image1} alt={fakultas.namaFakultas} class="faculty-image" />
									<div class="w-full my-2">
										<p class="faculty-social-name">{fakultas.namaFakultas}</p>
									</div>
									<img src={fakultas.image2} alt={fakultas.namaFakultas} class="faculty-image" />
								</div>
							{/each}
						</div>
						<h3 class="bg-cyan-7 px-4 py-1 rounded-xl text-white">Zona Saintek dan AgroKomplek</h3>
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
							{#each zonaSaintek as fakultas}
								<div class="faculty-science-zone">
									<img src={fakultas.image1} alt={fakultas.namaFakultas} class="faculty-image" />
									<div class="w-full my-2">
										<p class="faculty-science-name">{fakultas.namaFakultas}</p>
									</div>
									<img src={fakultas.image2} alt={fakultas.namaFakultas} class="faculty-image" />
								</div>
							{/each}
						</div>
					</div>
					<div>
						<p class="font-semibold text-red-5 text-center">
							**Kegiatan di fakultas dapat berubah sesuai dengan program studi pelaksana
						</p>
					</div>
					<!-- <figure>
					<img src="/zona/experience.webp" alt="3 Zona" />
				</figure> -->
					<!-- <h1>Merchandise Kaos Unpad</h1>
				<figure>
					<img src="/zona/kaosexp.jpg" class="sma-gallery" alt="" />
					<figcaption>Kaos Unpad</figcaption>
				</figure> -->
				</div>
			</div>
		</div>
		<div class="flex flex-col items-center gap-5" id="buyTicket">
			<div class="bg-blue-50 p-5 rounded-lg">
				<h5 class="text-center">Pembelian Tiket</h5>
				{#if data.zonaInfo.length > 0}
					<div>
						{#if infoZona1}
							<div class="bg-white p-3 my-5">
								<div>
									<p class="text-lg font-bold mb-5">{cutString(infoZona1.title)}</p>
									<div>
										<p class="text-xs text-brand-primary font-bold">
											{formatDateToIndonesian(infoZona1.tanggal_acara)} | {infoZona1.jam_mulai} - {infoZona1.jam_selesai}
										</p>
									</div>
								</div>
								{#if now < closeDateTiket1 && infoZona1.kuota !== null && ticketSeatLeftZona1 > 0 && infoZona1.is_open === 'open'}
									<div class="bg-gray-3 p-2 rounded-lg my-3 text-center">
										<p class="font-bold">
											Sisa Tiket : <span class="text-red-6">{ticketSeatLeftZona1}</span>
										</p>
									</div>
								{/if}

								<hr class="my-2" />
								{#if infoZona1.is_open === 'closed'}
									<p class="text-red-6 font-semibold">Pembelian Tiket Zona 1 belum dibuka</p>
								{:else if now < closeDateTiket1 && (ticketSeatLeftZona1 > 0 || infoZona1.kuota === null)}
									<div class="grid grid-cols-3 items-center justify-center text-sm">
										<div>
											<p>Harga Tiket</p>
											<p class="font-bold">{formatCurrency(infoZona1.harga_tiket)}</p>
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
													disabled={tiketZona1 >= ticketSeatLeftZona1}
												>
													+
												</button>
											</div>
										</div>
										<div class="flex flex-col items-center">
											<p>Total</p>
											<p class="font-bold">{formatCurrency(totalTiketZona1)}</p>
										</div>
									</div>
								{:else if now > closeDateTiket1 || ticketSeatLeftZona1 <= 0}
									<p class="text-red-6 font-semibold">Pembelian Tiket Zona 1 telah ditutup</p>
								{:else}
									<p class="text-red-6 font-semibold">
										Pembelian Tiket Zona 1 tidak dapat dilakukan
									</p>
								{/if}
							</div>
						{/if}
						{#if infoZona2}
							<div class="bg-white p-3 my-5">
								<div>
									<p class="text-lg font-bold mb-5">{cutString(infoZona2.title)}</p>
									<div>
										<p class="text-xs text-brand-primary font-bold">
											{formatDateToIndonesian(infoZona2.tanggal_acara)} | {infoZona2.jam_mulai} - {infoZona2.jam_selesai}
										</p>
									</div>
								</div>
								{#if now < closeDateTiket2 && infoZona2.kuota !== null && ticketSeatLeftZona2 > 0 && infoZona2.is_open === 'open'}
									<div class="bg-gray-3 p-2 rounded-lg my-3 text-center">
										<p class="font-bold">
											Sisa Tiket : <span class="text-red-6">{ticketSeatLeftZona2}</span>
										</p>
									</div>
								{/if}

								<hr class="my-2" />
								{#if infoZona2.is_open === 'closed'}
									<p class="text-red-6 font-semibold">Pembelian Tiket Zona 2 belum dibuka</p>
								{:else if now < closeDateTiket2 && (ticketSeatLeftZona2 > 0 || infoZona2.kuota === null)}
									<div class="grid grid-cols-3 items-center justify-center text-sm">
										<div>
											<p>Harga Tiket</p>
											<p class="font-bold">{formatCurrency(infoZona2.harga_tiket)}</p>
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
													disabled={tiketZona2 >= ticketSeatLeftZona2}
												>
													+
												</button>
											</div>
										</div>
										<div class="flex flex-col items-center">
											<p>Total</p>
											<p class="font-bold">{formatCurrency(totalTiketZona2)}</p>
										</div>
									</div>
								{:else if now > closeDateTiket2 || ticketSeatLeftZona2 <= 0}
									<p class="text-red-6 font-semibold">Pembelian Tiket Zona 2 telah ditutup</p>
								{:else}
									<p class="text-red-6 font-semibold">
										Pembelian Tiket Zona 2 tidak dapat dilakukan
									</p>
								{/if}
							</div>
						{/if}
						{#if infoZona3}
							<div class="bg-white p-3 my-5">
								<div>
									<p class="text-lg font-bold mb-5">{cutString(infoZona3.title)}</p>
									<div>
										<p class="text-xs text-brand-primary font-bold">
											{formatDateToIndonesian(infoZona3.tanggal_acara)} | {infoZona3.jam_mulai} - {infoZona3.jam_selesai}
										</p>
									</div>
								</div>
								{#if now < closeDateTiket3 && infoZona3.kuota !== null && ticketSeatLeftZona3 > 0 && infoZona3.is_open === 'open'}
									<div class="bg-gray-3 p-2 rounded-lg my-3 text-center">
										<p class="font-bold">
											Sisa Tiket : <span class="text-red-6">{ticketSeatLeftZona3}</span>
										</p>
									</div>
								{/if}

								<hr class="my-2" />
								{#if infoZona3.is_open === 'closed'}
									<p class="text-red-6 font-semibold">Pembelian Tiket Zona 3 belum dibuka</p>
								{:else if now < closeDateTiket3 && (ticketSeatLeftZona3 > 0 || infoZona1.kuota === null)}
									<div class="grid grid-cols-3 items-center justify-center text-sm">
										<div>
											<p>Harga Tiket</p>
											<p class="font-bold">{formatCurrency(infoZona3.harga_tiket)}</p>
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
													disabled={tiketZona3 >= ticketSeatLeftZona3}
												>
													+
												</button>
											</div>
										</div>
										<div class="flex flex-col items-center">
											<p>Total</p>
											<p class="font-bold">{formatCurrency(totalTiketZona3)}</p>
										</div>
									</div>
								{:else if now > closeDateTiket3 || ticketSeatLeftZona3 <= 0}
									<p class="text-red-6 font-semibold">Pembelian Tiket Zona 3 telah ditutup</p>
								{:else}
									<p class="text-red-6 font-semibold">
										Pembelian Tiket Zona 3 tidak dapat dilakukan
									</p>
								{/if}
							</div>
						{/if}
						<div>
							<p>
								Jumlah: <span class="font-semibold">{tiketZona1 + tiketZona2 + tiketZona3}</span>
							</p>
							<p>Total Harga: <span class="font-semibold">{formatCurrency(totalHarga)}</span></p>
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

						<button
							class="btn {now > closeDateTiket3
								? 'bg-gray-3 text-dark'
								: 'bg-brand-primary text-white'} w-full mt-5"
							onclick={buyTicket}
							disabled={now > closeDateTiket3}
						>
							{now > closeDateTiket3 ? 'Pembelian Tiket Ditutup' : 'Beli Tiket'}
						</button>
					</div>
				{:else}
					<div class="m-5">
						<p class="text-center font-semibold text-red-6">
							Pendaftaran dan Pembelian <br /> Tiket Eduventure ditutup
						</p>
					</div>
				{/if}
				<div class="my-5 text-center">
					<p>Ada pertanyaan atau perlu bantuan ?</p>
					<a href="tel:082211676765" class="text-brand-primary underline">Hubungi Kami</a>
				</div>
			</div>
			<div class="bg-white-2 p-5 rounded-lg">
				<h5 class="text-center my-5">Keseruan Experience</h5>
				<div>
					<blockquote
						class="instagram-media"
						data-instgrm-captioned
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
				<h5 class="text-center my-5">Experience Mei</h5>
				<div>
					<blockquote
						class="instagram-media"
						data-instgrm-captioned
						data-instgrm-permalink="https://www.instagram.com/p/DJRCBunzJUM/?utm_source=ig_embed&amp;utm_campaign=loading"
						data-instgrm-version="14"
						style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"
					>
						<div style="padding:16px;">
							<a
								href="https://www.instagram.com/p/DJRCBunzJUM/?utm_source=ig_embed&amp;utm_campaign=loading"
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
									href="https://www.instagram.com/p/DJRCBunzJUM/?utm_source=ig_embed&amp;utm_campaign=loading"
									style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;"
									target="_blank">A post shared by Unpad Luhung (@unpad.luhung)</a
								>
							</p>
						</div>
					</blockquote>
					<script async src="//www.instagram.com/embed.js"></script>
				</div>
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

	.faculty-medic-zone {
		@apply border border-4 border-green rounded-lg shadow-lg flex flex-col items-center justify-center p-2;
	}

	.faculty-social-zone {
		@apply border border-4 border-red rounded-lg shadow-lg flex flex-col items-center justify-center p-2;
	}

	.faculty-science-zone {
		@apply border border-4 border-cyan rounded-lg shadow-lg flex flex-col items-center justify-center p-2;
	}

	.faculty-image {
		@apply w-64 h-48 object-cover object-bottom-center rounded-xl border border-1 border-gray-4 shadow-lg;
	}

	.faculty-medic-name {
		@apply bg-green-700 text-white p-2 rounded-xl w-full text-xs;
	}

	.faculty-social-name {
		@apply bg-red-700 text-white p-2 rounded-xl w-full text-xs;
	}

	.faculty-science-name {
		@apply bg-cyan-700 text-white p-2 rounded-xl w-full text-xs;
	}

	/*figcaption {
		@apply text-gray-5 text-xs italic text-center pt-1;
	}

	/*.sma-gallery {
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
		appearance: textfield;
		-moz-appearance: textfield;
	}
</style>
