export interface OAuthUserOptions {
  clientId: string;
  clientSecret: string;
}

export interface OAuthConfig {
  id: string;
  name: string;
  type: "oauth";
  options: OAuthUserOptions;
  scope?: string;
  wellKnown?: string;
  idToken?: boolean;
  checks?: string[];
  authorization?: string;
  token?: string;
  userinfo?: string;
  userInfoParams?: object;
  profile: (profile: any) => any;
}

export interface CredentialUserOptions {
  authorize: (properties: any) => any;
}

export interface CredentialConfig {
  id: "credential";
  type: "credential";
  options: CredentialUserOptions;
}

export type Providers = "credential" | "google" | "discord" | "twitter";
