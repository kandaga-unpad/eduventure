import { createDirectus, rest, staticToken } from '@directus/sdk';
import { PUBLIC_EDUVENTURE_APIURL } from '$env/static/public';
import { PRIVATE_EDUVENTURE_APITOKEN } from '$env/static/private';

function getDirectusInstance(fetch?: typeof globalThis.fetch) {
  const customFetch = async (url: string | URL | Request, options: RequestInit = {}) => {
    const maxRetries = 2;
    const fetchFn = fetch || globalThis.fetch;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetchFn(url, {
          ...options,
          headers: {
            ...options.headers,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'en-US,en;q=0.9',
          },
        });

        // Check for Cloudflare challenge
        const contentType = response.headers.get('content-type');
        if (contentType?.includes('text/html')) {
          const text = await response.text();
          if (text.includes('Cloudflare') || text.includes('challenge')) {
            if (attempt < maxRetries) {
              console.log(`Cloudflare challenge detected, retry ${attempt + 1}/${maxRetries}`);
              await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
              continue;
            }
            throw new Error('Cloudflare challenge failed after retries');
          }
        }

        return response;
      } catch (error) {
        if (attempt === maxRetries) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
      }
    }
  };

  const options = { globals: { fetch: customFetch } };
  return createDirectus(PUBLIC_EDUVENTURE_APIURL, options)
    .with(rest())
    .with(staticToken(PRIVATE_EDUVENTURE_APITOKEN));
}

export default getDirectusInstance;