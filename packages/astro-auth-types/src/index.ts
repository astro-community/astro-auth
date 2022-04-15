export interface OAuthUserOptions {
  clientId: string;
  clientSecret: string;
}

export interface OAuthConfig {
  id: string;
  name: string;
  type: string;
  options: OAuthUserOptions;
  scope?: string;
  wellKnown?: string;
  idToken?: boolean;
  checks?: string[];
  authorization?: string;
  token?: string;
  userinfo?: string;
}

export type Providers = "google" | "discord";
