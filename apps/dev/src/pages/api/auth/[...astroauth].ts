import AstroAuth from "@astro-auth/core";
import { GoogleProvider } from "@astro-auth/providers";

const AstroAuthInstance = AstroAuth({
  authProviders: [
    GoogleProvider({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});

export const get = AstroAuthInstance;
export const post = AstroAuthInstance;
export { AstroAuthInstance as delete };
