export interface OAuthUserOptions {
  clientId: string;
  clientSecret: string;
}

export interface OAuthConfig {
  id: string;
  name: string;
  type: string;
  options: OAuthUserOptions;
  scope: string;
  getAuthURL(clientId: string, scope: string): string;
}

export type Providers = "google";
