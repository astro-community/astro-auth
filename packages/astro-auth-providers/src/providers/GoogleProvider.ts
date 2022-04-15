import { OAuthConfig, OAuthUserOptions } from "@astro-auth/types";
import qs from "qs";
import axios from "redaxios";

const GoogleProvider = (options: OAuthUserOptions): OAuthConfig => {
  return {
    id: "google",
    name: "Google",
    type: "oauth",
    scope: "openid email profile",
    options,
    wellKnown: "https://accounts.google.com/.well-known/openid-configuration",
    idToken: true,
    checks: ["pkce", "state"],
  };
};

export default GoogleProvider;
