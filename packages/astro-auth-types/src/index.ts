export interface OAuthUserOptions {
  clientId: string;
  clientSecret: string;
  scope?: string;
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
  authorize: (properties: any) => Promise<any>;
}

export interface CredentialConfig {
  id: "credential";
  type: "credential";
  options: CredentialUserOptions;
}

export interface MetamaskUserOptions {
  signMessage: string;
  authorize: (properties: any) => Promise<any>;
}

export interface MetamaskConfig {
  id: "metamask";
  type: "metamask";
  options: MetamaskUserOptions;
}

export type Providers =
  | "credential"
  | "metamask"
  | "google"
  | "discord"
  | "twitter"
  | "facebook"
  | "github"
  | "instagram"
  | "spotify"
  | "zoom";
