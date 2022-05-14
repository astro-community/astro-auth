---
title: Account Hook
description: Learn About Account Hook
layout: ../../layouts/MainLayout.astro
---

When user initially logs in to the application, Astro Auth will call the `jwt` hook passing everything that it receives from the provider, that is just for the single time that user logs in.

`account` hook will be called passing the contents in the initially signed JWT token every time that `useUser` client hook is called in the client side.

> Learn more about `useUser` client hook in the client section

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
    jwt: async (user) => {
      return {
        accessToken: user.accessToken,
        user: {
          ...user.user,
          originalUser: user.user.originalUser,
        },
      };
    },
    account: async (user) => {
      return {
        ...user,
        isGood: Math.random() >= 0.5,
      };
    },
  },
});
```

What this essentially does is add a new property to the user object called `isGood` and set it to a random boolean value every time that the user is accessed from the client side.
