import type { Actions } from "./$types";

import getDirectusInstance from '$lib/server/directus-cf';
import { readItems, createItem, updateItem } from '@directus/sdk';

export const actions: Actions = {
  checkin: async ({ request, fetch, locals }) => {
    const directus = getDirectusInstance(fetch);
    const body = await request.formData();
    const ticketId = body.get('qr_code');
    if (!ticketId || typeof ticketId !== 'string') {
      throw new Error('Invalid ticket ID');
    }

    await directus.request(updateItem('tiket_eduventure_experience', ticketId, {
      status_pendaftaran: 'checked'
    }))

    return {
      status: "success"
    }
  }
};