import type { PageServerLoad } from "./$types";
import getDirectusInstance from '$lib/server/directus';
import { readItems } from "@directus/sdk";

export const load: PageServerLoad = async ({ fetch, locals }) => {
  const directus = getDirectusInstance(fetch);
  const session = await locals.auth();
  const isUserEligible = await directus.request(readItems('eduventure_offer_list', {
    sort: "date_created"
  }))
  const checkEligible = isUserEligible.filter((item) => {
    return item.email === session?.user?.email
  })

  return {
    isEligible: checkEligible.length > 0 ? true : false,
    user: session?.user
  }
};