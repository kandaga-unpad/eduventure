// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck - Disable checking for TypeScript
import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

import { readItems } from '@directus/sdk';
import getDirectusInstance from "$lib/server/directus";

export const load: PageServerLoad = async (events) => {
  const session = await events.locals.auth()

  if (!session?.user) {
    redirect(303, `/`)
  }

  const directus = getDirectusInstance(events.fetch);

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

  const zonaMapping = {
    '61E35DCF-BBE3-493A-ADD8-7413FD71C317': 'zona_kesehatan',
    '893DB4C7-9969-4D6E-A33E-E556103FE0C8': 'zona_saintek',
    '3388F6AC-00E0-48D7-AE3B-01B04307F803': 'zona_soshum',
  }

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
    totalTiket: countPilihanZona,
    session: session
  };
}