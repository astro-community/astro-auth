---
title: Get Error
description: Get Any Error From Server
layout: ../../layouts/MainLayout.astro
---

### Instructions

When a error is happened in the backend server in a user action, backend redirects the user to the a specific page with the error message. `getError` function can be used to fetch these errors and maybe display them to the user.

```js
import { getError } from "@astro-auth/core";

const error = getError(Astro);
```

In above snippet the error object will be the error if it exists. If it doesn't it'll be null.
