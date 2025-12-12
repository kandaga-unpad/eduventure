// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck - Disable checking for TypeScript
import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

import { readItems } from '@directus/sdk';
import getDirectusInstance from "$lib/server/directus-cf";

export const load: PageServerLoad = async (events) => {
  const session = await events.locals.auth()

  if (!session?.user) {
    redirect(303, `/`)
  }

  const directus = getDirectusInstance(events.fetch);

  const zonaData = await directus.request(readItems('zona_eduventure', {
    filter: {
      status: 'published'
    },
    fields: ['id', 'title']
  }))

  const zonaMapping: Record<string, string> = {};
  zonaData.forEach(zona => {
    if (zona.title.startsWith('Zona 1 (Ilmu Kesehatan)')) {
      zonaMapping[zona.id] = 'zona_kesehatan';
    } else if (zona.title.startsWith('Zona 2 (Sosial dan Humaniora)')) {
      zonaMapping[zona.id] = 'zona_soshum';
    } else if (zona.title.startsWith('Zona 3 (Saintek dan Agrokomplek)')) {
      zonaMapping[zona.id] = 'zona_saintek';
    }
  });

  const getUserProfile = await directus.request(readItems('peserta_eduventure', {
    filter: {
      email: session.user.email
    }
  }))

  const getDetailTagihan = await directus.request(readItems('tiket_eduventure_experience', {
    filter: {
      email_pendaftar: {
        _eq: getUserProfile[0].email
      },
      pilihan_zona: {
        status: {
          _eq: 'published'
        }
      }
    },
    fields: ['*', 'pilihan_zona.*'],
    sort: '-date_created'
  }))

  const getHistoricalTicket = await directus.request(readItems('tiket_eduventure_experience', {
    filter: {
      email_pendaftar: {
        _eq: getUserProfile[0].email
      },
      pilihan_zona: {
        status: {
          _eq: 'draft'
        }
      }
    },
    fields: ['*', 'pilihan_zona.*'],
    sort: '-date_created',
  }))

  const getEduventureHoliyeay = await directus.request(readItems('tiket_eduventure_holiyeay', {
    filter: {
      email_pendaftar: {
        _eq: getUserProfile[0].email
      },
      pilihan_zona: {
        tipe_eduventure: {
          _eq: 'holiyeay'
        }
      }
    },
    fields: ['*', 'pilihan_zona.*'],
    sort: '-date_created'
  }))

  const countPilihanZona = getDetailTagihan.reduce((acc, item) => {
    const pilihanZona = item.pilihan_zona.id as keyof typeof zonaMapping;
    const customKey = zonaMapping[pilihanZona];
    if (customKey) {
      acc[customKey] = (acc[customKey] || 0) + 1;
    }
    return acc;
  }, {});

  return {
    tagihan: getDetailTagihan,
    historicalTiket: getHistoricalTicket,
    eduventureHoliyeay: getEduventureHoliyeay,
    totalTiket: countPilihanZona,
    session: session
  };
}