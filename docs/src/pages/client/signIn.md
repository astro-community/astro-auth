---
title: Client Sign In
description: Learn About Client Sign In
layout: ../../layouts/MainLayout.astro
---

## Instructions

`signIn` is a function of `@astro-auth/client` that will allow you to sign in a user from the frontend. Preferably, you should use this function inside a component island.

`signIn` takes one parameter which is a object that contains, `callbackURL`, `provider` and `login` properties. `callbackURL` is the route that you want to redirect the user to after signing in. `provider` is the provider that you want to use to sign in.`login` is a property that is only used when you're using the **Credentials** provider. It is the login details that you need to send over to the backend for authentications.

## Example

```js
import { signIn } from "@astro-auth/client";

const Login = () => {
  return (
    <div>
      <button
        onClick={() => {
          signIn({
            callbackURL: "/dashboard",
            provider: "discord",
          });
        }}
      >
        Log In
      </button>
    </div>
  );
};

export default Login;
```

In above example, we're using the **Discord** provider to sign in. If the login is successful the user will be redirected to the `/dashboard` route.

> Read more about the `login` property in the **Credentials** provider.
