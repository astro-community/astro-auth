---
title: JWT Hook
description: Learn About JWT Hook
layout: ../../layouts/MainLayout.astro
---

## Basics

Once you logged in with any provider, a brand new JWT token will be generated. This token will be stored in cookies as a HTTP only cookie. This hook will allow you to alter the contents in the token.

The default JWT token will include the access token from the OAuth provider and very basic information of the user such as user ID, name, email and image. Many OAuth providers will include much more information in the token. By default Astro Auth strip out those data. But by using jwt hook, you can complete alter the contents of the token.

## Instruction

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
    // jwt hook has a argument with all the user info
    jwt: async (user) => {
      return {
        accessToken: user.accessToken,
        user: {
          ...user.user,
          originalUser: user.user.originalUser,
        },
      };
    },
  },
});
```

> You might need to check the provider with `user.provider` and response according to the provider that user is requesting if you have providers that return different data like `CredentialsProvider` or `MetamaskProvider`

As you can see, you will get the `user` as a argument. You can alter the contents of the token by returning a new object. THe passed user object will look something like this

```js
{
  accessToken: "",
  user: {
    id: "",
    name: "",
    email: "",
    image: "",
    originalUser: {
      id: "",
      name: "",
      email: "",
      image: "",
      ...
    },
  },
}
```

You get the very basic info about the user in the user sub object and you will also have a parameter called originalUser which contains the untouched user object from the OAuth provider.

Using this way, you can customize the contents of the token in any way that you need.

### Customize Default Token

If you want to customize the token by using the default token as a template, you can copy the default token's generating function and modify it according to your choice. Default token generating function is given below.

```js
jwt: (user) => {
  return {
    accessToken: user.accessToken,
    user: {
      ...user.user,
      originalUser: undefined,
    },
  };
};
```
