---
title: Credentials Provider
description: Learn How To Use Credentials Provider
layout: ../../layouts/MainLayout.astro
---

## Instructions

Optionally, you can use `CredentialsProvider` to authenticate with your custom backend server. In your `signIn` function, you can pass the `provider` parameter as `credential` and pass the data required to authenticate in the backend server to the `login` object in the `signIn` function.

```ts
import AstroAuth from "@astro-auth/core";
// Import the Credential provider(s)
import { CredentialProvider } from "@astro-auth/providers";

export const all = AstroAuth({
  authProviders: [
    CredentialProvider({
      // Here, we are simply checking if the email matches and allow the user to login
      authorize: async (properties) => {
        if (properties.email == "osadavidath@gmail.com") {
          return properties;
        }

        return null;
      },
    }),
  ],
});
```

Configure the authorize function to handle the authentication process. (the parameter that is passed in will contain all the data you passed to the login function) The function should return the user properties if the user is authenticated or `null` if the user is not authenticated.

Call the function from the frontend as follows,

```ts
import { signIn } from "@astro-auth/client";

const signInWithEmailAndPassword = () => {
  signIn({
    provider: "credential",
    login: {
      email: "PASS_FROM_INPUT",
      password: "PASS_FROM_INPUT",
    },
  });
};
```
