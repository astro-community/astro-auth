import AstroAuth from "./AstroAuth/index";
import getUser, { redirectUser } from "./getUser";
import getError from "./getError";

export default AstroAuth;
export { getUser, getError, redirectUser };
export { OAuthConfig, OAuthUserOptions } from "@astro-auth/types";
