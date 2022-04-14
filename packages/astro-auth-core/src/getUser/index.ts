import { AstroGlobal } from "astro";
import parseCookie from "../utils/parseCookieString";
import jwt from "jsonwebtoken";

const getUser = (astro: AstroGlobal) => {
  try {
    const sessionCookie = parseCookie(
      astro.request.headers.get("cookie") ?? ""
    )["__astroauth__session__"];

    if (!sessionCookie) {
      return null;
    }

    const decodedData = jwt.verify(
      sessionCookie,
      import.meta.env.ASTROAUTH_SECRET
    );

    return decodedData;
  } catch (error: any) {
    // throw new Error(error.message);
    return null;
  }
};

export default getUser;

export const redirectUser = (loginPage: string) => {
  return new Response(null, {
    status: 302,
    headers: {
      Location: loginPage.startsWith("/") ? loginPage : `/${loginPage}`,
    },
  });
};
