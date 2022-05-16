import {
  OAuthConfig,
  CredentialConfig,
  MetamaskConfig,
} from "@astro-auth/types";
import openIdClient from "../../lib/oauth/client";
import jwt from "jsonwebtoken";
import { getPKCE } from "../../lib/oauth/pkceUtils";
import { getState } from "../../lib/oauth/stateUtils";
import getURLSlash from "../../utils/getURLSlash";
import { ethers } from "ethers";
import getMessageToSign from "./getMessageToSign";

const signIn = async (
  request: Request,
  callback: string,
  config?: OAuthConfig | CredentialConfig | MetamaskConfig,
  generateJWT?: (user: any) => any,
  redirectError?: ((error: Error) => Promise<string>) | undefined
) => {
  if (request.method != "POST") {
    return {
      status: 405,
      body: {
        error: "Method not allowed",
      },
    };
  }

  if (config?.type == "credential") {
    const loginDetails = (await request.json().catch(() => {})).login;

    const user = await config.options.authorize(loginDetails);

    if (!user) {
      return {
        status: 401,
        headers: {
          "Content-Type": undefined,
          "Set-Cookie":
            "__astroauth__session__=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT",
        },
        body: {
          redirect: "/?error=Wrong Credentials",
        },
      };
    }

    const generatedData = generateJWT
      ? await generateJWT({ ...user, provider: config.id })
      : user;

    const encodedJWT = await jwt.sign(
      generatedData,
      import.meta.env.ASTROAUTH_SECRET
    );

    return {
      status: 200,
      headers: {
        "Content-Type": undefined,
        "Set-Cookie": `__astroauth__session__=${encodedJWT}; path=/; HttpOnly; Path=/;`,
      },
      body: {
        redirect: callback,
      },
    };
  }

  if (config?.type == "metamask") {
    const loginDetails = (await request.json().catch(() => {})).login;

    const signatureAddress = await ethers.utils.verifyMessage(
      getMessageToSign(config.options.signMessage),
      loginDetails.signature
    );

    const user = await config.options.authorize(loginDetails);

    if (!user || signatureAddress != user.address) {
      return {
        status: 401,
        headers: {
          "Content-Type": undefined,
          "Set-Cookie":
            "__astroauth__session__=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT",
        },
        body: {
          redirect: "/?error=Wrong Credentials",
        },
      };
    }

    const generatedData = generateJWT
      ? await generateJWT({ ...user, provider: config.id })
      : user;

    const encodedJWT = await jwt.sign(
      generatedData,
      import.meta.env.ASTROAUTH_SECRET
    );

    return {
      status: 200,
      headers: {
        "Content-Type": undefined,
        "Set-Cookie": `__astroauth__session__=${encodedJWT}; path=/; HttpOnly; Path=/;`,
      },
      body: {
        redirect: callback,
      },
    };
  }

  if (!config) {
    if (redirectError) {
      const redirectURL = await redirectError(
        new Error("Provider Is Not Configured")
      );

      return {
        status: 200,
        headers: {
          "Content-Type": undefined,
        },
        body: {
          redirect: `${redirectURL}${getURLSlash(
            redirectURL
          )}?error=Provider Is Not Configured`,
        },
      };
    }
    throw new Error("Provider Is Not Configured");
  }

  const oauthClient = await openIdClient(config);
  const pkceCode = getPKCE(config);
  const state = getState(config);

  const headers = new Headers();
  headers.set(
    "Set-Cookie",
    `__astroauth__callback__=${callback}; HttpOnly; Path=/;`
  );
  headers.set(
    "Set-Cookie",
    `__astroauth__state__=${state ?? ""}; HttpOnly; Path=/;`
  );
  headers.set(
    "Set-Cookie",
    `__astroauth__pkce__=${pkceCode?.code_verifier ?? ""}; HttpOnly; Path=/;`
  );

  return {
    status: 200,
    body: {
      loginURL: oauthClient.authorizationUrl({
        state: state ?? undefined,
        scope: config.options.scope ? config.options.scope : config.scope,
        code_challenge: pkceCode?.code_challenge,
        code_challenge_method: pkceCode?.code_challenge_method,
      }),
    },
    headers: {
      "Set-Cookie": `__astroauth__callback__=${callback}; HttpOnly; Path=/;`,
      // @ts-expect-error
      "Set-Cookie": `__astroauth__state__=${state ?? ""}; HttpOnly; Path=/;`,
      // @ts-expect-error
      "Set-Cookie": `__astroauth__pkce__=${
        pkceCode?.code_verifier ?? ""
      }; HttpOnly; Path=/;`,
    },
  };
};

export default signIn;
