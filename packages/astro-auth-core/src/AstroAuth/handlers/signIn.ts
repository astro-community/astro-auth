import { OAuthConfig, CredentialConfig } from "@astro-auth/types";
import openIdClient from "../../lib/oauth/client";
import jwt from "jsonwebtoken";

const signIn = async (
  request: Request,
  callback: string,
  config?: OAuthConfig | CredentialConfig,
  generateJWT?: (user: any) => any
) => {
  if (request.method != "POST") {
    return {
      status: 405,
      body: {
        error: "Method not allowed",
      },
    };
  }

  if (config?.type == "credential") {
    const loginDetails = (await request.json().catch(() => {})).login;

    const user = await config.options.authorize(loginDetails);

    if (!user) {
      return {
        status: 401,
        headers: {
          "Content-Type": undefined,
          "Set-Cookie":
            "__astroauth__session__=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT",
        },
        body: {
          redirect: "/?error=Wrong Credentials",
        },
      };
    }

    const generatedData = generateJWT
      ? generateJWT({ ...user, provider: config.id })
      : user;

    const encodedJWT = await jwt.sign(
      generatedData,
      import.meta.env.ASTROAUTH_SECRET
    );

    return {
      status: 200,
      headers: {
        "Content-Type": undefined,
        "Set-Cookie": `__astroauth__session__=${encodedJWT}; path=/; HttpOnly; Path=/;`,
      },
      body: {
        redirect: callback,
      },
    };
  }

  if (!config) {
    throw new Error("Provider Is Not Configured");
  }

  const oauthClient = await openIdClient(config);

  return {
    status: 200,
    body: {
      loginURL: oauthClient.authorizationUrl({
        scope: config.scope,
      }),
    },
    headers: {
      "Set-Cookie": `__astroauth__callback__=${callback}; HttpOnly; Path=/;`,
    },
  };
};

export default signIn;
