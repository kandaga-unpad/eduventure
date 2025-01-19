import { SvelteKitAuth } from "@auth/sveltekit"
import { PRIVATE_GOOGLE_CLIENTID, PRIVATE_GOOGLE_SECRET, PRIVATE_AUTH_SECRET } from "$env/static/private";
import { PUBLIC_HOST } from "$env/static/public";
import Google from "@auth/sveltekit/providers/google"

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [Google({
    clientId: PRIVATE_GOOGLE_CLIENTID,
    clientSecret: PRIVATE_GOOGLE_SECRET,
  })],
  secret: PRIVATE_AUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      const existingUser = await fetch(`${PUBLIC_HOST}/api/user/` + user.email)
      const response = await existingUser.json();

      if (response.user.length === 0) {
        await fetch(`${PUBLIC_HOST}/api/user`, {
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
          } else {
            console.log(response)
          }

        })
          .catch((err) => console.error(err));
      }

      return true;
    }
  }
})