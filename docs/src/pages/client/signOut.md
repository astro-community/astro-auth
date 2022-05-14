---
title: Client Sign Out
description: Learn About Client Sign In
layout: ../../layouts/MainLayout.astro
---

## Instructions

`signOut` is a function of `@astro-auth/client` that will allow you to sign in a user from the frontend. Preferably, you should use this function inside a component island.

`signOut` takes one parameter which is the callbackURL. The callbackURL is the route that you want to redirect the user to after a successful signOut signing out.

## Example

```js
import { signOut } from "@astro-auth/client";

const Login = () => {
  return (
    <div>
      <button
        onClick={() => {
          signOut("/");
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default Login;
```

In above example, when user is successfully signed out, the user will be redirected to the `/` route.
