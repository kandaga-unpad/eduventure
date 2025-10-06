import getDirectusInstance from '$lib/server/directus';
import { readItems } from '@directus/sdk';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  const directus = getDirectusInstance(fetch);

  const getGalleryInfo = await directus.request(readItems('gallery_eduventure', {
    filter: {
      status: {
        _eq: 'published'
      }
    }
  }));

  const getDataSekolah = await directus.request(readItems('gallery_eduventure_sekolah', {
    filter: {
      status: {
        _eq: 'published'
      }
    },
    fields: ['*', 'jenis_eduventure.*']
  }));

  return {
    galleryInfo: getGalleryInfo,
    getDataSekolah: getDataSekolah
  };
};