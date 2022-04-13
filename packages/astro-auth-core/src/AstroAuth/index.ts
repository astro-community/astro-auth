import { OAuthConfig } from "@astro-auth/types";
import parseCookie from "../utils/parseCookieString";
import astroAuthHandler from "./handler";

export interface AstroAuthParams {
  authProviders?: OAuthConfig[];
}

const AstroAuth = (astroAuthParams: AstroAuthParams) => {
  return ({ astroauth }: { astroauth: string }, request: Request) => {
    const cookies = parseCookie(request.headers.get("cookie") || "");
    return new Response(
      JSON.stringify({
        cookies,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const response = astroAuthHandler(request, astroauth, astroAuthParams);
  };
};

export default AstroAuth;
