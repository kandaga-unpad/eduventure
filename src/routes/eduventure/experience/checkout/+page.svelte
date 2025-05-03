<script lang="ts">
	import { goto } from '$app/navigation';
	import { ticketStore } from '$lib/composables/ticketStore';
	import { Turnstile } from 'svelte-turnstile';
	import { enhance } from '$app/forms';

	let { data } = $props();

	let isDiscounted = $state(false);
	const [zona1, zona2, zona3] = data.zona;

	type BiodataPeserta = {
		nama: string;
		kontak: string;
		email: string;
		sekolah: string;
		kelas: number | null;
		kota: string;
		email_pendaftar: string;
		pilihan_zona: string;
		kode_tagihan: string;
		voucher: string;
		applying_voucher: boolean;
	};

	let totalTiket = $state(
		$ticketStore.tiketZona1 + $ticketStore.tiketZona2 + $ticketStore.tiketZona3
	);
	let userEmailGoogle = data.session?.user?.email ?? '';
	const chosenZona = () => {
		if ($ticketStore.tiketZona1 === 1) {
			return zona1.id;
		} else if ($ticketStore.tiketZona2 === 1) {
			return zona2.id;
		} else if ($ticketStore.tiketZona3 === 1) {
			return zona3.id;
		}
	};

	let biodataPeserta: BiodataPeserta[] = $state(
		new Array($ticketStore.tiketZona1 + $ticketStore.tiketZona2 + $ticketStore.tiketZona3).fill({
			nama: '',
			kontak: '',
			email: '',
			sekolah: '',
			kelas: null,
			kota: '',
			email_pendaftar: userEmailGoogle,
			kode_tagihan: '',
			pilihan_zona: '',
			voucher: '',
			applying_voucher: false
		})
	);

	let biodataPembeli = $state({
		nama: '',
		kontak: '',
		email: '',
		sekolah: '',
		kelas: null,
		kota: '',
		email_pendaftar: userEmailGoogle,
		kode_tagihan: '',
		pilihan_zona: chosenZona(),
		voucher: '',
		applying_voucher: false
	});

	const beliTiketBulk = async () => {
		const allValid = biodataPeserta.every((peserta) => {
			return (
				peserta.nama &&
				peserta.kontak &&
				peserta.email &&
				peserta.sekolah &&
				peserta.kelas &&
				peserta.kota &&
				peserta.pilihan_zona &&
				peserta.email_pendaftar
			);
		});

		if (!allValid) {
			alert('Mohon isi semua data dengan benar!');
			return;
		} else {
			await fetch('/api/beli-tiket', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					tiketZona1: $ticketStore.tiketZona1,
					tiketZona2: $ticketStore.tiketZona2,
					tiketZona3: $ticketStore.tiketZona3,
					biodataPeserta,
					totalHarga: $ticketStore.totalHarga
				})
			})
				.then(async (res) => {
					const response = await res.json();

					biodataPeserta = new Array(
						$ticketStore.tiketZona1 + $ticketStore.tiketZona2 + $ticketStore.tiketZona3
					).fill({
						nama: '',
						kontak: '',
						email: '',
						sekolah: '',
						kelas: null,
						kota: '',
						email_pendaftar: userEmailGoogle,
						kode_tagihan: '',
						pilihan_zona: ''
					});
					await goto('/eduventure/experience/pembayaran/' + response.kode);
				})
				.catch((err) => {
					console.error(err);
				});
		}
	};

	const applyVoucher = async (event: Event, biodata: any) => {
		event.preventDefault();

		const voucher = data.listVoucher.find((voucher) => voucher.kode_voucher === biodata.voucher);

		if (biodata.pilihan_zona === '') {
			alert('Pilih zona terlebih dahulu!');
			return;
		}

		if (voucher) {
			const checkVoucherAvailability = voucher.total_kuota - voucher.tiket.length;
			const checkVoucherValidity = voucher.zona === biodata.pilihan_zona;
			if (!checkVoucherValidity) {
				alert(`Voucher "${biodata.voucher}" tidak bisa digunakan untuk zona ini!`);
				biodata.voucher = '';
			} else if (checkVoucherAvailability <= 0) {
				alert(`Voucher "${biodata.voucher}" sudah habis!`);
				biodata.voucher = '';
			} else if (checkVoucherAvailability <= 0 || !checkVoucherValidity) {
				alert(`Voucher "${biodata.voucher}" sudah tidak bisa digunakan!`);
				biodata.voucher = '';
			} else if (biodata.applying_voucher) {
				alert(`Voucher "${biodata.voucher}" sudah digunakan!`);
				biodata.voucher = '';
			} else {
				$ticketStore.totalHarga = $ticketStore.totalHarga - Number(voucher.jumlah_potongan);
				isDiscounted = true;
				biodata.applying_voucher = true;
				alert(`Voucher "${biodata.voucher}"" berhasil digunakan!`);
			}
		} else {
			alert(`Voucher "${biodata.voucher}" tidak ditemukan!`);
			biodata.voucher = '';
		}
	};
</script>

