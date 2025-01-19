import { createDirectus, rest, staticToken } from '@directus/sdk';
import { PUBLIC_APIURL } from '$env/static/public';
import { PRIVATE_EDUVENTURE__APITOKEN } from '$env/static/private';

function getDirectusInstance(fetch?: typeof globalThis.fetch) {
  const options = fetch ? { globals: { fetch } } : {};
  const directus = createDirectus(PUBLIC_APIURL, options)
    .with(rest())
    .with(staticToken(PRIVATE_EDUVENTURE__APITOKEN));

  return directus;
}

export default getDirectusInstance;