/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Actions } from "./$types";
import type { PageServerLoad } from "./$types";

import { error, redirect } from "@sveltejs/kit";
import { midTransSnap } from '$lib/server/midtrans';
import { readItems, createItem, updateItem } from '@directus/sdk';
import getDirectusInstance from '$lib/server/directus';


export const load: PageServerLoad = async ({ fetch, locals }) => {
  const session = await locals.auth();

  if (!session?.user) {
    error(403, 'Anda belum Login')
  }

  const directus = getDirectusInstance(fetch);
  const getTiketZona = await directus.request(readItems('zona_eduventure', {
    sort: 'title'
  }))
  const getPesertaBiodata = await directus.request(readItems('peserta_eduventure', {
    filter: {
      email: session?.user?.email
    }
  }))

  return {
    zona: getTiketZona,
    peserta: getPesertaBiodata
  }
};

export const actions: Actions = {
  beli: async ({ request, fetch, locals }) => {
    const data = await request.formData();
    const directus = getDirectusInstance(fetch);
    const session = await locals.auth();

    const orderId = `eduventure-tiket-${Math.random().toString(36).substring(2, 15)}`

    const dataPeserta = await directus.request(readItems('peserta_eduventure', {
      filter: {
        email: session?.user?.email
      }
    }))

    const biodataPeserta = {
      nama: data.get('nama'),
      kontak: data.get('kontak'),
      email: data.get('email'),
      sekolah: data.get('sekolah'),
      kelas: data.get('kelas'),
      kota: data.get('kota'),
      email_pendaftar: session?.user?.email,
      pilihan_zona: data.get('zona'),
      kode_tagihan: '',
      url_tagihan: ''
    }

    console.log(dataPeserta)

    const transactionDetails = {
      "transaction_details": {
        "order_id": orderId,
        "gross_amount": 350000
      },
      "customer_details": {
        "first_name": biodataPeserta.nama,
        "email": biodataPeserta.email,
        "phone": biodataPeserta.kontak
      },
      "product_details": {
        "product_id": orderId,
        "product_name": "Tiket Eduventure Experience",
        "quantity": biodataPeserta,
        "price": 350000,
        "subtotal": 350000
      },
      "credit_card": {
        "secure": true
      }
    }

    const payMidtrans = await midTransSnap.createTransaction(transactionDetails).then(async (transaction: any) => {
      biodataPeserta['kode_tagihan'] = orderId
      biodataPeserta['url_tagihan'] = transaction.redirect_url

      await directus.request(createItem('tiket_eduventure_experience',
        biodataPeserta
      ));
      await directus.request(updateItem('peserta_eduventure', dataPeserta[0].id, {
        kode_tagihan: [...biodataPeserta.kode_tagihan, orderId],
      }))
      console.log(transaction)
      return transaction
    })

    await redirect(303, '/eduventure/experience/pembayaran/' + orderId)
  }
};