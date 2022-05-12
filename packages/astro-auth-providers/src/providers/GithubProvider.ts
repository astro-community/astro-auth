import { OAuthConfig, OAuthUserOptions } from "@astro-auth/types";

const GithubProvider = (options: OAuthUserOptions): OAuthConfig => {
  return {
    id: "github",
    name: "GitHub",
    type: "oauth",
    scope: "read:user user:email",
    options,
    authorization: "https://github.com/login/oauth/authorize",
    token: "https://github.com/login/oauth/access_token",
    userinfo: "https://api.github.com/user",
    profile(profile) {
      return {
        id: profile.id.toString(),
        name: profile.name || profile.login,
        email: profile.email,
        image: profile.avatar_url,
      };
    },
  };
};

export default GithubProvider;
