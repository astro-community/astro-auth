import { OAuthConfig, OAuthUserOptions } from "@astro-auth/types";

const TwitterProvider = (options: OAuthUserOptions): OAuthConfig => {
  return {
    id: "twitter",
    name: "Twitter",
    type: "oauth",
    scope: "users.read tweet.read offline.access",
    options,
    authorization: "https://twitter.com/i/oauth2/authorize",
    token: "https://api.twitter.com/2/oauth2/token",
    userinfo: "https://api.twitter.com/2/users/me",
    userInfoParams: { "user.fields": "profile_image_url" },
    profile({ data: profile }) {
      return {
        id: profile.id,
        name: profile.name,
        //  E-mail is currently unsupported by OAuth 2 Twitter.
        email: null,
        image: profile.profile_image_url.replace("normal", "400x400"),
        originalUser: { ...profile },
      };
    },
    checks: ["pkce", "state"],
  };
};

export default TwitterProvider;
