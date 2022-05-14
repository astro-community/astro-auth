import { OAuthConfig, CredentialConfig } from "@astro-auth/types";
import astroAuthHandler from "./handlers/index";

export interface AstroAuthParams {
  authProviders?: (OAuthConfig | CredentialConfig)[];
  hooks?: {
    jwt?: (user: any) => Promise<any>;
    signIn?: (user: any) => Promise<boolean | string>;
    redirectError?: (error: Error) => Promise<string>;
    account?: (user: any) => Promise<any>;
  };
}

interface AuthHandlerResponse {
  status?: number;
  body?: any;
  headers?: {
    [key: string]: string | undefined | string[];
  };
}

const AstroAuth = (astroAuthParams: AstroAuthParams) => {
  return async ({
    params: { astroauth },
    request,
  }: {
    params: {
      astroauth: string;
    };
    request: Request;
  }) => {
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

    if (!import.meta.env.ASTROAUTH_SECRET || !import.meta.env.ASTROAUTH_URL) {
      throw new Error("ASTROAUTH_SECRET and ASTROAUTH_URL must be set");
    }

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
