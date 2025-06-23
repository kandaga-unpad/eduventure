import type { PageServerLoad } from "./$types";

import { readItems } from "@directus/sdk";
import { xenditInvoiceClient } from "$lib/server/xendit";
import getDirectusInstance from "$lib/server/directus";

export const load: PageServerLoad = async ({ fetch, params }) => {
  const directus = getDirectusInstance(fetch);
  const getDetailTagihan = await directus.request(
    readItems("tiket_eduventure_holiyeay", {
      filter: {
        kode_tagihan: params.tagihan,
      },
    })
  );

  const getHoliyeay = await directus.request(
    readItems("zona_eduventure", {
      filter: {
        tipe_eduventure: "holiyeay",
      }
    })
  )

  const tagihanId = getDetailTagihan[0]?.url_tagihan.split("/").slice(-1);
  const getTagihanXendit = await xenditInvoiceClient.getInvoiceById({
    invoiceId: tagihanId,
  });

  return {
    zona: getHoliyeay,
    tagihan: getDetailTagihan,
    kodeTagihan: params.tagihan,
    invoiceXendit: getTagihanXendit,
  }
};