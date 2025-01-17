<script lang="ts">
	import { ticketStore } from '$lib/components/composables/ticketStore';

	type BiodataPeserta = {
		nama: string;
		kontak: string;
		email: string;
		sekolah: string;
		kelas: number;
		kota: string;
	};

	let totalTiket = $state(
		$ticketStore.tiketZona1 + $ticketStore.tiketZona2 + $ticketStore.tiketZona3
	);

	let biodataPeserta: BiodataPeserta[] = $state(
		new Array($ticketStore.tiketZona1 + $ticketStore.tiketZona2 + $ticketStore.tiketZona3).fill({
			nama: '',
			kontak: '',
			email: '',
			sekolah: '',
			kelas: 0,
			kota: ''
		})
	);
</script>

<section>
	<a href="/eduventure/experience">&leftarrow;Kembali</a>
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
							<td>Zona 1 (Ilmu Kesehatan)</td>
							<td>x {$ticketStore.tiketZona1}</td>
							<td
								>{($ticketStore.tiketZona1 * 350000).toLocaleString('id-ID', {
									style: 'currency',
									currency: 'IDR'
								})}</td
							>
						</tr>
					{/if}
					{#if $ticketStore.tiketZona2 > 0}
						<tr>
							<td>Zona 2 (Sosial dan Humaniora)</td>
							<td>x {$ticketStore.tiketZona2}</td>
							<td
								>{($ticketStore.tiketZona2 * 350000).toLocaleString('id-ID', {
									style: 'currency',
									currency: 'IDR'
								})}</td
							>
						</tr>
					{/if}
					{#if $ticketStore.tiketZona3 > 0}
						<tr>
							<td>Zona 3 (Saintek dan Agrokomplek)</td>
							<td>x {$ticketStore.tiketZona3}</td>
							<td
								>{($ticketStore.tiketZona3 * 350000).toLocaleString('id-ID', {
									style: 'currency',
									currency: 'IDR'
								})}</td
							>
						</tr>
					{/if}
					<tr>
						<td class="text-right">Total: </td>
						<td class="text-right" colspan="2">{totalTiket * 350000}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div>
		<p>{JSON.stringify(biodataPeserta)}</p>
	</div>
	<div>
		<h6>Data Pemilik Tiket</h6>
		{#each Array(totalTiket) as tiket, i}
			<form action="">
				<p>Biodata Orang ke-{i + 1}</p>
				<div class="form-input">
					<label for="name">Nama :</label>
					<input type="text" id="name" name="name" bind:value={biodataPeserta[i].nama} />
				</div>
				<div class="form-input">
					<label for="kontak">No. HP :</label>
					<input type="number" id="kontak" name="kontak" bind:value={biodataPeserta[i].kontak} />
				</div>
			</form>
		{/each}
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

	input {
		@apply rounded-lg p-2;
	}
</style>
