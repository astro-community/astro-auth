import { OAuthConfig } from "@astro-auth/types";
import jwt from "jsonwebtoken";

const OAuthCallback = async (
  request: Request,
  oauthConfig?: OAuthConfig,
  code?: string
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

  try {
    const googleUser = await oauthConfig.getUser(code);
    const encodedJWT = await jwt.sign(
      googleUser,
      import.meta.env.ASTROAUTH_SECRET
    );

    return googleUser;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default OAuthCallback;