<section>
	<a href="/eduventure/experience" class="text-center mt-10">&leftarrow;Kembali</a>
	<h1 class="text-center">Konfirmasi Pemesanan</h1>
	<div class="text-center my-5">
		<p class="text-xl my-5">
			Anda membeli sebanyak <span class="text-brand-primary font-bold">{totalTiket} </span> tiket Eduventure
			Experience
		</p>
		<div class="flex items-center justify-center">
			<table>
				<thead>
					<tr>
						<th>Nama Tiket</th>
						<th>Jumlah</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
					{#if $ticketStore.tiketZona1 > 0}
						<tr>
							<td>Zona Eduventure Experience</td>
							<td>x {$ticketStore.tiketZona1}</td>
							<td
								>{($ticketStore.tiketZona1 * zona1.harga_tiket).toLocaleString('id-ID', {
									style: 'currency',
									currency: 'IDR'
								})}</td
							>
						</tr>
					{/if}
					{#if $ticketStore.tiketZona2 > 0}
						<tr>
							<td>Zona 2 (Saintek dan Agrokomplek)</td>
							<td>x {$ticketStore.tiketZona2}</td>
							<td
								>{($ticketStore.tiketZona2 * zona2.harga_tiket).toLocaleString('id-ID', {
									style: 'currency',
									currency: 'IDR'
								})}</td
							>
						</tr>
					{/if}
					{#if $ticketStore.tiketZona3 > 0}
						<tr>
							<td>Zona 3 (Ilmu Kesehatan)</td>
							<td>x {$ticketStore.tiketZona3}</td>
							<td
								>{($ticketStore.tiketZona3 * zona3.harga_tiket).toLocaleString('id-ID', {
									style: 'currency',
									currency: 'IDR'
								})}</td
							>
						</tr>
					{/if}
					<tr>
						<td class="text-right">{isDiscounted ? 'Total (Diskon Voucher)' : 'Total'}: </td>
						<td class="text-right" colspan="2"
							>{$ticketStore.totalHarga.toLocaleString('id-ID', {
								style: 'currency',
								currency: 'IDR'
							})}</td
						>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="my-5">
		<h4 class="text-center my-5">Data Pemilik Tiket</h4>
		<p class="text-red-6 text-center">Mohon isi semua data dibawah ini!</p>
		{#if totalTiket > 1}
			<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 px-3">
				{#each Array(totalTiket) as tiket, i}
					<form method="POST">
						<p class="text-center text-gray-7 font-semibold">Biodata Pemilik Tiket ke-{i + 1}</p>
						<div class="form-input">
							<label for="zona">Pilihan Zona : </label>
							<select name="zona" id="zona" bind:value={biodataPeserta[i].pilihan_zona} required>
								<option value="" selected disabled>Pilih Zona</option>
								{#each data.zona as zona}
									<option value={zona.id}>{zona.title}</option>
								{/each}
							</select>
						</div>
						<div class="form-input">
							<label for="name">Nama :</label>
							<input
								type="text"
								id="name"
								name="name"
								bind:value={biodataPeserta[i].nama}
								placeholder="Nama Lengkap dari Pemilik Tiket {i + 1}"
								required
							/>
						</div>
						<div class="form-input">
							<label for="kontak">No. HP :</label>
							<input
								type="number"
								id="kontak"
								name="kontak"
								bind:value={biodataPeserta[i].kontak}
								placeholder="Nomor HP dari Pemilik Tiket {i + 1}"
								required
							/>
						</div>
						<div class="form-input">
							<label for="email">E-Mail :</label>
							<input
								type="text"
								id="email"
								name="email"
								bind:value={biodataPeserta[i].email}
								placeholder="E-Mail dari Pemilik Tiket {i + 1}"
								required
							/>
						</div>
						<div class="form-input">
							<label for="sekolah">Asal Sekolah :</label>
							<input
								type="text"
								id="sekolah"
								name="sekolah"
								bind:value={biodataPeserta[i].sekolah}
								placeholder="Asal Sekolah dari Pemilik Tiket {i + 1}"
								required
							/>
						</div>
						<div class="form-input">
							<label for="kelas">Kelas :</label>
							<input
								type="number"
								id="kelas"
								name="kelas"
								bind:value={biodataPeserta[i].kelas}
								placeholder="Kelas saat ini di Sekolah dari Pemilik Tiket {i + 1}"
								required
							/>
						</div>
						<div class="form-input">
							<label for="kota">Kota :</label>
							<input
								type="text"
								id="kota"
								name="kota"
								bind:value={biodataPeserta[i].kota}
								placeholder="Asal Kota dari Pemilik Tiket {i + 1}"
								required
							/>
						</div>
						{#if biodataPeserta[i].applying_voucher}
							<div class="w-full my-3">
								<h6 class="text-center text-green-6">Voucher berhasil digunakan!</h6>
							</div>
						{:else}
							<div class="w-full my-3">
								<h6 class="mb-2 text-center">Punya Kode Voucher ? input disini :</h6>
								<input
									type="text"
									placeholder="Kode Voucher"
									bind:value={biodataPeserta[i].voucher}
								/>
								<button
									class={`btn w-full py-1 ${biodataPeserta[i].voucher ? 'bg-brand-primary text-white' : 'bg-gray-3 text-dark'} mt-3`}
									onclick={(event) => applyVoucher(event, biodataPeserta[i])}
									disabled={!biodataPeserta[i].voucher}
								>
									Submit
								</button>
							</div>
						{/if}
					</form>
				{/each}
			</div>
			<div class="px-3 my-5 flex flex-col items-center justify-center">
				<Turnstile siteKey="0x4AAAAAAAkrRdBxvh4fqUrA" />
				<button onclick={beliTiketBulk} class="btn bg-brand-primary text-white w-full">
					Beli Tiket
				</button>
			</div>
		{:else if totalTiket === 1}
			<div class="flex flex-col items-center justify-center px-2 xl:px-0">
				<form method="POST" action="?/beli" use:enhance class="w-full max-w-xl">
					<p class="text-center text-gray-7 font-semibold">Biodata Pemilik Tiket</p>
					<div class="form-input">
						<label for="zona">Pilihan Zona : </label>
						<select name="zona" id="zona" bind:value={biodataPembeli.pilihan_zona} required>
							<option value="" selected disabled>Pilih Zona</option>
							{#each data.zona as zona}
								<option value={zona.id}>{zona.title}</option>
							{/each}
						</select>
					</div>
					<div class="form-input">
						<label for="nama">Nama :</label>
						<input
							type="text"
							id="nama"
							name="nama"
							minlength="3"
							maxlength="30"
							bind:value={biodataPembeli.nama}
							placeholder="Silahkan isi Nama Lengkap dari Pemilik Tiket"
							required
						/>
					</div>
					<div class="form-input">
						<label for="kontak">No. HP :</label>
						<input
							type="number"
							id="kontak"
							name="kontak"
							bind:value={biodataPembeli.kontak}
							placeholder="Silahkan isi Nomor HP dari Pemilik Tiket"
							required
						/>
					</div>
					<div class="form-input">
						<label for="email">E-Mail :</label>
						<input
							type="text"
							id="email"
							name="email"
							bind:value={biodataPembeli.email}
							placeholder="Silahkan isi E-Mail dari Pemilik Tiket"
							required
						/>
					</div>
					<div class="form-input">
						<label for="sekolah">Asal Sekolah :</label>
						<input
							type="text"
							id="sekolah"
							name="sekolah"
							bind:value={biodataPembeli.sekolah}
							placeholder="Silahkan isi Asal Sekolah dari Pemilik Tiket"
							required
						/>
					</div>
					<div class="form-input">
						<label for="kelas">Kelas :</label>
						<input
							type="number"
							id="kelas"
							name="kelas"
							bind:value={biodataPembeli.kelas}
							placeholder="Silahkan isi Kelas saat ini di Sekolah dari Pemilik Tiket"
							required
						/>
					</div>
					<div class="form-input">
						<label for="kota">Kota :</label>
						<input
							type="text"
							id="kota"
							name="kota"
							bind:value={biodataPembeli.kota}
							placeholder="Silahkan isi Asal Kota dari Pemilik Tiket"
							required
						/>
					</div>
					<div>
						<input
							type="hidden"
							bind:value={$ticketStore.totalHarga}
							id="total_harga"
							name="total_harga"
							required
						/>
					</div>
					{#if biodataPembeli.applying_voucher}
						<div class="w-full my-3">
							<h6 class="text-center text-green-6">Voucher berhasil digunakan!</h6>
						</div>
					{:else}
						<div class="w-full my-3">
							<h6 class="mb-2 text-center">Punya Kode Voucher ? input disini :</h6>
							<input
								type="text"
								placeholder="Kode Voucher"
								id="voucher"
								name="voucher"
								bind:value={biodataPembeli.voucher}
							/>
							<button
								class={`btn w-full py-1 ${biodataPembeli.voucher ? 'bg-brand-primary text-white' : 'bg-gray-3 text-dark'} mt-3`}
								onclick={(event) => applyVoucher(event, biodataPembeli)}
								disabled={!biodataPembeli.voucher}
							>
								Submit
							</button>
						</div>
					{/if}
					<Turnstile siteKey="0x4AAAAAAAkrRdBxvh4fqUrA" />
					<div class="px-3 my-5">
						<button
							type="submit"
							formaction="?/beli"
							class="btn bg-brand-primary text-white w-full"
						>
							Beli Tiket
						</button>
					</div>
				</form>
			</div>
		{:else}
			<p class="text-center">Tidak ada tiket yang dibeli!</p>
		{/if}
	</div>
</section>

<style>
	section {
		@apply container ma pt-30;
	}

	table {
		@apply table-fixed border-collapse border border-slate-4 text-left;
	}

	td,
	th {
		@apply border border-slate-4 px-5 py-2;
	}

	input,
	select {
		@apply rounded-lg px-2 py-1;
	}

	form {
		@apply bg-gray-1 p-10 rounded-xl;
	}
</style>
