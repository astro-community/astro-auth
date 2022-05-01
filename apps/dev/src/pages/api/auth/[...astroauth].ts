import AstroAuth from "@astro-auth/core";
import {
  GoogleProvider,
  DiscordProvider,
  CredentialProvider,
  TwitterProvider,
} from "@astro-auth/providers";

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
    TwitterProvider({
      clientId: import.meta.env.TWITTER_CLIENT_ID,
      clientSecret: import.meta.env.TWITTER_CLIENT_SECRET,
    }),
    CredentialProvider({
      authorize: (properties) => {
        if (properties.email == "osadavidath@gmail.com") {
          return properties;
        }

        return null;
      },
    }),
  ],
  hooks: {
    jwt: (user) => {
      if (user.provider == "credential") {
        return user;
      }

      return {
        accessToken: user.accessToken,
        user: {
          ...user.user,
          originalUser: user.user.originalUser,
        },
      };
    },
    signIn: () => {
      return true;
    },
  },
});
