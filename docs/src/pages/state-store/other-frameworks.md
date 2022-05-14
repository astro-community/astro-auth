---
title: Using User State Inside Other Frameworks
description: Learn How To Consume User State Inside Of Frameworks Other Than React
layout: ../../layouts/MainLayout.astro
---

## Instructions

At the moment, in frameworks other than react, there is no way to preserve the state inside of the application, so you have to fetch the user from the server every time. Here is how you do it in vue.

```html
<script>
  import { useUser } from "@astro-auth/client";

  export default {
    data() {
      return {
        user: null,
      };
    },
    async created() {
      this.user = await useUser();
    },
  };
</script>

<template>
  <button @click="count++">{{JSON.stringify(user)}}</button>
</template>
```

You can use the same method to do the same thing in other frameworks.
