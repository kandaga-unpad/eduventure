import type { Actions } from './$types';
import type { PageServerLoad } from './$types';

import { error, redirect } from '@sveltejs/kit';
import { xenditInvoiceClient } from '$lib/server/xendit';
import { readItems, createItem, updateItem } from '@directus/sdk';

import getDirectusInstance from '$lib/server/directus';

export const load: PageServerLoad = async ({ fetch, locals }) => {
  const session = await locals.auth();

  if (!session?.user) {
    error(403, 'Anda belum Login');
  }

  const directus = getDirectusInstance(fetch);
  const getTiketZona = await directus.request(readItems('zona_eduventure', {
    filter: {
      tipe_eduventure: 'holiyeay'
    },
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
    const getTiketZona = await directus.request(readItems('zona_eduventure', {
      filter: {
        tipe_eduventure: 'holiyeay'
      },
      sort: 'title'
    }));

    const orderId = `eduventure-holiyeay-${Math.random().toString(36).substring(2, 15)}`;

    const dataPeserta = await directus.request(readItems('peserta_eduventure', {
      filter: {
        email: session?.user?.email
      }
    }));

    const biodataPeserta = {
      nama: data.get('nama'),
      email: data.get('email'),
      kontak: data.get('kontak'),
      sekolah: data.get('sekolah'),
      kelas: data.get('kelas'),
      email_pendaftar: session?.user?.email,
      pilihan_zona: data.get('zona'),
      voucher: data.get('voucher') || null,
      kode_tagihan: '',
      url_tagihan: '',
    }

    const totalHarga = data.get('total_harga')

    // Xendit Invoice
    const transactionDetail = {
      "externalId": orderId,
      "amount": Number(totalHarga),
      "payer_email": biodataPeserta.email_pendaftar ?? session?.user?.email,
      "description": `Pembelian Tiket Eduventure Holiyeay - ${biodataPeserta.nama}`,
      "should_send_email": true,
      "customer": {
        "phoneNumber": biodataPeserta.kontak?.toString() ?? '',
        "givenNames": session?.user?.name?.split(" ")[0],
        "surname": session?.user?.name?.split(" ")[1],
        "email": biodataPeserta.email_pendaftar ?? session?.user?.email,
        "mobileNumber": biodataPeserta.kontak?.toString()
      },
      "currency": "IDR",
      "locale": "ID",
      "reminder_time": "1",
      "items": [
        {
          "name": "Eduventure Holiyeay Ticket",
          "quantity": 1,
          "price": Number(totalHarga),
          "category": "Eduventure Ticket",
          "url": "https://eduventure.unpad.ac.id"
        }
      ]
    }

    await xenditInvoiceClient.createInvoice({
      data: transactionDetail,
    }).then(async (transaction: any) => {
      biodataPeserta['kode_tagihan'] = transaction.externalId;
      biodataPeserta['url_tagihan'] = transaction.invoiceUrl;

      await directus.request(createItem('tiket_eduventure_holiyeay', biodataPeserta));
      await directus.request(updateItem('peserta_eduventure', dataPeserta[0].id, {
        kode_tagihan: dataPeserta[0].kode_tagihan === null || dataPeserta[0].kode_tagihan.length === 0 ? [transaction.externalId] : [...dataPeserta[0].kode_tagihan, transaction.externalId]
      }))
      return transaction;
    }).catch((err: any) => {
      console.log(JSON.stringify(err));
    })

    redirect(303, '/holiyeay/pembayaran/' + orderId)
  }
};