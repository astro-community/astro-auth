import { OAuthConfig, OAuthUserOptions } from "@astro-auth/types";

const FacebookProvider = (options: OAuthUserOptions): OAuthConfig => {
  return {
    id: "facebook",
    name: "Facebook",
    type: "oauth",
    scope: "email",
    options,
    authorization: "https://www.facebook.com/v11.0/dialog/oauth",
    token: "https://graph.facebook.com/oauth/access_token",
    userinfo: "https://api.github.com/user",
    profile(profile) {
      return {
        id: profile.id.toString(),
        name: profile.name || profile.login,
        email: profile.email,
        image: profile.avatar_url,
        originalUser: { ...profile },
      };
    },
  };
};

export default FacebookProvider;
