import { OAuthConfig } from "@astro-auth/types";
import jwt from "jsonwebtoken";

import openIdClient from "../../lib/oauth/client";
import getUserDetails from "../../lib/oauth/getUserDetails";

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

  try {
    const user = await getUserDetails(oauthConfig, code);

    const generatedData = generateJWT
      ? generateJWT(user)
      : {
          accessToken: user.access_token,
          user: {
            ...user.user,
            originalUser: undefined,
          },
        };

    const encodedJWT = await jwt.sign(
      generatedData,
      import.meta.env.ASTROAUTH_SECRET
    );

    return { user, encodedJWT };
  } catch (error: any) {
    throw new Error(error.toString());
  }
};

export default OAuthCallback;
