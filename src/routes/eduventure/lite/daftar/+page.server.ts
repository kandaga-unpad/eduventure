import type { Actions } from './$types';
import type { PageServerLoad } from './$types';

import { createItem, readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/server/directus';

export const load: PageServerLoad = async ({ fetch }) => {
	const directus = getDirectusInstance(fetch);

	const getJadwalKegiatan = await directus.request(
		readItems('jadwal_kegiatan_edu_lite', {
			filter: {
				status: 'published'
			},
			fields: ['*', 'lokasi_kegiatan.*']
		})
	);
	return {
		listJadwal: getJadwalKegiatan
	};
};

export const actions: Actions = {
	register: async ({ request, fetch, locals }) => {
		const data = await request.formData();
		const directus = getDirectusInstance(fetch);
		const session = await locals.auth();

		const dataPengajuanSekolah = {
			nama_sekolah: data.get('nama-sekolah'),
			alamat_sekolah: data.get('alamat-sekolah'),
			kota_kabupaten: data.get('kota-kabupaten'),
			provinsi: data.get('provinsi'),
			email_pic: data.get('email-pic'),
			email_pemohon: session?.user?.email || '',
			kontak_pic: data.get('kontak-pic'),
			pilihan_kunjungan: data.get('pilihan-kunjungan'),
			pilihan_fakultas: data.get('pilihan-fakultas'),
			keterangan: data.get('keterangan'),
			usulan_tanggal_kunjungan: data.get('usulan-tanggal-kunjungan'),
			jumlah_peserta: Number(data.get('jumlah-peserta')),
			waktu: data.get('usulan-jam-kunjungan'),
			paket_eduventure_lite: data.get('paket-eduventure-lite'),
			status_pengajuan: 'pending'
		};

		await directus.request(createItem('pengajuan_eduventure_lite', dataPengajuanSekolah));

		return {
			status: 'ok'
		};
	}
};
