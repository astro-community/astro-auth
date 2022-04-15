import AstroAuth from "@astro-auth/core";
import { GoogleProvider } from "@astro-auth/providers";

export const all = AstroAuth({
  authProviders: [
    GoogleProvider({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  hooks: {
    jwt: ({ accessToken, refreshToken, user }) => {
      return {
        accessToken,
        refreshToken,
        user,
      };
    },
    signIn: () => {
      return true;
    },
  },
});
