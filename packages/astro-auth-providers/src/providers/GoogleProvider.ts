import { OAuthConfig, OAuthUserOptions } from "@astro-auth/types";
import qs from "qs";
import axios from "redaxios";

const astroAuthURL = import.meta.env.ASTROAUTH_URL;

const GoogleProvider = (options: OAuthUserOptions): OAuthConfig => {
  return {
    id: "google",
    name: "Google",
    type: "oauth",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    options,
    async getAuthURL() {
      const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
      const options = {
        redirect_uri: `${astroAuthURL}/api/auth/oauth/google`,
        client_id: this.options.clientId,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: this.scope,
      };

      return `${rootUrl}?${qs.stringify(options)}`;
    },
    async getUser(code) {
      const { data: tokens } = await axios.post(
        "https://oauth2.googleapis.com/token",
        qs.stringify({
          code,
          client_id: this.options.clientId,
          client_secret: this.options.clientSecret,
          redirect_uri: `${astroAuthURL}/api/auth/oauth/google`,
          grant_type: "authorization_code",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { data: googleUser } = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokens.id_token}`,
          },
        }
      );

      return {
        access_token: tokens.access_token,
        expires_in: tokens.expires_in,
        refresh_token: tokens.refresh_token,
        scope: tokens.scope,
        id_token: tokens.id_token,
        user: {
          ...googleUser,
        },
      };
    },
  };
};

export default GoogleProvider;
