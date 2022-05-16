import { MetamaskUserOptions } from "@astro-auth/types";
import { AstroAuthParams } from "..";
import getURLSlash from "../../utils/getURLSlash";
import parseCookie from "../../utils/parseCookieString";
import getMessageToSign from "./getMessageToSign";
import getServerUser from "./getServerUser";
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
    case "user": {
      return getServerUser(request, config.hooks?.account);
    }
    case "sign-message": {
      const metamaskProvider = config.authProviders?.find(
        (provider) => provider.id == "metamask"
      );

      if (!metamaskProvider) {
        if (config.hooks?.redirectError) {
          const redirectURL = await config.hooks.redirectError(
            new Error("Metamask provider is not configured")
          );

          return {
            status: 307,
            headers: {
              "Content-Type": undefined,
              Location: `${getURLSlash(
                redirectURL
              )}/?error=Metamask provider is not configured`,
            },
          };
        }

        throw new Error("Metamask is not configured");
      }

      return {
        status: 200,
        body: {
          message: getMessageToSign(
            (metamaskProvider?.options as MetamaskUserOptions).signMessage
          ),
        },
      };
    }
    default: {
      if (url.startsWith("oauth")) {
        const oauthConfig = config.authProviders?.find(
          (provider) => provider.id === url.split("/")[1]
        );
        const code = new URL(request.url).searchParams.get("code");

        if (
          oauthConfig?.type == "credential" ||
          oauthConfig?.type == "metamask"
        ) {
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
          ? await config.hooks?.signIn(user)
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
