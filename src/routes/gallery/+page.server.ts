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

  return {
    galleryInfo: getGalleryInfo
  };
};