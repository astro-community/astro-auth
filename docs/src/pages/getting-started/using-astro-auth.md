---
title: Using Astro Auth
description: Using Astro Auth To Build A Login With Google
layout: ../../layouts/MainLayout.astro
---

## Setup Astro Auth

Read the [Getting Started](/getting-started) section to know how to setup Astro Auth.

## Building A Google Login With Astro

### 1. Setup

First will install some more libraries from Astro Auth toolkit to make our lives a little bit easier. Use one of those commands to install the libraries.

```bash
npm install @astro-auth/core @astro-auth/client @astro-auth/providers @astro-auth/ui
```

```bash
yarn add @astro-auth/core @astro-auth/client @astro-auth/providers @astro-auth/ui
```

The client package will make it a lot easier to communicate with the authentication backend. The providers package will provide us with many different **pre configured** OAuth providers. The UI package will provide us with the UI elements that we can use to build our login page. (Please note that the UI package is not mandatory and you can use it or not based on your requirements.)

At this point you should have all the packages install and ready go.

### 2. Edit Astro Auth Config

Go to your `src/pages/api/auth/[...astroauth.js]` file and update the code as follows

```js
import AstroAuth from "@astro-auth/core";

//Import the providers that you need to use
import { GoogleProvider } from "@astro-auth/providers";

export const all = AstroAuth({
  authProviders: [
    // Configure the providers that you need to use
    GoogleProvider({
      // You will need to add your client ID and client secret to a .env file
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  hooks: {},
});
```

> Make sure you have added `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to your `.env` file.

> When generating your Google credentials, make sure to set the redirect URL as `YOUR_DOMAIN/api/auth/oauth/google`. So if you're using local host, put the redirect URL as `http://localhost:3000/api/auth/oauth/google`. You can read more about redirect URLs in the providers section

### 3. The UI

For the UI, you can use the Astro themed UI elements that we have provided.(Please note that UI components are currently in beta and it is only working with react but you can definitely use the authentication with other frameworks as well. **However you will need a UI library in order to use the authentication**)

To use the UI package you need to have React configured for your Astro app. If you don't know how to configure React, please refer to the [Official Guide](https://docs.astro.build/en/core-concepts/framework-components/).

The create a new component with any name that you like, in this case I am gonna name it as `Login.jsx`. Here are the contents of that file

```jsx
import { GoogleButton } from "@astro-auth/ui";
import { signIn } from "@astro-auth/client";

const Login = () => {
  return (
    <div>
      // If you are using the UI Library this is enough
      <GoogleButton callbackURL="https://youtu.be/dQw4w9WgXcQ" />
      // If you are not using the UI Library, you will need to add the following
      code
      <button
        onClick={() => {
          signIn({
            provider: "google",
            callbackURL: "https://youtu.be/dQw4w9WgXcQ",
          });
        }}
      >
        Login with Google
      </button>
    </div>
  );
};

export default Login;
```

Here, you can see we are importing `GoogleButton` from `@astro-auth/ui` and also we are using the `signIn` function from `@astro-auth/client` to sign in with the provider. But you won't need both of them. The signIn call is built in to the GoogleButton component. You will only need to use the `signIn` function if you **don't want to use the UI library**.

We are gonna pass [this URL](https://youtu.be/dQw4w9WgXcQ) as the callback URL so once user is properly authenticated, Astro Auth will redirect the user to this URL.

### 4. Using The Components And Environment Variable Recap

Make sure to import the Login component in your `.astro` page in-order to display that. Let's recap the requirements for the app before testing it.

1. You **MUST** have a `.env` file with the following keys:

```
ASTROAUTH_URL=
ASTROAUTH_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

2. Make sure your client id and client secret are correct. You can get them from google cloud console.

### 5. Testing

Run `npm run dev` or `yarn dev` in your terminal and open `localhost:3000` in your browser. You should see a beautiful Astro like Login With Google button. Just click that and go through the process. If you did everything correct, you should be rick rolled at this point.

> At this point, you should be able to use any login provider to successfully **authenticate** a user in your app. You will learn more about how to **authorize** the logged in users in the next section.
