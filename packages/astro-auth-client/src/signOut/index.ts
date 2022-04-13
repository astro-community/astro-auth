import { Providers } from "@astro-auth/types";
import axios from "redaxios";

const signIn = async (callback?: string) => {
  const { data } = await axios.delete("/api/auth/signout");

  if (window.location) {
    location.href = callback ?? "/";
  }
  return data;
};

export default signIn;
