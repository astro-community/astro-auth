import { OAuthConfig } from "@astro-auth/types";
import openIdClient from "../../lib/oauth/client";

const signIn = async (
  request: Request,
  callback: string,
  oauthConfig?: OAuthConfig
) => {
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

  const oauthClient = await openIdClient(oauthConfig);

  return {
    status: 200,
    body: {
      loginURL: oauthClient.authorizationUrl({
        scope: oauthConfig.scope,
      }),
    },
    headers: {
      "Set-Cookie": `__astroauth__callback__=${callback}; HttpOnly; Path=/;`,
    },
  };
};

export default signIn;
