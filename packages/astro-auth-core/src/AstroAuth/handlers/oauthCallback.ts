import { OAuthConfig } from "@astro-auth/types";
import jwt from "jsonwebtoken";
import { TokenSet } from "openid-client";
import openIdClient from "../../lib/oauth/client";

const astroAuthURL = import.meta.env.ASTROAUTH_URL;

const OAuthCallback = async (
  request: Request,
  oauthConfig?: OAuthConfig,
  code?: string,
  generateJWT?: (user: any) => any
) => {
  if (request.method != "GET") {
    return {
      status: 405,
      body: {
        error: "Method not allowed",
      },
    };
  }

  if (!oauthConfig) {
    throw new Error("Provider Is Not Configured");
  }

  if (!code) {
    throw new Error("Google OAuth Error");
  }

  const oauthClient = await openIdClient(oauthConfig);
  console.log(oauthClient);

  try {
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

    const transformedUsers = {
      user,
      ...userTokens,
    };

    const generatedData = generateJWT
      ? generateJWT(transformedUsers)
      : transformedUsers;

    const encodedJWT = await jwt.sign(
      generatedData,
      import.meta.env.ASTROAUTH_SECRET
    );

    return { transformedUsers, encodedJWT };
  } catch (error: any) {
    throw new Error(error.toString());
  }
};

export default OAuthCallback;
