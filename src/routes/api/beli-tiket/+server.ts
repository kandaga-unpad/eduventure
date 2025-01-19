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

  const transactionDetails = {
    "transaction_details": {
      "order_id": `eduventure-tiket-${biodataPeserta[0].nama}-${Math.random().toString(36).substring(2, 8)}`,
      "gross_amount": biodataPeserta.length * 350000
    }, "credit_card": {
      "secure": true
    }
  }

  const payMidtrans = await midTransSnap.createTransaction(transactionDetails).then(async (transaction: any) => {
    const alterBiodataPeserta = await biodataPeserta.map((item: any) => {
      return {
        ...item,
        kode_tagihan: transaction.token
      }
    })

    await directus.request(createItems('tiket_eduventure_experience', alterBiodataPeserta));
    await directus.request(updateItem('peserta_eduventure', dataPeserta[0].id, {
      kode_tagihan: [...dataPeserta[0].kode_tagihan, transaction.token]
    }))
    return transaction
  })

  return json({
    status: 'success',
    message: 'Berhasil memesan tiket',
    midtrans: payMidtrans
  })
}