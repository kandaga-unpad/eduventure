import type { PageServerLoad } from "./$types";

import { readItems } from '@directus/sdk';
import getDirectusInstance from "$lib/server/directus";

export const load: PageServerLoad = async ({ fetch, params }) => {
  const directus = getDirectusInstance(fetch);
  const getDetailTagihan = await directus.request(readItems('tiket_eduventure_experience', {
    filter: {
      kode_tagihan: params.tagihan
    }
  }))

  const zonaMapping = {
    '61E35DCF-BBE3-493A-ADD8-7413FD71C317': 'zona_kesehatan',
    '893DB4C7-9969-4D6E-A33E-E556103FE0C8': 'zona_saintek',
    '3388F6AC-00E0-48D7-AE3B-01B04307F803': 'zona_soshum',
  }

  const countPilihanZona = getDetailTagihan.reduce((acc, item) => {
    const pilihanZona = item.pilihan_zona as keyof typeof zonaMapping;
    const customKey = zonaMapping[pilihanZona];
    if (customKey) {
      acc[customKey] = (acc[customKey] || 0) + 1;
    }
    return acc;
  }, {});

  console.log(countPilihanZona);

  return {
    tagihan: getDetailTagihan,
    totalTiket: countPilihanZona,
    kodeTagihan: params.tagihan
  };
};