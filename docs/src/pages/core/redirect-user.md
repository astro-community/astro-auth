---
title: Redirect User
description: Redirect User Based On User's Auth Status
layout: ../../layouts/MainLayout.astro
---

### Instructions

Normally in `astro`, you can use `Astro.redirect` function to redirect user based on their authentication status. But in my case I found it was not working as expected. If that is the case for you, you can use the `redirectUser` function.

```js
import { getUser, redirectUser } from "@astro-auth/core";

const user = getUser({ client: Astro });
if (!user) {
  return redirectUser("/");
}
```
