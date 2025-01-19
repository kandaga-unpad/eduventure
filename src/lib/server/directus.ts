import { createDirectus, rest, staticToken } from '@directus/sdk';
import { PUBLIC_EDUVENTURE_APIURL } from '$env/static/public';
import { PRIVATE_EDUVENTURE_APITOKEN } from '$env/static/private';

function getDirectusInstance(fetch?: typeof globalThis.fetch) {
  const options = fetch ? { globals: { fetch } } : {};
  const directus = createDirectus(PUBLIC_EDUVENTURE_APIURL, options)
    .with(rest())
    .with(staticToken(PRIVATE_EDUVENTURE_APITOKEN));

  return directus;
}

export default getDirectusInstance;