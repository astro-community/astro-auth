import { OAuthConfig } from "@astro-auth/types";
import astroAuthHandler from "./handlers/index";

export interface AstroAuthParams {
  authProviders?: OAuthConfig[];
}

const AstroAuth = (astroAuthParams: AstroAuthParams) => {
  return async ({ astroauth }: { astroauth: string }, request: Request) => {
    // TODO: Don' use any
    const response: any = await astroAuthHandler(
      request,
      astroauth,
      astroAuthParams
    );

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
