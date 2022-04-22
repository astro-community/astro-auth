import { AstroGlobal } from "astro";

const getError = (astro: AstroGlobal) => {
  const error = new URL(astro.request.url).searchParams.get("error");
  return error;
};

export default getError;
