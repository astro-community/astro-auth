---
title: Astro Auth CLI
description: Using Astro Auth CLI to Easily Setup Astro Auth
layout: ../../layouts/MainLayout.astro
---

Normally, you would have to setup Astro Auth manually by creating a configuration file, state stores yourself. But, if you are using the CLI tool, you can use the following commands to setup Astro Auth.

### Generating A Configuration File

```bash
npx @astro-auth/cli
```

Using the above command, you can generate a Astro Auth configuration file in your `api/auth` folder. If your project have a `tsconfig.json` file, this new config file will be a typescript file, if not it will be a javascript file.

### Generating A State Store

> If you want to learn more about state stores, look at [this](/state-store/react) section.

```bash
npx @astro-auth/cli --state
```

This will create the component that you will need to initialize your state store.
