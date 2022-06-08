---
title: Database Integration
description: Learn How To Integrate Astro Auth With Your Favorite Database
layout: ../../layouts/MainLayout.astro
---

## Instructions

In some scenarios, you will need to integrate Astro Auth with a database. That might be to store additional information about the user or store some specific information about the user.

Currently Astro Auth doesn't have a out of the box solution for storing user information in a database. But you can use the [`signIn`](/hooks/sign-in) hook to store the user information in a database.

## Example

```ts
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
      // Store the user info in a database using the user object that is returned
      //  ....
      // And return true if it succeeds
      return true;
    },
  },
});
```

Here you can see the user object passed to the `signIn` hook can be used to store the user info in a database and return true if it succeeds.

> Out of the box database support will be added to astro-auth soon but I think this way is even neater and more flexible.
