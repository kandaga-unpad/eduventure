import getDirectusInstance from "$lib/server/directus";
import { readItems, updateItem, updateItems } from "@directus/sdk";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();

  // Midtrans
  // const { transaction_time, status_code, transaction_status } = body;
  // const payment_received = transaction_time.split(' ').join('T');

  // Xendit
  const { paid_at, status } = body;

  const directus = getDirectusInstance(fetch);

  console.log(body);

  // Midtrans
  // const keysOrQuery = await directus.request(readItems('tiket_eduventure_experience', {
  //   filter: {
  //     kode_tagihan: {
  //       _eq: body.order_id
  //     }
  //   }
  // }))

  // Xendit
  const keysOrQuery = await directus.request(readItems('tiket_eduventure_experience', {
    filter: {
      kode_tagihan: {
        _eq: body.external_id
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

  // Midtrans
  // if (status_code === '200' && transaction_status === 'settlement') {
  //   const allKeys = keysOrQuery.map((item) => item.id);
  //   await directus.request(updateItems('tiket_eduventure_experience', allKeys, {
  //     status_pendaftaran: 'paid',
  //     tanggal_pembayaran: payment_received,
  //     response: body
  //   }))
  //   return json({
  //     status: 'success',
  //     message: 'Berhasil memesan tiket',
  //     data: body
  //   })
  // } else if (status_code === '202' && transaction_status === 'expire') {
  //   const allKeys = keysOrQuery.map((item) => item.id);
  //   await directus.request(updateItems('tiket_eduventure_experience', allKeys, {
  //     status_pendaftaran: 'pending',
  //     response: body
  //   }))
  //   return json({
  //     status: 'failed',
  //     message: 'Pembayaran Expired',
  //     data: body
  //   })
  // } else {
  //   return json({
  //     status: 'failed',
  //     message: 'Pembayaran Gagal, silahkan hubungi Admin',
  //     data: body
  //   })
  // }

  // Xendit
  if (status === 'PAID') {
    const allKeys = keysOrQuery.map((item) => item.id);

    await directus.request(updateItems('tiket_eduventure_experience', allKeys, {
      status_pendaftaran: 'paid',
      tanggal_pembayaran: paid_at,
      response: body
    }))

    const getChosenVoucher = await directus.request(readItems('voucher_eduventure', {
      filter: {
        status: 'published',
        kode_voucher: {
          _eq: keysOrQuery[0].voucher
        }
      }
    }))

    if ((keysOrQuery[0].voucher || keysOrQuery[0].voucher !== "") && getChosenVoucher[0].tiket.length < getChosenVoucher[0].total_kuota) {
      const keysOrQueryIds = keysOrQuery.map((item) => item.id);
      const buildQuery = keysOrQueryIds.map((item) => {
        return {
          voucher_eduventure_id: getChosenVoucher[0].id,
          tiket_eduventure_experience_id: item
        }
      })

      await directus.request(updateItem('voucher_eduventure', getChosenVoucher[0].id, {
        tiket: getChosenVoucher[0].tiket.length === 0 ? buildQuery : [...getChosenVoucher[0].tiket, buildQuery]
      })).then((res) => {
        console.log(res)
      })
    } else {
      return json({
        status: 'failed',
        message: 'Kuota Voucher sudah penuh',
      })
    }
    return json({
      status: 'success',
      message: 'Berhasil memesan tiket',
      data: body
    })
  } else if (status === 'EXPIRED') {
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