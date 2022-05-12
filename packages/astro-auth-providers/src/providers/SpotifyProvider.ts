import { OAuthConfig, OAuthUserOptions } from "@astro-auth/types";

const SpotifyProvider = (options: OAuthUserOptions): OAuthConfig => {
  return {
    id: "spotify",
    name: "Spotify",
    type: "oauth",
    scope: "user-read-email",
    options,
    authorization: "https://accounts.spotify.com/authorize",
    token: "https://accounts.spotify.com/api/token",
    userinfo: "https://api.spotify.com/v1/me",
    profile(profile) {
      return {
        id: profile.id,
        name: profile.display_name,
        email: profile.email,
        image: profile.images?.[0]?.url,
        originalUser: { ...profile },
      };
    },
  };
};

export default SpotifyProvider;
