import { OAuthConfig } from "@astro-auth/types";

const signIn = async (request: Request, oauthConfig?: OAuthConfig) => {
  if (request.method != "POST") {
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

  return {
    status: 200,
    body: {
      loginURL: await oauthConfig.getAuthURL(),
    },
  };
};

export default signIn;
