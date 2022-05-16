import AstroAuth from "@astro-auth/core";
import {
  GoogleProvider,
  DiscordProvider,
  CredentialProvider,
  TwitterProvider,
  GithubProvider,
  MetamaskProvider,
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
      scope: ["users.read", "offline.access"].join(" "),
    }),
    GithubProvider({
      clientId: import.meta.env.GITHUB_CLIENT_ID,
      clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialProvider({
      authorize: (properties) => {
        if (properties.email == "osadavidath@gmail.com") {
          return properties;
        }

        return null;
      },
    }),
    MetamaskProvider({
      authorize: async (properties) => properties,
      signMessage: "Hello From Astro Auth",
    }),
  ],
  hooks: {
    jwt: async (user) => {
      if (user.provider == "metamask") {
        return user;
      }

      return {
        accessToken: user.access_token,
        refreshToken: user.refresh_token,
        user: {
          ...user.user,
          originalUser: undefined,
        },
      };
    },
    signIn: async () => {
      return true;
    },
    redirectError: async (error) => {
      console.log(error.message);
      return "/";
    },
    account: (user) => {
      return {
        ...user,
        isGood: Math.random() >= 0.5,
      };
    },
  },
});
