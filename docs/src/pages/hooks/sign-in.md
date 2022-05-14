---
title: Sign In Hook
description: Learn About Sign In Hook
layout: ../../layouts/MainLayout.astro
---

## Basics

Once you login with any provider this is the first place that Astro Auth library will look in to. You can decide whether a user should be able to login or not with this hook.

## Instructions

Look at the example below.

```js
import AstroAuth from "@astro-auth/core";
import { GoogleProvider } from "@astro-auth/providers";

export const all = AstroAuth({
  authProviders: [
    GoogleProvider({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  hooks: {
    // signIn hook has a argument with all the user info
    signIn: async (user) => {
      return true;
    },
  },
});
```

As you can see, you will get the `user` as a argument. You can decide whether that particular user should be able to login or not by returning a boolean or string.

There are few data types that you can return from this hook.

1. Truthy value - This will allow the user to login.
2. Falsy value - This will prevent the user from logging in.
3. String - This will **NOT** allow user to login. Once user tries to login, he will be redirected to the string that is returned here.

> As of now once you logged in with the `CredentialProvider`, this hook will **NOT** will be called. but this might change in the near future.
