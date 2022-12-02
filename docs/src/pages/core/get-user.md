---
title: Get User
description: Learn About Get User Function
layout: ../../layouts/MainLayout.astro
---

## Introduction

`getUser` is a function in the `@astro-auth/core` library that returns the user that was serialized to JWT in the `jwt` hook if a user is currently logged in. You can use the `getUser` function in your Astro frontmatter or in a API route.

### Calling `getUser` in frontmatter.

Make sure to pass the `Astro` global as the client property to the function if you're using this in the frontmatter.

```js
---
import { getUser } from "@astro-auth/core";

const user = getUser({ client: Astro });
---

...
```

### Calling `getUser` in an API route.

Make sure to pass the `request` object as the server property to the function if you're using this in the API route.

```js
import { getUser } from "@astro-auth/core";

export const all = (_, request: Request) => {
  const user = getUser({ server: request });
};
```

Once you got the user, you can act according to the returned user. `null` will be returned if there is no user logged in.
