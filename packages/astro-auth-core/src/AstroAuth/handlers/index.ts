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
  } = await request
    .clone()
    .json()
    .catch(() => {});

  switch (url) {
    case "signin": {
      const authConfig = config.authProviders?.find(
        (provider) => provider.id === requestBody.provider
      );

      return signIn(
        request,
        requestBody.callback,
        authConfig,
        config.hooks?.jwt,
        config.hooks?.redirectError
      );
    }
    case "signout": {
      return signOut(request);
    }
    default: {
      // console.log(request);

      if (url.startsWith("oauth")) {
        console.log("🚀");

        const oauthConfig = config.authProviders?.find(
          (provider) => provider.id === url.split("/")[1]
        );
        const code = new URL(request.url).searchParams.get("code");
        if (oauthConfig?.type == "credential") {
          return {
            status: 500,
          };
        }
        const { user, encodedJWT } = await OAuthCallback(
          request,
          oauthConfig,
          code ?? undefined,
          config.hooks?.jwt,
          config.hooks?.redirectError
        );

        // This could be a boolean or a string
        const shouldUserLoginHookResponse = config.hooks?.signIn
          ? config.hooks?.signIn(user)
          : null;

        const shouldUserLogin = config.hooks?.signIn
          ? typeof shouldUserLoginHookResponse == "boolean"
            ? !!shouldUserLoginHookResponse
            : false
          : true;

        if (!shouldUserLogin) {
          return {
            status: 302,
            headers: {
              Location:
                typeof shouldUserLoginHookResponse == "string"
                  ? shouldUserLoginHookResponse
                  : "/?error=Not Allowed",
              "Content-Type": undefined,
              "Set-Cookie":
                "__astroauth__session__=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT",
            },
          };
        }

        return {
          status: 307,
          headers: {
            "Set-Cookie": `__astroauth__session__=${encodedJWT}; HttpOnly; Path=/;`,
            "Content-Type": undefined,
            Location: cookies["__astroauth__callback__"] ?? "/",
          },
        };
      }
    }
  }
};

export default astroAuthHandler;
