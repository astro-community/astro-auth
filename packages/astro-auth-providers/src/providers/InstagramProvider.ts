import { OAuthConfig, OAuthUserOptions } from "@astro-auth/types";

const InstagramProvider = (options: OAuthUserOptions): OAuthConfig => {
  return {
    id: "instagram",
    name: "Instagram",
    type: "oauth",
    scope: "user_profile",
    options,
    authorization: "https://api.instagram.com/oauth/authorize",
    token: "https://api.instagram.com/oauth/access_token",
    userinfo:
      "https://graph.instagram.com/me?fields=id,username,account_type,name",
    profile(profile) {
      return {
        id: profile.id,
        name: profile.username,
        email: null,
        image: null,
        originalUser: { ...profile },
      };
    },
  };
};

export default InstagramProvider;
