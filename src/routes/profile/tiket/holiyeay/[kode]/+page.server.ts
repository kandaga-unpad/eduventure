import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

import getDirectusInstance from "$lib/server/directus"
import { readItem } from "@directus/sdk"

export const load: PageServerLoad = async ({ fetch, params, locals }) => {
  const session = await locals.auth()
  const kode = params.kode

  const directus = getDirectusInstance(fetch);

  const getTiketDetails = await directus.request(readItem('tiket_eduventure_holiyeay', kode, {
    fields: ['*', 'pilihan_zona.*']
  }))

  if (!session?.user) {
    redirect(303, `/`)
  }

  return {
    session,
    kode,
    tiket: getTiketDetails
  }
}