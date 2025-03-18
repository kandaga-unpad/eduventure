import getDirectusInstance from "$lib/server/directus";
import { readItems, updateItems } from "@directus/sdk";
import { json } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"

export const GET: RequestHandler = async ({ fetch }) => {
  const directus = getDirectusInstance(fetch);

  const keysOrQuery = await directus.request(readItems('tiket_eduventure_experience', {
    filter: {
      kode_tagihan: {
        _eq: "eduventure-tiket-wzj5jv5z5z"
      }
    }
  }))

  const getListVoucher = await directus.request(readItems('voucher_eduventure', {
    filter: {
      status: 'published'
    },
    fields: ['*', 'tiket.*']
  }))

  // const updateTheVoucherData = await directus.request(updateItems('voucher_eduventure', keysOrQuery[0].id, {
  //   tiket: keysOrQuery[0].id
  // }))

  return json({
    voucher: getListVoucher,
    keys: keysOrQuery
  })
}