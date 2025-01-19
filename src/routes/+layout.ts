export async function load({ url, data }) {

  return {
    url: url.pathname,
    session: data.session
  }
}