<script>
	import { page } from '$app/state';
	import { Turnstile } from 'svelte-turnstile';
	import { enhance } from '$app/forms';
	import { listProvinceName, listFakultas } from '$lib/composables/form_data';

	let { data } = $props();

	const provinceList = listProvinceName();
	const fakultasList = listFakultas();

	let dataPengajuan = $state({
		namaSekolah: '',
		alamatSekolah: '',
		kotaKabupaten: '',
		provinsi: '',
		emailPic: '',
		emailPemohon: '',
		kontakPic: '',
		pilihanKunjungan: '',
		pilihanFakultas: '',
		usulanTanggalKunjungan: '',
		jumlahPeserta: 0,
		waktuKunjungan: '',
		paketEduventureLite: '',
		keterangan: ''
	});

	let activeTab = $state('manual');
	let selectedSessionId = $state('');
	let isSubmitting = $state(false);
</script>

<section class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-32 pb-12 px-4">
	<div class="container mx-auto max-w-4xl">
		<div class="bg-white shadow-xl rounded-2xl p-8 md:p-12">
			<h1 class="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
				Pendaftaran Kegiatan Eduventure Lite
			</h1>
			<p class="text-center text-gray-700 font-medium text-lg mb-6">
				Mohon isi data untuk mengajukan pendaftaran kegiatan Eduventure Lite
			</p>
			<form
				method="POST"
				action="?/register"
				use:enhance={({ formData, action, cancel, submitter }) => {
					isSubmitting = true;
					return async ({ update, result }) => {
						isSubmitting = false;
						update();
					};
				}}
				enctype="multipart/form-data"
				class="space-y-6"
			>
				<div class="form-input">
					<label for="nama-sekolah" class="block text-sm font-medium text-gray-700 mb-2"
						>Nama Sekolah:</label
					>
					<input
						type="text"
						name="nama-sekolah"
						id="nama-sekolah"
						minlength="3"
						maxlength="200"
						bind:value={dataPengajuan.namaSekolah}
						placeholder="Silahkan isi Nama Sekolah"
						required
						class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
					/>
				</div>
				<div class="form-input">
					<label for="alamat-sekolah" class="block text-sm font-medium text-gray-700 mb-2"
						>Alamat Sekolah:</label
					>
					<textarea
						name="alamat-sekolah"
						id="alamat-sekolah"
						bind:value={dataPengajuan.alamatSekolah}
						placeholder="Silahkan isi Alamat Sekolah"
						required
						rows="3"
						class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-vertical"
					></textarea>
				</div>
				<div class="form-input">
					<label for="kota-kabupaten" class="block text-sm font-medium text-gray-700 mb-2"
						>Kota / Kabupaten:</label
					>
					<input
						name="kota-kabupaten"
						id="kota-kabupaten"
						bind:value={dataPengajuan.kotaKabupaten}
						placeholder="Silahkan isi asal Kota / Kabupaten"
						required
						class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
					/>
				</div>
				<div class="form-input">
					<label for="provinsi" class="block text-sm font-medium text-gray-700 mb-2">
						Provinsi:
					</label>
					<select
						name="provinsi"
						id="provinsi"
						bind:value={dataPengajuan.provinsi}
						class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white"
					>
						<option value="" disabled selected>Pilih Provinsi</option>
						{#each provinceList as group}
							<optgroup label={group.island}>
								{#each group.provinces as province}
									<option value={province}>{province}</option>
								{/each}
							</optgroup>
						{/each}
					</select>
				</div>
				<div class="form-input">
					<label for="email-pic" class="block text-sm font-medium text-gray-700 mb-2"
						>Email PIC:</label
					>
					<input
						name="email-pic"
						id="email-pic"
						type="email"
						bind:value={dataPengajuan.emailPic}
						placeholder="Silahkan isi Email"
						required
						class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
					/>
				</div>
				<div class="form-input">
					<label for="kontak-pic" class="block text-sm font-medium text-gray-700 mb-2"
						>Kontak PIC:</label
					>
					<input
						name="kontak-pic"
						id="kontak-pic"
						type="tel"
						bind:value={dataPengajuan.kontakPic}
						placeholder="Silahkan isi Nomor HP / Whatsapp"
						required
						class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
					/>
				</div>
				<div class="form-input">
					<label for="pilihan-kunjungan" class="block text-sm font-medium text-gray-700 mb-2"
						>Pilihan Kunjungan:</label
					>
					<select
						name="pilihan-kunjungan"
						id="pilihan-kunjungan"
						bind:value={dataPengajuan.pilihanKunjungan}
						class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white"
					>
						<option value="" selected disabled>Pilihan Kunjungan</option>
						<option value="universitas">Universitas</option>
						<option value="fakultas">Fakultas</option>
					</select>
				</div>
				{#if dataPengajuan.pilihanKunjungan === 'fakultas'}
					<div class="form-input">
						<label for="pilihan-fakultas" class="block text-sm font-medium text-gray-700 mb-2"
							>Pilihan Fakultas:</label
						>
						<select
							name="pilihan-fakultas"
							id="pilihan-fakultas"
							bind:value={dataPengajuan.pilihanFakultas}
							class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white"
						>
							<option value="" disabled selected>Pilih Fakultas</option>
							{#each fakultasList as fakultas}
								<option value={fakultas.singkatan || fakultas}
									>{fakultas.namaFakultas || fakultas}</option
								>
							{/each}
						</select>
					</div>
				{/if}
				<div class="form-input">
					<p class="block text-sm font-medium text-gray-700 mb-2">
						Usulan Tanggal dan Jam Kunjungan:
					</p>
					<div class="flex border-b border-gray-200 mb-4">
						<button
							class="py-2 px-4 text-sm font-medium {activeTab === 'manual'
								? 'text-blue-600 border-b-2 border-blue-600'
								: 'text-gray-500 hover:text-gray-700'}"
							onclick={() => (activeTab = 'manual')}>Manual Input</button
						>
						<button
							class="py-2 px-4 text-sm font-medium {activeTab === 'scheduled'
								? 'text-blue-600 border-b-2 border-blue-600'
								: 'text-gray-500 hover:text-gray-700'}"
							onclick={() => (activeTab = 'scheduled')}>Jadwal Tersedia</button
						>
					</div>
					{#if activeTab === 'manual'}
						<div class="space-y-4">
							<div>
								<label
									for="usulan-tanggal-kunjungan"
									class="block text-sm font-medium text-gray-700 mb-2">Tanggal:</label
								>
								<input
									name="usulan-tanggal-kunjungan"
									id="usulan-tanggal-kunjungan"
									type="date"
									bind:value={dataPengajuan.usulanTanggalKunjungan}
									class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
								/>
							</div>
							<div>
								<label
									for="usulan-jam-kunjungan"
									class="block text-sm font-medium text-gray-700 mb-2">Jam:</label
								>
								<input
									name="usulan-jam-kunjungan"
									id="usulan-jam-kunjungan"
									type="time"
									bind:value={dataPengajuan.waktuKunjungan}
									class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
								/>
							</div>
						</div>
					{:else if activeTab === 'scheduled'}
						<div class="space-y-4">
							<div>
								<label for="select-session" class="block text-sm font-medium text-gray-700 mb-2"
									>Pilih Sesi:</label
								>
								<select
									name="select-session"
									id="select-session"
									bind:value={selectedSessionId}
									class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white"
								>
									<option value="" disabled selected>Pilih Sesi</option>
									{#each data.listJadwal as session}
										<option value={session.id}
											>{session.nama_sesi} - {session.tanggal_kegiatan} ({session.sesi_mulai} - {session.sesi_selesai})
											- {session.lokasi_kegiatan.nama_ruangan} (Kap: {session.lokasi_kegiatan
												.kapasitas})</option
										>
									{/each}
								</select>
							</div>
							{#if selectedSessionId}
								{@const session = data.listJadwal.find((s) => s.id === selectedSessionId)}
								{#if session}
									<div class="bg-gray-50 p-4 rounded-lg">
										<p class="text-sm text-gray-700">
											<strong>Sesi:</strong>
											{session.nama_sesi}
										</p>
										<p class="text-sm text-gray-700">
											<strong>Tanggal:</strong>
											{session.tanggal_kegiatan}
										</p>
										<p class="text-sm text-gray-700">
											<strong>Jam:</strong>
											{session.sesi_mulai} - {session.sesi_selesai}
										</p>
										<p class="text-sm text-gray-700">
											<strong>Lokasi:</strong>
											{session.lokasi_kegiatan.nama_ruangan} - {session.lokasi_kegiatan.unit} (Kapasitas:
											{session.lokasi_kegiatan.kapasitas})
										</p>
									</div>
								{/if}
							{/if}
						</div>
					{/if}
				</div>
				<div class="form-input">
					<label for="jumlah-peserta" class="block text-sm font-medium text-gray-700 mb-2"
						>Perkiraan Jumlah Peserta:</label
					>
					<input
						name="jumlah-peserta"
						type="number"
						bind:value={dataPengajuan.jumlahPeserta}
						class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
					/>
				</div>
				<div class="form-input">
					<label for="paket-eduventure-lite" class="block text-sm font-medium text-gray-700 mb-2"
						>Paket Pilihan:</label
					>
					<select
						name="paket-eduventure-lite"
						id="paket-eduventure"
						bind:value={dataPengajuan.paketEduventureLite}
						class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white"
					>
						<option value="" disabled selected>Pilih Paket Eduventure</option>
						<option value="paket_1">Paket 1 (Rp 100.000/siswa)</option>
						<option value="paket_2">Paket 2 (Rp 150.000/siswa)</option>
					</select>
				</div>
				<div class="form-input">
					<label for="keterangan" class="block text-sm font-medium text-gray-700 mb-2"
						>Keterangan Tambahan:</label
					>
					<textarea
						name="keterangan"
						id="keterangan"
						bind:value={dataPengajuan.keterangan}
						placeholder="Silahkan isi jika ada keterangan yang ingin anda tambahkan"
						rows="3"
						class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-vertical"
					></textarea>
				</div>
				<div class="form-input">
					<label for="surat-pengajuan" class="block text-sm font-medium text-gray-700 mb-2"
						>Surat Pengajuan (PDF, maksimal 5MB):</label
					>
					<input
						type="file"
						name="surat-pengajuan"
						id="surat-pengajuan"
						accept=".pdf"
						required
						class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
					/>
				</div>
				<div class="flex justify-center">
					<Turnstile siteKey="0x4AAAAAAAkrRdBxvh4fqUrA" class="mb-6" />
				</div>
				<div class="text-center">
					<button
						type="submit"
						formaction="?/register"
						disabled={isSubmitting}
						class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						{isSubmitting ? 'Memproses...' : 'Ajukan'}
					</button>
				</div>
			</form>
			{#if page.form?.message}
				<div class="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
					{page.form.message}
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	/* Additional custom styles if needed, but UnoCSS handles most */
</style>
