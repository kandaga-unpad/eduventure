import { SvelteKitAuth } from "@auth/sveltekit"
import { PRIVATE_EDUVENTURE_GOOGLE_CLIENTID, PRIVATE_EDUVENTURE_GOOGLE_SECRET, PRIVATE_EDUVENTURE_AUTH_SECRET, PRIVATE_EDUVENTURE_AUTH_URL } from "$env/static/private";
import { PUBLIC_EDUVENTURE_HOST } from "$env/static/public";
import Google from "@auth/sveltekit/providers/google"

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [Google({
    clientId: PRIVATE_EDUVENTURE_GOOGLE_CLIENTID,
    clientSecret: PRIVATE_EDUVENTURE_GOOGLE_SECRET,
    redirectProxyUrl: `${PRIVATE_EDUVENTURE_AUTH_URL}/auth/google/callback`
  })],
  secret: PRIVATE_EDUVENTURE_AUTH_SECRET,
  basePath: PRIVATE_EDUVENTURE_AUTH_URL,
  trustHost: true,
  callbacks: {
    async signIn({ user }) {
      const existingUser = await fetch(`${PUBLIC_EDUVENTURE_HOST}/api/user/` + user.email)
      const response = await existingUser.json();

      if (response.user.length === 0) {
        await fetch(`${PUBLIC_EDUVENTURE_HOST}/api/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: user.email,
            nama_lengkap: user.name,
            status: 'published'
          })
        }).then(async (res) => {
          const response = await res.json();
          if (response.status === 'created') {
            return true
          }
        })
          .catch((err) => console.error(err));
      }

      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log(url, baseUrl)
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken

      return session
    },
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.id = profile.id
      }
      return token
    }
  }
})