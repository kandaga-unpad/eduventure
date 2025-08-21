import type { PageServerLoad } from './$types';
import getDirectusInstance from '$lib/server/directus';
import { readItems } from '@directus/sdk';

export const load: PageServerLoad = async ({ fetch, params }) => {
  const directus = getDirectusInstance(fetch);
  const jenis = params.jenis;

  const getGalleryEduventure = await directus.request(readItems('gallery_eduventure', {
    filter: {
      url_gallery: {
        _eq: jenis
      }
    },
  }));

  const getListOfSekolah = await directus.request(readItems('gallery_eduventure_sekolah', {
    filter: {
      jenis_eduventure: {
        _eq: getGalleryEduventure[0].id
      },
      status: {
        _eq: 'published'
      }
    },
    fields: ['*', 'galeri_foto.*']
  }))

  return {
    galleryEduventure: getGalleryEduventure[0],
    listOfSekolah: getListOfSekolah,
    jenis: jenis,
  }
};