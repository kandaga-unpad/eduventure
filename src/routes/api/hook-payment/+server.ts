import { json, type RequestHandler } from "@sveltejs/kit";

import getDirectusInstance from "$lib/server/directus";

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  const directus = getDirectusInstance(fetch);

  console.log(body);
  console.log(directus)
  return json({
    status: 'success',
    message: 'Berhasil memesan tiket'
  })
}