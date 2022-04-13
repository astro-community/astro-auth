import { OAuthConfig } from "@astro-auth/types";
import astroAuthHandler from "./handler";

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
    console.log(response);

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
