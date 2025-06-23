import type { PageServerLoad } from "./$types";

import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/server/directus';

export const load: PageServerLoad = async ({ fetch }) => {
  const directus = getDirectusInstance(fetch);

  const getZonaHoliyeay = await directus.request(readItems('zona_eduventure', {
    filter: {
      tipe_eduventure: {
        _eq: 'holiyeay'
      }
    },
    sort: 'title'
  }))

  const getTiketZonaHoliyeay = await directus.request(readItems('tiket_eduventure_holiyeay', {
    filter: {
      status_pendaftaran: {
        _eq: 'paid'
      }
    }
  }))

  const jumlahTiketSoldHoliyeay = getTiketZonaHoliyeay.length;

  return {
    zonaHoliyeay: getZonaHoliyeay,
    soldTicketHoliyeay: jumlahTiketSoldHoliyeay
  };
};