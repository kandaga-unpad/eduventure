import type { PageServerLoad } from "./$types";

import { readItems } from '@directus/sdk';
import { xenditInvoiceClient } from '$lib/server/xendit';
import getDirectusInstance from "$lib/server/directus";


export const load: PageServerLoad = async ({ fetch, params }) => {
  const directus = getDirectusInstance(fetch);
  const getDetailTagihan = await directus.request(readItems('tiket_eduventure_experience', {
    filter: {
      kode_tagihan: params.tagihan
    }
  }))
  const getActiveZona = await directus.request(readItems('zona_eduventure', {
    filter: {
      status: 'published'
    }
  }))

  const zonaMapping = getActiveZona.reduce((acc, item) => {
    if (item.title.includes('Sosial dan Humaniora')) {
      acc[item.id] = 'zona_soshum';
    } else if (item.title.includes('Saintek dan Agrokomplek')) {
      acc[item.id] = 'zona_saintek';
    } else if (item.title.includes('Ilmu Kesehatan')) {
      acc[item.id] = 'zona_kesehatan';
    }
    return acc;
  }, {});

  const tagihanId = getDetailTagihan[0]?.url_tagihan.split('/').slice(-1);
  const getTagihanXendit = await xenditInvoiceClient.getInvoiceById({
    invoiceId: tagihanId
  })

  const countPilihanZona = getDetailTagihan.reduce((acc, item) => {
    const pilihanZona = item.pilihan_zona as keyof typeof zonaMapping;
    const customKey = zonaMapping[pilihanZona];
    if (customKey) {
      acc[customKey] = (acc[customKey] || 0) + 1;
    }
    return acc;
  }, {});

  return {
    tagihan: getDetailTagihan,
    totalTiket: countPilihanZona,
    kodeTagihan: params.tagihan,
    invoiceXendit: getTagihanXendit,
  };
};