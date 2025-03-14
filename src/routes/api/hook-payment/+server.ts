
import getDirectusInstance from "$lib/server/directus";
import { readItems, updateItems } from "@directus/sdk";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();

  const { transaction_time, status_code, transaction_status } = body;
  const payment_received = transaction_time.split(' ').join('T');
  const directus = getDirectusInstance(fetch);

  const keysOrQuery = await directus.request(readItems('tiket_eduventure_experience', {
    filter: {
      kode_tagihan: {
        _eq: body.order_id
      }
    }
  }))

  if (keysOrQuery.length === 0) {
    return json({
      status: 'failed',
      message: 'Data Tiket tidak ditemukan',
      data: body
    })
  }

  if (status_code === '200' && transaction_status === 'settlement') {
    const allKeys = keysOrQuery.map((item) => item.id);
    await directus.request(updateItems('tiket_eduventure_experience', allKeys, {
      status_pendaftaran: 'paid',
      tanggal_pembayaran: payment_received,
      response: body
    }))
    return json({
      status: 'success',
      message: 'Berhasil memesan tiket',
      data: body
    })
  } else if (status_code === '202' && transaction_status === 'expire') {
    const allKeys = keysOrQuery.map((item) => item.id);
    await directus.request(updateItems('tiket_eduventure_experience', allKeys, {
      status_pendaftaran: 'expired',
      response: body
    }))
    return json({
      status: 'failed',
      message: 'Pembayaran Expired',
      data: body
    })
  } else {
    return json({
      status: 'failed',
      message: 'Pembayaran Gagal, silahkan hubungi Admin',
      data: body
    })
  }
}