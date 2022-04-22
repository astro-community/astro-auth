import { Providers } from "@astro-auth/types";
import axios from "redaxios";

const signIn = async ({
  provider,
  login,
  callbackURL,
}: {
  provider: Providers;
  login?: any;
  callbackURL?: string;
}) => {
  if (provider == "credential" && !login) {
    throw new Error(
      "ASTROAUTH: Login Details Are Required For The Credential Provider"
    );
  }

  const { data } = await axios
    .post("/api/auth/signin", {
      provider,
      callback: callbackURL ?? location.href,
      login,
    })
    .catch((err) => err);

  if (window.location) {
    location.href = data.loginURL || data.redirect;
  }
  return data;
};

export default signIn;
