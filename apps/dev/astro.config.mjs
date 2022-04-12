import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import { astroAuthComponents } from "@astro-auth/ui";

export default defineConfig({
  integrations: [react(), astroAuthComponents()],
});
