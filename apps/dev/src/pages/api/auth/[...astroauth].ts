import AstroAuth from "@astro-auth/core";
import { GoogleProvider, DiscordProvider } from "@astro-auth/providers";

export const all = AstroAuth({
  authProviders: [
    GoogleProvider({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    }),
    DiscordProvider({
      clientId: import.meta.env.DISCORD_CLIENT_ID,
      clientSecret: import.meta.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  hooks: {
    jwt: ({ accessToken, refreshToken, user }) => {
      return {
        accessToken,
        user: {
          ...user,
          originalUser: user.originalUser,
        },
      };
    },
    signIn: () => {
      return true;
    },
  },
});
