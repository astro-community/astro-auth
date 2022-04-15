import { OAuthConfig } from "@astro-auth/types";
import jwt from "jsonwebtoken";

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

  try {
    const googleUser = await oauthConfig.getUser(code);
    const generatedData = generateJWT ? generateJWT(googleUser) : googleUser;

    const encodedJWT = await jwt.sign(
      generatedData,
      import.meta.env.ASTROAUTH_SECRET
    );

    return { googleUser, encodedJWT };
  } catch (error: any) {
    throw new Error(error.toString());
  }
};

export default OAuthCallback;
