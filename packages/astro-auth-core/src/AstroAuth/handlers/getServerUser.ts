import parseCookie from "../../utils/parseCookieString";
import jwt from "jsonwebtoken";

const getServerUser = (request: Request, user?: (user: any) => any) => {
  const cookies = parseCookie(request.headers.get("cookie") || "");
  const session = cookies["__astroauth__session__"];

  if (!session) {
    return {
      status: 401,
      body: {
        error: "Unauthorized",
      },
    };
  }

  const payload = jwt.verify(session, import.meta.env.ASTROAUTH_SECRET);

  const newPayload = user ? user(payload) : payload;
  const newJWT = jwt.sign(newPayload, import.meta.env.ASTROAUTH_SECRET);

  return {
    status: 200,
    body: newPayload,
    headers: {
      "Set-Cookie": `__astroauth__session__=${newJWT}; HttpOnly; Path=/;`,
    },
  };
};

export default getServerUser;
