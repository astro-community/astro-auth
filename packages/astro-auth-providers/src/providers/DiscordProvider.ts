import { OAuthConfig, OAuthUserOptions } from "@astro-auth/types";

const DiscordProvider = (options: OAuthUserOptions): OAuthConfig => {
  return {
    id: "discord",
    name: "Discord",
    type: "oauth",
    scope: "identify email",
    options,
    authorization: "https://discord.com/api/oauth2/authorize",
    token: "https://discord.com/api/oauth2/token",
    userinfo: "https://discord.com/api/users/@me",
  };
};

export default DiscordProvider;
