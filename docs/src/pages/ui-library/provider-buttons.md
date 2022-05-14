---
title: Provider Button Components
description: Learn About Provider Button Components
layout: ../../layouts/MainLayout.astro
---

Provider Buttons are components that are included in the `@astro-auth/ui` library and the button looks exactly similar to the Buttons in the [astro.build](https://astro.build) official website. You have each Provider Button for each provider that is included in the `@astro-auth/providers` library.

You can use the Google button like this,

```jsx
import { GoogleButton } from "@astro-auth/ui";

const ProviderButtonSection = () => {
  return <GoogleButton />;
};
```

Provider Buttons takes 3 optional props

1. `onClick`: Function that is called when the button is clicked. Defaults to the login function.
2. `callback`: The route that user will be redirected in a successful login attempt. Defaults to `/`.
3. `children`: The text that is displayed on the button. Defaults to the provider name.

> Read more about provider buttons in the each provider page of the documentation.
