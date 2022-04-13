import { OAuthConfig } from "@astro-auth/types";

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

  return {
    status: 200,
    body: {
      loginURL: await oauthConfig.getAuthURL(),
    },
    headers: {
      "Set-Cookie": `__astroauth__callback__=${callback}; HttpOnly; Path=/;`,
    },
  };
};

export default signIn;
