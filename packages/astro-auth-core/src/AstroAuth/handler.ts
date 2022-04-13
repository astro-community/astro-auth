import { AstroAuthParams } from ".";
import parseCookie from "../utils/parseCookieString";
import OAuthCallback from "./oauthCallback";
import signIn from "./signIn";

const astroAuthHandler = async (
  request: Request,
  url: string,
  config: AstroAuthParams
) => {
  const cookies = parseCookie(request.headers.get("cookie") || "");
  const requestBody: {
    provider: string;
    callback: string;
  } = await request.json();

  switch (url) {
    case "signin": {
      const oauthConfig = config.authProviders?.find(
        (provider) => provider.id === requestBody.provider
      );
      return signIn(request, oauthConfig);
    }
    default: {
      if (url.startsWith("oauth")) {
        const oauthConfig = config.authProviders?.find(
          (provider) => provider.id === url.split("/")[1]
        );
        const code = new URL(request.url).searchParams.get("code");
        const jwt = OAuthCallback(request, oauthConfig, code ?? undefined);

        return {
          status: 200,
          body: {
            jwt,
          },
          headers: {
            "Set-Cookie": `__astroauth__session__=${jwt}; HttpOnly; Path=/;`,
            Location: requestBody.callback,
          },
        };
      }
    }
  }
};

export default astroAuthHandler;
