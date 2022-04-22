import { OAuthConfig, CredentialConfig } from "@astro-auth/types";
import astroAuthHandler from "./handlers/index";

export interface AstroAuthParams {
  authProviders?: (OAuthConfig | CredentialConfig)[];
  hooks?: {
    jwt?: (user: any) => any;
    signIn?: (user: any) => boolean | string;
  };
}

interface AuthHandlerResponse {
  status?: number;
  body?: any;
  headers?: {
    [key: string]: string | undefined;
  };
}

const AstroAuth = (astroAuthParams: AstroAuthParams) => {
  return async ({ astroauth }: { astroauth: string }, request: Request) => {
    const response: AuthHandlerResponse = (await astroAuthHandler(
      request,
      astroauth,
      astroAuthParams
    )) ?? {
      status: 500,
      body: {
        error: "Internal Server Error",
      },
    };

    return new Response(JSON.stringify(response?.body), {
      status: response?.status || 200,
      headers: {
        "Content-Type": "application/json",
        ...response?.headers,
      },
    });
  };
};

export default AstroAuth;
