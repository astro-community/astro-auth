import { OAuthConfig, OAuthUserOptions } from "@astro-auth/types";
import qs from "qs";

const GoogleProvider = (options: OAuthUserOptions): OAuthConfig => {
  return {
    id: "google",
    name: "Google",
    type: "oauth",
    scope: "openid email profile",
    options,
    getAuthURL: (clientId, scope) => {
      const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
      const options = {
        redirect_uri: `${import.meta.env.ASTROAUTH_URL}/auth/callback/google`,
        client_id: clientId,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: scope,
      };

      return `${rootUrl}?${qs.stringify(options)}`;
    },
  };
};

export default GoogleProvider;
