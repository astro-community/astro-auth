import { AstroAuthParams } from "..";
import parseCookie from "../../utils/parseCookieString";
import OAuthCallback from "./oauthCallback";
import signIn from "./signIn";
import signOut from "./signout";

const astroAuthHandler = async (
  request: Request,
  url: string,
  config: AstroAuthParams
) => {
  const cookies = parseCookie(request.headers.get("cookie") || "");
  const requestBody: {
    provider: string;
    callback: string;
  } = await request.json().catch(() => {});

  switch (url) {
    case "signin": {
      const oauthConfig = config.authProviders?.find(
        (provider) => provider.id === requestBody.provider
      );

      return signIn(request, requestBody.callback, oauthConfig);
    }
    case "signout": {
      return signOut(request);
    }
    default: {
      if (url.startsWith("oauth")) {
        const oauthConfig = config.authProviders?.find(
          (provider) => provider.id === url.split("/")[1]
        );
        const code = new URL(request.url).searchParams.get("code");
        const jwt = await OAuthCallback(
          request,
          oauthConfig,
          code ?? undefined
        );

        return {
          status: 302,
          headers: {
            "Set-Cookie": `__astroauth__session__=${jwt}; HttpOnly; Path=/;`,
            "Content-Type": undefined,
            Location: cookies["__astroauth__callback__"] ?? "/",
          },
        };
      }
    }
  }
};

export default astroAuthHandler;
