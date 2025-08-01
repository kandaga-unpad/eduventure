import getDirectusInstance from "$lib/server/directus";
import { readItems, updateItem, updateItems } from "@directus/sdk";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();

  // Midtrans
  // const { transaction_time, status_code, transaction_status } = body;
  // const payment_received = transaction_time.split(' ').join('T');

  // Xendit
  const { paid_at, status, external_id } = body;

  const directus = getDirectusInstance(fetch);

  // Midtrans
  // const keysOrQuery = await directus.request(readItems('tiket_eduventure_experience', {
  //   filter: {
  //     kode_tagihan: {
  //       _eq: body.order_id
  //     }
  //   }
  // }))

  // Xendit
  const keysOrQuery: Record<string, any>[] = await (async () => {
    if (external_id.startsWith('eduventure-tiket')) {
      return await directus.request(readItems('tiket_eduventure_experience', {
        filter: {
          kode_tagihan: {
            _eq: external_id
          }
        }
      }))
    } else if (external_id.startsWith('eduventure-holiyeay')) {
      return await directus.request(readItems('tiket_eduventure_holiyeay', {
        filter: {
          kode_tagihan: {
            _eq: external_id
          }
        }
      }))
    } else {
      return []
    }
  })()

  console.log(keysOrQuery)

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
  if (status === 'PAID' && external_id.startsWith('eduventure-tiket')) {
    const allKeys = keysOrQuery.map((item) => item.id);
    let getChosenVoucher: any[] = [];

    await directus.request(updateItems('tiket_eduventure_experience', allKeys, {
      status_pendaftaran: 'paid',
      tanggal_pembayaran: paid_at,
      response: body
    }))

    if (keysOrQuery[0]?.voucher !== "") {
      getChosenVoucher = await directus.request(readItems('voucher_eduventure', {
        filter: {
          status: 'published',
          kode_voucher: {
            _eq: keysOrQuery[0].voucher
          }
        },
        fields: ['*', 'tiket.*']
      }))
    }

    console.log(getChosenVoucher)

    if ((keysOrQuery[0]?.voucher || keysOrQuery[0]?.voucher !== "") && getChosenVoucher[0]?.tiket.length < getChosenVoucher[0]?.total_kuota) {
      const filteredTiket = keysOrQuery.filter((item) => item.voucher === getChosenVoucher[0]?.kode_voucher);
      const keysOrQueryIds = filteredTiket.map((item) => item.id);
      let listTiketVoucher = getChosenVoucher[0].tiket;
      let newVoucherQuery = keysOrQueryIds.map((item) => {
        return {
          voucher_eduventure_id: getChosenVoucher[0].id,
          tiket_eduventure_experience_id: item
        }
      })

      newVoucherQuery.forEach((item) => {
        listTiketVoucher.push(item)
      })

      await directus.request(updateItem('voucher_eduventure', getChosenVoucher[0].id, {
        tiket: getChosenVoucher[0].tiket.length === 0 ? newVoucherQuery : listTiketVoucher
      }))
    }

    return json({
      status: 'success',
      message: 'Berhasil memesan tiket',
      data: body
    })
  } else if (status === 'EXPIRED' && external_id.startsWith('eduventure-tiket')) {
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
  } else if (status === 'PAID' && external_id.startsWith('eduventure-holiyeay')) {
    const allKeys = keysOrQuery.map((item) => item.id);
    let getChosenVoucher: any[] = [];

    await directus.request(updateItems('tiket_eduventure_holiyeay', allKeys, {
      status_pendaftaran: 'paid',
      tanggal_pembayaran: paid_at,
      response: body
    }))

    if (keysOrQuery[0]?.voucher !== "") {
      getChosenVoucher = await directus.request(readItems('voucher_eduventure', {
        filter: {
          status: 'published',
          kode_voucher: {
            _eq: keysOrQuery[0].voucher
          }
        },
        fields: ['*', 'tiket.*']
      }))
    }

    console.log(getChosenVoucher)

    if ((keysOrQuery[0]?.voucher || keysOrQuery[0]?.voucher !== "") && getChosenVoucher[0]?.tiket.length < getChosenVoucher[0]?.total_kuota) {
      const filteredTiket = keysOrQuery.filter((item) => item.voucher === getChosenVoucher[0]?.kode_voucher);
      const keysOrQueryIds = filteredTiket.map((item) => item.id);
      let listTiketVoucher = getChosenVoucher[0].tiket;
      let newVoucherQuery = keysOrQueryIds.map((item) => {
        return {
          voucher_eduventure_id: getChosenVoucher[0].id,
          tiket_eduventure_experience_id: item
        }
      })

      newVoucherQuery.forEach((item) => {
        listTiketVoucher.push(item)
      })

      await directus.request(updateItem('voucher_eduventure', getChosenVoucher[0].id, {
        tiket: getChosenVoucher[0].tiket.length === 0 ? newVoucherQuery : listTiketVoucher
      }))
    }

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