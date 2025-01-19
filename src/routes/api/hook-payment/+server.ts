import { json, type RequestHandler } from "@sveltejs/kit";

import getDirectusInstance from "$lib/server/directus";
import { readItems, updateItems } from "@directus/sdk";

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();

  const { transaction_time, status_code } = body;
  const payment_received = transaction_time.split(' ').join('T');
  const directus = getDirectusInstance(fetch);

  const keysOrQuery = await directus.request(readItems('tiket_eduventure_experience', {
    filter: {
      order_id: {
        _eq: body.order_id
      }
    }
  }))

  if (status_code === '200') {
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
  } else {
    return json({
      status: 'failed',
      message: 'Pembayaran Gagal, silahkan hubungi Admin',
      data: body
    })
  }
}