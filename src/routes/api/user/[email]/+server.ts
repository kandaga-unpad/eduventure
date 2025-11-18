import type { RequestHandler } from './$types';

import { json } from '@sveltejs/kit';
import { readItems } from '@directus/sdk';

import getDirectusInstance from '$lib/server/directus-cf'

export const GET: RequestHandler = async ({ params, fetch }) => {
  const directus = getDirectusInstance(fetch);
  const email = params?.email;

  const getUser = await directus.request(readItems('peserta_eduventure', {
    filter: {
      email: email
    }
  }))

  return json({
    user: getUser
  })
}