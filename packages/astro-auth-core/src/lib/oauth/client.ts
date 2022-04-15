import { Issuer, Client, custom } from "openid-client";
import { OAuthConfig } from "@astro-auth/types";

const astroAuthURL = import.meta.env.ASTROAUTH_URL;

const openIdClient = async (config: OAuthConfig) => {
  const issuer = await Issuer.discover(config.wellKnown);
  const client = new issuer.Client({
    client_id: config.options.clientId,
    client_secret: config.options.clientSecret,
    redirect_uris: [`${astroAuthURL}/api/auth/oauth/${config.id}`],
  });
  return client;
};

export default openIdClient;
