import type { RequestHandler } from '../$types';

import { json } from '@sveltejs/kit';
import { createItem } from '@directus/sdk';

import getDirectusInstance from '$lib/server/directus'

export const POST: RequestHandler = async ({ request, fetch }) => {
  const directus = getDirectusInstance(fetch);
  const userData = await request.json();

  const createUser = await directus.request(createItem('peserta_eduventure', userData))

  return json({
    status: "created",
    user: createUser,
  })
}