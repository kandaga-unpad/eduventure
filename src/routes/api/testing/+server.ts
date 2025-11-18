import getDirectusInstance from "$lib/server/directus-cf";
import { readItems, updateItem, updateItems } from "@directus/sdk";
import { json } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"

export const GET: RequestHandler = async ({ fetch }) => {
  const directus = getDirectusInstance(fetch);

  const response = {
    "id": "67da6097fb9d645b61a8c75e",
    "items": [
      {
        "url": "https://eduventure.unpad.ac.id",
        "name": "Eduventure Experience",
        "price": 350000,
        "category": "Eduventure Ticket",
        "quantity": 2
      }
    ],
    "amount": 690000,
    "status": "PAID",
    "created": "2025-03-19T06:13:44.094Z",
    "is_high": false,
    "paid_at": "2025-03-19T06:14:44.074Z",
    "updated": "2025-03-19T06:14:44.429Z",
    "user_id": "67d2a2f45de739b8e98e2c74",
    "currency": "IDR",
    "description": "Pembelian Tiket Eduventure Experience sebanyak 2 tiket",
    "external_id": "eduventure-tiket-efwud4m2rbo",
    "paid_amount": 690000,
    "payer_email": "chrisnaadhip@gmail.com",
    "merchant_name": "Eduventure",
    "payment_method": "CREDIT_CARD",
    "payment_channel": "CREDIT_CARD",
    "credit_card_token": "67da60bf50be52001a8f2e0f",
    "credit_card_charge_id": "67da60d482fbff0016a455fc"
  }

  const keysOrQuery = await directus.request(readItems('tiket_eduventure_experience', {
    filter: {
      kode_tagihan: {
        _eq: response.external_id
      }
    }
  }))

  const getListVoucher = await directus.request(readItems('voucher_eduventure', {
    filter: {
      status: 'published'
    },
    fields: ['*', 'tiket.*']
  }))

  return json({
    voucher: getListVoucher,
    keys: keysOrQuery,
    response: response.id
  })
}