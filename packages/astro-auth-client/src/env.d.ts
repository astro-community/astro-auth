interface ImportMetaEnv {
  readonly ASTROAUTH_URL: string;
  readonly ASTROAUTH_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
