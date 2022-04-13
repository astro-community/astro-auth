import { Providers } from "@astro-auth/providers";
import axios from "axios";

const signIn = async (provider: Providers) => {
  const instance = axios.create({
    baseURL: "http://localhost:3000",
  });

  console.log("CAME", provider);
  // const { data } = await axios.get("/api/signin");

  return "data";
};

export default signIn;
