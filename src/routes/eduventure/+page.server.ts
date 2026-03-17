import getDirectusInstance from '$lib/server/directus-cf';
import { readItems } from '@directus/sdk';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  const directus = getDirectusInstance(fetch);

  const getEduventureInfo = await directus.request(readItems('gallery_eduventure'))

  console.log(getEduventureInfo)

  return {
    galleryInfo: getEduventureInfo
  };
};