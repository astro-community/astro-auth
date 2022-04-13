import { Providers } from "@astro-auth/types";
import axios from "redaxios";

const signIn = async (provider: Providers) => {
  const { data } = await axios.post("/api/auth/signin", {
    provider,
    callback: "http://localhost:3000",
  });

  return data;
};

export default signIn;
