import { OAuthConfig } from "@astro-auth/types";
import { generators } from "openid-client";

export const getPKCE =  (config: OAuthConfig) => {
  if (!config.checks?.includes("pkce")) {
    return null;
  }

  const code_verifier = generators.codeVerifier();
  const code_challenge = generators.codeChallenge(code_verifier);

  return {
    code_challenge,
    // Code verifier should include in the cookie
    code_verifier,
    code_challenge_method: "S256",
  };
};
