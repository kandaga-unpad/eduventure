<script lang="ts">
	import { goto } from '$app/navigation';
	import { holiyeayTicketStore } from '$lib/composables/ticketStore';
	import { Turnstile } from 'svelte-turnstile';
	import { enhance } from '$app/forms';

	type BiodataPeserta = {
		nama: string;
		email: string;
		kontak: string;
		sekolah: string;
		kelas: number | null;
		kota: string;
		email_pendaftar: string;
		pilihan_zona: string;
		kode_tagihan: String;
		voucher: String;
		applying_voucher: boolean;
	};

	let { data } = $props();

	let zonaHoliyeay = data.zona[0];
	let totalTiket = $state($holiyeayTicketStore.tiketZonaHoliyeay);
	let totalHarga = $state($holiyeayTicketStore.tiketZonaHoliyeay * zonaHoliyeay.harga_tiket);
	let isDiscounted = $state(false);
	let userEmailGoogle = data.session?.user?.email ?? '';

	let biodataPeserta: BiodataPeserta[] = $state(
		new Array(totalTiket).fill({
			nama: '',
			email: '',
			kontak: '',
			sekolah: '',
			kelas: null,
			kota: '',
			email_pendaftar: userEmailGoogle,
			pilihan_zona: '',
			kode_tagihan: '',
			voucher: '',
			applying_voucher: false
		})
	);

	let biodataPembeli = $state({
		nama: '',
		email: '',
		kontak: '',
		sekolah: '',
		kelas: null,
		kota: '',
		email_pendaftar: userEmailGoogle,
		pilihan_zona: '',
		kode_tagihan: '',
		voucher: '',
		applying_voucher: false
	});

	const beliTiketBulk = async () => {
		const allValid = biodataPeserta.every((peserta) => {
			return (
				peserta.nama && peserta.email && peserta.kontak && peserta.sekolah && peserta.kelas !== null
			);
		});

		if (!allValid) {
			alert('Mohon lengkapi semua data peserta sebelum melanjutkan.');
			return;
		} else {
			await fetch('/api/beli-tiket-holiyeay', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					biodataPeserta,
					totalTiket,
					totalHarga: totalHarga
				})
			})
				.then(async (res) => {
					const response = await res.json();

					biodataPeserta = new Array(totalTiket).fill({
						nama: '',
						email: '',
						noTelp: '',
						asalSekolah: '',
						kelas: null,
						email_pendaftar: userEmailGoogle,
						pilihan_zona: '',
						kode_tagihan: '',
						voucher: '',
						applying_voucher: false
					});
					await goto('/holiyeay/pembayaran/' + response.kode);
				})
				.catch((err) => {
					console.error('Error saat mengirim data:', err);
				});
		}
	};
</script>

<section>
	<a href="/holiyeay" class="text-center mt-10">&leftarrow;Kembali</a>
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
					{#if $holiyeayTicketStore.tiketZonaHoliyeay > 0}
						<tr>
							<td>Eduventure Holiyeay - Universitas Padjadjaran</td>
							<td>x {$holiyeayTicketStore.tiketZonaHoliyeay}</td>
							<td
								>{(
									$holiyeayTicketStore.tiketZonaHoliyeay * zonaHoliyeay.harga_tiket
								).toLocaleString('id-ID', {
									style: 'currency',
									currency: 'IDR'
								})}</td
							>
						</tr>
					{/if}
					<tr>
						<td class="text-right">{isDiscounted ? 'Total (Diskon Voucher)' : 'Total'}: </td>
						<td class="text-right" colspan="2"
							>{$holiyeayTicketStore.totalHargaHoliyeay.toLocaleString('id-ID', {
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
									<option value={zona.id} disabled={zona.is_open == 'closed'}>{zona.title}</option>
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
								<option value={zona.id} disabled={zona.is_open == 'closed'}>{zona.title}</option>
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
							bind:value={totalHarga}
							id="total_harga"
							name="total_harga"
							required
						/>
					</div>
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
