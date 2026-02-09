import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { PUBLIC_EDUVENTURE_APIURL } from '$env/static/public';
import { PRIVATE_EDUVENTURE_APITOKEN } from '$env/static/private';

import { createItem, readItems, uploadFiles } from '@directus/sdk';
import getDirectusInstance from '$lib/server/directus';

export const load: PageServerLoad = async ({ fetch }) => {
	const directus = getDirectusInstance(fetch);

	const getJadwalKegiatan = await directus.request(
		readItems('jadwal_kegiatan_edu_lite', {
			filter: {
				status: 'published'
			},
			sort: 'nama_sesi',
			fields: ['*', 'lokasi_kegiatan.*']
		})
	);
	return {
		listJadwal: getJadwalKegiatan
	};
};

export const actions: Actions = {
	register: async ({ request, fetch, locals }) => {
		try {
			const data = await request.formData();
			const directus = getDirectusInstance(fetch);
			const session = await locals.auth();

			const file = data.get('surat-pengajuan') as File;
			if (!file) {
				return fail(400, { message: 'Surat pengajuan is required' });
			}
			if (file.type !== 'application/pdf') {
				return fail(400, { message: 'File must be a PDF' });
			}
			if (file.size > 5 * 1024 * 1024) {
				return fail(400, { message: 'File size must be less than 5MB' });
			}

			const token = PRIVATE_EDUVENTURE_APITOKEN;
			if (!token) {
				return fail(401, { message: 'Authentication required' });
			}

			const formData = new FormData();
			formData.append('file', file);
			formData.append('type', 'application/pdf');

			const response = await fetch(`${PUBLIC_EDUVENTURE_APIURL}/files`, {
				method: 'POST',
				body: formData,
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			if (!response.ok) {
				console.error('Upload failed:', await response.text());
				return fail(500, { message: 'File upload failed' });
			}

			const result = await response.json();
			const fileId = result.data.id;

			const selectedSession = data.get('select-session');
			const dataPengajuanSekolah = {
				status: 'published',
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
				jumlah_peserta: Number(data.get('jumlah-peserta')),
				...(selectedSession
					? { jadwal_kegiatan: selectedSession }
					: {
							usulan_tanggal_kunjungan: data.get('usulan-tanggal-kunjungan'),
							waktu: data.get('usulan-jam-kunjungan')
						}),
				paket_eduventure_lite: data.get('paket-eduventure-lite'),
				surat_pengajuan: fileId,
				status_pengajuan: 'pending'
			};

			await directus.request(createItem('pengajuan_eduventure_lite', dataPengajuanSekolah));
		} catch (error) {
			console.error('Error in register action:', error);
			return fail(500, { message: 'Internal server error' });
		}

		throw redirect(303, '/eduventure/lite/daftar/success');
	}
};
