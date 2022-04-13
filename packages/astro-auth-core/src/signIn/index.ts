import { Providers } from "@astro-auth/providers";
import axios from "redaxios";

const signIn = async (provider: Providers) => {
  console.log("CAME", provider);
  const { data } = await axios.get("/api/auth/signin");

  return data;
};

export default signIn;
