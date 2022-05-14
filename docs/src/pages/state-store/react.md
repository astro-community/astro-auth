---
title: Using User State Inside Of React Components
description: Learn How To Consume User State Inside React Components
layout: ../../layouts/MainLayout.astro
---

## Instructions

Normally when you consume logged in user's state in a component, you have to drill props with the user from the server side. But by using what is so called `state store`, you don't have to. (This feature is experimental and works best with react, other frameworks are supported too.)

First, run this command in the terminal to generate a state store:

```bash
npx @astro-auth/cli -state
```

Then you have to use that component in each and every page you want to consume the user state.

```js

---
import { getUser } from "@astro-auth/core";
import UserStore from "../components/UserStore";

const user = getUser();
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Astro</title>
  </head>
  <body>
    <!-- Add Line Below -->
    <UserStore client:load user={user} />
  </body>
</html>
```

What this will ultimately do is, it'll store the user in a state store, and then you can use the state in a React Component like that.

```jsx
import { ReactStateStore } from "@astro-auth/client";

const ReactComponent = () => {
  const user = ReactStateStore.useUser({ update: true });

  return <div></div>;
};

export default ReactComponent;
```

You can call the `useUser` hook with `update: true` to fetch a fresh user by passing the old user through the `account` hook. If you don't want to update the user, you can pass `update: false` or not pass anything at all and the user in the state store will be returned.

> Check [other](/state-store/other-frameworks) frameworks section to know how to access user state from other frameworks.
