import { OAuthConfig } from "@astro-auth/types";
import jwt from "jsonwebtoken";

import getUserDetails from "../../lib/oauth/getUserDetails";
import parseCookie from "../../utils/parseCookieString";

const OAuthCallback = async (
  request: Request,
  oauthConfig?: OAuthConfig,
  code?: string,
  generateJWT?: (user: any) => any,
  redirectError?: (error: Error) => string
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
    if (redirectError) {
      const redirectURL = redirectError(
        new Error("Provider Is Not Configured")
      );

      return {
        status: 307,
        headers: {
          "Content-Type": undefined,
          Location: `${redirectURL}/?error=Provider Is Not Configured`,
        },
      };
    }

    throw new Error("Provider Is Not Configured");
  }

  if (!code) {
    if (redirectError) {
      const redirectURL = redirectError(
        new Error(`${oauthConfig.name} OAuth Error`)
      );

      return {
        status: 307,
        headers: {
          "Content-Type": undefined,
          Location: `${redirectURL}/?error=${oauthConfig.name} OAuth Error`,
        },
      };
    }

    throw new Error(`${oauthConfig.name} OAuth Error`);
  }

  try {
    const cookies = parseCookie(request.headers.get("cookie") ?? "");

    const user = await getUserDetails(oauthConfig, code, cookies);

    const generatedData = generateJWT
      ? generateJWT({ ...user, provider: oauthConfig.id })
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
