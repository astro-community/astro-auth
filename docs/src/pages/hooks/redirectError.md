---
title: Redirect Error Hook
description: Learn About Redirect Error Hook
layout: ../../layouts/MainLayout.astro
---

Redirect Error hook is called with the error when any internal error is occurred in the server side. The user will be redirected to the return value of this hook.

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
    redirectError: async (error) => {
      console.log(error.message);
      return "/";
    },
  },
});
```

Here, what is essentially happening is that whenever an error is thrown in the server side, the error message will be logged to the console and the user will be redirected to the `/` route with the error as a query parameter.
