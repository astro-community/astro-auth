---
title: Metamask Provider
description: Learn How To Use Metamask Provider
layout: ../../layouts/MainLayout.astro
---

## Instructions

Optionally, you can use `Metamask Provider` to do a web3 login. This will sign a message with your private key and validate when a user make a sign in request. In your `signIn` function, you can pass the `provider` parameter as `metamask`.

```ts
import AstroAuth from "@astro-auth/core";
// Import the Credential provider(s)
import { MetamaskProvider } from "@astro-auth/providers";

export const all = AstroAuth({
  authProviders: [
    Metamask({
      // Here, we are specifying what properties should be in the JWT. In this case, I am gonna pass them all.
      authorize: async (properties) => properties,
      // This is the message that will be signed and validated in the backend.
      signMessage: "Hello From Astro Auth",
    }),
  ],
});
```

Configure the authorize function to handle the authentication process. (the parameter that is passed in will contain all the address and signed string) The function should return the user properties if the user is authenticated or `null` if the user should not be authenticated.

Call the function from the frontend as follows,

```ts
import { signIn } from "@astro-auth/client";

const signInWithEmailAndPassword = () => {
  signIn({
    provider: "metamask",
  });
};
```

> If user have not installed metamask,the `signIn` function will return an error.
