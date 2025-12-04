import type { PageServerLoad } from "./$types";

import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/server/directus-cf';

export const load: PageServerLoad = async ({ fetch }) => {
  const directus = getDirectusInstance(fetch);

  const getZonaInfo = await directus.request(readItems('zona_eduventure', {
    filter: {
      status: {
        _eq: 'published'
      }
    },
    sort: 'title'
  }))

  const getTiketZona1 = await directus.request(readItems('tiket_eduventure_experience', {
    filter: {
      pilihan_zona: {
        _eq: '94BE0DC2-ABCB-46A0-8ABF-581B16F8BC44'
      },
      status_pendaftaran: {
        _eq: 'paid'
      }
    }
  }))

  const getTiketZona2 = await directus.request(readItems('tiket_eduventure_experience', {
    filter: {
      pilihan_zona: {
        _eq: '169BFFB9-440C-4822-8FD7-B020E2B4B535'
      },
      status_pendaftaran: {
        _eq: 'paid'
      }
    }
  }))

  const getTiketZona3 = await directus.request(readItems('tiket_eduventure_experience', {
    filter: {
      pilihan_zona: {
        _eq: '40AB54E4-8A7F-4512-9BD1-F86A095E5A4D'
      },
      status_pendaftaran: {
        _eq: 'paid'
      }
    }
  }))

  const jumlahTiketSoldZona1 = getTiketZona1.length;
  const jumlahTiketSoldZona2 = getTiketZona2.length;
  const jumlahTiketSoldZona3 = getTiketZona3.length;

  return {
    zonaInfo: getZonaInfo,
    soldTicket: {
      zona1: jumlahTiketSoldZona1,
      zona2: jumlahTiketSoldZona2,
      zona3: jumlahTiketSoldZona3
    }
  }
};