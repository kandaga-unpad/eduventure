/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RequestHandler } from './$types';

import { json } from '@sveltejs/kit';
import { createItems, readItems, updateItem } from '@directus/sdk';
import { midTransSnap } from '$lib/server/midtrans';
import { xenditInvoiceClient } from '$lib/server/xendit';
import { PRIVATE_XENDIT_USERPLATFORM } from '$env/static/private';

import getDirectusInstance from '$lib/server/directus-cf'

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
  const zonaExperience = await directus.request(readItems('zona_eduventure', {
    filter: {
      id: dataPeserta[0].zona
    }
  }))
  const chosenZona = zonaExperience[0]

  const { biodataPeserta, totalHarga } = await body;
  const orderId = `eduventure-holiyeay-${Math.random().toString(36).substring(2, 15)}`

  // Xendit
  const transactionDetail = {
    "externalId": orderId,
    "amount": totalHarga,
    "payerEmail": biodataPeserta[0].email_pendaftar,
    "description": `Pembelian Tiket Eduventure Holiyeay sebanyak ${biodataPeserta.length} tiket`,
    "shouldSendEmail": true,
    "customer": {
      "phoneNumber": biodataPeserta[0].kontak.toString(),
      "givenNames": session?.user?.name?.split(" ")[0],
      "surname": session?.user?.name?.split(" ")[1],
      "email": biodataPeserta[0].email_pendaftar,
      "mobileNumber": biodataPeserta[0].kontak.toString()
    },
    "currency": "IDR",
    "locale": "ID",
    "reminderTime": 1,
    "items": [
      {
        "name": "Eduventure Holiyeay Ticket",
        "quantity": biodataPeserta.length,
        "price": chosenZona.harga_tiket,
        "category": "Eduventure Ticket",
        "url": "https://eduventure.unpad.ac.id"
      }
    ]
  }

  const processXendit = await xenditInvoiceClient.createInvoice({
    data: transactionDetail,
    // forUserId: PRIVATE_XENDIT_USERPLATFORM
  }).then(async (transaction: any) => {
    const alterBiodataPeserta = await biodataPeserta.map((item: any) => {
      return {
        ...item,
        kode_tagihan: transaction.externalId,
        url_tagihan: transaction.invoiceUrl
      }
    })

    await directus.request(createItems('tiket_eduventure_holiyeay', alterBiodataPeserta));
    await directus.request(updateItem('peserta_eduventure', dataPeserta[0].id, {
      kode_tagihan: dataPeserta[0].kode_tagihan === null || dataPeserta[0].kode_tagihan.length === 0 ? [transaction.externalId] : [...dataPeserta[0].kode_tagihan, transaction.externalId]
    }))

    return transaction
  }).catch((err: any) => {
    console.log(JSON.stringify(err))
  })

  return json({
    status: 'success',
    message: 'Berhasil memesan tiket',
    // midtrans: payMidtrans,
    xendit: processXendit,
    body: body,
    zona: chosenZona,
    kode: orderId
  })
}