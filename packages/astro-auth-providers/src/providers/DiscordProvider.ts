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
    checks: ["state"],
    profile(profile) {
      if (profile.avatar === null) {
        const defaultAvatarNumber = parseInt(profile.discriminator) % 5;
        profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
      } else {
        const format = profile.avatar.startsWith("a_") ? "gif" : "png";
        profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
      }
      return {
        id: profile.id,
        name: profile.username,
        email: profile.email,
        image: profile.image_url,
        originalUser: { ...profile },
      };
    },
  };
};

export default DiscordProvider;
