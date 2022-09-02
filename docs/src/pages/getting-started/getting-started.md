---
title: Getting Started
description: Getting Started With Astro Auth
layout: ../../layouts/MainLayout.astro
---

> Astro Auth Is A Tool Kit That Consist Of 6 Packages. Two Are Mandatory While Others Are Optional and Can Be Used Or Not Based On Your Requirements.

## Basics

Astro Auth is consists of 5 main packages namely,

1. `@astro-auth/core` - [NPM Package](https://www.npmjs.com/package/@astro-auth/core) - This package is the core of Astro Auth. It contains all the logic and logic related to Astro Auth.

2. `@astro-auth/client` - [NPM Package](https://www.npmjs.com/package/@astro-auth/client) - This package contains all the utility functions that are used from the front matter or front end to interact with Astro Auth easily.

3. `@astro-auth/ui` (In Beta) - [NPM Package](https://www.npmjs.com/package/@astro-auth/ui) - This package contains the Astro Themed UI Elements that you can use to easily get started with Astro Auth.

4. `@astro-auth/providers` - [NPM Package](https://www.npmjs.com/package/@astro-auth/providers) - This package contains all the prebuilt auth providers that comes out of the box with Astro Auth.

5. `@astro-auth/cli` - [NPM Package](https://www.npmjs.com/package/@astro-auth/cli) - This package contains the CLI tool that you can use to get started with Astro Auth in a matter of seconds.

`@astro-auth/core` and `@astro-auth/client` packages are the minimum that you require to get started with Astro Auth. Note that you can only use `@astro-auth/core` without `@astro-auth/client` but it is not the recommended way to use Astro Auth.

## Getting Started

### New Project

This is the easiest way to get started. You can simply clone the example Astro Auth repository to get started. (It is highly suggested to NOT use `apps/dev` as an example because that is a development environment for the actual package)

```bash
git clone https://github.com/osadavc/astro-auth-example.git
```

### Existing Project

You can either setup using the **CLI tool** or you can **setup manually**.

#### Setup With CLI Tool

Read the [CLI Tool](/getting-started/astro-auth-cli) section to know how to setup Astro Auth using the CLI tool.

#### Manual Setup

1. Install the package using the following command.

```bash
npm install @astro-auth/core
```

or

```bash
yarn add @astro-auth/core
```

2. Create API route to handle authentication

Create `[...astroauth.js]` inside `src/pages/api/auth` directory and add the following starter code

```js
import AstroAuth from "@astro-auth/core";

export const all = AstroAuth({
  authProviders: [],
  hooks: {},
});
```

3. For Astro Auth to work, you need to create to environment variables. Create a new `.env file in the root directory of your project and add the following lines.

```
ASTROAUTH_URL=YOUR_BASE_URL_HERE
ASTROAUTH_SECRET=YOUR_JWT_SECRET_HERE
```

Make sure to replace the `YOUR_BASE_URL_HERE` with the URL that your applications is running on. For example, if your application is running on `http://localhost:3000`, then the `ASTROAUTH_URL` should be `http://localhost:3000`.

Replace the `YOUR_JWT_SECRET_HERE` with a secret that you can use to sign the JWT token. You can use any string that you want. If you want to generate a random string, you can use the following command.

```bash
openssl rand -base64 32
```

or go to this URL and generate a random one. [Generate Secret](https://generate-secret.vercel.app/32)

4. Install a SSR adapter for Astro Auth to properly work.

You have to install a Astro SSR adapter for Astro Auth to work because Astro Auth relies on SSR capabilities. You can read more about that [here](https://docs.astro.build/en/guides/server-side-rendering/).

🎉 You're all set to start using Astro Auth. To learn how to use Astro Auth to authenticate users in your project, read the [Using Astro Auth](using-astro-auth) section.
