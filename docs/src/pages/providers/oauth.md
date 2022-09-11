---
title: OAuth Providers
description: Learn How To Use OAuth Providers
layout: ../../layouts/MainLayout.astro
---

## Instructions

OAuth providers will probably be the most common reason for developers to use Astro Auth. Astro Auth supports PKCE security mechanism as well.

## OAuth Providers

Inside the `@astro-auth/provider` package, you will find 8 OAuth providers including their own UI components in the `@astro-auth/ui` package. Here is the list of OAuth providers:

1. GoogleProvider
2. DiscordProvider
3. TwitterProvider
4. FacebookProvider
5. GithubProvider
6. InstagramProvider
7. SpotifyProvider
8. ZoomProvider

## Example For Using Github OAuth

src/pages/api/auth/[...astroauth.ts]

```ts
import AstroAuth from "@astro-auth/core";
// Import the OAuth provider(s)
import { GithubProvider } from "@astro-auth/providers";

export const all = AstroAuth({
  authProviders: [
    // Configure Your OAuth Providers With Proper Client ID And Secret and optionally the scopes you want to access
    GithubProvider({
      clientId: "YOUR_BEAUTIFUL_CLIENT_ID_HERE",
      clientSecret: "YOUR_SUPER_SECRET_CLIENT_SECRET_HERE",
      scope: ["identify", "email"],
    }),
  ],
});
```

and in the front end portion, you can use `signIn` function from `@astro-auth/client` any specific UI component like `GithubButton` from `@astro-auth/ui`.

To use the `signIn` function, you need to pass the `provider` parameter.

```ts
import { signIn } from "@astro-auth/client";

const signInWithGithub = () => {
  signIn({
    provider: "github",
  });
};
```

or there is a corresponding UI button for every single OAuth Provider.

```tsx
import { GithubButton } from "@astro-auth/ui";

const Login = () => {
  return (
    <div>
      <GithubButton />
    </div>
  );
};

export default Login;
```
