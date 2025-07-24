import { PUBLIC_EDUVENTURE_APIURL } from '$env/static/public';

export const getDirectusImageUrl = (image: string) => {
  if (!image) {
    return '';
  }

  // Ensure the image URL is properly formatted
  const baseUrl = PUBLIC_EDUVENTURE_APIURL.replace(/\/$/, ''); // Remove trailing slash if exists
  return `${baseUrl}/assets/${image}`;
}