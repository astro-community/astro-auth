import { OAuthConfig } from "@astro-auth/types";
import { generators } from "openid-client";

export const getState = (config: OAuthConfig) => {
  if (!config.checks?.includes("state")) {
    return null;
  }

  const state = generators.state();

  return state;
};
