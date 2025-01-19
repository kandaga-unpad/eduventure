/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Actions } from "./$types";
import type { PageServerLoad } from "./$types";

import { redirect } from "@sveltejs/kit";
import { midTransSnap } from '$lib/server/midtrans';
import { readItems, createItem, updateItem } from '@directus/sdk';
import getDirectusInstance from '$lib/server/directus';


export const load: PageServerLoad = async ({ fetch }) => {
  const directus = getDirectusInstance(fetch);
  const getTiketZona = await directus.request(readItems('zona_eduventure', {
    sort: 'title'
  }))
  const getPesertaBiodata = await directus.request(readItems('peserta_eduventure', {
    filter: {
      email: 'chrisnaadhip@gmail.com'
    }
  }))

  return {
    zona: getTiketZona,
    peserta: getPesertaBiodata
  }
};

export const actions: Actions = {
  beli: async ({ request, fetch }) => {
    const data = await request.formData();
    const directus = getDirectusInstance(fetch);

    const dataPeserta = await directus.request(readItems('peserta_eduventure', {
      filter: {
        email: 'chrisnaadhip@gmail.com'
      }
    }))

    const biodataPeserta = {
      nama: data.get('nama'),
      kontak: data.get('kontak'),
      email: data.get('email'),
      sekolah: data.get('sekolah'),
      kelas: data.get('kelas'),
      kota: data.get('kota'),
      email_pendaftar: 'chrisnaadhip@gmail.com',
      pilihan_zona: data.get('zona'),
      kode_tagihan: ''
    }

    const transactionDetails = {
      "transaction_details": {
        "order_id": `eduventure-tiket-${biodataPeserta.nama}}`,
        "gross_amount": 350000
      }, "credit_card": {
        "secure": true
      }
    }

    const payMidtrans = await midTransSnap.createTransaction(transactionDetails).then(async (transaction: any) => {
      biodataPeserta['kode_tagihan'] = transaction.token

      await directus.request(createItem('tiket_eduventure_experience',
        biodataPeserta
      ));
      await directus.request(updateItem('peserta_eduventure', dataPeserta[0].id, {
        kode_tagihan: [...dataPeserta[0].kode_tagihan, transaction.token]
      }))
      return transaction
    })

    console.log(data)

    await redirect(303, '/eduventure/experience/pembayaran/' + payMidtrans.token)
  }
};