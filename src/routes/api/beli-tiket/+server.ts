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

export const POST: RequestHandler = async ({ request, fetch }) => {
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
      "order_id": `eduventure-tiket-${Math.random().toString(36).substring(2, 15)}`,
      "gross_amount": biodataPeserta.length * 350000
    },
    "customer_details": {
      "first_name": biodataPeserta[0].nama_pendaftar,
      "email": biodataPeserta[0].email_pendaftar,
      "phone": biodataPeserta[0].kontak
    },
    "product_details": {
      "product_id": orderId,
      "product_name": "Tiket Eduventure Experience",
      "quantity": biodataPeserta.length,
      "price": 350000,
      "subtotal": 350000 * biodataPeserta.length
    },
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
      kode_tagihan: [...dataPeserta[0].kode_tagihan, orderId]
    }))
    console.log(transaction)
    return transaction
  })

  console.log(payMidtrans)

  return json({
    status: 'success',
    message: 'Berhasil memesan tiket',
    midtrans: payMidtrans,
    kode: orderId
  })
}