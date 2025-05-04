import type { PageServerLoad } from "./$types";

import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/server/directus';

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
        _eq: '79094EF0-DF6F-4BF7-9B1F-AFBCF2B38B0D'
      },
      status_pendaftaran: {
        _eq: 'paid'
      }
    }
  }))

  const getTiketZona2 = await directus.request(readItems('tiket_eduventure_experience', {
    filter: {
      pilihan_zona: {
        _eq: '64B7ECB3-C124-42AE-BD2E-B13112B43536'
      },
      status_pendaftaran: {
        _eq: 'paid'
      }
    }
  }))

  const getTiketZona3 = await directus.request(readItems('tiket_eduventure_experience', {
    filter: {
      pilihan_zona: {
        _eq: '9B7CB4B9-782B-4D09-AC83-85A8A9D9EA6A'
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