import type { PageServerLoad } from "./$types";

import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/server/directus-cf';

export const load: PageServerLoad = async ({ fetch }) => {

  const directus = getDirectusInstance(fetch);

  const getLiteGallery = await directus.request(readItems('gallery_eduventure_sekolah', {
    filter: {
      jenis_eduventure: {
        _eq: '89BD8BD5-8230-4A05-8255-3EF15DDAE513'
      },
      status: {
        _eq: 'published'
      }
    },
    limit: 3,
    sort: ['-date_created'],
    fields: ['*', 'galeri_foto.*']
  }))

  return {
    liteGallery: getLiteGallery
  }
};