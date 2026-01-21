import type { PageServerLoad } from "./$types";

import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/server/directus-cf';

export const load: PageServerLoad = async ({ fetch }) => {

  const directus = getDirectusInstance(fetch);

  const getLiteGallery = await directus.request(readItems('gallery_eduventure_sekolah', {
    filter: {
      jenis_eduventure: {
        _eq: '9c3250ad-ea81-4e36-ae5b-dab363e5b2ec'
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