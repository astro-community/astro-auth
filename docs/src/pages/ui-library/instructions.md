---
title: Instruction
description: Instruction to use the UI library
layout: ../../layouts/MainLayout.astro
---

### Introduction

Install `@astro-auth/ui` package to use the UI library.

> Before proceeding, please note that the UI library is still in beta and only works with react.

To load the the stylesheets and font properly, you need to modify your `astro.config.mjs` file like this,

```js
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import { astroAuthComponents } from "@astro-auth/ui";

export default defineConfig({
  integrations: [react(), astroAuthComponents()],
  adapter: vercel(),
  experimental: {
    integrations: true,
  },
});
```

You will need react and astroAuthComponents as integrations and experimental.integrations to be enabled.
