import AstroAuth from "@astro-auth/core";

const AstroAuthInstance = AstroAuth({});

export const get = AstroAuthInstance;
export const post = AstroAuthInstance;
