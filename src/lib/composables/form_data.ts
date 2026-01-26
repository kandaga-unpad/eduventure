export function listProvinceName() {
	const provinceGroups = [
		{
			island: 'Sumatera',
			provinces: [
				'Aceh',
				'Sumatera Utara',
				'Sumatera Barat',
				'Riau',
				'Kepulauan Riau',
				'Jambi',
				'Bengkulu',
				'Sumatera Selatan',
				'Kepulauan Bangka Belitung',
				'Lampung'
			]
		},
		{
			island: 'Jawa',
			provinces: [
				'Banten',
				'DKI Jakarta',
				'Jawa Barat',
				'Jawa Tengah',
				'DI Yogyakarta',
				'Jawa Timur'
			]
		},
		{
			island: 'Bali & Nusa Tenggara',
			provinces: ['Bali', 'Nusa Tenggara Barat', 'Nusa Tenggara Timur']
		},
		{
			island: 'Kalimantan',
			provinces: [
				'Kalimantan Barat',
				'Kalimantan Tengah',
				'Kalimantan Selatan',
				'Kalimantan Timur',
				'Kalimantan Utara'
			]
		},
		{
			island: 'Sulawesi',
			provinces: [
				'Sulawesi Barat',
				'Sulawesi Selatan',
				'Sulawesi Tengah',
				'Sulawesi Tenggara',
				'Gorontalo',
				'Sulawesi Utara'
			]
		},
		{
			island: 'Maluku',
			provinces: ['Maluku', 'Maluku Utara']
		},
		{
			island: 'Papua',
			provinces: [
				'Papua Barat',
				'Papua Barat Daya',
				'Papua Tengah',
				'Papua Pegunungan',
				'Papua Selatan',
				'Papua'
			]
		}
	];

	return provinceGroups;
}

export function listFakultas() {
	const objFakultas = [
		{
			id: 110,
			namaFakultas: 'Fakultas Hukum',
			singkatan: 'fh'
		},
		{
			id: 120,
			namaFakultas: 'Fakultas Ekonomi & Bisnis',
			singkatan: 'feb'
		},
		{
			id: 130,
			namaFakultas: 'Fakultas Kedokteran',
			singkatan: 'fk'
		},
		{
			id: 140,
			namaFakultas: 'Fakultas Matematika & IPA',
			singkatan: 'fmipa'
		},
		{
			id: 150,
			namaFakultas: 'Fakultas Pertanian',
			singkatan: 'faperta'
		},
		{
			id: 160,
			namaFakultas: 'Fakultas Kedokteran Gigi',
			singkatan: 'fkg'
		},
		{
			id: 170,
			namaFakultas: 'Fakultas Ilmu Sosial & Ilmu Politik',
			singkatan: 'fisip'
		},
		{
			id: 180,
			namaFakultas: 'Fakultas Ilmu Budaya',
			singkatan: 'fib'
		},
		{
			id: 190,
			namaFakultas: 'Fakultas Psikologi',
			singkatan: 'fapsi'
		},
		{
			id: 200,
			namaFakultas: 'Fakultas Peternakan',
			singkatan: 'fapet'
		},
		{
			id: 210,
			namaFakultas: 'Fakultas Ilmu Komunikasi',
			singkatan: 'fikom'
		},
		{
			id: 220,
			namaFakultas: 'Fakultas Keperawatan',
			singkatan: 'fkep'
		},
		{
			id: 230,
			namaFakultas: 'Fakultas Perikanan & Ilmu Kelautan',
			singkatan: 'fpik'
		},
		{
			id: 240,
			namaFakultas: 'Fakultas Teknologi Industri Pertanian',
			singkatan: 'ftip'
		},
		{
			id: 250,
			namaFakultas: 'Sekolah Pascasarjana',
			singkatan: 'sps'
		},
		{
			id: 260,
			namaFakultas: 'Fakultas Farmasi',
			singkatan: 'farmasi'
		},
		{
			id: 270,
			namaFakultas: 'Fakultas Teknik Geologi',
			singkatan: 'ftg'
		},
		{
			id: 500,
			namaFakultas: 'Unpad Press',
			singkatan: 'unpad_press'
		}
	];

	return objFakultas;
}
