import AstroAuth from "./AstroAuth/index";
import getUser, { redirectUser } from "./getUser";

export default AstroAuth;
export { getUser, redirectUser };
export { OAuthConfig, OAuthUserOptions } from "@astro-auth/types";
