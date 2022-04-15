import { Issuer, Client } from "openid-client";
import { OAuthConfig } from "@astro-auth/types";

const astroAuthURL = import.meta.env.ASTROAUTH_URL;

const openIdClient = async (config: OAuthConfig) => {
  let issuer: Issuer;

  if (config.wellKnown) {
    issuer = await Issuer.discover(config.wellKnown);
  } else {
    issuer = new Issuer({
      issuer: config.id,
      authorization_endpoint: config.authorization,
      token_endpoint: config.token,
      userinfo_endpoint: config.userinfo,
    });
  }

  const client = new issuer.Client({
    client_id: config.options.clientId,
    client_secret: config.options.clientSecret,
    redirect_uris: [`${astroAuthURL}/api/auth/oauth/${config.id}`],
  });
  return client;
};

export default openIdClient;
