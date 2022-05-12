import { OAuthConfig, OAuthUserOptions } from "@astro-auth/types";

const ZoomProvider = (options: OAuthUserOptions): OAuthConfig => {
  return {
    id: "zoom",
    name: "Zoom",
    type: "oauth",
    scope: "user:read",
    options,
    authorization: "https://zoom.us/oauth/authorize?scope",
    token: "https://zoom.us/oauth/token",
    userinfo: "https://api.zoom.us/v2/users/me",
    profile(profile) {
      return {
        id: profile.id,
        name: `${profile.first_name} ${profile.last_name}`,
        email: profile.email,
        image: profile.pic_url,
        originalUser: { ...profile },
      };
    },
  };
};

export default ZoomProvider;
