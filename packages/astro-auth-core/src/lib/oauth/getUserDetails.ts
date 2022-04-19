import { OAuthConfig } from "@astro-auth/types";
import openIdClient from "./client";
import { TokenSet } from "openid-client";

const astroAuthURL = import.meta.env.ASTROAUTH_URL;

const getUserDetails = async (oauthConfig: OAuthConfig, code: string) => {
  const oauthClient = await openIdClient(oauthConfig);
  let userTokens: TokenSet;

  if (oauthConfig.idToken) {
    userTokens = await oauthClient.callback(
      `${astroAuthURL}/api/auth/oauth/${oauthConfig.id}`,
      { code: code }
    );
  } else {
    userTokens = await oauthClient.oauthCallback(
      `${astroAuthURL}/api/auth/oauth/${oauthConfig.id}`,
      { code: code }
    );
  }

  const user = await oauthClient.userinfo(userTokens.access_token ?? "");

  const transformedUser = {
    user: oauthConfig.profile(user),
    ...userTokens,
  };

  return transformedUser;
};

export default getUserDetails;
