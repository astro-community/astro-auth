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
  getAuthURL(): Promise<string>;
  getUser(code: string): Promise<{
    access_token: string;
    expires_in: Number;
    refresh_token: string;
    scope: string;
    id_token: string;
  }>;
}

export type Providers = "google";
