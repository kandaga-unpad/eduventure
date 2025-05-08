import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return {
    title: 'Dream',
    description: 'Dream',
    keywords: 'Dream',
    image: '/images/eduventure/dream.png',
  };
};