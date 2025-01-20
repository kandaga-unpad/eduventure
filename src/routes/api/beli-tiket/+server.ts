/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RequestHandler } from './$types';

import { json } from '@sveltejs/kit';
import { createItems, readItems, updateItem } from '@directus/sdk';
import { midTransSnap } from '$lib/server/midtrans';

import getDirectusInstance from '$lib/server/directus'

export const GET: RequestHandler = async () => {
  return json({
    message: "Please use POST method"
  })
}

export const POST: RequestHandler = async ({ request, fetch, locals }) => {
  const session = await locals.auth()
  const body = await request.json();
  const directus = getDirectusInstance(fetch);
  const dataPeserta = await directus.request(readItems('peserta_eduventure', {
    filter: {
      email: body.biodataPeserta[0].email_pendaftar
    }
  }))

  const { biodataPeserta } = await body;
  const orderId = `eduventure-tiket-${Math.random().toString(36).substring(2, 15)}`

  const transactionDetails = {
    "transaction_details": {
      "order_id": orderId,
      "gross_amount": biodataPeserta.length * 350000
    },
    "customer_details": {
      "first_name": session?.user?.name?.split(" ")[0],
      "last_name": session?.user?.name?.split(" ")[1],
      "email": biodataPeserta[0].email_pendaftar,
      "phone": biodataPeserta[0].kontak,
      "billing_address": {
        "first_name": session?.user?.name?.split(" ")[0],
        "last_name": session?.user?.name?.split(" ")[1],
        "phone": biodataPeserta[0].kontak,
      }
    },
    "item_details": [{
      "id": orderId,
      "price": 350000,
      "quantity": biodataPeserta.length,
      "name": "Eduventure Experience",
      "brand": "Eduventure Unpad",
    }],
    "credit_card": {
      "secure": true
    }
  }

  const payMidtrans = await midTransSnap.createTransaction(transactionDetails).then(async (transaction: any) => {
    const alterBiodataPeserta = await biodataPeserta.map((item: any) => {
      return {
        ...item,
        kode_tagihan: orderId,
        url_tagihan: transaction.redirect_url
      }
    })

    await directus.request(createItems('tiket_eduventure_experience', alterBiodataPeserta));
    await directus.request(updateItem('peserta_eduventure', dataPeserta[0].id, {
      kode_tagihan: dataPeserta[0].kode_tagihan === null ? [orderId] : [...dataPeserta[0].kode_tagihan, orderId]
    }))
    return transaction
  })

  return json({
    status: 'success',
    message: 'Berhasil memesan tiket',
    midtrans: payMidtrans,
    kode: orderId
  })
}