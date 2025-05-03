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
        _eq: '023D3356-7E31-4B13-B300-B8C9DBD10A9F'
      },
      status_pendaftaran: {
        _eq: 'paid'
      }
    }
  }))

  const getTiketZona3 = await directus.request(readItems('tiket_eduventure_experience', {
    filter: {
      pilihan_zona: {
        _eq: '9CE68670-C4A4-4C90-90F3-F47917DCB96A'
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