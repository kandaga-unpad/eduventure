import type { PageServerLoad } from "./$types";

import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/server/directus';

export const load: PageServerLoad = async ({ fetch }) => {
  const directus = getDirectusInstance(fetch);

  const getTiketZona1 = await directus.request(readItems('tiket_eduventure_experience', {
    filter: {
      pilihan_zona: {
        _eq: '61E35DCF-BBE3-493A-ADD8-7413FD71C317'
      },
      status_pendaftaran: {
        _eq: 'paid'
      }
    }
  }))
  const getTiketZona2 = await directus.request(readItems('tiket_eduventure_experience', {
    filter: {
      pilihan_zona: {
        _eq: '3388F6AC-00E0-48D7-AE3B-01B04307F803'
      },
      status_pendaftaran: {
        _eq: 'paid'
      }
    }
  }))
  const getTiketZona3 = await directus.request(readItems('tiket_eduventure_experience', {
    filter: {
      pilihan_zona: {
        _eq: '893DB4C7-9969-4D6E-A33E-E556103FE0C8'
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
    soldTicket: {
      zona1: jumlahTiketSoldZona1,
      zona2: jumlahTiketSoldZona2,
      zona3: jumlahTiketSoldZona3
    }
  }
};