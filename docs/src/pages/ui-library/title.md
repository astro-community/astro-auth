---
title: Title Component
description: Learn About Title Component
layout: ../../layouts/MainLayout.astro
---

> Before proceeding, please note that the UI library is still in beta and only works with react.

Title is a component that is included in the `@astro-auth/ui` library and it looks exactly similar to the title text in the [astro.build](https://astro.build) official website.

You can use the title like this,

```jsx
import { Title } from "@astro-auth/ui";

const TitleSection = () => {
  return <Title>Click Me</Title>;
};
```
