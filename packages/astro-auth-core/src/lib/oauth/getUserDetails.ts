import { OAuthConfig } from "@astro-auth/types";
import openIdClient from "./client";
import { TokenSet } from "openid-client";

const astroAuthURL = import.meta.env.ASTROAUTH_URL;

const getUserDetails = async (
  oauthConfig: OAuthConfig,
  code: string,
  cookies: {
    [key: string]: string;
  }
) => {
  const oauthClient = await openIdClient(oauthConfig);
  let userTokens: TokenSet;

  if (oauthConfig.idToken) {
    userTokens = await oauthClient.callback(
      `${astroAuthURL}/api/auth/oauth/${oauthConfig.id}`,
      { code: code },
      {
        code_verifier: cookies["__astroauth__pkce__"],
        state: cookies["__astroauth__state__"],
      }
    );
  } else {
    userTokens = await oauthClient.oauthCallback(
      `${astroAuthURL}/api/auth/oauth/${oauthConfig.id}`,
      { code: code },
      {
        code_verifier: cookies["__astroauth__pkce__"],
        state: cookies["__astroauth__state__"],
      }
    );
  }

  const user = await oauthClient.userinfo(userTokens.access_token ?? "", {
    params: oauthConfig.userInfoParams,
  });

  const transformedUser = {
    user: oauthConfig.profile(user),
    ...userTokens,
  };

  return transformedUser;
};

export default getUserDetails;
